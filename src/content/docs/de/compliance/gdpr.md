---
title: DSGVO - Datenschutz
description: Konfiguration der DSGVO-Einwilligungen in Polski for WooCommerce - 7 Checkboxen, Einwilligungsprotokollierung, Shortcode-API und Konformitaet mit der Datenschutz-Grundverordnung.
---

Die DSGVO (GDPR) verlangt von Shops eine ausdrueckliche Einwilligung zur Datenverarbeitung. Das Plugin fuegt 7 konfigurierbare Checkboxen auf der Bestellseite, Einwilligungsprotokollierung und Verwaltungswerkzeuge hinzu.

## Erforderliche Einwilligungen im polnischen E-Commerce

Gemaess der DSGVO, dem Verbraucherrechtegesetz und dem Gesetz ueber die Erbringung elektronischer Dienstleistungen sollte ein Onlineshop Einwilligungen einholen fuer:

1. Akzeptanz der AGB
2. Kenntnisnahme der Datenschutzerklaerung
3. Widerrufsrecht (Bestaetigung der Kenntnisnahme)
4. Einwilligung in die Bereitstellung digitaler Inhalte vor Ablauf der Widerrufsfrist
5. Lieferbenachrichtigungen (SMS/E-Mail)
6. Bewertungserinnerungen
7. Marketing (Newsletter, Werbeangebote)

## Checkbox-Konfiguration

Gehen Sie zu **WooCommerce > Einstellungen > Polski > DSGVO**, um die einzelnen Einwilligungen zu konfigurieren.

### 1. AGB

Pflicht-Checkbox mit Link zur AGB-Seite.

| Einstellung | Beschreibung |
|------------|------|
| Text | Konfigurierbar, Standard: "Ich habe die [AGB] gelesen und akzeptiere deren Bedingungen" |
| Erforderlich | Ja (immer) |
| AGB-Seite | Aus WordPress-Seiten auswaehlen |

### 2. Datenschutzerklaerung

Pflicht-Checkbox mit Link zur Datenschutzerklaerung.

| Einstellung | Beschreibung |
|------------|------|
| Text | Standard: "Ich habe die [Datenschutzerklaerung] zur Kenntnis genommen" |
| Erforderlich | Ja (immer) |
| Datenschutzseite | Aus WordPress-Seiten auswaehlen |

### 3. Widerrufsrecht

Information ueber die Kenntnisnahme der Widerrufsbedingungen.

| Einstellung | Beschreibung |
|------------|------|
| Text | Standard: "Ich habe die Bedingungen zum [Widerrufsrecht] zur Kenntnis genommen" |
| Erforderlich | Ja |
| Widerrufsseite | Aus WordPress-Seiten auswaehlen |

### 4. Digitale Inhalte

Einwilligung erforderlich beim Verkauf digitaler Inhalte (z.B. E-Books, Downloads).

| Einstellung | Beschreibung |
|------------|------|
| Text | Standard: "Ich stimme der Bereitstellung digitaler Inhalte vor Ablauf der Widerrufsfrist zu und nehme den Verlust des Widerrufsrechts zur Kenntnis" |
| Erforderlich | Ja (wenn der Warenkorb digitale Produkte enthaelt) |
| Bedingung | Nur anzeigen, wenn der Warenkorb virtuelle oder herunterladbare Produkte enthaelt |

### 5. Lieferbenachrichtigungen

Einwilligung zum Versand von SMS-/E-Mail-Benachrichtigungen ueber den Lieferstatus.

| Einstellung | Beschreibung |
|------------|------|
| Text | Standard: "Ich stimme dem Erhalt von Benachrichtigungen ueber den Lieferstatus zu" |
| Erforderlich | Nein |
| Kanal | E-Mail, SMS oder beide |

### 6. Bewertungserinnerung

Einwilligung zum Versand einer E-Mail mit Bitte um Bewertung nach dem Kauf.

| Einstellung | Beschreibung |
|------------|------|
| Text | Standard: "Ich stimme dem Erhalt einer E-Mail mit der Bitte um eine Produktbewertung zu" |
| Erforderlich | Nein |
| Verzoegerung | Tage nach Lieferung (Standard 7) |

### 7. Marketing

Einwilligung zur Marketing-Kommunikation.

| Einstellung | Beschreibung |
|------------|------|
| Text | Standard: "Ich stimme dem Erhalt kommerzieller Informationen auf elektronischem Wege zu" |
| Erforderlich | Nein |
| Umfang | Newsletter, Angebote, Aktionen |

## Einwilligungsprotokollierung

Jede erteilte Einwilligung wird in der Datenbank mit folgenden Informationen gespeichert:

| Feld | Beschreibung |
|------|------|
| Benutzer-ID | WordPress-Kunden-ID (oder 0 fuer Gaeste) |
| Bestell-ID | WooCommerce-Bestellnummer |
| Einwilligungstyp | Checkbox-Kennung (z.B. `terms`, `privacy`, `marketing`) |
| Wert | `granted` oder `denied` |
| IP-Adresse | Anonymisierte IP-Adresse des Kunden |
| User Agent | Browser und Betriebssystem |
| Zeitstempel | Datum und Uhrzeit der Einwilligung (UTC) |
| Dokumentversion | Hash der AGB-/Datenschutzversion zum Zeitpunkt der Einwilligung |

### Einwilligungsprotokolle einsehen

Die Einwilligungsprotokolle sind verfuegbar unter:

- **WooCommerce-Bestellung** - Tab "DSGVO-Einwilligungen" im Seitenpanel der Bestellung
- **Benutzerprofil** - Abschnitt "Einwilligungshistorie" im Kundenprofil im Administrationspanel
- **Export** - Moeglichkeit zum CSV-Export der Protokolle (**WooCommerce > Einstellungen > Polski > DSGVO > Protokolle exportieren**)

### IP-Anonymisierung

Standardmaessig anonymisiert das Plugin das letzte Oktett der IPv4-Adresse (z.B. `192.168.1.xxx`) und die letzte Gruppe bei IPv6. Dies wahrt die DSGVO-Konformitaet bei gleichzeitiger Aufrechterhaltung einer minimalen Protokoll-Nuetzlichkeit.

## Shortcode-API

### Einwilligungsstatus des Kunden anzeigen

```
[polski_consent_status]
```

Zeigt dem angemeldeten Kunden eine Liste der erteilten Einwilligungen mit der Moeglichkeit, diese zu widerrufen (wo rechtlich zulaessig - z.B. Marketing-Einwilligung).

### Formular zum Widerruf der Marketing-Einwilligung

```
[polski_consent_withdraw type="marketing"]
```

Zeigt ein Formular, das dem Kunden den Widerruf der Marketing-Einwilligung ermoeglicht. Nach dem Widerruf aktualisiert das System automatisch den Einwilligungsstatus in der Datenbank.

### Shortcode-Parameter

| Parameter | Beschreibung | Verfuegbare Werte |
|----------|------|-------------------|
| `type` | Einwilligungstyp | `terms`, `privacy`, `withdrawal_right`, `digital_content`, `delivery_notifications`, `review_reminder`, `marketing` |

## Integration mit WooCommerce Blocks

Einwilligungs-Checkboxen werden automatisch zum Block-Checkout-Formular (WooCommerce Blocks Checkout) hinzugefuegt. Es ist keine zusaetzliche Konfiguration erforderlich.

## Recht auf Vergessenwerden

Das Plugin integriert sich mit dem WordPress-Werkzeug zur Loeschung personenbezogener Daten (**Werkzeuge > Personenbezogene Daten loeschen**). Nach Genehmigung des Loeschantrags:

1. Anonymisiert das System die Daten in den Einwilligungsprotokollen
2. Loescht personenbezogene Daten aus Widerrufsformularen
3. Bewahrt anonymisierte Eintraege fuer Rechenschaftszwecke auf

## Recht auf Datenuebertragbarkeit

Das Plugin integriert sich mit dem WordPress-Datenexport-Werkzeug (**Werkzeuge > Personenbezogene Daten exportieren**). Der Export enthaelt:

- Einwilligungshistorie
- Formulardaten (anonymisiert)
- Kommunikationspraeferenzen

## Fehlerbehebung

**Checkboxen werden auf der Bestellseite nicht angezeigt**
Pruefen Sie, ob das DSGVO-Modul unter **WooCommerce > Einstellungen > Polski > Module** aktiviert ist. Bei Verwendung des Block-Checkout stellen Sie sicher, dass WooCommerce auf Version 8.0+ aktualisiert ist.

**Kunde meldet, keine Bestellung aufgeben zu koennen**
Pruefen Sie, ob Pflicht-Checkboxen nicht durch ein anderes Plugin dupliziert werden (z.B. Germanized, WPML). Deaktivieren Sie andere Einwilligungs-Plugins und verwenden Sie ausschliesslich das Modul Polski for WooCommerce.

**Einwilligungsprotokolle speichern keine IP-Adresse**
Pruefen Sie, ob der Server die IP-Adresse korrekt weiterleitet. Hinter einem Reverse Proxy (z.B. Cloudflare) kann es erforderlich sein, den Header `X-Forwarded-For` in WordPress zu konfigurieren.

## Weitere Schritte

- Probleme melden: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskussionen und Fragen: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
