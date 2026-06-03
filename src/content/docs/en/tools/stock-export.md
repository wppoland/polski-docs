---
title: Stock export
description: Stock export module in Polski for WooCommerce - CSV export with a threshold filter, variation support, HTML preview and Excel format.
---

The stock export module generates CSV files with stock data for WooCommerce products. It supports 10 configurable fields, filtering by quantity threshold, full support for variable products, and a preview mode in an HTML table.

## Enabling the module

Go to **WooCommerce > Polski > Tools** and enable **Stock export** (module ID: `stock_export`).

## Export panel

The export panel is available in **Products > Stock export** (`edit.php?post_type=product&page=polski-stock-export`).

### Threshold filter

Filter products by quantity in stock:

| Operator | Description                     | Example                          |
| -------- | ------------------------------- | -------------------------------- |
| `<=`     | Less than or equal             | `<= 5` - products with stock up to 5 units |
| `>=`     | Greater than or equal          | `>= 100` - products with high stock    |
| `=`      | Exactly equal                  | `= 0` - products with no stock          |

The threshold filter lets you quickly identify products that need restocking or products with excess stock.

Leave the threshold field empty to export all products regardless of stock level.

### Field selection

Select the fields to include in the export. The configuration is saved in WordPress options.

| Field                    | CSV column               | Description                               |
| ------------------------ | ------------------------ | ----------------------------------------- |
| Product ID               | `product_id`             | Product post ID                           |
| SKU                      | `sku`                    | Product SKU code                          |
| Product name             | `product_name`           | Full product name                         |
| Stock status             | `stock_status`           | `instock`, `outofstock`, `onbackorder`    |
| Stock quantity           | `stock_quantity`         | Current quantity (null if not managed)    |
| Stock management         | `manage_stock`           | `yes` or `no`                             |
| Low stock threshold      | `low_stock_threshold`    | Low stock notification threshold          |
| Backorders allowed       | `backorders`             | `no`, `notify`, `yes`                     |
| Category                 | `category`               | Product categories (comma separated)      |
| Price                    | `price`                  | Current product price                     |

## Variation support

Variable products are exported with full variation support:

- **Parent product** - exported with the aggregate stock (if stock management is at the product level)
- **Variations** - each variation is exported as a separate row with its own stock data

The variation name includes the attributes in parentheses, e.g. `Polo shirt (Red, XL)`.

When stock management is set at the variation level, the parent product shows the combined stock of all variations.

## Preview mode

Click **Preview** instead of **Export** to show the data in an HTML table directly in the admin panel. The preview lets you:

- Check the data before exporting
- Verify that the filters are correct
- Quickly review stock levels without downloading a file

The preview table is sortable by each column (click the header). Rows with zero stock are highlighted in red. Rows with low stock (below the threshold) are highlighted in yellow.

## CSV file format

The CSV file is optimized for opening in Microsoft Excel with Polish regional settings:

- **BOM (Byte Order Mark)** - the file starts with the UTF-8 BOM marker (`\xEF\xBB\xBF`), so Excel correctly recognizes the encoding
- **Separator**: semicolon (`;`) - Excel with Polish regional settings recognizes the semicolon as the column separator by default
- **Encoding**: UTF-8
- **Text qualifier**: double quote (`"`)
- **Line endings**: `\r\n` (Windows)

Thanks to the BOM and the semicolon, the CSV file can be opened in Excel with a double click - with no need to import using an encoding setting.

## Export

After configuring the filters and fields, click **Export to CSV**. The file will be downloaded by the browser with the name `stock-export-YYYY-MM-DD.csv`.

## WP-CLI

Export stock levels from the command line:

```bash
wp polski export stock --threshold="<=5" --output=/tmp/low-stock.csv
```

Parameters:

- `--threshold` - threshold filter (e.g. `<=5`, `>=100`, `=0`)
- `--fields` - list of fields (comma separated)
- `--include-variations` - include variations (default `yes`)
- `--output` - output file path

## Hooks

```php
// Add a custom field to the export
add_filter('polski/stock_export/fields', function (array $fields): array {
    $fields['warehouse_location'] = [
        'label'    => 'Warehouse location',
        'callback' => function (\WC_Product $product): string {
            return $product->get_meta('_warehouse_location');
        },
    ];
    return $fields;
});

// Modify the products query
add_filter('polski/stock_export/query_args', function (array $args): array {
    $args['category'] = ['electronics'];
    return $args;
});

// Change the CSV separator
add_filter('polski/stock_export/csv_separator', function (): string {
    return ','; // comma instead of semicolon
});
```

## Troubleshooting

**Excel shows Polish characters as garbled text** - make sure the export generates a file with a BOM (enabled by default). In older versions of Excel (before 2016), use the data import feature with the encoding set manually to UTF-8.

**Variations do not appear in the export** - check that the variations have the "Published" status. Draft variations are skipped.

**The threshold filter does not work** - the filter works only on products with stock management enabled (`manage_stock = yes`). Products without stock management have `stock_quantity = null`.

**The preview loads too slowly** - with over 5,000 products, the preview can be slow. Use the threshold filter to limit the number of results, or export directly to CSV.

Reporting issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
