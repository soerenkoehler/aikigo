const { app, BrowserWindow } = require('electron')
const { spawn } = require('child_process')

app.on('ready', () => {
    let win = new BrowserWindow();
    win.loadFile('index.html');
    let proc = spawn('cmd.exe');
    let line = 1;
    proc.stdout.on('data', data => process.stdout.write(line++ + ": " + data.toString()));
});

app.on('window-all-closed', () => {
    app.quit();
});