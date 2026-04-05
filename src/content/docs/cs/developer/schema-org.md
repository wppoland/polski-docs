---
title: Strukturovana data Schema.org
description: Automaticka strukturovana data JSON-LD v Polski for WooCommerce - Product, Offer, AggregateRating a dalsi typy Schema.org.
---

Automaticka strukturovana data JSON-LD (Schema.org) na strankach produktu. Pomahaji vyhledavacum zobrazovat rich snippets ve vysledcich.

## Automaticke generovani

Strukturovana data jsou generovana automaticky na strankach produktu. Neni treba instalovat dalsi SEO pluginy pro obsluhu strukturovanych dat produktu - Polski for WooCommerce to zvlada samostatne.

Pokud pouzivate SEO plugin (Yoast, Rank Math, SEOPress), Polski for WooCommerce se s nim integruje a doplnuje data misto jejich duplikace.

## Typ Product

Na kazde strance produktu je generovan objekt `Product` obsahujici nazev, popis, obrazky, SKU, GTIN, znacku, vyrobce, zemi puvodu, nabidku a hodnoceni.

## Typ Offer

Kazdy produkt obsahuje vnoreny objekt `Offer` s informacemi o cene, dostupnosti, dodani a zasadach vraceni.

### Mapovani dostupnosti

| Stav WooCommerce | Schema.org |
| ------------------- | --------------------------------- |
| `instock` | `https://schema.org/InStock` |
| `outofstock` | `https://schema.org/OutOfStock` |
| `onbackorder` | `https://schema.org/BackOrder` |

## Typ AggregateRating

Pokud ma produkt recenze, je generovan objekt `AggregateRating` s prumernym hodnocenim a poctem recenzi.

## Typ Review

Jednotlive recenze jsou generovany jako objekty `Review`.

## Potraviny - NutritionInformation

Pro produkty z modulu potravin je generovan objekt `NutritionInformation`.

## Filtrovani strukturovanych dat

### Uprava celeho objektu

```php
add_filter('polski/schema/product', function (array $schema, WC_Product $product): array {
    $schema['award'] = 'Produkt roku 2025';
    return $schema;
}, 10, 2);
```

### Uprava Offer

```php
add_filter('polski/schema/offer', function (array $offer, WC_Product $product): array {
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

### Deaktivace Schema.org pro vybrane produkty

```php
add_filter('polski/schema/enabled', function (bool $enabled, int $product_id): bool {
    if (has_term('tymczasowe', 'product_cat', $product_id)) {
        return false;
    }
    return $enabled;
}, 10, 2);
```

## Validace strukturovanych dat

Otestujte strukturovana data vaseho obchodu pomoci:

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

## Integrace s SEO pluginy

| Plugin | Chovani |
| ---------- | --------------------------------------------------- |
| Yoast SEO | Doplnuje existujici schema Yoast o pole Polski |
| Rank Math | Doplnuje schema Rank Math o pole Polski |
| SEOPress | Doplnuje schema SEOPress o pole Polski |
| Zadny | Generuje uplne schema samostatne |

V pripade konfliktu (duplikace strukturovanych dat) pouzijte filtr:

```php
add_filter('polski/schema/standalone', '__return_false'); // Deaktivace samostatneho generovani
```

## Reseni problemu

**Google nezobrazuje rich snippets** - rich snippets se mohou objevit az po nekolika tydnech od indexace. Ujistete se, ze data prochazi validaci v Rich Results Test.

**Duplikace strukturovanych dat** - pokud jiny plugin generuje schema Product, pouzijte filtr `polski/schema/standalone` k deaktivaci samostatneho generovani.

Hlaseni problemu: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
