import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';

export const HTMLDivElement = Document.registerElement('div', class HTMLDivElement extends HTMLElement {
	get tagName() {
		return 'DIV';
	}
});
