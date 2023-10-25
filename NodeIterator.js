import { Node } from './Node.js';
import { NodeFilter } from './NodeFilter.js';

/**
 * @see https://dom.spec.whatwg.org/#nodeiterator
 */
export class NodeIterator {
	#root;
	#whatToShow;
	#filter;
	#referenceNode;

	constructor(root, whatToShow = NodeFilter.SHOW_ALL, filter = null) {
		if (! (root instanceof Node)) {
			throw new TypeError('Document.createNodeIterator(): Argument 1 does not implement interface Node.');
		}

		this.#root = root;
		this.#whatToShow = parseInt(whatToShow);
		this.#filter = filter;
	}

	get filter() {
		return this.#filter;
	}

	get pointerBeforeReferenceNode() {
		return false;
	}

	get referenceNode() {
		return this.#referenceNode;
	}

	get root() {
		return this.#root;
	}

	get whatToShow() {
		return this.#whatToShow;
	}

	previousNode() {
		return null;
	}

	nextNode() {
		return null;
	}
}
