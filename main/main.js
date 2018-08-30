
const {app, BrowserWindow, ipcMain} = require('electron');

// electron startup process
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

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;
let mainBtn = null;

function init () {
  mainBtn.textContent = 'Begin';
  mainBtn.addEventListener('click', beginBtn);
}

function createWindow () {
  mainWindow = new BrowserWindow({
    title: 'Twenty Timer',
    center: true,
    resizable: false,
    // icon: __dirname + '/img/icon.png',
    width: 400,
    height: 300});
  // mainWindow.backgroundColor();
  mainWindow.setMenu(null);
  mainWindow.loadFile('index.html');

  mainWindow.show(); 

  mainWindow.focus();

  mainBtn = document.getElementByClassName('main-btn');
  init();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

ipcMain.on('alert', function () {
  // TODO: fix this to make the main window disabled while the alert window is active
  mainWindow = disabled;

});

ipcMain.on('dismiss', function () {
  // TODO: make it so that this reactivates the main window
  mainWindow = active;
  init();
});

function beginBtn() {
  endBtn();

  // twenty mintute timer
  timer(20);
}

function timer(ts) {
  ts *= 6000;

  let start = new Date().getTime();

  let stop = start + ts;

  let x = setInterval(function () {
    var distance = stop - (new Date().getTime());
    // let minutes = Math.floor(distance / 60);
    // let seconds = distance % 60;
    // let latest = 'Minuest: ' + minutes + ' and Seconds: ' + seconds;
    let latest = "yo, waddup";

    let count = document.createElement('h1');
    count.textContent = latest;
    document.getElementByClassName('warning-lbl').appendChild(count);

    if(distance === 0) {
      // send ipc message to main.js in order to close the main window
      ipcMain.send('alert');
    }
  }, 1000);
}

function endBtn() {
  mainBtn.removeEventListener('click', beginBtn);
  mainBtn.textContent = "End";
  mainBtn.addEventListener('click', function () {
    dismiss();
  });
}

