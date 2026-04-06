---
title: Integracja DHL Parcel Poland
description: Modul integracji DHL Parcel Poland w Polski PRO for WooCommerce - generowanie etykiet, sledzenie przesylek i wyszukiwanie ServicePoint.
---

Modul DHL integruje WooCommerce z REST API DHL Parcel Poland. Generuj etykiety, sledz przesylki i oferuj punkty ServicePoint na checkoucie.

:::note[Wymagania]
Polski PRO wymaga: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Dodatkowo wymagany jest klucz API DHL i numer konta DHL.
:::

## Konfiguracja

Przejdz do **WooCommerce > Ustawienia > Polski PRO > Wysylka**.

### Uwierzytelnianie API

| Ustawienie | Opis |
|------------|------|
| Klucz API DHL | Bearer token z DHL Developer Portal |
| Numer konta DHL | Numer konta klienta DHL Parcel Poland |

Klucz API uzyskasz rejestrujac sie na [developer.dhl.com](https://developer.dhl.com) i tworzac aplikacje z dostepem do DHL Parcel Poland API.

### Wlaczenie modulu

1. Przejdz do **Polski PRO > Moduly**
2. Wlacz modul **DHL Parcel Poland**
3. Uzupelnij klucz API i numer konta w ustawieniach wysylki

## Generowanie etykiet

Etykiety generujesz z poziomu edytora zamowienia:

1. Otworz zamowienie w **WooCommerce > Zamowienia**
2. W sekcji **Shipment Tracking** wybierz przewoznika **DHL**
3. Kliknij **Generuj etykiete**
4. System utworzy przesylke przez DHL REST API i zwroci numer sledzenia + link do etykiety PDF

### Typy uslug

| Typ | Opis |
|-----|------|
| AH | Standardowa dostawa pod adres (domyslny) |
| AP | Dostawa do ServicePoint / paczkomatu DHL |

Dla uslug AP (ServicePoint) wymagane jest podanie ID punktu odbioru.

### Dane przesylki

Modul automatycznie pobiera z zamowienia dane odbiorcy i wage produktow. Domyslne wymiary paczki: 40x30x20 cm.

## DHL ServicePoint

Modul umozliwia wyszukiwanie punktow ServicePoint (POP i paczkomaty DHL):

- Wyszukiwanie po miescie
- Wyszukiwanie po wspolrzednych GPS (promien 5 km)
- Zwracane dane: nazwa, adres, typ (POP/paczkomat), wspolrzedne

## Sledzenie przesylek

Po wygenerowaniu etykiety numer sledzenia jest automatycznie zapisywany. Link do trackingu DHL jest generowany w formacie:

```
https://www.dhl.com/pl-pl/home/sledzenie-przesylek.html?tracking-id={numer}
```

Klient otrzymuje email z numerem sledzenia przy zmianie statusu na **Wyslane**.

## Kody bledow

| Kod | Opis | Rozwiazanie |
|-----|------|-------------|
| HTTP 401 | Nieprawidlowy klucz API | Sprawdz Bearer token w ustawieniach |
| HTTP 400 | Nieprawidlowe dane przesylki | Sprawdz adres, kod pocztowy i numer konta |
| HTTP 429 | Limit zapytan API | Poczekaj chwile i sprobuj ponownie |

## Filtry i akcje

```php
// Filtruj dane przesylki przed wyslaniem do DHL
add_filter('polski_pro/shipping/dhl/parcel_data', function (array $data, WC_Order $order): array {
    $data['service_type'] = 'AP'; // Wymus dostawa do ServicePoint
    $data['servicepoint_id'] = 'PL-12345';
    return $data;
}, 10, 2);
```
