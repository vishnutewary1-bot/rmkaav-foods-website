/* ============================================================
   RMKAAV Foods — Supabase project configuration
   ============================================================

   The publishable key below is designed to be public — same spirit
   as the WhatsApp number / Razorpay URLs already in this codebase.
   Real protection comes from Row Level Security policies on the
   database tables (see /scripts or Supabase dashboard), not from
   keeping this key secret. The separate Supabase *secret* key must
   NEVER be added to this file — it belongs only in a server-side
   environment variable (Vercel), never in anything shipped to the
   browser.
   ============================================================ */
(function () {
  'use strict';

  var SUPABASE_URL = 'https://ttptnhluzslqwzpgqhyi.supabase.co';
  var SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_88yL6MdkVCbOYOo0LhzTwQ_SrBIjLAb';

  if (typeof window !== 'undefined') {
    window.RMKAAV_SUPABASE_URL = SUPABASE_URL;
    window.RMKAAV_SUPABASE_KEY = SUPABASE_PUBLISHABLE_KEY;
  }
})();
