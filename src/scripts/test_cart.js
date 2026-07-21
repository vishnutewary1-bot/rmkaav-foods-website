const { JSDOM } = require('jsdom');
const fs = require('fs');
const SRC = require('path').resolve(__dirname, '..');
const productsDataJs = fs.readFileSync(SRC + '/assets/js/products-data.js', 'utf8');
const cartJs = fs.readFileSync(SRC + '/assets/js/cart.js', 'utf8');

let pass = 0, fail = 0;
const ok = (c, m) => { c ? (pass++, console.log('  PASS ' + m)) : (fail++, console.log('  FAIL ' + m)); };

function loadCartPage() {
  const dom = new JSDOM(fs.readFileSync(SRC + '/cart.html', 'utf8'),
    { url: 'https://rmkaavfoods.com/cart.html', runScripts: 'outside-only', pretendToBeVisual: true });
  dom.window.matchMedia = () => ({ matches: false, addListener(){}, removeListener(){} });
  dom.window.IntersectionObserver = class { observe(){} unobserve(){} disconnect(){} };
  dom.window.eval(productsDataJs);
  dom.window.eval(cartJs);
  return dom.window;
}

console.log('\n--- Cart math ---');
let w = loadCartPage();
let cart = w.RMKAAV_CART;

ok(cart.cartCount([]) === 0, 'empty cart counts as 0');
cart.addToCart('kaitha-powder', 2);
cart.addToCart('kaitha-guda', 1);
ok(cart.cartCount() === 3, 'cart count sums quantities across lines (found ' + cart.cartCount() + ')');

let totals = cart.cartTotals();
// kaitha-powder ₹249 x2 + kaitha-guda ₹399 x1 = ₹897 subtotal
ok(totals.subtotal === 897, 'subtotal = Σ(price × qty) (found ' + totals.subtotal + ')');
ok(totals.shipping === 59, 'flat ₹59 shipping applied to a non-empty cart (found ' + totals.shipping + ')');
ok(totals.total === 956, 'total = subtotal + shipping (found ' + totals.total + ')');

console.log('\n--- No artificial limit on cart size ---');
w = loadCartPage();
cart = w.RMKAAV_CART;
Object.keys(w.RMKAAV_PRODUCTS).forEach(id => cart.addToCart(id, 15));
ok(cart.cartCount() === Object.keys(w.RMKAAV_PRODUCTS).length * 15,
   'every product, 15 units each, all landed in the cart — unlimited items/qty (found ' + cart.cartCount() + ')');

console.log('\n--- Remove / zero quantity ---');
w = loadCartPage();
cart = w.RMKAAV_CART;
cart.addToCart('birchun', 1);
cart.setQty('birchun', 0);
ok(cart.readCart().length === 0, 'setting qty to 0 removes the line');
cart.addToCart('birchun', 2);
cart.removeFromCart('birchun');
ok(cart.readCart().length === 0, 'removeFromCart empties the cart');
ok(cart.cartTotals().shipping === 0, 'empty cart carries no shipping charge');

console.log('\n--- Empty cart renders the empty state on cart.html ---');
w = loadCartPage();
let d = w.document;
ok(d.getElementById('cart-empty').hidden === false, 'empty state shown with nothing in cart');
ok(d.getElementById('cart-main').hidden === true, 'cart/checkout section hidden while empty');

console.log('\n--- Adding items reveals the cart, hides empty state ---');
w = loadCartPage();
d = w.document;
w.RMKAAV_CART.addToCart('kaitha-powder', 1);
ok(d.getElementById('cart-empty').hidden === true, 'empty state hidden once an item is added');
ok(d.getElementById('cart-main').hidden === false, 'cart/checkout section revealed');
ok(d.querySelectorAll('#cart-item-list .cart-item').length === 1, 'one row rendered for one product');

console.log('\n--- Header cart badge ---');
w = loadCartPage();
d = w.document;
w.RMKAAV_CART.addToCart('kaitha-guda', 4);
ok(d.getElementById('cart-count').textContent === '4', 'badge reflects total quantity');
ok(d.getElementById('cart-count').hidden === false, 'badge visible once cart has items');

console.log('\n--- Checkout form validation ---');
w = loadCartPage();
d = w.document;
w.RMKAAV_CART.addToCart('kaitha-powder', 1);
const form = d.getElementById('checkout-form');
form.elements.namedItem('name').value = 'Test Customer';
form.elements.namedItem('phone').value = '12345';           // invalid — doesn't start 6-9, wrong length
form.elements.namedItem('email').value = 'not-an-email';    // invalid
form.elements.namedItem('addr1').value = '123 Test Street';
form.elements.namedItem('city').value = 'Banda';
form.elements.namedItem('state').value = 'Uttar Pradesh';
form.elements.namedItem('pincode').value = '12';             // invalid — not 6 digits
ok(form.checkValidity() === false, 'invalid phone/email/pincode blocks submission');

console.log('\n--- WhatsApp fallback order message (no payment gateway configured) ---');
w = loadCartPage();
cart = w.RMKAAV_CART;
cart.addToCart('kaitha-powder', 2);
const order = {
  ref: 'RMK-TEST-0001',
  cart: cart.readCart(),
  details: {
    name: 'Test Customer', phone: '9876543210', email: 'test@example.com',
    addr1: '123 Test Street', addr2: '', city: 'Banda', state: 'Uttar Pradesh',
    pincode: '210001', notes: ''
  },
  totals: cart.cartTotals()
};
const waUrl = cart.buildWhatsAppOrderMessage(order);
const msg = decodeURIComponent(waUrl.split('text=')[1]);
ok(waUrl.startsWith('https://wa.me/917068946333'), 'order message routes to the store WhatsApp number');
ok(msg.includes('Kaitha Powder (50g) x2'), 'message itemizes product, size and quantity');
ok(msg.includes('Total: ₹557'), 'message carries the correct total — 249×2 + 59 shipping (found in: ' + msg.split('\n').find(l => l.startsWith('Total')) + ')');
ok(msg.includes('123 Test Street') && msg.includes('210001'), 'message carries the full delivery address');
ok(msg.includes('RMK-TEST-0001'), 'message references the order ref');

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
