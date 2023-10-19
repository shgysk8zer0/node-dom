import { Element } from '../Element.js';

export class HTMLElement extends Element {
	get hidden() {
		return this.hasAttribute('hidden');
	}

	set hidden(val) {
		this.toggleAttribute('hidden', val);
	}

	get slot() {
		return this.getAttribute('slot');
	}

	set slot(val) {
		this.setAttribute('slot', val);
	}

	get title() {
		return this.getAttribute('title');
	}

	set title(val) {
		this.setAttribute('title', val);
	}
}
