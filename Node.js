import { NodeList } from './NodeList.js';
import { getDescendants } from './utils.js';

export class Node extends EventTarget {
	#nodeName;
	#namespaceURI;
	#children;
	#parent;
	#nodeValue;

	constructor(nodeName, namespaceURI) {
		super();
		this.#children = [];
		this.#parent = null;
		this.#nodeValue = null;

		if (typeof nodeName === 'string')  {
			this.#nodeName = nodeName;
		} else {
			this.#nodeName = '';
		}

		if (typeof namespaceURI === 'string') {
			this.#namespaceURI = namespaceURI;
		} else {
			this.#namespaceURI = null;
		}
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

	get firstChild() {
		return this.hasChildNodes() ? this.#children[0] : null;
	}

	get isConnected() {
		const owner = this.ownerDocument;

		return owner instanceof Node && owner.nodeType === Node.DOCUMENT_NODE;
	}

	get lastChild() {
		return this.hasChildNodes() ? this.#children[this.#children.length - 1] : null;
	}

	get localName() {
		const parts = this.nodeName.split(':');

		switch(parts.length) {
			case 0: return '';
			case 1: return parts[0];
			default: return parts[1];
		}
	}

	get namespaceURI() {
		return this.#namespaceURI;
	}

	get nodeName() {
		return this.#nodeName;
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

	get nodeValue() {
		return this.#nodeValue;
	}

	set nodeValue(val) {
		if (val === null || typeof val === 'undefined') {
			this.#nodeValue = '';
		} else {
			this.#nodeValue = val.toString();
		}
	}

	get parentNode() {
		return this.#parent;
	}

	set parentNode(val) {
		if (! (val instanceof Node || val === null)) {
			throw new TypeError('parentNode must be a Node.');
		} else {
			this.#parent = val;
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

	get prefix() {
		const parts = this.nodeName.split(':');
		return parts.length < 2 ? null : parts[0];
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

	get textContent() {
		return this.nodeValue || '';
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

	cloneNode(deep = false) {
		const clone = new this.constructor();
		clone.#nodeName = this.#nodeName;
		clone.#namespaceURI = this.#namespaceURI;
		clone.#nodeValue = this.#nodeValue;

		if (deep) {
			clone.#children = this.#children.map(node => node.cloneNode(true));
		}

		return clone;
	}

	compareDocumentPosition(otherNode) {
		if (! (otherNode instanceof Node)) {
			throw new TypeError('Node.compareDocumentPosition: Argument 1 does not implement interface Node.');
		} else if (this.isSameNode(otherNode)) {
			return 0;
		} else {
			let bitmask = 0;

			if (! (this.isConnected && this.ownerDocument.isSameNode(otherNode.ownerDocument))) {
				bitmask |= Node.DOCUMENT_POSITION_DISCONNECTED;
			}

			if (this.contains(otherNode)) {
				bitmask |= Node.DOCUMENT_POSITION_CONTAINED_BY ;
			} else if (otherNode.contains(this)) {
				bitmask |= Node.DOCUMENT_POSITION_CONTAINS;
			}

			return bitmask;
		}
	}

	contains(otherNode) {
		let found = false;

		for (const child of this.childNodes) {
			if (child.isSameNode(otherNode)) {
				found = true;
				break;
			}
		}

		if (! found) {
			for (const child of this.childNodes) {
				if (child.contains(otherNode)) {
					found = true;
					break;
				}
			}
		}

		return found;
	}

	getRootNode() {
		const owner = this.ownerDocument;

		if (! (owner instanceof Node)) {
			return null;
		}  else {
			return owner.documentElement;
		}
	}

	hasChildNodes() {
		return this.#children.length !== 0;
	}

	insertBefore(newNode, referenceNode) {
		if (! (newNode instanceof Node)) {
			throw new TypeError('Node.insertBefore: Argument 1 does not implement interface Node.');
		} else if (referenceNode instanceof Node) {
			const index = this.#children.indexOf(referenceNode);
			newNode.#parent = this;
			this.#children.splice(index, 0, newNode);
		} else {
			this.appendChild(newNode);
		}
	}

	// This is overly expensive, but I don't think it can be improved much
	isEqualNode(otherNode) {
		return otherNode instanceof Node
			&& otherNode.nodeType === this.nodeType
			&& otherNode.nodeName === this.nodeName
			&& otherNode.namespaceURI === this.namespaceURI
			&& otherNode.nodeValue === this.nodeValue
			&& otherNode.childNodes.length == this.childNodes.length
			&& [...otherNode.childNodes].every(
				(child, i) => this.#children[i].isEqualNode(child)
			);
	}

	isSameNode(otherNode) {
		return this === otherNode;
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
		this.#children.forEach(child => child.parentNode = null);
		this.#children = nodes.map(node => {
			if (node instanceof Node) {
				node.parentNode = this;
				return node;
			} else {
				const child = new Text(node);
				child.parentNode = this;
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

	static DOCUMENT_POSITION_DISCONNECTED = 1;

	static DOCUMENT_POSITION_PRECEDING = 2;

	static DOCUMENT_POSITION_FOLLOWING = 4;

	static DOCUMENT_POSITION_CONTAINS = 8;

	static DOCUMENT_POSITION_CONTAINED_BY = 16;

	static DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 32;
}

// Exporting from here to avoid circular dependencies

export class CharacterData extends Node {
	get length() {
		return this.data.length;
	}

	get data() {
		return this.nodeValue || '';
	}

	set data(val) {
		this.nodeValue = val;
	}

	get nodeType() {
		return Node.TEXT_NODE;
	}
}

export class Text extends CharacterData {
	constructor(str) {
		super('#text');
		this.data = str;
	}

	toString() {
		return this.data;
	}

	get wholeText() {
		return this.data;
	}
}
