---
title: Bezpieczne czcionki
description: Ograniczanie i opóźnianie zewnętrznych żądań do Google Fonts w Polski for WooCommerce, by zmniejszyć przesunięcia układu i wstrzymać arkusz czcionek do czasu zgody.
---

Bezpieczne czcionki to opcjonalny moduł, który zmniejsza i kontroluje zewnętrzne żądania do Google Fonts wysyłane przez Twój motyw lub wtyczki. Działa na każdym arkuszu stylów (`<link>`), którego adres wskazuje na `fonts.googleapis.com`, i oferuje dwa niezależne zachowania, które można włączać osobno: optymalizację ładowania oraz wstrzymanie arkusza do momentu udzielenia zgody.

Moduł dostarcza narzędzia do ograniczania i opóźniania żądań do firm trzecich. Nie jest poradą prawną i sam w sobie nie gwarantuje żadnego konkretnego skutku prawnego. Pełny hosting plików czcionek na własnym serwerze nie wchodzi w zakres tej wersji modułu; moduł ogranicza i kontroluje wywołania zewnętrzne, nie przenosi samych plików.

## Włączenie modułu

Moduł jest **domyślnie wyłączony**. Włącz go w **WooCommerce > Polski > Moduły** (klucz modułu `safe_fonts`). Po włączeniu działa tylko na froncie sklepu; panel administracyjny jest pomijany. Jeśli moduł nie potrafi rozpoznać lub przepisać danego znacznika, zwraca go bez zmian, więc czcionki zawsze działają dalej (łagodna degradacja).

## Tryby działania

| Tryb                       | Co robi                                                                 |
| -------------------------- | ----------------------------------------------------------------------- |
| Optymalizacja              | Dodaje `display=swap` do adresu Google Fonts, jeśli go brakuje, oraz emituje podpowiedzi `preconnect` dla `fonts.googleapis.com` i (z `crossorigin`) `fonts.gstatic.com`. Zmniejsza przesunięcia układu i koszt połączenia, nie zmieniając tego, co jest ładowane. |
| Wstrzymanie do zgody       | Przepisuje znacznik `<link>` Google Fonts na wyłączony zastępczy odnośnik (z prawdziwym adresem w atrybucie `data`). Drobny kontroler ponownie go włącza dopiero, gdy odwiedzający udzieli wybranej kategorii zgody. Do tego czasu żądanie zewnętrzne nie jest wykonywane. |

Oba tryby są niezależne. Możesz włączyć sam jeden, oba naraz lub żaden.

### Optymalizacja

Po włączeniu optymalizacji moduł:

- dopisuje `display=swap` do adresu arkusza Google Fonts, o ile nie ma w nim jawnej wartości `display`. Adresy spoza Google Fonts pozostają nietknięte.
- wypisuje w `<head>` dwie podpowiedzi `preconnect`: dla `https://fonts.googleapis.com` oraz dla `https://fonts.gstatic.com` (z atrybutem `crossorigin`).

To zachowanie nie blokuje żadnych żądań, jedynie zmniejsza przesunięcia układu i koszt nawiązania połączenia.

### Wstrzymanie do zgody

Po włączeniu tego trybu moduł zamienia znacznik Google Fonts na wyłączony arkusz (`disabled`, `media="print"`, `href="about:blank"`), który nie pobiera niczego. Prawdziwy adres trafia do atrybutu `data-polski-safefont`, a wybrana kategoria zgody do `data-polski-consent`. Niewielki kontroler na froncie włącza arkusz dopiero, gdy odwiedzający udzieli skonfigurowanej kategorii zgody, oraz reaguje na zdarzenie `polskiConsentChange` z Menedżera zgód.

Dla pewności zachowywany jest też wariant `<noscript>` z oryginalnym znacznikiem, dzięki czemu czcionki załadują się także przy wyłączonym JavaScript. Kontroler jest dołączany tylko wtedy, gdy w danym żądaniu rzeczywiście wstrzymano jakiś arkusz czcionek.

Tryb ten współpracuje z modułem **Menedżer zgód** (kategoria zgody i zdarzenie zmiany zgody pochodzą z tego modułu). Aby wstrzymywanie miało sens, kategoria zgody musi być realnie egzekwowana po stronie odwiedzającego.

## Ustawienia

Ustawienia znajdują się na karcie modułu w **WooCommerce > Polski > Moduły**.

| Ustawienie               | Domyślnie     | Opis                                                                 |
| ------------------------ | ------------- | -------------------------------------------------------------------- |
| Optymalizacja            | włączone      | Dodaje `display=swap` i podpowiedzi `preconnect` dla hostów Google Fonts. |
| Wstrzymanie do zgody     | wyłączone     | Wstrzymuje arkusz Google Fonts do czasu udzielenia wybranej kategorii zgody. |
| Kategoria zgody          | Preferencje   | Kategoria zgody wymagana do załadowania czcionek przy wstrzymaniu.   |

## Łagodna degradacja

Jeśli znacznik nie da się sparsować lub bezpiecznie zrekonstruować (na przykład nie jest standardowym odnośnikiem `rel="stylesheet"`), moduł zwraca go bez zmian. Oznacza to, że nieobsługiwane przypadki nie psują wyglądu strony, a czcionki ładują się tak jak wcześniej.

## Rozwiązywanie problemów

**Czcionki nie ładują się po włączeniu wstrzymania** - sprawdź, czy odwiedzający udzielił wybranej kategorii zgody i czy moduł Menedżer zgód jest aktywny. Do czasu zgody arkusz pozostaje wyłączony.

**`display=swap` się nie pojawia** - dotyczy wyłącznie adresów wskazujących na `fonts.googleapis.com` i tylko gdy adres nie ma już jawnej wartości `display`.

**Czcionki ładowane lokalnie z motywu nie zmieniają się** - moduł działa tylko na zewnętrznych żądaniach do Google Fonts. Czcionki hostowane lokalnie nie są obsługiwane.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
