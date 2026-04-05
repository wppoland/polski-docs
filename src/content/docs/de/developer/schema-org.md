---
title: Strukturierte Daten Schema.org
description: Automatische strukturierte JSON-LD-Daten in Polski for WooCommerce - Product, Offer, AggregateRating und weitere Schema.org-Typen.
---

Automatische strukturierte JSON-LD-Daten (Schema.org) auf Produktseiten. Helfen Suchmaschinen, Rich Snippets in den Ergebnissen anzuzeigen.

## Automatische Generierung

Strukturierte Daten werden automatisch auf Produktseiten generiert. Es muessen keine zusaetzlichen SEO-Plugins fuer die Handhabung von Produkt-Strukturdaten installiert werden - Polski for WooCommerce uebernimmt dies eigenstaendig.

Wenn Sie ein SEO-Plugin verwenden (Yoast, Rank Math, SEOPress), integriert sich Polski for WooCommerce damit und ergaenzt die Daten, statt sie zu duplizieren.

## Typ Product

Auf jeder Produktseite wird ein `Product`-Objekt generiert mit Feldern wie `name`, `description`, `image`, `sku`, `gtin13`, `brand`, `manufacturer`, `countryOfOrigin`, `offers` und `aggregateRating`.

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Premium Baumwoll-T-Shirt",
  "sku": "KSZ-001",
  "gtin13": "5901234123457",
  "brand": {
    "@type": "Brand",
    "name": "MeineMarke"
  },
  "manufacturer": {
    "@type": "Organization",
    "name": "Hersteller XYZ Sp. z o.o.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ul. Fabryczna 1",
      "addressLocality": "Warszawa",
      "postalCode": "00-001",
      "addressCountry": "PL"
    }
  }
}
```

## Typ Offer

Jedes Produkt enthaelt ein verschachteltes `Offer`-Objekt mit Preis-, Verfuegbarkeits-, Versand- und Rueckgabeinformationen, einschliesslich `deliveryTime` und `hasMerchantReturnPolicy`.

## Variable Produkte - AggregateOffer

Variable Produkte generieren `AggregateOffer` mit Preisspanne (`lowPrice`, `highPrice`, `offerCount`).

## Typ AggregateRating

Wenn ein Produkt Bewertungen hat, wird ein `AggregateRating`-Objekt generiert. Wenn das Modul **Verifizierte Bewertungen** aktiv ist, werden nur Bewertungen aus bestaetigten Kaeufen beruecksichtigt.

## Lebensmittel - NutritionInformation

Fuer Produkte aus dem Lebensmittelmodul wird ein `NutritionInformation`-Objekt generiert mit `calories`, `fatContent`, `carbohydrateContent`, `proteinContent` usw.

## Filterung der strukturierten Daten

### Gesamtes Objekt aendern

```php
add_filter('polski/schema/product', function (array $schema, WC_Product $product): array {
    $schema['award'] = 'Produkt des Jahres 2025';
    return $schema;
}, 10, 2);
```

### Offer aendern

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

### Schema.org fuer bestimmte Produkte deaktivieren

```php
add_filter('polski/schema/enabled', function (bool $enabled, int $product_id): bool {
    if (has_term('tymczasowe', 'product_cat', $product_id)) {
        return false;
    }
    return $enabled;
}, 10, 2);
```

## Integration mit SEO-Plugins

| Plugin    | Verhalten                                          |
| ---------- | --------------------------------------------------- |
| Yoast SEO  | Ergaenzt vorhandenes Yoast-Schema um Polski-Felder    |
| Rank Math  | Ergaenzt Rank-Math-Schema um Polski-Felder           |
| SEOPress   | Ergaenzt SEOPress-Schema um Polski-Felder            |
| Keines       | Generiert vollstaendiges Schema eigenstaendig                 |

Bei Konflikten (Duplikation strukturierter Daten):

```php
add_filter('polski/schema/standalone', '__return_false'); // Eigenstaendige Generierung deaktivieren
```

## Fehlerbehebung

**Google zeigt keine Rich Snippets** - Rich Snippets koennen einige Wochen nach der Indexierung erscheinen. Stellen Sie sicher, dass die Daten die Validierung im Rich Results Test bestehen.

**Duplikation strukturierter Daten** - wenn ein anderes Plugin Product-Schema generiert, verwenden Sie den Filter `polski/schema/standalone` zum Deaktivieren der eigenstaendigen Generierung.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
