---
title: KSeF - Національна система електронних рахунків-фактур
description: Готовність до KSeF у Polski for WooCommerce - автоматичне виявлення замовлень з NIP, колонка статусу, хуки для розробників та інтеграція з системами виставлення рахунків.
---

KSeF - це платформа Міністерства фінансів для структурованих рахунків-фактур. Плагін готує магазин до інтеграції з KSeF - виявляє замовлення з NIP, додає колонку статусу та хуки для систем виставлення рахунків.

## Правовий стан KSeF

KSeF перебуває на стадії впровадження. Плагін не виставляє рахунки в KSeF, але полегшує інтеграцію з системами, які це роблять (наприклад, Fakturownia, iFirma, wFirma, InFakt).

Основні функції модуля KSeF:

1. Автоматичне виявлення замовлень з номером NIP
2. Колонка статусу KSeF на списку замовлень
3. Хуки для інтеграції із зовнішніми системами виставлення рахунків
4. Метадані замовлення, готові для передачі до системи KSeF

## Виявлення замовлень з NIP

Коли клієнт вкаже NIP при замовленні (поле NIP - частина модуля Checkout), плагін автоматично:

1. Валідує формат NIP (10 цифр, перевірка контрольної суми)
2. Позначає замовлення як таке, що потребує рахунку-фактури ПДВ
3. Зберігає NIP у метаданих замовлення
4. Опціонально отримує дані компанії з API GUS/CEIDG

### Валідація NIP

Плагін перевіряє правильність NIP на двох рівнях:

- **Формат** - 10 цифр, правильна контрольна сума (ваги: 6, 5, 7, 2, 3, 4, 5, 6, 7)
- **Онлайн-перевірка** - опціональна перевірка в базі VIES (для NIP-ів ЄС) або API GUS

## Колонка статусу KSeF

На списку замовлень (**WooCommerce > Замовлення**) з'являється колонка **KSeF** з іконками статусу:

| Іконка | Статус | Опис |
|-------|--------|------|
| Сіра | Не стосується | Замовлення без NIP, рахунок-фактура не потрібний |
| Синя | Очікує | Замовлення з NIP, рахунок-фактура до виставлення |
| Зелена | Виставлений | Рахунок-фактура виставлений (статус встановлений через хук) |
| Червона | Помилка | Виникла проблема з виставленням рахунку-фактури |

Можете фільтрувати замовлення за статусом KSeF, наприклад, показати лише ті, що очікують на рахунок-фактуру.

### Масові дії

На списку замовлень можете масово позначити кілька замовлень як "виставлені в KSeF".

## Хуки

### polski/ksef/invoice_ready

Викликається, коли замовлення з NIP оплачене та готове до виставлення рахунку-фактури. Головний хук для інтеграції з системами виставлення рахунків.

```php
/**
 * @param int      $order_id   ID замовлення WooCommerce.
 * @param WC_Order $order      Об'єкт замовлення.
 * @param string   $nip        Номер NIP клієнта.
 * @param array    $invoice_data Дані для рахунку-фактури (назва компанії, адреса, NIP).
 */
add_action('polski/ksef/invoice_ready', function (int $order_id, WC_Order $order, string $nip, array $invoice_data): void {
    // Приклад: надіслати дані до API Fakturownia
    $api_token = get_option('fakturownia_api_token');
    $account = get_option('fakturownia_account');
    
    $invoice_payload = [
        'invoice' => [
            'kind'             => 'vat',
            'number'           => null, // авто-нумерація
            'sell_date'        => $order->get_date_paid()->format('Y-m-d'),
            'issue_date'       => current_time('Y-m-d'),
            'payment_type'     => 'transfer',
            'seller_name'      => get_option('woocommerce_store_name'),
            'buyer_name'       => $invoice_data['company_name'],
            'buyer_tax_no'     => $nip,
            'buyer_street'     => $invoice_data['address'],
            'buyer_city'       => $invoice_data['city'],
            'buyer_post_code'  => $invoice_data['postcode'],
            'positions'        => [],
        ],
    ];
    
    foreach ($order->get_items() as $item) {
        $invoice_payload['invoice']['positions'][] = [
            'name'       => $item->get_name(),
            'quantity'   => $item->get_quantity(),
            'total_price_gross' => $item->get_total() + $item->get_total_tax(),
            'tax'        => round(($item->get_total_tax() / $item->get_total()) * 100),
        ];
    }
    
    $response = wp_remote_post("https://{$account}.fakturownia.pl/invoices.json", [
        'body'    => wp_json_encode($invoice_payload),
        'headers' => [
            'Content-Type' => 'application/json',
            'Authorization' => 'Token token=' . $api_token,
        ],
    ]);
    
    if (!is_wp_error($response) && wp_remote_retrieve_response_code($response) === 201) {
        $body = json_decode(wp_remote_retrieve_body($response), true);
        update_post_meta($order_id, '_ksef_status', 'issued');
        update_post_meta($order_id, '_ksef_invoice_id', $body['id'] ?? '');
    } else {
        update_post_meta($order_id, '_ksef_status', 'error');
    }
}, 10, 4);
```

### polski/ksef/is_required

Фільтр, що дозволяє програмно визначити, чи замовлення потребує рахунку-фактури KSeF.

```php
/**
 * @param bool     $is_required Чи рахунок-фактура KSeF обов'язковий.
 * @param WC_Order $order       Об'єкт замовлення.
 * @return bool
 */
add_filter('polski/ksef/is_required', function (bool $is_required, WC_Order $order): bool {
    // Приклад: вимагати рахунок-фактуру KSeF для замовлень понад 450 PLN
    if ($order->get_total() > 450) {
        return true;
    }
    
    return $is_required;
}, 10, 2);
```

### Приклад - автоматичне позначення статусу після інтеграції

```php
/**
 * Оновити статус KSeF після отримання відповіді від системи виставлення рахунків.
 */
add_action('my_invoicing/invoice_created', function (int $order_id, string $ksef_number): void {
    $order = wc_get_order($order_id);
    if (!$order) {
        return;
    }
    
    $order->update_meta_data('_ksef_status', 'issued');
    $order->update_meta_data('_ksef_number', $ksef_number);
    $order->add_order_note(
        sprintf('Faktura wystawiona w KSeF. Numer KSeF: %s', $ksef_number)
    );
    $order->save();
}, 10, 2);
```

## Метадані замовлення

Модуль KSeF записує такі метадані у замовленні:

| Ключ meta | Опис |
|------------|------|
| `_billing_nip` | Номер NIP клієнта |
| `_billing_company` | Назва компанії |
| `_ksef_required` | Чи замовлення потребує рахунку-фактури (`yes`/`no`) |
| `_ksef_status` | Статус рахунку-фактури (`pending`, `issued`, `error`) |
| `_ksef_number` | Номер KSeF рахунку-фактури (після виставлення) |
| `_ksef_invoice_id` | ID рахунку-фактури у зовнішній системі |

## Налаштування

Налаштування модуля KSeF: **WooCommerce > Налаштування > Polski > KSeF**.

| Опція | Опис | Значення за замовчуванням |
|-------|------|------------------|
| Увімкнути модуль KSeF | Активує виявлення та відстеження | Так |
| Онлайн-валідація NIP | Перевіряти NIP в API GUS/VIES | Ні |
| Автоотримання даних компанії | Отримувати дані з GUS після введення NIP | Ні |
| Статус, що запускає хук | Статус замовлення, при якому викликати `invoice_ready` | `processing` |

## Вирішення проблем

**Колонка KSeF не відображається на списку замовлень**
Натисніть "Опції екрану" та позначте колонку KSeF. Переконайтеся, що модуль увімкнений у налаштуваннях.

**NIP не зберігається у замовленні**
Перевірте, чи поле NIP увімкнене у **WooCommerce > Налаштування > Polski > Каса**. Поле має бути активним, щоб клієнт міг його заповнити.

**Хук invoice_ready не викликається**
Перевірте "Статус, що запускає хук". За замовчуванням хук працює при статусі "В обробці". При нестандартних статусах змініть цю опцію.

## Подальші кроки

- Повідомлення про проблеми: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Обговорення та запитання: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Ця сторінка має виключно інформаційний характер і не є юридичною консультацією. Перед впровадженням зверніться до юриста. Polski for WooCommerce - це програмне забезпечення з відкритим кодом (GPLv2), що надається без гарантій.</div>
