---
title: Integrácia PlanetPay
description: Platobná brána PlanetPay v Polski PRO - BLIK, karty, prevody, Google Pay, Apple Pay.
---

Modul PlanetPay integruje WooCommerce s platobnou bránou PlanetPay. Obsluhuje BLIK, platobné karty, bankové prevody, Google Pay a Apple Pay.

:::note[Požiadavky]
Polski PRO vyžaduje: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Konto v PlanetPay.
:::

## Konfigurácia

Prejdite na **WooCommerce > Nastavenia > Platby > PlanetPay**.

### Prístupové údaje

| Nastavenie | Popis |
|------------|------|
| Merchant ID | Identifikátor predajcu |
| Merchant Secret | Tajný kľúč predajcu |
| Podpisovací kľúč | Kľúč SHA256 HMAC na overenie webhookov |
| Sandbox režim | Testovanie bez reálnych transakcií |

### Spôsoby platby

| Spôsob | Popis |
|--------|------|
| BLIK | Platba 6-ciferným kódom, instant |
| Karty | Visa, Mastercard, iné |
| Bankové prevody | Przelewy24 a tradičné |
| Google Pay | Platba Google Pay |
| Apple Pay | Platba Apple Pay |

## Priebeh platby

### BLIK
1. Zákazník vyberie BLIK a zadá 6-ciferný kód
2. Platba spracovaná okamžite cez API
3. Objednávka označená ako zaplatená

### Iné spôsoby
1. Zákazník vyberie spôsob platby
2. Presmerovanie na paywall PlanetPay
3. Webhook aktualizuje stav objednávky

## Vrátenia

Vrátenia je možné iniciovať z panela objednávky WooCommerce. API PlanetPay spracuje vrátenie a odošle webhook upozornenie.

## Webhooky

| Endpoint | Popis |
|----------|------|
| `/wp-json/polski-pro/v1/planetpay/payment` | Upozornenia o stave platby |
| `/wp-json/polski-pro/v1/planetpay/refund` | Upozornenia o stave vrátenia |

Webhooky sa overujú podpisom SHA256 HMAC v hlavičke `X-Planetpay-Signature`.
