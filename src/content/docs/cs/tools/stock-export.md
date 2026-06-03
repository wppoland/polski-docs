---
title: Export stavu zásob
description: Modul exportu stavu zásob v Polski for WooCommerce - export CSV s prahovým filtrem, podpora variant, náhled HTML a formát Excel.
---

Modul exportu stavu zásob generuje soubory CSV s daty o stavu zásob produktů WooCommerce. Podporuje 10 konfigurovatelných polí, filtrování podle prahu množství, plnou podporu variantních produktů a režim náhledu v tabulce HTML.

## Zapnutí modulu

Přejděte na **WooCommerce > Polski > Nástroje** a zapněte **Export stavu zásob** (ID modulu: `stock_export`).

## Panel exportu

Panel exportu je dostupný v **Produkty > Export stavu zásob** (`edit.php?post_type=product&page=polski-stock-export`).

### Prahový filtr

Filtrujte produkty podle množství na skladě:

| Operátor | Popis                           | Příklad                         |
| -------- | ------------------------------- | ------------------------------- |
| `<=`     | Méně nebo rovno                 | `<= 5` - produkty se zásobou do 5 kusů |
| `>=`     | Více nebo rovno                 | `>= 100` - produkty s velkou zásobou    |
| `=`      | Přesně rovno                    | `= 0` - produkty bez zásoby            |

Prahový filtr umožňuje rychle identifikovat produkty vyžadující doplnění nebo produkty s nadměrnou zásobou.

Ponechte pole prahu prázdné, abyste exportovali všechny produkty bez ohledu na stav zásob.

### Výběr polí

Zaškrtněte pole, která se mají objevit v exportu. Konfigurace se ukládá do voleb WordPress.

| Pole                     | Sloupec CSV              | Popis                                     |
| ------------------------ | ------------------------ | ----------------------------------------- |
| ID produktu              | `product_id`             | ID záznamu produktu (post ID)             |
| SKU                      | `sku`                    | Kód SKU produktu                          |
| Název produktu           | `product_name`           | Úplný název produktu                      |
| Stav zásob               | `stock_status`           | `instock`, `outofstock`, `onbackorder`    |
| Množství na skladě       | `stock_quantity`         | Aktuální množství (null, pokud není spravováno) |
| Správa zásob             | `manage_stock`           | `yes` nebo `no`                           |
| Práh nízkého stavu       | `low_stock_threshold`    | Práh upozornění na nízký stav             |
| Povolené zpětné objednávky | `backorders`           | `no`, `notify`, `yes`                     |
| Kategorie                | `category`               | Kategorie produktu (oddělené čárkou)      |
| Cena                     | `price`                  | Aktuální cena produktu                    |

## Podpora variant

Variantní produkty (variable products) se exportují s plnou podporou variant:

- **Nadřazený produkt** - exportován se souhrnným stavem zásob (pokud je správa zásob na úrovni produktu)
- **Varianty** - každá varianta je exportována jako samostatný řádek s vlastními daty o zásobách

Název varianty obsahuje atributy v závorce, např. `Polokošile (Červená, XL)`.

Když je správa zásob nastavena na úrovni variant, nadřazený produkt zobrazuje celkový stav všech variant.

## Režim náhledu

Klikněte na **Náhled** místo **Exportovat**, abyste zobrazili data v tabulce HTML přímo v admin panelu. Náhled umožňuje:

- Zkontrolovat data před exportem
- Ověřit správnost filtrů
- Rychle projít stavy zásob bez stahování souboru

Tabulka náhledu je řaditelná podle každého sloupce (klikněte na záhlaví). Řádky s nulovým stavem zásob jsou zvýrazněny červeně. Řádky s nízkým stavem (pod prahem) jsou zvýrazněny žlutě.

## Formát souboru CSV

Soubor CSV je optimalizován pro otevírání v Microsoft Excel s polským regionálním nastavením:

- **BOM (Byte Order Mark)** - soubor začíná značkou UTF-8 BOM (`\xEF\xBB\xBF`), díky čemuž Excel správně rozpozná kódování
- **Oddělovač**: středník (`;`) - Excel s polským regionálním nastavením standardně rozpoznává středník jako oddělovač sloupců
- **Kódování**: UTF-8
- **Oddělovač textu**: dvojité uvozovky (`"`)
- **Konce řádků**: `\r\n` (Windows)

Díky BOM a středníku lze soubor CSV otevřít v Excelu dvojklikem, bez nutnosti importu s nastavením kódování.

## Export

Po nakonfigurování filtrů a polí klikněte na **Exportovat do CSV**. Soubor bude stažen prohlížečem s názvem `stock-export-YYYY-MM-DD.csv`.

## WP-CLI

Export stavu zásob z příkazové řádky:

```bash
wp polski export stock --threshold="<=5" --output=/tmp/low-stock.csv
```

Parametry:

- `--threshold` - prahový filtr (např. `<=5`, `>=100`, `=0`)
- `--fields` - seznam polí (oddělená čárkou)
- `--include-variations` - zahrnout varianty (výchozí `yes`)
- `--output` - cesta výstupního souboru

## Hooky

```php
// Přidání vlastního pole do exportu
add_filter('polski/stock_export/fields', function (array $fields): array {
    $fields['warehouse_location'] = [
        'label'    => 'Umístění ve skladu',
        'callback' => function (\WC_Product $product): string {
            return $product->get_meta('_warehouse_location');
        },
    ];
    return $fields;
});

// Úprava dotazu na produkty
add_filter('polski/stock_export/query_args', function (array $args): array {
    $args['category'] = ['elektronika'];
    return $args;
});

// Změna oddělovače CSV
add_filter('polski/stock_export/csv_separator', function (): string {
    return ','; // čárka místo středníku
});
```

## Řešení problémů

**Excel zobrazuje české znaky jako paznaky** - ujistěte se, že export generuje soubor s BOM (ve výchozím nastavení zapnuto). Ve starších verzích Excelu (před rokem 2016) použijte funkci importu dat s ručním nastavením kódování UTF-8.

**Varianty se neobjevují v exportu** - zkontrolujte, zda mají varianty stav "Publikováno". Varianty v konceptu jsou vynechány.

**Prahový filtr nefunguje** - filtr funguje pouze u produktů se zapnutou správou zásob (`manage_stock = yes`). Produkty bez správy zásob mají `stock_quantity = null`.

**Náhled se načítá příliš dlouho** - při více než 5 000 produktech může být náhled pomalý. Použijte prahový filtr pro omezení počtu výsledků, nebo exportujte přímo do CSV.

Hlášení problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Polski for WooCommerce je open source software (GPLv2) dodávaný bez záruky.</div>
