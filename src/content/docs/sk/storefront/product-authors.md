---
title: Autori produktov (Product Authors)
description: Modul autorov produktov v Polski for WooCommerce - taxonómia product_author, zobrazenie na stránke produktu a v zozname, Schema.org Person, admin stĺpec.
---

Modul autorov produktov pridáva vlastnú taxonómiu `product_author` do WooCommerce. Umožňuje priraďovať tvorcov (autorov, dizajnérov, umelcov) k produktom. Ideálny pre kníhkupectvá, obchody s hudbou, umelecké galérie a iné obchody, kde má autor produktu význam pre zákazníka.

## Zapnutie modulu

Prejdite do **WooCommerce > Polski > Moduly obchodu** a zapnite **Autori produktov** (ID modulu: `product_authors`).

Po zapnutí sa v paneli úpravy produktu objaví nový metabox **Autor produktu**.

## Taxonómia product_author

Modul registruje hierarchickú taxonómiu `product_author` previazanú s typom `product`. Každý autor má:

- **Názov** - meno a priezvisko alebo pseudonym
- **Slug** - URL-friendly verzia názvu
- **Popis** - biografia autora (zobrazená na stránke archívu autora)
- **Fotka** - náhľad autora (term meta `_thumbnail_id`)

### Správa autorov

Autori sú dostupní v **Produkty > Autori produktov**. Môžete pridávať, upravovať a odstraňovať autorov rovnako ako kategórie či štítky produktov.

Priraďovanie autora k produktu prebieha v paneli úpravy produktu, v metaboxe **Autor produktu** na pravej strane.

## Zobrazenie na stránke produktu

Na stránke jednotlivého produktu sa autor zobrazuje pod názvom produktu (hook `woocommerce_single_product_summary`, priorita 6). Zobrazujú sa:

- Fotka autora (náhľad 48x48 px)
- Meno a priezvisko s odkazom na stránku archívu autora
- Popis autora (voliteľne, prvý odsek)

Pozíciu zobrazenia zmeníte filtrom:

```php
add_filter('polski/product_authors/single_position', function (): array {
    return [
        'hook'     => 'woocommerce_single_product_summary',
        'priority' => 25, // po cene
    ];
});
```

Vypnite zobrazenie na stránke produktu:

```php
add_filter('polski/product_authors/show_on_single', '__return_false');
```

## Zobrazenie v zozname produktov

Na stránkach kategórií, archívov a výsledkov vyhľadávania sa autor zobrazuje pod názvom produktu. Zobrazuje sa len názov autora s odkazom.

Vypnite zobrazenie v zozname:

```php
add_filter('polski/product_authors/show_in_loop', '__return_false');
```

## Stránka archívu autora

Každý autor má vlastnú stránku archívu na adrese `tvojobchod.sk/product-author/jan-kovac/`. Stránka zobrazuje:

- Plnú biografiu autora
- Fotku autora
- Zoznam všetkých produktov autora (so stránkovaním)

Šablónu archívu možno prepísať v šablóne: `woocommerce/taxonomy-product_author.php`.

## Schema.org Person

Modul automaticky pridáva značky Schema.org `Person` vo formáte JSON-LD na stránke produktu:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jan Kováč",
  "description": "Slovenský spisovateľ, autor bestsellerov.",
  "image": "https://tvojobchod.sk/wp-content/uploads/jan-kovac.jpg",
  "url": "https://tvojobchod.sk/product-author/jan-kovac/"
}
```

Značka `Person` je prepojená s produktom cez vlastnosť `author` v schéme `Product`. Pomáha to vyhľadávačom správne identifikovať tvorcov produktov.

Vypnite Schema.org:

```php
add_filter('polski/product_authors/schema_enabled', '__return_false');
```

## Stĺpec v admin paneli

Modul pridáva stĺpec **Autor** do zoznamu produktov v admin paneli (**Produkty > Všetky produkty**). Stĺpec zobrazuje názov autora s odkazom na filtrovanie produktov tohto autora.

Stĺpec je zoraditeľný, kliknite na hlavičku, aby ste zoradili produkty podľa autora.

## Filtrovanie a vyhľadávanie

### Filter v admin paneli

V zozname produktov je dostupné rozbaľovacie pole **Filtrovať podľa autora** vedľa existujúcich filtrov kategórií a stavu.

### WP_Query

Vyhľadávajte produkty podľa autora v kóde:

```php
$query = new WP_Query([
    'post_type' => 'product',
    'tax_query' => [
        [
            'taxonomy' => 'product_author',
            'field'    => 'slug',
            'terms'    => 'jan-kovac',
        ],
    ],
]);
```

### REST API

Taxonómia je dostupná cez REST API WooCommerce:

```
GET /wp-json/wc/v3/products?product_author=jan-kovac
GET /wp-json/wp/v2/product_author
```

## Import a export

Počas importu/exportu CSV WooCommerce je stĺpec `product_author` automaticky spracovaný. V CSV súbore použite názov autora (nie slug).

## Štýlovanie CSS

CSS triedy majú prefix `.polski-product-author-`:

- `.polski-product-author` - kontajner autora
- `.polski-product-author__image` - fotka autora
- `.polski-product-author__name` - názov autora
- `.polski-product-author__bio` - popis autora
- `.polski-product-author--loop` - kontajner autora v zozname produktov

## Riešenie problémov

**Autor sa nezobrazuje na produkte** - skontrolujte, či šablóna podporuje hook `woocommerce_single_product_summary`. Niektoré šablóny prepisujú šablóny WooCommerce.

**Stránka autora vracia 404** - prejdite do **Nastavenia > Trvalé odkazy** a kliknite na **Uložiť zmeny** (flush rewrite rules).

**Fotka autora sa nezobrazuje** - uistite sa, že fotka bola pridaná v úprave termínu (Produkty > Autori produktov > Upraviť).

Nahlasovanie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informačný charakter a nepredstavuje právnu radu. Polski for WooCommerce je open source softvér (GPLv2) dodávaný bez záruky.</div>
