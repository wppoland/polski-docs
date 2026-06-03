---
title: DPD Polska Integration
description: DPD Polska Integrationsmodul in Polski PRO for WooCommerce - Erstellung von Etiketten, Sendungsverfolgung und DPD Pickup Abholpunkte.
---

Das DPD Modul integriert WooCommerce mit der API von DPD Polska. Erstelle Versandetiketten, verfolge Sendungen und lass Kunden einen DPD Pickup Abholpunkt auswaehlen.

:::note[Voraussetzungen]
Polski PRO erfordert: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Zusaetzlich werden ein aktiver Login und ein Passwort fuer die DPD Web Service API benoetigt.
:::

## Konfiguration

Gehe zu **WooCommerce > Einstellungen > Polski PRO > Versand**.

### API Authentifizierung

| Einstellung | Beschreibung |
|------------|------|
| DPD Login | Login fuer die DPD Web Service API |
| DPD Passwort | Passwort fuer die DPD Web Service API |
| Master FID | FID Nummer des Absenders (DPD Kundenkennung) |

Die Zugangsdaten erhaeltst du im DPD Kundenpanel oder von deinem Vertriebsbetreuer.

### Modul aktivieren

1. Gehe zu **Polski PRO > Module**
2. Aktiviere das Modul **DPD Polska**
3. Trage die API Daten in den Versandeinstellungen ein

## Erstellung von Etiketten

Etiketten erstellst du direkt im Bestellungseditor:

1. Oeffne eine Bestellung unter **WooCommerce > Bestellungen**
2. Waehle im Bereich **Shipment Tracking** den Versanddienstleister **DPD**
3. Klicke auf **Etikett erstellen**
4. Das System erstellt die Sendung ueber die DPD SOAP API und gibt die Frachtbriefnummer zurueck

Das Etikett wird automatisch der Bestellung zugeordnet. Die Sendungsnummer und der Tracking-Link werden im Bestellpanel und in der E-Mail an den Kunden angezeigt.

### Sendungsdaten

Das Modul uebernimmt automatisch aus der Bestellung:

- Vor- und Nachname / Firmenname des Empfaengers
- Lieferadresse (Strasse, Stadt, Postleitzahl)
- Telefon und E-Mail
- Gewicht (aus den Produktdaten oder Standardwert)

### Massenerstellung

Markiere mehrere Bestellungen in der Liste und nutze die Massenaktion **DPD Etiketten erstellen**, um mehrere Bestellungen gleichzeitig zu verarbeiten.

## DPD Pickup Abholpunkte

Das Modul ermoeglicht die Suche nach DPD Pickup Abholpunkten in der Naehe des Kunden:

- Suche nach Stadt
- Suche nach GPS-Koordinaten (Umkreis 5 km)
- Zurueckgegebene Daten: Name, Adresse, Postleitzahl, Koordinaten

## Sendungsverfolgung

Nach der Erstellung des Etiketts wird die Sendungsnummer automatisch in der Bestellung gespeichert. Der DPD Tracking-Link wird automatisch generiert.

Der Kunde erhaelt eine E-Mail mit der Sendungsnummer und dem Link, sobald der Bestellstatus auf **Versendet** geaendert wird.

## Fehlercodes

| Code | Beschreibung | Loesung |
|-----|------|-------------|
| HTTP 401 | Falsche Anmeldedaten | Pruefe Login und Passwort in den Einstellungen |
| HTTP 500 | DPD Serverfehler | Versuche es in einigen Minuten erneut |
| Validation error | Ungueltige Adressdaten | Pruefe das Format der Postleitzahl (XX-XXX) |

## Filter und Aktionen

```php
// Filtert die Sendungsdaten vor dem Senden an DPD
add_filter('polski_pro/shipping/dpd/parcel_data', function (array $data, WC_Order $order): array {
    $data['weight'] = 2.5; // Festes Gewicht setzen
    return $data;
}, 10, 2);
```
