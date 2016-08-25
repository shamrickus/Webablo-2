namespace main.utilities{
  import debug = main.debug;

  export class Point{
   x: number;
   y: number;

   constructor(){
     this.x = 0;
     this.y = 0;
   } 
  }

  export class Vector{
    i: number;
    j: number;

    constructor(){
      this.i = 0;
      this.j = 0;
    }
  }

  export function magnitude(vec: Vector): number{
    return Math.sqrt(dot(vec, vec));
  }

  export function dot(vec: Vector, other: Vector): number{
     return vec.i * other.i + vec.j * other.j;
  }

  export function multiple(vec: Vector, num: number): Vector{
    vec.i *= num;
    vec.j *= num;

    return vec;
  }

  export function divide(vec: Vector, num: number): Vector{
    vec.i = vec.i/num;
    vec.j = vec.j/num;

    return vec;
  }

  export function normalize(vec: Vector): Vector{
    return divide(vec, magnitude(vec));
  }

  export const directionMapping = {
    0:   "S",
    1:   "SSW",
    2:   "SW",
    3:   "WSW",
    4:   "W",
    5:   "WNW",
    6:   "NW",
    7:   "NNW",
    8:   "N",
    9:   "NNE",
    10:  "NE",
    11:  "ENE",
    12:  "E",
    13:  "ESE",
    14:  "SE",
    15:  "SSE"
  }

  export function calculateDirection(A: Point, B: Point, C: Point): string{
    let direction = <Vector>{
      i: A.x - B.x,
      j: A.y - B.y
    };
    //direction = normalize(direction);
    let south = <Vector>{
      i: C.x - B.x,
      j: C.y - B.y
    };
    //south = normalize(south);

    let angle = findAngle(direction, south);

    if(debug){
      document.getElementById("angle").innerHTML = "Angle: " + angle as string;
      document.getElementById("vector").innerHTML = "I: " + direction.i + ", J: " + direction.j;
    }

    return (angleMap(angle));
  }

  //BA and BC
  function findAngle(v1: Vector, v2: Vector): number {
    var radians = Math.acos(dot(v1, v2) / (magnitude(v1) * magnitude(v2)));
    var degrees = radians * 180/Math.PI;

    if(v1.i > 0){
      if(v1.j > 0){
        degrees = 360 - degrees;
      }
      else{
        degrees = 180 - degrees + 180;
      }
    }
    return degrees;
  }

  function angleMap(angle: number): string{
    if(angle > 360 || angle < 0) angle = angle % 360;
    return directionMapping[Math.round((angle / (360 / 16)))]
  }
}

