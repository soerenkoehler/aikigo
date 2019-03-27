const { spawn } = require('child_process');

var GTP = function () {
    this.buffer = "";
}

GTP.prototype.execute = function (executable, onExit) {
    this.proc = spawn(executable, ['--mode', 'ascii']);
    this.proc.stdout.on('data', d => this.buffer += d.toString());
    this.proc.stdout.on('end', () => console.log(this.buffer));
    this.proc.on('exit', onExit);
    // this.proc.stdin.write('quit\n');
    console.log(this.proc);
}

module.exports.GTP = GTP;
