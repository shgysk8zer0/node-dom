import { NodeList } from './NodeList.js';
import { getDescendants } from './utils.js';

export class Node extends EventTarget {
	#children;
	#parent;

	constructor() {
		super();
		this.#children = [];
		this.#parent = null;
	}

	get baseURI() {
		if (this.nodeType === Node.DOCUMENT_NODE) {
			let base = '';

			for (const el of getDescendants(this.documentElement)) {
				if (el.tagName.toUpperCase() === 'BASE' && el.hasAttribute('href')) {
					base = el.href;
					break;
				}
			}

			return base;
		} else if  (this.isConnected) {
			return this.ownerDocument.baseURI;
		}  else {
			return '';
		}
	}

	get childNodes() {
		return new NodeList(this.#children);
	}

	get isConnected() {
		const owner = this.ownerDocument;

		return owner instanceof Node && owner.nodeType === Node.DOCUMENT_NODE;
	}

	get ownerDocument() {
		let parent = this.parentNode;

		if (! (parent instanceof Node)) {
			return null;
		} else if (parent.nodeType !== Node.DOCUMENT_NODE) {
			return parent.ownerDocument;
		} else {
			return parent;
		}
	}

	get nextSibling() {
		const parent = this.parentNode;

		if (parent instanceof Node) {
			const index = parent.#children.indexOf(this);
			return index === -1 ? null : parent.#children[index + 1] || null;
		} else {
			return null;
		}
	}

	get parentElement() {
		let parent = this.#parent;

		if (! (parent instanceof Node)) {
			return null;
		} else if (parent.nodeType !== Node.ELEMENT_NODE) {
			return parent.parentElement;
		} else {
			return parent;
		}
	}

	get parentNode() {
		return this.#parent;
	}

	get previousSibling() {
		const parent = this.parentNode;

		if (parent instanceof Node) {
			const index = parent.#children.indexOf(this);
			return index === -1 ? null : parent.#children[index - 1] || null;
		} else {
			return null;
		}
	}

	append(...nodes) {
		nodes.forEach(node => {
			if (! (node instanceof Node)) {
				this.appendChild(new Text(node));
			} else {
				this.appendChild(node);
			}
		});
	}

	appendChild(child) {
		if (! (child instanceof Node)) {
			throw new TypeError('appendChild needs a Node.');
		} else if (child.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
			this.#children.push(...child.childNodes);
		} else if (child.nodeType === Node.ATTRIBUTE_NODE) {
			throw new DOMException('Node.appendChild: May not add an Attribute as a child');
		} else {
			child.#parent = this;
			this.#children.push(child);
		}
	}

	getRootNode() {
		const owner = this.ownerDocument;

		if (! (owner instanceof Node)) {
			return null;
		}  else {
			let root = null;

			for (const node of owner.childNodes) {
				if (node instanceof Node && node.nodeType === Node.ELEMENT_NODE) {
					root = node;
					break;
				}
			}

			return root;
		}
	}

	hasChildNodes() {
		return this.#children.length !== 0;
	}

	remove() {
		const parent = this.parentNode;

		if (parent instanceof Node) {
			parent.removeChild(this);
		}
	}

	removeChild(child) {
		const index = this.#children.indexOf(child);

		if (index !== -1) {
			// @TODO Update #parent
			this.#children[index].#parent = null;
			delete this.#children[index];
		}
	}

	replaceChild(newChild, oldChild) {
		const index = this.#children.indexOf(oldChild);

		if (index !== -1) {
			// @TODO update #parent
			oldChild.#parent = null;
			newChild.#parent = this;
			this.#children[index] = newChild;
		}
	}

	replaceChildren(...nodes) {
		this.#children.forEach(child => child.parent = null);
		this.#children = nodes.map(node => {
			if (node instanceof Node) {
				node.#parent = this;
				return node;
			} else {
				const child = new Text(node);
				child.#parent = this;
				return child;
			}
		});
	}

	static ELEMENT_NODE = 1;

	static ATTRIBUTE_NODE = 2;

	static TEXT_NODE = 3;

	static CDATA_SECTION_NODE = 4;

	static PROCESSING_INSTRUCTION_NODE = 7;

	static COMMENT_NODE = 8;

	static DOCUMENT_NODE = 9;

	static DOCUMENT_TYPE_NODE = 10;

	static DOCUMENT_FRAGMENT_NODE = 11;
}

// Exporting from here to avoid circular dependencies
export class Text extends Node {
	#text;

	constructor(str) {
		super();
		this.#text = str.toString();
	}

	toString() {
		return this.#text;
	}

	get nodeType() {
		return Node.TEXT_NODE;
	}

	get wholeText() {
		return this.#text;
	}
}
