import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';

export const HTMLBaseElement = Document.registerElement('base', class HTMLBaseElement extends HTMLElement {
	constructor() {
		super('base');
	}

	get href() {
		return  this.getAttribute('href');
	}

	set href(val) {
		this.setAttribute('href', val);
	}
});
