---
title: Tpay Integration
description: Tpay (Transferuj.pl) Zahlungsgateway - Bankueberweisungen, BLIK, Zahlungskarten.
---

Das Tpay Modul integriert WooCommerce mit einem der beliebtesten polnischen Zahlungsgateways.

:::note[Voraussetzungen]
Polski PRO erfordert: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Ein Konto bei Tpay.
:::

## Unterstuetzte Methoden

| Methode | Beschreibung |
|--------|------|
| Bankueberweisungen | Alle polnischen Online-Banken |
| BLIK | Zahlung per 6-stelligem Code |
| Zahlungskarten | Visa, Mastercard |

## Konfiguration

Gehe zu **WooCommerce > Einstellungen > Zahlungen > Tpay**.

| Einstellung | Beschreibung |
|------------|------|
| Merchant ID | Tpay Haendler-ID (4-5 Ziffern) |
| Security code | Sicherheitscode |
| API key | 40-stelliger API-Schluessel (fuer Rueckerstattungen) |
| API password | API-Passwort |
| BLIK | BLIK-Zahlungen aktivieren |
| Bankenliste | An der Kasse anzeigen oder zu Tpay weiterleiten |

## Aufschlag fuer die Zahlung

Es kann ein Aufschlag fuer die Nutzung des Gateways konfiguriert werden:
- Fester Betrag (PLN)
- Prozentsatz des Bestellwerts

## IPN-Verifizierung

IPN-Benachrichtigungen werden verifiziert durch:
1. MD5-Pruefsumme: `md5(merchant_id + transaction_id + amount + crc + security_code)`
2. IP-Whitelist von Tpay (5 Adressen)

## Rueckerstattungen

Rueckerstattungen werden ueber die Tpay Transaction API verarbeitet. Erfordert API-Schluessel und Passwort.
