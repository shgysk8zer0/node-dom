import { Node, Text } from './Node.js';
import { HTMLCollection } from './HTMLCollection.js';
import { getElementById } from './utils.js';

export class DocumentFragment extends Node {
	constructor() {
		super('#document-fragment');
	}

	get childElementCount()  {
		return this.children.length;
	}

	get children() {
		return new HTMLCollection([...this.childNodes].filter(node => node.nodeType === Node.ELEMENT_NODE));
	}

	get firstElementChild() {
		const children = this.children;
		return children.length === 0 ? null : children.item(0);
	}

	get lastElementChild() {
		const children = this.children;
		return children.length === 0 ? null : children.item(children.length - 1);
	}

	get nodeType() {
		return Node.DOCUMENT_FRAGMENT_NODE;
	}

	getElementById(id) {
		return getElementById(this, id);
	}

	prepend(...children) {
		const nodes = children.map(child => child instanceof Node ? child : new Text(child));
		this.replaceChildren(...nodes, ...this.childNodes);
	}
}
