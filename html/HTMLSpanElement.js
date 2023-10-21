import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';

export const HTMLSpanElement = Document.registerElement('span', class HTMLSpanElement extends HTMLElement {
	get tagName() {
		return 'SPAN';
	}
});
