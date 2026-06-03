---
title: Integrácia Tpay
description: Platobná brána Tpay (Transferuj.pl) - bankové prevody, BLIK, platobné karty.
---

Modul Tpay integruje WooCommerce s jednou z najpopulárnejších poľských platobných brán.

:::note[Požiadavky]
Polski PRO vyžaduje: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Účet v Tpay.
:::

## Podporované metódy

| Metóda | Popis |
|--------|------|
| Bankové prevody | Všetky poľské online banky |
| BLIK | Platba 6-cifrovým kódom |
| Platobné karty | Visa, Mastercard |

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Platby > Tpay**.

| Nastavenie | Popis |
|------------|------|
| Merchant ID | ID predajcu Tpay (4-5 cifier) |
| Security code | Bezpečnostný kód |
| API key | 40-znakový kľúč API (na vratky) |
| API password | Heslo API |
| BLIK | Zapni platby BLIK |
| Zoznam bánk | Zobraz v pokladni alebo presmeruj na Tpay |

## Príplatok za platbu

Je možné nakonfigurovať príplatok za použitie brány:
- Pevná suma (PLN)
- Percento z hodnoty objednávky

## Overenie IPN

IPN notifikácie sa overujú cez:
1. Kontrolný súčet MD5: `md5(merchant_id + transaction_id + amount + crc + security_code)`
2. Whitelist IP adries Tpay (5 adries)

## Vratky

Vratky spracúva Tpay Transaction API. Vyžaduje kľúč API a heslo.
