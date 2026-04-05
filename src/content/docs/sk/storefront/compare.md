---
title: Porovnávač produktov
description: Modul porovnávania produktov v Polski for WooCommerce - tabuľka vlastností, limit produktov, automatická výmena a shortcód.
---

Porovnávač umožňuje zákazníkom zostaviť niekoľko produktov vedľa seba v tabuľke vlastností. Uľahčuje výber, zvlášť v obchodoch s veľkou ponukou.

## Zapnutie modulu

Prejdite do **WooCommerce > Polski > Obchodné moduly** a aktivujte možnosť **Porovnávač produktov**. Na produktoch sa zobrazí tlačidlo porovnania.

## Tabuľka vlastností (feature table)

Po pridaní produktov do porovnania zákazník vidí tabuľku so stĺpcami pre každý produkt. Riadky tabuľky obsahujú:

- Fotografiu produktu
- Názov s odkazom
- Cenu (s ohľadom na akcie a smernicu Omnibus)
- Hodnotenie (hviezdičky)
- Krátky popis
- Stav dostupnosti
- Atribúty produktu (farba, veľkosť atď.)
- Dodaciu lehotu (ak je nastavená)
- Tlačidlo **Pridať do košíka**

Riadky, v ktorých sú všetky hodnoty identické, môžu byť automaticky skryté - zapnite možnosť **Skryť identické vlastnosti** v nastaveniach modulu. To umožňuje zamerať pozornosť zákazníka na rozdiely medzi produktmi.

## Maximálny počet produktov

Štandardne môže zákazník porovnať až **4 produkty** súčasne. Limit je možné zmeniť v nastaveniach alebo filtrom:

```php
add_filter('polski/compare/max_items', function (): int {
    return 6;
});
```

Po dosiahnutí limitu sa tlačidlo **Pridať do porovnania** deaktivuje s hlásením o dosiahnutom limite. Zákazník musí najprv odstrániť jeden z produktov.

## Automatická výmena (auto-replace)

Keď je možnosť **Automatická výmena** aktívna, pridanie produktu nad limit automaticky nahradí najstarší produkt v porovnaní novým. Zákazník dostane toast oznámenie o výmene.

Zapnutie v nastaveniach: **WooCommerce > Polski > Obchodné moduly > Porovnávač > Automatická výmena**.

Alebo programovo:

```php
add_filter('polski/compare/auto_replace', '__return_true');
```

## Funkcia AJAX

Porovnávač funguje bez opätovného načítania stránky. AJAX akcie:

| Akcia                        | Popis                           |
| ---------------------------- | ------------------------------ |
| `polski_compare_add`         | Pridanie produktu              |
| `polski_compare_remove`      | Odstránenie produktu           |
| `polski_compare_get`         | Získanie zoznamu produktov     |
| `polski_compare_clear`       | Vyčistenie porovnania          |

Údaje porovnania sú uložené v relácii WooCommerce (`WC()->session`), vďaka čomu fungujú pre hostí aj prihlásených používateľov.

## Shortcód `[polski_compare]`

Shortcód zobrazuje tabuľku porovnania na ľubovoľnom mieste obchodu.

### Parametre

| Parameter        | Typ    | Predvolené | Popis                                          |
| --------------- | ------ | --------- | --------------------------------------------- |
| `columns`       | string | `all`     | Vlastnosti na zobrazenie (oddelené čiarkou) |
| `hide_similar`  | string | `no`      | Skryť riadky s identickými hodnotami        |
| `show_remove`   | string | `yes`     | Zobraziť tlačidlo odstránenia produktu       |

### Príklad použitia

```html
[polski_compare columns="image,name,price,rating,stock" hide_similar="yes"]
```

### Použitie na špeciálnej stránke

Vytvorte stránku napr. **Porovnanie produktov** a vložte shortcód:

```html
[polski_compare]
```

Potom v nastaveniach modulu uveďte túto stránku ako **Stránka porovnania**. Tlačidlo **Zobraziť porovnanie** v popupe presmeruje na túto stránku.

## Tlačidlo porovnania

Tlačidlo sa zobrazuje na karte produktu (stránka kategórie) a na stránke jednotlivého produktu. Pozíciu ovládate filtrom:

```php
add_filter('polski/compare/button_position', function (): string {
    return 'after_add_to_cart';
});
```

Dostupné pozície: `before_add_to_cart`, `after_add_to_cart`, `after_summary`.

## Lišta porovnania (floating bar)

Po pridaní prvého produktu do porovnania sa v spodnej časti obrazovky zobrazí lišta s miniatúrami vybraných produktov a tlačidlom **Porovnať**. Lišta je responzívna - na mobilných zariadeniach zobrazuje počet vybraných produktov namiesto miniatúr.

## Porovnanie v rámci kategórie

Štandardne môže zákazník porovnávať produkty z rôznych kategórií. Ak chcete obmedziť porovnanie na produkty z rovnakej kategórie:

```php
add_filter('polski/compare/same_category_only', '__return_true');
```

Pri pokuse o pridanie produktu z inej kategórie zákazník uvidí hlásenie s informáciou o obmedzení.

## Štýlovanie CSS

CSS triedy modulu:

- `.polski-compare-button` - tlačidlo pridania do porovnania
- `.polski-compare-button--active` - produkt je v porovnaní
- `.polski-compare-table` - tabuľka porovnania
- `.polski-compare-bar` - lišta v spodnej časti obrazovky
- `.polski-compare-empty` - hlásenie prázdneho porovnania

## Riešenie problémov

**Tabuľka nezobrazuje atribúty** - uistite sa, že atribúty produktov sú nastavené ako **Viditeľné na stránke produktu** v úprave produktu (záložka Atribúty).

**Tlačidlo nereaguje na kliknutie** - skontrolujte konzolu prehliadača na konflikty JavaScript. Najčastejšou príčinou je zduplikované jQuery alebo konflikt s pluginom optimalizujúcim JS.

Nahlasovanie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
