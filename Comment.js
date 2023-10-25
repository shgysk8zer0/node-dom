import { CharacterData, Node } from './Node.js';
import { htmlEscape } from './utils.js';

export class Comment extends CharacterData {
	constructor(content) {
		super('#comment');

		if (typeof content === 'string') {
			this.data = content;
		}
	}

	toString() {
		return `<!-- ${htmlEscape(this.data)} -->`;
	}

	get nodeType() {
		return Node.COMMENT_NODE;
	}
}
