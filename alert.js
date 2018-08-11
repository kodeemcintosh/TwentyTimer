
let { ipcRenderer } = require('electron');

// buttons
let beginBtn = document.getElementById('beginBtn');
let dismissBtn = document.getElementById('dismissBtn');
let endBtn = document.getElementById('endBtn');

function init() {
  endBtn.className = "invisible";

  beginBtn.addEventListener('click', function () {
    // twenty mintute timer
    timer(20);
  });

  dismissBtn.addEventListener('click', function () {
    dismiss();
  });
}

init();


function timer(ts) {
  // reveal end button
  endBtn.className = '';

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
    count.value = latest;
    document.getElementById('dismiss-counter').appendChild(count);

    if(distance === 0) {
      ipcRenderer.send('alert');
      autoDismiss();
      clearInterval(x);
      init();
    }
  }, 1000);
}

function dismiss() {
  endButton.className = 'invisible';
  ipcRenderer.send('dismiss');
  clearTimeout(autoDismiss);
}


let autoDismiss = setTimeout(function() {
    ipcRenderer.send('dismiss');
}, 300000);
