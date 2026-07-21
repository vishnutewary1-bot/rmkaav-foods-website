const { JSDOM } = require('jsdom');
const fs = require('fs');
const SRC = require('path').resolve(__dirname, '..');
const js = fs.readFileSync(SRC + '/assets/js/main.js', 'utf8');
let pass = 0, fail = 0;
const ok = (c, m) => { c ? (pass++, console.log('  PASS ' + m)) : (fail++, console.log('  FAIL ' + m)); };

function load(page, url) {
  const dom = new JSDOM(fs.readFileSync(SRC + '/' + page, 'utf8'),
    { url, runScripts: 'outside-only', pretendToBeVisual: true });
  // jsdom does not implement these two browser APIs; real browsers do.
  dom.window.matchMedia = () => ({ matches: false, addListener(){}, removeListener(){} });
  if (!dom.window.IntersectionObserver) {
    dom.window.IntersectionObserver = class { observe(){} unobserve(){} disconnect(){} };
  }
  dom.window.eval(js);
  return dom.window;
}

console.log('\n--- Product page: birchun-powder.html ---');
let w = load('products/birchun-powder.html', 'https://rmkaavfoods.com/products/birchun-powder.html');
let d = w.document;

const buys = [...d.querySelectorAll('[data-order]')];
ok(buys.length === 2, `2 Buy Now buttons wired (found ${buys.length})`);
ok(buys.every(b => b.href.startsWith('https://wa.me/917068946333')),
   'both route to WhatsApp, working even with JS disabled');
const msg = decodeURIComponent(buys[0].href.split('text=')[1]);
ok(msg.includes('Birchun Powder (50g)') && msg.includes('₹249'),
   'order message carries product, size and price');
console.log('       message: ' + JSON.stringify(msg.split('\n')[2]));

const thumbs = [...d.querySelectorAll('.product-gallery__thumb')];
const main = d.getElementById('product-main-image');
ok(thumbs.length === 3, `gallery has 3 thumbnails (found ${thumbs.length})`);
ok(main.src.endsWith('birchun-1.webp'), 'main image starts on photo 1');
thumbs[2].dispatchEvent(new w.Event('click', { bubbles: true }));
ok(main.src.endsWith('birchun-3.webp'), 'clicking thumb 3 swaps the main image');
ok(thumbs[2].classList.contains('is-active') && !thumbs[0].classList.contains('is-active'),
   'active state moves to the clicked thumbnail');

const toggle = d.querySelector('.site-nav__dropdown-toggle');
ok(toggle && toggle.tagName === 'BUTTON', 'Products trigger is a real button');
ok(toggle.getAttribute('aria-expanded') === 'false', 'dropdown starts collapsed');
toggle.dispatchEvent(new w.Event('click', { bubbles: true }));
ok(toggle.getAttribute('aria-expanded') === 'true', 'click expands the dropdown');
d.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
ok(toggle.getAttribute('aria-expanded') === 'false', 'Escape collapses it');

const current = [...d.querySelectorAll('[aria-current="page"]')];
ok(!current.some(e => e.classList.contains('site-nav__dropdown-toggle')),
   'Products no longer falsely marked as current page');

console.log('\n--- Homepage: / ---');
w = load('index.html', 'https://rmkaavfoods.com/'); d = w.document;
const home = [...d.querySelectorAll('.site-nav__link')].find(a => a.textContent.trim() === 'Home');
ok(home.getAttribute('aria-current') === 'page',
   'Home correctly marked current when served at /');

const nl = d.getElementById('newsletter-form');
ok(nl && !nl.getAttribute('action'), 'newsletter form no longer posts to "#"');
nl.querySelector('input[type=email]').value = 'test@example.com';
let opened = null; w.open = (u) => { opened = u; return null; };
nl.dispatchEvent(new w.Event('submit', { bubbles: true, cancelable: true }));
ok(opened && opened.includes('wa.me'), 'newsletter falls back to WhatsApp, not silent loss');
ok(!d.getElementById('newsletter-status').hidden, 'user sees a status message');
console.log('       status: ' + JSON.stringify(d.getElementById('newsletter-status').textContent));

console.log('\n--- Contact page ---');
w = load('contact.html', 'https://rmkaavfoods.com/contact.html'); d = w.document;
const cf = d.getElementById('contact-form');
ok(cf && !(cf.getAttribute('action') || '').includes('PLACEHOLDER'),
   'contact form no longer posts to formspree PLACEHOLDER');
d.getElementById('contact-name').value = 'Test';
d.getElementById('contact-email').value = 't@e.com';
d.getElementById('contact-message').value = 'Hello';
opened = null; w.open = (u) => { opened = u; return null; };
cf.dispatchEvent(new w.Event('submit', { bubbles: true, cancelable: true }));
ok(opened && decodeURIComponent(opened).includes('Hello'),
   'contact enquiry reaches WhatsApp with the message body');

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
