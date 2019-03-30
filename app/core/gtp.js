const { spawn } = require('child_process');

const separator = '\n\n';

const suportedGtpServers = [
    {
        title: "GNU Go 3.8",
        name: "GNU Go",
        version: /^3\.8/
    }
]

var GTP = function () {
}

GTP.prototype.start = function (executable, params, onResponse) {
    this.buffer = "";
    this.proc = spawn(executable, params.replace(/\s\s+/g, ' ').split(' '));
    this.proc.stdout.on('data', d => {
        this.buffer += d.toString();
        if (this.buffer.indexOf(separator) > 0) {
            onResponse(this.buffer.substr(this.buffer.startsWith('=') ? 1 : 0).trim());
            this.buffer = "";
        }
    });
}

GTP.prototype.send = function (command) {
    this.proc.stdin.write(command + '\n');
}

function validateGtpServer(gtpServer, gtpOptions, callback) {
    new factory.statemachine({
        init: {
            in: (machine) => {
                machine.name = "";
                machine.version = "";
                machine.server = false
                machine.gtp = new factory.gtp.GTP()
                machine.gtp.start(gtpServer, gtpOptions, machine.end.bind(machine));
                machine.goto('name');
            },
            out: () => { }
        },
        name: {
            in: (machine) => {
                machine.gtpTimeout = setTimeout(() => machine.goto('invalid'), 2000);
                machine.gtp.send('name')
            },
            out: (machine, data) => {
                machine.name = data;
                machine.goto(suportedGtpServers.find(s => s.name == machine.name) ? 'version' : 'invalid');
            }
        },
        version: {
            in: (machine) => machine.gtp.send('version'),
            out: (machine, data) => {
                machine.version = data;
                machine.server = suportedGtpServers.find(s => s.version.test(machine.version) && s.name == machine.name);
                machine.goto(machine.server ? 'valid' : 'invalid');
            }
        },
        valid: {
            in: (machine) => machine.gtp.send('quit'),
            out: (machine) => {
                clearTimeout(machine.gtpTimeout);
                callback(machine);
            }
        },
        invalid: {
            in: (machine) => {
                machine.gtp.proc.kill();
                callback(machine);
            },
            out: () => { }
        }
    }).goto('init');
}

module.exports = { GTP, validateGtpServer };
