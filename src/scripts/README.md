# Site checks

Run these before every deploy.

## 1. Static health check (no dependencies)

    python3 scripts/check_site.py

Asserts: no dead `href="#"`, every local file reference resolves, JSON-LD
is valid and its images exist, forms have real destinations, no placeholder
copy is visible to customers, SEO/social metadata is present, no page
exceeds the 3 MB image budget, every Buy Now button is wired, and the
sitemap matches the indexable pages on disk.

## 2. Functional tests (needs jsdom)

    npm install jsdom
    node scripts/test_functionality.js
    node scripts/test_cart.js
    node scripts/test_instamojo_helpers.js

The first drives the real DOM: order buttons, photo gallery, nav dropdown,
and both forms. The second drives the cart/checkout page. The third is a
plain-Node unit test (no DOM) for the server-side pricing and Instamojo
webhook-signature helpers used by `api/`.
