---
title: KSeF - Національна система електронних рахунків-фактур
description: Готовність до KSeF у Polski for WooCommerce - автоматичне виявлення замовлень з NIP, колонка статусу, девелоперські hooks та інтеграція із системами виставлення рахунків.
---

KSeF це платформа Міністерства фінансів для структурованих рахунків-фактур. Плагін готує магазин до інтеграції з KSeF, виявляє замовлення, що потребують рахунку-фактури VAT, додає колонку статусу та hooks для з'єднання із системами виставлення рахунків.

## Правовий стан KSeF

KSeF перебуває у фазі впровадження. Плагін не виставляє рахунки-фактури в KSeF, але полегшує інтеграцію із системами, які це роблять (наприклад, Fakturownia, iFirma, wFirma, InFakt).

Основні функції модуля KSeF:

1. Автоматичне виявлення замовлень із номером NIP
2. Колонка статусу KSeF у списку замовлень
3. Hooks для інтеграції із зовнішніми системами виставлення рахунків
4. Метадані замовлення, готові до передачі в систему KSeF

## Виявлення замовлень з NIP

Коли клієнт вкаже NIP при оформленні замовлення (поле NIP є частиною модуля Checkout), плагін автоматично:

1. Валідує формат NIP (10 цифр, перевірка контрольної суми)
2. Позначає замовлення як таке, що потребує рахунку-фактури VAT
3. Зберігає NIP у метаданих замовлення
4. Опціонально завантажує дані компанії з API GUS/CEIDG

### Валідація NIP

Плагін перевіряє правильність NIP на двох рівнях:

- **Формат** - 10 цифр, правильна контрольна сума (ваги: 6, 5, 7, 2, 3, 4, 5, 6, 7)
- **Онлайн-перевірка** - опціональна перевірка в базі VIES (для NIP-ів ЄС) або API GUS

## Колонка статусу KSeF

У списку замовлень (**WooCommerce > Замовлення**) з'являється колонка **KSeF** з іконками статусу:

| Іконка | Статус | Опис |
|-------|--------|------|
| Сіра | Не стосується | Замовлення без NIP, рахунок-фактура не потрібен |
| Синя | Очікує | Замовлення з NIP, рахунок-фактура до виставлення |
| Зелена | Виставлено | Рахунок-фактуру виставлено (статус встановлено через hook) |
| Червона | Помилка | Виникла проблема з виставленням рахунку-фактури |

Ви можете фільтрувати замовлення за статусом KSeF, наприклад відобразити лише ті, що очікують на рахунок-фактуру.

### Масові дії

У списку замовлень ви можете масово позначити багато замовлень як "виставлені в KSeF".

## Hooks

### polski/ksef/invoice_ready

Викликається, коли замовлення з NIP оплачене та готове до виставлення рахунку-фактури. Головний hook для інтеграції із системами виставлення рахунків.

```php
/**
 * @param int      $order_id   ID zamówienia WooCommerce.
 * @param WC_Order $order      Obiekt zamówienia.
 * @param string   $nip        Numer NIP klienta.
 * @param array    $invoice_data Dane do faktury (nazwa firmy, adres, NIP).
 */
add_action('polski/ksef/invoice_ready', function (int $order_id, WC_Order $order, string $nip, array $invoice_data): void {
    // Przykład: wyślij dane do API Fakturowni
    $api_token = get_option('fakturownia_api_token');
    $account = get_option('fakturownia_account');
    
    $invoice_payload = [
        'invoice' => [
            'kind'             => 'vat',
            'number'           => null, // auto-numeracja
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
 * @param bool     $is_required Czy faktura KSeF jest wymagana.
 * @param WC_Order $order       Obiekt zamówienia.
 * @return bool
 */
add_filter('polski/ksef/is_required', function (bool $is_required, WC_Order $order): bool {
    // Przykład: wymagaj faktury KSeF dla zamówień powyżej 450 PLN
    if ($order->get_total() > 450) {
        return true;
    }
    
    return $is_required;
}, 10, 2);
```

### Приклад - автоматичне позначення статусу після інтеграції

```php
/**
 * Aktualizuj status KSeF po otrzymaniu odpowiedzi z systemu fakturowania.
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

Модуль KSeF зберігає такі метадані в замовленні:

| Ключ meta | Опис |
|------------|------|
| `_billing_nip` | Номер NIP клієнта |
| `_billing_company` | Назва компанії |
| `_ksef_required` | Чи замовлення потребує рахунку-фактури (`yes`/`no`) |
| `_ksef_status` | Статус рахунку-фактури (`pending`, `issued`, `error`) |
| `_ksef_number` | Номер KSeF рахунку-фактури (після виставлення) |
| `_ksef_invoice_id` | ID рахунку-фактури в зовнішній системі |

## Конфігурація

Налаштування модуля KSeF: **WooCommerce > Налаштування > Polski > KSeF**.

| Опція | Опис | Значення за замовчуванням |
|-------|------|------------------|
| Увімкнути модуль KSeF | Активує виявлення та відстеження | Так |
| Онлайн-валідація NIP | Перевіряти NIP в API GUS/VIES | Ні |
| Авто-завантаження даних компанії | Завантажувати дані з GUS після введення NIP | Ні |
| Статус, що запускає hook | Статус замовлення, при якому викликати `invoice_ready` | `processing` |

## Усунення проблем

**Колонка KSeF не відображається у списку замовлень**
Натисніть "Параметри екрана" та позначте колонку KSeF. Переконайтеся, що модуль увімкнено в налаштуваннях.

**NIP не зберігається в замовленні**
Перевірте, чи поле NIP увімкнено в **WooCommerce > Налаштування > Polski > Каса**. Поле має бути активним, щоб клієнт міг його заповнити.

**Hook invoice_ready не викликається**
Перевірте "Статус, що запускає hook". За замовчуванням hook спрацьовує при статусі "В процесі виконання". При нестандартних статусах змініть цю опцію.

## Подальші кроки

- Повідомляйте про проблеми: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Обговорення та запитання: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Ця сторінка має виключно інформаційний характер і не є юридичною консультацією. Перед впровадженням проконсультуйтеся з юристом. Polski for WooCommerce є програмним забезпеченням з відкритим кодом (GPLv2), що надається без гарантій.</div>
