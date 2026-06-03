---
title: NIP im Checkout
description: NIP-Validierung mit Prüfsumme, Verifizierung über die GUS-REGON-API sowie automatischer Abruf der Unternehmensdaten auf der WooCommerce-Checkout-Seite.
---

Geschäftskunden benötigen im Checkout ein NIP-Feld, um eine Umsatzsteuerrechnung zu erhalten. Das Plugin Polski for WooCommerce fügt ein NIP-Feld mit Prüfsummenvalidierung und Verifizierung in der GUS-REGON-Datenbank hinzu. Die Unternehmensdaten werden automatisch ausgefüllt.

## Funktionen

Das NIP-Modul verifiziert die Nummer auf drei Ebenen:

1. **Formatvalidierung** - Prüfung, ob die Nummer aus 10 Ziffern besteht
2. **Prüfsummenvalidierung** - Algorithmus zur Verifizierung der NIP-Prüfziffer
3. **GUS-REGON-Verifizierung** - Prüfung in der Datenbank des Statistischen Hauptamtes mit automatischem Abruf der Unternehmensdaten

## Konfiguration

Gehe zu **WooCommerce > Einstellungen > Polski > Checkout** und konfiguriere den Bereich "NIP".

### Grundeinstellungen

| Einstellung | Standardwert | Beschreibung |
|------------|-----------------|------|
| NIP-Feld aktivieren | Ja | Fügt das NIP-Feld auf der Checkout-Seite hinzu |
| Feld erforderlich | Nein | Ob die NIP Pflicht ist |
| Position des Felds | Nach dem Firmenfeld | Wo das NIP-Feld angezeigt wird |
| Prüfsummenvalidierung | Ja | Prüft die Korrektheit der NIP-Nummer |
| GUS-REGON-Verifizierung | Nein | Verifiziert die NIP in der GUS-Datenbank |
| Automatisches Ausfüllen | Ja | Ruft die Unternehmensdaten aus GUS ab |

### Bedingte Anzeige

Das NIP-Feld kann angezeigt werden:

- **Immer** - sichtbar für alle Kunden
- **Nach Anhaken der Checkbox "Ich möchte eine Rechnung"** - erscheint nach dem Anhaken
- **Nach Eingabe des Firmennamens** - erscheint, wenn das Feld "Firma" ausgefüllt ist

Die empfohlene Option ist die Anzeige nach Anhaken der Checkbox "Ich möchte eine Rechnung" - das ist für den Kunden am übersichtlichsten.

## Prüfsummenvalidierung

Die NIP wird über ein Gewichtungssystem validiert. Die letzte Ziffer (Prüfziffer) muss mit dem Ergebnis der Berechnung aus den neun vorhergehenden Ziffern übereinstimmen.

### Algorithmus

Gewichte für die aufeinanderfolgenden NIP-Ziffern: `6, 5, 7, 2, 3, 4, 5, 6, 7`

```
NIP: 1234567890
Summe = 1*6 + 2*5 + 3*7 + 4*2 + 5*3 + 6*4 + 7*5 + 8*6 + 9*7 = 214
Rest = 214 mod 11
Wenn Rest == letzte Ziffer der NIP -> NIP korrekt
```

Das Plugin validiert die NIP clientseitig (JavaScript) und serverseitig (PHP). Die serverseitige Validierung ist immer aktiv - sie lässt sich nicht umgehen.

### Verarbeitung der Eingabeformate

Das Plugin akzeptiert die NIP in verschiedenen Formaten:

- `1234567890` - nur Ziffern
- `123-456-78-90` - mit Bindestrichen
- `123 456 78 90` - mit Leerzeichen
- `PL1234567890` - mit Länderpräfix

Alle Formate werden vor der Validierung auf 10 Ziffern normalisiert.

## GUS-REGON-Verifizierung

### API-Konfiguration

Die GUS-REGON-API erfordert einen Zugangsschlüssel. Das Plugin unterstützt zwei Umgebungen:

| Umgebung | URL | Schlüssel | Verwendung |
|------------|-----|-------|-------------|
| Test | `https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnwordbir.svc` | `abcde12345abcde12345` (öffentlicher Testschlüssel) | Entwicklung und Tests |
| Produktion | `https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnetrzny.svc` | Eigener Schlüssel von GUS | Laufender Shop |

### Beschaffung des Produktionsschlüssels

1. Gehe auf die Seite: https://api.stat.gov.pl/Home/BirIndex
2. Registriere dich und melde dich an
3. Stelle einen Antrag auf Zugang zur REGON-API
4. Der Schlüssel wird an die angegebene E-Mail-Adresse gesendet (Wartezeit: 1-3 Werktage)

### Konfiguration im Plugin

1. Gehe zu **WooCommerce > Einstellungen > Polski > Checkout > NIP**
2. Aktiviere **GUS-REGON-Verifizierung**
3. Wähle die Umgebung: **Test** oder **Produktion**
4. Füge den API-Schlüssel ein (für die Produktionsumgebung)
5. Speichere die Einstellungen

### Testmodus

Der Testmodus nutzt den öffentlichen GUS-Schlüssel. Die Testdatenbank enthält fiktive Daten - du verifizierst darin keine echten NIP-Nummern. Verwende ihn nur während der Erstellung und des Testens des Shops.

## Automatischer Abruf der Unternehmensdaten

Nach der NIP-Verifizierung füllt das Plugin die Formularfelder automatisch aus:

| WooCommerce-Feld | Daten aus GUS |
|-----------------|------------|
| Firma (company) | Firmenname |
| Adresse 1 | Straße und Hausnummer |
| Stadt | Ortschaft |
| Postleitzahl | Postleitzahl |
| Woiwodschaft | Woiwodschaft |

Der Kunde sieht die ausgefüllten Daten und kann sie vor der Bestellung korrigieren.

### Verhalten beim automatischen Ausfüllen

- Felder werden nur ausgefüllt, wenn sie leer sind oder zuvor aus GUS abgerufene Daten enthalten
- Wenn der Kunde die Daten manuell geändert hat, überschreibt das Plugin die Änderungen nicht
- Der Kunde wird durch eine Meldung über den Abruf der Daten informiert

## Speicherung der NIP

Die NIP-Nummer wird als Bestellmetadaten gespeichert:

- Schlüssel: `_billing_nip`
- sichtbar im Administrationspanel der Bestellung
- verfügbar in E-Mail-Vorlagen
- exportierbar in Berichten

### Anzeige der NIP in der Bestellung

Die NIP wird automatisch angezeigt:

- in den Bestelldetails (Administrationspanel)
- in der Bestellbestätigungs-E-Mail
- auf der Seite "Mein Konto > Bestellungen"

## Programmatischer Zugriff

### Abruf der NIP aus der Bestellung

```php
$order = wc_get_order($order_id);
$nip = $order->get_meta('_billing_nip');
```

### NIP-Validierung in PHP

```php
function validate_nip(string $nip): bool {
    $nip = preg_replace('/[^0-9]/', '', $nip);

    if (strlen($nip) !== 10) {
        return false;
    }

    $weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
    $sum = 0;

    for ($i = 0; $i < 9; $i++) {
        $sum += (int) $nip[$i] * $weights[$i];
    }

    return ($sum % 11) === (int) $nip[9];
}
```

### Hook für die Validierung

```php
add_filter('polski/checkout/validate_nip', function (bool $is_valid, string $nip): bool {
    // Zusätzliche Validierungslogik
    // z. B. Prüfung anhand einer Liste blockierter NIP-Nummern
    $blocked_nips = ['0000000000'];

    if (in_array($nip, $blocked_nips, true)) {
        return false;
    }

    return $is_valid;
}, 10, 2);
```

## Häufige Probleme

### Die GUS-Verifizierung gibt einen Fehler zurück

1. Prüfe, ob der API-Schlüssel korrekt und aktiv ist
2. Verifiziere, ob der Server eine HTTPS-Verbindung zu api.stat.gov.pl herstellen kann
3. Die GUS-API ist manchmal nicht verfügbar - das Plugin verarbeitet den Timeout und zeigt eine entsprechende Meldung an
4. Stelle sicher, dass die PHP-Erweiterung SOAP auf dem Server installiert ist

### Das NIP-Feld wird nicht angezeigt

1. Prüfe, ob das NIP-Modul aktiviert ist
2. Verifiziere die Einstellung für die bedingte Anzeige
3. Leere den Cache (Cache-Plugins können das Checkout-Formular zwischenspeichern)

### Die Unternehmensdaten werden nicht automatisch ausgefüllt

1. Prüfe die Browser-Konsole auf AJAX-Fehler
2. Verifiziere, ob der REST-API-Endpunkt des Plugins erreichbar ist
3. Stelle sicher, dass die NIP korrekt ist und das Unternehmen in der GUS-Datenbank existiert

## Verwandte Ressourcen

- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), bereitgestellt ohne Gewährleistung.</div>
