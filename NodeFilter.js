export class NodeFilter {
	static get FILTER_ACCEPT() {
		return 1;
	}

	static get FILTER_REJECT() {
		return 2;
	}

	static get FILTER_SKIP() {
		return 3;
	}

	static get SHOW_ALL() {
		return 0xFFFFFFFF;
	}

	static get SHOW_ATTRIBUTE() {
		return 0x2;
	}

	static get SHOW_CDATA_SECTION() {
		return 0x8;
	}

	static get SHOW_COMMENT() {
		return 0x80;
	}

	static get SHOW_DOCUMENT() {
		return 0x100;
	}

	static get SHOW_DOCUMENT_FRAGMENT() {
		return 0x400;
	}

	static get SHOW_DOCUMENT_TYPE() {
		return 0x200;
	}

	static get SHOW_ELEMENT() {
		return 0x1;
	}

	static get SHOW_ENTITY() {
		return 0x20;
	}

	static get SHOW_ENTITY_REFERENCE() {
		return 0x10;
	}

	static get SHOW_NOTATION() {
		return 0x800;
	}

	static get SHOW_PROCESSING_INSTRUCTION() {
		return 0x40;
	}

	static get SHOW_TEXT() {
		return 0x4;
	}
}
