---
title: Хуки (дiї та фiльтри)
description: Повна документацiя хукiв Polski for WooCommerce - 25 дiй та фiльтрiв з сигнатурами, параметрами та прикладами коду.
---

Polski for WooCommerce надає набiр хукiв (дiй та фiльтрiв), що дозволяють розробникам розширювати та модифiкувати поведiнку плагiна. Всi хуки використовують namespace `polski/`.

## Хуки вiдмови вiд договору (withdrawal)

### `polski/withdrawal/days`

Фiльтрує кiлькiсть днiв на вiдмову вiд договору.

```php
/**
 * @param int $days Кількість днів на відмову (за замовчуванням 14)
 */
apply_filters('polski/withdrawal/days', int $days): int;
```

**Приклад:**

```php
add_filter('polski/withdrawal/days', function (int $days): int {
    return 30; // Подовження до 30 днів
});
```

### `polski/withdrawal/excluded_categories`

Фiльтрує категорii продуктiв, виключених з права на вiдмову.

```php
/**
 * @param array $categories Масив ID категорій
 */
apply_filters('polski/withdrawal/excluded_categories', array $categories): array;
```

**Приклад:**

```php
add_filter('polski/withdrawal/excluded_categories', function (array $categories): array {
    $categories[] = 15; // ID категорії "Цифрові продукти"
    $categories[] = 22; // ID категорії "Гігієнічні продукти"
    return $categories;
});
```

### `polski/withdrawal/form_fields`

Фiльтрує поля форми вiдмови вiд договору.

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
        'label'    => 'Powód odstąpienia',
        'required' => false,
    ];
    return $fields;
});
```

### `polski/withdrawal/email_sent`

Дiя, що викликається пiсля надсилання пiдтвердження e-mail вiдмови.

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

## Цiновi хуки (price)

### `polski/price/unit_format`

Фiльтрує формат вiдображення одиничної цiни.

```php
/**
 * @param string $format     Формат одиничної ціни
 * @param float  $unit_price Одинична ціна
 * @param string $unit       Одиниця виміру (kg, l, m, szt.)
 * @param int    $product_id ID продукту
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

Фiльтрує мiтку ПДВ, що вiдображається бiля цiни.

```php
/**
 * @param string $label      Текст мітки
 * @param string $tax_status Податковий статус продукту
 */
apply_filters('polski/price/vat_label', string $label, string $tax_status): string;
```

**Приклад:**

```php
add_filter('polski/price/vat_label', function (string $label, string $tax_status): string {
    if ($tax_status === 'taxable') {
        return 'brutto (z VAT)';
    }
    return 'zwolniony z VAT';
}, 10, 2);
```

## Хуки Omnibus (omnibus)

### `polski/omnibus/lowest_price`

Фiльтрує найнижчу цiну за останнi 30 днiв (директива Omnibus).

```php
/**
 * @param float $price      Найнижча ціна
 * @param int   $product_id ID продукту
 * @param int   $days       Кількість днів назад
 */
apply_filters('polski/omnibus/lowest_price', float $price, int $product_id, int $days): float;
```

**Приклад:**

```php
add_filter('polski/omnibus/lowest_price', function (float $price, int $product_id, int $days): float {
    // Пропуск продуктів з категорії "Outlet"
    if (has_term('outlet', 'product_cat', $product_id)) {
        return 0.0; // Не відображати ціну Omnibus
    }
    return $price;
}, 10, 3);
```

### `polski/omnibus/display_format`

Фiльтрує формат вiдображення цiни Omnibus.

```php
/**
 * @param string $html       HTML з ціною
 * @param float  $price      Найнижча ціна
 * @param int    $product_id ID продукту
 */
apply_filters('polski/omnibus/display_format', string $html, float $price, int $product_id): string;
```

**Приклад:**

```php
add_filter('polski/omnibus/display_format', function (string $html, float $price, int $product_id): string {
    return sprintf(
        '<small class="omnibus-price">Najniższa cena z 30 dni: %s</small>',
        wc_price($price)
    );
}, 10, 3);
```

### `polski/omnibus/price_recorded`

Дiя, що викликається пiсля збереження цiни в iсторiю Omnibus.

```php
/**
 * @param int   $product_id ID продукту
 * @param float $price      Збережена ціна
 */
do_action('polski/omnibus/price_recorded', int $product_id, float $price): void;
```

## Хуки KSeF (ksef)

### `polski/ksef/invoice_data`

Фiльтрує данi рахунку-фактури перед надсиланням до KSeF.

```php
/**
 * @param array    $data  Дані рахунку-фактури
 * @param WC_Order $order Об'єкт замовлення
 */
apply_filters('polski/ksef/invoice_data', array $data, WC_Order $order): array;
```

**Приклад:**

```php
add_filter('polski/ksef/invoice_data', function (array $data, WC_Order $order): array {
    $data['additional_info'] = 'Faktura wygenerowana automatycznie';
    return $data;
}, 10, 2);
```

### `polski/ksef/invoice_sent`

Дiя, що викликається пiсля успiшного надсилання рахунку-фактури до KSeF.

```php
/**
 * @param int    $order_id   ID замовлення
 * @param string $ksef_id    Референційний номер KSeF
 * @param array  $response   Відповідь від API KSeF
 */
do_action('polski/ksef/invoice_sent', int $order_id, string $ksef_id, array $response): void;
```

**Приклад:**

```php
add_action('polski/ksef/invoice_sent', function (int $order_id, string $ksef_id, array $response): void {
    update_post_meta($order_id, '_ksef_reference', $ksef_id);
    $order = wc_get_order($order_id);
    $order->add_order_note(sprintf('Faktura wysłana do KSeF: %s', $ksef_id));
}, 10, 3);
```

## Хуки DSA (dsa)

### `polski/dsa/report_fields`

Фiльтрує поля форми звiту DSA.

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
        'label'    => 'Zrzut ekranu',
        'required' => false,
        'accept'   => '.jpg,.png,.pdf',
    ];
    return $fields;
});
```

### `polski/dsa/report_submitted`

Дiя, що викликається пiсля подання звiту DSA.

```php
/**
 * @param int   $report_id ID звіту
 * @param array $data      Дані звіту
 */
do_action('polski/dsa/report_submitted', int $report_id, array $data): void;
```

## Хуки DOI - double opt-in (doi)

### `polski/doi/verification_email`

Фiльтрує змiст верифiкацiйного e-mail DOI.

```php
/**
 * @param string $message Зміст e-mail
 * @param string $email   Адреса e-mail для верифікації
 * @param string $url     Верифікаційний URL
 */
apply_filters('polski/doi/verification_email', string $message, string $email, string $url): string;
```

**Приклад:**

```php
add_filter('polski/doi/verification_email', function (string $message, string $email, string $url): string {
    return sprintf(
        'Cześć! Potwierdź rejestrację klikając: <a href="%s">Potwierdź konto</a>',
        esc_url($url)
    );
}, 10, 3);
```

### `polski/doi/verified`

Дiя, що викликається пiсля успiшної верифiкацii DOI.

```php
/**
 * @param int    $user_id ID користувача
 * @param string $email   Адреса e-mail
 */
do_action('polski/doi/verified', int $user_id, string $email): void;
```

## Хуки кешу (cache)

### `polski/cache/should_flush`

Фiльтрує рiшення про очищення кешу плагiна.

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
    // Не очищати кеш пошуку при імпорті
    if ($group === 'search' && defined('WP_IMPORTING') && WP_IMPORTING) {
        return false;
    }
    return $should_flush;
}, 10, 2);
```

### `polski/cache/ttl`

Фiльтрує час життя кешу (TTL) у секундах.

```php
/**
 * @param int    $ttl   Час у секундах
 * @param string $group Група кешу
 */
apply_filters('polski/cache/ttl', int $ttl, string $group): int;
```

## Хуки чекбоксiв (checkboxes)

### `polski/checkboxes/render`

Фiльтрує HTML вiдрендереного чекбокса.

```php
/**
 * @param string $html     HTML чекбокса
 * @param array  $checkbox Дані чекбокса
 * @param string $location Розташування (checkout, registration, contact)
 */
apply_filters('polski/checkboxes/render', string $html, array $checkbox, string $location): string;
```

### `polski/checkboxes/validated`

Дiя, що викликається пiсля валiдацii чекбоксiв.

```php
/**
 * @param array $checkboxes Валідовані чекбокси
 * @param bool  $valid      Результат валідації
 */
do_action('polski/checkboxes/validated', array $checkboxes, bool $valid): void;
```

## Хуки e-mail (email)

### `polski/email/template`

Фiльтрує шлях до шаблону e-mail.

```php
/**
 * @param string $template Шлях до шаблону
 * @param string $type     Тип e-mail (withdrawal, doi, waitlist)
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

Фiльтрує заголовки e-mail.

```php
/**
 * @param array  $headers Заголовки e-mail
 * @param string $type    Тип e-mail
 */
apply_filters('polski/email/headers', array $headers, string $type): array;
```

## Хуки юридичних сторiнок (legal_page)

### `polski/legal_page/template_data`

Фiльтрує данi, що вставляються в шаблон юридичної сторiнки.

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
        $data['delivery_info'] = 'Dostawa w ciągu 2-5 dni roboczych.';
    }
    return $data;
}, 10, 2);
```

### `polski/legal_page/generated`

Дiя, що викликається пiсля генерацii юридичної сторiнки.

```php
/**
 * @param int    $page_id ID сторінки
 * @param string $type    Тип сторінки
 */
do_action('polski/legal_page/generated', int $page_id, string $type): void;
```

## Найкращi практики

1. **Використовуйте типи** - оголошуйте типи параметрiв та значень, що повертаються, у callback-функцiях
2. **Прiоритет** - прiоритет за замовчуванням - 10, використовуйте вищий (наприклад, 20), якщо хочете перевизначити стандартну поведiнку
3. **Namespace** - не створюйте хуки в namespace `polski/` у своiх плагiнах, щоб уникнути конфлiктiв
4. **Сумiснiсть** - перевiряйте iснування хукiв перед використанням: `has_filter('polski/omnibus/lowest_price')`
5. **Документацiя** - документуйте власнi callback-функцii коментарями PHPDoc

Повiдомлення про проблеми: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ця сторінка має виключно інформаційний характер і не є юридичною консультацією. Перед впровадженням зверніться до юриста. Polski for WooCommerce - це програмне забезпечення з відкритим кодом (GPLv2), що надається без гарантій.</div>
