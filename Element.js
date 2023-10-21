import { spinalCase, htmlEscape, getDescendants } from './utils.js';
import { DOMTokenList } from './DOMTokenList.js';
import { HTMLCollection } from './HTMLCollection.js';
// import { NamedNodeMap } from './NamedNodeMap.js';
import { Attr } from './Attr.js';
import { Node, Text } from './Node.js';

const SELF_CLOSING_TAGS = [
	'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta',
	'param', 'source', 'track', 'wbr', 'circle', 'ellipse', 'line', 'path',
	'polygon', 'polyline', 'rect',
];

export class Element extends Node {
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
		return new HTMLCollection([...this.childNodes].filter(node => node.nodeType === Node.ELEMENT_NODE));
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
		this.replaceChildren(new Text(val));
	}

	getAttribute(name) {
		const attr = this.getAttributeNode(name);

		if (attr instanceof Node) {
			return attr.value;
		} else {
			return '';
		}
	}

	getElementsByClassName(names) {
		const classList = names.trim().split(' ').filter(str => str.length !== 0);

		// Better for performance
		if (classList.length === 1) {
			return new HTMLCollection(getDescendants(this, el => el.classList.includes(classList[0])));
		} else {
			return new HTMLCollection(getDescendants(this, el => classList.every(name => el.classList.includes(name))));
		}
	}

	getElementsByTagName(tagName) {
		const tag = tagName.toLowerCase();
		return new HTMLCollection(getDescendants(this, el  => el.tagName.toLowerCase() === tag));
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

	getAttributeNode(name) {
		return this.#attrs.get(name);
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
