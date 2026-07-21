// Elevated-privilege Supabase client, used ONLY by the Instamojo
// webhook. That callback carries no shopper session at all — its
// legitimacy is proven by verifying Instamojo's HMAC signature
// (see instamojo.js's verifyWebhookMac), not by Postgres RLS.
const { createClient } = require('@supabase/supabase-js');

let admin = null;

function getAdminClient() {
  if (!admin) {
    admin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false }
    });
  }
  return admin;
}

module.exports = { getAdminClient };
