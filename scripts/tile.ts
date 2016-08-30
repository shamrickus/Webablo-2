namespace main.tile{
	export const tileWidth: number = 160;
	export const tileHeight: number = 80;

	export class Tile{
		width: number = tileWidth;
		height: number = tileHeight;
		img: HTMLImageElement;

		constructor(img: HTMLImageElement){
			this.img = img;
		}
	}
}