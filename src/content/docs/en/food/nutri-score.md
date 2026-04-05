---
title: Nutri-Score
description: Displaying the Nutri-Score A-E badge with CSS classes per level on the WooCommerce product page.
---

Nutri-Score rates nutritional quality of a product on a scale from A (best) to E (worst). In Poland it is voluntary, but increasingly popular. Polski for WooCommerce displays the Nutri-Score badge on the product page.

## What is Nutri-Score

The Nutri-Score system classifies food products based on an algorithm considering:

**Negative components (negative points):**
- energy value
- sugars
- saturated fatty acids
- salt (sodium)

**Positive components (positive points):**
- fruits, vegetables, nuts, oils (rapeseed, walnut, olive)
- fibre
- protein

Based on the point balance, the product receives a rating:

| Level | Color | Point range (solid food) | Description |
|-------|-------|--------------------------|-------------|
| A | Dark green (#038141) | -15 to -1 | Highest nutritional quality |
| B | Light green (#85BB2F) | 0 to 2 | Good nutritional quality |
| C | Yellow (#FECB02) | 3 to 10 | Average nutritional quality |
| D | Orange (#EE8100) | 11 to 18 | Low nutritional quality |
| E | Red (#E63E11) | 19 to 40 | Lowest nutritional quality |

## Configuration

### Enabling the module

Go to **WooCommerce > Settings > Polski > Food** and activate the "Nutri-Score" sub-module.

### Settings

| Setting | Default | Description |
|---------|---------|-------------|
| Enable Nutri-Score | No | Activates badge display |
| Position on product page | Below price | Where to display the badge |
| Show on listing | Yes | Whether to display on category pages |
| Badge size | Normal | `small`, `normal`, `large` |
| Badge style | Full | `full` (all letters), `compact` (only active letter) |

### Assigning Nutri-Score to a product

In the product editor, in the "Food" tab, select the Nutri-Score level from the dropdown:

- A - Highest nutritional quality
- B - Good nutritional quality
- C - Average nutritional quality
- D - Low nutritional quality
- E - Lowest nutritional quality

The plugin does not calculate Nutri-Score automatically - you must know your product's rating. For calculation, you can use the official calculator or data from the producer.

## Generated HTML

The Nutri-Score badge is rendered as a set of HTML elements with dedicated CSS classes:

```html
<div class="polski-nutri-score polski-nutri-score--active-c">
    <span class="polski-nutri-score__label">Nutri-Score</span>
    <div class="polski-nutri-score__badges">
        <span class="polski-nutri-score__badge polski-nutri-score__badge--a">A</span>
        <span class="polski-nutri-score__badge polski-nutri-score__badge--b">B</span>
        <span class="polski-nutri-score__badge polski-nutri-score__badge--c polski-nutri-score__badge--active">C</span>
        <span class="polski-nutri-score__badge polski-nutri-score__badge--d">D</span>
        <span class="polski-nutri-score__badge polski-nutri-score__badge--e">E</span>
    </div>
</div>
```

## CSS classes per level

The plugin generates CSS classes for each level, allowing full control over styling:

### Container classes

| Class | Description |
|-------|-------------|
| `.polski-nutri-score` | Main container |
| `.polski-nutri-score--active-a` | Active level A |
| `.polski-nutri-score--active-b` | Active level B |
| `.polski-nutri-score--active-c` | Active level C |
| `.polski-nutri-score--active-d` | Active level D |
| `.polski-nutri-score--active-e` | Active level E |
| `.polski-nutri-score--small` | Small size |
| `.polski-nutri-score--normal` | Normal size |
| `.polski-nutri-score--large` | Large size |

### Badge classes

| Class | Description |
|-------|-------------|
| `.polski-nutri-score__badge` | Each badge (letter) |
| `.polski-nutri-score__badge--a` | Badge A |
| `.polski-nutri-score__badge--b` | Badge B |
| `.polski-nutri-score__badge--c` | Badge C |
| `.polski-nutri-score__badge--d` | Badge D |
| `.polski-nutri-score__badge--e` | Badge E |
| `.polski-nutri-score__badge--active` | Active (selected) badge |

## Default CSS styles

The plugin includes built-in CSS styles for the Nutri-Score badge:

```css
.polski-nutri-score {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0.5em 0;
}

.polski-nutri-score__label {
    font-size: 0.75em;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #666;
    margin-bottom: 0.3em;
}

.polski-nutri-score__badges {
    display: inline-flex;
    gap: 2px;
    border-radius: 4px;
    overflow: hidden;
}

.polski-nutri-score__badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2em;
    height: 2em;
    font-weight: 700;
    font-size: 0.85em;
    color: #fff;
    opacity: 0.35;
    transition: opacity 0.2s, transform 0.2s;
}

.polski-nutri-score__badge--active {
    opacity: 1;
    transform: scale(1.15);
    border-radius: 3px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
}

/* Colors per level */
.polski-nutri-score__badge--a {
    background-color: #038141;
}

.polski-nutri-score__badge--b {
    background-color: #85BB2F;
}

.polski-nutri-score__badge--c {
    background-color: #FECB02;
    color: #333;
}

.polski-nutri-score__badge--d {
    background-color: #EE8100;
}

.polski-nutri-score__badge--e {
    background-color: #E63E11;
}

/* Sizes */
.polski-nutri-score--small .polski-nutri-score__badge {
    width: 1.5em;
    height: 1.5em;
    font-size: 0.7em;
}

.polski-nutri-score--large .polski-nutri-score__badge {
    width: 2.5em;
    height: 2.5em;
    font-size: 1em;
}
```

### Overriding styles

To customize the badge appearance in your theme, override CSS classes in the theme's `style.css` file:

```css
/* Example: square badges with rounded corners */
.polski-nutri-score__badges {
    gap: 4px;
    border-radius: 0;
}

.polski-nutri-score__badge {
    border-radius: 6px;
    width: 2.2em;
    height: 2.2em;
}

/* Example: dark theme */
.polski-nutri-score__label {
    color: #ccc;
}

.polski-nutri-score__badge {
    opacity: 0.25;
}
```

## Programmatic access

### Getting a product's Nutri-Score

```php
$nutri_score = get_post_meta($product_id, '_polski_nutri_score', true);
// Returns: 'a', 'b', 'c', 'd', 'e' or '' (empty)
```

### Setting Nutri-Score

```php
update_post_meta($product_id, '_polski_nutri_score', 'b');
```

### Badge HTML filter

```php
add_filter('polski/nutri_score/html', function (string $html, string $score, int $product_id): string {
    // Modify badge HTML
    return $html;
}, 10, 3);
```

### Conditional display

```php
add_filter('polski/nutri_score/display', function (bool $display, int $product_id): bool {
    // Hide Nutri-Score for products without filled nutritional values
    $nutrients = get_post_meta($product_id, '_polski_nutrients', true);

    if (empty($nutrients)) {
        return false;
    }

    return $display;
}, 10, 2);
```

## CSV import

| CSV column | Description | Values |
|------------|-------------|--------|
| `polski_nutri_score` | Nutri-Score level | `a`, `b`, `c`, `d`, `e` |

Example:

```csv
"Apple",a
"Potato chips",d
"Cola",e
"Natural yogurt",b
```

## Schema.org

The plugin adds Nutri-Score to the product structured data:

```json
{
    "@type": "Product",
    "additionalProperty": [
        {
            "@type": "PropertyValue",
            "name": "Nutri-Score",
            "value": "B"
        }
    ]
}
```

## Accessibility (a11y)

The Nutri-Score badge includes ARIA attributes for screen readers:

```html
<div class="polski-nutri-score" role="img" aria-label="Nutri-Score: C - average nutritional quality">
```

Each inactive badge has `aria-hidden="true"`, and the active one has `aria-current="true"`.

## Common issues

### Badge does not display

1. Check that the Nutri-Score sub-module is enabled
2. Make sure the product has a Nutri-Score level assigned
3. Verify that the plugin CSS is loaded (no conflict with optimization plugins)

### Badge colors are different than expected

The theme may override background colors. Use more specific CSS selectors or add `!important`:

```css
.polski-nutri-score__badge--a {
    background-color: #038141 !important;
}
```

### Badge is too large or too small

Change the size in settings (**WooCommerce > Settings > Polski > Food > Nutri-Score > Badge size**) or override the CSS size class.

## Related resources

- [Food products module](/en/food/food-overview/)
- [Nutritional values](/en/food/nutrients/)
- [Report an issue](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
