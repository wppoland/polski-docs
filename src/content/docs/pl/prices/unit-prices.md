---
title: Cena jednostkowa
description: Wyświetlanie ceny za kilogram, litr, metr lub sztukę w WooCommerce zgodnie z polskim prawem konsumenckim.
---

Dyrektywa 98/6/WE oraz polska ustawa o informowaniu o cenach towarów i usług wymagają, aby sklep internetowy prezentował cenę jednostkową produktu - czyli cenę za kilogram, litr, metr bieżący lub sztukę. Plugin Polski for WooCommerce automatyzuje ten obowiązek, dodając informację o cenie jednostkowej na stronie produktu, w listingach oraz w koszyku.

## Kiedy cena jednostkowa jest wymagana

Obowiązek podawania ceny jednostkowej dotyczy produktów sprzedawanych na wagę, objętość lub długość. W praktyce obejmuje to:

- produkty spożywcze (cena za kg lub litr)
- kosmetyki i środki czystości (cena za 100 ml lub litr)
- materiały budowlane (cena za metr bieżący lub metr kwadratowy)
- produkty sypkie (cena za kg)

Cena jednostkowa musi być widoczna w każdym miejscu, gdzie prezentowana jest cena produktu - na stronie produktu, w wynikach wyszukiwania, w porównywarkach cenowych oraz w koszyku.

## Konfiguracja

Przejdź do **WooCommerce > Ustawienia > Polski > Ceny** i włącz moduł ceny jednostkowej. Po aktywacji w edytorze produktu pojawi się nowa sekcja w zakładce "Ogólne".

### Pola w edytorze produktu

| Pole | Opis | Przykład |
|------|------|---------|
| Ilość bazowa | Ilość produktu w opakowaniu | `500` |
| Jednostka bazowa | Jednostka miary produktu | `g` |
| Ilość referencyjna | Ilość referencyjna dla ceny jednostkowej | `1` |
| Jednostka referencyjna | Jednostka, za którą podawana jest cena | `kg` |

Dla produktu o wadze 500 g i cenie 12,99 zł plugin automatycznie obliczy cenę jednostkową jako 25,98 zł/kg.

### Obsługiwane jednostki

Plugin obsługuje następujące jednostki miary:

- **Waga:** g, kg, mg
- **Objętość:** ml, l, cl
- **Długość:** mm, cm, m
- **Sztuki:** szt (piece)

Przeliczanie między jednostkami odbywa się automatycznie. Jeśli produkt ma wagę w gramach, a jednostka referencyjna to kilogram, plugin sam przeliczy wartość.

## Warianty produktów

Dla produktów zmiennych (variable products) cenę jednostkową można ustawić na dwóch poziomach:

1. **Na poziomie produktu głównego** - wartość dziedziczona przez wszystkie warianty
2. **Na poziomie wariantu** - nadpisuje ustawienia produktu głównego

W przypadku wariantów o różnej wadze (np. opakowanie 250 g i 500 g) ustaw cenę jednostkową osobno dla każdego wariantu. Plugin automatycznie zaktualizuje wyświetlaną cenę przy zmianie wariantu przez klienta (AJAX).

## Shortcode

Użyj shortcode `[polski_unit_price]`, aby wyświetlić cenę jednostkową w dowolnym miejscu.

### Parametry

| Parametr | Typ | Domyślny | Opis |
|----------|-----|----------|------|
| `product_id` | int | bieżący | ID produktu |
| `before` | string | `""` | Tekst przed ceną |
| `after` | string | `""` | Tekst po cenie |
| `wrapper` | string | `span` | Element HTML opakowujący |

### Przykłady użycia

Podstawowe użycie na stronie produktu:

```html
[polski_unit_price]
```

Z niestandardowym ID produktu i tekstem:

```html
[polski_unit_price product_id="123" before="Cena za kg: " after=" brutto"]
```

W szablonie PHP:

```php
echo do_shortcode('[polski_unit_price product_id="' . $product->get_id() . '"]');
```

## Hook: polski/price/unit_price_html

Ten filtr pozwala zmodyfikować HTML ceny jednostkowej przed wyświetleniem.

### Sygnatura

```php
apply_filters('polski/price/unit_price_html', string $html, float $unit_price, WC_Product $product, array $args): string
```

### Parametry

| Parametr | Typ | Opis |
|----------|-----|------|
| `$html` | string | Wygenerowany HTML ceny jednostkowej |
| `$unit_price` | float | Obliczona cena jednostkowa |
| `$product` | WC_Product | Obiekt produktu WooCommerce |
| `$args` | array | Tablica z kluczami: `base_qty`, `base_unit`, `ref_qty`, `ref_unit` |

### Przykład: dodanie klasy CSS

```php
add_filter('polski/price/unit_price_html', function (string $html, float $unit_price, WC_Product $product, array $args): string {
    $category_class = '';
    if (has_term('napoje', 'product_cat', $product->get_id())) {
        $category_class = ' polski-unit-price--beverage';
    }

    return sprintf(
        '<span class="polski-unit-price%s">%s/%s</span>',
        esc_attr($category_class),
        wc_price($unit_price),
        esc_html($args['ref_unit'])
    );
}, 10, 4);
```

### Przykład: ukrycie ceny jednostkowej dla wybranych kategorii

```php
add_filter('polski/price/unit_price_html', function (string $html, float $unit_price, WC_Product $product): string {
    if (has_term('uslugi', 'product_cat', $product->get_id())) {
        return '';
    }

    return $html;
}, 10, 3);
```

## Import CSV

Cenę jednostkową można importować za pomocą standardowego importera WooCommerce. Dodaj następujące kolumny do pliku CSV:

| Kolumna CSV | Opis |
|-------------|------|
| `polski_unit_base_qty` | Ilość bazowa |
| `polski_unit_base_unit` | Jednostka bazowa |
| `polski_unit_ref_qty` | Ilość referencyjna |
| `polski_unit_ref_unit` | Jednostka referencyjna |

Przykładowy wiersz CSV:

```csv
"Kawa mielona 500g",29.99,500,g,1,kg
```

## Najczęstsze problemy

### Cena jednostkowa nie wyświetla się

Sprawdź, czy:

1. Moduł ceny jednostkowej jest włączony w ustawieniach
2. Produkt ma wypełnione pola ilości bazowej i jednostki
3. Motyw obsługuje hook `woocommerce_after_shop_loop_item_title` (listing) oraz `woocommerce_single_product_summary` (strona produktu)

### Nieprawidłowe przeliczenie

Upewnij się, że jednostka bazowa i referencyjna należą do tej samej kategorii (np. obie wagowe lub obie objętościowe). Plugin nie przelicza między kategoriami - nie można przeliczyć gramów na litry.

## Powiązane zasoby

- [Zgłoś problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
