---
title: Wieloetapowa kasa
description: Dokumentacja wieloetapowej kasy Polski PRO for WooCommerce - podział procesu zamówienia na kroki, konfiguracja, React Checkout Blocks i fallback klasyczny.
---

Moduł wieloetapowej kasy w Polski PRO for WooCommerce dzieli proces składania zamówienia na cztery przejrzyste kroki. Klient widzi pasek postępu i przechodzi kolejno przez formularz adresowy, wybór dostawy, płatność i podsumowanie zamówienia.

## Kroki kasy

Wieloetapowa kasa składa się z czterech kroków:

| Krok | Nazwa domyślna | Zawartość |
|------|----------------|-----------|
| 1 | Adres | Formularz danych rozliczeniowych i adresu dostawy |
| 2 | Dostawa | Wybór metody dostawy i opcji przesyłki |
| 3 | Płatność | Wybór metody płatności i dane płatnicze |
| 4 | Podsumowanie | Przegląd zamówienia, checkboxy prawne, przycisk "Kupuję i płacę" |

Klient może cofać się do poprzednich kroków bez utraty wprowadzonych danych. Przejście do następnego kroku wymaga poprawnego wypełnienia bieżącego formularza.

## Konfiguracja

Przejdź do **WooCommerce > Ustawienia > Polski > Moduły PRO > Kasa**.

### Włączanie modułu

Wieloetapowa kasa jest kontrolowana opcją:

```
polski_pro_checkout[multistep_enabled]
```

Wartość `1` włącza wieloetapowy układ, `0` przywraca domyślną kasę WooCommerce.

### Nazwy kroków

Domyślne nazwy kroków można zmienić w ustawieniach:

| Ustawienie | Domyślna wartość |
|------------|-----------------|
| Tytuł kroku 1 | Adres |
| Tytuł kroku 2 | Dostawa |
| Tytuł kroku 3 | Płatność |
| Tytuł kroku 4 | Podsumowanie |

Nazwy kroków są wyświetlane w pasku postępu nad formularzem kasy.

### Walidacja między krokami

Plugin waliduje dane po każdym kroku przed pozwoleniem na przejście do następnego:

- **Krok 1 (Adres)** - wymagane pola: imię, nazwisko, adres, miasto, kod pocztowy, telefon, e-mail
- **Krok 2 (Dostawa)** - wymagany wybór metody dostawy
- **Krok 3 (Płatność)** - wymagany wybór metody płatności
- **Krok 4 (Podsumowanie)** - wymagane zaznaczenie obowiązkowych checkboxów prawnych

Komunikaty walidacji pojawiają się inline pod odpowiednim polem.

## Implementacja techniczna

### WooCommerce Checkout Blocks (React)

Dla sklepów korzystających z WooCommerce Checkout Blocks (edytor blokowy) moduł wykorzystuje React do renderowania kroków. Komponenty integrują się z WooCommerce Store API i zachowują pełną zgodność z rozszerzeniami Checkout Blocks.

Renderowanie odbywa się po stronie klienta. Plugin rejestruje się jako rozszerzenie Checkout Blocks i modyfikuje układ formularza bez ingerencji w logikę WooCommerce.

### Fallback klasyczny (shortcode)

Dla sklepów używających klasycznej kasy (shortcode `[woocommerce_checkout]`) moduł zapewnia fallback JavaScript. Skrypt dzieli istniejący formularz na sekcje i dodaje nawigację między nimi.

Fallback klasyczny:

- nie wymaga React
- działa z istniejącymi motywami i customizacjami kasy
- obsługuje te same cztery kroki co wersja Blocks
- wykorzystuje jQuery do manipulacji DOM

### Wykrywanie trybu

Plugin automatycznie wykrywa, czy kasa używa Checkout Blocks czy shortcode klasycznego, i ładuje odpowiednią implementację. Nie wymaga ręcznej konfiguracji trybu.

## Stylizacja

### Klasa CSS body

Gdy wieloetapowa kasa jest aktywna, do elementu `<body>` dodawana jest klasa:

```
polski-multistep-checkout
```

Umożliwia to celowanie stylów CSS wyłącznie na strony z wieloetapową kasą:

```css
body.polski-multistep-checkout .woocommerce-checkout {
    max-width: 720px;
    margin: 0 auto;
}
```

### Klasy kroków

Każdy krok otrzymuje własną klasę CSS:

```css
.polski-checkout-step { /* wspólne style kroków */ }
.polski-checkout-step--active { /* aktywny krok */ }
.polski-checkout-step--completed { /* ukończony krok */ }
.polski-checkout-step--address { /* krok adresowy */ }
.polski-checkout-step--shipping { /* krok dostawy */ }
.polski-checkout-step--payment { /* krok płatności */ }
.polski-checkout-step--review { /* krok podsumowania */ }
```

### Pasek postępu

Pasek postępu jest renderowany jako element `<ol>` z klasą `.polski-checkout-progress`. Każdy element listy odpowiada jednemu krokowi:

```css
.polski-checkout-progress { /* kontener paska */ }
.polski-checkout-progress__step { /* pojedynczy krok w pasku */ }
.polski-checkout-progress__step--active { /* aktywny krok w pasku */ }
.polski-checkout-progress__step--done { /* ukończony krok w pasku */ }
```

## Zgodność z innymi modułami

### Checkboxy prawne

Checkboxy prawne z darmowej wersji Polski for WooCommerce są automatycznie przenoszone do kroku 4 (Podsumowanie). Klient musi je zaznaczyć przed złożeniem zamówienia.

### Pole NIP

Pole NIP jest wyświetlane w kroku 1 (Adres), zgodnie z konfiguracją wyświetlania warunkowego z modułu NIP.

### Pola niestandardowe

Pola dodane przez inne wtyczki (np. przez hook `woocommerce_checkout_fields`) są automatycznie przypisywane do odpowiedniego kroku na podstawie ich sekcji:

- `billing_*` - krok 1
- `shipping_*` - krok 2
- `order_*` - krok 4

## Dostępność (a11y)

Wieloetapowa kasa obsługuje:

- nawigację klawiaturą (Tab, Enter, Escape)
- atrybuty ARIA (`aria-current`, `aria-label`, `role="tablist"`)
- ogłaszanie zmian kroków przez czytniki ekranu
- widoczny fokus na elementach interaktywnych

## Wydajność

Moduł ładuje skrypty i style tylko na stronie kasy. Na pozostałych stronach sklepu nie dodaje żadnych zasobów. Skrypty są ładowane z atrybutem `defer`, aby nie blokować renderowania strony.

## Najczęstsze problemy

### Kasa nie dzieli się na kroki

1. Sprawdź, czy opcja `polski_pro_checkout[multistep_enabled]` jest ustawiona na `1`
2. Wyczyść cache (wtyczki cache, CDN, cache przeglądarki)
3. Sprawdź konsolę przeglądarki pod kątem błędów JavaScript
4. Zweryfikuj, czy nie ma konfliktu z innymi wtyczkami modyfikującymi kasę

### Formularz nie przechodzi do następnego kroku

1. Sprawdź, czy wszystkie wymagane pola są wypełnione
2. Zweryfikuj komunikaty walidacji pod polami
3. Sprawdź konsolę przeglądarki - błędy AJAX mogą blokować walidację

### Style nie działają poprawnie

1. Sprawdź, czy klasa `polski-multistep-checkout` jest obecna na elemencie `<body>`
2. Zweryfikuj, czy style pluginu nie są nadpisywane przez motyw (użyj inspektora)
3. Dodaj własne style z wyższą specyficznością selektorów

## Powiązane zasoby

- [Checkboxy prawne](/checkout/legal-checkboxes/)
- [NIP na kasie](/checkout/nip-lookup/)
- [Zgłoś problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
