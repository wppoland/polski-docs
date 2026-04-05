---
title: PRO REST API
description: Документація REST API Polski PRO for WooCommerce - ендпоінти рахунків-фактур, налаштувань, генерації правових документів та інтеграції з KSeF.
---

Polski PRO for WooCommerce надає REST API у namespace `polski-pro/v1` для управління рахунками-фактурами, налаштуваннями та правовими документами. API доступне для автентифікованих користувачів із правом `manage_woocommerce`.

:::note[Вимоги]
Polski PRO вимагає: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Автентифікація

API вимагає двох елементів авторизації:

1. **Nonce WordPress** - заголовок `X-WP-Nonce` зі значенням, згенерованим через `wp_create_nonce('wp_rest')`
2. **Право** - авторизований користувач повинен мати capability `manage_woocommerce`

### Приклад автентифікації (JavaScript)

```javascript
const response = await fetch('/wp-json/polski-pro/v1/invoices', {
    headers: {
        'X-WP-Nonce': wpApiSettings.nonce,
        'Content-Type': 'application/json',
    },
});
```

### Приклад автентифікації (PHP / cURL)

```php
$nonce = wp_create_nonce('wp_rest');

$response = wp_remote_get(
    rest_url('polski-pro/v1/invoices'),
    [
        'headers' => [
            'X-WP-Nonce' => $nonce,
        ],
    ]
);
```

Неавтентифіковані запити або запити від користувачів без необхідного права отримують відповідь `401 Unauthorized` або `403 Forbidden`.

## Ендпоінти рахунків-фактур

### Отримання списку рахунків-фактур

```
GET /wp-json/polski-pro/v1/invoices
```

**Параметри запиту:**

| Параметр | Тип | За замовчуванням | Опис |
|----------|-----|------------------|------|
| `page` | `int` | `1` | Номер сторінки |
| `per_page` | `int` | `20` | Кількість результатів на сторінку (макс. 100) |
| `status` | `string` | `any` | Фільтр статусу: `draft`, `issued`, `sent`, `paid`, `cancelled` |
| `date_from` | `string` | `null` | Дата від (Y-m-d) |
| `date_to` | `string` | `null` | Дата до (Y-m-d) |
| `order_id` | `int` | `null` | Фільтр за ID замовлення WooCommerce |
| `search` | `string` | `null` | Пошук за номером рахунка-фактури або назвою контрагента |

**Відповідь (200 OK):**

```json
{
    "invoices": [
        {
            "id": 1,
            "number": "FV/2026/04/001",
            "order_id": 567,
            "status": "issued",
            "type": "vat",
            "buyer": {
                "name": "Firma Testowa Sp. z o.o.",
                "nip": "1234567890",
                "address": "ul. Testowa 1, 00-001 Warszawa"
            },
            "net_total": "1000.00",
            "tax_total": "230.00",
            "gross_total": "1230.00",
            "currency": "PLN",
            "issued_at": "2026-04-01T10:30:00+02:00",
            "due_date": "2026-04-15",
            "external_id": "FV-12345",
            "provider": "fakturownia"
        }
    ],
    "total": 42,
    "pages": 3
}
```

### Створення рахунка-фактури із замовлення

```
POST /wp-json/polski-pro/v1/invoices
```

**Параметри body (JSON):**

| Параметр | Тип | Обов'язковий | Опис |
|----------|-----|-------------|------|
| `order_id` | `int` | Так | ID замовлення WooCommerce |
| `type` | `string` | Ні | Тип: `vat` (за замовчуванням), `proforma`, `receipt` |
| `issue_date` | `string` | Ні | Дата виставлення (Y-m-d), за замовчуванням сьогодні |
| `due_date` | `string` | Ні | Термін оплати (Y-m-d) |
| `notes` | `string` | Ні | Примітки на рахунку-фактурі |
| `send_to_provider` | `bool` | Ні | Надіслати до бухгалтерської системи (за замовчуванням `true`) |

**Запит:**

```json
{
    "order_id": 567,
    "type": "vat",
    "due_date": "2026-04-15",
    "notes": "Termin płatności 14 dni",
    "send_to_provider": true
}
```

**Відповідь (201 Created):**

```json
{
    "id": 43,
    "number": "FV/2026/04/002",
    "order_id": 567,
    "status": "issued",
    "type": "vat",
    "buyer": {
        "name": "Firma Testowa Sp. z o.o.",
        "nip": "1234567890",
        "address": "ul. Testowa 1, 00-001 Warszawa"
    },
    "net_total": "500.00",
    "tax_total": "115.00",
    "gross_total": "615.00",
    "currency": "PLN",
    "issued_at": "2026-04-05T14:00:00+02:00",
    "due_date": "2026-04-15",
    "external_id": null,
    "provider_status": "pending"
}
```

### Отримання деталей рахунка-фактури

```
GET /wp-json/polski-pro/v1/invoices/{id}
```

Повертає повні дані рахунка-фактури разом із позиціями (items).

**Відповідь (200 OK):**

```json
{
    "id": 43,
    "number": "FV/2026/04/002",
    "order_id": 567,
    "status": "issued",
    "type": "vat",
    "buyer": {
        "name": "Firma Testowa Sp. z o.o.",
        "nip": "1234567890",
        "address": "ul. Testowa 1, 00-001 Warszawa"
    },
    "seller": {
        "name": "Mój Sklep Sp. z o.o.",
        "nip": "9876543210",
        "address": "ul. Sklepowa 5, 02-222 Warszawa"
    },
    "items": [
        {
            "name": "Produkt testowy",
            "sku": "TEST-001",
            "quantity": 2,
            "unit": "szt.",
            "net_price": "100.00",
            "tax_rate": 23,
            "tax_amount": "46.00",
            "gross_price": "246.00"
        },
        {
            "name": "Dostawa - InPost Paczkomat",
            "sku": null,
            "quantity": 1,
            "unit": "szt.",
            "net_price": "12.20",
            "tax_rate": 23,
            "tax_amount": "2.80",
            "gross_price": "15.00"
        }
    ],
    "net_total": "212.20",
    "tax_total": "48.80",
    "gross_total": "261.00",
    "currency": "PLN",
    "payment_method": "transfer",
    "issued_at": "2026-04-05T14:00:00+02:00",
    "due_date": "2026-04-15",
    "notes": "Termin płatności 14 dni",
    "external_id": "FV-12346",
    "provider": "fakturownia",
    "provider_status": "issued",
    "ksef_number": null
}
```

**Відповідь (404 Not Found):**

```json
{
    "code": "invoice_not_found",
    "message": "Faktura o podanym ID nie istnieje.",
    "data": { "status": 404 }
}
```

### Перегенерація PDF рахунка-фактури

```
POST /wp-json/polski-pro/v1/invoices/{id}/pdf
```

Перегенерує PDF-файл рахунка-фактури та повертає URL для завантаження.

**Параметри body (необов'язкові):**

| Параметр | Тип | Опис |
|----------|-----|------|
| `template` | `string` | Шаблон PDF: `default`, `minimal`, `detailed` |
| `language` | `string` | Мова: `pl`, `en`, `de` |

**Відповідь (200 OK):**

```json
{
    "id": 43,
    "pdf_url": "https://example.com/wp-content/uploads/polski-pro/invoices/FV-2026-04-002.pdf",
    "generated_at": "2026-04-05T14:05:00+02:00",
    "file_size": 45678
}
```

### Надсилання рахунка-фактури до KSeF

```
POST /wp-json/polski-pro/v1/invoices/{id}/ksef
```

Надсилає рахунок-фактуру до Національної системи е-рахунків (KSeF).

**Параметри body (необов'язкові):**

| Параметр | Тип | Опис |
|----------|-----|------|
| `test_mode` | `bool` | Надіслати до тестового середовища KSeF (за замовчуванням `false`) |

**Відповідь (200 OK):**

```json
{
    "id": 43,
    "ksef_number": "1234567890-20260405-ABC123DEF456",
    "ksef_status": "accepted",
    "submitted_at": "2026-04-05T14:10:00+02:00",
    "upo_url": "https://example.com/wp-content/uploads/polski-pro/ksef/UPO-43.xml"
}
```

**Відповідь (422 Unprocessable Entity):**

```json
{
    "code": "ksef_validation_error",
    "message": "Faktura nie spełnia wymagań schematu KSeF.",
    "data": {
        "status": 422,
        "errors": [
            "Brak numeru NIP nabywcy",
            "Nieprawidłowa stawka VAT dla pozycji 2"
        ]
    }
}
```

### Створення коригувального рахунка-фактури

```
POST /wp-json/polski-pro/v1/invoices/{id}/correction
```

Створює коригувальний рахунок-фактуру, пов'язаний із вихідним рахунком-фактурою.

**Параметри body (JSON):**

| Параметр | Тип | Обов'язковий | Опис |
|----------|-----|-------------|------|
| `reason` | `string` | Так | Причина коригування |
| `items` | `array` | Так | Скориговані позиції |
| `items[].original_index` | `int` | Так | Індекс позиції у вихідному рахунку-фактурі (від 0) |
| `items[].quantity` | `int` | Ні | Нова кількість |
| `items[].net_price` | `string` | Ні | Нова ціна нетто |

**Запит:**

```json
{
    "reason": "Zwrot 1 sztuki produktu",
    "items": [
        {
            "original_index": 0,
            "quantity": 1,
            "net_price": "100.00"
        }
    ]
}
```

**Відповідь (201 Created):**

```json
{
    "id": 44,
    "number": "FK/2026/04/001",
    "type": "correction",
    "original_invoice_id": 43,
    "original_invoice_number": "FV/2026/04/002",
    "reason": "Zwrot 1 sztuki produktu",
    "items": [
        {
            "name": "Produkt testowy",
            "quantity_before": 2,
            "quantity_after": 1,
            "net_difference": "-100.00",
            "tax_difference": "-23.00",
            "gross_difference": "-123.00"
        }
    ],
    "net_total": "-100.00",
    "tax_total": "-23.00",
    "gross_total": "-123.00",
    "status": "issued",
    "issued_at": "2026-04-05T15:00:00+02:00"
}
```

## Ендпоінт статистики

### Отримання статистики рахунків-фактур

```
GET /wp-json/polski-pro/v1/invoices/stats
```

**Параметри запиту:**

| Параметр | Тип | За замовчуванням | Опис |
|----------|-----|------------------|------|
| `days` | `int` | `30` | Кількість днів назад |
| `group_by` | `string` | `day` | Групування: `day`, `week`, `month` |

**Відповідь (200 OK):**

```json
{
    "period": {
        "from": "2026-03-06",
        "to": "2026-04-05"
    },
    "summary": {
        "total_invoices": 156,
        "total_net": "125430.00",
        "total_tax": "28848.90",
        "total_gross": "154278.90",
        "total_corrections": 3,
        "average_invoice_value": "989.22"
    },
    "by_status": {
        "issued": 120,
        "sent": 25,
        "paid": 8,
        "cancelled": 3
    },
    "by_tax_rate": {
        "23": { "count": 140, "net": "110000.00", "tax": "25300.00" },
        "8": { "count": 12, "net": "12000.00", "tax": "960.00" },
        "5": { "count": 4, "net": "3430.00", "tax": "171.50" }
    },
    "timeline": [
        { "date": "2026-04-05", "count": 5, "gross": "4890.00" },
        { "date": "2026-04-04", "count": 7, "gross": "6230.00" }
    ]
}
```

## Ендпоінт налаштувань

### Оновлення налаштувань PRO

```
POST /wp-json/polski-pro/v1/settings
```

**Параметри body (JSON):**

| Параметр | Тип | Опис |
|----------|-----|------|
| `section` | `string` | Секція налаштувань: `invoices`, `catalog`, `quote`, `inpost`, `accounting` |
| `settings` | `object` | Об'єкт із парами ключ-значення налаштувань |

**Запит:**

```json
{
    "section": "invoices",
    "settings": {
        "auto_issue": true,
        "trigger_status": "processing",
        "default_type": "vat",
        "due_days": 14,
        "number_format": "FV/{year}/{month}/{number}"
    }
}
```

**Відповідь (200 OK):**

```json
{
    "section": "invoices",
    "settings": {
        "auto_issue": true,
        "trigger_status": "processing",
        "default_type": "vat",
        "due_days": 14,
        "number_format": "FV/{year}/{month}/{number}"
    },
    "updated_at": "2026-04-05T14:20:00+02:00"
}
```

## Ендпоінт генерації правових документів

### Генерація правового документа

```
POST /wp-json/polski-pro/v1/legal/generate
```

Генерує правові документи (регламент, політику конфіденційності) на основі даних магазину.

**Параметри body (JSON):**

| Параметр | Тип | Обов'язковий | Опис |
|----------|-----|-------------|------|
| `type` | `string` | Так | Тип документа: `terms`, `privacy`, `withdrawal`, `cookies` |
| `company_data` | `object` | Так | Дані компанії |
| `company_data.name` | `string` | Так | Назва компанії |
| `company_data.nip` | `string` | Так | NIP |
| `company_data.address` | `string` | Так | Адреса |
| `company_data.email` | `string` | Так | Контактна електронна пошта |
| `company_data.phone` | `string` | Ні | Телефон |
| `format` | `string` | Ні | Формат: `html` (за замовчуванням), `markdown`, `pdf` |
| `language` | `string` | Ні | Мова: `pl` (за замовчуванням) |

**Запит:**

```json
{
    "type": "terms",
    "company_data": {
        "name": "Mój Sklep Sp. z o.o.",
        "nip": "9876543210",
        "address": "ul. Sklepowa 5, 02-222 Warszawa",
        "email": "kontakt@mojsklep.pl",
        "phone": "+48 123 456 789"
    },
    "format": "html"
}
```

**Відповідь (200 OK):**

```json
{
    "type": "terms",
    "content": "<h1>Regulamin sklepu internetowego...</h1>...",
    "format": "html",
    "generated_at": "2026-04-05T14:25:00+02:00",
    "word_count": 3200,
    "sections": [
        "Postanowienia ogólne",
        "Składanie zamówień",
        "Płatności",
        "Dostawa",
        "Prawo odstąpienia od umowy",
        "Reklamacje",
        "Dane osobowe",
        "Postanowienia końcowe"
    ]
}
```

## Коди помилок

Усі ендпоінти повертають стандартизовані коди помилок:

| Код HTTP | Код помилки | Опис |
|----------|------------|------|
| 400 | `invalid_params` | Неправильні параметри запиту |
| 401 | `rest_not_logged_in` | Користувач не авторизований |
| 403 | `rest_forbidden` | Відсутнє право `manage_woocommerce` |
| 404 | `invoice_not_found` | Рахунок-фактура не існує |
| 409 | `invoice_already_exists` | Рахунок-фактура для цього замовлення вже існує |
| 422 | `validation_error` | Помилка валідації даних |
| 429 | `rate_limit_exceeded` | Перевищено ліміт запитів (60/хв) |
| 500 | `internal_error` | Внутрішня помилка сервера |

## Ліміти та throttling

API застосовує rate limiting: максимум 60 запитів на хвилину на користувача. Після перевищення ліміту повертається відповідь `429` із заголовком `Retry-After`.

```
HTTP/1.1 429 Too Many Requests
Retry-After: 30
```

## Подальші кроки

- Повідомляйте про проблеми: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Пов'язане: [Бухгалтерські інтеграції](/pro/accounting)

<div class="disclaimer">Ця сторінка має виключно інформаційний характер і не є юридичною консультацією. Перед впровадженням зверніться до юриста. Polski for WooCommerce - це програмне забезпечення з відкритим кодом (GPLv2), що надається без гарантій.</div>
