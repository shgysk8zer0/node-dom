import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';
import { DOMTokenList } from '../DOMTokenList.js';

export const HTMLLinkElement = Document.registerElement('link', class HTMLLinkElement extends HTMLElement {
	constructor() {
		super();
	}

	get href() {
		return this.getAttribute('href');
	}

	set href(val) {
		this.setAttribute('href', val);
	}

	get media() {
		return this.getAttribute('media');
	}

	set media(val) {
		this.setAttribute('media', val);
	}

	get rel() {
		return this.getAttribute('rel');
	}

	set rel(val) {
		this.setAttribute('rel', val);
	}

	get relList() {
		return new DOMTokenList(this, 'rel');
	}

	get tagName() {
		return 'LINK';
	}
});
