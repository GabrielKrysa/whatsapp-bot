const { app, BrowserWindow, session } = require('electron')
const ipc = require('electron').ipcMain

let mainWindow

function createWindow() {
    session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
        details.requestHeaders['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.116';
        callback({ cancel: false, requestHeaders: details.requestHeaders });
    });

    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: false,
        }
    })

    let number = ''
    let msg = ''

    mainWindow.loadURL('https://web.whatsapp.com/send?phone=' + number + '&text=' + msg);

    mainWindow.webContents.on('did-finish-load', function() {
        mainWindow.webContents.executeJavaScript(`console.log('Website loaded succesfully')`)
        mainWindow.webContents.executeJavaScript(`console.log('ABRIU')`)
        sleep(100);
        mainWindow.webContents.executeJavaScript('function time() { var btnsend = document.getElementsByClassName("_3M-N-")[0]; btnsend.click(); } setInterval(time, 5000);');
    });


    mainWindow.webContents.openDevTools()


    mainWindow.on('closed', function() {
        mainWindow = null
    })

    ipc.on('whatsapp-is-ready', function(event, args) {
        mainWindow.webContents.send('bot-ready')
    })

    mainWindow.webContents.on('whatsapp-is-ready', function(event, args) {
        mainWindow.webContents.send('bot-ready')
    })

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }
}

app.on('ready', createWindow)

app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

app.on('window-all-closed', function() {

    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    if (mainWindow === null) {
        createWindow()
    }
})
