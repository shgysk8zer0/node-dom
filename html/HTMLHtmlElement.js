import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';

export const HTMLHtmlElement = Document.registerElement('html', class HTMLHtmlElement extends HTMLElement {
	get tagName() {
		return 'HTML';
	}
});
