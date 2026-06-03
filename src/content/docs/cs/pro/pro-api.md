---
title: PRO REST API
description: Dokumentace REST API Polski PRO for WooCommerce - endpointy faktur, nastavení, generování právních dokumentů a integrace s KSeF.
---

REST API v namespace `polski-pro/v1` pro správu faktur, nastavení a právních dokumentů. Vyžaduje autentizaci a oprávnění `manage_woocommerce`.

:::note[Požadavky]
Polski PRO vyžaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Autentizace

API vyžaduje dva prvky autorizace:

1. **WordPress nonce** - záhlaví `X-WP-Nonce` s hodnotou vygenerovanou pomocí `wp_create_nonce('wp_rest')`
2. **Oprávnění** - přihlášený uživatel musí mít capability `manage_woocommerce`

### Příklad autentizace (JavaScript)

```javascript
const response = await fetch('/wp-json/polski-pro/v1/invoices', {
    headers: {
        'X-WP-Nonce': wpApiSettings.nonce,
        'Content-Type': 'application/json',
    },
});
```

### Příklad autentizace (PHP / cURL)

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

Bez autentizace nebo oprávnění API vrací `401 Unauthorized` nebo `403 Forbidden`.

## Endpointy faktur

### Získání seznamu faktur

```
GET /wp-json/polski-pro/v1/invoices
```

**Parametry dotazu:**

| Parametr | Typ | Výchozí | Popis |
|----------|-----|----------|------|
| `page` | `int` | `1` | Číslo stránky |
| `per_page` | `int` | `20` | Počet výsledků na stránku (max 100) |
| `status` | `string` | `any` | Filtr stavu: `draft`, `issued`, `sent`, `paid`, `cancelled` |
| `date_from` | `string` | `null` | Datum od (Y-m-d) |
| `date_to` | `string` | `null` | Datum do (Y-m-d) |
| `order_id` | `int` | `null` | Filtr podle ID objednávky WooCommerce |
| `search` | `string` | `null` | Vyhledávání podle čísla faktury nebo názvu odběratele |

**Odpověď (200 OK):**

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

### Vytvoření faktury z objednávky

```
POST /wp-json/polski-pro/v1/invoices
```

**Parametry body (JSON):**

| Parametr | Typ | Povinný | Popis |
|----------|-----|----------|------|
| `order_id` | `int` | Ano | ID objednávky WooCommerce |
| `type` | `string` | Ne | Typ: `vat` (výchozí), `proforma`, `receipt` |
| `issue_date` | `string` | Ne | Datum vystavení (Y-m-d), výchozí dnes |
| `due_date` | `string` | Ne | Termín splatnosti (Y-m-d) |
| `notes` | `string` | Ne | Poznámky na faktuře |
| `send_to_provider` | `bool` | Ne | Odeslat do účetního systému (výchozí `true`) |

**Požadavek:**

```json
{
    "order_id": 567,
    "type": "vat",
    "due_date": "2026-04-15",
    "notes": "Termín splatnosti 14 dní",
    "send_to_provider": true
}
```

**Odpověď (201 Created):**

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

### Získání detailů faktury

```
GET /wp-json/polski-pro/v1/invoices/{id}
```

Vrací kompletní data faktury včetně položek (items).

**Odpověď (200 OK):**

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
    "notes": "Termín splatnosti 14 dní",
    "external_id": "FV-12346",
    "provider": "fakturownia",
    "provider_status": "issued",
    "ksef_number": null
}
```

**Odpověď (404 Not Found):**

```json
{
    "code": "invoice_not_found",
    "message": "Faktura se zadaným ID neexistuje.",
    "data": { "status": 404 }
}
```

### Regenerace PDF faktury

```
POST /wp-json/polski-pro/v1/invoices/{id}/pdf
```

Regeneruje PDF soubor faktury a vrací URL ke stažení.

**Parametry body (volitelné):**

| Parametr | Typ | Popis |
|----------|-----|------|
| `template` | `string` | Šablona PDF: `default`, `minimal`, `detailed` |
| `language` | `string` | Jazyk: `pl`, `en`, `de` |

**Odpověď (200 OK):**

```json
{
    "id": 43,
    "pdf_url": "https://example.com/wp-content/uploads/polski-pro/invoices/FV-2026-04-002.pdf",
    "generated_at": "2026-04-05T14:05:00+02:00",
    "file_size": 45678
}
```

### Odeslání faktury do KSeF

```
POST /wp-json/polski-pro/v1/invoices/{id}/ksef
```

Odesílá fakturu do Krajowego Systemu e-Faktur (KSeF).

**Parametry body (volitelné):**

| Parametr | Typ | Popis |
|----------|-----|------|
| `test_mode` | `bool` | Odeslat do testovacího prostředí KSeF (výchozí `false`) |

**Odpověď (200 OK):**

```json
{
    "id": 43,
    "ksef_number": "1234567890-20260405-ABC123DEF456",
    "ksef_status": "accepted",
    "submitted_at": "2026-04-05T14:10:00+02:00",
    "upo_url": "https://example.com/wp-content/uploads/polski-pro/ksef/UPO-43.xml"
}
```

**Odpověď (422 Unprocessable Entity):**

```json
{
    "code": "ksef_validation_error",
    "message": "Faktura nesplňuje požadavky schématu KSeF.",
    "data": {
        "status": 422,
        "errors": [
            "Chybí NIP kupujícího",
            "Nesprávná sazba DPH pro položku 2"
        ]
    }
}
```

### Vytvoření opravné faktury

```
POST /wp-json/polski-pro/v1/invoices/{id}/correction
```

Vytváří opravnou fakturu propojenou se zdrojovou fakturou.

**Parametry body (JSON):**

| Parametr | Typ | Povinný | Popis |
|----------|-----|----------|------|
| `reason` | `string` | Ano | Důvod opravy |
| `items` | `array` | Ano | Opravené položky |
| `items[].original_index` | `int` | Ano | Index položky na zdrojové faktuře (od 0) |
| `items[].quantity` | `int` | Ne | Nové množství |
| `items[].net_price` | `string` | Ne | Nová cena bez DPH |

**Požadavek:**

```json
{
    "reason": "Vrácení 1 kusu produktu",
    "items": [
        {
            "original_index": 0,
            "quantity": 1,
            "net_price": "100.00"
        }
    ]
}
```

**Odpověď (201 Created):**

```json
{
    "id": 44,
    "number": "FK/2026/04/001",
    "type": "correction",
    "original_invoice_id": 43,
    "original_invoice_number": "FV/2026/04/002",
    "reason": "Vrácení 1 kusu produktu",
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

## Endpoint statistik

### Získání statistik faktur

```
GET /wp-json/polski-pro/v1/invoices/stats
```

**Parametry dotazu:**

| Parametr | Typ | Výchozí | Popis |
|----------|-----|----------|------|
| `days` | `int` | `30` | Počet dní zpět |
| `group_by` | `string` | `day` | Seskupení: `day`, `week`, `month` |

**Odpověď (200 OK):**

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

## Endpoint nastavení

### Aktualizace nastavení PRO

```
POST /wp-json/polski-pro/v1/settings
```

**Parametry body (JSON):**

| Parametr | Typ | Popis |
|----------|-----|------|
| `section` | `string` | Sekce nastavení: `invoices`, `catalog`, `quote`, `inpost`, `accounting` |
| `settings` | `object` | Objekt s páry klíč-hodnota nastavení |

**Požadavek:**

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

**Odpověď (200 OK):**

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

## Endpoint generování právních dokumentů

### Generování právního dokumentu

```
POST /wp-json/polski-pro/v1/legal/generate
```

Generuje právní dokumenty na základě dat obchodu.

**Parametry body (JSON):**

| Parametr | Typ | Povinný | Popis |
|----------|-----|----------|------|
| `type` | `string` | Ano | Typ dokumentu: `terms`, `privacy`, `withdrawal`, `cookies` |
| `company_data` | `object` | Ano | Údaje firmy |
| `company_data.name` | `string` | Ano | Název firmy |
| `company_data.nip` | `string` | Ano | NIP |
| `company_data.address` | `string` | Ano | Adresa |
| `company_data.email` | `string` | Ano | Kontaktní e-mail |
| `company_data.phone` | `string` | Ne | Telefon |
| `format` | `string` | Ne | Formát: `html` (výchozí), `markdown`, `pdf` |
| `language` | `string` | Ne | Jazyk: `pl` (výchozí) |

**Požadavek:**

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

**Odpověď (200 OK):**

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

## Kódy chyb

Všechny endpointy vracejí standardizované kódy chyb:

| HTTP kód | Kód chyby | Popis |
|----------|-----------|------|
| 400 | `invalid_params` | Nesprávné parametry požadavku |
| 401 | `rest_not_logged_in` | Uživatel nepřihlášen |
| 403 | `rest_forbidden` | Chybí oprávnění `manage_woocommerce` |
| 404 | `invoice_not_found` | Faktura neexistuje |
| 409 | `invoice_already_exists` | Faktura pro tuto objednávku již existuje |
| 422 | `validation_error` | Chyba validace dat |
| 429 | `rate_limit_exceeded` | Překročen limit požadavků (60/min) |
| 500 | `internal_error` | Vnitřní chyba serveru |

## Limity a throttling

Limit: 60 požadavků za minutu na uživatele. Po překročení API vrací `429` se záhlavím `Retry-After`.

```
HTTP/1.1 429 Too Many Requests
Retry-After: 30
```

## Další kroky

- Hlaste problémy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Související: [Účetní integrace](/pro/accounting)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
