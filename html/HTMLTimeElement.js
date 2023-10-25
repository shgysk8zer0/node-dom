import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';

export const HTMLTimeElement = Document.registerElement('time', class HTMLTimeElement extends HTMLElement {
	constructor() {
		super('time');
	}
	get dateTime() {
		return this.getAttribute('datetime');
	}

	set dateTime(val){
		this.setAttribute('datetime', val);
	}
});
