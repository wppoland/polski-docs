---
title: Modul potravinárskych produktov
description: Prehľad modulu potravín - výživové hodnoty, alergény, zloženie, Nutri-Score, alkohol a krajina pôvodu vo WooCommerce.
---

Predaj potravín online vyžaduje uvádzanie informácií o zložení, výživových hodnotách, alergénoch a pôvode produktu (nariadenie EÚ č. 1169/2011). Plugin Polski for WooCommerce poskytuje kompletný modul na správu týchto údajov.

## Právne požiadavky

Nariadenie FIC ukladá predajcom potravín povinnosť uvádzať nasledujúce informácie:

| Informácia | Povinná | Právny základ |
|------------|----------|----------------|
| Názov potraviny | Áno | Čl. 9 ods. 1 písm. a |
| Zoznam zložiek | Áno | Čl. 9 ods. 1 písm. b |
| Alergény | Áno | Čl. 9 ods. 1 písm. c |
| Množstvo zložiek | Podmienečne | Čl. 9 ods. 1 písm. d |
| Čisté množstvo | Áno | Čl. 9 ods. 1 písm. e |
| Dátum minimálnej trvanlivosti | Áno | Čl. 9 ods. 1 písm. f |
| Podmienky uchovávania | Podmienečne | Čl. 9 ods. 1 písm. g |
| Údaje výrobcu | Áno | Čl. 9 ods. 1 písm. h |
| Krajina pôvodu | Podmienečne | Čl. 9 ods. 1 písm. i |
| Výživová hodnota | Áno | Čl. 9 ods. 1 písm. l |

Pri predaji na diaľku (internetový obchod) musí byť väčšina týchto informácií dostupná pred nákupom - s výnimkou dátumu minimálnej trvanlivosti, ktorý môže byť uvedený pri doručení.

## Zložky modulu

Modul potravín sa skladá z niekoľkých podmodulov, ktoré je možné zapínať nezávisle:

### Výživové hodnoty

Tabuľka výživových hodnôt per 100 g alebo 100 ml produktu. Zahŕňa energiu (kJ/kcal), tuky, sacharidy, bielkoviny, soľ a ďalšie výživové zložky.

Podrobnosti: [Výživové hodnoty](/sk/food/nutrients/)

### Alergény

Systém deklarácie alergénov založený na taxonómii WordPress. 14 hlavných alergénov podľa prílohy II nariadenia FIC.

Podrobnosti: [Alergény](/sk/food/allergens/)

### Nutri-Score

Zobrazenie označenia Nutri-Score (A-E) s príslušnými farbami a CSS triedami.

Podrobnosti: [Nutri-Score](/sk/food/nutri-score/)

### Zloženie (zoznam)

Textové pole na úplný zoznam zložiek produktu. Alergény v zozname sú automaticky zvýrazňované tučným písmom v súlade s požiadavkami FIC.

### Alkohol

Polia na správu informácií o alkoholických produktoch:

| Pole | Popis |
|------|------|
| Obsah alkoholu (% obj.) | Percentuálny obsah alkoholu |
| Varovanie | Hlásenie o zákaze predaja neplnoletým |
| Overenie veku | Checkbox potvrdenia plnoletosti pri pridaní do košíka |

Pre nápoje s obsahom alkoholu nad 1,2% obj. sa vyžaduje uvedenie obsahu alkoholu na etikete (čl. 28 FIC).

### Krajina pôvodu

Pole na informáciu o krajine pôvodu alebo mieste proveniencie. Vyžadované pre:

- mäso (hovädzie, bravčové, hydinové, jahňacie)
- ovocie a zeleninu
- ryby
- olivový olej
- med
- produkty, kde by absencia informácie mohla zavádzať spotrebiteľa

## Konfigurácia

### Zapnutie modulu

Prejdite do **WooCommerce > Nastavenia > Polski > Potraviny** a aktivujte modul a vyberte potrebné podmoduly.

### Globálne nastavenia

| Nastavenie | Popis |
|------------|------|
| Referenčná jednotka | Predvolená jednotka: per 100 g alebo per 100 ml |
| Pozícia na stránke produktu | Kde zobrazovať informácie (záložka, pod popisom, v bočnom paneli) |
| Zobrazovať v zozname | Či zobrazovať skrátené informácie na stránkach kategórií |
| Automatické zvýrazňovanie alergénov | Tučné písmo názvov alergénov v zozname zložiek |

### Pozícia na stránke produktu

Informácie o potravinárskom produkte môžu byť zobrazované na viacerých miestach:

1. **Nová záložka** (odporúčané) - samostatná záložka "Informácie o potravine" vedľa popisu a recenzií
2. **Pod popisom** - priamo pod popisom produktu
3. **V metadátach** - v sekcii SKU/kategórie
4. **Vlastné** - pomocou shortcódov na ľubovoľnom mieste

## Editor produktu

Po aktivácii modulu potravín sa v editore produktu zobrazí nová záložka "Potraviny" s nasledujúcimi sekciami:

- **Výživové hodnoty** - tabuľka s poľami na všetky zložky
- **Zloženie** - textové pole (WYSIWYG) na zoznam zložiek
- **Alergény** - checkbox zoznam alergénov
- **Nutri-Score** - výber úrovne A-E
- **Alkohol** - polia súvisiace s alkoholickými nápojmi
- **Pôvod** - krajina pôvodu a miesto proveniencie

## Import CSV

Všetky potravinárske údaje je možné importovať hromadne cez CSV:

| Stĺpec CSV | Popis | Formát |
|-------------|------|--------|
| `polski_nutrients` | Výživové hodnoty | JSON |
| `polski_ingredients` | Zoznam zložiek | Text |
| `polski_allergens` | Alergény | Slugy oddelené čiarkami |
| `polski_nutri_score` | Nutri-Score | Písmeno A-E |
| `polski_alcohol_content` | Obsah alkoholu | Číslo (napr. `5.0`) |
| `polski_country_of_origin` | Krajina pôvodu | Text |

Príklad:

```csv
"Sok pomarańczowy 1L",'{"energy_kj":180,"energy_kcal":43,"fat":0.1,"carbohydrates":9.8,"sugars":8.4,"protein":0.7,"salt":0.01}',,"",B,,Hiszpania
```

## Kompatibilita so Schema.org

Modul automaticky generuje štrukturované údaje kompatibilné so Schema.org:

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

## Programové rozšírenia

### Pridanie vlastného potravinárskeho poľa

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

### Filter zobrazovania potravinárskych informácií

```php
add_filter('polski/food/display_html', function (string $html, int $product_id): string {
    // Úprava HTML pred zobrazením
    return $html;
}, 10, 2);
```

## Najčastejšie problémy

### Záložka "Potraviny" sa nezobrazuje v editore produktu

1. Skontrolujte, či modul potravín je zapnutý v nastaveniach
2. Overte, či produkt nie je typu "externý/afiliátový" (modul nepodporuje tento typ)
3. Vymažte cache prehliadača a opätovne načítajte administračný panel

### Alergény nie sú tučné v zozname zložiek

Uistite sa, že možnosť "Automatické zvýrazňovanie alergénov" je zapnutá a že názvy alergénov v zozname zodpovedajú názvom v taxonómii.

### Výživové hodnoty sa zobrazujú nesprávne

Skontrolujte formát údajov - hodnoty musia byť čísla (s bodkou ako desatinným oddeľovačom v databáze). Plugin automaticky formátuje zobrazenie podľa poľských regionálnych nastavení (čiarka).

## Súvisiace zdroje

- [Výživové hodnoty](/sk/food/nutrients/)
- [Alergény](/sk/food/allergens/)
- [Nutri-Score](/sk/food/nutri-score/)
- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
