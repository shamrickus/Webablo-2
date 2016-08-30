import mouseUpdate = main.mouseUpdate; 
import mousePos = main.mousePos;
import yOffset = main.yOffset;
import xOffset = main.xOffset;
import Point = main.utilities.Point;

namespace main.eventHandlers{
	let mouseDown: boolean = false;
	let mouseTimeout: any;
	let keyMaps: any;

	interface Key{
		keyCode: number;
		key: string;
		pressed: boolean;
		pressKeyCode?: number;
	}

	function getClickPosition(e: any): void{
	  mousePos.x = e.clientX;
	  mousePos.y = e.clientY;

	  getMouseOffset(mousePos);
	}

	function getMouseOffset(mouse: Point): void{
		if(mouse.x < xOffset){
	    	mousePos.x = -(xOffset - mouse.x);
		}
		else{
			mousePos.x-= xOffset;
		}

		if(mouse.y < yOffset){
			mousePos.y = -(yOffset - mouse.y);
		}
		else{
			mousePos.y-= yOffset;
		}

		mouseUpdate = true;
	}

	export function bindEventHandlers(): void{
		window.addEventListener("click", getClickPosition, false);
  		window.addEventListener("mousedown", mousedown, false);
  		window.addEventListener("mouseup", mouseup, false);
  		window.addEventListener("mousemove", mousemove, false);

  		window.addEventListener("keydown", keydown, false);
  		window.addEventListener("keyup", keyup, false);
	}

	function keydown(e: any): void{
		keyMaps[e.char] = <Key>{keyCode: e.keyCode, key: e.char, pressed: true};
	}

	function keyup(e: any): void{
		if(e.char in keyMaps){
			keyMaps[e.char] = false;
		}
		else{
			keyMaps[e.char] = <Key>{keyCode: e.keyCode, key: e.char, pressed: false};
		}
	}

	function mousemove(e: any): void{
		if(mouseDown){
			mousePos.x = e.clientX;
  			mousePos.y = e.clientY;

			getMouseOffset(mousePos);
		}
	}

	function mousedown(e: any): void{
		mouseDown = true;
	}

	function mouseup(e: any): void{
		mouseDown = false;
	}
}