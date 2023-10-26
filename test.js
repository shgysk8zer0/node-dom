import { HTMLDocument } from '@shgysk8zer0/node-dom';
import { FORM_MULTIPART } from '@shgysk8zer0/consts/mimes.js';
import { getNodeGenerators } from './utils.js';
import { Node } from './Node.js';
// import { NodeFilter } from './NodeFilter.js';

const date = new Date();
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
document.documentElement.classList.add('foo');

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
img.classList.add('block', 'card',  'foo');

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
iframe.hidden = true;
iframe.attributes.removeNamedItem('hidden');

document.head.append(base, link, script);

meta.charset = 'utf-8';
document.head.prepend(meta, ...(() => {
	const color = document.createElement('meta');
	const http = document.createElement('meta');

	color.name = 'color-scheme';
	color.content = 'light dark';

	http.httpEquiv = 'Content-Security-Policy';
	http.content = 'default-src \'none\'';
	return [color, http];
})());

frag.append(div, '&<<<<dangerous "content">', iframe);
main.append(frag, document.createElement('hr'));
main.attachShadow({ mode: 'open' });


form.name = 'test';
form.action = '/api';
form.method = 'POST';
form.encoding = FORM_MULTIPART;

input.name = 'foo';
input.type = 'number';
input.id = 'input';
input.value = 5;
input.min = Number.MIN_SAFE_INTEGER;
input.max = Number.MAX_SAFE_INTEGER;
input.step = 10;
input.size = 10;
input.placeholder = '####';
input.required = true;
input.stepUp(100);

label.htmlFor = input.id;
label.textContent = 'Some Text';

form.append(label, input);
// main.prepend(form);

time.dateTime = date.toISOString();
time.textContent = date.toLocaleString();
footer.append(time);

document.body.setAttributeNS('https://ns.org', 'x:foo', 'bar');

document.body.append(
	document.createElement('header'),
	document.createElement('nav'),
	main,
	document.createElement('aside'),
	footer,
);

document.body.prepend(
	document.createComment('header'),
	document.createElementNS('https://ns.org', 'x:foo'),
	time.cloneNode(true),
);

const [nextGen, prevGen] = getNodeGenerators(document);
let n = 0;
let cur = null;

for (const node of nextGen) {
	if (n++ > 100 || ! (node instanceof Node)) {
		break;
	} else {
		cur = node;
	}
}

console.log(`Now in reverse, starting from ${cur}`);

const length = n;
for (const node of prevGen) {
	if (n < 0) {
		console.error('Too Far!');
		break;
	}

	if (n === 0 || ! (node instanceof Node)) {
		break;
	} else {
		console.log(`${node.nodeName} [${node.nodeType}]. #${n} of ${length}`);
	}

	n--;
}

// let n = 0;
// let walker = createWalker(document.body);
// let node = walker.nextNode();

// while (node !== null && n++ < 100) {
// 	console.log(`${node.nodeName} [${node.nodeType}]`);
// 	node = walker.nextNode();
// }
