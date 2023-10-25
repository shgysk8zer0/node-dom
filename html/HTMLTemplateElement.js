import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';
import { DocumentFragment } from '../DocumentFragment.js';

export const HTMLTemplateElement = Document.registerElement('template', class HTMLTemplateElement extends HTMLElement {
	#content;

	constructor() {
		super('template');
		this.#content = new DocumentFragment();
	}

	get content() {
		return this.#content;
	}
});
