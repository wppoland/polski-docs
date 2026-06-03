---
title: Autoři produktů (Product Authors)
description: Modul autorů produktů v Polski for WooCommerce - taxonomie product_author, zobrazení na stránce produktu a v seznamu, Schema.org Person, sloupec admina.
---

Modul autorů produktů přidává vlastní taxonomii `product_author` do WooCommerce. Umožňuje přiřazovat tvůrce (autory, designéry, umělce) k produktům. Ideální pro knihkupectví, obchody s hudbou, galerie umění a další obchody, kde autor produktu má pro zákazníka význam.

## Zapnutí modulu

Přejděte do **WooCommerce > Polski > Moduly obchodu** a zapněte **Autoři produktů** (ID modulu: `product_authors`).

Po zapnutí se v panelu editace produktu objeví nový metabox **Autor produktu**.

## Taxonomie product_author

Modul registruje hierarchickou taxonomii `product_author` propojenou s typem `product`. Každý autor má:

- **Název** - jméno a příjmení nebo pseudonym
- **Slug** - URL-friendly verze názvu
- **Popis** - životopis autora (zobrazený na stránce archivu autora)
- **Fotografie** - miniatura autora (term meta `_thumbnail_id`)

### Správa autorů

Autoři jsou dostupní v **Produkty > Autoři produktů**. Můžete přidávat, upravovat a odstraňovat autory stejně jako kategorie nebo štítky produktů.

Přiřazení autora k produktu probíhá v panelu editace produktu, v metaboxu **Autor produktu** na pravé straně.

## Zobrazení na stránce produktu

Na stránce jednotlivého produktu se autor zobrazuje pod titulkem produktu (hook `woocommerce_single_product_summary`, priorita 6). Zobrazují se:

- Fotografie autora (miniatura 48x48 px)
- Jméno a příjmení s odkazem na stránku archivu autora
- Popis autora (volitelně, první odstavec)

Pozici zobrazení změňte filtrem:

```php
add_filter('polski/product_authors/single_position', function (): array {
    return [
        'hook'     => 'woocommerce_single_product_summary',
        'priority' => 25, // po ceně
    ];
});
```

Vypnutí zobrazení na stránce produktu:

```php
add_filter('polski/product_authors/show_on_single', '__return_false');
```

## Zobrazení v seznamu produktů

Na stránkách kategorií, archivů a výsledků vyhledávání se autor zobrazuje pod názvem produktu. Zobrazuje se pouze jméno autora s odkazem.

Vypnutí zobrazení v seznamu:

```php
add_filter('polski/product_authors/show_in_loop', '__return_false');
```

## Stránka archivu autora

Každý autor má vlastní stránku archivu na adrese `vasobchod.cz/product-author/jan-novak/`. Stránka zobrazuje:

- Plný životopis autora
- Fotografii autora
- Seznam všech produktů autora (se stránkováním)

Šablonu archivu lze přepsat v šabloně: `woocommerce/taxonomy-product_author.php`.

## Schema.org Person

Modul automaticky přidává značky Schema.org `Person` ve formátu JSON-LD na stránce produktu:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jan Novák",
  "description": "Český spisovatel, autor bestsellerů.",
  "image": "https://vasobchod.cz/wp-content/uploads/jan-novak.jpg",
  "url": "https://vasobchod.cz/product-author/jan-novak/"
}
```

Značka `Person` je propojena s produktem prostřednictvím vlastnosti `author` ve schématu `Product`. To pomáhá vyhledávačům správně identifikovat tvůrce produktů.

Vypnutí Schema.org:

```php
add_filter('polski/product_authors/schema_enabled', '__return_false');
```

## Sloupec v admin panelu

Modul přidává sloupec **Autor** do seznamu produktů v admin panelu (**Produkty > Všechny produkty**). Sloupec zobrazuje jméno autora s odkazem na filtrování produktů tohoto autora.

Sloupec je řaditelný, klikněte na nadpis pro seřazení produktů podle autora.

## Filtrování a vyhledávání

### Filtr v admin panelu

V seznamu produktů je dostupný rozbalovací filtr **Filtrovat podle autora** vedle stávajících filtrů kategorií a stavu.

### WP_Query

Vyhledávejte produkty podle autora v kódu:

```php
$query = new WP_Query([
    'post_type' => 'product',
    'tax_query' => [
        [
            'taxonomy' => 'product_author',
            'field'    => 'slug',
            'terms'    => 'jan-novak',
        ],
    ],
]);
```

### REST API

Taxonomie je dostupná přes REST API WooCommerce:

```
GET /wp-json/wc/v3/products?product_author=jan-novak
GET /wp-json/wp/v2/product_author
```

## Import a export

Při importu/exportu CSV WooCommerce je sloupec `product_author` automaticky zpracován. V CSV souboru použijte jméno autora (nikoli slug).

## Stylování CSS

CSS třídy mají prefix `.polski-product-author-`:

- `.polski-product-author` - kontejner autora
- `.polski-product-author__image` - fotografie autora
- `.polski-product-author__name` - jméno autora
- `.polski-product-author__bio` - popis autora
- `.polski-product-author--loop` - kontejner autora v seznamu produktů

## Řešení problémů

**Autor se nezobrazuje na produktu** - zkontrolujte, zda šablona podporuje hook `woocommerce_single_product_summary`. Některé šablony přepisují šablony WooCommerce.

**Stránka autora vrací 404** - přejděte do **Nastavení > Trvalé odkazy** a klikněte na **Uložit změny** (flush rewrite rules).

**Fotografie autora se nezobrazuje** - ujistěte se, že byla fotografie přidána při editaci termínu (Produkty > Autoři produktů > Upravit).

Hlášení problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Polski for WooCommerce je software s otevřeným zdrojovým kódem (GPLv2) poskytovaný bez záruky.</div>
