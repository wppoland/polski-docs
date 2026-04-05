---
title: Integracja InPost (Paczkomaty)
description: Moduł integracji InPost ShipX API w Polski PRO for WooCommerce - Paczkomaty, generowanie etykiet, mapa punktów odbioru i śledzenie przesyłek.
---

Moduł InPost integruje WooCommerce z API ShipX. Generuj etykiety, pozwól klientom wybrać Paczkomat na mapie i śledź przesyłki z panelu admina.

:::note[Wymagania]
Polski PRO wymaga: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Dodatkowo wymagany jest aktywny token API InPost ShipX (uzyskiwany z panelu managera InPost).
:::

## Konfiguracja

Przejdź do **WooCommerce > Ustawienia > Polski PRO > InPost**.

### Uwierzytelnianie API

| Ustawienie | Opis |
|------------|------|
| Token API | Token autoryzacyjny z panelu InPost Manager |
| ID organizacji | Identyfikator organizacji w systemie InPost |
| Tryb sandbox | Używa środowiska testowego ShipX API |

Token trafia w nagłówku `Authorization: Bearer {token}`. Musi mieć uprawnienia do tworzenia przesyłek i etykiet.

### Ustawienia metody wysyłki

Po skonfigurowaniu API, utwórz nową metodę wysyłki:

1. Przejdź do **WooCommerce > Ustawienia > Wysyłka > Strefy wysyłki**
2. Edytuj strefę "Polska"
3. Kliknij "Dodaj metodę wysyłki"
4. Wybierz "InPost Paczkomat" lub "InPost Kurier"

| Ustawienie metody | Domyślna wartość | Opis |
|-------------------|------------------|------|
| Tytuł metody | "InPost Paczkomat" | Nazwa wyświetlana klientowi |
| Koszt | 0 | Koszt wysyłki (0 = darmowa) |
| Darmowa wysyłka od | "" | Kwota zamówienia, od której wysyłka jest darmowa |
| Domyślny rozmiar paczki | A | Rozmiar: `A`, `B`, `C` |
| Ubezpieczenie | Nie | Dodaj ubezpieczenie do przesyłki |

## Mapa punktów odbioru

### Widget mapy

Po wybraniu "InPost Paczkomat" na kasie wyświetla się interaktywny widget mapy.

Widget oferuje:

- **Mapę** z pinezkami Paczkomatów
- **Wyszukiwanie po mieście** - wpisz nazwę miasta, aby wycentrować mapę
- **Wyszukiwanie po współrzędnych** - automatyczne geolokalizacja (za zgodą użytkownika)
- **Wyszukiwanie po kodzie pocztowym** - znajdź najbliższe Paczkomaty
- **Listę Paczkomatów** - posortowaną od najbliższego
- **Szczegóły punktu** - adres, godziny otwarcia, dostępne rozmiary skrytek

### Wyszukiwanie po mieście

Widget wysyła zapytanie do endpointu ShipX API:

```
GET /v1/points?type=parcel_locker&city={city}&per_page=25
```

Wyniki są cache'owane na 24 godziny w transients WordPress.

### Wyszukiwanie po współrzędnych

Gdy klient wyrazi zgodę na geolokalizację:

```
GET /v1/points?type=parcel_locker&relative_point={lat},{lng}&per_page=10
```

### Filtrowanie punktów

```php
/**
 * Filtruje listę punktów odbioru InPost.
 *
 * @param array  $points  Tablica punktów odbioru z API
 * @param string $city    Wyszukiwane miasto
 * @param array  $coords  Współrzędne [lat, lng] lub pusta tablica
 */
apply_filters('polski_pro/inpost/points', array $points, string $city, array $coords): array;
```

**Przykład - wykluczenie punktów tymczasowo niedostępnych:**

```php
add_filter('polski_pro/inpost/points', function (array $points, string $city, array $coords): array {
    $excluded_points = ['KRA123', 'WAW456']; // Tymczasowo wyłączone
    return array_filter($points, function (array $point) use ($excluded_points): bool {
        return ! in_array($point['name'], $excluded_points, true);
    });
}, 10, 3);
```

## Generowanie etykiet

### Z panelu zamówienia

W panelu **InPost** na stronie zamówienia:

1. **Generuj etykietę** - tworzy przesyłkę w API ShipX i generuje etykietę PDF
2. **Pobierz etykietę** - pobiera wygenerowaną etykietę
3. **Drukuj etykietę** - otwiera podgląd wydruku

### Masowe generowanie

Zaznacz wiele zamówień na liście i wybierz "Generuj etykiety InPost". Etykiety generują się w tle. Po zakończeniu pobierz plik ZIP.

### Dane przesyłki

Etykieta jest generowana na podstawie:

| Pole | Źródło | Opis |
|------|--------|------|
| Nadawca | Ustawienia sklepu | Adres i dane firmy z WooCommerce |
| Odbiorca | Dane zamówienia | Imię, nazwisko, telefon, e-mail |
| Punkt odbioru | Wybór klienta | ID Paczkomatu wybranego na kasie |
| Rozmiar paczki | Ustawienie metody | Lub nadpisanie w zamówieniu |
| Kwota pobrania | Zamówienie COD | Tylko dla zamówień za pobraniem |

### Hook generowania etykiety

```php
/**
 * Filtruje dane przesyłki przed wysłaniem do API ShipX.
 *
 * @param array     $shipment_data Dane przesyłki
 * @param \WC_Order $order         Zamówienie WooCommerce
 */
apply_filters('polski_pro/inpost/shipment_data', array $shipment_data, \WC_Order $order): array;
```

**Przykład - dodanie referencji zamówienia:**

```php
add_filter('polski_pro/inpost/shipment_data', function (array $shipment_data, \WC_Order $order): array {
    $shipment_data['reference'] = sprintf('ORDER-%s', $order->get_order_number());
    return $shipment_data;
}, 10, 2);
```

## Śledzenie przesyłek

### Automatyczne śledzenie

Po wygenerowaniu etykiety moduł sprawdza status przesyłki co 2 godziny (WP-Cron). Statusy mapują się na statusy WooCommerce:

| Status InPost | Status WooCommerce | Opis |
|---------------|-------------------|------|
| `created` | `processing` | Przesyłka utworzona |
| `dispatched_by_sender` | `processing` | Nadana przez nadawcę |
| `collected_from_sender` | `shipped` | Odebrana od nadawcy |
| `out_for_delivery` | `shipped` | W doręczeniu |
| `ready_to_pickup` | `shipped` | Gotowa do odbioru w Paczkomacie |
| `delivered` | `completed` | Dostarczona / odebrana |

### Powiadomienia klienta

Klient dostaje e-mail z linkiem do śledzenia na stronie InPost. Link jest dodawany do:

- E-maila "Zamówienie w realizacji"
- Strony "Moje konto > Zamówienia > Szczegóły"
- Notatek zamówienia (widocznych dla klienta)

### Hook śledzenia

```php
/**
 * Akcja wywoływana po aktualizacji statusu przesyłki.
 *
 * @param int      $order_id      ID zamówienia
 * @param string   $tracking_number Numer śledzenia
 * @param string   $old_status    Poprzedni status InPost
 * @param string   $new_status    Nowy status InPost
 */
do_action('polski_pro/inpost/status_updated', int $order_id, string $tracking_number, string $old_status, string $new_status);
```

**Przykład - powiadomienie SMS o gotowości do odbioru:**

```php
add_action('polski_pro/inpost/status_updated', function (
    int $order_id,
    string $tracking_number,
    string $old_status,
    string $new_status
): void {
    if ($new_status === 'ready_to_pickup') {
        $order = wc_get_order($order_id);
        $phone = $order->get_billing_phone();
        send_sms($phone, sprintf(
            'Twoja paczka %s czeka w Paczkomacie. Kod odbioru w e-mailu.',
            $tracking_number
        ));
    }
}, 10, 4);
```

## Rozmiary paczek

| Rozmiar | Wymiary (cm) | Waga max |
|---------|-------------|----------|
| A | 8 x 38 x 64 | 25 kg |
| B | 19 x 38 x 64 | 25 kg |
| C | 41 x 38 x 64 | 25 kg |

Rozmiar paczki może być ustawiany globalnie, per metoda wysyłki lub nadpisywany ręcznie w zamówieniu.

## Rozwiązywanie problemów

**Mapa Paczkomatów nie ładuje się**
Sprawdź, czy token API jest poprawny i aktywny. Sprawdź konsolę przeglądarki pod kątem błędów CORS lub JavaScript. Upewnij się, że skrypt `polski-pro-inpost-map.js` jest załadowany.

**Błąd generowania etykiety "Unauthorized"**
Token API wygasł lub nie ma uprawnień do tworzenia przesyłek. Wygeneruj nowy token w panelu InPost Manager.

**Status przesyłki nie aktualizuje się**
Sprawdź, czy WP-Cron działa poprawnie. Uruchom ręcznie: `wp cron event run polski_pro_inpost_tracking`.

## Dalsze kroki

- Zgłaszaj problemy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Dokumentacja API ShipX: [https://docs.inpost24.com/](https://docs.inpost24.com/)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
