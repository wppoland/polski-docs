---
title: Własne wyzwalacze
description: Wysyłaj własne zdarzenia dataLayer w Polski for WooCommerce na podstawie adresu URL strony lub kliknięcia, opcjonalnie warunkowane zgodą na daną kategorię.
---

Własne wyzwalacze to opcjonalny moduł, który pozwala wysyłać własne zdarzenia do warstwy danych `window.dataLayer` (tej samej, której używa moduł GA4 DataLayer), gdy spełniony jest prosty warunek na froncie sklepu. Dzięki temu możesz modelować zdarzenia specyficzne dla swojego sklepu, na przykład odwiedziny konkretnej strony lub kliknięcie wybranego przycisku, bez pisania własnego kodu JavaScript.

Każdy wyzwalacz wysyła nazwane zdarzenie (z opcjonalnymi dodatkowymi parametrami), które trafia do tej samej warstwy danych, co zdarzenia GA4. Dalsze przetwarzanie (np. przekazanie do Google Tag Managera, Meta Pixel, TikTok czy Matomo) zależy od Twojej konfiguracji tagów. To narzędzia, które pomagają modelować własne zdarzenia, a nie gwarancja konkretnego efektu prawnego ani analitycznego.

## Włączenie modułu

Moduł jest **domyślnie wyłączony**. Włącz go w **WooCommerce > Polski > Moduły** (klucz modułu `custom_triggers`). Po włączeniu i zdefiniowaniu co najmniej jednego poprawnego wyzwalacza moduł ładuje lekki kontroler na froncie sklepu. Jeśli lista wyzwalaczy jest pusta, żaden skrypt nie jest dodawany. Kontroler nie działa w panelu administracyjnym.

## Jak działają wyzwalacze

Wyzwalacz jest oceniany w przeglądarce odwiedzającego. Dostępne są dwa typy warunków:

| Warunek    | Co wyzwala zdarzenie                                                        |
| ---------- | --------------------------------------------------------------------------- |
| `page_url` | Bieżąca ścieżka lub parametry URL zawierają podany fragment tekstu.          |
| `click`    | Kliknięcie elementu pasującego do podanego selektora CSS.                    |

Każdy wyzwalacz musi mieć ustawioną nazwę zdarzenia, w przeciwnym razie jest pomijany. Jeśli typ warunku nie jest ustawiony na `click`, moduł traktuje go jako `page_url`.

## Ustawienia wyzwalacza

Każdy wiersz na liście wyzwalaczy opisują następujące pola:

| Pole       | Opis                                                                                          |
| ---------- | --------------------------------------------------------------------------------------------- |
| Zdarzenie  | Nazwa zdarzenia wysyłanego do `dataLayer`. Pole wymagane, puste wyzwalacze są pomijane.        |
| Warunek    | `page_url` lub `click`. Domyślnie `page_url`.                                                  |
| Wartość    | Fragment tekstu porównywany ze ścieżką/parametrami URL (dla warunku `page_url`).               |
| Selektor   | Selektor CSS elementu, którego kliknięcie wyzwala zdarzenie (dla warunku `click`).             |
| Kategoria  | Kategoria zgody warunkująca wysłanie zdarzenia. Domyślnie `necessary` (niezbędne).             |
| Parametry  | Opcjonalne dodatkowe parametry zdarzenia (pary klucz-wartość, tylko wartości skalarne).         |

Lista wyzwalaczy przechowywana jest jako zakodowane w JSON dane w opcji `polski_custom_triggers` (klucz `triggers`). Tylko wartości skalarne są zachowywane jako parametry, pozostałe są odrzucane.

## Warunkowanie zgodą

Wysłanie danych do warstwy `dataLayer` jest działaniem first-party, jednak każdemu wyzwalaczowi można przypisać kategorię zgody. Kontroler na froncie wysyła wyzwalacz z przypisaną kategorią dopiero wtedy, gdy odwiedzający udzielił zgody na tę kategorię (zapisanej w pliku cookie zgody). Wyzwalacze w kategorii `necessary` (niezbędne) wysyłane są zawsze.

Kontroler ponownie sprawdza stan zgody po zdarzeniu `polskiConsentChange`, więc zmiana decyzji odwiedzającego (np. akceptacja marketingu w banerze) jest uwzględniana bez przeładowania strony. Dzięki temu możesz na przykład powiązać marketingowe zdarzenie konwersji ze zgodą marketingową.

Jeśli przypisana kategoria nie jest prawidłową kategorią zgody, moduł cofa ją do `necessary`. Nazwy ciasteczka, zdarzenia oraz kategorii niezbędnej kontroler pobiera z modułu Menedżera zgód, więc warunkowanie zgodą działa spójnie z banerem zgody.

Moduł dostarcza narzędzia do warunkowania zdarzeń zgodą, nie stanowi natomiast porady prawnej ani nie gwarancji zgodności z przepisami. Za prawidłowe sklasyfikowanie zdarzeń względem kategorii zgody odpowiada właściciel sklepu.

## Integracja z warstwą danych

Wyzwalacze korzystają z tej samej warstwy `window.dataLayer`, co moduł GA4 DataLayer. Aby zdarzenia były odbierane i dalej przetwarzane, ta warstwa danych musi istnieć na stronie. Sam moduł jedynie wysyła zdarzenia do warstwy, a o ich dalszym losie decyduje Twoja konfiguracja tagów i narzędzi analitycznych.

## Rozwiązywanie problemów

**Zdarzenia nie pojawiają się w dataLayer** - upewnij się, że moduł jest włączony, zdefiniowano co najmniej jeden wyzwalacz z nazwą zdarzenia oraz że na stronie istnieje warstwa `window.dataLayer` (moduł GA4 DataLayer).

**Wyzwalacz `click` nie reaguje** - sprawdź selektor CSS. Musi pasować do istniejącego elementu na stronie.

**Wyzwalacz z kategorią inną niż niezbędna nie działa** - zdarzenie wysłane zostanie dopiero po udzieleniu zgody na przypisaną kategorię. Sprawdź konfigurację Menedżera zgód i decyzję odwiedzającego.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
