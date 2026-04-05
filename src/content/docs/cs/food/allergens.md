---
title: Alergeny
description: Deklarace alergenu pomoci taxonomie polski_allergen, automaticke zvyraznovani ve slozkach a shortcode zobrazeni ve WooCommerce.
---

Predpisy EU vyzaduji oznacovani 14 alergenu na etikete potravinoveho produktu. V internetovem obchode musi byt informace o alergenech viditelna pred nakupem. Plugin obsluhuje alergeny pres taxonomii WordPress.

## 14 hlavnich alergenu

Podle prilohy II narizeni FIC povinna deklarace zahrnuje:

| C. | Alergen | Slug taxonomie | Ikona |
|----|---------|----------------|-------|
| 1 | Obiloviny obsahujici lepek | `gluten` | gluten |
| 2 | Korovci | `crustaceans` | korovci |
| 3 | Vejce | `eggs` | vejce |
| 4 | Ryby | `fish` | ryby |
| 5 | Podzemnice olejne (arasidy) | `peanuts` | arasidy |
| 6 | Soja | `soy` | soja |
| 7 | Mleko (laktoza) | `milk` | mleko |
| 8 | Orechy | `nuts` | orechy |
| 9 | Celer | `celery` | celer |
| 10 | Horcice | `mustard` | horcice |
| 11 | Sezamova semena | `sesame` | sezam |
| 12 | Oxid siricity a siricityany | `sulphites` | siricityany |
| 13 | Vlci bob | `lupin` | vlci bob |
| 14 | Mekkýsi | `molluscs` | mekkýsi |

## Taxonomie polski_allergen

Plugin registruje taxonomii `polski_allergen` spojenou s typem prispevku `product`. Behem aktivace pluginu je taxonomie automaticky naplnena 14 hlavnimi alergeny.

### Sprava alergenu

Prejdete do **Produkty > Alergeny** pro spravu seznamu alergenu. Vychozich 14 alergenu je vytvoreno automaticky. Muzete pridavat vlastni alergeny specificke pro vas sortiment.

Kazdy alergen obsahuje:

| Pole | Popis |
|------|------|
| Nazev | Zobrazovany nazev alergenu (napr. "Mleko a derivaty") |
| Slug | URL identifikator (napr. `milk`) |
| Popis | Doplnkove informace o alergenu |
| Ikona | Volitelna ikona (miniatura taxonomie) |

### Prirazeni alergenu k produktu

V editoru produktu, v zalozce "Potraviny" nebo v bocnim panelu "Alergeny", zaznacte prislusne alergeny ze seznamu checkbox.

Dostupne jsou tri rezimy deklarace:

| Rezim | Popis | Priklad |
|------|------|---------|
| Obsahuje | Produkt obsahuje dany alergen | "Obsahuje: mleko, vejce" |
| Muze obsahovat | Riziko krizove kontaminace | "Muze obsahovat: orechy" |
| Neobsahuje | Vyrazna deklarace absence (volitelne) | "Neobsahuje: lepek" |

### Rezim "Muze obsahovat"

Rezim "Muze obsahovat" (may contain) slouzi k oznaceni rizika stopovych mnozstvi alergenu vyplyvajicich z vyrobnich procesu. V editoru produktu lze kazdy alergen oznacit jako:

- **Obsahuje** - alergen je slozkou produktu
- **Muze obsahovat** - riziko stopovych mnozstvi

## Konfigurace

Prejdete do **WooCommerce > Nastaveni > Polski > Potraviny** a nakonfigurujte sekci "Alergeny".

| Nastaveni | Vychozi | Popis |
|------------|----------|------|
| Aktivovat deklaraci alergenu | Ano | Aktivuje system alergenu |
| Zvyraznit ve slozkach | Ano | Automaticke zvyrazneni alergenu v seznamu slozek |
| Zobrazit ikony | Ne | Zobrazuje ikony alergenu |
| Pozice na strance | Zalozka potraviny | Kde zobrazit alergeny |
| Rezim "Muze obsahovat" | Ano | Aktivuje moznost deklarace stopovych mnozstvi |
| Format zobrazeni | Seznam | `seznam`, `ikony`, `inline` |

## Automaticke zvyraznovani ve slozkach

Podle cl. 21 narizeni FIC musi byt alergeny v seznamu slozek zvyrazneny - obvykle tucnym pismem nebo velkymi pismeny. Plugin automaticky vyhledava nazvy alergenu v poli "Slozeni" a obaluje je tagem `<strong>`.

Priklad:

Zadany text:
```
Mąka pszenna, cukier, masło, jaja kurze, mleko odtłuszczone w proszku, sól
```

Zobrazeny text:
```
Mąka pszenna (gluten), cukier, masło (mleko), jaja kurze, mleko odtłuszczone w proszku, sól
```

S HTML zvyraznenim:
```html
Mąka <strong>pszenna (gluten)</strong>, cukier, masło (<strong>mleko</strong>), 
<strong>jaja</strong> kurze, <strong>mleko</strong> odtłuszczone w proszku, sól
```

### Konfigurace zvyraznovani

Plugin prohledava seznam slozek na synonyma alergenu. Seznam synonym je konfigurovatelny:

```php
add_filter('polski/allergens/synonyms', function (array $synonyms): array {
    $synonyms['gluten'] = ['pszenica', 'pszenna', 'żyto', 'żytnia', 'owies', 'owsiana', 'jęczmień', 'orkisz'];
    $synonyms['milk'] = ['mleko', 'mleczny', 'mleczna', 'masło', 'śmietana', 'jogurt', 'ser', 'laktoza'];
    $synonyms['eggs'] = ['jaja', 'jajka', 'jajeczny', 'jajeczna'];

    return $synonyms;
});
```

## Shortcode

Pouzijte shortcode `[polski_allergens]` pro zobrazeni deklarace alergenu.

### Parametry

| Parametr | Typ | Vychozi | Popis |
|----------|-----|----------|------|
| `product_id` | int | aktualni | ID produktu |
| `format` | string | `list` | Format: `list`, `icons`, `inline`, `table` |
| `show_may_contain` | bool | `true` | Zda zobrazit sekci "Muze obsahovat" |
| `show_icons` | bool | `false` | Zda zobrazit ikony alergenu |
| `label` | string | `"Alergeny: "` | Stitek pred seznamem |
| `wrapper` | string | `div` | Obalujici HTML element |

### Priklady pouziti

Zakladni seznam alergenu:

```html
[polski_allergens]
```

Vysledek:
```
Alergeny: mleko, vejce, lepek
Muze obsahovat: orechy
```

Inline format s ikonami:

```html
[polski_allergens format="inline" show_icons="true"]
```

Bez sekce "Muze obsahovat":

```html
[polski_allergens show_may_contain="false"]
```

Format tabulky:

```html
[polski_allergens format="table"]
```

Pro konkretni produkt:

```html
[polski_allergens product_id="456"]
```

V sablone PHP:

```php
echo do_shortcode('[polski_allergens product_id="' . $product->get_id() . '"]');
```

## Programaticky pristup

### Ziskani alergenu produktu

```php
// Alergeny "Obsahuje"
$allergens = wp_get_object_terms($product_id, 'polski_allergen');

foreach ($allergens as $allergen) {
    echo $allergen->name; // napr. "Mleko a derivaty"
}

// Alergeny "Muze obsahovat"
$may_contain = get_post_meta($product_id, '_polski_may_contain_allergens', true);
if ($may_contain) {
    $may_contain_terms = get_terms([
        'taxonomy' => 'polski_allergen',
        'slug'     => $may_contain,
    ]);
}
```

### Prirazeni alergenu programove

```php
// Nastaveni alergenu "Obsahuje"
wp_set_object_terms($product_id, ['gluten', 'milk', 'eggs'], 'polski_allergen');

// Nastaveni alergenu "Muze obsahovat"
update_post_meta($product_id, '_polski_may_contain_allergens', ['nuts', 'soy']);
```

### Kontrola, zda produkt obsahuje alergen

```php
if (has_term('gluten', 'polski_allergen', $product_id)) {
    // Produkt obsahuje lepek
}
```

## CSV import

Alergeny lze importovat pres CSV:

| Sloupec CSV | Popis | Format |
|-------------|------|--------|
| `polski_allergens` | Alergeny "Obsahuje" | Slugy oddelene carkami |
| `polski_may_contain` | Alergeny "Muze obsahovat" | Slugy oddelene carkami |

Priklad:

```csv
"Ciastka maślane","gluten,milk,eggs","nuts,soy"
"Sok pomarańczowy","",""
```

## Stylovani CSS

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

## Nejcastejsi problemy

### Alergeny se nezobrazuji na strance produktu

1. Zkontrolujte, zda je modul alergenu aktivovan
2. Ujistete se, ze produkt ma prirazene alergeny v editoru
3. Overite, zda taxonomie `polski_allergen` je spravne registrovana (Produkty > Alergeny)

### Automaticke zvyraznovani nefunguje

1. Zkontrolujte, zda moznost "Zvyraznit ve slozkach" je aktivovana
2. Ujistete se, ze nazvy alergenu nebo jejich synonyma odpovidaji textu v seznamu slozek
3. Rozsite seznam synonym filtrem `polski/allergens/synonyms`

### Chybi vychozi alergeny po aktivaci

Pokud seznam 14 alergenu nebyl vytvoren automaticky, prejdete do **WooCommerce > Nastaveni > Polski > Potraviny** a kliknete "Vytvorit vychozi alergeny".

## Souvisejici zdroje

- [Modul potravinovych produktu](/cs/food/food-overview/)
- [Vyzivove hodnoty](/cs/food/nutrients/)
- [Nahlasit problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
