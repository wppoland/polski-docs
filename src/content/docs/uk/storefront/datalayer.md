---
title: GA4 DataLayer / GTM
description: Модуль GA4 DataLayer у Polski for WooCommerce - події ecommerce, інтеграція з Google Tag Manager та gtag.js, налаштування вимірювань.
---

Модуль DataLayer автоматично надсилає події ecommerce GA4 до рівня даних (dataLayer). Підтримує як Google Tag Manager (GTM), так і пряму інтеграцію gtag.js. Скрипти завантажуються з атрибутом `defer` для мінімального впливу на Web Vitals.

## Увімкнення модуля

Перейдіть до **WooCommerce > Polski > Магазинні модулі** та увімкніть **GA4 DataLayer / GTM** (ID модуля: `datalayer`).

## Налаштування

Налаштування модуля зберігаються в опції `polski_datalayer`. Перейдіть до **WooCommerce > Polski > Магазинні модулі > GA4 DataLayer / GTM**.

### Доступні налаштування

| Налаштування           | Формат          | Опис                                                    |
| ---------------------- | --------------- | ------------------------------------------------------- |
| `gtm_container_id`     | `GTM-XXXXXXX`  | Ідентифікатор контейнера Google Tag Manager              |
| `ga4_measurement_id`   | `G-XXXXXXXXXX` | Ідентифікатор вимірювання GA4 (для режиму gtag.js)      |
| `use_sku_as_id`        | boolean         | Використовувати SKU замість ID товару як `item_id`      |

### Режими роботи

**Google Tag Manager**, введіть `gtm_container_id`. Модуль впровадить сніпет контейнера GTM (скрипт у `<head>` та noscript у `<body>`). Події ecommerce потрапляють до `window.dataLayer`.

**gtag.js**, введіть `ga4_measurement_id` (без GTM). Модуль завантажить скрипт gtag.js безпосередньо від Google та надішле події через `gtag('event', ...)`.

Ви можете використовувати обидва режими одночасно, тоді події потрапляють як до dataLayer (GTM), так і безпосередньо до GA4.

## Події ecommerce

Модуль надсилає такі події, що відповідають специфікації GA4 Enhanced Ecommerce:

### view_item_list

Перегляд списку товарів (сторінка категорії, результати пошуку, сторінка магазину).

```javascript
dataLayer.push({
  event: 'view_item_list',
  ecommerce: {
    item_list_id: 'category_koszulki',
    item_list_name: 'Koszulki',
    items: [
      {
        item_id: 'SKU-001',
        item_name: 'Koszulka polo',
        item_category: 'Koszulki',
        price: 89.99,
        index: 0
      }
    ]
  }
});
```

### view_item

Перегляд сторінки окремого товару.

```javascript
dataLayer.push({
  event: 'view_item',
  ecommerce: {
    currency: 'PLN',
    value: 89.99,
    items: [
      {
        item_id: 'SKU-001',
        item_name: 'Koszulka polo',
        item_category: 'Koszulki',
        price: 89.99,
        quantity: 1
      }
    ]
  }
});
```

### add_to_cart

Додавання товару до кошика. Подія надсилається через AJAX після кліку на кнопку **Додати до кошика** (як на сторінці товару, так і в списку).

```javascript
dataLayer.push({
  event: 'add_to_cart',
  ecommerce: {
    currency: 'PLN',
    value: 89.99,
    items: [
      {
        item_id: 'SKU-001',
        item_name: 'Koszulka polo',
        item_category: 'Koszulki',
        price: 89.99,
        quantity: 1
      }
    ]
  }
});
```

### remove_from_cart

Видалення товару з кошика.

```javascript
dataLayer.push({
  event: 'remove_from_cart',
  ecommerce: {
    currency: 'PLN',
    value: 89.99,
    items: [
      {
        item_id: 'SKU-001',
        item_name: 'Koszulka polo',
        price: 89.99,
        quantity: 1
      }
    ]
  }
});
```

### begin_checkout

Початок процесу оформлення замовлення (вхід на сторінку каси).

```javascript
dataLayer.push({
  event: 'begin_checkout',
  ecommerce: {
    currency: 'PLN',
    value: 179.98,
    items: [/* товари з кошика */]
  }
});
```

### purchase

Завершення замовлення (сторінка подяки). Подія надсилається лише один раз на замовлення (захист через cookie).

```javascript
dataLayer.push({
  event: 'purchase',
  ecommerce: {
    transaction_id: '12345',
    currency: 'PLN',
    value: 179.98,
    tax: 33.55,
    shipping: 9.99,
    items: [/* товари із замовлення */]
  }
});
```

## Сніпет контейнера GTM

Після введення `gtm_container_id` модуль автоматично впроваджує код контейнера GTM:

**У секції `<head>`** (хук `wp_head`, пріоритет 1):

```html
<script defer>
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.defer=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');
</script>
```

**Після відкриття `<body>`** (хук `wp_body_open`):

```html
<noscript>
<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
```

## Продуктивність та Web Vitals

Модуль оптимізовано з огляду на Core Web Vitals:

- **Defer**, скрипти GTM та gtag.js завантажуються з атрибутом `defer`, не блокують рендеринг сторінки
- **Inline dataLayer**, дані ecommerce впроваджуються як inline JSON, без додаткових HTTP-запитів
- **Lazy events**, події `add_to_cart` та `remove_from_cart` реєструються через делегування подій (один listener на документі)
- **No layout shift**, сніпет GTM noscript має нульові розміри, не спричиняє CLS

## Ідентифікатор товару

За замовчуванням як `item_id` використовується ID товару WooCommerce (post ID). Увімкніть опцію **Використовувати SKU як ID** (`use_sku_as_id`), щоб замість цього надсилати SKU товару.

Коли товар не має призначеного SKU, модуль використовує ID товару як fallback.

## Дані варіативних товарів

Для варіативних товарів (variable products) модуль надсилає дані обраної варіації:

- `item_id`, SKU варіації (або ID варіації)
- `item_variant`, назва обраних атрибутів (наприклад, "Червоний / XL")
- `price`, ціна варіації

## Хуки

```php
// Модифікація даних товару перед надсиланням до dataLayer
add_filter('polski/datalayer/item_data', function (array $item_data, \WC_Product $product): array {
    $item_data['item_brand'] = $product->get_attribute('marka');
    return $item_data;
}, 10, 2);

// Вимкнення конкретної події
add_filter('polski/datalayer/event_enabled', function (bool $enabled, string $event_name): bool {
    if ($event_name === 'view_item_list') {
        return false;
    }
    return $enabled;
}, 10, 2);

// Модифікація даних події purchase
add_filter('polski/datalayer/purchase_data', function (array $data, \WC_Order $order): array {
    $data['ecommerce']['coupon'] = implode(',', $order->get_coupon_codes());
    return $data;
}, 10, 2);
```

## Налагодження

### Режим попереднього перегляду GTM

Використовуйте [Tag Assistant](https://tagassistant.google.com/) для перегляду подій у реальному часі. Відкрийте Tag Assistant, з'єднайтеся з доменом магазину та пройдіть увесь процес покупки.

### Консоль браузера

Перевірте вміст dataLayer у консолі:

```javascript
console.table(window.dataLayer);
```

### DebugView GA4

У Google Analytics 4 перейдіть до **Адмін > DebugView**, щоб побачити події в реальному часі з пристрою з увімкненим режимом debug.

## Усунення проблем

**Подія purchase не надсилається**, перевірте, чи сторінка подяки не кешується. Вимкніть кеш для ендпоінта `order-received`.

**Немає подій add_to_cart**, переконайтеся, що AJAX WooCommerce працює правильно. Перевірте консоль браузера на наявність помилок JavaScript.

**Дублікати подій purchase**, модуль встановлює cookie `polski_datalayer_order_{id}` після надсилання події. Якщо cookie блокується, подія може повторитися.

**Сніпет GTM не завантажується**, перевірте, чи тема викликає `wp_head()` та `wp_body_open()`.

Повідомлення про проблеми: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ця сторінка має виключно інформаційний характер і не є юридичною консультацією. Polski for WooCommerce, це програмне забезпечення з відкритим кодом (GPLv2), що надається без гарантій.</div>
