import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';

export const HTMLHeadElement = Document.registerElement('head', class HTMLHeadElement extends HTMLElement {
	get tagName() {
		return 'HEAD';
	}
});
