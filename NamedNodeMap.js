// import { Node } from './Node.js';
import { Attr } from './Attr.js';

export class NamedNodeMap extends Array {
	item(n) {
		return this[n];
	}

	getNamedItem(name) {
		return this.find(attr => attr.name === name);
	}

	removeNamedItem(name) {
		const index = this.findIndex(attr => attr.name === name);

		if (index !== -1) {
			const attr = this.item(index);
			attr.ownerElement === null;
			this.splice(index, 1);
			return attr;
		}
	}

	setNamedItem(attr) {
		if (! (attr instanceof Attr)) {
			throw new TypeError('Not an attribute');
		}

		const index = this.findIndex(attr => attr.name === 'name');

		if (index !== -1) {
			this[index] =  attr;
		} else {
			this.push(attr);
		}
	}
}
