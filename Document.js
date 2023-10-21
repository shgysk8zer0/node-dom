import { Node,  Text } from './Node.js';
import { HTMLUnknownElement } from './html/HTMLUnknownElement.js';
import { DocumentFragment } from './DocumentFragment.js';
import { HTMLCollection } from './HTMLCollection.js';
import { Attr } from './Attr.js';
import { getDescendants } from './utils.js';
import { XML } from '@shgysk8zer0/consts/mimes.js';
const registry = new Map();

export class Document extends Node {
	get characterSet() {
		let charset = 'UTF-8';

		for (const el of getDescendants(this.documentElement)) {
			if (el.tagName === 'META' && el.hasAttribute('charset')) {
				charset = el.charset;
				break;
			}
		}

		return charset;
	}

	get contentType() {
		return XML;
	}

	get forms() {
		return this.getElementsByTagName('form');
	}

	get links() {
		return new HTMLCollection(getDescendants(this.documentElement, ({ tagName, href }) => {
			return (tagName.toLowerCase() === 'a' || tagName.toLowerCase() === 'area') && href !== '';
		}));
	}

	get nodeType() {
		return Node.DOCUMENT_NODE;
	}

	get readyState() {
		return 'loading';
	}

	get scripts() {
		return this.getElementsByTagName('script');
	}

	createAttribute(name){
		return new Attr(name);
	}

	createElement(tag) {
		return Document.createElement(tag);
	}

	createDocumentFragment() {
		return new DocumentFragment();
	}

	createTextNode(text) {
		return new Text(text);
	}

	getElementById(id) {
		let found = null;

		for (const child of getDescendants(this.documentElement)) {
			if (child.id === id) {
				found = child;
				break;
			}
		}

		return found;
	}

	getElementsByClassName(names) {
		const classList = names.trim().split(' ').filter(str => str.length !== 0);

		// Better for performance
		if (classList.length === 1) {
			return new HTMLCollection(getDescendants(this.documentElement, el => el.classList.includes(classList[0])));
		} else {
			return new HTMLCollection(getDescendants(this.documentElement, el => classList.every(name => el.classList.includes(name))));
		}
	}

	getElementsByTagName(tagName) {
		const tag = tagName.toLowerCase();
		return new HTMLCollection(getDescendants(this.documentElement, el  => el.tagName.toLowerCase() === tag));
	}

	static registerElement(tag, constructor) {
		if (registry.has(tag)) {
			throw new DOMException(`<${tag}> already registered.`);
		} else {
			registry.set(tag, constructor);
			return constructor;
		}
	}

	static createElement(tag) {
		if (registry.has(tag)) {
			const constructor = registry.get(tag);
			return new constructor();
		} else {
			return new HTMLUnknownElement(tag);
		}
	}
}
