---
title: Dyrektywa Omnibus - śledzenie cen
description: Implementacja Dyrektywy Omnibus w Polski for WooCommerce - automatyczne śledzenie najniższej ceny z 30 dni, konfiguracja wyświetlania i shortcode.
---

Dyrektywa Omnibus (EU 2019/2161) obowiązuje w Polsce od 1 stycznia 2023. Przy każdej obniżce ceny musisz pokazać najniższą cenę z ostatnich 30 dni. Wtyczka automatycznie śledzi historię cen i wyświetla tę informację przy promocjach.

## Jak działa śledzenie cen

Wtyczka zapisuje każdą zmianę ceny produktu (w tym wariantów) w bazie danych. Gdy produkt jest "w promocji", wtyczka oblicza najniższą cenę z 30 dni i pokazuje ją klientom.

Śledzenie zaczyna się po włączeniu modułu. Jeśli produkt nie ma jeszcze historii cen, wyświetla się komunikat zastępczy.

![Strona produktu z wyświetloną najniższą ceną Omnibus](../../../assets/screenshots/screenshot-4-omnibus-lowest-price.png)

## Konfiguracja

Przejdź do **WooCommerce > Ustawienia > Polski > Omnibus** i skonfiguruj dostępne opcje.

### Okres śledzenia

| Opcja | Opis | Domyślna wartość |
|-------|------|------------------|
| `days` | Liczba dni wstecz do obliczania najniższej ceny | `30` |
| `prune_after_days` | Po ilu dniach usuwać stare wpisy z historii | `90` |

`prune_after_days` kontroluje rozmiar tabeli w bazie danych. Wartość `90` oznacza, że dane starsze niż 90 dni są automatycznie usuwane.

### Podatki

| Opcja | Opis | Domyślna wartość |
|-------|------|------------------|
| `include_tax` | Czy wyświetlana cena Omnibus ma zawierać podatek VAT | `true` |

Ustaw zgodnie z ustawieniami cen w WooCommerce. Jeśli ceny w sklepie są brutto, zostaw `true`.

### Miejsca wyświetlania

| Opcja | Opis | Domyślna wartość |
|-------|------|------------------|
| `display_on_sale_only` | Wyświetlaj tylko przy produktach w promocji | `true` |
| `show_on_single` | Strona pojedynczego produktu | `true` |
| `show_on_loop` | Lista produktów (kategoria, sklep) | `false` |
| `show_on_related` | Produkty powiązane | `false` |
| `show_on_cart` | Koszyk | `false` |

Włącz co najmniej na stronie produktu (`show_on_single`). Na liście produktów (`show_on_loop`) zajmuje więcej miejsca, ale niektóre interpretacje przepisów tego wymagają.

### Cena regularna

| Opcja | Opis | Domyślna wartość |
|-------|------|------------------|
| `show_regular_price` | Wyświetlaj również cenę regularną obok ceny Omnibus | `false` |

### Szablon tekstu

| Opcja | Opis | Domyślna wartość |
|-------|------|------------------|
| `display_text` | Szablon wyświetlanego komunikatu | `Najniższa cena z {days} dni przed obniżką: {price}` |
| `no_history_text` | Tekst gdy brak historii cen | `Brak danych o wcześniejszej cenie` |

Dostępne zmienne w szablonie `display_text`:

- `{price}` - najniższa cena z danego okresu
- `{days}` - liczba dni (domyślnie 30)
- `{date}` - data najniższej ceny
- `{regular_price}` - cena regularna produktu (przed promocją)

#### Przykłady szablonów

```
Najniższa cena z {days} dni przed obniżką: {price}
```

```
Najniższa cena z ostatnich {days} dni: {price} (cena regularna: {regular_price})
```

```
Omnibus: {price} (z dnia {date})
```

### Sposób liczenia ceny

| Opcja | Opis | Domyślna wartość |
|-------|------|------------------|
| `price_count_from` | Od kiedy liczyć 30 dni | `sale_start` |

Dostępne wartości:

- `sale_start` - od daty rozpoczęcia promocji (zalecane przez UOKiK)
- `current_date` - od bieżącej daty

### Produkty wariantowe

| Opcja | Opis | Domyślna wartość |
|-------|------|------------------|
| `variable_tracking` | Sposób śledzenia wariantów | `per_variation` |

Dostępne wartości:

- `per_variation` - osobne śledzenie każdego wariantu (rekomendowane)
- `parent_only` - śledzenie tylko ceny produktu nadrzędnego

`per_variation` daje dokładniejsze dane, bo każdy wariant może mieć inną cenę i historię obniżek.

## Shortcode

Użyj shortcode `[polski_omnibus_price]` do wyświetlenia informacji o najniższej cenie w dowolnym miejscu witryny.

### Podstawowe użycie

```
[polski_omnibus_price]
```

Wyświetla cenę Omnibus dla bieżącego produktu.

### Z parametrami

```
[polski_omnibus_price product_id="456" days="30"]
```

### Parametry shortcode

| Parametr | Opis | Domyślna wartość |
|----------|------|------------------|
| `product_id` | ID produktu | Bieżący produkt |
| `days` | Liczba dni | Wartość z ustawień |

### Przykład użycia w szablonie PHP

```php
echo do_shortcode('[polski_omnibus_price product_id="' . $product_id . '"]');
```

## Automatyczne czyszczenie historii

WP-Cron codziennie usuwa wpisy historii cen starsze niż `prune_after_days`. Tabela w bazie danych nie rośnie bez ograniczeń.

Aby ręcznie wymusić czyszczenie, możesz użyć WP-CLI:

```bash
wp cron event run polski_omnibus_prune
```

## Zgodność z przepisami UOKiK

Wytyczne UOKiK:

1. Informacja o najniższej cenie musi być wyświetlana **przy każdym ogłoszeniu o obniżce**
2. Okres referencyjny to **30 dni przed zastosowaniem obniżki**
3. Dla produktów sprzedawanych krócej niż 30 dni - podaj najniższą cenę od dnia wprowadzenia do sprzedaży
4. Dla produktów ulegających szybkiemu zepsuciu - możliwe skrócenie okresu

Wtyczka domyślnie stosuje te wytyczne. Opcja `price_count_from` na `sale_start` liczy od daty rozpoczęcia promocji, zgodnie z zaleceniami UOKiK.

## Rozwiązywanie problemów

**Cena Omnibus nie wyświetla się**
Sprawdź, czy produkt ma ustawioną cenę promocyjną w WooCommerce. Przy włączonej opcji `display_on_sale_only` komunikat pojawi się tylko przy aktywnej promocji.

**Wyświetla się komunikat o braku historii**
Śledzenie cen zaczyna się po włączeniu modułu. Poczekaj na zmianę ceny lub zapisz produkt ponownie, aby dodać pierwszy wpis do historii.

**Cena Omnibus jest taka sama jak cena promocyjna**
To poprawne zachowanie, jeśli produkt nie miał niższej ceny w ciągu ostatnich 30 dni.

## Dalsze kroki

- Zgłaszaj problemy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Dyskusje i pytania: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
