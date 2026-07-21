/* ============================================================
   RMKAAV Foods — cart + checkout
   ============================================================

   Cart state lives in localStorage so it survives navigation between
   the plain, un-bundled pages on this site. Prices/products always
   come from window.RMKAAV_PRODUCTS (assets/js/products-data.js),
   never from anything stored in the cart itself, so a price change
   there is reflected everywhere immediately.

   AUTH: Place Order requires a signed-in session (assets/js/auth.js) on
   any page where auth.js is loaded — see requireSession() below. Pages
   that don't load auth.js (e.g. the test harness) skip the gate.

   PAYMENT: Place Order calls api/create-payment.js, which starts a
   real Instamojo checkout and returns a hosted payment URL to send the
   shopper to. The cart is only cleared and the WhatsApp fulfillment
   message only sent once the shopper returns and api/verify-payment.js
   confirms the payment actually went through (see handlePaymentReturn
   below) — never on the honor system the old WhatsApp-only flow used.

   If window.fetch or window.RMKAAV_AUTH aren't available (e.g. the
   Supabase CDN script failed to load), Place Order falls back to the
   original WhatsApp-only handoff so the site stays sellable rather
   than silently breaking.
   ============================================================ */
(function () {
  'use strict';

  const PRODUCTS = window.RMKAAV_PRODUCTS || {};
  const WHATSAPP_NUMBER = window.RMKAAV_WHATSAPP_NUMBER || '917068946333';
  const SHIPPING_FLAT_FEE = window.RMKAAV_SHIPPING_FLAT_FEE || 0;

  const CART_KEY = 'rmkaav_cart_v1';
  const DETAILS_KEY = 'rmkaav_checkout_details_v1';
  const LAST_ORDER_KEY = 'rmkaav_last_order_v1';

  // ----- Cart state -----
  function readCart() {
    try {
      const raw = window.localStorage.getItem(CART_KEY);
      const cart = raw ? JSON.parse(raw) : [];
      return Array.isArray(cart) ? cart : [];
    } catch (e) {
      return [];
    }
  }

  function writeCart(cart) {
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) { /* storage unavailable — cart just won't persist */ }
    updateBadge();
    renderCartPage();
  }

  function findLine(cart, id) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === id) return cart[i];
    }
    return null;
  }

  function addToCart(id, qty) {
    if (!PRODUCTS[id]) return;
    qty = qty || 1;
    const cart = readCart();
    const line = findLine(cart, id);
    if (line) {
      line.qty += qty;
    } else {
      cart.push({ id: id, qty: qty });
    }
    writeCart(cart);
  }

  function setQty(id, qty) {
    let cart = readCart();
    const line = findLine(cart, id);
    if (!line) return;
    if (qty <= 0) {
      cart = cart.filter(function (l) { return l.id !== id; });
    } else {
      line.qty = Math.min(qty, 20);
    }
    writeCart(cart);
  }

  function removeFromCart(id) {
    const cart = readCart().filter(function (l) { return l.id !== id; });
    writeCart(cart);
  }

  function cartCount(cart) {
    cart = cart || readCart();
    let n = 0;
    cart.forEach(function (l) { n += l.qty; });
    return n;
  }

  function cartTotals(cart) {
    cart = cart || readCart();
    let subtotal = 0;
    cart.forEach(function (l) {
      const p = PRODUCTS[l.id];
      if (p) subtotal += p.price * l.qty;
    });
    const shipping = cart.length ? SHIPPING_FLAT_FEE : 0;
    return { subtotal: subtotal, shipping: shipping, total: subtotal + shipping };
  }

  function formatRupees(n) {
    return '₹' + n.toLocaleString('en-IN');
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  // ----- Header cart badge (every page) -----
  function updateBadge() {
    const badge = document.getElementById('cart-count');
    if (!badge) return;
    const n = cartCount();
    badge.textContent = String(n);
    badge.hidden = n === 0;
  }

  // ----- Toast -----
  let toastTimer = null;
  function showToast(message) {
    let toast = document.getElementById('cart-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'cart-toast';
      toast.className = 'cart-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 2200);
  }

  // ----- Add to Cart / Buy Now / qty steppers (product pages) -----
  function readQtyInput(id) {
    const input = document.getElementById('qty-' + id);
    const n = input ? parseInt(input.value, 10) : 1;
    return n > 0 ? n : 1;
  }

  document.querySelectorAll('[data-add-to-cart]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const id = btn.getAttribute('data-add-to-cart');
      const product = PRODUCTS[id];
      if (!product) return;
      addToCart(id, readQtyInput(id));
      showToast('Added to cart — ' + product.name);
      const original = btn.textContent;
      btn.textContent = 'Added ✓';
      btn.disabled = true;
      window.setTimeout(function () {
        btn.textContent = original;
        btn.disabled = false;
      }, 1200);
    });
  });

  document.querySelectorAll('[data-buy-now]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      const id = btn.getAttribute('data-buy-now');
      if (!PRODUCTS[id]) return;
      e.preventDefault();
      addToCart(id, readQtyInput(id));
      window.location.href = '/cart.html';
    });
  });

  document.querySelectorAll('[data-qty-step]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const targetId = btn.getAttribute('data-qty-target');
      const input = document.getElementById('qty-' + targetId);
      if (!input) return;
      const delta = parseInt(btn.getAttribute('data-qty-step'), 10);
      const next = (parseInt(input.value, 10) || 1) + delta;
      input.value = String(Math.max(1, Math.min(20, next)));
    });
  });

  updateBadge();

  // ----- Cart page rendering -----
  function renderCartPage() {
    const list = document.getElementById('cart-item-list');
    if (!list) return; // not on cart.html

    const cart = readCart();
    const empty = document.getElementById('cart-empty');
    const main = document.getElementById('cart-main');

    if (!cart.length) {
      if (empty) empty.hidden = false;
      if (main) main.hidden = true;
      return;
    }
    if (empty) empty.hidden = true;
    if (main) main.hidden = false;

    list.innerHTML = '';
    cart.forEach(function (line) {
      const p = PRODUCTS[line.id];
      if (!p) return;
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML =
        '<img class="cart-item__image" src="' + p.image + '" alt="" width="72" height="72" loading="lazy">' +
        '<div class="cart-item__info">' +
          '<p class="cart-item__name">' + p.name + '</p>' +
          '<p class="cart-item__weight">' + (p.weight || '') + '</p>' +
          '<button type="button" class="cart-item__remove" data-remove="' + line.id + '">Remove</button>' +
        '</div>' +
        '<div class="cart-item__qty">' +
          '<button type="button" class="cart-item__qty-btn" data-cart-step="-1" data-cart-target="' + line.id + '" aria-label="Decrease quantity of ' + p.name + '">−</button>' +
          '<span class="cart-item__qty-value">' + line.qty + '</span>' +
          '<button type="button" class="cart-item__qty-btn" data-cart-step="1" data-cart-target="' + line.id + '" aria-label="Increase quantity of ' + p.name + '">+</button>' +
        '</div>' +
        '<p class="cart-item__price">' + formatRupees(p.price * line.qty) + '</p>';
      list.appendChild(li);
    });

    const totals = cartTotals(cart);
    setText('cart-subtotal', formatRupees(totals.subtotal));
    setText('cart-shipping', formatRupees(totals.shipping));
    setText('cart-total', formatRupees(totals.total));
    setText('cart-summary-total-mobile', formatRupees(totals.total));

    list.querySelectorAll('[data-remove]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        removeFromCart(btn.getAttribute('data-remove'));
      });
    });
    list.querySelectorAll('[data-cart-step]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const id = btn.getAttribute('data-cart-target');
        const delta = parseInt(btn.getAttribute('data-cart-step'), 10);
        const line = findLine(readCart(), id);
        const current = line ? line.qty : 0;
        setQty(id, current + delta);
      });
    });
  }

  renderCartPage();
  handlePaymentReturn();

  // ----- Checkout form -----
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    // Prefill: locally-remembered details fill in first (works for
    // guests too), then the shopper's saved account profile — set on
    // account.html, see auth.js's getProfile() — overrides with
    // whatever it has, since it's the more authoritative "saved
    // address". One-way only: editing the checkout form never writes
    // back to the saved profile, so a one-off shipping address here
    // doesn't silently overwrite what's saved on the account page.
    function fillField(key, value, force) {
      const field = checkoutForm.elements.namedItem(key);
      if (!field || !value) return;
      if (force || !field.value) field.value = value;
    }

    try {
      const saved = JSON.parse(window.localStorage.getItem(DETAILS_KEY) || 'null');
      if (saved) {
        Object.keys(saved).forEach(function (key) { fillField(key, saved[key], false); });
      }
    } catch (e) { /* ignore bad stored data */ }

    (async function prefillFromProfile() {
      if (!window.RMKAAV_AUTH) return;
      try {
        const session = await window.RMKAAV_AUTH.getSession();
        if (!session) return;
        const profile = await window.RMKAAV_AUTH.getProfile(session.user.id);
        if (!profile) return;
        fillField('name', profile.full_name, true);
        fillField('phone', profile.phone, true);
        fillField('email', session.user.email, true);
        fillField('addr1', profile.address_line1, true);
        fillField('addr2', profile.address_line2, true);
        fillField('city', profile.city, true);
        fillField('state', profile.state, true);
        fillField('pincode', profile.pincode, true);
      } catch (e) { /* ignore — keep whatever the local prefill already set */ }
    })();

    checkoutForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const cart = readCart();
      if (!cart.length) return;

      if (!checkoutForm.checkValidity()) {
        checkoutForm.reportValidity();
        return;
      }

      if (window.RMKAAV_AUTH) {
        const signedIn = await window.RMKAAV_AUTH.requireSession('/cart.html');
        if (!signedIn) return;
      }

      const data = new FormData(checkoutForm);
      const details = {
        name: (data.get('name') || '').trim(),
        phone: (data.get('phone') || '').trim(),
        email: (data.get('email') || '').trim(),
        addr1: (data.get('addr1') || '').trim(),
        addr2: (data.get('addr2') || '').trim(),
        city: (data.get('city') || '').trim(),
        state: (data.get('state') || '').trim(),
        pincode: (data.get('pincode') || '').trim(),
        notes: (data.get('notes') || '').trim()
      };

      try {
        window.localStorage.setItem(DETAILS_KEY, JSON.stringify(details));
      } catch (e) { /* ignore */ }

      showPaymentError(null);

      if (!(window.fetch && window.RMKAAV_AUTH)) {
        // No payment backend reachable — fall back to the original
        // WhatsApp-only handoff so the site stays sellable.
        const order = { ref: buildOrderRef(), cart: cart, details: details, totals: cartTotals(cart) };
        try {
          window.localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
        } catch (e) { /* ignore */ }
        window.open(buildWhatsAppOrderMessage(order), '_blank', 'noopener');
        writeCart([]);
        showConfirmation(order);
        return;
      }

      setPlaceOrderBusy(true);
      try {
        const session = await window.RMKAAV_AUTH.getSession();
        const res = await fetch('/api/create-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + session.access_token },
          body: JSON.stringify({ cart: cart, details: details })
        });
        const body = await res.json();
        if (!res.ok || !body.checkoutUrl) {
          throw new Error(body.error || 'Could not start payment. Please try again.');
        }
        window.location.href = body.checkoutUrl;
      } catch (err) {
        setPlaceOrderBusy(false);
        showPaymentError(err.message || 'Could not start payment. Please try again.');
      }
    });
  }

  // Kept only for the no-payment-backend fallback path above — the
  // real flow generates the ref server-side in api/create-payment.js.
  function buildOrderRef() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
    return 'RMK-' + y + m + day + '-' + rand;
  }

  function setPlaceOrderBusy(busy) {
    document.querySelectorAll('#checkout-form button[type="submit"], .cart-summary__mobile-bar button[type="submit"]')
      .forEach(function (btn) {
        btn.disabled = busy;
        if (busy) { btn.dataset.originalText = btn.textContent; btn.textContent = 'Processing…'; }
        else if (btn.dataset.originalText) { btn.textContent = btn.dataset.originalText; }
      });
  }

  function showPaymentError(message) {
    const el = document.getElementById('payment-error');
    if (!el) return;
    if (!message) { el.hidden = true; el.textContent = ''; return; }
    el.textContent = message;
    el.hidden = false;
  }

  // ----- Return trip from Instamojo's hosted checkout -----
  // Never trusts the redirect's own payment_status query param (it's
  // client-supplied/editable) — always re-confirms with the server,
  // which itself re-checks with Instamojo directly.
  async function handlePaymentReturn() {
    const params = new URLSearchParams(window.location.search);
    const paymentRequestId = params.get('payment_request_id');
    const paymentId = params.get('payment_id');
    if (!paymentRequestId || !paymentId) return;

    // Strip the params immediately so a refresh doesn't re-trigger this.
    window.history.replaceState(null, '', window.location.pathname);

    const verifying = document.getElementById('payment-verifying');
    if (!verifying || !(window.fetch && window.RMKAAV_AUTH)) return;

    const empty = document.getElementById('cart-empty');
    const main = document.getElementById('cart-main');
    if (empty) empty.hidden = true;
    if (main) main.hidden = true;
    verifying.hidden = false;

    const session = await window.RMKAAV_AUTH.getSession();
    if (!session) { verifying.hidden = true; renderCartPage(); return; }

    for (let attempt = 0; attempt < 4; attempt++) {
      let body;
      try {
        const res = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + session.access_token },
          body: JSON.stringify({ payment_request_id: paymentRequestId, payment_id: paymentId })
        });
        body = await res.json();
      } catch (e) {
        break;
      }

      if (body.status === 'paid') {
        verifying.hidden = true;
        window.open(buildWhatsAppOrderMessage(body.order), '_blank', 'noopener');
        writeCart([]);
        showConfirmation(body.order);
        return;
      }
      if (body.status === 'failed') {
        verifying.hidden = true;
        renderCartPage();
        showPaymentError('Your payment did not go through. Your cart has been kept — please try again.');
        return;
      }
      await new Promise(function (resolve) { window.setTimeout(resolve, 1500); });
    }

    verifying.hidden = true;
    renderCartPage();
    showPaymentError("We're still confirming your payment — we'll message you on WhatsApp once it's done. Keep your Ref handy.");
  }

  function buildWhatsAppOrderMessage(order) {
    const lines = [];
    lines.push("Hi RMKAAV, I'd like to place an order — Ref " + order.ref + ':');
    lines.push('');
    order.cart.forEach(function (line) {
      const p = PRODUCTS[line.id];
      if (!p) return;
      const size = p.weight ? ' (' + p.weight + ')' : '';
      lines.push(p.name + size + ' x' + line.qty + ' — ' + formatRupees(p.price * line.qty));
    });
    lines.push('');
    lines.push('Subtotal: ' + formatRupees(order.totals.subtotal));
    lines.push('Shipping: ' + formatRupees(order.totals.shipping));
    lines.push('Total: ' + formatRupees(order.totals.total));
    lines.push('');
    lines.push('Deliver to:');
    lines.push(order.details.name + ' — ' + order.details.phone);
    lines.push(order.details.email);
    lines.push(order.details.addr1 + (order.details.addr2 ? ', ' + order.details.addr2 : ''));
    lines.push(order.details.city + ', ' + order.details.state + ' — ' + order.details.pincode);
    if (order.details.notes) {
      lines.push('');
      lines.push('Notes: ' + order.details.notes);
    }
    lines.push('');
    lines.push('Please confirm and share payment details.');
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
  }

  function showConfirmation(order) {
    const main = document.getElementById('cart-main');
    const empty = document.getElementById('cart-empty');
    const confirmation = document.getElementById('order-confirmation');
    if (!confirmation) return;
    if (main) main.hidden = true;
    if (empty) empty.hidden = true;
    setText('confirmation-ref', order.ref);
    setText('confirmation-total', formatRupees(order.totals.total));
    confirmation.hidden = false;
    confirmation.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Expose the pure helpers for the jsdom test harness.
  window.RMKAAV_CART = {
    readCart: readCart,
    addToCart: addToCart,
    setQty: setQty,
    removeFromCart: removeFromCart,
    cartCount: cartCount,
    cartTotals: cartTotals,
    buildWhatsAppOrderMessage: buildWhatsAppOrderMessage
  };

})();
