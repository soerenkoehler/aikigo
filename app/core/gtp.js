const { spawn } = require('child_process');

const separator = '\n\n';

var GTP = function () {
}

GTP.prototype.start = function (executable, params, onResponse) {
    this.buffer = "";
    this.proc = spawn(executable, params);
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

module.exports = GTP;
