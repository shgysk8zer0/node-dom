import { Node, Text } from './Node.js';
import { HTMLUnknownElement } from './html/HTMLUnknownElement.js';
import { DocumentFragment } from './DocumentFragment.js';
import { NodeFilter } from './NodeFilter.js';
import { TreeWalker } from './TreeWalker.js';
import { HTMLCollection } from './HTMLCollection.js';
import { Comment } from './Comment.js';
import { Attr } from './Attr.js';
import { getElementById, getElementsByTagName, getElementsByClassName, getDescendants } from './utils.js';
import { XML } from '@shgysk8zer0/consts/mimes.js';
const registry = new Map();

export class Document extends Node {
	constructor() {
		super('#document');
	}

	get characterSet() {
		const walker = this.createWalker(
			this.documentElement,
			NodeFilter.FILTER_ELEMENT,
			node => node.tagName === 'META' && node.hasAttribute('charset')
				? NodeFilter.FILTER_ACCEPT
				: NodeFilter.FILTER_SKIP
		);

		const found = walker.nextNode();

		return found instanceof Node ? found.content : 'UTF-8';
	}

	get contentType() {
		return XML;
	}

	get documentElement() {
		return this.firstElementChild;
	}

	get firstElementChild() {
		let first = null;

		for (const node of this.childNodes) {
			if (node.nodeType === Node.ELEMENT_NODE) {
				first = node;
				break;
			}
		}

		return first;
	}

	get forms() {
		return this.getElementsByTagName('form');
	}

	get links() {
		const filter = ({ tagName,  href }) =>
			(tagName === 'A' || tagName === 'AREA')
			&& (typeof href === 'string' && href.length !== 0);

		return new HTMLCollection(getDescendants(this.documentElement, filter));
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

	createAttributeNS(namespaceURI, name) {
		return new Attr(name, namespaceURI);
	}

	createComment(text) {
		return new Comment(text);
	}

	createElement(tag) {
		return Document.createElement(tag);
	}

	createElementNS(namespaceURI, name) {
		return Document.createElement(name, namespaceURI);
	}

	createDocumentFragment() {
		return new DocumentFragment();
	}

	createTextNode(text) {
		return new Text(text);
	}

	createTreeWalker(root, whatToShow = NodeFilter.SHOW_ALL, filter = null) {
		return new TreeWalker(root, whatToShow, filter);
	}

	getElementById(id) {
		return getElementById(this, id);
	}

	getElementsByClassName(className) {
		return getElementsByClassName(this, className);
	}

	getElementsByTagName(tagName) {
		return getElementsByTagName(this, tagName);
	}

	static registerElement(tag, constructor) {
		if (registry.has(tag)) {
			throw new DOMException(`<${tag}> already registered.`);
		} else {
			registry.set(tag, constructor);
			return constructor;
		}
	}

	static createElement(tag, namespaceURI) {
		if (registry.has(tag)) {
			const constructor = registry.get(tag);
			return new constructor();
		} else {
			return new HTMLUnknownElement(tag, namespaceURI);
		}
	}
}
