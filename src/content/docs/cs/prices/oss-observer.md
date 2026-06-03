---
title: Pozorovatel OSS
description: Monitorování unijního prahu prodeje VAT OSS (10 000 EUR) ve WooCommerce díky integraci s pluginem One Stop Shop.
---

Modul "Pozorovatel OSS" integruje obchod se samostatným pluginem **One Stop Shop for WooCommerce** a pomáhá s monitorováním prahu prodeje VAT OSS (procedura One Stop Shop). Když se roční B2C prodej do jiných zemí EU blíží k 10 000 EUR, obchod by měl přistoupit k proceduře OSS a od té chvíle účtovat VAT podle sazby země kupujícího.

## Pro koho

Pokud provozujete internetový obchod v Polsku a zasíláte zboží nebo poskytujete elektronické služby spotřebitelům (B2C) v jiných zemích EU - týká se vás práh 10 000 EUR. Modul se hodí každému obchodu zasílajícímu produkty do zahraničí v rámci Evropské unie.

## Jak to funguje

1. Zapněte modul **Pozorovatel OSS** v panelu `Polski > Moduly` (sekce "Tax & Pricing").
2. Klikněte na ikonu tužky, abyste otevřeli nastavení modulu.
3. Pokud plugin "One Stop Shop for WooCommerce" není nainstalován, použijte tlačítko **Nainstalovat One Stop Shop**. Plugin bude stažen z repozitáře WordPress.org, nainstalován a aktivován automaticky.
4. Po instalaci přejděte do **WooCommerce > Nastavení > Daň > OSS**, abyste nakonfigurovali pozorovatele prahu, proceduru OSS a daňové reporty.

Dokud není plugin OSS nainstalován, modul zobrazuje instalační CTA. Po aktivaci se zobrazuje stav procedury OSS a automatického monitorování prahu.

## Oznámení v panelu

Pokud je modul zapnutý, ale externí plugin OSS není přítomen, obchod zobrazuje oznámení WooCommerce "OSS plugin is missing" s tlačítkem instalace na jedno kliknutí. Díky tomu nezapomenete dokončit konfiguraci.

## Integrace s polski-pro

Plugin polski-pro poskytuje pomocníka `Polski\Pro\TaxRules\OssHelper::isEnabled()`, který vrací aktuální stav procedury OSS. Vývojáři ho mohou využít k větvení logiky faktur, daňových pravidel nebo kalkulace dopravy v závislosti na tom, zda obchod využívá proceduru OSS.

Stav je rovněž filtrovatelný v polski přes filtr `polski_tax_oss_enabled`, což umožňuje externím pluginům pozorovat nebo přepsat signál.

## Proč samostatný plugin?

Logika reportování OSS a sledování prahu je udržována v samostatném pluginu "One Stop Shop for WooCommerce" (bezplatný, dostupný v repozitáři WordPress.org). Polski for WooCommerce funguje jako tenký adaptér - přidává viditelný přepínač v panelu modulů, usnadňuje instalaci a umožňuje jiným modulům obchodu (fakturám, daňovým pravidlům) reagovat na zapnutí procedury OSS. Díky tomu neduplikujeme funkci udržovanou jiným týmem a vždy máte nejnovější změny v obsluze procedury OSS.
