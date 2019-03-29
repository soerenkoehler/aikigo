const { app, BrowserWindow, Menu } = require('electron');
const { localFile } = require('./util');

app.on('ready', () => {
    Menu.setApplicationMenu(null);
    let win = new BrowserWindow({
        show: false,
        width: 1024,
        height: 800,
        minWidth: 1024,
        minHeight: 800,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: false,
            preload: localFile('main-preload.js')
        }
    });
    win.webContents.openDevTools();
    win.once('ready-to-show', () => {
        win.show()
    });
    win.loadFile(localFile('main.html'));
});

app.on('window-all-closed', () => app.quit());
