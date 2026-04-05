---
title: Dodacia lehota
description: Konfigurácia dodacej lehoty per produkt a variant, predvolená záložná hodnota a taxonómia polski_delivery_time vo WooCommerce.
---

Smernica Omnibus a poľský zákon o právach spotrebiteľa vyžadujú, aby internetový obchod informoval o predpokladanom čase dodania produktu pred zadaním objednávky. Plugin Polski for WooCommerce poskytuje flexibilný systém správy dodacej lehoty - od globálnych predvolených nastavení po individuálne hodnoty pre každý produkt a variant.

## Právne požiadavky

Predajca musí informovať spotrebiteľa o termíne dodania tovaru najneskôr v momente vyjadrenia vôle spotrebiteľa byť viazaný zmluvou (teda pred kliknutím na tlačidlo objednávky). Táto informácia musí byť:

- jasná a zrozumiteľná
- uvedená v pracovných alebo kalendárnych dňoch
- viditeľná na stránke produktu

Chýbajúca informácia o dodacej lehote môže mať za následok sankcie zo strany UOKiK a predstavuje porušenie práv spotrebiteľa.

## Taxonómia polski_delivery_time

Plugin registruje vyhradenú taxonómiu `polski_delivery_time`, ktorá umožňuje vytvárať preddefinované dodacie lehoty a priraďovať ich produktom.

### Správa termínov dodania

Prejdite do **Produkty > Dodacia lehota** na správu dostupných termínov.

Príklady termínov:

| Názov | Slug | Popis |
|-------|------|------|
| 1-2 pracovné dni | 1-2-dni-robocze | Produkty na sklade |
| 3-5 pracovných dní | 3-5-dni-roboczych | Produkty objednávané u dodávateľa |
| 7-14 pracovných dní | 7-14-dni-roboczych | Produkty na objednávku |
| Do 24 hodín | do-24-godzin | Digitálne produkty / expresné |
| Ihneď dostupný | dostepny-od-reki | Okamžitá realizácia |

Termíny dodania fungujú ako taxonómia WordPress - môžete ich vytvárať, upravovať a odstraňovať v administračnom paneli.

## Konfigurácia

### Globálne nastavenia

Prejdite do **WooCommerce > Nastavenia > Polski > Ceny** a nakonfigurujte sekciu "Dodacia lehota".

| Nastavenie | Popis |
|------------|------|
| Zapnúť dodaciu lehotu | Aktivuje zobrazovanie na stránke produktu |
| Predvolená dodacia lehota | Záložná hodnota (fallback) pre produkty bez priradeného termínu |
| Zobraziť v zozname | Zobrazuje dodaciu lehotu na stránkach kategórií |
| Zobraziť v košíku | Zobrazuje dodaciu lehotu v košíku |
| Štítok | Text pred dodacou lehotou (štandardne: "Dodacia lehota:") |

### Predvolený fallback

Predvolená dodacia lehota (fallback) sa zobrazuje, keď produkt nemá priradený individuálny termín. To umožňuje rýchlu implementáciu bez nutnosti úpravy každého produktu zvlášť.

Hierarchia zobrazovania:

1. Dodacia lehota variantu (ak je nastavená)
2. Dodacia lehota hlavného produktu (ak je nastavená)
3. Predvolená dodacia lehota z globálnych nastavení (fallback)

Ak žiadna z vyššie uvedených nie je nastavená, informácia o dodacej lehote sa nezobrazí.

### Priradenie k produktu

V editore produktu, v záložke "Doručenie", nájdete pole **Dodacia lehota**. Vyberte zo zoznamu existujúci termín alebo vytvorte nový.

### Priradenie k variantu

Pre variantné produkty môže mať každý variant vlastnú dodaciu lehotu. Rozbaľte sekciu variantu a nastavte individuálny termín. Varianty bez nastaveného termínu dedia hodnotu z hlavného produktu.

## Shortcód

Použite shortcód `[polski_delivery_time]` na zobrazenie dodacej lehoty na ľubovoľnom mieste.

### Parametre

| Parameter | Typ | Predvolený | Popis |
|----------|-----|----------|------|
| `product_id` | int | aktuálny | ID produktu |
| `label` | string | `"Czas dostawy: "` | Štítok pred hodnotou |
| `show_label` | bool | `true` | Či zobrazovať štítok |
| `wrapper` | string | `span` | Obaľujúci HTML prvok |
| `fallback` | string | `""` | Text keď chýba dodacia lehota |

### Príklady použitia

Základné použitie:

```html
[polski_delivery_time]
```

Výsledok: `Czas dostawy: 1-2 dni robocze`

Bez štítku:

```html
[polski_delivery_time show_label="false"]
```

Výsledok: `1-2 dni robocze`

S vlastným štítkom a fallbackom:

```html
[polski_delivery_time label="Wysyłka: " fallback="Zapytaj o dostępność"]
```

Pre konkrétny produkt:

```html
[polski_delivery_time product_id="456"]
```

V PHP šablóne:

```php
echo do_shortcode('[polski_delivery_time product_id="' . $product->get_id() . '"]');
```

## Programová správa dodacej lehoty

### Priradenie termínu k produktu

```php
wp_set_object_terms($product_id, '1-2-dni-robocze', 'polski_delivery_time');
```

### Získanie termínu produktu

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
        'description' => 'Standardowy czas realizacji',
    ]
);
```

## Import CSV

Na import dodacej lehoty cez CSV použite stĺpec:

| Stĺpec CSV | Popis | Hodnota |
|-------------|------|--------|
| `polski_delivery_time` | Názov termínu dodania | `1-2 dni robocze` |

Ak termín s uvedeným názvom neexistuje, bude automaticky vytvorený počas importu.

Príklad:

```csv
"Laptop Dell XPS 15",5499.00,"3-5 dni roboczych"
"Mysz Logitech MX",299.00,"1-2 dni robocze"
```

## Dynamická dodacia lehota

V prípade produktov s dlhým časom realizácie je možné programovo upravovať zobrazenú dodaciu lehotu na základe skladových stavov alebo dátumu objednávky.

```php
add_filter('polski/delivery_time/display', function (string $delivery_time, WC_Product $product): string {
    if ($product->get_stock_quantity() > 0) {
        return '1-2 dni robocze';
    }

    return '7-14 dni roboczych';
}, 10, 2);
```

## Štýlovanie CSS

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

### Dodacia lehota sa nezobrazuje

1. Skontrolujte, či modul je zapnutý v nastaveniach
2. Uistite sa, že produkt má priradený termín alebo je nastavený predvolený fallback
3. Overte, či téma podporuje hook `woocommerce_single_product_summary`

### Dodacia lehota variantu sa nemení po výbere

Uistite sa, že JavaScript pluginu je načítaný. Skontrolujte konzolu prehliadača na chyby JS. Plugin aktualizuje dodaciu lehotu variantu cez AJAX pri zmene možností.

## Súvisiace zdroje

- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
