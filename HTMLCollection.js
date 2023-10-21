export class HTMLCollection {
	#items;

	constructor(items = []) {
		this.#items = Array.from(items);
	}

	get length() {
		return this.#items.length;
	}

	*[Symbol.iterator]() {
		for (const item of this.#items) {
			yield item;
		}
	}

	item(i) {
		return this.#items[i];
	}

	namedItem(name) {
		const named = this.#items.find(el => el.name === name);

		return named || this.#items.find(el => el.id === name);
	}
}
