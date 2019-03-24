const { app, BrowserWindow, Menu } = require('electron');
const { Settings } = require('./settings');
// const { GTP } = require('./gtp-executor');

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Preferences...',
                click: (item, window, event) => {
                    settings.edit(window);
                }
            },
            {
                label: 'Quit',
                click: (item, window, event) => {
                    window.close();
                }
            }
        ]
    },
]

let settings = new Settings();

app.on('ready', () => {
    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
    let win = new BrowserWindow();
    win.loadFile('index.html');
    // let gtp = new GTP();
    // gtp.execute(() => console.log(gtp.data));
});

app.on('window-all-closed', () => app.quit());
