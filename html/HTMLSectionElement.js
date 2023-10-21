import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';

export const HTMLSectionElement = Document.registerElement('section', class HTMLSectionElement extends HTMLElement {
	get tagName() {
		return 'SECTION';
	}
});
