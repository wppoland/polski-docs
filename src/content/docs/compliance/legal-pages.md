---
title: Strony prawne
description: Automatyczne generowanie stron prawnych w Polski for WooCommerce - regulamin, polityka prywatności, polityka zwrotów, reklamacje, załączniki do e-maili i informacja ODR.
---

Każdy sklep internetowy w Polsce musi udostępniać klientom zestaw dokumentów prawnych. Polski for WooCommerce automatycznie generuje cztery kluczowe strony prawne dostosowane do polskiego prawa, umożliwia ich dołączanie do e-maili transakcyjnych i wyświetla wymaganą informację o platformie ODR.

## Generowane strony prawne

### 1. Regulamin sklepu

Generowany regulamin zawiera wymagane przez ustawę o prawach konsumenta elementy:

- Dane identyfikacyjne sprzedawcy (nazwa, adres, NIP, REGON, KRS)
- Procedura składania zamówienia
- Sposoby płatności
- Koszty i sposoby dostawy
- Prawo do odstąpienia od umowy (14 dni)
- Procedura reklamacji
- Pozasądowe sposoby rozpatrywania reklamacji i dochodzenia roszczeń
- Postanowienia końcowe

### 2. Polityka prywatności

Generowana polityka prywatności zgodna z RODO zawiera:

- Dane administratora danych osobowych
- Cele i podstawy prawne przetwarzania danych
- Kategorie przetwarzanych danych
- Odbiorcy danych (kurierzy, bramki płatności, hosting)
- Okres przechowywania danych
- Prawa osób, których dane dotyczą
- Informacja o plikach cookies
- Informacja o profilowaniu (jeśli dotyczy)

### 3. Polityka zwrotów

Generowana polityka zwrotów obejmuje:

- Termin na odstąpienie od umowy (14 dni)
- Wzór formularza odstąpienia
- Procedura zwrotu towaru
- Koszty zwrotu (kto ponosi)
- Termin zwrotu płatności
- Wyjątki od prawa do odstąpienia
- Stan zwracanego towaru

### 4. Polityka reklamacji

Generowana polityka reklamacji zawiera:

- Podstawa prawna (rękojmia, gwarancja)
- Sposoby złożenia reklamacji
- Termin rozpatrzenia reklamacji (14 dni)
- Uprawnienia konsumenta (naprawa, wymiana, obniżenie ceny, odstąpienie)
- Formularz reklamacji
- Dane kontaktowe do składania reklamacji

## Konfiguracja generatora

Przejdź do **WooCommerce > Ustawienia > Polski > Strony prawne** aby wygenerować lub zaktualizować strony.

### Dane sprzedawcy

Przed generowaniem stron wypełnij dane firmy:

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

Strony są tworzone jako szkice, ponieważ przed publikacją zalecane jest skonsultowanie ich treści z prawnikiem.

### Aktualizacja stron

Gdy zmienisz dane firmy, kliknij "Aktualizuj strony prawne". System zaktualizuje wygenerowane sekcje, zachowując Twoje ręczne modyfikacje w oznaczonych blokach.

Struktura generowanej strony:

```
<!-- POLSKI-AUTO-START -->
Automatycznie wygenerowana treść - nie edytuj tego bloku
<!-- POLSKI-AUTO-END -->

Twoja dodatkowa treść - bezpiecznie edytuj poniżej
```

Przy aktualizacji system nadpisuje tylko treść między znacznikami `POLSKI-AUTO-START` i `POLSKI-AUTO-END`. Treść dodana poza tymi znacznikami jest zachowywana.

## Załączniki do e-maili

Wtyczka umożliwia dołączanie stron prawnych jako załączników PDF do e-maili transakcyjnych WooCommerce.

### Konfiguracja

W **WooCommerce > Ustawienia > Polski > Strony prawne > Załączniki e-mail** skonfiguruj, które dokumenty dołączać do poszczególnych typów e-maili:

| E-mail | Zalecane załączniki |
|--------|---------------------|
| Nowe zamówienie (klient) | Regulamin, Polityka prywatności, Polityka zwrotów |
| Zamówienie zrealizowane | Polityka zwrotów |
| Faktura | Regulamin |
| Nota zwrotowa | Polityka zwrotów, Polityka reklamacji |

### Format załączników

Dokumenty są automatycznie konwertowane do formatu PDF z nagłówkiem zawierającym logo sklepu i datę wygenerowania. Rozmiar pliku jest optymalizowany, aby nie obciążać serwera pocztowego.

| Opcja | Opis | Domyślna wartość |
|-------|------|------------------|
| Format | Typ załącznika | PDF |
| Logo w nagłówku | Czy dołączyć logo sklepu | Tak |
| Rozmiar papieru | - | A4 |
| Margines | Margines dokumentu | 20mm |

## Informacja ODR

Rozporządzenie UE 524/2013 wymaga od sprzedawców internetowych zamieszczenia linku do platformy ODR (Online Dispute Resolution) - platformy pozasądowego rozwiązywania sporów.

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

Wtyczka automatycznie rejestruje wersje stron prawnych:

- Każda zmiana treści tworzy nową wersję
- Data ostatniej aktualizacji jest wyświetlana na stronie
- Logi zgód RODO zawierają hash wersji dokumentu, która obowiązywała w momencie udzielenia zgody
- Historia wersji dostępna jest w **Rewizjach** strony WordPress

## Wielojęzyczność

Generowane strony są domyślnie w języku polskim. Jeśli używasz WPML lub Polylang, wtyczka generuje osobne strony dla każdego aktywnego języka. Tłumaczenia są dostarczane dla:

- Polski (domyślny)
- Angielski
- Niemiecki

Dla pozostałych języków generowana jest wersja polska z możliwością ręcznego tłumaczenia.

## Rozwiązywanie problemów

**Strony nie generują się**
Sprawdź, czy wszystkie wymagane pola danych sprzedawcy są wypełnione. Pola nazwa firmy, adres, NIP i e-mail są obowiązkowe.

**Załączniki PDF nie są dołączane do e-maili**
Sprawdź, czy na serwerze jest zainstalowana biblioteka do generowania PDF. Wtyczka wymaga rozszerzenia PHP `mbstring` i `dom`. Sprawdź logi PHP pod kątem błędów.

**Informacja ODR nie wyświetla się w stopce**
Sprawdź, czy motyw obsługuje hooki stopki WooCommerce (`wp_footer` lub `woocommerce_after_footer`). Niektóre motywy wymagają ręcznego dodania widgetu.

**Aktualizacja nadpisała moje zmiany**
Edytuj treść tylko poza znacznikami `POLSKI-AUTO-START` / `POLSKI-AUTO-END`. Treść między tymi znacznikami jest nadpisywana przy każdej aktualizacji.

## Dalsze kroki

- Zgłaszaj problemy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Dyskusje i pytania: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
