---
title: Alergeny
description: Deklarace alergenů pomocí taxonomie polski_allergen, automatické zvýrazňování ve složkách a shortcode pro zobrazení ve WooCommerce.
---

Předpisy EU vyžadují označování 14 alergenů na etiketě potravinového produktu. V internetovém obchodě musí být informace o alergenech viditelná před nákupem. Plugin Polski for WooCommerce obsluhuje alergeny pomocí taxonomie WordPress.

## 14 hlavních alergenů

Povinná deklarace zahrnuje:

| Č. | Alergen | Slug taxonomie | Ikona |
|----|---------|----------------|-------|
| 1 | Obiloviny obsahující lepek | `gluten` | lepek |
| 2 | Korýši | `crustaceans` | korýši |
| 3 | Vejce | `eggs` | vejce |
| 4 | Ryby | `fish` | ryby |
| 5 | Podzemnice olejná (arašídy) | `peanuts` | arašídy |
| 6 | Sója | `soy` | sója |
| 7 | Mléko (laktóza) | `milk` | mléko |
| 8 | Skořápkové plody | `nuts` | ořechy |
| 9 | Celer | `celery` | celer |
| 10 | Hořčice | `mustard` | hořčice |
| 11 | Sezamová semena | `sesame` | sezam |
| 12 | Oxid siřičitý a siřičitany | `sulphites` | siřičitany |
| 13 | Vlčí bob (lupina) | `lupin` | lupina |
| 14 | Měkkýši | `molluscs` | měkkýši |

## Taxonomie polski_allergen

Plugin vytváří taxonomii `polski_allergen` propojenou s produkty. Při aktivaci automaticky přidává 14 hlavních alergenů.

### Správa alergenů

Přejděte do **Produkty > Alergeny** pro správu seznamu. 14 alergenů se vytvoří automaticky. Můžete přidávat vlastní, specifické pro váš sortiment.

Každý alergen obsahuje:

| Pole | Popis |
|------|------|
| Název | Zobrazovaný název alergenu (např. "Mléko a výrobky z něj") |
| Slug | URL identifikátor (např. `milk`) |
| Popis | Doplňkové informace o alergenu |
| Ikona | Volitelná ikona (miniatura taxonomie) |

### Přiřazení alergenů k produktu

V editoru produktu, v záložce "Potraviny" nebo v bočním panelu "Alergeny", zaškrtněte příslušné alergeny ze seznamu checkbox.

Dostupné jsou tři režimy deklarace:

| Režim | Popis | Příklad |
|------|------|---------|
| Obsahuje | Produkt obsahuje daný alergen | "Obsahuje: mléko, vejce" |
| Může obsahovat | Riziko křížové kontaminace | "Může obsahovat: ořechy" |
| Neobsahuje | Výslovná deklarace absence (volitelné) | "Neobsahuje: lepek" |

### Režim "Může obsahovat"

Režim "Může obsahovat" označuje riziko stopových množství alergenu z výrobního procesu. Každý alergen označíte jako:

- **Obsahuje** - alergen je složkou produktu
- **Může obsahovat** - riziko stopových množství

## Konfigurace

Přejděte do **WooCommerce > Nastavení > Polski > Potraviny** a nakonfigurujte sekci "Alergeny".

| Nastavení | Výchozí | Popis |
|------------|----------|------|
| Zapnout deklaraci alergenů | Ano | Aktivuje systém alergenů |
| Zvýrazňovat ve složkách | Ano | Automatické tučné zvýraznění alergenů v seznamu složek |
| Zobrazit ikony | Ne | Zobrazuje ikony alergenů |
| Pozice na stránce | Záložka potraviny | Kde zobrazovat alergeny |
| Režim "Může obsahovat" | Ano | Zapíná možnost deklarace stopových množství |
| Formát zobrazení | Seznam | `seznam`, `ikony`, `inline` |

## Automatické zvýrazňování ve složkách

Alergeny v seznamu složek musí být zvýrazněny - nejčastěji tučným písmem. Plugin automaticky vyhledává názvy alergenů v poli "Složky" a obaluje je do `<strong>`.

Příklad:

Zadaný text:
```
Mąka pszenna, cukier, masło, jaja kurze, mleko odtłuszczone w proszku, sól
```

Zobrazovaný text:
```
Mąka pszenna (gluten), cukier, masło (mleko), jaja kurze, mleko odtłuszczone w proszku, sól
```

S HTML zvýrazněním:
```html
Mąka <strong>pszenna (gluten)</strong>, cukier, masło (<strong>mleko</strong>), 
<strong>jaja</strong> kurze, <strong>mleko</strong> odtłuszczone w proszku, sól
```

### Konfigurace zvýrazňování

Plugin hledá synonyma alergenů v seznamu složek. Seznam synonym změníte filtrem:

```php
add_filter('polski/allergens/synonyms', function (array $synonyms): array {
    $synonyms['gluten'] = ['pszenica', 'pszenna', 'żyto', 'żytnia', 'owies', 'owsiana', 'jęczmień', 'orkisz'];
    $synonyms['milk'] = ['mleko', 'mleczny', 'mleczna', 'masło', 'śmietana', 'jogurt', 'ser', 'laktoza'];
    $synonyms['eggs'] = ['jaja', 'jajka', 'jajeczny', 'jajeczna'];

    return $synonyms;
});
```

## Shortcode

Použijte shortcode `[polski_allergens]` pro zobrazení deklarace alergenů.

### Parametry

| Parametr | Typ | Výchozí | Popis |
|----------|-----|----------|------|
| `product_id` | int | aktuální | ID produktu |
| `format` | string | `list` | Formát: `list`, `icons`, `inline`, `table` |
| `show_may_contain` | bool | `true` | Zda zobrazit sekci "Může obsahovat" |
| `show_icons` | bool | `false` | Zda zobrazit ikony alergenů |
| `label` | string | `"Alergeny: "` | Popisek před seznamem |
| `wrapper` | string | `div` | Obalující HTML element |

### Příklady použití

Základní seznam alergenů:

```html
[polski_allergens]
```

Výsledek:
```
Alergeny: mléko, vejce, lepek
Může obsahovat: ořechy
```

Inline formát s ikonami:

```html
[polski_allergens format="inline" show_icons="true"]
```

Bez sekce "Může obsahovat":

```html
[polski_allergens show_may_contain="false"]
```

Formát tabulky:

```html
[polski_allergens format="table"]
```

Pro konkrétní produkt:

```html
[polski_allergens product_id="456"]
```

V šabloně PHP:

```php
echo do_shortcode('[polski_allergens product_id="' . $product->get_id() . '"]');
```

## Programatický přístup

### Získání alergenů produktu

```php
// Alergeny "Obsahuje"
$allergens = wp_get_object_terms($product_id, 'polski_allergen');

foreach ($allergens as $allergen) {
    echo $allergen->name; // např. "Mléko a výrobky z něj"
}

// Alergeny "Může obsahovat"
$may_contain = get_post_meta($product_id, '_polski_may_contain_allergens', true);
if ($may_contain) {
    $may_contain_terms = get_terms([
        'taxonomy' => 'polski_allergen',
        'slug'     => $may_contain,
    ]);
}
```

### Přiřazení alergenů programaticky

```php
// Nastavení alergenů "Obsahuje"
wp_set_object_terms($product_id, ['gluten', 'milk', 'eggs'], 'polski_allergen');

// Nastavení alergenů "Může obsahovat"
update_post_meta($product_id, '_polski_may_contain_allergens', ['nuts', 'soy']);
```

### Kontrola, zda produkt obsahuje alergen

```php
if (has_term('gluten', 'polski_allergen', $product_id)) {
    // Produkt obsahuje lepek
}
```

## Import CSV

Alergeny importujete přes CSV:

| Sloupec CSV | Popis | Formát |
|-------------|------|--------|
| `polski_allergens` | Alergeny "Obsahuje" | Slugy oddělené čárkami |
| `polski_may_contain` | Alergeny "Může obsahovat" | Slugy oddělené čárkami |

Příklad:

```csv
"Ciastka maślane","gluten,milk,eggs","nuts,soy"
"Sok pomarańczowy","",""
```

## Stylování CSS

```css
.polski-allergens {
    margin: 1em 0;
    padding: 0.8em;
    background: #fff3e0;
    border: 1px solid #ffcc02;
    border-radius: 4px;
}

.polski-allergens__label {
    font-weight: 700;
    color: #e65100;
}

.polski-allergens__list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
}

.polski-allergens__item {
    display: inline-flex;
    align-items: center;
    gap: 0.3em;
    padding: 0.2em 0.6em;
    background: #fff;
    border: 1px solid #ffcc02;
    border-radius: 3px;
    font-size: 0.9em;
}

.polski-allergens__may-contain {
    margin-top: 0.5em;
    font-style: italic;
    color: #666;
}

.polski-allergens__icon {
    width: 20px;
    height: 20px;
}
```

## Nejčastější problémy

### Alergeny se nezobrazují na stránce produktu

1. Zkontrolujte, zda je modul alergenů zapnutý
2. Ujistěte se, že produkt má přiřazené alergeny v editoru
3. Ověřte, zda je taxonomie `polski_allergen` správně registrovaná (Produkty > Alergeny)

### Automatické zvýrazňování nefunguje

1. Zkontrolujte, zda je možnost "Zvýrazňovat ve složkách" zapnutá
2. Ujistěte se, že názvy alergenů nebo jejich synonyma odpovídají textu v seznamu složek
3. Rozšiřte seznam synonym filtrem `polski/allergens/synonyms`

### Chybí výchozí alergeny po aktivaci

Pokud se 14 alergenů neobjevilo automaticky, přejděte do **WooCommerce > Nastavení > Polski > Potraviny** a klikněte na "Vytvořit výchozí alergeny".

## Související zdroje

- [Modul potravinových produktů](food/food-overview/)
- [Výživové hodnoty](food/nutrients/)
- [Nahlásit problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
