import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';

export const HTMLHtmlElement = Document.registerElement('html', class HTMLHtmlElement extends HTMLElement {
	constructor() {
		super('html');
	}
});
