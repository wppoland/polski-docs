---
title: FAQ (Najczęściej zadawane pytania)
description: Moduł FAQ w Polski for WooCommerce - CPT polski_faq, taksonomia faq_category, shortcode, akordeon CSS i Schema.org FAQPage.
---

Moduł FAQ umożliwia tworzenie i wyświetlanie sekcji najczęściej zadawanych pytań w sklepie. Pytania są przechowywane jako osobny typ wpisu (CPT) z własną taksonomią kategorii, co pozwala na elastyczne zarządzanie i wyświetlanie.

## Włączenie modułu

Przejdź do **WooCommerce > Polski > Moduły sklepowe** i włącz **FAQ** (ID modułu: `faq`).

Po włączeniu w menu admina pojawi się nowa pozycja **FAQ** z podstronami do zarządzania pytaniami i kategoriami.

## Panel administracyjny

Zarządzanie pytaniami FAQ odbywa się w **FAQ** (`edit.php?post_type=polski_faq`). Interfejs działa identycznie jak standardowe wpisy WordPress.

### Dodawanie pytania

1. Przejdź do **FAQ > Dodaj nowe**
2. W polu tytułu wpisz treść pytania
3. W edytorze wpisz odpowiedź (obsługiwany jest pełny edytor blokowy)
4. Przypisz kategorię FAQ (opcjonalnie)
5. Ustaw kolejność wyświetlania w polu **Kolejność** (menu_order)
6. Opublikuj

### Kategorie FAQ

Taksonomia `faq_category` pozwala grupować pytania tematycznie. Zarządzanie kategoriami: **FAQ > Kategorie FAQ**.

Przykładowe kategorie:

- Zamówienia i płatności
- Dostawa i zwroty
- Konto klienta
- Produkty

## Shortcode `[polski_faq]`

Wyświetla listę pytań FAQ w formie akordeonu CSS.

### Parametry

| Parametr   | Typ    | Domyślnie | Opis                                              |
| ---------- | ------ | --------- | ------------------------------------------------- |
| `category` | string | (pusty)   | Slug kategorii FAQ do wyświetlenia                |
| `limit`    | int    | `-1`      | Maksymalna liczba pytań (-1 = wszystkie)          |
| `orderby`  | string | `menu_order` | Pole sortowania: `menu_order`, `title`, `date` |
| `order`    | string | `ASC`     | Kierunek sortowania: `ASC` lub `DESC`             |

### Przykłady użycia

Wyświetl wszystkie pytania:

```html
[polski_faq]
```

Wyświetl pytania z kategorii "dostawa":

```html
[polski_faq category="dostawa" limit="5"]
```

Wyświetl 10 najnowszych pytań:

```html
[polski_faq limit="10" orderby="date" order="DESC"]
```

### Użycie w szablonie PHP

```php
echo do_shortcode('[polski_faq category="zamowienia" limit="10"]');
```

## Akordeon CSS

Pytania wyświetlają się jako akordeon - kliknięcie pytania rozwija odpowiedź. Akordeon działa w całości na CSS (bez JavaScript), co zapewnia maksymalną wydajność.

Mechanizm opiera się na elemencie HTML `<details>` z `<summary>`:

```html
<div class="polski-faq">
  <details class="polski-faq__item">
    <summary class="polski-faq__question">Jak złożyć zamówienie?</summary>
    <div class="polski-faq__answer">
      <p>Aby złożyć zamówienie, dodaj produkty do koszyka...</p>
    </div>
  </details>
</div>
```

### Klasy CSS

- `.polski-faq` - kontener FAQ
- `.polski-faq__item` - pojedyncze pytanie (element `<details>`)
- `.polski-faq__question` - treść pytania (element `<summary>`)
- `.polski-faq__answer` - treść odpowiedzi
- `.polski-faq__category` - nagłówek kategorii (gdy wyświetlane z grupowaniem)

### Dostosowanie wyglądu

```css
/* Zmiana koloru tła aktywnego pytania */
.polski-faq__item[open] .polski-faq__question {
    background-color: #f0f0f0;
}

/* Zmiana ikony rozwinięcia */
.polski-faq__question::marker {
    content: "+";
}

.polski-faq__item[open] .polski-faq__question::marker {
    content: "-";
}
```

## Schema.org FAQPage

Moduł automatycznie generuje znaczniki Schema.org `FAQPage` w formacie JSON-LD na stronach zawierających shortcode `[polski_faq]`:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Jak złożyć zamówienie?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Aby złożyć zamówienie, dodaj produkty do koszyka..."
      }
    },
    {
      "@type": "Question",
      "name": "Jaki jest czas dostawy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Standardowy czas dostawy to 2-3 dni robocze..."
      }
    }
  ]
}
```

Znaczniki FAQPage pozwalają Google wyświetlać pytania i odpowiedzi bezpośrednio w wynikach wyszukiwania (rich snippets).

Wyłącz Schema.org:

```php
add_filter('polski/faq/schema_enabled', '__return_false');
```

## Hooki

### Filtry

```php
// Zmiana argumentów zapytania FAQ
add_filter('polski/faq/query_args', function (array $args): array {
    $args['posts_per_page'] = 20;
    return $args;
});

// Modyfikacja HTML odpowiedzi przed wyświetleniem
add_filter('polski/faq/answer_html', function (string $html, int $post_id): string {
    return wp_kses_post($html);
}, 10, 2);
```

### Akcje

```php
// Dodaj własny element przed sekcją FAQ
add_action('polski/faq/before', function (): void {
    echo '<h2>Masz pytania? Oto odpowiedzi:</h2>';
});

// Dodaj własny element po sekcji FAQ
add_action('polski/faq/after', function (): void {
    echo '<p>Nie znalazłeś odpowiedzi? <a href="/kontakt">Skontaktuj się z nami</a>.</p>';
});
```

## Rozwiązywanie problemów

**Shortcode wyświetla pusty kontener** - sprawdź, czy masz opublikowane pytania FAQ. Wersje robocze i zaplanowane nie są wyświetlane.

**Akordeon nie działa** - upewnij się, że motyw nie blokuje elementu `<details>`. Niektóre resetowe arkusze CSS mogą ukrywać ten element.

**Schema.org nie pojawia się** - zweryfikuj znaczniki narzędziem [Google Rich Results Test](https://search.google.com/test/rich-results). Upewnij się, że shortcode jest na stronie (nie w widgecie sidebar).

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
