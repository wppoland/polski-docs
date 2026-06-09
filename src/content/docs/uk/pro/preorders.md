---
title: Передпродаж (pre-orders)
description: Модуль передпродажу Polski PRO for WooCommerce - позначення продуктів як pre-order, дата випуску, нестандартний текст кнопки та валідація кошика.
---

Модуль передпродажу дозволяє позначати продукти як pre-order, відображати дату випуску та змінювати текст кнопки. Корисний у магазинах з електронікою, книгами, іграми та іншими продуктами, що пропонуються до випуску.

:::note[Вимоги]
Polski PRO вимагає: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Глобальне налаштування

Перейдіть до **WooCommerce > Налаштування > Polski PRO > Передпродаж**.

| Налаштування | Значення за замовчуванням | Опис |
|------------|------------------|------|
| Текст кнопки | "Замовити у передпродажі" | Глобальний текст кнопки для продуктів pre-order |
| Текст доступності | "Доступно від {date}" | Шаблон тексту, що відображається замість стану складу |
| Формат дати | `d.m.Y` | Формат відображення дати випуску |
| Блокувати змішування кошика | Так | Забороняє додавати стандартні продукти до кошика з pre-order |
| Повідомлення блокування | "Продукти у передпродажі потрібно замовляти окремо." | Повідомлення, що відображається при спробі змішування |

## Налаштування продукту

### Мета-поля

Налаштування знайдете в редагуванні продукту, вкладка **Загальні**.

| Мета-поле | Ключ | Тип | Опис |
|-----------|-------|-----|------|
| Увімкнути передпродаж | `_polski_preorder_enabled` | `bool` | Позначає продукт як pre-order |
| Дата випуску | `_polski_preorder_release_date` | `string` (Y-m-d) | Дата, від якої продукт доступний стандартно |
| Текст кнопки | `_polski_preorder_button_text` | `string` | Перекриває глобальний текст кнопки для цього продукту |
| Текст доступності | `_polski_preorder_availability_text` | `string` | Перекриває глобальний текст доступності |

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

Кнопка "Додати до кошика" змінюється на текст передпродажу. Стосується:

- Сторінки окремого продукту
- Сторінок архіву, категорій та тегів
- Результатів пошуку
- Блоків WooCommerce (Product Grid, Product Collection)

### Текст доступності

Замість стану складу відображається текст з датою випуску. Заповнювач `{date}` замінюється на дату.

**Приклад відображення:**

> Доступно від 15.06.2026

### Автоматична деактивація

Після дати випуску продукт автоматично повертається до стандартного режиму. WP-Cron перевіряє це щодня о 00:01.

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

Коли "Блокувати змішування кошика" увімкнено, клієнт не може додати одночасно:

- Продукти у передпродажі та стандартні продукти
- Продукти pre-order з різними датами випуску (опціонально)

При спробі змішування відображається повідомлення блокування.

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

## Shortcode

Відображення зворотного відліку до дати випуску:

```
[polski_preorder_countdown product_id="123" format="days" label="Do premiery pozostało:"]
```

| Параметр | Обов'язковий | Опис |
|----------|----------|------|
| `product_id` | Ні | ID продукту (за замовчуванням поточний) |
| `format` | Ні | Формат: `days`, `full` (дні, години, хвилини) |
| `label` | Ні | Текст мітки перед зворотним відліком |

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

**Приклад - динамічний текст з ціною:**

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

## Сумісність з варіантами

Модуль працює з варіативними продуктами. Кожен варіант має незалежні налаштування pre-order:

- Варіант A - стандартний (доступний одразу)
- Варіант B - pre-order (випуск за 2 тижні)

Змішування варіантів pre-order та стандартних в одному продукті дозволено. Блокування стосується лише змішування різних продуктів.

## Усунення проблем

**Продукт не перемикається автоматично після дати випуску**
Перевірте, чи WP-Cron працює правильно. Якщо ви користуєтеся зовнішнім CRON-ом, переконайтеся, що `wp-cron.php` викликається регулярно. Альтернативно запустіть вручну: `wp cron event run polski_pro_preorder_check`.

**Клієнт додав продукти pre-order та звичайні до кошика**
Перевірте, чи опція "Блокувати змішування кошика" увімкнена. Очистіть кеш, якщо користуєтеся плагінами, що кешують фрагменти кошика.

**Дата випуску відображається у неправильному форматі**
Перевірте налаштування "Формат дати" в конфігурації модуля. Формат використовує стандартні заповнювачі PHP `date()`.

## Подальші кроки

- Повідомляйте про проблеми: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Пов'язані модулі: [Пакети та додатки](/pro/bundles-addons)

<div class="disclaimer">Ця сторінка має виключно інформаційний характер і не є юридичною консультацією. Перед впровадженням проконсультуйтеся з юристом. Polski for WooCommerce це програмне забезпечення з відкритим кодом (GPLv2), що постачається без гарантій.</div>
