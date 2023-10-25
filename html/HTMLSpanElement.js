import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';

export const HTMLSpanElement = Document.registerElement('span', class HTMLSpanElement extends HTMLElement {
	constructor() {
		super('span');
	}
});
