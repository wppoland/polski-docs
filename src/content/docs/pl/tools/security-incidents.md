---
title: Rejestr incydentów bezpieczeństwa
description: Rejestr incydentów bezpieczeństwa (CRA) w Polski for WooCommerce - rejestrowanie zdarzeń, eksport CSV i zgodność z Cyber Resilience Act.
---

Rejestr incydentów bezpieczeństwa pozwala dokumentować i zarządzać zdarzeniami bezpieczeństwa w sklepie WooCommerce. Funkcja wspiera zgodność z Cyber Resilience Act (CRA) - unijnym rozporządzeniem wymagającym od sprzedawców prowadzenia rejestru incydentów dotyczących produktów z elementami cyfrowymi.

## Czym jest CRA

Cyber Resilience Act (CRA) to rozporządzenie Unii Europejskiej ustanawiające wymagania bezpieczeństwa cybernetycznego dla produktów z elementami cyfrowymi. Sprzedawcy są zobowiązani do:

- Prowadzenia rejestru incydentów bezpieczeństwa
- Raportowania incydentów do organów nadzoru w ciągu 24 godzin
- Informowania klientów o wykrytych lukach bezpieczeństwa
- Dokumentowania działań naprawczych

## Dostęp do rejestru

Przejdź do **WooCommerce > Polski > Narzędzia > Incydenty bezpieczeństwa**. Rejestr dostępny jest dla użytkowników z uprawnieniem `manage_woocommerce`.

## Rejestrowanie incydentu

Kliknij **Dodaj incydent** i wypełnij formularz:

### Pola formularza

| Pole                    | Typ       | Wymagane | Opis                                    |
| ----------------------- | --------- | -------- | --------------------------------------- |
| Tytuł                   | text      | Tak      | Krótki opis incydentu                   |
| Data wykrycia            | datetime  | Tak      | Kiedy incydent został wykryty           |
| Data wystąpienia         | datetime  | Nie      | Kiedy incydent faktycznie miał miejsce  |
| Kategoria               | select    | Tak      | Typ incydentu                           |
| Priorytet               | select    | Tak      | Krytyczny / Wysoki / Średni / Niski     |
| Opis                    | textarea  | Tak      | Szczegółowy opis zdarzenia              |
| Produkty dotknięte       | multiselect| Nie     | Produkty WooCommerce dotknięte incydentem |
| Zakres wpływu           | select    | Tak      | Liczba dotkniętych klientów             |
| Działania podjęte       | textarea  | Nie      | Opis działań naprawczych                |
| Status                  | select    | Tak      | Nowy / W trakcie / Rozwiązany / Zamknięty |
| Osoba odpowiedzialna    | select    | Nie      | Użytkownik WordPress odpowiedzialny     |
| Zgłoszono do organu     | checkbox  | Nie      | Czy incydent zgłoszono do organu nadzoru|
| Data zgłoszenia          | datetime  | Nie      | Kiedy zgłoszono do organu               |
| Klienci powiadomieni    | checkbox  | Nie      | Czy klienci zostali powiadomieni        |
| Data powiadomienia      | datetime  | Nie      | Kiedy klienci zostali powiadomieni      |
| Załączniki              | file      | Nie      | Logi, zrzuty ekranu, raporty           |

### Kategorie incydentów

| Kategoria                | Opis                                         |
| ------------------------ | -------------------------------------------- |
| Wyciek danych            | Nieautoryzowany dostęp do danych osobowych   |
| Złośliwe oprogramowanie  | Malware, skimmer, backdoor                   |
| Atak DDoS                | Atak odmowy usługi                           |
| Nieautoryzowany dostęp   | Włamanie na konto admina lub klienta         |
| Luka w oprogramowaniu    | Odkryta podatność w wtyczce lub motywie      |
| Phishing                 | Atak phishingowy na klientów sklepu          |
| Manipulacja danymi       | Nieautoryzowana zmiana danych (ceny, zamówienia) |
| Inne                     | Inne zdarzenia bezpieczeństwa                |

### Skala wpływu

| Zakres                  | Opis                                          |
| ----------------------- | --------------------------------------------- |
| Brak wpływu             | Incydent wykryty i zablokowany                |
| Pojedynczy klient       | Dotyczy 1 klienta                             |
| Kilku klientów          | Dotyczy 2-10 klientów                         |
| Wielu klientów          | Dotyczy 11-100 klientów                       |
| Masowy                  | Dotyczy ponad 100 klientów                    |

## Lista incydentów

Rejestr wyświetla tabelę wszystkich incydentów z kolumnami:

- **ID** - numer incydentu
- **Data** - data wykrycia
- **Tytuł** - krótki opis
- **Kategoria** - typ incydentu
- **Priorytet** - kolorowa etykieta (czerwony/pomarańczowy/żółty/szary)
- **Status** - aktualny stan
- **Odpowiedzialny** - przypisana osoba
- **Zgłoszenie** - czy zgłoszono do organu nadzoru

### Filtrowanie i sortowanie

Lista pozwala filtrować incydenty po:
- Kategorii
- Priorytecie
- Statusie
- Dacie (zakres dat)
- Osobie odpowiedzialnej

Sortowanie po każdej kolumnie (rosnąco/malejąco).

### Wyszukiwanie

Pole wyszukiwania przeszukuje tytuł i opis incydentów.

## Linia czasu incydentu (timeline)

Każdy incydent ma linię czasu dokumentującą chronologię działań:

```
2025-06-15 08:30 - Incydent wykryty przez system monitoringu
2025-06-15 08:45 - Incydent przypisany do Jana Kowalskiego
2025-06-15 09:00 - Rozpoczęto analizę logów
2025-06-15 10:30 - Zidentyfikowano źródło - nieautoryzowany dostęp przez podatność w wtyczce X
2025-06-15 11:00 - Wtyczka X zaktualizowana do najnowszej wersji
2025-06-15 11:30 - Hasła wszystkich administratorów zmienione
2025-06-15 12:00 - Incydent zgłoszony do UODO
2025-06-15 14:00 - Powiadomienie wysłane do dotkniętych klientów
2025-06-15 15:00 - Status zmieniony na "Rozwiązany"
```

Wpisy w linii czasu dodawane są automatycznie (zmiana statusu, przypisanie) oraz ręcznie (notatki, działania).

## Eksport CSV

Kliknij **Eksportuj CSV** nad tabelą incydentów. Eksport zawiera:

### Kolumny eksportu

| Kolumna                 | Opis                                |
| ----------------------- | ----------------------------------- |
| `incident_id`           | Numer incydentu                     |
| `title`                 | Tytuł                               |
| `detection_date`        | Data wykrycia                       |
| `occurrence_date`       | Data wystąpienia                    |
| `category`              | Kategoria                           |
| `priority`              | Priorytet                           |
| `description`           | Opis                                |
| `affected_products`     | ID dotkniętych produktów            |
| `impact_scope`          | Zakres wpływu                       |
| `actions_taken`         | Działania podjęte                   |
| `status`                | Status                              |
| `responsible_person`    | Osoba odpowiedzialna                |
| `reported_to_authority` | Czy zgłoszono do organu             |
| `report_date`           | Data zgłoszenia                     |
| `customers_notified`    | Czy klienci powiadomieni            |
| `notification_date`     | Data powiadomienia                  |
| `resolution_date`       | Data rozwiązania                    |

### Filtrowanie eksportu

Eksport można ograniczyć do:
- Wybranego zakresu dat
- Wybranej kategorii
- Wybranego statusu

```php
// Hook do modyfikacji danych eksportu
add_filter('polski/security_incidents/export_data', function (array $data): array {
    // Dodanie własnej kolumny
    foreach ($data as &$row) {
        $row['custom_field'] = 'wartość';
    }
    return $data;
});
```

## Powiadomienia

System wysyła automatyczne powiadomienia:

| Zdarzenie                          | Odbiorcy                | Kanał  |
| ---------------------------------- | ----------------------- | ------ |
| Nowy incydent krytyczny            | Wszyscy administratorzy | E-mail |
| Zmiana statusu incydentu           | Osoba odpowiedzialna    | E-mail |
| Incydent bez działań > 24h         | Osoba odpowiedzialna    | E-mail |
| Zbliżający się termin zgłoszenia   | Administratorzy         | E-mail |

Konfiguracja powiadomień: **WooCommerce > Polski > Narzędzia > Incydenty > Powiadomienia**.

## Automatyczne wykrywanie

Moduł może automatycznie rejestrować niektóre zdarzenia:

- **Nieudane logowania** - seria nieudanych prób logowania (brute force)
- **Zmiana plików rdzenia** - modyfikacja plików WordPress core
- **Nowy użytkownik admin** - utworzenie konta z rolą administratora
- **Zmiana uprawnień** - podwyższenie uprawnień istniejącego konta

Automatycznie wykryte zdarzenia rejestrowane są z kategorią i priorytetem, ale wymagają ręcznej weryfikacji (status "Nowy").

```php
// Wyłączenie automatycznego wykrywania
add_filter('polski/security_incidents/auto_detect', '__return_false');
```

## Programowe dodawanie incydentów

```php
do_action('polski/security_incidents/create', [
    'title'          => 'Wykryto próbę SQL injection',
    'category'       => 'unauthorized_access',
    'priority'       => 'high',
    'description'    => 'Wykryto próbę SQL injection w parametrze product_id.',
    'detection_date' => current_time('mysql'),
    'status'         => 'new',
]);
```

## Rozwiązywanie problemów

**Powiadomienia nie docierają** - sprawdź konfigurację e-mail WordPressa. Zalecane jest użycie wtyczki SMTP (np. WP Mail SMTP) zamiast domyślnej funkcji `wp_mail()`.

**Eksport CSV zwraca pusty plik** - sprawdź filtrowanie. Jeśli filtry są ustawione zbyt restrykcyjnie, wynik może być pusty.

**Automatyczne wykrywanie generuje za dużo alertów** - dostosuj progi w ustawieniach modułu. Domyślny próg dla nieudanych logowań to 5 w ciągu 15 minut - może być za niski dla sklepów z dużą liczbą użytkowników.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
