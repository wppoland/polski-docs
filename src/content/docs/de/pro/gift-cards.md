---
title: Geschenkkarten
description: Dokumentation der Geschenkkarten von Polski PRO for WooCommerce - Verkauf, Code-Generierung, Einloesung im Warenkorb, Saldoverfolgung und Mein-Konto-Bereich.
---

Das Modul ermoeglicht den Verkauf von Geschenkkarten als WooCommerce-Produkte. Der Kunde kauft eine Karte, erhaelt einen Code und bezahlt damit bei weiteren Bestellungen.

## So funktioniert es

1. Der Administrator erstellt ein Produkt vom Typ "Geschenkkarte"
2. Der Kunde kauft eine Geschenkkarte im Shop
3. Nach Bezahlung der Bestellung generiert das Plugin einen einzigartigen Kartencode
4. Der Code wird dem Kunden (oder dem Beschenkten) per E-Mail gesendet
5. Der Beschenkte gibt den Code im Warenkorb ein und erhaelt einen Rabatt in Hoehe des Kartenwerts
6. Das Kartensaldo verringert sich um den verwendeten Betrag

## Konfiguration

Gehen Sie zu **WooCommerce > Einstellungen > Polski > PRO-Module > Geschenkkarten**.

Das Modul wird ueber die Option gesteuert:

```
polski_gift_cards
```

### Allgemeine Einstellungen

| Einstellung | Beschreibung |
|------------|------|
| Geschenkkarten aktivieren | Aktiviert das Modul |
| Code-Laenge | Anzahl der Zeichen im Code (Standard 16) |
| Code-Format | Code-Muster (z. B. `XXXX-XXXX-XXXX-XXXX`) |
| Code-Praefix | Optionaler Praefix (z. B. `PL-`) |
| Kartegueltigkeit | Gueltigkeitstage (0 = unbegrenzt) |
| Code-Feld im Warenkorb | Position des Feldes zur Code-Eingabe |

### Geschenkkartenprodukt erstellen

1. Gehen Sie zu **Produkte > Neu hinzufuegen**
2. Waehlen Sie den Produkttyp: **Geschenkkarte**
3. Legen Sie den Preis fest (Nennwert der Karte)
4. Optional: Aktivieren Sie "Freier Betrag" - der Kunde gibt den Kartenwert selbst ein
5. Optional: Legen Sie Mindest- und Hoechstbetrag fuer den freien Betrag fest
6. Veroeffentlichen Sie das Produkt

Beim freien Betrag sieht der Kunde ein Feld zur Eingabe des Kartenwerts anstelle eines festen Preises.

## Code-Generierung

Geschenkkartencodes werden automatisch nach Bezahlung der Bestellung generiert. Algorithmus:

- alphanumerische Zeichen (A-Z, 0-9)
- Ausschluss mehrdeutiger Zeichen (0, O, I, L, 1)
- Validierung der Eindeutigkeit in der Datenbank
- Formatierung mit Trennzeichen (z. B. `ABCD-EFGH-JKMN-PQRS`)

Jeder Code ist im gesamten Shop einzigartig. Das Plugin ueberprueft die Eindeutigkeit vor dem Speichern und generiert bei Kollisionen einen neuen Code.

## Einloesung im Warenkorb

### Code-Feld

Auf der Warenkorbseite (und optional auf der Checkout-Seite) wird ein Feld zur Eingabe des Geschenkkartencodes angezeigt:

```
[Wpisz kod karty podarunkowej] [Zastosuj]
```

Nach Eingabe eines gueltigen Codes:

- wird das Kartensaldo angezeigt
- wird der Rabattbetrag von der Bestellsumme abgezogen
- wenn das Kartensaldo kleiner als der Bestellwert ist, wird der Rest mit anderen Zahlungsmethoden beglichen
- wenn das Kartensaldo groesser ist, bleibt der Restbetrag auf der Karte

### Code-Validierung

Das Plugin validiert den Kartencode vor der Anwendung:

- Pruefung, ob der Code in der Datenbank existiert
- Pruefung, ob die Karte nicht abgelaufen ist
- Pruefung, ob das Saldo groesser als Null ist
- Pruefung, ob die Karte nicht gesperrt ist

Die Fehlermeldung informiert den Kunden ueber den Grund der Code-Ablehnung.

### Sitzungsverfolgung

Der angewendete Kartencode wird in der WooCommerce-Sitzung des Kunden gespeichert. Das bedeutet:

- der Code bleibt auch nach Aktualisierung der Seite gespeichert
- der Code wird nach Bestellaufgabe oder Abmeldung entfernt
- der Kunde kann den angewendeten Code manuell entfernen

## Saldoverfolgung

Jede Geschenkkarte hat ein Saldo, das sich bei jeder Verwendung verringert. Die Transaktionshistorie der Karte enthaelt:

| Feld | Beschreibung |
|------|------|
| Datum | Transaktionsdatum |
| Typ | Aufladung / Verwendung / Erstattung |
| Betrag | Operationsbetrag |
| Bestellung | Bestell-ID (fuer Verwendung und Erstattung) |
| Saldo nach Operation | Aktuelles Saldo nach der Transaktion |

### Administrationsbereich

Im Bereich **WooCommerce > Geschenkkarten** kann der Administrator:

- Liste aller Karten mit Salden anzeigen
- Transaktionshistorie einer Karte pruefen
- eine Karte manuell aufladen
- eine Karte sperren
- Kartenliste exportieren (CSV)

## Mein-Konto-Bereich

Das Modul fuegt den Endpunkt `/polski-gift-cards` zum Mein-Konto-Bereich des Kunden hinzu. Der Endpunkt ist unter folgender Adresse erreichbar:

```
/moje-konto/polski-gift-cards/
```

Im Bereich sieht der Kunde:

- Liste der eigenen Geschenkkarten
- aktuelles Saldo jeder Karte
- Nutzungshistorie
- Kartencode (mit Kopieroption)
- Ablaufdatum (falls festgelegt)

## Hooks

### `polski_pro/gift_card/validate`

Filtert das Validierungsergebnis des Geschenkkartencodes im Warenkorb.

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

Aktion, die nach Anwendung einer Geschenkkarte im Warenkorb ausgefuehrt wird.

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

Aktion, die nach Erstellung einer Bestellung mit Geschenkkarte ausgefuehrt wird.

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

Filtert den von der Geschenkkarte abzuziehenden Betrag bei der Neuberechnung der Warenkorb-Summen.

```php
/**
 * @param float  $discount   Kwota rabatu z karty
 * @param string $code       Kod karty
 * @param float  $cart_total Suma koszyka przed rabatem
 */
apply_filters('polski_pro/gift_card/calculate_totals', float $discount, string $code, float $cart_total): float;
```

## E-Mail mit Code

Nach Bezahlung einer Bestellung mit Geschenkkarte sendet das Plugin eine E-Mail mit dem Code. Die E-Mail enthaelt:

- formatierten Kartencode
- Nennwert
- Ablaufdatum (falls zutreffend)
- Einloesungsanleitung

Die E-Mail-Vorlage kann unter **WooCommerce > Einstellungen > E-Mails > Geschenkkarte** angepasst werden.

### E-Mail fuer den Beschenkten

Beim Kauf einer Karte kann der Kunde die E-Mail-Adresse des Beschenkten angeben. In diesem Fall:

- wird der Code an die Adresse des Beschenkten gesendet
- erhaelt der Kaeufer eine Kaufbestaetigung (ohne Code)
- optional: der Kaeufer kann eine Nachricht fuer den Beschenkten hinzufuegen

## Haeufige Probleme

### Code wird im Warenkorb nicht akzeptiert

1. Pruefen Sie, ob der Code korrekt eingegeben wurde (ohne Leerzeichen am Anfang/Ende)
2. Ueberpruefen Sie, ob die Karte nicht abgelaufen ist
3. Pruefen Sie das Kartensaldo im Administrationsbereich
4. Stellen Sie sicher, dass die Karte nicht gesperrt ist

### Kunde hat den Code nicht per E-Mail erhalten

1. Pruefen Sie, ob die Bestellung bezahlt ist (Status "Processing" oder "Completed")
2. Ueberpruefen Sie die WooCommerce-E-Mail-Konfiguration
3. Pruefen Sie die E-Mail-Logs auf Versandfehler

### Saldo verringert sich nach Bestellung nicht

1. Pruefen Sie, ob die Bestellung erfolgreich aufgegeben wurde (nicht storniert)
2. Ueberpruefen Sie die Transaktionshistorie der Karte im Administrationsbereich
3. Pruefen Sie die Logs auf PHP-Fehler

## Verwandte Ressourcen

- [PRO-Uebersicht](/pro/overview/)
- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
