// Server-to-server callback from Instamojo — fires independently of
// whether the shopper's browser ever makes it back to the site, so
// this is the authoritative path for recording a paid order. Carries
// no Supabase session at all; authenticity is proven by the HMAC
// signature instead (see _lib/instamojo.js's verifyWebhookMac), then
// written with the service-role client since there's no shopper JWT
// to forward. This function only records payment status — it never
// sends the WhatsApp fulfillment message, since only a browser can
// hand off to wa.me.
const { getAdminClient } = require('./_lib/supabaseAdmin');
const { verifyWebhookMac } = require('./_lib/instamojo');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  const fields = req.body || {};

  if (!verifyWebhookMac(fields, process.env.INSTAMOJO_SALT)) {
    console.error('instamojo-webhook: MAC verification failed', JSON.stringify(fields));
    res.status(400).json({ error: 'Invalid signature.' });
    return;
  }

  const paymentRequestId = fields.payment_request_id;
  const paymentId = fields.payment_id;
  if (!paymentRequestId) {
    res.status(400).json({ error: 'Missing payment_request_id.' });
    return;
  }

  const admin = getAdminClient();
  const { data: row, error: selectError } = await admin
    .from('orders')
    .select('*')
    .eq('instamojo_payment_request_id', paymentRequestId)
    .single();

  if (selectError || !row) {
    // Row not found yet is the only case worth a non-200 — extremely
    // unlikely given the row is inserted before Instamojo is ever
    // called, but lets Instamojo's own retry policy self-heal a race.
    console.error('instamojo-webhook: no matching order', paymentRequestId);
    res.status(404).json({ error: 'Order not found.' });
    return;
  }

  if (row.status === 'paid') {
    res.status(200).json({ ok: true });
    return;
  }

  // Exact status field/values Instamojo's webhook sends are being
  // confirmed empirically against a real sandbox delivery (Phase 4a) —
  // logging the raw payload until then.
  console.log('instamojo-webhook: payload', JSON.stringify(fields));
  const rawStatus = String(fields.status || '').toLowerCase();
  const status = rawStatus === 'credit' ? 'paid' : 'failed';

  await admin
    .from('orders')
    .update({ status: status, instamojo_payment_id: paymentId || null, updated_at: new Date().toISOString() })
    .eq('id', row.id);

  res.status(200).json({ ok: true });
};
