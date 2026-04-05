---
title: Karty podarunkowe
description: Dokumentacja kart podarunkowych Polski PRO for WooCommerce - sprzedaż, generowanie kodów, realizacja w koszyku, śledzenie salda i panel Moje konto.
---

Moduł kart podarunkowych pozwala sprzedawać karty jako produkty WooCommerce. Klient kupuje kartę, otrzymuje kod i płaci nim przy kolejnych zamówieniach.

## Jak to działa

1. Administrator tworzy produkt typu "Karta podarunkowa"
2. Klient kupuje kartę podarunkową w sklepie
3. Po opłaceniu zamówienia plugin generuje unikalny kod karty
4. Kod jest wysyłany do klienta (lub obdarowanego) e-mailem
5. Obdarowany wpisuje kod w koszyku i otrzymuje rabat równy wartości karty
6. Saldo karty zmniejsza się o wykorzystaną kwotę

## Konfiguracja

Przejdź do **WooCommerce > Ustawienia > Polski > Moduły PRO > Karty podarunkowe**.

Moduł jest kontrolowany opcją:

```
polski_gift_cards
```

### Ustawienia ogólne

| Ustawienie | Opis |
|------------|------|
| Włącz karty podarunkowe | Aktywuje moduł |
| Długość kodu | Liczba znaków kodu (domyślnie 16) |
| Format kodu | Wzorzec kodu (np. `XXXX-XXXX-XXXX-XXXX`) |
| Prefiks kodu | Opcjonalny prefiks (np. `PL-`) |
| Ważność karty | Liczba dni ważności (0 = bez limitu) |
| Pole kodu w koszyku | Pozycja pola do wpisania kodu |

### Tworzenie produktu karty podarunkowej

1. Przejdź do **Produkty > Dodaj nowy**
2. Wybierz typ produktu: **Karta podarunkowa**
3. Ustaw cenę (wartość nominalna karty)
4. Opcjonalnie: włącz "Kwota dowolna" - klient sam wpisuje wartość karty
5. Opcjonalnie: ustaw minimalną i maksymalną kwotę dla kwoty dowolnej
6. Opublikuj produkt

Dla kwoty dowolnej klient widzi pole do wpisania wartości karty zamiast ustalonej ceny.

## Generowanie kodów

Kody generują się automatycznie po opłaceniu zamówienia. Cechy kodów:

- znaki alfanumeryczne (A-Z, 0-9)
- wykluczenie znaków niejednoznacznych (0, O, I, L, 1)
- walidacja unikalności w bazie danych
- formatowanie z separatorami (np. `ABCD-EFGH-JKMN-PQRS`)

Każdy kod jest unikalny. Przy kolizji plugin generuje nowy kod.

## Realizacja w koszyku

### Pole kodu

W koszyku (i opcjonalnie na kasie) klient widzi pole do wpisania kodu:

```
[Wpisz kod karty podarunkowej] [Zastosuj]
```

Po wpisaniu prawidłowego kodu:

- saldo karty jest wyświetlane
- kwota rabatu jest odejmowana od sumy zamówienia
- jeśli saldo karty jest mniejsze niż wartość zamówienia - reszta do zapłaty innymi metodami
- jeśli saldo karty jest większe - pozostała kwota zostaje na karcie

### Walidacja kodu

Plugin sprawdza kod przed zastosowaniem:

- sprawdzenie, czy kod istnieje w bazie
- sprawdzenie, czy karta nie wygasła
- sprawdzenie, czy saldo jest większe od zera
- sprawdzenie, czy karta nie została zablokowana

Klient widzi komunikat z przyczyną odrzucenia kodu.

### Śledzenie sesji

Kod karty jest przechowywany w sesji WooCommerce:

- kod jest zapamiętywany nawet po odświeżeniu strony
- kod jest usuwany po złożeniu zamówienia lub wylogowaniu
- klient może usunąć zastosowany kod ręcznie

## Śledzenie salda

Saldo karty zmniejsza się z każdym użyciem. Historia transakcji zawiera:

| Pole | Opis |
|------|------|
| Data | Data transakcji |
| Typ | Doładowanie / Użycie / Zwrot |
| Kwota | Kwota operacji |
| Zamówienie | ID zamówienia (dla użycia i zwrotu) |
| Saldo po operacji | Aktualne saldo po transakcji |

### Panel administracyjny

W panelu **WooCommerce > Karty podarunkowe** administrator może:

- przeglądać listę wszystkich kart z saldami
- sprawdzić historię transakcji karty
- doładować kartę ręcznie
- zablokować kartę
- wyeksportować listę kart (CSV)

## Panel Moje konto

Moduł dodaje sekcję w panelu Moje konto pod adresem:

```
/moje-konto/polski-gift-cards/
```

W panelu klient widzi:

- listę posiadanych kart podarunkowych
- aktualne saldo każdej karty
- historię użycia
- kod karty (z opcją kopiowania)
- datę ważności (jeśli ustawiona)

## Hooki

### `polski_pro/gift_card/validate`

Filtruje wynik walidacji kodu karty podarunkowej w koszyku.

```php
/**
 * @param bool   $is_valid  Czy kod jest prawidłowy
 * @param string $code      Kod karty podarunkowej
 * @param float  $cart_total Suma koszyka
 */
apply_filters('polski_pro/gift_card/validate', bool $is_valid, string $code, float $cart_total): bool;
```

**Przykład:**

```php
add_filter('polski_pro/gift_card/validate', function (bool $is_valid, string $code, float $cart_total): bool {
    // Blokowanie kart podarunkowych dla zamówień poniżej 50 zł
    if ($cart_total < 50.00) {
        wc_add_notice('Karty podarunkowe można wykorzystać przy zamówieniach od 50 zł.', 'error');
        return false;
    }
    return $is_valid;
}, 10, 3);
```

### `polski_pro/gift_card/applied`

Akcja wywoływana po zastosowaniu karty podarunkowej w koszyku.

```php
/**
 * @param string $code    Kod karty
 * @param float  $amount  Kwota do odliczenia
 * @param float  $balance Pozostałe saldo
 */
do_action('polski_pro/gift_card/applied', string $code, float $amount, float $balance);
```

**Przykład:**

```php
add_action('polski_pro/gift_card/applied', function (string $code, float $amount, float $balance): void {
    // Logowanie użycia karty
    wc_get_logger()->info(
        "Karta {$code}: odliczono {$amount} zł, saldo: {$balance} zł",
        ['source' => 'polski-pro-gift-cards']
    );
}, 10, 3);
```

### `polski_pro/gift_card/order_created`

Akcja wywoływana po utworzeniu zamówienia z użyciem karty podarunkowej.

```php
/**
 * @param int    $order_id ID zamówienia
 * @param string $code     Kod karty
 * @param float  $amount   Kwota odliczona z karty
 */
do_action('polski_pro/gift_card/order_created', int $order_id, string $code, float $amount);
```

**Przykład:**

```php
add_action('polski_pro/gift_card/order_created', function (int $order_id, string $code, float $amount): void {
    $order = wc_get_order($order_id);
    $order->add_order_note(
        sprintf('Użyto kartę podarunkową %s na kwotę %.2f zł', $code, $amount)
    );
}, 10, 3);
```

### `polski_pro/gift_card/calculate_totals`

Filtruje kwotę do odliczenia z karty podarunkowej przy przeliczaniu sum koszyka.

```php
/**
 * @param float  $discount   Kwota rabatu z karty
 * @param string $code       Kod karty
 * @param float  $cart_total Suma koszyka przed rabatem
 */
apply_filters('polski_pro/gift_card/calculate_totals', float $discount, string $code, float $cart_total): float;
```

## E-mail z kodem

Po opłaceniu zamówienia plugin wysyła e-mail z kodem karty. E-mail zawiera:

- kod karty (sformatowany)
- wartość nominalną
- datę ważności (jeśli dotyczy)
- instrukcję wykorzystania

Szablon e-maila można dostosować w **WooCommerce > Ustawienia > E-maile > Karta podarunkowa**.

### E-mail dla obdarowanego

Klient może podać e-mail obdarowanego. Wtedy:

- kod jest wysyłany na adres obdarowanego
- kupujący otrzymuje potwierdzenie zakupu (bez kodu)
- opcjonalnie: kupujący może dodać wiadomość dla obdarowanego

## Najczęstsze problemy

### Kod nie jest akceptowany w koszyku

1. Sprawdź, czy kod jest wpisany prawidłowo (bez spacji na początku/końcu)
2. Zweryfikuj, czy karta nie wygasła
3. Sprawdź saldo karty w panelu administracyjnym
4. Upewnij się, że karta nie jest zablokowana

### Klient nie otrzymał kodu e-mailem

1. Sprawdź, czy zamówienie jest opłacone (status "Processing" lub "Completed")
2. Zweryfikuj konfigurację e-maili WooCommerce
3. Sprawdź logi e-maili pod kątem błędów wysyłki

### Saldo nie zmniejsza się po zamówieniu

1. Sprawdź, czy zamówienie zostało pomyślnie złożone (nie anulowane)
2. Zweryfikuj historię transakcji karty w panelu administracyjnym
3. Sprawdź logi pod kątem błędów PHP

## Powiązane zasoby

- [Przegląd PRO](/pro/overview/)
- [Zgłoś problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
