import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';

export const HTMLAsideElement = Document.registerElement('aside', class HTMLAsideElement extends HTMLElement {
	constructor() {
		super('aside');
	}
});
