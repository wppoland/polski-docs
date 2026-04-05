---
title: PRO REST API
description: Dokumentácia REST API Polski PRO for WooCommerce - endpointy faktúr, nastavení, generovania právnych dokumentov a integrácie s KSeF.
---

REST API v namespace `polski-pro/v1` na správu faktúr, nastavení a právnych dokumentov. Vyžaduje autentifikáciu a oprávnenie `manage_woocommerce`.

:::note[Požiadavky]
Polski PRO vyžaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Autentifikácia

API vyžaduje dva prvky autorizácie:

1. **Nonce WordPress** - hlavička `X-WP-Nonce` s hodnotou vygenerovanou cez `wp_create_nonce('wp_rest')`
2. **Oprávnenie** - prihlásený používateľ musí mať capability `manage_woocommerce`

### Príklad autentifikácie (JavaScript)

```javascript
const response = await fetch('/wp-json/polski-pro/v1/invoices', {
    headers: {
        'X-WP-Nonce': wpApiSettings.nonce,
        'Content-Type': 'application/json',
    },
});
```

### Príklad autentifikácie (PHP / cURL)

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

Neautentifikované požiadavky alebo požiadavky od používateľov bez požadovaného oprávnenia dostanú odpoveď `401 Unauthorized` alebo `403 Forbidden`.

## Endpointy faktúr

### Získanie zoznamu faktúr

```
GET /wp-json/polski-pro/v1/invoices
```

**Parametre požiadavky:**

| Parameter | Typ | Predvolená | Popis |
|----------|-----|----------|------|
| `page` | `int` | `1` | Číslo stránky |
| `per_page` | `int` | `20` | Počet výsledkov na stránku (max 100) |
| `status` | `string` | `any` | Filter stavu: `draft`, `issued`, `sent`, `paid`, `cancelled` |
| `date_from` | `string` | `null` | Dátum od (Y-m-d) |
| `date_to` | `string` | `null` | Dátum do (Y-m-d) |
| `order_id` | `int` | `null` | Filter podľa ID objednávky WooCommerce |
| `search` | `string` | `null` | Vyhľadávanie podľa čísla faktúry alebo názvu odberateľa |

**Odpoveď (200 OK):**

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

### Vytvorenie faktúry z objednávky

```
POST /wp-json/polski-pro/v1/invoices
```

**Parametre body (JSON):**

| Parameter | Typ | Povinný | Popis |
|----------|-----|----------|------|
| `order_id` | `int` | Áno | ID objednávky WooCommerce |
| `type` | `string` | Nie | Typ: `vat` (predvolene), `proforma`, `receipt` |
| `issue_date` | `string` | Nie | Dátum vystavenia (Y-m-d), predvolene dnes |
| `due_date` | `string` | Nie | Lehota platby (Y-m-d) |
| `notes` | `string` | Nie | Poznámky na faktúre |
| `send_to_provider` | `bool` | Nie | Odoslať do účtovného systému (predvolene `true`) |

**Požiadavka:**

```json
{
    "order_id": 567,
    "type": "vat",
    "due_date": "2026-04-15",
    "notes": "Termin płatności 14 dni",
    "send_to_provider": true
}
```

**Odpoveď (201 Created):**

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

### Získanie podrobností faktúry

```
GET /wp-json/polski-pro/v1/invoices/{id}
```

Vracia kompletné dáta faktúry vrátane položiek (items).

**Odpoveď (200 OK):**

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

**Odpoveď (404 Not Found):**

```json
{
    "code": "invoice_not_found",
    "message": "Faktura o podanym ID nie istnieje.",
    "data": { "status": 404 }
}
```

### Regenerovanie PDF faktúry

```
POST /wp-json/polski-pro/v1/invoices/{id}/pdf
```

Regeneruje súbor PDF faktúry a vráti URL na stiahnutie.

**Parametre body (voliteľné):**

| Parameter | Typ | Popis |
|----------|-----|------|
| `template` | `string` | Šablóna PDF: `default`, `minimal`, `detailed` |
| `language` | `string` | Jazyk: `pl`, `en`, `de` |

**Odpoveď (200 OK):**

```json
{
    "id": 43,
    "pdf_url": "https://example.com/wp-content/uploads/polski-pro/invoices/FV-2026-04-002.pdf",
    "generated_at": "2026-04-05T14:05:00+02:00",
    "file_size": 45678
}
```

### Odoslanie faktúry do KSeF

```
POST /wp-json/polski-pro/v1/invoices/{id}/ksef
```

Odošle faktúru do Krajového systému e-faktúr (KSeF).

**Parametre body (voliteľné):**

| Parameter | Typ | Popis |
|----------|-----|------|
| `test_mode` | `bool` | Odoslať do testovacieho prostredia KSeF (predvolene `false`) |

**Odpoveď (200 OK):**

```json
{
    "id": 43,
    "ksef_number": "1234567890-20260405-ABC123DEF456",
    "ksef_status": "accepted",
    "submitted_at": "2026-04-05T14:10:00+02:00",
    "upo_url": "https://example.com/wp-content/uploads/polski-pro/ksef/UPO-43.xml"
}
```

**Odpoveď (422 Unprocessable Entity):**

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

### Vytvorenie opravnej faktúry

```
POST /wp-json/polski-pro/v1/invoices/{id}/correction
```

Vytvorí opravnú faktúru prepojenú so zdrojovou faktúrou.

**Parametre body (JSON):**

| Parameter | Typ | Povinný | Popis |
|----------|-----|----------|------|
| `reason` | `string` | Áno | Dôvod opravy |
| `items` | `array` | Áno | Opravené položky |
| `items[].original_index` | `int` | Áno | Index položky na zdrojovej faktúre (od 0) |
| `items[].quantity` | `int` | Nie | Nové množstvo |
| `items[].net_price` | `string` | Nie | Nová cena bez DPH |

**Požiadavka:**

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

**Odpoveď (201 Created):**

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

## Endpoint štatistík

### Získanie štatistík faktúr

```
GET /wp-json/polski-pro/v1/invoices/stats
```

**Parametre požiadavky:**

| Parameter | Typ | Predvolená | Popis |
|----------|-----|----------|------|
| `days` | `int` | `30` | Počet dní dozadu |
| `group_by` | `string` | `day` | Zoskupovanie: `day`, `week`, `month` |

**Odpoveď (200 OK):**

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

### Aktualizácia nastavení PRO

```
POST /wp-json/polski-pro/v1/settings
```

**Parametre body (JSON):**

| Parameter | Typ | Popis |
|----------|-----|------|
| `section` | `string` | Sekcia nastavení: `invoices`, `catalog`, `quote`, `inpost`, `accounting` |
| `settings` | `object` | Objekt s pármi kľúč-hodnota nastavení |

**Požiadavka:**

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

**Odpoveď (200 OK):**

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

## Endpoint generovania právnych dokumentov

### Generovanie právneho dokumentu

```
POST /wp-json/polski-pro/v1/legal/generate
```

Generuje právne dokumenty (obchodné podmienky, zásady ochrany osobných údajov) na základe dát obchodu.

**Parametre body (JSON):**

| Parameter | Typ | Povinný | Popis |
|----------|-----|----------|------|
| `type` | `string` | Áno | Typ dokumentu: `terms`, `privacy`, `withdrawal`, `cookies` |
| `company_data` | `object` | Áno | Dáta firmy |
| `company_data.name` | `string` | Áno | Názov firmy |
| `company_data.nip` | `string` | Áno | IČ DPH |
| `company_data.address` | `string` | Áno | Adresa |
| `company_data.email` | `string` | Áno | Kontaktný e-mail |
| `company_data.phone` | `string` | Nie | Telefón |
| `format` | `string` | Nie | Formát: `html` (predvolene), `markdown`, `pdf` |
| `language` | `string` | Nie | Jazyk: `pl` (predvolene) |

**Požiadavka:**

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

**Odpoveď (200 OK):**

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

## Chybové kódy

Všetky endpointy vracajú štandardizované chybové kódy:

| HTTP kód | Kód chyby | Popis |
|----------|-----------|------|
| 400 | `invalid_params` | Neplatné parametre požiadavky |
| 401 | `rest_not_logged_in` | Používateľ neprihlásený |
| 403 | `rest_forbidden` | Chýba oprávnenie `manage_woocommerce` |
| 404 | `invoice_not_found` | Faktúra neexistuje |
| 409 | `invoice_already_exists` | Faktúra pre túto objednávku už existuje |
| 422 | `validation_error` | Chyba validácie dát |
| 429 | `rate_limit_exceeded` | Prekročený limit požiadaviek (60/min) |
| 500 | `internal_error` | Interná chyba servera |

## Limity a throttling

API uplatňuje rate limiting: maximálne 60 požiadaviek za minútu na používateľa. Po prekročení limitu sa vracia odpoveď `429` s hlavičkou `Retry-After`.

```
HTTP/1.1 429 Too Many Requests
Retry-After: 30
```

## Ďalšie kroky

- Hlásenie problémov: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Súvisiace: [Účtovné integrácie](/pro/accounting)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
