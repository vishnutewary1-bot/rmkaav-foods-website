/* ============================================================
   RMKAAV Foods — site interactions
   Last updated: 2026-05-09
   ============================================================ */

(function () {
  'use strict';

  /* ============================================================
     ORDER CONFIGURATION  —  the only block you need to edit
     ============================================================

     WHEN YOUR RAZORPAY ACCOUNT IS READY:
     Create one Payment Page per product in the Razorpay dashboard,
     then paste each URL into the matching `razorpayUrl` below.
     That is the whole job — every "Buy Now" button on every page
     picks it up automatically. Do not edit the HTML.

     While a razorpayUrl is empty (''), that product's Buy Now button
     falls back to a WhatsApp order with the item, size and price
     already written into the message. The site stays sellable.
     ============================================================ */
  const PRODUCTS = {
    'birchun': {
      name: 'Birchun Powder',
      weight: '50g',
      price: 249,
      razorpayUrl: ''    // <-- paste Razorpay Payment Page URL here
    },
    'kaitha-powder': {
      name: 'Kaitha Powder',
      weight: '50g',
      price: 249,
      razorpayUrl: ''    // <-- paste Razorpay Payment Page URL here
    },
    'kaitha-guda': {
      name: 'Kaitha Guda',
      weight: '250g',
      price: 399,
      razorpayUrl: ''    // <-- paste Razorpay Payment Page URL here
    },
    'kaitha-buknu': {
      name: 'Kaitha Buknu Powder',
      weight: '',        // TODO: net weight not yet confirmed by RMKAAV
      price: 269,
      razorpayUrl: ''    // <-- paste Razorpay Payment Page URL here
    }
  };

  const WHATSAPP_NUMBER = '917068946333';

  /* ------------------------------------------------------------
     FORM ENDPOINTS — paste these in when the accounts exist.

     contactUrl    Formspree. Sign up free at formspree.io, create a
                   form, copy its endpoint. Looks like:
                   'https://formspree.io/f/xdorwqkb'

     newsletterUrl Brevo. Create a signup form, then use the form's
                   POST action URL from the embed code.

     Until these are filled in, both forms fall back to sending the
     enquiry over WhatsApp — nothing is silently dropped.
     ------------------------------------------------------------ */
  const FORMS = {
    contactUrl: '',
    newsletterUrl: ''
  };

  // ----- Order buttons -----
  // Every [data-order] button ships with a working WhatsApp order link
  // already in its href, so it functions with JavaScript disabled.
  // If a razorpayUrl is configured, we upgrade the button to real checkout.
  function buildWhatsAppOrder(p) {
    const size = p.weight ? ' (' + p.weight + ')' : '';
    const msg = "Hi RMKAAV, I'd like to order:\n\n"
      + p.name + size + ' — ₹' + p.price + '\n'
      + 'Quantity: 1\n\n'
      + 'Please confirm availability and share payment details.';
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
  }

  document.querySelectorAll('[data-order]').forEach(function (btn) {
    const product = PRODUCTS[btn.getAttribute('data-order')];
    if (!product) return;

    if (product.razorpayUrl) {
      // Razorpay configured — send the buyer straight to checkout.
      btn.href = product.razorpayUrl;
      btn.removeAttribute('target');
      btn.removeAttribute('rel');
    } else {
      // No payment gateway yet — order via WhatsApp, fully pre-filled.
      btn.href = buildWhatsAppOrder(product);
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener');
    }
  });

  // Reflect the real payment route in the trust row, so we never
  // advertise a checkout that does not exist.
  const razorpayLive = Object.keys(PRODUCTS).some(function (k) {
    return !!PRODUCTS[k].razorpayUrl;
  });
  if (razorpayLive) {
    document.querySelectorAll('[data-payment-note]').forEach(function (el) {
      el.textContent = '🔒 Secure Razorpay checkout';
    });
  }

  // ----- Form submission -----
  // Posts to the configured endpoint and reports the outcome inline.
  // With no endpoint configured, hands off to WhatsApp so the message
  // still reaches RMKAAV rather than vanishing.
  function showStatus(el, message, ok) {
    if (!el) return;
    el.textContent = message;
    el.classList.toggle('form-status--error', !ok);
    el.classList.toggle('form-status--success', ok);
    el.hidden = false;
  }

  function wireForm(formId, statusId, endpoint, buildFallbackMessage, successText) {
    const form = document.getElementById(formId);
    if (!form) return;
    const status = document.getElementById(statusId);

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const data = new FormData(form);

      if (!endpoint) {
        const wa = 'https://wa.me/' + WHATSAPP_NUMBER + '?text='
          + encodeURIComponent(buildFallbackMessage(data));
        window.open(wa, '_blank', 'noopener');
        showStatus(status, 'Opening WhatsApp so you can send this to us directly.', true);
        return;
      }

      const button = form.querySelector('[type="submit"]');
      const original = button ? button.textContent : '';
      if (button) { button.disabled = true; button.textContent = 'Sending…'; }

      fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function (res) {
        if (!res.ok) throw new Error('Request failed');
        form.reset();
        showStatus(status, successText, true);
      }).catch(function () {
        showStatus(status,
          'Sorry — that did not go through. Please WhatsApp us on +91 70689 46333 instead.',
          false);
      }).then(function () {
        if (button) { button.disabled = false; button.textContent = original; }
      });
    });
  }

  wireForm('contact-form', 'contact-status', FORMS.contactUrl, function (data) {
    return 'Hi RMKAAV, a message from the website contact form:\n\n'
      + 'Name: ' + (data.get('name') || '') + '\n'
      + 'Email: ' + (data.get('email') || '') + '\n'
      + 'Phone: ' + (data.get('phone') || '—') + '\n'
      + 'Subject: ' + (data.get('subject') || '') + '\n\n'
      + (data.get('message') || '');
  }, 'Thank you — your message is with us. We reply within 1 working day.');

  wireForm('newsletter-form', 'newsletter-status', FORMS.newsletterUrl, function (data) {
    return 'Hi RMKAAV, please add me to your newsletter: ' + (data.get('EMAIL') || '');
  }, 'You are on the list. Look out for recipes and a discount.');

  // ----- Mobile menu toggle -----
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('site-nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      nav.classList.toggle('site-nav--mobile-open');
      document.body.style.overflow = !isOpen ? 'hidden' : '';
    });

    // Close mobile menu when clicking a nav link (so the user actually navigates)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (nav.classList.contains('site-nav--mobile-open')) {
          menuToggle.setAttribute('aria-expanded', 'false');
          nav.classList.remove('site-nav--mobile-open');
          document.body.style.overflow = '';
        }
      });
    });
  }

  // ----- Sticky header shadow on scroll -----
  const header = document.getElementById('site-header');
  if (header) {
    let scrollPending = false;
    function updateHeaderState() {
      if (window.scrollY > 10) {
        header.classList.add('site-header--scrolled');
      } else {
        header.classList.remove('site-header--scrolled');
      }
      scrollPending = false;
    }
    window.addEventListener('scroll', function () {
      if (!scrollPending) {
        scrollPending = true;
        window.requestAnimationFrame(updateHeaderState);
      }
    }, { passive: true });
  }

  // ----- Mark current nav link as active -----
  // Compares the link's pathname to the current page and adds aria-current="page"
  const currentPath = window.location.pathname;
  document.querySelectorAll('.site-nav__link, .site-nav__dropdown a').forEach(function (link) {
    const linkPath = new URL(link.href, window.location.origin).pathname;
    if (linkPath === currentPath) {
      link.setAttribute('aria-current', 'page');
    }
  });

  // ----- FAQ accordion -----
  document.querySelectorAll('.faq-item__question').forEach(function (button) {
    button.addEventListener('click', function () {
      const isOpen = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  // ----- Scroll-reveal -----
  // Adds .is-revealed to .section blocks as they enter the viewport.
  // Honors prefers-reduced-motion and degrades gracefully without JS
  // (the hidden-initial state is gated behind .js-ready on <html>).
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-ready');
    const revealTargets = document.querySelectorAll('.section, .product-hero, .page-hero, .final-cta');
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  }

})();
