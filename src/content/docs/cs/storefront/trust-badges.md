---
title: Značky důvěry (trust badges)
description: Modul značek důvěry v Polski for WooCommerce - konfigurovatelné signály důvěry na stránkách produktu, košíku a objednávky.
---

Značky důvěry jsou grafické prvky informující zákazníky o bezpečných platbách, rychlém dodání, možnosti vrácení a záruce kvality. Pomáhají zvýšit konverzi budováním důvěry v klíčových okamžicích nákupní cesty.

## Zapnutí modulu

Přejděte do **WooCommerce > Polski > Moduly obchodu** a zapněte **Značky důvěry**. Ikony se objeví automaticky na stránkách produktu, košíku a objednávky.

## Funkce

- Konfigurovatelné signály důvěry s inline SVG ikonami
- Zobrazení na stránkách produktu, košíku a souhrnu objednávky
- 7 typů ikon: zámek (lock), nákladní auto (truck), obnovení (refresh), štít (shield), hvězdička (star), fajfka (check), srdce (heart)
- Vlastní texty pod každou značkou
- Čisté CSS bez externích závislostí
- Responzivní uspořádání na mobilních zařízeních

## Nastavení

Konfigurace v **WooCommerce > Polski > Moduly obchodu > Značky důvěry**.

| Nastavení | Výchozí | Popis |
|---|---|---|
| `show_on_product` | `true` | Zobrazovat značky na stránce produktu |
| `show_on_cart` | `true` | Zobrazovat značky na stránce košíku |
| `show_on_checkout` | `true` | Zobrazovat značky na stránce objednávky |

Každou značku lze individuálně zapnout/vypnout a nakonfigurovat:

- **Ikona** - výběr ze 7 dostupných typů
- **Titulek** - krátký text pod ikonou (např. "Bezpečná platba")
- **Pořadí** - pozice vůči ostatním značkám

Možnost v databázi: `polski_trust_badges`.

## Výchozí značky

Po zapnutí modulu jsou dostupné 4 předdefinované značky:

| Značka | Ikona | Výchozí text |
|---|---|---|
| Bezpečná platba | lock | Šifrované připojení SSL |
| Rychlé dodání | truck | Odeslání do 24 h |
| Vrácení | refresh | 14 dní na vrácení |
| Záruka kvality | shield | Originální produkty |

## Technické podrobnosti

### SVG ikony

Všechny ikony jsou vykreslovány jako inline SVG - žádné HTTP dotazy, žádné závislosti na knihovnách ikon. Každá ikona má velikost 32x32px a dědí barvu z CSS.

### Hooky

```php
// Filtr seznamu značek
add_filter('polski/trust_badges/items', function (array $badges): array {
    // Přidání vlastní značky
    $badges[] = [
        'icon'  => 'star',
        'title' => 'Více než 1000 recenzí',
    ];
    return $badges;
});

// Změna pozice na stránce produktu
add_filter('polski/trust_badges/product_hook', function (): string {
    return 'woocommerce_after_add_to_cart_form'; // výchozí: woocommerce_product_meta_end
});
```

### CSS třídy

- `.polski-trust-badges` - hlavní kontejner
- `.polski-trust-badge` - jednotlivá značka
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

## Řešení problémů

**Značky se nezobrazují** - zkontrolujte, zda šablona podporuje hooky WooCommerce na stránce produktu (`woocommerce_product_meta_end`) a košíku (`woocommerce_after_cart_totals`).

**Ikony jsou příliš malé/velké** - přepište velikost v CSS: `.polski-trust-badge__icon svg { width: 40px; height: 40px; }`.

Hlášení problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
