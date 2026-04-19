---
title: Wykres historii cen
description: Moduł wykresu historii cen w Polski for WooCommerce - wykres SVG sparkline pokazujący zmiany cen produktu w czasie.
---

Wykres historii cen wizualizuje zmiany cen produktu w formie kompaktowego wykresu sparkline SVG. Klienci widzą jak cena zmieniała się w wybranym okresie (30, 90 lub 180 dni), co buduje transparentność i zaufanie do promocji.

## Włączenie modułu

Przejdź do **WooCommerce > Polski > Moduły sklepowe** i włącz **Wykres historii cen**. Wykres pojawi się automatycznie na stronach produktów, które mają zapisaną historię cen.

:::caution[Wymaganie]
Moduł wymaga włączonego modułu **Omnibus** (dyrektywa Omnibus), który zapisuje historię cen w bazie danych. Bez niego wykres nie będzie miał danych do wyświetlenia.
:::

## Funkcje

- Wykres sparkline renderowany jako SVG (brak zależności od bibliotek JS)
- Konfigurowalne okresy: 30, 90 lub 180 dni
- Wyświetlanie ceny minimalnej i maksymalnej w okresie
- Gradient wypełnienia pod linią wykresu
- Kropka wskazująca aktualną cenę
- Kolory wykresu konfigurowalne w ustawieniach
- Automatyczne pobieranie danych z repozytorium Omnibus

## Ustawienia

Konfiguracja w **WooCommerce > Polski > Moduły sklepowe > Wykres historii cen**.

| Ustawienie | Domyślnie | Opis |
|---|---|---|
| `days` | `30` | Okres wykresu w dniach: `30`, `90` lub `180` |
| `show_min_max` | `true` | Wyświetlaj cenę minimalną i maksymalną pod wykresem |
| `color` | `#2563eb` | Kolor linii wykresu i gradientu |

Opcja w bazie danych: `polski_price_history`.

## Wygląd wykresu

Wykres składa się z następujących elementów:

- **Linia** - przebiegu ceny w czasie (stroke SVG)
- **Gradient** - półprzezroczyste wypełnienie od linii do dołu wykresu
- **Kropka** - aktualna cena produktu (ostatni punkt na wykresie)
- **Min/Max** - etykiety z ceną minimalną i maksymalną (opcjonalnie)

Rozmiar wykresu dopasowuje się do kontenera. Domyślna wysokość to 60px.

## Szczegóły techniczne

### Źródło danych

Wykres pobiera dane z klasy `OmnibusPriceRepository`, która przechowuje historię zmian cen wymaganą przez dyrektywę Omnibus. Każdy punkt danych zawiera datę i cenę produktu.

Dla produktów zmiennych wykres generowany jest dla aktualnie wybranego wariantu (aktualizacja przez JavaScript po zmianie wariantu).

### Renderowanie SVG

Wykres renderowany jest po stronie serwera jako inline SVG - brak zewnętrznych bibliotek, brak zapytań HTTP, brak JavaScript do rysowania. Dzięki temu wykres:

- Wyświetla się natychmiast (brak flash of unstyled content)
- Jest dostępny dla czytników ekranowych (aria-label)
- Nie wpływa na Core Web Vitals

### Hooki

```php
// Zmień okres wykresu dynamicznie
add_filter('polski/price_history/days', function (int $days, int $product_id): int {
    // Dłuższy okres dla produktów sezonowych
    if (has_term('sezonowe', 'product_cat', $product_id)) {
        return 180;
    }
    return $days;
}, 10, 2);

// Zmień pozycję wykresu na stronie produktu
add_filter('polski/price_history/hook', function (): string {
    return 'woocommerce_single_product_summary'; // domyślnie: woocommerce_product_meta_start
});

// Zmień priorytet hooka
add_filter('polski/price_history/hook_priority', function (): int {
    return 25;
});

// Filtruj dane wykresu
add_filter('polski/price_history/data', function (array $prices, int $product_id): array {
    return $prices;
}, 10, 2);
```

### Klasy CSS

- `.polski-price-history` - kontener główny
- `.polski-price-history__chart` - element SVG
- `.polski-price-history__label` - etykiety min/max
- `.polski-price-history__min` - cena minimalna
- `.polski-price-history__max` - cena maksymalna

```css
.polski-price-history {
    margin: 1rem 0;
    padding: 0.75rem;
    background: #f9fafb;
    border-radius: 0.5rem;
}
```

### ID modułu

`price_history_chart`

## Rozwiązywanie problemów

**Wykres nie wyświetla się** - sprawdź, czy moduł Omnibus jest włączony i czy produkt ma zapisaną historię cen. Nowe produkty nie będą miały wykresu do czasu pierwszej zmiany ceny.

**Wykres jest pusty/płaski** - jeśli cena nie zmieniała się w wybranym okresie, wykres pokazuje płaską linię. To prawidłowe zachowanie.

**Kolory wykresu nie pasują do motywu** - zmień kolor w ustawieniach modułu lub nadpisz w CSS: `.polski-price-history__chart path { stroke: #your-color; }`.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
