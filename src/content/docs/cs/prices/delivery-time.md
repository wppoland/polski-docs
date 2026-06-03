---
title: Doba dodání
description: Konfigurace doby dodání na produkt a variantu, výchozí náhradní hodnota a taxonomie polski_delivery_time ve WooCommerce.
---

Polské právo vyžaduje, aby obchod informoval o době dodání před dokončením objednávky. Plugin Polski for WooCommerce umožňuje nastavit dobu dodání globálně, na produkt a na variantu.

## Právní požadavky

Uveďte dobu dodání předtím, než zákazník klikne na tlačítko objednávky. Informace by měla být:

- jasná a srozumitelná
- uvedená v pracovních nebo kalendářních dnech
- viditelná na stránce produktu

Chybějící tato informace hrozí pokutami od UOKiK.

## Taxonomie polski_delivery_time

Plugin vytváří taxonomii `polski_delivery_time`, ve které definujete doby dodání a přiřazujete je k produktům.

### Správa termínů dodání

Přejděte do **Produkty > Doba dodání**, abyste spravovali dostupné termíny.

Příklady termínů:

| Název | Slug | Popis |
|-------|------|------|
| 1-2 pracovní dny | 1-2-dni-robocze | Produkty skladem |
| 3-5 pracovních dnů | 3-5-dni-roboczych | Produkty objednávané u dodavatele |
| 7-14 pracovních dnů | 7-14-dni-roboczych | Produkty na zakázku |
| Do 24 hodin | do-24-godzin | Digitální produkty / expres |
| Skladem ihned | dostepny-od-reki | Okamžitá realizace |

Termíny dodání jsou taxonomie WordPress - vytváříte, upravujete a mažete je v panelu admina.

## Konfigurace

### Globální nastavení

Přejděte do **WooCommerce > Nastavení > Polski > Ceny** a nakonfigurujte sekci "Doba dodání".

| Nastavení | Popis |
|------------|------|
| Zapnout dobu dodání | Aktivuje zobrazování na stránce produktu |
| Výchozí doba dodání | Náhradní hodnota (fallback) pro produkty bez přiřazeného termínu |
| Zobrazit ve výpisu | Zobrazuje dobu dodání na stránkách kategorií |
| Zobrazit v košíku | Zobrazuje dobu dodání v košíku |
| Štítek | Text před dobou dodání (výchozí: "Doba dodání:") |

### Výchozí fallback

Výchozí doba dodání (fallback) se objeví, když produkt nemá vlastní termín. Díky tomu nemusíte upravovat každý produkt zvlášť.

Hierarchie zobrazování:

1. Doba dodání varianty (pokud je nastavena)
2. Doba dodání hlavního produktu (pokud je nastavena)
3. Výchozí doba dodání z globálního nastavení (fallback)

Pokud není nic nastaveno, doba dodání se neobjeví.

### Přiřazování k produktu

V editoru produktu otevřete záložku "Doprava". V poli **Doba dodání** vyberte termín ze seznamu nebo přidejte nový.

### Přiřazování k variantě

Každá varianta může mít vlastní dobu dodání. Rozbalte sekci varianty a nastavte termín. Varianty bez termínu dědí hodnotu z hlavního produktu.

## Shortcode

Použijte shortcode `[polski_delivery_time]` pro zobrazení doby dodání na libovolném místě.

### Parametry

| Parametr | Typ | Výchozí | Popis |
|----------|-----|----------|------|
| `product_id` | int | aktuální | ID produktu |
| `label` | string | `"Czas dostawy: "` | Štítek před hodnotou |
| `show_label` | bool | `true` | Zda zobrazovat štítek |
| `wrapper` | string | `span` | Obalující HTML element |
| `fallback` | string | `""` | Text, když chybí doba dodání |

### Příklady použití

Základní použití:

```html
[polski_delivery_time]
```

Výsledek: `Doba dodání: 1-2 pracovní dny`

Bez štítku:

```html
[polski_delivery_time show_label="false"]
```

Výsledek: `1-2 pracovní dny`

S vlastním štítkem a fallbackem:

```html
[polski_delivery_time label="Odeslání: " fallback="Zeptejte se na dostupnost"]
```

Pro konkrétní produkt:

```html
[polski_delivery_time product_id="456"]
```

V PHP šabloně:

```php
echo do_shortcode('[polski_delivery_time product_id="' . $product->get_id() . '"]');
```

## Programové spravování doby dodání

### Přiřazení termínu k produktu

```php
wp_set_object_terms($product_id, '1-2-dni-robocze', 'polski_delivery_time');
```

### Získání termínu produktu

```php
$terms = wp_get_object_terms($product_id, 'polski_delivery_time');
if (!empty($terms) && !is_wp_error($terms)) {
    $delivery_time = $terms[0]->name;
}
```

### Vytvoření nového termínu

```php
wp_insert_term(
    '2-3 dni robocze',
    'polski_delivery_time',
    [
        'slug'        => '2-3-dni-robocze',
        'description' => 'Standardní doba realizace',
    ]
);
```

## Import CSV

Pro import doby dodání přes CSV použijte sloupec:

| Sloupec CSV | Popis | Hodnota |
|-------------|------|--------|
| `polski_delivery_time` | Název termínu dodání | `1-2 dni robocze` |

Pokud termín s uvedeným názvem neexistuje, bude během importu automaticky vytvořen.

Příklad:

```csv
"Laptop Dell XPS 15",5499.00,"3-5 dni roboczych"
"Mysz Logitech MX",299.00,"1-2 dni robocze"
```

## Dynamická doba dodání

Dobu dodání můžete programově měnit na základě stavu skladu nebo data objednávky.

```php
add_filter('polski/delivery_time/display', function (string $delivery_time, WC_Product $product): string {
    if ($product->get_stock_quantity() > 0) {
        return '1-2 dni robocze';
    }

    return '7-14 dni roboczych';
}, 10, 2);
```

## Stylování CSS

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

## Nejčastější problémy

### Doba dodání se nezobrazuje

1. Zkontrolujte, zda je modul zapnutý v nastavení
2. Ujistěte se, že produkt má přiřazený termín nebo je nastaven výchozí fallback
3. Ověřte, zda šablona podporuje hook `woocommerce_single_product_summary`

### Doba dodání varianty se po výběru nemění

Zkontrolujte, zda je JavaScript pluginu načten. Otevřete konzoli prohlížeče a hledejte chyby JS. Plugin aktualizuje dobu dodání varianty přes AJAX.

## Související zdroje

- [Nahlásit problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má výhradně informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) dodávaný bez záruky.</div>
