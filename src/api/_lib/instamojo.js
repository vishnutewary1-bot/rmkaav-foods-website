// Thin wrapper around Instamojo's API. Returns raw parsed responses
// (rather than guessing at field names here) so the one place that
// needs to resolve a specific field — create-payment.js, for the
// hosted checkout URL — can log the raw shape on first real use and
// be corrected in one spot if Instamojo's exact field name differs
// from what's assumed. See Phase 4a in the project plan.
const crypto = require('crypto');

function apiBase() {
  return process.env.INSTAMOJO_API_BASE || 'https://api.instamojo.com';
}

async function getAccessToken() {
  const res = await fetch(apiBase() + '/oauth2/token/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.INSTAMOJO_CLIENT_ID,
      client_secret: process.env.INSTAMOJO_CLIENT_SECRET
    })
  });
  const body = await res.json();
  if (!res.ok || !body.access_token) {
    throw new Error('Instamojo auth failed: ' + JSON.stringify(body));
  }
  return body.access_token;
}

async function createPaymentRequest(token, { amount, purpose, buyer_name, email, phone, redirect_url, webhook }) {
  const res = await fetch(apiBase() + '/v2/payment_requests/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({
      amount: amount,
      purpose: purpose,
      buyer_name: buyer_name,
      email: email,
      phone: phone,
      redirect_url: redirect_url,
      webhook: webhook,
      allow_repeated_payments: false,
      send_email: false
    })
  });
  const body = await res.json();
  if (!res.ok) {
    throw new Error('Instamojo create-payment-request failed: ' + JSON.stringify(body));
  }
  return body;
}

async function getPayment(token, paymentId) {
  const res = await fetch(apiBase() + '/v2/payments/' + encodeURIComponent(paymentId) + '/', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const body = await res.json();
  if (!res.ok) {
    throw new Error('Instamojo get-payment failed: ' + JSON.stringify(body));
  }
  return body;
}

// Instamojo's webhook MAC: sort all POST fields except `mac`
// alphabetically by key, concatenate their VALUES with `|`, then
// HMAC-SHA1 the result keyed with the account's webhook salt.
function verifyWebhookMac(fields, salt) {
  const receivedMac = fields.mac;
  if (!receivedMac || !salt) return false;

  const keys = Object.keys(fields).filter(function (k) { return k !== 'mac'; }).sort();
  const joined = keys.map(function (k) { return fields[k]; }).join('|');
  const expectedMac = crypto.createHmac('sha1', salt).update(joined).digest('hex');

  const received = Buffer.from(String(receivedMac));
  const expected = Buffer.from(expectedMac);
  if (received.length !== expected.length) return false;
  return crypto.timingSafeEqual(received, expected);
}

module.exports = { getAccessToken, createPaymentRequest, getPayment, verifyWebhookMac };
