import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';

export const HTMLInputElement = Document.registerElement('input', class HTMLInputElement extends HTMLElement {
	get disabled() {
		return this.hasAttribute('disabled');
	}

	set disabled(val) {
		this.toggleAttribute('disabled',  val);
	}

	get required() {
		return this.hasAttribute('required');
	}

	set required(val) {
		this.toggleAttribute('required', val);
	}

	get tagName() {
		return 'INPUT';
	}

	get type() {
		return this.getAttribute('type') || 'text';
	}

	set type(val) {
		this.setAttribute('type', val);
	}
});
