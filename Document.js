import { Node } from './Node.js';
import { Element } from './Element.js';
import { HTMLUnknownElement } from './html/HTMLUnknownElement.js';
import { DocumentFragment } from './DocumentFragment.js';
import { Attr } from './Attr.js';
const registry = new Map();

export class Document extends Node {
	get nodeType() {
		return Node.DOCUMENT_NODE;
	}

	get readyState() {
		return 'loading';
	}

	createAttribute(name){
		return new Attr(name);
	}

	createElement(tag) {
		if (registry.has(tag)) {
			const constructor = registry.get(tag);
			return new constructor();
		} else {
			return new HTMLUnknownElement(tag);
		}
	}

	createDocumentFragment() {
		return new DocumentFragment();
	}

	getElementById(id) {
		function findId(id, children) {
			let found = children.find(el => el.id === id);

			if (! (found instanceof Element)) {
				for (const child of children) {
					const el = findId(id, Array.from(child.children));

					if (el instanceof Element) {
						found = el;
						break;
					}
				}
			}

			return found;
		}

		return findId(id, Array.from(this.documentElement.children));
	}

	static registerElement(tag, constructor) {
		registry.set(tag, constructor);
		return constructor;
	}
}
