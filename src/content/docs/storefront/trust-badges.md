---
title: Znaczniki zaufania (trust badges)
description: Moduł znaczników zaufania w Polski for WooCommerce - konfigurowalne sygnały zaufania na stronach produktu, koszyka i zamówienia.
---

Znaczniki zaufania to graficzne elementy informujące klientów o bezpiecznych płatnościach, szybkiej dostawie, możliwości zwrotu i gwarancji jakości. Pomagają zwiększyć konwersję poprzez budowanie zaufania w kluczowych momentach ścieżki zakupowej.

## Włączenie modułu

Przejdź do **WooCommerce > Polski > Moduły sklepowe** i włącz **Znaczniki zaufania**. Ikony pojawią się automatycznie na stronach produktu, koszyka i zamówienia.

## Funkcje

- Konfigurowalne sygnały zaufania z ikonami SVG inline
- Wyświetlanie na stronach produktu, koszyka i podsumowania zamówienia
- 7 typów ikon: zamek (lock), ciężarówka (truck), odświeżanie (refresh), tarcza (shield), gwiazdka (star), ptaszek (check), serce (heart)
- Własne teksty pod każdym znacznikiem
- Czysty CSS bez zewnętrznych zależności
- Responsywne układanie na urządzeniach mobilnych

## Ustawienia

Konfiguracja w **WooCommerce > Polski > Moduły sklepowe > Znaczniki zaufania**.

| Ustawienie | Domyślnie | Opis |
|---|---|---|
| `show_on_product` | `true` | Wyświetlaj znaczniki na stronie produktu |
| `show_on_cart` | `true` | Wyświetlaj znaczniki na stronie koszyka |
| `show_on_checkout` | `true` | Wyświetlaj znaczniki na stronie zamówienia |

Każdy znacznik można indywidualnie włączyć/wyłączyć i skonfigurować:

- **Ikona** - wybór z 7 dostępnych typów
- **Tytuł** - krótki tekst pod ikoną (np. "Bezpieczna płatność")
- **Kolejność** - pozycja względem innych znaczników

Opcja w bazie danych: `polski_trust_badges`.

## Domyślne znaczniki

Po włączeniu modułu dostępne są 4 predefiniowane znaczniki:

| Znacznik | Ikona | Domyślny tekst |
|---|---|---|
| Bezpieczna płatność | lock | Szyfrowane połączenie SSL |
| Szybka dostawa | truck | Wysyłka w 24h |
| Zwroty | refresh | 14 dni na zwrot |
| Gwarancja jakości | shield | Oryginalne produkty |

## Szczegóły techniczne

### Ikony SVG

Wszystkie ikony renderowane są jako inline SVG - brak zapytań HTTP, brak zależności od bibliotek ikon. Każda ikona ma rozmiar 32x32px i dziedziczy kolor z CSS.

### Hooki

```php
// Filtruj listę znaczników
add_filter('polski/trust_badges/items', function (array $badges): array {
    // Dodaj własny znacznik
    $badges[] = [
        'icon'  => 'star',
        'title' => 'Ponad 1000 opinii',
    ];
    return $badges;
});

// Zmień pozycję na stronie produktu
add_filter('polski/trust_badges/product_hook', function (): string {
    return 'woocommerce_after_add_to_cart_form'; // domyślnie: woocommerce_product_meta_end
});
```

### Klasy CSS

- `.polski-trust-badges` - kontener główny
- `.polski-trust-badge` - pojedynczy znacznik
- `.polski-trust-badge__icon` - ikona SVG
- `.polski-trust-badge__title` - tekst pod ikoną

```css
.polski-trust-badges {
    display: flex;
    gap: 1rem;
    justify-content: center;
    padding: 1rem 0;
    border-top: 1px solid #e5e7eb;
}
```

### ID modułu

`trust_badges`

## Rozwiązywanie problemów

**Znaczniki nie wyświetlają się** - sprawdź, czy motyw obsługuje hooki WooCommerce na stronie produktu (`woocommerce_product_meta_end`) i koszyka (`woocommerce_after_cart_totals`).

**Ikony są za małe/za duże** - nadpisz rozmiar w CSS: `.polski-trust-badge__icon svg { width: 40px; height: 40px; }`.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
