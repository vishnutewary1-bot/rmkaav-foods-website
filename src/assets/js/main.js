/* ============================================================
   RMKAAV Foods — site interactions
   Last updated: 2026-05-09
   ============================================================ */

(function () {
  'use strict';

  /* ============================================================
     ORDER CONFIGURATION
     ============================================================

     Product prices live in assets/js/products-data.js now (loaded
     before this file on every page) — that is the only block you need
     to edit. main.js just reads it as window.RMKAAV_PRODUCTS /
     window.RMKAAV_WHATSAPP_NUMBER so cart.js can share the exact same
     catalog.
     ============================================================ */
  const PRODUCTS = window.RMKAAV_PRODUCTS || {};
  const WHATSAPP_NUMBER = window.RMKAAV_WHATSAPP_NUMBER || '917068946333';

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
  // already in its href, so it functions with JavaScript disabled. This
  // single-item flow is separate from the cart/checkout (which uses
  // real Instamojo payment via cart.js) — it stays WhatsApp-only.
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
    btn.href = buildWhatsAppOrder(product);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener');
  });

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

  // ----- Products dropdown -----
  // Click/Enter toggles the menu and reports state via aria-expanded.
  // Hover and focus-within still open it via CSS, so this is additive.
  const dropdownToggle = document.querySelector('.site-nav__dropdown-toggle');
  if (dropdownToggle) {
    dropdownToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = dropdownToggle.getAttribute('aria-expanded') === 'true';
      dropdownToggle.setAttribute('aria-expanded', String(!isOpen));
    });

    document.addEventListener('click', function (e) {
      if (!dropdownToggle.parentNode.contains(e.target)) {
        dropdownToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        dropdownToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ----- Product photo gallery -----
  // Thumbnails swap the main product image. Buttons, so keyboard works
  // for free. With JS off the main image still renders and every
  // thumbnail is still a visible photo of the product.
  const mainImage = document.getElementById('product-main-image');
  const thumbs = document.querySelectorAll('.product-gallery__thumb');
  if (mainImage && thumbs.length) {
    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        mainImage.src = thumb.getAttribute('data-full');
        thumbs.forEach(function (t) { t.classList.remove('is-active'); });
        thumb.classList.add('is-active');
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
  // Treat "/" and "/index.html" as the same page, and skip in-page
  // anchors like the Products dropdown trigger (href="#"), which would
  // otherwise resolve to the current pathname and match every page.
  function normalisePath(p) {
    return p.replace(/\/index\.html$/, '/');
  }
  const currentPath = normalisePath(window.location.pathname);
  document.querySelectorAll('.site-nav__link, .site-nav__dropdown a').forEach(function (link) {
    const raw = link.getAttribute('href');
    if (!raw || raw.charAt(0) === '#') return;
    const linkPath = normalisePath(new URL(link.href, window.location.origin).pathname);
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
