---
title: Widerrufsrecht
description: Handhabung des Widerrufsrechts in Polski for WooCommerce - Rueckgabeformular, Produktausnahmen, automatische E-Mails und Entwickler-Hooks.
---

Die EU-Richtlinie 2023/2673 fuehrt neue Pflichten zum Widerrufsrecht ein (ab 19. Juni 2026). Das Plugin deckt den gesamten Prozess ab - Kundenformular, E-Mail-Bestaetigungen, Produktausnahmen und Hooks fuer Entwickler.

## Rechtliche Anforderungen

Der Verbraucher hat das Recht, innerhalb von 14 Tagen ohne Angabe von Gruenden von einem Fernabsatzvertrag zurueckzutreten. Der Verkaeufer ist verpflichtet:

1. Den Verbraucher vor Vertragsabschluss ueber das Widerrufsrecht zu informieren
2. Ein Widerrufsformular zur Verfuegung zu stellen
3. Den Eingang der Widerrufserklaerung zu bestaetigen
4. Die Zahlung innerhalb von 14 Tagen nach Eingang der Erklaerung zurueckzuerstatten

Die Richtlinie 2023/2673 erweitert diese Pflichten um einen digitalen Erklaerungsprozess und automatische Bestaetigungen.

## Kundenprozess

### Schritt 1 - Button in Mein Konto

Nach Aktivierung des Moduls erscheint auf der Seite **Mein Konto > Bestellungen** ein Button "Widerruf" bei Bestellungen, die fuer eine Rueckgabe in Frage kommen. Der Button ist nur waehrend der Widerrufsfrist sichtbar (Standard 14 Tage ab Lieferung).

### Schritt 2 - Widerrufsformular

Nach Klick auf den Button gelangt der Kunde zum Formular, das enthaelt:

- Bestellnummer (automatisch ausgefuellt)
- Bestelldatum
- Liste der Produkte aus der Bestellung (mit Auswahlmoeglichkeit, von welchen er zuruecktritt)
- Widerrufsgrund (optional)
- Kontaktdaten des Kunden
- Bankkontonummer fuer die Erstattung

### Schritt 3 - E-Mail-Bestaetigung

Nach dem Absenden des Formulars fuehrt das System automatisch folgendes aus:

1. Sendet dem Kunden eine E-Mail mit Bestaetigung des Erklaerungseingangs
2. Sendet dem Shop-Administrator eine Benachrichtigung ueber die neue Meldung
3. Aendert den Meldungsstatus auf "Ausstehend"

Der Administrator kann die Meldung dann im WooCommerce-Panel bearbeiten und als abgeschlossen markieren.

## Produktausnahmen

Das Widerrufsrecht gilt nicht fuer bestimmte Produktkategorien. Sie koennen ein Produkt im Tab **Polski - Widerruf** in der Produktbearbeitung als ausgenommen markieren.

Typische Ausnahmen gemaess Art. 38 des Verbraucherrechtegesetzes:

- Auf Bestellung gefertigte oder personalisierte Produkte
- Leicht verderbliche Produkte
- Aus hygienischen Gruenden versiegelte Produkte (nach Oeffnung)
- Ton-/Bildaufnahmen in versiegelter Verpackung (nach Oeffnung)
- Online gelieferte digitale Inhalte (nach Beginn der Leistung)
- Presse (Zeitungen, Zeitschriften, Magazine)

Fuer ausgenommene Produkte wird der Button "Widerruf" im Kundenpanel nicht angezeigt.

## Shortcode

Verwenden Sie den Shortcode `[polski_withdrawal_form]`, um das Widerrufsformular an einer beliebigen Stelle der Website anzuzeigen.

### Grundlegende Verwendung

```
[polski_withdrawal_form]
```

Zeigt das Formular fuer den angemeldeten Kunden an. Der Kunde muss eine Bestellung aus der Liste auswaehlen.

### Mit Bestellangabe

```
[polski_withdrawal_form order_id="789"]
```

Zeigt das Formular vorausgefuellt mit den Daten der Bestellung mit der angegebenen ID an. Das System ueberpreuft, ob der angemeldete Benutzer der Eigentuemer dieser Bestellung ist.

### Einbettungsbeispiel auf einer Seite

Erstellen Sie eine dedizierte Seite "Widerrufsformular" und platzieren Sie den Shortcode:

```
[polski_withdrawal_form]
```

Geben Sie dann in den Plugin-Einstellungen (**WooCommerce > Einstellungen > Polski > Widerruf**) diese Seite als Standard-Formularseite an.

## Hooks

### polski/withdrawal/requested

Wird aufgerufen, wenn der Kunde das Widerrufsformular absendet.

```php
/**
 * @param int   $withdrawal_id ID der Widerrufsmeldung.
 * @param int   $order_id      WooCommerce-Bestell-ID.
 * @param array $form_data     Formulardaten.
 */
add_action('polski/withdrawal/requested', function (int $withdrawal_id, int $order_id, array $form_data): void {
    // Beispiel: Benachrichtigung an externes CRM-System senden
    $crm_api = new MyCrmApi();
    $crm_api->notify_withdrawal($order_id, $form_data['reason']);
}, 10, 3);
```

### polski/withdrawal/confirmed

Wird aufgerufen, wenn der Administrator den Eingang der Meldung bestaetigt.

```php
/**
 * @param int $withdrawal_id ID der Widerrufsmeldung.
 * @param int $order_id      WooCommerce-Bestell-ID.
 */
add_action('polski/withdrawal/confirmed', function (int $withdrawal_id, int $order_id): void {
    // Beispiel: Bestellstatus aendern
    $order = wc_get_order($order_id);
    if ($order) {
        $order->update_status('withdrawal-confirmed', 'Widerruf bestaetigt.');
    }
}, 10, 2);
```

### polski/withdrawal/completed

Wird aufgerufen, wenn der gesamte Widerrufsprozess abgeschlossen ist (Erstattung verarbeitet).

```php
/**
 * @param int   $withdrawal_id ID der Widerrufsmeldung.
 * @param int   $order_id      WooCommerce-Bestell-ID.
 * @param float $refund_amount Erstattungsbetrag.
 */
add_action('polski/withdrawal/completed', function (int $withdrawal_id, int $order_id, float $refund_amount): void {
    // Beispiel: Erstattung im Buchhaltungssystem erfassen
    do_action('my_accounting/register_refund', $order_id, $refund_amount);
}, 10, 3);
```

### polski/withdrawal/eligible

Filter zum programmatischen Festlegen, ob eine Bestellung fuer den Widerruf qualifiziert ist.

```php
/**
 * @param bool     $is_eligible Ob die Bestellung fuer den Widerruf qualifiziert ist.
 * @param WC_Order $order       WooCommerce-Bestellungsobjekt.
 * @return bool
 */
add_filter('polski/withdrawal/eligible', function (bool $is_eligible, WC_Order $order): bool {
    // Beispiel: Bestellungen aus der Kategorie "Dienstleistungen" ausschliessen
    foreach ($order->get_items() as $item) {
        $product = $item->get_product();
        if ($product && has_term('uslugi', 'product_cat', $product->get_id())) {
            return false;
        }
    }
    return $is_eligible;
}, 10, 2);
```

### polski/withdrawal/period_days

Filter zum Aendern der Widerrufsfrist (Standard 14 Tage).

```php
/**
 * @param int      $days  Anzahl der Tage fuer den Widerruf.
 * @param WC_Order $order WooCommerce-Bestellungsobjekt.
 * @return int
 */
add_filter('polski/withdrawal/period_days', function (int $days, WC_Order $order): int {
    // Beispiel: Frist in der Weihnachtszeit auf 30 Tage verlaengern
    $order_date = $order->get_date_created();
    if ($order_date) {
        $month = (int) $order_date->format('m');
        if ($month === 12) {
            return 30;
        }
    }
    return $days;
}, 10, 2);
```

### polski/withdrawal/form_fields

Filter zum Aendern der Formularfelder des Widerrufs.

```php
/**
 * @param array $fields Array der Formularfelder.
 * @return array
 */
add_filter('polski/withdrawal/form_fields', function (array $fields): array {
    // Beispiel: Feld fuer bevorzugte Erstattungsmethode hinzufuegen
    $fields['refund_method'] = [
        'type'     => 'select',
        'label'    => 'Bevorzugte Erstattungsmethode',
        'required' => true,
        'options'  => [
            'bank_transfer' => 'Bankueberweisung',
            'original'      => 'Gleiche Zahlungsmethode',
        ],
    ];
    return $fields;
}, 10, 1);
```

## Meldungsverwaltung

Widerrufsmeldungen sind im WooCommerce-Panel unter **WooCommerce > Widerrufe** verfuegbar. Jede Meldung enthaelt:

- Bestellnummer und Link zur Bestellung
- Datum der Formulareinreichung
- Status (ausstehend, bestaetigt, abgeschlossen, abgelehnt)
- Kundendaten
- Liste der vom Widerruf betroffenen Produkte
- Grund (falls angegeben)

Der Administrator kann den Meldungsstatus aendern, eine interne Notiz hinzufuegen oder die Erstattung direkt aus dem Panel verarbeiten.

## Fehlerbehebung

**Button "Widerruf" wird nicht angezeigt**
Pruefen Sie, ob: (1) das Modul aktiviert ist, (2) die Bestellung den Status "Abgeschlossen" hat, (3) die Widerrufsfrist nicht abgelaufen ist, (4) kein Produkt in der Bestellung ausgenommen ist.

**Kunde erhaelt keine Bestaetigungs-E-Mail**
Pruefen Sie die WooCommerce-E-Mail-Konfiguration unter **WooCommerce > Einstellungen > E-Mails** und stellen Sie sicher, dass die Vorlage "Widerrufsbestaetigung" aktiviert ist.

## Weitere Schritte

- Probleme melden: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskussionen und Fragen: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
