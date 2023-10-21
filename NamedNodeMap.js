// import { Node } from './Node.js';

export class NamedNodeMap {
	#map;

	constructor(entities) {
		this.#map = new Map(entities);
	}

	getNamedItem(name) {
		return this.#map.get(name);
	}

	setNamedItem(attr) {
		if (! (attr instanceof Attr)) {
			throw new TypeError('Not an Attr.');
		} else {
			const oldVal = this.#map.get(attr.name);
			this.#map.set(attr.name, attr);
			return oldVal;
		}
	}
}
