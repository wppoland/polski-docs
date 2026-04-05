---
title: PRO REST API
description: Dokumentace REST API Polski PRO for WooCommerce - endpointy faktur, nastaveni, generovani pravnich dokumentu a integrace s KSeF.
---

Polski PRO for WooCommerce poskytuje REST API v namespace `polski-pro/v1` pro spravu faktur, nastaveni a pravnich dokumentu. API je dostupne pro autentizovane uzivatele s opravnenim `manage_woocommerce`.

:::note[Pozadavky]
Polski PRO vyzaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Autentizace

API vyzaduje dva prvky autorizace:

1. **Nonce WordPress** - hlavicka `X-WP-Nonce` s hodnotou vygenerovanou pomoci `wp_create_nonce('wp_rest')`
2. **Opravneni** - prihlaseny uzivatel musi mit capability `manage_woocommerce`

### Priklad autentizace (JavaScript)

```javascript
const response = await fetch('/wp-json/polski-pro/v1/invoices', {
    headers: {
        'X-WP-Nonce': wpApiSettings.nonce,
        'Content-Type': 'application/json',
    },
});
```

### Priklad autentizace (PHP / cURL)

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

Neautentizovane pozadavky nebo pozadavky od uzivatelu bez pozadovaneho opravneni obdrzi odpoved `401 Unauthorized` nebo `403 Forbidden`.

## Endpointy faktur

### Ziskani seznamu faktur

```
GET /wp-json/polski-pro/v1/invoices
```

**Parametry dotazu:**

| Parametr | Typ | Vychozi | Popis |
|----------|-----|---------|-------|
| `page` | `int` | `1` | Cislo stranky |
| `per_page` | `int` | `20` | Pocet vysledku na stranku (max 100) |
| `status` | `string` | `any` | Filtr statusu: `draft`, `issued`, `sent`, `paid`, `cancelled` |
| `date_from` | `string` | `null` | Datum od (Y-m-d) |
| `date_to` | `string` | `null` | Datum do (Y-m-d) |
| `order_id` | `int` | `null` | Filtr podle ID objednavky WooCommerce |
| `search` | `string` | `null` | Vyhledavani podle cisla faktury nebo nazvu odberatele |

**Odpoved (200 OK):**

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

### Vytvoreni faktury z objednavky

```
POST /wp-json/polski-pro/v1/invoices
```

**Parametry body (JSON):**

| Parametr | Typ | Povinny | Popis |
|----------|-----|---------|-------|
| `order_id` | `int` | Ano | ID objednavky WooCommerce |
| `type` | `string` | Ne | Typ: `vat` (vychozi), `proforma`, `receipt` |
| `issue_date` | `string` | Ne | Datum vystaveni (Y-m-d), vychozi dnes |
| `due_date` | `string` | Ne | Splatnost (Y-m-d) |
| `notes` | `string` | Ne | Poznamky na fakture |
| `send_to_provider` | `bool` | Ne | Odeslat do ucetniho systemu (vychozi `true`) |

**Pozadavek:**

```json
{
    "order_id": 567,
    "type": "vat",
    "due_date": "2026-04-15",
    "notes": "Termin płatności 14 dni",
    "send_to_provider": true
}
```

**Odpoved (201 Created):**

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

### Ziskani detailu faktury

```
GET /wp-json/polski-pro/v1/invoices/{id}
```

Vraci kompletni data faktury vcetne polozek (items).

**Odpoved (200 OK):**

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

**Odpoved (404 Not Found):**

```json
{
    "code": "invoice_not_found",
    "message": "Faktura o podanym ID nie istnieje.",
    "data": { "status": 404 }
}
```

### Regenerace PDF faktury

```
POST /wp-json/polski-pro/v1/invoices/{id}/pdf
```

Regeneruje soubor PDF faktury a vraci URL ke stazeni.

**Parametry body (volitelne):**

| Parametr | Typ | Popis |
|----------|-----|-------|
| `template` | `string` | Sablona PDF: `default`, `minimal`, `detailed` |
| `language` | `string` | Jazyk: `pl`, `en`, `de` |

**Odpoved (200 OK):**

```json
{
    "id": 43,
    "pdf_url": "https://example.com/wp-content/uploads/polski-pro/invoices/FV-2026-04-002.pdf",
    "generated_at": "2026-04-05T14:05:00+02:00",
    "file_size": 45678
}
```

### Odeslani faktury do KSeF

```
POST /wp-json/polski-pro/v1/invoices/{id}/ksef
```

Odesle fakturu do Krajoweho systemu e-Faktur (KSeF).

**Parametry body (volitelne):**

| Parametr | Typ | Popis |
|----------|-----|-------|
| `test_mode` | `bool` | Odeslat do testovaciho prostredi KSeF (vychozi `false`) |

**Odpoved (200 OK):**

```json
{
    "id": 43,
    "ksef_number": "1234567890-20260405-ABC123DEF456",
    "ksef_status": "accepted",
    "submitted_at": "2026-04-05T14:10:00+02:00",
    "upo_url": "https://example.com/wp-content/uploads/polski-pro/ksef/UPO-43.xml"
}
```

**Odpoved (422 Unprocessable Entity):**

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

### Vytvoreni opravne faktury

```
POST /wp-json/polski-pro/v1/invoices/{id}/correction
```

Vytvori opravnou fakturu spojenou se zdrojovou fakturou.

**Parametry body (JSON):**

| Parametr | Typ | Povinny | Popis |
|----------|-----|---------|-------|
| `reason` | `string` | Ano | Duvod opravy |
| `items` | `array` | Ano | Opravene polozky |
| `items[].original_index` | `int` | Ano | Index polozky na zdrojove fakture (od 0) |
| `items[].quantity` | `int` | Ne | Nove mnozstvi |
| `items[].net_price` | `string` | Ne | Nova cena bez DPH |

**Pozadavek:**

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

**Odpoved (201 Created):**

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

## Endpoint statistik

### Ziskani statistik faktur

```
GET /wp-json/polski-pro/v1/invoices/stats
```

**Parametry dotazu:**

| Parametr | Typ | Vychozi | Popis |
|----------|-----|---------|-------|
| `days` | `int` | `30` | Pocet dnu zpet |
| `group_by` | `string` | `day` | Seskupeni: `day`, `week`, `month` |

**Odpoved (200 OK):**

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

## Endpoint nastaveni

### Aktualizace nastaveni PRO

```
POST /wp-json/polski-pro/v1/settings
```

**Parametry body (JSON):**

| Parametr | Typ | Popis |
|----------|-----|-------|
| `section` | `string` | Sekce nastaveni: `invoices`, `catalog`, `quote`, `inpost`, `accounting` |
| `settings` | `object` | Objekt s pary klic-hodnota nastaveni |

**Pozadavek:**

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

**Odpoved (200 OK):**

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

## Endpoint generovani pravnich dokumentu

### Generovani pravniho dokumentu

```
POST /wp-json/polski-pro/v1/legal/generate
```

Generuje pravni dokumenty (obchodni podminky, zasady ochrany osobnich udaju) na zaklade dat obchodu.

**Parametry body (JSON):**

| Parametr | Typ | Povinny | Popis |
|----------|-----|---------|-------|
| `type` | `string` | Ano | Typ dokumentu: `terms`, `privacy`, `withdrawal`, `cookies` |
| `company_data` | `object` | Ano | Data firmy |
| `company_data.name` | `string` | Ano | Nazev firmy |
| `company_data.nip` | `string` | Ano | DIC |
| `company_data.address` | `string` | Ano | Adresa |
| `company_data.email` | `string` | Ano | Kontaktni e-mail |
| `company_data.phone` | `string` | Ne | Telefon |
| `format` | `string` | Ne | Format: `html` (vychozi), `markdown`, `pdf` |
| `language` | `string` | Ne | Jazyk: `pl` (vychozi) |

**Pozadavek:**

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

**Odpoved (200 OK):**

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

## Kody chyb

Vsechny endpointy vraceji standardizovane kody chyb:

| Kod HTTP | Kod chyby | Popis |
|----------|-----------|-------|
| 400 | `invalid_params` | Neplatne parametry pozadavku |
| 401 | `rest_not_logged_in` | Uzivatel neprihlasen |
| 403 | `rest_forbidden` | Chybi opravneni `manage_woocommerce` |
| 404 | `invoice_not_found` | Faktura neexistuje |
| 409 | `invoice_already_exists` | Faktura pro tuto objednavku jiz existuje |
| 422 | `validation_error` | Chyba validace dat |
| 429 | `rate_limit_exceeded` | Prekrocen limit pozadavku (60/min) |
| 500 | `internal_error` | Interni chyba serveru |

## Limity a throttling

API pouziva rate limiting: maximalne 60 pozadavku za minutu na uzivatele. Po prekroceni limitu je vracena odpoved `429` s hlavickou `Retry-After`.

```
HTTP/1.1 429 Too Many Requests
Retry-After: 30
```

## Dalsi kroky

- Hlaste problemy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Souvisejici: [Ucetni integrace](/pro/accounting)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
