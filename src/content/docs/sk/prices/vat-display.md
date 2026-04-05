---
title: Zobrazovanie DPH
description: Konfigurácia zobrazovania cien brutto a netto, sadzby DPH a oslobodenia podľa čl. 113 zákona o DPH vo WooCommerce.
---

Poľské právo vyžaduje, aby obchod jasne informoval, či cena obsahuje DPH. Plugin Polski for WooCommerce umožňuje zobrazovať informáciu o DPH - od jednoduchého označenia "brutto/netto" po sadzbu dane a základ oslobodenia.

## Právne požiadavky

V súlade so zákonom o informovaní o cenách tovarov a služieb a zákonom o DPH musí internetový obchod:

- jasne informovať, či cena obsahuje daň DPH
- uvádzať sadzbu DPH, ak predáva individuálnym aj firemným zákazníkom
- v prípade oslobodenia od DPH - uviesť právny základ oslobodenia

Predajcovia využívajúci subjektové oslobodenie (čl. 113 zákona o DPH) musia informovať zákazníka, že cena neobsahuje DPH z dôvodu oslobodenia.

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski > Ceny** a nakonfigurujte sekciu "Zobrazovanie DPH".

### Režimy zobrazovania

| Režim | Popis | Príklad |
|------|------|---------|
| Brutto (s DPH) | Cena obsahuje daň | 123,00 PLN brutto |
| Netto (bez DPH) | Cena bez dane | 100,00 PLN netto |
| Oboje | Obe ceny súčasne | 100,00 PLN netto (123,00 PLN brutto) |

### Podrobné nastavenia

- **Zobraziť sadzbu DPH** - zobrazuje percentuálnu sadzbu dane vedľa ceny (napr. "vrátane 23% DPH")
- **Zobraziť informáciu o DPH v zozname** - ovláda viditeľnosť na stránkach kategórií a vo výsledkoch vyhľadávania
- **Zobraziť informáciu o DPH v košíku** - ovláda viditeľnosť v košíku a v súhrne objednávky
- **Vlastný text** - umožňuje prepísať predvolený text informácie o DPH

## Oslobodenie od DPH (čl. 113)

Predajcovia oslobodení od DPH na základe čl. 113 ods. 1 alebo ods. 9 zákona o dani z tovarov a služieb môžu nakonfigurovať príslušné hlásenie.

### Konfigurácia oslobodenia

1. Prejdite do **WooCommerce > Nastavenia > Polski > Ceny**
2. Zaškrtnite možnosť **Oslobodenie od DPH (čl. 113)**
3. Vyberte základ oslobodenia:
   - **Čl. 113 ods. 1** - oslobodenie pre predaje do 200 000 PLN ročne
   - **Čl. 113 ods. 9** - oslobodenie pre daňovníkov začínajúcich podnikanie v priebehu roka
4. Voliteľne prispôsobte obsah hlásenia

Predvolené hlásenie: "Cena neobsahuje daň DPH - predajca využíva oslobodenie na základe čl. 113 ods. 1 zákona o DPH."

### Vypnutie DPH vo WooCommerce

Pri oslobodení od DPH nastavte vo WooCommerce:

1. **WooCommerce > Nastavenia > Dane** - vypnite výpočet daní ALEBO nastavte sadzbu 0%
2. Plugin automaticky pridá príslušnú poznámku k cenám

## Shortcód

Použite shortcód `[polski_tax_notice]` na zobrazenie informácie o DPH na ľubovoľnom mieste.

### Parametre

| Parameter | Typ | Predvolený | Popis |
|----------|-----|----------|------|
| `product_id` | int | aktuálny | ID produktu |
| `type` | string | `auto` | Typ informácie: `auto`, `gross`, `net`, `exempt` |
| `show_rate` | bool | `true` | Či zobrazovať percentuálnu sadzbu |
| `wrapper` | string | `span` | Obaľujúci HTML prvok |

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

## Konfigurácia pre B2B a B2C obchody

Obchody obsluhujúce individuálnych (B2C) aj firemných (B2B) zákazníkov môžu nakonfigurovať rôzne zobrazenia cien v závislosti od role používateľa.

### Netto ceny pre firmy

Plugin spolupracuje so systémom rolí WooCommerce. Na zobrazenie netto cien pre firemných zákazníkov:

1. Vytvorte špeciálnu rolu (napr. "firemny_zakaznik") alebo použite existujúcu
2. V nastaveniach pluginu priraďte zobrazenie netto k vybranej roli
3. Firemní zákazníci uvidia ceny bez DPH, individuálni - s DPH

### Dvojité ceny na stránke produktu

Aktivácia režimu "Oboje" zobrazuje netto a brutto cenu súčasne. Formát prezentácie:

```
100,00 PLN netto
123,00 PLN brutto (vrátane 23% DPH)
```

Poradie a formát je možné prispôsobiť v nastaveniach.

## Sadzby DPH pre rôzne kategórie produktov

V Poľsku platia štyri sadzby DPH:

| Sadzba | Uplatnenie |
|--------|-------------|
| 23% | Základná sadzba - väčšina tovarov a služieb |
| 8% | Znížená sadzba - bytová výstavba, reštauračné služby |
| 5% | Znížená sadzba - potraviny, knihy, časopisy |
| 0% | Nulová sadzba - export, vnútrokomunitárne dodanie tovarov |

Plugin automaticky rozpozná sadzbu priradenú produktu vo WooCommerce a zobrazí príslušnú informáciu.

## Informácia o DPH v e-mailoch

Plugin pridáva informáciu o DPH aj do transakčných e-mailov WooCommerce:

- potvrdenie objednávky
- faktúra
- zmena stavu objednávky

Obsah hlásenia je konzistentný s nastaveniami obchodu.

## Štýlovanie CSS

Informácia o DPH je obalená v prvkoch s vyhradenými CSS triedami:

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

### Informácia o DPH sa zobrazuje dvakrát

Skontrolujte, či téma nepridáva vlastnú informáciu o DPH. Niektoré témy určené pre poľský trh majú vstavanú podporu DPH - v takom prípade vypnite jednu z implementácií.

### Sadzba DPH sa zobrazuje nesprávne

Uistite sa, že daňové triedy v **WooCommerce > Nastavenia > Dane > Štandardné sadzby** sú správne nakonfigurované. Plugin načítava sadzbu priamo z konfigurácie WooCommerce.

## Súvisiace zdroje

- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
