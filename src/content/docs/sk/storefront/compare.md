---
title: Porovnávač produktov
description: Modul porovnávania produktov v Polski for WooCommerce - tabuľka vlastností, limit produktov, automatická výmena a shortcode.
---

Porovnávač umožňuje zákazníkom postaviť niekoľko produktov vedľa seba v tabuľke vlastností. Uľahčuje výber, najmä v obchodoch so širokou ponukou.

![Porovnávač produktov, zoznam želaní a filtre na stránke obchodu](../../../../assets/screenshots/screenshot-8-wishlist-compare-quick-view.png)

## Zapnutie modulu

Prejdite do **WooCommerce > Polski > Moduly obchodu** a zapnite **Porovnávač produktov**. Na produktoch sa objaví tlačidlo porovnania.

## Tabuľka vlastností (feature table)

Zákazník vidí tabuľku so stĺpcom pre každý produkt. Riadky obsahujú:

- Fotku produktu
- Názov s odkazom
- Cenu (so zohľadnením akcií a smernice Omnibus)
- Hodnotenie (hviezdičky)
- Krátky popis
- Stav dostupnosti
- Atribúty produktu (farba, veľkosť atď.)
- Čas dodania (ak je nastavený)
- Tlačidlo **Pridať do košíka**

Riadky s identickými hodnotami môžu byť automaticky skryté, zapnite **Skryť identické vlastnosti** v nastaveniach. Zákazník uvidí len rozdiely medzi produktmi.

## Maximálny počet produktov

Predvolene môže zákazník porovnať až **4 produkty** naraz. Limit zmeníte v nastaveniach alebo filtrom:

```php
add_filter('polski/compare/max_items', function (): int {
    return 6;
});
```

Po dosiahnutí limitu sa tlačidlo **Pridať do porovnania** stane neaktívnym. Zákazník musí najprv odstrániť jeden z produktov.

## Automatická výmena (auto-replace)

Keď je **Automatická výmena** zapnutá, nový produkt nad limit nahradí najstarší. Zákazník uvidí toast upozornenie o výmene.

Zapnutie v nastaveniach: **WooCommerce > Polski > Moduly obchodu > Porovnávač > Automatická výmena**.

Alebo programovo:

```php
add_filter('polski/compare/auto_replace', '__return_true');
```

## Fungovanie AJAX

Porovnávač funguje bez opätovného načítania stránky. Dostupné AJAX akcie:

| Akcia                        | Popis                          |
| ---------------------------- | ------------------------------ |
| `polski_compare_add`         | Pridanie produktu              |
| `polski_compare_remove`      | Odstránenie produktu           |
| `polski_compare_get`         | Načítanie zoznamu produktov    |
| `polski_compare_clear`       | Vyčistenie porovnania          |

Údaje sú uložené v relácii WooCommerce (`WC()->session`). Fungujú pre hostí aj prihlásených zákazníkov.

## Shortcode `[polski_compare]`

Zobrazuje tabuľku porovnania na ľubovoľnom mieste obchodu.

### Parametre

| Parameter        | Typ    | Predvolene | Popis                                          |
| --------------- | ------ | --------- | --------------------------------------------- |
| `columns`       | string | `all`     | Vlastnosti na zobrazenie (oddelené čiarkou)    |
| `hide_similar`  | string | `no`      | Skryť riadky s identickými hodnotami           |
| `show_remove`   | string | `yes`     | Zobraziť tlačidlo odstránenia produktu         |

### Príklad použitia

```html
[polski_compare columns="image,name,price,rating,stock" hide_similar="yes"]
```

### Použitie na vyhradenej stránke

Vytvorte stránku napr. **Porovnanie produktov** a vložte shortcode:

```html
[polski_compare]
```

V nastaveniach modulu označte túto stránku ako **Stránka porovnania**. Tlačidlo **Zobraziť porovnanie** presmeruje na ňu.

## Tlačidlo porovnania

Tlačidlo je viditeľné na karte produktu a na stránke produktu. Pozíciu zmeníte filtrom:

```php
add_filter('polski/compare/button_position', function (): string {
    return 'after_add_to_cart';
});
```

Dostupné pozície: `before_add_to_cart`, `after_add_to_cart`, `after_summary`.

## Lišta porovnania (floating bar)

Po pridaní prvého produktu sa v dolnej časti obrazovky objaví lišta s náhľadmi a tlačidlom **Porovnať**. Na mobile sa namiesto náhľadov zobrazuje počet vybraných produktov.

## Porovnanie v rámci kategórie

Predvolene je možné porovnávať produkty z rôznych kategórií. Ak chcete obmedziť na rovnakú kategóriu:

```php
add_filter('polski/compare/same_category_only', '__return_true');
```

Zákazník uvidí oznámenie, ak sa pokúsi pridať produkt z inej kategórie.

## Štýlovanie CSS

CSS triedy modulu:

- `.polski-compare-button` - tlačidlo pridania do porovnania
- `.polski-compare-button--active` - produkt je v porovnaní
- `.polski-compare-table` - tabuľka porovnania
- `.polski-compare-bar` - lišta v dolnej časti obrazovky
- `.polski-compare-empty` - oznámenie prázdneho porovnania

## Riešenie problémov

**Tabuľka nezobrazuje atribúty** - skontrolujte, či majú atribúty zaškrtnuté **Viditeľné na stránke produktu** v úprave produktu (záložka Atribúty).

**Tlačidlo nereaguje na kliknutie** - skontrolujte konzolu prehliadača. Častou príčinou je duplikovaný jQuery alebo konflikt s pluginom optimalizujúcim JS.

Nahlasovanie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informačný charakter a nepredstavuje právnu radu. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) dodávaný bez záruky.</div>
