import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';

export const HTMLButtonElement = Document.registerElement('button', class HTMLButtonElement extends HTMLElement {
	get disabled() {
		return this.hasAttribute('disabled');
	}

	set disabled(val) {
		this.toggleAttribute('disabled', val);
	}

	get tagName() {
		return 'BUTTON';
	}

	get type() {
		return this.getAttribute('type') || 'button';
	}

	set type(val) {
		this.setAttribute('type', val);
	}
});
