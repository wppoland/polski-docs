---
title: Štítky produktov
description: Modul štítkov v Polski for WooCommerce - automatické odznaky (výpredaj, novinka, nízky stav, bestseller) a ručné štítky pre jednotlivé produkty.
---

Štítky (badges) sú farebné odznaky na fotkách produktov. Pomáhajú zákazníkom rýchlo rozpoznať akcie, novinky, bestsellery a produkty s nízkym stavom.

## Zapnutie modulu

Prejdite do **WooCommerce > Polski > Moduly obchodu** a zapnite **Štítky produktov**. Modul nahradí predvolený odznak "Výpredaj!" konfigurovateľnými štítkami.

## Automatické štítky

Generujú sa automaticky na základe údajov produktu. Po zapnutí fungujú okamžite na všetkých produktoch.

### Výpredaj (sale)

Zobrazí sa, keď má produkt akciovú cenu. Predvolene zobrazuje percento zľavy (napr. **-25%**) namiesto textu "Výpredaj!".

Konfigurácia formátu:

| Možnosť        | Popis                            | Príklad       |
| -------------- | -------------------------------- | ------------- |
| Percento       | Percento zľavy                   | -25%          |
| Suma           | Výška úspory                     | -50 zł        |
| Text           | Vlastný text                     | Akcia         |
| Percento + suma| Obe hodnoty                      | -25% (-50 zł) |

```php
// Zmena formátu odznaku výpredaja
add_filter('polski/badges/sale_format', function (): string {
    return 'percentage'; // 'percentage', 'amount', 'text', 'both'
});
```

Pre variabilné produkty sa percento počíta z variantu s najväčšou zľavou.

### Novinka (new)

Zobrazí sa na produktoch pridaných počas posledných X dní. Predvolene **14 dní**.

```php
// Zmena obdobia novinky
add_filter('polski/badges/new_days', function (): int {
    return 30; // produkty pridané počas posledných 30 dní
});
```

### Nízky stav zásob (low stock)

Zobrazí sa, keď stav zásob klesne pod prahovú hodnotu. Prahovú hodnotu nastavíte v **WooCommerce > Nastavenia > Produkty > Sklad > Prah nízkeho stavu**.

Obsah štítku: **Posledných X kusov!** (kde X je aktuálne množstvo).

```php
// Vlastný text štítku nízkeho stavu
add_filter('polski/badges/low_stock_text', function (string $text, int $stock): string {
    if ($stock <= 3) {
        return 'Posledné kusy!';
    }
    return sprintf('Zostáva %d ks.', $stock);
}, 10, 2);
```

### Bestseller

Zobrazí sa na najpredávanejších produktoch. Predvolene top **10 produktov**.

```php
// Zmena limitu bestsellerov
add_filter('polski/badges/bestseller_limit', function (): int {
    return 20;
});
```

Zoznam bestsellerov sa ukladá do transient API (predvolene 24 hodín).

## Ručné štítky (pre jednotlivé produkty)

Môžete tiež pridávať vlastné odznaky k jednotlivým produktom. V editore produktu otvorte **Údaje produktu > Štítky**.

Možnosti ručného štítku:

- **Text** - obsah zobrazený na odznaku (napr. "Odporúčame", "Eco", "Doprava zdarma")
- **Farba pozadia** - farba odznaku (color picker)
- **Farba textu** - farba textu na odznaku
- **Pozícia** - vľavo hore, vpravo hore, vľavo dole, vpravo dole
- **Priorita** - poradie zobrazenia, keď má produkt viac štítkov

Maximálne **4** štítky na produkte (automatické + ručné spolu). Limit chráni náhľad pred zahltením.

```php
// Zmena limitu štítkov na produkte
add_filter('polski/badges/max_per_product', function (): int {
    return 3;
});
```

## Umiestnenie štítkov

Automatické štítky majú predvolené pozície:

| Štítok       | Predvolená pozícia |
| ------------ | ------------------ |
| Výpredaj     | Vľavo hore         |
| Novinka      | Vpravo hore        |
| Nízky stav   | Vľavo dole         |
| Bestseller   | Vpravo hore        |

Pozície zmeníte v nastaveniach modulu. Dva štítky v rovnakej pozícii sa zoradia zvisle.

## Tvary štítkov

Dostupné tvary:

- **Obdĺžnik** - predvolený
- **Obdĺžnik so zaoblenými rohmi** - border-radius
- **Kruh** - pre krátke texty (napr. "-25%")
- **Stužka** - dekoratívny tvar so skosením

Konfigurácia v nastaveniach: **WooCommerce > Polski > Moduly obchodu > Štítky > Tvar**.

## Viditeľnosť štítkov

Štítky sa zobrazujú na:

- Stránkach kategórií a archívov (karty produktov)
- Stránke jednotlivého produktu (hlavná fotka)
- Slideri produktov (modul slider)
- Rýchlom náhľade (modul quick view)
- Výsledkoch vyhľadávania

Štítky môžete vypnúť pre vybrané miesta:

```php
// Vypnutie štítkov na stránke jednotlivého produktu
add_filter('polski/badges/show_on_single', '__return_false');
```

## Štítky pre variabilné produkty

Pre variabilné produkty (variable products):

- **Výpredaj** - zobrazuje najväčšie percento zľavy spomedzi všetkých variantov
- **Nízky stav** - zobrazí sa, keď má aspoň jeden variant nízky stav
- **Novinka** - na základe dátumu pridania produktu (nie variantu)

## Štýlovanie CSS

CSS triedy:

- `.polski-badge` - základná trieda štítku
- `.polski-badge--sale` - výpredaj
- `.polski-badge--new` - novinka
- `.polski-badge--low-stock` - nízky stav
- `.polski-badge--bestseller` - bestseller
- `.polski-badge--custom` - ručný štítok
- `.polski-badge--top-left` - pozícia vľavo hore
- `.polski-badge--top-right` - pozícia vpravo hore
- `.polski-badge--bottom-left` - pozícia vľavo dole
- `.polski-badge--bottom-right` - pozícia vpravo dole
- `.polski-badge--rectangle` - obdĺžnikový tvar
- `.polski-badge--circle` - tvar kruhu
- `.polski-badge--ribbon` - tvar stužky

Príklad štýlovania:

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

Štítky sa ukladajú do meta produktu (`_polski_badges_cache`) a aktualizujú sa pri uložení produktu. Bestsellery sa prepočítavajú raz za 24 hodín (transient API).

## Riešenie problémov

**Štítok výpredaja nezobrazuje percento** - skontrolujte, či má produkt nastavenú bežnú cenu. Bez nej nie je možné vypočítať percento.

**Ručný štítok sa nezobrazuje** - skontrolujte limit štítkov. Ak má produkt už 4 štítky, ručný sa nezobrazí.

**Štítky zakrývajú tlačidlo rýchleho náhľadu** - zmeňte pozíciu štítkov alebo tlačidla quick view v nastaveniach.

Nahlasovanie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informačný charakter a nepredstavuje právnu radu. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) dodávaný bez záruky.</div>
