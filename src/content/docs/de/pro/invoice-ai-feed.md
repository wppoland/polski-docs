---
title: AI Feed fuer Rechnungen
description: REST-Endpunkt, der eine einzelne Rechnung als Markdown ausliefert - fuer Buchhaltungsagenten und Kundenservice-KI auf LLM-Basis.
---

Polski Pro 1.10.0 bringt einen REST-Endpunkt, der eine einzelne Rechnung als **Markdown** zurueckgibt. KI-Agenten (Buchhaltungs-Bots, Kundenservice, Einkaufsassistenten) erhalten strukturierte Rechnungsdaten ohne PDF-Parsing.

## Endpunkt

```
GET /wp-json/polski-pro/v1/invoices/{id}/markdown
Accept: text/markdown
```

Antwort:

```
Content-Type: text/markdown; charset=UTF-8
Cache-Control: private, no-store
```

Body ist Markdown mit YAML-Front-Matter, einem Block fuer Parteien (NIP), einer Markdown-Tabelle der Positionen und einem Summenblock.

## Authentifizierung

| Rolle | Zugriff |
|---|---|
| Administrator / `manage_woocommerce` | jede Rechnung |
| Angemeldeter Bestellinhaber | nur eigene Rechnungen |
| Anonym / andere Nutzer | 401 / 403 |

Rechnungen enthalten persoenliche und steuerliche Daten, deshalb ist der Endpunkt fuer anonyme Aufrufe bewusst geschlossen. Authentifizierung per WordPress-Session-Cookie oder Application Password (REST application password).

## Was die Antwort enthaelt

**YAML Front Matter**

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

**Parteien-Block**

- Seller NIP / Buyer NIP

**Positionen-Tabelle** (Markdown)

| # | Beschreibung | Menge | Einheit | Nettopreis | USt. % | USt.-Betrag | Bruttopreis |

**Summen**

- Net total / VAT total / Gross total mit Waehrung

**Zusatzfelder** (falls vorhanden)

- KSeF reference / status
- Korrekturgrund (fuer Korrekturrechnungen)

## Entwickler-Filter

```php
add_filter('polski-pro/ai_feed/invoice_markdown', static function (string $document, \Polski\Pro\Invoice\Model\Invoice $invoice): string {
    if ($invoice->type === \Polski\Pro\Invoice\Model\InvoiceType::FakturaVAT) {
        $document .= "\n\n## Interne Notiz\n\n- Automatisch nach Zahlung erstellt.\n";
    }
    return $document;
}, 10, 2);
```

## Beispiel mit curl (authentifizierter Admin)

```bash
curl -u admin:apppassword \
  -H "Accept: text/markdown" \
  https://shop.test/wp-json/polski-pro/v1/invoices/42/markdown
```

## Verwandt

- [AI Feed (FREE)](/de/tools/ai-feed/) - Modul, das Beitraege, Seiten und WooCommerce-Produkte als Markdown ausliefert
- [PDF-Rechnungen](/de/pro/invoices/) - Erstellung und Versand von Rechnungen als PDF
- [KSeF](/de/pro/ksef/) - Anbindung an das polnische nationale E-Rechnungssystem

## FAQ

**Funktioniert der Endpunkt ohne Authentifizierung?**

Nein. Rechnungen enthalten personenbezogene Daten und Steuer-IDs. Anonyme Aufrufe erhalten 401.

**Kann ich ein REST application password nutzen?**

Ja. WordPress 5.6+ unterstuetzt Application Passwords. Generiere eines unter **Benutzer > Bearbeiten > Application Passwords** und uebergib es via `Authorization: Basic`.

**Kann ich das Markdown einer Rechnung aus wp-admin herunterladen?**

Es gibt keinen eigenen Button. Die URL ist stabil - `/wp-json/polski-pro/v1/invoices/<id>/markdown` - du kannst sie als Lesezeichen speichern oder in Buchhaltungstools einbinden.

**Was ist mit Korrekturrechnungen?**

Korrekturrechnungen werden ebenfalls unterstuetzt. Das Front Matter enthaelt `original_invoice_id`, der "Additional details"-Block enthaelt `correction_reason`.
