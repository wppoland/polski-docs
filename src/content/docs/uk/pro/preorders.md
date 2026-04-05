---
title: Передпродаж (pre-orders)
description: Модуль передпродажу Polski PRO for WooCommerce - позначення продуктів як pre-order, дата релізу, нестандартний текст кнопки та валідація кошика.
---

Модуль передпродажу дозволяє позначати продукти як pre-order, відображати дату релізу та змінювати текст кнопки. Корисний в магазинах з електронікою, книгами, іграми та іншими продуктами до прем'єри.

:::note[Вимоги]
Polski PRO вимагає: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Глобальне налаштування

Перейдіть до **WooCommerce > Налаштування > Polski PRO > Передпродаж**.

| Параметр | Значення за замовчуванням | Опис |
|----------|--------------------------|------|
| Текст кнопки | "Zamów w przedsprzedaży" | Глобальний текст кнопки для продуктів pre-order |
| Текст доступності | "Dostępne od {date}" | Шаблон тексту, що відображається замість стану запасів |
| Формат дати | `d.m.Y` | Формат відображення дати релізу |
| Блокувати змішування кошика | Так | Забороняє додавання стандартних продуктів до кошика з pre-order |
| Повідомлення блокування | "Produkty w przedsprzedaży muszą być zamawiane osobno." | Повідомлення, що відображається при спробі змішування |

## Налаштування продукту

### Мета-поля

Налаштування передпродажу знаходяться в редагуванні продукту, у вкладці **Загальне** в панелі даних продукту.

| Мета-поле | Ключ | Тип | Опис |
|-----------|------|-----|------|
| Увімкнути передпродаж | `_polski_preorder_enabled` | `bool` | Позначає продукт як pre-order |
| Дата релізу | `_polski_preorder_release_date` | `string` (Y-m-d) | Дата, з якої продукт доступний стандартно |
| Текст кнопки | `_polski_preorder_button_text` | `string` | Перевизначає глобальний текст кнопки для цього продукту |
| Текст доступності | `_polski_preorder_availability_text` | `string` | Перевизначає глобальний текст доступності |

### Налаштування через WP-CLI

```bash
wp post meta update 123 _polski_preorder_enabled "yes"
wp post meta update 123 _polski_preorder_release_date "2026-06-15"
wp post meta update 123 _polski_preorder_button_text "Zamów teraz - premiera 15 czerwca"
```

### Програмне налаштування

```php
update_post_meta($product_id, '_polski_preorder_enabled', 'yes');
update_post_meta($product_id, '_polski_preorder_release_date', '2026-06-15');
```

## Відображення на фронтенді

### Кнопка покупки

Коли продукт позначений як pre-order, текст кнопки "Додати до кошика" змінюється на налаштований текст передпродажу. Це стосується:

- Сторінки окремого продукту
- Сторінок архіву, категорій та тегів
- Результатів пошуку
- Блоків WooCommerce (Product Grid, Product Collection)

### Текст доступності

Замість стандартного стану запасів ("В наявності", "Немає в наявності") відображається текст доступності з датою релізу. Плейсхолдер `{date}` замінюється на відформатовану дату.

**Приклад відображення:**

> Dostępne od 15.06.2026

### Автоматична деактивація

Після перевищення дати релізу продукт автоматично повертається до стандартного режиму. Деактивація відбувається через завдання WP-Cron, що запускається щодня о 00:01.

```php
/**
 * Akcja wywoływana po automatycznej dezaktywacji przedsprzedaży.
 *
 * @param int    $product_id   ID produktu
 * @param string $release_date Data premiery (Y-m-d)
 */
do_action('polski_pro/preorder/deactivated', int $product_id, string $release_date);
```

**Приклад - сповіщення клієнтів про доступність:**

```php
add_action('polski_pro/preorder/deactivated', function (int $product_id, string $release_date): void {
    $subscribers = get_post_meta($product_id, '_polski_preorder_subscribers', true);
    if (is_array($subscribers)) {
        foreach ($subscribers as $email) {
            wp_mail(
                $email,
                'Produkt jest już dostępny!',
                sprintf('Produkt %s jest teraz dostępny do zakupu.', get_the_title($product_id))
            );
        }
    }
}, 10, 2);
```

## Валідація кошика

### Блокування змішування продуктів

Коли опція "Блокувати змішування кошика" увімкнена, клієнт не може додати до кошика одночасно:

- Продукти у передпродажу та стандартні продукти
- Продукти pre-order із різними датами релізу (необов'язково)

При спробі додавання продукту іншого типу відображається повідомлення блокування, і продукт не додається.

### Хук валідації

```php
/**
 * Filtruje, czy koszyk może zawierać mieszane typy produktów.
 *
 * @param bool $allow       Czy pozwolić na mieszanie (domyślnie false)
 * @param int  $product_id  ID dodawanego produktu
 * @param array $cart_items  Aktualne produkty w koszyku
 */
apply_filters('polski_pro/preorder/allow_mixed_cart', bool $allow, int $product_id, array $cart_items): bool;
```

**Приклад - дозвіл на змішування для VIP:**

```php
add_filter('polski_pro/preorder/allow_mixed_cart', function (bool $allow, int $product_id, array $cart_items): bool {
    if (current_user_can('manage_woocommerce')) {
        return true;
    }
    return $allow;
}, 10, 3);
```

## Шорткод

Відображення зворотного відліку до дати релізу:

```
[polski_preorder_countdown product_id="123" format="days" label="Do premiery pozostało:"]
```

| Параметр | Обов'язковий | Опис |
|----------|-------------|------|
| `product_id` | Ні | ID продукту (за замовчуванням поточний) |
| `format` | Ні | Формат: `days`, `full` (дні, години, хвилини) |
| `label` | Ні | Текст етикетки перед відліком |

## Хуки

### Фільтр тексту кнопки

```php
/**
 * Filtruje tekst przycisku przedsprzedaży.
 *
 * @param string      $text    Tekst przycisku
 * @param \WC_Product $product Obiekt produktu
 */
apply_filters('polski_pro/preorder/button_text', string $text, \WC_Product $product): string;
```

**Приклад - динамічний текст із ціною:**

```php
add_filter('polski_pro/preorder/button_text', function (string $text, \WC_Product $product): string {
    return sprintf('Zamów za %s - premiera wkrótce', $product->get_price_html());
}, 10, 2);
```

### Фільтр тексту доступності

```php
/**
 * Filtruje tekst dostępności przedsprzedaży.
 *
 * @param string      $text         Tekst dostępności
 * @param string      $release_date Data premiery (Y-m-d)
 * @param \WC_Product $product      Obiekt produktu
 */
apply_filters('polski_pro/preorder/availability_text', string $text, string $release_date, \WC_Product $product): string;
```

## Сумісність із варіантами

Модуль передпродажу працює з варіантними продуктами. Кожний варіант може мати незалежні налаштування pre-order:

- Варіант A - стандартний (доступний одразу)
- Варіант B - pre-order (реліз через 2 тижні)

Змішування варіантів pre-order та стандартних у рамках одного продукту дозволено - валідація кошика стосується лише змішування різних продуктів.

## Вирішення проблем

**Продукт не перемикається автоматично після дати релізу**
Перевірте, чи WP-Cron працює правильно. Якщо використовується зовнішній CRON, переконайтеся, що `wp-cron.php` викликається регулярно. Альтернативно запустіть вручну: `wp cron event run polski_pro_preorder_check`.

**Клієнт додав продукти pre-order та звичайні до кошика**
Перевірте, чи опція "Блокувати змішування кошика" увімкнена. Очистіть кеш, якщо використовуються плагіни кешування фрагментів кошика.

**Дата релізу відображається в неправильному форматі**
Перевірте налаштування "Формат дати" в конфігурації модуля. Формат використовує стандартні плейсхолдери PHP `date()`.

## Подальші кроки

- Повідомляйте про проблеми: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Пов'язані модулі: [Пакети та додатки](/pro/bundles-addons)

<div class="disclaimer">Ця сторінка має виключно інформаційний характер і не є юридичною консультацією. Перед впровадженням зверніться до юриста. Polski for WooCommerce - це програмне забезпечення з відкритим кодом (GPLv2), що надається без гарантій.</div>
