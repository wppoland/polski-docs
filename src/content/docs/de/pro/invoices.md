---
title: Rechnungssystem
description: Dokumentation des Rechnungssystems von Polski PRO for WooCommerce - MwSt.-Rechnung, Korrekturrechnung, Quittung, Lieferschein, PDF-Generierung, Nummerierung und REST API.
---

Das Rechnungsmodul generiert Verkaufsdokumente direkt in WooCommerce. Unterstuetzt vier Dokumenttypen, automatische Nummerierung und PDF.

## Dokumenttypen

### MwSt.-Rechnung

Standard-MwSt.-Rechnung mit folgenden Angaben:

- Daten des Verkaeufers und Kaeufers (einschliesslich NIP beider Seiten)
- Positionen mit Bezeichnung, Menge, Nettopreis, MwSt.-Satz, MwSt.-Betrag und Bruttopreis
- Zusammenfassung mit Aufschluesselung nach MwSt.-Saetzen
- Rechnungsnummer, Ausstellungsdatum und Verkaufsdatum
- Zahlungsfrist und Zahlungsart

### Korrekturrechnung

Korrekturdokument zu einer zuvor ausgestellten Rechnung. Enthaelt:

- Nummer und Datum der korrigierten Rechnung
- Positionen vor und nach der Korrektur
- Wertdifferenz
- Korrekturgrund

Eine Korrekturrechnung kann ueber das Bestellpanel oder die REST API ausgestellt werden.

### Quittung

Vereinfachtes Verkaufsdokument fuer Privatkunden (ohne Kaeufer-NIP). Enthaelt Positionen mit Bruttopreisen und eine Zusammenfassung.

### Lieferschein (packing slip)

Lieferdokument, das der Sendung beigefuegt wird. Enthaelt Produktliste, Mengen und eventuelle Bestellhinweise. Enthaelt keine Preise.

## Konfiguration

Gehen Sie zu **WooCommerce > Einstellungen > Polski > PRO-Module > Rechnungen**.

### Verkaeuferdaten

| Feld | Beschreibung |
|------|------|
| Firmenname | Vollstaendiger Firmenname des Verkaeufers |
| NIP | Steueridentifikationsnummer des Verkaeufers |
| Adresse | Strasse, Hausnummer, Postleitzahl, Stadt |
| Bankkontonummer | Kontonummer fuer Ueberweisungen |
| Kontakt-E-Mail | Auf der Rechnung angezeigte E-Mail-Adresse |

### Nummerierung

Das Plugin bietet mehrere Strategien zur Rechnungsnummerierung:

| Strategie | Format | Beispiel |
|-----------|--------|---------|
| Jaehrlich | `FV/{numer}/{rok}` | FV/1/2026 |
| Monatlich | `FV/{numer}/{miesiąc}/{rok}` | FV/1/04/2026 |
| Fortlaufend | `FV/{numer}` | FV/1 |
| Eigenes Muster | Benutzerdefiniert | FV/2026/04/001 |

Verfuegbare Tokens im benutzerdefinierten Format:

- `{numer}` - fortlaufende Rechnungsnummer (Zuruecksetzung gemaess Strategie)
- `{rok}` - vierstelliges Jahr
- `{miesiac}` - zweistelliger Monat
- `{dzien}` - zweistelliger Tag
- `{id_zamowienia}` - WooCommerce-Bestell-ID

### Automatische Generierung

Das Plugin kann automatisch eine Rechnung erstellen, wenn sich der Bestellstatus auf "Abgeschlossen" (completed) aendert. Aktivieren Sie die Option **Automatische Rechnungsgenerierung** in den Moduleinstellungen.

Sie koennen auch den automatischen Versand der PDF-Rechnung als Anhang der WooCommerce-E-Mail "Bestellung abgeschlossen" konfigurieren.

## PDF-Generierung

Rechnungs-PDFs werden mit der TCPDF-Bibliothek generiert. Die PDF-Vorlage enthaelt:

- Firmenlogo (optional, konfigurierbar in den Einstellungen)
- Verkaeufer- und Kaeuferdaten
- Positionstabelle mit MwSt.-Spalten
- Zusammenfassung mit Aufschluesselung nach MwSt.-Saetzen
- Fusszeile mit Firmendaten

### Schriftarten

Das Plugin verwendet die Schriftart DejaVu Sans, die polnische diakritische Zeichen unterstuetzt. Es ist keine zusaetzliche Konfiguration erforderlich.

## Rechnungsstatus

Jede Rechnung durchlaeuft einen Statuszyklus:

```
Draft (Szkic) → Issued (Wystawiona) → Sent (Wysłana) → Paid (Opłacona)
                                                      → Cancelled (Anulowana)
```

| Status | Beschreibung |
|--------|------|
| Draft | Rechnung erstellt, aber noch nicht ausgestellt. Kann bearbeitet werden |
| Issued | Rechnung ausgestellt mit zugewiesener Nummer. Kann nicht bearbeitet werden |
| Sent | Rechnung an den Kunden gesendet (E-Mail oder KSeF) |
| Paid | Rechnung bezahlt |
| Cancelled | Rechnung storniert. Erfordert eine Korrektur |

## Bestellpanel

Im WooCommerce-Bestellverwaltungsbereich fuegt das Modul eine Meta-Box "Rechnungen" mit folgenden Funktionen hinzu:

- **Rechnung ausstellen** - erstellt eine Rechnung auf Basis der Bestelldaten
- **PDF herunterladen** - laedt die Rechnung im PDF-Format herunter
- **An Kunden senden** - sendet die Rechnung per E-Mail
- **Korrektur ausstellen** - erstellt eine Korrekturrechnung
- **Verlauf** - Liste aller mit der Bestellung verknuepften Dokumente

## MwSt. auf Positionen

Jede Rechnungsposition enthaelt detaillierte MwSt.-Daten:

- Netto-Stueckpreis
- MwSt.-Satz (23%, 8%, 5%, 0%, befreit, nicht anwendbar, nicht steuerbar)
- MwSt.-Betrag pro Stueck
- Nettowert
- Bruttowert

Das Plugin erkennt den MwSt.-Satz automatisch aus der WooCommerce-Tax-Konfiguration. Es unterstuetzt mehrere MwSt.-Saetze auf einer Rechnung mit korrekter Zusammenfassung.

## REST API

Das Modul stellt REST-API-Endpunkte zur programmatischen Rechnungsverwaltung bereit.

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

Gibt eine PDF-Datei als `application/pdf` mit dem Header `Content-Disposition: attachment` zurueck.

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

Aktion, die vor der Rechnungsgenerierung ausgefuehrt wird.

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

Filtert das Rechnungsnummernformat.

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

Filtert die an die PDF-Vorlage uebergebenen Daten.

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

### PDF generiert leere Seiten

1. Pruefen Sie, ob die PHP-Erweiterung `mbstring` installiert ist
2. Stellen Sie sicher, dass das Verzeichnis `wp-content/uploads/polski-pro/invoices/` Schreibrechte hat (755)
3. Ueberpruefen Sie, ob die Verkaeuferdaten in den Einstellungen vollstaendig ausgefuellt sind

### Nummerierung setzt sich zurueck

Die Nummerierung setzt sich gemaess der gewaehlten Strategie zurueck - jaehrlich am 1. Januar, monatlich am 1. jedes Monats. Wenn Sie eine fortlaufende Nummerierung wuenschen, waehlen Sie die Strategie "Fortlaufend".

### Keine MwSt. auf Positionen

Pruefen Sie die WooCommerce-Tax-Konfiguration. Das Plugin bezieht die MwSt.-Saetze aus den WooCommerce-Steuereinstellungen. Stellen Sie sicher, dass die Saetze fuer Polen korrekt konfiguriert sind.

## Verwandte Ressourcen

- [KSeF-Integration](/pro/ksef/)
- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
