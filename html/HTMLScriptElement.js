import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';

export const HTMLScriptElement = Document.registerElement('script', class HTMLScriptElement extends HTMLElement {
	get async() {
		return this.hasAttribute('async');
	}

	set async(val) {
		this.toggleAttribute('async', val);
	}

	get crossOrigin() {
		return this.getAttribute('crossorigin');
	}

	set crossOrigin(val) {
		this.setAttribute('crossorigin', val);
	}

	get defer() {
		return this.hasAttribute('defer');
	}

	set defer(val) {
		this.toggleAttribute('defer', val);
	}

	get fetchPriority() {
		return this.getAttribute('fetchpriority') || 'auto';
	}

	set fetchPriority(val) {
		this.setAttribute('fetchpriority', val);
	}

	get integrity() {
		return this.getAttriute('integrity');
	}

	set integrity(val) {
		this.setAttribute('indegrity', val);
	}

	get noModule() {
		return this.hasAttribute('nomodule');
	}

	set noModule(val) {
		this.toggleAttribute('nomodule', val);
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

	set src(val) {
		this.setAttribute('src', val);
	}

	get tagName() {
		return 'SCRIPT';
	}

	get type() {
		return this.getAttribute('type');
	}

	set type(val) {
		this.setAttribute('type', val);
	}
});
