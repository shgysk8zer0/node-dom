import { HTMLElement } from './HTMLElement.js';
import { Document } from '../Document.js';

export const HTMLInputElement = Document.registerElement('input', class HTMLInputElement extends HTMLElement {
	constructor() {
		super('input');
	}

	get accept() {
		return this.getAttribute('accept');
	}

	set accept(val) {
		this.setAttribute('accept', val);
	}

	get autocomplete() {
		return this.getAttribute('autocomplete');
	}

	set autocomplete(val) {
		this.setAttribute('autocomplete', val);
	}

	get autofocus() {
		return this.hasAttribute('autofocus');
	}

	set autofocus(val) {
		this.toggleAttribute('autofocus', val);
	}

	get capture() {
		return this.getAttribute('capture');
	}

	set capture(val) {
		this.setAttribute('capture', val);
	}

	get checked() {
		return this.hasAttribute('checked');
	}

	set checked(val) {
		this.toggleAttribute('checked', val);
	}

	get disabled() {
		return this.hasAttribute('disabled');
	}

	set disabled(val) {
		this.toggleAttribute('disabled',  val);
	}

	get form() {
		if (this.hasAttribute('form') && this.isConnected) {
			const form = this.ownerDocument.getElementById(this.getAttribute('form'));

			if (form instanceof HTMLElement && form.tagName === 'FORM') {
				return form;
			} else {
				return null;
			}
		} else {
			let el = this;
			let form = null;

			while (el.parentElement instanceof HTMLElement) {
				if  (el.parentElement.tagName === 'FORM') {
					form = el.parentElement;
					break;
				} else {
					el = el.parentElement;
				}
			}

			return form;
		}
	}

	get formAction() {
		const form = this.form;

		if  (form instanceof HTMLElement) {
			return form.action;
		} else {
			return this.baseURI;
		}
	}

	set formAction(val) {
		const form = this.form;

		if (form instanceof HTMLElement) {
			form.action = val;
		}
	}

	get formEnctype() {
		const form = this.form;

		if  (form instanceof HTMLElement) {
			return form.enctype;
		} else {
			return '';
		}
	}

	set formEnctype(val) {
		const form = this.form;

		if (form instanceof HTMLElement) {
			form.enctype = val;
		}
	}

	get formMethod() {
		const form = this.form;

		if  (form instanceof HTMLElement) {
			return form.method;
		} else {
			return '';
		}
	}

	set formMethod(val) {
		const form = this.form;

		if (form instanceof HTMLElement) {
			form.method = val;
		}
	}

	get inputMode() {
		return this.getAttribute('inputmode');
	}

	set inputMode(val) {
		this.setAttribute('inputmode', val);
	}

	get list() {
		return this.getAttribute('list');
	}

	set list(val) {
		this.setAttribute('list',  val);
	}

	get max() {
		return this.getAttribute('max');
	}

	set max(val) {
		this.setAttribute('max',  val);
	}

	get min() {
		return this.getAttribute('min');
	}

	set min(val) {
		this.setAttribute('min',  val);
	}

	get minLength() {
		if (this.hasAttribute('minlength')) {
			return Math.max(parseInt(this.getAttribute('minlength')), -1);
		} else {
			return -1;
		}
	}

	set minLength(val) {
		if (typeof val === 'number') {
			this.minLength = parseInt(val);
		} else if (! Number.isSafeInteger(val) || val < 0) {
			throw new DOMException('Index or size is negative or greater than the allowed amount');
		} else {
			this.setAttribute('minlength', val.toString());
		}
	}

	get maxLength() {
		if (this.hasAttribute('maxlength')) {
			return Math.max(parseInt(this.getAttribute('maxlength')), -1);
		} else {
			return -1;
		}
	}

	set maxLength(val) {
		if (typeof val === 'number') {
			this.maxLength = parseInt(val);
		} else if (! Number.isSafeInteger(val) || val < 0) {
			throw new DOMException('Index or size is negative or greater than the allowed amount');
		} else {
			this.setAttribute('maxlength', val.toString());
		}
	}

	get multiple() {
		return this.hasAttribute('multiple');
	}

	set multiple(val) {
		this.toggleAttribute('multiple', val);
	}

	get name() {
		return this.getAttribute('name');
	}

	set name(val) {
		this.setAttribute('name', val);
	}

	get pattern() {
		return this.getAttribute('pattern');
	}

	set pattern(val) {
		this.setAttribute('pattern', val);
	}

	get placeholder() {
		return this.getAttribute('placeholder');
	}

	set placeholder(val) {
		this.setAttribute('placeholder', val);
	}

	get readOnly() {
		return this.hasAttribute('readonly');
	}

	set readOnly(val) {
		this.toggleAttribute('readonly',  val);
	}

	get required() {
		return this.hasAttribute('required');
	}

	set required(val) {
		this.toggleAttribute('required', val);
	}

	get size() {
		if (this.hasAttribute('size')) {
			return Math.max(parseInt(this.getAttribute('size')), 1);
		} else {
			return 20; // Not sure if this is always correct
		}
	}

	set size(val) {
		if (typeof val !== 'number') {
			this.size = parseInt(val);
		} else if (! Number.isSafeInteger(val) || val === 0) {
			throw new DOMException('Index or size is negative or greater than the allowed amount');
		}  else if (val < 1) {
			this.size = 20;
		} else {
			this.setAttribute('size', val.toString());
		}
	}

	get step() {
		return this.getAttribute('step');
	}

	set step(val) {
		this.setAttribute('step', val);
	}

	get type() {
		return this.getAttribute('type') || 'text';
	}

	set type(val) {
		this.setAttribute('type', val);
	}

	get value() {
		return this.getAttribute('value');
	}

	set value(val) {
		this.setAttribute('value', val);
	}

	get valueAsDate() {
		const date = new Date(this.value);

		return Number.isNaN(date.getTime()) ? null : date;
	}

	get valueAsNumber() {
		if (this.type === 'number' && this.hasAttribute('value'))  {
			return parseInt(this.getAttribute('value'));
		} else {
			return NaN;
		}
	}

	stepDown(n = 1) {
		this.stepUp(-n);
	}

	stepUp(n = 1) {
		if (typeof n !== 'number') {
			this.stepUp(parseInt(n));
		} else if (Number.isFinite(n)) {
			switch(this.type) {
				case 'number':
					this.value = Math.min(this.max, this.valueAsNumber + Math.floor(n) * parseFloat(this.step || 1));
					break;

				default:
					throw new  DOMException('An attempt was made to use an object that is not, or is no longer, usable');
			}
		}
	}
});
