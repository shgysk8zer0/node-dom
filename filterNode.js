import { Node } from './Node.js';
import { NodeFilter } from './NodeFilter.js';

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
