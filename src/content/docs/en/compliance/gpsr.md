---
title: GPSR - product safety
description: Configuration of GPSR (General Product Safety Regulation) fields in Polski for WooCommerce - manufacturer, importer, EU responsible person, identifiers, warnings and instructions.
---

The GPSR (General Product Safety Regulation, EU 2023/988) has been in effect since December 13, 2024. It obliges sellers to provide detailed product safety information for products sold within the European Union. Polski for WooCommerce provides a complete set of product fields, a status column and CSV import/export tools that allow you to meet these requirements without additional plugins.

## GPSR requirements

Every non-food product sold in the EU must include:

1. **Manufacturer data** - name, address, contact details
2. **Importer data** - if the manufacturer is based outside the EU
3. **EU responsible person** - required for products from outside the EU
4. **Product identifiers** - batch number, serial number, EAN/GTIN code
5. **Warnings** - information about hazards and age restrictions
6. **Safety instructions** - safe use guidelines
7. **Photos/documents** - optional attachments (safety data sheets, certificates)
8. **Risk category** - product risk level classification

## Configuring GPSR fields

GPSR fields can be found in the WooCommerce product editor, in the **Polski - GPSR** tab. Each field is optional, but the regulation requires filling in all fields applicable to the given product.

### Manufacturer

Fill in the full manufacturer data:

- Company name
- Address (street, postal code, city, country)
- Email address
- Phone number
- Website

### Importer

Field required when the manufacturer is based outside the European Union. Provide the same data categories as for the manufacturer.

### EU responsible person

From December 13, 2024, every non-food product sold in the EU by an entity outside the EU must have a designated responsible person based in the Union. Provide:

- Company name or full name
- Address in the EU
- Contact details (email, phone)

### Product identifiers

- **Batch number (LOT)** - production batch identifier
- **Serial number** - unique item identifier
- **EAN/GTIN** - product barcode
- **Model number** - model designation

### Warnings and restrictions

Text field for information about:

- Hazards related to use
- Age restrictions (e.g. "Not suitable for children under 3 years")
- Adult supervision requirements
- Hazardous substances

### Safety instructions

Field for instructions about:

- Proper assembly and installation
- Safe use
- Maintenance and storage
- Procedure in case of accident

## GPSR status column

On the product list in the admin panel (**Products > All Products**) the plugin adds a **GPSR** column that displays field completion status:

- Green icon - all required fields filled
- Orange icon - partially filled
- Red icon - no GPSR data

The column allows quick identification of products requiring data completion before regulations take effect.

## CSV import and export

### Export

When exporting WooCommerce products (**Products > Export**) the plugin automatically adds GPSR columns to the CSV file:

- `gpsr_manufacturer_name`
- `gpsr_manufacturer_address`
- `gpsr_manufacturer_email`
- `gpsr_manufacturer_phone`
- `gpsr_manufacturer_url`
- `gpsr_importer_name`
- `gpsr_importer_address`
- `gpsr_importer_email`
- `gpsr_eu_responsible_name`
- `gpsr_eu_responsible_address`
- `gpsr_eu_responsible_email`
- `gpsr_identifiers_lot`
- `gpsr_identifiers_serial`
- `gpsr_identifiers_ean`
- `gpsr_identifiers_model`
- `gpsr_warnings`
- `gpsr_instructions`

### Import

Prepare a CSV file with the appropriate column headers (identical to the export format). Import follows the standard WooCommerce path: **Products > Import**.

Tip: export a few products first to get a CSV template with the correct headers.

## Shortcode

Use the shortcode `[polski_gpsr]` to display GPSR information on the product page or anywhere on the site.

### Basic usage

```
[polski_gpsr]
```

Displays GPSR data for the current product (works on WooCommerce product pages).

### With a specific product

```
[polski_gpsr product_id="123"]
```

Displays GPSR data for the product with the given ID.

### Example output

The shortcode generates a formatted table with sections:

| Section | Content |
|---------|---------|
| Manufacturer | Name, address, email, phone, website |
| Importer | Name, address, email (if applicable) |
| EU responsible person | Name, address, contact details |
| Identifiers | LOT, serial number, EAN, model |
| Warnings | Warning text |
| Instructions | Safety instructions text |

## Bulk data completion

If many products come from the same manufacturer, the most efficient method is:

1. Export products to CSV
2. Fill in manufacturer columns for all rows (copy-paste in a spreadsheet)
3. Import the updated CSV file

## Troubleshooting

**GPSR fields do not appear in the product editor**
Make sure the GPSR module is enabled in plugin settings: **WooCommerce > Settings > Polski > Modules**.

**The status column does not display on the product list**
Click the "Screen Options" button in the top right corner of the product list page and check the GPSR column.

**Data does not import from CSV**
Check that the column headers in the CSV file exactly match the export format. Column names are case-sensitive.

## Next steps

- Report issues: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Discussions and questions: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
