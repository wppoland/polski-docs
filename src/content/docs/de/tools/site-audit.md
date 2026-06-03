---
title: Shop-Audit
description: Werkzeug für das Shop-Audit in Polski for WooCommerce - Prüfung von Rechtsseiten, Dark Patterns, DPA, DSA, KSeF, Greenwashing und Sicherheit.
---

Das Audit scannt den Shop automatisch im Hinblick auf das polnische und das EU-E-Commerce-Recht. Im Unterschied zum Konformitäts-Panel analysiert das Audit den Inhalt der Seiten, die Benutzeroberfläche und die technische Konfiguration.

## Audit starten

Gehe zu **WooCommerce > Polski > Werkzeuge > Shop-Audit** und klicke auf **Audit starten**. Die Dauer hängt von der Anzahl der Produkte und Seiten ab.

Das Audit lässt sich auch über WP-CLI starten:

```bash
wp polski smoke-test --module=audit --verbose
```

## Umfang des Audits

### Rechtsseiten

Das Audit prüft den Inhalt der Rechtsseiten:

**AGB des Shops:**
- Vorhandensein der erforderlichen Abschnitte (Firmendaten, Bestellablauf, Zahlungen, Lieferung, Widerruf, Reklamation)
- Kontaktdaten des Verkäufers (Name, Adresse, NIP, E-Mail, Telefon)
- Hinweis auf die außergerichtliche Streitbeilegung
- Hinweis auf die ODR-Plattform (Online Dispute Resolution)
- Aktualität der Daten (Abgleich der NIP mit dem Register)

**Datenschutzerklärung:**
- Daten des Verantwortlichen für die personenbezogenen Daten
- Zwecke der Datenverarbeitung
- Rechtsgrundlagen der Verarbeitung
- Hinweis auf die Rechte der betroffenen Person (Auskunft, Berichtigung, Löschung)
- Hinweis zu Cookies
- Kontaktdaten des Datenschutzbeauftragten (sofern erforderlich)

**Widerrufsbelehrung:**
- Muster-Widerrufsformular
- Widerrufsfrist (14 Tage)
- Anleitung zum Ablauf
- Hinweis zu den Rücksendekosten

**Lieferinformationen:**
- Verfügbare Liefermethoden
- Lieferkosten
- Geschätzte Lieferzeiten
- Hinweis zur Lieferung in EU-Länder

### Dark Patterns

Das Audit erkennt manipulative Muster (Dark Patterns) gemäß der DSA-Richtlinie und dem polnischen Recht:

| Muster                     | Beschreibung                                   | Stufe   |
| -------------------------- | ---------------------------------------------- | ------- |
| Preselected checkboxes     | Standardmäßig angehakte Einwilligungs-Checkboxen | FAIL    |
| Hidden costs               | Kosten, die erst an der Kasse erscheinen        | FAIL    |
| Countdown timers           | Falsche herunterzählende Timer                  | WARN    |
| Fake scarcity              | Künstliche Meldungen über geringen Bestand      | WARN    |
| Forced account creation    | Erzwungene Registrierung vor dem Kauf           | WARN/FAIL |
| Difficult unsubscribe      | Erschwerter Prozess zur Abmeldung vom Newsletter | FAIL    |
| Confusing button placement | Irreführende Platzierung der Annahme-/Ablehnen-Buttons | WARN |
| Nagging popups             | Wiederkehrende, schwer zu schließende Popups    | WARN    |

**Neue automatische Prüfungen (1.7.2):**

- **Forced account creation** - prüft die WooCommerce-Optionen: wenn `woocommerce_enable_guest_checkout=no` **und** `woocommerce_enable_checkout_login_reminder=yes`, Status FAIL (EU-Richtlinie 2023/2673); allein der Wert guest_checkout=no ohne Login-Reminder → WARN.
- **Stale sale countdowns** - Scan der letzten 100 Produkte: Produkte mit `date_on_sale_to` in der Vergangenheit, die weiterhin `is_on_sale()=true` haben, werden markiert. Erkennt falsche „Aktions-Countdowns", die sich nach jedem Neuladen zurücksetzen.
- **Misleading "from" price** - Scan von 100 variablen Produkten: wenn der Mindestpreis < 50 % des Höchstpreises beträgt, wird der Eintrag als potenziell irreführend markiert (Preis ab X, aber nur für ein Vielfaches dieses Preises verfügbar).
- **Low-stock threshold** - wenn `woocommerce_notify_low_stock_amount > 5`, markieren wir künstliche Dringlichkeit: die Meldung „nur noch X übrig" erscheint dann bei Produkten mit hohem Lagerbestand.

Das Audit prüft:
- Kassenformular - Standardzustände der Checkboxen
- Cookie-Popup - ob der Ablehnen-Button ebenso sichtbar ist wie der Annehmen-Button
- Registrierungsformular - erforderliche vs. optionale Felder
- Warenkorb - ob der Endpreis von Anfang an sichtbar ist
- Newsletter - ob die Abmeldung einfach ist

### DPA (Data Processing Agreement)

Das Audit prüft die Auftragsverarbeitungsverträge:

- Ob der Shop externe datenverarbeitende Dienste nutzt (Analytics, E-Mail-Marketing, Zahlungs-Gateways)
- Ob für die erkannten Dienste passende DPA-Verträge bestehen
- Liste der erkannten Dienste: Google Analytics, Facebook Pixel, Mailchimp, GetResponse, PayU, Przelewy24, Stripe

Das Audit scannt den Seitencode (JavaScript, Tracking-Pixel) und erkennt externe Dienste.

### DSA (Digital Services Act)

Geprüfte DSA-Anforderungen:

- Formular zur Meldung illegaler Inhalte - Verfügbarkeit und Korrektheit der Felder
- Kontaktstelle - ob eine Kontakt-E-Mail veröffentlicht ist
- Hinweis zur Inhaltsmoderation - Richtlinie zur Moderation von Bewertungen
- Nutzungsbedingungen - Verfügbarkeit und Vollständigkeit
- Meldungsregister - ob das System Meldungen erfasst und archiviert

### KSeF (Krajowy System e-Faktur)

Geprüft wird die KSeF-Bereitschaft:

- Firmen-NIP - Korrektheit des Formats und Verifizierung im Register
- Verbindung zur KSeF-API - Connectivity-Test
- Daten auf Rechnungen - Vollständigkeit der erforderlichen Felder
- NIP-Feld an der Kasse - Verfügbarkeit für Geschäftskunden
- Automatische Rechnungserstellung - Konfiguration des Moduls

### Greenwashing

Das Audit prüft Umweltaussagen bei Produkten:

- **Aussagen ohne Nachweise** - Texte wie "ökologisch", "grün", "natürlich" ohne Zertifikat oder Begründung
- **Allgemeine Behauptungen** - zu allgemeine Aussagen ohne Details (z. B. "umweltfreundlich")
- **Fehlende Zertifikate** - Berufung auf ein Zertifikat ohne Nummer oder Link
- **Inkonsistente Angaben** - Aussage zur Recyclingfähigkeit ohne Materialangabe
- **Offsetting** - Behauptungen zur Klimaneutralität, die ausschließlich auf Kompensation beruhen

Gescannt werden Produktnamen, Beschreibungen, Kurzbeschreibung und die Metadaten des Greenwashing-Moduls.

### Sicherheit

Geprüfte Sicherheitsaspekte:

| Prüfung                          | Beschreibung                          |
| -------------------------------- | ------------------------------------- |
| SSL/HTTPS                        | Ob der gesamte Shop über HTTPS läuft  |
| WordPress-Version                | Ob sie aktuell ist                    |
| WooCommerce-Version              | Ob sie aktuell ist                    |
| PHP-Version                      | Ob sie nicht abgekündigt ist (EOL)    |
| Debug-Modus                      | Ob `WP_DEBUG_DISPLAY` in der Produktion deaktiviert ist |
| Standard-Admin-Konto             | Ob kein Benutzer "admin" existiert    |
| XML-RPC                          | Ob es deaktiviert ist (empfohlen)     |
| REST-API-Exposure                | Ob die Benutzer-Endpunkte nicht öffentlich sind |
| File editing                     | Ob das Bearbeiten von Dateien aus dem Panel deaktiviert ist |

## Audit-Bericht

Nach Abschluss des Audits wird ein Bericht angezeigt:

### Zusammenfassung

- **Gesamtbewertung** - von A (hervorragend) bis F (kritische Probleme)
- **Kritische Anforderungen** - Anzahl der FAIL
- **Warnungen** - Anzahl der WARN
- **Erfüllt** - Anzahl der OK
- **Audit-Datum** - Zeitstempel

### Details

Jedes gefundene Problem enthält:

- **Kategorie** - zu welchem Abschnitt des Audits es gehört
- **Priorität** - FAIL (kritisch), WARN (Warnung), INFO (Information)
- **Beschreibung** - was gefunden wurde
- **Standort** - wo das Problem auftritt (URL, Seite, Produkt)
- **Empfohlene Maßnahme** - was zu tun ist, um es zu beheben
- **Rechtsgrundlage** - Verweis auf die Vorschrift

### Bericht exportieren

Exportiere den Bericht in den Formaten:

- **PDF** - Bericht zum Ausdrucken oder zum Weitergeben an einen Anwalt
- **CSV** - tabellarische Daten für eine Tabellenkalkulation
- **JSON** - maschinenlesbare Daten

```php
// Hook nach Abschluss des Audits
add_action('polski/audit/completed', function (array $results): void {
    if ($results['grade'] === 'F') {
        wp_mail(
            get_option('admin_email'),
            'Audyt sklepu - ocena krytyczna',
            'Audyt wykazał krytyczne problemy. Sprawdź panel zgodności.'
        );
    }
});
```

## Audit-Zeitplan

Das Audit kann automatisch ausgeführt werden:

- **Wöchentlich** - empfohlen für aktive Shops
- **Monatlich** - Minimum für jeden Shop
- **Manuell** - auf Anforderung

Konfiguration: **WooCommerce > Polski > Werkzeuge > Shop-Audit > Zeitplan**.

Die Ergebnisse werden im Verlauf gespeichert und per E-Mail an den Administrator gesendet.

## Fehlerbehebung

**Das Audit dauert zu lange** - bei mehr als 10.000 Produkten kann das Greenwashing-Audit länger dauern. Verwende WP-CLI mit `--module` für ausgewählte Abschnitte.

**Das Audit erkennt einen externen Dienst nicht** - die Liste der erkannten Dienste ist begrenzt. Melde den fehlenden Dienst auf GitHub.

**Falscher Dark-Pattern-Alarm** - manche Themes können Fehlalarme erzeugen. Melde das Problem und deaktiviere vorübergehend die konkrete Prüfung.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
