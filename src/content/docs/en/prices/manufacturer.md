---
title: Manufacturer and brand
description: Manufacturer data (GPSR), brand taxonomy, GTIN/EAN numbers and shortcode for displaying manufacturer information in WooCommerce.
---

The GPSR (General Product Safety Regulation) effective from December 13, 2024 obliges online sellers to provide manufacturer or responsible person data on the product page. The Polski for WooCommerce plugin allows adding full manufacturer data, brand and product identifiers (GTIN/EAN) to each product in the store.

## GPSR requirements

According to Regulation (EU) 2023/988 (GPSR), the product page must include:

- manufacturer or importer name
- manufacturer postal address
- email address or website for contact
- for products from outside the EU - data of the responsible person in the EU

This information must be easily accessible to the consumer before purchase.

## Configuration

### Enabling the module

Go to **WooCommerce > Settings > Polski > Manufacturer** and activate the module. After activation, new fields will appear in the product editor.

### Manufacturer data (GPSR)

In the product editor, in the "Polski" tab or in the side panel, you will find the "Manufacturer (GPSR)" section:

| Field | Required | Description |
|-------|----------|-------------|
| Manufacturer name | Yes | Full manufacturer company name |
| Address | Yes | Street, number, postal code, city, country |
| Email | Yes* | Contact email address |
| Website | Yes* | Manufacturer website URL |
| EU responsible person | Conditional | Required for products from outside the EU |
| Responsible person address | Conditional | Full address of the responsible person |

*At least one electronic contact method is required (email or website).

### Global manufacturer data

If you mainly sell your own brand products, you can set default manufacturer data in **WooCommerce > Settings > Polski > Manufacturer**. This data will be automatically applied to all products that do not have individual manufacturer data assigned.

## Brand taxonomy

The plugin registers a `polski_brand` taxonomy for managing product brands.

### Managing brands

Go to **Products > Brands** to create and edit brands. Each brand can contain:

- name
- slug (URL identifier)
- description
- logo (taxonomy thumbnail)

### Assigning a brand to a product

In the product editor, in the side panel, you will find a "Brand" metabox - select a brand from the list or add a new one.

### Brand pages

The plugin automatically generates archive pages for each brand. Customers can browse all products of a given brand at:

```
/brand/brand-name/
```

The archive slug can be changed in plugin settings.

## GTIN/EAN

The plugin adds a field for product identification numbers compliant with GS1 standards.

### Supported formats

| Format | Length | Application |
|--------|--------|-------------|
| EAN-13 | 13 digits | European standard |
| EAN-8 | 8 digits | Small packages |
| UPC-A | 12 digits | American standard |
| GTIN-14 | 14 digits | Bulk packaging |
| ISBN-13 | 13 digits | Books |

### Validation

The plugin automatically validates GTIN/EAN number correctness (check digit). An invalid number will be rejected with an error message.

### Structured data (Schema.org)

The GTIN number is automatically added to the product structured data (JSON-LD), which improves visibility in Google search results:

```json
{
    "@type": "Product",
    "gtin13": "5901234123457",
    "brand": {
        "@type": "Brand",
        "name": "Brand Name"
    },
    "manufacturer": {
        "@type": "Organization",
        "name": "Manufacturer Name",
        "address": "ul. Przykladowa 1, 00-001 Warsaw"
    }
}
```

## Shortcode

Use the shortcode `[polski_manufacturer]` to display manufacturer data anywhere.

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `product_id` | int | current | Product ID |
| `fields` | string | `all` | Fields to display: `all`, `name`, `address`, `email`, `url`, `gtin`, `brand` |
| `layout` | string | `list` | Layout: `list`, `inline`, `table` |
| `show_label` | bool | `true` | Whether to display field labels |
| `wrapper` | string | `div` | Wrapping HTML element |

### Usage examples

Full manufacturer data:

```html
[polski_manufacturer]
```

Result (list layout):

```
Manufacturer: ABC Sp. z o.o.
Address: ul. Fabryczna 10, 00-001 Warsaw
Email: contact@abc.pl
Website: https://abc.pl
```

Name and GTIN only:

```html
[polski_manufacturer fields="name,gtin"]
```

Product brand in inline layout:

```html
[polski_manufacturer fields="brand" layout="inline"]
```

For a specific product:

```html
[polski_manufacturer product_id="789" fields="name,address" layout="table"]
```

In a PHP template:

```php
echo do_shortcode('[polski_manufacturer product_id="' . $product->get_id() . '" fields="name,gtin"]');
```

## Programmatic data access

### Getting manufacturer data

```php
$manufacturer_name = get_post_meta($product_id, '_polski_manufacturer_name', true);
$manufacturer_address = get_post_meta($product_id, '_polski_manufacturer_address', true);
$manufacturer_email = get_post_meta($product_id, '_polski_manufacturer_email', true);
$manufacturer_url = get_post_meta($product_id, '_polski_manufacturer_url', true);
$gtin = get_post_meta($product_id, '_polski_gtin', true);
```

### Getting the brand

```php
$brands = wp_get_object_terms($product_id, 'polski_brand');
if (!empty($brands) && !is_wp_error($brands)) {
    $brand_name = $brands[0]->name;
    $brand_logo = get_term_meta($brands[0]->term_id, 'thumbnail_id', true);
}
```

## CSV import

Manufacturer data and GTIN can be imported via CSV:

| CSV column | Description |
|------------|-------------|
| `polski_manufacturer_name` | Manufacturer name |
| `polski_manufacturer_address` | Manufacturer address |
| `polski_manufacturer_email` | Manufacturer email |
| `polski_manufacturer_url` | Manufacturer website |
| `polski_gtin` | GTIN/EAN number |
| `polski_brand` | Brand name |

Example:

```csv
"Moisturizing cream","ABC Cosmetics Sp. z o.o.","ul. Kwiatowa 5, 00-100 Warsaw","info@abc.pl","https://abc.pl","5901234123457","ABC Cosmetics"
```

## Common issues

### Manufacturer data does not display on the product page

1. Check that the manufacturer module is enabled
2. Make sure the product has filled data or default data is configured
3. Verify that the theme supports the `woocommerce_single_product_summary` or `woocommerce_product_meta_end` hook

### GTIN rejected as invalid

Check the GTIN number check digit. Use the GS1 calculator for verification: https://www.gs1.org/services/check-digit-calculator

### Brand does not appear in Schema.org

Make sure the brand is assigned to the product through the `polski_brand` taxonomy, not just entered in the manufacturer text field.

## Related resources

- [Report an issue](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
