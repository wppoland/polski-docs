---
title: Vlastní stavy objednávek
description: Vytváření vlastních stavů objednávek s barvami, ikonami a e-mailovými upozorněními.
---

Modul umožňuje vytvářet libovolné stavy objednávek WooCommerce s konfigurovatelným vzhledem a automatickými e-maily.

:::note[Požadavky]
Polski PRO vyžaduje: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Konfigurace

Přejděte do **WooCommerce > Order Statuses**.

## Vytvoření stavu

| Pole | Popis |
|------|------|
| Slug | Identifikátor stavu (max 17 znaků, např. quality_check) |
| Label | Zobrazovaný název (např. "Kontrola kvality") |
| Color | Barva pozadí odznaku stavu (hex) |
| Icon | Třída dashicon (např. dashicons-yes) |
| Email | Zda odeslat e-mail při změně na tento stav |
| Email subject | Předmět e-mailu (podporuje tokeny) |
| Email body | Obsah e-mailu v HTML (podporuje tokeny) |

## Tokeny v e-mailech

| Token | Popis |
|-------|------|
| `{order_id}` | ID objednávky |
| `{order_number}` | Číslo objednávky |
| `{first_name}` | Jméno zákazníka |
| `{last_name}` | Příjmení zákazníka |
| `{status_from}` | Předchozí stav |
| `{status_to}` | Nový stav |
| `{site_title}` | Název obchodu |

## Funkce

- Stavy viditelné v rozbalovací nabídce změny stavu objednávky
- Barevné odznaky v seznamu objednávek
- Hromadné akce (bulk actions) pro každý stav
- Automatické e-maily WooCommerce (zabalené do šablony)
- Neomezený počet stavů
