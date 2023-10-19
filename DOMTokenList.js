export class DOMTokenList {
	#items;

	constructor() {
		this.#items = new Set();
	}

	toString() {
		return this.value;
	}

	[Symbol.iterator]() {
		return this.values();
	}

	get length() {
		return this.#items.size;
	}

	get value() {
		return [...this.#items].join(' ');
	}

	add(...items){
		items.forEach(item => this.#items.add(item));
	}

	contains(item){
		return this.#items.has(item);
	}

	item(n) {
		return [...this.#items][n];
	}

	*entries() {
		let n = 0;

		for (const value of this) {
			yield [n++, value];
		}
	}

	*keys() {
		for (let n = 0; n < this.#items.size; n++) {
			yield n;
		}
	}

	*values() {
		for (const value of this.#items) {
			yield value;
		}
	}

	remove(...items) {
		items.forEach(item => this.#items.delete(item));
	}
}
