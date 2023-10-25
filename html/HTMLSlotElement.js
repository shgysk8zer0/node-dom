import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';

export const HTMLSlotElement = Document.registerElement('slot', class HTMLSlotElement extends HTMLElement {
	constructor() {
		super('slot');
	}

	get name() {
		return this.getAttribute('name');
	}

	set name(val) {
		this.setAttribute('name', val);
	}
});
