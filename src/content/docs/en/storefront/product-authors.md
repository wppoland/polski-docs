---
title: Product Authors
description: Product authors module in Polski for WooCommerce - the product_author taxonomy, display on the product page and listing, Schema.org Person, admin column.
---

The product authors module adds a custom `product_author` taxonomy to WooCommerce. It lets you assign creators (authors, designers, artists) to products. Ideal for bookstores, music shops, art galleries and other stores where the product's author matters to the customer.

## Enabling the module

Go to **WooCommerce > Polski > Store modules** and enable **Product authors** (module ID: `product_authors`).

Once enabled, a new **Product author** metabox appears in the product edit panel.

## The product_author taxonomy

The module registers a hierarchical `product_author` taxonomy associated with the `product` type. Each author has:

- **Name** - first and last name or pseudonym
- **Slug** - the URL-friendly version of the name
- **Description** - the author's bio (displayed on the author archive page)
- **Photo** - the author's thumbnail (term meta `_thumbnail_id`)

### Managing authors

Authors are available in **Products > Product authors**. You can add, edit and delete authors just like product categories or tags.

Assigning an author to a product is done in the product edit panel, in the **Product author** metabox on the right.

## Display on the product page

On the single product page the author is displayed below the product title (hook `woocommerce_single_product_summary`, priority 6). The following are shown:

- Author photo (48x48 px thumbnail)
- First and last name with a link to the author archive page
- Author description (optional, first paragraph)

Change the display position with a filter:

```php
add_filter('polski/product_authors/single_position', function (): array {
    return [
        'hook'     => 'woocommerce_single_product_summary',
        'priority' => 25, // after the price
    ];
});
```

Disable the display on the product page:

```php
add_filter('polski/product_authors/show_on_single', '__return_false');
```

## Display on the product listing

On category, archive and search result pages the author is displayed below the product name. Only the author's name with a link is shown.

Disable the display on the listing:

```php
add_filter('polski/product_authors/show_in_loop', '__return_false');
```

## Author archive page

Each author has their own archive page at `yourstore.com/product-author/jan-kowalski/`. The page displays:

- The author's full biography
- The author's photo
- A list of all the author's products (with pagination)

The archive template can be overridden in the theme: `woocommerce/taxonomy-product_author.php`.

## Schema.org Person

The module automatically adds Schema.org `Person` markup in JSON-LD format on the product page:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jan Kowalski",
  "description": "Polish writer, author of bestsellers.",
  "image": "https://yourstore.com/wp-content/uploads/jan-kowalski.jpg",
  "url": "https://yourstore.com/product-author/jan-kowalski/"
}
```

The `Person` markup is connected to the product through the `author` property in the `Product` schema. This helps search engines correctly identify product creators.

Disable Schema.org:

```php
add_filter('polski/product_authors/schema_enabled', '__return_false');
```

## Admin column

The module adds an **Author** column to the product list in the admin panel (**Products > All products**). The column displays the author's name with a link that filters products by that author.

The column is sortable, click the header to sort products by author.

## Filtering and searching

### Filter in the admin panel

On the product list there is a **Filter by author** dropdown next to the existing category and status filters.

### WP_Query

Search products by author in code:

```php
$query = new WP_Query([
    'post_type' => 'product',
    'tax_query' => [
        [
            'taxonomy' => 'product_author',
            'field'    => 'slug',
            'terms'    => 'jan-kowalski',
        ],
    ],
]);
```

### REST API

The taxonomy is available through the WooCommerce REST API:

```
GET /wp-json/wc/v3/products?product_author=jan-kowalski
GET /wp-json/wp/v2/product_author
```

## Import and export

During WooCommerce CSV import/export the `product_author` column is handled automatically. Use the author's name (not the slug) in the CSV file.

## CSS styling

CSS classes use the `.polski-product-author-` prefix:

- `.polski-product-author` - author container
- `.polski-product-author__image` - author photo
- `.polski-product-author__name` - author name
- `.polski-product-author__bio` - author description
- `.polski-product-author--loop` - author container on the product listing

## Troubleshooting

**The author does not display on the product** - check whether the theme supports the `woocommerce_single_product_summary` hook. Some themes override WooCommerce templates.

**The author page returns a 404** - go to **Settings > Permalinks** and click **Save changes** (flush rewrite rules).

**The author photo does not display** - make sure the photo was added in the term editor (Products > Product authors > Edit).

Report issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
