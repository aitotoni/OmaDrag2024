function drag(ev) {
    console.log("testi")
    console.log(ev.target.id)
    //1
    //ev.dataTransfer.setData("text", ev.target.innerText);
   
    //2
    ev.dataTransfer.setData("text", ev.target.id);

}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var textElement = document.createElement("div");
    textElement.innerText = data;

    //1 tällä voi tehä uusia tekstejä mallin mukaan
    //document.getElementById(ev.target.id).appendChild(textElement);
   
    //2 tällä voi id:n avulla siirtää elementin
    ev.target.appendChild(document.getElementById(data));
}

// Määritellään arvot etukäteen
var opisteet = 0;
var pisteet = 0;

function tarkista() {

    if (sessionStorage.clickcount) {
        sessionStorage.clickcount = Number(sessionStorage.clickcount) + 1;
    } 
    else {
        sessionStorage.clickcount = 1;
    }

  let textId = [];
  let windowID = [];

  document.querySelectorAll('.window').forEach(element => {
    windowID.push(element.id);
  });

  document.querySelectorAll('.text').forEach(element => {
    textId.push(element.id);
  });

  let textElement = {};

  textId.forEach((id) => {
    textElement[id] = document.getElementById(id);
  });

  let windowElement = {};

  windowID.forEach((id) => {
    windowElement[id] = document.getElementById(id);
  });


  let pisteet = 0;
  let correctPlacement = true;

  textId.forEach((textId) => {
    let textElem = textElement[textId];
    let odotettuWindowId = textId.replace('text', 'window');
    let windowElem = windowElement[odotettuWindowId];

    if (textElem && windowElem) {
      if (textElem.parentElement === windowElem) {
        pisteet++;
      } else {
        correctPlacement = false;
      }
    }
  });

  let opisteet = parseInt(sessionStorage.getItem('opisteet')) || 0;

  if (pisteet === windowID.length && correctPlacement) {
    if (sessionStorage.clickcount <= 1) {
      document.getElementById('tulos').innerHTML = "Sait tehtyä ensimmäisellä yrityksellä, saat kaksi pistettä.";
      opisteet += 2;
    } else if (sessionStorage.clickcount == 2) {
      document.getElementById('tulos').innerHTML = "Hyvä, saat pisteen.";
      opisteet++;
    } else if (sessionStorage.clickcount == 3) {
      document.getElementById('tulos').innerHTML = "Hyvin tehty.";
    } else if (sessionStorage.clickcount > 3) {
      sessionStorage.clickcount == 0;
      location.href = '../DragAndDrop.html';
    }
  } else {
    document.getElementById('popup').style.display = 'block';
    setTimeout(() => { document.getElementById('popup').style.display = 'none'; }, 5000);

    textId.forEach((textId) => {
      let textElem = textElement[textId];
      if (textElem && textElem.parentElement.id !== textId.replace('text', 'window')) {
        document.getElementById('car-container').appendChild(textElem);
      }
    });
  }

  sessionStorage.setItem('opisteet', opisteet.toString());
}



var elem = document.documentElement;

function suurenna() {
  var x = document.getElementById("screen");
  var y = document.getElementById("screen2");

  x.style.display = "none";
  y.style.display = "block";

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

function pienenna() {
  var x = document.getElementById("screen");
  var y = document.getElementById("screen2");

  x.style.display = "block";
  y.style.display = "none";

  var x = document.getElementById("screen");
  var y = document.getElementById("screen2");

  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}

var music = new Audio('wind.mp3');
var isPlaying = false;

function musiikki() {

  const image = document.getElementById('volumekuva');

  if (isPlaying) {
    music.pause();
    image.src = 'volumeon.png';
  } else {
    music.play();
    image.src = 'no-sound.png';
  }
  isPlaying = !isPlaying;
}