---
title: Integrace PlanetPay
description: Platební brána PlanetPay v Polski PRO - BLIK, karty, převody, Google Pay, Apple Pay.
---

Modul PlanetPay integruje WooCommerce s platební bránou PlanetPay. Podporuje BLIK, platební karty, bankovní převody, Google Pay a Apple Pay.

:::note[Požadavky]
Polski PRO vyžaduje: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Účet v PlanetPay.
:::

## Konfigurace

Přejděte do **WooCommerce > Nastavení > Platby > PlanetPay**.

### Přístupové údaje

| Nastavení | Popis |
|------------|------|
| Merchant ID | Identifikátor prodejce |
| Merchant Secret | Tajný klíč prodejce |
| Podpisový klíč | Klíč SHA256 HMAC k ověření webhooků |
| Sandbox režim | Testování bez reálných transakcí |

### Platební metody

| Metoda | Popis |
|--------|------|
| BLIK | Platba 6místným kódem, instant |
| Karty | Visa, Mastercard, další |
| Bankovní převody | Przelewy24 a tradiční |
| Google Pay | Platba Google Pay |
| Apple Pay | Platba Apple Pay |

## Průběh platby

### BLIK
1. Zákazník vybere BLIK a zadá 6místný kód
2. Platba zpracována okamžitě přes API
3. Objednávka označena jako zaplacená

### Ostatní metody
1. Zákazník vybere platební metodu
2. Přesměrování na paywall PlanetPay
3. Webhook aktualizuje stav objednávky

## Vrácení

Vrácení lze iniciovat z panelu objednávky WooCommerce. API PlanetPay zpracuje vrácení a odešle oznámení webhook.

## Webhooky

| Endpoint | Popis |
|----------|------|
| `/wp-json/polski-pro/v1/planetpay/payment` | Oznámení o stavu platby |
| `/wp-json/polski-pro/v1/planetpay/refund` | Oznámení o stavu vrácení |

Webhooky se ověřují podpisem SHA256 HMAC v záhlaví `X-Planetpay-Signature`.
