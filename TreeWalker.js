import { Node } from'./Node.js';
import { NodeFilter } from './NodeFilter.js';
import { showNode } from './filterNode.js';

function getFilterFunc(filter) {
	if (filter instanceof Function) {
		return filter;
	} else if (typeof filter === 'object' && ! filter === null && filter.acceptNode instanceof Function) {
		return filter.acceptNode;
	} else {
		return () => NodeFilter.FILTER_ACCEPT;
	}
}

export class TreeWalker {
	#root;
	#whatToShow;
	#filter;
	#currentNode;
	#generator;
	#done;

	constructor(root, whatToShow = NodeFilter.SHOW_ALL, filter = null) {
		if (! (root instanceof Node)) {
			throw new TypeError('Document.createTreeWalker: Argument 1 does not implement interface Node.');
		}

		this.#root = root;
		this.#whatToShow = parseInt(whatToShow);
		this.#filter = filter;
		this.#done = false;

		const filterFunc = getFilterFunc(filter);

		function* nodeWalker(root, whatToShow) {
			for (const node of root.childNodes) {
				if (! showNode(node, whatToShow)) {
					continue;
				} else {
					switch(parseInt(filterFunc(node))) {
						case NodeFilter.FILTER_ACCEPT:
							yield node;

							if (node.hasChildNodes()) {
								for (const child of nodeWalker(node, whatToShow)) {
									yield child;
								}
							}

							break;

						case NodeFilter.FILTER_SKIP:
							if (node.hasChildNodes()) {
								for (const child of nodeWalker(node, whatToShow)) {
									yield child;
								}
							}

							break;

						case NodeFilter.FILTER_REJECT:
						default:
							continue;
					}
				}
			}
		}

		this.#generator = nodeWalker(root, this.whatToShow);
	}

	get currentNode() {
		return this.#currentNode;
	}

	get filter() {
		return this.#filter;
	}

	get root() {
		return this.#root;
	}

	get whatToShow() {
		return this.#whatToShow;
	}

	firstChild() {
		const current = this.currentNode;

		if (current instanceof Node) {
			const first = current.firstChild;
			this.#currentNode = first;
			return first;
		} else {
			return null;
		}
	}

	lastChild() {
		const current = this.currentNode;

		if (current instanceof Node) {
			const last = current.lastChild;
			this.#currentNode = last;
			return last;
		} else {
			return null;
		}
	}

	nextNode() {
		if (! this.#done) {
			const { done, value = null } = this.#generator.next();

			if (done) {
				this.#done = done;
			} else {
				this.#currentNode = value;
			}

			return value;
		}
	}

	nextSibling() {
		const current = this.currentNode;

		if (current instanceof Node) {
			const next = current.nextSibling;
			this.#currentNode = next;
			return next;
		} else {
			return null;
		}
	}

	previousSibling() {
		const current = this.currentNode;

		if (current instanceof Node) {
			const prev = current.previous;
			this.#currentNode = prev;
			return prev;
		} else {
			return null;
		}
	}
}
