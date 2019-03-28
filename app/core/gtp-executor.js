const { spawn } = require('child_process');

const separator = '\n\n';
const seperatorLength = separator.length;

var GTP = function () {
}

GTP.prototype.start = function (executable, params, onResponse) {
    this.buffer = "";
    this.proc = spawn(executable, params);
    this.proc.stdout.on('data', d => {
        this.buffer += d.toString();
        let separatorIndex = this.buffer.indexOf(separator);
        if (separatorIndex > 0) {
            onResponse(this.buffer.substr(2, separatorIndex - 2));
            this.buffer = "";
        }
    });
    console.log(this.proc);
}

GTP.prototype.send = function (command) {
    this.proc.stdin.write(command + '\n');
}

module.exports.GTP = GTP;
