import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';

export const HTMLHeaderElement = Document.registerElement('header', class HTMLHeaderElement extends HTMLElement {
	constructor() {
		super('header');
	}
});
