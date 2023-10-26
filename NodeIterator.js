import { Node } from './Node.js';
import { NodeFilter } from './NodeFilter.js';
import { showNode, nodeFilter } from './utils.js';

/**
 * @see https://dom.spec.whatwg.org/#nodeiterator
 */
export class NodeIterator {
	#root;
	#whatToShow;
	#filter;
	#referenceNode;
	#indicies;
	#pointer;
	#depth;
	#next;
	#prev;

	constructor(root, whatToShow = NodeFilter.SHOW_ALL, filter = null) {
		if (! (root instanceof Node)) {
			throw new TypeError('Document.createNodeIterator(): Argument 1 does not implement interface Node.');
		}

		this.#root = root;
		this.#pointer = root.firstChild;
		this.#whatToShow = parseInt(whatToShow);
		this.#filter = filter;
		this.#indicies = [0];
		this.#depth = 0;
		const { next, prev } = createIterator(root);
		this.#next = next;
		this.#prev = prev;
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

	/**
	 * Depth-first search for nodes matching `whatToShow` and `filetr` in increasing order
	*/
	nextNode() {
		/**
		 * This will begin with the first child of the root node.
		 * Then, if that child has any children, it will return the first child of that node.
		 * This will continue until a node is reached that has no children.
		 * Then it will go to the parent and return any next sibling relative to the parent
		 */

		let reference = null;

		while (this.#pointer instanceof Node) {
			if (this.#pointer.hasChildNodes()) {
				this.#indicies.push(0);
				this.#pointer = this.#pointer.childNodes.item(0);

				if (showNode(this.#pointer, this.whatToShow)) {
					switch(parseInt(this.foo)) {
						//
					}
				}
			}
		}

		return reference;
	}
}
