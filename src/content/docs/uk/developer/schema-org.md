---
title: Структурованi данi Schema.org
description: Автоматичнi структурованi данi JSON-LD у Polski for WooCommerce - Product, Offer, AggregateRating та iншi типи Schema.org.
---

Автоматичнi структурованi данi JSON-LD (Schema.org) на сторiнках продуктiв. Допомагають пошуковим системам вiдображати rich snippets у результатах.

## Автоматична генерацiя

Структурованi данi генеруються автоматично на сторiнках продуктiв. Не потрiбно встановлювати додатковi SEO-плагiни для обробки структурованих даних продуктiв - Polski for WooCommerce обробляє це самостiйно.

Якщо ви використовуєте SEO-плагiн (Yoast, Rank Math, SEOPress), Polski for WooCommerce iнтегрується з ним та доповнює данi замiсть iх дублювання.

## Тип Product

На кожнiй сторiнцi продукту генерується об'єкт `Product`, що мiстить:

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

### Поля Product

| Поле Schema.org          | Джерело даних                        | Обов'язкове |
| ------------------------ | ------------------------------------ | ----------- |
| `name`                   | Назва продукту WooCommerce           | Так         |
| `description`            | Короткий опис продукту               | Так         |
| `image`                  | Головне зображення + галерея         | Так         |
| `sku`                    | SKU продукту                         | Нi          |
| `gtin13` / `gtin8`       | Поле GTIN/EAN з Polski               | Нi          |
| `brand`                  | Виробник/бренд з Polski              | Нi          |
| `manufacturer`           | Данi GPSR виробника                  | Нi          |
| `countryOfOrigin`        | Краiна походження з GPSR             | Нi          |
| `category`               | Категорiя продукту                   | Нi          |
| `material`               | Атрибут "матерiал" (якщо iснує)      | Нi          |
| `color`                  | Атрибут "колiр" (якщо iснує)         | Нi          |
| `weight`                 | Вага продукту WooCommerce            | Нi          |

## Тип Offer

Кожний продукт мiстить вкладений об'єкт `Offer` з iнформацiєю про цiну та наявнiсть:

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

### Поля Offer

| Поле Schema.org              | Джерело даних                    |
| ---------------------------- | -------------------------------- |
| `price`                      | Цiна продукту                    |
| `priceCurrency`              | Валюта WooCommerce               |
| `priceValidUntil`            | Дата закiнчення акцii            |
| `availability`               | Статус наявностi                 |
| `itemCondition`              | Завжди NewCondition              |
| `seller`                     | Назва магазину з налаштувань     |
| `deliveryTime`               | Час доставки з модуля Polski     |
| `hasMerchantReturnPolicy`    | Право на вiдмову з модуля Polski |

### Зiставлення наявностi

| Статус WooCommerce  | Schema.org                        |
| -------------------- | --------------------------------- |
| `instock`            | `https://schema.org/InStock`      |
| `outofstock`         | `https://schema.org/OutOfStock`   |
| `onbackorder`        | `https://schema.org/BackOrder`    |

## Тип Offer для варiативних продуктiв

Варiативнi продукти генерують `AggregateOffer` з цiновим дiапазоном:

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

## Тип AggregateRating

Якщо продукт має вiдгуки, генерується об'єкт `AggregateRating`:

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

Данi збираються з системи вiдгукiв WooCommerce. Якщо модуль **Верифiкованi вiдгуки** активний, враховуються лише вiдгуки з пiдтвердженої покупки.

## Тип Review

Окремi вiдгуки генеруються як об'єкти `Review`:

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

## Харчовi продукти - NutritionInformation

Для продуктiв з харчового модуля генерується об'єкт `NutritionInformation`:

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

## Фiльтрацiя структурованих даних

### Модифiкацiя всього об'єкта

```php
add_filter('polski/schema/product', function (array $schema, WC_Product $product): array {
    // Додавання власного поля
    $schema['award'] = 'Produkt Roku 2025';
    return $schema;
}, 10, 2);
```

### Модифiкацiя Offer

```php
add_filter('polski/schema/offer', function (array $offer, WC_Product $product): array {
    // Додавання інформації про гарантію
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

### Вимкнення Schema.org для обраних продуктiв

```php
add_filter('polski/schema/enabled', function (bool $enabled, int $product_id): bool {
    // Вимкнути для продуктів з категорії "tymczasowe"
    if (has_term('tymczasowe', 'product_cat', $product_id)) {
        return false;
    }
    return $enabled;
}, 10, 2);
```

## Валiдацiя структурованих даних

Протестуйте структурованi данi вашого магазину за допомогою:

- [Google Rich Results Test](https://search.google.com/test/rich-results) - офiцiйний iнструмент Google
- [Schema.org Validator](https://validator.schema.org/) - валiдатор Schema.org

У режимi debug WordPress (`WP_DEBUG = true`) плагiн логує попередження про вiдсутнi обов'язковi поля Schema.org до `debug.log`.

## Iнтеграцiя з SEO-плагiнами

Polski for WooCommerce виявляє популярнi SEO-плагiни та адаптує свою поведiнку:

| Плагiн     | Поведiнка                                           |
| ---------- | --------------------------------------------------- |
| Yoast SEO  | Доповнює iснуючу схему Yoast полями Polski           |
| Rank Math  | Доповнює схему Rank Math полями Polski               |
| SEOPress   | Доповнює схему SEOPress полями Polski                |
| Немає      | Генерує повну схему самостiйно                       |

У разi конфлiкту (дублювання структурованих даних) використовуйте фiльтр:

```php
add_filter('polski/schema/standalone', '__return_false'); // Вимкнути самостійну генерацію
```

## Вирiшення проблем

**Google не вiдображає rich snippets** - rich snippets можуть з'явитися через кiлька тижнiв пiсля iндексацii. Переконайтеся, що данi проходять валiдацiю в Rich Results Test.

**Дублювання структурованих даних** - якщо iнший плагiн генерує схему Product, використовуйте фiльтр `polski/schema/standalone` для вимкнення самостiйної генерацii.

**Вiдсутнi оцiнки в Schema.org** - продукт повинен мати щонайменше 1 вiдгук з зiрковою оцiнкою.

Повiдомлення про проблеми: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ця сторінка має виключно інформаційний характер і не є юридичною консультацією. Перед впровадженням зверніться до юриста. Polski for WooCommerce - це програмне забезпечення з відкритим кодом (GPLv2), що надається без гарантій.</div>
