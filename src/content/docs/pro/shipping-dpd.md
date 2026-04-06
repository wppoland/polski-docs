---
title: Integracja DPD Polska
description: Modul integracji DPD Polska w Polski PRO for WooCommerce - generowanie etykiet, sledzenie przesylek i punkty odbioru DPD Pickup.
---

Modul DPD integruje WooCommerce z API DPD Polska. Generuj etykiety wysylkowe, sledz przesylki i pozwol klientom wybrac punkt DPD Pickup.

:::note[Wymagania]
Polski PRO wymaga: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Dodatkowo wymagany jest aktywny login i haslo do DPD Web Service API.
:::

## Konfiguracja

Przejdz do **WooCommerce > Ustawienia > Polski PRO > Wysylka**.

### Uwierzytelnianie API

| Ustawienie | Opis |
|------------|------|
| Login DPD | Login do DPD Web Service API |
| Haslo DPD | Haslo do DPD Web Service API |
| Master FID | Numer FID nadawcy (identyfikator klienta DPD) |

Dane dostepowe uzyskasz z panelu klienta DPD lub od opiekuna handlowego.

### Wlaczenie modulu

1. Przejdz do **Polski PRO > Moduly**
2. Wlacz modul **DPD Polska**
3. Uzupelnij dane API w ustawieniach wysylki

## Generowanie etykiet

Etykiety generujesz z poziomu edytora zamowienia:

1. Otworz zamowienie w **WooCommerce > Zamowienia**
2. W sekcji **Shipment Tracking** wybierz przewoznika **DPD**
3. Kliknij **Generuj etykiete**
4. System utworzy przesylke przez DPD SOAP API i zwroci numer listu przewozowego

Etykieta jest automatycznie przypisywana do zamowienia. Numer sledzenia i link do trackingu wyswietlaja sie w panelu zamowienia i w emailu do klienta.

### Dane przesylki

Modul automatycznie pobiera z zamowienia:

- Imie i nazwisko / nazwe firmy odbiorcy
- Adres dostawy (ulica, miasto, kod pocztowy)
- Telefon i email
- Wage (z danych produktow lub domyslna)

### Masowe generowanie

Zaznacz wiele zamowien na liscie i uzyj akcji masowej **Generuj etykiety DPD** do przetworzenia kilku zamowien jednoczesnie.

## Punkty odbioru DPD Pickup

Modul umozliwia wyszukiwanie punktow DPD Pickup w poblizu klienta:

- Wyszukiwanie po miescie
- Wyszukiwanie po wspolrzednych GPS (promien 5 km)
- Zwracane dane: nazwa, adres, kod pocztowy, wspolrzedne

## Sledzenie przesylek

Po wygenerowaniu etykiety, numer sledzenia jest automatycznie zapisywany w zamowieniu. Link do trackingu DPD jest generowany automatycznie.

Klient otrzymuje email z numerem sledzenia i linkiem przy zmianie statusu zamowienia na **Wyslane**.

## Kody bledow

| Kod | Opis | Rozwiazanie |
|-----|------|-------------|
| HTTP 401 | Bledne dane logowania | Sprawdz login i haslo w ustawieniach |
| HTTP 500 | Blad serwera DPD | Sprobuj ponownie za kilka minut |
| Validation error | Niepoprawne dane adresowe | Sprawdz format kodu pocztowego (XX-XXX) |

## Filtry i akcje

```php
// Filtruj dane przesylki przed wyslaniem do DPD
add_filter('polski_pro/shipping/dpd/parcel_data', function (array $data, WC_Order $order): array {
    $data['weight'] = 2.5; // Ustaw stala wage
    return $data;
}, 10, 2);
```
