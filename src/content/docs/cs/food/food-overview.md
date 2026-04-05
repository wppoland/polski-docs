---
title: Modul potravinovych produktu
description: Prehled modulu potravin - vyzivove hodnoty, alergeny, slozeni, Nutri-Score, alkohol a zeme puvodu ve WooCommerce.
---

Prodej potravin online vyzaduje uvadeni informaci o slozeni, vyzivovych hodnotach, alergenech a puvodu produktu (narizeni EU c. 1169/2011). Plugin dava kompletni modul pro spravu techto dat.

## Pravni pozadavky

Narizeni FIC uklada prodejcum potravin povinnost uvadeni nasledujicich informaci:

| Informace | Vyzadovana | Pravni zaklad |
|------------|----------|----------------|
| Nazev potraviny | Ano | Cl. 9 odst. 1 pism. a |
| Seznam slozek | Ano | Cl. 9 odst. 1 pism. b |
| Alergeny | Ano | Cl. 9 odst. 1 pism. c |
| Mnozstvi slozek | Podminecne | Cl. 9 odst. 1 pism. d |
| Ciste mnozstvi | Ano | Cl. 9 odst. 1 pism. e |
| Datum minimalni trvanlivosti | Ano | Cl. 9 odst. 1 pism. f |
| Podminky uchovavani | Podminecne | Cl. 9 odst. 1 pism. g |
| Udaje vyrobce | Ano | Cl. 9 odst. 1 pism. h |
| Zeme puvodu | Podminecne | Cl. 9 odst. 1 pism. i |
| Vyzivova hodnota | Ano | Cl. 9 odst. 1 pism. l |

V pripade prodeje na dalku (internetovy obchod) musi byt vetsina techto informaci dostupna pred nakupem - s vyjimkou data minimalni trvanlivosti, ktere muze byt uvedeno pri doruceni.

## Komponenty modulu

Modul potravin se sklada z nekolika podmodulu, ktere lze aktivovat nezavisle:

### Vyzivove hodnoty

Tabulka vyzivovych hodnot na 100 g nebo 100 ml produktu. Zahrnuje energii (kJ/kcal), tuky, sacharidy, bilkoviny, sul a dalsi zivy.

Podrobnosti: [Vyzivove hodnoty](/cs/food/nutrients/)

### Alergeny

System deklarace alergenu zalozeny na taxonomii WordPress. 14 hlavnich alergenu podle prilohy II narizeni FIC.

Podrobnosti: [Alergeny](/cs/food/allergens/)

### Nutri-Score

Zobrazovani oznaceni Nutri-Score (A-E) s prislusnymi barvami a CSS tridami.

Podrobnosti: [Nutri-Score](/cs/food/nutri-score/)

### Slozeni (seznam)

Textove pole na uplny seznam slozek produktu. Alergeny v seznamu jsou automaticky zvyraznovany tucnym pismem v souladu s pozadavky FIC.

### Alkohol

Pole pro spravu informaci o alkoholickych produktech:

| Pole | Popis |
|------|------|
| Obsah alkoholu (% obj.) | Procentualni obsah alkoholu |
| Varovani | Zprava o zakazu prodeje nezletilym |
| Overeni veku | Checkbox potvrzeni plnoletosti pri pridani do kosiku |

Pro napoje s obsahem alkoholu nad 1,2 % obj. je vyzadovano uvedeni obsahu alkoholu na etikete (cl. 28 FIC).

### Zeme puvodu

Pole na informaci o zemi puvodu nebo miste provenience. Vyzadovano pro:

- maso (hovetzi, vepřove, drubezi, jehneci)
- ovoce a zeleninu
- ryby
- olivovy olej
- med
- produkty, kde chybejici informace by mohla uvest spotrebitele v omyl

## Konfigurace

### Aktivace modulu

Prejdete do **WooCommerce > Nastaveni > Polski > Potraviny** a aktivujte modul a vyberte potrebne podmoduly.

### Globalni nastaveni

| Nastaveni | Popis |
|------------|------|
| Referencni jednotka | Vychozi jednotka: na 100 g nebo na 100 ml |
| Pozice na strance produktu | Kde zobrazit informace (zalozka, pod popisem, v bocnim panelu) |
| Zobrazit na listingu | Zda zobrazovat zkracene informace na strankach kategorii |
| Automaticke zvyraznovani alergenu | Tucne pismo nazvu alergenu v seznamu slozek |

### Pozice na strance produktu

Informace o potravinovem produktu mohou byt zobrazeny na nekolika mistech:

1. **Nova zalozka** (doporuceno) - samostatna zalozka "Informace o potravine" vedle popisu a recenzi
2. **Pod popisem** - primo pod popisem produktu
3. **V metadatech** - v sekci SKU/kategorie
4. **Vlastni** - pomoci shortcodu na libovolnem miste

## Editor produktu

Po aktivaci modulu potravin se v editoru produktu objevi nova zalozka "Potraviny" s nasledujicimi sekcemi:

- **Vyzivove hodnoty** - tabulka s poli na vsechny slozky
- **Slozeni** - textove pole (WYSIWYG) na seznam slozek
- **Alergeny** - checkbox seznam alergenu
- **Nutri-Score** - vyber urovne A-E
- **Alkohol** - pole souvisejici s alkoholickymi napoji
- **Puvod** - zeme puvodu a misto provenience

## CSV import

Vsechna potravinova data lze importovat hromadne pres CSV:

| Sloupec CSV | Popis | Format |
|-------------|------|--------|
| `polski_nutrients` | Vyzivove hodnoty | JSON |
| `polski_ingredients` | Seznam slozek | Text |
| `polski_allergens` | Alergeny | Slugy oddelene carkami |
| `polski_nutri_score` | Nutri-Score | Pismeno A-E |
| `polski_alcohol_content` | Obsah alkoholu | Cislo (napr. `5.0`) |
| `polski_country_of_origin` | Zeme puvodu | Text |

Priklad:

```csv
"Sok pomarańczowy 1L",'{"energy_kj":180,"energy_kcal":43,"fat":0.1,"carbohydrates":9.8,"sugars":8.4,"protein":0.7,"salt":0.01}',,"",B,,Hiszpania
```

## Kompatibilita se Schema.org

Modul automaticky generuje strukturovana data v souladu se Schema.org:

```json
{
    "@type": "Product",
    "additionalProperty": [
        {
            "@type": "PropertyValue",
            "name": "Wartość energetyczna",
            "value": "250 kcal / 1046 kJ"
        }
    ],
    "hasAllergen": ["gluten", "mleko"],
    "countryOfOrigin": {
        "@type": "Country",
        "name": "Polska"
    }
}
```

## Programaticka rozsireni

### Pridani vlastniho potravinoveho pole

```php
add_filter('polski/food/custom_fields', function (array $fields): array {
    $fields['organic_certified'] = [
        'label'   => 'Certyfikat ekologiczny',
        'type'    => 'select',
        'options' => [
            ''       => 'Brak',
            'eu_bio' => 'EU Bio',
            'demeter' => 'Demeter',
        ],
    ];

    return $fields;
});
```

### Filtr zobrazeni potravinovych informaci

```php
add_filter('polski/food/display_html', function (string $html, int $product_id): string {
    // Uprava HTML pred zobrazenim
    return $html;
}, 10, 2);
```

## Nejcastejsi problemy

### Zalozka "Potraviny" se nezobrazuje v editoru produktu

1. Zkontrolujte, zda je modul potravin aktivovan v nastaveních
2. Overite, zda produkt neni typu "externi/afiliace" (modul nepodporuje tento typ)
3. Vymažte cache prohlizece a znovu nactete administracni panel

### Alergeny nejsou zvyrazneny v seznamu slozek

Ujistete se, ze moznost "Automaticke zvyraznovani alergenu" je aktivovana a ze nazvy alergenu v seznamu odpovidaji nazvum v taxonomii.

### Vyzivove hodnoty se zobrazuji nespravne

Zkontrolujte format dat - hodnoty musi byt cisla (s teckou jako oddelovacem desetinnych mist v databazi). Plugin automaticky formatuje zobrazeni v souladu s polskymi regionalnimi nastavenimi (carka).

## Souvisejici zdroje

- [Vyzivove hodnoty](/cs/food/nutrients/)
- [Alergeny](/cs/food/allergens/)
- [Nutri-Score](/cs/food/nutri-score/)
- [Nahlasit problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
