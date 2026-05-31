---
title: Monitor kondycji sklepu
description: Ciągły, pasywny monitoring błędów krytycznych, nieudanych płatności i anomalii sprzedaży w Polski for WooCommerce, z alertami e-mail i webhook.
---

Monitor kondycji sklepu to opcjonalny moduł, który w tle obserwuje sygnały operacyjne sklepu i ostrzega, gdy coś przestaje działać. W odróżnieniu od audytu sklepu (kontrole zgodności na żądanie) i rejestru incydentów (ręczny dziennik), ten moduł działa według harmonogramu i sam ocenia trzy sygnały: błędy krytyczne na froncie, odsetek nieudanych płatności oraz anomalię sprzedaży ("ruch jest, ale nie ma zamówień").

Detekcja jest pasywna: moduł obserwuje rzeczywiste zdarzenia WooCommerce i historię zamówień. Nigdy nie składa zamówień testowych, więc nie tworzy fałszywych zamówień ani nie obciąża kart. W zamian problem z płatnością jest wykrywany dopiero, gdy napotka go prawdziwy klient.

## Włączenie modułu

Moduł jest **domyślnie wyłączony**. Włącz go w **WooCommerce > Polski > Moduły** (sekcja "Kondycja sklepu"). Po włączeniu sprawdzenia uruchamiają się co 5 minut przez WP-Cron. Pulpit znajdziesz w **WooCommerce > Polski > Raporty i narzędzia > Kondycja sklepu**. Wymaga uprawnienia `manage_woocommerce`.

## Czujniki

| Czujnik                  | Co obserwuje                                                                 |
| ------------------------ | --------------------------------------------------------------------------- |
| Błędy krytyczne (front)  | Fatalne błędy PHP na stronach sklepu (handler `shutdown`). Błędy w panelu i cronie są pomijane. Aktywne przez 15 minut od wystąpienia. |
| Kasa / płatności         | Odsetek nieudanych finalizacji w ostatnich 2 godzinach. Obserwuje klasyczną kasę, kasę blokową (Store API) oraz status zamówienia "nieudane". |
| Anomalia sprzedaży       | Porównuje liczbę zamówień z ostatniej pełnej godziny z typową liczbą dla tego samego dnia tygodnia i godziny z ostatnich 8 tygodni. Oceniane najwyżej raz na godzinę. |

### Statusy

| Status     | Znaczenie                                              | Kolor        |
| ---------- | ------------------------------------------------------ | ------------ |
| OK         | Wszystko działa w normie                               | zielony      |
| Degradacja | Wartości przekroczyły próg, ale to nie pełna awaria    | pomarańczowy |
| Awaria     | Poważny problem (np. błąd krytyczny lub brak sprzedaży)| czerwony     |

Status ogólny to najgorszy status spośród czujników.

### Jak liczone są progi

- **Kasa / płatności:** alert pojawia się, gdy odsetek nieudanych finalizacji osiągnie próg (domyślnie 30%). Przy przekroczeniu 1,5-krotności progu status zmienia się z "Degradacja" na "Awaria". Odsetek jest ignorowany, dopóki nie zaobserwowano minimalnej liczby finalizacji (domyślnie 5).
- **Anomalia sprzedaży:** "Awaria" zgłaszana jest tylko wtedy, gdy dla danej godziny typowo pojawia się co najmniej tyle zamówień, ile wynosi próg (domyślnie 3), a w ostatniej pełnej godzinie nie było żadnego.

## Alerty

Gdy status pogarsza się względem poprzedniego sprawdzenia, moduł wysyła alert. Przy utrzymującym się problemie alert powtarza się dopiero po upływie czasu wyciszenia (domyślnie 60 minut), aby uniknąć powiadomień co 5 minut.

| Kanał   | Szczegóły                                                                 |
| ------- | ------------------------------------------------------------------------- |
| E-mail  | Wysyłany na adres alertów (domyślnie e-mail administratora sklepu).       |
| Webhook | Opcjonalny. Wysyła ładunek JSON `{"text": ...}` zgodny ze Slack/Discord.  |

Przy statusie "Awaria" wpis trafia także do **rejestru incydentów bezpieczeństwa**, jeśli ten moduł jest włączony, aby zdarzenie miało ślad audytowy obok ręcznie rejestrowanych incydentów.

## Pulpit

Pulpit "Kondycja sklepu" pokazuje status ogólny, czas ostatniego sprawdzenia (UTC) oraz tabelę z każdym czujnikiem, jego statusem i szczegółem. Przycisk **Uruchom sprawdzenie teraz** wymusza natychmiastową ocenę. Gdy status nie jest "OK", w panelu pojawia się stosowne powiadomienie z linkiem do pulpitu.

## Ustawienia

Ustawienia znajdują się na karcie modułu w **WooCommerce > Polski > Moduły**.

| Ustawienie                       | Domyślnie               | Opis                                                              |
| -------------------------------- | ----------------------- | ----------------------------------------------------------------- |
| Adres e-mail alertów             | e-mail administratora   | Dokąd wysyłać alerty kondycji.                                    |
| URL webhooka                     | (puste)                 | Opcjonalny webhook JSON (Slack/Discord).                          |
| Próg nieudanych płatności (%)    | 30                      | Alert, gdy taki odsetek finalizacji zawiedzie w ostatnich 2 h.    |
| Minimalna próbka finalizacji     | 5                       | Ignoruj odsetek, dopóki nie ma co najmniej tylu finalizacji.      |
| Próg anomalii sprzedaży          | 3                       | Alertuj tylko, gdy typowo dla danej godziny jest tyle zamówień, a nie ma żadnego. |
| Wyciszenie alertów (minuty)      | 60                      | Minimalny odstęp między powtórzonymi alertami dla trwającego problemu. |

## REST API

```
GET /wp-json/polski/v1/store-health
```

Zwraca aktualny stan (status ogólny, czujniki, czas sprawdzenia). Wymaga uprawnienia `manage_woocommerce`.

## Rozwiązywanie problemów

**Alerty nie docierają** - sprawdź konfigurację e-mail WordPressa. Rozważ wtyczkę SMTP (np. WP Mail SMTP) zamiast domyślnego `wp_mail()`.

**Czujnik kasy pokazuje "niewystarczające dane"** - to normalne dla sklepów o małym ruchu. Odsetek jest oceniany dopiero po osiągnięciu minimalnej próbki finalizacji.

**Anomalia sprzedaży nie reaguje** - moduł potrzebuje historii zamówień z poprzednich tygodni dla danej godziny. W nowym sklepie typowa wartość będzie niska i próg nie zostanie osiągnięty.

**Sprawdzenia się nie uruchamiają** - WP-Cron działa przy ruchu na stronie. W sklepach o małym ruchu rozważ systemowy cron (`wp-cron.php` wyzwalany przez crona serwera).

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
