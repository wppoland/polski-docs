---
title: Boční košík (live cart)
description: Modul bočního košíku v Polski for WooCommerce - vysouvací panel košíku s lištou dopravy zdarma a aktualizací v reálném čase.
---

Boční košík je vysouvací panel (drawer), který se objeví po přidání produktu do košíku. Zákazník vidí obsah košíku bez opuštění stránky produktu, což zkracuje nákupní cestu a snižuje opouštění košíků.

## Zapnutí modulu

Přejděte do **WooCommerce > Polski > Moduly obchodu** a zapněte **Boční košík**. Po přidání produktu do košíku se panel automaticky vysune z vybrané strany obrazovky.

## Funkce

- Vysouvací panel košíku po přidání produktu (slide-in drawer)
- Aktualizace v reálném čase přes WooCommerce Cart Fragments
- Lišta postupu dopravy zdarma s animací
- Změna množství produktů bez znovunačtení stránky
- Odstranění produktů z košíku v panelu
- Souhrn hodnoty košíku
- Overlay ztmavující pozadí stránky
- Volba strany zobrazení (vlevo/vpravo)

## Nastavení

Konfigurace v **WooCommerce > Polski > Moduly obchodu > Boční košík**.

| Nastavení | Výchozí | Popis |
|---|---|---|
| `auto_open` | `true` | Automaticky otevírat panel po přidání produktu |
| `show_subtotal` | `true` | Zobrazovat souhrn hodnoty košíku |
| `show_shipping_notice` | `true` | Zobrazovat lištu postupu dopravy zdarma |
| `free_shipping_threshold` | `200` | Práh dopravy zdarma v měně obchodu |
| `position` | `right` | Strana obrazovky: `right` nebo `left` |
| `overlay` | `true` | Ztmavení pozadí, když je panel otevřený |

Volba v databázi: `polski_live_cart`.

## Lišta dopravy zdarma

Lišta ukazuje, kolik chybí do dopravy zdarma. Po překročení prahu zobrazuje potvrzující zprávu. Práh se získává z nastavení `free_shipping_threshold` nebo automaticky z metody dopravy WooCommerce (pokud je nakonfigurovaná).

Příklad zpráv:

- "Do dopravy zdarma chybí **45,00 Kč**"
- "Gratulujeme! Vaše objednávka má nárok na **dopravu zdarma**"

## Technické detaily

### Soubory

- CSS: `assets/css/live-cart.css`
- JavaScript: `assets/js/live-cart.js`

Oba soubory jsou načítány podmíněně, pouze když je modul aktivní. Skript závisí na `jquery` a `wc-cart-fragments`.

### Cart Fragments

Modul využívá mechanismus WooCommerce Cart Fragments k aktualizaci obsahu panelu v reálném čase. Po každé změně košíku (přidání, odstranění, změna množství) se panel obnoví bez znovunačtení stránky.

### Hooky

```php
// Změň práh dopravy zdarma dynamicky
add_filter('polski/live_cart/free_shipping_threshold', function (float $threshold): float {
    return 300.00;
});

// Přidej vlastní obsah pod seznam produktů
add_action('polski/live_cart/after_items', function (): void {
    echo '<p class="live-cart-promo">Slevový kód: WELCOME10</p>';
});

// Vypni automatické otevírání na mobilu
add_filter('polski/live_cart/auto_open', function (bool $auto_open): bool {
    if (wp_is_mobile()) {
        return false;
    }
    return $auto_open;
});
```

### CSS třídy

- `.polski-live-cart` - hlavní kontejner panelu
- `.polski-live-cart--open` - otevřený stav
- `.polski-live-cart--left` / `.polski-live-cart--right` - pozice
- `.polski-live-cart__overlay` - overlay pozadí
- `.polski-live-cart__header` - hlavička panelu
- `.polski-live-cart__items` - seznam produktů
- `.polski-live-cart__item` - jednotlivý produkt
- `.polski-live-cart__subtotal` - souhrn
- `.polski-live-cart__shipping-bar` - lišta dopravy zdarma
- `.polski-live-cart__shipping-progress` - výplň lišty

### ID modulu

`live_cart`

## Řešení problémů

**Panel se neotevírá po přidání produktu** - zkontrolujte, zda je zapnuté AJAX přidávání do košíku v **WooCommerce > Nastavení > Produkty > Zapnout přidávání do košíku tlačítkem AJAX**. Zkontrolujte také, zda nedochází ke konfliktu s jiným pluginem košíku.

**Lišta dopravy zdarma se nezobrazuje** - ujistěte se, že máte nakonfigurovanou metodu dopravy s dopravou zdarma nad určeným prahem, nebo nastavte práh ručně v nastavení modulu.

**Panel se zobrazuje na špatné straně** - změňte nastavení `position` na `left` nebo `right`.

Hlášení problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je software s otevřeným zdrojovým kódem (GPLv2) poskytovaný bez záruky.</div>
