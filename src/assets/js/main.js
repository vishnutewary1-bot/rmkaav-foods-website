/* ============================================================
   RMKAAV Foods — site interactions
   Last updated: 2026-05-09
   ============================================================ */

(function () {
  'use strict';

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
