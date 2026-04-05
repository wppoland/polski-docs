---
title: Steuernummer (NIP) an der Kasse
description: Validierung der Steuernummer mit Pruefsumme, Verifizierung in der GUS-REGON-API und automatischer Abruf von Firmendaten auf der WooCommerce-Kassenseite.
---

Firmenkunden brauchen ein NIP-Feld an der Kasse, um eine MwSt.-Rechnung zu erhalten. Polski for WooCommerce fuegt ein NIP-Feld mit Pruefsummenvalidierung und GUS-REGON-Verifizierung hinzu. Die Firmendaten werden automatisch ergaenzt.

## Funktionen

Das NIP-Modul bietet drei Verifizierungsebenen:

1. **Formatvalidierung** - Pruefung, ob die Nummer aus 10 Ziffern besteht
2. **Pruefsummenvalidierung** - Algorithmus zur Verifizierung der NIP-Pruefziffer
3. **GUS-REGON-Verifizierung** - Pruefung in der Datenbank des Statistischen Zentralamts mit automatischem Abruf der Firmendaten

## Konfiguration

Gehen Sie zu **WooCommerce > Einstellungen > Polski > Kasse** und konfigurieren Sie den Abschnitt "NIP".

### Grundeinstellungen

| Einstellung | Standardwert | Beschreibung |
|------------|-----------------|------|
| NIP-Feld aktivieren | Ja | Fuegt das NIP-Feld auf der Kassenseite hinzu |
| Pflichtfeld | Nein | Ob NIP obligatorisch ist |
| Feldposition | Nach dem Firmenfeld | Wo das NIP-Feld angezeigt wird |
| Pruefsummenvalidierung | Ja | Prueft die Korrektheit der Steuernummer |
| GUS-REGON-Verifizierung | Nein | Verifiziert NIP in der GUS-Datenbank |
| Automatische Ergaenzung | Ja | Ruft Firmendaten von GUS ab |

### Bedingte Anzeige

Das NIP-Feld kann angezeigt werden:

- **Immer** - sichtbar fuer alle Kunden
- **Nach Ankreuzen der Checkbox "Rechnung gewuenscht"** - erscheint nach dem Ankreuzen
- **Nach Eingabe des Firmennamens** - erscheint, wenn das Feld "Firma" ausgefuellt ist

Die empfohlene Option ist die Anzeige nach Ankreuzen der Checkbox "Rechnung gewuenscht" - dies ist am verstaendlichsten fuer den Kunden.

## Pruefsummenvalidierung

Der NIP-Validierungsalgorithmus basiert auf einem Gewichtungssystem. Die Pruefziffer (letzte, zehnte Ziffer) wird aus den neun vorherigen Ziffern berechnet.

### Algorithmus

Gewichte fuer die einzelnen NIP-Ziffern: `6, 5, 7, 2, 3, 4, 5, 6, 7`

```
NIP: 1234567890
Summe = 1*6 + 2*5 + 3*7 + 4*2 + 5*3 + 6*4 + 7*5 + 8*6 + 9*7 = 214
Rest = 214 mod 11
Wenn Rest == letzte NIP-Ziffer -> NIP korrekt
```

Das Plugin fuehrt diese Validierung sowohl client- (JavaScript) als auch serverseitig (PHP) durch. Die serverseitige Validierung ist immer aktiv - sie kann nicht durch Deaktivieren von JavaScript umgangen werden.

### Unterstuetzte Eingabeformate

Das Plugin akzeptiert NIP in verschiedenen Formaten:

- `1234567890` - nur Ziffern
- `123-456-78-90` - mit Bindestrichen
- `123 456 78 90` - mit Leerzeichen
- `PL1234567890` - mit Laenderpraefix

Alle Formate werden vor der Validierung auf 10 Ziffern normalisiert.

## GUS-REGON-Verifizierung

### API-Konfiguration

Die GUS-REGON-API erfordert einen Zugangsschluessel. Das Plugin unterstuetzt zwei Umgebungen:

| Umgebung | URL | Schluessel | Verwendung |
|------------|-----|-------|-------------|
| Test | `https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnwordbir.svc` | `abcde12345abcde12345` (oeffentlicher Testschluessel) | Entwicklung und Tests |
| Produktion | `https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnetrzny.svc` | Eigener Schluessel von GUS | Laufender Shop |

### Produktionsschluessel erhalten

1. Gehen Sie zur Seite: https://api.stat.gov.pl/Home/BirIndex
2. Registrieren Sie sich und loggen Sie sich ein
3. Stellen Sie einen Antrag auf API-REGON-Zugang
4. Der Schluessel wird an die angegebene E-Mail-Adresse gesendet (Wartezeit: 1-3 Werktage)

### Konfiguration im Plugin

1. Gehen Sie zu **WooCommerce > Einstellungen > Polski > Kasse > NIP**
2. Aktivieren Sie **GUS-REGON-Verifizierung**
3. Waehlen Sie die Umgebung: **Test** oder **Produktion**
4. Fuegen Sie den API-Schluessel ein (fuer die Produktionsumgebung)
5. Speichern Sie die Einstellungen

### Testmodus

Im Testmodus verwendet das Plugin den oeffentlichen GUS-Testschluessel. Die Testdatenbank enthaelt fiktive Daten - sie dient nicht zur Verifizierung echter Steuernummern. Verwenden Sie ihn ausschliesslich waehrend der Entwicklung und zum Testen der Integration.

## Automatischer Abruf von Firmendaten

Nach der NIP-Verifizierung in GUS REGON ergaenzt das Plugin automatisch die Formularfelder:

| WooCommerce-Feld | Daten von GUS |
|-----------------|------------|
| Firma (company) | Firmenname |
| Adresse 1 | Strasse und Nummer |
| Stadt | Ortschaft |
| PLZ | Postleitzahl |
| Bundesland | Woiwodschaft |

Der Kunde sieht die ergaenzten Daten und kann sie vor der Bestellung korrigieren.

### Verhalten bei automatischer Ergaenzung

- Felder werden nur ergaenzt, wenn sie leer sind oder zuvor von GUS abgerufene Daten enthalten
- Wenn der Kunde die Daten manuell geaendert hat, ueberschreibt das Plugin die Aenderungen nicht
- Der Kunde wird mit einer Nachricht ueber den Datenabruf informiert

## NIP-Speicherung

Die Steuernummer wird als Bestellmetadaten gespeichert:

- Schluessel: `_billing_nip`
- sichtbar im Administrationspanel der Bestellung
- verfuegbar in E-Mail-Vorlagen
- exportierbar in Berichten

### NIP-Anzeige in der Bestellung

Die Steuernummer wird automatisch angezeigt:

- in den Bestelldetails (Administrationspanel)
- in der Bestellbestaetigungs-E-Mail
- auf der Seite "Mein Konto > Bestellungen"

## Programmatischer Zugriff

### NIP aus der Bestellung abrufen

```php
$order = wc_get_order($order_id);
$nip = $order->get_meta('_billing_nip');
```

### NIP in PHP validieren

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

### Validierungs-Hook

```php
add_filter('polski/checkout/validate_nip', function (bool $is_valid, string $nip): bool {
    // Zusaetzliche Validierungslogik
    // z.B. Pruefung gegen eine Liste blockierter NIPs
    $blocked_nips = ['0000000000'];

    if (in_array($nip, $blocked_nips, true)) {
        return false;
    }

    return $is_valid;
}, 10, 2);
```

## Haeufige Probleme

### GUS-Verifizierung gibt einen Fehler zurueck

1. Pruefen Sie, ob der API-Schluessel korrekt und aktiv ist
2. Ueberpruefen Sie, ob der Server eine HTTPS-Verbindung zu api.stat.gov.pl aufbauen kann
3. Die GUS-API ist gelegentlich nicht verfuegbar - das Plugin behandelt Timeouts und zeigt eine entsprechende Meldung
4. Stellen Sie sicher, dass die PHP-SOAP-Erweiterung auf dem Server installiert ist

### NIP-Feld wird nicht angezeigt

1. Pruefen Sie, ob das NIP-Modul aktiviert ist
2. Ueberpruefen Sie die Einstellung fuer die bedingte Anzeige
3. Leeren Sie den Cache (Caching-Plugins koennen das Kassenformular cachen)

### Firmendaten werden nicht automatisch ergaenzt

1. Pruefen Sie die Browser-Konsole auf AJAX-Fehler
2. Ueberpruefen Sie, ob der REST-API-Endpunkt des Plugins erreichbar ist
3. Stellen Sie sicher, dass die Steuernummer korrekt ist und die Firma in der GUS-Datenbank existiert

## Verwandte Ressourcen

- [Problem melden](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
