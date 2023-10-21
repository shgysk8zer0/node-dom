import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';

export const HTMLMetaElement = Document.registerElement('meta', class HTMLMetaElement extends HTMLElement {
	get charset() {
		return this.getAttribute('charset');
	}

	set charset(val) {
		this.setAttribute('charset', val);
	}

	get content() {
		return this.getAttribute('content');
	}

	set content(val) {
		this.setAttribute('content', val);
	}

	get httpEquiv() {
		return this.getAttribute('http-equiv');
	}

	set httpEquiv(val) {
		this.setAttribute('http-equiv', val);
	}

	get media() {
		return this.getAttribute('media');
	}

	set media(val) {
		this.setAttribute('media', val);
	}

	get name() {
		return  this.getAttribute('name');
	}

	set name(val) {
		this.setAttribute('name', val);
	}

	get tagName() {
		return 'META';
	}
});
