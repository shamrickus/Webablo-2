

namespace main{
import Point = main.utilities.Point;
import Vector =  main.utilities.Vector;
import multiple = main.utilities.multiple;
import normalize = main.utilities.normalize;
import directionMapping = main.utilities.directionMapping;
import calculateDirection = main.utilities.calculateDirection;

export var step: number = 0;
export var baseStep: number = 0;
export var tileGraphics: any[] = [];
export var ctx;
export var ctxWidth: number, ctxHeight: number;
export var xOffset: number, yOffset: number;
export var mousePos = <Point>{x:0, y:1};
export var origin = <Point>{x:0, y:0};
export var axis = <Point>{x: 0, y:1};
export var curDir: string = "S";
export var mouseUpdate: boolean = false;
export var map: any[];

export var debug = true;

function debugMap(): void{
  for(var i = 0; i < 100; ++i){
    for(var j = 0; j < 100; ++j){
      map[i][j] = 0;
    }
  }
}

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

          xOffset = ctxWidth / 2;
          yOffset = ctxHeight / 2;
          
          translate();

          setInterval(function(){
            drawMap();
          }, 62.5);
      }
    }
  }
}

function translate(){
  ctx.translate(xOffset, yOffset);
}

function drawMap(): void {
  let dir = curDir;
  if(mouseUpdate == true){
    dir = calculateDirection(mousePos, origin, axis);
    mouseUpdate = false;
  }

  if(dir != curDir){
    curDir = dir;
    for(var key in directionMapping){
      if(dir == directionMapping[key]){
        baseStep = +key * 16;
      }
    }
    step = baseStep;
  }
  else{
    step+=1;
    if(step > baseStep + 15){
      step = baseStep;
    }
  }

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctxWidth, ctxHeight);
  translate();

  ctx.translate(-(tileGraphics[0].width / 2), -(tileGraphics[0].height / 2));
  ctx.drawImage(tileGraphics[step],0,0);    
  ctx.translate((tileGraphics[0].width / 2), (tileGraphics[0].height / 2));

  if(debug){
    debugMap();
    debugClick();
  }
}

function debugClick(): void{
  let direction = <Vector>{
      i: mousePos.x - origin.x,
      j: mousePos.y - origin.y
    };
    direction = normalize(direction);
    let south = <Vector>{
      i: axis.x - origin.x,
      j: axis.y - origin.y
    };
    south = normalize(south);

    ctx.save();
    ctx.strokeStyle= '#FF0000';
    drawLine(direction, 400);
    drawLine(south, 400);
    ctx.restore();
}

function debugMap(): void{
  ctx.save();
  ctx.rotate(Math.PI / 16);
  for(var i = 0; i < 16; i+=1){
    if(i != 0) ctx.rotate(Math.PI / 8);
    drawLine(<Vector>{i: 0, j: 300});
  }
  ctx.restore();
}

function drawLine(p1: Vector, scale?: number): void{
  if(scale == undefined) scale = 1;
  p1 = multiple(p1, scale);

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(p1.i, p1.j);
  ctx.stroke();
}



function init(): void{
  // Remove Event Listener and load images.
  window.removeEventListener('load', init);
  main.eventHandlers.bindEventHandlers();

  ctx = document.getElementById('mainCanvas')['getContext']('2d');
  ctxWidth = ctx.canvas.clientWidth;
  ctxHeight = ctx.canvas.clientHeight;

  loadImg();
  
};
// Add Event Listener to dectect when page has fully loaded.
window.addEventListener('load', init, false);

}