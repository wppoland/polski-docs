---
title: PRO REST API
description: Dokumentacja REST API Polski PRO for WooCommerce - endpointy faktur, ustawień, generowania dokumentów prawnych i integracji z KSeF.
---

Polski PRO for WooCommerce udostępnia REST API w namespace `polski-pro/v1` do zarządzania fakturami, ustawieniami i dokumentami prawnymi. API jest dostępne dla uwierzytelnionych użytkowników z uprawnieniem `manage_woocommerce`.

:::note[Wymagania]
Polski PRO wymaga: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Uwierzytelnianie

API wymaga dwóch elementów autoryzacji:

1. **Nonce WordPress** - nagłówek `X-WP-Nonce` z wartością wygenerowaną przez `wp_create_nonce('wp_rest')`
2. **Uprawnienie** - zalogowany użytkownik musi posiadać capability `manage_woocommerce`

### Przykład uwierzytelnienia (JavaScript)

```javascript
const response = await fetch('/wp-json/polski-pro/v1/invoices', {
    headers: {
        'X-WP-Nonce': wpApiSettings.nonce,
        'Content-Type': 'application/json',
    },
});
```

### Przykład uwierzytelnienia (PHP / cURL)

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

Nieuwierzytelnione żądania lub żądania od użytkowników bez wymaganego uprawnienia otrzymują odpowiedź `401 Unauthorized` lub `403 Forbidden`.

## Endpointy faktur

### Pobranie listy faktur

```
GET /wp-json/polski-pro/v1/invoices
```

**Parametry zapytania:**

| Parametr | Typ | Domyślna | Opis |
|----------|-----|----------|------|
| `page` | `int` | `1` | Numer strony |
| `per_page` | `int` | `20` | Liczba wyników na stronę (max 100) |
| `status` | `string` | `any` | Filtr statusu: `draft`, `issued`, `sent`, `paid`, `cancelled` |
| `date_from` | `string` | `null` | Data od (Y-m-d) |
| `date_to` | `string` | `null` | Data do (Y-m-d) |
| `order_id` | `int` | `null` | Filtr po ID zamówienia WooCommerce |
| `search` | `string` | `null` | Wyszukiwanie po numerze faktury lub nazwie kontrahenta |

**Odpowiedź (200 OK):**

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

### Utworzenie faktury z zamówienia

```
POST /wp-json/polski-pro/v1/invoices
```

**Parametry body (JSON):**

| Parametr | Typ | Wymagany | Opis |
|----------|-----|----------|------|
| `order_id` | `int` | Tak | ID zamówienia WooCommerce |
| `type` | `string` | Nie | Typ: `vat` (domyślnie), `proforma`, `receipt` |
| `issue_date` | `string` | Nie | Data wystawienia (Y-m-d), domyślnie dziś |
| `due_date` | `string` | Nie | Termin płatności (Y-m-d) |
| `notes` | `string` | Nie | Uwagi na fakturze |
| `send_to_provider` | `bool` | Nie | Wyślij do systemu księgowego (domyślnie `true`) |

**Żądanie:**

```json
{
    "order_id": 567,
    "type": "vat",
    "due_date": "2026-04-15",
    "notes": "Termin płatności 14 dni",
    "send_to_provider": true
}
```

**Odpowiedź (201 Created):**

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

### Pobranie szczegółów faktury

```
GET /wp-json/polski-pro/v1/invoices/{id}
```

Zwraca kompletne dane faktury wraz z pozycjami (items).

**Odpowiedź (200 OK):**

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

**Odpowiedź (404 Not Found):**

```json
{
    "code": "invoice_not_found",
    "message": "Faktura o podanym ID nie istnieje.",
    "data": { "status": 404 }
}
```

### Regenerowanie PDF faktury

```
POST /wp-json/polski-pro/v1/invoices/{id}/pdf
```

Regeneruje plik PDF faktury i zwraca URL do pobrania.

**Parametry body (opcjonalne):**

| Parametr | Typ | Opis |
|----------|-----|------|
| `template` | `string` | Szablon PDF: `default`, `minimal`, `detailed` |
| `language` | `string` | Język: `pl`, `en`, `de` |

**Odpowiedź (200 OK):**

```json
{
    "id": 43,
    "pdf_url": "https://example.com/wp-content/uploads/polski-pro/invoices/FV-2026-04-002.pdf",
    "generated_at": "2026-04-05T14:05:00+02:00",
    "file_size": 45678
}
```

### Wysłanie faktury do KSeF

```
POST /wp-json/polski-pro/v1/invoices/{id}/ksef
```

Wysyła fakturę do Krajowego Systemu e-Faktur (KSeF).

**Parametry body (opcjonalne):**

| Parametr | Typ | Opis |
|----------|-----|------|
| `test_mode` | `bool` | Wyślij do środowiska testowego KSeF (domyślnie `false`) |

**Odpowiedź (200 OK):**

```json
{
    "id": 43,
    "ksef_number": "1234567890-20260405-ABC123DEF456",
    "ksef_status": "accepted",
    "submitted_at": "2026-04-05T14:10:00+02:00",
    "upo_url": "https://example.com/wp-content/uploads/polski-pro/ksef/UPO-43.xml"
}
```

**Odpowiedź (422 Unprocessable Entity):**

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

### Utworzenie faktury korygującej

```
POST /wp-json/polski-pro/v1/invoices/{id}/correction
```

Tworzy fakturę korygującą powiązaną z fakturą źródłową.

**Parametry body (JSON):**

| Parametr | Typ | Wymagany | Opis |
|----------|-----|----------|------|
| `reason` | `string` | Tak | Powód korekty |
| `items` | `array` | Tak | Skorygowane pozycje |
| `items[].original_index` | `int` | Tak | Indeks pozycji na fakturze źródłowej (od 0) |
| `items[].quantity` | `int` | Nie | Nowa ilość |
| `items[].net_price` | `string` | Nie | Nowa cena netto |

**Żądanie:**

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

**Odpowiedź (201 Created):**

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

## Endpoint statystyk

### Pobranie statystyk faktur

```
GET /wp-json/polski-pro/v1/invoices/stats
```

**Parametry zapytania:**

| Parametr | Typ | Domyślna | Opis |
|----------|-----|----------|------|
| `days` | `int` | `30` | Liczba dni wstecz |
| `group_by` | `string` | `day` | Grupowanie: `day`, `week`, `month` |

**Odpowiedź (200 OK):**

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

## Endpoint ustawień

### Aktualizacja ustawień PRO

```
POST /wp-json/polski-pro/v1/settings
```

**Parametry body (JSON):**

| Parametr | Typ | Opis |
|----------|-----|------|
| `section` | `string` | Sekcja ustawień: `invoices`, `catalog`, `quote`, `inpost`, `accounting` |
| `settings` | `object` | Obiekt z parami klucz-wartość ustawień |

**Żądanie:**

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

**Odpowiedź (200 OK):**

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

## Endpoint generowania dokumentów prawnych

### Generowanie dokumentu prawnego

```
POST /wp-json/polski-pro/v1/legal/generate
```

Generuje dokumenty prawne (regulamin, polityka prywatności) na podstawie danych sklepu.

**Parametry body (JSON):**

| Parametr | Typ | Wymagany | Opis |
|----------|-----|----------|------|
| `type` | `string` | Tak | Typ dokumentu: `terms`, `privacy`, `withdrawal`, `cookies` |
| `company_data` | `object` | Tak | Dane firmy |
| `company_data.name` | `string` | Tak | Nazwa firmy |
| `company_data.nip` | `string` | Tak | NIP |
| `company_data.address` | `string` | Tak | Adres |
| `company_data.email` | `string` | Tak | E-mail kontaktowy |
| `company_data.phone` | `string` | Nie | Telefon |
| `format` | `string` | Nie | Format: `html` (domyślnie), `markdown`, `pdf` |
| `language` | `string` | Nie | Język: `pl` (domyślnie) |

**Żądanie:**

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

**Odpowiedź (200 OK):**

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

## Kody błędów

Wszystkie endpointy zwracają ustandaryzowane kody błędów:

| Kod HTTP | Kod błędu | Opis |
|----------|-----------|------|
| 400 | `invalid_params` | Nieprawidłowe parametry żądania |
| 401 | `rest_not_logged_in` | Użytkownik niezalogowany |
| 403 | `rest_forbidden` | Brak uprawnienia `manage_woocommerce` |
| 404 | `invoice_not_found` | Faktura nie istnieje |
| 409 | `invoice_already_exists` | Faktura dla tego zamówienia już istnieje |
| 422 | `validation_error` | Błąd walidacji danych |
| 429 | `rate_limit_exceeded` | Przekroczono limit żądań (60/min) |
| 500 | `internal_error` | Błąd wewnętrzny serwera |

## Limity i throttling

API stosuje rate limiting: maksymalnie 60 żądań na minutę na użytkownika. Po przekroczeniu limitu zwracana jest odpowiedź `429` z nagłówkiem `Retry-After`.

```
HTTP/1.1 429 Too Many Requests
Retry-After: 30
```

## Dalsze kroki

- Zgłaszaj problemy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Powiązane: [Integracje księgowe](/pro/accounting)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
