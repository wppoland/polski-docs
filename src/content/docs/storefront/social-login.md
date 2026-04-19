---
title: Logowanie społecznościowe (social login)
description: Moduł logowania społecznościowego w Polski for WooCommerce - logowanie przez Google i Facebook OAuth2 na stronie konta, zamówienia i logowania WordPress.
---

Logowanie społecznościowe umożliwia klientom rejestrację i logowanie przez konto Google lub Facebook. Eliminuje konieczność tworzenia i zapamiętywania hasła, co przyspiesza proces zakupowy i zwiększa liczbę rejestracji.

## Włączenie modułu

Przejdź do **WooCommerce > Polski > Moduły sklepowe** i włącz **Logowanie społecznościowe**. Następnie skonfiguruj klucze API dla wybranych dostawców (Google, Facebook lub oba).

## Funkcje

- Logowanie i rejestracja przez Google OAuth2
- Logowanie i rejestracja przez Facebook OAuth2
- Przyciski na stronie Moje konto, zamówienia i logowania WordPress
- Automatyczna rejestracja z rolą "Klient" (customer)
- Łączenie kont po adresie e-mail lub identyfikatorze dostawcy
- Bezpieczna obsługa tokenów OAuth2
- Brak przechowywania haseł użytkowników logujących się społecznościowo

## Ustawienia

Konfiguracja w **WooCommerce > Polski > Moduły sklepowe > Logowanie społecznościowe**.

| Ustawienie | Domyślnie | Opis |
|---|---|---|
| `google_enabled` | `false` | Włącz logowanie przez Google |
| `google_client_id` | - | Client ID z Google Cloud Console |
| `google_client_secret` | - | Client Secret z Google Cloud Console |
| `facebook_enabled` | `false` | Włącz logowanie przez Facebook |
| `facebook_app_id` | - | App ID z Meta for Developers |
| `facebook_app_secret` | - | App Secret z Meta for Developers |
| `auto_register` | `true` | Automatycznie twórz konto przy pierwszym logowaniu |

Opcja w bazie danych: `polski_social_login`.

## Konfiguracja dostawców

### Google

1. Przejdź do [Google Cloud Console](https://console.cloud.google.com/)
2. Utwórz nowy projekt lub wybierz istniejący
3. Przejdź do **APIs & Services > Credentials**
4. Kliknij **Create Credentials > OAuth 2.0 Client ID**
5. Typ aplikacji: **Web application**
6. Dodaj autoryzowany URI przekierowania: `https://twojsklep.pl/?polski_social_login=google_callback`
7. Skopiuj **Client ID** i **Client Secret** do ustawień modułu
8. Upewnij się, że **Google+ API** lub **People API** jest włączone w projekcie

### Facebook

1. Przejdź do [Meta for Developers](https://developers.facebook.com/)
2. Utwórz nową aplikację typu **Consumer**
3. W ustawieniach aplikacji przejdź do **Facebook Login > Settings**
4. Dodaj prawidłowy URI przekierowania OAuth: `https://twojsklep.pl/?polski_social_login=facebook_callback`
5. Skopiuj **App ID** i **App Secret** do ustawień modułu
6. Ustaw aplikację w tryb **Live** (nie sandbox)

## Łączenie kont

Moduł łączy konta użytkowników w następujący sposób:

1. **Po adresie e-mail** - jeśli konto WordPress z tym samym adresem e-mail już istnieje, moduł łączy je automatycznie (użytkownik loguje się na istniejące konto)
2. **Po identyfikatorze dostawcy** - jeśli użytkownik logował się wcześniej przez tego samego dostawcę, moduł rozpoznaje go po zapisanym identyfikatorze

Dane dostawcy zapisywane są w `usermeta`:

- `_polski_social_google_id` - identyfikator Google
- `_polski_social_facebook_id` - identyfikator Facebook

## Szczegóły techniczne

### Przepływ OAuth2

1. Klient klika przycisk "Zaloguj przez Google/Facebook"
2. Przekierowanie do strony autoryzacji dostawcy
3. Klient wyraża zgodę na udostępnienie danych
4. Dostawca przekierowuje z powrotem do sklepu z kodem autoryzacji
5. Moduł wymienia kod na token dostępu (po stronie serwera)
6. Moduł pobiera profil użytkownika (imię, e-mail, identyfikator)
7. Użytkownik jest logowany lub rejestrowany

### Bezpieczeństwo

- Tokeny OAuth2 wymieniane są po stronie serwera (nigdy w przeglądarce)
- Parametr `state` chroni przed atakami CSRF
- Nonce WordPress walidowany przy inicjacji logowania
- Client Secret nigdy nie jest eksponowany w kodzie front-end

### Hooki

```php
// Zmień rolę nowo zarejestrowanego użytkownika
add_filter('polski/social_login/default_role', function (): string {
    return 'subscriber'; // domyślnie: 'customer'
});

// Wykonaj akcję po rejestracji przez social login
add_action('polski/social_login/user_registered', function (int $user_id, string $provider): void {
    // Wyślij powitalny e-mail
    wp_mail(
        get_userdata($user_id)->user_email,
        'Witamy w sklepie!',
        'Twoje konto zostało utworzone.'
    );
}, 10, 2);

// Filtruj dane profilu przed zapisaniem
add_filter('polski/social_login/profile_data', function (array $data, string $provider): array {
    return $data;
}, 10, 2);

// Wyłącz automatyczną rejestrację dla wybranego dostawcy
add_filter('polski/social_login/auto_register', function (bool $auto, string $provider): bool {
    if ($provider === 'facebook') {
        return false;
    }
    return $auto;
}, 10, 2);
```

### Klasy CSS

- `.polski-social-login` - kontener przycisków
- `.polski-social-login__button` - przycisk logowania
- `.polski-social-login__button--google` - przycisk Google
- `.polski-social-login__button--facebook` - przycisk Facebook
- `.polski-social-login__separator` - separator "lub"

### ID modułu

`social_login`

## Rozwiązywanie problemów

**Przycisk przekierowuje na stronę błędu dostawcy** - sprawdź, czy URI przekierowania w konsoli dostawcy dokładnie odpowiada adresowi sklepu (uwaga na `https` vs `http` i końcowy slash).

**Użytkownik nie jest tworzony po zalogowaniu** - upewnij się, że `auto_register` jest włączone. Jeśli wyłączone, logowanie działa tylko dla istniejących kont z pasującym adresem e-mail.

**Błąd "invalid_client"** - sprawdź poprawność Client ID i Client Secret. Upewnij się, że nie ma dodatkowych spacji na początku lub końcu.

**Facebook wymaga recenzji aplikacji** - do podstawowego logowania (e-mail, imię) recenzja nie jest wymagana. Jeśli aplikacja jest w trybie sandbox, logować mogą się tylko administratorzy i testerzy dodani w panelu Meta.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
