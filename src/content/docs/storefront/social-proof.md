---
title: Powiadomienia social proof
description: Moduł powiadomień social proof w Polski for WooCommerce - wyskakujące powiadomienia o ostatnich zakupach budujące zaufanie klientów.
---

Powiadomienia social proof to pływające komunikaty (toast notifications) informujące odwiedzających o ostatnich zakupach innych klientów. Mechanizm dowodu społecznego zachęca do zakupu, pokazując że inni klienci aktywnie kupują w sklepie.

## Włączenie modułu

Przejdź do **WooCommerce > Polski > Moduły sklepowe** i włącz **Social proof**. Powiadomienia zaczną pojawiać się automatycznie na podstawie ostatnich zamówień WooCommerce.

## Funkcje

- Pływające powiadomienia o ostatnich zakupach
- Dane pobierane z rzeczywistych zamówień WooCommerce przez AJAX
- Cache transient API (5 minut) dla wydajności
- Anonimizacja imion klientów (np. "Jan K.")
- Konfigurowalna częstotliwość i czas wyświetlania
- Wybór pozycji na ekranie (4 rogi)
- Opcja ukrycia na urządzeniach mobilnych
- Miniaturka produktu w powiadomieniu

## Ustawienia

Konfiguracja w **WooCommerce > Polski > Moduły sklepowe > Social proof**.

| Ustawienie | Domyślnie | Opis |
|---|---|---|
| `display_interval` | `30` | Odstęp między powiadomieniami (sekundy) |
| `display_duration` | `5` | Czas wyświetlania pojedynczego powiadomienia (sekundy) |
| `position` | `bottom-left` | Pozycja na ekranie: `bottom-left`, `bottom-right`, `top-left`, `top-right` |
| `anonymize_name` | `true` | Anonimizuj imiona klientów (Jan Kowalski -> Jan K.) |
| `hide_on_mobile` | `false` | Ukryj powiadomienia na urządzeniach mobilnych |

Opcja w bazie danych: `polski_social_proof`.

## Format powiadomienia

Każde powiadomienie zawiera:

- Miniaturkę produktu
- Imię klienta (z opcjonalną anonimizacją)
- Nazwę produktu z linkiem
- Czas zakupu (np. "2 godziny temu")

Przykład: **Jan K.** kupił **Koszulka polo** - 2 godziny temu

## Szczegóły techniczne

### Źródło danych

Powiadomienia generowane są z ostatnich zamówień WooCommerce ze statusem `completed` lub `processing`. Moduł pobiera do 20 ostatnich zamówień i losowo rotuje je w powiadomieniach.

### Cache

Dane zamówień cachowane są w transient API z czasem wygaśnięcia 5 minut (`polski_social_proof_data`). Dzięki temu powiadomienia nie generują zapytań do bazy przy każdym wyświetleniu.

### Pliki

- JavaScript: `assets/js/social-proof.js`

Skrypt ładowany jest warunkowo i pobiera dane przez AJAX endpoint.

### Hooki

```php
// Filtruj dane wyświetlane w powiadomieniu
add_filter('polski/social_proof/notification_data', function (array $data): array {
    // Ukryj produkty z określonej kategorii
    if (has_term('vip', 'product_cat', $data['product_id'])) {
        return [];
    }
    return $data;
});

// Zmień liczbę zamówień pobieranych do rotacji
add_filter('polski/social_proof/orders_limit', function (): int {
    return 50;
});

// Zmień czas cache
add_filter('polski/social_proof/cache_expiration', function (): int {
    return 10 * MINUTE_IN_SECONDS;
});
```

### Klasy CSS

- `.polski-social-proof` - kontener powiadomienia
- `.polski-social-proof--visible` - stan widoczny (z animacją)
- `.polski-social-proof__image` - miniaturka produktu
- `.polski-social-proof__content` - treść powiadomienia
- `.polski-social-proof__name` - imię klienta
- `.polski-social-proof__product` - nazwa produktu
- `.polski-social-proof__time` - czas zakupu
- `.polski-social-proof__close` - przycisk zamknięcia

### ID modułu

`social_proof`

## Rozwiązywanie problemów

**Powiadomienia nie pojawiają się** - sprawdź, czy sklep ma zamówienia ze statusem `completed` lub `processing`. Moduł wymaga co najmniej jednego zamówienia do wyświetlania powiadomień.

**Powiadomienia wyświetlają się za często/za rzadko** - dostosuj ustawienia `display_interval` i `display_duration`.

**Powiadomienia zasłaniają inne elementy** - zmień pozycję w ustawieniach lub dostosuj `z-index` w CSS: `.polski-social-proof { z-index: 9999; }`.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
