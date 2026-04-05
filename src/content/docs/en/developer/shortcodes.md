---
title: Shortcodes
description: Complete list of 23 Polski for WooCommerce shortcodes with parameters, usage examples and PHP code.
---

Polski for WooCommerce provides 23 shortcodes for displaying legal data, product information and storefront modules anywhere in the store.

## Legal requirements shortcodes

### `[polski_gpsr]`

Displays GPSR (General Product Safety Regulation) information for a product.

**Parameters:**

| Parameter     | Type   | Default    | Description                   |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (current)  | Product ID                    |
| `fields`     | string | `all`      | Fields to display             |
| `layout`     | string | `list`     | Layout: list, table, inline   |

**Example:**

```html
[polski_gpsr product_id="123" fields="manufacturer,contact,safety" layout="table"]
```

**In a PHP template:**

```php
echo do_shortcode('[polski_gpsr]'); // On a product page - automatically gets the ID
```

### `[polski_omnibus_price]`

Displays the lowest price from the last 30 days (Omnibus Directive).

**Parameters:**

| Parameter     | Type   | Default    | Description                   |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (current)  | Product ID                    |
| `days`       | int    | `30`       | Number of days back           |
| `label`      | string | (default)  | Label text                    |
| `show_date`  | string | `no`       | Show lowest price date        |

**Example:**

```html
[polski_omnibus_price product_id="456" label="Lowest price from 30 days:" show_date="yes"]
```

### `[polski_withdrawal_form]`

Displays the contract withdrawal form.

**Parameters:**

| Parameter    | Type   | Default   | Description                         |
| ----------- | ------ | --------- | ----------------------------------- |
| `order_id`  | int    | (empty)   | Pre-fill with order number          |
| `show_info` | string | `yes`     | Show withdrawal rights information  |
| `redirect`  | string | (empty)   | Redirect URL after submission       |

**Example:**

```html
[polski_withdrawal_form show_info="yes"]
```

**Dedicated withdrawal page:**

Create a page with slug `withdrawal-from-contract` and insert:

```html
<h2>Contract withdrawal form</h2>
<p>According to the Consumer Rights Act, you have 14 days to withdraw from the contract.</p>
[polski_withdrawal_form]
```

### `[polski_dsa_report]`

Displays the illegal content reporting form (Digital Services Act).

**Parameters:**

| Parameter     | Type   | Default   | Description                   |
| ------------ | ------ | --------- | ----------------------------- |
| `product_id` | int    | (empty)   | Product ID to report          |
| `categories` | string | `all`     | Report categories             |
| `show_info`  | string | `yes`     | Show DSA information          |

**Example:**

```html
[polski_dsa_report categories="illegal_content,counterfeit,safety"]
```

### `[polski_tax_notice]`

Displays VAT and delivery cost information.

**Parameters:**

| Parameter      | Type   | Default                            | Description            |
| ------------- | ------ | ---------------------------------- | ---------------------- |
| `text`        | string | `Price includes VAT. Delivery costs calculated at checkout.` | Information content |
| `link_text`   | string | `Delivery costs`                   | Link text              |
| `link_url`    | string | (empty)                            | Cost page URL          |

**Example:**

```html
[polski_tax_notice text="Gross price includes 23% VAT." link_text="Check delivery costs" link_url="/delivery/"]
```

## Product information shortcodes

### `[polski_unit_price]`

Displays the product unit price (e.g. price per kg, liter).

**Parameters:**

| Parameter     | Type   | Default    | Description                   |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (current)  | Product ID                    |
| `format`     | string | `auto`     | Format: auto, per_kg, per_l, per_m, per_unit |

**Example:**

```html
[polski_unit_price product_id="789" format="per_kg"]
```

### `[polski_delivery_time]`

Displays estimated delivery time.

**Parameters:**

| Parameter     | Type   | Default         | Description                   |
| ------------ | ------ | --------------- | ----------------------------- |
| `product_id` | int    | (current)       | Product ID                    |
| `format`     | string | `range`         | Format: range, exact, text    |
| `label`      | string | `Delivery time:`| Label                         |

**Example:**

```html
[polski_delivery_time label="Ships in:" format="range"]
```

### `[polski_manufacturer]`

Displays manufacturer information.

**Parameters:**

| Parameter     | Type   | Default    | Description                   |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (current)  | Product ID                    |
| `fields`     | string | `all`      | Fields: name, address, url, logo |
| `link`       | string | `yes`      | Link to manufacturer page     |

**Example:**

```html
[polski_manufacturer fields="name,logo" link="yes"]
```

### `[polski_nutrients]`

Displays the nutrition facts table (for food products).

**Parameters:**

| Parameter     | Type   | Default    | Description                   |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (current)  | Product ID                    |
| `per`        | string | `100g`     | Values per: 100g, 100ml, serving |
| `layout`     | string | `table`    | Layout: table, list, compact  |

**Example:**

```html
[polski_nutrients per="serving" layout="compact"]
```

### `[polski_allergens]`

Displays the allergen list (for food products).

**Parameters:**

| Parameter     | Type   | Default    | Description                   |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (current)  | Product ID                    |
| `highlight`  | string | `bold`     | Highlighting: bold, color, icon |
| `layout`     | string | `inline`   | Layout: inline, list          |

**Example:**

```html
[polski_allergens highlight="bold" layout="list"]
```

## Storefront module shortcodes

### `[polski_wishlist]`

Displays the wishlist table.

**Parameters:**

| Parameter    | Type   | Default   | Description                   |
| ----------- | ------ | --------- | ----------------------------- |
| `columns`   | string | `all`     | Columns to display            |
| `max_items` | int    | `50`      | Product limit                 |
| `show_empty`| string | `yes`     | Empty list message            |

**Example:**

```html
[polski_wishlist columns="image,name,price,add_to_cart" max_items="20"]
```

### `[polski_compare]`

Displays the product comparison table.

**Parameters:**

| Parameter       | Type   | Default   | Description                   |
| -------------- | ------ | --------- | ----------------------------- |
| `columns`      | string | `all`     | Features to display           |
| `hide_similar` | string | `no`      | Hide identical features       |
| `show_remove`  | string | `yes`     | Remove button                 |

**Example:**

```html
[polski_compare hide_similar="yes"]
```

### `[polski_ajax_search]`

Displays the AJAX search with suggestions.

**Parameters:**

| Parameter      | Type   | Default             | Description            |
| ------------- | ------ | ------------------- | ---------------------- |
| `placeholder` | string | `Search products...` | Placeholder text      |
| `width`       | string | `100%`              | Field width            |
| `show_icon`   | string | `yes`               | Magnifying glass icon  |
| `show_cat`    | string | `no`                | Category filter        |
| `limit`       | int    | `8`                 | Suggestion limit       |

**Example:**

```html
[polski_ajax_search placeholder="What are you looking for?" show_cat="yes" limit="10"]
```

### `[polski_ajax_filters]`

Displays AJAX filters for product filtering.

**Parameters:**

| Parameter     | Type   | Default    | Description                   |
| ------------ | ------ | ---------- | ----------------------------- |
| `filters`    | string | `all`      | Filter types                  |
| `style`      | string | `expanded` | Style: expanded, compact, accordion |
| `show_count` | string | `yes`      | Product counters              |
| `show_reset` | string | `yes`      | Reset button                  |
| `columns`    | int    | `1`        | Filter columns                |
| `ajax`       | string | `yes`      | AJAX mode                     |

**Example:**

```html
[polski_ajax_filters filters="category,price,pa_color,stock" style="accordion"]
```

### `[polski_product_slider]`

Displays a product carousel.

**Parameters:**

| Parameter         | Type   | Default   | Description                   |
| ---------------- | ------ | --------- | ----------------------------- |
| `type`           | string | `latest`  | Type: related, sale, featured, bestsellers, latest, category, ids |
| `limit`          | int    | `8`       | Product limit                 |
| `columns`        | int    | `4`       | Desktop columns               |
| `columns_tablet` | int    | `2`       | Tablet columns                |
| `columns_mobile` | int    | `1`       | Mobile columns                |
| `category`       | string | (empty)   | Category slug                 |
| `ids`            | string | (empty)   | Product IDs                   |
| `arrows`         | string | `yes`     | Navigation arrows             |
| `dots`           | string | `no`      | Pagination dots               |
| `autoplay`       | string | `no`      | Autoplay                      |
| `autoplay_speed` | int    | `5000`    | Pause in ms                   |
| `title`          | string | (empty)   | Title                         |
| `orderby`        | string | `date`    | Sort by                       |
| `order`          | string | `DESC`    | Direction                     |

**Example:**

```html
[polski_product_slider type="sale" limit="12" title="Promotions" arrows="yes" dots="yes"]
```

### `[polski_nutri_score]`

Displays the Nutri-Score rating of a food product.

**Parameters:**

| Parameter     | Type   | Default    | Description                   |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (current)  | Product ID                    |
| `size`       | string | `medium`   | Size: small, medium, large    |

**Example:**

```html
[polski_nutri_score product_id="321" size="large"]
```

### `[polski_checkout_button]`

Displays a purchase button with an EU directive-compliant label.

**Parameters:**

| Parameter | Type   | Default                              | Description      |
| -------- | ------ | ------------------------------------ | ---------------- |
| `text`   | string | `Zamowienie z obowiazkiem zaplaty`    | Button text      |
| `class`  | string | (empty)                              | Additional CSS class |

**Example:**

```html
[polski_checkout_button text="Kupuje i place" class="my-checkout-btn"]
```

### `[polski_legal_checkboxes]`

Displays legal checkboxes outside checkout (e.g. on registration page).

**Parameters:**

| Parameter   | Type   | Default   | Description                   |
| ---------- | ------ | --------- | ----------------------------- |
| `location` | string | `custom`  | Location: checkout, registration, contact, custom |
| `ids`      | string | (empty)   | Checkbox IDs to display       |

**Example:**

```html
[polski_legal_checkboxes location="registration"]
```

### `[polski_nip_field]`

Displays a NIP field with real-time validation (VIES/GUS API).

**Parameters:**

| Parameter   | Type   | Default | Description                   |
| ---------- | ------ | ------- | ----------------------------- |
| `required` | string | `no`    | Required field                |
| `autofill` | string | `yes`   | Automatic company data fill   |
| `label`    | string | `NIP`   | Field label                   |

**Example:**

```html
[polski_nip_field required="yes" autofill="yes" label="Company NIP number"]
```

### `[polski_greenwashing_info]`

Displays verified environmental product information (anti-greenwashing).

**Parameters:**

| Parameter     | Type   | Default    | Description                   |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (current)  | Product ID                    |
| `fields`     | string | `all`      | Fields: claims, certifications, evidence |

**Example:**

```html
[polski_greenwashing_info fields="claims,certifications"]
```

### `[polski_security_incident]`

Displays a security incident reporting form (CRA).

**Parameters:**

| Parameter    | Type   | Default | Description                   |
| ----------- | ------ | ------- | ----------------------------- |
| `show_info` | string | `yes`   | CRA information               |

**Example:**

```html
[polski_security_incident show_info="yes"]
```

### `[polski_verified_badge]`

Displays a verified purchase badge on a review.

**Parameters:**

| Parameter | Type   | Default              | Description            |
| -------- | ------ | -------------------- | ---------------------- |
| `text`   | string | `Verified purchase`  | Badge text             |
| `icon`   | string | `checkmark`          | Icon: checkmark, shield|

**Example:**

```html
[polski_verified_badge text="Confirmed order" icon="shield"]
```

## Using shortcodes in PHP templates

All shortcodes can be called in PHP templates:

```php
// Single shortcode
echo do_shortcode('[polski_omnibus_price]');

// Shortcode with parameters
echo do_shortcode('[polski_product_slider type="featured" limit="6"]');

// Conditional display
if (shortcode_exists('polski_gpsr')) {
    echo do_shortcode('[polski_gpsr]');
}
```

## Using shortcodes in Gutenberg

In the Gutenberg editor, use the **Shortcode** block and paste the desired shortcode. Alternatively, many of these shortcodes have dedicated Gutenberg blocks with a preview in the editor.

Report issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
