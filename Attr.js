import { Node } from './Node.js';
import { htmlEscape } from './utils.js';

export class Attr extends Node {
	#name;
	#value;

	constructor(name) {
		if (typeof name !== 'string' || ! /^[A-Za-z\d\-_]+$/.test(name)) {
			throw new DOMException('String contains an invalid character');
		} else {
			super();
			this.#name = name;
		}
	}

	toString() {
		return `${this.name}="${htmlEscape(this.#value)}"`;
	}

	get name() {
		return this.#name;
	}

	get nodeType() {
		return Node.ATTRIBUTE_NODE;
	}

	get value() {
		return this.#value;
	}

	set value(val) {
		this.#value = val.toString();
	}
}
