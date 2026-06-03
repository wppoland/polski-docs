---
title: FAQ (Frequently Asked Questions)
description: The FAQ module in Polski for WooCommerce - the polski_faq CPT, the faq_category taxonomy, a shortcode, a CSS accordion and Schema.org FAQPage.
---

The FAQ module lets you create and display a frequently asked questions section in your store. Questions are stored as a separate post type (CPT) with its own category taxonomy, which allows flexible management and display.

## Enabling the module

Go to **WooCommerce > Polski > Storefront modules** and enable **FAQ** (module ID: `faq`).

Once enabled, a new **FAQ** item appears in the admin menu with subpages for managing questions and categories.

## Admin panel

Managing FAQ questions happens under **FAQ** (`edit.php?post_type=polski_faq`). The interface works exactly like standard WordPress posts.

### Adding a question

1. Go to **FAQ > Add new**
2. Enter the question text in the title field
3. Enter the answer in the editor (the full block editor is supported)
4. Assign a FAQ category (optional)
5. Set the display order in the **Order** field (menu_order)
6. Publish

### FAQ categories

The `faq_category` taxonomy lets you group questions by topic. Manage categories under **FAQ > FAQ categories**.

Example categories:

- Orders and payments
- Delivery and returns
- Customer account
- Products

## The `[polski_faq]` shortcode

Displays a list of FAQ questions as a CSS accordion.

### Parameters

| Parameter  | Type   | Default   | Description                                       |
| ---------- | ------ | --------- | ------------------------------------------------- |
| `category` | string | (empty)   | The slug of the FAQ category to display           |
| `limit`    | int    | `-1`      | The maximum number of questions (-1 = all)        |
| `orderby`  | string | `menu_order` | The sort field: `menu_order`, `title`, `date`  |
| `order`    | string | `ASC`     | The sort direction: `ASC` or `DESC`               |

### Usage examples

Display all questions:

```html
[polski_faq]
```

Display questions from the "dostawa" category:

```html
[polski_faq category="dostawa" limit="5"]
```

Display the 10 newest questions:

```html
[polski_faq limit="10" orderby="date" order="DESC"]
```

### Usage in a PHP template

```php
echo do_shortcode('[polski_faq category="zamowienia" limit="10"]');
```

## CSS accordion

Questions are displayed as an accordion, clicking a question expands its answer. The accordion works entirely on CSS (without JavaScript), which ensures maximum performance.

The mechanism relies on the HTML `<details>` element with `<summary>`:

```html
<div class="polski-faq">
  <details class="polski-faq__item">
    <summary class="polski-faq__question">How do I place an order?</summary>
    <div class="polski-faq__answer">
      <p>To place an order, add products to the cart...</p>
    </div>
  </details>
</div>
```

### CSS classes

- `.polski-faq` - the FAQ container
- `.polski-faq__item` - a single question (the `<details>` element)
- `.polski-faq__question` - the question text (the `<summary>` element)
- `.polski-faq__answer` - the answer content
- `.polski-faq__category` - the category heading (when displayed with grouping)

### Customizing the look

```css
/* Change the background color of the active question */
.polski-faq__item[open] .polski-faq__question {
    background-color: #f0f0f0;
}

/* Change the expand icon */
.polski-faq__question::marker {
    content: "+";
}

.polski-faq__item[open] .polski-faq__question::marker {
    content: "-";
}
```

## Schema.org FAQPage

The module automatically generates Schema.org `FAQPage` markup in JSON-LD format on pages that contain the `[polski_faq]` shortcode:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I place an order?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To place an order, add products to the cart..."
      }
    },
    {
      "@type": "Question",
      "name": "What is the delivery time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The standard delivery time is 2-3 business days..."
      }
    }
  ]
}
```

FAQPage markup lets Google display questions and answers directly in search results (rich snippets).

Disable Schema.org:

```php
add_filter('polski/faq/schema_enabled', '__return_false');
```

## Hooks

### Filters

```php
// Change the FAQ query arguments
add_filter('polski/faq/query_args', function (array $args): array {
    $args['posts_per_page'] = 20;
    return $args;
});

// Modify the answer HTML before display
add_filter('polski/faq/answer_html', function (string $html, int $post_id): string {
    return wp_kses_post($html);
}, 10, 2);
```

### Actions

```php
// Add a custom element before the FAQ section
add_action('polski/faq/before', function (): void {
    echo '<h2>Have questions? Here are the answers:</h2>';
});

// Add a custom element after the FAQ section
add_action('polski/faq/after', function (): void {
    echo '<p>Did not find an answer? <a href="/kontakt">Contact us</a>.</p>';
});
```

## Troubleshooting

**The shortcode shows an empty container** - check that you have published FAQ questions. Drafts and scheduled posts are not displayed.

**The accordion does not work** - make sure the theme does not block the `<details>` element. Some CSS reset stylesheets can hide this element.

**Schema.org does not appear** - verify the markup with the [Google Rich Results Test](https://search.google.com/test/rich-results). Make sure the shortcode is on the page (not in a sidebar widget).

Reporting issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
