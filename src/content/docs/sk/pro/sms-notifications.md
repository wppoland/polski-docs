---
title: SMS notifikácie
description: SMS správy o stave objednávky cez SMSAPI.pl a SerwerSMS.pl.
---

Modul odosiela automatické SMS správy zákazníkom pri zmenách stavu objednávky.

:::note[Požiadavky]
Polski PRO vyžaduje: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Účet v SMSAPI.pl alebo SerwerSMS.pl.
:::

## Podporovaní poskytovatelia

| Poskytovateľ | API |
|----------|-----|
| SMSAPI.pl | REST API s tokenom Bearer |
| SerwerSMS.pl | REST API s tokenom Bearer |

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski PRO > SMS**.

| Nastavenie | Popis |
|------------|------|
| Poskytovateľ | SMSAPI.pl alebo SerwerSMS.pl |
| API token | Autorizačný kľúč |
| Názov odosielateľa | Pole FROM (max 11 znakov) |
| Stavy | Ktoré stavy spúšťajú SMS |
| Šablóna správy | Obsah SMS s tokenmi |

## Tokeny v správe

| Token | Popis |
|-------|------|
| `{order_id}` | ID objednávky |
| `{order_number}` | Číslo objednávky |
| `{first_name}` | Meno zákazníka |
| `{last_name}` | Priezvisko zákazníka |
| `{status}` | Názov nového stavu |
| `{tracking_number}` | Číslo sledovania (ak je dostupné) |
| `{tracking_url}` | URL trackingu |
| `{total}` | Suma objednávky |
| `{site_name}` | Názov obchodu |

## Notifikácie administrátora

Voliteľne je možné zapnúť SMS správy administrátorovi o nových objednávkach so samostatnou šablónou.

## Normalizácia čísla

Systém automaticky normalizuje poľské telefónne čísla do medzinárodného formátu (48XXXXXXXXX).

## GDPR

Telefónne čísla sú maskované v poznámkach objednávky (napr. 501***789).
