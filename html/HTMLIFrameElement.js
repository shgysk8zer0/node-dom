import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';
import { DOMTokenList } from '../DOMTokenList.js';

export const HTMLIFrameElement = Document.registerElement('iframe', class HTMLIFrameElement extends HTMLElement {
	#sandbox;

	constructor() {
		super();
		this.#sandbox = new DOMTokenList();
	}

	get allow() {
		return this.getAttribute('allow');
	}

	set allow(val){
		this.setAttribute('allow');
	}

	get allowFullscreen() {
		return this.hasAttribute('allowfullscreen');
	}

	set allowFullscreen(val) {
		this.toggleAttribute('allowfullscreen', val);
	}

	get credentialless() {
		return this.hasAttribute('credentialless');
	}

	set credentialless(val) {
		this.toggleAttribute('credentialless', val);
	}

	get height() {
		return this.getAttribute('height');
	}

	set height(val) {
		this.setAttribute('height', val);
	}

	get referrerPolicy() {
		return this.getAttribute('referrerpolicy');
	}

	set referrerpolicy(val) {
		this.setAttribute('referrerpolicy', val);
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

	get srcdoc() {
		return this.getAttribute('srcdoc');
	}

	set srcdoc(val) {
		this.setAttribute('srcdoc', val);
	}

	get tagName() {
		return 'IFRAME';
	}

	get width() {
		return this.getAttribute('width');
	}

	set width(val) {
		this.setAttribute('width', val);
	}
});
