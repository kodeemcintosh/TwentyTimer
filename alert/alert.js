
let { BrowserWindow, ipcRenderer } = require('electron');

// buttons
let dismissBtn = document.getElementsByClassName('dismiss-btn');

let childWindow = null;
function createChild() {
  childWindow = new BrowserWindow({
    parent: mainWindow,
    backgroundColor: '#111116',
    center: true,
    resizable: false,
    width: 200,
    height: 150});
  childWindow.setAlwaysOnTop(true);
  childWindow.setMenu(null);
  childWindow.loadFile('alert.html');
}

ipcRenderer.on('alert', function() {

  createChild();

  autoDismiss();
  clearInterval(x);
  init();
});


function end() {
  alertWindow = null;
  init();
  clearTimeout(autoDismiss);
}

function dismiss() {
  childWindow = null;
  clearTimeout(autoDismiss);
  timer(20);
}

let autoDismiss = setTimeout(function() {
    ipcRenderer.send('dismiss');
}, 5000);
