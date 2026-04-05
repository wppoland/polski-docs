---
title: Jednotková cena
description: Zobrazenie ceny za kilogram, liter, meter alebo kus vo WooCommerce v súlade s poľským spotrebiteľským právom.
---

Poľské právo vyžaduje, aby obchod zobrazoval jednotkovú cenu produktu - napr. cenu za kilogram, liter alebo meter. Plugin Polski for WooCommerce pridáva túto informáciu automaticky na stránke produktu, v zoznamoch a v košíku.

## Kedy je jednotková cena vyžadovaná

Povinnosť uvádzať jednotkovú cenu sa týka produktov predávaných na hmotnosť, objem alebo dĺžku. V praxi to zahŕňa:

- potravinárske produkty (cena za kg alebo liter)
- kozmetiku a čistiace prostriedky (cena za 100 ml alebo liter)
- stavebné materiály (cena za bežný meter alebo štvorcový meter)
- sypké produkty (cena za kg)

Jednotková cena musí byť viditeľná na každom mieste, kde je prezentovaná cena produktu - na stránke produktu, vo výsledkoch vyhľadávania, v cenových porovnávačoch a v košíku.

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski > Ceny** a zapnite modul jednotkovej ceny. Po aktivácii sa v editore produktu zobrazí nová sekcia v záložke "Všeobecné".

### Polia v editore produktu

| Pole | Popis | Príklad |
|------|------|---------|
| Základné množstvo | Množstvo produktu v balení | `500` |
| Základná jednotka | Merná jednotka produktu | `g` |
| Referenčné množstvo | Referenčné množstvo pre jednotkovú cenu | `1` |
| Referenčná jednotka | Jednotka, za ktorú je uvádzaná cena | `kg` |

Pre produkt s hmotnosťou 500 g a cenou 12,99 PLN plugin automaticky vypočíta jednotkovú cenu ako 25,98 PLN/kg.

### Podporované jednotky

Plugin podporuje nasledujúce merné jednotky:

- **Hmotnosť:** g, kg, mg
- **Objem:** ml, l, cl
- **Dĺžka:** mm, cm, m
- **Kusy:** szt (kus)

Prepočet medzi jednotkami prebieha automaticky. Ak má produkt hmotnosť v gramoch a referenčná jednotka je kilogram, plugin sám prepočíta hodnotu.

## Varianty produktov

Pre variantné produkty (variable products) je možné nastaviť jednotkovú cenu na dvoch úrovniach:

1. **Na úrovni hlavného produktu** - hodnota zdedená všetkými variantmi
2. **Na úrovni variantu** - prepíše nastavenia hlavného produktu

V prípade variantov s rôznou hmotnosťou (napr. balenie 250 g a 500 g) nastavte jednotkovú cenu zvlášť pre každý variant. Plugin automaticky aktualizuje zobrazenú cenu pri zmene variantu zákazníkom (AJAX).

## Shortcód

Použite shortcód `[polski_unit_price]` na zobrazenie jednotkovej ceny na ľubovoľnom mieste.

### Parametre

| Parameter | Typ | Predvolený | Popis |
|----------|-----|----------|------|
| `product_id` | int | aktuálny | ID produktu |
| `before` | string | `""` | Text pred cenou |
| `after` | string | `""` | Text za cenou |
| `wrapper` | string | `span` | Obaľujúci HTML prvok |

### Príklady použitia

Základné použitie na stránke produktu:

```html
[polski_unit_price]
```

S vlastným ID produktu a textom:

```html
[polski_unit_price product_id="123" before="Cena za kg: " after=" brutto"]
```

V PHP šablóne:

```php
echo do_shortcode('[polski_unit_price product_id="' . $product->get_id() . '"]');
```

## Hook: polski/price/unit_price_html

Tento filter umožňuje upraviť HTML jednotkovej ceny pred zobrazením.

### Signatúra

```php
apply_filters('polski/price/unit_price_html', string $html, float $unit_price, WC_Product $product, array $args): string
```

### Parametre

| Parameter | Typ | Popis |
|----------|-----|------|
| `$html` | string | Vygenerované HTML jednotkovej ceny |
| `$unit_price` | float | Vypočítaná jednotková cena |
| `$product` | WC_Product | Objekt produktu WooCommerce |
| `$args` | array | Pole s kľúčmi: `base_qty`, `base_unit`, `ref_qty`, `ref_unit` |

### Príklad: pridanie CSS triedy

```php
add_filter('polski/price/unit_price_html', function (string $html, float $unit_price, WC_Product $product, array $args): string {
    $category_class = '';
    if (has_term('napoje', 'product_cat', $product->get_id())) {
        $category_class = ' polski-unit-price--beverage';
    }

    return sprintf(
        '<span class="polski-unit-price%s">%s/%s</span>',
        esc_attr($category_class),
        wc_price($unit_price),
        esc_html($args['ref_unit'])
    );
}, 10, 4);
```

### Príklad: skrytie jednotkovej ceny pre vybrané kategórie

```php
add_filter('polski/price/unit_price_html', function (string $html, float $unit_price, WC_Product $product): string {
    if (has_term('uslugi', 'product_cat', $product->get_id())) {
        return '';
    }

    return $html;
}, 10, 3);
```

## Import CSV

Jednotkovú cenu je možné importovať pomocou štandardného importéra WooCommerce. Pridajte nasledujúce stĺpce do súboru CSV:

| Stĺpec CSV | Popis |
|-------------|------|
| `polski_unit_base_qty` | Základné množstvo |
| `polski_unit_base_unit` | Základná jednotka |
| `polski_unit_ref_qty` | Referenčné množstvo |
| `polski_unit_ref_unit` | Referenčná jednotka |

Príkladný riadok CSV:

```csv
"Kawa mielona 500g",29.99,500,g,1,kg
```

## Najčastejšie problémy

### Jednotková cena sa nezobrazuje

Skontrolujte, či:

1. Modul jednotkovej ceny je zapnutý v nastaveniach
2. Produkt má vyplnené polia základného množstva a jednotky
3. Téma podporuje hook `woocommerce_after_shop_loop_item_title` (zoznam) a `woocommerce_single_product_summary` (stránka produktu)

### Nesprávny prepočet

Uistite sa, že základná a referenčná jednotka patria do rovnakej kategórie (napr. obidve hmotnostné alebo obidve objemové). Plugin neprepočítava medzi kategóriami - nie je možné prepočítať gramy na litre.

## Súvisiace zdroje

- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
