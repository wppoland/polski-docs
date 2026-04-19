---
title: Autorzy produktów (Product Authors)
description: Moduł autorów produktów w Polski for WooCommerce - taksonomia product_author, wyświetlanie na stronie produktu i liście, Schema.org Person, kolumna admina.
---

Moduł autorów produktów dodaje niestandardową taksonomię `product_author` do WooCommerce. Pozwala przypisywać twórców (autorów, projektantów, artystów) do produktów. Idealny dla księgarni, sklepów z muzyką, galerii sztuki i innych sklepów, gdzie autor produktu ma znaczenie dla klienta.

## Włączenie modułu

Przejdź do **WooCommerce > Polski > Moduły sklepowe** i włącz **Autorzy produktów** (ID modułu: `product_authors`).

Po włączeniu w panelu edycji produktu pojawi się nowy metabox **Autor produktu**.

## Taksonomia product_author

Moduł rejestruje hierarchiczną taksonomię `product_author` powiązaną z typem `product`. Każdy autor posiada:

- **Nazwa** - imię i nazwisko lub pseudonim
- **Slug** - wersja URL-friendly nazwy
- **Opis** - biogram autora (wyświetlany na stronie archiwum autora)
- **Zdjęcie** - miniaturka autora (term meta `_thumbnail_id`)

### Zarządzanie autorami

Autorzy dostępni są w **Produkty > Autorzy produktów**. Możesz dodawać, edytować i usuwać autorów tak jak kategorie czy tagi produktów.

Przypisywanie autora do produktu odbywa się w panelu edycji produktu - w metaboxie **Autor produktu** po prawej stronie.

## Wyświetlanie na stronie produktu

Na stronie pojedynczego produktu autor wyświetla się pod tytułem produktu (hook `woocommerce_single_product_summary`, priorytet 6). Wyświetlane są:

- Zdjęcie autora (miniaturka 48x48 px)
- Imię i nazwisko z linkiem do strony archiwum autora
- Opis autora (opcjonalnie, pierwszy akapit)

Zmień pozycję wyświetlania filtrem:

```php
add_filter('polski/product_authors/single_position', function (): array {
    return [
        'hook'     => 'woocommerce_single_product_summary',
        'priority' => 25, // po cenie
    ];
});
```

Wyłącz wyświetlanie na stronie produktu:

```php
add_filter('polski/product_authors/show_on_single', '__return_false');
```

## Wyświetlanie na liście produktów

Na stronach kategorii, archiwów i wyników wyszukiwania autor wyświetla się pod nazwą produktu. Wyświetlana jest tylko nazwa autora z linkiem.

Wyłącz wyświetlanie na liście:

```php
add_filter('polski/product_authors/show_in_loop', '__return_false');
```

## Strona archiwum autora

Każdy autor posiada własną stronę archiwum pod adresem `twojsklep.pl/product-author/jan-kowalski/`. Strona wyświetla:

- Pełną biografię autora
- Zdjęcie autora
- Listę wszystkich produktów autora (z paginacją)

Szablon archiwum można nadpisać w motywie: `woocommerce/taxonomy-product_author.php`.

## Schema.org Person

Moduł automatycznie dodaje znaczniki Schema.org `Person` w formacie JSON-LD na stronie produktu:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jan Kowalski",
  "description": "Polski pisarz, autor bestsellerów.",
  "image": "https://twojsklep.pl/wp-content/uploads/jan-kowalski.jpg",
  "url": "https://twojsklep.pl/product-author/jan-kowalski/"
}
```

Znacznik `Person` jest połączony z produktem przez właściwość `author` w schemacie `Product`. Pomaga to wyszukiwarkom poprawnie identyfikować twórców produktów.

Wyłącz Schema.org:

```php
add_filter('polski/product_authors/schema_enabled', '__return_false');
```

## Kolumna w panelu admina

Moduł dodaje kolumnę **Autor** do listy produktów w panelu admina (**Produkty > Wszystkie produkty**). Kolumna wyświetla nazwę autora z linkiem do filtrowania produktów tego autora.

Kolumna jest sortowalna - kliknij nagłówek, żeby posortować produkty po autorze.

## Filtrowanie i wyszukiwanie

### Filtr w panelu admina

Na liście produktów dostępny jest dropdown **Filtruj po autorze** obok istniejących filtrów kategorii i statusu.

### WP_Query

Wyszukuj produkty po autorze w kodzie:

```php
$query = new WP_Query([
    'post_type' => 'product',
    'tax_query' => [
        [
            'taxonomy' => 'product_author',
            'field'    => 'slug',
            'terms'    => 'jan-kowalski',
        ],
    ],
]);
```

### REST API

Taksonomia jest dostępna przez REST API WooCommerce:

```
GET /wp-json/wc/v3/products?product_author=jan-kowalski
GET /wp-json/wp/v2/product_author
```

## Import i eksport

Podczas importu/eksportu CSV WooCommerce kolumna `product_author` jest automatycznie obsługiwana. Użyj nazwy autora (nie slug) w pliku CSV.

## Stylowanie CSS

Klasy CSS mają prefiks `.polski-product-author-`:

- `.polski-product-author` - kontener autora
- `.polski-product-author__image` - zdjęcie autora
- `.polski-product-author__name` - nazwa autora
- `.polski-product-author__bio` - opis autora
- `.polski-product-author--loop` - kontener autora na liście produktów

## Rozwiązywanie problemów

**Autor nie wyświetla się na produkcie** - sprawdź, czy motyw obsługuje hook `woocommerce_single_product_summary`. Niektóre motywy nadpisują szablony WooCommerce.

**Strona autora zwraca 404** - przejdź do **Ustawienia > Bezpośrednie odnośniki** i kliknij **Zapisz zmiany** (flush rewrite rules).

**Zdjęcie autora nie wyświetla się** - upewnij się, że zdjęcie zostało dodane w edycji terminu (Produkty > Autorzy produktów > Edytuj).

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
