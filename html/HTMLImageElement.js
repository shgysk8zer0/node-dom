import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';

export const HTMLImageElement = Document.registerElement('img', class HTMLImageElement extends HTMLElement {
	constructor() {
		super('img');
	}

	get alt() {
		return this.getAttribute('alt');
	}

	set alt(val) {
		this.setAttribute('alt', val);
	}

	get crossOrigin() {
		return this.getAttribute('crossorigin');
	}

	set crossOrigin(val) {
		this.setAttribute('crossorigin', val);
	}

	get height() {
		if (this.hasAttribute('height')) {
			return parseInt(this.getAttribute('height'));
		} else {
			return undefined;
		}
	}

	set height(val) {
		if (Number.isFinite(val)) {
			this.setAttribute('height', val.toString());
		} else if (! Number.isNaN(val)) {
			this.height = parseInt(val);
		}
	}

	get loading() {
		return this.getAttribute('loading') ?? 'auto';
	}

	set loading(val) {
		this.setAttribute('loading', val);
	}

	get naturalHeight() {
		return 0;
	}

	get naturalWidth() {
		return 0;
	}

	get referrerPolicy() {
		return this.getAttribute('referrerpolicy');
	}

	set referrerPolicy(val) {
		this.setAttribute('referrerpolicy', val);
	}

	get src() {
		const base = this.baseURI;

		if (base.length !== 0) {
			return new URL(this.getAttribute('src'), base).href;
		}  else {
			return this.getAttribute('src');
		}
	}

	set src(val){
		this.setAttribute('src', val);
	}

	get width() {
		if (this.hasAttribute('width')) {
			return parseInt(this.getAttribute('width'));
		} else {
			return undefined;
		}
	}

	set width(val) {
		if (Number.isFinite(val)) {
			this.setAttribute('width', val.toString());
		} else if (! Number.isNaN(val)) {
			this.width = parseInt(val);
		}
	}

	decode() {
		return Promise.resolve();
	}
});
