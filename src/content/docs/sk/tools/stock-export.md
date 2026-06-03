---
title: Export skladových stavov
description: Modul exportu skladových stavov v Polski for WooCommerce - export CSV s prahovým filtrom, podpora variácií, HTML náhľad a formát Excel.
---

Modul exportu skladových stavov generuje súbory CSV s údajmi o skladových stavoch produktov WooCommerce. Podporuje 10 konfigurovateľných polí, filtrovanie podľa prahu množstva, plnú podporu variantných produktov a režim náhľadu v HTML tabuľke.

## Zapnutie modulu

Prejdite do **WooCommerce > Polski > Nástroje** a zapnite **Export skladových stavov** (ID modulu: `stock_export`).

## Panel exportu

Panel exportu je dostupný v **Produkty > Export skladových stavov** (`edit.php?post_type=product&page=polski-stock-export`).

### Prahový filter

Filtrujte produkty podľa množstva na sklade:

| Operátor | Popis                           | Príklad                         |
| -------- | ------------------------------- | ------------------------------- |
| `<=`     | Menej alebo rovné               | `<= 5` - produkty so zásobou do 5 kusov |
| `>=`     | Viac alebo rovné                | `>= 100` - produkty s veľkou zásobou   |
| `=`      | Presne rovné                    | `= 0` - produkty bez zásoby            |

Prahový filter umožňuje rýchlo identifikovať produkty vyžadujúce doplnenie alebo produkty s nadmernou zásobou.

Ponechajte pole prahu prázdne, aby ste exportovali všetky produkty bez ohľadu na skladový stav.

### Výber polí

Začiarknite polia, ktoré majú byť v exporte. Konfigurácia sa ukladá do možností WordPress.

| Pole                     | Stĺpec CSV               | Popis                                     |
| ------------------------ | ------------------------ | ----------------------------------------- |
| ID produktu              | `product_id`             | ID záznamu produktu (post ID)             |
| SKU                      | `sku`                    | Kód SKU produktu                          |
| Názov produktu           | `product_name`           | Celý názov produktu                       |
| Skladový stav            | `stock_status`           | `instock`, `outofstock`, `onbackorder`    |
| Množstvo na sklade       | `stock_quantity`         | Aktuálne množstvo (null, ak nie je spravované) |
| Správa skladu            | `manage_stock`           | `yes` alebo `no`                          |
| Prah nízkeho stavu       | `low_stock_threshold`    | Prah upozornenia na nízky stav            |
| Povolené spätné objednávky | `backorders`           | `no`, `notify`, `yes`                     |
| Kategória                | `category`               | Kategórie produktu (oddelené čiarkou)     |
| Cena                     | `price`                  | Aktuálna cena produktu                    |

## Podpora variácií

Variabilné produkty (variable products) sa exportujú s plnou podporou variácií:

- **Nadradený produkt** - exportovaný so súhrnným skladovým stavom (ak je správa skladu na úrovni produktu)
- **Variácie** - každá variácia je exportovaná ako samostatný riadok s vlastnými skladovými údajmi

Názov variácie obsahuje atribúty v zátvorke, napr. `Polokošeľa polo (Červená, XL)`.

Keď je správa skladu nastavená na úrovni variácie, nadradený produkt zobrazuje súhrnný stav všetkých variácií.

## Režim náhľadu

Kliknite na **Náhľad** namiesto **Exportovať**, aby ste zobrazili údaje v HTML tabuľke priamo v admin paneli. Náhľad umožňuje:

- Skontrolovať údaje pred exportom
- Overiť správnosť filtrov
- Rýchlo prehliadnuť skladové stavy bez sťahovania súboru

Tabuľka náhľadu je triediteľná podľa každého stĺpca (kliknite na hlavičku). Riadky s nulovým skladovým stavom sú zvýraznené červenou farbou. Riadky s nízkym stavom (pod prahom) sú zvýraznené žltou farbou.

## Formát súboru CSV

Súbor CSV je optimalizovaný na otváranie v Microsoft Exceli s poľskými regionálnymi nastaveniami:

- **BOM (Byte Order Mark)** - súbor začína značkou UTF-8 BOM (`\xEF\xBB\xBF`), vďaka čomu Excel správne rozpozná kódovanie
- **Oddeľovač**: bodkočiarka (`;`) - Excel s poľskými regionálnymi nastaveniami predvolene rozpoznáva bodkočiarku ako oddeľovač stĺpcov
- **Kódovanie**: UTF-8
- **Oddeľovač textu**: dvojitá úvodzovka (`"`)
- **Konce riadkov**: `\r\n` (Windows)

Vďaka BOM a bodkočiarke možno súbor CSV otvoriť v Exceli dvojitým kliknutím, bez nutnosti importu s nastavením kódovania.

## Export

Po nakonfigurovaní filtrov a polí kliknite na **Exportovať do CSV**. Súbor sa stiahne cez prehliadač s názvom `stock-export-YYYY-MM-DD.csv`.

## WP-CLI

Exportujte skladové stavy z príkazového riadka:

```bash
wp polski export stock --threshold="<=5" --output=/tmp/low-stock.csv
```

Parametre:

- `--threshold` - prahový filter (napr. `<=5`, `>=100`, `=0`)
- `--fields` - zoznam polí (oddelené čiarkou)
- `--include-variations` - zahrnúť variácie (predvolene `yes`)
- `--output` - cesta výstupného súboru

## Hooky

```php
// Pridaj vlastné pole do exportu
add_filter('polski/stock_export/fields', function (array $fields): array {
    $fields['warehouse_location'] = [
        'label'    => 'Umiestnenie v sklade',
        'callback' => function (\WC_Product $product): string {
            return $product->get_meta('_warehouse_location');
        },
    ];
    return $fields;
});

// Úprava dopytu produktov
add_filter('polski/stock_export/query_args', function (array $args): array {
    $args['category'] = ['elektronika'];
    return $args;
});

// Zmena oddeľovača CSV
add_filter('polski/stock_export/csv_separator', function (): string {
    return ','; // čiarka namiesto bodkočiarky
});
```

## Riešenie problémov

**Excel zobrazuje poľské znaky ako paškvil** - uistite sa, že export generuje súbor s BOM (predvolene zapnutý). V starších verziách Excelu (pred 2016) použite funkciu importu údajov s ručným nastavením kódovania UTF-8.

**Variácie sa neobjavujú v exporte** - skontrolujte, či majú variácie stav "Publikované". Variácie v koncepte sa preskakujú.

**Prahový filter nefunguje** - filter funguje len na produktoch so zapnutou správou skladu (`manage_stock = yes`). Produkty bez správy skladu majú `stock_quantity = null`.

**Náhľad sa načítava príliš dlho** - pri viac ako 5 000 produktoch môže byť náhľad pomalý. Použite prahový filter na obmedzenie počtu výsledkov alebo exportujte priamo do CSV.

Hlásenie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výhradne informačný charakter a nepredstavuje právne poradenstvo. Polski for WooCommerce je open source softvér (GPLv2) dodávaný bez záruky.</div>
