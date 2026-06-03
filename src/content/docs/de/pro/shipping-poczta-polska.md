---
title: Poczta Polska Integration (eNadawca)
description: Poczta Polska eNadawca Integrationsmodul in Polski PRO for WooCommerce - Erstellung von Etiketten, Sendungsverfolgung und Paketautomaten.
---

Das Poczta Polska Modul integriert WooCommerce mit der eNadawca API. Erstelle Versandetiketten, verfolge Sendungen und suche nach Paketautomaten.

:::note[Voraussetzungen]
Polski PRO erfordert: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+ mit SOAP-Erweiterung. Zusaetzlich werden ein Login und ein Passwort fuer eNadawca benoetigt.
:::

## Konfiguration

Gehe zu **WooCommerce > Einstellungen > Polski PRO > Versand**.

### Authentifizierung

| Einstellung | Beschreibung |
|------------|------|
| eNadawca Login | Login fuer das eNadawca System |
| eNadawca Passwort | Passwort fuer das eNadawca System |
| Umgebung | Production oder Sandbox (Test) |

Die Zugangsdaten erhaeltst du bei der Registrierung im eNadawca System auf der Seite poczta-polska.pl.

## Verfuegbare Dienste

| Dienstart | Beschreibung |
|------------|------|
| POCZTEX_KURIER_48 | Pocztex Kurier - Lieferung in 48h (Standard) |
| PACZKA_POCZTOWA_GABARYT_A | Postpaket Format A |

## Erstellung von Etiketten

1. Oeffne eine Bestellung unter **WooCommerce > Bestellungen**
2. Waehle im Bereich **Shipment Tracking** den Versanddienstleister **Poczta Polska**
3. Klicke auf **Etikett erstellen**
4. Das System erstellt die Sendung ueber die eNadawca SOAP API

Die Empfaengerdaten (Name, Adresse, Stadt, Postleitzahl, Telefon, E-Mail) werden automatisch aus der Bestellung uebernommen.

## Sendungsverfolgung

Nach der Erstellung des Etiketts wird die Sendungsnummer in der Bestellung gespeichert. Tracking-Link:

```
https://emonitoring.poczta-polska.pl/?numer={numer}
```

## Paketautomaten

Das Modul ermoeglicht die Suche nach Paketautomaten und Filialen von Poczta Polska nach Stadt.

## Technische Voraussetzungen

Das Modul erfordert die PHP SOAP-Erweiterung (`ext-soap`). Pruefe, ob sie aktiv ist:

```php
phpinfo(); // Suche den Abschnitt "soap"
```

Die meisten PHP-Hostings haben SOAP standardmaessig aktiviert.
