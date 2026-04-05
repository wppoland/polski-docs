---
title: Porovnavac produktu
description: Modul porovnavani produktu v Polski for WooCommerce - tabulka vlastnosti, limit produktu, automaticka zamena a shortcode.
---

Porovnavac produktu umoznuje zakaznikum postavit nekolik produktu vedle sebe ve forme tabulky vlastnosti. Usnadnuje to nakupni rozhodnuti, zejmena v obchodech se sirokym sortimentem.

## Aktivace modulu

Prejdete do **WooCommerce > Polski > Moduly obchodu** a aktivujte moznost **Porovnavac produktu**. Na produktech se objevi tlacitko porovnani.

## Tabulka vlastnosti (feature table)

Po pridani produktu do porovnani zakaznik vidi tabulku se sloupci pro kazdy produkt. Radky tabulky obsahuji:

- Obrazek produktu
- Nazev s odkazem
- Cenu (s ohledem na akce a smernici Omnibus)
- Hodnoceni (hvezdicky)
- Kratky popis
- Stav dostupnosti
- Atributy produktu (barva, velikost atd.)
- Dobu dodani (pokud nastavena)
- Tlacitko **Pridat do kosiku**

Radky, ve kterych jsou vsechny hodnoty identicke, mohou byt automaticky skryty - aktivujte moznost **Skryt identicke vlastnosti** v nastaveních modulu.

## Maximalni pocet produktu

Ve vychozim stavu muze zakaznik porovnat az **4 produkty** soucasne. Limit lze zmenit:

```php
add_filter('polski/compare/max_items', function (): int {
    return 6;
});
```

## Automaticka zamena (auto-replace)

Kdyz je moznost **Automaticka zamena** aktivni, pridani produktu nad limit automaticky nahradi nejstarsi produkt v porovnani novym.

```php
add_filter('polski/compare/auto_replace', '__return_true');
```

## Shortcode `[polski_compare]`

### Parametry

| Parametr | Typ | Vychozi | Popis |
| --------------- | ------ | --------- | --------------------------------------------- |
| `columns` | string | `all` | Vlastnosti k zobrazeni (oddelene carkou) |
| `hide_similar` | string | `no` | Skryt radky s identickymi hodnotami |
| `show_remove` | string | `yes` | Zobrazit tlacitko odstraneni produktu |

### Priklad pouziti

```html
[polski_compare columns="image,name,price,rating,stock" hide_similar="yes"]
```

## Tlacitko porovnani

Pozici tlacitka kontrolujete filtrem:

```php
add_filter('polski/compare/button_position', function (): string {
    return 'after_add_to_cart';
});
```

## Stylovani CSS

- `.polski-compare-button` - tlacitko pridani do porovnani
- `.polski-compare-button--active` - produkt je v porovnani
- `.polski-compare-table` - tabulka porovnani
- `.polski-compare-bar` - panel ve spodni casti obrazovky
- `.polski-compare-empty` - zprava prazdneho porovnani

## Reseni problemu

**Tabulka nezobrazuje atributy** - ujistete se, ze atributy produktu jsou nastaveny jako **Viditelne na strance produktu** v editaci produktu.

**Tlacitko nereaguje na kliknuti** - zkontrolujte konzoli prohlizece na konflikty JavaScriptu.

Hlaseni problemu: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
