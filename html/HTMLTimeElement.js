import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';

export const HTMLTimeElement = Document.registerElement('time', class HTMLTimeElement extends HTMLElement {
	get dateTime() {
		return this.getAttribute('datetime');
	}

	set dateTime(val){
		this.setAttribute('datetime', val);
	}

	get tagName() {
		return 'TIME';
	}
});
