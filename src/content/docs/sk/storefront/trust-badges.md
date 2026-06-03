---
title: Znaky dôvery (trust badges)
description: Modul znakov dôvery v Polski for WooCommerce - konfigurovateľné signály dôvery na stránkach produktu, košíka a objednávky.
---

Znaky dôvery sú grafické prvky informujúce zákazníkov o bezpečných platbách, rýchlom doručení, možnosti vrátenia a záruke kvality. Pomáhajú zvyšovať konverziu budovaním dôvery v kľúčových momentoch nákupnej cesty.

## Zapnutie modulu

Prejdite do **WooCommerce > Polski > Moduly obchodu** a zapnite **Znaky dôvery**. Ikony sa objavia automaticky na stránkach produktu, košíka a objednávky.

## Funkcie

- Konfigurovateľné signály dôvery s inline SVG ikonami
- Zobrazenie na stránkach produktu, košíka a súhrnu objednávky
- 7 typov ikon: zámok (lock), nákladiak (truck), obnovenie (refresh), štít (shield), hviezdička (star), fajka (check), srdce (heart)
- Vlastné texty pod každým znakom
- Čisté CSS bez externých závislostí
- Responzívne usporiadanie na mobilných zariadeniach

## Nastavenia

Konfigurácia v **WooCommerce > Polski > Moduly obchodu > Znaky dôvery**.

| Nastavenie | Predvolene | Popis |
|---|---|---|
| `show_on_product` | `true` | Zobrazovať znaky na stránke produktu |
| `show_on_cart` | `true` | Zobrazovať znaky na stránke košíka |
| `show_on_checkout` | `true` | Zobrazovať znaky na stránke objednávky |

Každý znak možno individuálne zapnúť/vypnúť a nakonfigurovať:

- **Ikona** - výber zo 7 dostupných typov
- **Titulok** - krátky text pod ikonou (napr. "Bezpečná platba")
- **Poradie** - pozícia voči iným znakom

Možnosť v databáze: `polski_trust_badges`.

## Predvolené znaky

Po zapnutí modulu sú dostupné 4 preddefinované znaky:

| Znak | Ikona | Predvolený text |
|---|---|---|
| Bezpečná platba | lock | Šifrované pripojenie SSL |
| Rýchle doručenie | truck | Odoslanie do 24h |
| Vrátenie | refresh | 14 dní na vrátenie |
| Záruka kvality | shield | Originálne produkty |

## Technické detaily

### SVG ikony

Všetky ikony sú renderované ako inline SVG - žiadne HTTP požiadavky, žiadna závislosť od knižníc ikon. Každá ikona má veľkosť 32x32px a dedí farbu z CSS.

### Hooky

```php
// Filtrovať zoznam znakov
add_filter('polski/trust_badges/items', function (array $badges): array {
    // Pridať vlastný znak
    $badges[] = [
        'icon'  => 'star',
        'title' => 'Viac ako 1000 recenzií',
    ];
    return $badges;
});

// Zmeniť pozíciu na stránke produktu
add_filter('polski/trust_badges/product_hook', function (): string {
    return 'woocommerce_after_add_to_cart_form'; // predvolene: woocommerce_product_meta_end
});
```

### CSS triedy

- `.polski-trust-badges` - hlavný kontajner
- `.polski-trust-badge` - jednotlivý znak
- `.polski-trust-badge__icon` - SVG ikona
- `.polski-trust-badge__title` - text pod ikonou

```css
.polski-trust-badges {
    display: flex;
    gap: 1rem;
    justify-content: center;
    padding: 1rem 0;
    border-top: 1px solid #e5e7eb;
}
```

### ID modulu

`trust_badges`

## Riešenie problémov

**Znaky sa nezobrazujú** - skontrolujte, či šablóna podporuje hooky WooCommerce na stránke produktu (`woocommerce_product_meta_end`) a košíka (`woocommerce_after_cart_totals`).

**Ikony sú príliš malé/príliš veľké** - prepíšte veľkosť v CSS: `.polski-trust-badge__icon svg { width: 40px; height: 40px; }`.

Hlásenie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informatívny charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
