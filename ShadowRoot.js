import { DocumentFragment } from './DocumentFragment.js';

export class ShadowRoot extends DocumentFragment {
	#host;
	#mode;
	#delegatesFocus;
	#slotAssignment;

	constructor(host, { mode, delegatesFocus, slotAssignment }) {
		if (! (mode === 'open' || mode === 'closed')) {
			throw new TypeError(`Element.attachShadow: '${mode}' (value of 'mode' member of ShadowRootInit) is not a valid value for enumeration ShadowRootMode.`);
		} else {
			super();
			this.#host = host;
			this.#mode = mode;
			this.#delegatesFocus = delegatesFocus;
			this.#slotAssignment = slotAssignment;
		}
	}

	get delegatesFocus() {
		return this.#delegatesFocus;
	}

	get host() {
		return this.#host;
	}

	get mode() {
		return this.#mode;
	}

	get slotAssignment() {
		return this.#slotAssignment;
	}
}
