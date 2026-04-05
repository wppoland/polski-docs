---
title: Zapytania ofertowe (RFQ)
description: Moduł zapytań ofertowych Polski PRO for WooCommerce - zamiana przycisku koszyka na formularz ofertowy, logowanie zgód, panel administracyjny i powiadomienia e-mail.
---

Moduł zapytań ofertowych (Request for Quote) zastępuje standardowy przycisk "Dodaj do koszyka" przyciskiem "Zapytaj o cenę", umożliwiając klientom składanie zapytań ofertowych zamiast bezpośrednich zakupów. Jest to rozwiązanie szczególnie przydatne w sklepach B2B, przy produktach wymagających indywidualnej wyceny lub przy dużych zamówieniach hurtowych.

:::note[Wymagania]
Polski PRO wymaga: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Konfiguracja

Przejdź do **WooCommerce > Ustawienia > Polski PRO > Zapytania ofertowe** i włącz moduł.

### Ustawienia podstawowe

| Ustawienie | Opcja w bazie | Domyślna wartość | Opis |
|------------|---------------|------------------|------|
| Włącz moduł | `polski_quote` | Nie | Aktywuje funkcjonalność zapytań ofertowych |
| Tekst przycisku | `polski_quote_button_text` | "Zapytaj o cenę" | Tekst wyświetlany na przycisku |
| Pokaż na listach | `polski_quote_show_on_loops` | Nie | Wyświetla przycisk zapytania na stronach archiwum i kategorii |
| Wymagaj logowania | `polski_quote_require_login` | Nie | Wymaga zalogowania przed wysłaniem zapytania |
| Zgoda na przetwarzanie | `polski_quote_consent` | Tak | Dodaje checkbox zgody RODO do formularza |

### Pola formularza

Formularz zapytania ofertowego zawiera domyślnie:

- **Imię i nazwisko** - wymagane
- **Adres e-mail** - wymagane, walidacja formatu
- **Telefon** - opcjonalne
- **Ilość** - wymagane, walidacja liczbowa
- **Wiadomość** - opcjonalne, textarea
- **Zgoda RODO** - checkbox, wymagane jeśli włączone

## Działanie na froncie

### Zamiana przycisku

Po włączeniu modułu przycisk "Dodaj do koszyka" zostaje zastąpiony przyciskiem zapytania ofertowego. Dotyczy to:

- Strony pojedynczego produktu
- Stron archiwum i kategorii (jeśli opcja `polski_quote_show_on_loops` jest włączona)
- Widgetów i shortcode'ów produktowych

### Shortcode

Przycisk zapytania ofertowego można umieścić w dowolnym miejscu za pomocą shortcode:

```
[polski_quote_button product_id="123" text="Zapytaj o cenę" class="custom-class"]
```

**Parametry:**

| Parametr | Wymagany | Opis |
|----------|----------|------|
| `product_id` | Nie | ID produktu (domyślnie bieżący produkt) |
| `text` | Nie | Tekst przycisku |
| `class` | Nie | Dodatkowe klasy CSS |

### Wysyłka formularza (AJAX)

Formularz jest wysyłany asynchronicznie (AJAX), bez przeładowania strony. Po wysłaniu klient widzi komunikat potwierdzający z numerem zapytania.

```php
/**
 * Filtruje dane zapytania ofertowego przed zapisem.
 *
 * @param array    $quote_data Dane zapytania
 * @param int      $product_id ID produktu
 * @param \WP_User $user       Obiekt zalogowanego użytkownika lub pusty
 */
apply_filters('polski_pro/quote/before_save', array $quote_data, int $product_id, $user): array;
```

**Przykład - dodanie niestandardowego pola:**

```php
add_filter('polski_pro/quote/before_save', function (array $quote_data, int $product_id, $user): array {
    $quote_data['meta']['company_nip'] = sanitize_text_field($_POST['company_nip'] ?? '');
    return $quote_data;
}, 10, 3);
```

## Logowanie zgód

Każde zapytanie ofertowe zapisuje informację o udzielonych zgodach:

- Znacznik czasu (timestamp) udzielenia zgody
- Adres IP klienta (hashowany SHA-256)
- Treść zgody w momencie udzielenia
- Wersja formularza

Dane te są przechowywane w tabeli `{prefix}_polski_quote_consents` i mogą być eksportowane do celów audytu RODO.

```php
/**
 * Akcja wywoływana po zapisaniu zgody.
 *
 * @param int    $quote_id   ID zapytania ofertowego
 * @param array  $consent    Dane zgody
 * @param string $ip_hash    Zahashowany adres IP
 */
do_action('polski_pro/quote/consent_logged', int $quote_id, array $consent, string $ip_hash);
```

## Panel administracyjny

### Lista zapytań

Zapytania ofertowe są dostępne w menu **WooCommerce > Zapytania ofertowe**. Lista zawiera:

- Numer zapytania
- Dane klienta (imię, e-mail, telefon)
- Produkt i ilość
- Status (nowe, w trakcie, odpowiedziano, zamknięte)
- Data złożenia

### Statusy zapytań

| Status | Opis |
|--------|------|
| `new` | Nowe zapytanie, nieobsłużone |
| `in_progress` | W trakcie przygotowywania oferty |
| `replied` | Oferta wysłana do klienta |
| `accepted` | Klient zaakceptował ofertę |
| `rejected` | Klient odrzucił ofertę |
| `closed` | Zapytanie zamknięte |

### Odpowiadanie na zapytanie

Z poziomu panelu administrator może:

1. Przejrzeć szczegóły zapytania
2. Dodać notatkę wewnętrzną
3. Ustawić cenę ofertową
4. Wysłać odpowiedź e-mail do klienta
5. Przekształcić zapytanie w zamówienie WooCommerce

## Powiadomienia e-mail

Moduł rejestruje następujące szablony e-mail w WooCommerce:

| E-mail | Odbiorca | Wyzwalacz |
|--------|----------|-----------|
| Nowe zapytanie ofertowe | Administrator | Złożenie zapytania przez klienta |
| Potwierdzenie zapytania | Klient | Złożenie zapytania |
| Odpowiedź na zapytanie | Klient | Wysłanie oferty przez administratora |
| Zmiana statusu zapytania | Klient | Zmiana statusu zapytania |

Szablony e-mail można nadpisać w motywie w katalogu `woocommerce/emails/`:

- `polski-pro-quote-new.php`
- `polski-pro-quote-confirmation.php`
- `polski-pro-quote-reply.php`
- `polski-pro-quote-status.php`

## Hooki

### Filtr formularza

```php
/**
 * Filtruje pola formularza zapytania ofertowego.
 *
 * @param array $fields Tablica pól formularza
 * @param int   $product_id ID produktu
 */
apply_filters('polski_pro/quote/form_fields', array $fields, int $product_id): array;
```

**Przykład - dodanie pola NIP:**

```php
add_filter('polski_pro/quote/form_fields', function (array $fields, int $product_id): array {
    $fields['company_nip'] = [
        'type'     => 'text',
        'label'    => 'NIP firmy',
        'required' => false,
        'priority' => 35,
    ];
    return $fields;
}, 10, 2);
```

### Akcja po wysłaniu

```php
/**
 * Akcja wywoływana po zapisaniu zapytania ofertowego.
 *
 * @param int   $quote_id   ID zapytania
 * @param array $quote_data Dane zapytania
 */
do_action('polski_pro/quote/submitted', int $quote_id, array $quote_data);
```

**Przykład - wysyłka do CRM:**

```php
add_action('polski_pro/quote/submitted', function (int $quote_id, array $quote_data): void {
    $crm_api = new MyCrmApi();
    $crm_api->create_lead([
        'name'    => $quote_data['name'],
        'email'   => $quote_data['email'],
        'product' => $quote_data['product_name'],
        'qty'     => $quote_data['quantity'],
    ]);
}, 10, 2);
```

## Rozwiązywanie problemów

**Przycisk "Dodaj do koszyka" nadal się wyświetla**
Sprawdź, czy opcja `polski_quote` jest włączona. Wyczyść cache wtyczek cache'ujących (WP Super Cache, W3 Total Cache, LiteSpeed Cache).

**Formularz nie wysyła się (błąd AJAX)**
Sprawdź konsolę przeglądarki pod kątem błędów JavaScript. Upewnij się, że skrypt `polski-pro-quote.js` jest załadowany. Konflikty z innymi wtyczkami mogą blokować AJAX - wyłącz pozostałe wtyczki, aby zidentyfikować konflikt.

**E-maile nie są wysyłane**
Sprawdź konfigurację e-mail w **WooCommerce > Ustawienia > E-maile**. Upewnij się, że szablony Polski PRO są włączone.

## Dalsze kroki

- Zgłaszaj problemy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Integracja z trybem katalogowym: [Tryb katalogowy B2B](/pro/catalog-mode)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
