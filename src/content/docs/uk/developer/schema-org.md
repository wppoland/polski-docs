---
title: Структуровані дані Schema.org
description: Автоматичні структуровані дані JSON-LD у Polski for WooCommerce - Product, Offer, AggregateRating та інші типи Schema.org.
---

Автоматичні структуровані дані JSON-LD (Schema.org) на сторінках товарів. Допомагають пошуковим системам відображати rich snippets у результатах.

## Автоматична генерація

Дані генеруються автоматично на сторінках товарів. Вам не потрібен додатковий SEO-плагін.

Якщо ви використовуєте Yoast, Rank Math або SEOPress, плагін доповнює їхні дані замість дублювати.

## Тип Product

На сторінці товару генерується об'єкт `Product`:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Бавовняна футболка Premium",
  "description": "Футболка із сертифікованої органічної бавовни, розміри S-XXL.",
  "image": [
    "https://tvijmagazyn.pl/wp-content/uploads/koszulka-1.jpg",
    "https://tvijmagazyn.pl/wp-content/uploads/koszulka-2.jpg"
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

| Поле Schema.org        | Джерело даних                        | Обов'язкове |
| ---------------------- | ------------------------------------ | -------- |
| `name`                 | Назва товару WooCommerce             | Так      |
| `description`          | Короткий опис товару                 | Так      |
| `image`                | Головне зображення + галерея         | Так      |
| `sku`                  | SKU товару                           | Ні       |
| `gtin13` / `gtin8`     | Поле GTIN/EAN з Polski               | Ні       |
| `brand`                | Виробник/марка з Polski              | Ні       |
| `manufacturer`         | Дані GPSR виробника                  | Ні       |
| `countryOfOrigin`      | Країна походження з GPSR             | Ні       |
| `category`             | Категорія товару                     | Ні       |
| `material`             | Атрибут "матеріал" (якщо існує)      | Ні       |
| `color`                | Атрибут "колір" (якщо існує)         | Ні       |
| `weight`               | Вага товару WooCommerce              | Ні       |

## Тип Offer

Вкладений об'єкт `Offer` з ціною та наявністю:

```json
{
  "@type": "Offer",
  "url": "https://tvijmagazyn.pl/produkt/koszulka-bawelniana/",
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
| `price`                      | Ціна товару                      |
| `priceCurrency`              | Валюта WooCommerce               |
| `priceValidUntil`            | Дата завершення акції            |
| `availability`               | Складський статус                |
| `itemCondition`              | Завжди NewCondition              |
| `seller`                     | Назва магазину з налаштувань     |
| `deliveryTime`               | Час доставки з модуля Polski     |
| `hasMerchantReturnPolicy`    | Право на відмову з модуля Polski |

### Зіставлення наявності

| Статус WooCommerce | Schema.org                        |
| ------------------- | --------------------------------- |
| `instock`           | `https://schema.org/InStock`      |
| `outofstock`        | `https://schema.org/OutOfStock`   |
| `onbackorder`       | `https://schema.org/BackOrder`    |

## Тип Offer для змінних товарів

Змінні товари генерують `AggregateOffer`:

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

Для товарів з відгуками генерується `AggregateRating`:

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

Дані із системи відгуків WooCommerce. З активним модулем **Перевірені відгуки** враховуються лише відгуки з підтвердженої покупки.

## Тип Review

Окремі відгуки генеруються як об'єкти `Review`:

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
  "reviewBody": "Чудова якість матеріалу, рекомендую."
}
```

## Харчові продукти - NutritionInformation

Харчові продукти генерують об'єкт `NutritionInformation`:

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

## Фільтрування структурованих даних

### Зміна всього об'єкта

```php
add_filter('polski/schema/product', function (array $schema, WC_Product $product): array {
    // Додавання власного поля
    $schema['award'] = 'Товар Року 2025';
    return $schema;
}, 10, 2);
```

### Зміна Offer

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

### Вимкнення Schema.org для обраних товарів

```php
add_filter('polski/schema/enabled', function (bool $enabled, int $product_id): bool {
    // Вимкнути для товарів з категорії "тимчасові"
    if (has_term('tymczasowe', 'product_cat', $product_id)) {
        return false;
    }
    return $enabled;
}, 10, 2);
```

## Валідація структурованих даних

Перевірте структуровані дані:

- [Google Rich Results Test](https://search.google.com/test/rich-results) - офіційний інструмент Google
- [Schema.org Validator](https://validator.schema.org/) - валідатор Schema.org

З `WP_DEBUG = true` плагін логує відсутні поля Schema.org до `debug.log`.

## Інтеграція з SEO-плагінами

Плагін виявляє SEO-плагіни та адаптує поведінку:

| Плагін     | Поведінка                                           |
| ---------- | --------------------------------------------------- |
| Yoast SEO  | Доповнює наявну схему Yoast полями Polski            |
| Rank Math  | Доповнює схему Rank Math полями Polski               |
| SEOPress   | Доповнює схему SEOPress полями Polski                |
| Немає      | Генерує повну схему самостійно                       |

У разі дублювання даних використайте фільтр:

```php
add_filter('polski/schema/standalone', '__return_false'); // Вимкнути самостійну генерацію
```

## Усунення несправностей

**Google не відображає rich snippets** - rich snippets можуть з'явитися через кілька тижнів після індексації. Переконайтеся, що дані проходять валідацію в Rich Results Test.

**Дублювання структурованих даних** - якщо інший плагін генерує схему Product, використайте фільтр `polski/schema/standalone`, щоб вимкнути самостійну генерацію.

**Немає оцінок у Schema.org** - товар повинен мати щонайменше 1 відгук із зірковою оцінкою.

Повідомлення про проблеми: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ця сторінка має виключно інформаційний характер і не є юридичною консультацією. Перед впровадженням проконсультуйтеся з юристом. Polski for WooCommerce є програмним забезпеченням з відкритим кодом (GPLv2), що надається без гарантій.</div>
