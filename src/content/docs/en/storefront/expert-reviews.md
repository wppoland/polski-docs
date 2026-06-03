---
title: Expert Reviews
description: A dedicated post type for expert product reviews with ratings and Schema.org.
---

The Expert Reviews module creates a separate post type (CPT) for publishing expert product reviews.

## Enabling

Go to **WooCommerce > Polski > Modules** and enable the **Expert Reviews** module in the "Storefront" section.

## Creating a review

After enabling the module, go to **Products > Expert Reviews > Add review**.

| Field | Description |
|------|------|
| Title | The review title |
| Content | The review content (WordPress editor) |
| Product | The WooCommerce product the review is assigned to |
| Rating | A rating of 1-10 (in steps of 0.5) |
| Verdict | A short verdict (e.g. "Recommended", "Best in class") |

## Display

Expert reviews appear automatically on the product page, below the description. Each review contains:

- The title and author
- A colored rating badge (green >= 8, yellow >= 5, red < 5)
- The review content
- The verdict (if set)
- The publication date

## Schema.org

The module automatically generates Schema.org `Review` markup with:
- `reviewRating` (1-10)
- `author` (Person)
- `datePublished`
- `reviewBody`

This improves visibility in search results (rich snippets).
