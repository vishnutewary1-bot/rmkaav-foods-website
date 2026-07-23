# RMKAAV Foods — Business & Content Knowledge Base

> **Purpose of this file:** a complete, standalone record of every piece of business
> content on rmkaavfoods.com — company facts, product data, page copy, legal text,
> and image inventory — captured as of **23 July 2026**.
>
> This is **content only**. It intentionally excludes colors, fonts, CSS, layout,
> and design decisions, so it stays useful even if the site's visual design is
> replaced entirely. If you ever rebuild the website from scratch (new framework,
> new template, new agency), this file is everything you need to repopulate it
> with the same business facts, product information, and copy — nothing lost.
>
> Source: the live site content at the time of writing, in the `src/` folder of
> this repository (plain HTML, no CMS).

---

## Table of Contents

1. [Company & Legal Identity](#1-company--legal-identity)
2. [Brand Story & Positioning](#2-brand-story--positioning)
3. [Product Catalog (full data, all 4 products)](#3-product-catalog)
4. [Site Map — every page and its URL](#4-site-map)
5. [Homepage Content (index.html)](#5-homepage-content-indexhtml)
6. [About Page Content (about.html)](#6-about-page-content-abouthtml)
7. [Contact Page Content (contact.html)](#7-contact-page-content-contacthtml)
8. [Blog (blog/index.html)](#8-blog-blogindexhtml)
9. [Legal Policy Pages (full text)](#9-legal-policy-pages-full-text)
10. [Cart & Account Pages (functional content)](#10-cart--account-pages-functional-content)
11. [Global/Shared Elements (header, footer, WhatsApp float)](#11-globalshared-elements)
12. [Image Asset Inventory](#12-image-asset-inventory)

---

## 1. Company & Legal Identity

| Field | Value |
|---|---|
| Registered company name | **RMKAAV Ventures Private Limited** (incorporated under the Companies Act, 2013) |
| Trading / brand name | **RMKAAV Foods** (website/storefront name) |
| Product brand | **Banda Delights** |
| Founders | **Vishnukant Tiwari** and **Madhuri Tiwari** |
| Registered office / Banda office | Chamraudi Chauraha, Kalu Kuwan Road, Banda City, Banda, Uttar Pradesh — 210001 |
| FSSAI License No. | **22725829000116** |
| GSTIN | **09AAMCR8337A2Z6** |
| Email | **info@rmkaavfoods.com** |
| WhatsApp / customer service phone | **+91 70689 46333** |
| Second phone (sales, per Organization schema) | +91 70689 46444 |
| Phone listed on Contact page | +91 70689 46444 (tel:+917068946444) — *note: contact.html shows this number for "Phone", while WhatsApp/footer use 46333; both appear to be real business lines* |
| Website | https://rmkaavfoods.com |
| Amazon brand store | https://www.amazon.in/s?me=A1KEJZG2K8D2VC ("On Amazon since 2025") |
| Governing law / jurisdiction | Laws of India; courts at **Banda, Uttar Pradesh** |
| Grievance officer (per Privacy Policy) | Vishnukant Tiwari, Director, RMKAAV Ventures Private Limited — info@rmkaavfoods.com — same registered address |
| Payment partner (per Terms) | Razorpay |
| Footer tagline | "Made by hand, in Banda. Made for India." |
| Footer copyright line | "© 2026 RMKAAV Ventures Private Limited. All rights reserved. · Made with care in Banda, Uttar Pradesh." |

**Schema.org Organization data (embedded on homepage `<head>`):**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "RMKAAV Ventures Private Limited",
  "alternateName": "RMKAAV Foods",
  "url": "https://rmkaavfoods.com",
  "logo": "https://rmkaavfoods.com/assets/images/brand/logo.svg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Chamraudi Chauraha, Kalu Kuwan Road",
    "addressLocality": "Banda",
    "addressRegion": "Uttar Pradesh",
    "postalCode": "210001",
    "addressCountry": "IN"
  },
  "contactPoint": [
    { "@type": "ContactPoint", "telephone": "+91-70689-46333", "contactType": "customer service", "email": "info@rmkaavfoods.com", "areaServed": "IN", "availableLanguage": ["English", "Hindi"] },
    { "@type": "ContactPoint", "telephone": "+91-70689-46444", "contactType": "sales", "areaServed": "IN", "availableLanguage": ["English", "Hindi"] }
  ]
}
```

---

## 2. Brand Story & Positioning

**One-line positioning:** Handmade, sun-dried, stone-ground traditional Indian fruit
powders from Banda, Bundelkhand (UP) — "wisdom from our grandmothers' kitchens."

**What RMKAAV sells:** traditional, single-ingredient (mostly) fruit powders —
jujube (birchun) and wood apple (kaitha) — prepared the way regional households in
Bundelkhand have always prepared them: sun-dried in open trays, stone-ground (not
machine-milled), single ingredient where possible, no preservatives/fillers/added
sugar. One product (Kaitha Buknu Powder) is a traditional multi-spice digestive
blend rather than single-ingredient.

**Why the brand exists (from About page, "Why we started RMKAAV"):**
> We — Vishnukant and Madhuri Tiwari — started RMKAAV Ventures because we saw
> something missing in the wellness-food world. The shelves were full of
> "Ayurvedic" and "natural" products, but most of them were generic, mass-produced,
> and priced like luxury goods. The actual fruits and spices that Indian
> households have used for generations — the ones our parents and grandparents
> reached for when someone had an upset stomach, or needed cooling in a Banda
> summer, or wanted something simple and honest after a heavy meal — those were
> missing. Or they were buried under so much packaging and so many added
> ingredients that the original food was hard to find.
>
> So we started small. We took the fruits we knew best, prepared them the way
> they've always been prepared in Banda — sun-dried, stone-ground,
> single-ingredient — and put them in a jar. No preservatives, no fillers, no
> shortcuts.
>
> We named the brand **Banda Delights** because everything we make starts here.

**Founders' quote (homepage):**
> "We started RMKAAV because the Banda we grew up in — its kaitha trees, its
> sun-dried churnas, its grandmother-recipes — was quietly disappearing from
> store shelves. So we put it in a jar."
> — Vishnukant & Madhuri Tiwari, Founders

**The "six promises" (About page — core brand commitments, useful as an evergreen
positioning statement):**
1. **Single ingredients** — where a product is single-ingredient, nothing else is in it.
2. **Honestly blended** — where a product is a blend (Buknu), every ingredient is listed in descending order by weight, no hidden additives.
3. **Direct sourcing** — every fruit comes from farmers known personally in Banda district; no anonymous wholesale suppliers.
4. **Fair prices to farmers** — paid above the local mandi rate, always.
5. **Honest labelling** — no "miracle cure" claims or "doctor recommended" theatrics; products are food, part of Indian kitchen/Ayurvedic tradition, used sensibly.
6. **No middleman markup** — buying direct from rmkaavfoods.com means paying close to actual cost, not cost-plus-marketplace-fees.

**How it's made (4-step process, consistent across homepage/About):**
1. **Sourcing / Hand-pick** — fruit from known Banda-district farmers, picked at peak ripeness, fair prices paid.
2. **Sun-drying** — open trays, direct sun, 3–5 days. No industrial dehydrators.
3. **Stone-grinding** — slow, doesn't generate heat, keeps aroma/flavor intact (vs. heat-generating machine milling).
4. **Hand-jarring / packing** — sealed in small batches, labelled, shipped directly from the Banda kitchen (not a third-party warehouse).

**Competitive differentiation ("why our jar vs. the supermarket jar"):**

| Mass-market jar | RMKAAV jar |
|---|---|
| Machine-dried in hours | Sun-dried over days |
| Heat-milled at speed | Stone-ground, slow and cool |
| Anonymous wholesale supply | One Banda district, named farmers |
| Preservatives + anti-caking agents | Single ingredient, nothing else |
| Made in a factory | Made in the family kitchen |
| Sold by a brand | Sold by Vishnukant & Madhuri, personally |

**Regulatory/positioning stance (repeated on every product page):** these are
**traditional food products, not medicines or licensed Ayurvedic supplements**.
No medical claims are made; traditional-use statements are not FSSAI-evaluated
for medicinal claims. Customers are advised to consult a doctor if pregnant,
nursing, on medication, or for children.

---

## 3. Product Catalog

Four products total. All prices in INR, GST-inclusive. All ship from Banda via
WhatsApp-confirmed order (site) or Amazon (marketplace listing).

### 3.1 Birchun Powder

- **Full title:** Birchun Powder — The Summer Cooler of Banda, in a Jar
- **What it is:** 100% Indian jujube fruit (ber / *Ziziphus mauritiana*), single ingredient
- **Price:** ₹249
- **Size:** 50g jar, ~25 servings
- **Product page:** `/products/birchun-powder.html`
- **Amazon listing:** https://www.amazon.in/Birchun-Powder-Indian-Jujube-Fruit/dp/B0DM8WQV1H
- **WhatsApp order link:** `https://wa.me/917068946333?text=Hi%20RMKAAV%2C%20I%27d%20like%20to%20order%3A%0A%0ABirchun%20Powder%20%2850g%29%20%E2%80%94%20%E2%82%B9249%0AQuantity%3A%201%0A%0APlease%20confirm%20availability%20and%20share%20payment%20details.`
  (decoded: "Hi RMKAAV, I'd like to order:\n\nBirchun Powder (50g) — ₹249\nQuantity: 1\n\nPlease confirm availability and share payment details.")

**Hero bullets:**
- 100% Indian jujube fruit (ber / *Ziziphus mauritiana*) — single ingredient
- Sun-dried and stone-ground by hand in Banda, Uttar Pradesh
- No preservatives, no anti-caking agents, no added sugar, no gluten
- Roughly 25 servings per jar — about a month of daily use
- Tangy-sweet flavour — somewhere between dates and tamarind

**Story:**
> "Birchun" is what Bundelkhand calls processed jujube — the small, ridged fruit
> that ripens between February and April on hardy trees that need almost nothing
> to survive a Banda summer.
>
> In our grandmothers' homes, ripe jujube was sun-dried on the rooftop, ground on
> a stone, and kept in a steel *dabba* on the kitchen shelf. When summer arrived
> in earnest — that hot, dry Bundelkhand summer that doesn't loosen its grip
> until the monsoon — birchun went into a glass of water with a pinch of black
> salt and a squeeze of lime. That was the cooler. No ice, no sugar syrup, no
> powdered drink mix.
>
> We make Birchun the same way. The trees are the same trees. The sun is the
> same sun. We hope the drink tastes the same too.

**What's inside:** 100% Indian jujube fruit (*Ziziphus mauritiana*), Banda district, UP.
**What's NOT inside:** preservatives, artificial colours/flavours, added sugar, fillers/bulking agents, anti-caking agents, gluten.

**Traditional benefits** (heading: "How Birchun has traditionally been used"):
- **Cooling, in the Bundelkhand way** — the classic glass of birchun-water with black salt and lime.
- **A natural source of vitamin C and fibre** — Indian jujube is naturally rich in these.
- **Traditionally associated with digestion** — long part of foods taken to support digestion.
- **Naturally tangy-sweet** — a flavour kids and adults both enjoy.

**Disclaimer:** *"Birchun Powder is a food product, not a medicine. The traditional uses described above have not been evaluated by FSSAI for medicinal claims. This product is not intended to diagnose, treat, cure, or prevent any disease. Consult your doctor before adding any new food to your diet, especially if pregnant, nursing, or on medication."*

**How to use:**
1. **Classic Banda summer cooler** — 1 tsp Birchun + 1 glass cold water + pinch black salt + squeeze fresh lime. Stir, drink first thing in the morning or after the heat.
2. **In curd or lassi** — 1 tsp into fresh curd or salted lassi.
3. **On fruit chaat** — sprinkle generously with chaat masala on cut seasonal fruit.

**Where it comes from:**
> Our Birchun comes from family orchards in Banda district, where jujube trees
> have grown — mostly untended, mostly old — for generations. We pick the fruit
> at peak ripeness and dry it the same week. No long storage, no transport
> across the country, no industrial processing.

**FAQ:**
1. **What does it taste like?** Tangy-sweet, slight tartness — between dates and tamarind.
2. **How long does one 50g jar last?** About a month at 1 tsp/day.
3. **How should I store it?** Cool, dry place away from sunlight; airtight container in humid/monsoon weather.
4. **Shelf life?** Best within 9 months from manufacture date (printed on lid).
5. **Safe during pregnancy/for young children?** Traditional food given to children for generations; check with your doctor for pregnancy/very young children.
6. **How quickly does it ship?** 1–2 working days from Banda; pan-India 2–10 working days depending on PIN code. See Shipping Policy.
7. **Can I return it if I don't like the taste?** No returns on opened jars (food safety); replacement if damaged/defective. See Refund Policy.
8. **Same as the Amazon listing?** Yes, same product/jar/recipe — buying direct just means it ships straight from RMKAAV.

**Cross-sell:** Kaitha Powder, Kaitha Guda, Kaitha Buknu Powder.

**Images:** main/thumb `birchun-1.webp` (alt: "Birchun Powder — Indian jujube fruit powder by Banda Delights"), thumbs `birchun-2.webp`, `birchun-3.webp` (no alt); story image `lifestyle/jujube-tree.webp` (alt: "Raw jujube fruits on a branch in Banda"); origin image `lifestyle/jujube-fruits-stages.webp` (alt: "Family orchard in Banda district").

---

### 3.2 Kaitha Powder

- **Full title:** Kaitha Powder — Wood Apple, Stone-Ground in Banda
- **What it is:** 100% wood apple fruit pulp (*Limonia acidissima* / kaitha / kavath), single ingredient
- **Price:** ₹249 · positioned as the **bestseller** ("the Banda classic")
- **Size:** 50g jar, ~25 servings
- **Product page:** `/products/kaitha-powder.html`
- **Amazon listing:** https://www.amazon.in/Kaitha-Powder-Dried-Apple-Fruit/dp/B0DM8XJF1L
- **WhatsApp order link:** `https://wa.me/917068946333?text=Hi%20RMKAAV%2C%20I%27d%20like%20to%20order%3A%0A%0AKaitha%20Powder%20%2850g%29%20%E2%80%94%20%E2%82%B9249%0AQuantity%3A%201%0A%0APlease%20confirm%20availability%20and%20share%20payment%20details.`

**Hero bullets:**
- 100% wood apple fruit pulp (*Limonia acidissima* / kaitha / kavath) — single ingredient
- Sun-dried and stone-ground in Banda, Uttar Pradesh
- No preservatives, no fillers, no added sugar
- 50g jar — roughly 25 servings
- Earthy, tangy, deeply distinctive flavour

**Story:**
> *Kaitha* (also called *kavath* in Marathi, *kothbel* in Bengali, *velam* in
> Tamil) is one of India's oldest forgotten fruits. The wood apple has a hard,
> woody shell and a strong, distinctive pulp inside — sweet-sour, deeply earthy,
> instantly recognisable. It grows on trees that have been in Indian villages for
> so long, no one remembers planting them.
>
> In Banda and across Bundelkhand, the wood apple was the kitchen-shelf remedy.
> Stomach feeling off? Kaitha. Just had a heavy meal? Kaitha. Children unsettled
> in the rains? Kaitha. It went into chutneys, into morning drinks, into
> Ayurvedic preparations.
>
> Then, somewhere along the way, modern food forgot about it. We didn't. Our
> Kaitha Powder is the same wood apple our grandmothers used, prepared the same
> way — sun-dried, stone-ground, sealed in a jar.

**What's inside:** 100% wood apple fruit pulp (*Limonia acidissima*), Banda district, UP.
**What's NOT inside:** preservatives, artificial colours/flavours, added sugar, fillers, anti-caking agents, gluten.

**Traditional benefits** (heading: "How Kaitha has traditionally been used"):
- **Traditionally taken for digestion** — especially after heavy meals.
- **Gentle on the gut** — naturally rich in fibre.
- **A part of Ayurvedic tradition** — associated with supporting digestive balance.
- **Distinctive, unforgettable flavour.**

**Disclaimer:** *"Kaitha Powder is a food product, not a medicine. Traditional uses described above have not been evaluated by FSSAI for medicinal claims. This product is not intended to diagnose, treat, cure, or prevent any disease. Consult your doctor before adding any new food to your diet, especially if pregnant, nursing, or on medication."*

**How to use:**
1. **Morning warm-water drink** — ½–1 tsp + 1 glass warm water + small piece of jaggery if desired.
2. **Stirred into chutneys** — 1 tsp into green/tamarind chutney; pairs with mint and coriander.
3. **In buttermilk** — 1 tsp whisked into cold chaas with cumin and salt.

**Where it comes from:**
> Our Kaitha comes from wood apple trees in Banda district, mostly old, mostly
> growing where they've grown for as long as anyone can remember. We collect the
> fruit when it ripens, dry the pulp under open sun, and grind it on stone in our
> own kitchen. Nothing leaves Banda before it's a finished jar.

**FAQ:**
1. **Taste?** Tangy, sweet-sour, deeply earthy; unfamiliar at first, most people are hooked by the 3rd–4th try.
2. **Kaitha Powder vs. Kaitha Guda?** Same fruit, different format — Powder is finely ground; Guda is chunky dried pulp, closer to traditional preparation.
3. **How long does a 50g jar last?** ~1 month at ½–1 tsp/day.
4. **Storage?** Cool, dry, away from sunlight; airtight container in humid weather.
5. **Shelf life?** Best within 9 months from manufacture.
6. **Safe during pregnancy/for children?** Traditional food; check with doctor for pregnancy/very young children.
7. **Texture?** Fine, slightly sandy (like fine atta); dissolves easily in warm water.
8. **Shipping?** 1–2 working days from Banda.

**Cross-sell:** Birchun Powder, Kaitha Guda, Kaitha Buknu Powder.

**Images:** main/thumb `kaitha-powder-1.webp` (alt: "Kaitha Powder — wood apple fruit powder by Banda Delights"), thumbs `kaitha-powder-2.webp`, `kaitha-powder-3.webp`; story image `lifestyle/woodapple-opened.webp` (alt: "A whole wood apple cracked open beside a bowl of kaitha powder"); origin image `lifestyle/woodapple-tree.webp` (alt: "Wood apple trees in Banda district").

---

### 3.3 Kaitha Guda

- **Full title:** Kaitha Guda — Pure Wood Apple Pulp, As Old India Made It
- **What it is:** 100% wood apple fruit pulp, sun-dried in chunky/pulp form (not ground) — single ingredient
- **Price:** ₹399
- **Size:** 250g jar
- **Product page:** `/products/kaitha-guda.html`
- **Amazon listing:** https://www.amazon.in/Kaitha-Guda-Dried-Apple-Fruit/dp/B0DMBZL3PG
- **WhatsApp order link:** `https://wa.me/917068946333?text=Hi%20RMKAAV%2C%20I%27d%20like%20to%20order%3A%0A%0AKaitha%20Guda%20%28250g%29%20%E2%80%94%20%E2%82%B9399%0AQuantity%3A%201%0A%0APlease%20confirm%20availability%20and%20share%20payment%20details.`

**Hero bullets:**
- 100% wood apple fruit pulp (*Limonia acidissima* / kaitha) — single ingredient
- Sun-dried in chunky pulp form — closer to the traditional preparation than powder
- 250g jar — generous size, lasts a household 2–3 months
- No preservatives, no additives, nothing added at all
- Use in chutneys, soak-and-mash drinks, or eat plain like amchur candy

**Story:**
> *Guda* simply means *pulp* — the concentrated heart of the wood apple before it
> ever sees a grinding stone. In old Banda kitchens, this is how kaitha was
> actually kept: the dried pulp in a jar, broken off in pieces, soaked in water
> for an hour, and then mashed into a glass or a chutney as needed.
>
> Powdering kaitha is a modern convenience — quicker, easier to mix. The pulp
> form is the original. It keeps longer. It tastes more intensely. It lets you
> control how fine or how chunky you want the final preparation. And when our
> grandmothers reached for kaitha after a heavy meal, it was the *guda* they
> reached for — not a powder.
>
> We make Kaitha Guda for people who want the fruit at its rawest. Two products,
> one fruit, two ways of using it.

**What's inside:** 100% wood apple fruit pulp (*Limonia acidissima*), sun-dried in chunky form, Banda district, UP.
**What's NOT inside:** preservatives, additives of any kind, grinding agents, added sugar, gluten. "Just the fruit, dried."

**Traditional benefits** (heading: "Why pulp, not powder"):
- **Closer to the traditional preparation** — the format used before powders existed.
- **Traditionally taken for digestion** — especially after heavy/oily meals.
- **Long shelf life** — dried pulp keeps far longer than fresh fruit.
- **You control the texture** — soak-and-mash to paste, or chew small pieces.

**Disclaimer:** *"Kaitha Guda is a food product, not a medicine. Traditional uses described above have not been evaluated by FSSAI for medicinal claims. This product is not intended to diagnose, treat, cure, or prevent any disease. Consult your doctor before adding any new food to your diet, especially if pregnant, nursing, or on medication."*

**How to use:**
1. **Traditional soak-and-mash drink** — break off ~1 tsp worth, soak overnight in water, mash and drink slowly in the morning. "The most authentic way to take kaitha."
2. **Kaitha chutney** — soak 1 tbsp for 30 min, mash with green chillies, salt, and a little jaggery.
3. **In dals and soups** — add a soaked, mashed teaspoon near the end of cooking.

**Where it comes from:**
> The wood apples for our Guda come from the same trees as our Kaitha Powder —
> Banda district, family farms, picked at peak ripeness. The only difference is
> what we do after harvest: for Guda, the pulp is dried in larger pieces and
> never ground.

**FAQ:**
1. **Why choose Guda over Powder?** Traditional format preference; texture control; keeps longer once opened than powder.
2. **How is it packaged?** Broken-off chunks of dried pulp, sealed in a 250g jar.
3. **Do I have to soak it?** Yes for drinks/chutneys (30 min–overnight); no for eating plain.
4. **How long does a 250g jar last?** 2–3 months at once-daily use.
5. **Storage?** Cool, dry place, sealed jar.
6. **Shelf life?** Best within 12 months from manufacture (longer than powder — less surface area exposed).
7. **Safe during pregnancy/for children?** Traditional food; check with doctor.
8. **Why ₹399 for 250g when Amazon shows different prices?** Website simplified to one size/price; Amazon has other pack-size variants, but direct purchase ships from Banda with no marketplace markup.

**Cross-sell:** Birchun Powder, Kaitha Powder, Kaitha Buknu Powder.

**Images:** main/thumb `kaitha-guda-1.webp` (alt: "Kaitha Guda — chunks of dried wood apple fruit pulp by Banda Delights"), thumbs `kaitha-guda-2.webp`, `kaitha-guda-3.webp`; story image `lifestyle/woodapple-whole.webp` (alt: "Chunks of dried wood apple pulp in a wooden bowl"); origin image `lifestyle/woodapple-tree.webp` (alt: "Wood apple harvest in Banda").

---

### 3.4 Kaitha Buknu Powder

- **Full title:** Kaitha Buknu Powder — The Ayurvedic Digestive Churna of Banda
- **What it is:** Traditional Bundelkhandi digestive *churna* — wood apple powder base blended with digestive spices (**not** single-ingredient)
- **Price:** ₹269
- **Size:** not stated in grams on the page (only other 3 products list exact weight)
- **Product page:** `/products/kaitha-buknu-powder.html`
- **Amazon listing:** https://www.amazon.in/dp/B0FDKY8VQ5
- **WhatsApp order link:** `https://wa.me/917068946333?text=Hi%20RMKAAV%2C%20I%27d%20like%20to%20order%3A%0A%0AKaitha%20Buknu%20Powder%20%E2%80%94%20%E2%82%B9269%0AQuantity%3A%201%0A%0APlease%20confirm%20availability%20and%20share%20payment%20details.`

**Hero bullets:**
- A traditional Ayurvedic *churna* — wood apple powder blended with carom, cumin, ginger, hing, and other digestive spices
- Hand-blended in small batches in Banda, Uttar Pradesh
- 100% natural ingredients — no preservatives, no fillers
- A pinch after a meal — that's all it takes
- Earthy, savoury, faintly tangy — like a digestive masala

**Story:**
> *Buknu* (also *buknoo*) is what Bundelkhand calls its post-meal digestive
> churna. Every region of India has its own version — Maharashtra has its
> *churna*, Gujarat has its *mukhwas*, Delhi has its Hajmola. Bundelkhand has
> *buknu*.
>
> What makes ours specifically Bundelkhandi is the base: wood apple. Most Indian
> digestive churnas use *amla* or *triphala* or *trikatu* as their backbone.
> Ours uses kaitha — the same wood apple our grandmothers reached for to settle
> a stomach. Around that, we blend the spices that have been part of every
> Indian kitchen for as long as Indian kitchens have existed: ajwain, jeera,
> sonth, hing, kala namak, and a few more.
>
> The result is a powder you keep in a small jar near the kitchen table. After a
> heavy meal — a wedding feast, a Sunday lunch, a meal that went on too long —
> you take a pinch. That's the whole product.

**Ingredients (descending order by weight, per FSSAI labelling rules):**
1. Wood apple pulp powder
2. Black salt
3. Roasted cumin powder
4. Carom seeds powder
5. Dry ginger powder
6. Tamarind powder
7. Rock salt
8. Long pepper powder
9. Black pepper powder
10. Asafoetida

> **Allergen note:** "Asafoetida (hing) used in this product may contain wheat
> as a stabiliser. If you have wheat or gluten sensitivity, please contact us at
> info@rmkaavfoods.com to confirm the current batch's hing source before
> ordering."
>
> *(Internal note found in page source, not published: exact ingredient
> percentages are still to be confirmed against the real production recipe
> before publishing — do not publish estimated percentages.)*

**What's NOT inside:** preservatives, artificial colours/flavours, added sugar, chemical anti-caking agents, flavour enhancers (no MSG).

**Traditional benefits** (heading: "How Buknu has traditionally been used"):
- **Made for after a meal** — a post-meal churna for gentle digestive support.
- **A blend of carminative spices** — ajwain, jeera, ginger, hing traditionally used for digestion.
- **Wood apple at the centre** — unlike most churnas, uses kaitha as base, traditionally associated with digestive support in Bundelkhand.
- **Hand-blended, small batch** — made in the Banda kitchen, mixed by hand.

**Disclaimer (stronger wording than other products):** *"Kaitha Buknu Powder is a traditional food product / Ayurvedic churna. It is not a licensed Ayurvedic medicine and not intended to diagnose, treat, cure, or prevent any disease. Traditional uses described have not been evaluated by FSSAI or AYUSH for medicinal claims. Some ingredients (such as black pepper, long pepper, dry ginger) may interact with certain medications. Consult your doctor before regular use, especially if pregnant, nursing, on medication, or managing a medical condition."*

**How to use:**
1. **Classic post-meal pinch** — ¼–½ tsp directly on tongue with a sip of warm water, after lunch/dinner.
2. **Sprinkled on food** — small pinch over cooked dal, sabzi, or curd.
3. **Warm-water sip after a heavy meal** — ½ tsp + 1 small cup warm water, sipped slowly.

**Where it comes from:**
> The wood apple base for our Buknu comes from the same farms as our Kaitha
> Powder and Kaitha Guda — Banda district, family orchards. The spices are
> sourced from trusted suppliers in and around Banda where possible, and from
> quality wholesalers elsewhere when local supply isn't available. We grind and
> blend everything in our own kitchen, in small batches.

**FAQ:**
1. **How is this different from Kaitha Powder?** Kaitha Powder is pure wood apple; Buknu is a blend of wood apple + digestive spices, meant specifically for after meals.
2. **Is this a medicine?** No — traditional food/Ayurvedic churna, not licensed medicine, no prescription needed.
3. **Can I take it every day?** Traditionally as-needed, mainly after heavy meals; a small pinch is enough. Consult doctor if on regular medication.
4. **Does it contain wheat?** Possibly trace wheat via the hing (asafoetida) stabiliser — contact info@rmkaavfoods.com to confirm current batch.
5. **Safe during pregnancy?** Contains warming spices (dry ginger, long pepper, black pepper) and hing, traditionally avoided in early pregnancy — consult doctor.
6. **Can children take it?** Not recommended for children under 6 without consulting a doctor — potent spice blend.
7. **Taste?** Earthy, savoury, between chaat masala and pickle; not sweet.
8. **How long does one jar last?** 1–2 months for a single user at ¼ tsp/meal.

**Cross-sell:** Birchun Powder, Kaitha Powder, Kaitha Guda.

**Images:** main/thumb `kaitha-buknu-1.webp` (alt: "Kaitha Buknu Powder — Ayurvedic digestive churna by Banda Delights"), thumbs `kaitha-buknu-2.webp`, `kaitha-buknu-3.webp`; story image `lifestyle/grinding-2.webp` (alt: "A small spoon of buknu powder beside a thali plate"); origin/ingredients image `lifestyle/spices-2.webp` (alt: "Spices laid out for the Buknu blend").

---

### 3.5 Product Summary Table

| Product | Price | Size | Single-ingredient? | Product URL |
|---|---|---|---|---|
| Birchun Powder | ₹249 | 50g | Yes (jujube) | `/products/birchun-powder.html` |
| Kaitha Powder | ₹249 | 50g | Yes (wood apple) — **bestseller** | `/products/kaitha-powder.html` |
| Kaitha Guda | ₹399 | 250g | Yes (wood apple, pulp form) | `/products/kaitha-guda.html` |
| Kaitha Buknu Powder | ₹269 | not stated | No — 10-ingredient spice blend | `/products/kaitha-buknu-powder.html` |

**Shared elements across every product page:** identical trust row ("🚚 Dispatched
in 1–2 working days" · "🔒 UPI, card or bank transfer" · "↩ 48-hour damage
replacement"), identical final-CTA pattern ("Ready to try it?" + WhatsApp Buy Now
+ Amazon link), identical Add to Cart button pattern (`data-add-to-cart="<slug>"`,
JS-driven, no href).

---

## 4. Site Map

| Page | URL path | Purpose |
|---|---|---|
| Homepage | `/index.html` | Main landing page |
| About | `/about.html` | Brand story, founders, farmers, promises |
| Contact | `/contact.html` | Contact methods, form, wholesale enquiries |
| Cart | `/cart.html` | Shopping cart, checkout, order confirmation |
| Account | `/account.html` | Login/signup, saved delivery details |
| Blog | `/blog/index.html` | "Coming soon" journal placeholder |
| Birchun Powder | `/products/birchun-powder.html` | Product page |
| Kaitha Powder | `/products/kaitha-powder.html` | Product page |
| Kaitha Guda | `/products/kaitha-guda.html` | Product page |
| Kaitha Buknu Powder | `/products/kaitha-buknu-powder.html` | Product page |
| Privacy Policy | `/policies/privacy.html` | Legal |
| Terms & Conditions | `/policies/terms.html` | Legal |
| Shipping Policy | `/policies/shipping.html` | Legal |
| Return & Refund Policy | `/policies/refund.html` | Legal |
| Cancellation Policy | `/policies/cancellation.html` | Legal |

**Key external links used site-wide:**
- WhatsApp (general contact): `https://wa.me/917068946333?text=Hi%20RMKAAV%2C%20I%20have%20a%20question`
- Amazon brand storefront: `https://www.amazon.in/s?me=A1KEJZG2K8D2VC`
- Each product also has its own individual Amazon product listing (see §3).

---

## 5. Homepage Content (index.html)

**SEO:** Title: "RMKAAV Foods — Handmade Traditional Indian Fruit Powders | Banda Delights". Meta description: "Sun-dried, stone-ground fruit powders from Banda, UP. Birchun (Indian jujube), Kaitha (wood apple) and our Bundelkhandi buknu churna — 100% natural, no preservatives. Direct from our kitchen, shipped pan-India."

### Hero
- Eyebrow: "Made by hand · Banda, UP"
- H1: **"Wisdom from our grandmothers' kitchens, delivered to yours."**
- Subtitle: "Small-batch, sun-dried, stone-ground fruit powders from the heart of Banda. Nothing added. Nothing taken away."
- CTAs: "Shop the Range" (→ `#our-range`), "Our Banda story →" (→ `/about.html`)
- Trust chips: Sun-dried · Stone-ground · One region · FSSAI 22725829000116
- Hero image: `products/birchun-1.webp` (placeholder — TODO note in source to replace with a real hero photo)

### Trust strip
100% Natural · Handmade in Banda · No Preservatives · FSSAI Licensed · Pan-India Shipping

### Our Range (`#our-range`)
H2: "Our four jars" / Sub: "Single-ingredient where the product is single-ingredient. One churna where it isn't." — grid of all 4 products (see §3), each with "View details →" CTA.

### From the Founders (`#story`)
Eyebrow "From the founders" / H2 "Why we put Banda in a jar." + founders' quote (see §2) + "Read our full story →" link to About.

### Bundelkhand Heritage (`#heritage`)
- H2: "Bundelkhand. Where the fruit grows wild and the kitchens remember."
- Sub: "Banda district, Uttar Pradesh — the heart of Bundelkhand."
- Body: "Banda is dry, sun-soaked, and generous to two fruits in particular — the kaitha (wood apple) that ripens slow on hardy trees, and the ber (Indian jujube) that families dry on rooftops to keep through summer. For generations these fruits have lived in regional kitchens as churnas, sherbets, chutneys and after-meal pinches." / "The recipes were never written down. They lived in mothers and aunts, in the dust of grindstones and the rhythm of monsoon. We collected them, kept them honest, and put them in jars — so the kitchen of Banda could travel beyond it."
- Three-card trio: "The ber" (jujube tree — source of Birchun), "The kaitha" (wood apple tree — source of Kaitha Powder/Guda/Buknu), "Our Banda" (where everything is sourced/dried/ground/packed by hand).

### How We Make It (`#how-we-make`)
H2 "How we make it" / Sub "Four steps. Same as a hundred years ago. Same as last week." — the 4-step process (see §2).

### What Goes Into Every Jar
H2 "What goes into every jar" / Sub "And what doesn't." Four features: "Sun-dried, not dehydrated"; "Stone-ground, not machine-milled"; "Sourced from one region"; "Nothing else added" (full text in §2/product pages pattern).

### Why Our Jar vs Supermarket (`#why-us`)
H2 "Why our jar, vs the supermarket jar." / Sub "Six honest differences. No marketing hand-waving." — comparison table (see §2).

### Promo Banner (bestseller)
"Why RMKAAV" list: Single ingredient, nothing else · Sun-dried and stone-ground in Banda · No preservatives, no fillers, ever. Eyebrow "Our bestseller" / H3 "Kaitha Powder — the Banda classic" / "Wood apple, stone-ground the way it's always been. The one jar most customers reorder first." → "Shop Kaitha Powder →"

### What Customers Say (`#reviews`)
> Note: source has a developer comment explaining placeholder review cards with
> fabricated "Verified Amazon Purchase" 5-star reviews were deliberately removed
> as inauthentic social proof.

Eyebrow "What customers say" / H2 "Our reviews live on Amazon." / Sub "Every rating we have was left by a verified buyer on our Amazon brand store. We would rather send you to read them there, unedited, than reprint the flattering ones here." → "Read our reviews on Amazon ↗"

### Bringing It Into Your Day — recipes (`#recipes`)
H2 "Bringing it into your day." / Sub "Three quick ways our customers use the jars." Three recipe cards: Birchun sherbet, Kaitha chutney, The after-meal pinch (Buknu) — full text in §3 per-product "how to use" sections.

### Common Questions — FAQ (`#faq`)
H2 "Common questions." / Sub "Six questions we hear most often." Six Q&As covering: natural ingredients, shelf life, how to use, shipping/timelines, returns, and "are these medicinal" — full verbatim answers below (these are homepage-general FAQs, distinct from the per-product FAQs in §3):

1. **Are these powders 100% natural?** "Yes — the three single-ingredient jars (Birchun, Kaitha Powder, Kaitha Guda) contain only the named fruit. Kaitha Buknu is a traditional Bundelkhandi churna with wood apple as the base, blended with hing, ajwain, jeera, kala namak and other carminative spices. No preservatives, no anti-caking agents, no added sugar in any of our products."
2. **How long do the powders stay fresh?** "Stored in a cool, dry place with the lid sealed, our jars stay best for the date printed on the jar (typically 9–12 months from packing). Refrigeration isn't required, but it doesn't hurt during peak summer."
3. **How do I use Birchun, Kaitha and Buknu?** "Birchun is most often mixed with cold water and a pinch of black salt as a summer drink. Kaitha goes into chutneys, lassi, or warm-water sips. Buknu is taken as a half-teaspoon pinch after a meal, or sprinkled on cooked vegetables. See our recipe ideas above for the basics, and each product page for more."
4. **Where do you ship and how long does it take?** "We ship pan-India. Metro cities typically arrive in 2–4 working days; non-metro and remote pin codes take 4–10 working days. Order tracking is sent over WhatsApp and email. We don't ship internationally yet. Full details on the shipping policy."
5. **Can I return a jar if I don't like it?** "If a jar arrives damaged, wrong, or defective, message us within 48 hours of delivery with a photo and we will replace it or refund you. Once a jar is opened, food-safety rules mean we cannot accept it back, and we cannot take returns based on taste preference. See our refund policy for the full terms."
6. **Are these products medicinal?** "No. Our jars are traditional food products, not medicines or licensed Ayurvedic supplements. The fruits and spices have a long history of use in Indian kitchens and traditional preparations, but we make no medical claims. If you are pregnant, nursing, on medication, or planning to give the products to a child, please consult your doctor first."

### Trust & Credentials (`#credentials`)
FSSAI Lic. 22725829000116 · GST registered 09AAMCR8337A2Z6 · "On Amazon since 2025" (link to brand store) · Secure payments "UPI · Bank transfer · Confirmed over WhatsApp"

### Newsletter
H2 "Recipes, traditions, and a little discount in your inbox." / Sub "Once a month. No spam. Unsubscribe whenever." Email field + "Subscribe" button. Terms note: "By subscribing, you agree to our Privacy Policy."

### Contact Preview
H2 "Questions? We answer personally." / Sub "Usually within a day. Sometimes within an hour, if Madhuri has tea in hand." Three cards: WhatsApp (+91 70689 46333), Email (info@rmkaavfoods.com), Banda office (address). Footer note: "Visit our full contact page for working hours and a longer enquiry form."

### (Disabled) Blog teaser
Currently commented out in source pending 3+ published posts. Draft copy: H2 "From our journal" / Sub "Recipes, traditions, and stories from Banda."

---

## 6. About Page Content (about.html)

**SEO:** Title: "About RMKAAV Foods — Made by hand, in Banda | Banda Delights". Meta description: "A small Banda household making traditional Indian fruit powders the way our grandmothers made them. Founders Vishnukant and Madhuri Tiwari, working with farmers in Bundelkhand."

### Page hero
- H1: **"Rooted in Banda. Made by hand. Made for you."**
- Sub: "A small kitchen in Bundelkhand, four traditional fruit powders, and one stubborn belief: that the way our grandmothers made food is still the right way."

### The Banda story
H2 "The Banda story" — image `lifestyle/village-2.webp`:
> "Banda sits in the Bundelkhand region of Uttar Pradesh — a quiet, sun-baked
> stretch of country where the soil is generous to fruit trees and the kitchens
> still remember recipes that have been around for centuries."
>
> "This is where the *kaitha* (wood apple), the *birchun* (Indian jujube), and
> many of the spices in our buknu blend grow naturally — not in industrial
> plantations, but in family orchards and roadside trees that have been part of
> Bundelkhand life for as long as anyone can remember."
>
> "For us, \"made in Banda\" isn't a marketing line. It's where we live, where
> our farmers live, and where every jar you receive is dried, ground, and
> packed."

### Why we started RMKAAV
Full text reproduced in §2 above.

### How we make it
H2 "How we make it" / Sub "Three steps, the way our grandmothers would have done it." — Sourcing, Sun-drying, Stone-grinding & packing (full text matches §2's 4-step homepage process, condensed to 3 steps here — see product images `hands-fruit-1.webp`, `sun-drying-1.webp`, `grinding-1.webp`).

### Our farmers
H2 "Our farmers":
> "We work directly with a small group of farmers in Banda district. Where
> they're willing, we'd love to introduce them by name and photo on this page —
> they're the start of every jar of Banda Delights."

*(Note: this section is explicitly open — no farmers are named yet; a natural
place to add names/photos/quotes in future.)*

### What we promise
H2 "What we promise" / Sub "Six simple promises. We keep them." — the six promises, full text in §2 above.

### Company facts
H3 "Company facts":
- Registered as: RMKAAV Ventures Private Limited
- Brand: Banda Delights
- Founders: Vishnukant Tiwari, Madhuri Tiwari
- Office: Chamraudi Chauraha, Kalu Kuwan Road, Banda City, Banda, UP — 210001
- FSSAI License: 22725829000116
- GSTIN: 09AAMCR8337A2Z6

### Final CTA
H2 "Try our range" — "Explore our products →" (→ `/index.html#our-range`)

---

## 7. Contact Page Content (contact.html)

**SEO:** Title: "Contact RMKAAV Foods — Reach us in Banda | Banda Delights". Meta description: "Talk to us — WhatsApp, phone, email, or send a message. We answer every query personally, usually within a day. Office in Banda, Uttar Pradesh."

### Hero
- H1: "Questions? We answer personally."
- Sub: "Usually within a day. Sometimes within an hour, if Madhuri has tea in hand."

### Contact methods
| Method | Detail | Link |
|---|---|---|
| WhatsApp | +91 70689 46333 — "Fastest way to reach us. Tap to chat." | `https://wa.me/917068946333?text=Hi%20RMKAAV%2C%20I%20have%20a%20question` |
| Phone | +91 70689 46444 — "Call us during business hours." | `tel:+917068946444` |
| Email | info@rmkaavfoods.com — "For longer enquiries or wholesale." | `mailto:info@rmkaavfoods.com` |
| Office | Chamraudi Chauraha, Kalu Kuwan Road, Banda City, Banda, Uttar Pradesh — 210001 | — |

Business-hours note: "WhatsApp is the fastest way to reach us — we reply within one working day." (no fixed clock-hours published)

### Embedded map
Google Maps embed keyed to the address text (not fixed lat/long): query
`Chamraudi Chauraha Kalu Kuwan Road Banda City Uttar Pradesh 210001`. iframe title: "RMKAAV Foods office in Banda, UP".

### Contact form
Heading "Send us a message" / Sub "Fill in the form and we'll respond within 1 working day."

| Field | Required | Notes |
|---|---|---|
| Name | Yes | text |
| Email | Yes | email |
| Phone | No | tel, optional |
| Subject | No | select: General question / Order issue / Wholesale enquiry / Press or media / Other |
| Message | Yes | textarea, placeholder "Tell us how we can help." |

Submit button: "Send message". Consent note: "By sending this message, you agree to our Privacy Policy. We don't share your details with anyone."

### Wholesale & bulk orders
Heading "Wholesale & bulk orders" — "Buying in larger quantities for a store, gifting, or corporate hampers? Reach Vishnukant directly:" → button "Email for wholesale" (`mailto:info@rmkaavfoods.com?subject=Wholesale%20enquiry`)

---

## 8. Blog (blog/index.html)

**Status: no posts published yet — placeholder "coming soon" page.** The page
carries `<meta name="robots" content="noindex, follow">` with a developer note to
remove it once real posts exist.

**SEO:** Title: "Our Journal — Recipes, traditions, and stories from Banda | RMKAAV Foods". Meta description: "Coming soon: recipes, traditional uses, and stories from our Banda kitchen. Subscribe to our newsletter to know when the journal goes live."

- H1: "Our journal"
- Sub: "Recipes, traditional uses, and stories from our Banda kitchen."
- H2 "Coming soon": "We're putting our first few stories together — recipes our grandmothers cooked, the history of the fruits we grow up with, and what happens between a tree in Banda and a jar in your kitchen." / "Subscribe to our newsletter on the homepage to know when the first post goes live."
- CTA: "Browse our products" (→ `/index.html#our-range`)

**Planned topics** (H4 "What you can expect" — not live posts, just a roadmap):
- My grandmother's birchun-water — the Banda summer cooler recipe
- Wood apple in Indian kitchens: a 1,500-year story
- Why we still grind on stone (and why it matters)
- Five ways to add Birchun Powder to your day
- Meet the farmers behind your jar

---

## 9. Legal Policy Pages (full text)

All five policy pages carry the same "Last updated: 20 July 2026" date stamp.

### 9.1 Privacy Policy (`/policies/privacy.html`)

This Privacy Policy describes how **RMKAAV Ventures Private Limited** ("RMKAAV",
"we", "us", "our"), a company incorporated under the Companies Act, 2013, with
its registered office at Chamraudi Chauraha, Kalu Kuwan Road, Banda City, Banda,
Uttar Pradesh, 210001, collects, uses, shares, and protects your personal
information when you visit or make a purchase through **rmkaavfoods.com** (the
"Website").

By using the Website, you agree to the practices described in this Policy. We
follow the Digital Personal Data Protection Act, 2023 ("DPDP Act"), the
Information Technology Act, 2000, and the Information Technology (Reasonable
Security Practices and Procedures and Sensitive Personal Data or Information)
Rules, 2011.

**1. Information we collect**
- *(a) Provided directly:* name, email, phone, shipping address (via payment partner Razorpay at checkout); email (newsletter signup); name/email/phone/message (contact form).
- *(b) Collected automatically:* IP address, browser/device/OS type, referring page, approximate city/state-level location (via standard analytics); cookies and similar technologies.
- We do not knowingly collect information from individuals under 18.

**2. How we use your information** — process/fulfil orders; arrange shipping via courier partners; send order confirmations/shipping updates/customer service comms; respond to enquiries; send marketing (newsletter) only if opted in; improve the Website/products; comply with legal obligations (taxation, consumer protection).

**3. Sharing your information** — shared only with: **Razorpay** (payments); **courier partners** (Shiprocket/Delhivery/India Post as applicable — receive name/address/phone); **email service providers** (Brevo/Mailchimp as applicable); **analytics providers** (Google Analytics or similar, anonymised/aggregated); **government authorities/law enforcement** when legally required. We do not sell personal information to third parties.

**4. Cookies** — used to remember preferences, analyse usage in aggregate, enable basic functionality. Controllable via browser settings; disabling may affect functionality.

**5. Data retention** — order data: 7 years (taxation/audit); newsletter data: until unsubscribe; contact form submissions: 2 years.

**6. Your rights (under DPDP Act, 2023)** — access, correction, erasure (subject to legal retention), withdraw consent, lodge a grievance, nominate another person to exercise rights on your behalf in case of death/incapacity. Exercise via info@rmkaavfoods.com, subject line "Data Request".

**7. Security** — HTTPS encryption, secure Razorpay processing, access controls; no internet transmission method is 100% secure.

**8. Grievance officer** — Vishnukant Tiwari, Director, RMKAAV Ventures Private Limited, info@rmkaavfoods.com, Chamraudi Chauraha, Kalu Kuwan Road, Banda City, Banda, Uttar Pradesh, 210001. Acknowledgement target: 48 hours; resolution target: 30 days.

**9. Changes to this policy** — "Last updated" date reflects most recent revision; material changes communicated via a Website notice.

**10. Contact** — info@rmkaavfoods.com or +91 70689 46333.

---

### 9.2 Terms and Conditions (`/policies/terms.html`)

These Terms govern access to/use of **rmkaavfoods.com**, operated by **RMKAAV
Ventures Private Limited**, registered office Chamraudi Chauraha, Kalu Kuwan
Road, Banda City, Banda, Uttar Pradesh, 210001. Using the Website or placing an
order = agreement to these Terms.

**1. Eligibility** — must be 18+, or under parent/guardian supervision.

**2. About our products** — traditional Indian fruit-based food products under the **Banda Delights** brand; not medicines/supplements; traditional-use statements not FSSAI-evaluated for medicinal claims; not intended to diagnose/treat/cure/prevent disease; consult doctor if pregnant/nursing/on medication/managing a condition.

**3. Pricing, taxes, currency** — INR, GST-inclusive unless stated; prices may change anytime without notice; confirmed orders unaffected by later price changes.

**4. Orders and acceptance** — order = an offer; accepted only upon order-confirmation email after successful payment; RMKAAV may refuse/cancel orders (pricing/info errors, inventory unavailability, suspected fraud, Terms violation) with full refund if already paid.

**5. Payment** — processed via **Razorpay**; accepted methods per Razorpay (cards, UPI, net banking, wallets); Razorpay's own terms govern the gateway itself, RMKAAV not responsible for gateway-specific issues.

**6. Shipping and delivery** — governed by Shipping Policy; timelines are estimates, not guarantees.

**7. Cancellations, returns, refunds** — governed by Cancellation Policy and Refund Policy respectively.

**8. Intellectual property** — all Website content (text, images, logos, graphics, "Banda Delights" brand) belongs to RMKAAV or licensors, protected under Indian/international IP law; no reproduction/distribution/derivative works without written permission.

**9. User conduct** — no unlawful/fraudulent/harmful activity; no interfering with security/functionality; no false/misleading info; no IP infringement; no non-customer commercial use.

**10. Disclaimers** — Website/products provided "as is"/"as available" beyond required Indian consumer-protection warranties; product images representative (natural/handmade variation expected); no guaranteed health outcomes.

**11. Limitation of liability** — total liability capped at the amount paid for the specific order; no liability for indirect/incidental/consequential/punitive damages; carve-outs for death/personal injury from negligence, fraud, or anything non-excludable under Indian law (incl. Consumer Protection Act, 2019).

**12. Indemnification** — customer indemnifies RMKAAV (and directors/employees/agents) against claims from Terms breach or Website misuse.

**13. Governing law and jurisdiction** — laws of India; exclusive jurisdiction: courts at **Banda, Uttar Pradesh**.

**14. Dispute resolution** — must first attempt resolution by writing to info@rmkaavfoods.com before legal action; RMKAAV responds within 14 days, good-faith resolution attempted.

**15. Changes to these Terms** — "Last updated" date reflects latest revision; continued use after changes = acceptance.

**16. Contact** — info@rmkaavfoods.com or +91 70689 46333.

---

### 9.3 Shipping Policy (`/policies/shipping.html`)

**1. Where we ship** — all serviceable Indian PIN codes; no international shipping currently.

**2. Order processing time** — confirmed orders typically dispatched within 1–2 working days (next working day if after cut-off/weekend/holiday); up to 3 working days in high-demand/batch-production cases, with email notification if delayed further.

**3. Courier partners** — registered courier or India Post depending on destination; tracking link sent by email/SMS on dispatch.

**4. Estimated delivery times (after dispatch):**

| Destination | Estimate |
|---|---|
| Metro cities (Delhi, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad, Pune, Ahmedabad) | 2–4 working days |
| Other major cities / tier-2 towns | 4–6 working days |
| Smaller towns, rural, remote PIN codes | 6–10 working days |
| North-East states, J&K, Ladakh, Andaman & Nicobar | 8–14 working days |

Estimates only — weather/festivals/lockdowns/operational delays may vary actual delivery.

**5. Shipping charges** — *(page currently carries a developer TODO: "once the free-delivery threshold and flat rate are decided, restore the rate table here and surface the threshold on the product pages — it lifts average order value.")* Current text: charge calculated from delivery PIN + order size, confirmed via WhatsApp before payment — "never a surprise cost."

**6. Tracking** — email + SMS tracking link on dispatch; or email info@rmkaavfoods.com with order number.

**7. Damaged or missing items** — inspect at delivery; refuse if visibly tampered, or accept and notify within **48 hours** with photos to info@rmkaavfoods.com; missing items also reported within 48 hours. Resolved per Refund Policy.

**8. Failed delivery / RTO** — if returned to origin (wrong address, repeated unavailability, refusal), RMKAAV will offer: re-ship at customer's cost, or refund minus original shipping + re-stocking fee where applicable.

**9. International shipping** — not currently offered; newsletter signup for future updates.

**10. Contact** — info@rmkaavfoods.com or +91 70689 46333.

---

### 9.4 Return and Refund Policy (`/policies/refund.html`)

**1. Our approach** — no returns on opened/used jars (hygiene/food-safety); issues made right if order arrives damaged/defective/incorrect.

**2. Eligible returns** — damaged in transit (broken seal/leaking/broken packaging); wrong product/quantity; defective or expired on arrival. Must report within **48 hours of delivery** to info@rmkaavfoods.com with order number, photos, and description. Response within 2 working days.

**3. What's not accepted** — opened jars; sale/promotional items (unless damaged/defective); requests after 48 hours; taste-preference returns; post-delivery mishandling damage.

**4. Resolution** — customer's choice of replacement (free reship) or refund (full amount to original payment method).

**5. Refund process** — processed within 2 working days of acceptance; appears in account within 7–10 working days depending on bank/method; only to original payment method.

**6. Contact** — info@rmkaavfoods.com or +91 70689 46333 (WhatsApp).

---

### 9.5 Cancellation Policy (`/policies/cancellation.html`)

**1. Cancelling before dispatch** — cancel anytime pre-dispatch via email or WhatsApp with order number; full refund within 7–10 working days.

**2. Cancelling after dispatch** — not possible once dispatched/tracking issued; options: refuse delivery, or accept and follow Refund Policy (opened items non-returnable). If a dispatched order is refused, refund = order amount minus original shipping cost and any return-shipping cost charged by the courier.

**3. Cancellations initiated by RMKAAV** — may occur for: inventory/batch-production unavailability; non-serviceable PIN code; suspected fraud; pricing/info error. Full refund within 7–10 working days + email notification.

**4. Contact** — info@rmkaavfoods.com or +91 70689 46333.

---

## 10. Cart & Account Pages (functional content)

These pages are primarily functional (JavaScript-driven cart/checkout/auth), with
minimal unique marketing copy. Noted here for completeness.

### Cart (`/cart.html`)
- H1: "Your Cart"
- Empty state: "Your cart is empty." + "Browse Products" button (→ `/index.html#our-range`)
- Section headings: "Items", "Delivery details", "Order summary"
- Trust line in summary: "🔒 Secure checkout · 🚚 Dispatched in 1–2 working days"
- Payment-in-progress state: "Confirming your payment…"
- Order confirmation: H2 "Order received"; "Ref: [ref] · Total: [total]"; "One last step — tap below to send us your order on WhatsApp with your full delivery details. Keep your Ref handy." + "Send order on WhatsApp" button.
- Post-order 3-step explainer: "Confirm on WhatsApp" (send pre-filled message, RMKAAV confirms availability/payment) → "We pack your order" (dispatched within 1–2 working days from Banda) → "Tracking shared" (SMS/email once shipped).

### Account (`/account.html`)
- H1: "My Account"
- Sub: "Log in or create an account to check out and save your delivery details."
- Password hint: "At least 8 characters."
- Profile section: H2 "Your details" — "Saved here so checkout fills in automatically next time."
- Phone field placeholder example: "98765 43210"

---

## 11. Global/Shared Elements

These appear identically on every page (header, footer, floating WhatsApp button).

### Header navigation
- Logo → `/index.html` (alt text "RMKAAV Foods")
- Nav links: Home · Products (dropdown: Birchun Powder, Kaitha Powder, Kaitha Guda, Kaitha Buknu Powder) · About · Blog · Contact
- WhatsApp icon link (general enquiry)
- "Shop on Amazon ↗" button (brand storefront)
- Account icon → `/account.html`
- Cart icon → `/cart.html` (with item-count badge)

### Footer (5 columns)
1. **Brand:** "RMKAAV Foods" / "Made by hand, in Banda. Made for India."
2. **Shop:** Birchun Powder, Kaitha Powder, Kaitha Guda, Kaitha Buknu Powder, "Shop on Amazon ↗"
3. **Company:** About, Our Journal, Contact
4. **Policies:** Privacy Policy, Terms & Conditions, Shipping Policy, Return & Refund, Cancellation
5. **Reach us:** RMKAAV Ventures Private Limited; full address; FSSAI Lic; GSTIN; phone; email

**Bottom bar:** "© 2026 RMKAAV Ventures Private Limited. All rights reserved. · Made with care in Banda, Uttar Pradesh."

### Floating WhatsApp button
Present on every page, links to the same general-enquiry WhatsApp message as the header icon.

---

## 12. Image Asset Inventory

All images live under `src/assets/images/`. Formats: `.webp` (photos), `.svg`
(logo/placeholder), `.jpg` (one social-share image). No stock photography brand
watermarks or third-party logos present — all appear to be the business's own
product/lifestyle photography.

### Brand assets (`assets/images/brand/`)
| File | Size | Used for |
|---|---|---|
| `logo.svg` | 981 B | Site logo, every page header + favicon |
| `og-default.jpg` | 81 KB | Default social-share (Open Graph) image, 1200×630, used on homepage/about |

### Product photography (`assets/images/products/`) — 3 photos per product, 12 total
| Product | Files | Notes |
|---|---|---|
| Birchun Powder | `birchun-1.webp` (156 KB), `birchun-2.webp` (61 KB), `birchun-3.webp` (80 KB) | `-1` is the primary/hero shot used everywhere the product is referenced (grid, cross-sell, recipes); `-2`/`-3` are gallery/recipe-context shots |
| Kaitha Powder | `kaitha-powder-1.webp` (182 KB), `kaitha-powder-2.webp` (103 KB), `kaitha-powder-3.webp` (77 KB) | Same pattern |
| Kaitha Guda | `kaitha-guda-1.webp` (130 KB), `kaitha-guda-2.webp` (134 KB), `kaitha-guda-3.webp` (92 KB) | Same pattern |
| Kaitha Buknu Powder | `kaitha-buknu-1.webp` (112 KB), `kaitha-buknu-2.webp` (106 KB), `kaitha-buknu-3.webp` (182 KB) | Same pattern |

### Lifestyle / process photography (`assets/images/lifestyle/`) — 20 files
| File | Size | Depicts | Currently used on |
|---|---|---|---|
| `hands-fruit-1.webp` | 148 KB | Hands holding fresh fruit from Banda orchards | Homepage (founders section, placeholder for founder portrait), About (sourcing step) |
| `village-1.webp` | 81 KB | A Banda village lane, quiet afternoon | Homepage (heritage section) |
| `village-2.webp` | 248 KB | Wide shot of the Banda landscape / "a Banda lane near our kitchen" | Homepage (heritage), About (Banda story) |
| `village-3.webp` | 141 KB | (unused currently — spare village shot) | *Not referenced in any page yet* |
| `jujube-tree.webp` | 473 KB | Indian jujube tree in fruit | Homepage (heritage trio), Birchun product page (story) |
| `jujube-fruit.webp` | 27 KB | (unused currently — spare single-fruit close-up) | *Not referenced in any page yet* |
| `jujube-fruits-stages.webp` | 55 KB | Hand-picked jujube at peak ripeness / family orchard | Homepage (process step 1), Birchun product page (origin) |
| `woodapple-tree.webp` | 303 KB | Wood apple tree / orchard | Homepage (heritage trio), Kaitha Powder page (origin), Kaitha Guda page (origin) |
| `woodapple-opened.webp` | 126 KB | A whole wood apple cracked open beside a bowl of powder | Kaitha Powder page (story) |
| `woodapple-whole.webp` | 299 KB | Chunks of dried wood apple pulp in a wooden bowl | Kaitha Guda page (story) |
| `sun-drying-1.webp` | 131 KB | Sun-drying trays of fruit in the open | Homepage (process step 2), About (sun-drying step) |
| `sun-drying-2.webp` | 480 KB | (unused currently — spare sun-drying shot) | *Not referenced in any page yet* |
| `sun-drying-3.webp` | 169 KB | (unused currently — spare sun-drying shot) | *Not referenced in any page yet* |
| `grinding-1.webp` | 262 KB | Stone-grinding the dried fruit | About (stone-grinding & packing step) |
| `grinding-2.webp` | 69 KB | Stone-grinding into powder / a small spoon of buknu beside a thali plate | Homepage (process step 3), Kaitha Buknu page (story) |
| `grinding-3.webp` | 301 KB | (unused currently — spare grinding shot) | *Not referenced in any page yet* |
| `spices-1.webp` | 281 KB | Hand-jarring small batches of finished powder | Homepage (process step 4) |
| `spices-2.webp` | 446 KB | Spices laid out for the Buknu blend | Kaitha Buknu page (ingredients/origin) |
| `spices-3.webp` | 284 KB | (unused currently — spare spice shot) | *Not referenced in any page yet* |
| `spices-4.webp` | 247 KB | (unused currently — spare spice shot) | *Not referenced in any page yet* |

**7 lifestyle photos are currently shot but unused** (`village-3`, `jujube-fruit`,
`sun-drying-2`, `sun-drying-3`, `grinding-3`, `spices-3`, `spices-4`) — good
candidates for future blog posts, new page sections, or a rebuild that wants more
visual variety without commissioning new photography.

### Other
| File | Size | Notes |
|---|---|---|
| `placeholder.svg` | 672 B | Generic fallback/placeholder graphic |

---

*End of knowledge base. This file captures content only — for the current visual
design system (colors, typography, CSS tokens), see `src/assets/css/main.css`,
which is intentionally out of scope for this document.*
