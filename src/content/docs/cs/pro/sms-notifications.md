---
title: SMS oznameni
description: SMS o stavu objednavky pres SMSAPI.pl a SerwerSMS.pl.
---

Modul posila automaticke SMS zakaznikum pri zmenach stavu objednavky.

:::note[Pozadavky]
Polski PRO vyzaduje: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Ucet u SMSAPI.pl nebo SerwerSMS.pl.
:::

## Podporovani poskytovatele

| Poskytovatel | API |
|----------|-----|
| SMSAPI.pl | REST API s Bearer tokenem |
| SerwerSMS.pl | REST API s Bearer tokenem |

## Konfigurace

Prejdete do **WooCommerce > Nastaveni > Polski PRO > SMS**.

| Nastaveni | Popis |
|------------|------|
| Poskytovatel | SMSAPI.pl nebo SerwerSMS.pl |
| API token | Autorizacni klic |
| Nazev odesilatele | Pole FROM (max 11 znaku) |
| Stavy | Ktere stavy spousti SMS |
| Sablona zpravy | Obsah SMS s tokeny |

## Tokeny ve zprave

| Token | Popis |
|-------|------|
| `{order_id}` | ID objednavky |
| `{order_number}` | Cislo objednavky |
| `{first_name}` | Jmeno zakaznika |
| `{last_name}` | Prijmeni zakaznika |
| `{status}` | Nazev noveho stavu |
| `{tracking_number}` | Sledovaci cislo (pokud je dostupne) |
| `{tracking_url}` | URL sledovani |
| `{total}` | Castka objednavky |
| `{site_name}` | Nazev obchodu |

## Oznameni administratora

Volitelne lze zapnout SMS pro administratora o novych objednavkach se samostatnou sablonou.

## Normalizace cisla

System automaticky normalizuje polska telefonni cisla do mezinarodniho formatu (48XXXXXXXXX).

## GDPR

Telefonni cisla jsou maskovana v poznamkach objednavky (napr. 501***789).
