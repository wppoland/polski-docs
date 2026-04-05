---
title: Producent i marka
description: Dane producenta (GPSR), taksonomia marki, numery GTIN/EAN oraz shortcode do wyświetlania informacji o producencie w WooCommerce.
---

Od 13 grudnia 2024 r. rozporządzenie GPSR wymaga podawania danych producenta na stronie produktu. Wtyczka Polski for WooCommerce pozwala dodać dane producenta, markę i numer GTIN/EAN do każdego produktu.

## Wymagania GPSR

Na stronie produktu musisz podać:

- nazwa producenta lub importera
- adres pocztowy producenta
- adres e-mail lub strona internetowa do kontaktu
- w przypadku produktów spoza UE - dane osoby odpowiedzialnej na terenie UE

Klient musi mieć dostęp do tych danych przed zakupem.

## Konfiguracja

### Włączenie modułu

Przejdź do **WooCommerce > Ustawienia > Polski > Producent** i włącz moduł. Po włączeniu w edytorze produktu pojawią się nowe pola.

### Dane producenta (GPSR)

W edytorze produktu, w zakładce "Polski" lub w panelu bocznym, znajdziesz sekcję "Producent (GPSR)":

| Pole | Wymagane | Opis |
|------|----------|------|
| Nazwa producenta | Tak | Pełna nazwa firmy producenta |
| Adres | Tak | Ulica, numer, kod pocztowy, miasto, kraj |
| E-mail | Tak* | Adres e-mail kontaktowy |
| Strona WWW | Tak* | URL strony producenta |
| Osoba odpowiedzialna w UE | Warunkowo | Wymagane dla produktów spoza UE |
| Adres osoby odpowiedzialnej | Warunkowo | Pełny adres osoby odpowiedzialnej |

*Wymagany jest co najmniej jeden sposób kontaktu elektronicznego (e-mail lub strona WWW).

### Globalne dane producenta

Jeśli sprzedajesz głównie własne produkty, ustaw domyślne dane producenta w **WooCommerce > Ustawienia > Polski > Producent**. Te dane pojawią się przy produktach bez własnych danych producenta.

## Taksonomia marki

Wtyczka tworzy taksonomię `polski_brand` do zarządzania markami produktów.

### Zarządzanie markami

Przejdź do **Produkty > Marki**, aby tworzyć i edytować marki. Każda marka może zawierać:

- nazwę
- slug (identyfikator URL)
- opis
- logo (miniaturka taksonomii)

### Przypisywanie marki do produktu

W edytorze produktu, w panelu bocznym, znajdziesz metabox "Marka" - wybierz markę z listy lub dodaj nową.

### Strony marki

Wtyczka tworzy stronę archiwum dla każdej marki. Klienci przeglądają produkty marki pod adresem:

```
/marka/nazwa-marki/
```

Slug archiwum zmienisz w ustawieniach wtyczki.

## GTIN/EAN

Wtyczka dodaje pole na numer identyfikacyjny produktu (standard GS1).

### Obsługiwane formaty

| Format | Długość | Zastosowanie |
|--------|---------|-------------|
| EAN-13 | 13 cyfr | Standard europejski |
| EAN-8 | 8 cyfr | Małe opakowania |
| UPC-A | 12 cyfr | Standard amerykański |
| GTIN-14 | 14 cyfr | Opakowania zbiorcze |
| ISBN-13 | 13 cyfr | Książki |

### Walidacja

Wtyczka sprawdza poprawność numeru GTIN/EAN (cyfra kontrolna). Nieprawidłowy numer zostanie odrzucony z komunikatem błędu.

### Structured data (Schema.org)

Numer GTIN trafia automatycznie do danych strukturalnych (JSON-LD), co poprawia widoczność w Google:

```json
{
    "@type": "Product",
    "gtin13": "5901234123457",
    "brand": {
        "@type": "Brand",
        "name": "Nazwa marki"
    },
    "manufacturer": {
        "@type": "Organization",
        "name": "Nazwa producenta",
        "address": "ul. Przykładowa 1, 00-001 Warszawa"
    }
}
```

## Shortcode

Użyj shortcode `[polski_manufacturer]`, aby wyświetlić dane producenta w dowolnym miejscu.

### Parametry

| Parametr | Typ | Domyślny | Opis |
|----------|-----|----------|------|
| `product_id` | int | bieżący | ID produktu |
| `fields` | string | `all` | Pola do wyświetlenia: `all`, `name`, `address`, `email`, `url`, `gtin`, `brand` |
| `layout` | string | `list` | Układ: `list`, `inline`, `table` |
| `show_label` | bool | `true` | Czy wyświetlać etykiety pól |
| `wrapper` | string | `div` | Element HTML opakowujący |

### Przykłady użycia

Pełne dane producenta:

```html
[polski_manufacturer]
```

Wynik (układ list):

```
Producent: ABC Sp. z o.o.
Adres: ul. Fabryczna 10, 00-001 Warszawa
E-mail: kontakt@abc.pl
Strona: https://abc.pl
```

Tylko nazwa i GTIN:

```html
[polski_manufacturer fields="name,gtin"]
```

Marka produktu w układzie inline:

```html
[polski_manufacturer fields="brand" layout="inline"]
```

Dla konkretnego produktu:

```html
[polski_manufacturer product_id="789" fields="name,address" layout="table"]
```

W szablonie PHP:

```php
echo do_shortcode('[polski_manufacturer product_id="' . $product->get_id() . '" fields="name,gtin"]');
```

## Programistyczny dostęp do danych

### Pobieranie danych producenta

```php
$manufacturer_name = get_post_meta($product_id, '_polski_manufacturer_name', true);
$manufacturer_address = get_post_meta($product_id, '_polski_manufacturer_address', true);
$manufacturer_email = get_post_meta($product_id, '_polski_manufacturer_email', true);
$manufacturer_url = get_post_meta($product_id, '_polski_manufacturer_url', true);
$gtin = get_post_meta($product_id, '_polski_gtin', true);
```

### Pobieranie marki

```php
$brands = wp_get_object_terms($product_id, 'polski_brand');
if (!empty($brands) && !is_wp_error($brands)) {
    $brand_name = $brands[0]->name;
    $brand_logo = get_term_meta($brands[0]->term_id, 'thumbnail_id', true);
}
```

## Import CSV

Dane producenta i GTIN importujesz przez CSV:

| Kolumna CSV | Opis |
|-------------|------|
| `polski_manufacturer_name` | Nazwa producenta |
| `polski_manufacturer_address` | Adres producenta |
| `polski_manufacturer_email` | E-mail producenta |
| `polski_manufacturer_url` | Strona WWW producenta |
| `polski_gtin` | Numer GTIN/EAN |
| `polski_brand` | Nazwa marki |

Przykład:

```csv
"Krem nawilżający","ABC Kosmetyki Sp. z o.o.","ul. Kwiatowa 5, 00-100 Warszawa","info@abc.pl","https://abc.pl","5901234123457","ABC Kosmetyki"
```

## Najczęstsze problemy

### Dane producenta nie wyświetlają się na stronie produktu

1. Sprawdź, czy moduł producenta jest włączony
2. Upewnij się, że produkt ma wypełnione dane lub skonfigurowane są dane domyślne
3. Zweryfikuj, czy motyw obsługuje hook `woocommerce_single_product_summary` lub `woocommerce_product_meta_end`

### GTIN odrzucany jako nieprawidłowy

Sprawdź cyfrę kontrolną numeru GTIN. Użyj kalkulatora GS1 do weryfikacji: https://www.gs1.org/services/check-digit-calculator

### Marka nie pojawia się w Schema.org

Upewnij się, że marka jest przypisana do produktu przez taksonomię `polski_brand`, a nie tylko wpisana w polu tekstowym producenta.

## Powiązane zasoby

- [Zgłoś problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
