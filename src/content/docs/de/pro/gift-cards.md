---
title: Geschenkkarten
description: Dokumentation der Geschenkkarten von Polski PRO for WooCommerce - Verkauf, Code-Generierung, Einloesung im Warenkorb, Guthabenverfolgung und Mein-Konto-Bereich.
---

Das Geschenkkarten-Modul ermoeglicht den Verkauf von Karten als WooCommerce-Produkte. Der Kunde kauft eine Karte, erhaelt einen Code und bezahlt damit bei weiteren Bestellungen.

## So funktioniert es

1. Der Administrator erstellt ein Produkt vom Typ "Geschenkkarte"
2. Der Kunde kauft eine Geschenkkarte im Shop
3. Nach Bezahlung der Bestellung generiert das Plugin einen eindeutigen Kartencode
4. Der Code wird per E-Mail an den Kunden (oder Beschenkten) gesendet
5. Der Beschenkte gibt den Code im Warenkorb ein und erhaelt einen Rabatt in Hoehe des Kartenwerts
6. Das Guthaben der Karte verringert sich um den genutzten Betrag

## Konfiguration

Gehe zu **WooCommerce > Einstellungen > Polski > PRO-Module > Geschenkkarten**.

Das Modul wird ueber folgende Option gesteuert:

```
polski_gift_cards
```

### Allgemeine Einstellungen

| Einstellung | Beschreibung |
|------------|------|
| Geschenkkarten aktivieren | Aktiviert das Modul |
| Codelaenge | Anzahl der Zeichen des Codes (Standard 16) |
| Codeformat | Muster des Codes (z. B. `XXXX-XXXX-XXXX-XXXX`) |
| Code-Praefix | Optionaler Praefix (z. B. `PL-`) |
| Gueltigkeit der Karte | Anzahl der Gueltigkeitstage (0 = unbegrenzt) |
| Code-Feld im Warenkorb | Position des Felds zur Code-Eingabe |

### Geschenkkartenprodukt erstellen

1. Gehe zu **Produkte > Neu hinzufuegen**
2. Waehle den Produkttyp: **Geschenkkarte**
3. Lege den Preis fest (Nennwert der Karte)
4. Optional: Aktiviere "Beliebiger Betrag" - der Kunde gibt den Kartenwert selbst ein
5. Optional: Lege einen Mindest- und Hoechstbetrag fuer den beliebigen Betrag fest
6. Veroeffentliche das Produkt

Beim beliebigen Betrag sieht der Kunde ein Feld zur Eingabe des Kartenwerts anstelle eines festen Preises.

## Code-Generierung

Die Codes werden nach Bezahlung der Bestellung automatisch generiert. Merkmale der Codes:

- alphanumerische Zeichen (A-Z, 0-9)
- Ausschluss mehrdeutiger Zeichen (0, O, I, L, 1)
- Pruefung auf Eindeutigkeit in der Datenbank
- Formatierung mit Trennzeichen (z. B. `ABCD-EFGH-JKMN-PQRS`)

Jeder Code ist eindeutig. Bei einer Kollision generiert das Plugin einen neuen Code.

## Einloesung im Warenkorb

### Code-Feld

Im Warenkorb (und optional an der Kasse) sieht der Kunde ein Feld zur Code-Eingabe:

```
[Geschenkkartencode eingeben] [Anwenden]
```

Nach Eingabe eines gueltigen Codes:

- wird das Guthaben der Karte angezeigt
- wird der Rabattbetrag von der Bestellsumme abgezogen
- ist das Guthaben der Karte geringer als der Bestellwert - der Rest wird mit anderen Methoden bezahlt
- ist das Guthaben der Karte hoeher - der verbleibende Betrag verbleibt auf der Karte

### Code-Validierung

Das Plugin prueft den Code vor der Anwendung:

- Pruefung, ob der Code in der Datenbank existiert
- Pruefung, ob die Karte nicht abgelaufen ist
- Pruefung, ob das Guthaben groesser als null ist
- Pruefung, ob die Karte nicht gesperrt wurde

Der Kunde sieht eine Meldung mit dem Grund fuer die Ablehnung des Codes.

### Session-Verfolgung

Der Kartencode wird in der WooCommerce-Session gespeichert:

- Der Code bleibt auch nach dem Neuladen der Seite erhalten
- Der Code wird nach Bestellaufgabe oder Abmeldung entfernt
- Der Kunde kann den angewendeten Code manuell entfernen

## Guthabenverfolgung

Das Guthaben der Karte verringert sich mit jeder Nutzung. Die Transaktionshistorie enthaelt:

| Feld | Beschreibung |
|------|------|
| Datum | Datum der Transaktion |
| Typ | Aufladung / Nutzung / Erstattung |
| Betrag | Betrag des Vorgangs |
| Bestellung | Bestell-ID (fuer Nutzung und Erstattung) |
| Guthaben nach Vorgang | Aktuelles Guthaben nach der Transaktion |

### Administrationsbereich

Im Bereich **WooCommerce > Geschenkkarten** kann der Administrator:

- die Liste aller Karten mit Guthaben einsehen
- die Transaktionshistorie einer Karte pruefen
- eine Karte manuell aufladen
- eine Karte sperren
- die Kartenliste exportieren (CSV)

## Mein-Konto-Bereich

Das Modul fuegt im Mein-Konto-Bereich einen Abschnitt unter folgender Adresse hinzu:

```
/moje-konto/polski-gift-cards/
```

Im Bereich sieht der Kunde:

- die Liste der besessenen Geschenkkarten
- das aktuelle Guthaben jeder Karte
- die Nutzungshistorie
- den Kartencode (mit Kopieroption)
- das Ablaufdatum (falls gesetzt)

## Hooks

### `polski_pro/gift_card/validate`

Filtert das Ergebnis der Validierung eines Geschenkkartencodes im Warenkorb.

```php
/**
 * @param bool   $is_valid  Czy kod jest prawidłowy
 * @param string $code      Kod karty podarunkowej
 * @param float  $cart_total Suma koszyka
 */
apply_filters('polski_pro/gift_card/validate', bool $is_valid, string $code, float $cart_total): bool;
```

**Beispiel:**

```php
add_filter('polski_pro/gift_card/validate', function (bool $is_valid, string $code, float $cart_total): bool {
    // Blokowanie kart podarunkowych dla zamówień poniżej 50 zł
    if ($cart_total < 50.00) {
        wc_add_notice('Karty podarunkowe można wykorzystać przy zamówieniach od 50 zł.', 'error');
        return false;
    }
    return $is_valid;
}, 10, 3);
```

### `polski_pro/gift_card/applied`

Aktion, die nach dem Anwenden einer Geschenkkarte im Warenkorb ausgeloest wird.

```php
/**
 * @param string $code    Kod karty
 * @param float  $amount  Kwota do odliczenia
 * @param float  $balance Pozostałe saldo
 */
do_action('polski_pro/gift_card/applied', string $code, float $amount, float $balance);
```

**Beispiel:**

```php
add_action('polski_pro/gift_card/applied', function (string $code, float $amount, float $balance): void {
    // Logowanie użycia karty
    wc_get_logger()->info(
        "Karta {$code}: odliczono {$amount} zł, saldo: {$balance} zł",
        ['source' => 'polski-pro-gift-cards']
    );
}, 10, 3);
```

### `polski_pro/gift_card/order_created`

Aktion, die nach dem Erstellen einer Bestellung mit Verwendung einer Geschenkkarte ausgeloest wird.

```php
/**
 * @param int    $order_id ID zamówienia
 * @param string $code     Kod karty
 * @param float  $amount   Kwota odliczona z karty
 */
do_action('polski_pro/gift_card/order_created', int $order_id, string $code, float $amount);
```

**Beispiel:**

```php
add_action('polski_pro/gift_card/order_created', function (int $order_id, string $code, float $amount): void {
    $order = wc_get_order($order_id);
    $order->add_order_note(
        sprintf('Użyto kartę podarunkową %s na kwotę %.2f zł', $code, $amount)
    );
}, 10, 3);
```

### `polski_pro/gift_card/calculate_totals`

Filtert den von der Geschenkkarte abzuziehenden Betrag bei der Neuberechnung der Warenkorbsummen.

```php
/**
 * @param float  $discount   Kwota rabatu z karty
 * @param string $code       Kod karty
 * @param float  $cart_total Suma koszyka przed rabatem
 */
apply_filters('polski_pro/gift_card/calculate_totals', float $discount, string $code, float $cart_total): float;
```

## E-Mail mit dem Code

Nach Bezahlung der Bestellung sendet das Plugin eine E-Mail mit dem Kartencode. Die E-Mail enthaelt:

- den Kartencode (formatiert)
- den Nennwert
- das Ablaufdatum (falls zutreffend)
- eine Anleitung zur Nutzung

Das E-Mail-Template kann unter **WooCommerce > Einstellungen > E-Mails > Geschenkkarte** angepasst werden.

### E-Mail fuer den Beschenkten

Der Kunde kann die E-Mail-Adresse des Beschenkten angeben. Dann:

- wird der Code an die Adresse des Beschenkten gesendet
- erhaelt der Kaeufer eine Kaufbestaetigung (ohne Code)
- optional: der Kaeufer kann eine Nachricht fuer den Beschenkten hinzufuegen

## Haeufige Probleme

### Der Code wird im Warenkorb nicht akzeptiert

1. Pruefe, ob der Code korrekt eingegeben wurde (ohne Leerzeichen am Anfang/Ende)
2. Verifiziere, ob die Karte nicht abgelaufen ist
3. Pruefe das Kartenguthaben im Administrationsbereich
4. Stelle sicher, dass die Karte nicht gesperrt ist

### Der Kunde hat den Code nicht per E-Mail erhalten

1. Pruefe, ob die Bestellung bezahlt ist (Status "Processing" oder "Completed")
2. Verifiziere die WooCommerce-E-Mail-Konfiguration
3. Pruefe die E-Mail-Logs auf Versandfehler

### Das Guthaben verringert sich nach der Bestellung nicht

1. Pruefe, ob die Bestellung erfolgreich aufgegeben wurde (nicht storniert)
2. Verifiziere die Transaktionshistorie der Karte im Administrationsbereich
3. Pruefe die Logs auf PHP-Fehler

## Verwandte Ressourcen

- [PRO-Uebersicht](/pro/overview/)
- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschliesslich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewaehrleistung bereitgestellt wird.</div>
