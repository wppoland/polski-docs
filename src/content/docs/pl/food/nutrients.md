---
title: Wartości odżywcze
description: Tabela wartości odżywczych w formacie JSON per 100 g lub 100 ml z shortcodem do wyświetlania na stronie produktu WooCommerce.
---

Rozporządzenie (UE) nr 1169/2011 wymaga, aby na opakowaniu (i w sklepie internetowym) produktu spożywczego znajdowała się tabela wartości odżywczych. Plugin Polski for WooCommerce umożliwia wprowadzenie pełnej tabeli wartości odżywczych dla każdego produktu i wyświetlenie jej w przejrzystym formacie zgodnym z regulacjami.

## Obowiązkowe składniki odżywcze

Zgodnie z art. 30 rozporządzenia FIC, tabela wartości odżywczych musi zawierać co najmniej:

| Składnik | Jednostka | Klucz JSON |
|----------|-----------|------------|
| Wartość energetyczna | kJ / kcal | `energy_kj`, `energy_kcal` |
| Tłuszcz | g | `fat` |
| w tym kwasy tłuszczowe nasycone | g | `saturated_fat` |
| Węglowodany | g | `carbohydrates` |
| w tym cukry | g | `sugars` |
| Białko | g | `protein` |
| Sól | g | `salt` |

## Opcjonalne składniki odżywcze

Dodatkowo można podać (art. 30 ust. 2 FIC):

| Składnik | Jednostka | Klucz JSON |
|----------|-----------|------------|
| Jednonienasycone kwasy tłuszczowe | g | `monounsaturated_fat` |
| Wielonienasycone kwasy tłuszczowe | g | `polyunsaturated_fat` |
| Alkohole wielowodorotlenowe (poliole) | g | `polyols` |
| Skrobia | g | `starch` |
| Błonnik | g | `fibre` |
| Witamina A | µg | `vitamin_a` |
| Witamina D | µg | `vitamin_d` |
| Witamina E | mg | `vitamin_e` |
| Witamina K | µg | `vitamin_k` |
| Witamina C | mg | `vitamin_c` |
| Tiamina (B1) | mg | `thiamine` |
| Ryboflawina (B2) | mg | `riboflavin` |
| Niacyna (B3) | mg | `niacin` |
| Witamina B6 | mg | `vitamin_b6` |
| Kwas foliowy | µg | `folic_acid` |
| Witamina B12 | µg | `vitamin_b12` |
| Biotyna | µg | `biotin` |
| Kwas pantotenowy | mg | `pantothenic_acid` |
| Potas | mg | `potassium` |
| Chlor | mg | `chloride` |
| Wapń | mg | `calcium` |
| Fosfor | mg | `phosphorus` |
| Magnez | mg | `magnesium` |
| Żelazo | mg | `iron` |
| Cynk | mg | `zinc` |
| Miedź | mg | `copper` |
| Mangan | mg | `manganese` |
| Fluorek | mg | `fluoride` |
| Selen | µg | `selenium` |
| Chrom | µg | `chromium` |
| Molibden | µg | `molybdenum` |
| Jod | µg | `iodine` |

## Konfiguracja

### Włączenie modułu

Przejdź do **WooCommerce > Ustawienia > Polski > Żywność** i aktywuj podmoduł "Wartości odżywcze".

### Ustawienia

| Ustawienie | Domyślne | Opis |
|------------|----------|------|
| Jednostka referencyjna | per 100 g | Domyślna jednostka: per 100 g lub per 100 ml |
| Wyświetlaj % RWS | Tak | Referencyjna wartość spożycia (% dziennego zapotrzebowania) |
| Pozycja tabeli | Zakładka | Gdzie wyświetlać tabelę na stronie produktu |
| Opcjonalne składniki | Błonnik, witaminy | Które opcjonalne składniki wyświetlać |

## Wprowadzanie danych w edytorze produktu

W zakładce "Żywność" w edytorze produktu znajduje się formularz wartości odżywczych. Wypełnij pola wartościami liczbowymi per 100 g lub 100 ml.

### Jednostka referencyjna per produkt

Każdy produkt może mieć indywidualną jednostkę referencyjną. Napoje powinny mieć ustawione "per 100 ml", produkty stałe - "per 100 g". Jeśli nie ustawisz, zostanie użyta wartość domyślna z ustawień.

### Porcja

Opcjonalnie możesz podać również wielkość porcji i wartości odżywcze per porcję:

| Pole | Opis |
|------|------|
| Wielkość porcji | np. "30 g", "250 ml", "1 plasterek (25 g)" |
| Liczba porcji w opakowaniu | np. "10" |

## Format JSON

Wartości odżywcze są przechowywane w bazie danych jako JSON w meta polu `_polski_nutrients`. Format:

```json
{
    "energy_kj": 1046,
    "energy_kcal": 250,
    "fat": 9.5,
    "saturated_fat": 3.2,
    "carbohydrates": 31.0,
    "sugars": 5.4,
    "fibre": 2.1,
    "protein": 8.7,
    "salt": 1.2,
    "ref_unit": "100g",
    "serving_size": "30g",
    "servings_per_package": 10
}
```

### Reguły walidacji

- Wartości muszą być liczbami (int lub float)
- Separator dziesiętny w JSON: kropka (np. `9.5`)
- Wartości nie mogą być ujemne
- `energy_kj` i `energy_kcal` powinny być spójne (1 kcal = 4.184 kJ)
- Podskładniki nie mogą przekraczać składnika nadrzędnego (np. `saturated_fat` <= `fat`)

## Shortcode

Użyj shortcode `[polski_nutrients]`, aby wyświetlić tabelę wartości odżywczych.

### Parametry

| Parametr | Typ | Domyślny | Opis |
|----------|-----|----------|------|
| `product_id` | int | bieżący | ID produktu |
| `show_rws` | bool | `true` | Czy wyświetlać % RWS |
| `show_serving` | bool | `false` | Czy wyświetlać kolumnę per porcję |
| `fields` | string | `all` | Składniki do wyświetlenia (oddzielone przecinkami) |
| `layout` | string | `table` | Układ: `table`, `list`, `compact` |
| `wrapper` | string | `div` | Element HTML opakowujący |

### Przykłady użycia

Pełna tabela wartości odżywczych:

```html
[polski_nutrients]
```

Z wartościami per porcję:

```html
[polski_nutrients show_serving="true"]
```

Tylko podstawowe składniki:

```html
[polski_nutrients fields="energy_kcal,fat,carbohydrates,protein,salt"]
```

Kompaktowy układ (bez tabeli):

```html
[polski_nutrients layout="compact"]
```

Dla konkretnego produktu:

```html
[polski_nutrients product_id="123" show_rws="true" show_serving="true"]
```

W szablonie PHP:

```php
echo do_shortcode('[polski_nutrients product_id="' . $product->get_id() . '"]');
```

## Wygenerowana tabela HTML

Shortcode generuje tabelę zgodną ze standardem EU:

```html
<div class="polski-nutrients">
    <table class="polski-nutrients__table">
        <thead>
            <tr>
                <th>Wartość odżywcza</th>
                <th>per 100 g</th>
                <th>% RWS*</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Wartość energetyczna</td>
                <td>1046 kJ / 250 kcal</td>
                <td>13%</td>
            </tr>
            <tr>
                <td>Tłuszcz</td>
                <td>9,5 g</td>
                <td>14%</td>
            </tr>
            <tr class="polski-nutrients__sub">
                <td>w tym kwasy tłuszczowe nasycone</td>
                <td>3,2 g</td>
                <td>16%</td>
            </tr>
            <!-- ... -->
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3">
                    * Referencyjna wartość spożycia dla przeciętnej osoby dorosłej (8400 kJ / 2000 kcal)
                </td>
            </tr>
        </tfoot>
    </table>
</div>
```

## Referencyjna wartość spożycia (RWS)

Plugin oblicza % RWS automatycznie na podstawie wartości referencyjnych z załącznika XIII rozporządzenia FIC:

| Składnik | Referencyjna wartość |
|----------|---------------------|
| Energia | 8400 kJ / 2000 kcal |
| Tłuszcz | 70 g |
| Kwasy tłuszczowe nasycone | 20 g |
| Węglowodany | 260 g |
| Cukry | 90 g |
| Białko | 50 g |
| Sól | 6 g |
| Błonnik | 25 g |

## Programistyczny dostęp

### Pobieranie wartości odżywczych

```php
$nutrients_json = get_post_meta($product_id, '_polski_nutrients', true);
$nutrients = json_decode($nutrients_json, true);

if ($nutrients) {
    $energy_kcal = $nutrients['energy_kcal'] ?? 0;
    $protein = $nutrients['protein'] ?? 0;
}
```

### Zapisywanie wartości odżywczych

```php
$nutrients = [
    'energy_kj'     => 1046,
    'energy_kcal'   => 250,
    'fat'           => 9.5,
    'saturated_fat' => 3.2,
    'carbohydrates' => 31.0,
    'sugars'        => 5.4,
    'protein'       => 8.7,
    'salt'          => 1.2,
    'ref_unit'      => '100g',
];

update_post_meta($product_id, '_polski_nutrients', wp_json_encode($nutrients));
```

### Filtr wartości przed wyświetleniem

```php
add_filter('polski/nutrients/values', function (array $nutrients, int $product_id): array {
    // Zaokrąglanie wartości zgodnie z wytycznymi EU
    if (isset($nutrients['energy_kcal'])) {
        $nutrients['energy_kcal'] = round($nutrients['energy_kcal']);
    }

    return $nutrients;
}, 10, 2);
```

## Import CSV

Kolumna `polski_nutrients` w CSV powinna zawierać wartości w formacie JSON:

```csv
"Musli owocowe","{""energy_kj"":1590,""energy_kcal"":380,""fat"":8.2,""saturated_fat"":1.5,""carbohydrates"":64.0,""sugars"":22.0,""fibre"":7.5,""protein"":9.8,""salt"":0.05,""ref_unit"":""100g""}"
```

Cudzysłowy wewnątrz JSON muszą być podwojone (`""`) w pliku CSV.

## Stylowanie CSS

```css
.polski-nutrients__table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9em;
}

.polski-nutrients__table th,
.polski-nutrients__table td {
    padding: 0.4em 0.8em;
    border-bottom: 1px solid #e0e0e0;
    text-align: left;
}

.polski-nutrients__sub td:first-child {
    padding-left: 1.5em;
    font-style: italic;
}

.polski-nutrients__table tfoot td {
    font-size: 0.8em;
    color: #666;
    padding-top: 0.8em;
}
```

## Najczęstsze problemy

### Tabela wartości odżywczych nie wyświetla się

1. Sprawdź, czy podmoduł wartości odżywczych jest włączony
2. Upewnij się, że produkt ma wypełnione pole `_polski_nutrients` z poprawnym JSON
3. Zweryfikuj format JSON - użyj walidatora (np. jsonlint.com)

### Wartości wyświetlają się z kropką zamiast przecinka

Plugin automatycznie formatuje liczby zgodnie z polskimi ustawieniami (przecinek dziesiętny). Jeśli widzisz kropkę, sprawdź, czy locale WordPress jest ustawiony na `pl_PL`.

### % RWS nie wyświetla się

Sprawdź, czy opcja "Wyświetlaj % RWS" jest włączona w ustawieniach i czy parametr `show_rws` w shortcode nie jest ustawiony na `false`.

## Powiązane zasoby

- [Moduł produktów spożywczych](/pl/food/food-overview/)
- [Alergeny](/pl/food/allergens/)
- [Zgłoś problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
