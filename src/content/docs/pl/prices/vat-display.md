---
title: Wyświetlanie VAT
description: Konfiguracja wyświetlania cen brutto i netto, stawki VAT oraz zwolnienia z art. 113 ustawy o VAT w WooCommerce.
---

Polskie prawo nakłada na sprzedawców internetowych obowiązek jednoznacznego informowania o tym, czy prezentowana cena zawiera podatek VAT. Plugin Polski for WooCommerce umożliwia elastyczne zarządzanie sposobem wyświetlania informacji o VAT - od prostego oznaczenia "brutto/netto" po pełną informację o stawce podatku i podstawie zwolnienia.

## Wymagania prawne

Zgodnie z ustawą o informowaniu o cenach towarów i usług oraz ustawą o VAT, sklep internetowy musi:

- wyraźnie informować, czy cena zawiera podatek VAT
- podawać stawkę VAT, jeśli sprzedaje zarówno klientom indywidualnym, jak i firmom
- w przypadku zwolnienia z VAT - wskazać podstawę prawną zwolnienia

Sprzedawcy korzystający ze zwolnienia podmiotowego (art. 113 ustawy o VAT) muszą poinformować klienta, że cena nie zawiera VAT ze względu na zwolnienie.

## Konfiguracja

Przejdź do **WooCommerce > Ustawienia > Polski > Ceny** i skonfiguruj sekcję "Wyświetlanie VAT".

### Tryby wyświetlania

| Tryb | Opis | Przykład |
|------|------|---------|
| Brutto (z VAT) | Cena zawiera podatek | 123,00 zł brutto |
| Netto (bez VAT) | Cena bez podatku | 100,00 zł netto |
| Oba | Obie ceny jednocześnie | 100,00 zł netto (123,00 zł brutto) |

### Ustawienia szczegółowe

- **Pokaż stawkę VAT** - wyświetla procentową stawkę podatku obok ceny (np. "w tym 23% VAT")
- **Pokaż informację o VAT na listingu** - kontroluje widoczność na stronach kategorii i wynikach wyszukiwania
- **Pokaż informację o VAT w koszyku** - kontroluje widoczność w koszyku i podsumowaniu zamówienia
- **Tekst niestandardowy** - pozwala nadpisać domyślny tekst informacji o VAT

## Zwolnienie z VAT (art. 113)

Sprzedawcy zwolnieni z VAT na podstawie art. 113 ust. 1 lub ust. 9 ustawy o podatku od towarów i usług mogą skonfigurować odpowiedni komunikat.

### Konfiguracja zwolnienia

1. Przejdź do **WooCommerce > Ustawienia > Polski > Ceny**
2. Zaznacz opcję **Zwolnienie z VAT (art. 113)**
3. Wybierz podstawę zwolnienia:
   - **Art. 113 ust. 1** - zwolnienie dla sprzedaży do 200 000 zł rocznie
   - **Art. 113 ust. 9** - zwolnienie dla podatników rozpoczynających działalność w trakcie roku
4. Opcjonalnie dostosuj treść komunikatu

Domyślny komunikat: "Cena nie zawiera podatku VAT - sprzedawca korzysta ze zwolnienia na podstawie art. 113 ust. 1 ustawy o VAT."

### Wyłączenie VAT w WooCommerce

Przy zwolnieniu z VAT ustaw w WooCommerce:

1. **WooCommerce > Ustawienia > Podatki** - wyłącz obliczanie podatków LUB ustaw stawkę 0%
2. Plugin automatycznie doda odpowiednią adnotację do cen

## Shortcode

Użyj shortcode `[polski_tax_notice]`, aby wyświetlić informację o VAT w dowolnym miejscu.

### Parametry

| Parametr | Typ | Domyślny | Opis |
|----------|-----|----------|------|
| `product_id` | int | bieżący | ID produktu |
| `type` | string | `auto` | Typ informacji: `auto`, `gross`, `net`, `exempt` |
| `show_rate` | bool | `true` | Czy wyświetlać stawkę procentową |
| `wrapper` | string | `span` | Element HTML opakowujący |

### Przykłady użycia

Automatyczne wykrywanie na stronie produktu:

```html
[polski_tax_notice]
```

Wymuszenie informacji o zwolnieniu:

```html
[polski_tax_notice type="exempt"]
```

Bez stawki procentowej:

```html
[polski_tax_notice show_rate="false"]
```

W szablonie PHP:

```php
echo do_shortcode('[polski_tax_notice product_id="' . $product->get_id() . '"]');
```

## Konfiguracja dla sklepów B2B i B2C

Sklepy obsługujące zarówno klientów indywidualnych (B2C), jak i firmowych (B2B) mogą skonfigurować różne widoki cen w zależności od roli użytkownika.

### Ceny netto dla firm

Plugin współpracuje z systemem ról WooCommerce. Aby wyświetlać ceny netto dla klientów firmowych:

1. Utwórz dedykowaną rolę (np. "klient_firmowy") lub użyj istniejącej
2. W ustawieniach pluginu przypisz wyświetlanie netto do wybranej roli
3. Klienci firmowi zobaczą ceny bez VAT, a indywidualni - z VAT

### Podwójne ceny na stronie produktu

Aktywacja trybu "Oba" wyświetla cenę netto i brutto jednocześnie. Format prezentacji:

```
100,00 zł netto
123,00 zł brutto (w tym 23% VAT)
```

Kolejność i format można dostosować w ustawieniach.

## Stawki VAT dla różnych kategorii produktów

W Polsce obowiązują cztery stawki VAT:

| Stawka | Zastosowanie |
|--------|-------------|
| 23% | Stawka podstawowa - większość towarów i usług |
| 8% | Stawka obniżona - budownictwo mieszkaniowe, usługi gastronomiczne |
| 5% | Stawka obniżona - żywność, książki, czasopisma |
| 0% | Stawka zerowa - eksport, wewnątrzwspólnotowa dostawa towarów |

Plugin automatycznie rozpoznaje stawkę przypisaną do produktu w WooCommerce i wyświetla odpowiednią informację.

## Informacja o VAT w e-mailach

Plugin dodaje informację o VAT również do e-maili transakcyjnych WooCommerce:

- potwierdzenie zamówienia
- faktura
- zmiana statusu zamówienia

Treść komunikatu jest spójna z ustawieniami sklepu.

## Stylowanie CSS

Informacja o VAT jest opakowywana w elementy z dedykowanymi klasami CSS:

```css
.polski-tax-notice {
    font-size: 0.85em;
    color: #666;
}

.polski-tax-notice--exempt {
    color: #c00;
    font-weight: 600;
}

.polski-tax-notice__rate {
    white-space: nowrap;
}
```

## Najczęstsze problemy

### Informacja o VAT wyświetla się podwójnie

Sprawdź, czy motyw nie dodaje własnej informacji o VAT. Niektóre motywy dedykowane dla rynku polskiego mają wbudowaną obsługę VAT - w takim przypadku wyłącz jedną z implementacji.

### Stawka VAT wyświetla się nieprawidłowo

Upewnij się, że klasy podatkowe w **WooCommerce > Ustawienia > Podatki > Stawki standardowe** są poprawnie skonfigurowane. Plugin odczytuje stawkę bezpośrednio z konfiguracji WooCommerce.

## Powiązane zasoby

- [Zgłoś problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
