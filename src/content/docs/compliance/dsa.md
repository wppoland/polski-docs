---
title: DSA - Akt o usługach cyfrowych
description: Narzędzia DSA (Digital Services Act) w Polski for WooCommerce - formularz zgłoszeń, panel administracyjny, śledzenie statusów i powiadomienia e-mail.
---

Akt o Usługach Cyfrowych (Digital Services Act, Rozporządzenie EU 2022/2065) nakłada na platformy internetowe obowiązek umożliwienia użytkownikom zgłaszania nielegalnych treści. Polski for WooCommerce dostarcza kompletny zestaw narzędzi DSA - formularz zgłoszeniowy, panel administracyjny do zarządzania zgłoszeniami, śledzenie statusów i automatyczne powiadomienia e-mail.

## Wymagania DSA dla sklepów internetowych

Od 17 lutego 2024 roku sklepy internetowe umożliwiające publikowanie treści przez użytkowników (recenzje, komentarze, zdjęcia) muszą:

1. Udostępnić mechanizm zgłaszania nielegalnych treści
2. Potwierdzić otrzymanie zgłoszenia
3. Rozpatrzyć zgłoszenie w rozsądnym terminie
4. Poinformować zgłaszającego o decyzji
5. Umożliwić odwołanie od decyzji

Obowiązek dotyczy sklepów, które pozwalają użytkownikom na publikację treści - przede wszystkim recenzji produktów.

## Formularz zgłoszeniowy

### Shortcode

Osadź formularz zgłoszeniowy DSA na dowolnej stronie za pomocą shortcode:

```
[polski_dsa_report]
```

### Z parametrami

```
[polski_dsa_report product_id="123" category="illegal_content"]
```

### Parametry shortcode

| Parametr | Opis | Domyślna wartość |
|----------|------|------------------|
| `product_id` | ID produktu, którego dotyczy zgłoszenie | Brak (użytkownik wybiera) |
| `category` | Wstępnie wybrana kategoria zgłoszenia | Brak |

![Formularz zgłoszeniowy DSA na stronie sklepu](../../../assets/screenshots/screenshot-6-dsa-report-form.png)

### Pola formularza

Formularz zawiera następujące pola:

- **Kategoria zgłoszenia** - wybór z listy (nielegalna treść, naruszenie praw autorskich, fałszywa recenzja, mowa nienawiści, dane osobowe, inne)
- **URL lub identyfikator treści** - link do zgłaszanej treści lub ID recenzji
- **Opis** - szczegółowy opis problemu
- **Podstawa prawna** - opcjonalne wskazanie przepisu
- **Dane kontaktowe** - imię, adres e-mail zgłaszającego
- **Oświadczenie** - checkbox potwierdzający, że zgłoszenie jest składane w dobrej wierze

### Przykład osadzenia

Stwórz stronę "Zgłoś treść" i dodaj shortcode:

```
[polski_dsa_report]
```

Następnie dodaj link do tej strony w stopce sklepu, aby była łatwo dostępna dla użytkowników.

## Panel administracyjny

Zgłoszenia DSA są zarządzane w panelu WordPress pod **WooCommerce > Zgłoszenia DSA**.

### Lista zgłoszeń

Lista wyświetla wszystkie zgłoszenia z kolumnami:

- ID zgłoszenia
- Data złożenia
- Kategoria
- Status (nowe, w trakcie, rozpatrzone, odrzucone)
- Zgłaszający (imię, e-mail)
- Link do treści

### Szczegóły zgłoszenia

Po kliknięciu zgłoszenia administrator widzi:

- Pełne dane formularza
- Podgląd zgłaszanej treści (jeśli to recenzja - bezpośredni link)
- Historia zmian statusu
- Pole na notatkę wewnętrzną
- Przyciski akcji (zmień status, usuń treść, odrzuć)

### Statusy zgłoszeń

| Status | Opis |
|--------|------|
| `new` | Nowe zgłoszenie, oczekuje na rozpatrzenie |
| `in_progress` | Zgłoszenie w trakcie analizy |
| `resolved` | Zgłoszenie rozpatrzone, treść usunięta lub podjęto inne działanie |
| `rejected` | Zgłoszenie odrzucone jako bezzasadne |
| `appealed` | Zgłaszający złożył odwołanie od decyzji |

## Powiadomienia e-mail

System wysyła automatyczne powiadomienia e-mail w następujących sytuacjach:

| Zdarzenie | Odbiorca | Treść |
|-----------|----------|-------|
| Nowe zgłoszenie | Administrator | Informacja o nowym zgłoszeniu z danymi |
| Potwierdzenie | Zgłaszający | Potwierdzenie otrzymania zgłoszenia z numerem ID |
| Zmiana statusu | Zgłaszający | Informacja o zmianie statusu z uzasadnieniem |
| Rozpatrzenie | Zgłaszający | Decyzja z uzasadnieniem i informacją o prawie do odwołania |

Szablony e-maili można dostosować w **WooCommerce > Ustawienia > E-maile**.

## Hook

### polski/dsa/report_created

Wywoływany po utworzeniu nowego zgłoszenia DSA.

```php
/**
 * @param int    $report_id   ID zgłoszenia DSA.
 * @param array  $report_data Dane zgłoszenia.
 * @param string $category    Kategoria zgłoszenia.
 */
add_action('polski/dsa/report_created', function (int $report_id, array $report_data, string $category): void {
    // Przykład: wyślij powiadomienie do zespołu prawnego przez Slack
    $webhook_url = 'https://hooks.slack.com/services/XXXX/YYYY/ZZZZ';
    
    wp_remote_post($webhook_url, [
        'body' => wp_json_encode([
            'text' => sprintf(
                'Nowe zgłoszenie DSA #%d (kategoria: %s) - %s',
                $report_id,
                $category,
                $report_data['description']
            ),
        ]),
        'headers' => ['Content-Type' => 'application/json'],
    ]);
}, 10, 3);
```

### Przykład - automatyczne usuwanie recenzji o określonej kategorii

```php
add_action('polski/dsa/report_created', function (int $report_id, array $report_data, string $category): void {
    // Automatycznie ukryj recenzje zgłoszone jako mowa nienawiści
    if ($category !== 'hate_speech') {
        return;
    }
    
    $comment_id = $report_data['content_id'] ?? 0;
    if ($comment_id > 0) {
        wp_set_comment_status($comment_id, 'hold');
        
        // Zaloguj automatyczną akcję
        update_post_meta($report_id, '_auto_action', 'comment_held');
    }
}, 10, 3);
```

## Raportowanie

DSA wymaga prowadzenia rejestru zgłoszeń. Wtyczka umożliwia eksport wszystkich zgłoszeń do CSV (**WooCommerce > Zgłoszenia DSA > Eksportuj**). Eksport zawiera:

- ID zgłoszenia
- Data i czas złożenia
- Kategoria
- Status i data rozpatrzenia
- Czas obsługi (w godzinach)
- Podjęte działanie

## Konfiguracja

Ustawienia modułu DSA znajdziesz w **WooCommerce > Ustawienia > Polski > DSA**.

| Opcja | Opis | Domyślna wartość |
|-------|------|------------------|
| Włącz formularz DSA | Aktywuje moduł | Tak |
| Strona formularza | Strona WordPress z shortcode | Brak |
| E-mail administratora | Adres e-mail do powiadomień | E-mail administratora WordPress |
| Termin rozpatrzenia | Liczba dni roboczych na rozpatrzenie | 7 |
| Kategorie zgłoszeń | Lista dostępnych kategorii | Domyślna lista |

## Rozwiązywanie problemów

**Formularz nie wyświetla się na stronie**
Upewnij się, że shortcode `[polski_dsa_report]` jest prawidłowo osadzony na stronie i moduł DSA jest włączony w ustawieniach.

**Powiadomienia e-mail nie docierają**
Sprawdź konfigurację SMTP WordPress. Domyślna funkcja `wp_mail()` może nie działać na wszystkich serwerach. Rozważ instalację wtyczki SMTP (np. WP Mail SMTP).

**Zgłoszenia nie pojawiają się w panelu**
Sprawdź uprawnienia użytkownika. Zarządzanie zgłoszeniami DSA wymaga roli `shop_manager` lub `administrator`.

## Dalsze kroki

- Zgłaszaj problemy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Dyskusje i pytania: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
