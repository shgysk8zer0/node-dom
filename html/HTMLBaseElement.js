import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';

export const HTMLBaseElement = Document.registerElement('base', class HTMLBaseElement extends HTMLElement {
	get href() {
		return  this.getAttribute('href');
	}

	set href(val) {
		this.setAttribute('href', val);
	}

	get tagName() {
		return 'BASE';
	}
});
