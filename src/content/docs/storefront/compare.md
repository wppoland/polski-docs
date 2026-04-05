---
title: Porównywarka produktów
description: Moduł porównywania produktów w Polski for WooCommerce - tabela cech, limit produktów, automatyczna zamiana i shortcode.
---

Porównywarka pozwala klientom zestawić kilka produktów obok siebie w tabeli cech. Ułatwia wybór, szczególnie w sklepach z dużą ofertą.

![Porównywarka produktów, lista życzeń i filtry na stronie sklepu](../../../assets/screenshots/screenshot-8-wishlist-compare-quick-view.png)

## Włączenie modułu

Przejdź do **WooCommerce > Polski > Moduły sklepowe** i włącz **Porównywarka produktów**. Na produktach pojawi się przycisk porównania.

## Tabela cech (feature table)

Klient widzi tabelę z kolumną dla każdego produktu. Wiersze zawierają:

- Zdjęcie produktu
- Nazwę z linkiem
- Cenę (z uwzględnieniem promocji i dyrektywy Omnibus)
- Ocenę (gwiazdki)
- Opis krótki
- Status dostępności
- Atrybuty produktu (kolor, rozmiar itp.)
- Czas dostawy (jeśli ustawiony)
- Przycisk **Dodaj do koszyka**

Wiersze z identycznymi wartościami mogą być automatycznie ukryte - włącz **Ukryj identyczne cechy** w ustawieniach. Klient zobaczy tylko różnice między produktami.

## Maksymalna liczba produktów

Domyślnie klient może porównać do **4 produktów** naraz. Zmień limit w ustawieniach lub filtrem:

```php
add_filter('polski/compare/max_items', function (): int {
    return 6;
});
```

Po osiągnięciu limitu przycisk **Dodaj do porównania** staje się nieaktywny. Klient musi najpierw usunąć jeden z produktów.

## Automatyczna zamiana (auto-replace)

Gdy **Automatyczna zamiana** jest włączona, nowy produkt ponad limit zastępuje najstarszy. Klient widzi powiadomienie toast o zamianie.

Włączenie w ustawieniach: **WooCommerce > Polski > Moduły sklepowe > Porównywarka > Automatyczna zamiana**.

Lub programowo:

```php
add_filter('polski/compare/auto_replace', '__return_true');
```

## Działanie AJAX

Porównywarka działa bez przeładowania strony. Dostępne akcje AJAX:

| Akcja                        | Opis                           |
| ---------------------------- | ------------------------------ |
| `polski_compare_add`         | Dodanie produktu               |
| `polski_compare_remove`      | Usunięcie produktu             |
| `polski_compare_get`         | Pobranie listy produktów       |
| `polski_compare_clear`       | Wyczyszczenie porównania       |

Dane przechowywane są w sesji WooCommerce (`WC()->session`). Działają dla gości i zalogowanych klientów.

## Shortcode `[polski_compare]`

Wyświetla tabelę porównania w dowolnym miejscu sklepu.

### Parametry

| Parametr        | Typ    | Domyślnie | Opis                                          |
| --------------- | ------ | --------- | --------------------------------------------- |
| `columns`       | string | `all`     | Cechy do wyświetlenia (oddzielone przecinkiem) |
| `hide_similar`  | string | `no`      | Ukryj wiersze z identycznymi wartościami      |
| `show_remove`   | string | `yes`     | Pokaż przycisk usunięcia produktu             |

### Przykład użycia

```html
[polski_compare columns="image,name,price,rating,stock" hide_similar="yes"]
```

### Użycie na dedykowanej stronie

Utwórz stronę np. **Porównanie produktów** i wstaw shortcode:

```html
[polski_compare]
```

W ustawieniach modułu wskaż tę stronę jako **Strona porównania**. Przycisk **Zobacz porównanie** przekieruje na nią.

## Przycisk porównania

Przycisk widoczny jest na karcie produktu i na stronie produktu. Zmień pozycję filtrem:

```php
add_filter('polski/compare/button_position', function (): string {
    return 'after_add_to_cart';
});
```

Dostępne pozycje: `before_add_to_cart`, `after_add_to_cart`, `after_summary`.

## Pasek porównania (floating bar)

Po dodaniu pierwszego produktu na dole ekranu pojawia się pasek z miniaturkami i przyciskiem **Porównaj**. Na mobile zamiast miniaturek widoczna jest liczba wybranych produktów.

## Porównanie w ramach kategorii

Domyślnie można porównywać produkty z różnych kategorii. Aby ograniczyć do tej samej kategorii:

```php
add_filter('polski/compare/same_category_only', '__return_true');
```

Klient zobaczy komunikat, jeśli spróbuje dodać produkt z innej kategorii.

## Stylowanie CSS

Klasy CSS modułu:

- `.polski-compare-button` - przycisk dodania do porównania
- `.polski-compare-button--active` - produkt jest w porównaniu
- `.polski-compare-table` - tabela porównania
- `.polski-compare-bar` - pasek na dole ekranu
- `.polski-compare-empty` - komunikat pustego porównania

## Rozwiązywanie problemów

**Tabela nie wyświetla atrybutów** - sprawdź, czy atrybuty mają zaznaczone **Widoczne na stronie produktu** w edycji produktu (zakładka Atrybuty).

**Przycisk nie reaguje na kliknięcie** - sprawdź konsolę przeglądarki. Częsta przyczyna to zduplikowany jQuery lub konflikt z wtyczką optymalizującą JS.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
