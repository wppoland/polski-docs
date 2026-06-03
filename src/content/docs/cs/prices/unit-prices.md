---
title: Jednotková cena
description: Zobrazování ceny za kilogram, litr, metr nebo kus ve WooCommerce v souladu s polským spotřebitelským právem.
---

Polské právo vyžaduje, aby internetový obchod ukazoval jednotkovou cenu produktu - např. cenu za kilogram, litr nebo metr. Plugin Polski for WooCommerce přidává tuto informaci automaticky na stránce produktu, ve výpisu a v košíku.

## Kdy je jednotková cena vyžadována

Jednotkovou cenu uvádíte u produktů prodávaných na váhu, objem nebo délku. Týká se to mimo jiné:

- potravinové produkty (cena za kg nebo litr)
- kosmetiku a čisticí prostředky (cena za 100 ml nebo litr)
- stavební materiály (cena za běžný metr nebo metr čtvereční)
- sypké produkty (cena za kg)

Jednotková cena musí být viditelná všude, kde ukazujete cenu produktu - na stránce produktu, ve výsledcích vyhledávání, v porovnávačích a v košíku.

## Konfigurace

Přejděte do **WooCommerce > Nastavení > Polski > Ceny** a zapněte modul jednotkové ceny. Po zapnutí se v editoru produktu objeví nová sekce na záložce "Obecné".

### Pole v editoru produktu

| Pole | Popis | Příklad |
|------|------|---------|
| Základní množství | Množství produktu v balení | `500` |
| Základní jednotka | Měrná jednotka produktu | `g` |
| Referenční množství | Referenční množství pro jednotkovou cenu | `1` |
| Referenční jednotka | Jednotka, za kterou je cena uváděna | `kg` |

Pro produkt o váze 500 g a ceně 12,99 zł plugin automaticky vypočítá jednotkovou cenu jako 25,98 zł/kg.

### Podporované jednotky

Plugin podporuje tyto měrné jednotky:

- **Váha:** g, kg, mg
- **Objem:** ml, l, cl
- **Délka:** mm, cm, m
- **Kusy:** szt (kus)

Plugin přepočítává jednotky automaticky. Pokud má produkt váhu v gramech a referenční jednotkou je kilogram - hodnota bude přepočítána.

## Varianty produktů

U variabilních produktů nastavujete jednotkovou cenu na dvou úrovních:

1. **Na úrovni hlavního produktu** - hodnota zděděná všemi variantami
2. **Na úrovni varianty** - přepisuje nastavení hlavního produktu

Pokud mají varianty různou váhu (např. 250 g a 500 g), nastavte jednotkovou cenu zvlášť pro každou variantu. Plugin automaticky aktualizuje cenu, když zákazník změní variantu (AJAX).

## Shortcode

Použijte shortcode `[polski_unit_price]` pro zobrazení jednotkové ceny na libovolném místě.

### Parametry

| Parametr | Typ | Výchozí | Popis |
|----------|-----|----------|------|
| `product_id` | int | aktuální | ID produktu |
| `before` | string | `""` | Text před cenou |
| `after` | string | `""` | Text po ceně |
| `wrapper` | string | `span` | Obalující HTML element |

### Příklady použití

Základní použití na stránce produktu:

```html
[polski_unit_price]
```

S vlastním ID produktu a textem:

```html
[polski_unit_price product_id="123" before="Cena za kg: " after=" s daní"]
```

V PHP šabloně:

```php
echo do_shortcode('[polski_unit_price product_id="' . $product->get_id() . '"]');
```

## Hook: polski/price/unit_price_html

Filtr umožňuje změnit HTML jednotkové ceny před zobrazením.

### Signatura

```php
apply_filters('polski/price/unit_price_html', string $html, float $unit_price, WC_Product $product, array $args): string
```

### Parametry

| Parametr | Typ | Popis |
|----------|-----|------|
| `$html` | string | Vygenerovaný HTML jednotkové ceny |
| `$unit_price` | float | Vypočítaná jednotková cena |
| `$product` | WC_Product | Objekt produktu WooCommerce |
| `$args` | array | Pole s klíči: `base_qty`, `base_unit`, `ref_qty`, `ref_unit` |

### Příklad: přidání CSS třídy

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

### Příklad: skrytí jednotkové ceny pro vybrané kategorie

```php
add_filter('polski/price/unit_price_html', function (string $html, float $unit_price, WC_Product $product): string {
    if (has_term('uslugi', 'product_cat', $product->get_id())) {
        return '';
    }

    return $html;
}, 10, 3);
```

## Import CSV

Jednotkovou cenu importujete přes standardní importér WooCommerce. Přidejte tyto sloupce do souboru CSV:

| Sloupec CSV | Popis |
|-------------|------|
| `polski_unit_base_qty` | Základní množství |
| `polski_unit_base_unit` | Základní jednotka |
| `polski_unit_ref_qty` | Referenční množství |
| `polski_unit_ref_unit` | Referenční jednotka |

Příklad řádku CSV:

```csv
"Kawa mielona 500g",29.99,500,g,1,kg
```

## Nejčastější problémy

### Jednotková cena se nezobrazuje

Zkontrolujte, zda:

1. Modul jednotkové ceny je zapnutý v nastavení
2. Produkt má vyplněná pole základního množství a jednotky
3. Šablona podporuje hook `woocommerce_after_shop_loop_item_title` (výpis) a `woocommerce_single_product_summary` (stránka produktu)

### Nesprávný přepočet

Zkontrolujte, zda jsou základní a referenční jednotka ze stejné kategorie (např. obě váhové nebo obě objemové). Plugin nepřepočítává gramy na litry.

## Související zdroje

- [Nahlásit problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má výhradně informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) dodávaný bez záruky.</div>
