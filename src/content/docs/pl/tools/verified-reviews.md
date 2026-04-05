---
title: Zweryfikowane opinie
description: System zweryfikowanych opinii w Polski for WooCommerce - odznaka zakupu, dopasowanie e-mail i wiarygodność recenzji.
---

Moduł zweryfikowanych opinii wzmacnia wiarygodność recenzji w sklepie WooCommerce. Opinie klientów, którzy faktycznie kupili produkt, oznaczane są odznaką potwierdzającą zakup. System ten wspiera zgodność z dyrektywą Omnibus i przepisami o nieuczciwych praktykach handlowych.

## Włączenie modułu

Przejdź do **WooCommerce > Polski > Narzędzia > Zweryfikowane opinie** i aktywuj moduł. Moduł wymaga włączonych opinii w WooCommerce (**WooCommerce > Ustawienia > Produkty > Ogólne > Włącz recenzje produktów**).

## Jak działa weryfikacja

### Odznaka zakupu (purchase badge)

Po włączeniu modułu opinie klientów, którzy kupili produkt, otrzymują odznakę **Zweryfikowany zakup**. Odznaka wyświetla się obok nazwy recenzenta.

Odznaka przyznawana jest, gdy:

1. Autor opinii jest zalogowany jako klient
2. Klient ma co najmniej 1 zamówienie zawierające recenzowany produkt
3. Zamówienie ma status `completed` (zrealizowane) lub `processing` (w realizacji)

### Dopasowanie e-mail (email matching)

Dla gości (niezalogowanych), system porównuje adres e-mail podany w opinii z adresami e-mail z zamówień. Jeśli adres pasuje do zamówienia zawierającego recenzowany produkt, opinia otrzymuje odznakę weryfikacji.

Dopasowanie e-mail działa w trybie:

| Tryb         | Opis                                          | Bezpieczeństwo |
| ------------ | --------------------------------------------- | -------------- |
| Dokładne     | E-mail musi być identyczny                    | Wysokie        |
| Znormalizowane| Ignoruje wielkość liter i aliasy Gmail (+)   | Średnie        |

Konfiguracja trybu: **WooCommerce > Polski > Zweryfikowane opinie > Tryb dopasowania e-mail**.

```php
// Zmiana trybu programowo
add_filter('polski/verified_reviews/email_matching', function (): string {
    return 'exact'; // 'exact' lub 'normalized'
});
```

### Proces weryfikacji

```
Klient składa opinię
        ↓
System sprawdza:
  1. Czy klient jest zalogowany?
     → TAK: sprawdź zamówienia po user_id
     → NIE: sprawdź zamówienia po e-mail
        ↓
  2. Czy istnieje zamówienie zawierające ten produkt?
     → TAK: sprawdź status zamówienia
     → NIE: brak odznaki
        ↓
  3. Czy status zamówienia to "completed" lub "processing"?
     → TAK: przyznaj odznakę "Zweryfikowany zakup"
     → NIE: brak odznaki
```

## Konfiguracja odznaki

### Wygląd

Opcje konfiguracji odznaki:

| Opcja           | Opis                              | Domyślnie              |
| --------------- | --------------------------------- | ---------------------- |
| Tekst           | Treść odznaki                     | Zweryfikowany zakup    |
| Ikona           | Ikona obok tekstu                 | Checkmark (✓)          |
| Kolor tła       | Kolor tła odznaki                 | Zielony (#059669)      |
| Kolor tekstu    | Kolor tekstu                      | Biały (#ffffff)        |
| Pozycja         | Pozycja względem nazwy autora     | Po nazwie              |
| Rozmiar         | Rozmiar odznaki                   | Mały                   |

### Stylowanie CSS

```css
.polski-verified-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
    background-color: #059669;
    color: #ffffff;
}

.polski-verified-badge__icon {
    width: 14px;
    height: 14px;
}
```

Klasy CSS:
- `.polski-verified-badge` - kontener odznaki
- `.polski-verified-badge__icon` - ikona
- `.polski-verified-badge__text` - tekst odznaki
- `.polski-verified-badge--large` - wariant duży

## Filtrowanie opinii

Moduł dodaje filtr na stronie produktu pozwalający klientom wyświetlić:

- **Wszystkie opinie** - domyślny widok
- **Tylko zweryfikowane** - opinie z odznaką
- **Tylko niezweryfikowane** - opinie bez odznaki

Filtr wyświetla się jako zestaw przycisków nad listą opinii.

```php
// Wyłączenie filtra
add_filter('polski/verified_reviews/show_filter', '__return_false');
```

## Sortowanie opinii

Zweryfikowane opinie mogą być priorytetyzowane w sortowaniu. Opcje:

- **Chronologicznie** - domyślne sortowanie WooCommerce
- **Zweryfikowane najpierw** - opinie z odznaką na górze
- **Ocena malejąco** - od najwyższej oceny
- **Ocena rosnąco** - od najniższej oceny

```php
add_filter('polski/verified_reviews/default_sort', function (): string {
    return 'verified_first'; // 'date', 'verified_first', 'rating_desc', 'rating_asc'
});
```

## Statystyki weryfikacji

Panel admina (**WooCommerce > Polski > Zweryfikowane opinie > Statystyki**) wyświetla:

- **Łączna liczba opinii** - wszystkie opinie w sklepie
- **Zweryfikowane** - opinie z odznaką (liczba i procent)
- **Niezweryfikowane** - opinie bez odznaki
- **Średnia ocena zweryfikowanych** - średnia gwiazdkowa opinii z odznaką
- **Średnia ocena niezweryfikowanych** - średnia gwiazdkowa opinii bez odznaki
- **Wykres miesięczny** - trend opinii zweryfikowanych vs niezweryfikowanych

## Ochrona przed fałszywymi opiniami

Moduł oferuje dodatkowe mechanizmy ochrony:

### Limit opinii

Klient może wystawić maksymalnie 1 opinię na produkt. Próba dodania drugiej opinii wyświetla komunikat z informacją, że opinia została już wystawiona.

### Minimalny czas

Opinia może być wystawiona dopiero po X dniach od dostawy. Domyślnie **3 dni** - aby klient miał czas przetestować produkt.

```php
add_filter('polski/verified_reviews/min_days_after_delivery', function (): int {
    return 7; // 7 dni od dostawy
});
```

### Moderacja

Opinie mogą wymagać moderacji przed publikacją. Opcje:

- **Bez moderacji** - opinie publikowane natychmiast
- **Moderacja niezweryfikowanych** - tylko opinie bez odznaki wymagają zatwierdzenia
- **Moderacja wszystkich** - wszystkie opinie wymagają zatwierdzenia

Konfiguracja: **WooCommerce > Polski > Zweryfikowane opinie > Moderacja**.

### Wykrywanie podejrzanych opinii

System automatycznie oznacza podejrzane opinie:

| Sygnał                              | Opis                                     |
| ------------------------------------ | ---------------------------------------- |
| Wiele opinii z jednego IP            | Więcej niż 3 opinie z tego samego IP/dzień |
| Opinia natychmiast po zakupie        | Opinia wystawiona w ciągu minut od zamówienia |
| Identyczny tekst                     | Ten sam tekst opinii na różnych produktach |
| Podejrzany e-mail                    | Adres e-mail z tymczasowej domeny        |

Podejrzane opinie trafiają do kolejki moderacji z etykietą **Do sprawdzenia**.

## Integracja z Schema.org

Zweryfikowane opinie generują dane strukturalne `Review` z dodatkowym polem:

```json
{
  "@type": "Review",
  "author": {
    "@type": "Person",
    "name": "Jan K."
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "datePublished": "2025-05-20",
  "reviewBody": "Świetna jakość, polecam.",
  "publisher": {
    "@type": "Organization",
    "name": "Mój Sklep"
  }
}
```

Google preferuje opinie z potwierdzonych zakupów w rich snippets.

## E-mail z prośbą o opinię

Moduł może automatycznie wysyłać e-mail do klienta z prośbą o opinię po X dniach od dostawy.

Konfiguracja:

| Opcja              | Opis                            | Domyślnie |
| ------------------- | ------------------------------- | --------- |
| Włączony           | Czy wysyłać e-mail              | Nie       |
| Opóźnienie         | Dni po dostawie                 | 7         |
| Szablon            | Szablon e-maila                 | Domyślny  |
| Limit              | Max 1 e-mail na zamówienie      | Tak       |

```php
// Zmiana opóźnienia e-maila
add_filter('polski/verified_reviews/email_delay_days', function (): int {
    return 14;
});
```

## Shortcode

```html
[polski_verified_badge text="Potwierdzone zamówienie" icon="shield"]
```

Shortcode wyświetla odznakę weryfikacji. Przydatny w niestandardowych szablonach opinii.

## Rozwiązywanie problemów

**Odznaka nie wyświetla się mimo zakupu** - sprawdź status zamówienia. Tylko zamówienia ze statusem `completed` lub `processing` kwalifikują się do weryfikacji. Sprawdź też, czy e-mail w opinii pasuje do e-mail z zamówienia.

**Wszystkie opinie są niezweryfikowane** - upewnij się, że moduł jest aktywny i że WooCommerce wymaga adresu e-mail przy dodawaniu opinii.

**E-mail z prośbą o opinię nie dochodzi** - sprawdź konfigurację poczty WordPressa. Użyj wtyczki SMTP do niezawodnego wysyłania e-maili.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
