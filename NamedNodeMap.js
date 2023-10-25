import { Attr } from './Attr.js';

export class NamedNodeMap extends Array {
	item(n) {
		return this[n];
	}

	getNamedItem(name) {
		return this.getNamedItemNS(null, name);
	}

	getNamedItemNS(namespace, name) {
		return this.find(attr => attr.name === name && attr.namespaceURI === namespace);
	}

	removeNamedItem(name) {
		return this.removeNamedItemNS(null, name);
	}

	removeNamedItemNS(namespace, name) {
		const index = this.findIndex(attr => attr.name === name && attr.namespaceURI === namespace);

		if (index !== -1) {
			const attr = this.item(index);
			attr.ownerElement === null;
			this.splice(index, 1);
			return attr;
		}
	}

	setNamedItem(attr) {
		if (! (attr instanceof Attr)) {
			throw new TypeError('NamedNodeMap.setNamedItem: Argument 1 does not implement interface Attr.');
		} else if (attr.namespaceURI === null) {
			return this.setNameItemNS(attr);
		}
	}

	setNamedItemNS(attr) {
		if (! (attr instanceof Attr)) {
			throw new TypeError('NamedNodeMap.setNamedItemNS: Argument 1 does not implement interface Attr.');
		}

		const index = this.findIndex(attr => attr.name === 'name');

		if (index !== -1) {
			const old = this[index];
			this[index] =  attr;
			return old;
		} else {
			this.push(attr);
			return null;
		}
	}
}
