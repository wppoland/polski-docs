---
title: Štrukturované údaje Schema.org
description: Automatické štrukturované údaje JSON-LD v Polski for WooCommerce - Product, Offer, AggregateRating a ďalšie typy Schema.org.
---

Automatické štrukturované údaje JSON-LD (Schema.org) na stránkach produktov. Pomáhajú vyhľadávačom zobrazovať rich snippety vo výsledkoch.

## Automatické generovanie

Štrukturované údaje sú generované automaticky na stránkach produktov. Nie je potrebné inštalovať ďalšie SEO pluginy na obsluhu štrukturovaných údajov produktov - Polski for WooCommerce to obsluhuje samostatne.

Ak používate SEO plugin (Yoast, Rank Math, SEOPress), Polski for WooCommerce sa s ním integruje a dopĺňa údaje namiesto ich duplikovania.

## Typ Product

Na každej stránke produktu sa generuje objekt `Product` obsahujúci:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Koszulka bawełniana Premium",
  "description": "Koszulka z certyfikowanej bawełny organicznej, rozmiary S-XXL.",
  "image": [
    "https://tvoj-obchod.pl/wp-content/uploads/koszulka-1.jpg",
    "https://tvoj-obchod.pl/wp-content/uploads/koszulka-2.jpg"
  ],
  "sku": "KSZ-001",
  "gtin13": "5901234123457",
  "brand": {
    "@type": "Brand",
    "name": "MojaMarka"
  },
  "manufacturer": {
    "@type": "Organization",
    "name": "Producent XYZ Sp. z o.o.",
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

## Typ Offer

Každý produkt obsahuje vnorený objekt `Offer` s informáciami o cene a dostupnosti:

```json
{
  "@type": "Offer",
  "url": "https://tvoj-obchod.pl/produkt/koszulka-bawelniana/",
  "price": "89.00",
  "priceCurrency": "PLN",
  "priceValidUntil": "2026-12-31",
  "availability": "https://schema.org/InStock",
  "itemCondition": "https://schema.org/NewCondition",
  "seller": {
    "@type": "Organization",
    "name": "Môj obchod"
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

## Typ AggregateRating

Ak má produkt recenzie, generuje sa objekt `AggregateRating`:

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

## Potravinárske produkty - NutritionInformation

Pre produkty z potravinárskeho modulu sa generuje objekt `NutritionInformation`:

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

## Filtrovanie štrukturovaných údajov

### Úprava celého objektu

```php
add_filter('polski/schema/product', function (array $schema, WC_Product $product): array {
    // Pridanie vlastného poľa
    $schema['award'] = 'Produkt Roku 2025';
    return $schema;
}, 10, 2);
```

### Úprava Offer

```php
add_filter('polski/schema/offer', function (array $offer, WC_Product $product): array {
    // Pridanie informácie o záruke
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

### Vypnutie Schema.org pre vybrané produkty

```php
add_filter('polski/schema/enabled', function (bool $enabled, int $product_id): bool {
    // Vypnúť pre produkty z kategórie "dočasné"
    if (has_term('tymczasowe', 'product_cat', $product_id)) {
        return false;
    }
    return $enabled;
}, 10, 2);
```

## Integrácia s SEO pluginmi

Polski for WooCommerce rozpoznáva populárne SEO pluginy a prispôsobuje svoje správanie:

| Plugin     | Správanie                                            |
| ---------- | --------------------------------------------------- |
| Yoast SEO  | Dopĺňa existujúcu schému Yoast o polia Polski       |
| Rank Math  | Dopĺňa schému Rank Math o polia Polski              |
| SEOPress   | Dopĺňa schému SEOPress o polia Polski               |
| Žiadny     | Generuje úplnú schému samostatne                    |

V prípade konfliktu (duplikácia štrukturovaných údajov) použite filter:

```php
add_filter('polski/schema/standalone', '__return_false'); // Vypnúť samostatné generovanie
```

## Riešenie problémov

**Google nezobrazuje rich snippety** - rich snippety sa môžu objaviť po niekoľkých týždňoch od indexovania. Uistite sa, že údaje prechádzajú validáciou v Rich Results Test.

**Duplikácia štrukturovaných údajov** - ak iný plugin generuje schému Product, použite filter `polski/schema/standalone` na vypnutie samostatného generovania.

**Chýbajú hodnotenia v Schema.org** - produkt musí mať aspoň 1 recenziu s hodnotením hviezdičkami.

Nahlasovanie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
