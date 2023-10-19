import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';

export const HTMLFooterElement = Document.registerElement('footer', class HTMLFooterElement extends HTMLElement {
	get tagName() {
		return 'FOOTER';
	}
});
