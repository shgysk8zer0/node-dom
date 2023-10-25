import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';
import { FORM_URL_ENCODED } from '@shgysk8zer0/consts/mimes.js';

export const HTMLFormElement = Document.registerElement('form', class HTMLFormElement extends HTMLElement {
	constructor() {
		super('form');
	}

	get action () {
		const base = this.baseURI;

		if (base.length !== 0) {
			return new URL(this.getAttribute('action'), base).href;
		}  else {
			return this.getAttribute('action');
		}
	}

	set action(val) {
		this.setAttribute('action', val);
	}

	get encoding()  {
		return this.enctype;
	}

	set encoding(val) {
		this.enctype = val;
	}

	get enctype() {
		return this.getAttribute('enctype') || FORM_URL_ENCODED;
	}

	set enctype(val) {
		this.setAttribute('enctype', val);
	}

	get method() {
		return this.getAttribute('method') || 'get';
	}

	set method(val)  {
		this.setAttribute('method', val);
	}

	get name() {
		return this.getAttribute('name');
	}

	set name(val) {
		this.setAttribute('name', val);
	}

	get target() {
		return this.getAttribute('target');
	}

	set target(val) {
		this.setAttribute('target', val);
	}
});
