import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';
import { DOMTokenList } from '../DOMTokenList.js';

export const HTMLIFrameElement = Document.registerElement('iframe', class HTMLIFrameElement extends HTMLElement {
	#sandbox;

	constructor() {
		super();
		this.#sandbox = new DOMTokenList();
	}

	get sandbox() {
		return this.#sandbox;
	}

	get src() {
		return this.getAttribute('src');
	}

	set src(val) {
		this.setAttribute('src', val);
	}

	get tagName() {
		return 'IFRAME';
	}
});
