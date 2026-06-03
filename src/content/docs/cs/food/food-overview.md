---
title: Modul potravinových produktů
description: Přehled modulu potravin - výživové hodnoty, alergeny, složky, Nutri-Score, alkohol a země původu ve WooCommerce.
---

Prodej potravin online vyžaduje uvádění informací o složení, výživových hodnotách, alergenech a původu produktu (nařízení EU č. 1169/2011). Plugin Polski for WooCommerce poskytuje kompletní modul pro správu těchto dat.

## Právní požadavky

Prodejce potravin musí uvést:

| Informace | Vyžadovaná | Právní základ |
|------------|----------|----------------|
| Název potraviny | Ano | Čl. 9 odst. 1 písm. a |
| Seznam složek | Ano | Čl. 9 odst. 1 písm. b |
| Alergeny | Ano | Čl. 9 odst. 1 písm. c |
| Množství složek | Podmíněně | Čl. 9 odst. 1 písm. d |
| Čisté množství | Ano | Čl. 9 odst. 1 písm. e |
| Datum minimální trvanlivosti | Ano | Čl. 9 odst. 1 písm. f |
| Podmínky uchovávání | Podmíněně | Čl. 9 odst. 1 písm. g |
| Údaje výrobce | Ano | Čl. 9 odst. 1 písm. h |
| Země původu | Podmíněně | Čl. 9 odst. 1 písm. i |
| Výživová hodnota | Ano | Čl. 9 odst. 1 písm. l |

V internetovém obchodě musí být většina těchto informací dostupná před nákupem. Výjimkou je datum minimální trvanlivosti - to uvádíte při doručení.

## Komponenty modulu

Modul potravin má několik podmodulů. Každý zapínáte samostatně:

### Výživové hodnoty

Tabulka výživových hodnot na 100 g nebo 100 ml. Obsahuje energii (kJ/kcal), tuky, sacharidy, bílkoviny, sůl a další složky.

Podrobnosti: [Výživové hodnoty](food/nutrients/)

### Alergeny

Deklarace 14 hlavních alergenů založená na taxonomii WordPress.

Podrobnosti: [Alergeny](food/allergens/)

### Nutri-Score

Zobrazení označení Nutri-Score (A-E) s příslušnými barvami a CSS třídami.

Podrobnosti: [Nutri-Score](food/nutri-score/)

### Složky (seznam)

Textové pole na seznam složek. Alergeny v seznamu jsou automaticky zvýrazněny tučně.

### Alkohol

Pole pro správu informací o alkoholických produktech:

| Pole | Popis |
|------|------|
| Obsah alkoholu (% obj.) | Procentuální obsah alkoholu |
| Varování | Zpráva o zákazu prodeje nezletilým |
| Ověření věku | Checkbox potvrzení zletilosti při přidání do košíku |

Nápoje s obsahem alkoholu nad 1,2 % obj. vyžadují uvedení obsahu alkoholu.

### Země původu

Pole na informaci o zemi původu nebo místě provenience. Vyžadováno pro:

- maso (hovězí, vepřové, drůbeží, jehněčí)
- ovoce a zeleninu
- ryby
- olivový olej
- med
- produkty, kde by chybějící informace mohla uvést spotřebitele v omyl

## Konfigurace

### Zapnutí modulu

Přejděte do **WooCommerce > Nastavení > Polski > Potraviny** a aktivujte modul a vyberte potřebné podmoduly.

### Globální nastavení

| Nastavení | Popis |
|------------|------|
| Referenční jednotka | Výchozí jednotka: na 100 g nebo na 100 ml |
| Pozice na stránce produktu | Kde zobrazovat informace (záložka, pod popisem, v bočním panelu) |
| Zobrazit v listingu | Zda zobrazovat zkrácené informace na stránkách kategorií |
| Automatické zvýrazňování alergenů | Tučné zvýraznění názvů alergenů v seznamu složek |

### Pozice na stránce produktu

Data o potravinách zobrazujete na jednom z míst:

1. **Nová záložka** (doporučeno) - samostatná záložka "Informace o potravině" vedle popisu a recenzí
2. **Pod popisem** - přímo pod popisem produktu
3. **V metadatech** - v sekci SKU/kategorie
4. **Vlastní** - pomocí shortcodů na libovolném místě

## Editor produktu

Po zapnutí modulu se v editoru produktu objeví záložka "Potraviny" se sekcemi:

- **Výživové hodnoty** - tabulka s poli na všechny složky
- **Složky** - textové pole (WYSIWYG) na seznam složek
- **Alergeny** - checkbox seznam alergenů
- **Nutri-Score** - výběr úrovně A-E
- **Alkohol** - pole související s alkoholickými nápoji
- **Původ** - země původu a místo provenience

## Import CSV

Potravinová data importujete hromadně přes CSV:

| Sloupec CSV | Popis | Formát |
|-------------|------|--------|
| `polski_nutrients` | Výživové hodnoty | JSON |
| `polski_ingredients` | Seznam složek | Text |
| `polski_allergens` | Alergeny | Slugy oddělené čárkami |
| `polski_nutri_score` | Nutri-Score | Písmeno A-E |
| `polski_alcohol_content` | Obsah alkoholu | Číslo (např. `5.0`) |
| `polski_country_of_origin` | Země původu | Text |

Příklad:

```csv
"Sok pomarańczowy 1L",'{"energy_kj":180,"energy_kcal":43,"fat":0.1,"carbohydrates":9.8,"sugars":8.4,"protein":0.7,"salt":0.01}',,"",B,,Hiszpania
```

## Kompatibilita se Schema.org

Modul automaticky vytváří strukturovaná data Schema.org:

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

## Programatická rozšíření

### Přidání vlastního potravinového pole

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

### Filtr zobrazení potravinových informací

```php
add_filter('polski/food/display_html', function (string $html, int $product_id): string {
    // Úprava HTML před zobrazením
    return $html;
}, 10, 2);
```

## Nejčastější problémy

### Záložka "Potraviny" se neobjevuje v editoru produktu

1. Zkontrolujte, zda je modul potravin zapnutý v nastavení
2. Ověřte, zda produkt není typu "externí/afiliační" (modul tento typ nepodporuje)
3. Vymažte cache prohlížeče a znovu načtěte administrační panel

### Alergeny nejsou zvýrazněny v seznamu složek

Ujistěte se, že je možnost "Automatické zvýrazňování alergenů" zapnutá a že názvy alergenů v seznamu odpovídají názvům v taxonomii.

### Výživové hodnoty se zobrazují nesprávně

Zkontrolujte formát dat - v databázi používají hodnoty tečku jako oddělovač (např. 9.5). Plugin je automaticky zobrazuje s polskou čárkou (9,5).

## Související zdroje

- [Výživové hodnoty](food/nutrients/)
- [Alergeny](food/allergens/)
- [Nutri-Score](food/nutri-score/)
- [Nahlásit problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
