---
title: AI Feed - visibility for AI agents
description: The AI Feed module serves singular posts, pages, and WooCommerce products as Markdown via content negotiation, so AI agents and LLM crawlers can read store content without parsing HTML.
---

AI Feed exposes store content as **Markdown** optimised for language models and shopping agents. An HTTP client sends `Accept: text/markdown` (or appends `?output_format=md` to the URL) and instead of the rendered HTML page receives clean Markdown with YAML metadata.

## Why this matters

AI agents (ChatGPT shopping, Perplexity, Gemini, custom LLM crawlers) increasingly skip HTML and ask directly for a "clean" version of the page. Traditional HTML scraping is fragile, expensive, and lossy for structured data. AI Feed flips the relationship: the store publishes a machine-readable version on the same URL as the human one.

## Enabling the module

The module is active by default after the 1.11.0 update. To disable it:

```php
add_filter('polski/ai_feed/enabled', '__return_false');
```

Settings stored in option `polski_ai_feed`:

| Key | Default | Description |
|---|---|---|
| `enabled` | `true` | Master toggle |
| `post_types` | `['post', 'page', 'product']` | Content types served as Markdown |

## How content negotiation works

Markdown is returned in two cases:

1. The `Accept` header contains `text/markdown` (with `q=0` excluded).
2. The URL contains the `?output_format=md` query argument.

In both cases the response carries:

```
Content-Type: text/markdown; charset=UTF-8
Vary: Accept
```

Regular visitors continue to receive standard HTML. Permission rules (`read_post`, password protection, drafts) are preserved.

## Discovery

Single HTML views include in `<head>`:

```html
<link rel="alternate" type="text/markdown" href="https://shop.test/product/t-shirt/?output_format=md" />
```

Crawlers and AI agents can locate the Markdown version without needing to know the URL convention.

## Admin shortcut

On the Posts, Pages, and Products list screens a **"View AI Version"** action appears next to "View" and opens the same Markdown an AI agent would see - convenient for testing and previewing.

## What a product Markdown response contains

For a WooCommerce product the response includes:

**YAML front matter**

```yaml
---
title: "Basic T-shirt"
permalink: "https://shop.test/product/t-shirt/"
sku: "TS-001"
gtin: "5901234567890"
product_type: "simple"
currency: "PLN"
price: "49,99 zł"
regular_price: "59,99 zł"
sale_price: "49,99 zł"
in_stock: "true"
on_sale: "true"
modified: "2026-04-30T12:00:00+02:00"
categories: ["T-shirts"]
---
```

**"Product details" bullet list**

- SKU and GTIN/EAN
- Gross price, regular price, sale price
- VAT tax class
- Lowest price in the last 30 days (Omnibus)
- Delivery time
- Stock quantity and availability
- Weight and dimensions
- Brand, manufacturer
- Responsible person (GPSR)

**Full product description** converted to Markdown.

## Full response example

```markdown
---
title: "Basic T-shirt"
permalink: "https://shop.test/product/t-shirt/"
sku: "TS-001"
price: "49,99 zł"
in_stock: "true"
---

# Basic T-shirt

Cotton t-shirt with classic cut.

## Product details

- **SKU:** TS-001
- **GTIN/EAN:** 5901234567890
- **Price:** 49,99 zł
- **Tax class:** Standard
- **Lowest price (last 30 days):** 45,00 zł
- **Delivery time:** 1-2 days
- **Availability:** In stock
- **Weight:** 0.2 kg

## Description

Full product description from Gutenberg blocks, including lists, tables, and headings.
```

## Developer filters

| Filter | Purpose |
|---|---|
| `polski/ai_feed/enabled` | Master toggle (bool) |
| `polski/ai_feed/post_types` | List of content types (string[]) |
| `polski/ai_feed/post_markdown` | Final Markdown for a post/page |
| `polski/ai_feed/product_markdown` | Final Markdown for a product |
| `polski/ai_feed/product_facts` | List of `[label, value]` pairs in the "Product details" section |
| `polski/ai_feed/password_required` | Markdown body when content is password protected |

### Example - register a custom CPT

```php
add_filter('polski/ai_feed/post_types', static function (array $types): array {
    $types[] = 'recipe';
    return $types;
});
```

### Example - add a custom field to product output

```php
add_filter('polski/ai_feed/product_facts', static function (array $facts, WC_Product $product): array {
    $color = $product->get_attribute('pa_color');
    if ($color !== '') {
        $facts[] = ['Color', $color];
    }
    return $facts;
}, 10, 2);
```

## FAQ

**Does this replace my theme for regular visitors?**

No. HTML is returned by default. Markdown is served only to clients that ask for it via `Accept` or the URL parameter.

**Are password-protected pages exposed?**

No. When a page requires a password, AI Feed returns a short Markdown notice instead of the full body.

**Are drafts supported?**

Yes, for users with edit rights. The "View AI Version" admin action uses preview URLs for drafts and scheduled posts.

**Can I add custom content types?**

Yes, via the `polski/ai_feed/post_types` filter. By default `post`, `page`, and `product` are supported.

**Does it work with HPOS and Block Checkout?**

Yes. The module operates at the product view layer, independently of order storage (HPOS) and checkout (Blocks).
