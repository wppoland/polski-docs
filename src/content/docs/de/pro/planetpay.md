---
title: PlanetPay-Integration
description: Zahlungs-Gateway PlanetPay in Polski PRO - BLIK, Karten, Überweisungen, Google Pay, Apple Pay.
---

Das PlanetPay-Modul integriert WooCommerce mit dem Zahlungs-Gateway PlanetPay. Es unterstützt BLIK, Zahlungskarten, Banküberweisungen, Google Pay und Apple Pay.

:::note[Voraussetzungen]
Polski PRO erfordert: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Ein Konto bei PlanetPay.
:::

## Konfiguration

Gehen Sie zu **WooCommerce > Einstellungen > Zahlungen > PlanetPay**.

### Zugangsdaten

| Einstellung | Beschreibung |
|------------|------|
| Merchant ID | Händlerkennung |
| Merchant Secret | Geheimer Schlüssel des Händlers |
| Signaturschlüssel | SHA256-HMAC-Schlüssel zur Verifizierung von Webhooks |
| Sandbox-Modus | Testen ohne reale Transaktionen |

### Zahlungsmethoden

| Methode | Beschreibung |
|--------|------|
| BLIK | Zahlung per 6-stelligem Code, sofort |
| Karten | Visa, Mastercard, weitere |
| Banküberweisungen | Przelewy24 und klassische Überweisungen |
| Google Pay | Zahlung per Google Pay |
| Apple Pay | Zahlung per Apple Pay |

## Zahlungsablauf

### BLIK
1. Der Kunde wählt BLIK und gibt den 6-stelligen Code ein
2. Die Zahlung wird sofort über die API verarbeitet
3. Die Bestellung wird als bezahlt markiert

### Andere Methoden
1. Der Kunde wählt eine Zahlungsmethode
2. Weiterleitung zur PlanetPay-Paywall
3. Ein Webhook aktualisiert den Bestellstatus

## Rückerstattungen

Rückerstattungen können aus dem WooCommerce-Bestellpanel ausgelöst werden. Die PlanetPay-API verarbeitet die Rückerstattung und sendet eine Webhook-Benachrichtigung.

## Webhooks

| Endpoint | Beschreibung |
|----------|------|
| `/wp-json/polski-pro/v1/planetpay/payment` | Benachrichtigungen über den Zahlungsstatus |
| `/wp-json/polski-pro/v1/planetpay/refund` | Benachrichtigungen über den Rückerstattungsstatus |

Webhooks werden über eine SHA256-HMAC-Signatur im Header `X-Planetpay-Signature` verifiziert.
