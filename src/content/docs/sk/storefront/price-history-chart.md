---
title: Graf histórie cien
description: Modul grafu histórie cien v Polski for WooCommerce - SVG sparkline graf zobrazujúci zmeny cien produktu v čase.
---

Graf histórie cien vizualizuje zmeny cien produktu vo forme kompaktného sparkline SVG grafu. Zákazníci vidia, ako sa cena menila vo vybranom období (30, 90 alebo 180 dní), čo buduje transparentnosť a dôveru v akcie.

## Zapnutie modulu

Prejdite do **WooCommerce > Polski > Moduly obchodu** a zapnite **Graf histórie cien**. Graf sa objaví automaticky na stránkach produktov, ktoré majú uloženú históriu cien.

:::caution[Požiadavka]
Modul vyžaduje zapnutý modul **Omnibus** (smernica Omnibus), ktorý ukladá históriu cien do databázy. Bez neho graf nebude mať dáta na zobrazenie.
:::

## Funkcie

- Sparkline graf vykreslený ako SVG (žiadna závislosť od JS knižníc)
- Konfigurovateľné obdobia: 30, 90 alebo 180 dní
- Zobrazenie minimálnej a maximálnej ceny v období
- Gradient výplne pod líniou grafu
- Bodka označujúca aktuálnu cenu
- Farby grafu konfigurovateľné v nastaveniach
- Automatické načítanie dát z repozitára Omnibus

## Nastavenia

Konfigurácia v **WooCommerce > Polski > Moduly obchodu > Graf histórie cien**.

| Nastavenie | Predvolene | Popis |
|---|---|---|
| `days` | `30` | Obdobie grafu v dňoch: `30`, `90` alebo `180` |
| `show_min_max` | `true` | Zobrazovať minimálnu a maximálnu cenu pod grafom |
| `color` | `#2563eb` | Farba línie grafu a gradientu |

Možnosť v databáze: `polski_price_history`.

## Vzhľad grafu

Graf sa skladá z nasledujúcich prvkov:

- **Línia** - priebeh ceny v čase (stroke SVG)
- **Gradient** - polopriehľadná výplň od línie po spodok grafu
- **Bodka** - aktuálna cena produktu (posledný bod na grafe)
- **Min/Max** - štítky s minimálnou a maximálnou cenou (voliteľne)

Veľkosť grafu sa prispôsobuje kontajneru. Predvolená výška je 60px.

## Technické detaily

### Zdroj dát

Graf načítava dáta z triedy `OmnibusPriceRepository`, ktorá uchováva históriu zmien cien vyžadovanú smernicou Omnibus. Každý dátový bod obsahuje dátum a cenu produktu.

Pre variabilné produkty sa graf generuje pre aktuálne vybraný variant (aktualizácia cez JavaScript po zmene variantu).

### Vykresľovanie SVG

Graf sa vykresľuje na strane servera ako inline SVG, žiadne externé knižnice, žiadne HTTP dopyty, žiadny JavaScript na kreslenie. Vďaka tomu graf:

- Zobrazí sa okamžite (žiadny flash of unstyled content)
- Je prístupný pre čítačky obrazovky (aria-label)
- Neovplyvňuje Core Web Vitals

### Hooky

```php
// Zmeň obdobie grafu dynamicky
add_filter('polski/price_history/days', function (int $days, int $product_id): int {
    // Dlhšie obdobie pre sezónne produkty
    if (has_term('sezonne', 'product_cat', $product_id)) {
        return 180;
    }
    return $days;
}, 10, 2);

// Zmeň pozíciu grafu na stránke produktu
add_filter('polski/price_history/hook', function (): string {
    return 'woocommerce_single_product_summary'; // predvolene: woocommerce_product_meta_start
});

// Zmeň prioritu hooku
add_filter('polski/price_history/hook_priority', function (): int {
    return 25;
});

// Filtruj dáta grafu
add_filter('polski/price_history/data', function (array $prices, int $product_id): array {
    return $prices;
}, 10, 2);
```

### CSS triedy

- `.polski-price-history` - hlavný kontajner
- `.polski-price-history__chart` - element SVG
- `.polski-price-history__label` - štítky min/max
- `.polski-price-history__min` - minimálna cena
- `.polski-price-history__max` - maximálna cena

```css
.polski-price-history {
    margin: 1rem 0;
    padding: 0.75rem;
    background: #f9fafb;
    border-radius: 0.5rem;
}
```

### ID modulu

`price_history_chart`

## Riešenie problémov

**Graf sa nezobrazuje** - skontrolujte, či je modul Omnibus zapnutý a či má produkt uloženú históriu cien. Nové produkty nebudú mať graf do prvej zmeny ceny.

**Graf je prázdny/plochý** - ak sa cena vo vybranom období nemenila, graf zobrazí plochú líniu. Toto je správne správanie.

**Farby grafu nesedia k šablóne** - zmeňte farbu v nastaveniach modulu alebo prepíšte v CSS: `.polski-price-history__chart path { stroke: #your-color; }`.

Nahlasovanie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informačný charakter a nepredstavuje právnu radu. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) dodávaný bez záruky.</div>
