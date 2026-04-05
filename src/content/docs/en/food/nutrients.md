---
title: Nutritional values
description: Nutrition facts table in JSON format per 100 g or 100 ml with a shortcode for display on the WooCommerce product page.
---

Regulation (EU) No 1169/2011 requires that the packaging (and the online store) of a food product includes a nutrition facts table. The Polski for WooCommerce plugin enables entering a full nutrition facts table for each product and displaying it in a clear format compliant with regulations.

## Mandatory nutrients

According to Article 30 of the FIC Regulation, the nutrition facts table must contain at least:

| Nutrient | Unit | JSON key |
|----------|------|----------|
| Energy value | kJ / kcal | `energy_kj`, `energy_kcal` |
| Fat | g | `fat` |
| of which saturated fatty acids | g | `saturated_fat` |
| Carbohydrates | g | `carbohydrates` |
| of which sugars | g | `sugars` |
| Protein | g | `protein` |
| Salt | g | `salt` |

## Optional nutrients

Additionally, the following can be provided (Art. 30(2) FIC):

| Nutrient | Unit | JSON key |
|----------|------|----------|
| Monounsaturated fatty acids | g | `monounsaturated_fat` |
| Polyunsaturated fatty acids | g | `polyunsaturated_fat` |
| Polyols | g | `polyols` |
| Starch | g | `starch` |
| Fibre | g | `fibre` |
| Vitamin A | mcg | `vitamin_a` |
| Vitamin D | mcg | `vitamin_d` |
| Vitamin E | mg | `vitamin_e` |
| Vitamin K | mcg | `vitamin_k` |
| Vitamin C | mg | `vitamin_c` |
| Thiamine (B1) | mg | `thiamine` |
| Riboflavin (B2) | mg | `riboflavin` |
| Niacin (B3) | mg | `niacin` |
| Vitamin B6 | mg | `vitamin_b6` |
| Folic acid | mcg | `folic_acid` |
| Vitamin B12 | mcg | `vitamin_b12` |
| Biotin | mcg | `biotin` |
| Pantothenic acid | mg | `pantothenic_acid` |
| Potassium | mg | `potassium` |
| Chloride | mg | `chloride` |
| Calcium | mg | `calcium` |
| Phosphorus | mg | `phosphorus` |
| Magnesium | mg | `magnesium` |
| Iron | mg | `iron` |
| Zinc | mg | `zinc` |
| Copper | mg | `copper` |
| Manganese | mg | `manganese` |
| Fluoride | mg | `fluoride` |
| Selenium | mcg | `selenium` |
| Chromium | mcg | `chromium` |
| Molybdenum | mcg | `molybdenum` |
| Iodine | mcg | `iodine` |

## Configuration

### Enabling the module

Go to **WooCommerce > Settings > Polski > Food** and activate the "Nutritional Values" sub-module.

### Settings

| Setting | Default | Description |
|---------|---------|-------------|
| Reference unit | per 100 g | Default unit: per 100 g or per 100 ml |
| Display % RI | Yes | Reference intake (% of daily requirement) |
| Table position | Tab | Where to display the table on the product page |
| Optional nutrients | Fibre, vitamins | Which optional nutrients to display |

## Entering data in the product editor

In the "Food" tab in the product editor, you will find the nutritional values form. Fill in fields with numeric values per 100 g or 100 ml.

### Reference unit per product

Each product can have an individual reference unit. Beverages should have "per 100 ml" set, solid products - "per 100 g". If not set, the default value from settings will be used.

### Serving

Optionally, you can also provide serving size and nutritional values per serving:

| Field | Description |
|-------|-------------|
| Serving size | e.g. "30 g", "250 ml", "1 slice (25 g)" |
| Servings per package | e.g. "10" |

## JSON format

Nutritional values are stored in the database as JSON in the meta field `_polski_nutrients`. Format:

```json
{
    "energy_kj": 1046,
    "energy_kcal": 250,
    "fat": 9.5,
    "saturated_fat": 3.2,
    "carbohydrates": 31.0,
    "sugars": 5.4,
    "fibre": 2.1,
    "protein": 8.7,
    "salt": 1.2,
    "ref_unit": "100g",
    "serving_size": "30g",
    "servings_per_package": 10
}
```

### Validation rules

- Values must be numbers (int or float)
- Decimal separator in JSON: dot (e.g. `9.5`)
- Values cannot be negative
- `energy_kj` and `energy_kcal` should be consistent (1 kcal = 4.184 kJ)
- Sub-nutrients cannot exceed the parent nutrient (e.g. `saturated_fat` <= `fat`)

## Shortcode

Use the shortcode `[polski_nutrients]` to display the nutrition facts table.

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `product_id` | int | current | Product ID |
| `show_rws` | bool | `true` | Whether to display % RI |
| `show_serving` | bool | `false` | Whether to display the per serving column |
| `fields` | string | `all` | Nutrients to display (comma-separated) |
| `layout` | string | `table` | Layout: `table`, `list`, `compact` |
| `wrapper` | string | `div` | Wrapping HTML element |

### Usage examples

Full nutrition facts table:

```html
[polski_nutrients]
```

With per serving values:

```html
[polski_nutrients show_serving="true"]
```

Basic nutrients only:

```html
[polski_nutrients fields="energy_kcal,fat,carbohydrates,protein,salt"]
```

Compact layout (without table):

```html
[polski_nutrients layout="compact"]
```

For a specific product:

```html
[polski_nutrients product_id="123" show_rws="true" show_serving="true"]
```

In a PHP template:

```php
echo do_shortcode('[polski_nutrients product_id="' . $product->get_id() . '"]');
```

## Generated HTML table

The shortcode generates a table compliant with the EU standard:

```html
<div class="polski-nutrients">
    <table class="polski-nutrients__table">
        <thead>
            <tr>
                <th>Nutritional value</th>
                <th>per 100 g</th>
                <th>% RI*</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Energy value</td>
                <td>1046 kJ / 250 kcal</td>
                <td>13%</td>
            </tr>
            <tr>
                <td>Fat</td>
                <td>9.5 g</td>
                <td>14%</td>
            </tr>
            <tr class="polski-nutrients__sub">
                <td>of which saturated fatty acids</td>
                <td>3.2 g</td>
                <td>16%</td>
            </tr>
            <!-- ... -->
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3">
                    * Reference intake for an average adult (8400 kJ / 2000 kcal)
                </td>
            </tr>
        </tfoot>
    </table>
</div>
```

## Reference intake (RI)

The plugin calculates % RI automatically based on reference values from Annex XIII of the FIC Regulation:

| Nutrient | Reference value |
|----------|-----------------|
| Energy | 8400 kJ / 2000 kcal |
| Fat | 70 g |
| Saturated fatty acids | 20 g |
| Carbohydrates | 260 g |
| Sugars | 90 g |
| Protein | 50 g |
| Salt | 6 g |
| Fibre | 25 g |

## Programmatic access

### Getting nutritional values

```php
$nutrients_json = get_post_meta($product_id, '_polski_nutrients', true);
$nutrients = json_decode($nutrients_json, true);

if ($nutrients) {
    $energy_kcal = $nutrients['energy_kcal'] ?? 0;
    $protein = $nutrients['protein'] ?? 0;
}
```

### Saving nutritional values

```php
$nutrients = [
    'energy_kj'     => 1046,
    'energy_kcal'   => 250,
    'fat'           => 9.5,
    'saturated_fat' => 3.2,
    'carbohydrates' => 31.0,
    'sugars'        => 5.4,
    'protein'       => 8.7,
    'salt'          => 1.2,
    'ref_unit'      => '100g',
];

update_post_meta($product_id, '_polski_nutrients', wp_json_encode($nutrients));
```

### Filter for values before display

```php
add_filter('polski/nutrients/values', function (array $nutrients, int $product_id): array {
    // Rounding values according to EU guidelines
    if (isset($nutrients['energy_kcal'])) {
        $nutrients['energy_kcal'] = round($nutrients['energy_kcal']);
    }

    return $nutrients;
}, 10, 2);
```

## CSV import

The `polski_nutrients` column in CSV should contain values in JSON format:

```csv
"Fruit muesli","{""energy_kj"":1590,""energy_kcal"":380,""fat"":8.2,""saturated_fat"":1.5,""carbohydrates"":64.0,""sugars"":22.0,""fibre"":7.5,""protein"":9.8,""salt"":0.05,""ref_unit"":""100g""}"
```

Quotation marks inside JSON must be doubled (`""`) in the CSV file.

## CSS styling

```css
.polski-nutrients__table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9em;
}

.polski-nutrients__table th,
.polski-nutrients__table td {
    padding: 0.4em 0.8em;
    border-bottom: 1px solid #e0e0e0;
    text-align: left;
}

.polski-nutrients__sub td:first-child {
    padding-left: 1.5em;
    font-style: italic;
}

.polski-nutrients__table tfoot td {
    font-size: 0.8em;
    color: #666;
    padding-top: 0.8em;
}
```

## Common issues

### Nutrition facts table does not display

1. Check that the nutritional values sub-module is enabled
2. Make sure the product has the `_polski_nutrients` field filled with valid JSON
3. Verify JSON format - use a validator (e.g. jsonlint.com)

### Values display with a dot instead of comma

The plugin automatically formats numbers according to Polish settings (decimal comma). If you see a dot, check that the WordPress locale is set to `pl_PL`.

### % RI does not display

Check that the "Display % RI" option is enabled in settings and that the `show_rws` parameter in the shortcode is not set to `false`.

## Related resources

- [Food products module](/en/food/food-overview/)
- [Allergens](/en/food/allergens/)
- [Report an issue](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
