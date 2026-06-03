---
title: Seznam přání (wishlist)
description: Modul seznamu přání v Polski for WooCommerce - obsluha hostů a přihlášených uživatelů, zákaznický účet, AJAX a shortcode.
---

Seznam přání umožňuje zákazníkům ukládat produkty na později. Funguje jak pro přihlášené zákazníky, tak pro hosty.

![Seznam přání, porovnávač a rychlý náhled na stránce obchodu](../../../../assets/screenshots/screenshot-8-wishlist-compare-quick-view.png)

## Zapnutí modulu

Přejděte do **WooCommerce > Polski > Moduly obchodu** a zapněte **Seznam přání**. U každého produktu se objeví ikona srdce.

## Obsluha hostů a přihlášených uživatelů

### Hosté (nepřihlášení)

Seznam se ukládá do `localStorage` prohlížeče. Data jsou dostupná okamžitě, bez dotazů na server. Po přihlášení se seznam automaticky synchronizuje s databází - produkty nezmizí.

### Přihlášení uživatelé

Data se ukládají do tabulky `wp_usermeta` s klíčem `_polski_wishlist`. Seznam je dostupný na každém zařízení po přihlášení.

## Zákaznický účet

Modul přidává záložku **Seznam přání** v **Můj účet**. Zákazník tam vidí:

- Náhled produktu
- Název s odkazem na stránku produktu
- Cenu (aktuální, se zohledněním akce)
- Stav dostupnosti (skladem / nedostupné)
- Tlačítko **Přidat do košíku**
- Tlačítko **Odebrat ze seznamu**

Záložka je viditelná pouze tehdy, když je modul aktivní. Endpoint v URL: `wishlist` - např. `vasobchod.cz/muj-ucet/wishlist/`.

## Fungování AJAX

Přidávání a odebírání produktů funguje přes AJAX - stránka se neznovunačítá. Po kliknutí na ikonu srdce:

1. Ikona změní stav (prázdná/vyplněná) s CSS animací
2. Odešle se AJAX požadavek na `admin-ajax.php`
3. Počítadlo na ikoně v záhlaví se aktualizuje v reálném čase

AJAX akce obsluhované modulem:

| Akce                           | Popis                       |
| ------------------------------ | --------------------------- |
| `polski_wishlist_add`          | Přidání produktu do seznamu |
| `polski_wishlist_remove`       | Odebrání produktu ze seznamu |
| `polski_wishlist_get`          | Načtení celého seznamu      |
| `polski_wishlist_clear`        | Vymazání celého seznamu     |

## Shortcode `[polski_wishlist]`

Zobrazuje tabulku seznamu přání na libovolném místě obchodu.

### Parametry

| Parametr    | Typ    | Výchozí   | Popis                                        |
| ----------- | ------ | --------- | -------------------------------------------- |
| `columns`   | string | `all`     | Sloupce k zobrazení (oddělené čárkou)        |
| `max_items` | int    | `50`      | Maximální počet produktů na seznamu          |
| `show_empty`| string | `yes`     | Zda zobrazovat zprávu, když je seznam prázdný |

### Příklad použití

```html
[polski_wishlist columns="image,name,price,add_to_cart" max_items="20"]
```

### Použití v PHP šabloně

```php
echo do_shortcode('[polski_wishlist columns="image,name,price,add_to_cart"]');
```

### Dostupné sloupce

- `image` - náhled produktu
- `name` - název produktu s odkazem
- `price` - cena
- `stock` - skladový stav
- `add_to_cart` - tlačítko přidání do košíku
- `remove` - tlačítko odebrání ze seznamu
- `date_added` - datum přidání

## Tlačítko na stránce produktu

Tlačítko se standardně zobrazuje pod **Přidat do košíku**. Změňte pozici filtrem:

```php
add_filter('polski/wishlist/button_position', function (): string {
    return 'before_add_to_cart'; // nebo 'after_add_to_cart', 'after_summary'
});
```

## Tlačítko v seznamu produktů

Na stránkách kategorií a archivů se tlačítko srdce objevuje v rohu náhledu. Vypnete ho v nastavení modulu.

## Záhlaví obchodu

Modul přidává ikonu srdce s počítadlem do záhlaví (vedle košíku). Kliknutí otevírá rozbalovací nabídku s uloženými produkty. Pozici ikony změňte hookem:

```php
add_action('polski/wishlist/header_icon', function (): void {
    // Vlastní pozice ikony v záhlaví
});
```

## Stylování CSS

CSS třídy mají prefix `.polski-wishlist-`. Hlavní třídy:

- `.polski-wishlist-button` - tlačítko přidání/odebrání
- `.polski-wishlist-button--active` - aktivní stav (produkt na seznamu)
- `.polski-wishlist-table` - tabulka seznamu
- `.polski-wishlist-count` - počítadlo v záhlaví
- `.polski-wishlist-empty` - zpráva prázdného seznamu

## Výkon

Data seznamu pro přihlášené zákazníky jsou cachována v object cache (pokud je dostupná). HTML tlačítka je cachováno přes `wp_cache_set()` se skupinou `polski_wishlist`. Cache se vymaže automaticky po přidání nebo odebrání produktu.

## Řešení problémů

**Tlačítko se neobjevuje u produktu** - zkontrolujte, zda šablona podporuje hook `woocommerce_single_product_summary`. Některé šablony přepisují šablony WooCommerce.

**Seznam se po přihlášení nesynchronizuje** - zkontrolujte, zda cache plugin nebufferuje přihlašovací stránku. Vypněte cache pro stránku `muj-ucet`.

**Ikona v záhlaví se nezobrazuje** - šablona musí podporovat hook `wp_nav_menu_items` nebo `storefront_header`. Ve vlastní šabloně přidejte ikonu ručně do šablony.

Hlášení problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
