import { HTMLImageElement } from './HTMLImageElement.js';

export class Image extends HTMLImageElement {
	constructor(width, height) {
		super();

		if (typeof width !== 'undefined') {
			this.width = width;
		}

		if (typeof height !== 'undefined') {
			this.height = height;
		}
	}
}
