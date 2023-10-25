import { spinalCase, htmlEscape, getElementsByClassName, getElementsByTagName } from './utils.js';
import { DOMTokenList } from './DOMTokenList.js';
import { HTMLCollection } from './HTMLCollection.js';
import { NamedNodeMap } from './NamedNodeMap.js';
import { ShadowRoot } from './ShadowRoot.js';
import { Attr } from './Attr.js';
import { Node, Text } from './Node.js';

const SELF_CLOSING_TAGS = [
	'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta',
	'param', 'source', 'track', 'wbr', 'circle', 'ellipse', 'line', 'path',
	'polygon', 'polyline', 'rect',
];

export class Element extends Node {
	#attributes;
	#dataset;
	#shadow;

	constructor(nodeName = '', namespaceURI) {
		super(nodeName, namespaceURI);
		this.#attributes = new NamedNodeMap();

		this.#dataset = new Proxy(this, {
			deleteProperty: (el, prop) => {
				el.removeProperty('data-' + spinalCase(prop));
			},
			has: (el, prop) => el.hasAttribute('data-' + spinalCase(prop)),
			get: (el, prop) => el.getAttribute('data-' + spinalCase(prop)),
			set: (el, prop, val) => {
				el.setAttribute('data-' + spinalCase(prop), val);
				return true;
			}
		});
	}

	toString() {
		return this.outerHTML;
	}

	get attributes() {
		return this.#attributes;
	}

	get childElementCount()  {
		return this.children.length;
	}

	get children() {
		return new HTMLCollection([...this.childNodes].filter(node => node.nodeType === Node.ELEMENT_NODE));
	}

	get classList() {
		return new DOMTokenList(this, 'class');
	}

	get className() {
		return this.getAttribute('class');
	}

	set className(val) {
		this.setAttribute('class', val);
	}

	get dataset() {
		return this.#dataset;
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
		const parent = this.parentElement;

		if (parent instanceof Element) {
			const children =  [...parent.childNodes];
			const index = children.indexOf(this);
			return index === -1 ? null : children[index + 1] || null;
		} else {
			return null;
		}
	}

	get part() {
		return new DOMTokenList(this, 'part');
	}

	get previousElementSibling() {
		const parent = this.parentElement;

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
				: `<${tag} ${attrs.map(({ name, value = '' }) => name + '="' + htmlEscape(value) + '"').join(' ')} />`;
		} else if (attrs.length === 0) {
			return `<${tag}>${this.innerHTML}</${tag}>`;
		} else {
			return `<${tag} ${attrs.map(({ name, value = '' }) => name + '="' + htmlEscape(value) + '"').join(' ')}>${this.innerHTML}</${tag}>`;
		}
	}

	get shadowRoot() {
		const shadow = this.#shadow;

		if (shadow instanceof ShadowRoot && shadow.mode === 'open') {
			return shadow;
		} else {
			return null;
		}
	}

	get tagName() {
		if (this.prefix === null) {
			return this.nodeName.toUpperCase();
		} else {
			return this.nodeName;
		}
	}

	get textContent() {
		return this.childNodes.map(child => child instanceof Element ? child.textContent : child.toString()).join('');
	}

	set textContent(val) {
		this.replaceChildren(new Text(val));
	}

	attachShadow({ mode, delegatesFocus = false, slotAssignment = 'named' }) {
		if (this.#shadow instanceof ShadowRoot) {
			throw new DOMException('Operation is not supported');
		} else {
			const shadow = new ShadowRoot(this, {mode, delegatesFocus, slotAssignment });

			this.#shadow = shadow;
			return shadow;
		}
	}

	before(...nodes) {
		const parent = this.parentElement;

		if (parent instanceof Element) {
			nodes.forEach(node => parent.insertBefore(node, this));
		}
	}

	cloneNode(deep = false) {
		const clone = super.cloneNode(deep);
		clone.#attributes = this.attributes.map(attr => attr.cloneNode());

		return clone;
	}

	getAttribute(name) {
		const attr = this.getAttributeNode(name);

		if (attr instanceof Node) {
			return attr.value;
		} else {
			return '';
		}
	}

	getAttributeNames() {
		return this.attributes.map(({ name })  => name);
	}

	getElementsByClassName(className) {
		return getElementsByClassName(this, className);
	}

	getElementsByTagName(tagName) {
		return getElementsByTagName(this, tagName);
	}

	hasAttribute(attr) {
		return this.attributes.some(({ name }) => name === attr);
	}

	hasAttributeNS(namespace, attr) {
		return this.attributes.some(({ name, namespaceURI }) => name === attr && namespaceURI === namespace);
	}

	isEqualNode(otherNode) {
		return super.isEqualNode(otherNode)
			&& this.attributes.length === otherNode.attributes.length
			&& [...this.attributes].every(
				attr => otherNode.getAttributeNodeNS(attr.namespaceURI, attr.name).isEqualNode(attr)
			);
	}

	prepend(...children) {
		if (this.childElementCount === 0) {
			this.append(...children);
		} else {
			const nodes = children.map(child => child instanceof Node ? child : new Text(child));
			this.lastElementChild.before(...nodes);
		}
	}

	removeAttribute(attr) {
		this.attributes.removeNamedItem(attr);
	}

	removeAttributeNS(namespace, attr) {
		this.attributes.removeNamedItem(namespace, attr);
	}

	setAttribute(name, val) {
		this.setAttributeNS(null, name, val);
	}

	setAttributeNS(namespaceURI, name, val) {
		const attr = new Attr(name, namespaceURI);
		attr.value = val;
		this.setAttributeNodeNS(attr);
	}

	getAttributeNode(name) {
		return this.attributes.getNamedItem(name);
	}

	getAttributeNodeNS(namespace,  name) {
		return this.attributes.getNamedItemNS(namespace, name);
	}

	setAttributeNode(attr) {
		if (attr instanceof Node && attr.nodeType === Node.ATTRIBUTE_NODE) {
			attr.ownerElement = this;
			const oldVal = this.attributes.setNamedItem(attr);
			attr.parentNode = this;
			return oldVal;
		} else {
			throw new TypeError('Element.setAttributeNode: Argument 1 does not implement interface Attr.');
		}
	}

	setAttributeNodeNS(attr) {
		if (attr instanceof Node && attr.nodeType === Node.ATTRIBUTE_NODE) {
			const oldVal = this.attributes.setNamedItemNS(attr);
			attr.parentNode = this;
			return oldVal;
		} else {
			throw new TypeError('Element.setAttributeNode: Argument 1 does not implement interface Attr.');
		}
	}

	toggleAttribute(attr, force) {
		if (typeof force === 'undefined') {
			return this.toggleAttribute(attr, ! this.hasAttribute(attr));
		} else if (force) {
			this.setAttribute(attr, '');
			return true;
		} else {
			this.removeAttribute(attr);
			return false;
		}
	}
}
