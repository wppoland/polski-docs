---
title: Wishlist
description: Modul wishlistu v Polski for WooCommerce - obsluha hostu a prihlasenych uzivatelu, zakaznicky ucet, AJAX a shortcode.
---

Wishlist umoznuje zakaznikum ukladat produkty k pozdejsimu nakupu. Modul Polski for WooCommerce nabizi uplnou implementaci wishlistu - jak pro prihlasene uzivatele, tak pro hosty navstevujici obchod.

## Aktivace modulu

Prejdete do **WooCommerce > Polski > Moduly obchodu** a aktivujte moznost **Wishlist**. Po aktivaci se na kazdem produktu objevi ikona srdce umoznujici pridani na seznam.

## Obsluha hostu a prihlasenych uzivatelu

### Hoste (neprihlaseni)

Pro hosty je wishlist uchovavan v `localStorage` prohlizece. Data jsou dostupna okamzite bez dotazu na server. Po prihlaseni uzivatele je seznam z `localStorage` automaticky synchronizovan s databazi - produkty se neztrati.

### Prihlaseni uzivatele

Pro prihlasene zakazniky jsou data ukladana v tabulce `wp_usermeta` s klicem `_polski_wishlist`. Diky tomu je seznam dostupny na kazdem zarizeni po prihlaseni.

## Zakaznicky ucet

Modul pridava novou zalozku **Wishlist** v sekci **Muj ucet** WooCommerce. Zakaznik tam vidi:

- Miniaturu produktu
- Nazev s odkazem na stranku produktu
- Cenu (aktualni, s ohledem na akce)
- Stav dostupnosti (skladem / neni skladem)
- Tlacitko **Pridat do kosiku**
- Tlacitko **Odebrat ze seznamu**

Zalozka je viditelna pouze pokud je modul aktivni. Endpoint v URL je `wishlist` - napr. `twojsklep.pl/moje-konto/wishlist/`.

## AJAX chovani

Pridavani a odebirani produktu ze seznamu funguje pres AJAX - stranka se znovu nenacita. Po kliknuti na ikonu srdce:

1. Ikona meni stav (prazdna/vyplnena) s CSS animaci
2. Odesila se AJAX pozadavek na `admin-ajax.php`
3. Pocitadlo na ikone v hlavicce se aktualizuje v realnem case

AJAX akce obsluhovane modulem:

| Akce | Popis |
| ------------------------------ | --------------------------- |
| `polski_wishlist_add` | Pridani produktu na seznam |
| `polski_wishlist_remove` | Odebrani produktu ze seznamu |
| `polski_wishlist_get` | Ziskani celeho seznamu |
| `polski_wishlist_clear` | Vymazani celeho seznamu |

## Shortcode `[polski_wishlist]`

Shortcode zobrazuje tabulku wishlistu na libovolnem miste obchodu.

### Parametry

| Parametr | Typ | Vychozi | Popis |
| ----------- | ------ | --------- | -------------------------------------------- |
| `columns` | string | `all` | Sloupce k zobrazeni (oddelene carkou) |
| `max_items` | int | `50` | Maximalni pocet produktu na seznamu |
| `show_empty`| string | `yes` | Zda zobrazit zpravu kdyz je seznam prazdny |

### Priklad pouziti

```html
[polski_wishlist columns="image,name,price,add_to_cart" max_items="20"]
```

### Dostupne sloupce

- `image` - miniatura produktu
- `name` - nazev produktu s odkazem
- `price` - cena
- `stock` - stav skladu
- `add_to_cart` - tlacitko pridani do kosiku
- `remove` - tlacitko odebrani ze seznamu
- `date_added` - datum pridani

## Tlacitko na strance produktu

Tlacitko wishlistu se ve vychozim stavu zobrazuje pod tlacitkem **Pridat do kosiku** na strance produktu. Pozici lze zmenit filtrem:

```php
add_filter('polski/wishlist/button_position', function (): string {
    return 'before_add_to_cart'; // nebo 'after_add_to_cart', 'after_summary'
});
```

## Hlavicka obchodu

Modul pridava ikonu srdce s pocitadlem do hlavicky obchodu (vedle kosiku). Kliknuti otevira dropdown s nahledem ulozenych produktu.

## Stylovani CSS

Modul pouziva CSS tridy s prefixem `.polski-wishlist-`:

- `.polski-wishlist-button` - tlacitko pridani/odebrani
- `.polski-wishlist-button--active` - aktivni stav (produkt na seznamu)
- `.polski-wishlist-table` - tabulka seznamu
- `.polski-wishlist-count` - pocitadlo v hlavicce
- `.polski-wishlist-empty` - zprava prazdneho seznamu

## Reseni problemu

**Tlacitko se nezobrazuje na produktu** - ujistete se, ze motiv podporuje hook `woocommerce_single_product_summary`.

**Seznam se nesynchronizuje po prihlaseni** - zkontrolujte, zda nemate cachovaci plugin agresivne cachujici prihlasovaaci stranku. Deaktivujte cache pro stranku `moje-konto`.

**Ikona v hlavicce se nezobrazuje** - motiv musi podporovat hook `wp_nav_menu_items` nebo `storefront_header`.

Hlaseni problemu: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
