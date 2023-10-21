import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';
import { DOMTokenList } from '../DOMTokenList.js';

export const HTMLLinkElement = Document.registerElement('link', class HTMLLinkElement extends HTMLElement {
	#relList;

	constructor() {
		super();
		this.#relList = new DOMTokenList();
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
		return this.#relList.value;
	}

	set rel(val) {
		this.#relList.remove(...this.#relList.values());
		this.#relList.add(...val.split(' '));
	}

	get relList() {
		return this.#relList;
	}

	get tagName() {
		return 'LINK';
	}
});
