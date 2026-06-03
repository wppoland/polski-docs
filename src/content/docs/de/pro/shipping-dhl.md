---
title: DHL Parcel Poland Integration
description: Modul zur Integration von DHL Parcel Poland in Polski PRO for WooCommerce - Erzeugung von Etiketten, Sendungsverfolgung und ServicePoint-Suche.
---

Das DHL-Modul integriert WooCommerce mit der REST API von DHL Parcel Poland. Erzeugen Sie Etiketten, verfolgen Sie Sendungen und bieten Sie ServicePoint-Punkte an der Kasse an.

:::note[Voraussetzungen]
Polski PRO erfordert: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Zusätzlich sind ein DHL-API-Schlüssel und eine DHL-Kontonummer erforderlich.
:::

## Konfiguration

Gehen Sie zu **WooCommerce > Einstellungen > Polski PRO > Versand**.

### API-Authentifizierung

| Einstellung | Beschreibung |
|------------|------|
| DHL-API-Schlüssel | Bearer-Token aus dem DHL Developer Portal |
| DHL-Kontonummer | Kundenkontonummer bei DHL Parcel Poland |

Den API-Schlüssel erhalten Sie durch Registrierung auf [developer.dhl.com](https://developer.dhl.com) und das Erstellen einer Anwendung mit Zugriff auf die DHL Parcel Poland API.

### Modul aktivieren

1. Gehen Sie zu **Polski PRO > Module**
2. Aktivieren Sie das Modul **DHL Parcel Poland**
3. Tragen Sie den API-Schlüssel und die Kontonummer in den Versandeinstellungen ein

## Erzeugung von Etiketten

Etiketten erzeugen Sie im Bestelleditor:

1. Öffnen Sie die Bestellung in **WooCommerce > Bestellungen**
2. Wählen Sie im Bereich **Shipment Tracking** den Versanddienstleister **DHL**
3. Klicken Sie auf **Etikett erzeugen**
4. Das System erstellt die Sendung über die DHL REST API und gibt die Sendungsnummer + Link zum PDF-Etikett zurück

### Dienstarten

| Typ | Beschreibung |
|-----|------|
| AH | Standardlieferung an die Adresse (Standard) |
| AP | Lieferung an einen ServicePoint / DHL-Paketautomaten |

Für AP-Dienste (ServicePoint) ist die Angabe der ID des Abholpunkts erforderlich.

### Sendungsdaten

Das Modul ruft automatisch die Empfängerdaten und das Gewicht der Produkte aus der Bestellung ab. Standardmaße des Pakets: 40x30x20 cm.

## DHL ServicePoint

Das Modul ermöglicht die Suche nach ServicePoint-Punkten (POP und DHL-Paketautomaten):

- Suche nach Stadt
- Suche nach GPS-Koordinaten (Radius 5 km)
- Zurückgegebene Daten: Name, Adresse, Typ (POP/Paketautomat), Koordinaten

## Sendungsverfolgung

Nach der Erzeugung des Etiketts wird die Sendungsnummer automatisch gespeichert. Der Link zur DHL-Sendungsverfolgung wird im folgenden Format erzeugt:

```
https://www.dhl.com/pl-pl/home/sledzenie-przesylek.html?tracking-id={numer}
```

Der Kunde erhält bei Statuswechsel auf **Versendet** eine E-Mail mit der Sendungsnummer.

## Fehlercodes

| Code | Beschreibung | Lösung |
|-----|------|-------------|
| HTTP 401 | Ungültiger API-Schlüssel | Bearer-Token in den Einstellungen prüfen |
| HTTP 400 | Ungültige Sendungsdaten | Adresse, Postleitzahl und Kontonummer prüfen |
| HTTP 429 | API-Anfragelimit | Einen Moment warten und erneut versuchen |

## Filter und Aktionen

```php
// Filtruj dane przesyłki przed wysłaniem do DHL
add_filter('polski_pro/shipping/dhl/parcel_data', function (array $data, WC_Order $order): array {
    $data['service_type'] = 'AP'; // Wymuś dostawę do ServicePoint
    $data['servicepoint_id'] = 'PL-12345';
    return $data;
}, 10, 2);
```
