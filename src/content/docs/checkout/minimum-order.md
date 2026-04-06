---
title: Minimalna wartosc i ilosc zamowienia
description: Modul wymuszania minimalnej wartosci koszyka i minimalnej liczby produktow w zamowieniu WooCommerce.
---

Modul minimalnego zamowienia blokuje przejscie do checkoutu, jesli koszyk nie spelnia wymaganych progów - minimalnej wartosci lub minimalnej liczby produktów.

## Konfiguracja

Przejdz do **WooCommerce > Ustawienia > Polski > Moduly** i wlacz modul **Minimalne zamowienie**.

Nastepnie skonfiguruj progi w **WooCommerce > Ustawienia > Polski > Checkout**:

| Ustawienie | Opis | Domyslnie |
|------------|------|-----------|
| Minimalna wartosc zamowienia | Kwota w PLN (0 = wylaczone) | 0 |
| Minimalna liczba produktow | Liczba sztuk (0 = wylaczone) | 0 |
| Wylacz produkty w promocji | Nie licz produktow w promocji do minimalnej wartosci | Nie |
| Komunikat wartosci | Tekst bledu z tokenami `{min_value}` i `{current_value}` | Minimalna wartosc zamowienia to {min_value}. Aktualna wartosc koszyka: {current_value}. |
| Komunikat ilosci | Tekst bledu z tokenami `{min_quantity}` i `{current_quantity}` | Minimalna liczba produktow w zamowieniu to {min_quantity}. Aktualna liczba: {current_quantity}. |

## Jak to dziala

Modul waliduje koszyk w dwóch miejscach:

1. **Strona koszyka** (`woocommerce_check_cart_items`) - wyswietla komunikat bledu
2. **Strona checkout** (`woocommerce_checkout_process`) - blokuje zlozenie zamowienia

Jesli koszyk nie spelnia wymagania, klient widzi czerwony komunikat bledu i nie moze przejsc do platnosci.

### Przyklady komunikatow

**Minimalna wartosc:**
> Minimalna wartosc zamowienia to 50,00 PLN. Aktualna wartosc koszyka: 29,99 PLN.

**Minimalna ilosc:**
> Minimalna liczba produktow w zamowieniu to 3. Aktualna liczba: 1.

## Wylaczenie produktow promocyjnych

Opcja "Wylacz produkty w promocji" pozwala nie liczyc wartosci produktow ze znizka do minimalnej wartosci koszyka. Przydatne, gdy chcesz, aby minimum dotyczylo tylko produktow w pelnej cenie.

## Zastosowania

| Scenariusz | Konfiguracja |
|------------|-------------|
| Sklep hurtowy (B2B) | Min. wartosc 200 PLN, min. ilosc 5 |
| Darmowa dostawa od kwoty | Min. wartosc 100 PLN (alternatywa dla progu darmowej wysylki) |
| Zapobieganie mikrozamowieniom | Min. wartosc 20 PLN |
| Produkty w pakietach | Min. ilosc 3 |

## Kompatybilnosc

Modul dziala z:
- WooCommerce Checkout Blocks
- Klasycznym checkout (shortcode)
- Wszystkimi metodami platnosci
- Multi-step checkout (Polski PRO)
