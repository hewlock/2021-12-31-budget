const isDev = require('electron-is-dev');
const path = require('path');

const {
    BrowserWindow,
    app,
} = require('electron');

const {
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS,
    default: installExtension,
} = require('electron-devtools-installer');

function install(ext) {
    installExtension(ext)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));
}

function createWindow() {
    const win = new BrowserWindow({
        width: 950,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        }
    });

    if (isDev) {
        win.loadURL('http://localhost:3000');
        win.webContents.openDevTools({ mode: 'detach' });
        install(REDUX_DEVTOOLS);
        install(REACT_DEVELOPER_TOOLS);
    }
    else {
        win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
    }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
