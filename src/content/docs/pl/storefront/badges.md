---
title: Etykiety produktów
description: Moduł etykiet w Polski for WooCommerce - automatyczne odznaki (wyprzedaż, nowość, niski stan, bestseller) oraz ręczne etykiety per produkt.
---

Etykiety (badges) to kolorowe odznaki wyświetlane na zdjęciach produktów. Pomagają klientom szybko zidentyfikować produkty w promocji, nowości, bestsellery oraz produkty o niskim stanie magazynowym.

## Włączenie modułu

Przejdź do **WooCommerce > Polski > Moduły sklepowe** i aktywuj opcję **Etykiety produktów**. Moduł zastąpi domyślną odznakę WooCommerce "Wyprzedaż!" własnymi, konfigurowalnymi etykietami.

## Etykiety automatyczne

Etykiety automatyczne generowane są na podstawie danych produktu. Nie wymagają ręcznej konfiguracji - po włączeniu działają natychmiast na wszystkich produktach.

### Wyprzedaż (sale)

Wyświetlana gdy produkt ma ustawioną cenę promocyjną. Domyślnie pokazuje procent zniżki (np. **-25%**) zamiast standardowego tekstu "Wyprzedaż!".

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

Dla produktów zmiennych procent obliczany jest na podstawie wariantu z największą zniżką.

### Nowość (new)

Wyświetlana na produktach dodanych w ciągu ostatnich X dni. Domyślnie **14 dni**.

```php
// Zmiana okresu nowości
add_filter('polski/badges/new_days', function (): int {
    return 30; // produkty dodane w ciągu ostatnich 30 dni
});
```

### Niski stan magazynowy (low stock)

Wyświetlana gdy ilość produktu w magazynie spadnie poniżej ustalonego progu. Domyślny próg to wartość ustawiona w WooCommerce (**WooCommerce > Ustawienia > Produkty > Magazyn > Próg niskiego stanu**).

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

Wyświetlana na produktach z największą liczbą sprzedaży. Domyślnie top **10 produktów** w sklepie.

```php
// Zmiana limitu bestsellerów
add_filter('polski/badges/bestseller_limit', function (): int {
    return 20;
});
```

Obliczanie bestsellerów cachowane jest w transient API (domyślnie 24 godziny).

## Etykiety ręczne (per produkt)

Oprócz automatycznych etykiet możesz dodawać własne odznaki do pojedynczych produktów. W edytorze produktu w panelu **Dane produktu** znajdziesz zakładkę **Etykiety**.

Opcje etykiety ręcznej:

- **Tekst** - treść wyświetlana na odznace (np. "Polecamy", "Eco", "Darmowa dostawa")
- **Kolor tła** - kolor odznaki (color picker)
- **Kolor tekstu** - kolor tekstu na odznace
- **Pozycja** - lewy góra, prawy góra, lewy dół, prawy dół
- **Priorytet** - kolejność wyświetlania gdy produkt ma wiele etykiet

Maksymalna liczba etykiet na jednym produkcie to **4** (automatyczne + ręczne łącznie). Limit ten zapobiega zaśmieceniu miniaturki.

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

Pozycje konfigurujesz w ustawieniach modułu. Jeśli dwie etykiety mają tę samą pozycję, układane są pionowo jedna pod drugą.

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

Etykiety automatyczne cachowane są w meta produktu (`_polski_badges_cache`) i aktualizowane przy każdym zapisie produktu. Obliczanie bestsellerów wykonywane jest raz na 24 godziny przez transient API.

## Rozwiązywanie problemów

**Etykieta wyprzedaży nie wyświetla procentu** - sprawdź, czy cena regularna produktu jest ustawiona. Bez ceny regularnej procent nie może być obliczony.

**Ręczna etykieta nie pojawia się** - sprawdź limit etykiet na produkcie. Jeśli produkt ma już 4 etykiety automatyczne, ręczna nie zostanie wyświetlona.

**Etykiety zasłaniają przycisk szybkiego podglądu** - zmień pozycję etykiet lub przycisku quick view w ustawieniach modułów.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
