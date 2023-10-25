import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';

export const HTMLMainElement = Document.registerElement('main', class HTMLMainElement extends HTMLElement {
	constructor() {
		super('main');
	}
});
