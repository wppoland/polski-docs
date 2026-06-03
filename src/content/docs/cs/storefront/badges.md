---
title: Štítky produktů
description: Modul štítků v Polski for WooCommerce - automatické odznaky (výprodej, novinka, nízká zásoba, bestseller) a ruční štítky pro jednotlivé produkty.
---

Štítky (badges) jsou barevné odznaky na fotografiích produktů. Pomáhají zákazníkům rychle rozpoznat akce, novinky, bestsellery a produkty s nízkou zásobou.

## Zapnutí modulu

Přejděte do **WooCommerce > Polski > Moduly obchodu** a zapněte **Štítky produktů**. Modul nahradí výchozí odznak "Výprodej!" konfigurovatelnými štítky.

## Automatické štítky

Generují se automaticky na základě dat produktu. Po zapnutí fungují okamžitě na všech produktech.

### Výprodej (sale)

Zobrazuje se, když má produkt akční cenu. Ve výchozím nastavení ukazuje procento slevy (např. **-25%**) místo textu "Výprodej!".

Konfigurace formátu:

| Možnost        | Popis                            | Příklad       |
| -------------- | -------------------------------- | ------------- |
| Procento       | Procento slevy                   | -25%          |
| Částka         | Ušetřená částka                  | -50 Kč        |
| Text           | Vlastní text                     | Akce          |
| Procento + částka| Obě hodnoty                    | -25% (-50 Kč) |

```php
// Změna formátu odznaku výprodeje
add_filter('polski/badges/sale_format', function (): string {
    return 'percentage'; // 'percentage', 'amount', 'text', 'both'
});
```

U variabilních produktů se procento počítá z varianty s největší slevou.

### Novinka (new)

Zobrazuje se na produktech přidaných během posledních X dní. Výchozí hodnota je **14 dní**.

```php
// Změna období novinky
add_filter('polski/badges/new_days', function (): int {
    return 30; // produkty přidané během posledních 30 dní
});
```

### Nízká zásoba (low stock)

Zobrazuje se, když stav zásob klesne pod práh. Práh nastavíte v **WooCommerce > Nastavení > Produkty > Sklad > Práh nízké zásoby**.

Obsah štítku: **Posledních X kusů!** (kde X je aktuální množství).

```php
// Vlastní text štítku nízké zásoby
add_filter('polski/badges/low_stock_text', function (string $text, int $stock): string {
    if ($stock <= 3) {
        return 'Poslední kusy!';
    }
    return sprintf('Zbývá %d ks', $stock);
}, 10, 2);
```

### Bestseller

Zobrazuje se na nejprodávanějších produktech. Výchozí top **10 produktů**.

```php
// Změna limitu bestsellerů
add_filter('polski/badges/bestseller_limit', function (): int {
    return 20;
});
```

Seznam bestsellerů se ukládá do transient API (výchozí 24 hodin).

## Ruční štítky (pro jednotlivé produkty)

Můžete také přidávat vlastní odznaky k jednotlivým produktům. V editoru produktu otevřete **Data produktu > Štítky**.

Možnosti ručního štítku:

- **Text** - obsah zobrazený na odznaku (např. "Doporučujeme", "Eco", "Doprava zdarma")
- **Barva pozadí** - barva odznaku (color picker)
- **Barva textu** - barva textu na odznaku
- **Pozice** - vlevo nahoře, vpravo nahoře, vlevo dole, vpravo dole
- **Priorita** - pořadí zobrazení, když má produkt více štítků

Maximálně **4** štítky na produkt (automatické + ruční dohromady). Limit chrání miniaturu před zahlcením.

```php
// Změna limitu štítků na produkt
add_filter('polski/badges/max_per_product', function (): int {
    return 3;
});
```

## Umístění štítků

Automatické štítky mají výchozí pozice:

| Štítek       | Výchozí pozice   |
| ------------ | ---------------- |
| Výprodej     | Vlevo nahoře     |
| Novinka      | Vpravo nahoře    |
| Nízká zásoba | Vlevo dole       |
| Bestseller   | Vpravo nahoře    |

Pozice změňte v nastavení modulu. Dva štítky ve stejné pozici se uspořádají svisle.

## Tvary štítků

Dostupné tvary:

- **Obdélník** - výchozí
- **Obdélník se zaoblenými rohy** - border-radius
- **Kruh** - pro krátké texty (např. "-25%")
- **Stuha** - dekorativní tvar se zkosením

Konfigurace v nastavení: **WooCommerce > Polski > Moduly obchodu > Štítky > Tvar**.

## Viditelnost štítků

Štítky se zobrazují na:

- Stránkách kategorií a archivů (karty produktů)
- Stránce jednotlivého produktu (hlavní fotografie)
- Slideru produktů (modul slider)
- Rychlém náhledu (modul quick view)
- Výsledcích vyhledávání

Můžete vypnout štítky pro vybrané umístění:

```php
// Vypnutí štítků na stránce jednotlivého produktu
add_filter('polski/badges/show_on_single', '__return_false');
```

## Štítky pro variabilní produkty

Pro variabilní produkty (variable products):

- **Výprodej** - ukazuje největší procento slevy ze všech variant
- **Nízká zásoba** - zobrazuje se, když má alespoň jedna varianta nízkou zásobu
- **Novinka** - na základě data přidání produktu (nikoli varianty)

## Stylování CSS

CSS třídy:

- `.polski-badge` - základní třída štítku
- `.polski-badge--sale` - výprodej
- `.polski-badge--new` - novinka
- `.polski-badge--low-stock` - nízká zásoba
- `.polski-badge--bestseller` - bestseller
- `.polski-badge--custom` - ruční štítek
- `.polski-badge--top-left` - pozice vlevo nahoře
- `.polski-badge--top-right` - pozice vpravo nahoře
- `.polski-badge--bottom-left` - pozice vlevo dole
- `.polski-badge--bottom-right` - pozice vpravo dole
- `.polski-badge--rectangle` - obdélníkový tvar
- `.polski-badge--circle` - tvar kruhu
- `.polski-badge--ribbon` - tvar stuhy

Příklad stylování:

```css
.polski-badge--sale {
    background-color: #dc2626;
    color: #ffffff;
    font-weight: 700;
    font-size: 0.75rem;
    padding: 4px 8px;
}
```

## Výkon

Štítky se ukládají do meta produktu (`_polski_badges_cache`) a aktualizují se při uložení produktu. Bestsellery se přepočítávají jednou za 24 hodin (transient API).

## Řešení problémů

**Štítek výprodeje nezobrazuje procento** - zkontrolujte, zda má produkt nastavenou běžnou cenu. Bez ní nelze procento vypočítat.

**Ruční štítek se nezobrazuje** - zkontrolujte limit štítků. Pokud má produkt již 4 štítky, ruční se nezobrazí.

**Štítky zakrývají tlačítko rychlého náhledu** - změňte pozici štítků nebo tlačítka quick view v nastavení.

Hlášení problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je software s otevřeným zdrojovým kódem (GPLv2) poskytovaný bez záruky.</div>
