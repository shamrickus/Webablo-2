import mouseUpdate = main.mouseUpdate; 
import mousePos = main.mousePos;
import yOffset = main.yOffset;
import xOffset = main.xOffset;

namespace main.eventHandlers{
	

	function getClickPosition(e: any): void{
	  mousePos.x = e.clientX;
	  if(mousePos.x < xOffset){
	    mousePos.x = -(xOffset - mousePos.x);
	  }
	  else{
	    mousePos.x-= xOffset;
	  }

	  mousePos.y = e.clientY;
	  if(mousePos.y < yOffset){
	    mousePos.y = -(yOffset - mousePos.y);
	  }
	  else{
	    mousePos.y-= yOffset;
	  }

	  mouseUpdate = true;
	}

	export function bindEventHandlers(): void{
		window.addEventListener("click", getClickPosition, false);
  		window.addEventListener("mousedown", getClickPosition, true);
	}
}