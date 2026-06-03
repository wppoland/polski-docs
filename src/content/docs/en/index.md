---
title: Polski for WooCommerce
description: A comprehensive WordPress plugin for adapting a WooCommerce store to Polish legal requirements and market expectations.
template: splash
hero:
  tagline: A complete solution that supports running an online store in Poland. Legal requirements, local features, Polish e-commerce standards, in FREE and PRO editions.
  actions:
    - text: Start with FREE
      link: /getting-started/installation/
      icon: right-arrow
      variant: primary
    - text: Discover PRO
      link: /pro/overview/
      icon: star
      variant: secondary
    - text: GitHub
      link: https://github.com/wppoland/polski
      icon: external
      variant: minimal
---

![Polski for WooCommerce - plugin banner](../../../assets/screenshots/banner-772x250.png)

## Two editions, one solution

Polski for WooCommerce is a modular platform created by [wppoland.com](https://wppoland.com) that adapts a WooCommerce store to Polish market requirements. Available in two variants:

| | FREE | PRO |
|---|---|---|
| License | GPLv2 (open source) | Commercial license |
| Price | Free | [wppoland.com/pl/polski-pro](https://wppoland.com/pl/polski-pro/) |
| Legal requirements | GPSR, Omnibus, GDPR, DSA, KSeF, and more | Everything from FREE |
| Prices and products | Unit price, VAT, delivery time | Everything from FREE |
| Checkout | Order button, checkboxes, NIP | + multi-step cart |
| Store modules | Wishlist, comparison, filters, slider | Everything from FREE |
| Invoices | - | VAT invoice, corrective invoice, receipt, goods issue note |
| KSeF | Preparation | + full API integration |
| Sales | - | Gift cards, subscriptions, affiliation, pre-orders, bundling |
| B2B | - | Catalog mode, requests for quotation |
| Integrations | - | InPost, wFirma, Fakturownia, iFirma |
| Consents | Checkboxes + logging | + versioning, audit trail, re-consent |
| Support | GitHub Issues | Priority |

### System requirements

| Requirement | Minimum version |
|---|---|
| WordPress | 6.4+ |
| WooCommerce | 8.0+ |
| PHP | 8.1+ |
| MySQL | 5.7+ / MariaDB 10.3+ |

:::tip[Recommendation]
For the best performance we recommend PHP 8.2+ and WooCommerce 9.x.
:::

---

## FREE - the free open source edition

Current version: **1.3.2** | License: GPLv2 | [GitHub](https://github.com/wppoland/polski)

![Polski for WooCommerce modules dashboard](../../../assets/screenshots/screenshot-1-modules-dashboard.png)

### Legal requirements

- **[GPSR](/compliance/gpsr/)** - manufacturer, importer, and responsible person data
- **[Omnibus](/compliance/omnibus/)** - lowest price from the 30 days before a reduction
- **[Right of withdrawal](/compliance/withdrawal/)** - return forms and procedures
- **[GDPR](/compliance/gdpr/)** - consent management, consent logging
- **[DSA](/compliance/dsa/)** - point of contact, content reporting
- **[KSeF](/compliance/ksef/)** - preparation for integration with e-Invoicing
- **[Greenwashing](/compliance/greenwashing/)** - control of environmental claims
- **[Legal pages](/compliance/legal-pages/)** - generating terms of service, privacy policy

### Prices and product information

- **[Unit prices](/prices/unit-prices/)** - PLN/kg, PLN/l, PLN/m
- **[VAT display](/prices/vat-display/)** - VAT rate, net/gross
- **[Delivery time](/prices/delivery-time/)** - estimated time on the product page
- **[Manufacturer data](/prices/manufacturer/)** - manufacturer, brand, GTIN/EAN

### Checkout and orders

- **[Order button](/checkout/checkout-button/)** - "Order with an obligation to pay"
- **[Legal checkboxes](/checkout/legal-checkboxes/)** - configurable consents
- **[NIP lookup](/checkout/nip-lookup/)** - auto-fill from the GUS API
- **[Double opt-in](/checkout/double-opt-in/)** - email verification

### Food products

- **[Nutritional values](/food/nutrients/)** - table according to regulation 1169/2011
- **[Allergens](/food/allergens/)** - 14 main allergens
- **[Nutri-Score](/food/nutri-score/)** - A-E labeling

### Store modules

- **[Wishlist](/storefront/wishlist/)**, **[Comparison](/storefront/compare/)**, **[Quick view](/storefront/quick-view/)**
- **[AJAX search](/storefront/ajax-search/)**, **[AJAX filters](/storefront/ajax-filters/)**
- **[Product slider](/storefront/product-slider/)**, **[Badges](/storefront/badges/)**

### Tools and API

- **[Compliance dashboard](/tools/compliance-dashboard/)**, **[Store audit](/tools/site-audit/)**
- **[REST API](/developer/rest-api/)**, **[Hooks](/developer/hooks/)**, **[Shortcodes](/developer/shortcodes/)**
- **[WP-CLI](/developer/wp-cli/)**, **[CSV import](/developer/csv-import/)**, **[Gutenberg blocks](/developer/blocks/)**

---

## PRO - the extended edition

Current version: **1.1.0** | Requires: Polski FREE 1.3.0+ | [Buy on wppoland.com](https://wppoland.com/pl/polski-pro/)

:::note[PRO extends FREE]
The PRO edition is a separate plugin installed alongside the free version. All FREE modules remain available, PRO adds new features.
:::

### Invoices and finance

- **[Invoice system](/pro/invoices/)** - VAT invoice, corrective invoice, receipt, goods issue note with PDF generation
- **[KSeF integration](/pro/ksef/)** - electronic sending of invoices to the tax office
- **[Accounting integrations](/pro/accounting/)** - wFirma, Fakturownia, iFirma

### Checkout and consents

- **[Multi-step cart](/pro/multistep-checkout/)** - Address -> Shipping -> Payment -> Review
- **[Consent management](/pro/consent-management/)** - versioning, audit trail, GDPR export

### Sales and marketing

- **[Gift cards](/pro/gift-cards/)** - purchase, redemption, balance tracking
- **[Subscriptions](/pro/subscriptions/)** - recurring purchases with renewals
- **[Affiliate program](/pro/affiliates/)** - referral links, commissions
- **[Requests for quotation](/pro/quotes/)** - RFQ instead of a cart
- **[Pre-orders](/pro/preorders/)** - reservations with a release date
- **[Bundles and add-ons](/pro/bundles-addons/)** - bundling, add-ons, FBT
- **[Catalog mode](/pro/catalog-mode/)** - B2B without prices

### Integrations

- **[InPost (Parcel Lockers)](/pro/shipping-inpost/)** - ShipX API, parcel locker map, labels

### PRO API

- **[PRO REST API](/pro/pro-api/)** - endpoints for invoices, KSeF, settings

---

## Quick start

1. **[Install the plugin](/getting-started/installation/)** - from the WordPress panel or from a ZIP file
2. **[Configure modules](/getting-started/configuration/)** - enable the features you need
3. **[Run the wizard](/getting-started/wizard/)** - company data, legal pages, checkboxes

:::note[Need help?]
[GitHub Issues](https://github.com/wppoland/polski/issues) - reporting bugs | [GitHub Discussions](https://github.com/wppoland/polski/discussions) - questions and discussions
:::

---

## Compatibility

- Themes: Storefront, Astra, GeneratePress, Kadence, flavor theme
- Page builders: Gutenberg, Elementor, Beaver Builder
- Payments: Przelewy24, PayU, BLIK, tpay
- Shipping: InPost, DPD, DHL, Poczta Polska, Orlen Paczka

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
