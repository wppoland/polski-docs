---
title: Porównywarka produktów
description: Moduł porównywania produktów w Polski for WooCommerce - tabela cech, limit produktów, automatyczna zamiana i shortcode.
---

Porównywarka produktów pozwala klientom zestawić kilka produktów obok siebie w formie tabeli cech. Ułatwia to podjęcie decyzji zakupowej, szczególnie w sklepach z szerokim asortymentem.

![Porównywarka produktów, lista życzeń i filtry na stronie sklepu](../../../assets/screenshots/screenshot-8-wishlist-compare-quick-view.png)

## Włączenie modułu

Przejdź do **WooCommerce > Polski > Moduły sklepowe** i aktywuj opcję **Porównywarka produktów**. Na produktach pojawi się przycisk porównania.

## Tabela cech (feature table)

Po dodaniu produktów do porównania klient widzi tabelę z kolumnami dla każdego produktu. Wiersze tabeli zawierają:

- Zdjęcie produktu
- Nazwę z linkiem
- Cenę (z uwzględnieniem promocji i dyrektywy Omnibus)
- Ocenę (gwiazdki)
- Opis krótki
- Status dostępności
- Atrybuty produktu (kolor, rozmiar itp.)
- Czas dostawy (jeśli ustawiony)
- Przycisk **Dodaj do koszyka**

Wiersze, w których wszystkie wartości są identyczne, mogą być automatycznie ukryte - włącz opcję **Ukryj identyczne cechy** w ustawieniach modułu. Pozwala to skupić uwagę klienta na różnicach między produktami.

## Maksymalna liczba produktów

Domyślnie klient może porównać do **4 produktów** jednocześnie. Limit ten można zmienić w ustawieniach lub filtrem:

```php
add_filter('polski/compare/max_items', function (): int {
    return 6;
});
```

Po osiągnięciu limitu przycisk **Dodaj do porównania** zostaje dezaktywowany z komunikatem o osiągniętym limicie. Klient musi najpierw usunąć jeden z produktów.

## Automatyczna zamiana (auto-replace)

Gdy opcja **Automatyczna zamiana** jest aktywna, dodanie produktu ponad limit automatycznie zastępuje najstarszy produkt w porównaniu nowym. Klient otrzymuje powiadomienie toast o zamianie.

Włączenie w ustawieniach: **WooCommerce > Polski > Moduły sklepowe > Porównywarka > Automatyczna zamiana**.

Lub programowo:

```php
add_filter('polski/compare/auto_replace', '__return_true');
```

## Działanie AJAX

Porównywarka działa bez przeładowania strony. Akcje AJAX:

| Akcja                        | Opis                           |
| ---------------------------- | ------------------------------ |
| `polski_compare_add`         | Dodanie produktu               |
| `polski_compare_remove`      | Usunięcie produktu             |
| `polski_compare_get`         | Pobranie listy produktów       |
| `polski_compare_clear`       | Wyczyszczenie porównania       |

Dane porównania przechowywane są w sesji WooCommerce (`WC()->session`), dzięki czemu działają zarówno dla gości, jak i zalogowanych użytkowników.

## Shortcode `[polski_compare]`

Shortcode wyświetla tabelę porównania w dowolnym miejscu sklepu.

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

Następnie w ustawieniach modułu wskaż tę stronę jako **Strona porównania**. Przycisk **Zobacz porównanie** w popupie przekieruje na tę stronę.

## Przycisk porównania

Przycisk wyświetla się na karcie produktu (strona kategorii) i na stronie pojedynczego produktu. Pozycję kontrolujesz filtrem:

```php
add_filter('polski/compare/button_position', function (): string {
    return 'after_add_to_cart';
});
```

Dostępne pozycje: `before_add_to_cart`, `after_add_to_cart`, `after_summary`.

## Pasek porównania (floating bar)

Po dodaniu pierwszego produktu do porównania na dole ekranu pojawia się pasek z miniaturkami wybranych produktów i przyciskiem **Porównaj**. Pasek jest responsywny - na urządzeniach mobilnych pokazuje liczbę wybranych produktów zamiast miniaturek.

## Porównanie w ramach kategorii

Domyślnie klient może porównywać produkty z różnych kategorii. Jeśli chcesz ograniczyć porównanie do produktów z tej samej kategorii:

```php
add_filter('polski/compare/same_category_only', '__return_true');
```

Przy próbie dodania produktu z innej kategorii klient zobaczy komunikat z informacją o ograniczeniu.

## Stylowanie CSS

Klasy CSS modułu:

- `.polski-compare-button` - przycisk dodania do porównania
- `.polski-compare-button--active` - produkt jest w porównaniu
- `.polski-compare-table` - tabela porównania
- `.polski-compare-bar` - pasek na dole ekranu
- `.polski-compare-empty` - komunikat pustego porównania

## Rozwiązywanie problemów

**Tabela nie wyświetla atrybutów** - upewnij się, że atrybuty produktów są ustawione jako **Widoczne na stronie produktu** w edycji produktu (zakładka Atrybuty).

**Przycisk nie reaguje na kliknięcie** - sprawdź konsolę przeglądarki pod kątem konfliktów JavaScript. Najczęściej przyczyną jest zduplikowany jQuery lub konflikt z wtyczką optymalizującą JS.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
