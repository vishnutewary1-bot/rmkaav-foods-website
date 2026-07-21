const { JSDOM } = require('jsdom');
const fs = require('fs');
const SRC = require('path').resolve(__dirname, '..');
const productsDataJs = fs.readFileSync(SRC + '/assets/js/products-data.js', 'utf8');
const mainJs = fs.readFileSync(SRC + '/assets/js/main.js', 'utf8');

// Simulate the ONLY edit the user will make later: pasting a Razorpay
// Payment Page URL into products-data.js (the single shared config file).
const patchedProductsData = productsDataJs.replace(
  /'birchun': \{\s*name: 'Birchun Powder',\s*weight: '50g',\s*price: 249,\s*image: '[^']*',\s*url: '[^']*',\s*razorpayUrl: ''/,
  `'birchun': { name: 'Birchun Powder', weight: '50g', price: 249, image: '/assets/images/products/birchun-1.webp', url: '/products/birchun-powder.html', razorpayUrl: 'https://rzp.io/l/birchun-test'`
);
if (patchedProductsData === productsDataJs) {
  console.log('FAIL: config block did not match — flip would not work');
  process.exit(1);
}

const dom = new JSDOM(fs.readFileSync(SRC + '/products/birchun-powder.html', 'utf8'),
  { url: 'https://rmkaavfoods.com/products/birchun-powder.html', runScripts: 'outside-only' });
dom.window.matchMedia = () => ({ matches: false, addListener(){}, removeListener(){} });
dom.window.IntersectionObserver = class { observe(){} unobserve(){} disconnect(){} };
dom.window.eval(patchedProductsData);
dom.window.eval(mainJs);

const d = dom.window.document;
const buys = [...d.querySelectorAll('[data-order="birchun"]')];
let pass = 0, fail = 0;
const ok = (c,m) => { c ? (pass++, console.log('  PASS '+m)) : (fail++, console.log('  FAIL '+m)); };

ok(buys.length === 2, 'both Buy Now buttons found');
ok(buys.every(b => b.href === 'https://rzp.io/l/birchun-test'),
   'both flipped to the Razorpay URL with zero HTML edits');
ok(buys.every(b => !b.getAttribute('target')),
   'target="_blank" removed so checkout opens in the same tab');
const note = d.querySelector('[data-payment-note]');
ok(note && note.textContent.includes('Razorpay'),
   'trust row now truthfully advertises Razorpay checkout');
console.log('       trust row: ' + JSON.stringify(note.textContent.trim()));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
