---
title: AI Feed fuer Rechnungen
description: REST-Endpoint, der eine Rechnung im Markdown-Format bereitstellt, zur Nutzung durch LLM-basierte Buchhaltungs- und Kundenservice-Agenten.
---

Polski Pro 1.10.0 fuegt einen REST-Endpoint hinzu, der eine Rechnung im **Markdown**-Format ausliefert. KI-Agenten (Buchhaltung, Kundenservice, Kaeuferassistenten) erhalten strukturierte Rechnungsdaten, ohne PDF parsen zu muessen.

## Endpoint

```
GET /wp-json/polski-pro/v1/invoices/{id}/markdown
Accept: text/markdown
```

Antwort:

```
Content-Type: text/markdown; charset=UTF-8
Cache-Control: private, no-store
```

Der Body ist Markdown mit YAML-Front-Matter, einem Parteienblock (NIP), einer Positionstabelle und einem Zusammenfassungsblock.

## Authentifizierung

| Rolle | Zugriff |
|---|---|
| Administrator / `manage_woocommerce` | beliebige Rechnung |
| Angemeldeter Bestellinhaber | nur eigene Rechnungen |
| Anonym / anderer Benutzer | 401 / 403 |

Rechnungen enthalten personenbezogene und steuerliche Daten, daher ist der Endpoint bewusst fuer anonyme Kunden gesperrt. Die Anmeldung ist ueber ein WordPress-Cookie oder ein Anwendungspasswort (REST Application Password) erforderlich.

## Was die Antwort enthaelt

**YAML-Front-Matter**

```yaml
---
number: "FV/2026/05/001"
type: "faktura_vat"
status: "issued"
order_id: "555"
currency: "PLN"
net_total: "200.00"
vat_total: "46.00"
gross_total: "246.00"
issued_at: "2026-05-01T10:00:00+00:00"
nip_seller: "5260250274"
nip_buyer: "7010019999"
ksef_reference: "KSEF-123"
ksef_status: "sent"
---
```

**Parteienabschnitt**

- Seller NIP / Buyer NIP

**Positionstabelle** (Markdown)

| # | Beschreibung | Menge | Einh. | Nettopreis | VAT % | VAT-Betrag | Bruttopreis |

**Zusammenfassung**

- Net total / VAT total / Gross total mit Waehrung

**Zusaetzliche Felder** (falls vorhanden)

- KSeF reference / status
- Korrekturgrund (bei Korrekturrechnungen)

## Entwickler-Filter

```php
add_filter('polski-pro/ai_feed/invoice_markdown', static function (string $document, \Polski\Pro\Invoice\Model\Invoice $invoice): string {
    if ($invoice->type === \Polski\Pro\Invoice\Model\InvoiceType::FakturaVAT) {
        $document .= "\n\n## Notatka wewnętrzna\n\n- Wystawiono automatycznie po opłaceniu zamówienia.\n";
    }
    return $document;
}, 10, 2);
```

## Anwendungsbeispiel mit curl (angemeldeter Admin)

```bash
curl -u admin:apppassword \
  -H "Accept: text/markdown" \
  https://sklep.pl/wp-json/polski-pro/v1/invoices/42/markdown
```

## Verwandt

- [AI Feed (FREE)](/pl/tools/ai-feed/) - Modul, das WooCommerce-Beitraege, -Seiten und -Produkte in Markdown ausliefert
- [PDF-Rechnungen](/pl/pro/invoices/) - Generierung und Versand von Rechnungen als PDF
- [KSeF](/pl/pro/ksef/) - Integration mit dem Krajowy System e-Faktur

## FAQ

**Funktioniert der Endpoint ohne Anmeldung?**

Nein. Rechnungen enthalten personenbezogene Daten und NIP. Ein anonymer Kunde erhaelt 401.

**Kann ich ein REST Application Password verwenden?**

Ja. WordPress 5.6+ unterstuetzt Anwendungspasswoerter. Erstelle eines unter **Benutzer > Bearbeiten > Anwendungspasswoerter** und uebergib es in `Authorization: Basic`.

**Kann man das Markdown einer Rechnung aus dem wp-admin herunterladen?**

Es gibt keine separate Schaltflaeche. Die URL ist stabil - `/wp-json/polski-pro/v1/invoices/<id>/markdown` - sie kann also als Lesezeichen gespeichert oder in Buchhaltungstools eingebettet werden.

**Was ist mit Korrekturrechnungen?**

Korrekturen werden ebenfalls unterstuetzt. Das Front-Matter enthaelt `original_invoice_id` und der Abschnitt "Additional details" enthaelt `correction_reason`.
