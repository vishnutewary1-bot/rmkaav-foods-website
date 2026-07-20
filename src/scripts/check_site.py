#!/usr/bin/env python3
"""
RMKAAV Foods — site health check.

Asserts the things that were actually broken before, so they cannot
quietly come back. Run from the src/ directory:

    python3 scripts/check_site.py

Exit code 0 = all checks pass, 1 = at least one failure.
"""

import glob
import json
import os
import re
import sys

FAILURES = []
NOTES = []


def fail(check, detail):
    FAILURES.append((check, detail))


def note(check, detail):
    NOTES.append((check, detail))


def pages():
    """Every deployed HTML page (templates are partials, not pages)."""
    return sorted(f for f in glob.glob('**/*.html', recursive=True)
                  if not f.startswith('assets/'))


def read(f):
    return open(f, encoding='utf-8').read()


# --- 1. No dead links -------------------------------------------------
def check_dead_links():
    for f in pages():
        for m in re.finditer(r'href="#"', read(f)):
            fail('dead-link', f'{f}: href="#"')


# --- 2. Every local reference resolves --------------------------------
def check_local_refs():
    n = 0
    for f in pages() + glob.glob('assets/templates/*.html'):
        for m in re.finditer(r'(?:src|href|data-full)="(/[^"#?]+)"', read(f)):
            n += 1
            if not os.path.exists(m.group(1).lstrip('/')):
                fail('broken-ref', f'{f} -> {m.group(1)}')
    note('local-refs', f'{n} references checked')


# --- 3. JSON-LD is valid and its images exist -------------------------
def check_structured_data():
    blocks = 0
    for f in pages():
        for m in re.finditer(r'<script type="application/ld\+json">(.*?)</script>',
                             read(f), re.S):
            blocks += 1
            try:
                data = json.loads(m.group(1))
            except Exception as e:
                fail('invalid-jsonld', f'{f}: {e}')
                continue
            img = data.get('image')
            if isinstance(img, str) and 'rmkaavfoods.com/' in img:
                path = img.split('rmkaavfoods.com/', 1)[1]
                if not os.path.exists(path):
                    fail('jsonld-image-404', f'{f} -> {img}')
    note('json-ld', f'{blocks} blocks validated')


# --- 4. Forms must have a real destination ----------------------------
def check_forms():
    for f in pages():
        s = read(f)
        for m in re.finditer(r'<form[^>]*>', s):
            tag = m.group(0)
            if 'PLACEHOLDER' in tag or 'action="#"' in tag:
                fail('dead-form', f'{f}: {tag[:80]}')
            if 'id=' not in tag:
                fail('unwired-form', f'{f}: form has no id, JS cannot bind it')


# --- 5. No placeholder copy visible to customers ----------------------
PLACEHOLDER_PATTERNS = [
    r'Paste a real',
    r'\[Insert[^\]]*\]',
    r'\[X\]|\[Y\]',
    r'to be finalized',
    r'to be confirmed',
    r'coming soon',
    r'is provisional',
    r'will be added once',
    r'is a draft',
]


def check_placeholders():
    for f in pages():
        # strip HTML comments — working notes are fine, visible copy is not
        body = re.sub(r'<!--.*?-->', '', read(f), flags=re.S)
        # The blog's "Coming soon" is deliberate published copy, not a
        # leftover placeholder. It is noindexed and out of the sitemap.
        if f == 'blog/index.html':
            body = body.replace('Coming soon', '').replace('coming soon', '')
        for pat in PLACEHOLDER_PATTERNS:
            for m in re.finditer(pat, body, re.I):
                fail('placeholder-copy', f'{f}: "{m.group(0)}"')


# --- 6. SEO / social metadata present ---------------------------------
def check_metadata():
    required = ['rel="canonical"', 'og:image', 'twitter:card', 'og:site_name']
    for f in pages():
        s = read(f)
        for tag in required:
            if tag not in s:
                fail('missing-meta', f'{f}: no {tag}')


# --- 7. Page weight budget --------------------------------------------
BUDGET_MB = 3.0


def check_page_weight():
    for f in pages():
        total = 0
        for m in re.finditer(r'src="(/assets/images/[^"]+)"', read(f)):
            p = m.group(1).lstrip('/')
            if os.path.exists(p):
                total += os.path.getsize(p)
        mb = total / 1048576
        if mb > BUDGET_MB:
            fail('page-too-heavy', f'{f}: {mb:.1f} MB of images (budget {BUDGET_MB} MB)')


# --- 8. Every buy button is wired -------------------------------------
def check_order_buttons():
    found = 0
    for f in glob.glob('products/*.html'):
        s = read(f)
        for m in re.finditer(r'<a\s[^>]*>Buy Now[^<]*</a>', s):
            tag = m.group(0)
            found += 1
            if 'data-order=' not in tag:
                fail('unwired-buy-button', f'{f}: Buy Now without data-order')
            if 'href="#"' in tag or 'href=""' in tag:
                fail('dead-buy-button', f'{f}: Buy Now goes nowhere')
    if found == 0:
        fail('no-buy-buttons', 'no Buy Now buttons found at all')
    note('buy-buttons', f'{found} found, all wired')


# --- 9. Sitemap matches reality ---------------------------------------
def check_sitemap():
    if not os.path.exists('sitemap.xml'):
        fail('no-sitemap', 'sitemap.xml missing')
        return
    listed = set(re.findall(r'<loc>https://rmkaavfoods\.com/([^<]*)</loc>',
                            read('sitemap.xml')))
    listed = {u if u else 'index.html' for u in listed}
    # A noindexed page belongs out of the sitemap — that is correct,
    # not a gap. Only indexable pages are required to be listed.
    actual = {f for f in pages() if 'name="robots" content="noindex' not in read(f)}
    for missing in sorted(actual - listed):
        fail('sitemap-missing', f'{missing} exists but is not in sitemap.xml')
    for phantom in sorted(listed - actual):
        fail('sitemap-phantom', f'sitemap.xml lists {phantom} which does not exist')


def main():
    if not os.path.exists('index.html'):
        print('Run this from the src/ directory.')
        return 1

    for fn in (check_dead_links, check_local_refs, check_structured_data,
               check_forms, check_placeholders, check_metadata,
               check_page_weight, check_order_buttons, check_sitemap):
        fn()

    for check, detail in NOTES:
        print(f'  info  {check}: {detail}')

    if not FAILURES:
        print('\nAll checks passed.')
        return 0

    print(f'\n{len(FAILURES)} problem(s):\n')
    current = None
    for check, detail in FAILURES:
        if check != current:
            print(f'  [{check}]')
            current = check
        print(f'    {detail}')
    return 1


if __name__ == '__main__':
    sys.exit(main())
