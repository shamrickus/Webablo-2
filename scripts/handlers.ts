import mouseUpdate = main.mouseUpdate; 
import mousePos = main.mousePos;
import yOffset = main.yOffset;
import xOffset = main.xOffset;
import Point = main.utilities.Point;
import debug = main.debug;

namespace main.eventHandlers{
	let mouseDown: boolean = false;
	let mouseTimeout: any;
	let keyMaps: KeyMap = <KeyMap>{ };

	interface Key{
		keyCode: number;
		key: string;
		pressed: boolean;
		pressKeyCode?: number;
	}

	interface KeyMap{
		string: Key;
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
		keyMaps[e.key] = <Key>{keyCode: e.keyCode, key: e.key, pressed: true};

		if(e.key == "d" || e.key == "D"){
			debug = !debug;
		}
	}

	function keyup(e: any): void{
		if(keyMaps[e.key] !== undefined){
			keyMaps[e.key].pressed = false;
		}
		else{
			keyMaps[e.key] = <Key>{keyCode: e.keyCode, key: e.key, pressed: false};
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