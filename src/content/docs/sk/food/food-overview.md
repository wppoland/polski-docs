---
title: Modul potravinárskych produktov
description: Prehľad modulu potravín - výživové hodnoty, alergény, zloženie, Nutri-Score, alkohol a krajina pôvodu vo WooCommerce.
---

Predaj potravín online vyžaduje uvádzanie informácií o zložení, výživových hodnotách, alergénoch a pôvode produktu (nariadenie EÚ č. 1169/2011). Plugin Polski for WooCommerce poskytuje kompletný modul na správu týchto údajov.

## Právne požiadavky

Predajca potravín musí uviesť:

| Informácia | Vyžadovaná | Právny základ |
|------------|----------|----------------|
| Názov potraviny | Áno | Čl. 9 ods. 1 písm. a |
| Zoznam zložiek | Áno | Čl. 9 ods. 1 písm. b |
| Alergény | Áno | Čl. 9 ods. 1 písm. c |
| Množstvo zložiek | Podmienečne | Čl. 9 ods. 1 písm. d |
| Čisté množstvo | Áno | Čl. 9 ods. 1 písm. e |
| Dátum minimálnej trvanlivosti | Áno | Čl. 9 ods. 1 písm. f |
| Podmienky skladovania | Podmienečne | Čl. 9 ods. 1 písm. g |
| Údaje výrobcu | Áno | Čl. 9 ods. 1 písm. h |
| Krajina pôvodu | Podmienečne | Čl. 9 ods. 1 písm. i |
| Výživová hodnota | Áno | Čl. 9 ods. 1 písm. l |

V internetovom obchode musí byť väčšina týchto informácií dostupná pred nákupom. Výnimkou je dátum minimálnej trvanlivosti - uvádzaš ho pri doručení.

## Súčasti modulu

Modul potravín má niekoľko podmodulov. Každý zapínaš samostatne:

### Výživové hodnoty

Tabuľka výživových hodnôt na 100 g alebo 100 ml. Obsahuje energiu (kJ/kcal), tuky, sacharidy, bielkoviny, soľ a ďalšie zložky.

Podrobnosti: [Výživové hodnoty](food/nutrients/)

### Alergény

Deklarácia 14 hlavných alergénov založená na taxonómii WordPress.

Podrobnosti: [Alergény](food/allergens/)

### Nutri-Score

Zobrazovanie označenia Nutri-Score (A-E) s príslušnými farbami a CSS triedami.

Podrobnosti: [Nutri-Score](food/nutri-score/)

### Zloženie (zoznam)

Textové pole na zoznam zložiek. Alergény v zozname sa automaticky zvýrazňujú tučným písmom.

### Alkohol

Polia na správu informácií o alkoholických produktoch:

| Pole | Popis |
|------|------|
| Obsah alkoholu (% obj.) | Percentuálny obsah alkoholu |
| Upozornenie | Správa o zákaze predaja maloletým |
| Overenie veku | Checkbox potvrdenia plnoletosti pri pridaní do košíka |

Nápoje s obsahom alkoholu nad 1,2 % obj. vyžadujú uvedenie obsahu alkoholu.

### Krajina pôvodu

Pole na informáciu o krajine pôvodu alebo mieste proveniencie. Vyžadované pre:

- mäso (hovädzie, bravčové, hydina, baranina)
- ovocie a zeleninu
- ryby
- olivový olej
- med
- produkty, kde by chýbajúca informácia mohla uviesť spotrebiteľa do omylu

## Konfigurácia

### Zapnutie modulu

Prejdi na **WooCommerce > Nastavenia > Polski > Potraviny** a aktivuj modul aj vyber potrebné podmoduly.

### Globálne nastavenia

| Nastavenie | Popis |
|------------|------|
| Referenčná jednotka | Predvolená jednotka: na 100 g alebo na 100 ml |
| Pozícia na stránke produktu | Kde zobrazovať informácie (záložka, pod popisom, v bočnom paneli) |
| Zobrazuj v listingu | Či zobrazovať skrátené informácie na stránkach kategórií |
| Automatické zvýrazňovanie alergénov | Zvýraznenie názvov alergénov v zozname zložiek |

### Pozícia na stránke produktu

Údaje o potravine zobrazuješ na jednom z miest:

1. **Nová záložka** (odporúčané) - samostatná záložka "Informácie o potravine" vedľa popisu a recenzií
2. **Pod popisom** - priamo pod popisom produktu
3. **V metadátach** - v sekcii SKU/kategórie
4. **Vlastná** - pomocou shortcódov na ľubovoľnom mieste

## Editor produktu

Po zapnutí modulu sa v editore produktu objaví záložka "Potraviny" so sekciami:

- **Výživové hodnoty** - tabuľka s poliami na všetky zložky
- **Zloženie** - textové pole (WYSIWYG) na zoznam zložiek
- **Alergény** - checkbox zoznam alergénov
- **Nutri-Score** - výber úrovne A-E
- **Alkohol** - polia súvisiace s alkoholickými nápojmi
- **Pôvod** - krajina pôvodu a miesto proveniencie

## CSV import

Potravinárske údaje importuješ hromadne cez CSV:

| CSV stĺpec | Popis | Formát |
|-------------|------|--------|
| `polski_nutrients` | Výživové hodnoty | JSON |
| `polski_ingredients` | Zoznam zložiek | Text |
| `polski_allergens` | Alergény | Slugy oddelené čiarkami |
| `polski_nutri_score` | Nutri-Score | Písmeno A-E |
| `polski_alcohol_content` | Obsah alkoholu | Číslo (napr. `5.0`) |
| `polski_country_of_origin` | Krajina pôvodu | Text |

Príklad:

```csv
"Pomarančový džús 1L",'{"energy_kj":180,"energy_kcal":43,"fat":0.1,"carbohydrates":9.8,"sugars":8.4,"protein":0.7,"salt":0.01}',,"",B,,Španielsko
```

## Kompatibilita so Schema.org

Modul automaticky vytvára štrukturované údaje Schema.org:

```json
{
    "@type": "Product",
    "additionalProperty": [
        {
            "@type": "PropertyValue",
            "name": "Energetická hodnota",
            "value": "250 kcal / 1046 kJ"
        }
    ],
    "hasAllergen": ["gluten", "mlieko"],
    "countryOfOrigin": {
        "@type": "Country",
        "name": "Slovensko"
    }
}
```

## Programátorské rozšírenia

### Pridanie vlastného potravinárskeho poľa

```php
add_filter('polski/food/custom_fields', function (array $fields): array {
    $fields['organic_certified'] = [
        'label'   => 'Ekologický certifikát',
        'type'    => 'select',
        'options' => [
            ''       => 'Žiadny',
            'eu_bio' => 'EU Bio',
            'demeter' => 'Demeter',
        ],
    ];

    return $fields;
});
```

### Filter zobrazenia potravinárskych informácií

```php
add_filter('polski/food/display_html', function (string $html, int $product_id): string {
    // Úprava HTML pred zobrazením
    return $html;
}, 10, 2);
```

## Najčastejšie problémy

### Záložka "Potraviny" sa neobjavuje v editore produktu

1. Skontroluj, či je modul potravín zapnutý v nastaveniach
2. Over, či produkt nie je typu "externý/affiliate" (modul tento typ nepodporuje)
3. Vymaž cache prehliadača a znova načítaj administračný panel

### Alergény nie sú zvýraznené v zozname zložiek

Uisti sa, že možnosť "Automatické zvýrazňovanie alergénov" je zapnutá a že názvy alergénov v zozname zodpovedajú názvom v taxonómii.

### Výživové hodnoty sa zobrazujú nesprávne

Skontroluj formát údajov - v databáze hodnoty používajú bodku ako oddeľovač (napr. 9.5). Plugin ich automaticky zobrazuje so slovenskou čiarkou (9,5).

## Súvisiace zdroje

- [Výživové hodnoty](food/nutrients/)
- [Alergény](food/allergens/)
- [Nutri-Score](food/nutri-score/)
- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informatívny charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
