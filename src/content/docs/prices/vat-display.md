---
title: Wyświetlanie VAT
description: Konfiguracja wyświetlania cen brutto i netto, stawki VAT oraz zwolnienia z art. 113 ustawy o VAT w WooCommerce.
---

Polskie prawo wymaga, by sklep jasno informował, czy cena zawiera VAT. Wtyczka Polski for WooCommerce pozwala wyświetlać informację o VAT - od prostego oznaczenia "brutto/netto" po stawkę podatku i podstawę zwolnienia.

## Wymagania prawne

Sklep internetowy musi:

- wyraźnie informować, czy cena zawiera podatek VAT
- podawać stawkę VAT, jeśli sprzedaje zarówno klientom indywidualnym, jak i firmom
- w przypadku zwolnienia z VAT - wskazać podstawę prawną zwolnienia

Jeśli korzystasz ze zwolnienia z VAT (art. 113), poinformuj klienta, ze cena nie zawiera VAT.

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

Jeśli jesteś zwolniony z VAT na podstawie art. 113 ust. 1 lub ust. 9, skonfiguruj odpowiedni komunikat.

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

Jeśli obsługujesz klientów indywidualnych (B2C) i firmowych (B2B), skonfiguruj osobne widoki cen dla każdej roli.

### Ceny netto dla firm

Wtyczka korzysta z systemu ról WooCommerce. Aby pokazywać ceny netto firmom:

1. Utwórz dedykowaną rolę (np. "klient_firmowy") lub użyj istniejącej
2. W ustawieniach pluginu przypisz wyświetlanie netto do wybranej roli
3. Klienci firmowi zobaczą ceny bez VAT, a indywidualni - z VAT

### Podwójne ceny na stronie produktu

Tryb "Oba" pokazuje cenę netto i brutto jednocześnie. Format:

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

Wtyczka automatycznie odczytuje stawkę przypisaną do produktu i wyświetla prawidłową informację.

## Informacja o VAT w e-mailach

Wtyczka dodaje informację o VAT do e-maili WooCommerce:

- potwierdzenie zamówienia
- faktura
- zmiana statusu zamówienia

Treść komunikatu jest zgodna z ustawieniami sklepu.

## Stylowanie CSS

Informacja o VAT jest opakowana w elementy z klasami CSS:

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

Sprawdź, czy motyw nie dodaje własnej informacji o VAT. Niektore polskie motywy mają wbudowaną obsługę VAT - wyłącz jedną z nich.

### Stawka VAT wyświetla się nieprawidłowo

Sprawdź, czy klasy podatkowe w **WooCommerce > Ustawienia > Podatki > Stawki standardowe** sa poprawnie ustawione. Wtyczka odczytuje stawkę z konfiguracji WooCommerce.

## Powiązane zasoby

- [Zgłoś problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
