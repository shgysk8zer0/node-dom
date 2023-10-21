# @shgysk8zer0/node-dom

A basic DOM implementation for node.

[![CodeQL](https://github.com/shgysk8zer0/node-dom/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/shgysk8zer0/node-dom/actions/workflows/codeql-analysis.yml)
![Node CI](https://github.com/shgysk8zer0/node-dom/workflows/Node%20CI/badge.svg)
![Lint Code Base](https://github.com/shgysk8zer0/node-dom/workflows/Lint%20Code%20Base/badge.svg)

[![GitHub license](https://img.shields.io/github/license/shgysk8zer0/node-dom.svg)](https://github.com/shgysk8zer0/node-dom/blob/master/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/shgysk8zer0/node-dom.svg)](https://github.com/shgysk8zer0/node-dom/commits/master)
[![GitHub release](https://img.shields.io/github/release/shgysk8zer0/node-dom?logo=github)](https://github.com/shgysk8zer0/node-dom/releases)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/shgysk8zer0?logo=github)](https://github.com/sponsors/shgysk8zer0)

[![npm](https://img.shields.io/npm/v/@shgysk8zer0/node-dom)](https://www.npmjs.com/package/@shgysk8zer0/node-dom)
![node-current](https://img.shields.io/node/v/@shgysk8zer0/node-dom)
![npm bundle size gzipped](https://img.shields.io/bundlephobia/minzip/@shgysk8zer0/node-dom)
[![npm](https://img.shields.io/npm/dw/@shgysk8zer0/node-dom?logo=npm)](https://www.npmjs.com/package/@shgysk8zer0/node-dom)

[![GitHub followers](https://img.shields.io/github/followers/shgysk8zer0.svg?style=social)](https://github.com/shgysk8zer0)
![GitHub forks](https://img.shields.io/github/forks/shgysk8zer0/node-dom.svg?style=social)
![GitHub stars](https://img.shields.io/github/stars/shgysk8zer0/node-dom.svg?style=social)
[![Twitter Follow](https://img.shields.io/twitter/follow/shgysk8zer0.svg?style=social)](https://twitter.com/shgysk8zer0)

[![Donate using Liberapay](https://img.shields.io/liberapay/receives/shgysk8zer0.svg?logo=liberapay)](https://liberapay.com/shgysk8zer0/donate "Donate using Liberapay")
- - -

- [Code of Conduct](./.github/CODE_OF_CONDUCT.md)
- [Contributing](./.github/CONTRIBUTING.md)
<!-- - [Security Policy](./.github/SECURITY.md) -->

> [!WARNING]
> This project is under development and **IS NOT** intended for parsing HTML.
> Expect missing attributes and methods, `document.createElement()` resulting in
> `HTMLUnknownElement`s, etc.

> This project aims to help in creating elements and documents using familiar
> methods while being rather minimal.

## Installation

```bash
npm i @shgysk8zer0/node-dom --save
```

## Example

```js
import { HTMLDocument } from '@shgysk8zer0/node-dom';
import { FORM_MULTIPART } from '@shgysk8zer0/consts/mimes';

const document = new HTMLDocument();
const base = document.createElement('base');
const main  = document.createElement('main');
const frag = document.createDocumentFragment();
const a = document.createElement('a');
const div = document.createElement('div');
const img = document.createElement('img');
const script = document.createElement('script');
const link = document.createElement('link');
const iframe = document.createElement('iframe');
const meta = document.createElement('meta');
const form = document.createElement('form');
const input = document.createElement('input');
const label = document.createElement('label');
const time = document.createElement('time');
const footer = document.createElement('footer');

document.title = 'Node Test';

base.href = 'https://example.com';

img.src = 'https://example.com/img.png';
img.id = 'logo';
img.alt = 'Logo';
img.loading = 'lazy';
img.crossOrigin = 'anonymous';
img.referrerPolicy = 'no-referrer';
img.height = 64;
img.width = 64;
img.dataset.fooBar = '42';
img.classList.add('block', 'card');

script.src = '/js/index.js';
script.defer = true;
script.type = 'module';
script.crossOrigin = 'anonymous';
script.referrerPolicy = 'no-referrer';
script.fetchPriority = 'high';

a.href = img.src;
a.download = img.src.split('/').at(-1);
a.title = 'A "d&ngerous" <filename>';
a.relList.add('noreferrer', 'noopener');
a.target = '_blank';
a.append(img);

div.classList.add('container');
div.append(a);

link.href = '/css/styles.css';
link.relList.add('stylesheet');
link.media = 'all';

iframe.src = 'https://events.kernvalley.us/embed/';
iframe.sandbox.add('allow-script');
iframe.part.add('content');

document.head.append(base, link, script);

meta.charset = 'utf-8';

frag.append(div, '&<<<<dangerous "content">', iframe);
main.append(frag, document.createElement('hr'));

form.name = 'test';
form.action = '/api';
form.method = 'POST';
form.encoding = FORM_MULTIPART;

input.name = 'foo';
input.id = 'input';
input.value = 'bar';
input.required = true;

label.htmlFor = input.id;
label.textContent = 'Some Text';

form.append(label, input);
main.prepend(form);

const date = new Date();
time.dateTime = date.toISOString();
time.textContent = date.toLocaleString();
footer.append(time);

console.log(document.toString());
```

## Limitations

This DOM implementation is intentionally limited and mostly useful for constructing,
not parsing or manipulating. It only aims to be able to create Elements & Documents
that end up being saved or sent as strings.

## Implementation Differences

- All elements can be created using `new SomeElement()`
- All elements return their `outerHTML` via `toString()`
- `Document` has additional static `createElement()` & `registerElement()` methods
- There is no global `document` unless you create it (`globalThis.document = new HTMLDocument()`)
- The element classes are not attached to the global object either (e.g. no `HTMLScriptElement`)
- Some property getters associated with attributes may return the wrong types when not set (e.g. `''` instead of `null` or `undefined`)

### Not Yet Implemented / Incorrect Implementations

- Namespaces for attributes and elements (`element.setAttributeNS()`)
- Doctype will always be `<!DOCTYPE html>`
- `elememt.after()`, `element.before()`, `node.insertBefore()`, `node.insertAfter()`
- `node.cloneNode()`, `node.isSameNode()`, `node.isEqualNode()`
- `Element.attributes` returns an array instead of a `NamedNodeMap`
- `relList`, `classList`, `part`, `dataset` are stored separately from other attributes and cannot be accessed through `getAttribute()` & `setAttribute()`
- `element.style` not supported except as `element.setAttribute('style', style)`
-  [`aria*`](https://developer.mozilla.org/en-US/docs/Web/API/Element#instance_properties_included_from_aria) properties
- Tables and many form/input properties and methods
- Various properties, methods, and classes

### Not Planned

- `DOMParser()`, `set innerHTML`, or anything that requires parsing HTML
- `querySelector()`, `querySelectorAll()`, `element.matches()`, `element.closest()`, etc.

### Things that Do Not Make Sense Here

- Various `<canvas>` methods
- Animations
- Form Validation
- Dispatching events such as `load`, `click`, etc
- Any properties or methods that depend on how a document is rendered (`DOMRect`, `offset*`, etc)
- Scroll properties and methods
- Custom Elements / Web Components / ShadowRoot
