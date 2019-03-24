const { app, BrowserWindow } = require('electron');
const { GTP } = require('./gtp-executor');

app.on('ready', () => {
    // let win = new BrowserWindow();
    // win.loadFile('index.html');
    let gtp = new GTP();
    gtp.execute(() => console.log(gtp.data));
});

app.on('window-all-closed', () => app.quit());
