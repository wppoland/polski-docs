---
title: Zarządzanie zgodami
description: Dokumentacja zaawansowanego zarządzania zgodami w Polski PRO for WooCommerce - wersjonowanie, audit trail, eksport RODO, integracja z Moje konto.
---

Moduł zarządzania zgodami dodaje wersjonowanie zgód, audit trail, eksport danych i integrację z RODO. Śledzi historię zgód klientów i reaguje na zmiany treści regulaminów.

## Wersjonowanie zgód

### Automatyczne wykrywanie zmian

Plugin śledzi treść checkboxów. Przy każdym zapisie ustawień porównuje hash (SHA-256) treści. Gdy treść się zmieni - tworzy nową wersję zgody automatycznie.

Każda wersja zgody zawiera:

- numer wersji (autoinkrementacja)
- hash treści etykiety
- pełną treść etykiety
- datę utworzenia wersji
- ID użytkownika, który dokonał zmiany

### Historia wersji

Kliknij **Historia wersji** przy checkboxie, aby zobaczyć wszystkie wersje z datami i treścią.

### Ponowne wyrażanie zgody

Gdy treść zgody się zmieni, plugin może wymagać ponownej zgody. Ustawienia:

| Ustawienie | Opis |
|------------|------|
| Wymagaj ponownej zgody | Włącza monit o ponowne wyrażenie zgody po zmianie treści |
| Wyświetlaj monit | Na stronie kasy / W panelu Moje konto / Oba |
| Treść komunikatu | Tekst informujący klienta o zmianie regulaminu |

Klient widzi komunikat o zmianie i musi ponownie zaznaczyć checkbox. Wcześniejsza zgoda zostaje w historii.

## Audit trail

### Rejestrowane zdarzenia

Plugin zapisuje wszystkie operacje na zgodach:

| Zdarzenie | Dane |
|-----------|------|
| Zgoda wyrażona | ID użytkownika, ID zgody, wersja, data, IP, user agent |
| Zgoda wycofana | ID użytkownika, ID zgody, data, źródło (klient/admin) |
| Zmiana treści zgody | ID zgody, stara wersja, nowa wersja, data, ID admina |
| Monit o ponowną zgodę | ID użytkownika, ID zgody, data |
| Ponowna zgoda | ID użytkownika, ID zgody, nowa wersja, data |

### Przeglądanie historii

Przejdź do **WooCommerce > Ustawienia > Polski > Moduły PRO > Zgody > Audit trail**. Filtruj zdarzenia po:

- ID użytkownika lub e-mail
- typ zdarzenia
- zakres dat
- konkretna zgoda

### Eksport danych

Eksportuj audit trail w formacie:

- **CSV** - do arkusza kalkulacyjnego
- **JSON** - do przetwarzania programowego

Eksportuj pełną historię lub przefiltrowane wyniki z panelu Audit trail.

## Integracja z panelem Moje konto

### Wycofanie zgody

W **Moje konto** klient widzi sekcję "Moje zgody". Może:

- przeglądać aktualnie wyrażone zgody
- zobaczyć datę wyrażenia każdej zgody
- wycofać zgodę przyciskiem "Wycofaj"

Wycofanie jest zapisywane w audit trail. Administrator dostaje powiadomienie e-mail (konfigurowalne).

### Monit o ponowną zgodę

Gdy treść zgody się zmieni, klient widzi w Moje konto prośbę o zapoznanie się z nową wersją i ponowną zgodę.

## Integracja RODO

### Eksport danych osobowych

Plugin integruje się z eksportem danych WordPress (`wp_privacy_personal_data_exporters`). Przy eksporcie danych klienta dołącza:

- listę wyrażonych zgód z datami i wersjami
- pełną historię zmian zgód (wyrażenia, wycofania, ponowne zgody)
- adresy IP i daty powiązane z każdą zgodą

```php
/**
 * Rejestracja eksportera danych osobowych.
 */
add_filter('wp_privacy_personal_data_exporters', function (array $exporters): array {
    $exporters['polski-pro-consents'] = [
        'exporter_friendly_name' => 'Polski PRO - Zgody',
        'callback'               => [PolskiPro\Privacy\Exporter::class, 'export'],
    ];
    return $exporters;
});
```

### Usuwanie danych osobowych

Plugin integruje się z usuwaniem danych WordPress (`wp_privacy_personal_data_erasers`). Przy usuwaniu danych:

- dane osobowe w audit trail są anonimizowane (IP, user agent)
- wpisy zgód są oznaczane jako usunięte
- sam fakt wyrażenia/wycofania zgody pozostaje (bez danych identyfikujących) dla celów rozliczalności

```php
/**
 * Rejestracja erasera danych osobowych.
 */
add_filter('wp_privacy_personal_data_erasers', function (array $erasers): array {
    $erasers['polski-pro-consents'] = [
        'eraser_friendly_name' => 'Polski PRO - Zgody',
        'callback'             => [PolskiPro\Privacy\Eraser::class, 'erase'],
    ];
    return $erasers;
});
```

## REST API

Moduł udostępnia endpoint REST API do przeglądania zgód (dostępny dla administratorów):

### Lista zgód użytkownika

```
GET /wp-json/polski-pro/v1/consents?user_id={id}
```

Zwraca listę zgód użytkownika z aktualnym statusem i wersją.

### Historia zmian

```
GET /wp-json/polski-pro/v1/consents/audit?user_id={id}
```

Parametry query:

| Parametr | Typ | Opis |
|----------|-----|------|
| `user_id` | int | ID użytkownika |
| `consent_id` | string | ID konkretnej zgody |
| `event_type` | string | Typ zdarzenia (granted, revoked, re_consented) |
| `date_from` | string | Data od (YYYY-MM-DD) |
| `date_to` | string | Data do (YYYY-MM-DD) |
| `per_page` | int | Liczba wyników (domyślnie 50) |

### Eksport

```
GET /wp-json/polski-pro/v1/consents/export?format={csv|json}
```

Zwraca pełny eksport audit trail w wybranym formacie.

## Hooki

### `polski_pro/consent/granted`

Akcja wywoływana po wyrażeniu zgody.

```php
/**
 * @param int    $user_id    ID użytkownika
 * @param string $consent_id ID zgody
 * @param int    $version    Numer wersji zgody
 */
do_action('polski_pro/consent/granted', int $user_id, string $consent_id, int $version);
```

**Przykład:**

```php
add_action('polski_pro/consent/granted', function (int $user_id, string $consent_id, int $version): void {
    // Synchronizacja z zewnętrznym CRM
    if ($consent_id === 'marketing') {
        wp_remote_post('https://crm.example.com/api/consent', [
            'body' => wp_json_encode([
                'email'   => get_userdata($user_id)->user_email,
                'consent' => 'marketing',
                'status'  => 'granted',
                'version' => $version,
            ]),
            'headers' => ['Content-Type' => 'application/json'],
        ]);
    }
}, 10, 3);
```

### `polski_pro/consent/revoked`

Akcja wywoływana po wycofaniu zgody.

```php
/**
 * @param int    $user_id    ID użytkownika
 * @param string $consent_id ID zgody
 * @param string $source     Źródło wycofania (customer, admin)
 */
do_action('polski_pro/consent/revoked', int $user_id, string $consent_id, string $source);
```

**Przykład:**

```php
add_action('polski_pro/consent/revoked', function (int $user_id, string $consent_id, string $source): void {
    if ($consent_id === 'newsletter' && $source === 'customer') {
        // Wypisanie z newslettera
        do_action('newsletter_unsubscribe', get_userdata($user_id)->user_email);
    }
}, 10, 3);
```

## Najczęstsze problemy

### Monit o ponowną zgodę nie wyświetla się

1. Sprawdź, czy opcja "Wymagaj ponownej zgody" jest włączona
2. Zweryfikuj, czy treść zgody faktycznie się zmieniła (sprawdź historię wersji)
3. Wyczyść cache strony kasy i panelu Moje konto

### Eksport RODO nie zawiera danych zgód

1. Upewnij się, że moduł zarządzania zgodami jest aktywny
2. Sprawdź, czy eksporter `polski-pro-consents` jest zarejestrowany w **Narzędzia > Eksport danych osobowych**
3. Zweryfikuj logi pod kątem błędów PHP

### Audit trail rośnie zbyt szybko

Historia zgód jest w osobnej tabeli. Przy wielu klientach może rosnąć. Rozważ:

- regularne eksportowanie i archiwizowanie starszych wpisów
- ustawienie automatycznego czyszczenia wpisów starszych niż określona liczba miesięcy (opcja w ustawieniach)

## Powiązane zasoby

- [Checkboxy prawne](/checkout/legal-checkboxes/)
- [RODO](/compliance/gdpr/)
- [Zgłoś problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
