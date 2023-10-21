import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';

export const HTMLBodyElement = Document.registerElement('body', class HTMLBodyElement extends HTMLElement {
	get tagName() {
		return 'BODY';
	}
});
