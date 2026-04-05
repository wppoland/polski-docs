---
title: Allergens
description: Allergen declaration using the polski_allergen taxonomy, automatic highlighting in ingredients and display shortcode in WooCommerce.
---

EU regulations require labeling 14 allergens on food product labels. In an online store, allergen information must be visible before purchase. Polski for WooCommerce handles allergens through a WordPress taxonomy.

## 14 main allergens

According to Annex II of the FIC Regulation, mandatory declaration covers:

| No | Allergen | Taxonomy slug | Icon |
|----|----------|---------------|------|
| 1 | Cereals containing gluten | `gluten` | gluten |
| 2 | Crustaceans | `crustaceans` | crustaceans |
| 3 | Eggs | `eggs` | eggs |
| 4 | Fish | `fish` | fish |
| 5 | Peanuts | `peanuts` | peanuts |
| 6 | Soybeans | `soy` | soy |
| 7 | Milk (lactose) | `milk` | milk |
| 8 | Nuts | `nuts` | nuts |
| 9 | Celery | `celery` | celery |
| 10 | Mustard | `mustard` | mustard |
| 11 | Sesame seeds | `sesame` | sesame |
| 12 | Sulphur dioxide and sulphites | `sulphites` | sulphites |
| 13 | Lupin | `lupin` | lupin |
| 14 | Molluscs | `molluscs` | molluscs |

## The polski_allergen taxonomy

The plugin registers the `polski_allergen` taxonomy associated with the `product` post type. During plugin activation, the taxonomy is automatically populated with the 14 main allergens.

### Managing allergens

Go to **Products > Allergens** to manage the allergen list. The default 14 allergens are created automatically. You can add custom allergens specific to your product range.

Each allergen contains:

| Field | Description |
|-------|-------------|
| Name | Displayed allergen name (e.g. "Milk and dairy products") |
| Slug | URL identifier (e.g. `milk`) |
| Description | Additional information about the allergen |
| Icon | Optional icon (taxonomy thumbnail) |

### Assigning allergens to a product

In the product editor, in the "Food" tab or in the "Allergens" side panel, check the appropriate allergens from the checkbox list.

Three declaration modes are available:

| Mode | Description | Example |
|------|-------------|---------|
| Contains | Product contains the allergen | "Contains: milk, eggs" |
| May contain | Cross-contamination risk | "May contain: nuts" |
| Does not contain | Explicit absence declaration (optional) | "Does not contain: gluten" |

### "May contain" mode

The "May contain" mode is used to indicate the risk of trace amounts of an allergen resulting from production processes. In the product editor, each allergen can be marked as:

- **Contains** - allergen is a product ingredient
- **May contain** - risk of trace amounts

## Configuration

Go to **WooCommerce > Settings > Polski > Food** and configure the "Allergens" section.

| Setting | Default | Description |
|---------|---------|-------------|
| Enable allergen declaration | Yes | Activates the allergen system |
| Highlight in ingredients | Yes | Automatic bolding of allergens in the ingredients list |
| Show icons | No | Display allergen icons |
| Position on page | Food tab | Where to display allergens |
| "May contain" mode | Yes | Enables the trace amounts declaration option |
| Display format | List | `list`, `icons`, `inline` |

## Automatic highlighting in ingredients

According to Article 21 of the FIC Regulation, allergens in the ingredients list must be highlighted - usually by bolding or using capital letters. The plugin automatically searches for allergen names in the "Ingredients" field and wraps them in a `<strong>` tag.

Example:

Input text:
```
Wheat flour, sugar, butter, chicken eggs, skimmed milk powder, salt
```

Displayed text:
```
Wheat flour (gluten), sugar, butter (milk), chicken eggs, skimmed milk powder, salt
```

With HTML highlighting:
```html
<strong>Wheat</strong> flour (<strong>gluten</strong>), sugar, butter (<strong>milk</strong>), 
<strong>eggs</strong>, <strong>milk</strong> powder, salt
```

### Highlighting configuration

The plugin searches the ingredients list for allergen synonyms. The synonym list is configurable:

```php
add_filter('polski/allergens/synonyms', function (array $synonyms): array {
    $synonyms['gluten'] = ['pszenica', 'pszenna', 'żyto', 'żytnia', 'owies', 'owsiana', 'jęczmień', 'orkisz'];
    $synonyms['milk'] = ['mleko', 'mleczny', 'mleczna', 'masło', 'śmietana', 'jogurt', 'ser', 'laktoza'];
    $synonyms['eggs'] = ['jaja', 'jajka', 'jajeczny', 'jajeczna'];

    return $synonyms;
});
```

## Shortcode

Use the shortcode `[polski_allergens]` to display the allergen declaration.

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `product_id` | int | current | Product ID |
| `format` | string | `list` | Format: `list`, `icons`, `inline`, `table` |
| `show_may_contain` | bool | `true` | Whether to display the "May contain" section |
| `show_icons` | bool | `false` | Whether to display allergen icons |
| `label` | string | `"Allergens: "` | Label before the list |
| `wrapper` | string | `div` | Wrapping HTML element |

### Usage examples

Basic allergen list:

```html
[polski_allergens]
```

Result:
```
Allergens: milk, eggs, gluten
May contain: nuts
```

Inline format with icons:

```html
[polski_allergens format="inline" show_icons="true"]
```

Without "May contain" section:

```html
[polski_allergens show_may_contain="false"]
```

Table format:

```html
[polski_allergens format="table"]
```

For a specific product:

```html
[polski_allergens product_id="456"]
```

In a PHP template:

```php
echo do_shortcode('[polski_allergens product_id="' . $product->get_id() . '"]');
```

## Programmatic access

### Getting product allergens

```php
// "Contains" allergens
$allergens = wp_get_object_terms($product_id, 'polski_allergen');

foreach ($allergens as $allergen) {
    echo $allergen->name; // e.g. "Milk and dairy products"
}

// "May contain" allergens
$may_contain = get_post_meta($product_id, '_polski_may_contain_allergens', true);
if ($may_contain) {
    $may_contain_terms = get_terms([
        'taxonomy' => 'polski_allergen',
        'slug'     => $may_contain,
    ]);
}
```

### Assigning allergens programmatically

```php
// Setting "Contains" allergens
wp_set_object_terms($product_id, ['gluten', 'milk', 'eggs'], 'polski_allergen');

// Setting "May contain" allergens
update_post_meta($product_id, '_polski_may_contain_allergens', ['nuts', 'soy']);
```

### Checking if a product contains an allergen

```php
if (has_term('gluten', 'polski_allergen', $product_id)) {
    // Product contains gluten
}
```

## CSV import

Allergens can be imported via CSV:

| CSV column | Description | Format |
|------------|-------------|--------|
| `polski_allergens` | "Contains" allergens | Slugs separated by commas |
| `polski_may_contain` | "May contain" allergens | Slugs separated by commas |

Example:

```csv
"Butter cookies","gluten,milk,eggs","nuts,soy"
"Orange juice","",""
```

## CSS styling

```css
.polski-allergens {
    margin: 1em 0;
    padding: 0.8em;
    background: #fff3e0;
    border: 1px solid #ffcc02;
    border-radius: 4px;
}

.polski-allergens__label {
    font-weight: 700;
    color: #e65100;
}

.polski-allergens__list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
}

.polski-allergens__item {
    display: inline-flex;
    align-items: center;
    gap: 0.3em;
    padding: 0.2em 0.6em;
    background: #fff;
    border: 1px solid #ffcc02;
    border-radius: 3px;
    font-size: 0.9em;
}

.polski-allergens__may-contain {
    margin-top: 0.5em;
    font-style: italic;
    color: #666;
}

.polski-allergens__icon {
    width: 20px;
    height: 20px;
}
```

## Common issues

### Allergens do not display on the product page

1. Check that the allergens module is enabled
2. Make sure the product has allergens assigned in the editor
3. Verify that the `polski_allergen` taxonomy is correctly registered (Products > Allergens)

### Automatic highlighting does not work

1. Check that the "Highlight in ingredients" option is enabled
2. Make sure allergen names or their synonyms match the text in the ingredients list
3. Extend the synonym list with the `polski/allergens/synonyms` filter

### Default allergens missing after activation

If the 14 allergens list was not created automatically, go to **WooCommerce > Settings > Polski > Food** and click "Create default allergens".

## Related resources

- [Food products module](/en/food/food-overview/)
- [Nutritional values](/en/food/nutrients/)
- [Report an issue](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
