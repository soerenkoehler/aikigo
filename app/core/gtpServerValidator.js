
let GtpServerValidator = function (gtpServer, gtpOptions, callback) {
    this.machine = new factory.statemachine({
        init: {
            in: (machine) => {
                machine.valid = false
                machine.name = "";
                machine.version = "";
                machine.gtp = new factory.gtp()
                machine.gtp.start(gtpServer, gtpOptions.replace(/\s\s+/g, ' ').split(' '), machine.end.bind(machine));
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
                machine.goto(data == 'GNU Go' ? 'version' : 'invalid');
            }
        },
        version: {
            in: (machine) => machine.gtp.send('version'),
            out: (machine, data) => {
                machine.version = data;
                machine.goto(data == '3.8' ? 'valid' : 'invalid');
            }
        },
        valid: {
            in: (machine) => machine.gtp.send('quit'),
            out: (machine) => {
                clearTimeout(machine.gtpTimeout);
                machine.valid = true
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
    });
}

GtpServerValidator.prototype.validate = function () {
    this.machine.goto('init');
}

module.exports = GtpServerValidator
