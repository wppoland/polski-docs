---
title: Pozorovateľ OSS
description: Monitorovanie únijného prahu predaja VAT OSS (10 000 EUR) vo WooCommerce vďaka integrácii s pluginom One Stop Shop.
---

Modul "Pozorovateľ OSS" integruje obchod so samostatným pluginom **One Stop Shop for WooCommerce** a pomáha pri monitorovaní prahu predaja VAT OSS (procedúra One Stop Shop). Keď sa ročný predaj B2C do iných krajín EÚ blíži k 10 000 EUR, obchod by mal vstúpiť do procedúry OSS a od toho momentu účtovať VAT podľa sadzby krajiny kupujúceho.

## Pre koho

Ak prevádzkujete internetový obchod v Poľsku a posielate tovar alebo poskytujete elektronické služby spotrebiteľom (B2C) v iných krajinách EÚ - týka sa vás prah 10 000 EUR. Modul sa hodí každému obchodu posielajúcemu produkty do zahraničia v rámci Európskej únie.

## Ako to funguje

1. Zapnite modul **Pozorovateľ OSS** v paneli `Polski > Moduly` (sekcia "Tax & Pricing").
2. Kliknite na ikonu ceruzky, aby ste otvorili nastavenia modulu.
3. Ak plugin "One Stop Shop for WooCommerce" nie je nainštalovaný, použite tlačidlo **Nainštalovať One Stop Shop**. Plugin sa stiahne z repozitára WordPress.org, nainštaluje a aktivuje automaticky.
4. Po inštalácii prejdite do **WooCommerce > Nastavenia > Daň > OSS**, aby ste nakonfigurovali pozorovateľa prahu, procedúru OSS a daňové reporty.

Pokiaľ plugin OSS nie je nainštalovaný, modul zobrazuje inštalačné CTA. Po aktivácii sa zobrazuje stav procedúry OSS a automatického monitorovania prahu.

## Upozornenie v paneli

Ak je modul zapnutý, ale externý plugin OSS nie je prítomný, obchod zobrazuje upozornenie WooCommerce "OSS plugin is missing" s tlačidlom inštalácie na jeden klik. Vďaka tomu nezabudnete dokončiť konfiguráciu.

## Integrácia s polski-pro

Plugin polski-pro poskytuje pomocníka `Polski\Pro\TaxRules\OssHelper::isEnabled()`, ktorý vracia aktuálny stav procedúry OSS. Programátori ho môžu využiť na rozvetvenie logiky faktúr, daňových pravidiel alebo kalkulácie dopravy v závislosti od toho, či obchod používa procedúru OSS.

Stav je tiež filtrovateľný v polski cez filter `polski_tax_oss_enabled`, čo umožňuje externým pluginom pozorovať alebo prepísať signál.

## Prečo samostatný plugin?

Logika reportovania OSS a pozorovania prahu je udržiavaná v samostatnom plugine "One Stop Shop for WooCommerce" (bezplatný, dostupný v repozitári WordPress.org). Polski for WooCommerce funguje ako tenký adaptér - pridáva viditeľný prepínač v paneli modulov, uľahčuje inštaláciu a umožňuje iným modulom obchodu (faktúram, daňovým pravidlám) reagovať na zapnutie procedúry OSS. Vďaka tomu neduplikujeme funkciu udržiavanú iným tímom a vždy máte najnovšie zmeny v obsluhe procedúry OSS.
