---
title: Czas dostawy
description: Konfiguracja czasu dostawy per produkt i wariant, domyślna wartość zapasowa oraz taksonomia polski_delivery_time w WooCommerce.
---

Polskie prawo wymaga, by sklep informował o czasie dostawy przed złożeniem zamówienia. Wtyczka Polski for WooCommerce pozwala ustawić czas dostawy globalnie, per produkt i per wariant.

## Wymagania prawne

Podaj czas dostawy zanim klient kliknie przycisk zamówienia. Informacja powinna być:

- jasna i zrozumiała
- podana w dniach roboczych lub kalendarzowych
- widoczna na stronie produktu

Brak tej informacji grozi karami od UOKiK.

## Taksonomia polski_delivery_time

Wtyczka tworzy taksonomię `polski_delivery_time`, w której definiujesz czasy dostawy i przypisujesz je do produktów.

### Zarządzanie terminami dostawy

Przejdź do **Produkty > Czas dostawy**, aby zarządzać dostępnymi terminami.

Przykładowe terminy:

| Nazwa | Slug | Opis |
|-------|------|------|
| 1-2 dni robocze | 1-2-dni-robocze | Produkty na magazynie |
| 3-5 dni roboczych | 3-5-dni-roboczych | Produkty zamawiane u dostawcy |
| 7-14 dni roboczych | 7-14-dni-roboczych | Produkty na zamówienie |
| Do 24 godzin | do-24-godzin | Produkty cyfrowe / ekspres |
| Dostępny od ręki | dostepny-od-reki | Natychmiastowa realizacja |

Terminy dostawy to taksonomia WordPress - tworzysz, edytujesz i usuwasz je w panelu admina.

## Konfiguracja

### Ustawienia globalne

Przejdź do **WooCommerce > Ustawienia > Polski > Ceny** i skonfiguruj sekcję "Czas dostawy".

| Ustawienie | Opis |
|------------|------|
| Włącz czas dostawy | Aktywuje wyświetlanie na stronie produktu |
| Domyślny czas dostawy | Wartość zapasowa (fallback) dla produktów bez przypisanego terminu |
| Pokaż na listingu | Wyświetla czas dostawy na stronach kategorii |
| Pokaż w koszyku | Wyświetla czas dostawy w koszyku |
| Etykieta | Tekst przed czasem dostawy (domyślnie: "Czas dostawy:") |

### Domyślny fallback

Domyślny czas dostawy (fallback) pojawia się, gdy produkt nie ma własnego terminu. Dzięki temu nie musisz edytować każdego produktu osobno.

Hierarchia wyświetlania:

1. Czas dostawy wariantu (jeśli ustawiony)
2. Czas dostawy produktu głównego (jeśli ustawiony)
3. Domyślny czas dostawy z ustawień globalnych (fallback)

Jeśli nic nie jest ustawione, czas dostawy nie pojawi się.

### Przypisywanie do produktu

W edytorze produktu otwórz zakładkę "Wysyłka". W polu **Czas dostawy** wybierz termin z listy lub dodaj nowy.

### Przypisywanie do wariantu

Każdy wariant może mieć własny czas dostawy. Rozwiń sekcję wariantu i ustaw termin. Warianty bez terminu dziedziczą wartość z produktu głównego.

## Shortcode

Użyj shortcode `[polski_delivery_time]`, aby wyświetlić czas dostawy w dowolnym miejscu.

### Parametry

| Parametr | Typ | Domyślny | Opis |
|----------|-----|----------|------|
| `product_id` | int | bieżący | ID produktu |
| `label` | string | `"Czas dostawy: "` | Etykieta przed wartością |
| `show_label` | bool | `true` | Czy wyświetlać etykietę |
| `wrapper` | string | `span` | Element HTML opakowujący |
| `fallback` | string | `""` | Tekst, gdy brak czasu dostawy |

### Przykłady użycia

Podstawowe użycie:

```html
[polski_delivery_time]
```

Wynik: `Czas dostawy: 1-2 dni robocze`

Bez etykiety:

```html
[polski_delivery_time show_label="false"]
```

Wynik: `1-2 dni robocze`

Z niestandardową etykietą i fallbackiem:

```html
[polski_delivery_time label="Wysyłka: " fallback="Zapytaj o dostępność"]
```

Dla konkretnego produktu:

```html
[polski_delivery_time product_id="456"]
```

W szablonie PHP:

```php
echo do_shortcode('[polski_delivery_time product_id="' . $product->get_id() . '"]');
```

## Programistyczne zarządzanie czasem dostawy

### Przypisywanie terminu do produktu

```php
wp_set_object_terms($product_id, '1-2-dni-robocze', 'polski_delivery_time');
```

### Pobieranie terminu produktu

```php
$terms = wp_get_object_terms($product_id, 'polski_delivery_time');
if (!empty($terms) && !is_wp_error($terms)) {
    $delivery_time = $terms[0]->name;
}
```

### Tworzenie nowego terminu

```php
wp_insert_term(
    '2-3 dni robocze',
    'polski_delivery_time',
    [
        'slug'        => '2-3-dni-robocze',
        'description' => 'Standardowy czas realizacji',
    ]
);
```

## Import CSV

Do importu czasu dostawy przez CSV użyj kolumny:

| Kolumna CSV | Opis | Wartość |
|-------------|------|--------|
| `polski_delivery_time` | Nazwa terminu dostawy | `1-2 dni robocze` |

Jeśli termin o podanej nazwie nie istnieje, zostanie automatycznie utworzony podczas importu.

Przykład:

```csv
"Laptop Dell XPS 15",5499.00,"3-5 dni roboczych"
"Mysz Logitech MX",299.00,"1-2 dni robocze"
```

## Dynamiczny czas dostawy

Możesz programistycznie zmieniać czas dostawy na podstawie stanu magazynowego lub daty zamówienia.

```php
add_filter('polski/delivery_time/display', function (string $delivery_time, WC_Product $product): string {
    if ($product->get_stock_quantity() > 0) {
        return '1-2 dni robocze';
    }

    return '7-14 dni roboczych';
}, 10, 2);
```

## Stylowanie CSS

```css
.polski-delivery-time {
    display: inline-block;
    margin-top: 0.5em;
    font-size: 0.9em;
    color: #2e7d32;
}

.polski-delivery-time__label {
    font-weight: 600;
}

.polski-delivery-time__value {
    color: #333;
}
```

## Najczęstsze problemy

### Czas dostawy nie wyświetla się

1. Sprawdź, czy moduł jest włączony w ustawieniach
2. Upewnij się, że produkt ma przypisany termin lub ustawiony jest domyślny fallback
3. Zweryfikuj, czy motyw obsługuje hook `woocommerce_single_product_summary`

### Czas dostawy wariantu nie zmienia się po wyborze

Sprawdź, czy JavaScript wtyczki jest załadowany. Otwórz konsolę przeglądarki i szukaj błędów JS. Wtyczka aktualizuje czas dostawy wariantu przez AJAX.

## Powiązane zasoby

- [Zgłoś problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
