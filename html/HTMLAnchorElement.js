import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';
import { DOMTokenList } from '../DOMTokenList.js';

export const HTMLAnchorElement = Document.registerElement('a', class HTMLAnchorElement extends HTMLElement {
	constructor() {
		super();
	}

	get download() {
		return this.getAttribute('download');
	}

	set download(val) {
		this.setAttribute('download', val);
	}

	get href() {
		const base = this.baseURI;

		if (base.length !== 0) {
			return new URL(this.getAttribute('href'), base).href;
		}  else {
			return this.getAttribute('href');
		}
	}

	set href(val) {
		this.setAttribute('href', val);
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
		return 'A';
	}

	get target(){
		return this.getAttribute('target');
	}

	set target(val) {
		this.setAttribute('target', val);
	}
});
