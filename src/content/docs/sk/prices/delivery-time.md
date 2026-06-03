---
title: Čas dodania
description: Konfigurácia času dodania per produkt a variant, predvolená záložná hodnota a taxonómia polski_delivery_time vo WooCommerce.
---

Poľské právo vyžaduje, aby obchod informoval o čase dodania pred zadaním objednávky. Plugin Polski for WooCommerce umožňuje nastaviť čas dodania globálne, per produkt a per variant.

## Právne požiadavky

Uveďte čas dodania predtým, ako zákazník klikne na tlačidlo objednávky. Informácia by mala byť:

- jasná a zrozumiteľná
- uvedená v pracovných alebo kalendárnych dňoch
- viditeľná na stránke produktu

Absencia tejto informácie hrozí pokutami od UOKiK.

## Taxonómia polski_delivery_time

Plugin vytvára taxonómiu `polski_delivery_time`, v ktorej definujete časy dodania a priraďujete ich k produktom.

### Správa termínov dodania

Prejdite do **Produkty > Čas dodania**, aby ste spravovali dostupné termíny.

Príklady termínov:

| Názov | Slug | Popis |
|-------|------|------|
| 1-2 pracovné dni | 1-2-dni-robocze | Produkty na sklade |
| 3-5 pracovných dní | 3-5-dni-roboczych | Produkty objednávané u dodávateľa |
| 7-14 pracovných dní | 7-14-dni-roboczych | Produkty na objednávku |
| Do 24 hodín | do-24-godzin | Digitálne produkty / expres |
| Dostupný ihneď | dostepny-od-reki | Okamžitá realizácia |

Termíny dodania sú taxonómia WordPress - vytvárate, upravujete a odstraňujete ich v paneli admina.

## Konfigurácia

### Globálne nastavenia

Prejdite do **WooCommerce > Nastavenia > Polski > Ceny** a nakonfigurujte sekciu "Čas dodania".

| Nastavenie | Popis |
|------------|------|
| Zapnúť čas dodania | Aktivuje zobrazovanie na stránke produktu |
| Predvolený čas dodania | Záložná hodnota (fallback) pre produkty bez priradeného termínu |
| Zobraziť v zozname | Zobrazuje čas dodania na stránkach kategórií |
| Zobraziť v košíku | Zobrazuje čas dodania v košíku |
| Štítok | Text pred časom dodania (predvolene: "Čas dodania:") |

### Predvolený fallback

Predvolený čas dodania (fallback) sa objaví, keď produkt nemá vlastný termín. Vďaka tomu nemusíte upravovať každý produkt zvlášť.

Hierarchia zobrazovania:

1. Čas dodania variantu (ak je nastavený)
2. Čas dodania hlavného produktu (ak je nastavený)
3. Predvolený čas dodania z globálnych nastavení (fallback)

Ak nie je nastavené nič, čas dodania sa neobjaví.

### Priraďovanie k produktu

V editore produktu otvorte záložku "Doprava". V poli **Čas dodania** vyberte termín zo zoznamu alebo pridajte nový.

### Priraďovanie k variantu

Každý variant môže mať vlastný čas dodania. Rozbaľte sekciu variantu a nastavte termín. Varianty bez termínu dedia hodnotu z hlavného produktu.

## Shortcode

Použite shortcode `[polski_delivery_time]`, aby ste zobrazili čas dodania na ľubovoľnom mieste.

### Parametre

| Parameter | Typ | Predvolený | Popis |
|----------|-----|----------|------|
| `product_id` | int | aktuálny | ID produktu |
| `label` | string | `"Čas dodania: "` | Štítok pred hodnotou |
| `show_label` | bool | `true` | Či zobrazovať štítok |
| `wrapper` | string | `span` | Obaľujúci HTML element |
| `fallback` | string | `""` | Text, keď chýba čas dodania |

### Príklady použitia

Základné použitie:

```html
[polski_delivery_time]
```

Výsledok: `Čas dodania: 1-2 pracovné dni`

Bez štítku:

```html
[polski_delivery_time show_label="false"]
```

Výsledok: `1-2 pracovné dni`

S vlastným štítkom a fallbackom:

```html
[polski_delivery_time label="Odoslanie: " fallback="Spýtajte sa na dostupnosť"]
```

Pre konkrétny produkt:

```html
[polski_delivery_time product_id="456"]
```

V šablóne PHP:

```php
echo do_shortcode('[polski_delivery_time product_id="' . $product->get_id() . '"]');
```

## Programové spravovanie času dodania

### Priraďovanie termínu k produktu

```php
wp_set_object_terms($product_id, '1-2-dni-robocze', 'polski_delivery_time');
```

### Získavanie termínu produktu

```php
$terms = wp_get_object_terms($product_id, 'polski_delivery_time');
if (!empty($terms) && !is_wp_error($terms)) {
    $delivery_time = $terms[0]->name;
}
```

### Vytvorenie nového termínu

```php
wp_insert_term(
    '2-3 dni robocze',
    'polski_delivery_time',
    [
        'slug'        => '2-3-dni-robocze',
        'description' => 'Štandardný čas realizácie',
    ]
);
```

## Import CSV

Na import času dodania cez CSV použite stĺpec:

| Stĺpec CSV | Popis | Hodnota |
|-------------|------|--------|
| `polski_delivery_time` | Názov termínu dodania | `1-2 dni robocze` |

Ak termín s daným názvom neexistuje, automaticky sa vytvorí počas importu.

Príklad:

```csv
"Laptop Dell XPS 15",5499.00,"3-5 dni roboczych"
"Mysz Logitech MX",299.00,"1-2 dni robocze"
```

## Dynamický čas dodania

Čas dodania môžete programovo meniť na základe stavu skladu alebo dátumu objednávky.

```php
add_filter('polski/delivery_time/display', function (string $delivery_time, WC_Product $product): string {
    if ($product->get_stock_quantity() > 0) {
        return '1-2 dni robocze';
    }

    return '7-14 dni roboczych';
}, 10, 2);
```

## Stylovanie CSS

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

## Najčastejšie problémy

### Čas dodania sa nezobrazuje

1. Skontrolujte, či je modul zapnutý v nastaveniach
2. Uistite sa, že produkt má priradený termín alebo je nastavený predvolený fallback
3. Overte, či šablóna podporuje hook `woocommerce_single_product_summary`

### Čas dodania variantu sa po výbere nemení

Skontrolujte, či je JavaScript pluginu načítaný. Otvorte konzolu prehliadača a hľadajte chyby JS. Plugin aktualizuje čas dodania variantu cez AJAX.

## Súvisiace zdroje

- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informatívny charakter a nepredstavuje právnu radu. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
