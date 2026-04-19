---
title: Checklist zgodnosci Polityki Prywatnosci i Regulaminu
description: Automatyczny audyt strukturalny stron prawnych sklepu - sprawdzenie elementow wymaganych przez RODO Art. 13 oraz Ustawe o swiadczeniu uslug droga elektroniczna.
---

Modul **Checklist zgodnosci** skanuje dwie kluczowe strony prawne sklepu (Polityka Prywatnosci i Regulamin) i raportuje, czy zawieraja one elementy wymagane przez prawo. To heurystyka strukturalna, nie porada prawna - ale pomaga szybko zlokalizowac brakujace akapity.

:::caution
Sprawdzenie opiera sie na wykrywaniu slow kluczowych. Wynik "OK" nie gwarantuje zgodnosci prawnej - konsultacja z prawnikiem pozostaje konieczna.
:::

## Jak to dziala

1. Wtyczka czyta tresc strony ustawionej jako Polityka Prywatnosci lub Regulamin (opcje `polski_privacy_page_id`, `polski_terms_page_id`).
2. Tresc jest normalizowana: HTML usuniety, wielkosc liter ujednolicona, polskie znaki diakrytyczne zamienione na ASCII (a/c/e/l/n/o/s/z).
3. Silnik przechodzi przez zestaw regul (17 dla Polityki, 15 dla Regulaminu) i szuka wzorcow slow kluczowych. Regula przechodzi, jesli w tresci znajdzie sie dowolny z wzorcow.
4. Wynik jest prezentowany jako lista z oznaczeniem **OK / Missing**, poziomem waznosci (Required / Recommended / Optional) oraz podpowiedzia co dodac.

## Konfiguracja

Przejdz do **Polski > Checklist zgodnosci**. Jesli nie masz jeszcze ustawionych stron prawnych, ustaw je wczesniej w **Polski > Strony prawne**.

Modul jest domyslnie wlaczony. Wylaczenie: **Polski > Moduly** -> odznacz "Compliance checklist".

## Zakres sprawdzen

### Polityka Prywatnosci (RODO Art. 13) - 17 regul

Wymagane:
- Identyfikacja Administratora danych
- Kanal kontaktowy (email lub formularz)
- Cele przetwarzania
- Podstawa prawna (Art. 6 ust. 1 RODO)
- Okres przechowywania
- Odbiorcy danych / podmioty przetwarzajace
- Prawa osoby: dostepu, sprostowania, usuniecia, ograniczenia, przenoszenia, sprzeciwu
- Prawo cofniecia zgody
- Skarga do Prezesa UODO

Rekomendowane:
- Zautomatyzowane podejmowanie decyzji / profilowanie
- Transfer poza EOG

Opcjonalne:
- Kontakt do IOD (jesli powolany)

### Cookie banner (active consent) - 10 regul

Wymagane:
- Obecnosc banera (cookies / ciasteczka w HTML)
- Przycisk Akceptuje
- Przycisk Odrzuc z rownorzedna widocznoscia
- Ustawienia / preferencje kategorii
- Link do Polityki prywatnosci

Rekomendowane:
- Nazwana kategoria Analityka
- Nazwana kategoria Marketing / reklama
- Wzmianka o mozliwosci cofniecia zgody

Reguly inwertowane (obecnosc = FAIL):
- "Klikajac dowolny link akceptujesz" / "By continuing to use the site you agree" — frazy sugerujace **implied consent**, niezgodne z aktywna zgoda.
- Detekcja auto-promptu push: `Notification.requestPermission`, `PushManager.subscribe`, `ServiceWorker.register` oraz sygnatury najczesciej uzywanych third-party push SDK. Uruchomienie tych bez wczesniejszej interakcji uzytkownika to deceptive pattern (EDPB 03/2022) - przegladarki i organy nadzorcze traktuja to jako naruszenie.

Skanowane jest `home_url('/')`, wynik cachowany w transient przez 1h. Banner renderowany tylko przez JS moze nie byc widoczny w skanie - rozdzial jest heurystyka, nie werdyktem.

### Accessibility (WCAG heuristics) - 9 regul

Skan statycznego HTML strony glownej pod katem typowych regresji WCAG 2.1 AA:

Wymagane:
- `<html lang="...">` obecne (WCAG 3.1.1)
- Link "przejdz do tresci" / skip-link (WCAG 2.4.1)
- Pojedynczy `<h1>` (WCAG 1.3.1, 2.4.6)
- `<meta name="viewport">` (WCAG 1.4.10 Reflow)
- `<main>` lub `role="main"` (WCAG 1.3.1)
- Obrazy z atrybutem `alt` (WCAG 1.1.1)

Rekomendowane:
- `role="search"` na formularzu wyszukiwania
- Brak globalnego `outline:none` (WCAG 2.4.7) - reguly inwertowana
- Brak `autoplay` z dzwiekiem (WCAG 1.4.2) - reguly inwertowana

To jest heurystyka statyczna. Dla pelnego audytu uzyj axe-core albo Lighthouse w przegladarce.

### Regulamin (Ustawa o swiadczeniu uslug + Ustawa o prawach konsumenta) - 15 regul

Wymagane:
- Identyfikacja Uslugodawcy (nazwa, NIP, REGON)
- Adres + email kontaktowy
- Rodzaj i zakres uslug
- Wymagania techniczne
- Sposob skladania zamowienia
- Metody platnosci
- Sposoby dostawy i czasy
- Prawo odstapienia od umowy (14 dni)
- Formularz odstapienia
- Postepowanie reklamacyjne
- Odwolanie do Polityki Prywatnosci / RODO
- Tryb zmiany Regulaminu
- Prawo wlasciwe

Rekomendowane:
- Platforma ODR (ec.europa.eu)
- Data wejscia w zycie

## Wynik i punktacja

Score 0-100%:
- Required: waga 3
- Recommended: waga 2
- Optional: waga 1

Zaliczone punkty / maksimum * 100. Wszystkie regule Required musza byc na OK, aby sklep mial solidna pozycje wyjsciowa.

Kolor punktacji:
- zielony >= 90%
- zolty 70-89%
- czerwony < 70%

## REST API

```
GET /wp-json/polski/v1/compliance/page/privacy
GET /wp-json/polski/v1/compliance/page/terms
GET /wp-json/polski/v1/compliance/cookie-banner
GET /wp-json/polski/v1/compliance/cookie-banner?url=https://example.com/
GET /wp-json/polski/v1/compliance/accessibility
GET /wp-json/polski/v1/compliance/accessibility?url=https://example.com/
```

Zwraca raport jako JSON:

```json
{
  "page_type": "privacy",
  "page_id": 42,
  "content_length": 8421,
  "score": 94,
  "has_missing_required": false,
  "results": [
    {
      "id": "controller_identity",
      "label": "Controller identity and contact",
      "severity": "required",
      "passed": true,
      "hint": ""
    }
  ]
}
```

Dostep: `manage_woocommerce` capability.

## Zasady dopasowania

Kazda regula ma liste wzorcow (Polish + English). Wzorce sa juz znormalizowane (maly pisownia, bez diakrytyki). Przyklady:

- `"administratorem danych osobowych"` - zapis formalny
- `"administrator danych"` - skrocony
- `"data controller"` - angielska wersja

Regula przechodzi, jesli **dowolny** wzorzec wystepuje w tresci. Dodanie nowego wzorca to modyfikacja `PrivacyPolicyRules::all()` / `RegulaminRules::all()` - PR mile widziany.

## Ograniczenia

- Heurystyka slow kluczowych; regula moze przejsc nawet gdy akapit jest lakoniczny
- Brak analizy semantycznej (np. czy rzeczywiscie opisano okres retencji, a nie tylko slowo "przechowywania")
- Nie sprawdza Polityki Cookies, stron Zwrot/Reklamacja (planowane osobne moduly)
- Nie ocenia czy powolany zostal IOD - tylko obecnosc wzmianki
