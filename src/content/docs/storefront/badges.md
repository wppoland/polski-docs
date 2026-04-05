---
title: Etykiety produktów
description: Moduł etykiet w Polski for WooCommerce - automatyczne odznaki (wyprzedaż, nowość, niski stan, bestseller) oraz ręczne etykiety per produkt.
---

Etykiety (badges) to kolorowe odznaki na zdjęciach produktów. Pomagają klientom szybko rozpoznać promocje, nowości, bestsellery i produkty z niskim stanem.

## Włączenie modułu

Przejdź do **WooCommerce > Polski > Moduły sklepowe** i włącz **Etykiety produktów**. Moduł zastąpi domyślną odznakę "Wyprzedaż!" konfigurowalnymi etykietami.

## Etykiety automatyczne

Generują się automatycznie na podstawie danych produktu. Po włączeniu działają od razu na wszystkich produktach.

### Wyprzedaż (sale)

Pojawia się gdy produkt ma cenę promocyjną. Domyślnie pokazuje procent zniżki (np. **-25%**) zamiast tekstu "Wyprzedaż!".

Konfiguracja formatu:

| Opcja          | Opis                             | Przykład      |
| -------------- | -------------------------------- | ------------- |
| Procent        | Procent zniżki                   | -25%          |
| Kwota          | Kwota oszczędności               | -50 zł        |
| Tekst          | Własny tekst                     | Promocja      |
| Procent + kwota| Obie wartości                    | -25% (-50 zł) |

```php
// Zmiana formatu odznaki wyprzedaży
add_filter('polski/badges/sale_format', function (): string {
    return 'percentage'; // 'percentage', 'amount', 'text', 'both'
});
```

Dla produktów zmiennych procent liczy się od wariantu z największą zniżką.

### Nowość (new)

Pojawia się na produktach dodanych w ciągu ostatnich X dni. Domyślnie **14 dni**.

```php
// Zmiana okresu nowości
add_filter('polski/badges/new_days', function (): int {
    return 30; // produkty dodane w ciągu ostatnich 30 dni
});
```

### Niski stan magazynowy (low stock)

Pojawia się gdy stan magazynowy spadnie poniżej progu. Próg ustawiasz w **WooCommerce > Ustawienia > Produkty > Magazyn > Próg niskiego stanu**.

Treść etykiety: **Ostatnie X sztuk!** (gdzie X to aktualna ilość).

```php
// Własny tekst etykiety niskiego stanu
add_filter('polski/badges/low_stock_text', function (string $text, int $stock): string {
    if ($stock <= 3) {
        return 'Ostatnie sztuki!';
    }
    return sprintf('Zostało %d szt.', $stock);
}, 10, 2);
```

### Bestseller

Pojawia się na najlepiej sprzedających się produktach. Domyślnie top **10 produktów**.

```php
// Zmiana limitu bestsellerów
add_filter('polski/badges/bestseller_limit', function (): int {
    return 20;
});
```

Lista bestsellerów cachuje się w transient API (domyślnie 24 godziny).

## Etykiety ręczne (per produkt)

Możesz też dodawać własne odznaki do pojedynczych produktów. W edytorze produktu otwórz **Dane produktu > Etykiety**.

Opcje etykiety ręcznej:

- **Tekst** - treść wyświetlana na odznace (np. "Polecamy", "Eco", "Darmowa dostawa")
- **Kolor tła** - kolor odznaki (color picker)
- **Kolor tekstu** - kolor tekstu na odznace
- **Pozycja** - lewy góra, prawy góra, lewy dół, prawy dół
- **Priorytet** - kolejność wyświetlania gdy produkt ma wiele etykiet

Maksymalnie **4** etykiety na produkcie (automatyczne + ręczne łącznie). Limit chroni miniaturkę przed zaśmieceniem.

```php
// Zmiana limitu etykiet na produkcie
add_filter('polski/badges/max_per_product', function (): int {
    return 3;
});
```

## Pozycjonowanie etykiet

Etykiety automatyczne mają domyślne pozycje:

| Etykieta     | Domyślna pozycja |
| ------------ | ---------------- |
| Wyprzedaż    | Lewy góra        |
| Nowość       | Prawy góra       |
| Niski stan   | Lewy dół         |
| Bestseller   | Prawy góra       |

Zmień pozycje w ustawieniach modułu. Dwie etykiety w tej samej pozycji układają się pionowo.

## Kształty etykiet

Dostępne kształty:

- **Prostokąt** - domyślny
- **Prostokąt z zaokrąglonymi rogami** - border-radius
- **Okrąg** - dla krótkich tekstów (np. "-25%")
- **Wstążka** - dekoracyjny kształt ze skosem

Konfiguracja w ustawieniach: **WooCommerce > Polski > Moduły sklepowe > Etykiety > Kształt**.

## Widoczność etykiet

Etykiety wyświetlają się na:

- Stronach kategorii i archiwów (karty produktów)
- Stronie pojedynczego produktu (główne zdjęcie)
- Sliderze produktów (moduł slider)
- Szybkim podglądzie (moduł quick view)
- Wynikach wyszukiwania

Możesz wyłączyć etykiety dla wybranych lokalizacji:

```php
// Wyłączenie etykiet na stronie pojedynczego produktu
add_filter('polski/badges/show_on_single', '__return_false');
```

## Etykiety dla produktów zmiennych

Dla produktów zmiennych (variable products):

- **Wyprzedaż** - pokazuje największy procent zniżki spośród wszystkich wariantów
- **Niski stan** - pokazuje się gdy choć jeden wariant ma niski stan
- **Nowość** - na podstawie daty dodania produktu (nie wariantu)

## Stylowanie CSS

Klasy CSS:

- `.polski-badge` - bazowa klasa etykiety
- `.polski-badge--sale` - wyprzedaż
- `.polski-badge--new` - nowość
- `.polski-badge--low-stock` - niski stan
- `.polski-badge--bestseller` - bestseller
- `.polski-badge--custom` - etykieta ręczna
- `.polski-badge--top-left` - pozycja lewy góra
- `.polski-badge--top-right` - pozycja prawy góra
- `.polski-badge--bottom-left` - pozycja lewy dół
- `.polski-badge--bottom-right` - pozycja prawy dół
- `.polski-badge--rectangle` - kształt prostokątny
- `.polski-badge--circle` - kształt koła
- `.polski-badge--ribbon` - kształt wstążki

Przykład stylowania:

```css
.polski-badge--sale {
    background-color: #dc2626;
    color: #ffffff;
    font-weight: 700;
    font-size: 0.75rem;
    padding: 4px 8px;
}
```

## Wydajność

Etykiety cachują się w meta produktu (`_polski_badges_cache`) i aktualizują się przy zapisie produktu. Bestsellery przeliczają się raz na 24 godziny (transient API).

## Rozwiązywanie problemów

**Etykieta wyprzedaży nie wyświetla procentu** - sprawdź, czy produkt ma ustawioną cenę regularną. Bez niej nie da się obliczyć procentu.

**Ręczna etykieta nie pojawia się** - sprawdź limit etykiet. Jeśli produkt ma już 4 etykiety, ręczna się nie wyświetli.

**Etykiety zasłaniają przycisk szybkiego podglądu** - zmień pozycję etykiet lub przycisku quick view w ustawieniach.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
