---
title: Warunkowe metody platnosci
description: Ukrywanie i pokazywanie metod platnosci na podstawie metody wysylki, wartosci koszyka, roli uzytkownika i kategorii produktow.
---

Modul warunkowych metod platnosci pozwala kontrolowac dostepnosc bramek platnosci na podstawie regul.

:::note[Wymagania]
Polski PRO wymaga: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Konfiguracja

Przejdz do **WooCommerce > Ustawienia > Polski PRO > Platnosci warunkowe**.

## Typy warunkow

| Warunek | Opis |
|---------|------|
| Metoda wysylki | Ukryj/pokaz bramke dla konkretnej metody wysylki |
| Wartosc koszyka (min) | Ukryj bramke gdy koszyk ponizej kwoty |
| Wartosc koszyka (max) | Ukryj bramke gdy koszyk powyzej kwoty |
| Rola uzytkownika | Bramka tylko dla okreslonej roli (np. wholesale) |
| Kategoria produktu | Bramka dostepna gdy w koszyku sa produkty z kategorii |

## Reguly

Kazda regula sklada sie z:
- **Bramka platnosci** - ktora bramka jest objeta regula
- **Akcja** - `hide` (ukryj gdy warunek spelniony) lub `show_only` (pokaz tylko gdy spelniony)
- **Typ warunku** - jeden z powyzszych
- **Wartosc warunku** - np. ID metody wysylki, kwota, slug roli

### Przyklady

| Bramka | Akcja | Warunek | Wartosc | Efekt |
|--------|-------|---------|---------|-------|
| Pobranie (COD) | hide | Metoda wysylki | inpost_locker | Ukryj pobranie dla Paczkomatow |
| Przelew | show_only | Wartosc koszyka min | 200 | Przelew dostepny od 200 PLN |
| PayPal | hide | Rola uzytkownika | wholesale | Hurtownicy nie widza PayPal |

## Oplaty za metode platnosci

Mozesz dodac dodatkowa oplate za wybrana metode platnosci:

| Ustawienie | Opis |
|------------|------|
| Wlaczone | Aktywuje oplate dla tej bramki |
| Tytul oplaty | Tekst widoczny w koszyku |
| Typ | Stala kwota lub procent |
| Kwota | Wartosc oplaty |
| Min. zamowienie | Oplata tylko powyzej kwoty |
| Max. zamowienie | Oplata tylko ponizej kwoty |
| Podlegajaca VAT | Czy naliczac VAT od oplaty |
| Klasa podatkowa | Klasa VAT dla oplaty |

Oplata jest automatycznie przeliczana przy zmianie metody platnosci na checkoucie (AJAX).

## Filtr WooCommerce

Modul uzywa filtra `woocommerce_available_payment_gateways` z priorytetem 100 i `woocommerce_cart_calculate_fees` dla oplat.
