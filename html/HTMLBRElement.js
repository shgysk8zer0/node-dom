import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';

export const HTMLBRElement = Document.registerElement('br', class HTMLBRElement extends HTMLElement {
	constructor() {
		super('br');
	}
});
