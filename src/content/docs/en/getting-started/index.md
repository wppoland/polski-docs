---
title: Polski for WooCommerce
description: A comprehensive WordPress plugin to adapt your WooCommerce store to Polish legal requirements and market standards. Compliance with Omnibus, GPSR, DSA, GDPR and other regulations.
template: splash
hero:
  tagline: A complete solution supporting online store operation in Poland. Legal tools, local features, Polish e-commerce standards - all in one plugin.
  actions:
    - text: Start configuration
      link: /en/getting-started/installation/
      icon: right-arrow
      variant: primary
    - text: GitHub
      link: https://github.com/wppoland/polski
      icon: external
      variant: minimal
---

## What is Polski for WooCommerce?

**Polski for WooCommerce** is a free open source plugin (GPLv2) created by [wppoland.com](https://wppoland.com) that adapts a WooCommerce store to Polish legal requirements and e-commerce standards. The plugin combines over 30 modules covering legal requirements, price display, checkout, food products, storefront modules and developer tools.

Current version: **1.3.2**

### System requirements

Before installation, make sure your server meets the minimum requirements:

| Requirement | Minimum version |
|-------------|-----------------|
| WordPress | 6.4 or newer |
| WooCommerce | 8.0 or newer |
| PHP | 8.1 or newer |
| MySQL | 5.7 or newer / MariaDB 10.3+ |

:::tip[Recommendation]
For the best performance we recommend PHP 8.2+ and WooCommerce 9.x. The plugin is regularly tested with the latest versions of WordPress and WooCommerce.
:::

---

## Module overview

The plugin is built modularly - you enable only the features you need. Below you will find a description of all available module groups.

### Legal requirements

Modules helping implement Polish and EU e-commerce requirements:

- **GPSR (General Product Safety Regulation)** - manufacturer, importer and responsible person data on product pages
- **Omnibus** - displaying the lowest price from 30 days before a discount, in accordance with the Omnibus Directive
- **Right of withdrawal** - return forms and procedures, withdrawal document generation
- **GDPR** - consent management, data anonymization, processing register
- **DSA (Digital Services Act)** - contact point, content reporting, transparency
- **KSeF** - preparation for integration with the Polish National e-Invoice System
- **Greenwashing** - verification and control of environmental claims
- **Legal pages** - generation of terms and conditions, privacy policy and return policy

### Prices and product information

Modules related to price display and product data:

- **Unit prices** - automatic calculation and display of unit prices (PLN/kg, PLN/l)
- **VAT display** - information about VAT rate and net/gross price
- **Delivery time** - estimated order fulfillment time on the product page
- **Manufacturer data** - manufacturer field, brand, catalog number

### Checkout and orders

Modules modifying the checkout page and order process:

- **Order button** - changing the button text to "Order with obligation to pay" (legal requirement)
- **Legal checkboxes** - configurable consents for terms and conditions, privacy policy, newsletter
- **NIP lookup** - automatic company data completion based on tax identification number (GUS API)
- **Double opt-in** - email address verification through double opt-in

### Food products

Specialized modules for food stores:

- **Food products overview** - dedicated fields for food products
- **Nutritional values** - nutrition facts table compliant with Regulation 1169/2011
- **Allergens** - highlighted allergens in product description (14 main allergens)
- **Nutri-Score** - displaying Nutri-Score labels (A-E)

### Storefront modules

Features improving the shopping experience:

- **Wishlist** - saving products for later
- **Compare** - comparing products side by side
- **Quick view** - product preview without leaving the category page
- **AJAX search** - real-time product search
- **AJAX filters** - dynamic product filtering without page reload
- **Product slider** - product carousels with configurable settings
- **Product badges** - labels such as "New", "Bestseller", "Last items"
- **Other modules** - additional storefront features

### Tools

Modules for easier store management:

- **Compliance dashboard** - overview of store legal requirements status in one place
- **Site audit** - automatic store configuration verification
- **Security incidents** - GDPR incident register and management
- **Verified reviews** - verified customer review system

### For developers

Tools and API for programmers:

- **REST API** - endpoints for managing plugin data
- **Hooks (actions and filters)** - over 100 hooks for extending functionality
- **Shortcodes** - ready-made shortcodes for embedding elements in content
- **Templates** - overriding plugin templates in the theme
- **WP-CLI** - CLI commands for managing the plugin from the terminal
- **CSV import** - bulk product data import
- **Gutenberg blocks** - dedicated editor blocks
- **Schema.org** - automatic structured data for products

---

## Quick start

Three steps to a working online store meeting Polish e-commerce requirements:

1. **[Install the plugin](/en/getting-started/installation/)** - from the WordPress dashboard or manually from a ZIP file
2. **[Configure the basics](/en/getting-started/configuration/)** - enable the modules you need in the settings panel
3. **[Go through the wizard](/en/getting-started/wizard/)** - fill in company data, generate legal pages, configure checkboxes

:::note[Need help?]
If you encounter a problem, report it on [GitHub Issues](https://github.com/wppoland/polski/issues). Have a question or suggestion? Write on [GitHub Discussions](https://github.com/wppoland/polski/discussions).
:::

---

## Why choose this plugin?

- **All in one** - instead of 10 plugins, one cohesive platform
- **Modular design** - enable only what you need
- **Legal tools** - updated with regulatory changes
- **Open source** - source code on GitHub, GPLv2 license
- **No subscription** - all features available for free
- **Performance** - minimal resources loaded only for active modules
- **Active community** - support on GitHub Discussions

---

## Compatibility

The plugin is tested with the most popular WordPress themes and plugins:

- Themes: Storefront, Astra, GeneratePress, Kadence, Flavor, flavor theme
- Page builders: Gutenberg (blocks), Elementor, Beaver Builder
- Payment plugins: Przelewy24, PayU, BLIK, tpay
- Shipping plugins: InPost, DPD, DHL, Poczta Polska, Orlen Paczka

---

## Support and community

- [GitHub Issues](https://github.com/wppoland/polski/issues) - bug reports and feature requests
- [GitHub Discussions](https://github.com/wppoland/polski/discussions) - questions, discussions, community help
- [wppoland.com](https://wppoland.com) - project website and blog with guides

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
