const { app, BrowserWindow, Menu } = require('electron');
const { Settings } = require('./settings');
// const { GTP } = require('./gtp-executor');

let settings = new Settings();

app.on('ready', () => {
    Menu.setApplicationMenu(null);
    let win = new BrowserWindow();
    // win.webContents.openDevTools();
    win.loadFile('main.html');
    // let gtp = new GTP();
    // gtp.execute(() => console.log(gtp.data));
});

app.on('window-all-closed', () => app.quit());
