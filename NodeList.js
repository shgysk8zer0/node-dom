export function createNodeList() {
	const list = [];
	const nodeList = new NodeList(list);

	return {
		nodeList,
		add: (...nodes) => list.push(...nodes),
		has: node => list.includes(node),
		item: index => list[index] || null,
		find: findCb => list.find(findCb),
		clear: () => list.splice(0, list.length),
		replace: (oldNode, newNode) => {
			const index = list.indexOf(oldNode);

			if (index !== -1) {
				list[index] = newNode;
				return oldNode;
			}
		},
		remove: (node) => {
			const index = list.indexOf(node);

			if (index === -1) {
				return null;
			} else {
				const val = list[index];
				list.splice(index, 1);
				return val;
			}
		}
	};
}

export class NodeList {
	#items;

	constructor(items = []) {
		this.#items = Array.isArray(items) ? items : Array.from(items);
	}

	[Symbol.iterator]() {
		return this.values();
	}

	get length() {
		return this.#items.length;
	}

	item(n) {
		return this.#items[n] || null;
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
