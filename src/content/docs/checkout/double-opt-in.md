---
title: Weryfikacja adresu e-mail
description: Double opt-in przy rejestracji - link aktywacyjny, blokada logowania i konfiguracja wiadomości w WooCommerce.
---

Double opt-in potwierdza, ze podany e-mail naprawdę należy do osoby zakładającej konto. Wtyczka Polski for WooCommerce wysyła link aktywacyjny i blokuje logowanie do momentu kliknięcia w ten link.

## Dlaczego warto używać double opt-in

Polskie prawo nie wymaga double opt-in, ale warto go włączyć ze względu na:

- **RODO** - potwierdzasz tożsamość właściciela e-maila
- **Ochrona przed botami** - blokuje fałszywe konta
- **Jakość bazy** - masz pewność, że e-maile są prawdziwe
- **Dostarczalność** - mniej odbitych wiadomości i oznaczeń jako spam
- **Ustawa o usługach elektronicznych** - potwierdzenie chęci korzystania z usługi

## Konfiguracja

Przejdź do **WooCommerce > Ustawienia > Polski > Kasa** i skonfiguruj sekcję "Weryfikacja e-mail".

### Ustawienia podstawowe

| Ustawienie | Domyślna wartość | Opis |
|------------|-----------------|------|
| Włącz weryfikację e-mail | Nie | Aktywuje mechanizm double opt-in |
| Czas ważności linku | 48 godzin | Jak długo link aktywacyjny jest aktywny |
| Automatyczne usuwanie niezweryfikowanych | 7 dni | Po ilu dniach usunąć niezweryfikowane konta |
| Pozwól na zakupy bez weryfikacji | Nie | Czy niezweryfikowany użytkownik może składać zamówienia |

### Ustawienia zaawansowane

| Ustawienie | Opis |
|------------|------|
| Przekierowanie po aktywacji | URL, na który użytkownik zostanie przekierowany po kliknięciu linku |
| Strona oczekiwania | Strona wyświetlana zamiast panelu "Moje konto" dla niezweryfikowanych |
| Ponowne wysłanie linku | Czy wyświetlać przycisk "Wyślij ponownie link aktywacyjny" |
| Limit ponownych wysyłek | Maksymalna liczba ponownych wysyłek linku (ochrona przed nadużyciami) |

## Proces weryfikacji

### Krok po kroku

1. Klient rejestruje konto (przez "Moje konto" lub przy zamówieniu)
2. Wtyczka generuje token aktywacyjny i zapisuje go w bazie
3. E-mail z linkiem aktywacyjnym trafia na podany adres
4. Konto ma status "niezweryfikowane" - logowanie zablokowane
5. Klient klika link w e-mailu
6. Wtyczka sprawdza token, aktywuje konto i loguje klienta
7. Klient trafia na stronę "Moje konto" lub wybrany URL

### Rejestracja przy składaniu zamówienia

Jeśli opcja "Pozwól na zakupy bez weryfikacji" jest wyłączona:

- zamówienie nie zostanie złożone, dopóki klient nie zweryfikuje e-maila
- klient zobaczy komunikat z instrukcją sprawdzenia skrzynki pocztowej

Jeśli opcja jest włączona:

- zamówienie zostanie złożone normalnie
- konto będzie wymagało weryfikacji przy następnym logowaniu
- e-mail aktywacyjny zostanie wysłany równolegle z potwierdzeniem zamówienia

## Blokada logowania

Niezweryfikowani użytkownicy nie mogą się zalogować. Widzą komunikat:

> "Twoje konto nie zostało jeszcze zweryfikowane. Sprawdź swoją skrzynkę e-mail i kliknij link aktywacyjny. [Wyślij ponownie link]"

### Konfiguracja komunikatu blokady

Komunikat zmienisz w ustawieniach wtyczki. Dostępne zmienne:

| Zmienna | Opis |
|---------|------|
| `{email}` | Adres e-mail użytkownika |
| `{resend_link}` | Link do ponownego wysłania e-maila aktywacyjnego |
| `{expiry}` | Czas ważności linku |

Przykład niestandardowego komunikatu:

```
Konto {email} wymaga weryfikacji. Kliknij link w e-mailu, który wysłaliśmy. 
Nie otrzymałeś wiadomości? {resend_link}
```

## Konfiguracja wiadomości e-mail

### Szablon e-maila aktywacyjnego

Wtyczka dodaje nowy typ e-maila w **WooCommerce > Ustawienia > E-maile > Weryfikacja adresu e-mail**.

Dostępne ustawienia:

| Ustawienie | Opis |
|------------|------|
| Włącz/wyłącz | Aktywuje wysyłkę e-maila |
| Temat | Temat wiadomości (domyślnie: "Potwierdź swój adres e-mail") |
| Nagłówek | Nagłówek w treści e-maila |
| Treść | Dodatkowy tekst nad linkiem aktywacyjnym |
| Typ e-maila | HTML lub zwykły tekst |

### Zmienne w szablonie

| Zmienna | Opis |
|---------|------|
| `{site_title}` | Nazwa sklepu |
| `{customer_name}` | Imię klienta |
| `{activation_link}` | Link aktywacyjny (pełny URL) |
| `{activation_button}` | Przycisk aktywacyjny (HTML) |
| `{expiry_hours}` | Czas ważności linku w godzinach |

### Nadpisywanie szablonu e-maila

Aby dostosować szablon HTML, skopiuj plik:

```
wp-content/plugins/polski/templates/emails/email-verification.php
```

do:

```
wp-content/themes/twoj-motyw/woocommerce/emails/email-verification.php
```

## Programistyczne rozszerzenia

### Hook przed weryfikacją

```php
add_action('polski/email_verification/before_verify', function (int $user_id, string $token): void {
    // Logika przed aktywacją konta
    // np. logowanie zdarzenia
    error_log(sprintf('Weryfikacja e-mail dla użytkownika #%d', $user_id));
}, 10, 2);
```

### Hook po weryfikacji

```php
add_action('polski/email_verification/verified', function (int $user_id): void {
    // Logika po aktywacji konta
    // np. przypisanie roli, wysłanie powitalnego e-maila
    $user = new WP_User($user_id);
    $user->set_role('customer');
}, 10, 1);
```

### Filtr URL przekierowania

```php
add_filter('polski/email_verification/redirect_url', function (string $url, int $user_id): string {
    return wc_get_page_permalink('myaccount') . 'edit-account/';
}, 10, 2);
```

### Filtr czasu ważności tokenu

```php
add_filter('polski/email_verification/token_expiry', function (int $hours): int {
    return 72; // 72 godziny zamiast domyślnych 48
});
```

### Sprawdzenie statusu weryfikacji

```php
$is_verified = get_user_meta($user_id, '_polski_email_verified', true);

if ($is_verified !== 'yes') {
    // Konto niezweryfikowane
}
```

## Ochrona przed nadużyciami

### Limitowanie ponownych wysyłek

Wtyczka pozwala wysłać link aktywacyjny ponownie maksymalnie 5 razy na godzinę na jeden e-mail. Limit zmienisz w ustawieniach.

### Ochrona tokenów

- Tokeny są generowane przez `wp_generate_password(32, false)` - bezpieczne kryptograficznie
- Każdy token działa tylko raz
- Tokeny wygasają po ustawionym czasie
- WP-Cron automatycznie usuwa wygasłe tokeny

## Najczęstsze problemy

### E-mail aktywacyjny nie dociera

1. Sprawdź folder spam/junk
2. Zweryfikuj konfigurację SMTP (zalecane: WP Mail SMTP lub podobna wtyczka)
3. Sprawdź logi e-maili w **WooCommerce > Status > Logi**
4. Upewnij się, że e-mail nie jest blokowany przez serwer pocztowy

### Link aktywacyjny nie działa

1. Sprawdź, czy link nie wygasł (domyślnie 48 godzin)
2. Zweryfikuj, czy permalink w WordPress jest poprawnie skonfigurowany
3. Sprawdź, czy wtyczka bezpieczeństwa nie blokuje URL z tokenem

### Klient zweryfikował e-mail, ale nie może się zalogować

1. Sprawdź, czy meta `_polski_email_verified` ma wartość `yes` w profilu użytkownika
2. Zweryfikuj, czy inna wtyczka nie blokuje logowania
3. Sprawdź, czy konto nie zostało oznaczone jako spam przez antyspam

## Powiązane zasoby

- [Zgłoś problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
