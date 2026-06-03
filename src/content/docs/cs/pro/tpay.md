---
title: Integrace Tpay
description: Platebni brana Tpay (Transferuj.pl) - bankovni prevody, BLIK, platebni karty.
---

Modul Tpay propojuje WooCommerce s jednou z nejoblibenejsich polskych platebnich bran.

:::note[Pozadavky]
Polski PRO vyzaduje: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Ucet u Tpay.
:::

## Podporovane metody

| Metoda | Popis |
|--------|------|
| Bankovni prevody | Vsechny polske online banky |
| BLIK | Platba sestimistnym kodem |
| Platebni karty | Visa, Mastercard |

## Konfigurace

Prejdete do **WooCommerce > Nastaveni > Platby > Tpay**.

| Nastaveni | Popis |
|------------|------|
| Merchant ID | ID prodejce Tpay (4-5 cislic) |
| Security code | Bezpecnostni kod |
| API key | 40znakovy API klic (pro vraceni plateb) |
| API password | Heslo API |
| BLIK | Zapnout platby BLIK |
| Seznam bank | Zobrazit v pokladne nebo presmerovat na Tpay |

## Priplatek za platbu

Lze nakonfigurovat priplatek za pouziti brany:
- Pevna castka (PLN)
- Procento z hodnoty objednavky

## Overeni IPN

Oznameni IPN jsou overovana pomoci:
1. Kontrolni soucet MD5: `md5(merchant_id + transaction_id + amount + crc + security_code)`
2. Whitelist IP adres Tpay (5 adres)

## Vraceni plateb

Vraceni plateb je zpracovavano pres Tpay Transaction API. Vyzaduje API klic a heslo.
