import { Node } from './Node.js';

export class DocumentType extends Node {
	get name() {
		return 'html';
	}

	get publicId() {
		return '';
	}

	get systemId() {
		return '';
	}

	get nodeType() {
		return Node.DOCUMENT_TYPE_NODE;
	}

	toString() {
		return `<!DOCTYPE ${this.name}>`;
	}
}
