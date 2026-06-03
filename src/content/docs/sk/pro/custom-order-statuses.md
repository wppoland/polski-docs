---
title: Vlastné stavy objednávok
description: Vytváranie vlastných stavov objednávok s farbami, ikonami a e-mailovými notifikáciami.
---

Modul umožňuje vytvárať ľubovoľné stavy objednávok WooCommerce s konfigurovateľným vzhľadom a automatickými e-mailami.

:::note[Požiadavky]
Polski PRO vyžaduje: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Konfigurácia

Prejdite do **WooCommerce > Order Statuses**.

## Vytvorenie stavu

| Pole | Popis |
|------|------|
| Slug | Identifikátor stavu (max. 17 znakov, napr. quality_check) |
| Label | Zobrazovaný názov (napr. "Kontrola kvality") |
| Color | Farba pozadia odznaku stavu (hex) |
| Icon | Trieda dashicon (napr. dashicons-yes) |
| Email | Či sa má odoslať e-mail pri zmene na tento stav |
| Email subject | Predmet e-mailu (podporuje tokeny) |
| Email body | Obsah e-mailu HTML (podporuje tokeny) |

## Tokeny v e-mailoch

| Token | Popis |
|-------|------|
| `{order_id}` | ID objednávky |
| `{order_number}` | Číslo objednávky |
| `{first_name}` | Meno zákazníka |
| `{last_name}` | Priezvisko zákazníka |
| `{status_from}` | Predchádzajúci stav |
| `{status_to}` | Nový stav |
| `{site_title}` | Názov obchodu |

## Funkcie

- Stavy viditeľné v rozbaľovacom zozname zmeny stavu objednávky
- Farebné odznaky v zozname objednávok
- Hromadné akcie (bulk actions) pre každý stav
- Automatické e-maily WooCommerce (zabalené do šablóny)
- Neobmedzený počet stavov
