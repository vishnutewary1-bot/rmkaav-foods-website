// Pure unit tests for the server-side pricing/HMAC helpers used by
// api/create-payment.js, api/verify-payment.js and
// api/instamojo-webhook.js. No live network, no jsdom — plain Node.
const crypto = require('crypto');
const path = require('path');
const pricing = require(path.resolve(__dirname, '../api/_lib/pricing.js'));
const instamojo = require(path.resolve(__dirname, '../api/_lib/instamojo.js'));

let pass = 0, fail = 0;
const ok = (c, m) => { c ? (pass++, console.log('  PASS ' + m)) : (fail++, console.log('  FAIL ' + m)); };

console.log('\n--- pricing.computeTotals ---');
// kaitha-powder ₹249 x2 + kaitha-guda ₹399 x1 = ₹897 subtotal, +59 shipping
const totals = pricing.computeTotals([{ id: 'kaitha-powder', qty: 2 }, { id: 'kaitha-guda', qty: 1 }]);
ok(totals.subtotal === 897, 'subtotal = Σ(price × qty) (found ' + totals.subtotal + ')');
ok(totals.shipping === 59, 'flat ₹59 shipping applied (found ' + totals.shipping + ')');
ok(totals.total === 956, 'total = subtotal + shipping (found ' + totals.total + ')');
ok(pricing.computeTotals([]).shipping === 0, 'empty cart carries no shipping charge');

console.log('\n--- pricing.validateCart ---');
ok(typeof pricing.validateCart([]) === 'string', 'empty cart is rejected');
ok(typeof pricing.validateCart([{ id: 'not-a-real-product', qty: 1 }]) === 'string', 'unknown product id is rejected');
ok(typeof pricing.validateCart([{ id: 'birchun', qty: 0 }]) === 'string', 'zero quantity is rejected');
ok(typeof pricing.validateCart([{ id: 'birchun', qty: 1.5 }]) === 'string', 'non-integer quantity is rejected');
ok(pricing.validateCart([{ id: 'birchun', qty: 1000 }]) === null, 'a large quantity is accepted — no artificial order-size cap');
ok(pricing.validateCart([{ id: 'birchun', qty: 2 }]) === null, 'a valid cart passes');

console.log('\n--- pricing.validateDetails ---');
const goodDetails = {
  name: 'Test Customer', phone: '9876543210', email: 'test@example.com',
  addr1: '123 Test Street', addr2: '', city: 'Banda', state: 'Uttar Pradesh',
  pincode: '210001', notes: ''
};
ok(pricing.validateDetails(goodDetails) === null, 'a valid details object passes');
ok(typeof pricing.validateDetails(Object.assign({}, goodDetails, { phone: '12345' })) === 'string', 'invalid phone is rejected');
ok(typeof pricing.validateDetails(Object.assign({}, goodDetails, { pincode: '12' })) === 'string', 'invalid pincode is rejected');
ok(typeof pricing.validateDetails(Object.assign({}, goodDetails, { email: 'not-an-email' })) === 'string', 'invalid email is rejected');
ok(typeof pricing.validateDetails(Object.assign({}, goodDetails, { name: '' })) === 'string', 'missing required field is rejected');

console.log('\n--- instamojo.verifyWebhookMac ---');
const salt = 'test-salt-value';
const fields = { payment_id: 'MOJO123', payment_request_id: 'MOJOREQ456', status: 'Credit' };
const keys = Object.keys(fields).sort();
const joined = keys.map((k) => fields[k]).join('|');
const validMac = crypto.createHmac('sha1', salt).update(joined).digest('hex');

ok(instamojo.verifyWebhookMac(Object.assign({}, fields, { mac: validMac }), salt) === true,
  'a correctly-signed payload verifies');
ok(instamojo.verifyWebhookMac(Object.assign({}, fields, { mac: validMac, status: 'Failed' }), salt) === false,
  'a tampered field fails verification');
ok(instamojo.verifyWebhookMac(Object.assign({}, fields, { mac: 'not-the-real-mac' }), salt) === false,
  'a wrong mac fails verification');
ok(instamojo.verifyWebhookMac(fields, salt) === false, 'a missing mac field fails verification');
ok(instamojo.verifyWebhookMac(Object.assign({}, fields, { mac: validMac }), 'wrong-salt') === false,
  'the wrong salt fails verification');

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
