import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';

export const HTMLTitleElement = Document.registerElement('title', class HTMLTitleElement extends HTMLElement {
	get tagName() {
		return 'TITLE';
	}
});
