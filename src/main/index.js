import {app, BrowserWindow} from 'electron'

if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

function createWindow() {
    mainWindow = new BrowserWindow({
        height: 600,
        useContentSize: true,
        width: 1000,
        frame: false,
        minHeight: 580,
        minWidth: 980,
    });

    mainWindow.setMenu(null);

    mainWindow.loadURL(winURL);

    mainWindow.on('closed', () => {
        mainWindow = null
    });

    require('./app');   //
    require('./setting');
    require('./update');
    require('./autoUpdate');
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
});