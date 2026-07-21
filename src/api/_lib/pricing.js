// Server-side pricing — reads the SAME config file the browser uses
// (assets/js/products-data.js) so a price can only ever change in one
// place. The client-submitted cart is just [{id, qty}] pairs; the
// price always comes from here, never trusted from the request body.
const STORE_CONFIG = require('../../assets/js/products-data.js');
const PRODUCTS = STORE_CONFIG.PRODUCTS;
const SHIPPING_FLAT_FEE = STORE_CONFIG.SHIPPING_FLAT_FEE;

const PHONE_RE = /^[6-9][0-9]{9}$/;
const PINCODE_RE = /^[0-9]{6}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateCart(cart) {
  if (!Array.isArray(cart) || cart.length === 0) return 'Your cart is empty.';
  for (const line of cart) {
    if (!line || typeof line.id !== 'string' || !PRODUCTS[line.id]) {
      return 'Cart contains an unknown product.';
    }
    if (!Number.isInteger(line.qty) || line.qty < 1) {
      return 'Cart contains an invalid quantity.';
    }
  }
  return null;
}

function validateDetails(details) {
  if (!details || typeof details !== 'object') return 'Delivery details are required.';
  const required = ['name', 'phone', 'email', 'addr1', 'city', 'state', 'pincode'];
  for (const field of required) {
    if (!String(details[field] || '').trim()) return 'Missing required field: ' + field + '.';
  }
  if (!PHONE_RE.test(String(details.phone).trim())) return 'Invalid phone number.';
  if (!PINCODE_RE.test(String(details.pincode).trim())) return 'Invalid PIN code.';
  if (!EMAIL_RE.test(String(details.email).trim())) return 'Invalid email address.';
  return null;
}

function computeTotals(cart) {
  let subtotal = 0;
  cart.forEach(function (line) {
    subtotal += PRODUCTS[line.id].price * line.qty;
  });
  const shipping = cart.length ? SHIPPING_FLAT_FEE : 0;
  return { subtotal: subtotal, shipping: shipping, total: subtotal + shipping };
}

module.exports = { PRODUCTS, SHIPPING_FLAT_FEE, validateCart, validateDetails, computeTotals };
