---
title: Shop-Audit
description: Shop-Audit-Werkzeug in Polski for WooCommerce - Pruefung von Rechtsseiten, Dark Patterns, DPA, DSA, KSeF, Greenwashing und Sicherheit.
---

Das Audit scannt den Shop automatisch auf polnisches und EU-E-Commerce-Recht. Im Unterschied zum Compliance-Panel analysiert das Audit Seiteninhalte, Oberflaeche und technische Konfiguration.

## Audit starten

Gehen Sie zu **WooCommerce > Polski > Werkzeuge > Shop-Audit** und klicken Sie auf **Audit starten**. Das Audit dauert je nach Produkt- und Seitenanzahl von einigen Sekunden bis zu einigen Minuten.

Das Audit kann auch per WP-CLI gestartet werden:

```bash
wp polski smoke-test --module=audit --verbose
```

## Audit-Umfang

### Rechtsseiten

Das Audit analysiert den Inhalt der Rechtsseiten auf:

**AGB:**
- Vorhandensein erforderlicher Abschnitte (Firmendaten, Bestellverfahren, Zahlung, Lieferung, Widerruf, Reklamation)
- Kontaktdaten des Verkaeufers (Name, Adresse, NIP, E-Mail, Telefon)
- Information zur aussergerichtlichen Streitbeilegung
- Information zur ODR-Plattform

**Datenschutzerklaerung:**
- Daten des Verantwortlichen
- Verarbeitungszwecke
- Rechtsgrundlagen der Verarbeitung
- Information ueber Betroffenenrechte
- Cookie-Information

### Dark Patterns

Das Audit erkennt als manipulativ geltende Designmuster (Dark Patterns) gemaess DSA-Richtlinie und polnischem Recht:

| Muster                    | Beschreibung                                           | Stufe  |
| -------------------------- | ---------------------------------------------- | ------- |
| Vorausgewaehlte Checkboxen     | Standardmaessig angekreuzte Einwilligungs-Checkboxen             | FAIL    |
| Versteckte Kosten               | Kosten, die erst an der Kasse erscheinen          | FAIL    |
| Countdown-Timer           | Gefaelschte Countdown-Zaehler                    | WARN    |
| Kuenstliche Knappheit              | Kuenstliche Meldungen ueber niedrigen Bestand             | WARN    |
| Erzwungene Kontoerstellung    | Registrierungszwang vor dem Kauf            | WARN/FAIL |
| Schwierige Abmeldung      | Erschwerter Newsletter-Abmeldeprozess      | FAIL    |
| Verwirrende Button-Platzierung | Irrefuehrende Platzierung von Akzeptanz-/Ablehnungsbuttons | WARN |
| Nervige Popups             | Wiederholte, schwer zu schliessende Popups   | WARN    |

**Neue automatische Pruefungen (1.7.2):**

- **Erzwungene Kontoerstellung** - prueft WooCommerce-Optionen: wenn `woocommerce_enable_guest_checkout=no` **und** `woocommerce_enable_checkout_login_reminder=yes`, FAIL (EU-Richtlinie 2023/2673); deaktivierter Gast-Checkout allein ergibt WARN.
- **Veraltete Sale-Countdowns** - Scan der 100 zuletzt geaenderten Produkte: Produkte, deren `date_on_sale_to` abgelaufen ist, aber `is_on_sale()=true` zurueckgeben, werden markiert. Erkennt gefaelschte Countdown-Widgets, die sich nach Ablauf zuruecksetzen.
- **Irrefuehrender "ab"-Preis** - Scan von bis zu 100 variablen Produkten: wenn der Minimalpreis unter 50% des Maximalpreises liegt, wird das Produkt als potenziell irrefuehrend markiert.
- **Niedriger Bestand Schwellenwert** - wenn `woocommerce_notify_low_stock_amount > 5`, loest das die kuenstliche Dringlichkeit "nur X uebrig" auf Produkten mit hohem Bestand aus und wird markiert.

### DPA (Auftragsverarbeitungsvertrag)

Das Audit ueberpreuft Auftragsverarbeitungsvertraege - ob fuer erkannte externe Dienste (Google Analytics, Facebook Pixel, Mailchimp, PayU, Stripe usw.) entsprechende DPA-Vertraege vorhanden sind.

### DSA (Digital Services Act)

Das Audit prueft DSA-Anforderungen: Meldeformular, Kontaktstelle, Moderationsrichtlinie, Nutzungsbedingungen und Meldungsregister.

### KSeF

Das Audit ueberpreuft die KSeF-Integrationsbereitschaft: NIP-Format, API-Verbindung, Rechnungsdaten und NIP-Feld an der Kasse.

### Greenwashing

Das Audit analysiert Umweltaussagen auf Produkten auf unbegruendete Behauptungen, fehlende Zertifikate und inkonsistente Daten.

### Sicherheit

| Pruefung                      | Beschreibung                                  |
| -------------------------------- | ------------------------------------- |
| SSL/HTTPS                        | Ob der gesamte Shop ueber HTTPS laeuft     |
| WordPress-Version                 | Ob aktuell                     |
| WooCommerce-Version               | Ob aktuell                     |
| PHP-Version                       | Ob nicht veraltet (EOL)           |
| Debug-Modus                       | Ob `WP_DEBUG_DISPLAY` in Produktion deaktiviert ist |
| Standard-Admin-Konto             | Ob kein Benutzer "admin" existiert   |
| XML-RPC                          | Ob deaktiviert (empfohlen)         |
| REST API Exposure                | Ob Benutzer-Endpunkte nicht oeffentlich sind |
| Dateibearbeitung                     | Ob Dateibearbeitung aus dem Panel deaktiviert ist |

## Audit-Bericht

Nach Abschluss wird ein Ergebnisbericht angezeigt:

### Zusammenfassung

- **Gesamtbewertung** - von A (ausgezeichnet) bis F (kritische Probleme)
- **Kritische Anforderungen** - Anzahl FAIL
- **Warnungen** - Anzahl WARN
- **Erfuellt** - Anzahl OK
- **Audit-Datum** - Zeitstempel

### Details

Jedes gefundene Problem enthaelt Kategorie, Prioritaet, Beschreibung, Lokalisierung (URL, Seite, Produkt), empfohlene Massnahme und Rechtsgrundlage.

### Berichtsexport

Der Bericht kann in folgenden Formaten exportiert werden:

- **PDF** - Bericht zum Drucken oder Weiterleiten an einen Anwalt
- **CSV** - tabellarische Daten fuer Tabellenkalkulationen
- **JSON** - maschinenlesbare Daten

```php
// Hook nach Audit-Abschluss
add_action('polski/audit/completed', function (array $results): void {
    if ($results['grade'] === 'F') {
        wp_mail(
            get_option('admin_email'),
            'Shop-Audit - kritische Bewertung',
            'Das Audit hat kritische Probleme ergeben. Pruefen Sie das Compliance-Panel.'
        );
    }
});
```

## Audit-Zeitplan

Das Audit kann automatisch in festgelegten Abstaenden gestartet werden:

- **Woechentlich** - empfohlen fuer aktive Shops
- **Monatlich** - Minimum fuer jeden Shop
- **Manuell** - auf Anforderung

Konfiguration: **WooCommerce > Polski > Werkzeuge > Shop-Audit > Zeitplan**.

## Fehlerbehebung

**Audit dauert zu lange** - in Shops mit vielen Produkten (10.000+) kann das Greenwashing-Audit laenger dauern. Verwenden Sie WP-CLI mit der Option `--module`, um das Audit fuer ausgewaehlte Abschnitte zu starten.

**Audit erkennt externen Dienst nicht** - die Liste erkannter Dienste ist begrenzt. Melden Sie fehlende Dienste auf GitHub.

**Falscher Dark-Pattern-Alarm** - einige Themes koennen Fehlalarme erzeugen. Melden Sie den Fehlalarm; in der Zwischenzeit koennen Sie die spezifische Pruefung deaktivieren.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
