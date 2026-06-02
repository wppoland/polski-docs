---
title: Menedżer zgód
description: Natywny baner zgód na pliki cookie z kategoriami, obsługą Google Consent Mode v2, warunkowym ładowaniem skryptów i iframe oraz rejestrem zgód z eksportem CSV w Polski for WooCommerce.
---

Menedżer zgód to opcjonalny moduł, który dodaje do sklepu natywny baner zgód na pliki cookie z kategoriami, sygnałami Google Consent Mode v2 oraz rejestrem podjętych decyzji. Inne moduły mogą "bramkować" swoje skrypty i ramki iframe, tak aby uruchamiały się dopiero po wyrażeniu odpowiedniej zgody przez odwiedzającego.

Moduł dostarcza narzędzia, które pomagają zbierać i respektować wybory dotyczące zgód. Nie gwarantuje sam w sobie żadnego konkretnego skutku prawnego i nie zastępuje porady prawnej.

## Włączenie modułu

Moduł jest **domyślnie wyłączony**. Włącz go w **WooCommerce > Polski > Moduły** (sekcja "Menedżer zgód", klucz modułu `consent_manager`). Po włączeniu baner pojawia się w stopce sklepu, a w panelu udostępniony zostaje widok **Rejestr zgód**. Widok ten oraz eksport CSV wymagają uprawnienia `manage_woocommerce`.

## Kategorie zgód

Baner korzysta ze stałego zestawu kategorii. Kategoria "Konieczne" jest zawsze włączona i nie można jej wyłączyć. Pozostałe trzy są opcjonalne i odwiedzający może je włączyć lub wyłączyć.

| Kategoria   | Klucz         | Domyślnie | Opis                                                              |
| ----------- | ------------- | --------- | ----------------------------------------------------------------- |
| Konieczne   | `necessary`   | zawsze on | Wymagane do działania sklepu. Zawsze przyznana, nie da się wyłączyć. |
| Analityka   | `analytics`   | włączona  | Pomiar ruchu i statystyki.                                        |
| Marketing   | `marketing`   | włączona  | Reklamy i remarketing.                                            |
| Preferencje | `preferences` | włączona  | Personalizacja i funkcje zapamiętujące wybory.                    |

Domyślnie wszystkie trzy opcjonalne kategorie są aktywne w banerze. Każdą z nich możesz wyłączyć w ustawieniach modułu, jeśli sklep z niej nie korzysta.

## Google Consent Mode v2

Gdy obsługa Google Consent Mode jest włączona (domyślnie), moduł wypisuje stan domyślny zgód jeszcze przed kodem gtag/GTM (w `wp_head` z priorytetem 0). Wszystkie sygnały startują jako **odmówione** (`denied`), z wyjątkiem `security_storage`, a następnie są natychmiast aktualizowane na podstawie zapisanego ciasteczka, jeśli odwiedzający już dokonał wyboru. Dzięki temu gtag/GTM widzą właściwy stan od pierwszego wywołania.

Kategorie banera mapują się na sygnały Consent Mode następująco:

| Kategoria   | Sygnały Consent Mode v2                                  |
| ----------- | -------------------------------------------------------- |
| Analityka   | `analytics_storage`                                      |
| Marketing   | `ad_storage`, `ad_user_data`, `ad_personalization`       |
| Preferencje | `functionality_storage`, `personalization_storage`       |

Po dokonaniu wyboru przez odwiedzającego baner wywołuje `gtag('consent', 'update', ...)` z aktualnym stanem.

## Warunkowe ładowanie skryptów i iframe

Moduł udostępnia kontrakt, który pozwala innym modułom uruchamiać skrypty i ramki iframe dopiero po przyznaniu odpowiedniej kategorii. Bramkowany kod jest renderowany jako `<script type="text/plain" data-polski-consent="KATEGORIA">`, więc przeglądarka nie wykonuje go przy wczytaniu strony. Kontroler frontendu zamienia go na wykonywalny skrypt dopiero wtedy, gdy kategoria jest przyznana (od razu, jeśli pozwala na to ciasteczko, albo po zdarzeniu `polskiConsentChange`).

Po zmianie wyboru baner:

- zapisuje ciasteczko `polski_consent` z listą przyznanych kategorii,
- wywołuje `gtag('consent', 'update', ...)`,
- emituje zdarzenie okna `polskiConsentChange`, na które reagują bramkowane skrypty,
- wysyła decyzję do rejestratora REST.

## Rejestr zgód

Każda decyzja zapisana z banera trafia do rejestru zgód. To widok tylko do odczytu, dostępny w panelu, gdy moduł jest włączony, służący do dokumentowania wyborów odwiedzających. Rejestr nie zastępuje porady prawnej.

| Kolumna           | Opis                                                      |
| ----------------- | --------------------------------------------------------- |
| Data              | Data i godzina zapisanej decyzji.                         |
| Kategoria         | Kategoria, której dotyczy decyzja.                        |
| Decyzja           | "Przyznano" lub "Odmówiono".                              |
| Użytkownik        | ID użytkownika albo "Gość" dla niezalogowanych.           |
| Adres IP          | Adres IP odwiedzającego (jeśli dostępny).                 |
| Wersja treści     | Skrót treści banera, którą odwiedzający faktycznie widział. |

Każdy zapisany wybór jest powiązany z wersją treści banera (skrótem nagłówka, tekstu i listy kategorii), dzięki czemu wiadomo, jakie dokładnie brzmienie odwiedzający zaakceptował.

### Eksport CSV

Przycisk **Eksportuj CSV** pobiera pełny rejestr jako plik CSV. Eksport zawiera kolumny: `id`, `created_at`, `category`, `granted`, `user_id`, `ip_address`, `user_agent`, `consent_version`. Eksport wymaga uprawnienia `manage_woocommerce` i jest chroniony nonce.

## Ustawienia

Ustawienia znajdują się na karcie modułu w **WooCommerce > Polski > Moduły**.

| Ustawienie                  | Domyślnie              | Opis                                                          |
| --------------------------- | ---------------------- | ------------------------------------------------------------- |
| Kategoria: Analityka        | włączona               | Czy kategoria analityki jest pokazywana w banerze.            |
| Kategoria: Marketing        | włączona               | Czy kategoria marketingu jest pokazywana w banerze.           |
| Kategoria: Preferencje      | włączona               | Czy kategoria preferencji jest pokazywana w banerze.          |
| Nagłówek                    | (puste)                | Opcjonalny nagłówek banera.                                   |
| Treść banera                | tekst domyślny         | Główny tekst banera (dopuszcza podstawowy HTML).              |
| Etykieta "Akceptuj wszystko"| "Accept all"           | Tekst przycisku akceptacji wszystkiego.                       |
| Etykieta "Odrzuć wszystko"  | "Reject all"           | Tekst przycisku odrzucenia opcjonalnych kategorii.            |
| Etykieta "Zarządzaj"        | "Manage"               | Tekst przycisku otwierającego wybór kategorii.                |
| Etykieta "Zapisz wybory"    | "Save choices"         | Tekst przycisku zapisu wybranych kategorii.                   |
| Pozycja                     | dół                    | Położenie banera: góra, dół lub środek.                       |
| Google Consent Mode         | włączony               | Czy wypisywać sygnały Google Consent Mode v2.                 |

## Rozwiązywanie problemów

**Baner się nie pojawia** - upewnij się, że moduł jest włączony w **WooCommerce > Polski > Moduły** i że motyw wywołuje `wp_footer()`. Baner jest renderowany w stopce.

**Tagi Google nie reagują na zgodę** - sprawdź, czy opcja Google Consent Mode jest włączona oraz czy kod gtag/GTM ładuje się po sygnałach Consent Mode (wypisywane są bardzo wcześnie w `wp_head`).

**Bramkowany skrypt nie uruchamia się** - skrypt startuje dopiero po przyznaniu odpowiedniej kategorii. Zweryfikuj, że odwiedzający przyznał kategorię oraz że skrypt został wyemitowany przez kontrakt bramkowania.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
