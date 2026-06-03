---
title: Jednotková cena
description: Zobrazovanie ceny za kilogram, liter, meter alebo kus vo WooCommerce v súlade s poľským spotrebiteľským právom.
---

Poľské právo vyžaduje, aby internetový obchod zobrazoval jednotkovú cenu produktu - napr. cenu za kilogram, liter alebo meter. Plugin Polski for WooCommerce pridáva túto informáciu automaticky na stránku produktu, do zoznamu a do košíka.

## Kedy je jednotková cena vyžadovaná

Jednotkovú cenu uvádzate pre produkty predávané na váhu, objem alebo dĺžku. Týka sa to okrem iného:

- potravinové produkty (cena za kg alebo liter)
- kozmetika a čistiace prostriedky (cena za 100 ml alebo liter)
- stavebné materiály (cena za bežný meter alebo štvorcový meter)
- sypké produkty (cena za kg)

Jednotková cena musí byť viditeľná všade, kde zobrazujete cenu produktu - na stránke produktu, vo výsledkoch vyhľadávania, v porovnávačoch a v košíku.

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski > Ceny** a zapnite modul jednotkovej ceny. Po zapnutí sa v editore produktu objaví nová sekcia v záložke "Všeobecné".

### Polia v editore produktu

| Pole | Popis | Príklad |
|------|------|---------|
| Základné množstvo | Množstvo produktu v balení | `500` |
| Základná jednotka | Merná jednotka produktu | `g` |
| Referenčné množstvo | Referenčné množstvo pre jednotkovú cenu | `1` |
| Referenčná jednotka | Jednotka, za ktorú sa uvádza cena | `kg` |

Pre produkt s hmotnosťou 500 g a cenou 12,99 zł plugin automaticky vypočíta jednotkovú cenu ako 25,98 zł/kg.

### Podporované jednotky

Plugin podporuje tieto merné jednotky:

- **Hmotnosť:** g, kg, mg
- **Objem:** ml, l, cl
- **Dĺžka:** mm, cm, m
- **Kusy:** szt (piece)

Plugin prepočítava jednotky automaticky. Ak má produkt hmotnosť v gramoch a referenčná jednotka je kilogram - hodnota sa prepočíta.

## Varianty produktov

Pre variabilné produkty nastavujete jednotkovú cenu na dvoch úrovniach:

1. **Na úrovni hlavného produktu** - hodnota dedená všetkými variantmi
2. **Na úrovni variantu** - prepisuje nastavenia hlavného produktu

Ak majú varianty rôznu hmotnosť (napr. 250 g a 500 g), nastavte jednotkovú cenu zvlášť pre každý variant. Plugin automaticky aktualizuje cenu, keď zákazník zmení variant (AJAX).

## Shortcode

Použite shortcode `[polski_unit_price]`, aby ste zobrazili jednotkovú cenu na ľubovoľnom mieste.

### Parametre

| Parameter | Typ | Predvolený | Popis |
|----------|-----|----------|------|
| `product_id` | int | aktuálny | ID produktu |
| `before` | string | `""` | Text pred cenou |
| `after` | string | `""` | Text po cene |
| `wrapper` | string | `span` | Obaľujúci HTML element |

### Príklady použitia

Základné použitie na stránke produktu:

```html
[polski_unit_price]
```

S vlastným ID produktu a textom:

```html
[polski_unit_price product_id="123" before="Cena za kg: " after=" brutto"]
```

V šablóne PHP:

```php
echo do_shortcode('[polski_unit_price product_id="' . $product->get_id() . '"]');
```

## Hook: polski/price/unit_price_html

Filter umožňuje zmeniť HTML jednotkovej ceny pred zobrazením.

### Signatúra

```php
apply_filters('polski/price/unit_price_html', string $html, float $unit_price, WC_Product $product, array $args): string
```

### Parametre

| Parameter | Typ | Popis |
|----------|-----|------|
| `$html` | string | Vygenerovaný HTML jednotkovej ceny |
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

Jednotkovú cenu importujete cez štandardný importér WooCommerce. Pridajte tieto stĺpce do súboru CSV:

| Stĺpec CSV | Popis |
|-------------|------|
| `polski_unit_base_qty` | Základné množstvo |
| `polski_unit_base_unit` | Základná jednotka |
| `polski_unit_ref_qty` | Referenčné množstvo |
| `polski_unit_ref_unit` | Referenčná jednotka |

Príklad riadku CSV:

```csv
"Kawa mielona 500g",29.99,500,g,1,kg
```

## Najčastejšie problémy

### Jednotková cena sa nezobrazuje

Skontrolujte, či:

1. Modul jednotkovej ceny je zapnutý v nastaveniach
2. Produkt má vyplnené polia základného množstva a jednotky
3. Šablóna podporuje hook `woocommerce_after_shop_loop_item_title` (zoznam) a `woocommerce_single_product_summary` (stránka produktu)

### Nesprávny prepočet

Skontrolujte, či sú základná a referenčná jednotka z rovnakej kategórie (napr. obe hmotnostné alebo obe objemové). Plugin neprepočítava gramy na litre.

## Súvisiace zdroje

- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informatívny charakter a nepredstavuje právnu radu. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
