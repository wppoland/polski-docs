---
title: Strukturovaná data Schema.org
description: Automatická strukturovaná data JSON-LD v Polski for WooCommerce - Product, Offer, AggregateRating a další typy Schema.org.
---

Automatická strukturovaná data JSON-LD (Schema.org) na stránkách produktů. Pomáhají vyhledávačům zobrazovat rich snippets ve výsledcích.

## Automatické generování

Data se generují automaticky na stránkách produktů. Nepotřebujete žádný další SEO plugin.

Pokud používáte Yoast, Rank Math nebo SEOPress, plugin doplňuje jejich data místo aby je duplikoval.

## Typ Product

Na stránce produktu je generován objekt `Product`:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Bavlněné tričko Premium",
  "description": "Tričko z certifikované organické bavlny, velikosti S-XXL.",
  "image": [
    "https://twojsklep.pl/wp-content/uploads/koszulka-1.jpg",
    "https://twojsklep.pl/wp-content/uploads/koszulka-2.jpg"
  ],
  "sku": "KSZ-001",
  "gtin13": "5901234123457",
  "brand": {
    "@type": "Brand",
    "name": "MojeZnacka"
  },
  "manufacturer": {
    "@type": "Organization",
    "name": "Výrobce XYZ s.r.o.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ul. Fabryczna 1",
      "addressLocality": "Warszawa",
      "postalCode": "00-001",
      "addressCountry": "PL"
    },
    "email": "kontakt@xyz.pl",
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

### Pole Product

| Pole Schema.org        | Zdroj dat                            | Povinné  |
| ---------------------- | ------------------------------------ | -------- |
| `name`                 | Název produktu WooCommerce           | Ano      |
| `description`          | Krátký popis produktu                | Ano      |
| `image`                | Hlavní obrázek + galerie             | Ano      |
| `sku`                  | SKU produktu                         | Ne       |
| `gtin13` / `gtin8`     | Pole GTIN/EAN z Polski               | Ne       |
| `brand`                | Výrobce/značka z Polski              | Ne       |
| `manufacturer`         | Data GPSR výrobce                    | Ne       |
| `countryOfOrigin`      | Země původu z GPSR                   | Ne       |
| `category`             | Kategorie produktu                   | Ne       |
| `material`             | Atribut "materiál" (pokud existuje)  | Ne       |
| `color`                | Atribut "barva" (pokud existuje)     | Ne       |
| `weight`               | Hmotnost produktu WooCommerce        | Ne       |

## Typ Offer

Vnořený objekt `Offer` s cenou a dostupností:

```json
{
  "@type": "Offer",
  "url": "https://twojsklep.pl/produkt/koszulka-bawelniana/",
  "price": "89.00",
  "priceCurrency": "PLN",
  "priceValidUntil": "2026-12-31",
  "availability": "https://schema.org/InStock",
  "itemCondition": "https://schema.org/NewCondition",
  "seller": {
    "@type": "Organization",
    "name": "Můj Obchod"
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

### Pole Offer

| Pole Schema.org              | Zdroj dat                        |
| ---------------------------- | -------------------------------- |
| `price`                      | Cena produktu                    |
| `priceCurrency`              | Měna WooCommerce                 |
| `priceValidUntil`            | Datum ukončení akce              |
| `availability`               | Skladový stav                    |
| `itemCondition`              | Vždy NewCondition                |
| `seller`                     | Název obchodu z nastavení        |
| `deliveryTime`               | Doba dodání z modulu Polski      |
| `hasMerchantReturnPolicy`    | Právo na odstoupení z modulu Polski |

### Mapování dostupnosti

| Stav WooCommerce    | Schema.org                        |
| ------------------- | --------------------------------- |
| `instock`           | `https://schema.org/InStock`      |
| `outofstock`        | `https://schema.org/OutOfStock`   |
| `onbackorder`       | `https://schema.org/BackOrder`    |

## Typ Offer pro variabilní produkty

Variabilní produkty generují `AggregateOffer`:

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
      "sku": "KSZ-001-S",
      "availability": "https://schema.org/InStock"
    }
  ]
}
```

## Typ AggregateRating

U produktů s recenzemi je generován `AggregateRating`:

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

Data ze systému recenzí WooCommerce. S aktivním modulem **Ověřené recenze** jsou zahrnuty pouze recenze z potvrzeného nákupu.

## Typ Review

Jednotlivé recenze jsou generovány jako objekty `Review`:

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
  "reviewBody": "Skvělá kvalita materiálu, doporučuji."
}
```

## Potraviny - NutritionInformation

Potravinové produkty generují objekt `NutritionInformation`:

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

## Filtrování strukturovaných dat

### Úprava celého objektu

```php
add_filter('polski/schema/product', function (array $schema, WC_Product $product): array {
    // Přidání vlastního pole
    $schema['award'] = 'Produkt roku 2025';
    return $schema;
}, 10, 2);
```

### Úprava Offer

```php
add_filter('polski/schema/offer', function (array $offer, WC_Product $product): array {
    // Přidání informace o záruce
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

### Vypnutí Schema.org pro vybrané produkty

```php
add_filter('polski/schema/enabled', function (bool $enabled, int $product_id): bool {
    // Vypni pro produkty z kategorie "dočasné"
    if (has_term('tymczasowe', 'product_cat', $product_id)) {
        return false;
    }
    return $enabled;
}, 10, 2);
```

## Validace strukturovaných dat

Otestujte strukturovaná data:

- [Google Rich Results Test](https://search.google.com/test/rich-results) - oficiální nástroj Google
- [Schema.org Validator](https://validator.schema.org/) - validátor Schema.org

S `WP_DEBUG = true` plugin loguje chybějící pole Schema.org do `debug.log`.

## Integrace se SEO pluginy

Plugin detekuje SEO pluginy a přizpůsobuje chování:

| Plugin     | Chování                                             |
| ---------- | --------------------------------------------------- |
| Yoast SEO  | Doplňuje existující schéma Yoast o pole Polski      |
| Rank Math  | Doplňuje schéma Rank Math o pole Polski             |
| SEOPress   | Doplňuje schéma SEOPress o pole Polski              |
| Žádný      | Generuje úplné schéma samostatně                    |

Při duplikaci dat použijte filtr:

```php
add_filter('polski/schema/standalone', '__return_false'); // Vypni samostatné generování
```

## Řešení problémů

**Google nezobrazuje rich snippets** - rich snippets se mohou objevit až po několika týdnech od indexace. Ujistěte se, že data prochází validací v Rich Results Test.

**Duplikace strukturovaných dat** - pokud jiný plugin generuje schéma Product, použijte filtr `polski/schema/standalone` k vypnutí samostatného generování.

**Chybí hodnocení v Schema.org** - produkt musí mít alespoň 1 recenzi s hvězdičkovým hodnocením.

Hlášení problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
