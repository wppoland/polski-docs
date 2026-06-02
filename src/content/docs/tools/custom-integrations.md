---
title: Własne integracje
description: Dodawaj własne fragmenty kodu w nagłówku lub stopce sklepu w Polski for WooCommerce, z przypisaną kategorią zgody, które uruchamiają się dopiero po wyrażeniu zgody przez odwiedzającego.
---

Własne integracje to opcjonalny moduł, który pozwala wstawić Twoje własne fragmenty kodu (snippety) do nagłówka lub stopki sklepu. Każdy fragment otrzymuje przypisaną kategorię zgody i jest emitowany przez bramkę Menedżera zgód, więc uruchamia się dopiero wtedy, gdy odwiedzający wyrazi zgodę na daną kategorię. Dzięki temu kody narzędzi takich jak Meta Pixel, TikTok, Matomo czy Google Consent Mode ładują się w sposób respektujący wybór użytkownika.

Kod dostarczasz samodzielnie. Wtyczka nie wykonuje żadnych zapytań HTTP z poziomu PHP i nie zawiera na sztywno żadnych adresów zewnętrznych. To narzędzia, które pomagają odpowiedzialnie ładować Twoje własne snippety, nie stanowią one porady prawnej ani same w sobie nie gwarantują żadnego konkretnego efektu prawnego.

## Włączenie modułu

Moduł jest **domyślnie wyłączony**. Włącz go w **WooCommerce > Polski > Moduły** (sekcja "Własne integracje"). Po włączeniu fragmenty są wstawiane na froncie sklepu, nigdy w panelu administracyjnym. Zarządzanie ustawieniami wymaga uprawnienia `manage_woocommerce`.

## Jak to działa

Każdy fragment jest "bramkowany" przez Menedżer zgód. Zamiast od razu wykonywalnego skryptu, na stronie pojawia się placeholder, który front-end Menedżera zgód zamienia na działający skrypt dopiero po wyrażeniu zgody na pasującą kategorię. Fragmenty z kategorią "Niezbędne" uruchamiają się zawsze.

| Element            | Zachowanie                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------- |
| Miejsce emisji     | Fragmenty z nagłówka trafiają do `wp_head`, ze stopki do `wp_footer` (priorytet 30).        |
| Tylko front        | Fragmenty nigdy nie są wstawiane w panelu administracyjnym.                                  |
| Bramka zgody       | Każdy fragment przechodzi przez bramkę Menedżera zgód i czeka na zgodę dla swojej kategorii. |
| Niezbędne          | Fragmenty z kategorią "Niezbędne" działają zawsze, bez czekania na zgodę.                    |
| Brak ruchu z PHP   | Wtyczka nie wysyła żadnych zapytań HTTP z serwera, ładowany jest wyłącznie Twój kod.         |

## Pola fragmentu

Lista fragmentów jest powtarzalna, możesz dodać dowolną ich liczbę. Każdy wiersz ma następujące pola:

| Pole              | Opis                                                                                          |
| ----------------- | --------------------------------------------------------------------------------------------- |
| Etykieta          | Czytelna nazwa fragmentu, pomaga rozpoznać go na liście. Opcjonalna.                           |
| Umiejscowienie    | `head` (nagłówek) lub `footer` (stopka). Domyślnie stopka.                                     |
| Kategoria zgody   | Kategoria z Menedżera zgód, która musi zostać zaakceptowana, aby fragment się uruchomił. Nierozpoznana wartość jest traktowana jako "Niezbędne". |
| Kod               | Sam fragment kodu. Wiersze z pustym kodem są pomijane.                                          |

### Obsługa kodu

Jeżeli Twój fragment jest opakowany w pojedynczy znacznik `<script>...</script>`, jego wnętrze zostaje wyodrębnione i przekazane do bramki jako treść skryptu. Jeśli wklejasz sam kod JavaScript bez znacznika, jest on traktowany jako ciało skryptu inline. Wszelki kod znajdujący się poza znacznikiem `<script>` jest pomijany, do bramki trafia tylko zawartość skryptu (do momentu wyrażenia zgody placeholder pozostaje typu `text/plain`).

## Ustawienia

Ustawienia znajdują się na karcie modułu w **WooCommerce > Polski > Moduły**. Lista fragmentów jest przechowywana jako jedno powtarzalne ustawienie.

| Ustawienie            | Domyślnie | Opis                                                                 |
| --------------------- | --------- | -------------------------------------------------------------------- |
| Lista fragmentów      | (pusta)   | Powtarzalna lista snippetów (etykieta, umiejscowienie, kategoria, kod). |

## Rozwiązywanie problemów

**Fragment się nie uruchamia** - sprawdź, czy odwiedzający wyraził zgodę na kategorię przypisaną do tego fragmentu. Fragmenty inne niż "Niezbędne" czekają na zgodę. Upewnij się też, że Menedżer zgód jest aktywny.

**Fragment nie pojawia się w kodzie strony** - upewnij się, że pole kodu nie jest puste oraz że moduł jest włączony. Fragmenty nie są wstawiane w panelu administracyjnym, sprawdzaj je na froncie sklepu.

**Część kodu znika** - do bramki trafia wyłącznie zawartość skryptu. Znaczniki i kod spoza pojedynczego `<script>...</script>` są pomijane. Wklej kod JavaScript albo opakuj go w jeden znacznik `<script>`.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
