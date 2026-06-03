---
title: Zobrazovanie DPH
description: Konfigurácia zobrazovania cien s DPH a bez DPH, sadzby DPH a oslobodenia podľa čl. 113 zákona o DPH vo WooCommerce.
---

Poľské právo vyžaduje, aby obchod jasne informoval, či cena obsahuje DPH. Doplnok Polski for WooCommerce umožňuje zobrazovať informáciu o DPH, od jednoduchého označenia "s DPH/bez DPH" až po sadzbu dane a základ oslobodenia.

## Právne požiadavky

Internetový obchod musí:

- jasne informovať, či cena obsahuje DPH
- uvádzať sadzbu DPH, ak predáva tak individuálnym zákazníkom, ako aj firmám
- v prípade oslobodenia od DPH uviesť právny základ oslobodenia

Ak využívate oslobodenie od DPH (čl. 113), informujte zákazníka, že cena neobsahuje DPH.

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski > Ceny** a nakonfigurujte sekciu "Zobrazovanie DPH".

### Režimy zobrazovania

| Režim | Popis | Príklad |
|------|------|---------|
| S DPH | Cena obsahuje daň | 123,00 zł s DPH |
| Bez DPH | Cena bez dane | 100,00 zł bez DPH |
| Obe | Obe ceny súčasne | 100,00 zł bez DPH (123,00 zł s DPH) |

### Podrobné nastavenia

- **Zobraziť sadzbu DPH** - zobrazuje percentuálnu sadzbu dane vedľa ceny (napr. "v tom 23 % DPH")
- **Zobraziť informáciu o DPH vo výpise** - riadi viditeľnosť na stránkach kategórií a vo výsledkoch vyhľadávania
- **Zobraziť informáciu o DPH v košíku** - riadi viditeľnosť v košíku a v zhrnutí objednávky
- **Vlastný text** - umožňuje prepísať predvolený text informácie o DPH

## Oslobodenie od DPH (čl. 113)

Ak ste oslobodený od DPH na základe čl. 113 ods. 1 alebo ods. 9, nakonfigurujte príslušnú správu.

### Konfigurácia oslobodenia

1. Prejdite do **WooCommerce > Nastavenia > Polski > Ceny**
2. Zaškrtnite možnosť **Oslobodenie od DPH (čl. 113)**
3. Vyberte základ oslobodenia:
   - **Čl. 113 ods. 1** - oslobodenie pre predaj do 200 000 zł ročne
   - **Čl. 113 ods. 9** - oslobodenie pre daňovníkov začínajúcich činnosť v priebehu roka
4. Voliteľne prispôsobte obsah správy

Predvolená správa: "Cena neobsahuje DPH, predajca využíva oslobodenie na základe čl. 113 ods. 1 zákona o DPH."

### Vypnutie DPH vo WooCommerce

Pri oslobodení od DPH nastavte vo WooCommerce:

1. **WooCommerce > Nastavenia > Dane** - vypnite výpočet daní ALEBO nastavte sadzbu 0 %
2. Doplnok automaticky pridá príslušnú poznámku k cenám

## Shortcode

Použite shortcode `[polski_tax_notice]` na zobrazenie informácie o DPH na ľubovoľnom mieste.

### Parametre

| Parameter | Typ | Predvolené | Popis |
|----------|-----|----------|------|
| `product_id` | int | aktuálny | ID produktu |
| `type` | string | `auto` | Typ informácie: `auto`, `gross`, `net`, `exempt` |
| `show_rate` | bool | `true` | Či zobrazovať percentuálnu sadzbu |
| `wrapper` | string | `span` | Obaľujúci HTML element |

### Príklady použitia

Automatická detekcia na stránke produktu:

```html
[polski_tax_notice]
```

Vynútenie informácie o oslobodení:

```html
[polski_tax_notice type="exempt"]
```

Bez percentuálnej sadzby:

```html
[polski_tax_notice show_rate="false"]
```

V PHP šablóne:

```php
echo do_shortcode('[polski_tax_notice product_id="' . $product->get_id() . '"]');
```

## Konfigurácia pre obchody B2B a B2C

Ak obsluhujete individuálnych (B2C) aj firemných (B2B) zákazníkov, nakonfigurujte samostatné zobrazenia cien pre každú rolu.

### Ceny bez DPH pre firmy

Doplnok využíva systém rolí WooCommerce. Ak chcete zobrazovať ceny bez DPH firmám:

1. Vytvorte dedikovanú rolu (napr. "firemny_zakaznik") alebo použite existujúcu
2. V nastaveniach doplnku priraďte zobrazovanie cien bez DPH k vybranej roli
3. Firemní zákazníci uvidia ceny bez DPH a individuálni s DPH

### Dvojité ceny na stránke produktu

Režim "Obe" zobrazuje cenu bez DPH a s DPH súčasne. Formát:

```
100,00 zł bez DPH
123,00 zł s DPH (v tom 23 % DPH)
```

Poradie a formát je možné prispôsobiť v nastaveniach.

## Sadzby DPH pre rôzne kategórie produktov

V Poľsku platia štyri sadzby DPH:

| Sadzba | Použitie |
|--------|-------------|
| 23 % | Základná sadzba - väčšina tovaru a služieb |
| 8 % | Znížená sadzba - bytová výstavba, gastronomické služby |
| 5 % | Znížená sadzba - potraviny, knihy, časopisy |
| 0 % | Nulová sadzba - export, dodanie tovaru v rámci EÚ |

Doplnok automaticky načíta sadzbu priradenú k produktu a zobrazí správnu informáciu.

## Informácia o DPH v e-mailoch

Doplnok pridáva informáciu o DPH do e-mailov WooCommerce:

- potvrdenie objednávky
- faktúra
- zmena stavu objednávky

Obsah správy je v súlade s nastaveniami obchodu.

## Štýlovanie CSS

Informácia o DPH je obalená v elementoch s CSS triedami:

```css
.polski-tax-notice {
    font-size: 0.85em;
    color: #666;
}

.polski-tax-notice--exempt {
    color: #c00;
    font-weight: 600;
}

.polski-tax-notice__rate {
    white-space: nowrap;
}
```

## Najčastejšie problémy

### Informácia o DPH sa zobrazuje dvojmo

Skontrolujte, či šablóna nepridáva vlastnú informáciu o DPH. Niektoré poľské šablóny majú vstavanú podporu DPH, jednu z nich vypnite.

### Sadzba DPH sa zobrazuje nesprávne

Skontrolujte, či sú daňové triedy v **WooCommerce > Nastavenia > Dane > Štandardné sadzby** správne nastavené. Doplnok načítava sadzbu z konfigurácie WooCommerce.

## Súvisiace zdroje

- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informačný charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
