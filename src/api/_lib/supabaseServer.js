// Server-side Supabase client that acts AS the calling shopper, by
// forwarding their JWT — Postgres then sees the real auth.uid(), so
// the orders table's RLS policies (own-row-only) apply exactly as
// they would to a browser call. Never use this for the Instamojo
// webhook, which has no shopper JWT at all (see supabaseAdmin.js).
const { createClient } = require('@supabase/supabase-js');

function getBearerToken(req) {
  const header = req.headers['authorization'] || req.headers['Authorization'];
  if (!header || !header.startsWith('Bearer ')) return null;
  return header.slice('Bearer '.length).trim();
}

function clientForToken(jwt) {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: 'Bearer ' + jwt } },
    auth: { persistSession: false }
  });
}

async function requireUser(req, res) {
  const jwt = getBearerToken(req);
  if (!jwt) {
    res.status(401).json({ error: 'Sign in required.' });
    return null;
  }
  const client = clientForToken(jwt);
  const { data, error } = await client.auth.getUser(jwt);
  if (error || !data || !data.user) {
    res.status(401).json({ error: 'Sign in required.' });
    return null;
  }
  return { client: client, user: data.user };
}

module.exports = { requireUser };
