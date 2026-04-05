---
title: Food products module
description: Food module overview - nutritional values, allergens, ingredients, Nutri-Score, alcohol and country of origin in WooCommerce.
---

Selling food online requires providing information about composition, nutritional values, allergens and product origin (EU Regulation 1169/2011). Polski for WooCommerce provides a complete module for managing this data.

## Legal requirements

The FIC Regulation obliges food sellers to provide the following information:

| Information | Required | Legal basis |
|-------------|----------|-------------|
| Food name | Yes | Art. 9(1)(a) |
| List of ingredients | Yes | Art. 9(1)(b) |
| Allergens | Yes | Art. 9(1)(c) |
| Quantity of ingredients | Conditional | Art. 9(1)(d) |
| Net quantity | Yes | Art. 9(1)(e) |
| Date of minimum durability | Yes | Art. 9(1)(f) |
| Storage conditions | Conditional | Art. 9(1)(g) |
| Producer data | Yes | Art. 9(1)(h) |
| Country of origin | Conditional | Art. 9(1)(i) |
| Nutritional value | Yes | Art. 9(1)(l) |

For distance selling (online store), most of this information must be available before purchase - except the date of minimum durability, which can be provided upon delivery.

## Module components

The food module consists of several sub-modules that can be enabled independently:

### Nutritional values

Nutrition facts table per 100 g or 100 ml of product. Includes energy (kJ/kcal), fats, carbohydrates, protein, salt and other nutrients.

Details: [Nutritional values](/en/food/nutrients/)

### Allergens

Allergen declaration system based on WordPress taxonomy. 14 main allergens according to Annex II of the FIC Regulation.

Details: [Allergens](/en/food/allergens/)

### Nutri-Score

Display of Nutri-Score labels (A-E) with appropriate colors and CSS classes.

Details: [Nutri-Score](/en/food/nutri-score/)

### Ingredients (list)

Text field for the full product ingredients list. Allergens in the list are automatically highlighted in bold according to FIC requirements.

### Alcohol

Fields for managing information about alcoholic products:

| Field | Description |
|-------|-------------|
| Alcohol content (% vol.) | Percentage alcohol content |
| Warning | Message about prohibition of sale to minors |
| Age verification | Checkbox for confirming legal age when adding to cart |

For beverages with an alcohol content above 1.2% vol., indicating the alcohol content on the label is required (Art. 28 FIC).

### Country of origin

Field for country of origin or place of provenance information. Required for:

- meat (beef, pork, poultry, lamb)
- fruits and vegetables
- fish
- olive oil
- honey
- products where lack of information could mislead the consumer

## Configuration

### Enabling the module

Go to **WooCommerce > Settings > Polski > Food** and activate the module and select the sub-modules you need.

### Global settings

| Setting | Description |
|---------|-------------|
| Reference unit | Default unit: per 100 g or per 100 ml |
| Position on product page | Where to display information (tab, below description, sidebar) |
| Display on listing | Whether to show condensed information on category pages |
| Automatic allergen highlighting | Bold allergen names in the ingredients list |

### Position on the product page

Food product information can be displayed in several places:

1. **New tab** (recommended) - separate "Food Information" tab next to description and reviews
2. **Below description** - directly below the product description
3. **In metadata** - in the SKU/categories section
4. **Custom** - using shortcodes anywhere

## Product editor

After activating the food module, a new "Food" tab appears in the product editor with the following sections:

- **Nutritional values** - table with fields for all nutrients
- **Ingredients** - text field (WYSIWYG) for the ingredients list
- **Allergens** - checkbox allergen list
- **Nutri-Score** - A-E level selection
- **Alcohol** - fields related to alcoholic beverages
- **Origin** - country of origin and place of provenance

## CSV import

All food data can be imported in bulk via CSV:

| CSV column | Description | Format |
|------------|-------------|--------|
| `polski_nutrients` | Nutritional values | JSON |
| `polski_ingredients` | Ingredients list | Text |
| `polski_allergens` | Allergens | Slugs separated by commas |
| `polski_nutri_score` | Nutri-Score | Letter A-E |
| `polski_alcohol_content` | Alcohol content | Number (e.g. `5.0`) |
| `polski_country_of_origin` | Country of origin | Text |

Example:

```csv
"Orange juice 1L",'{"energy_kj":180,"energy_kcal":43,"fat":0.1,"carbohydrates":9.8,"sugars":8.4,"protein":0.7,"salt":0.01}',,"",B,,Spain
```

## Schema.org compatibility

The module automatically generates Schema.org-compliant structured data:

```json
{
    "@type": "Product",
    "additionalProperty": [
        {
            "@type": "PropertyValue",
            "name": "Energy value",
            "value": "250 kcal / 1046 kJ"
        }
    ],
    "hasAllergen": ["gluten", "milk"],
    "countryOfOrigin": {
        "@type": "Country",
        "name": "Poland"
    }
}
```

## Programmatic extensions

### Adding a custom food field

```php
add_filter('polski/food/custom_fields', function (array $fields): array {
    $fields['organic_certified'] = [
        'label'   => 'Organic certificate',
        'type'    => 'select',
        'options' => [
            ''       => 'None',
            'eu_bio' => 'EU Bio',
            'demeter' => 'Demeter',
        ],
    ];

    return $fields;
});
```

### Food information display filter

```php
add_filter('polski/food/display_html', function (string $html, int $product_id): string {
    // Modify HTML before display
    return $html;
}, 10, 2);
```

## Common issues

### "Food" tab does not appear in the product editor

1. Check that the food module is enabled in settings
2. Verify that the product is not of the "external/affiliate" type (the module does not support this type)
3. Clear browser cache and reload the admin panel

### Allergens are not bolded in the ingredients list

Make sure the "Automatic allergen highlighting" option is enabled and that allergen names in the list match names in the taxonomy.

### Nutritional values display incorrectly

Check the data format - values must be numbers (with a dot as the decimal separator in the database). The plugin automatically formats the display according to Polish regional settings (comma).

## Related resources

- [Nutritional values](/en/food/nutrients/)
- [Allergens](/en/food/allergens/)
- [Nutri-Score](/en/food/nutri-score/)
- [Report an issue](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
