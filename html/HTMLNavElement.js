import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';

export const HTMLNavElement = Document.registerElement('nav', class HTMLNavElement extends HTMLElement {
	get tagName() {
		return 'NAV';
	}
});
