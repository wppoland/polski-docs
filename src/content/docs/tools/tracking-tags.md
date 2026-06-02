---
title: Menedżer tagów
description: Ujednolicony, sterowany zgodą menedżer tagów marketingowych i analitycznych w Polski for WooCommerce, w którym wpisujesz własne identyfikatory, a każdy tag uruchamia się dopiero po wyrażeniu zgody.
---

Menedżer tagów to opcjonalny moduł, który w jednym miejscu zarządza popularnymi pikselami marketingowymi i narzędziami analitycznymi. Zamiast wklejać snippety do motywu, włączasz potrzebnych dostawców i podajesz własny identyfikator śledzenia lub domenę. Nic nie jest zaszyte na stałe, a wtyczka nigdy nie wysyła żadnego zapytania HTTP po stronie PHP, każdy tag to mały fragment kodu po stronie przeglądarki dodawany do strony.

Najważniejsze: każdy tag przechodzi przez Menedżer zgód i jest opakowany w element `<script type="text/plain" data-polski-consent="KATEGORIA">`. Skrypt uruchamia się dopiero wtedy, gdy odwiedzający wyrazi zgodę na pasującą kategorię. Piksele reklamowe i remarketingowe są bramkowane kategorią `marketing`, a narzędzia pomiarowe i mapy ciepła kategorią `analytics`.

To są narzędzia, które pomagają ładować tagi firm trzecich w sposób odpowiedzialny. Nie stanowią porady prawnej i same w sobie nie gwarantują zgodności z żadnymi przepisami.

## Włączenie modułu

Moduł jest **domyślnie wyłączony**. Włącz go w **WooCommerce > Polski > Moduły** (sekcja "Menedżer tagów"). Po włączeniu ustawienia poszczególnych dostawców znajdziesz na karcie modułu. Tag danego dostawcy pojawia się na froncie dopiero, gdy spełnione są trzy warunki: moduł jest włączony, dostawca jest zaznaczony oraz wpisany jest jego identyfikator (z wyjątkiem Simple Analytics, który nie wymaga identyfikatora).

## Co nie jest tutaj obsługiwane

GA4 i Google Tag Manager celowo **nie** są obsługiwane w tym module. Są one obsługiwane w module **GA4 DataLayer** razem ze zdarzeniami e-commerce WooCommerce, aby uniknąć podwójnego ładowania tych samych skryptów.

## Obsługiwani dostawcy

Każdy dostawca ma własny przełącznik włącz/wyłącz oraz pole na identyfikator. Kategoria zgody decyduje o tym, kiedy tag może się uruchomić.

### Kategoria marketing

| Dostawca                          | Pole identyfikatora |
| --------------------------------- | ------------------- |
| Meta Pixel                        | Pixel ID            |
| TikTok Pixel                      | Pixel ID            |
| Microsoft Advertising (Bing UET)  | UET Tag ID          |
| LinkedIn Insight                  | Partner ID          |
| Pinterest Tag                     | Tag ID              |
| X / Twitter Ads                   | Pixel ID            |
| Google Ads                        | AW-XXXXXXXXX        |

### Kategoria analytics

| Dostawca          | Pole identyfikatora |
| ----------------- | ------------------- |
| Microsoft Clarity | Project ID          |
| Matomo            | Site ID (oraz adres URL instancji Matomo) |
| Plausible         | Domena (np. example.com) |
| PostHog           | Project API key     |
| Hotjar            | Site ID             |
| Inspectlet        | WID                 |
| Crazy Egg         | Account ID          |
| Simple Analytics  | bez identyfikatora (wystarczy przełącznik) |

## Działanie i kolejność ładowania

- Tagi są wypisywane w nagłówku strony za pomocą `wp_head` (priorytet 20), czyli po Google Consent Mode i module DataLayer.
- Hotjar inicjalizuje się lepiej tuż przed `</body>`, więc jest wypisywany w stopce za pomocą `wp_footer`.
- Tagi nigdy nie są wypisywane w panelu administracyjnym, działają wyłącznie na froncie sklepu.
- Matomo wymaga zarówno Site ID, jak i adresu URL instancji Matomo. Bez adresu URL tag nie zostanie wypisany.
- Crazy Egg wymaga numerycznego Account ID o długości co najmniej 8 cyfr, w przeciwnym razie tag nie zostanie wypisany.

## Bramkowanie zgodą

Bramkowanie zgodą działa razem z modułem **Menedżer zgód**, który dostarcza warstwę zgody i odczytuje wybory odwiedzającego. Dopóki odwiedzający nie wyrazi zgody na kategorię `marketing` lub `analytics`, opakowane skrypty pozostają nieaktywne i nie ładują żadnego kodu firmy trzeciej. Po wyrażeniu zgody odpowiednie tagi zaczynają działać.

Pamiętaj, że poprawna konfiguracja zgody zależy od Twojego kontekstu prawnego. Wtyczka dostarcza mechanizm techniczny, a decyzję o tym, które tagi i kategorie stosujesz, podejmujesz samodzielnie.

## Rozwiązywanie problemów

**Tag się nie pojawia** - sprawdź, czy moduł jest włączony, dostawca zaznaczony, a pole identyfikatora wypełnione. Dla Matomo wymagany jest również adres URL instancji.

**Tag jest w kodzie strony, ale nic nie zlicza** - to oczekiwane zachowanie, dopóki odwiedzający nie wyrazi zgody na pasującą kategorię w Menedżerze zgód. Skrypt typu `text/plain` uruchamia się dopiero po zgodzie.

**Szukam GA4 lub GTM** - są w module GA4 DataLayer, nie tutaj.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
