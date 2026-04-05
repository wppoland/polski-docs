---
title: Strony prawne
description: Automatyczne generowanie stron prawnych w Polski for WooCommerce - regulamin, polityka prywatności, polityka zwrotów, reklamacje, załączniki do e-maili i informacja ODR.
---

Każdy sklep internetowy w Polsce musi mieć dokumenty prawne. Wtyczka generuje cztery strony prawne, dołącza je do e-maili i wyświetla informację o platformie ODR.

## Generowane strony prawne

### 1. Regulamin sklepu

Regulamin zawiera elementy wymagane przez ustawę o prawach konsumenta:

- Dane identyfikacyjne sprzedawcy (nazwa, adres, NIP, REGON, KRS)
- Procedura składania zamówienia
- Sposoby płatności
- Koszty i sposoby dostawy
- Prawo do odstąpienia od umowy (14 dni)
- Procedura reklamacji
- Pozasądowe sposoby rozpatrywania reklamacji i dochodzenia roszczeń
- Postanowienia końcowe

### 2. Polityka prywatności

Polityka prywatności zgodna z RODO zawiera:

- Dane administratora danych osobowych
- Cele i podstawy prawne przetwarzania danych
- Kategorie przetwarzanych danych
- Odbiorcy danych (kurierzy, bramki płatności, hosting)
- Okres przechowywania danych
- Prawa osób, których dane dotyczą
- Informacja o plikach cookies
- Informacja o profilowaniu (jeśli dotyczy)

### 3. Polityka zwrotów

Polityka zwrotów obejmuje:

- Termin na odstąpienie od umowy (14 dni)
- Wzór formularza odstąpienia
- Procedura zwrotu towaru
- Koszty zwrotu (kto ponosi)
- Termin zwrotu płatności
- Wyjątki od prawa do odstąpienia
- Stan zwracanego towaru

### 4. Polityka reklamacji

Polityka reklamacji zawiera:

- Podstawa prawna (rękojmia, gwarancja)
- Sposoby złożenia reklamacji
- Termin rozpatrzenia reklamacji (14 dni)
- Uprawnienia konsumenta (naprawa, wymiana, obniżenie ceny, odstąpienie)
- Formularz reklamacji
- Dane kontaktowe do składania reklamacji

## Konfiguracja generatora

Przejdź do **WooCommerce > Ustawienia > Polski > Strony prawne** aby wygenerować lub zaktualizować strony.

### Dane sprzedawcy

Najpierw wypełnij dane firmy:

| Pole | Opis | Przykład |
|------|------|---------|
| Nazwa firmy | Pełna nazwa lub firma | Sklep XYZ Jan Kowalski |
| Adres | Ulica, numer | ul. Przykładowa 1/2 |
| Kod pocztowy i miasto | - | 00-001 Warszawa |
| NIP | Numer identyfikacji podatkowej | 1234567890 |
| REGON | - | 123456789 |
| KRS | Jeśli dotyczy | 0000123456 |
| E-mail kontaktowy | - | kontakt@sklep.pl |
| Telefon | - | +48 123 456 789 |
| Numer rachunku bankowego | Do zwrotów | PL 12 3456 7890 1234 5678 9012 3456 |

### Generowanie stron

1. Wypełnij dane sprzedawcy
2. Kliknij "Generuj strony prawne"
3. System tworzy 4 strony WordPress w statusie "Szkic"
4. Przejrzyj treść każdej strony
5. Opublikuj strony po weryfikacji

Strony są tworzone jako szkice - przejrzyj je i skonsultuj z prawnikiem przed publikacją.

### Aktualizacja stron

Po zmianie danych firmy kliknij "Aktualizuj strony prawne". Wtyczka zaktualizuje wygenerowane sekcje, zachowując Twoje ręczne zmiany.

Struktura generowanej strony:

```
<!-- POLSKI-AUTO-START -->
Automatycznie wygenerowana treść - nie edytuj tego bloku
<!-- POLSKI-AUTO-END -->

Twoja dodatkowa treść - bezpiecznie edytuj poniżej
```

Przy aktualizacji wtyczka nadpisuje tylko treść między `POLSKI-AUTO-START` i `POLSKI-AUTO-END`. Treść poza tymi znacznikami jest zachowywana.

## Załączniki do e-maili

Wtyczka dołącza strony prawne jako PDF do e-maili transakcyjnych WooCommerce.

### Konfiguracja

W **WooCommerce > Ustawienia > Polski > Strony prawne > Załączniki e-mail** skonfiguruj, które dokumenty dołączać do poszczególnych typów e-maili:

| E-mail | Zalecane załączniki |
|--------|---------------------|
| Nowe zamówienie (klient) | Regulamin, Polityka prywatności, Polityka zwrotów |
| Zamówienie zrealizowane | Polityka zwrotów |
| Faktura | Regulamin |
| Nota zwrotowa | Polityka zwrotów, Polityka reklamacji |

### Format załączników

Dokumenty są konwertowane do PDF z logo sklepu i datą. Rozmiar pliku jest zoptymalizowany.

| Opcja | Opis | Domyślna wartość |
|-------|------|------------------|
| Format | Typ załącznika | PDF |
| Logo w nagłówku | Czy dołączyć logo sklepu | Tak |
| Rozmiar papieru | - | A4 |
| Margines | Margines dokumentu | 20mm |

## Informacja ODR

Rozporządzenie UE 524/2013 wymaga od sklepów internetowych linku do platformy ODR (Online Dispute Resolution) do pozasądowego rozwiązywania sporów.

### Automatyczne wyświetlanie

Wtyczka automatycznie dodaje informację ODR w:

- **Stopce sklepu** - link do platformy ODR
- **Regulaminie** - sekcja o pozasądowym rozwiązywaniu sporów
- **E-mailach transakcyjnych** - stopka z linkiem ODR

### Treść informacji ODR

Standardowa treść wyświetlana przez wtyczkę:

> Platforma ODR (Online Dispute Resolution) dostępna jest pod adresem: https://ec.europa.eu/consumers/odr/. Platforma służy rozstrzyganiu sporów pomiędzy konsumentami i przedsiębiorcami na szczeblu unijnym.

### Konfiguracja ODR

| Opcja | Opis | Domyślna wartość |
|-------|------|------------------|
| Wyświetlaj w stopce | Dodaj informację ODR do stopki sklepu | Tak |
| Wyświetlaj w e-mailach | Dodaj informację ODR do e-maili transakcyjnych | Tak |
| Tekst ODR | Konfigurowalny tekst informacji | Treść domyślna |
| Pozycja w stopce | Miejsce wyświetlania | Przed informacją o prawach autorskich |

## Wersjonowanie dokumentów

Wtyczka rejestruje wersje stron prawnych:

- Każda zmiana treści tworzy nową wersję
- Data ostatniej aktualizacji jest wyświetlana na stronie
- Logi zgód RODO zawierają hash wersji dokumentu z momentu udzielenia zgody
- Historia wersji dostępna jest w **Rewizjach** strony WordPress

## Wielojęzyczność

Strony generowane są po polsku. Przy WPML lub Polylang wtyczka tworzy osobne strony dla każdego języka. Gotowe tłumaczenia:

- Polski (domyślny)
- Angielski
- Niemiecki

Dla innych języków tworzona jest wersja polska do ręcznego przetłumaczenia.

## Rozwiązywanie problemów

**Strony nie generują się**
Sprawdź, czy wypełniłeś wszystkie wymagane pola: nazwa firmy, adres, NIP i e-mail.

**Załączniki PDF nie są dołączane do e-maili**
Sprawdź, czy serwer ma rozszerzenia PHP `mbstring` i `dom`. Sprawdź logi PHP pod kątem błędów.

**Informacja ODR nie wyświetla się w stopce**
Sprawdź, czy motyw obsługuje hooki stopki (`wp_footer` lub `woocommerce_after_footer`). Niektóre motywy wymagają dodania widgetu ręcznie.

**Aktualizacja nadpisała moje zmiany**
Edytuj treść tylko poza znacznikami `POLSKI-AUTO-START` / `POLSKI-AUTO-END`. Treść między tymi znacznikami jest nadpisywana przy każdej aktualizacji.

## Dalsze kroki

- Zgłaszaj problemy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Dyskusje i pytania: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
