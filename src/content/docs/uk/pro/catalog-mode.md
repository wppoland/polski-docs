---
title: Каталоговий режим B2B
description: Модуль каталогового режиму Polski PRO for WooCommerce - приховування цін, блокування покупок, перенаправлення до запитів пропозицій та інтеграція з модулем RFQ.
---

Каталоговий режим перетворює магазин на каталог без можливості покупки. Приховайте ціни, замініть кнопки на повідомлення або перенаправте до запиту пропозиції. Призначений для магазинів B2B з індивідуальними цінами.

:::note[Вимоги]
Polski PRO вимагає: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Налаштування

Перейдіть до **WooCommerce > Налаштування > Polski PRO > Каталоговий режим** та увімкніть модуль (опція `polski_catalog`).

### Основні налаштування

| Параметр | Опція в базі | Значення за замовчуванням | Опис |
|----------|-------------|--------------------------|------|
| Увімкнути каталоговий режим | `polski_catalog` | Ні | Активує каталоговий режим |
| Приховати ціни | `polski_catalog_hide_prices` | Так | Прибирає відображення цін |
| Приховати кнопку кошика | `polski_catalog_hide_cart` | Так | Прибирає кнопку "Додати до кошика" |
| Замінний текст ціни | `polski_catalog_price_text` | "Zapytaj o cenę" | Текст, що відображається замість ціни |
| Повідомлення на продукті | `polski_catalog_notice` | "" | Повідомлення на сторінці продукту |
| Перенаправити до RFQ | `polski_catalog_redirect_rfq` | Ні | Перенаправлення до форми запиту пропозиції |
| Умовний режим | `polski_catalog_conditional` | `all` | `all`, `guests`, `roles` |

### Умовний режим

Каталоговий режим може бути активний:

- **Для всіх** (`all`) - кожен бачить каталог без цін
- **Лише для неавторизованих** (`guests`) - авторизовані клієнти бачать ціни та можуть купувати
- **Для обраних ролей** (`roles`) - каталог активний лише для обраних ролей WordPress

Умовний режим "Лише для неавторизованих" популярний у моделях B2B, де гуртовня вимагає реєстрації облікового запису перед відкриттям цін.

```php
// Przykład: własna logika warunkowa
add_filter('polski_pro/catalog/is_active', function (bool $is_active): bool {
    // Wyłącz tryb katalogowy dla klientów z co najmniej 5 zamówieniami
    if (is_user_logged_in()) {
        $order_count = wc_get_customer_order_count(get_current_user_id());
        if ($order_count >= 5) {
            return false;
        }
    }
    return $is_active;
});
```

## Механізм роботи

### Приховування цін

Модуль підключається до фільтра `woocommerce_get_price_html` та замінює HTML ціни налаштованим замінним текстом.

```php
/**
 * Filtruje tekst zastępczy ceny w trybie katalogowym.
 *
 * @param string      $replacement Tekst zastępczy
 * @param \WC_Product $product     Obiekt produktu
 */
apply_filters('polski_pro/catalog/price_replacement', string $replacement, \WC_Product $product): string;
```

**Приклад - різні тексти для категорій:**

```php
add_filter('polski_pro/catalog/price_replacement', function (string $replacement, \WC_Product $product): string {
    if (has_term('premium', 'product_cat', $product->get_id())) {
        return '<span class="price-inquiry">Cena ustalana indywidualnie</span>';
    }
    return $replacement;
}, 10, 2);
```

### Блокування покупок

Модуль використовує фільтр `woocommerce_is_purchasable`, щоб заблокувати можливість покупки:

```php
/**
 * Filtruje, czy produkt jest dostępny do zakupu w trybie katalogowym.
 *
 * @param bool        $purchasable Czy produkt jest dostępny do zakupu
 * @param \WC_Product $product     Obiekt produktu
 */
apply_filters('polski_pro/catalog/is_purchasable', bool $purchasable, \WC_Product $product): bool;
```

**Приклад - дозвіл на покупку обраних продуктів:**

```php
add_filter('polski_pro/catalog/is_purchasable', function (bool $purchasable, \WC_Product $product): bool {
    $always_purchasable = [101, 102, 103]; // ID продуктів, завжди доступних
    if (in_array($product->get_id(), $always_purchasable, true)) {
        return true;
    }
    return $purchasable;
}, 10, 2);
```

### Повідомлення на сторінці продукту

Коли опція `polski_catalog_notice` встановлена, на сторінці окремого продукту відображається повідомлення (notice), що інформує клієнта про каталоговий режим.

Приклад повідомлення:

> Щоб дізнатися ціну цього продукту, зверніться до нашого відділу продажів або заповніть форму запиту пропозиції.

## Інтеграція з модулем запитів пропозицій

Коли опція `polski_catalog_redirect_rfq` увімкнена, замінна кнопка на сторінці продукту спрямовує до форми запиту пропозиції ([модуль RFQ](/pro/quotes)). Інтеграція включає:

1. Кнопка "Запитати ціну" замість "Додати до кошика"
2. Автоматична передача ID продукту до форми RFQ
3. Попереднє заповнення назви продукту у формі
4. Повернення до продукту після надсилання запиту

Для роботи інтеграції обидва модулі - каталоговий та RFQ - повинні бути активні.

## Приховування елементів

Окрім цін та кнопки кошика, модуль автоматично приховує:

| Елемент | Хук WooCommerce | Ефект |
|---------|----------------|-------|
| Кнопка "Додати до кошика" | `woocommerce_is_purchasable` | Продукт позначений як недоступний для покупки |
| Ціна | `woocommerce_get_price_html` | HTML ціни замінений текстом |
| Іконка кошика в заголовку | `polski_pro/catalog/hide_cart_icon` | Приховує іконку міні-кошика |
| Сторінка кошика | `template_redirect` | Перенаправлення з /cart/ на головну сторінку |
| Сторінка каси | `template_redirect` | Перенаправлення з /checkout/ на головну сторінку |

### Селективне приховування

Не обов'язково приховувати всі елементи одночасно. Кожну опцію можна вмикати або вимикати незалежно. Наприклад:

- Приховати ціни, але залишити кнопку кошика (клієнт купує "за невідому ціну" - контакт після замовлення)
- Приховати кнопку кошика, але показати ціни (клієнт бачить ціни, але повинен запитати про покупку)
- Приховати все (повний каталоговий режим)

## Виключення продуктів та категорій

### Виключення продуктів

Обрані продукти можуть бути виключені з каталогового режиму в редагуванні продукту, вкладка **Polski PRO > Каталоговий режим**, відмітивши опцію "Виключити з каталогового режиму".

### Виключення категорій

```php
/**
 * Filtruje kategorie wykluczone z trybu katalogowego.
 *
 * @param array $excluded_categories Tablica ID kategorii
 */
apply_filters('polski_pro/catalog/excluded_categories', array $excluded_categories): array;
```

**Приклад:**

```php
add_filter('polski_pro/catalog/excluded_categories', function (array $excluded_categories): array {
    $excluded_categories[] = 15; // "Аксесуари" - завжди доступні для покупки
    $excluded_categories[] = 28; // "Outlet"
    return $excluded_categories;
});
```

## Допоміжні CSS-класи

Модуль додає CSS-класи до `<body>` для полегшення стилізації:

| Клас | Коли додається |
|------|----------------|
| `polski-catalog-mode` | Каталоговий режим активний |
| `polski-catalog-prices-hidden` | Ціни приховані |
| `polski-catalog-cart-hidden` | Кнопка кошика прихована |

**Приклад CSS:**

```css
.polski-catalog-mode .price {
    display: none; /* Додаткове приховування ціни, якщо тема не поважає фільтр */
}

.polski-catalog-mode .single_add_to_cart_button {
    background-color: #0073aa;
    content: "Zapytaj o cenę";
}
```

## Вирішення проблем

**Ціни все ще відображаються, незважаючи на увімкнення каталогового режиму**
Деякі теми використовують нестандартні методи відображення цін, обходячи фільтр `woocommerce_get_price_html`. Використайте CSS-класи `.polski-catalog-prices-hidden .price { display: none; }` як захист.

**Клієнт може додати продукт до кошика через прямий URL**
Модуль блокує це на рівні фільтра `woocommerce_is_purchasable`. Якщо проблема виникає, перевірте, чи інший плагін не перевизначає цей фільтр із вищим пріоритетом.

**Умовний режим не працює правильно з кешем**
Плагіни кешування можуть видавати кешовану версію незалежно від стану авторизації. Налаштуйте плагін кешування, щоб розділяти кеш для авторизованих та неавторизованих користувачів.

## Подальші кроки

- Повідомляйте про проблеми: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Пов'язані модулі: [Запити пропозицій](/pro/quotes)

<div class="disclaimer">Ця сторінка має виключно інформаційний характер і не є юридичною консультацією. Перед впровадженням зверніться до юриста. Polski for WooCommerce - це програмне забезпечення з відкритим кодом (GPLv2), що надається без гарантій.</div>
