/* ============================================================
   RMKAAV Foods — shared store configuration
   ============================================================

   Single source of truth for product prices and store-wide order
   settings. Both the browser (cart, Buy Now buttons) and, from Phase 4
   onward, server-side order pricing read from this one file — so a
   price only ever needs to change in one place.

   WHEN YOUR RAZORPAY ACCOUNT IS READY:
   Paste each product's Razorpay Payment Page URL into `razorpayUrl`
   below. That is the whole job — every single-item "Buy Now" button
   picks it up automatically. While a razorpayUrl is empty (''), that
   product's Buy Now button falls back to a WhatsApp order instead.
   ============================================================ */
(function () {
  'use strict';

  var PRODUCTS = {
    'birchun': {
      name: 'Birchun Powder',
      weight: '50g',
      price: 249,
      image: '/assets/images/products/birchun-1.webp',
      url: '/products/birchun-powder.html',
      razorpayUrl: ''
    },
    'kaitha-powder': {
      name: 'Kaitha Powder',
      weight: '50g',
      price: 249,
      image: '/assets/images/products/kaitha-powder-1.webp',
      url: '/products/kaitha-powder.html',
      razorpayUrl: ''
    },
    'kaitha-guda': {
      name: 'Kaitha Guda',
      weight: '250g',
      price: 399,
      image: '/assets/images/products/kaitha-guda-1.webp',
      url: '/products/kaitha-guda.html',
      razorpayUrl: ''
    },
    'kaitha-buknu': {
      name: 'Kaitha Buknu Powder',
      weight: '',        // TODO: net weight not yet confirmed by RMKAAV
      price: 269,
      image: '/assets/images/products/kaitha-buknu-1.webp',
      url: '/products/kaitha-buknu-powder.html',
      razorpayUrl: ''
    }
  };

  var WHATSAPP_NUMBER = '917068946333';
  var SHIPPING_FLAT_FEE = 59; // ₹, added to every cart order

  var STORE_CONFIG = {
    PRODUCTS: PRODUCTS,
    WHATSAPP_NUMBER: WHATSAPP_NUMBER,
    SHIPPING_FLAT_FEE: SHIPPING_FLAT_FEE
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = STORE_CONFIG;
  }
  if (typeof window !== 'undefined') {
    window.RMKAAV_PRODUCTS = PRODUCTS;
    window.RMKAAV_WHATSAPP_NUMBER = WHATSAPP_NUMBER;
    window.RMKAAV_SHIPPING_FLAT_FEE = SHIPPING_FLAT_FEE;
  }
})();
