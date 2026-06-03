---
title: Bočný košík (live cart)
description: Modul bočného košíka v Polski for WooCommerce - vysúvací panel košíka s lištou dopravy zdarma a aktualizáciou v reálnom čase.
---

Bočný košík je vysúvací panel (drawer), ktorý sa objaví po pridaní produktu do košíka. Zákazník vidí obsah košíka bez opustenia stránky produktu, čo skracuje nákupnú cestu a znižuje opúšťanie košíkov.

## Zapnutie modulu

Prejdite do **WooCommerce > Polski > Moduly obchodu** a zapnite **Bočný košík**. Po pridaní produktu do košíka sa panel automaticky vysunie z vybranej strany obrazovky.

## Funkcie

- Vysúvací panel košíka po pridaní produktu (slide-in drawer)
- Aktualizácia v reálnom čase cez WooCommerce Cart Fragments
- Lišta postupu dopravy zdarma s animáciou
- Zmena množstva produktov bez opätovného načítania stránky
- Odstránenie produktov z košíka v paneli
- Súhrn hodnoty košíka
- Overlay stmavujúci pozadie stránky
- Výber strany zobrazenia (ľavá/pravá)

## Nastavenia

Konfigurácia v **WooCommerce > Polski > Moduly obchodu > Bočný košík**.

| Nastavenie | Predvolene | Popis |
|---|---|---|
| `auto_open` | `true` | Automaticky otvárať panel po pridaní produktu |
| `show_subtotal` | `true` | Zobrazovať súhrn hodnoty košíka |
| `show_shipping_notice` | `true` | Zobrazovať lištu postupu dopravy zdarma |
| `free_shipping_threshold` | `200` | Prah dopravy zdarma v mene obchodu |
| `position` | `right` | Strana obrazovky: `right` alebo `left` |
| `overlay` | `true` | Stmavenie pozadia, keď je panel otvorený |

Možnosť v databáze: `polski_live_cart`.

## Lišta dopravy zdarma

Lišta ukazuje, koľko chýba do dopravy zdarma. Po prekročení prahu zobrazí potvrdzujúce oznámenie. Prah sa preberá z nastavenia `free_shipping_threshold` alebo automaticky z metódy dopravy WooCommerce (ak je nakonfigurovaná).

Príklad oznámení:

- "Do dopravy zdarma chýba **45,00 zł**"
- "Gratulujeme! Vaša objednávka spĺňa podmienky pre **dopravu zdarma**"

## Technické detaily

### Súbory

- CSS: `assets/css/live-cart.css`
- JavaScript: `assets/js/live-cart.js`

Oba súbory sa načítavajú podmienene, len keď je modul aktívny. Skript závisí od `jquery` a `wc-cart-fragments`.

### Cart Fragments

Modul využíva mechanizmus WooCommerce Cart Fragments na aktualizáciu obsahu panela v reálnom čase. Po každej zmene košíka (pridanie, odstránenie, zmena množstva) sa panel obnoví bez opätovného načítania stránky.

### Hooky

```php
// Zmeň prah dopravy zdarma dynamicky
add_filter('polski/live_cart/free_shipping_threshold', function (float $threshold): float {
    return 300.00;
});

// Pridaj vlastný obsah pod zoznam produktov
add_action('polski/live_cart/after_items', function (): void {
    echo '<p class="live-cart-promo">Zľavový kód: WELCOME10</p>';
});

// Vypni automatické otváranie na mobile
add_filter('polski/live_cart/auto_open', function (bool $auto_open): bool {
    if (wp_is_mobile()) {
        return false;
    }
    return $auto_open;
});
```

### CSS triedy

- `.polski-live-cart` - hlavný kontajner panela
- `.polski-live-cart--open` - otvorený stav
- `.polski-live-cart--left` / `.polski-live-cart--right` - pozícia
- `.polski-live-cart__overlay` - overlay pozadia
- `.polski-live-cart__header` - hlavička panela
- `.polski-live-cart__items` - zoznam produktov
- `.polski-live-cart__item` - jednotlivý produkt
- `.polski-live-cart__subtotal` - súhrn
- `.polski-live-cart__shipping-bar` - lišta dopravy zdarma
- `.polski-live-cart__shipping-progress` - výplň lišty

### ID modulu

`live_cart`

## Riešenie problémov

**Panel sa neotvára po pridaní produktu** - skontrolujte, či je AJAX pridávanie do košíka zapnuté v **WooCommerce > Nastavenia > Produkty > Zapnúť pridávanie do košíka tlačidlom AJAX**. Skontrolujte tiež, či nie je konflikt s iným pluginom košíka.

**Lišta dopravy zdarma sa nezobrazuje** - uistite sa, že máte nakonfigurovanú metódu dopravy s dopravou zdarma nad určeným prahom, alebo nastavte prah ručne v nastaveniach modulu.

**Panel sa zobrazuje na nesprávnej strane** - zmeňte nastavenie `position` na `left` alebo `right`.

Nahlasovanie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informačný charakter a nepredstavuje právnu radu. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) dodávaný bez záruky.</div>
