// Starts a checkout: recomputes the total server-side (never trusts a
// client-submitted amount), records a 'pending' order, and asks
// Instamojo for a hosted checkout URL to send the shopper to.
//
// Writes use the service-role client, not the shopper's own JWT —
// orders' RLS deliberately grants shoppers no insert/update rights at
// all (see scripts/sql/001_orders_table.sql), so a signed-in shopper
// can never write a fake 'paid' row themselves via a direct API call.
// requireUser() still verifies the shopper's identity; this function
// enforces ownership itself (the row it writes is tied to auth.user.id).
const { requireUser } = require('./_lib/supabaseServer');
const { getAdminClient } = require('./_lib/supabaseAdmin');
const { validateCart, validateDetails, computeTotals } = require('./_lib/pricing');
const instamojo = require('./_lib/instamojo');

const MIN_AMOUNT = 9;
const MAX_AMOUNT = 200000;

function buildOrderRef() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return 'RMK-' + y + m + day + '-' + rand;
}

function siteOrigin(req) {
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  return 'https://' + host;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  const auth = await requireUser(req, res);
  if (!auth) return; // requireUser already responded

  const { cart, details } = req.body || {};

  const cartError = validateCart(cart);
  if (cartError) { res.status(400).json({ error: cartError }); return; }

  const detailsError = validateDetails(details);
  if (detailsError) { res.status(400).json({ error: detailsError }); return; }

  const totals = computeTotals(cart);
  if (totals.total < MIN_AMOUNT || totals.total > MAX_AMOUNT) {
    res.status(400).json({ error: 'Order total is out of the allowed range.' });
    return;
  }

  const ref = buildOrderRef();
  const origin = siteOrigin(req);
  const admin = getAdminClient();

  const { data: order, error: insertError } = await admin
    .from('orders')
    .insert({
      ref: ref,
      user_id: auth.user.id,
      cart: cart,
      details: details,
      totals: totals,
      status: 'pending'
    })
    .select()
    .single();

  if (insertError) {
    res.status(500).json({ error: 'Could not create order.' });
    return;
  }

  let checkoutUrl = null;
  try {
    const token = await instamojo.getAccessToken();
    const paymentRequest = await instamojo.createPaymentRequest(token, {
      amount: totals.total,
      purpose: 'RMKAAV Foods order ' + ref,
      buyer_name: details.name,
      email: details.email,
      phone: details.phone,
      redirect_url: origin + '/cart.html',
      webhook: origin + '/api/instamojo-webhook'
    });

    // Field name for the hosted checkout URL and the payment request id
    // are being confirmed empirically against the real sandbox response
    // (Phase 4a) — logging the raw shape here until then.
    checkoutUrl = paymentRequest.longurl || paymentRequest.url
      || (paymentRequest.payment_request && paymentRequest.payment_request.longurl);
    const paymentRequestId = paymentRequest.id
      || (paymentRequest.payment_request && paymentRequest.payment_request.id);

    if (!checkoutUrl || !paymentRequestId) {
      console.error('Instamojo create-payment-request: unexpected response shape', JSON.stringify(paymentRequest));
      throw new Error('Could not resolve checkout URL from Instamojo response.');
    }

    await admin
      .from('orders')
      .update({ instamojo_payment_request_id: paymentRequestId, updated_at: new Date().toISOString() })
      .eq('id', order.id);
  } catch (err) {
    console.error('create-payment: Instamojo request failed', err);
    await admin
      .from('orders')
      .update({ status: 'failed', updated_at: new Date().toISOString() })
      .eq('id', order.id);
    res.status(502).json({ error: 'Could not start payment. Please try again.' });
    return;
  }

  res.status(200).json({ ref: ref, checkoutUrl: checkoutUrl });
};
