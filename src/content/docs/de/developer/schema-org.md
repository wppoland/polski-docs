---
title: Strukturierte Daten Schema.org
description: Automatische strukturierte JSON-LD-Daten in Polski for WooCommerce - Product, Offer, AggregateRating und weitere Schema.org-Typen.
---

Automatische strukturierte JSON-LD-Daten (Schema.org) auf Produktseiten. Sie helfen Suchmaschinen, Rich Snippets in den Ergebnissen anzuzeigen.

## Automatische Generierung

Die Daten werden automatisch auf Produktseiten generiert. Du benötigst kein zusätzliches SEO-Plugin.

Wenn du Yoast, Rank Math oder SEOPress verwendest, ergänzt das Plugin deren Daten, anstatt sie zu duplizieren.

## Typ Product

Auf der Produktseite wird ein `Product`-Objekt generiert:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Premium-Baumwoll-T-Shirt",
  "description": "T-Shirt aus zertifizierter Bio-Baumwolle, Größen S-XXL.",
  "image": [
    "https://deinshop.de/wp-content/uploads/tshirt-1.jpg",
    "https://deinshop.de/wp-content/uploads/tshirt-2.jpg"
  ],
  "sku": "KSZ-001",
  "gtin13": "5901234123457",
  "brand": {
    "@type": "Brand",
    "name": "MeineMarke"
  },
  "manufacturer": {
    "@type": "Organization",
    "name": "Hersteller XYZ GmbH",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Fabrikstraße 1",
      "addressLocality": "Berlin",
      "postalCode": "10115",
      "addressCountry": "DE"
    },
    "email": "kontakt@xyz.de",
    "url": "https://xyz.de"
  },
  "countryOfOrigin": {
    "@type": "Country",
    "name": "DE"
  },
  "offers": { ... },
  "aggregateRating": { ... }
}
```

### Product-Felder

| Schema.org-Feld        | Datenquelle                          | Erforderlich |
| ---------------------- | ------------------------------------ | ------------ |
| `name`                 | Produktname von WooCommerce          | Ja           |
| `description`          | Kurzbeschreibung des Produkts        | Ja           |
| `image`                | Hauptbild + Galerie                  | Ja           |
| `sku`                  | SKU des Produkts                     | Nein         |
| `gtin13` / `gtin8`     | GTIN/EAN-Feld von Polski             | Nein         |
| `brand`                | Hersteller/Marke von Polski          | Nein         |
| `manufacturer`         | GPSR-Daten des Herstellers           | Nein         |
| `countryOfOrigin`      | Herkunftsland aus GPSR               | Nein         |
| `category`             | Produktkategorie                     | Nein         |
| `material`             | Attribut "Material" (falls vorhanden) | Nein        |
| `color`                | Attribut "Farbe" (falls vorhanden)   | Nein         |
| `weight`               | Produktgewicht von WooCommerce       | Nein         |

## Typ Offer

Verschachteltes `Offer`-Objekt mit Preis und Verfügbarkeit:

```json
{
  "@type": "Offer",
  "url": "https://deinshop.de/produkt/baumwoll-tshirt/",
  "price": "89.00",
  "priceCurrency": "PLN",
  "priceValidUntil": "2026-12-31",
  "availability": "https://schema.org/InStock",
  "itemCondition": "https://schema.org/NewCondition",
  "seller": {
    "@type": "Organization",
    "name": "Mein Shop"
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

### Offer-Felder

| Schema.org-Feld              | Datenquelle                      |
| ---------------------------- | -------------------------------- |
| `price`                      | Produktpreis                     |
| `priceCurrency`              | Währung von WooCommerce          |
| `priceValidUntil`            | Enddatum der Aktion              |
| `availability`               | Lagerstatus                      |
| `itemCondition`              | Immer NewCondition               |
| `seller`                     | Shopname aus den Einstellungen   |
| `deliveryTime`               | Lieferzeit aus dem Polski-Modul  |
| `hasMerchantReturnPolicy`    | Widerrufsrecht aus dem Polski-Modul |

### Zuordnung der Verfügbarkeit

| WooCommerce-Status  | Schema.org                        |
| ------------------- | --------------------------------- |
| `instock`           | `https://schema.org/InStock`      |
| `outofstock`        | `https://schema.org/OutOfStock`   |
| `onbackorder`       | `https://schema.org/BackOrder`    |

## Typ Offer für variable Produkte

Variable Produkte generieren `AggregateOffer`:

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

Bei Produkten mit Bewertungen wird `AggregateRating` generiert:

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

Die Daten stammen aus dem Bewertungssystem von WooCommerce. Mit aktivem Modul **Verifizierte Bewertungen** werden nur Bewertungen aus einem bestätigten Kauf berücksichtigt.

## Typ Review

Einzelne Bewertungen werden als `Review`-Objekte generiert:

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
  "reviewBody": "Hervorragende Materialqualität, empfehlenswert."
}
```

## Lebensmittelprodukte - NutritionInformation

Lebensmittelprodukte generieren ein `NutritionInformation`-Objekt:

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

## Filterung der strukturierten Daten

### Anpassung des gesamten Objekts

```php
add_filter('polski/schema/product', function (array $schema, WC_Product $product): array {
    // Hinzufügen eines eigenen Feldes
    $schema['award'] = 'Produkt des Jahres 2025';
    return $schema;
}, 10, 2);
```

### Anpassung von Offer

```php
add_filter('polski/schema/offer', function (array $offer, WC_Product $product): array {
    // Hinzufügen von Garantieinformationen
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

### Deaktivierung von Schema.org für ausgewählte Produkte

```php
add_filter('polski/schema/enabled', function (bool $enabled, int $product_id): bool {
    // Für Produkte der Kategorie "temporär" deaktivieren
    if (has_term('tymczasowe', 'product_cat', $product_id)) {
        return false;
    }
    return $enabled;
}, 10, 2);
```

## Validierung der strukturierten Daten

Teste die strukturierten Daten:

- [Google Rich Results Test](https://search.google.com/test/rich-results) - offizielles Google-Tool
- [Schema.org Validator](https://validator.schema.org/) - Schema.org-Validator

Mit `WP_DEBUG = true` protokolliert das Plugin fehlende Schema.org-Felder in `debug.log`.

## Integration mit SEO-Plugins

Das Plugin erkennt SEO-Plugins und passt sein Verhalten an:

| Plugin     | Verhalten                                           |
| ---------- | --------------------------------------------------- |
| Yoast SEO  | Ergänzt das bestehende Yoast-Schema um Polski-Felder |
| Rank Math  | Ergänzt das Rank-Math-Schema um Polski-Felder       |
| SEOPress   | Ergänzt das SEOPress-Schema um Polski-Felder        |
| Keines     | Generiert das vollständige Schema selbstständig     |

Bei doppelten Daten verwende den Filter:

```php
add_filter('polski/schema/standalone', '__return_false'); // Eigenständige Generierung deaktivieren
```

## Fehlerbehebung

**Google zeigt keine Rich Snippets an** - Rich Snippets können erst einige Wochen nach der Indexierung erscheinen. Stelle sicher, dass die Daten die Validierung im Rich Results Test bestehen.

**Duplizierung strukturierter Daten** - wenn ein anderes Plugin ein Product-Schema generiert, verwende den Filter `polski/schema/standalone`, um die eigenständige Generierung zu deaktivieren.

**Keine Bewertungen in Schema.org** - das Produkt muss mindestens eine Bewertung mit Sternebewertung haben.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
