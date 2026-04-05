---
title: Бухгалтерські інтеграції
description: Інтеграції з бухгалтерськими системами wFirma, Fakturownia та iFirma у Polski PRO for WooCommerce - синхронізація рахунків-фактур, логіка повторів та налаштування за провайдером.
---

Модуль з'єднує WooCommerce з польськими системами рахунків-фактур: wFirma, Fakturownia та iFirma. Рахунки-фактури надсилаються автоматично з повтором при помилках API.

:::note[Вимоги]
Polski PRO вимагає: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Додатково потрібен активний обліковий запис у вибраній бухгалтерській системі з доступом до API.
:::

## Підтримувані системи

| Система | Формат API | Версія API | Автентифікація |
|---------|-----------|------------|----------------|
| wFirma | XML | v2 | API key + API secret |
| Fakturownia | JSON | v3 | API token |
| iFirma | JSON | v1 | Login + API key (ключ рахунків-фактур) |

У будь-який момент може бути активною лише одна бухгалтерська інтеграція.

## Налаштування

Перейдіть до **WooCommerce > Налаштування > Polski PRO > Бухгалтерія**.

### Вибір провайдера

Виберіть бухгалтерську систему та вкажіть дані автентифікації.

#### wFirma

| Параметр | Опис |
|----------|------|
| API key | Ключ API з панелі wFirma |
| API secret | Секрет API |
| ID компанії | Ідентифікатор компанії у wFirma |
| Серія рахунків-фактур | Серія нумерації (наприклад, "FV", "FVS") |

#### Fakturownia

| Параметр | Опис |
|----------|------|
| Субдомен | Назва субдомену (наприклад, `mojafirma.fakturownia.pl`) |
| API token | Токен API з налаштувань облікового запису |
| ID відділу | Необов'язково - ID відділу, що виставляє рахунки-фактури |
| Мова рахунка-фактури | `pl` або `en` |

#### iFirma

| Параметр | Опис |
|----------|------|
| Login | Логін до облікового запису iFirma |
| Ключ API рахунків-фактур | Ключ API для виставлення рахунків-фактур |
| Ключ API абонента | Ключ API абонента (для отримання даних) |

### Спільні налаштування

| Параметр | Значення за замовчуванням | Опис |
|----------|--------------------------|------|
| Автоматичне виставлення | Так | Виставляти рахунок-фактуру автоматично після оплати замовлення |
| Статус-тригер | `processing` | Статус замовлення, що запускає виставлення рахунка-фактури |
| Тип документа | Рахунок-фактура ПДВ | Рахунок-фактура ПДВ, Проформа, Рахунок |
| Додати до листа | Так | Прикласти PDF рахунка-фактури до листа замовлення |
| Повтор при помилці | Так | Повторити спробу при помилці API |
| Максимальна кількість спроб | 5 | Ліміт повторних спроб |

## Синхронізація рахунків-фактур

### Автоматичний потік

1. Замовлення WooCommerce змінює статус на `processing` (або інший налаштований)
2. Модуль збирає дані замовлення та перетворює їх у формат провайдера
3. Дані надсилаються асинхронно до API бухгалтерської системи
4. Після успішного створення ID рахунка-фактури зберігається в мета замовлення
5. PDF рахунка-фактури завантажується та прикладається до листа клієнту

### Зіставлення даних

Модуль автоматично зіставляє дані замовлення WooCommerce з необхідним форматом API:

| Дані WooCommerce | wFirma (XML) | Fakturownia (JSON) | iFirma (JSON) |
|------------------|-------------|-------------------|---------------|
| Назва компанії | `<contractor><name>` | `buyer_name` | `Kontrahent.Nazwa` |
| NIP | `<contractor><nip>` | `buyer_tax_no` | `Kontrahent.NIP` |
| Адреса | `<contractor><street>` | `buyer_street` | `Kontrahent.Ulica` |
| Позиції замовлення | `<invoicecontents>` | `positions` | `Pozycje` |
| Ставка ПДВ | `<vat_code>` | `tax` | `StawkaVat` |
| Спосіб оплати | `<paymentmethod>` | `payment_type` | `SposobZaplaty` |

### Формат XML (wFirma)

```xml
<api>
  <invoices>
    <invoice>
      <contractor>
        <name>Firma Testowa Sp. z o.o.</name>
        <nip>1234567890</nip>
        <street>ul. Testowa 1</street>
        <city>Warszawa</city>
        <zip>00-001</zip>
      </contractor>
      <invoicecontents>
        <invoicecontent>
          <name>Produkt testowy</name>
          <unit>szt.</unit>
          <count>2</count>
          <price>100.00</price>
          <vat_code>23</vat_code>
        </invoicecontent>
      </invoicecontents>
      <paymentmethod>transfer</paymentmethod>
      <paymentdate>2026-04-12</paymentdate>
    </invoice>
  </invoices>
</api>
```

### Формат JSON (Fakturownia)

```json
{
  "invoice": {
    "kind": "vat",
    "number": null,
    "buyer_name": "Firma Testowa Sp. z o.o.",
    "buyer_tax_no": "1234567890",
    "buyer_street": "ul. Testowa 1",
    "buyer_city": "Warszawa",
    "buyer_post_code": "00-001",
    "positions": [
      {
        "name": "Produkt testowy",
        "quantity": 2,
        "total_price_gross": "246.00",
        "tax": "23"
      }
    ],
    "payment_type": "transfer",
    "payment_to": "2026-04-12"
  }
}
```

## Механізм retry

### Exponential backoff

Коли API повертає помилку (HTTP 5xx, timeout, помилка з'єднання), модуль автоматично планує повторну спробу з експоненціальною затримкою:

| Спроба | Затримка | Час від першої спроби |
|--------|----------|----------------------|
| 1 | Одразу | 0 с |
| 2 | 30 с | 30 с |
| 3 | 2 хв | 2 хв 30 с |
| 4 | 8 хв | 10 хв 30 с |
| 5 | 32 хв | 42 хв 30 с |

Затримка обчислюється за формулою: `delay = base_delay * 2^(attempt - 1)`, де `base_delay = 30 секунд`.

### Помилки, що не підлягають retry

Помилки клієнта (HTTP 4xx) не повторюються автоматично, оскільки вказують на проблему з даними, а не з API:

- `400 Bad Request` - неправильні дані
- `401 Unauthorized` - помилковий токен API
- `403 Forbidden` - відсутність прав
- `422 Unprocessable Entity` - валідація даних

Ці помилки логуються та потребують втручання адміністратора.

### Асинхронне надсилання

Рахунки-фактури надсилаються асинхронно за допомогою `WC_Action_Scheduler`, що означає, що вони не блокують процес оформлення замовлення. Клієнт бачить підтвердження замовлення одразу, а рахунок-фактура генерується у фоні.

```php
/**
 * Akcja wywoływana po pomyślnym wystawieniu faktury.
 *
 * @param int    $order_id   ID zamówienia
 * @param string $invoice_id ID faktury w systemie księgowym
 * @param string $provider   Nazwa dostawcy ('wfirma', 'fakturownia', 'ifirma')
 */
do_action('polski_pro/accounting/invoice_created', int $order_id, string $invoice_id, string $provider);
```

**Приклад - логування до зовнішньої системи:**

```php
add_action('polski_pro/accounting/invoice_created', function (
    int $order_id,
    string $invoice_id,
    string $provider
): void {
    error_log(sprintf(
        '[Polski PRO] Faktura %s wystawiona w %s dla zamówienia #%d',
        $invoice_id,
        $provider,
        $order_id
    ));
}, 10, 3);
```

### Хук помилки

```php
/**
 * Akcja wywoływana po wyczerpaniu prób wysłania faktury.
 *
 * @param int    $order_id   ID zamówienia
 * @param string $provider   Nazwa dostawcy
 * @param string $error      Komunikat błędu
 * @param int    $attempts   Liczba wykonanych prób
 */
do_action('polski_pro/accounting/invoice_failed', int $order_id, string $provider, string $error, int $attempts);
```

**Приклад - сповіщення адміністратора:**

```php
add_action('polski_pro/accounting/invoice_failed', function (
    int $order_id,
    string $provider,
    string $error,
    int $attempts
): void {
    $admin_email = get_option('admin_email');
    wp_mail(
        $admin_email,
        sprintf('Błąd wystawienia faktury - zamówienie #%d', $order_id),
        sprintf(
            "Nie udało się wystawić faktury w %s po %d próbach.\n\nBłąd: %s\n\nSprawdź zamówienie: %s",
            $provider,
            $attempts,
            $error,
            admin_url(sprintf('post.php?post=%d&action=edit', $order_id))
        )
    );
}, 10, 4);
```

## Фільтр даних рахунка-фактури

```php
/**
 * Filtruje dane faktury przed wysłaniem do API.
 *
 * @param array     $invoice_data Dane faktury w formacie dostawcy
 * @param \WC_Order $order        Zamówienie WooCommerce
 * @param string    $provider     Nazwa dostawcy
 */
apply_filters('polski_pro/accounting/invoice_data', array $invoice_data, \WC_Order $order, string $provider): array;
```

**Приклад - додавання приміток до рахунка-фактури:**

```php
add_filter('polski_pro/accounting/invoice_data', function (
    array $invoice_data,
    \WC_Order $order,
    string $provider
): array {
    if ($provider === 'fakturownia') {
        $invoice_data['invoice']['description'] = sprintf(
            'Zamówienie internetowe #%s',
            $order->get_order_number()
        );
    }
    return $invoice_data;
}, 10, 3);
```

## Адміністративна панель

### Статус синхронізації

На списку замовлень WooCommerce додано стовпець "Рахунок-фактура", що показує:

- Зелена іконка - рахунок-фактура виставлений успішно
- Жовта іконка - в процесі надсилання / retry
- Червона іконка - помилка (натисніть, щоб побачити деталі)
- Сіра іконка - не стосується (немає автоматичного виставлення)

### Ручне виставлення

На сторінці редагування замовлення, в панелі **Рахунок-фактура**, адміністратор може:

1. Виставити рахунок-фактуру вручну (якщо автоматичне виставлення не спрацювало)
2. Завантажити PDF рахунка-фактури
3. Повторити надсилання рахунка-фактури
4. Переглянути лог спроб та помилок

## Вирішення проблем

**Рахунок-фактура не виставляється автоматично**
Перевірте, чи статус-тригер правильний. Переконайтеся, що Action Scheduler працює (WooCommerce > Статус > Заплановані дії). Перевірте лог помилок у **WooCommerce > Статус > Логи**.

**Помилка "Unauthorized" при з'єднанні з API**
Перевірте дані автентифікації. Для wFirma перевірте, чи API key та secret з основного облікового запису (не субрахунку). Для Fakturownia переконайтеся, що субдомен правильний.

**Дублікати рахунків-фактур**
Модуль захищає від дублікатів перевіркою мета `_polski_pro_invoice_id` перед виставленням. Якщо дублікати виникають, перевірте, чи інший плагін не запускає той самий хук замовлення.

## Подальші кроки

- Повідомляйте про проблеми: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Пов'язане: [PRO REST API](/pro/pro-api)

<div class="disclaimer">Ця сторінка має виключно інформаційний характер і не є юридичною консультацією. Перед впровадженням зверніться до юриста. Polski for WooCommerce - це програмне забезпечення з відкритим кодом (GPLv2), що надається без гарантій.</div>
