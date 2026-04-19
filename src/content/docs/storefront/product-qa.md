---
title: Pytania i odpowiedzi (Q&A)
description: Moduł pytań i odpowiedzi w Polski for WooCommerce - sekcja Q&A na stronach produktów z głosowaniem i oznaczeniami Schema.org.
---

Moduł pytań i odpowiedzi dodaje dedykowaną zakładkę Q&A na stronach produktów WooCommerce. Klienci mogą zadawać pytania dotyczące produktu, a właściciel sklepu lub inni użytkownicy odpowiadają. System wspiera głosowanie na odpowiedzi i generuje dane strukturalne Schema.org.

## Włączenie modułu

Przejdź do **WooCommerce > Polski > Moduły sklepowe** i włącz **Pytania i odpowiedzi**. Na każdym produkcie pojawi się nowa zakładka "Pytania i odpowiedzi" obok zakładki opinii.

## Funkcje

- Zakładka Q&A w tabeli produktu WooCommerce
- System pytań i odpowiedzi oparty na komentarzach WordPress
- Niestandardowe typy komentarzy: `product_question` i `product_answer`
- Głosowanie na odpowiedzi przez AJAX (pomocne/niepomocne)
- Powiadomienia e-mail do administratora o nowych pytaniach
- Dane strukturalne Schema.org QAPage
- Formularz pytania z walidacją
- Stronicowanie pytań
- Moderacja pytań przed publikacją (opcjonalnie)

## Działanie

### Zadawanie pytań

Klient wypełnia formularz na stronie produktu podając:

- **Imię** - wymagane (autouzupełniane dla zalogowanych)
- **E-mail** - wymagane (autouzupełniany dla zalogowanych)
- **Treść pytania** - wymagane

Po wysłaniu pytanie trafia do moderacji (jeśli włączona) lub publikuje się od razu. Administrator otrzymuje e-mail z powiadomieniem.

### Odpowiadanie

Odpowiedzi dodaje się bezpośrednio pod pytaniem. Odpowiedzi administratora/właściciela sklepu oznaczane są specjalną etykietą "Odpowiedź sklepu".

### Głosowanie

Użytkownicy mogą głosować na odpowiedzi (kciuk w górę/w dół). Głosowanie działa przez AJAX bez przeładowania strony. Najbardziej pomocne odpowiedzi wyświetlają się wyżej.

## Szczegóły techniczne

### Typy komentarzy

Moduł wykorzystuje system komentarzy WordPress z niestandardowymi typami:

- `product_question` - pytanie dotyczące produktu
- `product_answer` - odpowiedź na pytanie

Dzięki temu pytania nie mieszają się z recenzjami produktów ani komentarzami do wpisów.

### Schema.org QAPage

Moduł automatycznie dodaje dane strukturalne w formacie JSON-LD zgodne ze schematem `QAPage`. Każde pytanie z odpowiedziami generuje osobny obiekt `Question` z zagnieżdżonymi obiektami `Answer`.

```json
{
    "@context": "https://schema.org",
    "@type": "QAPage",
    "mainEntity": {
        "@type": "Question",
        "name": "Czy produkt jest wodoodporny?",
        "answerCount": 2,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tak, produkt posiada klasę wodoodporności IP67."
        }
    }
}
```

### Hooki

```php
// Zmień tytuł zakładki
add_filter('polski/product_qa/tab_title', function (string $title, int $count): string {
    return sprintf('Pytania (%d)', $count);
}, 10, 2);

// Wyłącz powiadomienia e-mail
add_filter('polski/product_qa/send_email', '__return_false');

// Zmień liczbę pytań na stronę
add_filter('polski/product_qa/per_page', function (): int {
    return 20; // domyślnie: 10
});

// Filtruj kto może głosować
add_filter('polski/product_qa/can_vote', function (bool $can_vote, int $user_id): bool {
    return is_user_logged_in();
}, 10, 2);
```

### Akcje AJAX

| Akcja | Opis |
|---|---|
| `polski_qa_submit_question` | Wysłanie nowego pytania |
| `polski_qa_submit_answer` | Wysłanie odpowiedzi |
| `polski_qa_vote` | Głosowanie na odpowiedź |

### Klasy CSS

- `.polski-qa` - kontener główny
- `.polski-qa__question` - pojedyncze pytanie
- `.polski-qa__answer` - odpowiedź
- `.polski-qa__answer--shop` - odpowiedź sklepu
- `.polski-qa__vote` - przyciski głosowania
- `.polski-qa__vote-count` - licznik głosów
- `.polski-qa__form` - formularz pytania

### ID modułu

`product_qa`

## Rozwiązywanie problemów

**Zakładka Q&A nie wyświetla się** - sprawdź, czy motyw obsługuje zakładki WooCommerce (hook `woocommerce_product_tabs`). Niektóre motywy nadpisują domyślne zakładki.

**Pytania nie pojawiają się po wysłaniu** - sprawdź ustawienia moderacji w **Ustawienia > Dyskusja > Komentarz musi być ręcznie zatwierdzony**.

**Schema.org nie waliduje się** - upewnij się, że pytanie ma co najmniej jedną odpowiedź. Google wymaga pary pytanie-odpowiedź do prawidłowej walidacji QAPage.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
