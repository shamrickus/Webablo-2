import directionMapping = utilities.directionMapping;
import calculateDirection = utilities.calculateDirection;
import Point = utilities.Point;

let step = 0;
let baseStep = 0;
let tileGraphics = [];
let ctx;
let mousePos = <Point>{x:0, y:1};
let origin = <Point>{x:0, y:0};
let axis = <Point>{x: 0, y:1};
let curDir = "S";

function loadImg(): void{
  console.log("Building")
  let baseDir = "sprites_extracted/Paladin/";
  let tileGraphicsToLoad = [];

  for(let i = 0; i < 16; ++i){
    let direction = directionMapping[i];
    for (let j = 0; j < 16; ++j){
      tileGraphicsToLoad.push(baseDir + "Paladin-" + j + "-" + direction + ".png");
    }
  }
  console.log("Begin load...");
  let tileGraphicsLoaded = 0;
  for (let i = 0; i < tileGraphicsToLoad.length; i++) {
    tileGraphics[i] = new Image();
    tileGraphics[i].src = tileGraphicsToLoad[i];
    tileGraphics[i].onload = function() {
      // Once the image is loaded increment the loaded graphics count and check if all images are ready.
      tileGraphicsLoaded++;
      if (tileGraphicsLoaded === tileGraphicsToLoad.length) {
          console.log("Done loading");
          setInterval(function(){
            drawMap();
          }, 62.5);
      }
    }
  }
}

function drawMap(): void {
  ctx = document.getElementById('mainCanvas')['getContext']('2d');
  // create the canvas context
  ctx.clearRect(0,0,500,500);

  let dir = calculateDirection(mousePos, origin, axis);
  ctx.drawImage(tileGraphics[step],0,0);    
  console.log(dir, curDir);
  if(dir != curDir){
  }
  else{
    step+=1;
    if(step > baseStep + 15){
      step = baseStep;
    }
  }
}


function getClickPosition(e: any): void{
  mousePos.x = e.clientX;
  mousePos.y = e.clientY;
}

function init(): void{
  // Remove Event Listener and load images.
  window.removeEventListener('load', init);
  window.addEventListener("click", getClickPosition, false);

  loadImg();
};
// Add Event Listener to dectect when page has fully loaded.
window.addEventListener('load', init, false);