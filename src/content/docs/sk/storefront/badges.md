---
title: Etikety produktov
description: Modul etikiet v Polski for WooCommerce - automatické odznaky (výpredaj, novinka, nízky stav, bestseller) a ručné etikety per produkt.
---

Etikety (badges) sú farebné odznaky zobrazované na fotografiách produktov. Pomáhajú zákazníkom rýchlo identifikovať produkty v akcii, novinky, bestsellery a produkty s nízkym stavom skladu.

## Zapnutie modulu

Prejdite do **WooCommerce > Polski > Obchodné moduly** a aktivujte možnosť **Etikety produktov**. Modul nahradí predvolený odznak WooCommerce "Výpredaj!" vlastnými, konfigurovateľnými etiketami.

## Automatické etikety

Automatické etikety sú generované na základe údajov produktu. Nevyžadujú ručnú konfiguráciu - po zapnutí fungujú okamžite na všetkých produktoch.

### Výpredaj (sale)

Zobrazovaná keď produkt má nastavenú akčnú cenu. Štandardne zobrazuje percento zľavy (napr. **-25%**) namiesto štandardného textu "Výpredaj!".

Konfigurácia formátu:

| Možnosť        | Popis                             | Príklad      |
| -------------- | -------------------------------- | ------------- |
| Percento       | Percento zľavy                    | -25%          |
| Suma           | Suma úspory                       | -50 PLN       |
| Text           | Vlastný text                      | Akcia         |
| Percento + suma| Obe hodnoty                       | -25% (-50 PLN)|

```php
// Zmena formátu odznaku výpredaja
add_filter('polski/badges/sale_format', function (): string {
    return 'percentage'; // 'percentage', 'amount', 'text', 'both'
});
```

Pre variantné produkty sa percento počíta na základe variantu s najväčšou zľavou.

### Novinka (new)

Zobrazovaná na produktoch pridaných v priebehu posledných X dní. Štandardne **14 dní**.

```php
// Zmena obdobia novinky
add_filter('polski/badges/new_days', function (): int {
    return 30; // produkty pridané za posledných 30 dní
});
```

### Nízky stav skladu (low stock)

Zobrazovaná keď množstvo produktu na sklade klesne pod stanovený prah. Predvolený prah je hodnota nastavená vo WooCommerce (**WooCommerce > Nastavenia > Produkty > Sklad > Prah nízkeho stavu**).

Obsah etikety: **Posledných X kusov!** (kde X je aktuálne množstvo).

```php
// Vlastný text etikety nízkeho stavu
add_filter('polski/badges/low_stock_text', function (string $text, int $stock): string {
    if ($stock <= 3) {
        return 'Posledné kusy!';
    }
    return sprintf('Zostáva %d ks', $stock);
}, 10, 2);
```

### Bestseller

Zobrazovaná na produktoch s najväčším počtom predajov. Štandardne top **10 produktov** v obchode.

```php
// Zmena limitu bestsellerov
add_filter('polski/badges/bestseller_limit', function (): int {
    return 20;
});
```

Výpočet bestsellerov je cachovaný v transient API (štandardne 24 hodín).

## Ručné etikety (per produkt)

Okrem automatických etikiet môžete pridávať vlastné odznaky k jednotlivým produktom. V editore produktu v paneli **Údaje produktu** nájdete záložku **Etikety**.

Možnosti ručnej etikety:

- **Text** - obsah zobrazený na odznaku (napr. "Odporúčame", "Eco", "Doprava zdarma")
- **Farba pozadia** - farba odznaku (color picker)
- **Farba textu** - farba textu na odznaku
- **Pozícia** - ľavý hore, pravý hore, ľavý dole, pravý dole
- **Priorita** - poradie zobrazovania keď má produkt viacero etikiet

Maximálny počet etikiet na jednom produkte je **4** (automatické + ručné dohromady). Tento limit zabraňuje zahlcovaniu miniatúry.

```php
// Zmena limitu etikiet na produkte
add_filter('polski/badges/max_per_product', function (): int {
    return 3;
});
```

## Poziciovanie etikiet

Automatické etikety majú predvolené pozície:

| Etiketa      | Predvolená pozícia |
| ------------ | ---------------- |
| Výpredaj     | Ľavý hore       |
| Novinka      | Pravý hore      |
| Nízky stav   | Ľavý dole       |
| Bestseller   | Pravý hore      |

Pozície konfigurujete v nastaveniach modulu. Ak dve etikety majú rovnakú pozíciu, ukladajú sa zvisle jedna pod druhou.

## Tvary etikiet

Dostupné tvary:

- **Obdĺžnik** - predvolený
- **Obdĺžnik so zaoblenými rohmi** - border-radius
- **Kruh** - pre krátke texty (napr. "-25%")
- **Stuha** - dekoratívny tvar so skosom

Konfigurácia v nastaveniach: **WooCommerce > Polski > Obchodné moduly > Etikety > Tvar**.

## Viditeľnosť etikiet

Etikety sa zobrazujú na:

- Stránkach kategórií a archívov (karty produktov)
- Stránke jednotlivého produktu (hlavná fotografia)
- Slideri produktov (modul slider)
- Rýchlom náhľade (modul quick view)
- Výsledkoch vyhľadávania

Môžete vypnúť etikety pre vybrané lokality:

```php
// Vypnutie etikiet na stránke jednotlivého produktu
add_filter('polski/badges/show_on_single', '__return_false');
```

## Etikety pre variantné produkty

Pre variantné produkty (variable products):

- **Výpredaj** - zobrazuje najväčšie percento zľavy spomedzi všetkých variantov
- **Nízky stav** - zobrazuje sa keď aspoň jeden variant má nízky stav
- **Novinka** - na základe dátumu pridania produktu (nie variantu)

## Štýlovanie CSS

CSS triedy:

- `.polski-badge` - základná trieda etikety
- `.polski-badge--sale` - výpredaj
- `.polski-badge--new` - novinka
- `.polski-badge--low-stock` - nízky stav
- `.polski-badge--bestseller` - bestseller
- `.polski-badge--custom` - ručná etiketa
- `.polski-badge--top-left` - pozícia ľavý hore
- `.polski-badge--top-right` - pozícia pravý hore
- `.polski-badge--bottom-left` - pozícia ľavý dole
- `.polski-badge--bottom-right` - pozícia pravý dole
- `.polski-badge--rectangle` - obdĺžnikový tvar
- `.polski-badge--circle` - kruhový tvar
- `.polski-badge--ribbon` - tvar stuhy

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

Automatické etikety sú cachované v meta produktu (`_polski_badges_cache`) a aktualizované pri každom uložení produktu. Výpočet bestsellerov sa vykonáva raz za 24 hodín cez transient API.

## Riešenie problémov

**Etiketa výpredaja nezobrazuje percento** - skontrolujte, či bežná cena produktu je nastavená. Bez bežnej ceny percento nemôže byť vypočítané.

**Ručná etiketa sa nezobrazuje** - skontrolujte limit etikiet na produkte. Ak produkt už má 4 automatické etikety, ručná sa nezobrazí.

**Etikety zakrývajú tlačidlo rýchleho náhľadu** - zmeňte pozíciu etikiet alebo tlačidla quick view v nastaveniach modulov.

Nahlasovanie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
