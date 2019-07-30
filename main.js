// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

app.on('ready', function() {
    win = new BrowserWindow({ width: 800, height: 600 });
    var phone = "554299524440";
    var message = "BLA BLA BLA"
    win.loadURL('https://web.whatsapp.com/send?php' + phone + '$text=' + message, { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36' });
    win.webContents.executeJavaScript('var input = document.getElementsByClassName("_3u328")[0];    var send = document.getElementsByClassName("_3M-N-")[0]; if (typeof input !== "undefined" && input.textContent) {    send.click();}  ');

    win.on('closed', () => {
        win = null
    });
});