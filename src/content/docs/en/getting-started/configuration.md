---
title: Plugin configuration
description: First steps after installing the Polski for WooCommerce plugin. Enabling modules, compliance dashboard, settings overview and customizing for your store.
---

## Plugin main dashboard

After installing and activating the plugin, go to **WooCommerce > Polski** in the admin panel menu. You will see the main dashboard divided into several sections:

- **Compliance status** - quick overview of which legal requirements are met
- **Active modules** - list of enabled modules with links to their settings
- **Required actions** - notifications about missing configurations
- **Quick links** - shortcuts to the most important settings

:::tip[Configuration wizard]
If you are just getting started, we recommend using the [configuration wizard](/en/getting-started/wizard/), which guides you through the most important settings step by step. The wizard can be restarted at any time from the dashboard.
:::

---

## Enabling and disabling modules

The plugin works modularly - by default no module is active after installation. This ensures the plugin does not affect store performance until you enable specific features.

### How to enable a module

1. Go to **WooCommerce > Polski > Modules**
2. Find the module you are interested in on the list
3. Click the toggle next to the module name to enable it
4. Click **Save changes** at the bottom of the page

### How to disable a module

The procedure is identical - click the toggle on an active module to disable it. Disabling a module does not delete saved data, so you can re-enable it without losing configuration.

### Recommended modules for getting started

For a typical Polish online store, we recommend enabling the following modules as a minimum:

| Module | Why it is important |
|--------|-------------------|
| Omnibus | Legally required - price history display |
| Order button | Legally required - "Order with obligation to pay" |
| Legal checkboxes | Legally required - consents when placing an order |
| Legal pages | Terms and conditions and privacy policy |
| Right of withdrawal | Legally required - withdrawal form and information |
| Delivery time | Recommended - estimated delivery time on product page |
| GPSR | Required from 13.12.2024 - product safety data |

---

## Compliance dashboard

The compliance dashboard is the central place where you check the legal status of your store. Go to **WooCommerce > Polski > Compliance** to see:

### Status indicators

Each legal requirement has one of three statuses:

- **Compliant** (green) - requirement is met, configuration is complete
- **Needs attention** (yellow) - module is enabled but some configuration is missing
- **Non-compliant** (red) - module is disabled or configuration is incomplete

### Checklist

The dashboard displays a checklist with specific steps to complete:

```
[x] Order button - text compliant with law
[x] Omnibus - price history display enabled
[ ] Terms and conditions - terms page not assigned
[ ] Privacy policy - page not assigned
[ ] GPSR - missing manufacturer data on 12 products
```

Click any checklist item to go directly to the relevant settings.

---

## Configuring individual module groups

### Legal compliance

Go to **WooCommerce > Polski > Legal Compliance** to configure:

**Omnibus (price directive)**

1. Enable the Omnibus module
2. Set the price tracking period (default 30 days)
3. Choose the display format for the lowest price
4. Save changes

The plugin will automatically start recording price history from the moment the module is activated.

**GPSR (product safety)**

1. Enable the GPSR module
2. Fill in the default manufacturer data in global settings
3. For individual products - edit data in the "GPSR" tab on the product edit page

**Legal pages**

1. Enable the legal pages module
2. Use the generator to create terms and conditions, privacy policy and return policy
3. Assign generated pages in **WooCommerce > Settings > Advanced > Page setup**

### Prices and product information

Go to **WooCommerce > Polski > Prices** to configure:

**Unit prices**

1. Enable the unit prices module
2. Choose the default unit of measurement (kg, l, m, pcs)
3. On the product page, fill in the "Base quantity" and "Unit of measurement" fields

Example configuration in the product editor:

```
Product price: 15.99 PLN
Base quantity: 500
Unit of measurement: g
Reference unit: kg

Result: 15.99 PLN / 500g (31.98 PLN/kg)
```

**Delivery time**

1. Enable the delivery time module
2. Set the default delivery time (e.g. "1-3 business days")
3. Optionally - set individual times for specific products

### Checkout and orders

Go to **WooCommerce > Polski > Checkout** to configure:

**Order button**

1. Enable the module
2. The default text is "Zamawiam z obowiazkiem zaplaty" (Order with obligation to pay)
3. You can customize the text, but it must meet the requirements of Article 17 of the Consumer Rights Act

**Legal checkboxes**

1. Enable the checkboxes module
2. Add required consents (terms and conditions, privacy policy)
3. Configure the content of each checkbox, including links to legal pages
4. Mark which checkboxes are mandatory

Example checkbox configuration:

```
Label: terms
Content: I have read the [terms and conditions] and accept their provisions.
Required: Yes
Link: /terms/
Position: Before order button
```

**NIP lookup**

1. Enable the NIP module
2. The NIP field will automatically appear on the checkout page
3. After entering a NIP and clicking "Check", company data will be automatically filled from the GUS database

### Food products

These modules are designed for stores selling food products. Go to **WooCommerce > Polski > Food**.

1. Enable the modules you need (nutritional values, allergens, Nutri-Score)
2. New tabs will appear on the product edit page for filling in data
3. Data will automatically display on the product page in the store

### Storefront modules

Go to **WooCommerce > Polski > Storefront** to enable additional features:

- Wishlist, compare, quick view - enable and customize appearance
- AJAX search - enable and configure the number of displayed results
- AJAX filters - enable and choose attributes for filtering
- Slider and badges - configure style and behavior

---

## Global settings

In the **WooCommerce > Polski > Settings** tab you will find global options:

### Company data

Fill in your basic company data:

- Company name
- NIP (Tax Identification Number)
- REGON
- Registered address
- Contact email address
- Phone number

This data is used by various modules (legal pages, GPSR, DSA).

### Performance

- **Resource loading** - CSS and JS loaded only on pages where they are needed
- **Cache** - the plugin uses WordPress Transients API for data caching
- **Minification** - front-end resources are minified

### Compatibility

If you use a custom theme or plugins that cause conflicts:

1. Go to **WooCommerce > Polski > Settings > Compatibility**
2. Enable compatibility mode for problematic modules
3. Adjust hook priorities if elements display in the wrong order

---

## Verifying configuration

After configuring modules, it is worth checking that everything works:

1. **Compliance dashboard** - go to **WooCommerce > Polski > Compliance** and check that all indicators are green
2. **Product page** - open any product in the store and check that new elements appear (Omnibus price, delivery time, GPSR data)
3. **Checkout page** - place a test order and check that checkboxes and the button are correct
4. **Legal pages** - open terms and conditions and privacy policy and check their content

You can also run an automatic audit: **WooCommerce > Polski > Tools > Site Audit**.

---

## Next steps

- [Configuration wizard](/en/getting-started/wizard/) - automatic configuration of the most important settings
- [Compliance dashboard](/en/tools/compliance-dashboard/) - monitoring legal compliance status
- [Site audit](/en/tools/site-audit/) - automatic configuration verification

Have a question? Write on [GitHub Discussions](https://github.com/wppoland/polski/discussions). Found a bug? Report it on [GitHub Issues](https://github.com/wppoland/polski/issues).

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
