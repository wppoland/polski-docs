---
title: AI Bridge
description: Most AI dla Polski for WooCommerce - tylko do odczytu zdolności (abilities) handlowe i zgodnościowe przez WordPress Abilities API 6.9 oraz asystowane przez AI szkice podsumowań produktów i tekstów bezpieczeństwa GPSR przez AI Client 7.0.
---

AI Bridge to opcjonalny moduł, który udostępnia dane Twojego sklepu asystentom AI i narzędziom w sposób kontrolowany. Składa się z dwóch części. Pierwsza to zestaw zdolności (abilities) **tylko do odczytu** zarejestrowanych w **WordPress Abilities API (WP 6.9+)**, dzięki czemu paleta poleceń edytora witryny, serwery MCP i asystenci AI mogą czytać te same fakty, które widzi administrator. Druga to dwie funkcje wspierane przez AI w panelu: podsumowanie produktu oraz **szkic** tekstów bezpieczeństwa GPSR, korzystające z **WordPress AI Client (WP 7.0+)** przez dostawcę skonfigurowanego w witrynie.

Moduł niczego nie zmienia automatycznie. Zdolności wyłącznie czytają dane, a funkcje AI tworzą propozycje do przeglądu, nigdy nie nadpisując pól wymagających ręcznej autoryzacji. Wtyczka nigdy nie przechowuje klucza dostawcy AI. To narzędzie pomocnicze, nie porada prawna ani gwarancja zgodności.

## Włączenie modułu

Moduł jest **domyślnie wyłączony**. Włącz go w **WooCommerce > Polski > Moduły** (sekcja "AI Bridge", klucz modułu `ai_bridge`). Po włączeniu:

- na WordPress 6.9+ rejestrowane są zdolności handlowe (gdy Abilities API jest dostępne); na starszym WordPress moduł działa bez błędu, po prostu pomija rejestrację,
- funkcje AI (podsumowanie produktu, szkic GPSR) stają się dostępne tylko wtedy, gdy w witrynie skonfigurowano dostawcę AI obsługującego generowanie tekstu (przez WP AI Client / konektor, np. Anthropic, Google, OpenAI, Vercel AI Gateway). Bez skonfigurowanego dostawcy funkcje te po prostu się nie aktywują, a deterministyczny kanał AI Feed pozostaje nienaruszony.

## Zdolności handlowe (tylko do odczytu)

Wszystkie zdolności należą do kategorii `polski-commerce`, są oznaczone jako `readonly` i `show_in_rest`, oraz chronione kontrolą uprawnienia WooCommerce `manage_woocommerce`. Każda jest podpięta do istniejącej usługi wtyczki, więc nie powiela logiki. Nic nie jest zmieniane.

| Zdolność (id)                       | Co zwraca                                                                                          | Wejście              |
| ----------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------- |
| `polski/get-omnibus-history`        | Historia cen i najniższa zanotowana cena produktu (jak w prezentacji wg dyrektywy Omnibus).        | `product_id`         |
| `polski/get-gpsr-data`              | Dane bezpieczeństwa produktu (GPSR): producent, importer, osoba odpowiedzialna, identyfikator, ostrzeżenia, instrukcje. | `product_id`         |
| `polski/list-products-missing-gpsr` | Opublikowane produkty, którym brakuje jednego lub więcej pól GPSR, aby znaleźć i uzupełnić luki.    | `limit` (1-200), `offset` |
| `polski/get-compliance-status`      | Wynik heurystycznych kontroli skonfigurowanych stron prawnych (Regulamin, Prywatność, Zwroty, Reklamacje) z oceną. | `page_type` (opcjonalnie) |
| `polski/get-store-health`           | Najnowszy snapshot kondycji sklepu (status ogólny oraz czujniki błędów, płatności i sprzedaży).    | (brak)               |
| `polski/get-product-facts`          | Ustrukturyzowana lista faktów o produkcie (pary etykieta/wartość) udostępniana przez AI Feed: SKU, GTIN, cena, kategorie, czas dostawy i inne. | `product_id`         |

Każde wywołanie przechodzi przez `permission_callback` sprawdzający `manage_woocommerce`. Użytkownik bez tego uprawnienia nie otrzyma danych. Zdolności są dostępne przez REST (`/wp-json/wp-abilities/v1/...`), gdy Abilities API jest aktywne.

## Podsumowanie produktu (AI)

Generowane na żądanie administratora podsumowanie faktograficzne produktu. Działa tylko, gdy moduł jest włączony i skonfigurowano dostawcę AI obsługującego tekst. Nic nie powstaje przy ładowaniu strony.

| Aspekt              | Zachowanie                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| Źródło danych       | Nazwa, krótki i długi opis produktu oraz lista faktów AI Feed - tylko dane już publikowane przez sklep. |
| Model               | Instruowany, by korzystać wyłącznie z podanych faktów, nie wymyślać specyfikacji ani cen, bez sformułowań marketingowych i bez deklaracji prawnych. |
| Długość             | Krótkie, 1-3 zdania; zapis ograniczony do 600 znaków.                                            |
| Zapis               | Przechowywane w meta produktu (`_polski_ai_summary`) wyłącznie po jawnym uruchomieniu przez administratora. |
| Brak dostawcy       | Funkcja jest niedostępna; nic się nie dzieje, a pozostałe ścieżki działają bez zmian.            |

## Szkic tekstów bezpieczeństwa GPSR (AI)

Pomocnik tworzący **szkic** ostrzeżeń bezpieczeństwa i instrukcji użytkowania produktu jako punkt wyjścia do ręcznej weryfikacji. To wsparcie redakcyjne, nie porada prawna ani gwarancja zgodności.

| Aspekt              | Zachowanie                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| Źródło danych       | Publiczny opis produktu oraz już wprowadzone (przez człowieka) pola GPSR, aby szkic nie przeczył istniejącym danym. |
| Model               | Instruowany, by używać wyłącznie podanych faktów, nie wymyślać zagrożeń ani certyfikatów oraz nie sugerować zgodności prawnej. |
| Zapis               | Wyłącznie do osobnego, jednoznacznie nazwanego meta szkicu (`_polski_ai_gpsr_draft`). **Nigdy** nie nadpisuje prawdziwych pól GPSR. |
| Przegląd            | Administrator musi przeczytać szkic i ręcznie przenieść treść do właściwych pól po weryfikacji. Każdy szkic zawiera notatkę, że jest tylko do przeglądu i nie stanowi gwarancji zgodności. |
| Długość             | Każde pole szkicu ograniczone do 1500 znaków.                                                    |

## Prywatność i klucze

Wtyczka **nigdy nie przechowuje klucza dostawcy AI** i sama nie wykonuje żądań sieciowych do dostawcy. Poświadczenia oraz wywołanie sieciowe należą do konektora AI skonfigurowanego w WordPress (model "przynieś własny klucz"). Do modelu trafiają wyłącznie dane, które sklep i tak już publikuje lub przechowuje.

## Rozwiązywanie problemów

**Zdolności nie pojawiają się** - upewnij się, że masz WordPress 6.9+ z aktywnym Abilities API oraz że moduł AI Bridge jest włączony. Na starszym WordPress rejestracja jest pomijana bez błędu.

**Funkcje AI są wyszarzone** - skonfiguruj dostawcę AI obsługującego generowanie tekstu przez WP AI Client / konektor. Bez dostawcy podsumowanie i szkic GPSR pozostają nieaktywne.

**Brak danych ze zdolności** - sprawdź, czy bieżący użytkownik ma uprawnienie `manage_woocommerce`.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
