import { HTMLElement } from './HTMLElement.js';

export class HTMLUnknownElement extends HTMLElement {
	#tag;

	constructor(tag) {
		super();
		this.#tag = tag.toString().toLowerCase();
	}

	get tagName() {
		return this.#tag.toUpperCase();
	}
}
