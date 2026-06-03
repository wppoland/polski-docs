---
title: Rechnungssystem
description: Dokumentation des Rechnungssystems von Polski PRO for WooCommerce - VAT-Rechnung, Korrekturrechnung, Quittung, Lieferschein (WZ), PDF-Generierung, Nummerierung und REST API.
---

Das Rechnungsmodul generiert Verkaufsdokumente direkt in WooCommerce. Es unterstuetzt vier Dokumenttypen, automatische Nummerierung und PDF.

## Dokumenttypen

### VAT-Rechnung

Standard-VAT-Rechnung mit folgenden Daten:

- Daten von Verkaeufer und Kaeufer (einschliesslich NIP beider Parteien)
- Positionen mit Name, Menge, Nettopreis, VAT-Satz, VAT-Betrag und Bruttopreis
- Zusammenfassung mit Aufschluesselung nach VAT-Saetzen
- Rechnungsnummer, Ausstellungsdatum und Verkaufsdatum
- Zahlungsfrist und Zahlungsweise

### Korrekturrechnung

Korrektur einer frueheren Rechnung. Enthaelt:

- Nummer und Datum der korrigierten Rechnung
- Positionen vor und nach der Korrektur
- Wertdifferenz
- Korrekturgrund

Stelle die Korrektur aus dem Bestellbereich oder ueber die REST API aus.

### Quittung

Vereinfachtes Dokument fuer Kunden ohne NIP. Enthaelt Positionen mit Bruttopreisen und eine Zusammenfassung.

### Lieferschein (WZ, Packing Slip)

Dokument, das der Sendung beigelegt wird. Enthaelt eine Liste der Produkte und Mengen, ohne Preise.

## Konfiguration

Gehe zu **WooCommerce > Einstellungen > Polski > PRO-Module > Rechnungen**.

### Verkaeuferdaten

| Feld | Beschreibung |
|------|------|
| Firmenname | Vollstaendiger Name des Verkaeuferunternehmens |
| NIP | Steueridentifikationsnummer des Verkaeufers |
| Adresse | Strasse, Hausnummer, Postleitzahl, Stadt |
| Bankkontonummer | Kontonummer fuer Ueberweisungen |
| Kontakt-E-Mail | Auf der Rechnung sichtbare E-Mail-Adresse |

### Nummerierung

Verfuegbare Nummerierungsstrategien:

| Strategie | Format | Beispiel |
|-----------|--------|---------|
| Jaehrlich | `FV/{numer}/{rok}` | FV/1/2026 |
| Monatlich | `FV/{numer}/{miesiąc}/{rok}` | FV/1/04/2026 |
| Fortlaufend | `FV/{numer}` | FV/1 |
| Eigenes Muster | Vom Benutzer definiert | FV/2026/04/001 |

Verfuegbare Tokens im eigenen Format:

- `{numer}` - fortlaufende Rechnungsnummer (mit Zuruecksetzen je nach Strategie)
- `{rok}` - vierstelliges Jahr
- `{miesiac}` - zweistelliger Monat
- `{dzien}` - zweistelliger Tag
- `{id_zamowienia}` - WooCommerce-Bestell-ID

### Automatische Generierung

Aktiviere die Option **Automatische Rechnungserstellung**, damit das Plugin eine Rechnung erstellt, sobald der Status auf "Abgeschlossen" geaendert wird.

Du kannst auch das automatische Anhaengen der PDF-Rechnung an die E-Mail "Bestellung abgeschlossen" aktivieren.

## PDF-Generierung

Das PDF wird mit der TCPDF-Bibliothek generiert. Das Template enthaelt:

- Firmenlogo (optional, in den Einstellungen konfigurierbar)
- Daten von Verkaeufer und Kaeufer
- Positionstabelle mit VAT-Spalten
- Zusammenfassung mit Aufschluesselung nach VAT-Saetzen
- Fusszeile mit Firmendaten

### Schriftarten

Das Plugin verwendet die Schriftart DejaVu Sans mit Unterstuetzung polnischer Zeichen. Eine zusaetzliche Konfiguration ist nicht erforderlich.

## Rechnungsstatus

Statuszyklus einer Rechnung:

```
Draft (Entwurf) → Issued (Ausgestellt) → Sent (Versendet) → Paid (Bezahlt)
                                                           → Cancelled (Storniert)
```

| Status | Beschreibung |
|--------|------|
| Draft | Rechnung erstellt, aber noch nicht ausgestellt. Bearbeitbar |
| Issued | Rechnung mit vergebener Nummer ausgestellt. Nicht bearbeitbar |
| Sent | Rechnung an den Kunden versendet (E-Mail oder KSeF) |
| Paid | Rechnung bezahlt |
| Cancelled | Rechnung storniert. Erfordert die Ausstellung einer Korrektur |

## Bestellbereich

Im Bestellbereich fuegt das Modul eine Meta-Box "Rechnungen" mit folgenden Funktionen hinzu:

- **Rechnung ausstellen** - generiert eine Rechnung auf Basis der Bestelldaten
- **PDF herunterladen** - laedt die Rechnung im PDF-Format herunter
- **An Kunden senden** - sendet die Rechnung per E-Mail
- **Korrektur ausstellen** - erstellt eine Korrekturrechnung
- **Historie** - Liste aller mit der Bestellung verknuepften Dokumente

## VAT auf Positionen

Jede Rechnungsposition enthaelt detaillierte VAT-Daten:

- Netto-Einzelpreis
- VAT-Satz (23%, 8%, 5%, 0%, zw., np., oo.)
- VAT-Betrag je Einheit
- Nettowert
- Bruttowert

Das Plugin bezieht die VAT-Saetze aus der Konfiguration von WooCommerce Tax. Es unterstuetzt mehrere Saetze auf einer Rechnung.

## REST API

REST-API-Endpoints zur Verwaltung von Rechnungen:

### Rechnungsliste

```
GET /wp-json/polski-pro/v1/invoices
```

Query-Parameter:

| Parameter | Typ | Beschreibung |
|----------|-----|------|
| `order_id` | int | Nach Bestell-ID filtern |
| `status` | string | Nach Status filtern (draft, issued, sent, paid, cancelled) |
| `type` | string | Nach Typ filtern (invoice, correction, receipt, packing_slip) |
| `date_from` | string | Datum von (YYYY-MM-DD) |
| `date_to` | string | Datum bis (YYYY-MM-DD) |
| `per_page` | int | Anzahl der Ergebnisse pro Seite (Standard 20) |
| `page` | int | Seitennummer |

### Rechnung erstellen

```
POST /wp-json/polski-pro/v1/invoices
```

```json
{
    "order_id": 123,
    "type": "invoice",
    "auto_number": true
}
```

### PDF herunterladen

```
GET /wp-json/polski-pro/v1/invoices/{id}/pdf
```

Gibt die PDF-Datei als `application/pdf` mit dem Header `Content-Disposition: attachment` zurueck.

### Korrektur ausstellen

```
POST /wp-json/polski-pro/v1/invoices/{id}/correction
```

```json
{
    "reason": "Zmiana danych nabywcy",
    "items": [
        {
            "product_id": 45,
            "quantity": 1,
            "net_price": 100.00,
            "vat_rate": 23
        }
    ]
}
```

### Statistiken

```
GET /wp-json/polski-pro/v1/invoices/stats
```

Gibt Rechnungsstatistiken zurueck: Gesamtanzahl, Netto-/Bruttowerte, Aufschluesselung nach Status.

## Hooks

### `polski_pro/invoices/before_generate`

Aktion, die vor der Generierung einer Rechnung ausgeloest wird.

```php
/**
 * @param int    $order_id ID zamówienia
 * @param string $type     Typ dokumentu (invoice, correction, receipt, packing_slip)
 */
do_action('polski_pro/invoices/before_generate', int $order_id, string $type);
```

**Beispiel:**

```php
add_action('polski_pro/invoices/before_generate', function (int $order_id, string $type): void {
    if ($type === 'invoice') {
        // Logowanie generowania faktury
        error_log("Generowanie faktury dla zamówienia #{$order_id}");
    }
}, 10, 2);
```

### `polski_pro/invoices/number_format`

Filtert das Format der Rechnungsnummer.

```php
/**
 * @param string $number    Wygenerowany numer faktury
 * @param string $type      Typ dokumentu
 * @param int    $order_id  ID zamówienia
 */
apply_filters('polski_pro/invoices/number_format', string $number, string $type, int $order_id): string;
```

**Beispiel:**

```php
add_filter('polski_pro/invoices/number_format', function (string $number, string $type, int $order_id): string {
    if ($type === 'correction') {
        return 'KOR/' . $number;
    }
    return $number;
}, 10, 3);
```

### `polski_pro/invoices/pdf_content`

Filtert die an das PDF-Template uebergebenen Daten.

```php
/**
 * @param array  $data     Dane faktury (seller, buyer, items, totals)
 * @param int    $invoice_id ID faktury
 */
apply_filters('polski_pro/invoices/pdf_content', array $data, int $invoice_id): array;
```

**Beispiel:**

```php
add_filter('polski_pro/invoices/pdf_content', function (array $data, int $invoice_id): array {
    $data['footer_note'] = 'Dziękujemy za zakupy!';
    return $data;
}, 10, 2);
```

## Haeufige Probleme

### PDF erzeugt leere Seiten

1. Pruefe, ob die PHP-Erweiterung `mbstring` installiert ist
2. Stelle sicher, dass das Verzeichnis `wp-content/uploads/polski-pro/invoices/` Schreibrechte hat (755)
3. Verifiziere, ob die Verkaeuferdaten in den Einstellungen ausgefuellt sind

### Die Nummerierung wird zurueckgesetzt

Die Nummerierung wird gemaess der Strategie zurueckgesetzt: jaehrlich - am 1. Januar, monatlich - am 1. Tag des Monats. Du moechtest eine fortlaufende Nummerierung? Waehle die Strategie "Fortlaufend".

### Kein VAT auf den Positionen

Pruefe die Konfiguration von WooCommerce Tax. Stelle sicher, dass die VAT-Saetze fuer Polen korrekt eingestellt sind.

## Verwandte Ressourcen

- [KSeF-Integration](/pro/ksef/)
- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschliesslich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewaehrleistung bereitgestellt wird.</div>
