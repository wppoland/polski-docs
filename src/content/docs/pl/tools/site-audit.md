---
title: Audyt sklepu
description: Narzędzie audytu sklepu w Polski for WooCommerce - weryfikacja stron prawnych, dark patterns, DPA, DSA, KSeF, greenwashing i bezpieczeństwa.
---

Audyt sklepu to narzędzie automatycznie skanujące sklep WooCommerce pod kątem zgodności z polskim i unijnym prawem e-commerce. W odróżnieniu od panelu zgodności (checklist), audyt wykonuje głęboką analizę treści stron, interfejsu użytkownika oraz konfiguracji technicznej.

## Uruchomienie audytu

Przejdź do **WooCommerce > Polski > Narzędzia > Audyt sklepu** i kliknij **Uruchom audyt**. Audyt trwa od kilku sekund do kilku minut, w zależności od liczby produktów i stron.

Audyt można też uruchomić z WP-CLI:

```bash
wp polski smoke-test --module=audit --verbose
```

## Zakres audytu

### Strony prawne

Audyt analizuje treść stron prawnych pod kątem:

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

Audyt wykrywa wzorce projektowe uznawane za manipulacyjne (dark patterns) zgodnie z dyrektywą DSA i polskim prawem:

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

Audyt weryfikuje umowy powierzenia przetwarzania danych:

- Czy sklep korzysta z usług zewnętrznych przetwarzających dane (analytics, e-mail marketing, bramki płatności)
- Czy do wykrytych usług istnieją odpowiednie umowy DPA
- Lista wykrytych usług: Google Analytics, Facebook Pixel, Mailchimp, GetResponse, PayU, Przelewy24, Stripe

Audyt skanuje kod strony (JavaScript, piksele śledzące) i identyfikuje usługi zewnętrzne.

### DSA (Digital Services Act)

Audyt sprawdza wymagania DSA:

- Formularz zgłoszenia nielegalnych treści - dostępność i poprawność pól
- Punkt kontaktowy - czy e-mail kontaktowy jest opublikowany
- Informacja o moderacji treści - polityka moderowania opinii
- Warunki korzystania z usługi - dostępność i kompletność
- Rejestr zgłoszeń - czy system rejestruje i archiwizuje zgłoszenia

### KSeF (Krajowy System e-Faktur)

Audyt weryfikuje gotowość do integracji z KSeF:

- NIP firmy - poprawność formatu i weryfikacja w rejestrze
- Połączenie z API KSeF - test connectivity
- Dane na fakturach - kompletność wymaganych pól
- Pole NIP na kasie - dostępność dla klientów firmowych
- Automatyczne generowanie faktur - konfiguracja modułu

### Greenwashing

Audyt analizuje oświadczenia środowiskowe na produktach:

- **Oświadczenia bez dowodów** - teksty typu "ekologiczny", "zielony", "naturalny" bez certyfikatu lub uzasadnienia
- **Ogólne twierdzenia** - zbyt ogólne stwierdzenia bez szczegółów (np. "przyjazny dla środowiska")
- **Brakujące certyfikaty** - powołanie się na certyfikat bez numeru lub linku
- **Niespójne dane** - oświadczenie o recyklingowalności bez informacji o materiale
- **Offsetowanie** - twierdzenia o neutralności klimatycznej oparte wyłącznie na kompensacji

Audyt skanuje nazwy produktów, opisy, opis krótki oraz meta dane modułu greenwashing.

### Bezpieczeństwo

Audyt sprawdza podstawowe aspekty bezpieczeństwa:

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

Po zakończeniu audytu wyświetlany jest raport z wynikami:

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

Raport można wyeksportować w formatach:

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

Audyt może być uruchamiany automatycznie w ustalonych odstępach:

- **Co tydzień** - zalecane dla aktywnych sklepów
- **Co miesiąc** - minimum dla każdego sklepu
- **Ręcznie** - na żądanie

Konfiguracja: **WooCommerce > Polski > Narzędzia > Audyt sklepu > Harmonogram**.

Wyniki automatycznych audytów zapisywane są w historii i wysyłane e-mailem do administratora.

## Rozwiązywanie problemów

**Audyt trwa zbyt długo** - w sklepach z dużą liczbą produktów (10 000+) audyt greenwashingu może trwać dłużej. Użyj WP-CLI z opcją `--module` do uruchomienia audytu wybranych sekcji.

**Audyt nie wykrywa usługi zewnętrznej** - lista wykrywanych usług jest ograniczona. Zgłoś brakującą usługę na GitHub.

**Fałszywy alarm dark patterns** - niektóre motywy mogą generować fałszywe alarmy (np. timer odliczający do końca dnia roboczego, nie do "wygaśnięcia oferty"). Zgłoś fałszywy alarm, a w międzyczasie możesz wyłączyć konkretne sprawdzenie.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
