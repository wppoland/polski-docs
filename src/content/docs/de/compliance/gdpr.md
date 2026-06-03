---
title: DSGVO - Schutz personenbezogener Daten
description: Konfiguration der DSGVO-Einwilligungen in Polski for WooCommerce - 7 Checkboxen, Einwilligungsprotokoll, Shortcode-API und Konformität mit der Datenschutz-Grundverordnung.
---

Die DSGVO (GDPR) verlangt von Shops die ausdrückliche Einwilligung in die Verarbeitung personenbezogener Daten. Das Plugin fügt 7 konfigurierbare Checkboxen auf der Bestellseite hinzu, protokolliert Einwilligungen und stellt Werkzeuge zur Einwilligungsverwaltung bereit.

## Erforderliche Einwilligungen im polnischen E-Commerce

Ein Online-Shop sollte Einwilligungen einholen für:

1. Akzeptanz der Shop-AGB
2. Kenntnisnahme der Datenschutzerklärung
3. Widerrufsrecht (Bestätigung der Kenntnisnahme)
4. Einwilligung in die Bereitstellung digitaler Inhalte vor Ablauf der Widerrufsfrist
5. Lieferbenachrichtigungen (SMS/E-Mail)
6. Erinnerungen an eine Bewertung
7. Marketing (Newsletter, Werbeangebote)

## Konfiguration der Checkboxen

Gehen Sie zu **WooCommerce > Einstellungen > Polski > DSGVO** und konfigurieren Sie die Einwilligungen.

### 1. Shop-AGB

Pflicht-Checkbox mit Link zur AGB-Seite.

| Einstellung | Beschreibung |
|------------|------|
| Text | Konfigurierbar, Standard: "Ich habe die [AGB] gelesen und akzeptiere die Bedingungen" |
| Erforderlich | Ja (immer) |
| AGB-Seite | Aus WordPress-Seiten auswählen |

### 2. Datenschutzerklärung

Pflicht-Checkbox mit Link zur Datenschutzerklärung.

| Einstellung | Beschreibung |
|------------|------|
| Text | Standard: "Ich habe die [Datenschutzerklärung] gelesen" |
| Erforderlich | Ja (immer) |
| Erklärungsseite | Aus WordPress-Seiten auswählen |

### 3. Widerrufsrecht

Information über die Kenntnisnahme der Widerrufsbedingungen.

| Einstellung | Beschreibung |
|------------|------|
| Text | Standard: "Ich habe die Bedingungen zum [Widerruf des Vertrags] gelesen" |
| Erforderlich | Ja |
| Widerrufsseite | Aus WordPress-Seiten auswählen |

### 4. Digitale Inhalte

Einwilligung erforderlich beim Verkauf digitaler Inhalte (z. B. E-Books, Downloads).

| Einstellung | Beschreibung |
|------------|------|
| Text | Standard: "Ich willige in die Bereitstellung digitaler Inhalte vor Ablauf der Widerrufsfrist ein und nehme den Verlust des Widerrufsrechts zur Kenntnis" |
| Erforderlich | Ja (wenn der Warenkorb digitale Produkte enthält) |
| Bedingung | Nur anzeigen, wenn der Warenkorb virtuelle oder herunterladbare Produkte enthält |

### 5. Lieferbenachrichtigungen

Einwilligung in den Versand von SMS/E-Mail-Benachrichtigungen über den Sendungsstatus.

| Einstellung | Beschreibung |
|------------|------|
| Text | Standard: "Ich willige in den Erhalt von Benachrichtigungen über den Lieferstatus ein" |
| Erforderlich | Nein |
| Kanal | E-Mail, SMS oder beides |

### 6. Bewertungserinnerung

Einwilligung in den Versand einer E-Mail mit der Bitte um eine Bewertung nach dem Kauf.

| Einstellung | Beschreibung |
|------------|------|
| Text | Standard: "Ich willige in den Erhalt einer E-Mail mit der Bitte um eine Bewertung des gekauften Produkts ein" |
| Erforderlich | Nein |
| Verzögerung | Anzahl der Tage nach der Lieferung (Standard 7) |

### 7. Marketing

Einwilligung in die Marketingkommunikation.

| Einstellung | Beschreibung |
|------------|------|
| Text | Standard: "Ich willige in den Erhalt von Werbeinformationen auf elektronischem Weg ein" |
| Erforderlich | Nein |
| Umfang | Newsletter, Angebote, Aktionen |

## Einwilligungsprotokoll

Jede Einwilligung wird mit folgenden Daten in der Datenbank gespeichert:

| Feld | Beschreibung |
|------|------|
| Benutzer-ID | WordPress-Kunden-ID (oder 0 für Gäste) |
| Bestell-ID | WooCommerce-Bestellnummer |
| Einwilligungstyp | Kennung der Checkbox (z. B. `terms`, `privacy`, `marketing`) |
| Wert | `granted` oder `denied` |
| IP-Adresse | Anonymisierte IP-Adresse des Kunden |
| User Agent | Browser und Betriebssystem |
| Zeitstempel | Datum und Uhrzeit der Einwilligung (UTC) |
| Dokumentversion | Hash der AGB-/Erklärungsversion zum Zeitpunkt der Einwilligung |

### Einwilligungsprotokolle einsehen

Die Einwilligungsprotokolle sind verfügbar in:

- **WooCommerce-Bestellung** - Reiter "DSGVO-Einwilligungen" im Seitenpanel der Bestellung
- **Benutzerprofil** - Abschnitt "Einwilligungshistorie" im Kundenprofil im Verwaltungsbereich
- **Export** - Möglichkeit zum Export der Protokolle als CSV (**WooCommerce > Einstellungen > Polski > DSGVO > Protokolle exportieren**)

### IP-Anonymisierung

Das Plugin anonymisiert das letzte Oktett der IPv4-Adresse (z. B. `192.168.1.xxx`) und die letzte IPv6-Gruppe. Das gewährleistet DSGVO-Konformität und erhält die grundlegende Nutzbarkeit der Protokolle.

## Shortcode-API

### Anzeige des Einwilligungsstatus eines Kunden

```
[polski_consent_status]
```

Zeigt einem eingeloggten Kunden eine Liste der Einwilligungen mit der Möglichkeit, diese zu widerrufen (z. B. die Marketing-Einwilligung).

### Formular zum Widerruf der Marketing-Einwilligung

```
[polski_consent_withdraw type="marketing"]
```

Formular zum Widerruf der Marketing-Einwilligung. Nach dem Widerruf aktualisiert das Plugin den Einwilligungsstatus automatisch in der Datenbank.

### Shortcode-Parameter

| Parameter | Beschreibung | Verfügbare Werte |
|----------|------|-------------------|
| `type` | Einwilligungstyp | `terms`, `privacy`, `withdrawal_right`, `digital_content`, `delivery_notifications`, `review_reminder`, `marketing` |

## Integration mit WooCommerce Blocks

Die Einwilligungs-Checkboxen funktionieren auch mit dem blockbasierten Bestellformular (WooCommerce Blocks Checkout). Es ist keine Konfiguration erforderlich.

## Recht auf Vergessenwerden

Das Plugin arbeitet mit dem WordPress-Werkzeug **Werkzeuge > Personenbezogene Daten löschen** zusammen. Nach Bestätigung einer Löschanfrage führt das Plugin automatisch Folgendes aus:

1. Anonymisiert die Daten in den Einwilligungsprotokollen
2. Entfernt personenbezogene Daten aus den Widerrufsformularen
3. Behält anonymisierte Einträge zu Rechenschaftszwecken bei

## Recht auf Datenübertragbarkeit

Das Plugin arbeitet mit **Werkzeuge > Personenbezogene Daten exportieren** zusammen. Der Export enthält:

- Historie der erteilten Einwilligungen
- Formulardaten (anonymisiert)
- Kommunikationspräferenzen

## Fehlerbehebung

**Die Checkboxen werden auf der Bestellseite nicht angezeigt**
Prüfen Sie, ob das DSGVO-Modul unter **WooCommerce > Einstellungen > Polski > Module** aktiviert ist. Beim blockbasierten Bestellformular benötigen Sie WooCommerce 8.0+.

**Ein Kunde meldet, dass er keine Bestellung aufgeben kann**
Prüfen Sie, ob ein anderes Plugin (z. B. Germanized, WPML) dieselben Checkboxen hinzufügt. Deaktivieren Sie die Einwilligungen anderer Plugins und verwenden Sie nur das Modul von Polski for WooCommerce.

**Die Einwilligungsprotokolle speichern keine IP-Adresse**
Prüfen Sie, ob der Server die IP-Adresse weitergibt. Hinter einem Reverse Proxy (z. B. Cloudflare) konfigurieren Sie den Header `X-Forwarded-For` in WordPress.

## Nächste Schritte

- Probleme melden: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskussionen und Fragen: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
