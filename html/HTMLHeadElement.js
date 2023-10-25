import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';

export const HTMLHeadElement = Document.registerElement('head', class HTMLHeadElement extends HTMLElement {
	constructor() {
		super('head');
	}
});
