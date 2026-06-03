---
title: Graf historie cen
description: Modul grafu historie cen v Polski for WooCommerce - SVG sparkline graf zobrazující změny cen produktu v čase.
---

Graf historie cen vizualizuje změny cen produktu ve formě kompaktního SVG sparkline grafu. Zákazníci vidí, jak se cena měnila ve vybraném období (30, 90 nebo 180 dní), což buduje transparentnost a důvěru v akce.

## Zapnutí modulu

Přejděte do **WooCommerce > Polski > Moduly obchodu** a zapněte **Graf historie cen**. Graf se objeví automaticky na stránkách produktů, které mají uloženou historii cen.

:::caution[Požadavek]
Modul vyžaduje zapnutý modul **Omnibus** (směrnice Omnibus), který ukládá historii cen do databáze. Bez něj nebude mít graf žádná data k zobrazení.
:::

## Funkce

- Sparkline graf renderovaný jako SVG (žádná závislost na JS knihovnách)
- Konfigurovatelná období: 30, 90 nebo 180 dní
- Zobrazení minimální a maximální ceny v období
- Gradientová výplň pod čárou grafu
- Tečka označující aktuální cenu
- Barvy grafu konfigurovatelné v nastavení
- Automatické získávání dat z repozitáře Omnibus

## Nastavení

Konfigurace v **WooCommerce > Polski > Moduly obchodu > Graf historie cen**.

| Nastavení | Výchozí | Popis |
|---|---|---|
| `days` | `30` | Období grafu ve dnech: `30`, `90` nebo `180` |
| `show_min_max` | `true` | Zobrazovat minimální a maximální cenu pod grafem |
| `color` | `#2563eb` | Barva čáry grafu a gradientu |

Volba v databázi: `polski_price_history`.

## Vzhled grafu

Graf se skládá z následujících prvků:

- **Čára** - průběh ceny v čase (stroke SVG)
- **Gradient** - poloprůhledná výplň od čáry k dolnímu okraji grafu
- **Tečka** - aktuální cena produktu (poslední bod na grafu)
- **Min/Max** - štítky s minimální a maximální cenou (volitelně)

Velikost grafu se přizpůsobuje kontejneru. Výchozí výška je 60px.

## Technické detaily

### Zdroj dat

Graf získává data z třídy `OmnibusPriceRepository`, která uchovává historii změn cen vyžadovanou směrnicí Omnibus. Každý datový bod obsahuje datum a cenu produktu.

Pro variabilní produkty se graf generuje pro aktuálně zvolenou variantu (aktualizace přes JavaScript po změně varianty).

### Renderování SVG

Graf je renderován na straně serveru jako inline SVG, žádné externí knihovny, žádné HTTP požadavky, žádný JavaScript pro vykreslování. Díky tomu graf:

- Zobrazuje se okamžitě (žádný flash of unstyled content)
- Je dostupný pro čtečky obrazovky (aria-label)
- Neovlivňuje Core Web Vitals

### Hooky

```php
// Změň období grafu dynamicky
add_filter('polski/price_history/days', function (int $days, int $product_id): int {
    // Delší období pro sezónní produkty
    if (has_term('sezonni', 'product_cat', $product_id)) {
        return 180;
    }
    return $days;
}, 10, 2);

// Změň pozici grafu na stránce produktu
add_filter('polski/price_history/hook', function (): string {
    return 'woocommerce_single_product_summary'; // výchozí: woocommerce_product_meta_start
});

// Změň prioritu hooku
add_filter('polski/price_history/hook_priority', function (): int {
    return 25;
});

// Filtruj data grafu
add_filter('polski/price_history/data', function (array $prices, int $product_id): array {
    return $prices;
}, 10, 2);
```

### CSS třídy

- `.polski-price-history` - hlavní kontejner
- `.polski-price-history__chart` - prvek SVG
- `.polski-price-history__label` - štítky min/max
- `.polski-price-history__min` - minimální cena
- `.polski-price-history__max` - maximální cena

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

## Řešení problémů

**Graf se nezobrazuje** - zkontrolujte, zda je zapnutý modul Omnibus a zda má produkt uloženou historii cen. Nové produkty nebudou mít graf do první změny ceny.

**Graf je prázdný/plochý** - pokud se cena ve vybraném období neměnila, graf zobrazuje plochou čáru. To je správné chování.

**Barvy grafu nepasují k šabloně** - změňte barvu v nastavení modulu nebo přepište v CSS: `.polski-price-history__chart path { stroke: #your-color; }`.

Hlášení problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je software s otevřeným zdrojovým kódem (GPLv2) poskytovaný bez záruky.</div>
