import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';

export const HTMLHRElement = Document.registerElement('hr', class HTMLHRElement extends HTMLElement {
	constructor() {
		super('hr');
	}
});
