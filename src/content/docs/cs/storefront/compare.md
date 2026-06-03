---
title: Porovnávač produktů
description: Modul porovnávání produktů v Polski for WooCommerce - tabulka vlastností, limit produktů, automatická výměna a shortcode.
---

Porovnávač umožňuje zákazníkům porovnat několik produktů vedle sebe v tabulce vlastností. Usnadňuje výběr, zejména v obchodech s velkou nabídkou.

![Porovnávač produktů, seznam přání a filtry na stránce obchodu](../../../../assets/screenshots/screenshot-8-wishlist-compare-quick-view.png)

## Zapnutí modulu

Přejděte do **WooCommerce > Polski > Moduly obchodu** a zapněte **Porovnávač produktů**. U produktů se objeví tlačítko porovnání.

## Tabulka vlastností (feature table)

Zákazník vidí tabulku se sloupcem pro každý produkt. Řádky obsahují:

- Fotografii produktu
- Název s odkazem
- Cenu (s ohledem na akce a směrnici Omnibus)
- Hodnocení (hvězdičky)
- Krátký popis
- Stav dostupnosti
- Atributy produktu (barva, velikost atd.)
- Dobu dodání (pokud je nastavena)
- Tlačítko **Přidat do košíku**

Řádky se shodnými hodnotami lze automaticky skrýt, zapněte **Skrýt shodné vlastnosti** v nastavení. Zákazník uvidí pouze rozdíly mezi produkty.

## Maximální počet produktů

Ve výchozím nastavení může zákazník porovnat až **4 produkty** najednou. Limit změňte v nastavení nebo filtrem:

```php
add_filter('polski/compare/max_items', function (): int {
    return 6;
});
```

Po dosažení limitu se tlačítko **Přidat k porovnání** stane neaktivním. Zákazník musí nejprve odstranit jeden z produktů.

## Automatická výměna (auto-replace)

Když je **Automatická výměna** zapnutá, nový produkt nad limit nahradí nejstarší. Zákazník uvidí toast oznámení o výměně.

Zapnutí v nastavení: **WooCommerce > Polski > Moduly obchodu > Porovnávač > Automatická výměna**.

Nebo programově:

```php
add_filter('polski/compare/auto_replace', '__return_true');
```

## Fungování AJAX

Porovnávač funguje bez znovunačtení stránky. Dostupné AJAX akce:

| Akce                         | Popis                          |
| ---------------------------- | ------------------------------ |
| `polski_compare_add`         | Přidání produktu               |
| `polski_compare_remove`      | Odstranění produktu            |
| `polski_compare_get`         | Získání seznamu produktů       |
| `polski_compare_clear`       | Vymazání porovnání             |

Data jsou uložena v relaci WooCommerce (`WC()->session`). Fungují pro hosty i přihlášené zákazníky.

## Shortcode `[polski_compare]`

Zobrazuje tabulku porovnání na libovolném místě obchodu.

### Parametry

| Parametr        | Typ    | Výchozí   | Popis                                          |
| --------------- | ------ | --------- | ---------------------------------------------- |
| `columns`       | string | `all`     | Vlastnosti k zobrazení (oddělené čárkou)       |
| `hide_similar`  | string | `no`      | Skrýt řádky se shodnými hodnotami              |
| `show_remove`   | string | `yes`     | Zobrazit tlačítko odstranění produktu          |

### Příklad použití

```html
[polski_compare columns="image,name,price,rating,stock" hide_similar="yes"]
```

### Použití na vyhrazené stránce

Vytvořte stránku např. **Porovnání produktů** a vložte shortcode:

```html
[polski_compare]
```

V nastavení modulu označte tuto stránku jako **Stránka porovnání**. Tlačítko **Zobrazit porovnání** na ni přesměruje.

## Tlačítko porovnání

Tlačítko je viditelné na kartě produktu a na stránce produktu. Pozici změňte filtrem:

```php
add_filter('polski/compare/button_position', function (): string {
    return 'after_add_to_cart';
});
```

Dostupné pozice: `before_add_to_cart`, `after_add_to_cart`, `after_summary`.

## Lišta porovnání (floating bar)

Po přidání prvního produktu se v dolní části obrazovky objeví lišta s miniaturami a tlačítkem **Porovnat**. Na mobilu se místo miniatur zobrazuje počet vybraných produktů.

## Porovnání v rámci kategorie

Ve výchozím nastavení lze porovnávat produkty z různých kategorií. Pro omezení na stejnou kategorii:

```php
add_filter('polski/compare/same_category_only', '__return_true');
```

Zákazník uvidí zprávu, pokud se pokusí přidat produkt z jiné kategorie.

## Stylování CSS

CSS třídy modulu:

- `.polski-compare-button` - tlačítko přidání k porovnání
- `.polski-compare-button--active` - produkt je v porovnání
- `.polski-compare-table` - tabulka porovnání
- `.polski-compare-bar` - lišta v dolní části obrazovky
- `.polski-compare-empty` - zpráva prázdného porovnání

## Řešení problémů

**Tabulka nezobrazuje atributy** - zkontrolujte, zda mají atributy zaškrtnuté **Viditelné na stránce produktu** v editaci produktu (záložka Atributy).

**Tlačítko nereaguje na kliknutí** - zkontrolujte konzoli prohlížeče. Častou příčinou je duplikovaný jQuery nebo konflikt s pluginem optimalizujícím JS.

Hlášení problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je software s otevřeným zdrojovým kódem (GPLv2) poskytovaný bez záruky.</div>
