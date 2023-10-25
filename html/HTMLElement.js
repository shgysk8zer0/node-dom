import { Element } from '../Element.js';
import { HTML as HTML_NS } from '@shgysk8zer0/consts/namespaces.js';

export class HTMLElement extends Element {
	constructor(nodeName, namespaceURI = HTML_NS) {
		super(nodeName, namespaceURI);
	}

	get accessKey() {
		return this.getAttribute('accesskey');
	}

	set accessKey(val) {
		this.setAttribute('accesskey', val);
	}
	get accessKeyLabel() {
		return this.getAttribute('accesskeylabel');
	}

	set accessKeyLabel(val) {
		this.setAttribute('accesskeylabel', val);
	}

	get contentEditable() {
		return this.getAttribute('contenteditable') || 'inherit';
	}

	set contentEditable(val) {
		this.setAttribute('contenteditable', val);
	}

	get isContentEditable()  {
		switch(this.getAttribute('contenteditable')) {
			case 'true': return true;
			case 'false': return false;
			default: return this.parentElement instanceof Element
				? this.parentElement.isContentEditable
				: false;
		}
	}

	get dir() {
		return this.getAttribute('dir');
	}

	set dir(val) {
		this.setAttribute('dir', val);
	}

	get enterKeyHint() {
		return this.getAttribute('enterKeyhint');
	}

	set enterKeyHint(val) {
		this.setAttribute('enterKeyhint', val);
	}

	get hidden() {
		return this.hasAttribute('hidden');
	}

	set hidden(val) {
		this.toggleAttribute('hidden', val);
	}

	get inert() {
		return this.hasAttribute('inert');
	}

	set inert(val) {
		this.toggleAttribute('inert', val);
	}

	get inputMode() {
		return this.getAttribute('inputmode');
	}

	set inputMode(val)  {
		this.setAttribute('inputmode', val);
	}

	get lang() {
		return this.getAttribute('lang');
	}

	set lang(val) {
		this.setAttribute('lang', val);
	}

	get namespaceURI() {
		return HTML_NS;
	}

	get nonce() {
		return this.getAttribute('nonce');
	}

	set nonce(val){
		this.setAttribute('nonce', val);
	}

	get slot() {
		return this.getAttribute('slot');
	}

	set slot(val) {
		this.setAttribute('slot', val);
	}

	get tabIndex() {
		if (this.hasAttribute('tabindex')) {
			return -1;
		} else {
			const index = parseInt(this.getAttribute('tabindex'));
			return Number.isNaN(index) ? 0 : index;
		}
	}

	set tabIndex(val) {
		if (typeof val !== 'number') {
			this.tabIndex = parseInt(val);
		} else if (Number.isSafeInteger(val)){
			this.setAttribute('tabindex', 0);
		} else {
			this.setAttribute('tabindex', val.toString());
		}
	}

	get title() {
		return this.getAttribute('title');
	}

	set title(val) {
		this.setAttribute('title', val);
	}
}
