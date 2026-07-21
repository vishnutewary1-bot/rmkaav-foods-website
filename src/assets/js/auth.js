/* ============================================================
   RMKAAV Foods — accounts (Supabase Auth)
   ============================================================

   Depends on the Supabase JS library (loaded via CDN script tag,
   see the <script> tags at the bottom of each page) and on
   assets/js/supabase-config.js for the project URL/key.

   Browsing and the cart stay open to everyone. A session is only
   required at the "Place Order" step in cart.js, via requireSession().
   ============================================================ */
(function () {
  'use strict';

  if (typeof window === 'undefined' || !window.supabase || !window.RMKAAV_SUPABASE_URL) return;

  var client = window.supabase.createClient(
    window.RMKAAV_SUPABASE_URL,
    window.RMKAAV_SUPABASE_KEY
  );

  var REDIRECT_KEY = 'rmkaav_auth_redirect_v1';

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
  }

  function passwordError(password) {
    if (!password || password.length < 8) return 'Password must be at least 8 characters.';
    return null;
  }

  function signUp(email, password) {
    return client.auth.signUp({
      email: email,
      password: password,
      options: { emailRedirectTo: window.location.origin + '/account.html' }
    });
  }

  function signIn(email, password) {
    return client.auth.signInWithPassword({ email: email, password: password });
  }

  function signOut() {
    return client.auth.signOut();
  }

  async function getSession() {
    var res = await client.auth.getSession();
    return (res && res.data) ? res.data.session : null;
  }

  async function getProfile(userId) {
    var res = await client.from('profiles').select('*').eq('id', userId).single();
    return res.data || null;
  }

  function saveProfile(userId, fields) {
    var payload = Object.assign({}, fields, { updated_at: new Date().toISOString() });
    return client.from('profiles').update(payload).eq('id', userId);
  }

  function rememberRedirect(path) {
    try { window.sessionStorage.setItem(REDIRECT_KEY, path); } catch (e) { /* ignore */ }
  }

  function consumeRedirect() {
    try {
      var path = window.sessionStorage.getItem(REDIRECT_KEY);
      window.sessionStorage.removeItem(REDIRECT_KEY);
      return path;
    } catch (e) { return null; }
  }

  // Used by cart.js right before Place Order. Returns true if a session
  // already exists; otherwise sends the shopper to sign in first and
  // returns false so the caller can stop.
  async function requireSession(returnPath) {
    var session = await getSession();
    if (session) return true;
    rememberRedirect(returnPath || window.location.pathname);
    window.location.href = '/account.html';
    return false;
  }

  // ----- Header account link (every page) -----
  async function updateHeaderAuthState() {
    var link = document.getElementById('header-account-link');
    if (!link) return;
    var session = await getSession();
    if (session) {
      link.classList.add('is-signed-in');
      link.setAttribute('aria-label', 'My Account');
    } else {
      link.classList.remove('is-signed-in');
      link.setAttribute('aria-label', 'Log in');
    }
  }

  client.auth.onAuthStateChange(function () { updateHeaderAuthState(); });
  updateHeaderAuthState();

  window.RMKAAV_AUTH = {
    client: client,
    isValidEmail: isValidEmail,
    passwordError: passwordError,
    signUp: signUp,
    signIn: signIn,
    signOut: signOut,
    getSession: getSession,
    getProfile: getProfile,
    saveProfile: saveProfile,
    requireSession: requireSession,
    consumeRedirect: consumeRedirect
  };
})();
