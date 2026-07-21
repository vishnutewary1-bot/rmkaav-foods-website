/* ============================================================
   RMKAAV Foods — account.html page logic (tabs, forms, profile)
   Depends on assets/js/auth.js (window.RMKAAV_AUTH).
   ============================================================ */
(function () {
  'use strict';

  var PENDING_NAME_KEY = 'rmkaav_pending_profile_name';

  var els = {
    authPanel: document.getElementById('account-auth'),
    profilePanel: document.getElementById('account-profile'),
    tabLogin: document.getElementById('tab-login'),
    tabSignup: document.getElementById('tab-signup'),
    loginForm: document.getElementById('login-form'),
    signupForm: document.getElementById('signup-form'),
    loginStatus: document.getElementById('login-status'),
    signupStatus: document.getElementById('signup-status'),
    profileForm: document.getElementById('profile-form'),
    profileStatus: document.getElementById('profile-status'),
    profileEmail: document.getElementById('profile-email'),
    logoutBtn: document.getElementById('logout-btn')
  };

  if (!els.authPanel) return; // not on account.html

  function setStatus(el, message, variant) {
    if (!el) return;
    el.textContent = message;
    el.hidden = !message;
    el.classList.remove('form-status--error', 'form-status--success');
    if (variant) el.classList.add('form-status--' + variant);
  }

  function switchTab(which) {
    var loginActive = which === 'login';
    els.tabLogin.classList.toggle('is-active', loginActive);
    els.tabSignup.classList.toggle('is-active', !loginActive);
    els.tabLogin.setAttribute('aria-selected', String(loginActive));
    els.tabSignup.setAttribute('aria-selected', String(!loginActive));
    els.loginForm.hidden = !loginActive;
    els.signupForm.hidden = loginActive;
  }

  els.tabLogin.addEventListener('click', function () { switchTab('login'); });
  els.tabSignup.addEventListener('click', function () { switchTab('signup'); });

  var AUTH = window.RMKAAV_AUTH;
  if (!AUTH) {
    setStatus(els.loginStatus, 'Account services are unavailable right now — please try again shortly or reach us on WhatsApp.', 'error');
    return;
  }

  function showAuthPanel() {
    els.authPanel.hidden = false;
    els.profilePanel.hidden = true;
  }

  function fillProfileForm(profile) {
    if (!profile) return;
    Object.keys(profile).forEach(function (key) {
      var field = els.profileForm.elements.namedItem(key);
      if (field && profile[key] != null) field.value = profile[key];
    });
  }

  async function showProfilePanel(session) {
    els.authPanel.hidden = true;
    els.profilePanel.hidden = false;
    els.profileEmail.textContent = session.user.email;

    var profile = await AUTH.getProfile(session.user.id);

    var pendingName = null;
    try { pendingName = window.localStorage.getItem(PENDING_NAME_KEY); } catch (e) { /* ignore */ }
    if (pendingName && profile && !profile.full_name) {
      profile.full_name = pendingName;
      await AUTH.saveProfile(session.user.id, { full_name: pendingName });
      try { window.localStorage.removeItem(PENDING_NAME_KEY); } catch (e) { /* ignore */ }
    }

    fillProfileForm(profile);
  }

  els.loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    var email = els.loginForm.elements.namedItem('email').value.trim();
    var password = els.loginForm.elements.namedItem('password').value;
    setStatus(els.loginStatus, 'Logging in…', null);
    var res = await AUTH.signIn(email, password);
    if (res.error) {
      setStatus(els.loginStatus, res.error.message, 'error');
      return;
    }
    setStatus(els.loginStatus, '', null);
    var session = await AUTH.getSession();
    if (!session) return;
    await showProfilePanel(session);
    var redirect = AUTH.consumeRedirect();
    if (redirect) window.location.href = redirect;
  });

  els.signupForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    var name = els.signupForm.elements.namedItem('name').value.trim();
    var email = els.signupForm.elements.namedItem('email').value.trim();
    var password = els.signupForm.elements.namedItem('password').value;

    if (!AUTH.isValidEmail(email)) {
      setStatus(els.signupStatus, 'Enter a valid email address.', 'error');
      return;
    }
    var pwErr = AUTH.passwordError(password);
    if (pwErr) {
      setStatus(els.signupStatus, pwErr, 'error');
      return;
    }

    setStatus(els.signupStatus, 'Creating your account…', null);
    var res = await AUTH.signUp(email, password);
    if (res.error) {
      setStatus(els.signupStatus, res.error.message, 'error');
      return;
    }
    try { window.localStorage.setItem(PENDING_NAME_KEY, name); } catch (e2) { /* ignore */ }
    setStatus(els.signupStatus, 'Check your email to confirm your account, then log in.', 'success');
    els.signupForm.reset();
  });

  els.logoutBtn.addEventListener('click', async function () {
    await AUTH.signOut();
    showAuthPanel();
  });

  els.profileForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    var session = await AUTH.getSession();
    if (!session) return;
    var data = new FormData(els.profileForm);
    var fields = {
      full_name: (data.get('full_name') || '').trim(),
      phone: (data.get('phone') || '').trim(),
      address_line1: (data.get('address_line1') || '').trim(),
      address_line2: (data.get('address_line2') || '').trim(),
      city: (data.get('city') || '').trim(),
      state: (data.get('state') || '').trim(),
      pincode: (data.get('pincode') || '').trim()
    };
    setStatus(els.profileStatus, 'Saving…', null);
    var res = await AUTH.saveProfile(session.user.id, fields);
    if (res.error) {
      setStatus(els.profileStatus, res.error.message, 'error');
      return;
    }
    setStatus(els.profileStatus, 'Saved.', 'success');
  });

  (async function init() {
    var session = await AUTH.getSession();
    if (session) {
      await showProfilePanel(session);
    } else {
      showAuthPanel();
    }
  })();
})();
