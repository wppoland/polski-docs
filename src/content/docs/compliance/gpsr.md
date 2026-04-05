---
title: GPSR - bezpieczeństwo produktów
description: Konfiguracja pól GPSR (General Product Safety Regulation) w Polski for WooCommerce - producent, importer, osoba odpowiedzialna w UE, identyfikatory, ostrzeżenia i instrukcje.
---

Rozporządzenie GPSR (General Product Safety Regulation, EU 2023/988) obowiązuje od 13 grudnia 2024 roku. Wymaga podawania informacji o bezpieczeństwie produktów sprzedawanych w UE. Polski for WooCommerce dodaje pola produktowe, kolumnę statusu i import/eksport CSV - wszystko, czego potrzebujesz, bez dodatkowych wtyczek.

## Wymagania GPSR

Każdy produkt niespożywczy sprzedawany w UE musi zawierać:

1. **Dane producenta** - nazwa, adres, dane kontaktowe
2. **Dane importera** - jeśli producent ma siedzibę poza UE
3. **Osoba odpowiedzialna w UE** - wymagana dla produktów spoza UE
4. **Identyfikatory produktu** - numer partii, numer seryjny, kod EAN/GTIN
5. **Ostrzeżenia** - informacje o zagrożeniach i ograniczeniach wiekowych
6. **Instrukcje bezpieczeństwa** - zasady bezpiecznego użytkowania
7. **Zdjęcia/dokumenty** - opcjonalne załączniki (karty charakterystyki, certyfikaty)
8. **Kategoria ryzyka** - klasyfikacja poziomu ryzyka produktu

## Konfiguracja pól GPSR

Pola GPSR znajdziesz w edycji produktu, w zakładce **Polski - GPSR**. Każde pole jest opcjonalne, ale wypełnij wszystkie, które dotyczą danego produktu.

![Pola GPSR w edytorze produktu WooCommerce](../../../assets/screenshots/screenshot-2-gpsr-product-editor.png)

### Producent

Wypełnij pełne dane producenta:

- Nazwa firmy
- Adres (ulica, kod pocztowy, miasto, kraj)
- Adres e-mail
- Numer telefonu
- Strona internetowa

### Importer

Wymagane, gdy producent ma siedzibę poza UE. Podaj te same dane co dla producenta.

### Osoba odpowiedzialna w UE

Każdy produkt niespożywczy od podmiotu spoza UE musi mieć osobę odpowiedzialną z siedzibą w Unii. Podaj:

- Nazwa firmy lub imię i nazwisko
- Adres w UE
- Dane kontaktowe (e-mail, telefon)

### Identyfikatory produktu

- **Numer partii (LOT)** - identyfikator partii produkcyjnej
- **Numer seryjny** - unikalny identyfikator egzemplarza
- **EAN/GTIN** - kod kreskowy produktu
- **Numer modelu** - oznaczenie modelu

### Ostrzeżenia i ograniczenia

Pole tekstowe na informacje o:

- Zagrożeniach związanych z użytkowaniem
- Ograniczeniach wiekowych (np. "Nieodpowiednie dla dzieci poniżej 3 lat")
- Wymaganiach dotyczących nadzoru osoby dorosłej
- Substancjach niebezpiecznych

### Instrukcje bezpieczeństwa

Pole na instrukcje dotyczące:

- Prawidłowego montażu i instalacji
- Bezpiecznego użytkowania
- Konserwacji i przechowywania
- Postępowania w razie wypadku

## Kolumna statusu GPSR

Na liście produktów (**Produkty > Wszystkie produkty**) wtyczka dodaje kolumnę **GPSR** ze statusem wypełnienia:

- Zielona ikona - wszystkie wymagane pola wypełnione
- Pomarańczowa ikona - częściowo wypełnione
- Czerwona ikona - brak danych GPSR

Kolumna pozwala szybko znaleźć produkty, które wymagają uzupełnienia danych.

## Import i eksport CSV

### Eksport

Przy eksporcie produktów (**Produkty > Eksportuj**) wtyczka dodaje kolumny GPSR do pliku CSV:

- `gpsr_manufacturer_name`
- `gpsr_manufacturer_address`
- `gpsr_manufacturer_email`
- `gpsr_manufacturer_phone`
- `gpsr_manufacturer_url`
- `gpsr_importer_name`
- `gpsr_importer_address`
- `gpsr_importer_email`
- `gpsr_eu_responsible_name`
- `gpsr_eu_responsible_address`
- `gpsr_eu_responsible_email`
- `gpsr_identifiers_lot`
- `gpsr_identifiers_serial`
- `gpsr_identifiers_ean`
- `gpsr_identifiers_model`
- `gpsr_warnings`
- `gpsr_instructions`

### Import

Przygotuj plik CSV z takimi samymi nagłówkami jak przy eksporcie. Importuj przez **Produkty > Importuj**.

Wskazówka: najpierw wyeksportuj kilka produktów - dostaniesz szablon CSV z prawidłowymi nagłówkami.

## Shortcode

Użyj shortcode `[polski_gpsr]` do wyświetlenia informacji GPSR na stronie produktu lub w dowolnym miejscu witryny.

### Podstawowe użycie

```
[polski_gpsr]
```

Wyświetla dane GPSR bieżącego produktu (działa na stronie produktu WooCommerce).

### Z określeniem produktu

```
[polski_gpsr product_id="123"]
```

Wyświetla dane GPSR dla produktu o podanym ID.

### Przykład wyniku

Shortcode generuje sformatowaną tabelę z sekcjami:

| Sekcja | Zawartość |
|--------|-----------|
| Producent | Nazwa, adres, e-mail, telefon, strona www |
| Importer | Nazwa, adres, e-mail (jeśli dotyczy) |
| Osoba odpowiedzialna w UE | Nazwa, adres, dane kontaktowe |
| Identyfikatory | LOT, numer seryjny, EAN, model |
| Ostrzeżenia | Tekst ostrzeżeń |
| Instrukcje | Tekst instrukcji bezpieczeństwa |

## Masowe uzupełnianie danych

Jeśli wiele produktów ma tego samego producenta, najszybsza metoda to:

1. Wyeksportuj produkty do CSV
2. Wypełnij kolumny producenta dla wszystkich wierszy (kopiuj-wklej w arkuszu kalkulacyjnym)
3. Zaimportuj zaktualizowany plik CSV

## Rozwiązywanie problemów

**Pola GPSR nie pojawiają się w edycji produktu**
Upewnij się, że moduł GPSR jest włączony w ustawieniach wtyczki: **WooCommerce > Ustawienia > Polski > Moduły**.

**Kolumna statusu nie wyświetla się na liście produktów**
Kliknij przycisk "Opcje ekranu" w prawym górnym rogu strony z listą produktów i zaznacz kolumnę GPSR.

**Dane nie importują się z CSV**
Sprawdź, czy nagłówki kolumn w pliku CSV dokładnie odpowiadają formatowi eksportu. Nazwy kolumn są wrażliwe na wielkość liter.

## Dalsze kroki

- Zgłaszaj problemy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Dyskusje i pytania: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
