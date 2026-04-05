---
title: CSV import and export
description: CSV data import and export in Polski for WooCommerce - GPSR fields, greenwashing and product data.
---

Polski for WooCommerce extends the built-in WooCommerce CSV importer/exporter with additional columns for legal data, GPSR, environmental claims and other fields specific to Polish and EU law.

## Supported CSV fields

### GPSR fields (General Product Safety Regulation)

| CSV column                      | Meta key                         | Type   | Description                    |
| -------------------------------- | -------------------------------- | ------ | ------------------------------ |
| `gpsr_manufacturer_name`         | `_polski_gpsr_manufacturer_name` | string | Manufacturer name              |
| `gpsr_manufacturer_address`      | `_polski_gpsr_manufacturer_address` | string | Manufacturer address        |
| `gpsr_manufacturer_email`        | `_polski_gpsr_manufacturer_email`| string | Manufacturer email             |
| `gpsr_manufacturer_phone`        | `_polski_gpsr_manufacturer_phone`| string | Manufacturer phone             |
| `gpsr_manufacturer_url`          | `_polski_gpsr_manufacturer_url`  | string | Manufacturer website           |
| `gpsr_authorized_rep_name`       | `_polski_gpsr_auth_rep_name`     | string | Authorized representative name |
| `gpsr_authorized_rep_address`    | `_polski_gpsr_auth_rep_address`  | string | Authorized representative address |
| `gpsr_authorized_rep_email`      | `_polski_gpsr_auth_rep_email`    | string | Authorized representative email |
| `gpsr_safety_info`               | `_polski_gpsr_safety_info`       | string | Safety information             |
| `gpsr_warnings`                  | `_polski_gpsr_warnings`          | string | Product warnings               |
| `gpsr_barcode_type`              | `_polski_gpsr_barcode_type`      | string | Barcode type: EAN, UPC, GTIN   |
| `gpsr_barcode_value`             | `_polski_gpsr_barcode_value`     | string | Barcode value                  |
| `gpsr_product_type`              | `_polski_gpsr_product_type`      | string | Product type per GPSR          |
| `gpsr_country_of_origin`         | `_polski_gpsr_country_origin`    | string | Country of origin (ISO code)   |

### Greenwashing fields (anti-greenwashing)

| CSV column                      | Meta key                         | Type   | Description                    |
| -------------------------------- | -------------------------------- | ------ | ------------------------------ |
| `green_claim_text`               | `_polski_green_claim`            | string | Environmental claim content    |
| `green_claim_evidence`           | `_polski_green_evidence`         | string | Evidence / justification       |
| `green_certification_name`       | `_polski_green_cert_name`        | string | Certificate name               |
| `green_certification_number`     | `_polski_green_cert_number`      | string | Certificate number             |
| `green_certification_url`        | `_polski_green_cert_url`         | string | Certificate link               |
| `green_carbon_footprint`         | `_polski_green_carbon`           | float  | Carbon footprint (kg CO2)      |
| `green_recyclable`               | `_polski_green_recyclable`       | bool   | Whether product is recyclable  |
| `green_durability_years`         | `_polski_green_durability`       | int    | Product durability in years    |

### Product data fields

| CSV column                      | Meta key                         | Type   | Description                    |
| -------------------------------- | -------------------------------- | ------ | ------------------------------ |
| `unit_price`                     | `_polski_unit_price`             | float  | Unit price                     |
| `unit_price_unit`                | `_polski_unit_price_unit`        | string | Unit: kg, l, m, pcs            |
| `unit_price_base`                | `_polski_unit_price_base`        | float  | Conversion base                |
| `delivery_time_min`              | `_polski_delivery_min`           | int    | Min. delivery time (days)      |
| `delivery_time_max`              | `_polski_delivery_max`           | int    | Max. delivery time (days)      |
| `manufacturer_name`              | `_polski_manufacturer`           | string | Manufacturer name              |
| `manufacturer_url`               | `_polski_manufacturer_url`       | string | Manufacturer URL               |
| `gtin`                           | `_polski_gtin`                   | string | GTIN/EAN code                  |
| `withdrawal_excluded`            | `_polski_withdrawal_excluded`    | bool   | Excluded from withdrawal right |
| `withdrawal_reason`              | `_polski_withdrawal_reason`      | string | Withdrawal exclusion reason    |

### Food product fields

| CSV column                      | Meta key                         | Type   | Description                    |
| -------------------------------- | -------------------------------- | ------ | ------------------------------ |
| `energy_kcal`                    | `_polski_energy_kcal`            | float  | Energy (kcal/100g)             |
| `energy_kj`                      | `_polski_energy_kj`              | float  | Energy (kJ/100g)               |
| `fat`                            | `_polski_fat`                    | float  | Fat (g/100g)                   |
| `saturated_fat`                  | `_polski_saturated_fat`          | float  | Saturated fatty acids          |
| `carbohydrates`                  | `_polski_carbohydrates`          | float  | Carbohydrates (g/100g)         |
| `sugars`                         | `_polski_sugars`                 | float  | Sugars (g/100g)                |
| `protein`                        | `_polski_protein`                | float  | Protein (g/100g)               |
| `salt`                           | `_polski_salt`                   | float  | Salt (g/100g)                  |
| `fiber`                          | `_polski_fiber`                  | float  | Fibre (g/100g)                 |
| `allergens`                      | `_polski_allergens`              | string | Allergens (comma-separated)    |
| `nutri_score`                    | `_polski_nutri_score`            | string | Nutri-Score: A, B, C, D, E     |

## Example CSV file

```csv
ID,SKU,Name,gpsr_manufacturer_name,gpsr_manufacturer_address,gpsr_manufacturer_email,gpsr_barcode_type,gpsr_barcode_value,gpsr_country_of_origin,unit_price,unit_price_unit,delivery_time_min,delivery_time_max,manufacturer_name
123,SKU-001,"Cotton T-shirt","Producer XYZ Sp. z o.o.","ul. Fabryczna 1, 00-001 Warsaw","contact@xyz.pl","EAN","5901234123457","PL",49.99,"pcs",2,5,"XYZ"
456,SKU-002,"Rapeseed oil 1L","Olejarnia ABC","ul. Polna 5, 60-001 Poznan","info@abc.pl","EAN","5901234567890","PL",12.99,"l",1,3,"ABC"
```

## CSV import

### Via admin panel

1. Go to **WooCommerce > Products > Import**
2. Select the CSV file
3. At the column mapping stage - Polski for WooCommerce columns will appear automatically in the **Polski for WooCommerce** section
4. Map CSV columns to the appropriate fields
5. Run the import

### Via WP-CLI

```bash
wp wc product_csv_importer run /path/to/file.csv --user=admin
```

### Programmatically

```php
// Hook to modify imported data
add_filter('polski/csv/import_data', function (array $data, array $raw_row): array {
    // GTIN code validation
    if (!empty($data['gpsr_barcode_value'])) {
        $gtin = $data['gpsr_barcode_value'];
        if (strlen($gtin) !== 13 && strlen($gtin) !== 8) {
            $data['gpsr_barcode_value'] = ''; // Reject invalid code
        }
    }
    return $data;
}, 10, 2);
```

## CSV export

### Via admin panel

1. Go to **WooCommerce > Products > Export**
2. In the **Columns to export** section, check columns from the **Polski for WooCommerce** group
3. Optionally filter by category, status or product type
4. Click **Generate CSV**

### Via WP-CLI

```bash
wp wc product_csv_exporter run --filename=products-polski.csv --user=admin
```

### Filtering export columns

```php
// Adding custom columns to export
add_filter('polski/csv/export_columns', function (array $columns): array {
    $columns['custom_field'] = 'Custom field';
    return $columns;
});

// Custom column value
add_filter('polski/csv/export_column_value', function ($value, string $column, WC_Product $product) {
    if ($column === 'custom_field') {
        return $product->get_meta('_my_custom_field');
    }
    return $value;
}, 10, 3);
```

## Import validation

Import automatically validates data:

- **GTIN/EAN** - check digit verification (modulo 10 algorithm)
- **Email** - email address format validation
- **URL** - URL format validation
- **Country** - ISO 3166-1 alpha-2 code check
- **Allergens** - verification that values belong to the defined list (14 EU allergens)
- **Nutri-Score** - check that the value is A, B, C, D or E

Invalid values are logged and skipped (they do not block the import). The log is available after import in the results section.

## Bulk GPSR data import

For stores with a large number of products where the manufacturer is shared across many products:

```bash
# Prepare a CSV with minimal data
# ID,gpsr_manufacturer_name,gpsr_manufacturer_address,gpsr_manufacturer_email
```

Then set default GPSR values in **WooCommerce > Polski > Legal Compliance > GPSR > Default values**. The import will only fill in products that have empty GPSR fields.

## Troubleshooting

**Polski columns do not appear in mapping** - make sure the Polski for WooCommerce plugin is active. Columns are registered via the `woocommerce_csv_product_import_mapping_options` hook.

**Import times out** - increase PHP `max_execution_time` or use WP-CLI for importing large files.

**Special characters are corrupted** - make sure the CSV file is saved in UTF-8 encoding (without BOM).

**Numeric values do not import** - the decimal separator in the CSV file should be a dot (.), not a comma.

Report issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
