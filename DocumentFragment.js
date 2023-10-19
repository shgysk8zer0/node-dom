import { Node } from './Node.js';

export class DocumentFragment extends Node {
	get nodeType() {
		return Node.DOCUMENT_FRAGMENT_NODE;
	}
}
