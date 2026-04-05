---
title: Ochrona przed greenwashingiem
description: Pola produktowe anti-greenwashing w Polski for WooCommerce - podstawa deklaracji środowiskowej, certyfikat i data ważności zgodnie z Dyrektywą 2024/825.
---

Dyrektywa UE 2024/825 (Empowering Consumers Directive) zakazuje nieuzasadnionych deklaracji środowiskowych w handlu elektronicznym. Od 27 września 2026 roku sprzedawcy nie mogą używać ogólnych twierdzeń ekologicznych (np. "eko", "zielony", "przyjazny środowisku") bez konkretnego uzasadnienia i certyfikacji. Polski for WooCommerce dostarcza pola produktowe pozwalające dokumentować i wyświetlać podstawy deklaracji środowiskowych.

## Czym jest greenwashing

Greenwashing to praktyka polegająca na wprowadzaniu konsumentów w błąd co do właściwości środowiskowych produktu lub działalności firmy. Przykłady zakazanych praktyk:

- Używanie ogólnikowych deklaracji ("eko", "bio", "zielony") bez certyfikacji
- Twierdzenia o neutralności klimatycznej oparte wyłącznie na kompensacji emisji
- Sugerowanie korzyści środowiskowych bez dowodów naukowych
- Wyświetlanie nieoficjalnych znaków ekologicznych
- Twierdzenia o trwałości produktu bez uzasadnienia

## Pola produktowe

W edycji produktu WooCommerce, w zakładce **Polski - Środowisko**, dostępne są trzy pola pozwalające udokumentować deklaracje środowiskowe.

### Podstawa deklaracji

Pole tekstowe na opis podstawy naukowej lub technicznej deklaracji środowiskowej.

**Co wpisać:**

- Konkretny aspekt środowiskowy, którego dotyczy deklaracja (np. "Produkt wykonany w 80% z materiałów z recyklingu")
- Metodologia badania lub analizy (np. "Analiza cyklu życia produktu (LCA) zgodna z ISO 14040")
- Wyniki pomiarów lub badań (np. "Ślad węglowy 2,3 kg CO2e na jednostkę - raport firmy XYZ z dnia 2025-01-15")
- Porównanie z produktem referencyjnym (jeśli deklaracja jest porównawcza)

**Przykład prawidłowego wpisu:**

```
Deklaracja: "Opakowanie w 100% z materiałów z recyklingu"
Podstawa: Surowiec pochodzi w całości z recyklingu PET post-konsumenckiego.
Dostawca surowca: RecyPET Sp. z o.o., certyfikat EuCertPlast nr 2025/0123.
Proces produkcji potwierdzony audytem wewnętrznym z dnia 2025-03-01.
```

### Certyfikat

Pole na informacje o oficjalnym certyfikacie potwierdzającym deklarację środowiskową.

**Akceptowane certyfikaty:**

- Certyfikaty zgodne z Rozporządzeniem (WE) nr 66/2010 (EU Ecolabel)
- Certyfikaty krajowe uznane przez Komisję Europejską
- Certyfikaty branżowe wydane przez akredytowane jednostki certyfikujące
- Certyfikaty FSC, PEFC (dla produktów drewnianych/papierniczych)
- Certyfikaty GOTS, OEKO-TEX (dla tekstyliów)
- Certyfikaty EuCertPlast, RecyClass (dla tworzyw sztucznych)

**Co wpisać:**

- Nazwa certyfikatu
- Numer certyfikatu
- Jednostka certyfikująca
- Link do weryfikacji (jeśli dostępny)

**Przykład:**

```
EU Ecolabel - numer licencji PL/032/005
Jednostka certyfikująca: PCBC S.A.
Weryfikacja: https://environment.ec.europa.eu/ecolabel_en
```

### Data ważności

Pole daty określające, do kiedy certyfikat lub deklaracja środowiskowa zachowuje ważność.

Po upływie daty ważności:

- Deklaracja środowiskowa jest automatycznie ukrywana na stronie produktu
- Administrator otrzymuje powiadomienie e-mail o wygasłym certyfikacie
- Produkt jest oznaczany na liście produktów ikoną ostrzegawczą

To zabezpieczenie chroni przed sytuacją, gdy wygasły certyfikat nadal jest wyświetlany klientom.

## Wyświetlanie na stronie produktu

Gdy pola środowiskowe są wypełnione, wtyczka wyświetla sekcję "Informacja środowiskowa" na stronie produktu. Sekcja zawiera:

- Treść deklaracji środowiskowej
- Nazwę i numer certyfikatu
- Datę ważności certyfikatu
- Ikonę certyfikatu (jeśli jest rozpoznany - np. EU Ecolabel)

Sekcja jest wyświetlana w zakładce "Dodatkowe informacje" na stronie produktu lub jako osobna zakładka (konfigurowalne w ustawieniach).

## Konfiguracja

Ustawienia modułu: **WooCommerce > Ustawienia > Polski > Środowisko**.

| Opcja | Opis | Domyślna wartość |
|-------|------|------------------|
| Włącz moduł | Aktywuje pola środowiskowe | Nie |
| Pozycja wyświetlania | Gdzie wyświetlać informację na stronie produktu | Zakładka "Dodatkowe informacje" |
| Powiadomienie o wygaśnięciu | Ile dni przed wygaśnięciem wysłać powiadomienie | 30 |
| Automatyczne ukrywanie | Ukryj deklarację po wygaśnięciu certyfikatu | Tak |

## Masowe zarządzanie

### Eksport CSV

Dane środowiskowe są uwzględnione w eksporcie produktów WooCommerce. Dodatkowe kolumny:

- `env_claim_basis` - podstawa deklaracji
- `env_certificate` - certyfikat
- `env_expiry_date` - data ważności (format YYYY-MM-DD)

### Import CSV

Przygotuj plik CSV z odpowiednimi nagłówkami i importuj standardową ścieżką WooCommerce.

### Filtrowanie produktów

Na liście produktów w panelu administracyjnym możesz filtrować produkty według statusu deklaracji środowiskowej:

- Wszystkie produkty z deklaracją
- Produkty z wygasłym certyfikatem
- Produkty z certyfikatem wygasającym w ciągu 30 dni
- Produkty bez certyfikatu (ale z deklaracją)

## Dobre praktyki

1. **Bądź konkretny** - zamiast "eko opakowanie" napisz "opakowanie wykonane w 100% z kartonu z recyklingu, certyfikat FSC nr XXXX"
2. **Podawaj źródła** - odwołuj się do konkretnych badań, raportów, certyfikatów
3. **Aktualizuj dane** - ustaw powiadomienia o wygasaniu certyfikatów i odnawiaj je na czas
4. **Unikaj ogólników** - dyrektywa zakazuje twierdzeń, których nie można zweryfikować
5. **Porównania muszą być uczciwe** - porównuj te same kategorie produktów, używaj tej samej metodologii

## Rozwiązywanie problemów

**Pola środowiskowe nie wyświetlają się w edycji produktu**
Włącz moduł w **WooCommerce > Ustawienia > Polski > Moduły** i upewnij się, że opcja "Włącz moduł" jest zaznaczona w ustawieniach środowiskowych.

**Deklaracja zniknęła ze strony produktu**
Sprawdź datę ważności certyfikatu. Jeśli certyfikat wygasł, deklaracja jest automatycznie ukrywana. Odnów certyfikat i zaktualizuj datę ważności.

**Nie otrzymuję powiadomień o wygasających certyfikatach**
Sprawdź, czy WP-Cron działa prawidłowo. Powiadomienia są wysyłane przez zaplanowane zadanie cron. Na serwerach z wyłączonym WP-Cron skonfiguruj systemowy cron.

## Dalsze kroki

- Zgłaszaj problemy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Dyskusje i pytania: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
