// Called by the browser when it returns from Instamojo's hosted
// checkout page. Never trusts the redirect's own `payment_status`
// query param (client-supplied, editable) — always re-checks with
// Instamojo directly, and returns the DB's order snapshot rather than
// anything the client might have cached locally.
//
// Reads/writes use the service-role client, not the shopper's own
// JWT — orders' RLS grants shoppers no write rights at all (see
// scripts/sql/001_orders_table.sql), so this function enforces
// ownership itself (the explicit .eq('user_id', ...) filter below)
// rather than relying on RLS to scope it.
const { requireUser } = require('./_lib/supabaseServer');
const { getAdminClient } = require('./_lib/supabaseAdmin');
const instamojo = require('./_lib/instamojo');

function toOrderSnapshot(row) {
  return { ref: row.ref, cart: row.cart, details: row.details, totals: row.totals };
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  const auth = await requireUser(req, res);
  if (!auth) return;

  const { payment_request_id: paymentRequestId, payment_id: paymentId } = req.body || {};
  if (!paymentRequestId || !paymentId) {
    res.status(400).json({ error: 'Missing payment_request_id or payment_id.' });
    return;
  }

  const admin = getAdminClient();
  const { data: row, error: selectError } = await admin
    .from('orders')
    .select('*')
    .eq('instamojo_payment_request_id', paymentRequestId)
    .eq('user_id', auth.user.id)
    .single();

  if (selectError || !row) {
    res.status(404).json({ error: 'Order not found.' });
    return;
  }

  if (row.status === 'paid') {
    res.status(200).json({ status: 'paid', order: toOrderSnapshot(row) });
    return;
  }

  let payment;
  try {
    const token = await instamojo.getAccessToken();
    payment = await instamojo.getPayment(token, paymentId);
  } catch (err) {
    console.error('verify-payment: Instamojo status check failed', err);
    res.status(200).json({ status: 'processing', order: toOrderSnapshot(row) });
    return;
  }

  let status = 'processing';
  if (payment.status === true) status = 'paid';
  else if (payment.status === false) status = 'failed';

  if (status !== 'processing' && row.status !== status) {
    await admin
      .from('orders')
      .update({ status: status, instamojo_payment_id: paymentId, updated_at: new Date().toISOString() })
      .eq('id', row.id);
  }

  res.status(200).json({ status: status, order: toOrderSnapshot(row) });
};
