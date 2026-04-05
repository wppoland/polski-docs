---
title: Configuration wizard
description: Guide to the Polski for WooCommerce configuration wizard. Company data, legal pages, checkboxes and automatic store configuration step by step.
---

## What is the configuration wizard?

The configuration wizard is a tool that guides you through the most important plugin settings in a few simple steps. Instead of manually configuring each module, the wizard asks questions and automatically sets the appropriate options.

The wizard is available after the first plugin activation. You can also restart it at any time - go to **WooCommerce > Polski > Settings** and click the **Restart wizard** button.

:::note[The wizard does not overwrite existing data]
If you restart the wizard, fields will be pre-filled with previously saved data. The wizard will not delete or overwrite data that you do not change.
:::

---

## Step 1: Company data

The first step is filling in your basic company data. This data is used in many places - on legal pages, in the footer, in GPSR data and on invoices.

### Required fields

| Field | Description | Example |
|-------|-------------|---------|
| Company name | Full name or trading name | "Jan Kowalski Online Store" |
| Legal form | Type of business | Sole proprietorship, LLC, etc. |
| NIP | Tax Identification Number | 1234567890 |
| REGON | Statistical number | 123456789 |
| KRS | Court register number (if applicable) | 0000123456 |
| Address | Street, number, postal code, city | ul. Przykladowa 10, 00-001 Warsaw |
| Contact email | Correspondence address | contact@mystore.pl |
| Phone | Phone number | +48 123 456 789 |

### Optional fields

- **Bank account number** - for display on invoices and in terms and conditions
- **Registration authority** - e.g. "District Court for the Capital City of Warsaw"
- **Share capital** - required for companies (e.g. "5,000.00 PLN")
- **Representative name** - person authorized to represent the company

### NIP validation

The wizard automatically verifies the correctness of the NIP number:

- Checks the checksum (weighted algorithm)
- Optionally retrieves data from the GUS API (CEIDG/KRS) for comparison

If the NIP is invalid, you will see a warning message. You can continue, but we recommend correcting the number.

### Example configuration

For a sole proprietorship:

```
Company name: Jan Kowalski E-Commerce
Legal form: Sole proprietorship
NIP: 1234567890
REGON: 123456789
KRS: (empty - not applicable for sole proprietorship)
Address: ul. Handlowa 5/10, 31-001 Krakow
Email: store@kowalski-ecommerce.pl
Phone: +48 500 600 700
```

For a limited liability company:

```
Company name: SuperSklep sp. z o.o.
Legal form: Limited liability company
NIP: 9876543210
REGON: 987654321
KRS: 0000654321
Address: ul. Biznesowa 22, 00-100 Warsaw
Email: office@supersklep.pl
Phone: +48 22 123 45 67
Share capital: 50,000.00 PLN
Registration authority: District Court for the Capital City of Warsaw, 12th Commercial Division of KRS
```

Click **Next** to proceed to the next step.

---

## Step 2: Legal pages

In this step, the wizard will help you create the legally required pages. Every Polish online store should have at least:

- **Store terms and conditions** - rules for using the store and concluding contracts
- **Privacy policy** - information about personal data processing (GDPR)
- **Return policy** - withdrawal procedure and form

### Generating pages

The wizard offers two approaches:

**Option A - generate new pages (recommended for new stores)**

1. Select the pages you want to generate
2. The wizard will create WordPress pages with content filled in based on company data
3. Content is based on templates compliant with Polish law

**Option B - assign existing pages**

1. If you already have legal pages created, select them from the dropdown list
2. The wizard will assign them to the appropriate WooCommerce settings

### Legal page templates

Generated pages contain sections required by Polish law. Example terms and conditions structure:

```
1. General provisions
2. Definitions
3. Rules for using the store
4. Order placement procedure
5. Prices and payment methods
6. Delivery
7. Right of withdrawal from the contract
8. Complaints and warranty
9. Personal data
10. Final provisions
```

:::caution[Templates require customization]
Generated pages are a starting point, not a ready legal document. Review the content and customize it to your store's specifics. In case of doubt, consult the content with a lawyer specializing in e-commerce.
:::

### Shortcodes on legal pages

Generated pages use shortcodes that automatically insert company data:

```
[polski_company_name]        - company name
[polski_company_nip]         - NIP
[polski_company_regon]       - REGON
[polski_company_krs]         - KRS
[polski_company_address]     - company address
[polski_company_email]       - contact email
[polski_company_phone]       - phone
[polski_withdrawal_period]   - withdrawal period (default 14 days)
```

Thanks to shortcodes, when you change company data in plugin settings, legal pages will update automatically.

Example usage in terms and conditions content:

```
The owner of the online store is [polski_company_name],
NIP: [polski_company_nip], REGON: [polski_company_regon],
with registered address: [polski_company_address].

Contact: [polski_company_email], tel. [polski_company_phone].
```

Result on the page:

```
The owner of the online store is Jan Kowalski E-Commerce,
NIP: 1234567890, REGON: 123456789,
with registered address: ul. Handlowa 5/10, 31-001 Krakow.

Contact: store@kowalski-ecommerce.pl, tel. +48 500 600 700.
```

Click **Next** to proceed to checkbox configuration.

---

## Step 3: Checkboxes on the checkout page

In this step you will configure mandatory checkboxes displayed on the checkout page. Polish law requires the customer to consent to the terms and conditions before placing an order.

### Default checkboxes

The wizard proposes a set of checkboxes matching typical requirements:

**Checkbox 1 - terms and conditions (mandatory)**

```
Content: I have read and accept the [store terms and conditions].
Required: Yes
Link: /terms/
Position: Before order button
```

**Checkbox 2 - privacy policy (mandatory)**

```
Content: I have read the [privacy policy].
Required: Yes
Link: /privacy-policy/
Position: Before order button
```

**Checkbox 3 - right of withdrawal (mandatory)**

```
Content: I have read the [information about the right of withdrawal]
         and the [withdrawal form template].
Required: Yes
Link: /return-policy/
Position: Before order button
```

**Checkbox 4 - newsletter (optional)**

```
Content: I want to receive information about new products and promotions
       to the provided email address.
Required: No
Position: After mandatory checkboxes
```

### Editing checkboxes

You can customize each checkbox:

- **Content** - text displayed next to the checkbox (supports HTML for links)
- **Required** - whether checking is necessary to place an order
- **Position** - where on the checkout page to display the checkbox
- **Error message** - text displayed when the customer does not check a required checkbox

### Adding custom checkboxes

Click **Add checkbox** to create an additional one. Useful scenarios:

- Consent to data processing for marketing purposes
- Declaration of being 18 years or older (alcohol stores)
- Consent to phone contact
- Confirmation of reading the product card (food products)

### Checkbox positions

Available positions on the checkout page:

| Position | Description |
|----------|-------------|
| `before_order_button` | Before the "Order with obligation to pay" button |
| `after_order_button` | After the order button |
| `after_billing_form` | After the billing data form |
| `after_shipping_form` | After the shipping data form |
| `before_payment_methods` | Before payment method selection |

Click **Next** to proceed to the summary.

---

## Step 4: Module activation

Based on your answers, the wizard will propose a list of modules to activate:

### Recommended modules (automatically selected)

- Omnibus - price history tracking
- Order button - text compliant with law
- Legal checkboxes - configured in the previous step
- Legal pages - generated in step 2
- Right of withdrawal - form and information
- Delivery time - information on product page
- GPSR - product safety data

### Optional modules (to select manually)

- NIP lookup - if you sell to businesses (B2B)
- Nutritional values - if you sell food
- Allergens - if you sell food
- Wishlist - if you want this feature in the store
- Compare - if you have products to compare
- DSA - if you run a marketplace

Select the modules you want to enable and click **Next**.

---

## Step 5: Summary and apply

The final step displays a summary of all settings:

```
Company data:
  Name: Jan Kowalski E-Commerce
  NIP: 1234567890
  Address: ul. Handlowa 5/10, 31-001 Krakow

Legal pages:
  Terms and conditions: Will be created (new page)
  Privacy policy: Will be created (new page)
  Return policy: Will be created (new page)

Checkboxes: 4 (3 mandatory, 1 optional)

Modules to activate: 7
  - Omnibus
  - Order button
  - Legal checkboxes
  - Legal pages
  - Right of withdrawal
  - Delivery time
  - GPSR
```

Review the summary and click **Apply configuration**. The wizard will:

1. Save company data in plugin settings
2. Create legal pages (if generation was selected)
3. Assign pages to WooCommerce settings
4. Configure checkboxes on the checkout page
5. Activate selected modules

After completion, you will see a confirmation message and a link to the compliance dashboard.

---

## After completing the wizard

### Check the product page

Open any product in your store and check if new elements appeared:

- Lowest price information (Omnibus) - visible on products with a discount
- Estimated delivery time
- GPSR data (manufacturer, responsible person)

### Check the checkout page

Add a product to the cart and go to checkout:

- Check that checkboxes display correctly
- Check that the button has the text "Zamawiam z obowiazkiem zaplaty"
- Try placing an order without checking checkboxes - an error message should appear

### Check legal pages

Open the generated pages and check their content:

- Whether company data is correct (shortcodes should display current data)
- Whether the document structure is complete
- Whether internal links work

### Compliance dashboard

Go to **WooCommerce > Polski > Compliance** - after correct configuration, most indicators should be green. Elements requiring additional attention will be marked with yellow status with instructions on what needs to be completed.

---

## Restarting the wizard

The wizard can be restarted at any time:

1. Go to **WooCommerce > Polski > Settings**
2. Click **Restart wizard**
3. Fields will be pre-filled with previously saved data
4. Change what you need and click **Apply configuration**

The wizard will not delete legal pages or reset modules you have already configured manually.

---

## Troubleshooting

### Legal pages were not created

- Check that your WordPress account has administrator permissions
- Check that in **Settings > Permalinks** a format other than "Plain" is set
- Try creating pages manually and assigning them in **WooCommerce > Settings > Advanced > Page setup**

### Checkboxes do not display on the checkout

- Make sure the "Legal checkboxes" module is active in **WooCommerce > Polski > Modules**
- If you use a custom checkout template, check that it supports WooCommerce hooks
- Clear the cache of caching plugins (WP Super Cache, W3 Total Cache, LiteSpeed Cache)

### The wizard does not launch

- Clear browser cache and try again
- Check the browser console (F12) for JavaScript errors
- Temporarily deactivate other plugins that may cause conflicts

If the problem persists, report it on [GitHub Issues](https://github.com/wppoland/polski/issues) with a description of the problem and a screenshot. The community will be happy to help on [GitHub Discussions](https://github.com/wppoland/polski/discussions).

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
