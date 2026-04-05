---
title: Doba dodani
description: Konfigurace doby dodani na produkt a variantu, vychozi nahradni hodnota a taxonomie polski_delivery_time ve WooCommerce.
---

Polske pravo vyzaduje, aby obchod informoval o dobe dodani pred slozenim objednavky. Plugin umoznuje nastavit dobu dodani globalne, na produkt i na variantu.

## Pravni pozadavky

Udejte dobu dodani, nez zakaznik klikne na tlacitko objednavky. Informace musi byt:

- jasna a srozumitelna
- udana v pracovnich nebo kalendarních dnech
- viditelna na strance produktu

Chybejici informace o dobe dodani muze mit za nasledek sankce ze strany UOKiK a predstavuje poruseni prav spotrebitele.

## Taxonomie polski_delivery_time

Plugin registruje vyhrazenou taxonomii `polski_delivery_time`, ktera umoznuje vytvorit preddefinovane doby dodani a prirazovat je k produktum.

### Sprava terminu dodani

Prejdete do **Produkty > Doba dodani** pro spravu dostupnych terminu.

Priklady terminu:

| Nazev | Slug | Popis |
|-------|------|------|
| 1-2 pracovni dny | 1-2-dni-robocze | Produkty na sklade |
| 3-5 pracovnich dnu | 3-5-dni-roboczych | Produkty objednavane u dodavatele |
| 7-14 pracovnich dnu | 7-14-dni-roboczych | Produkty na zakazku |
| Do 24 hodin | do-24-godzin | Digitalni produkty / expres |
| Ihned k dispozici | dostepny-od-reki | Okamzita realizace |

Terminy dodani funguji jako taxonomie WordPress - muzete je vytvareit, editovat a mazat v administracnim panelu.

## Konfigurace

### Globalni nastaveni

Prejdete do **WooCommerce > Nastaveni > Polski > Ceny** a nakonfigurujte sekci "Doba dodani".

| Nastaveni | Popis |
|------------|------|
| Aktivovat dobu dodani | Aktivuje zobrazeni na strance produktu |
| Vychozi doba dodani | Nahradni hodnota (fallback) pro produkty bez prirazeneho terminu |
| Zobrazit na listingu | Zobrazuje dobu dodani na strankach kategorii |
| Zobrazit v kosiku | Zobrazuje dobu dodani v kosiku |
| Stitek | Text pred dobou dodani (vychozi: "Doba dodani:") |

### Vychozi fallback

Vychozi doba dodani (fallback) je zobrazena, kdyz produkt nema prirazeny individualni termin. Umoznuje to rychle zavedeni bez nutnosti editace kazdeho produktu zvlast.

Hierarchie zobrazeni:

1. Doba dodani varianty (pokud je nastavena)
2. Doba dodani hlavniho produktu (pokud je nastavena)
3. Vychozi doba dodani z globalnich nastaveni (fallback)

Pokud zadna z vyse uvedenych neni nastavena, informace o dobe dodani se nezobrazi.

### Prirazeni k produktu

V editoru produktu, v zalozce "Doprva", naleznete pole **Doba dodani**. Vyberte z existujicich terminu nebo vytvorte novy.

### Prirazeni k variante

Pro variantni produkty muze mit kazda varianta vlastni dobu dodani. Rozbalte sekci varianty a nastavte individualni termin. Varianty bez nastaveneho terminu dedi hodnotu z hlavniho produktu.

## Shortcode

Pouzijte shortcode `[polski_delivery_time]` pro zobrazeni doby dodani na libovolnem miste.

### Parametry

| Parametr | Typ | Vychozi | Popis |
|----------|-----|----------|------|
| `product_id` | int | aktualni | ID produktu |
| `label` | string | `"Czas dostawy: "` | Stitek pred hodnotou |
| `show_label` | bool | `true` | Zda zobrazit stitek |
| `wrapper` | string | `span` | HTML element obalujici |
| `fallback` | string | `""` | Text kdyz neni doba dodani |

### Priklady pouziti

Zakladni pouziti:

```html
[polski_delivery_time]
```

Vysledek: `Czas dostawy: 1-2 dni robocze`

Bez stitku:

```html
[polski_delivery_time show_label="false"]
```

Vysledek: `1-2 dni robocze`

S vlastnim stitkem a fallbackem:

```html
[polski_delivery_time label="Wysyłka: " fallback="Zapytaj o dostępność"]
```

Pro konkretni produkt:

```html
[polski_delivery_time product_id="456"]
```

V sablone PHP:

```php
echo do_shortcode('[polski_delivery_time product_id="' . $product->get_id() . '"]');
```

## Programaticka sprava doby dodani

### Prirazeni terminu k produktu

```php
wp_set_object_terms($product_id, '1-2-dni-robocze', 'polski_delivery_time');
```

### Ziskani terminu produktu

```php
$terms = wp_get_object_terms($product_id, 'polski_delivery_time');
if (!empty($terms) && !is_wp_error($terms)) {
    $delivery_time = $terms[0]->name;
}
```

### Vytvoreni noveho terminu

```php
wp_insert_term(
    '2-3 dni robocze',
    'polski_delivery_time',
    [
        'slug'        => '2-3-dni-robocze',
        'description' => 'Standardowy czas realizacji',
    ]
);
```

## CSV import

Pro import doby dodani pres CSV pouzijte sloupec:

| Sloupec CSV | Popis | Hodnota |
|-------------|------|--------|
| `polski_delivery_time` | Nazev terminu dodani | `1-2 dni robocze` |

Pokud termin s danym nazvem neexistuje, bude automaticky vytvoren behem importu.

Priklad:

```csv
"Laptop Dell XPS 15",5499.00,"3-5 dni roboczych"
"Mysz Logitech MX",299.00,"1-2 dni robocze"
```

## Dynamicka doba dodani

V pripade produktu s dlouhou dobou realizace lze programove upravovat zobrazovanou dobu dodani na zaklade skladovych zasob nebo data objednavky.

```php
add_filter('polski/delivery_time/display', function (string $delivery_time, WC_Product $product): string {
    if ($product->get_stock_quantity() > 0) {
        return '1-2 dni robocze';
    }

    return '7-14 dni roboczych';
}, 10, 2);
```

## Stylovani CSS

```css
.polski-delivery-time {
    display: inline-block;
    margin-top: 0.5em;
    font-size: 0.9em;
    color: #2e7d32;
}

.polski-delivery-time__label {
    font-weight: 600;
}

.polski-delivery-time__value {
    color: #333;
}
```

## Nejcastejsi problemy

### Doba dodani se nezobrazuje

1. Zkontrolujte, zda je modul aktivovan v nastaveních
2. Ujistete se, ze produkt ma prirazeny termin nebo je nastaven vychozi fallback
3. Overite, zda motiv podporuje hook `woocommerce_single_product_summary`

### Doba dodani varianty se nemeni po vyberu

Ujistete se, ze JavaScript pluginu je nacten. Zkontrolujte konzoli prohlizece na chyby JS. Plugin aktualizuje dobu dodani varianty pres AJAX pri zmene volby.

## Souvisejici zdroje

- [Nahlasit problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
