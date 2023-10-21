import { Node, Text } from './Node.js';
import { HTMLCollection } from './HTMLCollection.js';
import { getDescendants } from './utils.js';
//[ "getElementById", "querySelector", "querySelectorAll", "prepend", "append", "replaceChildren", "children", "firstElementChild", "lastElementChild", "childElementCount" ]

export class DocumentFragment extends Node {
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
		let found = null;

		for (const child of getDescendants(this)) {
			if (child.id === id) {
				found = child;
				break;
			}
		}

		return found;
	}

	prepend(...children) {
		const nodes = children.map(child => child instanceof Node ? child : new Text(child));
		this.replaceChildren(...nodes, ...this.childNodes);
	}
}
