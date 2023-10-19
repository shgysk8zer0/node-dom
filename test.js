import { HTMLDocument } from '@shgysk8zer0/node-dom';

const document = new HTMLDocument();
const main  = document.createElement('main');
const frag = document.createDocumentFragment();
const a = document.createElement('a');
const div = document.createElement('div');
const img = document.createElement('img');
const script = document.createElement('script');
const link = document.createElement('link');
const iframe = document.createElement('iframe');
const meta = document.createElement('meta');

document.title = 'Node Test';

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
div.append(a);

link.href = '/css/styles.css';
link.relList.add('stylesheet');
console.log(link.relList.length);
link.media = 'all';

iframe.src = 'https://events.kernvalley.us/embed/';
iframe.sandbox.add('allow-script');
iframe.part.add('content');

document.head.append(link, script);

meta.setAttribute('charset', 'utf-8');
document.head.prepend(meta);
frag.append(div, '&<<<<dangerous "content">', iframe);
main.append(frag);

document.body.append(
	document.createElement('header'),
	document.createElement('nav'),
	main,
	document.createElement('aside'),
	document.createElement('footer'),
);

// const logo = document.getElementById('logo');
// logo.classList.add('matched');
console.log(document.toString());

// await writeFile('./index.html', document.toString(), 'utf8');
