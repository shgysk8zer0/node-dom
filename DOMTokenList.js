export class DOMTokenList {
	#items;
	#el;
	#attr;

	constructor(el, attr) {
		this.#el = el;
		this.#attr = attr;
		this.#items = new Set(el.getAttribute(attr).trim().split(' ').filter(str => str.length !== 0));
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
		this.#el.setAttribute(this.#attr, this.value);
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
		this.#el.setAttribute(this.#attr, this.value);
	}
}
