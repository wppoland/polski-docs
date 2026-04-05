---
title: Audyt sklepu
description: Narzędzie audytu sklepu w Polski for WooCommerce - weryfikacja stron prawnych, dark patterns, DPA, DSA, KSeF, greenwashing i bezpieczeństwa.
---

Audyt automatycznie skanuje sklep pod kątem polskiego i unijnego prawa e-commerce. W odróżnieniu od panelu zgodności, audyt analizuje treść stron, interfejs i konfigurację techniczną.

## Uruchomienie audytu

Przejdź do **WooCommerce > Polski > Narzędzia > Audyt sklepu** i kliknij **Uruchom audyt**. Czas trwania zależy od liczby produktów i stron.

Audyt można też uruchomić z WP-CLI:

```bash
wp polski smoke-test --module=audit --verbose
```

## Zakres audytu

### Strony prawne

Audyt sprawdza treść stron prawnych:

**Regulamin sklepu:**
- Obecność wymaganych sekcji (dane firmy, procedura zamówienia, płatności, dostawa, odstąpienie, reklamacja)
- Dane kontaktowe sprzedawcy (nazwa, adres, NIP, e-mail, telefon)
- Informacja o pozasądowym rozwiązywaniu sporów
- Informacja o platformie ODR (Online Dispute Resolution)
- Aktualność danych (porównanie NIP z rejestrem)

**Polityka prywatności:**
- Dane administratora danych osobowych
- Cele przetwarzania danych
- Podstawy prawne przetwarzania
- Informacja o prawach podmiotu danych (dostęp, sprostowanie, usunięcie)
- Informacja o plikach cookies
- Dane kontaktowe IOD (jeśli wymagany)

**Informacja o odstąpieniu:**
- Wzór formularza odstąpienia od umowy
- Termin odstąpienia (14 dni)
- Instrukcja procedury
- Informacja o kosztach zwrotu

**Informacja o dostawie:**
- Dostępne metody dostawy
- Koszty dostawy
- Szacowane czasy dostawy
- Informacja o dostawie do krajów UE

### Dark patterns

Audyt wykrywa manipulacyjne wzorce (dark patterns) wg dyrektywy DSA i polskiego prawa:

| Wzorzec                    | Opis                                           | Poziom  |
| -------------------------- | ---------------------------------------------- | ------- |
| Preselected checkboxes     | Zaznaczone domyślnie checkboxy zgód             | FAIL    |
| Hidden costs               | Koszty pojawiające się dopiero na kasie          | FAIL    |
| Countdown timers           | Fałszywe liczniki odliczające                    | WARN    |
| Fake scarcity              | Sztuczne komunikaty o niskim stanie             | WARN    |
| Forced account creation    | Wymuszanie rejestracji przed zakupem            | WARN    |
| Difficult unsubscribe      | Utrudniony proces rezygnacji z newslettera      | FAIL    |
| Confusing button placement | Mylące rozmieszczenie przycisków akceptacji/odrzucenia | WARN |
| Nagging popups             | Powtarzające się, trudne do zamknięcia popupy   | WARN    |

Audyt sprawdza:
- Formularz kasy - domyślne stany checkboxów
- Popup cookie - czy przycisk odmowy jest równie widoczny jak akceptacja
- Formularz rejestracji - wymagane vs opcjonalne pola
- Koszyk - czy cena finalna widoczna jest od początku
- Newsletter - czy rezygnacja jest łatwa

### DPA (Data Processing Agreement)

Audyt sprawdza umowy powierzenia przetwarzania danych:

- Czy sklep korzysta z usług zewnętrznych przetwarzających dane (analytics, e-mail marketing, bramki płatności)
- Czy do wykrytych usług istnieją odpowiednie umowy DPA
- Lista wykrytych usług: Google Analytics, Facebook Pixel, Mailchimp, GetResponse, PayU, Przelewy24, Stripe

Audyt skanuje kod strony (JavaScript, piksele śledzące) i rozpoznaje usługi zewnętrzne.

### DSA (Digital Services Act)

Sprawdzane wymagania DSA:

- Formularz zgłoszenia nielegalnych treści - dostępność i poprawność pól
- Punkt kontaktowy - czy e-mail kontaktowy jest opublikowany
- Informacja o moderacji treści - polityka moderowania opinii
- Warunki korzystania z usługi - dostępność i kompletność
- Rejestr zgłoszeń - czy system rejestruje i archiwizuje zgłoszenia

### KSeF (Krajowy System e-Faktur)

Sprawdzana jest gotowość do KSeF:

- NIP firmy - poprawność formatu i weryfikacja w rejestrze
- Połączenie z API KSeF - test connectivity
- Dane na fakturach - kompletność wymaganych pól
- Pole NIP na kasie - dostępność dla klientów firmowych
- Automatyczne generowanie faktur - konfiguracja modułu

### Greenwashing

Audyt sprawdza oświadczenia środowiskowe na produktach:

- **Oświadczenia bez dowodów** - teksty typu "ekologiczny", "zielony", "naturalny" bez certyfikatu lub uzasadnienia
- **Ogólne twierdzenia** - zbyt ogólne stwierdzenia bez szczegółów (np. "przyjazny dla środowiska")
- **Brakujące certyfikaty** - powołanie się na certyfikat bez numeru lub linku
- **Niespójne dane** - oświadczenie o recyklingowalności bez informacji o materiale
- **Offsetowanie** - twierdzenia o neutralności klimatycznej oparte wyłącznie na kompensacji

Skanowane są nazwy produktów, opisy, opis krótki i meta dane modułu greenwashing.

### Bezpieczeństwo

Sprawdzane aspekty bezpieczeństwa:

| Sprawdzenie                      | Opis                                  |
| -------------------------------- | ------------------------------------- |
| SSL/HTTPS                        | Czy cały sklep działa przez HTTPS     |
| Wersja WordPress                 | Czy jest aktualna                     |
| Wersja WooCommerce               | Czy jest aktualna                     |
| Wersja PHP                       | Czy nie jest wycofana (EOL)           |
| Debug mode                       | Czy `WP_DEBUG_DISPLAY` jest wyłączony na produkcji |
| Domyślne konto admin             | Czy nie istnieje użytkownik "admin"   |
| XML-RPC                          | Czy jest wyłączony (zalecane)         |
| Rest API exposure                | Czy endpointy użytkowników nie są publiczne |
| File editing                     | Czy edycja plików z panelu jest wyłączona |

## Raport z audytu

Po zakończeniu audytu wyświetla się raport:

### Podsumowanie

- **Ogólna ocena** - od A (doskonała) do F (krytyczne problemy)
- **Wymagania krytyczne** - liczba FAIL
- **Ostrzeżenia** - liczba WARN
- **Spełnione** - liczba OK
- **Data audytu** - timestamp

### Szczegóły

Każdy znaleziony problem zawiera:

- **Kategoria** - do której sekcji audytu należy
- **Priorytet** - FAIL (krytyczny), WARN (ostrzeżenie), INFO (informacja)
- **Opis** - co zostało znalezione
- **Lokalizacja** - gdzie problem występuje (URL, strona, produkt)
- **Zalecane działanie** - co zrobić, aby naprawić
- **Podstawa prawna** - odniesienie do przepisu

### Eksport raportu

Eksportuj raport w formatach:

- **PDF** - raport do wydruku lub udostępnienia prawnikowi
- **CSV** - dane tabelaryczne do arkusza kalkulacyjnego
- **JSON** - dane maszynowo czytelne

```php
// Hook po zakończeniu audytu
add_action('polski/audit/completed', function (array $results): void {
    if ($results['grade'] === 'F') {
        wp_mail(
            get_option('admin_email'),
            'Audyt sklepu - ocena krytyczna',
            'Audyt wykazał krytyczne problemy. Sprawdź panel zgodności.'
        );
    }
});
```

## Harmonogram audytów

Audyt można uruchamiać automatycznie:

- **Co tydzień** - zalecane dla aktywnych sklepów
- **Co miesiąc** - minimum dla każdego sklepu
- **Ręcznie** - na żądanie

Konfiguracja: **WooCommerce > Polski > Narzędzia > Audyt sklepu > Harmonogram**.

Wyniki zapisują się w historii i trafiają e-mailem do administratora.

## Rozwiązywanie problemów

**Audyt trwa zbyt długo** - przy 10 000+ produktów audyt greenwashingu może trwać dłużej. Użyj WP-CLI z `--module` dla wybranych sekcji.

**Audyt nie wykrywa usługi zewnętrznej** - lista wykrywanych usług jest ograniczona. Zgłoś brakującą na GitHub.

**Fałszywy alarm dark patterns** - niektóre motywy mogą generować fałszywe alarmy. Zgłoś problem i tymczasowo wyłącz konkretne sprawdzenie.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
