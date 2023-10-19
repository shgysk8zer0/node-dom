class NodeList {
	#items;

	constructor(items = []) {
		this.#items = items;
	}

	[Symbol.iterator]() {
		return this.values();
	}

	get length() {
		return this.#items.length;
	}

	item(n) {
		return this.#items[n];
	}

	forEach(callback, thisArg) {
		this.#items.forEach((item, index) => callback(item, index, this), thisArg);
	}

	*entries() {
		let n = 0;

		for (const item of this.#items) {
			yield [n++, item];
		}
	}

	*keys() {
		for (const index in this.#items) {
			yield index;
		}
	}

	*values() {
		for (const item of this.#items) {
			yield item;
		}
	}
}

// const HTML_CHARS = {'"': '&quot;', '<': '&lt;', '>': '&gt;', '\'': '&apos;', '&': '&amp;'};
const HTML_CHAR_MAP = new Map([['"', '&quot;'], ['<', '&lt;'], ['>', '&gt;'], ['\'', '&apos;'], ['&', '&amp;']]);
const spinalCase = str => str.replace(/[\w]([A-Z])/g, ([a, b]) => `${a}-${b.toLowerCase()}`);
const htmlEscape = str => str.toString().replaceAll(/[<>&'"]{1}/g, char => HTML_CHAR_MAP.get(char) || char);

class Node extends EventTarget {
	#children;
	#parent;

	constructor() {
		super();
		this.#children = [];
		this.#parent = null;
	}

	get childNodes() {
		return new NodeList(this.#children);
	}

	get isConnected() {
		const owner = this.ownerDocument;

		return owner instanceof Node && owner.nodeType === Node.DOCUMENT_NODE;
	}

	get ownerDocument() {
		let parent = this.parentNode;

		if (! (parent instanceof Node)) {
			return null;
		} else if (parent.nodeType !== Node.DOCUMENT_NODE) {
			return parent.ownerDocument;
		} else {
			return parent;
		}
	}

	get nextSibling() {
		const parent = this.parentNode;

		if (parent instanceof Node) {
			const index = parent.#children.indexOf(this);
			return index === -1 ? null : parent.#children[index + 1] || null;
		} else {
			return null;
		}
	}

	get parentElement() {
		let parent = this.#parent;

		if (! (parent instanceof Node)) {
			return null;
		} else if (parent.nodeTye !== Node.ELEMENT_NODE) {
			return parent.parentElement;
		} else {
			return parent;
		}
	}

	get parentNode() {
		return this.#parent;
	}

	get previousSibling() {
		const parent = this.parentNode;

		if (parent instanceof Node) {
			const index = parent.#children.indexOf(this);
			return index === -1 ? null : parent.#children[index - 1] || null;
		} else {
			return null;
		}
	}

	append(...nodes) {
		nodes.forEach(node => {
			if (! (node instanceof Node)) {
				this.appendChild(new Text(node));
			} else {
				this.appendChild(node);
			}
		});
	}

	appendChild(child) {
		if (! (child instanceof Node)) {
			throw new TypeError('appendChild needs a Node.');
		} else if (child.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
			this.#children.push(...child.childNodes);
		} else if (child.nodeType === Node.ATTRIBUTE_NODE) {
			throw new DOMException('Node.appendChild: May not add an Attribute as a child');
		} else {
			child.#parent = this;
			this.#children.push(child);
		}
	}

	getRootNode() {
		const owner = this.ownerDocument;

		if (! (owner instanceof Node)) {
			return null;
		}  else {
			let root = null;

			for (const node of owner.childNodes) {
				if (node instanceof Node && node.nodeType === Node.ELEMENT_NODE) {
					root = node;
					break;
				}
			}

			return root;
		}
	}

	hasChildNodes() {
		return this.#children.length !== 0;
	}

	remove() {
		const parent = this.parentNode;

		if (parent instanceof Node) {
			parent.removeChild(this);
		}
	}

	removeChild(child) {
		const index = this.#children.indexOf(child);

		if (index !== -1) {
			// @TODO Update #parent
			this.#children[index].#parent = null;
			delete this.#children[index];
		}
	}

	replaceChild(newChild, oldChild) {
		const index = this.#children.indexOf(oldChild);

		if (index !== -1) {
			// @TODO update #parent
			oldChild.#parent = null;
			newChild.#parent = this;
			this.#children[index] = newChild;
		}
	}

	replaceChildren(...nodes) {
		this.#children.forEach(child => child.parent = null);
		this.#children = nodes.map(node => {
			if (node instanceof Node) {
				node.#parent = this;
				return node;
			} else {
				const child = new Text(node);
				child.#parent = this;
				return child;
			}
		});
	}

	static ELEMENT_NODE = 1;

	static ATTRIBUTE_NODE = 2;

	static TEXT_NODE = 3;

	static CDATA_SECTION_NODE = 4;

	static PROCESSING_INSTRUCTION_NODE = 7;

	static COMMENT_NODE = 8;

	static DOCUMENT_NODE = 9;

	static DOCUMENT_TYPE_NODE = 10;

	static DOCUMENT_FRAGMENT_NODE = 11;
}

// Exporting from here to avoid circular dependencies
class Text extends Node {
	#text;

	constructor(str) {
		super();
		this.#text = str.toString();
	}

	toString() {
		return this.#text;
	}

	get nodeType() {
		return Node.TEXT_NODE;
	}

	get wholeText() {
		return this.#text;
	}
}

class Attr extends Node {
	#name;
	#value;

	constructor(name) {
		if (typeof name !== 'string' || ! /^[A-Za-z\d\-_]+$/.test(name)) {
			throw new DOMException('String contains an invalid character');
		} else {
			super();
			this.#name = name;
		}
	}

	toString() {
		return `${this.name}="${htmlEscape(this.#value)}"`;
	}

	get name() {
		return this.#name;
	}

	get nodeType() {
		return Node.ATTRIBUTE_NODE;
	}

	get value() {
		return this.#value;
	}

	set value(val) {
		this.#value = val.toString();
	}
}

class DOMTokenList {
	#items;

	constructor() {
		this.#items = new Set();
	}

	toString() {
		return this.value;
	}

	[Symbol.iterator]() {
		return this.values();
	}

	get length() {
		return this.#items.size;
	}

	get value() {
		return [...this.#items].join(' ');
	}

	add(...items){
		items.forEach(item => this.#items.add(item));
	}

	contains(item){
		return this.#items.has(item);
	}

	item(n) {
		return [...this.#items][n];
	}

	*entries() {
		let n = 0;

		for (const value of this) {
			yield [n++, value];
		}
	}

	*keys() {
		for (let n = 0; n < this.#items.size; n++) {
			yield n;
		}
	}

	*values() {
		for (const value of this.#items) {
			yield value;
		}
	}

	remove(...items) {
		items.forEach(item => this.#items.delete(item));
	}
}

class HTMLCollection {
	#items;

	constructor(items) {
		this.#items = Array.from(items);
	}

	get length() {
		return this.#items.length;
	}

	*[Symbol.iterator]() {
		for (const item of this.#items) {
			yield item;
		}
	}

	item(i) {
		return this.#items[i];
	}

	namedItem(name) {
		const named = this.#items.find(el => el.name === name);

		return named || this.#items.find(el => el.id === name);
	}
}

const SELF_CLOSING_TAGS = [
	'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta',
	'param', 'source', 'track', 'wbr', 'circle', 'ellipse', 'line', 'path',
	'polygon', 'polyline', 'rect',
];

class Element extends Node {
	#attrs;
	#classList;
	#part;
	#parent;
	#dataset;

	constructor() {
		super();
		this.#attrs = new Map();
		this.#classList = new DOMTokenList();
		this.#dataset = new Map();
		this.#part = new DOMTokenList();
	}

	toString() {
		return this.outerHTML;
	}

	get attributes() {
		const attrs = [...this.#attrs.values()].map(attr => [attr.name, attr.value]);

		if (this.#dataset.length !== 0) {
			attrs.push(...this.#dataset);
		}

		if (this.#classList.length !== 0) {
			attrs.push(['class', this.#classList.value]);
		}

		if (this.#part.length !== 0) {
			attrs.push(['part', this.#part.value]);
		}

		if ('relList' in this && this.relList.length !==  0) {
			attrs.push(['rel', this.relList.value]);
		}

		if ('sandbox' in this && this.sandbox.length !==  0) {
			attrs.push(['sandbox', this.sandbox.value]);
		}

		return attrs;
	}

	get childElementCount()  {
		return this.children.length;
	}

	get children() {
		return new HTMLCollection([...this.childNodes].filter(node => node instanceof Element));
	}

	get classList() {
		return this.#classList;
	}

	get className() {
		return [...this.#classList].join(' ');
	}

	get dataset() {
		return new Proxy(this.#dataset, {
			get: (map, prop) => {
				return map.get('data-' + spinalCase(prop));
			},
			set: (map, prop, val) => {
				map.set('data-' + spinalCase(prop), val);
				return true;
			}
		});
	}

	get firstElementChild() {
		const children = this.children;
		return children.length === 0 ? null : children.item(0);
	}

	get id() {
		return this.getAttribute('id');
	}

	set id(val) {
		this.setAttribute('id', val);
	}

	get innerHTML() {
		return [...this.childNodes].join('');
	}

	get lastElementChild() {
		const children = this.children;
		return children.length === 0 ? null : children.item(children.length - 1);
	}

	get nextElementSibling() {
		const parent = this.#parent;

		if (parent instanceof Element) {
			const children =  [...parent.childNodes];
			const index = children.indexOf(this);
			return index === -1 ? null : children[index + 1] || null;
		} else {
			return null;
		}
	}

	get part() {
		return this.#part;
	}

	get previousElementSibling() {
		const parent = this.#parent;

		if (parent instanceof Element) {
			const children = [...parent.childNodes];
			const index = children.indexOf(this);
			return index === -1 ? null : children[index -1] || null;
		} else {
			return null;
		}
	}

	get nodeType() {
		return Node.ELEMENT_NODE;
	}

	get outerHTML() {
		const attrs = this.attributes;
		const tag = this.tagName.toLowerCase();
		const isSelfClosing = SELF_CLOSING_TAGS.includes(tag);

		if (isSelfClosing) {
			return attrs.length === 0
				? `<${tag} />`
				: `<${tag} ${attrs.map(([name, val]) => name + '="' + htmlEscape(val) + '"').join(' ')} />`;
		} else if (attrs.length === 0) {
			return `<${tag}>${this.innerHTML}</${tag}>`;
		} else {
			return `<${tag} ${attrs.map(([name, val]) => name + '="' + htmlEscape(val) + '"').join(' ')}>${this.innerHTML}</${tag}>`;
		}
	}

	get tagName() {
		return null;
	}

	get textContent() {
		return this.childNodes.map(child => child instanceof Element ? child.textContent : child.toString()).join('');
	}

	set textContent(val) {
		this.childNodes.forEach(node => this.removeChild(node));
		this.append(htmlEscape(val.toString()));
		// this.#children.clear();
		// this.#children.add(val);
	}


	getAttribute(name) {
		const attr = this.#attrs.get(name);

		if (attr instanceof Node) {
			return attr.value;
		} else {
			return '';
		}
	}

	hasAttribute(attr) {
		return this.#attrs.has(attr) || '';
	}

	prepend(...children) {
		const nodes = children.map(child => child instanceof Node ? child : new Text(child));
		this.replaceChildren(...nodes, ...this.childNodes);
	}

	removeAttribute(attr) {
		this.#attrs.delete(attr);
	}

	setAttribute(name, val) {
		const attr = new Attr(name);
		attr.value = val;
		this.setAttributeNode(attr);
	}

	setAttributeNode(attr) {
		if (attr instanceof Node && attr.nodeType === Node.ATTRIBUTE_NODE) {
			this.#attrs.set(attr.name, attr);
		} else {
			throw new TypeError('Not an Attr.');
		}
	}

	toggleAttribute(attr, force) {
		if (typeof force === 'undefined') {
			this.toggleAttribute(attr, ! this.hasAttribute(attr));
		} else if (force) {
			this.setAttribute(attr, '');
		} else {
			this.removeAttribute(attr);
		}
	}
}

class HTMLElement extends Element {
	get hidden() {
		return this.hasAttribute('hidden');
	}

	set hidden(val) {
		this.toggleAttribute('hidden', val);
	}

	get slot() {
		return this.getAttribute('slot');
	}

	set slot(val) {
		this.setAttribute('slot', val);
	}

	get title() {
		return this.getAttribute('title');
	}

	set title(val) {
		this.setAttribute('title', val);
	}
}

class HTMLUnknownElement extends HTMLElement {
	#tag;

	constructor(tag) {
		super();
		this.#tag = tag.toString().toLowerCase();
	}

	get tagName() {
		return this.#tag.toUpperCase();
	}
}

class DocumentFragment extends Node {
	get nodeType() {
		return Node.DOCUMENT_FRAGMENT_NODE;
	}
}

const registry = new Map();

class Document extends Node {
	get nodeType() {
		return Node.DOCUMENT_NODE;
	}

	get readyState() {
		return 'loading';
	}

	createAttribute(name){
		return new Attr(name);
	}

	createElement(tag) {
		if (registry.has(tag)) {
			const constructor = registry.get(tag);
			return new constructor();
		} else {
			return new HTMLUnknownElement(tag);
		}
	}

	createDocumentFragment() {
		return new DocumentFragment();
	}

	getElementById(id) {
		function findId(id, children) {
			let found = children.find(el => el.id === id);

			if (! (found instanceof Element)) {
				for (const child of children) {
					const el = findId(id, Array.from(child.children));

					if (el instanceof Element) {
						found = el;
						break;
					}
				}
			}

			return found;
		}

		return findId(id, Array.from(this.documentElement.children));
	}

	static registerElement(tag, constructor) {
		registry.set(tag, constructor);
		return constructor;
	}
}

class DocumentType extends Node {
	get name() {
		return 'html';
	}

	get publicId() {
		return '';
	}

	get systemId() {
		return '';
	}

	get nodeType() {
		return Node.DOCUMENT_TYPE_NODE;
	}

	toString() {
		return `<!DOCTYPE ${this.name}>`;
	}
}

const HTMLAnchorElement = Document.registerElement('a', class HTMLAnchorElement extends HTMLElement {
	#relList;

	constructor() {
		super();
		this.#relList = new DOMTokenList();
	}

	get download() {
		return this.getAttribute('download');
	}

	set download(val) {
		this.setAttribute('download', val);
	}

	get href() {
		return this.getAttribute('href');
	}

	set href(val) {
		this.setAttribute('href', val);
	}

	get rel() {
		return this.#relList.value;
	}

	set rel(val) {
		this.#relList.remove(...this.#relList.values());
		this.#relList.add(...val.split(' '));
	}

	get relList() {
		return this.#relList;
	}

	get tagName() {
		return 'A';
	}

	get target(){
		return this.getAttribute('target');
	}

	set target(val) {
		this.setAttribute('target', val);
	}
});

const HTMLAsideElement = Document.registerElement('aside', class HTMLAsideElement extends HTMLElement {
	get tagName() {
		return 'ASIDE';
	}
});

const HTMLBodyElement = Document.registerElement('body', class HTMLBodyElement extends HTMLElement {
	get tagName() {
		return 'BODY';
	}
});

const HTMLButtonElement = Document.registerElement('button', class HTMLButtonElement extends HTMLElement {
	get disabled() {
		return this.hasAttribute('disabled');
	}

	set disabled(val) {
		this.toggleAttribute('disabled', val);
	}

	get tagName() {
		return 'BUTTON';
	}

	get type() {
		return this.getAttribute('type') || 'button';
	}

	set type(val) {
		this.setAttribute('type', val);
	}
});

const HTMLDivElement = Document.registerElement('div', class HTMLDivElement extends HTMLElement {
	get tagName() {
		return 'DIV';
	}
});

const HTMLFooterElement = Document.registerElement('footer', class HTMLFooterElement extends HTMLElement {
	get tagName() {
		return 'FOOTER';
	}
});

const HTMLIFrameElement = Document.registerElement('iframe', class HTMLIFrameElement extends HTMLElement {
	#sandbox;

	constructor() {
		super();
		this.#sandbox = new DOMTokenList();
	}

	get sandbox() {
		return this.#sandbox;
	}

	get src() {
		return this.getAttribute('src');
	}

	set src(val) {
		this.setAttribute('src', val);
	}

	get tagName() {
		return 'IFRAME';
	}
});

const HTMLInputElement = Document.registerElement('input', class HTMLInputElement extends HTMLElement {
	get disabled() {
		return this.hasAttribute('disabled');
	}

	set disabled(val) {
		this.toggleAttribute('disabled',  val);
	}

	get required() {
		return this.hasAttribute('required');
	}

	set required(val) {
		this.toggleAttribute('required', val);
	}

	get tagName() {
		return 'INPUT';
	}

	get type() {
		return this.getAttribute('type') || 'text';
	}

	set type(val) {
		this.setAttribute('type', val);
	}
});

const HTMLHeadElement = Document.registerElement('head', class HTMLHeadElement extends HTMLElement {
	get tagName() {
		return 'HEAD';
	}
});

const HTMLHeaderElement = Document.registerElement('header', class HTMLHeaderElement extends HTMLElement {
	get tagName() {
		return 'HEADER';
	}
});

const HTMLHtmlElement = Document.registerElement('html', class HTMLHtmlElement extends HTMLElement {
	get tagName() {
		return 'HTML';
	}
});

const HTMLImageElement = Document.registerElement('img', class HTMLImageElement extends HTMLElement {
	constructor() {
		super();
	}

	get alt() {
		return this.getAttribute('alt');
	}

	set alt(val) {
		this.setAttribute('alt', val);
	}

	get crossOrigin() {
		return this.getAttribute('crossorigin');
	}

	set crossOrigin(val) {
		this.setAttribute('crossorigin', val);
	}

	get height() {
		if (this.hasAttribute('height')) {
			return parseInt(this.getAttribute('height'));
		} else {
			return undefined;
		}
	}

	set height(val) {
		if (Number.isFinite(val)) {
			this.setAttribute('height', val.toString());
		} else if (! Number.isNaN(val)) {
			this.height = parseInt(val);
		}
	}

	get loading() {
		return this.getAttribute('loading') ?? 'auto';
	}

	set loading(val) {
		this.setAttribute('loading', val);
	}

	get naturalHeight() {
		return 0;
	}

	get naturalWidth() {
		return 0;
	}

	get referrerPolicy() {
		return this.getAttribute('referrerpolicy');
	}

	set referrerPolicy(val) {
		this.setAttribute('referrerpolicy', val);
	}

	get src() {
		return this.getAttribute('src');
	}

	set src(val){
		this.setAttribute('src', val);
	}

	get tagName() {
		return 'IMG';
	}

	get width() {
		if (this.hasAttribute('width')) {
			return parseInt(this.getAttribute('width'));
		} else {
			return undefined;
		}
	}

	set width(val) {
		if (Number.isFinite(val)) {
			this.setAttribute('width', val.toString());
		} else if (! Number.isNaN(val)) {
			this.width = parseInt(val);
		}
	}

	decode() {
		return Promise.resolve();
	}
});

const HTMLLinkElement = Document.registerElement('link', class HTMLLinkElement extends HTMLElement {
	#relList;

	constructor() {
		super();
		this.#relList = new DOMTokenList();
	}

	get href() {
		return this.getAttribute('href');
	}

	set href(val) {
		this.setAttribute('href', val);
	}

	get media() {
		return this.getAttribute('media');
	}

	set media(val) {
		this.setAttribute('media', val);
	}

	get rel() {
		return this.#relList.value;
	}

	set rel(val) {
		this.#relList.remove(...this.#relList.values());
		this.#relList.add(...val.split(' '));
	}

	get relList() {
		return this.#relList;
	}

	get tagName() {
		return 'LINK';
	}
});

const HTMLMainElement = Document.registerElement('main', class HTMLMainElement extends HTMLElement {
	get tagName() {
		return 'Main';
	}
});

const HTMLNavElement = Document.registerElement('nav', class HTMLNavElement extends HTMLElement {
	get tagName() {
		return 'NAV';
	}
});

const HTMLScriptElement = Document.registerElement('script', class HTMLScriptElement extends HTMLElement {
	get async() {
		return this.hasAttribute('async');
	}

	set async(val) {
		this.toggleAttribute('async', val);
	}

	get crossOrigin() {
		return this.getAttribute('crossorigin');
	}

	set crossOrigin(val) {
		this.setAttribute('crossorigin', val);
	}

	get defer() {
		return this.hasAttribute('defer');
	}

	set defer(val) {
		this.toggleAttribute('defer', val);
	}

	get fetchPriority() {
		return this.getAttribute('fetchpriority') || 'auto';
	}

	set fetchPriority(val) {
		this.setAttribute('fetchpriority', val);
	}

	get integrity() {
		return this.getAttriute('integrity');
	}

	set integrity(val) {
		this.setAttribute('indegrity', val);
	}

	get noModule() {
		return this.hasAttribute('nomodule');
	}

	set noModule(val) {
		this.toggleAttribute('nomodule', val);
	}

	get referrerPolicy() {
		return this.getAttribute('referrerpolicy');
	}

	set referrerPolicy(val) {
		this.setAttribute('referrerpolicy', val);
	}

	get src() {
		return this.getAttribute('src');
	}

	set src(val) {
		this.setAttribute('src', val);
	}

	get tagName() {
		return 'SCRIPT';
	}

	get type() {
		return this.getAttribute('type');
	}

	set type(val) {
		this.setAttribute('type', val);
	}
});

const HTMLSectionElement = Document.registerElement('section', class HTMLSectionElement extends HTMLElement {
	get tagName() {
		return 'SECTION';
	}
});

const HTMLSlotElement = Document.registerElement('slot', class HTMLSlotElement extends HTMLElement {});

const HTMLSpanElement = Document.registerElement('span', class HTMLSpanElement extends HTMLElement {
	get tagName() {
		return 'SPAN';
	}
});

const HTMLTitleElement = Document.registerElement('title', class HTMLTitleElement extends HTMLElement {
	get tagName() {
		return 'TITLE';
	}
});

class HTMLDocument extends Document {
	#documentElement;
	#head;
	#body;
	#doctype;

	constructor() {
		super();

		this.#documentElement = new HTMLHtmlElement();
		this.#head = new HTMLHeadElement();
		this.#body = new  HTMLBodyElement();
		this.#documentElement.append(this.#head, this.#body);
		this.#doctype = new DocumentType();
		this.append(this.#doctype, this.#documentElement);
	}

	get body() {
		return this.#body;
	}

	get head() {
		return this.#head;
	}

	get doctype() {
		return this.#doctype;
	}

	get documentElement() {
		return this.#documentElement;
	}

	get title() {
		const title = [...this.childNodes].find(node => node instanceof HTMLTitleElement);

		if (title instanceof HTMLTitleElement) {
			return title.textContent;
		} else {
			return '';
		}
	}

	set title(val) {
		const current = [...this.head.childNodes].find(node => node instanceof HTMLTitleElement);

		if (current instanceof HTMLTitleElement) {
			current.textContent = val.toString();
		} else {
			const title = this.createElement('title');
			title.textContent = val.toString();
			this.head.appendChild(title);
		}
	}

	toString() {
		return `${this.doctype}${this.documentElement}`;
	}
}

export { Attr, DOMTokenList, Document, DocumentFragment, DocumentType, Element, HTMLAnchorElement, HTMLAsideElement, HTMLBodyElement, HTMLButtonElement, HTMLCollection, HTMLDivElement, HTMLDocument, HTMLElement, HTMLFooterElement, HTMLHeadElement, HTMLHeaderElement, HTMLHtmlElement, HTMLIFrameElement, HTMLImageElement, HTMLInputElement, HTMLLinkElement, HTMLMainElement, HTMLNavElement, HTMLScriptElement, HTMLSectionElement, HTMLSlotElement, HTMLSpanElement, HTMLTitleElement, HTMLUnknownElement, Node, Text };
