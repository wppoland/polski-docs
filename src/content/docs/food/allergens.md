---
title: Alergeny
description: Deklaracja alergenów za pomocą taksonomii polski_allergen, automatyczne wyróżnianie w składnikach oraz shortcode wyświetlania w WooCommerce.
---

Przepisy UE wymagają oznaczania 14 alergenów na etykiecie produktu spożywczego. W sklepie internetowym informacja o alergenach musi być widoczna przed zakupem. Wtyczka Polski for WooCommerce obsługuje alergeny przez taksonomię WordPress.

## 14 głównych alergenów

Obowiązkowa deklaracja obejmuje:

| Nr | Alergen | Slug taksonomii | Ikona |
|----|---------|----------------|-------|
| 1 | Zboża zawierające gluten | `gluten` | gluten |
| 2 | Skorupiaki | `crustaceans` | skorupiaki |
| 3 | Jaja | `eggs` | jaja |
| 4 | Ryby | `fish` | ryby |
| 5 | Orzeszki ziemne (arachidowe) | `peanuts` | orzeszki |
| 6 | Soja | `soy` | soja |
| 7 | Mleko (laktoza) | `milk` | mleko |
| 8 | Orzechy | `nuts` | orzechy |
| 9 | Seler | `celery` | seler |
| 10 | Gorczyca | `mustard` | gorczyca |
| 11 | Nasiona sezamu | `sesame` | sezam |
| 12 | Dwutlenek siarki i siarczyny | `sulphites` | siarczyny |
| 13 | Łubin | `lupin` | łubin |
| 14 | Mięczaki | `molluscs` | mięczaki |

## Taksonomia polski_allergen

Wtyczka tworzy taksonomię `polski_allergen` powiązaną z produktami. Przy aktywacji automatycznie dodaje 14 głównych alergenów.

### Zarządzanie alergenami

Przejdź do **Produkty > Alergeny**, by zarządzać listą. 14 alergenów tworzy się automatycznie. Możesz dodawać własne, specyficzne dla Twojego asortymentu.

Każdy alergen zawiera:

| Pole | Opis |
|------|------|
| Nazwa | Wyświetlana nazwa alergenu (np. "Mleko i produkty pochodne") |
| Slug | Identyfikator URL (np. `milk`) |
| Opis | Dodatkowe informacje o alergenie |
| Ikona | Opcjonalna ikona (miniaturka taksonomii) |

### Przypisywanie alergenów do produktu

W edytorze produktu, w zakładce "Żywność" lub w panelu bocznym "Alergeny", zaznacz odpowiednie alergeny z listy checkbox.

Dostępne są trzy tryby deklaracji:

| Tryb | Opis | Przykład |
|------|------|---------|
| Zawiera | Produkt zawiera dany alergen | "Zawiera: mleko, jaja" |
| Może zawierać | Ryzyko kontaminacji krzyżowej | "Może zawierać: orzechy" |
| Nie zawiera | Jawna deklaracja braku (opcjonalne) | "Nie zawiera: gluten" |

### Tryb "Może zawierać"

Tryb "Może zawierać" oznacza ryzyko śladowych ilości alergenu z procesu produkcji. Każdy alergen oznaczysz jako:

- **Zawiera** - alergen jest składnikiem produktu
- **Może zawierać** - ryzyko śladowych ilości

## Konfiguracja

Przejdź do **WooCommerce > Ustawienia > Polski > Żywność** i skonfiguruj sekcję "Alergeny".

| Ustawienie | Domyślne | Opis |
|------------|----------|------|
| Włącz deklarację alergenów | Tak | Aktywuje system alergenów |
| Wyróżniaj w składnikach | Tak | Automatyczne pogrubienie alergenów w wykazie składników |
| Pokaż ikony | Nie | Wyświetla ikony alergenów |
| Pozycja na stronie | Zakładka żywność | Gdzie wyświetlać alergeny |
| Tryb "Może zawierać" | Tak | Włącza opcję deklaracji śladowych ilości |
| Format wyświetlania | Lista | `lista`, `ikony`, `inline` |

## Automatyczne wyróżnianie w składnikach

Alergeny w wykazie składników muszą być wyróżnione - najczęściej pogrubieniem. Wtyczka automatycznie wyszukuje nazwy alergenów w polu "Składniki" i opakowuje je w `<strong>`.

Przykład:

Wprowadzony tekst:
```
Mąka pszenna, cukier, masło, jaja kurze, mleko odtłuszczone w proszku, sól
```

Wyświetlany tekst:
```
Mąka pszenna (gluten), cukier, masło (mleko), jaja kurze, mleko odtłuszczone w proszku, sól
```

Z wyróżnieniem HTML:
```html
Mąka <strong>pszenna (gluten)</strong>, cukier, masło (<strong>mleko</strong>), 
<strong>jaja</strong> kurze, <strong>mleko</strong> odtłuszczone w proszku, sól
```

### Konfiguracja wyróżniania

Wtyczka szuka synonimów alergenów w wykazie składników. Listę synonimów zmienisz filtrem:

```php
add_filter('polski/allergens/synonyms', function (array $synonyms): array {
    $synonyms['gluten'] = ['pszenica', 'pszenna', 'żyto', 'żytnia', 'owies', 'owsiana', 'jęczmień', 'orkisz'];
    $synonyms['milk'] = ['mleko', 'mleczny', 'mleczna', 'masło', 'śmietana', 'jogurt', 'ser', 'laktoza'];
    $synonyms['eggs'] = ['jaja', 'jajka', 'jajeczny', 'jajeczna'];

    return $synonyms;
});
```

## Shortcode

Użyj shortcode `[polski_allergens]`, aby wyświetlić deklarację alergenów.

### Parametry

| Parametr | Typ | Domyślny | Opis |
|----------|-----|----------|------|
| `product_id` | int | bieżący | ID produktu |
| `format` | string | `list` | Format: `list`, `icons`, `inline`, `table` |
| `show_may_contain` | bool | `true` | Czy wyświetlać sekcję "Może zawierać" |
| `show_icons` | bool | `false` | Czy wyświetlać ikony alergenów |
| `label` | string | `"Alergeny: "` | Etykieta przed listą |
| `wrapper` | string | `div` | Element HTML opakowujący |

### Przykłady użycia

Podstawowa lista alergenów:

```html
[polski_allergens]
```

Wynik:
```
Alergeny: mleko, jaja, gluten
Może zawierać: orzechy
```

Format inline z ikonami:

```html
[polski_allergens format="inline" show_icons="true"]
```

Bez sekcji "Może zawierać":

```html
[polski_allergens show_may_contain="false"]
```

Format tabeli:

```html
[polski_allergens format="table"]
```

Dla konkretnego produktu:

```html
[polski_allergens product_id="456"]
```

W szablonie PHP:

```php
echo do_shortcode('[polski_allergens product_id="' . $product->get_id() . '"]');
```

## Programistyczny dostęp

### Pobieranie alergenów produktu

```php
// Alergeny "Zawiera"
$allergens = wp_get_object_terms($product_id, 'polski_allergen');

foreach ($allergens as $allergen) {
    echo $allergen->name; // np. "Mleko i produkty pochodne"
}

// Alergeny "Może zawierać"
$may_contain = get_post_meta($product_id, '_polski_may_contain_allergens', true);
if ($may_contain) {
    $may_contain_terms = get_terms([
        'taxonomy' => 'polski_allergen',
        'slug'     => $may_contain,
    ]);
}
```

### Przypisywanie alergenów programistycznie

```php
// Ustawienie alergenów "Zawiera"
wp_set_object_terms($product_id, ['gluten', 'milk', 'eggs'], 'polski_allergen');

// Ustawienie alergenów "Może zawierać"
update_post_meta($product_id, '_polski_may_contain_allergens', ['nuts', 'soy']);
```

### Sprawdzenie, czy produkt zawiera alergen

```php
if (has_term('gluten', 'polski_allergen', $product_id)) {
    // Produkt zawiera gluten
}
```

## Import CSV

Alergeny importujesz przez CSV:

| Kolumna CSV | Opis | Format |
|-------------|------|--------|
| `polski_allergens` | Alergeny "Zawiera" | Slugi oddzielone przecinkami |
| `polski_may_contain` | Alergeny "Może zawierać" | Slugi oddzielone przecinkami |

Przykład:

```csv
"Ciastka maślane","gluten,milk,eggs","nuts,soy"
"Sok pomarańczowy","",""
```

## Stylowanie CSS

```css
.polski-allergens {
    margin: 1em 0;
    padding: 0.8em;
    background: #fff3e0;
    border: 1px solid #ffcc02;
    border-radius: 4px;
}

.polski-allergens__label {
    font-weight: 700;
    color: #e65100;
}

.polski-allergens__list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
}

.polski-allergens__item {
    display: inline-flex;
    align-items: center;
    gap: 0.3em;
    padding: 0.2em 0.6em;
    background: #fff;
    border: 1px solid #ffcc02;
    border-radius: 3px;
    font-size: 0.9em;
}

.polski-allergens__may-contain {
    margin-top: 0.5em;
    font-style: italic;
    color: #666;
}

.polski-allergens__icon {
    width: 20px;
    height: 20px;
}
```

## Najczęstsze problemy

### Alergeny nie wyświetlają się na stronie produktu

1. Sprawdź, czy moduł alergenów jest włączony
2. Upewnij się, że produkt ma przypisane alergeny w edytorze
3. Zweryfikuj, czy taksonomia `polski_allergen` jest poprawnie zarejestrowana (Produkty > Alergeny)

### Automatyczne wyróżnianie nie działa

1. Sprawdź, czy opcja "Wyróżniaj w składnikach" jest włączona
2. Upewnij się, że nazwy alergenów lub ich synonimy odpowiadają tekstowi w wykazie składników
3. Rozszerz listę synonimów filtrem `polski/allergens/synonyms`

### Brak domyślnych alergenów po aktywacji

Jeśli 14 alergenów nie pojawiło się automatycznie, przejdź do **WooCommerce > Ustawienia > Polski > Żywność** i kliknij "Utwórz domyślne alergeny".

## Powiązane zasoby

- [Moduł produktów spożywczych](food/food-overview/)
- [Wartości odżywcze](food/nutrients/)
- [Zgłoś problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
