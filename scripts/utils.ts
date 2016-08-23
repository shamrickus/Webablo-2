namespace utilities{
  const PI = <number>3.14159;

  export class Point{
   x: number;
   y: number;

   constructor(){
     this.x = 0;
     this.y = 0;
   } 
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

  export function calculateDirection(p1: Point, p2: Point, p3: Point): string{
    let angle = find_angle(p1, p2, p3);
    return (angleMap(angle));
  }

  //BA and BC
  function find_angle(A: Point,B: Point,C: Point): number {
    console.log(A, B, C);

    var m1 = (B.y - A.y) / (B.x - A.x);
    var m2 = (B.y - C.y) / (B.x - C.x);

    //tan^-1((m1-m2)/(1+m1*m2))
    var radians = Math.atan((m1 - m2) / (1 + m1*m2));
    var degrees = radians * 180/PI;

    return degrees;
  }

  function angleMap(angle: number): string{
    if(angle > 360 || angle < 0) angle = angle % 360;
    return directionMapping[Math.floor((angle / (360 / 16)))]
  }
}

