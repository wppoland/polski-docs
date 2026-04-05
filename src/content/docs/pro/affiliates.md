---
title: Program afiliacyjny
description: Dokumentacja programu afiliacyjnego Polski PRO for WooCommerce - linki polecające, śledzenie prowizji, rejestracja afiliantów i panel Moje konto.
---

Moduł programu afiliacyjnego w Polski PRO for WooCommerce umożliwia prowadzenie programu poleceń bezpośrednio w sklepie WooCommerce. Afilianci udostępniają unikalne linki polecające, a plugin śledzi konwersje i nalicza prowizje za zamówienia złożone przez poleconych klientów.

## Jak to działa

1. Klient rejestruje się jako afiliant w panelu Moje konto
2. Administrator aktywuje konto afilianta
3. Afiliant otrzymuje unikalny token i link polecający
4. Afiliant udostępnia link (np. w mediach społecznościowych, na blogu)
5. Odwiedzający klika link - token jest zapisywany w cookie
6. Odwiedzający składa zamówienie - plugin powiązuje zamówienie z afiliantem
7. Po opłaceniu zamówienia plugin nalicza prowizję

## Konfiguracja

Przejdź do **WooCommerce > Ustawienia > Polski > Moduły PRO > Program afiliacyjny**.

Moduł jest kontrolowany opcją:

```
polski_affiliates
```

### Ustawienia ogólne

| Ustawienie | Opis |
|------------|------|
| Włącz program afiliacyjny | Aktywuje moduł |
| Stawka prowizji (%) | Procentowa prowizja od wartości zamówienia (domyślnie 10%) |
| Podstawa prowizji | Kwota netto / Kwota brutto / Kwota netto bez dostawy |
| Czas trwania cookie (dni) | Ile dni cookie z tokenem jest ważne (domyślnie 30) |
| Automatyczna aktywacja | Automatycznie aktywuj nowych afiliantów (domyślnie: wyłączone) |
| Minimalna wypłata | Minimalna kwota prowizji do wypłaty |
| Parametr URL | Nazwa parametru w linku polecającym (domyślnie `poleca`) |

### Stawki prowizji per produkt

Oprócz globalnej stawki prowizji administrator może ustawić indywidualną stawkę dla wybranego produktu. W edycji produktu w sekcji "Program afiliacyjny":

- **Stawka prowizji (%)** - nadpisuje globalną stawkę
- **Wyłącz z programu** - produkt nie generuje prowizji

Stawki per kategoria produktu są również obsługiwane - ustawienie na kategorii dotyczy wszystkich produktów w tej kategorii, chyba że produkt ma własną stawkę.

## Linki polecające

### Format linku

Link polecający zawiera parametr URL z tokenem afilianta:

```
https://example.com/?poleca=abc123def456
```

Parametr `poleca` jest konfigurowalny. Token jest unikalnym identyfikatorem afilianta generowanym przy rejestracji.

### Cookie tracking

Po kliknięciu linku polecającego plugin ustawia cookie:

| Parametr | Wartość |
|----------|---------|
| Nazwa cookie | `polski_affiliate_token` |
| Wartość | Token afilianta |
| Czas życia | Konfigurowalny (domyślnie 30 dni) |
| Ścieżka | `/` |
| SameSite | `Lax` |

Cookie jest ustawiane po stronie serwera (PHP) z flagą `HttpOnly`. Przy kolejnych wizytach klienta plugin sprawdza obecność cookie i powiązuje ewentualne zamówienie z afiliantem.

### Atrybucja zamówienia

Plugin stosuje model atrybucji "last click" - jeśli klient kliknął linki od kilku afiliantów, prowizję otrzymuje ostatni. Cookie jest nadpisywane przy każdym kliknięciu nowego linku.

## Rejestracja i aktywacja afiliantów

### Rejestracja

Klient może zarejestrować się jako afiliant w panelu Moje konto na stronie `/moje-konto/polski-affiliates/`. Formularz rejestracji zawiera:

- imię i nazwisko (pobierane automatycznie z konta)
- metoda płatności prowizji (przelew / kod rabatowy)
- numer konta bankowego (dla przelewu)
- zgoda na regulamin programu afiliacyjnego

### Aktywacja

Domyślnie nowe konta afiliantów wymagają ręcznej aktywacji przez administratora. Administrator otrzymuje powiadomienie e-mail o nowej rejestracji i może:

- aktywować konto w panelu **WooCommerce > Afilianci**
- odrzucić rejestrację z podaniem powodu

Opcjonalnie można włączyć automatyczną aktywację - nowe konta stają się aktywne natychmiast po rejestracji.

### Statusy afilianta

| Status | Opis |
|--------|------|
| Pending | Oczekujący na aktywację |
| Active | Aktywny - może generować linki i zarabiać prowizje |
| Suspended | Zawieszony przez administratora |
| Rejected | Odrzucony - rejestracja odrzucona |

## Śledzenie prowizji

### Naliczanie prowizji

Prowizja jest naliczana automatycznie po opłaceniu zamówienia powiązanego z afiliantem. Prowizja nie jest naliczana dla:

- zamówień anulowanych lub zwróconych
- zamówień złożonych przez samego afilianta (self-referral)
- produktów wyłączonych z programu

### Statusy prowizji

| Status | Opis |
|--------|------|
| Pending | Naliczona, oczekuje na zatwierdzenie |
| Approved | Zatwierdzona, gotowa do wypłaty |
| Paid | Wypłacona |
| Rejected | Odrzucona (np. zamówienie zwrócone) |

### Automatyczne zatwierdzanie

Prowizja zmienia status z "Pending" na "Approved" po upływie konfigurowalnego okresu (domyślnie 14 dni). Opóźnienie chroni przed prowizjami od zamówień, które zostaną zwrócone.

Jeśli zamówienie zostanie anulowane lub zwrócone w okresie oczekiwania, prowizja jest automatycznie odrzucana.

## Panel Moje konto

Moduł dodaje endpoint `/polski-affiliates` do panelu Moje konto. Endpoint jest dostępny pod adresem:

```
/moje-konto/polski-affiliates/
```

### Dashboard afilianta

Po aktywacji konta afiliant widzi dashboard z:

- **Statystyki** - łączna liczba kliknięć, zamówień, prowizji
- **Link polecający** - pełny link z przyciskiem kopiowania
- **Prowizje** - lista prowizji z datami, kwotami i statusami
- **Wypłaty** - historia wypłat
- **Statystyki miesięczne** - wykres kliknięć i konwersji

### Generowanie linków

Afiliant może wygenerować link polecający do:

- strony głównej sklepu
- konkretnego produktu
- kategorii produktów
- dowolnej strony w domenie sklepu

Każdy link zawiera parametr `poleca` z tokenem afilianta.

## Panel administracyjny

### Lista afiliantów

Przejdź do **WooCommerce > Afilianci**. Tabela zawiera:

- imię i nazwisko
- e-mail
- status
- data rejestracji
- liczba poleceń
- łączna prowizja
- saldo do wypłaty

### Zarządzanie prowizjami

Przejdź do **WooCommerce > Afilianci > Prowizje**. Administrator może:

- przeglądać listę prowizji z filtrami (afiliant, status, data)
- zatwierdzać lub odrzucać prowizje
- oznaczać prowizje jako wypłacone
- eksportować prowizje do CSV

### Raport

Przejdź do **WooCommerce > Afilianci > Raport**. Raport zawiera:

- łączna wartość zamówień z poleceń
- łączna kwota prowizji
- konwersja (kliknięcia -> zamówienia)
- top 10 afiliantów
- trend miesięczny

## Hooki

### `polski_pro/affiliate/commission_created`

Akcja wywoływana po naliczeniu prowizji.

```php
/**
 * @param int   $commission_id ID prowizji
 * @param int   $affiliate_id  ID afilianta
 * @param int   $order_id      ID zamówienia
 * @param float $amount        Kwota prowizji
 */
do_action('polski_pro/affiliate/commission_created', int $commission_id, int $affiliate_id, int $order_id, float $amount);
```

**Przykład:**

```php
add_action('polski_pro/affiliate/commission_created', function (int $commission_id, int $affiliate_id, int $order_id, float $amount): void {
    // Powiadomienie afilianta o nowej prowizji
    $affiliate = get_userdata($affiliate_id);
    wp_mail(
        $affiliate->user_email,
        'Nowa prowizja w programie afiliacyjnym',
        sprintf(
            'Otrzymałeś prowizję %.2f zł za zamówienie #%d.',
            $amount,
            $order_id
        )
    );
}, 10, 4);
```

### `polski_pro/affiliate/registered`

Akcja wywoływana po rejestracji nowego afilianta.

```php
/**
 * @param int $user_id ID użytkownika
 * @param string $token Wygenerowany token afilianta
 */
do_action('polski_pro/affiliate/registered', int $user_id, string $token);
```

**Przykład:**

```php
add_action('polski_pro/affiliate/registered', function (int $user_id, string $token): void {
    // Przypisanie roli WordPress
    $user = get_userdata($user_id);
    $user->add_role('affiliate');
}, 10, 2);
```

### `polski_pro/affiliate/validate_referral`

Filtruje walidację polecenia przed naliczeniem prowizji.

```php
/**
 * @param bool $is_valid     Czy polecenie jest prawidłowe
 * @param int  $affiliate_id ID afilianta
 * @param int  $order_id     ID zamówienia
 */
apply_filters('polski_pro/affiliate/validate_referral', bool $is_valid, int $affiliate_id, int $order_id): bool;
```

**Przykład:**

```php
add_filter('polski_pro/affiliate/validate_referral', function (bool $is_valid, int $affiliate_id, int $order_id): bool {
    $order = wc_get_order($order_id);
    
    // Blokowanie self-referral po adresie e-mail
    $affiliate_email = get_userdata($affiliate_id)->user_email;
    if ($order->get_billing_email() === $affiliate_email) {
        return false;
    }
    
    return $is_valid;
}, 10, 3);
```

## Najczęstsze problemy

### Prowizja nie jest naliczana

1. Sprawdź, czy afiliant ma status "Active"
2. Zweryfikuj, czy cookie `polski_affiliate_token` jest ustawione (narzędzia deweloperskie przeglądarki)
3. Sprawdź, czy zamówienie nie zostało złożone przez samego afilianta
4. Zweryfikuj, czy produkty w zamówieniu nie są wyłączone z programu

### Cookie nie jest ustawiane po kliknięciu linku

1. Sprawdź, czy parametr URL jest poprawny (domyślnie `poleca`)
2. Zweryfikuj, czy token afilianta istnieje i jest aktywny
3. Sprawdź, czy wtyczki cache nie cachują strony z parametrami URL - dodaj parametr `poleca` do listy wykluczeń cache

### Afiliant nie widzi panelu w Moje konto

1. Sprawdź, czy moduł afiliacyjny jest włączony
2. Przejdź do **Ustawienia > Bezpośrednie odnośniki** i kliknij "Zapisz" (odświeża reguły rewrite)
3. Zweryfikuj, czy endpoint `polski-affiliates` jest zarejestrowany

## Powiązane zasoby

- [Przegląd PRO](/pro/overview/)
- [Zgłoś problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
