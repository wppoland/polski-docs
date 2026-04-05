---
title: Nutri-Score
description: Wyświetlanie odznaki Nutri-Score A-E z klasami CSS per poziom na stronie produktu WooCommerce.
---

Nutri-Score ocenia jakość odżywczą produktu w skali od A (najlepsza) do E (najgorsza). W Polsce jest dobrowolny, ale coraz popularniejszy. Wtyczka Polski for WooCommerce wyświetla odznakę Nutri-Score na stronie produktu.

## Czym jest Nutri-Score

Nutri-Score klasyfikuje produkty na podstawie:

**Składniki negatywne (punkty ujemne):**
- wartość energetyczna
- cukry
- kwasy tłuszczowe nasycone
- sól (sód)

**Składniki pozytywne (punkty dodatnie):**
- owoce, warzywa, orzechy, oleje (rzepakowy, orzechowy, oliwkowy)
- błonnik
- białko

Na podstawie bilansu punktów produkt dostaje ocenę:

| Poziom | Kolor | Zakres punktów (żywność stała) | Opis |
|--------|-------|-------------------------------|------|
| A | Ciemnozielony (#038141) | od -15 do -1 | Najwyższa jakość odżywcza |
| B | Jasnozielony (#85BB2F) | od 0 do 2 | Dobra jakość odżywcza |
| C | Żółty (#FECB02) | od 3 do 10 | Średnia jakość odżywcza |
| D | Pomarańczowy (#EE8100) | od 11 do 18 | Niska jakość odżywcza |
| E | Czerwony (#E63E11) | od 19 do 40 | Najniższa jakość odżywcza |

## Konfiguracja

### Włączenie modułu

Przejdź do **WooCommerce > Ustawienia > Polski > Żywność** i aktywuj podmoduł "Nutri-Score".

### Ustawienia

| Ustawienie | Domyślne | Opis |
|------------|----------|------|
| Włącz Nutri-Score | Nie | Aktywuje wyświetlanie odznaki |
| Pozycja na stronie produktu | Pod ceną | Gdzie wyświetlać odznakę |
| Pokaż na listingu | Tak | Czy wyświetlać na stronach kategorii |
| Rozmiar odznaki | Normalny | `mały`, `normalny`, `duży` |
| Styl odznaki | Pełny | `pełny` (wszystkie litery), `kompaktowy` (tylko aktywna litera) |

### Przypisywanie Nutri-Score do produktu

W edytorze produktu, w zakładce "Żywność", wybierz poziom Nutri-Score z listy rozwijanej:

- A - Najwyższa jakość odżywcza
- B - Dobra jakość odżywcza
- C - Średnia jakość odżywcza
- D - Niska jakość odżywcza
- E - Najniższa jakość odżywcza

Wtyczka nie oblicza Nutri-Score automatycznie. Użyj oficjalnego kalkulatora lub danych od producenta.

## Wygenerowany HTML

Odznaka Nutri-Score to zestaw elementów HTML z klasami CSS:

```html
<div class="polski-nutri-score polski-nutri-score--active-c">
    <span class="polski-nutri-score__label">Nutri-Score</span>
    <div class="polski-nutri-score__badges">
        <span class="polski-nutri-score__badge polski-nutri-score__badge--a">A</span>
        <span class="polski-nutri-score__badge polski-nutri-score__badge--b">B</span>
        <span class="polski-nutri-score__badge polski-nutri-score__badge--c polski-nutri-score__badge--active">C</span>
        <span class="polski-nutri-score__badge polski-nutri-score__badge--d">D</span>
        <span class="polski-nutri-score__badge polski-nutri-score__badge--e">E</span>
    </div>
</div>
```

## Klasy CSS per poziom

Wtyczka generuje klasy CSS dla każdego poziomu, co daje pełną kontrolę nad stylowaniem:

### Klasy na kontenerze

| Klasa | Opis |
|-------|------|
| `.polski-nutri-score` | Kontener główny |
| `.polski-nutri-score--active-a` | Aktywny poziom A |
| `.polski-nutri-score--active-b` | Aktywny poziom B |
| `.polski-nutri-score--active-c` | Aktywny poziom C |
| `.polski-nutri-score--active-d` | Aktywny poziom D |
| `.polski-nutri-score--active-e` | Aktywny poziom E |
| `.polski-nutri-score--small` | Mały rozmiar |
| `.polski-nutri-score--normal` | Normalny rozmiar |
| `.polski-nutri-score--large` | Duży rozmiar |

### Klasy na odznakach

| Klasa | Opis |
|-------|------|
| `.polski-nutri-score__badge` | Każda odznaka (litera) |
| `.polski-nutri-score__badge--a` | Odznaka A |
| `.polski-nutri-score__badge--b` | Odznaka B |
| `.polski-nutri-score__badge--c` | Odznaka C |
| `.polski-nutri-score__badge--d` | Odznaka D |
| `.polski-nutri-score__badge--e` | Odznaka E |
| `.polski-nutri-score__badge--active` | Aktywna (wybrana) odznaka |

## Domyślne style CSS

Wtyczka zawiera wbudowane style CSS:

```css
.polski-nutri-score {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0.5em 0;
}

.polski-nutri-score__label {
    font-size: 0.75em;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #666;
    margin-bottom: 0.3em;
}

.polski-nutri-score__badges {
    display: inline-flex;
    gap: 2px;
    border-radius: 4px;
    overflow: hidden;
}

.polski-nutri-score__badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2em;
    height: 2em;
    font-weight: 700;
    font-size: 0.85em;
    color: #fff;
    opacity: 0.35;
    transition: opacity 0.2s, transform 0.2s;
}

.polski-nutri-score__badge--active {
    opacity: 1;
    transform: scale(1.15);
    border-radius: 3px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
}

/* Kolory per poziom */
.polski-nutri-score__badge--a {
    background-color: #038141;
}

.polski-nutri-score__badge--b {
    background-color: #85BB2F;
}

.polski-nutri-score__badge--c {
    background-color: #FECB02;
    color: #333;
}

.polski-nutri-score__badge--d {
    background-color: #EE8100;
}

.polski-nutri-score__badge--e {
    background-color: #E63E11;
}

/* Rozmiary */
.polski-nutri-score--small .polski-nutri-score__badge {
    width: 1.5em;
    height: 1.5em;
    font-size: 0.7em;
}

.polski-nutri-score--large .polski-nutri-score__badge {
    width: 2.5em;
    height: 2.5em;
    font-size: 1em;
}
```

### Nadpisywanie stylów

Nadpisz klasy CSS w pliku `style.css` motywu:

```css
/* Przykład: kwadratowe odznaki z zaokrąglonymi rogami */
.polski-nutri-score__badges {
    gap: 4px;
    border-radius: 0;
}

.polski-nutri-score__badge {
    border-radius: 6px;
    width: 2.2em;
    height: 2.2em;
}

/* Przykład: ciemny motyw */
.polski-nutri-score__label {
    color: #ccc;
}

.polski-nutri-score__badge {
    opacity: 0.25;
}
```

## Programistyczny dostęp

### Pobieranie Nutri-Score produktu

```php
$nutri_score = get_post_meta($product_id, '_polski_nutri_score', true);
// Zwraca: 'a', 'b', 'c', 'd', 'e' lub '' (pusty)
```

### Ustawianie Nutri-Score

```php
update_post_meta($product_id, '_polski_nutri_score', 'b');
```

### Filtr HTML odznaki

```php
add_filter('polski/nutri_score/html', function (string $html, string $score, int $product_id): string {
    // Modyfikacja HTML odznaki
    return $html;
}, 10, 3);
```

### Warunkowe wyświetlanie

```php
add_filter('polski/nutri_score/display', function (bool $display, int $product_id): bool {
    // Ukryj Nutri-Score dla produktów bez wypełnionych wartości odżywczych
    $nutrients = get_post_meta($product_id, '_polski_nutrients', true);

    if (empty($nutrients)) {
        return false;
    }

    return $display;
}, 10, 2);
```

## Import CSV

| Kolumna CSV | Opis | Wartości |
|-------------|------|---------|
| `polski_nutri_score` | Poziom Nutri-Score | `a`, `b`, `c`, `d`, `e` |

Przykład:

```csv
"Jabłko",a
"Chipsy ziemniaczane",d
"Cola",e
"Jogurt naturalny",b
```

## Schema.org

Wtyczka dodaje Nutri-Score do danych strukturalnych produktu:

```json
{
    "@type": "Product",
    "additionalProperty": [
        {
            "@type": "PropertyValue",
            "name": "Nutri-Score",
            "value": "B"
        }
    ]
}
```

## Dostępność (a11y)

Odznaka zawiera atrybuty ARIA dla czytników ekranu:

```html
<div class="polski-nutri-score" role="img" aria-label="Nutri-Score: C - średnia jakość odżywcza">
```

Każda nieaktywna odznaka ma `aria-hidden="true"`, a aktywna zawiera `aria-current="true"`.

## Najczęstsze problemy

### Odznaka nie wyświetla się

1. Sprawdź, czy podmoduł Nutri-Score jest włączony
2. Upewnij się, że produkt ma przypisany poziom Nutri-Score
3. Zweryfikuj, czy CSS pluginu jest załadowany (brak konfliktu z wtyczkami optymalizacyjnymi)

### Kolory odznaki są inne niż oczekiwane

Motyw może nadpisywać kolory. Użyj bardziej szczegółowych selektorów CSS lub dodaj `!important`:

```css
.polski-nutri-score__badge--a {
    background-color: #038141 !important;
}
```

### Odznaka jest za duża lub za mała

Zmień rozmiar w ustawieniach (**WooCommerce > Ustawienia > Polski > Żywność > Nutri-Score > Rozmiar odznaki**) lub nadpisz CSS klasy rozmiaru.

## Powiązane zasoby

- [Moduł produktów spożywczych](food/food-overview/)
- [Wartości odżywcze](food/nutrients/)
- [Zgłoś problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
