---
title: PRO REST API
description: Dokumentation der REST API von Polski PRO for WooCommerce - Endpunkte für Rechnungen, Einstellungen, Erzeugung rechtlicher Dokumente und KSeF-Integration.
---

REST API im Namespace `polski-pro/v1` zur Verwaltung von Rechnungen, Einstellungen und rechtlichen Dokumenten. Erfordert Authentifizierung und die Berechtigung `manage_woocommerce`.

:::note[Voraussetzungen]
Polski PRO erfordert: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Authentifizierung

Die API erfordert zwei Autorisierungselemente:

1. **WordPress-Nonce** - Header `X-WP-Nonce` mit dem von `wp_create_nonce('wp_rest')` erzeugten Wert
2. **Berechtigung** - der angemeldete Benutzer muss die Capability `manage_woocommerce` besitzen

### Beispiel für die Authentifizierung (JavaScript)

```javascript
const response = await fetch('/wp-json/polski-pro/v1/invoices', {
    headers: {
        'X-WP-Nonce': wpApiSettings.nonce,
        'Content-Type': 'application/json',
    },
});
```

### Beispiel für die Authentifizierung (PHP / cURL)

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

Ohne Authentifizierung oder Berechtigung gibt die API `401 Unauthorized` oder `403 Forbidden` zurück.

## Rechnungs-Endpunkte

### Liste der Rechnungen abrufen

```
GET /wp-json/polski-pro/v1/invoices
```

**Query-Parameter:**

| Parameter | Typ | Standard | Beschreibung |
|----------|-----|----------|------|
| `page` | `int` | `1` | Seitennummer |
| `per_page` | `int` | `20` | Anzahl der Ergebnisse pro Seite (max. 100) |
| `status` | `string` | `any` | Statusfilter: `draft`, `issued`, `sent`, `paid`, `cancelled` |
| `date_from` | `string` | `null` | Datum von (Y-m-d) |
| `date_to` | `string` | `null` | Datum bis (Y-m-d) |
| `order_id` | `int` | `null` | Filter nach WooCommerce-Bestell-ID |
| `search` | `string` | `null` | Suche nach Rechnungsnummer oder Name des Kontrahenten |

**Antwort (200 OK):**

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

### Rechnung aus einer Bestellung erstellen

```
POST /wp-json/polski-pro/v1/invoices
```

**Body-Parameter (JSON):**

| Parameter | Typ | Erforderlich | Beschreibung |
|----------|-----|----------|------|
| `order_id` | `int` | Ja | WooCommerce-Bestell-ID |
| `type` | `string` | Nein | Typ: `vat` (Standard), `proforma`, `receipt` |
| `issue_date` | `string` | Nein | Ausstellungsdatum (Y-m-d), Standard ist heute |
| `due_date` | `string` | Nein | Zahlungsziel (Y-m-d) |
| `notes` | `string` | Nein | Anmerkungen auf der Rechnung |
| `send_to_provider` | `bool` | Nein | An das Buchhaltungssystem senden (Standard `true`) |

**Anfrage:**

```json
{
    "order_id": 567,
    "type": "vat",
    "due_date": "2026-04-15",
    "notes": "Termin płatności 14 dni",
    "send_to_provider": true
}
```

**Antwort (201 Created):**

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

### Rechnungsdetails abrufen

```
GET /wp-json/polski-pro/v1/invoices/{id}
```

Gibt die vollständigen Rechnungsdaten samt Positionen (items) zurück.

**Antwort (200 OK):**

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

**Antwort (404 Not Found):**

```json
{
    "code": "invoice_not_found",
    "message": "Faktura o podanym ID nie istnieje.",
    "data": { "status": 404 }
}
```

### PDF der Rechnung neu erzeugen

```
POST /wp-json/polski-pro/v1/invoices/{id}/pdf
```

Erzeugt die PDF-Datei der Rechnung neu und gibt die Download-URL zurück.

**Body-Parameter (optional):**

| Parameter | Typ | Beschreibung |
|----------|-----|------|
| `template` | `string` | PDF-Vorlage: `default`, `minimal`, `detailed` |
| `language` | `string` | Sprache: `pl`, `en`, `de` |

**Antwort (200 OK):**

```json
{
    "id": 43,
    "pdf_url": "https://example.com/wp-content/uploads/polski-pro/invoices/FV-2026-04-002.pdf",
    "generated_at": "2026-04-05T14:05:00+02:00",
    "file_size": 45678
}
```

### Rechnung an KSeF senden

```
POST /wp-json/polski-pro/v1/invoices/{id}/ksef
```

Sendet die Rechnung an das nationale e-Rechnungssystem KSeF.

**Body-Parameter (optional):**

| Parameter | Typ | Beschreibung |
|----------|-----|------|
| `test_mode` | `bool` | An die KSeF-Testumgebung senden (Standard `false`) |

**Antwort (200 OK):**

```json
{
    "id": 43,
    "ksef_number": "1234567890-20260405-ABC123DEF456",
    "ksef_status": "accepted",
    "submitted_at": "2026-04-05T14:10:00+02:00",
    "upo_url": "https://example.com/wp-content/uploads/polski-pro/ksef/UPO-43.xml"
}
```

**Antwort (422 Unprocessable Entity):**

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

### Korrekturrechnung erstellen

```
POST /wp-json/polski-pro/v1/invoices/{id}/correction
```

Erstellt eine Korrekturrechnung, die mit der Ausgangsrechnung verknüpft ist.

**Body-Parameter (JSON):**

| Parameter | Typ | Erforderlich | Beschreibung |
|----------|-----|----------|------|
| `reason` | `string` | Ja | Grund der Korrektur |
| `items` | `array` | Ja | Korrigierte Positionen |
| `items[].original_index` | `int` | Ja | Index der Position auf der Ausgangsrechnung (ab 0) |
| `items[].quantity` | `int` | Nein | Neue Menge |
| `items[].net_price` | `string` | Nein | Neuer Nettopreis |

**Anfrage:**

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

**Antwort (201 Created):**

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

## Statistik-Endpunkt

### Rechnungsstatistiken abrufen

```
GET /wp-json/polski-pro/v1/invoices/stats
```

**Query-Parameter:**

| Parameter | Typ | Standard | Beschreibung |
|----------|-----|----------|------|
| `days` | `int` | `30` | Anzahl der Tage rückwärts |
| `group_by` | `string` | `day` | Gruppierung: `day`, `week`, `month` |

**Antwort (200 OK):**

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

## Einstellungs-Endpunkt

### PRO-Einstellungen aktualisieren

```
POST /wp-json/polski-pro/v1/settings
```

**Body-Parameter (JSON):**

| Parameter | Typ | Beschreibung |
|----------|-----|------|
| `section` | `string` | Einstellungsbereich: `invoices`, `catalog`, `quote`, `inpost`, `accounting` |
| `settings` | `object` | Objekt mit Schlüssel-Wert-Paaren der Einstellungen |

**Anfrage:**

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

**Antwort (200 OK):**

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

## Endpunkt zur Erzeugung rechtlicher Dokumente

### Rechtliches Dokument erzeugen

```
POST /wp-json/polski-pro/v1/legal/generate
```

Erzeugt rechtliche Dokumente auf Basis der Shop-Daten.

**Body-Parameter (JSON):**

| Parameter | Typ | Erforderlich | Beschreibung |
|----------|-----|----------|------|
| `type` | `string` | Ja | Dokumenttyp: `terms`, `privacy`, `withdrawal`, `cookies` |
| `company_data` | `object` | Ja | Firmendaten |
| `company_data.name` | `string` | Ja | Firmenname |
| `company_data.nip` | `string` | Ja | NIP |
| `company_data.address` | `string` | Ja | Adresse |
| `company_data.email` | `string` | Ja | Kontakt-E-Mail |
| `company_data.phone` | `string` | Nein | Telefon |
| `format` | `string` | Nein | Format: `html` (Standard), `markdown`, `pdf` |
| `language` | `string` | Nein | Sprache: `pl` (Standard) |

**Anfrage:**

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

**Antwort (200 OK):**

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

## Fehlercodes

Alle Endpunkte geben standardisierte Fehlercodes zurück:

| HTTP-Code | Fehlercode | Beschreibung |
|----------|-----------|------|
| 400 | `invalid_params` | Ungültige Anfrageparameter |
| 401 | `rest_not_logged_in` | Benutzer nicht angemeldet |
| 403 | `rest_forbidden` | Fehlende Berechtigung `manage_woocommerce` |
| 404 | `invoice_not_found` | Rechnung existiert nicht |
| 409 | `invoice_already_exists` | Für diese Bestellung existiert bereits eine Rechnung |
| 422 | `validation_error` | Datenvalidierungsfehler |
| 429 | `rate_limit_exceeded` | Anfragelimit überschritten (60/min) |
| 500 | `internal_error` | Interner Serverfehler |

## Limits und Throttling

Limit: 60 Anfragen pro Minute und Benutzer. Bei Überschreitung gibt die API `429` mit dem Header `Retry-After` zurück.

```
HTTP/1.1 429 Too Many Requests
Retry-After: 30
```

## Nächste Schritte

- Probleme melden: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Verwandt: [Buchhaltungs-Integrationen](/pro/accounting)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
