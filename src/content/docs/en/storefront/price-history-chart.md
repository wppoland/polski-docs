---
title: Price history chart
description: Price history chart module in Polski for WooCommerce - an SVG sparkline chart showing a product's price changes over time.
---

The price history chart visualizes a product's price changes as a compact SVG sparkline chart. Customers can see how the price changed over a chosen period (30, 90 or 180 days), which builds transparency and trust in promotions.

## Enabling the module

Go to **WooCommerce > Polski > Store modules** and enable **Price history chart**. The chart appears automatically on product pages that have a saved price history.

:::caution[Requirement]
The module requires the **Omnibus** module (Omnibus directive) to be enabled, as it saves the price history in the database. Without it, the chart will have no data to display.
:::

## Features

- Sparkline chart rendered as SVG (no dependency on JS libraries)
- Configurable periods: 30, 90 or 180 days
- Display of the minimum and maximum price in the period
- Gradient fill below the chart line
- Dot indicating the current price
- Chart colors configurable in the settings
- Automatic data retrieval from the Omnibus repository

## Settings

Configuration in **WooCommerce > Polski > Store modules > Price history chart**.

| Setting | Default | Description |
|---|---|---|
| `days` | `30` | Chart period in days: `30`, `90` or `180` |
| `show_min_max` | `true` | Display the minimum and maximum price below the chart |
| `color` | `#2563eb` | Color of the chart line and gradient |

Database option: `polski_price_history`.

## Chart appearance

The chart consists of the following elements:

- **Line** - the price trend over time (SVG stroke)
- **Gradient** - semi-transparent fill from the line to the bottom of the chart
- **Dot** - the product's current price (the last point on the chart)
- **Min/Max** - labels with the minimum and maximum price (optional)

The chart size adapts to its container. The default height is 60px.

## Technical details

### Data source

The chart retrieves data from the `OmnibusPriceRepository` class, which stores the history of price changes required by the Omnibus directive. Each data point contains a date and a product price.

For variable products the chart is generated for the currently selected variation (updated via JavaScript after a variation change).

### SVG rendering

The chart is rendered server-side as inline SVG, no external libraries, no HTTP requests, no JavaScript for drawing. As a result the chart:

- Displays instantly (no flash of unstyled content)
- Is accessible to screen readers (aria-label)
- Does not affect Core Web Vitals

### Hooks

```php
// Change the chart period dynamically
add_filter('polski/price_history/days', function (int $days, int $product_id): int {
    // Longer period for seasonal products
    if (has_term('seasonal', 'product_cat', $product_id)) {
        return 180;
    }
    return $days;
}, 10, 2);

// Change the chart position on the product page
add_filter('polski/price_history/hook', function (): string {
    return 'woocommerce_single_product_summary'; // default: woocommerce_product_meta_start
});

// Change the hook priority
add_filter('polski/price_history/hook_priority', function (): int {
    return 25;
});

// Filter the chart data
add_filter('polski/price_history/data', function (array $prices, int $product_id): array {
    return $prices;
}, 10, 2);
```

### CSS classes

- `.polski-price-history` - main container
- `.polski-price-history__chart` - SVG element
- `.polski-price-history__label` - min/max labels
- `.polski-price-history__min` - minimum price
- `.polski-price-history__max` - maximum price

```css
.polski-price-history {
    margin: 1rem 0;
    padding: 0.75rem;
    background: #f9fafb;
    border-radius: 0.5rem;
}
```

### Module ID

`price_history_chart`

## Troubleshooting

**The chart does not display** - check whether the Omnibus module is enabled and whether the product has a saved price history. New products will not have a chart until their first price change.

**The chart is empty/flat** - if the price did not change during the chosen period, the chart shows a flat line. This is correct behavior.

**The chart colors do not match the theme** - change the color in the module settings or override it in CSS: `.polski-price-history__chart path { stroke: #your-color; }`.

Report issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
