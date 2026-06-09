---
title: Хуки (дії та фільтри)
description: Повна документація хуків Polski for WooCommerce - 25 дій і фільтрів із сигнатурами, параметрами та прикладами коду.
---

Хуки (дії та фільтри) для розширення та зміни поведінки плагіна. Усі використовують простір імен `polski/`.

## Хуки відмови від договору (withdrawal)

### `polski/withdrawal/days`

Фільтрує кількість днів на відмову від договору.

```php
/**
 * @param int $days Кількість днів на відмову (за замовчуванням 14)
 */
apply_filters('polski/withdrawal/days', int $days): int;
```

**Приклад:**

```php
add_filter('polski/withdrawal/days', function (int $days): int {
    return 30; // Продовження до 30 днів
});
```

### `polski/withdrawal/excluded_categories`

Фільтрує категорії товарів, виключені з права на відмову.

```php
/**
 * @param array $categories Масив ID категорій
 */
apply_filters('polski/withdrawal/excluded_categories', array $categories): array;
```

**Приклад:**

```php
add_filter('polski/withdrawal/excluded_categories', function (array $categories): array {
    $categories[] = 15; // ID категорії "Цифрові товари"
    $categories[] = 22; // ID категорії "Гігієнічні товари"
    return $categories;
});
```

### `polski/withdrawal/form_fields`

Фільтрує поля форми відмови від договору.

```php
/**
 * @param array $fields Масив полів форми
 */
apply_filters('polski/withdrawal/form_fields', array $fields): array;
```

**Приклад:**

```php
add_filter('polski/withdrawal/form_fields', function (array $fields): array {
    $fields['reason'] = [
        'type'     => 'textarea',
        'label'    => 'Причина відмови',
        'required' => false,
    ];
    return $fields;
});
```

### `polski/withdrawal/email_sent`

Дія, що викликається після надсилання підтвердження відмови електронною поштою.

```php
/**
 * @param int   $order_id  ID замовлення
 * @param array $form_data Дані з форми
 */
do_action('polski/withdrawal/email_sent', int $order_id, array $form_data): void;
```

**Приклад:**

```php
add_action('polski/withdrawal/email_sent', function (int $order_id, array $form_data): void {
    // Логування відмов до зовнішньої системи
    wp_remote_post('https://api.crm.pl/withdrawals', [
        'body' => wp_json_encode([
            'order_id' => $order_id,
            'date'     => current_time('mysql'),
        ]),
    ]);
}, 10, 2);
```

## Цінові хуки (price)

### `polski/price/unit_format`

Фільтрує формат відображення ціни за одиницю.

```php
/**
 * @param string $format     Формат ціни за одиницю
 * @param float  $unit_price Ціна за одиницю
 * @param string $unit       Одиниця виміру (kg, l, m, шт.)
 * @param int    $product_id ID товару
 */
apply_filters('polski/price/unit_format', string $format, float $unit_price, string $unit, int $product_id): string;
```

**Приклад:**

```php
add_filter('polski/price/unit_format', function (string $format, float $unit_price, string $unit, int $product_id): string {
    return sprintf('%s / %s', wc_price($unit_price), $unit);
}, 10, 4);
```

### `polski/price/vat_label`

Фільтрує мітку ПДВ, що відображається біля ціни.

```php
/**
 * @param string $label      Текст мітки
 * @param string $tax_status Податковий статус товару
 */
apply_filters('polski/price/vat_label', string $label, string $tax_status): string;
```

**Приклад:**

```php
add_filter('polski/price/vat_label', function (string $label, string $tax_status): string {
    if ($tax_status === 'taxable') {
        return 'брутто (з ПДВ)';
    }
    return 'звільнено від ПДВ';
}, 10, 2);
```

## Хуки Omnibus (omnibus)

### `polski/omnibus/lowest_price`

Фільтрує найнижчу ціну за останні 30 днів (директива Omnibus).

```php
/**
 * @param float $price      Найнижча ціна
 * @param int   $product_id ID товару
 * @param int   $days       Кількість днів назад
 */
apply_filters('polski/omnibus/lowest_price', float $price, int $product_id, int $days): float;
```

**Приклад:**

```php
add_filter('polski/omnibus/lowest_price', function (float $price, int $product_id, int $days): float {
    // Пропуск товарів із категорії "Аутлет"
    if (has_term('outlet', 'product_cat', $product_id)) {
        return 0.0; // Не відображати ціну Omnibus
    }
    return $price;
}, 10, 3);
```

### `polski/omnibus/display_format`

Фільтрує формат відображення ціни Omnibus.

```php
/**
 * @param string $html       HTML із ціною
 * @param float  $price      Найнижча ціна
 * @param int    $product_id ID товару
 */
apply_filters('polski/omnibus/display_format', string $html, float $price, int $product_id): string;
```

**Приклад:**

```php
add_filter('polski/omnibus/display_format', function (string $html, float $price, int $product_id): string {
    return sprintf(
        '<small class="omnibus-price">Найнижча ціна за 30 днів: %s</small>',
        wc_price($price)
    );
}, 10, 3);
```

### `polski/omnibus/price_recorded`

Дія, що викликається після збереження ціни в історію Omnibus.

```php
/**
 * @param int   $product_id ID товару
 * @param float $price      Збережена ціна
 */
do_action('polski/omnibus/price_recorded', int $product_id, float $price): void;
```

## Хуки KSeF (ksef)

### `polski/ksef/invoice_data`

Фільтрує дані рахунка-фактури перед надсиланням до KSeF.

```php
/**
 * @param array    $data  Дані рахунка-фактури
 * @param WC_Order $order Об'єкт замовлення
 */
apply_filters('polski/ksef/invoice_data', array $data, WC_Order $order): array;
```

**Приклад:**

```php
add_filter('polski/ksef/invoice_data', function (array $data, WC_Order $order): array {
    $data['additional_info'] = 'Рахунок-фактуру згенеровано автоматично';
    return $data;
}, 10, 2);
```

### `polski/ksef/invoice_sent`

Дія, що викликається після успішного надсилання рахунка-фактури до KSeF.

```php
/**
 * @param int    $order_id   ID замовлення
 * @param string $ksef_id    Референтний номер KSeF
 * @param array  $response   Відповідь від API KSeF
 */
do_action('polski/ksef/invoice_sent', int $order_id, string $ksef_id, array $response): void;
```

**Приклад:**

```php
add_action('polski/ksef/invoice_sent', function (int $order_id, string $ksef_id, array $response): void {
    update_post_meta($order_id, '_ksef_reference', $ksef_id);
    $order = wc_get_order($order_id);
    $order->add_order_note(sprintf('Рахунок-фактуру надіслано до KSeF: %s', $ksef_id));
}, 10, 3);
```

## Хуки DSA (dsa)

### `polski/dsa/report_fields`

Фільтрує поля форми звернення DSA.

```php
/**
 * @param array $fields Поля форми
 */
apply_filters('polski/dsa/report_fields', array $fields): array;
```

**Приклад:**

```php
add_filter('polski/dsa/report_fields', function (array $fields): array {
    $fields['screenshot'] = [
        'type'     => 'file',
        'label'    => 'Знімок екрана',
        'required' => false,
        'accept'   => '.jpg,.png,.pdf',
    ];
    return $fields;
});
```

### `polski/dsa/report_submitted`

Дія, що викликається після подання звернення DSA.

```php
/**
 * @param int   $report_id ID звернення
 * @param array $data      Дані звернення
 */
do_action('polski/dsa/report_submitted', int $report_id, array $data): void;
```

## Хуки DOI - double opt-in (doi)

### `polski/doi/verification_email`

Фільтрує вміст верифікаційного листа DOI.

```php
/**
 * @param string $message Вміст листа
 * @param string $email   Адреса електронної пошти для верифікації
 * @param string $url     Верифікаційний URL
 */
apply_filters('polski/doi/verification_email', string $message, string $email, string $url): string;
```

**Приклад:**

```php
add_filter('polski/doi/verification_email', function (string $message, string $email, string $url): string {
    return sprintf(
        'Привіт! Підтвердіть реєстрацію, натиснувши: <a href="%s">Підтвердити обліковий запис</a>',
        esc_url($url)
    );
}, 10, 3);
```

### `polski/doi/verified`

Дія, що викликається після успішної верифікації DOI.

```php
/**
 * @param int    $user_id ID користувача
 * @param string $email   Адреса електронної пошти
 */
do_action('polski/doi/verified', int $user_id, string $email): void;
```

## Хуки кешу (cache)

### `polski/cache/should_flush`

Фільтрує рішення про очищення кешу плагіна.

```php
/**
 * @param bool   $should_flush Чи очищати кеш
 * @param string $group        Група кешу (omnibus, badges, search)
 */
apply_filters('polski/cache/should_flush', bool $should_flush, string $group): bool;
```

**Приклад:**

```php
add_filter('polski/cache/should_flush', function (bool $should_flush, string $group): bool {
    // Не очищати кеш пошуку під час імпорту
    if ($group === 'search' && defined('WP_IMPORTING') && WP_IMPORTING) {
        return false;
    }
    return $should_flush;
}, 10, 2);
```

### `polski/cache/ttl`

Фільтрує час життя кешу (TTL) у секундах.

```php
/**
 * @param int    $ttl   Час у секундах
 * @param string $group Група кешу
 */
apply_filters('polski/cache/ttl', int $ttl, string $group): int;
```

## Хуки чекбоксів (checkboxes)

### `polski/checkboxes/render`

Фільтрує HTML відрендереного чекбокса.

```php
/**
 * @param string $html     HTML чекбокса
 * @param array  $checkbox Дані чекбокса
 * @param string $location Розташування (checkout, registration, contact)
 */
apply_filters('polski/checkboxes/render', string $html, array $checkbox, string $location): string;
```

### `polski/checkboxes/validated`

Дія, що викликається після валідації чекбоксів.

```php
/**
 * @param array $checkboxes Перевірені чекбокси
 * @param bool  $valid      Результат валідації
 */
do_action('polski/checkboxes/validated', array $checkboxes, bool $valid): void;
```

## Хуки електронної пошти (email)

### `polski/email/template`

Фільтрує шлях до шаблону листа.

```php
/**
 * @param string $template Шлях до шаблону
 * @param string $type     Тип листа (withdrawal, doi, waitlist)
 */
apply_filters('polski/email/template', string $template, string $type): string;
```

**Приклад:**

```php
add_filter('polski/email/template', function (string $template, string $type): string {
    if ($type === 'withdrawal') {
        return get_stylesheet_directory() . '/polski/emails/withdrawal.php';
    }
    return $template;
}, 10, 2);
```

### `polski/email/headers`

Фільтрує заголовки листа.

```php
/**
 * @param array  $headers Заголовки листа
 * @param string $type    Тип листа
 */
apply_filters('polski/email/headers', array $headers, string $type): array;
```

## Хуки юридичних сторінок (legal_page)

### `polski/legal_page/template_data`

Фільтрує дані, що вставляються в шаблон юридичної сторінки.

```php
/**
 * @param array  $data Дані шаблону
 * @param string $type Тип сторінки (terms, privacy, withdrawal, dsa_report)
 */
apply_filters('polski/legal_page/template_data', array $data, string $type): array;
```

**Приклад:**

```php
add_filter('polski/legal_page/template_data', function (array $data, string $type): array {
    if ($type === 'terms') {
        $data['delivery_info'] = 'Доставка протягом 2-5 робочих днів.';
    }
    return $data;
}, 10, 2);
```

### `polski/legal_page/generated`

Дія, що викликається після генерації юридичної сторінки.

```php
/**
 * @param int    $page_id ID сторінки
 * @param string $type    Тип сторінки
 */
do_action('polski/legal_page/generated', int $page_id, string $type): void;
```

## Найкращі практики

1. **Використовуйте типи** - оголошуйте типи параметрів і повертаних значень у колбеках
2. **Пріоритет** - типовий пріоритет дорівнює 10, використовуйте вищий (наприклад, 20), якщо хочете перевизначити стандартну поведінку
3. **Простір імен** - не створюйте хуки в просторі імен `polski/` у власних плагінах, щоб уникнути конфліктів
4. **Сумісність** - перевіряйте існування хуків перед використанням: `has_filter('polski/omnibus/lowest_price')`
5. **Документація** - документуйте власні колбеки коментарями PHPDoc

Повідомлення про проблеми: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ця сторінка має виключно інформаційний характер і не є юридичною консультацією. Перед впровадженням проконсультуйтеся з юристом. Polski for WooCommerce є програмним забезпеченням з відкритим кодом (GPLv2), що надається без гарантій.</div>
