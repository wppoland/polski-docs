---
title: Dane strukturalne Schema.org
description: Automatyczne dane strukturalne JSON-LD w Polski for WooCommerce - Product, Offer, AggregateRating i inne typy Schema.org.
---

Polski for WooCommerce automatycznie generuje dane strukturalne JSON-LD zgodne ze standardem Schema.org. Dane te pomagają wyszukiwarkom (Google, Bing) lepiej zrozumieć treść strony produktu i wyświetlać rich snippets w wynikach wyszukiwania.

## Automatyczne generowanie

Dane strukturalne generowane są automatycznie na stronach produktów. Nie trzeba instalować dodatkowych wtyczek SEO do obsługi danych strukturalnych produktów - Polski for WooCommerce obsługuje to samodzielnie.

Jeśli używasz wtyczki SEO (Yoast, Rank Math, SEOPress), Polski for WooCommerce integruje się z nią i uzupełnia dane zamiast je duplikować.

## Typ Product

Na każdej stronie produktu generowany jest obiekt `Product` zawierający:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Koszulka bawełniana Premium",
  "description": "Koszulka z certyfikowanej bawełny organicznej, rozmiary S-XXL.",
  "image": [
    "https://twojsklep.pl/wp-content/uploads/koszulka-1.jpg",
    "https://twojsklep.pl/wp-content/uploads/koszulka-2.jpg"
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

### Pola Product

| Pole Schema.org        | Źródło danych                        | Wymagane |
| ---------------------- | ------------------------------------ | -------- |
| `name`                 | Nazwa produktu WooCommerce           | Tak      |
| `description`          | Opis krótki produktu                 | Tak      |
| `image`                | Zdjęcie główne + galeria             | Tak      |
| `sku`                  | SKU produktu                         | Nie      |
| `gtin13` / `gtin8`     | Pole GTIN/EAN z Polski               | Nie      |
| `brand`                | Producent/marka z Polski             | Nie      |
| `manufacturer`         | Dane GPSR producenta                 | Nie      |
| `countryOfOrigin`      | Kraj pochodzenia z GPSR              | Nie      |
| `category`             | Kategoria produktu                   | Nie      |
| `material`             | Atrybut "materiał" (jeśli istnieje)  | Nie      |
| `color`                | Atrybut "kolor" (jeśli istnieje)     | Nie      |
| `weight`               | Waga produktu WooCommerce            | Nie      |

## Typ Offer

Każdy produkt zawiera zagnieżdżony obiekt `Offer` z informacjami o cenie i dostępności:

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
    "name": "Mój Sklep"
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

### Pola Offer

| Pole Schema.org              | Źródło danych                    |
| ---------------------------- | -------------------------------- |
| `price`                      | Cena produktu                    |
| `priceCurrency`              | Waluta WooCommerce               |
| `priceValidUntil`            | Data zakończenia promocji        |
| `availability`               | Status magazynowy                |
| `itemCondition`              | Zawsze NewCondition              |
| `seller`                     | Nazwa sklepu z ustawień          |
| `deliveryTime`               | Czas dostawy z modułu Polski    |
| `hasMerchantReturnPolicy`    | Prawo odstąpienia z modułu Polski|

### Mapowanie dostępności

| Status WooCommerce | Schema.org                        |
| ------------------- | --------------------------------- |
| `instock`           | `https://schema.org/InStock`      |
| `outofstock`        | `https://schema.org/OutOfStock`   |
| `onbackorder`       | `https://schema.org/BackOrder`    |

## Typ Offer dla produktów zmiennych

Produkty zmienne generują `AggregateOffer` z zakresem cenowym:

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

Jeśli produkt ma opinie, generowany jest obiekt `AggregateRating`:

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

Dane zbierane są z systemu opinii WooCommerce. Jeśli moduł **Zweryfikowane opinie** jest aktywny, uwzględniane są tylko opinie z potwierdzonego zakupu.

## Typ Review

Poszczególne opinie generowane są jako obiekty `Review`:

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
  "reviewBody": "Świetna jakość materiału, polecam."
}
```

## Produkty spożywcze - NutritionInformation

Dla produktów z modułu spożywczego generowany jest obiekt `NutritionInformation`:

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

## Filtrowanie danych strukturalnych

### Modyfikacja całego obiektu

```php
add_filter('polski/schema/product', function (array $schema, WC_Product $product): array {
    // Dodanie własnego pola
    $schema['award'] = 'Produkt Roku 2025';
    return $schema;
}, 10, 2);
```

### Modyfikacja Offer

```php
add_filter('polski/schema/offer', function (array $offer, WC_Product $product): array {
    // Dodanie informacji o gwarancji
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

### Wyłączenie Schema.org dla wybranych produktów

```php
add_filter('polski/schema/enabled', function (bool $enabled, int $product_id): bool {
    // Wyłącz dla produktów z kategorii "tymczasowe"
    if (has_term('tymczasowe', 'product_cat', $product_id)) {
        return false;
    }
    return $enabled;
}, 10, 2);
```

## Walidacja danych strukturalnych

Przetestuj dane strukturalne swojego sklepu za pomocą:

- [Google Rich Results Test](https://search.google.com/test/rich-results) - oficjalne narzędzie Google
- [Schema.org Validator](https://validator.schema.org/) - walidator Schema.org

W trybie debug WordPressa (`WP_DEBUG = true`) wtyczka loguje ostrzeżenia o brakujących wymaganych polach Schema.org do `debug.log`.

## Integracja z wtyczkami SEO

Polski for WooCommerce wykrywa popularne wtyczki SEO i dostosowuje swoje zachowanie:

| Wtyczka    | Zachowanie                                          |
| ---------- | --------------------------------------------------- |
| Yoast SEO  | Uzupełnia istniejący schemat Yoast o pola Polski    |
| Rank Math  | Uzupełnia schemat Rank Math o pola Polski           |
| SEOPress   | Uzupełnia schemat SEOPress o pola Polski            |
| Brak       | Generuje pełny schemat samodzielnie                 |

W przypadku konfliktu (duplikacja danych strukturalnych) użyj filtra:

```php
add_filter('polski/schema/standalone', '__return_false'); // Wyłącz samodzielne generowanie
```

## Rozwiązywanie problemów

**Google nie wyświetla rich snippets** - rich snippets mogą pojawić się po kilku tygodniach od zaindeksowania. Upewnij się, że dane przechodzą walidację w Rich Results Test.

**Duplikacja danych strukturalnych** - jeśli inna wtyczka generuje schemat Product, użyj filtra `polski/schema/standalone` do wyłączenia samodzielnego generowania.

**Brak ocen w Schema.org** - produkt musi mieć co najmniej 1 opinię z oceną gwiazdkową.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
