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

    // Yritysten määrä:
    if (sessionStorage.clickcount) {
        sessionStorage.clickcount = Number(sessionStorage.clickcount) + 1;
    } 
    else {
        sessionStorage.clickcount = 1;
    }

    var id1 = document.getElementById("text1");
    var id2 = document.getElementById("text2");
    var id3 = document.getElementById("text3");

    if (id1.parentNode.id == "car-container" || id2.parentNode.id == "car-container" || id3.parentNode.id == "car-container") {
        document.getElementById("tulos").innerHTML = "Rahaa teksti kappaleet laatikkoihin!";
    }
    else {
        if (id1.parentNode.id == "window1") {
            pisteet++;
        }
        else if (id1.parentNode.id != "window1") {
        }
        if (id2.parentNode.id == "window2") {
            pisteet++;
        }
        else if (id2.parentNode.id != "window2") {
        }
        if (id3.parentNode.id == "window3") {
            pisteet++;
        }
        else if (id3.parentNode.id != "window3") {
        }

        if (pisteet == 3 && sessionStorage.clickcount <= 1) {
            document.getElementById("tulos").innerHTML = "Sait tehtyä ensimäisellä yrityksellä, saat kaksi pistettä.";
            opisteet = 0 + 2;
        }
        else  if (pisteet == 3 && sessionStorage.clickcount == 2) {
            document.getElementById("tulos").innerHTML = "Hyvä, saat pisteen.";
            opisteet++;
        }
        else  if (pisteet == 3 && sessionStorage.clickcount == 3) {
            document.getElementById("tulos").innerHTML = "Hyvin tehty.";
        }
        else  if (sessionStorage.clickcount > 3) {
            location.href = 'file:///C:/Users/800037026/Desktop/Peli_Projekti/DragAndDrop.html';
          
      }
        if (pisteet != 3) {
            // document.getElementById("popup").style.display = "block";
            // setTimeout(function() {document.getElementById("popup").style.display = "none";}, 5000);
            

            if (id1.parentNode.id == "window1" || id1.parentNode.id == "window2" || id1.parentNode.id == "window3") {
              document.getElementById("car-container").appendChild(id1);
            }
            if (id2.parentNode.id == "window1" || id2.parentNode.id == "window2" || id2.parentNode.id == "window3") {
              document.getElementById("car-container").appendChild(id2);
            }
            if (id3.parentNode.id == "window1" || id3.parentNode.id == "window2" || id3.parentNode.id == "window3") {
              document.getElementById("car-container").appendChild(id3);
            }
        }
    }
}

var elem = document.documentElement;

function suurenna(fileName) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
    let img = document.querySelector('#kuva');
    img.setAttribute("src", fileName);
  }
}

function pienenna() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } 
}

var music = new Audio('audio/wind.mp3');
var isPlaying = false;

function musiikki() {
  if (isPlaying) {
    music.pause();
  } else {
    music.play();
  }
  isPlaying = !isPlaying;
}