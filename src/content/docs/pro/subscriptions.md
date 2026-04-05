---
title: Subskrypcje
description: Dokumentacja modułu subskrypcji Polski PRO for WooCommerce - produkty cykliczne, odnowienia, przypomnienia e-mail, cron i panel Moje konto.
---

Moduł subskrypcji w Polski PRO for WooCommerce dodaje obsługę produktów z płatnością cykliczną. Klienci mogą kupować subskrypcje z automatycznym lub ręcznym odnawianiem, a administrator zarządza cyklem życia subskrypcji z poziomu WooCommerce.

## Jak to działa

1. Administrator tworzy produkt typu "Subskrypcja" z cyklem i ceną
2. Klient kupuje subskrypcję i opłaca pierwsze zamówienie
3. Plugin tworzy subskrypcję ze statusem "Aktywna"
4. Przed datą odnowienia klient otrzymuje przypomnienie e-mail
5. W dniu odnowienia plugin tworzy zamówienie odnowienia
6. Klient opłaca zamówienie odnowienia (ręczne odnowienie)
7. Cykl powtarza się do anulowania subskrypcji

## Konfiguracja

Przejdź do **WooCommerce > Ustawienia > Polski > Moduły PRO > Subskrypcje**.

Moduł jest kontrolowany opcją:

```
polski_subscriptions
```

### Ustawienia ogólne

| Ustawienie | Opis |
|------------|------|
| Włącz subskrypcje | Aktywuje moduł |
| Tryb odnowienia | Ręczne (klient opłaca zamówienie) |
| Dni przypomnienia | Ile dni przed odnowieniem wysłać przypomnienie (domyślnie 3) |
| Okres karencji | Ile dni po terminie odnowienia subskrypcja pozostaje aktywna (domyślnie 7) |
| Automatyczne zawieszenie | Zawieszaj subskrypcję po upływie okresu karencji |

### Tworzenie produktu subskrypcyjnego

1. Przejdź do **Produkty > Dodaj nowy**
2. Wybierz typ produktu: **Subskrypcja**
3. Skonfiguruj cenę i cykl:

| Pole | Opis |
|------|------|
| Cena subskrypcji | Kwota za okres rozliczeniowy |
| Okres rozliczeniowy | Dzień / Tydzień / Miesiąc / Rok |
| Długość okresu | Liczba okresów (np. 1 miesiąc, 3 miesiące) |
| Cena początkowa | Opcjonalna - inna cena za pierwszy okres |
| Opłata aktywacyjna | Opcjonalna - jednorazowa opłata przy pierwszym zamówieniu |
| Limit odnowień | 0 = bez limitu, lub liczba odnowień |

4. Opublikuj produkt

### Cena początkowa vs cena odnowienia

Plugin obsługuje scenariusze, w których cena za pierwszy okres różni się od ceny za kolejne okresy. Typowe zastosowania:

- okres próbny za darmo lub po obniżonej cenie
- promocyjna cena na start
- opłata aktywacyjna + niższa cena cykliczna

Cena początkowa jest stosowana tylko do pierwszego zamówienia. Kolejne zamówienia odnowienia używają standardowej ceny subskrypcji.

## Cykl życia subskrypcji

```
Pending → Active → On Hold → Active → ...
                  → Expired
                  → Cancelled
```

| Status | Opis |
|--------|------|
| Pending | Oczekująca na opłacenie pierwszego zamówienia |
| Active | Aktywna - klient ma dostęp do produktu |
| On Hold | Wstrzymana - zamówienie odnowienia oczekuje na opłacenie |
| Expired | Wygasła - liczba odnowień osiągnęła limit lub minął okres karencji |
| Cancelled | Anulowana przez klienta lub administratora |

## Odnowienia

### Ręczne odnowienie

W bieżącej wersji plugin obsługuje ręczne odnowienia. Oznacza to, że:

1. Plugin tworzy zamówienie odnowienia ze statusem "Oczekujące na płatność"
2. Klient otrzymuje e-mail z linkiem do opłacenia zamówienia
3. Klient opłaca zamówienie przez wybraną metodę płatności
4. Po opłaceniu subskrypcja zostaje odnowiona na kolejny okres

### Proces odnowienia

Plugin sprawdza subskrypcje do odnowienia codziennie za pomocą crona WP:

```
polski_daily_maintenance
```

Zadanie cron uruchamia się raz dziennie i wykonuje:

- sprawdzenie subskrypcji, których data odnowienia przypada na dziś lub wcześniej
- utworzenie zamówień odnowienia dla subskrypcji wymagających odnowienia
- zawieszenie subskrypcji, które przekroczyły okres karencji
- wygaszenie subskrypcji, które osiągnęły limit odnowień

### Przypomnienia e-mail

Plugin wysyła przypomnienia e-mail przed datą odnowienia:

| E-mail | Kiedy | Treść |
|--------|-------|-------|
| Przypomnienie o odnowieniu | X dni przed odnowieniem | Informacja o zbliżającym się odnowieniu, kwota, link do panelu |
| Zamówienie odnowienia | W dniu odnowienia | Zamówienie do opłacenia z linkiem do płatności |
| Subskrypcja wstrzymana | Po upływie terminu płatności | Informacja o wstrzymaniu, link do opłacenia |
| Subskrypcja wygasła | Po upływie okresu karencji | Informacja o wygaśnięciu, link do ponownego zakupu |

Szablony e-maili można dostosować w **WooCommerce > Ustawienia > E-maile**.

## Panel Moje konto

Moduł dodaje endpoint `/polski-subscriptions` do panelu Moje konto klienta. Endpoint jest dostępny pod adresem:

```
/moje-konto/polski-subscriptions/
```

### Lista subskrypcji

Klient widzi tabelę z subskrypcjami:

| Kolumna | Opis |
|---------|------|
| Produkt | Nazwa produktu subskrypcyjnego |
| Status | Aktualny status subskrypcji |
| Cena | Kwota za okres |
| Następne odnowienie | Data następnego odnowienia |
| Akcje | Anuluj / Opłać odnowienie |

### Szczegóły subskrypcji

Po kliknięciu w subskrypcję klient widzi:

- pełne dane subskrypcji (produkt, cena, cykl, daty)
- historię odnowień (lista zamówień powiązanych)
- przycisk anulowania subskrypcji
- przycisk opłacenia oczekującego odnowienia (jeśli dotyczy)

### Anulowanie subskrypcji

Klient może anulować aktywną subskrypcję z poziomu panelu Moje konto. Anulowanie:

- zmienia status subskrypcji na "Cancelled"
- subskrypcja pozostaje aktywna do końca bieżącego opłaconego okresu
- klient jest informowany o dacie zakończenia dostępu

## Hooki

### `polski_pro/subscription/status_changed`

Akcja wywoływana po zmianie statusu subskrypcji.

```php
/**
 * @param int    $subscription_id ID subskrypcji
 * @param string $new_status      Nowy status
 * @param string $old_status      Poprzedni status
 */
do_action('polski_pro/subscription/status_changed', int $subscription_id, string $new_status, string $old_status);
```

**Przykład:**

```php
add_action('polski_pro/subscription/status_changed', function (int $subscription_id, string $new_status, string $old_status): void {
    if ($new_status === 'cancelled') {
        $subscription = polski_pro_get_subscription($subscription_id);
        // Wysłanie ankiety o powód rezygnacji
        wp_mail(
            $subscription->get_customer_email(),
            'Szkoda, że odchodzisz',
            'Powiedz nam, dlaczego anulujesz subskrypcję: https://example.com/ankieta'
        );
    }
}, 10, 3);
```

### `polski_pro/subscription/renewal_created`

Akcja wywoływana po utworzeniu zamówienia odnowienia.

```php
/**
 * @param int $order_id        ID zamówienia odnowienia
 * @param int $subscription_id ID subskrypcji
 */
do_action('polski_pro/subscription/renewal_created', int $order_id, int $subscription_id);
```

**Przykład:**

```php
add_action('polski_pro/subscription/renewal_created', function (int $order_id, int $subscription_id): void {
    $order = wc_get_order($order_id);
    $order->add_order_note(
        sprintf('Zamówienie odnowienia dla subskrypcji #%d', $subscription_id)
    );
}, 10, 2);
```

### `polski_pro/subscription/renewal_paid`

Akcja wywoływana po opłaceniu zamówienia odnowienia.

```php
/**
 * @param int $order_id        ID zamówienia odnowienia
 * @param int $subscription_id ID subskrypcji
 */
do_action('polski_pro/subscription/renewal_paid', int $order_id, int $subscription_id);
```

## Panel administracyjny

### Lista subskrypcji

Przejdź do **WooCommerce > Subskrypcje**. Tabela zawiera:

- ID subskrypcji
- klient (imię, nazwisko, e-mail)
- produkt
- status
- cena i cykl
- data następnego odnowienia
- data utworzenia

Dostępne filtry: status, produkt, data utworzenia.

### Edycja subskrypcji

Administrator może:

- zmienić status subskrypcji
- zmienić datę następnego odnowienia
- zmienić cenę (wpływa na kolejne odnowienia)
- dodać notatkę
- przeglądać historię statusów i powiązane zamówienia

## Najczęstsze problemy

### Zamówienia odnowienia nie są tworzone

1. Sprawdź, czy WP-Cron działa poprawnie (`wp_cron` jest wywoływany)
2. Przejdź do **Narzędzia > Scheduled Actions** i sprawdź, czy zadanie `polski_daily_maintenance` jest zaplanowane
3. Zweryfikuj, czy subskrypcja ma status "Active" i poprawną datę odnowienia

### Klient nie otrzymuje przypomnień

1. Sprawdź konfigurację e-maili WooCommerce
2. Zweryfikuj, czy szablon e-maila przypomnienia jest włączony
3. Sprawdź ustawienie "Dni przypomnienia" - czy jest większe od 0

### Subskrypcja nie zmienia statusu po opłaceniu

1. Sprawdź, czy zamówienie odnowienia ma poprawne powiązanie z subskrypcją
2. Zweryfikuj logi WooCommerce pod kątem błędów
3. Sprawdź, czy bramka płatności poprawnie zmienia status zamówienia

## Powiązane zasoby

- [Przegląd PRO](/pro/overview/)
- [Zgłoś problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
