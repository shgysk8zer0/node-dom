import { Node } from './Node.js';
import { NodeFilter } from './NodeFilter.js';
import { TreeWalker } from './TreeWalker.js';
import { HTMLCollection } from './HTMLCollection.js';

export function createWalker(root) {
	let currentNode = root;
	let children = root.childNodes;
	let index = 0;

	return {
		nextNode() {
			/*
			 * First, return any first child of root, then the first child of that, etc.
			 */
			console.log({ currentNode, item: children.item(index), index, length: children.length });
			if (index < children.length) {
				currentNode = children.item(index++);
				return currentNode;
			} else if (currentNode.isSameNode(root)) {
				return null;
			} else if (currentNode.nextSibling instanceof Node) {
				index = 0;
				currentNode = currentNode.nextSibling;
				children = currentNode.childNodes;
				return currentNode;
			} else {
				return null;
			}
		}
	};
}

export function showNode(node, whatToShow = NodeFilter.SHOW_ALL) {
	switch (node.nodeType) {
		case Node.ELEMENT_NODE:
			return (whatToShow & NodeFilter.SHOW_ELEMENT) !== 0;
		case Node.TEXT_NODE:
			return (whatToShow & NodeFilter.SHOW_TEXT) !== 0;

		case Node.COMMENT_NODE:
			return (whatToShow & NodeFilter.SHOW_COMMENT) !== 0;

		case Node.DOCUMENT_NODE:
			return (whatToShow & NodeFilter.SHOW_DOCUMENT) !== 0;

		case Node.DOCUMENT_FRAGMENT_NODE:
			return (whatToShow & NodeFilter.SHOW_DOCUMENT_FRAGMENT) !== 0;

		case Node.DOCUMENT_TYPE_NODE:
			return (whatToShow & NodeFilter.SHOW_DOCUMENT_TYPE) !== 0;

		default: return false;
	}
}

export function nodeFilter(node, filter) {
	if (filter instanceof Function) {
		return filter(node);
	} else if (filter === null) {
		return NodeFilter.FILTER_ACCEPT;
	} else if (typeof filter === 'object' && filter.acceptNode instanceof Function) {
		return filter.acceptNode(node);
	} else {
		return NodeFilter.FILTER_ACCEPT;
	}
}

export function getNodeGenerators(root) {
	let current = root;

	function* nextNodeGen() {
		while (true) {
			if (! (current instanceof Node)) {
				yield  null;
			} else if (current.hasChildNodes()) {
				current = current.firstChild;
				yield current;
			} else if (current.nextSibling instanceof Node) {
				current = current.nextSibling;
				yield current;
			} else if (current.parentNode instanceof Node && ! root.isSameNode(current)) {
				let ref = current;
				let found = false;

				while (ref instanceof Node && ref.parentNode instanceof Node) {
					if (root.isSameNode(ref)) {
						break;
					} else if (ref.nextSibling instanceof Node) {
						current = ref.nextSibling;
						found = true;
						break;
					} else if (ref.parentNode instanceof Node) {
						ref = ref.parentNode;
					} else {
						console.error('Nothing found');
						break;
					}
				}

				yield found ? current : null;
			} else {
				yield null;
			}
		}
	}

	function* prevNodeGen() {
		while (true) {
			if (! (current instanceof Node)) {
				console.log('Current not a node');
				yield  null;
			} else if (current.previousSibling instanceof Node) {
				console.log('previousSibling');
				current = current.previousSibling;
				yield current;
			} else if (current.parentNode instanceof Node && ! root.isSameNode(current)) {
				console.log('Going up to parent');
				current = current.parentNode;
				const tmp = current;
				yield current;

				if (tmp.isSameNode(current) && current.hasChildNodes()) {
					current = current.lastChild;
					yield current;
				}
			} else {
				console.log('This is the end');
				yield null;
			}
		}
	}

	return [nextNodeGen(root), prevNodeGen(root)];
}

export function* nodeFilteredGenerator(
	root,
	whatToShow = NodeFilter.SHOW_ALL,
	filter = () => NodeFilter.FILTER_ACCEPT,
) {
	if (root.hasChildNodes()) {
		for (const node of root.childNodes) {
			if (showNode(node, whatToShow)) {
				switch (filter(node)) {
					case NodeFilter.FILTER_ACCEPT:
					case true:
						yield node;

						yield* nodeFilteredGenerator(node, whatToShow, filter);
						break;

					case NodeFilter.FILTER_SKIP:
					case false:
						yield* nodeFilteredGenerator(node, whatToShow, filter);
						break;

					case NodeFilter.FILTER_REJECT:
					default:
						continue;

				}
			} else if (node.hasChildNodes()) {
				yield* nodeFilteredGenerator(node, whatToShow, filter);
			} else {
				continue;
			}
		}
	}
}

export function *getDescendants(el, filter) {
	const walker = new TreeWalker(
		el,
		NodeFilter.SHOW_ELEMENT,
		filter instanceof Function
			? el => filter(el) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
			: null
	);

	let node = walker.nextNode();

	while (node instanceof Node) {
		yield node;
		node = walker.nextNode();
	}
}

export function getElementById(root, id) {
	const { value, done } = getDescendants(root, el => el.id === id).next();
	return done ? null  : value;
}

export function getElementsByTagName(root, tag) {
	const tagName = tag.toLowerCase();
	return new HTMLCollection(getDescendants(root, ({ nodeName }) => nodeName.toLowerCase() === tagName));
}

export function getElementsByClassName(root, classNames) {
	const classList = classNames.trim().split(' ').filter(name => name.length !== 0);
	const filter = classList.length === 1
		? el => el.classList.contains(classList[0])
		: el => classList.every(name => el.classList.contains(name));

	return new HTMLCollection(getDescendants(root, filter));
}

export function* treeWalkerToGenerator(walker) {
	let node = walker.nextNode();

	while(node instanceof Node) {
		yield node;
		node = walker.nextNode();
	}
}

export const HTML_CHAR_MAP = new Map([['"', '&quot;'], ['<', '&lt;'], ['>', '&gt;'], ['\'', '&apos;'], ['&', '&amp;']]);
export const spinalCase = str => str.replace(/[\w]([A-Z])/g, ([a, b]) => `${a}-${b.toLowerCase()}`);
export const camelCase = str => str.replace(/[\W]([\w])/g, ([,b])=> b.toUpperCase());
export const htmlEscape = str => str.toString().replaceAll(/[<>&'"]{1}/g, char => HTML_CHAR_MAP.get(char) || char);
