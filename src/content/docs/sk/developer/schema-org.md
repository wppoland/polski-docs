---
title: Štrukturované údaje Schema.org
description: Automatické štrukturované údaje JSON-LD v Polski for WooCommerce - Product, Offer, AggregateRating a ďalšie typy Schema.org.
---

Automatické štrukturované údaje JSON-LD (Schema.org) na stránkach produktov. Pomáhajú vyhľadávačom zobrazovať rich snippets vo výsledkoch.

## Automatické generovanie

Údaje sa generujú automaticky na stránkach produktov. Nepotrebuješ ďalší SEO plugin.

Ak používaš Yoast, Rank Math alebo SEOPress, plugin dopĺňa ich údaje namiesto duplikovania.

## Typ Product

Na stránke produktu sa generuje objekt `Product`:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Bavlnené tričko Premium",
  "description": "Tričko z certifikovanej organickej bavlny, veľkosti S-XXL.",
  "image": [
    "https://tvojobchod.sk/wp-content/uploads/tricko-1.jpg",
    "https://tvojobchod.sk/wp-content/uploads/tricko-2.jpg"
  ],
  "sku": "TRK-001",
  "gtin13": "5901234123457",
  "brand": {
    "@type": "Brand",
    "name": "MojaZnacka"
  },
  "manufacturer": {
    "@type": "Organization",
    "name": "Výrobca XYZ s.r.o.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Továrenská 1",
      "addressLocality": "Bratislava",
      "postalCode": "811 01",
      "addressCountry": "SK"
    },
    "email": "kontakt@xyz.sk",
    "url": "https://xyz.sk"
  },
  "countryOfOrigin": {
    "@type": "Country",
    "name": "SK"
  },
  "offers": { ... },
  "aggregateRating": { ... }
}
```

### Polia Product

| Pole Schema.org        | Zdroj údajov                         | Vyžadované |
| ---------------------- | ------------------------------------ | -------- |
| `name`                 | Názov produktu WooCommerce           | Áno      |
| `description`          | Krátky popis produktu                | Áno      |
| `image`                | Hlavná fotka + galéria               | Áno      |
| `sku`                  | SKU produktu                         | Nie      |
| `gtin13` / `gtin8`     | Pole GTIN/EAN z Polski               | Nie      |
| `brand`                | Výrobca/značka z Polski              | Nie      |
| `manufacturer`         | Údaje GPSR výrobcu                   | Nie      |
| `countryOfOrigin`      | Krajina pôvodu z GPSR               | Nie      |
| `category`             | Kategória produktu                   | Nie      |
| `material`             | Atribút "materiál" (ak existuje)     | Nie      |
| `color`                | Atribút "farba" (ak existuje)        | Nie      |
| `weight`               | Hmotnosť produktu WooCommerce        | Nie      |

## Typ Offer

Vnorený objekt `Offer` s cenou a dostupnosťou:

```json
{
  "@type": "Offer",
  "url": "https://tvojobchod.sk/produkt/bavlnene-tricko/",
  "price": "8.90",
  "priceCurrency": "EUR",
  "priceValidUntil": "2026-12-31",
  "availability": "https://schema.org/InStock",
  "itemCondition": "https://schema.org/NewCondition",
  "seller": {
    "@type": "Organization",
    "name": "Môj Obchod"
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
      "addressCountry": "SK"
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

### Polia Offer

| Pole Schema.org              | Zdroj údajov                     |
| ---------------------------- | -------------------------------- |
| `price`                      | Cena produktu                    |
| `priceCurrency`              | Mena WooCommerce                 |
| `priceValidUntil`            | Dátum ukončenia akcie            |
| `availability`               | Skladový status                  |
| `itemCondition`              | Vždy NewCondition                |
| `seller`                     | Názov obchodu z nastavení        |
| `deliveryTime`               | Čas doručenia z modulu Polski    |
| `hasMerchantReturnPolicy`    | Právo na odstúpenie z modulu Polski |

### Mapovanie dostupnosti

| Status WooCommerce | Schema.org                        |
| ------------------- | --------------------------------- |
| `instock`           | `https://schema.org/InStock`      |
| `outofstock`        | `https://schema.org/OutOfStock`   |
| `onbackorder`       | `https://schema.org/BackOrder`    |

## Typ Offer pre variabilné produkty

Variabilné produkty generujú `AggregateOffer`:

```json
{
  "@type": "AggregateOffer",
  "lowPrice": "6.90",
  "highPrice": "12.90",
  "priceCurrency": "EUR",
  "offerCount": 6,
  "availability": "https://schema.org/InStock",
  "offers": [
    {
      "@type": "Offer",
      "price": "6.90",
      "sku": "TRK-001-S",
      "availability": "https://schema.org/InStock"
    }
  ]
}
```

## Typ AggregateRating

Pri produktoch s recenziami sa generuje `AggregateRating`:

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

Údaje zo systému recenzií WooCommerce. S aktívnym modulom **Overené recenzie** sa zohľadňujú len recenzie z potvrdeného nákupu.

## Typ Review

Jednotlivé recenzie sa generujú ako objekty `Review`:

```json
{
  "@type": "Review",
  "author": {
    "@type": "Person",
    "name": "Ján K."
  },
  "datePublished": "2025-05-20",
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "reviewBody": "Skvelá kvalita materiálu, odporúčam."
}
```

## Potravinárske produkty - NutritionInformation

Potravinárske produkty generujú objekt `NutritionInformation`:

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
    $schema['award'] = 'Produkt Roka 2025';
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
    // Vypni pre produkty z kategórie "dočasné"
    if (has_term('docasne', 'product_cat', $product_id)) {
        return false;
    }
    return $enabled;
}, 10, 2);
```

## Validácia štrukturovaných údajov

Otestuj štrukturované údaje:

- [Google Rich Results Test](https://search.google.com/test/rich-results) - oficiálny nástroj Google
- [Schema.org Validator](https://validator.schema.org/) - validátor Schema.org

S `WP_DEBUG = true` plugin loguje chýbajúce polia Schema.org do `debug.log`.

## Integrácia s SEO pluginmi

Plugin rozpoznáva SEO pluginy a prispôsobuje správanie:

| Plugin     | Správanie                                           |
| ---------- | --------------------------------------------------- |
| Yoast SEO  | Dopĺňa existujúcu schému Yoast o polia Polski       |
| Rank Math  | Dopĺňa schému Rank Math o polia Polski              |
| SEOPress   | Dopĺňa schému SEOPress o polia Polski               |
| Žiadny     | Generuje plnú schému samostatne                     |

Pri duplikácii údajov použi filter:

```php
add_filter('polski/schema/standalone', '__return_false'); // Vypni samostatné generovanie
```

## Riešenie problémov

**Google nezobrazuje rich snippets** - rich snippets sa môžu objaviť až po niekoľkých týždňoch od zaindexovania. Uisti sa, že údaje prejdú validáciou v Rich Results Test.

**Duplikácia štrukturovaných údajov** - ak iný plugin generuje schému Product, použi filter `polski/schema/standalone` na vypnutie samostatného generovania.

**Chýbajú hodnotenia v Schema.org** - produkt musí mať aspoň 1 recenziu s hviezdičkovým hodnotením.

Hlásenie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informatívny charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
