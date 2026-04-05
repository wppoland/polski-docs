---
title: Moduł produktów spożywczych
description: Przegląd modułu żywności - wartości odżywcze, alergeny, składniki, Nutri-Score, alkohol i kraj pochodzenia w WooCommerce.
---

Sprzedaż produktów spożywczych przez internet w Polsce podlega szczegółowym regulacjom dotyczącym informowania konsumentów. Rozporządzenie (UE) nr 1169/2011 (FIC) oraz polskie przepisy wykonawcze wymagają podawania pełnych informacji o składzie, wartościach odżywczych, alergenach i pochodzeniu produktu. Plugin Polski for WooCommerce zapewnia kompletny moduł do zarządzania tymi danymi.

## Wymagania prawne

Rozporządzenie FIC nakłada na sprzedawców żywności obowiązek podawania następujących informacji:

| Informacja | Wymagana | Podstawa prawna |
|------------|----------|----------------|
| Nazwa żywności | Tak | Art. 9 ust. 1 lit. a |
| Wykaz składników | Tak | Art. 9 ust. 1 lit. b |
| Alergeny | Tak | Art. 9 ust. 1 lit. c |
| Ilość składników | Warunkowo | Art. 9 ust. 1 lit. d |
| Ilość netto | Tak | Art. 9 ust. 1 lit. e |
| Data minimalnej trwałości | Tak | Art. 9 ust. 1 lit. f |
| Warunki przechowywania | Warunkowo | Art. 9 ust. 1 lit. g |
| Dane producenta | Tak | Art. 9 ust. 1 lit. h |
| Kraj pochodzenia | Warunkowo | Art. 9 ust. 1 lit. i |
| Wartość odżywcza | Tak | Art. 9 ust. 1 lit. l |

W przypadku sprzedaży na odległość (sklep internetowy) większość tych informacji musi być dostępna przed zakupem - z wyjątkiem daty minimalnej trwałości, która może być podana przy dostawie.

## Składniki modułu

Moduł żywności składa się z kilku podmodułów, które można włączać niezależnie:

### Wartości odżywcze

Tabela wartości odżywczych per 100 g lub 100 ml produktu. Obejmuje energię (kJ/kcal), tłuszcze, węglowodany, białko, sól i inne składniki odżywcze.

Szczegóły: [Wartości odżywcze](/pl/food/nutrients/)

### Alergeny

System deklaracji alergenów oparty na taksonomii WordPress. 14 głównych alergenów zgodnie z załącznikiem II rozporządzenia FIC.

Szczegóły: [Alergeny](/pl/food/allergens/)

### Nutri-Score

Wyświetlanie oznaczenia Nutri-Score (A-E) z odpowiednimi kolorami i klasami CSS.

Szczegóły: [Nutri-Score](/pl/food/nutri-score/)

### Składniki (wykaz)

Pole tekstowe na pełny wykaz składników produktu. Alergeny w wykazie są automatycznie wyróżniane pogrubieniem zgodnie z wymogami FIC.

### Alkohol

Pola do zarządzania informacjami o produktach alkoholowych:

| Pole | Opis |
|------|------|
| Zawartość alkoholu (% obj.) | Procentowa zawartość alkoholu |
| Ostrzeżenie | Komunikat o zakazie sprzedaży osobom nieletnim |
| Weryfikacja wieku | Checkbox potwierdzenia pełnoletności przy dodaniu do koszyka |

Dla napojów o zawartości alkoholu powyżej 1,2% obj. wymagane jest podanie zawartości alkoholu na etykiecie (art. 28 FIC).

### Kraj pochodzenia

Pole na informację o kraju pochodzenia lub miejscu proweniencji. Wymagane dla:

- mięsa (wołowina, wieprzowina, drób, baranina)
- owoców i warzyw
- ryb
- oliwy z oliwek
- miodu
- produktów, gdzie brak informacji mógłby wprowadzić konsumenta w błąd

## Konfiguracja

### Włączenie modułu

Przejdź do **WooCommerce > Ustawienia > Polski > Żywność** i aktywuj moduł oraz wybierz potrzebne podmoduły.

### Ustawienia globalne

| Ustawienie | Opis |
|------------|------|
| Jednostka referencyjna | Domyślna jednostka: per 100 g lub per 100 ml |
| Pozycja na stronie produktu | Gdzie wyświetlać informacje (zakładka, pod opisem, w panelu bocznym) |
| Wyświetlaj w listingu | Czy pokazywać skrócone informacje na stronach kategorii |
| Automatyczne wyróżnianie alergenów | Pogrubienie nazw alergenów w wykazie składników |

### Pozycja na stronie produktu

Informacje o produkcie spożywczym mogą być wyświetlane w kilku miejscach:

1. **Nowa zakładka** (zalecane) - osobna zakładka "Informacje o żywności" obok opisu i recenzji
2. **Pod opisem** - bezpośrednio pod opisem produktu
3. **W metadanych** - w sekcji SKU/kategorie
4. **Niestandardowa** - za pomocą shortcodów w dowolnym miejscu

## Edytor produktu

Po aktywacji modułu żywności, w edytorze produktu pojawia się nowa zakładka "Żywność" z następującymi sekcjami:

- **Wartości odżywcze** - tabela z polami na wszystkie składniki
- **Składniki** - pole tekstowe (WYSIWYG) na wykaz składników
- **Alergeny** - checkbox lista alergenów
- **Nutri-Score** - wybór poziomu A-E
- **Alkohol** - pola związane z napojami alkoholowymi
- **Pochodzenie** - kraj pochodzenia i miejsce proweniencji

## Import CSV

Wszystkie dane żywnościowe można importować masowo przez CSV:

| Kolumna CSV | Opis | Format |
|-------------|------|--------|
| `polski_nutrients` | Wartości odżywcze | JSON |
| `polski_ingredients` | Wykaz składników | Tekst |
| `polski_allergens` | Alergeny | Slugi oddzielone przecinkami |
| `polski_nutri_score` | Nutri-Score | Litera A-E |
| `polski_alcohol_content` | Zawartość alkoholu | Liczba (np. `5.0`) |
| `polski_country_of_origin` | Kraj pochodzenia | Tekst |

Przykład:

```csv
"Sok pomarańczowy 1L",'{"energy_kj":180,"energy_kcal":43,"fat":0.1,"carbohydrates":9.8,"sugars":8.4,"protein":0.7,"salt":0.01}',,"",B,,Hiszpania
```

## Kompatybilność z Schema.org

Moduł automatycznie generuje dane strukturalne zgodne ze Schema.org:

```json
{
    "@type": "Product",
    "additionalProperty": [
        {
            "@type": "PropertyValue",
            "name": "Wartość energetyczna",
            "value": "250 kcal / 1046 kJ"
        }
    ],
    "hasAllergen": ["gluten", "mleko"],
    "countryOfOrigin": {
        "@type": "Country",
        "name": "Polska"
    }
}
```

## Programistyczne rozszerzenia

### Dodanie niestandardowego pola żywnościowego

```php
add_filter('polski/food/custom_fields', function (array $fields): array {
    $fields['organic_certified'] = [
        'label'   => 'Certyfikat ekologiczny',
        'type'    => 'select',
        'options' => [
            ''       => 'Brak',
            'eu_bio' => 'EU Bio',
            'demeter' => 'Demeter',
        ],
    ];

    return $fields;
});
```

### Filtr wyświetlania informacji żywnościowych

```php
add_filter('polski/food/display_html', function (string $html, int $product_id): string {
    // Modyfikacja HTML przed wyświetleniem
    return $html;
}, 10, 2);
```

## Najczęstsze problemy

### Zakładka "Żywność" nie pojawia się w edytorze produktu

1. Sprawdź, czy moduł żywności jest włączony w ustawieniach
2. Zweryfikuj, czy produkt nie jest typu "zewnętrzny/afiliacyjny" (moduł nie obsługuje tego typu)
3. Wyczyść cache przeglądarki i przeładuj panel administracyjny

### Alergeny nie są pogrubione w wykazie składników

Upewnij się, że opcja "Automatyczne wyróżnianie alergenów" jest włączona i że nazwy alergenów w wykazie odpowiadają nazwom w taksonomii.

### Wartości odżywcze wyświetlają się nieprawidłowo

Sprawdź format danych - wartości muszą być liczbami (z kropką jako separatorem dziesiętnym w bazie danych). Plugin automatycznie formatuje wyświetlanie zgodnie z polskimi ustawieniami regionalnymi (przecinek).

## Powiązane zasoby

- [Wartości odżywcze](/pl/food/nutrients/)
- [Alergeny](/pl/food/allergens/)
- [Nutri-Score](/pl/food/nutri-score/)
- [Zgłoś problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
