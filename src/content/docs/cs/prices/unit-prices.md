---
title: Jednotkova cena
description: Zobrazovani ceny za kilogram, litr, metr nebo kus ve WooCommerce v souladu s polskym spotrebitelskym pravem.
---

Smernice 98/6/ES a polsky zakon o informovani o cenach zbozi a sluzeb vyzaduji, aby internetovy obchod uvadel jednotkovou cenu produktu - tedy cenu za kilogram, litr, bezny metr nebo kus. Plugin Polski for WooCommerce automatizuje tuto povinnost pridanim informace o jednotkove cene na strance produktu, v listinzich a v kosiku.

## Kdy je jednotkova cena vyzadovana

Povinnost uvadeni jednotkove ceny se tyka produktu prodavanych na vahu, objem nebo delku. V praxi to zahrnuje:

- potraviny (cena za kg nebo litr)
- kosmetiku a cistici prostredky (cena za 100 ml nebo litr)
- stavebni materialy (cena za bezny metr nebo ctverecni metr)
- sypke produkty (cena za kg)

Jednotkova cena musi byt viditelna na kazdem miste, kde je prezentovana cena produktu - na strance produktu, ve vysledcich vyhledavani, v cenových srovnavacich a v kosiku.

## Konfigurace

Prejdete do **WooCommerce > Nastaveni > Polski > Ceny** a aktivujte modul jednotkove ceny. Po aktivaci se v editoru produktu objevi nova sekce v zalozce "Obecne".

### Pole v editoru produktu

| Pole | Popis | Priklad |
|------|------|---------|
| Bazove mnozstvi | Mnozstvi produktu v baleni | `500` |
| Bazova jednotka | Merna jednotka produktu | `g` |
| Referencni mnozstvi | Referencni mnozstvi pro jednotkovou cenu | `1` |
| Referencni jednotka | Jednotka, za kterou se udava cena | `kg` |

Pro produkt o hmotnosti 500 g a cene 12,99 PLN plugin automaticky vypocita jednotkovou cenu jako 25,98 PLN/kg.

### Podporovane jednotky

Plugin podporuje nasledujici merne jednotky:

- **Hmotnost:** g, kg, mg
- **Objem:** ml, l, cl
- **Delka:** mm, cm, m
- **Kusy:** szt (kus)

Prepocet mezi jednotkami probiha automaticky. Pokud ma produkt hmotnost v gramech a referencni jednotka je kilogram, plugin sam prepocita hodnotu.

## Varianty produktu

Pro variantni produkty (variable products) lze jednotkovou cenu nastavit na dvou urovnich:

1. **Na urovni hlavniho produktu** - hodnota dedena vsemi variantami
2. **Na urovni varianty** - prepise nastaveni hlavniho produktu

V pripade variant o ruzne hmotnosti (napr. baleni 250 g a 500 g) nastavte jednotkovou cenu zvlast pro kazdou variantu. Plugin automaticky aktualizuje zobrazovanou cenu pri zmene varianty zakaznikem (AJAX).

## Shortcode

Pouzijte shortcode `[polski_unit_price]` pro zobrazeni jednotkove ceny na libovolnem miste.

### Parametry

| Parametr | Typ | Vychozi | Popis |
|----------|-----|----------|------|
| `product_id` | int | aktualni | ID produktu |
| `before` | string | `""` | Text pred cenou |
| `after` | string | `""` | Text za cenou |
| `wrapper` | string | `span` | Obalujici HTML element |

### Priklady pouziti

Zakladni pouziti na strance produktu:

```html
[polski_unit_price]
```

S vlastnim ID produktu a textem:

```html
[polski_unit_price product_id="123" before="Cena za kg: " after=" brutto"]
```

V sablone PHP:

```php
echo do_shortcode('[polski_unit_price product_id="' . $product->get_id() . '"]');
```

## Hook: polski/price/unit_price_html

Tento filtr umoznuje upravit HTML jednotkove ceny pred zobrazenim.

### Signatura

```php
apply_filters('polski/price/unit_price_html', string $html, float $unit_price, WC_Product $product, array $args): string
```

### Parametry

| Parametr | Typ | Popis |
|----------|-----|------|
| `$html` | string | Vygenerovany HTML jednotkove ceny |
| `$unit_price` | float | Vypocitana jednotkova cena |
| `$product` | WC_Product | Objekt produktu WooCommerce |
| `$args` | array | Pole s klici: `base_qty`, `base_unit`, `ref_qty`, `ref_unit` |

### Priklad: pridani CSS tridy

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

### Priklad: skryti jednotkove ceny pro vybrane kategorie

```php
add_filter('polski/price/unit_price_html', function (string $html, float $unit_price, WC_Product $product): string {
    if (has_term('uslugi', 'product_cat', $product->get_id())) {
        return '';
    }

    return $html;
}, 10, 3);
```

## CSV import

Jednotkovou cenu lze importovat pomoci standardniho importeru WooCommerce. Pridejte nasledujici sloupce do souboru CSV:

| Sloupec CSV | Popis |
|-------------|------|
| `polski_unit_base_qty` | Bazove mnozstvi |
| `polski_unit_base_unit` | Bazova jednotka |
| `polski_unit_ref_qty` | Referencni mnozstvi |
| `polski_unit_ref_unit` | Referencni jednotka |

Priklad radku CSV:

```csv
"Kawa mielona 500g",29.99,500,g,1,kg
```

## Nejcastejsi problemy

### Jednotkova cena se nezobrazuje

Zkontrolujte, zda:

1. Modul jednotkove ceny je aktivovan v nastaveních
2. Produkt ma vyplnena pole bazoveho mnozstvi a jednotky
3. Motiv podporuje hook `woocommerce_after_shop_loop_item_title` (listing) a `woocommerce_single_product_summary` (stranka produktu)

### Nespravny prepocet

Ujistete se, ze bazova a referencni jednotka patri do stejne kategorie (napr. obe hmotnostni nebo obe objemove). Plugin neprepocitava mezi kategoriemi - nelze prepocitat gramy na litry.

## Souvisejici zdroje

- [Nahlasit problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
