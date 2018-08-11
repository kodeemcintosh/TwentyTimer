
const {app, BrowserWindow, ipcMain} = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    title: 'Twenty Timer',
    // icon: __dirname + '/img/icon.png',
    width: 400,
    height: 300});
  // mainWindow.backgroundColor();
  mainWindow.setMenu(null);

  mainWindow.loadFile('index.html');

  mainWindow.show(); 

  mainWindow.focus(); 

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {

  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {

  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('alert', function () {
  mainWindow = null;
  alert = new BrowserWindow({center: true, resizable: false, width: 200, height: 150});

  alert.loadFile('alert.html');

  alert.on('dismiss', function () {
    alert = null;
  });
});

ipcMain.on('dismiss', function () {

});
