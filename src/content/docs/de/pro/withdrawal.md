---
title: Widerruf des Vertrags - Pro-Funktionen
description: 'Pro-Erweiterungen des Widerrufsmoduls von Polski for WooCommerce - Auto-Refund, A4-PDF der Erklaerung, Audit-Log mit CSV, Reporting-Dashboard, Unterstuetzung fuer Subscriptions und Bundles, mehrsprachiges Annex I(B).'
---

Die Pro-Version erweitert das kostenlose Widerrufsmodul um operative Verarbeitung von Rueckerstattungen, PDF der Erklaerung, Audit-Log, Berichte und Integrationen mit Abonnements / Produktbundles. Es wird vorausgesetzt, dass du die kostenlose Version von Polski for WooCommerce aktiv hast und das [grundlegende Widerrufsmodul](/compliance/withdrawal/) kennst.

## Auto-Refund (mit Bestaetigung des Operators)

Niemals automatisch - eine Rueckerstattung erfordert eine ausdrueckliche Aktion des Operators auf dem Bestellbildschirm. In `Bestellung bearbeiten › Polski - withdrawal refund` (Metabox rechts) sieht der Operator:

- Den berechneten Rueckerstattungsbetrag auf Basis der ausgewaehlten Positionen der Erklaerung
- Die Schaltflaeche **Process refund now** (mit `confirm()` JS zur doppelten Bestaetigung)
- Nach dem Prozess: WooCommerce-Refund-Nummer, Betrag und Datum

Logik:

1. Holt die Zeilen aus `polski_withdrawal_items` fuer die jeweilige Erklaerung
2. Mappt auf das Format `wc_create_refund()` (`qty`, `refund_total`, `refund_tax`)
3. Fuegt die Versandkosten **nur** hinzu, wenn der Widerruf alle Bestellzeilen umfasst
4. Ruft den Gateway-Refund (`refund_payment => true`) und Restock (`restock_items => true`) auf
5. Speichert `refund_id` und `refund_amount` in `polski_withdrawals`
6. Triggert `polski_pro/withdrawal/refund_processed` und `WithdrawalService::complete()`

Der Filter `polski_pro/withdrawal/refund_payload` erlaubt es, den Payload vor `wc_create_refund()` zu veraendern (z. B. Versand in bestimmten Faellen hinzufuegen oder Steuern aendern).

## A4-PDF der Erklaerung - dauerhafter Datentraeger

`Polski\Pro\Service\WithdrawalPdfGenerator` verwendet TCPDF zur Erstellung eines A4-PDF mit:

- Erklaerungsnummer `POL-WD-NNNNNN` und Einreichungsdatum
- Adressat (Shop-Daten aus `polski_general` oder `woocommerce_store_*`)
- Verbraucher (billing first/last name, address, email)
- Inhalt der Erklaerung mit Verweis auf Art. 27 des Verbraucherrechtegesetzes
- Tabelle der Positionen (Name + Variantenattribute, Menge, Wert)
- Bestellwert
- Bestelldatum
- Grund (falls vom Kunden angegeben)
- Platz fuer die Unterschrift (nur in der Papierversion)
- Hinweis zum dauerhaften Datentraeger

Speicherung in `wp-content/uploads/polski-withdrawals/YYYY/MM/POL-WD-NNNNNN.pdf` (geschuetzt durch `.htaccess deny from all`).

Automatisch generiert bei jedem requested/guest_requested/manual_registered, an die E-Mail des Verbrauchers angehaengt durch den Filter `woocommerce_email_attachments`. Der Pfad wird im Order-Meta `_polski_withdrawal_pdf` gespeichert - weitere Aufrufe von `ensurePdf()` sind idempotent (Neugenerierung nur, wenn die Datei verschwunden ist).

## Verifizierung der Anzahl der Downloads (Art. 16(m) relaxation)

Bei zu 100% digitalen Bestellungen behaelt der Verbraucher, selbst wenn du die Zustimmung nach Art. 16(m) eingeholt hast, das Widerrufsrecht, wenn er **keine Datei heruntergeladen** hat. Der Service `DigitalDownloadVerifier`:

1. Haengt sich in den Filter `polski/withdrawal/eligible` bei Prioritaet 30 ein (nach DigitalConsentService=20)
2. Iteriert die Bestellpositionen, summiert fuer jede downloadable/virtual die Downloads aus `wc_get_customer_download_log` pro permission
3. Wenn keine Position `count > 0` hat, stellt es die Eligibility wieder her (gibt `true` statt `false` zurueck)
4. Wenn mindestens eine heruntergeladen wurde, laesst es `false`

Aktiviert durch `polski_withdrawal['digital_download_verification'] = '1'` in den Einstellungen (Standard off - Opt-in gemaess der Shop-Richtlinie).

## WooCommerce Subscriptions

Standardmaessig werden Abonnements vom Widerruf **nicht** ausgeschlossen (es sei denn, das Storefront setzt den Filter `polski_pro/subscriptions/treat_as_exempt => true` fuer Legacy-Verhalten). Logik:

- Wenn die Erklaerung abgeschlossen wird (`polski/withdrawal/completed`), iteriert der Service die mit der Bestellung verknuepften Abonnements ueber `wcs_get_subscriptions_for_order` und setzt den Status `cancelled` (mit Notiz)
- Der Refund-Payload ist **proportional zum nicht genutzten Teil des aktuellen Abrechnungszeitraums** gemaess Art. 9(2)(b)(iii) der Richtlinie
- Formel: `ratio = 1 - (elapsed / total_period_length)`, angewendet pro Zeile in `refund_total` und `refund_tax`
- Nimmt das Minimum `ratio` aus allen mit der Bestellung verknuepften Abonnements

## Product Bundles

Drei Rueckgabestrategien (`bundle_refund_mode` in den Einstellungen oder Filter `polski_pro/withdrawal/bundle_refund_mode`):

| Modus | Verhalten |
|---|---|
| `whole_bundle` (default) | Die Rueckerstattung betrifft das gesamte Bundle + alle Bestandteile (erweitert den Payload um parent und siblings) |
| `proportional` | Rueckerstattung nur fuer den ausgewaehlten Bestandteil (Teil des Bundle-Preises proportional zur Anzahl der Items) |
| `remove_discount` | Rueckerstattung fuer den Bestandteil zum Standalone-Preis (ohne Bundle-Rabatt) |

Bundle-Erkennung ueber `_bundled_by` order item meta oder product type `bundle`.

## Annex I(B) in 8 Sprachen

`AnnexMultiLanguageService` erweitert den Filter `polski/annex/form_html` um Uebersetzungen fuer die Locales: `pl`, `de`, `de_AT`, `fr`, `nl`, `it`, `es` + generisches `eu` (English fallback). Jede Uebersetzung enthaelt die korrekte Formulierung aus der offiziellen Version der Richtlinie + den nationalen Rechtsbezug (BGB §355 DE, KSchG §11 AT, Code de la consommation art. L221-18 FR, Burgerlijk Wetboek 6:230o NL, Codice del Consumo art. 52 IT, TRLGDCU art. 102 ES, Verbraucherrechtegesetz art. 27 PL).

Sprachauswahl:

- Einstellung `polski_withdrawal['annex_locale']` (globaler Override)
- Auto-Erkennung aus `get_locale()`, wenn die Einstellung leer ist
- Shortcode-Attribut: `[polski_withdrawal_form_template_pro lang="de"]`
- Filter `polski/annex/locale`

## Reporting-Dashboard

`Polski Pro › Withdrawal reports` - Scorecards + Aufschluesselung mit Date-Range-Filter:

- **Filed** - Gesamtzahl der eingereichten
- **Completed** - finalisiert
- **In progress** - requested + confirmed
- **Rejected** - abgelehnt
- **Average processing time** - `requested_at → completed_at` (Sekunden, formatiert durch `human_time_diff`)
- **Refunded** - Anzahl × Betrag
- **Top reasons** - Top 10 der eindeutigen Gruende (group by reason)
- **Channel breakdown** - online / guest / phone / email / letter / in_store

Cache 5 Minuten pro Filter-Tuple (transient).

REST-Endpoints (Parity fuer aeltere WP):

- `GET /polski-pro/v1/withdrawals/reports/scorecards?from=...&to=...`
- `GET /polski-pro/v1/withdrawals/reports/reasons?limit=10`
- `GET /polski-pro/v1/withdrawals/reports/channels`

Alle gated `manage_woocommerce`.

## Audit-Log mit CSV-Export

`polski_pro_withdrawal_audit` (Migration 2.5.0) speichert jedes Ereignis im Lebenszyklus der Erklaerung:

| Feld | Inhalt |
|---|---|
| `withdrawal_id` | ID der Erklaerung |
| `order_id` | ID der Bestellung |
| `action` | `requested` / `confirmed` / `completed` / `rejected` / `guest_requested` / `manual_registered` / `refunded` |
| `actor_user_id` | WP-Benutzer-ID (oder NULL fuer Gast) |
| `actor_role` | Erste WP-Rolle des Benutzers |
| `actor_login` | user_login |
| `ip_address` | Aus `HTTP_CF_CONNECTING_IP` → `X_FORWARDED_FOR` → `REMOTE_ADDR` |
| `user_agent` | Truncated auf 1000 Zeichen |
| `payload_json` | Snapshot des Events (channel, reason, refund_amount, email usw.) |
| `created_at` | datetime UTC |

Admin `Polski Pro › Withdrawal audit` - Tabelle mit Filtern (action, date range, withdrawal_id, order_id) + Schaltflaeche **Export to CSV** (gestreamt ueber admin-post.php mit Nonce).

REST:

- `GET /polski-pro/v1/withdrawals/audit` - paginierte Liste
- `GET /polski-pro/v1/withdrawals/audit/export` - gestreamtes CSV

## Pro Abilities API (WP 6.9+)

4 zusaetzliche Abilities in der Kategorie `polski-pro/withdrawal`:

| ID | Was es macht |
|---|---|
| `polski-pro/withdrawal-process-refund` | Baut und fuehrt die Rueckerstattung fuer eine Erklaerung aus |
| `polski-pro/withdrawal-generate-pdf` | Generiert (oder gibt cached zurueck) das PDF der Erklaerung |
| `polski-pro/withdrawal-audit-list` | Liste der Audit-Log-Eintraege mit Filtern |
| `polski-pro/withdrawal-report-scorecards` | KPI-Dashboard |

Alle gated `manage_woocommerce`, beschrieben durch JSON-Schema-Schemata (input/output).

## PRO Hooks

```php
do_action('polski_pro/withdrawal/refund_processed', int $withdrawalId, WC_Order_Refund $refund);
do_action('polski/pro/withdrawal/pdf_generated', int $withdrawalId, string $filepath);

apply_filters('polski_pro/withdrawal/refund_payload', array $payload, WC_Order, int $withdrawalId);
apply_filters('polski_pro/withdrawal/download_verification_enabled', bool $enabled);
apply_filters('polski_pro/withdrawal/bundle_refund_mode', string $mode);
apply_filters('polski_pro/subscriptions/treat_as_exempt', bool $exempt, WC_Order $order);
```
