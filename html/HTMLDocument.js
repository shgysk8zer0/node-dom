import { Document } from '../Document.js';
import { DocumentType } from '../DocumentType.js';
import { HTMLHtmlElement } from './HTMLHtmlElement.js';
import { HTMLTitleElement } from './HTMLTitleElement.js';
import { HTMLBodyElement } from './HTMLBodyElement.js';
import { HTMLHeadElement } from './HTMLHeadElement.js';

export class HTMLDocument extends Document {
	#documentElement;
	#head;
	#body;
	#doctype;

	constructor() {
		super();

		this.#documentElement = new HTMLHtmlElement();
		this.#head = new HTMLHeadElement();
		this.#body = new  HTMLBodyElement();
		this.#documentElement.append(this.#head, this.#body);
		this.#doctype = new DocumentType();
		this.append(this.#doctype, this.#documentElement);
	}

	get body() {
		return this.#body;
	}

	get head() {
		return this.#head;
	}

	get doctype() {
		return this.#doctype;
	}

	get documentElement() {
		return this.#documentElement;
	}

	get title() {
		const title = [...this.childNodes].find(node => node instanceof HTMLTitleElement);

		if (title instanceof HTMLTitleElement) {
			return title.textContent;
		} else {
			return '';
		}
	}

	set title(val) {
		const current = [...this.head.childNodes].find(node => node instanceof HTMLTitleElement);

		if (current instanceof HTMLTitleElement) {
			current.textContent = val.toString();
		} else {
			const title = this.createElement('title');
			title.textContent = val.toString();
			this.head.appendChild(title);
		}
	}

	toString() {
		return `${this.doctype}${this.documentElement}`;
	}
}
