---
title: Zoznam prianí (wishlist)
description: Modul zoznamu prianí v Polski for WooCommerce - podpora hostí a prihlásených používateľov, zákaznícky účet, AJAX a shortcód.
---

Zoznam prianí umožňuje zákazníkom ukladať produkty na neskôr. Funguje pre prihlásených zákazníkov aj hostí.

## Zapnutie modulu

Prejdite do **WooCommerce > Polski > Obchodné moduly** a aktivujte možnosť **Zoznam prianí**. Po zapnutí sa na každom produkte zobrazí ikona srdca umožňujúca pridanie do zoznamu.

## Podpora hostí a prihlásených používateľov

### Hostia (neprihlásení)

Pre hostí je zoznam prianí uložený v `localStorage` prehliadača. Údaje sú dostupné okamžite bez dopytov na server. Po prihlásení sa používateľa zoznam z `localStorage` automaticky synchronizuje s databázou - produkty sa nestratia.

### Prihlásení používatelia

Pre prihlásených zákazníkov sa údaje ukladajú v tabuľke `wp_usermeta` s kľúčom `_polski_wishlist`. Vďaka tomu je zoznam dostupný na každom zariadení po prihlásení.

## Zákaznícky účet

Modul pridáva novú záložku **Zoznam prianí** v sekcii **Môj účet** WooCommerce. Zákazník tam vidí:

- Miniatúru produktu
- Názov s odkazom na stránku produktu
- Cenu (aktuálnu, s ohľadom na akcie)
- Stav dostupnosti (na sklade / nedostupné)
- Tlačidlo **Pridať do košíka**
- Tlačidlo **Odstrániť zo zoznamu**

Záložka je viditeľná len vtedy, keď je modul aktívny. Endpoint v URL je `wishlist` - napr. `tvoj-obchod.pl/moj-ucet/wishlist/`.

## Funkcia AJAX

Pridávanie a odstraňovanie produktov zo zoznamu funguje cez AJAX - stránka sa opätovne nenačítava. Po kliknutí na ikonu srdca:

1. Ikona zmení stav (prázdna/vyplnená) s CSS animáciou
2. Odošle sa AJAX požiadavka na `admin-ajax.php`
3. Počítadlo na ikone v hlavičke sa aktualizuje v reálnom čase

AJAX akcie obsluhované modulom:

| Akcia                          | Popis                        |
| ------------------------------ | --------------------------- |
| `polski_wishlist_add`          | Pridanie produktu do zoznamu |
| `polski_wishlist_remove`       | Odstránenie produktu zo zoznamu |
| `polski_wishlist_get`          | Získanie celého zoznamu      |
| `polski_wishlist_clear`        | Vyčistenie celého zoznamu    |

## Shortcód `[polski_wishlist]`

Shortcód zobrazuje tabuľku zoznamu prianí na ľubovoľnom mieste obchodu.

### Parametre

| Parameter    | Typ    | Predvolené | Popis                                        |
| ----------- | ------ | --------- | -------------------------------------------- |
| `columns`   | string | `all`     | Stĺpce na zobrazenie (oddelené čiarkou) |
| `max_items` | int    | `50`      | Maximálny počet produktov na zozname     |
| `show_empty`| string | `yes`     | Či zobrazovať hlásenie keď je zoznam prázdny |

### Príklad použitia

```html
[polski_wishlist columns="image,name,price,add_to_cart" max_items="20"]
```

### Použitie v PHP šablóne

```php
echo do_shortcode('[polski_wishlist columns="image,name,price,add_to_cart"]');
```

### Dostupné stĺpce

- `image` - miniatúra produktu
- `name` - názov produktu s odkazom
- `price` - cena
- `stock` - stav skladu
- `add_to_cart` - tlačidlo pridania do košíka
- `remove` - tlačidlo odstránenia zo zoznamu
- `date_added` - dátum pridania

## Tlačidlo na stránke produktu

Tlačidlo zoznamu prianí sa štandardne zobrazuje pod tlačidlom **Pridať do košíka** na stránke produktu. Pozíciu je možné zmeniť filtrom:

```php
add_filter('polski/wishlist/button_position', function (): string {
    return 'before_add_to_cart'; // alebo 'after_add_to_cart', 'after_summary'
});
```

## Tlačidlo v zozname produktov

Na stránkach kategórií a archívov sa tlačidlo srdca zobrazuje na miniatúre produktu v rohu. Je to možné vypnúť v nastaveniach modulu.

## Hlavička obchodu

Modul pridáva ikonu srdca s počítadlom do hlavičky obchodu (vedľa košíka). Kliknutie otvára dropdown s náhľadom uložených produktov. Pozíciu ikony ovládate hookom:

```php
add_action('polski/wishlist/header_icon', function (): void {
    // Vlastná pozícia ikony v hlavičke
});
```

## Štýlovanie CSS

Modul využíva CSS triedy s prefixom `.polski-wishlist-`. Hlavné triedy:

- `.polski-wishlist-button` - tlačidlo pridania/odstránenia
- `.polski-wishlist-button--active` - aktívny stav (produkt je na zozname)
- `.polski-wishlist-table` - tabuľka zoznamu
- `.polski-wishlist-count` - počítadlo v hlavičke
- `.polski-wishlist-empty` - hlásenie prázdneho zoznamu

## Výkon

Údaje zoznamu prianí pre prihlásených používateľov sú cachované v object cache (ak je dostupný). Fragment HTML tlačidla je cachovaný cez `wp_cache_set()` so skupinou `polski_wishlist`. Cache sa automaticky čistí po pridaní alebo odstránení produktu.

## Riešenie problémov

**Tlačidlo sa nezobrazuje na produkte** - uistite sa, že téma podporuje hook `woocommerce_single_product_summary`. Niektoré témy prepísajú predvolené šablóny WooCommerce.

**Zoznam sa nesynchronizuje po prihlásení** - skontrolujte, či nemáte cachovací plugin, ktorý agresívne buferuje stránku prihlásenia. Vypnite cache pre stránku `moj-ucet`.

**Ikona v hlavičke sa nezobrazuje** - téma musí podporovať hook `wp_nav_menu_items` alebo `storefront_header`. Ak používate neštandardnú tému, pridajte ikonu ručne v šablóne.

Nahlasovanie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
