import { HTMLDocument } from '@shgysk8zer0/node-dom';
import { FORM_MULTIPART } from '@shgysk8zer0/consts/mimes.js';

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
main.prepend(form);

const date = new Date();
time.dateTime = date.toISOString();
time.textContent = date.toLocaleString();
footer.append(time);

document.body.append(
	document.createElement('header'),
	document.createElement('nav'),
	main,
	document.createElement('aside'),
	footer,
);

// const logo = document.getElementById('logo');
// logo.classList.add('matched');
console.log(document.toString());

// await writeFile('./index.html', document.toString(), 'utf8');
