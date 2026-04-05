---
title: Panel zgodności (compliance dashboard)
description: Panel kontroli wymogów prawnych w Polski for WooCommerce - lista kontrolna z kolorowym statusem dla każdego wymagania.
---

Panel zgodności to centralne miejsce do sprawdzania wymogów prawnych sklepu. Wyświetla listę kontrolną ze statusem każdego wymagania - od regulaminu po GPSR i DSA.

## Dostęp do panelu

Przejdź do **WooCommerce > Polski > Panel zgodności**. Wymaga uprawnienia `manage_woocommerce` (Administrator lub Menedżer sklepu).

## Lista kontrolna (checklist)

Wymagania prawne pogrupowane w kategorie. Każde ma status wizualny:

### Statusy

| Status | Kolor   | Ikona | Opis                                      |
| ------ | ------- | ----- | ----------------------------------------- |
| OK     | Zielony | ✓     | Wymaganie spełnione                       |
| WARN   | Żółty   | !     | Częściowo spełnione, wymaga uwagi         |
| FAIL   | Czerwony| ✗     | Niespełnione, wymaga natychmiastowej akcji |
| OFF    | Szary   | -     | Moduł wyłączony                           |

### Kategoria: strony prawne

| Sprawdzenie                          | Status zielony gdy                      |
| ------------------------------------ | --------------------------------------- |
| Regulamin sklepu                     | Strona opublikowana i przypisana        |
| Polityka prywatności                 | Strona opublikowana i przypisana        |
| Informacja o odstąpieniu od umowy    | Strona opublikowana z formularzem       |
| Polityka cookies                     | Strona opublikowana                     |
| Informacja o dostawie i płatnościach | Strona opublikowana                     |

### Kategoria: checkboxy prawne

| Sprawdzenie                          | Status zielony gdy                      |
| ------------------------------------ | --------------------------------------- |
| Akceptacja regulaminu (kasa)         | Checkbox aktywny i wymagany             |
| Polityka prywatności (kasa)          | Checkbox aktywny i wymagany             |
| Akceptacja regulaminu (rejestracja)  | Checkbox aktywny i wymagany             |
| Zgoda marketingowa                   | Checkbox aktywny (opcjonalny)           |

### Kategoria: dyrektywa Omnibus

| Sprawdzenie                          | Status zielony gdy                      |
| ------------------------------------ | --------------------------------------- |
| Moduł Omnibus aktywny               | Moduł włączony w ustawieniach           |
| Historia cen zapisywana              | Tabela historii cen istnieje i działa   |
| Najniższa cena wyświetlana           | Cena widoczna na produktach w promocji  |
| Okres 30 dni                         | Ustawiony okres co najmniej 30 dni      |

### Kategoria: GPSR

| Sprawdzenie                          | Status zielony gdy                      |
| ------------------------------------ | --------------------------------------- |
| Moduł GPSR aktywny                  | Moduł włączony                          |
| Dane producenta uzupełnione          | Co najmniej 80% produktów ma dane GPSR  |
| Dane przedstawiciela                 | Uzupełnione dla produktów spoza UE      |
| Informacje o bezpieczeństwie         | Uzupełnione dla produktów wymagających  |

### Kategoria: DSA (Digital Services Act)

| Sprawdzenie                          | Status zielony gdy                      |
| ------------------------------------ | --------------------------------------- |
| Formularz zgłoszeń DSA              | Formularz dostępny na stronie           |
| Punkt kontaktowy DSA                 | E-mail kontaktowy ustawiony             |
| Rejestr zgłoszeń                     | Tabela zgłoszeń istnieje                |

### Kategoria: kasa

| Sprawdzenie                          | Status zielony gdy                      |
| ------------------------------------ | --------------------------------------- |
| Etykieta przycisku zamówienia        | Tekst zgodny z dyrektywą UE             |
| Podsumowanie zamówienia              | Widoczne przed przyciskiem zapłaty      |
| Informacja o VAT i dostawie          | Wyświetlana przy cenach produktów       |

### Kategoria: KSeF

| Sprawdzenie                          | Status zielony gdy                      |
| ------------------------------------ | --------------------------------------- |
| Moduł KSeF aktywny                  | Moduł włączony                          |
| NIP firmy ustawiony                  | NIP skonfigurowany w ustawieniach       |
| Połączenie z KSeF                    | Test połączenia zakończony sukcesem     |

### Kategoria: greenwashing

| Sprawdzenie                          | Status zielony gdy                      |
| ------------------------------------ | --------------------------------------- |
| Moduł anty-greenwashing aktywny     | Moduł włączony                          |
| Oświadczenia z dowodami              | Wszystkie oświadczenia mają uzasadnienie|
| Certyfikaty z linkami                | Certyfikaty mają numery i URL-e         |

## Podsumowanie

Na górze panelu widoczne jest podsumowanie:

- **Ogólny wynik** - procent spełnionych wymagań (np. 85%)
- **Pasek postępu** - wizualna reprezentacja wyniku
- **Wymagania krytyczne** - liczba niespełnionych wymagań FAIL
- **Ostrzeżenia** - liczba częściowo spełnionych wymagań WARN
- **Data ostatniego sprawdzenia** - kiedy panel był ostatnio odświeżony

## Szczegóły wymagania

Kliknij wymaganie, aby zobaczyć szczegóły:

- **Opis** - co dokładnie jest sprawdzane
- **Podstawa prawna** - odniesienie do przepisu
- **Status** - szczegółowy opis stanu
- **Zalecane działanie** - co należy zrobić aby spełnić wymaganie
- **Link do ustawień** - bezpośredni link do odpowiedniej strony ustawień

## Odświeżanie statusów

Panel sprawdza statusy na żywo przy każdym otwarciu. Sprawdzenia obejmują:

- Istnienie i status stron (opublikowana / szkic / usunięta)
- Istnienie i konfigurację checkboxów
- Poprawność danych w meta produktów (sampling - losowa próba 100 produktów)
- Działanie modułów (aktywność, poprawność konfiguracji)
- Testy połączeń z zewnętrznymi API (KSeF)

## Eksport raportu

Eksportuj raport zgodności:

- **PDF** - raport do pobrania lub wydruku
- **JSON** - dane maszynowo czytelne (np. dla systemu monitoringu)

```php
// Hook po wygenerowaniu raportu
add_action('polski/compliance/report_generated', function (array $results, string $format): void {
    // Logowanie daty generowania raportu
    update_option('polski_last_compliance_report', current_time('mysql'));
}, 10, 2);
```

## Powiadomienia

Panel wysyła powiadomienia e-mail do administratora:

- **Tygodniowy raport** - podsumowanie statusów wysyłane raz w tygodniu
- **Alert krytyczny** - natychmiastowe powiadomienie gdy status zmieni się na FAIL

Konfiguracja powiadomień: **WooCommerce > Polski > Panel zgodności > Powiadomienia**.

```php
// Zmiana częstotliwości raportu
add_filter('polski/compliance/report_frequency', function (): string {
    return 'daily'; // 'daily', 'weekly', 'monthly'
});
```

## Filtr wymagań

Możesz dodać własne sprawdzenia do panelu:

```php
add_filter('polski/compliance/checks', function (array $checks): array {
    $checks[] = [
        'id'       => 'custom_ssl',
        'category' => 'security',
        'label'    => 'Certyfikat SSL',
        'callback' => function (): array {
            $is_ssl = is_ssl();
            return [
                'status'  => $is_ssl ? 'ok' : 'fail',
                'message' => $is_ssl ? 'SSL aktywny' : 'Brak certyfikatu SSL',
            ];
        },
    ];
    return $checks;
});
```

## Rozwiązywanie problemów

**Panel pokazuje przestarzałe dane** - kliknij **Odśwież** na górze panelu. Niektóre dane (np. GPSR sampling) mogą być cachowane.

**Status FAIL dla strony prawnej** - sprawdź, czy strona jest opublikowana (nie szkic) i przypisana w **WooCommerce > Ustawienia > Zaawansowane > Ustawienia strony**.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
