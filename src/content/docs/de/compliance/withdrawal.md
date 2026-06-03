---
title: Widerrufsrecht (Art. 11a der Richtlinie 2023/2673)
description: Vollständige Umsetzung des Widerrufsrechts in Polski for WooCommerce - Formular für Kunden und Gäste, Teilrückgaben, Ausnahmen, Anhang I(A)/(B), Einwilligung nach Art. 16(m), Abilities API und Hooks.
---

Ab dem **19. Juni 2026** muss jeder Online-Shop in der EU, der an Verbraucher verkauft, eine funktionierende Widerrufsfunktion direkt im Shop bereitstellen, das verlangt Art. 11a der Richtlinie 2011/83/EU, geändert durch 2023/2673. Das Widerrufsmodul in Polski for WooCommerce liefert diese Funktion plus Zusätze, die den täglichen Betrieb erleichtern.

:::caution
Das Modul realisiert die technische Seite der Anforderung. Der Inhalt der AGB, die Rückgaberichtlinie und die Kommunikation mit dem Kunden bleiben Ihre Verantwortung. Dies ist keine Rechtsberatung.
:::

## Was direkt nach der Installation funktioniert

Nach der Aktivierung des Moduls haben Sie:

- Drei neue Bestellstatus: `wc-withdrawal-requested`, `wc-withdrawal-partial`, `wc-withdrawal-completed`
- Datenbankmigration `polski_withdrawals` + `polski_withdrawal_items` (Migration 2.2.0)
- Admin-Tabelle `Polski > Withdrawals` mit Liste und Statusfilter
- Einstellungsseite `Polski > Withdrawal settings`
- Drei dynamische Gutenberg-Blöcke + drei Shortcodes (lookup, info, form template)
- 16 Abilities in der WP 6.9+ Abilities API
- Standardfrist von 14 Tagen mit konfigurierbarem Status, der den Fristlauf auslöst

## Drei Verbraucherpfade

### 1. Eingeloggter Kunde - zweistufiges Formular in Mein Konto

Unter `Mein Konto › Bestellungen` erscheint bei jeder rückgabefähigen Bestellung die Aktion **Withdraw from contract** (Text konfigurierbar). Nach dem Anklicken sieht der Kunde ein zweistufiges Formular:

- **Schritt 1: Positionsauswahl.** Tabelle mit jeder Bestellzeile (Produktvarianten als separate Positionen, mit Attributen), die Spalte „Verbleibend" zeigt, wie viel noch widerrufen werden kann, die Spalte „Anzahl der zurückzugebenden Stücke" ist ein Spinner mit `min=0`, `max=remaining_qty`. Vorausfüllung = volle verbleibende Menge.
- **Schritt 2: Grund und Bestätigung.** Textarea (optional) + Submit „Erklärung abgeben und Bestätigung per E-Mail senden".

Funktionen:

- **Teilwiderrufe** - ab einem Stück, von mehreren Zeilen oder mehrere separate Erklärungen für eine Bestellung
- **Pro-rata-Summen** - `line_total` und `line_tax` skalieren proportional zur gewählten Menge
- **Live-Zähler** (JS) - unter der Tabelle die Meldung „Insgesamt X Stücke ausgewählt" in `role="status" aria-live="polite"`
- **Schnellaktionen** - Schaltflächen „Alle Positionen auswählen" / „Auswahl löschen"
- **Abbrechen und zurück** - Link zurück zur Bestellliste ohne Absenden

### 2. Gast - Autorisierung per E-Mail + Magic-Link

Auf der Seite mit dem Shortcode `[polski_withdrawal_lookup]` gibt der Gast die Bestellnummer und die beim Kauf verwendete E-Mail-Adresse an. Das System:

1. Prüft, ob die `billing_email` der Bestellung der eingegebenen entspricht (case-insensitive)
2. Prüft das Rate-Limit (5 Versuche / 15 Min pro E-Mail+IP)
3. Generiert einen 32-Byte-Token, speichert den Hash in einem Transient mit TTL 30 Min
4. Sendet den Magic-Link per E-Mail (polnischer Betreff + Text)
5. Gibt immer dieselbe „maskierte" Meldung zurück (verhindert Enumeration)

Nach dem Klick auf den Link rendert derselbe Shortcode das Widerrufsformular mit einer **vollständigen Bestellzusammenfassung** (Positionstabelle, Mengen, Werte, Datum, Gesamtbetrag) + optionaler Grund + Submit.

### 3. Admin - manuelle Registrierung von Offline-Erklärungen

Unter `Polski > Register withdrawal` erfasst der Bearbeiter einen Widerruf, der telefonisch, per Mail, per Brief oder im Geschäft eingegangen ist. Felder: Bestellnummer, Kanal, Grund. Nach dem Speichern hat der Datensatz `channel` und `registered_by_user_id`, der Bestellstatus ändert sich zu `wc-withdrawal-requested`.

## Produktausnahmen (Art. 38 des Verbraucherrechtegesetzes)

### Pro Produkt

Auf dem Produktbearbeitungsbildschirm das Meta-Feld `_polski_withdrawal_exempt = 'yes'` plus ein Dropdown mit vorgefertigten Gründen aus `Polski\Enum\WithdrawalExemptionReason`:

- `art38_3` - Produkt nach individueller Bestellung / personalisiert
- `art38_4` - Schnell verderblich / kurzes Mindesthaltbarkeitsdatum
- `art38_5` - Versiegelt aus Gründen des Gesundheitsschutzes / hygienisch
- `art38_6` - Untrennbar mit anderen Gegenständen verbunden
- `art38_7` - Alkoholische Getränke (Preis vereinbart, Lieferung später)
- `art38_9` - Audio-/Videoaufnahmen / Software in versiegelter Verpackung
- `art38_13` - Digitale Inhalte, die vor Fristablauf bereitgestellt werden
- `custom` - Sonstiges (eigene Begründung)

### Pro Kategorie

Auf dem Bearbeitungsbildschirm der Produktkategorie (`product_cat`) derselbe Mechanismus über das Term-Meta `polski_withdrawal_exempt`. Ein Checkbox für das gesamte Sortiment statt Hunderter Produkte.

### Prioritätslogik

Das Produkt-Meta gewinnt, Fallback auf die Kategorie. Eine Produktvariante erbt die Kategorien über `parent_id`. Der Filter `polski/withdrawal/eligible` gibt `false` zurück, wenn alle Positionen ausgenommen sind.

## Art. 16(m) - Einwilligung für digitale Produkte

Drei Modi (`digital_consent_mode`):

| Modus | Was passiert |
|---|---|
| `required` | Der Checkout wird blockiert, bis der Verbraucher markiert. Jede zu 100 % digitale Bestellung → vom Widerrufsrecht ausgeschlossen. |
| `optional` | Checkbox sichtbar, nicht erforderlich. Nur Bestellungen mit markierter Einwilligung → ausgeschlossen. |
| `hidden` | Keine Checkbox. Digitale Bestellungen behalten das Widerrufsrecht. |

Die Pro-Version überprüft zusätzlich die Anzahl der Downloads, wenn der Verbraucher keine Datei heruntergeladen hat, wird das Widerrufsrecht auch nach der Einwilligung wiederhergestellt.

## Konfigurierbare Frist und auslösende Status

- `period_days` - standardmäßig 14
- `trigger_statuses` - Mehrfachauswahl von WooCommerce-Status (Standard: `completed`)
- Wenn eine Bestellung in einen Trigger-Status wechselt, wird `_polski_withdrawal_clock_start` über `$order->update_meta_data()` gespeichert (HPOS-sicher)
- `isEligible()` berechnet die Deadline = `clock_start + period_days`

## Anhang I(A) und I(B)

Der Generator wird mit Daten aus der Option `polski_general` (company_name, address, NIP, email, phone) gespeist, mit Fallback auf `woocommerce_store_*`.

| Shortcode | Block | Was gerendert wird |
|---|---|---|
| `[polski_withdrawal_info]` | `polski/withdrawal-info` | Anhang I(A) - vollständige Information über das Widerrufsrecht |
| `[polski_withdrawal_form_template]` | `polski/withdrawal-form` | Anhang I(B) - Musterformular (zum Ausdrucken) |
| `[polski_withdrawal_lookup]` | `polski/withdrawal-lookup` | Formular für Gäste |

Pro fügt Übersetzungen von Anhang I(B) in 8 Sprachen hinzu (PL, DE, AT, FR, NL, IT, ES, generic EU) mit nationalen rechtlichen Verweisen (BGB §355 DE, KSchG §11 AT, Art. L221-18 FR, usw.).

## Bestätigungs-E-Mail als dauerhafter Datenträger

Die E-Mail enthält:

- Erklärungsnummer `POL-WD-NNNNNN`
- Datum und Uhrzeit der Abgabe (UTC + lokal)
- Bestellnummer und -datum
- Positionstabelle mit Variantenattributen und Werten
- Bestellwert
- Adresse für die Rücksendung
- Hinweis zum dauerhaften Datenträger

HTML- und Plain-Text-Versionen. Pro fügt zusätzlich ein PDF der Erklärung im A4-Format als Anhang bei.

## Entwickler-Hooks

```php
do_action('polski/withdrawal/requested', WithdrawalRequest $request);
do_action('polski/withdrawal/guest_requested', int $id, WC_Order $order, string $email);
do_action('polski/withdrawal/manual_registered', int $id, WC_Order $order, string $channel);
do_action('polski/withdrawal/confirmed', WithdrawalRequest $request);
do_action('polski/withdrawal/completed', WithdrawalRequest $request);
do_action('polski/withdrawal/rejected', WithdrawalRequest $request);

apply_filters('polski/withdrawal/eligible', bool $eligible, WC_Order $order);
apply_filters('polski/withdrawal/period_days', int $days);
apply_filters('polski/withdrawal/trigger_statuses', array $statuses);
apply_filters('polski/withdrawal/order_status_on_request', string $slug, WC_Order, WithdrawalRequest);
apply_filters('polski/withdrawal/order_status_on_complete', string $slug, WC_Order, WithdrawalRequest);
apply_filters('polski/annex/info_html', string $html, array $merchant_data, int $days);
apply_filters('polski/annex/form_html', string $html, array $merchant_data, string $lookup_url);
apply_filters('polski/annex/merchant_data', array $data);
apply_filters('polski/annex/locale', string $locale);
apply_filters('polski/digital_consent/label', string $label);
```

## Abilities API (WP 6.9+)

16 Abilities in 4 Kategorien: `polski/withdrawal`, `polski/legal`, `polski/compliance`, `polski/shop`. Aufruf über `/wp-json/wp-abilities/v1/abilities/<id>/execute` oder das JS-Paket `@wordpress/abilities`. Vollständige Liste mit Input-/Output-Schema in `docs/withdrawal/abilities.md` im Repository des Plugins.

## Speicherung

Eigene Tabellen (kein Postmeta):

- `polski_withdrawals` - ein Datensatz pro Erklärung (id, order_id, customer_id, status, channel, guest_email, refund_id, refund_amount, clock_started_at, requested/confirmed/completed/rejected_at, language_code)
- `polski_withdrawal_items` - normalisierte Zeilen (id, withdrawal_id, order_item_id, product_id, variation_id, quantity, line_subtotal/total/tax, sku, name, attributes_json)

Pro fügt `polski_pro_withdrawal_audit` hinzu (Migration 2.5.0) mit actor/IP/UA + Payload-Snapshot.

## Barrierefreiheit

Vollständige Konformität mit WCAG 2.2 Level AA: `:focus-visible` Ring, 44×44 Touch-Targets, `lang="pl"` in jedem Abschnitt, `aria-required` + `aria-invalid` + `aria-describedby` + `aria-busy`, persistente Formularwerte, role=alert bei Fehlermeldung mit Autofocus, Live-Region mit der Anzahl der ausgewählten Stücke, scroll-margin unter Sticky-Header, sichtbares FAQ-Accordion + JSON-LD FAQPage, Kontakt-Fallback.
