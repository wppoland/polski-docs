---
title: Wlasne pola na checkoucie
description: Dodawanie, modyfikacja i reorganizacja pol formularza zamowienia z walidacja i wyswietlaniem w panelu admina i emailach.
---

Modul Custom Checkout Fields pozwala dodawac wlasne pola do formularza zamowienia WooCommerce.

## Wlaczenie

Przejdz do **WooCommerce > Polski > Moduły** i wlacz modul **Custom Checkout Fields** w sekcji "Checkout".

## Zarzadzanie polami

Po wlaczeniu modulu przejdz do **WooCommerce > Checkout Fields** aby dodawac i edytowac pola.

## Dostepne typy pol

| Typ | Opis |
|-----|------|
| Text | Pole tekstowe |
| Textarea | Wieloliniowe pole tekstowe |
| Select | Lista rozwijana |
| Checkbox | Pole wyboru |
| Radio | Przyciski radio |
| Number | Pole liczbowe |
| Email | Pole email z walidacja formatu |
| Date | Pole daty |
| Phone | Pole telefonu |

## Konfiguracja pola

| Opcja | Opis |
|-------|------|
| Wlaczone | Czy pole jest aktywne |
| Nazwa (meta key) | Klucz meta pod jakim zapisywana jest wartosc |
| Etykieta | Tekst etykiety widoczny nad polem |
| Typ | Typ pola (z powyzszej listy) |
| Sekcja | Billing, Shipping lub Order notes |
| Wymagane | Czy pole jest obowiazkowe |
| Priorytet | Kolejnosc wyswietlania (nizsza = wczesniej) |
| Placeholder | Tekst podpowiedzi w polu |
| Opcje | Dla select/radio: jedna opcja na linie (wartosc\|etykieta) |
| Klasa CSS | Klasy CSS (np. form-row-wide, form-row-first) |
| Pokaz w emailach | Wartosc pola w emailach zamowienia |
| Pokaz w adminie | Wartosc pola w panelu zamowienia |
| Pokaz w Moje Konto | Wartosc pola na stronie zamowienia klienta |
| Warunkowa wysylka | Pokaz pole tylko dla okreslonej metody wysylki |

## Opcje dla Select/Radio

Wpisz opcje po jednej na linie w formacie:
```
wartosc|Etykieta
```

Przyklad:
```
firma|Firma
osoba|Osoba prywatna
```

## Wyswietlanie wartosci

Wartosci wlasnych pol sa automatycznie wyswietlane:
- W panelu administratora zamowienia (pod adresem rozliczeniowym/wysylkowym)
- W emailach zamowienia
- Na stronie "Moje konto > Szczegoly zamowienia"

## Walidacja

- Pola wymagane - walidacja przy skladaniu zamowienia
- Pola email - walidacja formatu adresu
- Wartosc zapisywana jest jako sanityzowany tekst w meta zamowienia
