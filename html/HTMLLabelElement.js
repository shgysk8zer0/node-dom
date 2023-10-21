import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';

export const HTMLLabelElement = Document.registerElement('label', class HTMLLabelElement extends HTMLElement {
	get control() {
		if (this.hasAttribute('for') &&  this.isConnected) {
			return this.ownerDocument.getElementById(this.getAttribute('for')) || null;
		} else {
			// This involves too much nesting, but avoids multiple queries unless needed
			const inputs = this.getElementsByTagName('input');

			if (inputs.length !== 0) {
				return inputs.item(0);
			} else {
				const selects = this.getElementsByTagName('select');

				if (selects.length !== 0)  {
					return selects.item(0);
				} else {
					const textareas = this.getElementsByTagName('textarea');

					if (textareas.length !== 0) {
						return textareas.item(0);
					} else {
						return null;
					}
				}
			}
		}
	}

	get form() {
		const control = this.control;

		if (control instanceof HTMLElement) {
			return control.form;
		} else {
			return null;
		}
	}

	get htmlFor() {
		return this.getAttribute('for');
	}

	set htmlFor(val) {
		this.setAttribute('for', val);
	}

	get tagName() {
		return 'LABEL';
	}
});
