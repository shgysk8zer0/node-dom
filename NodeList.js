export class NodeList {
	#items;

	constructor(items = []) {
		this.#items = items;
	}

	[Symbol.iterator]() {
		return this.values();
	}

	get length() {
		return this.#items.length;
	}

	item(n) {
		return this.#items[n];
	}

	forEach(callback, thisArg) {
		this.#items.forEach((item, index) => callback(item, index, this), thisArg);
	}

	*entries() {
		let n = 0;

		for (const item of this.#items) {
			yield [n++, item];
		}
	}

	*keys() {
		for (const index in this.#items) {
			yield index;
		}
	}

	*values() {
		for (const item of this.#items) {
			yield item;
		}
	}
}
