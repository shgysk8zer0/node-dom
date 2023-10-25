import { Node } from './Node.js';
import { htmlEscape } from './utils.js';

export class Attr extends Node {
	constructor(name, namespaceURI) {
		if (typeof name !== 'string' || ! /^[A-Za-z:\d\-_]+$/.test(name)) {
			throw new DOMException('String contains an invalid character');
		} else {
			super(name,  namespaceURI);
		}
	}

	toString() {
		return `${this.name}="${htmlEscape(this.value)}"`;
	}

	get ownerElement() {
		return this.parentElement;
	}

	get name() {
		return this.nodeName;
	}

	get nodeType() {
		return Node.ATTRIBUTE_NODE;
	}

	get value() {
		return this.nodeValue;
	}

	set value(val) {
		this.nodeValue = val;
	}

	cloneNode() {
		const clone = new Attr(this.name, this.namespaceURI);
		clone.value = this.value;
		return clone;
	}
}
