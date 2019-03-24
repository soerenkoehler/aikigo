const { spawn } = require('child_process')

var GTP = function () {
    this.data = "";
}

GTP.prototype.execute = function (onExit) {
    this.proc = spawn('cmd.exe', ['/c', 'echo', 'Hello', ' ', 'World']);
    this.proc.on('exit', onExit);
    this.proc.stdout.on('data', d => this.data += d.toString());
}

module.exports.GTP = GTP
