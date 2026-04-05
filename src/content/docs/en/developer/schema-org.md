---
title: Schema.org structured data
description: Automatic JSON-LD structured data in Polski for WooCommerce - Product, Offer, AggregateRating and other Schema.org types.
---

Polski for WooCommerce automatically generates JSON-LD structured data compliant with the Schema.org standard. This data helps search engines (Google, Bing) better understand the product page content and display rich snippets in search results.

## Automatic generation

Structured data is generated automatically on product pages. There is no need to install additional SEO plugins for product structured data - Polski for WooCommerce handles this independently.

If you use an SEO plugin (Yoast, Rank Math, SEOPress), Polski for WooCommerce integrates with it and supplements data instead of duplicating it.

## Product type

On each product page, a `Product` object is generated containing:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Premium Cotton T-shirt",
  "description": "T-shirt made from certified organic cotton, sizes S-XXL.",
  "image": [
    "https://yourstore.com/wp-content/uploads/tshirt-1.jpg",
    "https://yourstore.com/wp-content/uploads/tshirt-2.jpg"
  ],
  "sku": "TSH-001",
  "gtin13": "5901234123457",
  "brand": {
    "@type": "Brand",
    "name": "MyBrand"
  },
  "manufacturer": {
    "@type": "Organization",
    "name": "Producer XYZ Sp. z o.o.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ul. Fabryczna 1",
      "addressLocality": "Warsaw",
      "postalCode": "00-001",
      "addressCountry": "PL"
    },
    "email": "contact@xyz.pl",
    "url": "https://xyz.pl"
  },
  "countryOfOrigin": {
    "@type": "Country",
    "name": "PL"
  },
  "offers": { ... },
  "aggregateRating": { ... }
}
```

### Product fields

| Schema.org field        | Data source                          | Required |
| ---------------------- | ------------------------------------ | -------- |
| `name`                 | WooCommerce product name             | Yes      |
| `description`          | Product short description            | Yes      |
| `image`                | Main image + gallery                 | Yes      |
| `sku`                  | Product SKU                          | No       |
| `gtin13` / `gtin8`     | GTIN/EAN field from Polski           | No       |
| `brand`                | Manufacturer/brand from Polski       | No       |
| `manufacturer`         | GPSR manufacturer data               | No       |
| `countryOfOrigin`      | Country of origin from GPSR          | No       |
| `category`             | Product category                     | No       |
| `material`             | "material" attribute (if exists)     | No       |
| `color`                | "color" attribute (if exists)        | No       |
| `weight`               | WooCommerce product weight           | No       |

## Offer type

Each product contains a nested `Offer` object with price and availability information:

```json
{
  "@type": "Offer",
  "url": "https://yourstore.com/product/cotton-tshirt/",
  "price": "89.00",
  "priceCurrency": "PLN",
  "priceValidUntil": "2026-12-31",
  "availability": "https://schema.org/InStock",
  "itemCondition": "https://schema.org/NewCondition",
  "seller": {
    "@type": "Organization",
    "name": "My Store"
  },
  "shippingDetails": {
    "@type": "OfferShippingDetails",
    "deliveryTime": {
      "@type": "ShippingDeliveryTime",
      "handlingTime": {
        "@type": "QuantitativeValue",
        "minValue": 1,
        "maxValue": 2,
        "unitCode": "d"
      },
      "transitTime": {
        "@type": "QuantitativeValue",
        "minValue": 1,
        "maxValue": 3,
        "unitCode": "d"
      }
    },
    "shippingDestination": {
      "@type": "DefinedRegion",
      "addressCountry": "PL"
    }
  },
  "hasMerchantReturnPolicy": {
    "@type": "MerchantReturnPolicy",
    "merchantReturnDays": 14,
    "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
    "returnMethod": "https://schema.org/ReturnByMail"
  }
}
```

### Offer fields

| Schema.org field              | Data source                    |
| ---------------------------- | ------------------------------ |
| `price`                      | Product price                  |
| `priceCurrency`              | WooCommerce currency           |
| `priceValidUntil`            | Sale end date                  |
| `availability`               | Stock status                   |
| `itemCondition`              | Always NewCondition            |
| `seller`                     | Store name from settings       |
| `deliveryTime`               | Delivery time from Polski      |
| `hasMerchantReturnPolicy`    | Withdrawal right from Polski   |

### Availability mapping

| WooCommerce status    | Schema.org                        |
| --------------------- | --------------------------------- |
| `instock`             | `https://schema.org/InStock`      |
| `outofstock`          | `https://schema.org/OutOfStock`   |
| `onbackorder`         | `https://schema.org/BackOrder`    |

## Offer type for variable products

Variable products generate an `AggregateOffer` with a price range:

```json
{
  "@type": "AggregateOffer",
  "lowPrice": "69.00",
  "highPrice": "129.00",
  "priceCurrency": "PLN",
  "offerCount": 6,
  "availability": "https://schema.org/InStock",
  "offers": [
    {
      "@type": "Offer",
      "price": "69.00",
      "sku": "TSH-001-S",
      "availability": "https://schema.org/InStock"
    }
  ]
}
```

## AggregateRating type

If a product has reviews, an `AggregateRating` object is generated:

```json
{
  "@type": "AggregateRating",
  "ratingValue": "4.5",
  "bestRating": "5",
  "worstRating": "1",
  "ratingCount": 23,
  "reviewCount": 18
}
```

Data is collected from the WooCommerce review system. If the **Verified Reviews** module is active, only reviews from confirmed purchases are included.

## Review type

Individual reviews are generated as `Review` objects:

```json
{
  "@type": "Review",
  "author": {
    "@type": "Person",
    "name": "Jan K."
  },
  "datePublished": "2025-05-20",
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "reviewBody": "Excellent material quality, highly recommend."
}
```

## Food products - NutritionInformation

For products from the food module, a `NutritionInformation` object is generated:

```json
{
  "@type": "NutritionInformation",
  "calories": "250 kcal",
  "fatContent": "12 g",
  "saturatedFatContent": "3 g",
  "carbohydrateContent": "30 g",
  "sugarContent": "5 g",
  "proteinContent": "8 g",
  "sodiumContent": "0.8 g",
  "fiberContent": "2 g",
  "servingSize": "100 g"
}
```

## Filtering structured data

### Modifying the entire object

```php
add_filter('polski/schema/product', function (array $schema, WC_Product $product): array {
    // Add a custom field
    $schema['award'] = 'Product of the Year 2025';
    return $schema;
}, 10, 2);
```

### Modifying the Offer

```php
add_filter('polski/schema/offer', function (array $offer, WC_Product $product): array {
    // Add warranty information
    $offer['warranty'] = [
        '@type' => 'WarrantyPromise',
        'durationOfWarranty' => [
            '@type'    => 'QuantitativeValue',
            'value'    => 24,
            'unitCode' => 'MON',
        ],
    ];
    return $offer;
}, 10, 2);
```

### Disabling Schema.org for selected products

```php
add_filter('polski/schema/enabled', function (bool $enabled, int $product_id): bool {
    // Disable for products in the "temporary" category
    if (has_term('temporary', 'product_cat', $product_id)) {
        return false;
    }
    return $enabled;
}, 10, 2);
```

## Validating structured data

Test your store's structured data using:

- [Google Rich Results Test](https://search.google.com/test/rich-results) - official Google tool
- [Schema.org Validator](https://validator.schema.org/) - Schema.org validator

In WordPress debug mode (`WP_DEBUG = true`), the plugin logs warnings about missing required Schema.org fields to `debug.log`.

## Integration with SEO plugins

Polski for WooCommerce detects popular SEO plugins and adjusts its behavior:

| Plugin     | Behavior                                            |
| ---------- | --------------------------------------------------- |
| Yoast SEO  | Supplements existing Yoast schema with Polski fields|
| Rank Math  | Supplements Rank Math schema with Polski fields     |
| SEOPress   | Supplements SEOPress schema with Polski fields      |
| None       | Generates complete schema independently             |

In case of conflict (structured data duplication), use the filter:

```php
add_filter('polski/schema/standalone', '__return_false'); // Disable standalone generation
```

## Troubleshooting

**Google does not display rich snippets** - rich snippets may appear several weeks after indexing. Make sure the data passes validation in the Rich Results Test.

**Structured data duplication** - if another plugin generates Product schema, use the `polski/schema/standalone` filter to disable standalone generation.

**No ratings in Schema.org** - the product must have at least 1 review with a star rating.

Report issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
