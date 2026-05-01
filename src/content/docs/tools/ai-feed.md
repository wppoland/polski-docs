---
title: AI Feed - widoczność dla agentów AI
description: Moduł AI Feed serwuje pojedyncze wpisy, strony i produkty WooCommerce w formacie Markdown przez negocjację treści, dzięki czemu agenci AI i LLM mogą czytać zawartość sklepu bez parsowania HTML.
---

AI Feed udostępnia zawartość sklepu w formacie **Markdown** zoptymalizowanym pod modele językowe i agentów zakupowych. Klient HTTP wysyła nagłówek `Accept: text/markdown` (albo dodaje `?output_format=md` do URL) i zamiast wyrenderowanej strony HTML otrzymuje czysty Markdown z metadanymi YAML.

## Po co to komu

Agenci AI (ChatGPT shopping, Perplexity, Gemini, własne crawlery LLM) coraz częściej pomijają HTML i pytają wprost o "czystą" wersję strony. Tradycyjny scraping HTML jest zawodny, kosztowny i tracił dane strukturalne. AI Feed odwraca relację: sklep sam publikuje wersję czytelną dla maszyn na tym samym URL co wersja dla człowieka.

## Włączenie modułu

Moduł jest aktywny domyślnie po aktualizacji do wersji 1.11.0. Możesz wyłączyć go filtrem:

```php
add_filter('polski/ai_feed/enabled', '__return_false');
```

Ustawienia w opcji `polski_ai_feed`:

| Klucz | Wartość domyślna | Opis |
|---|---|---|
| `enabled` | `true` | Globalny przełącznik |
| `post_types` | `['post', 'page', 'product']` | Typy treści serwowane jako Markdown |

## Jak działa negocjacja treści

Markdown jest zwracany w dwóch przypadkach:

1. **Nagłówek `Accept`** zawiera `text/markdown` (z wyłączeniem jawnego `q=0`).
2. **Parametr URL** `?output_format=md` jest obecny w żądaniu.

W obu przypadkach odpowiedź ma nagłówki:

```
Content-Type: text/markdown; charset=UTF-8
Vary: Accept
```

Zwykli odwiedzający nadal otrzymują standardowy HTML. Logika uprawnień (`read_post`, ochrona hasłem, wersje robocze) jest zachowana.

## Wykrywanie wersji Markdown

Na stronie HTML pojedynczego wpisu dodajemy w `<head>`:

```html
<link rel="alternate" type="text/markdown" href="https://sklep.pl/produkt/koszulka/?output_format=md" />
```

Crawlery i agenci AI mogą znaleźć wersję Markdown bez konieczności znajomości konwencji URL.

## Skrót w panelu admina

Na liście wpisów, stron i produktów obok akcji "Wyświetl" pojawia się link **"View AI Version"**. Otwiera tę samą wersję Markdown, którą zobaczy agent AI - wygodne do testów i podglądu.

## Co zawiera wersja Markdown produktu

Dla produktu WooCommerce odpowiedź zawiera:

**Nagłówek YAML (front matter)**

```yaml
---
title: "Koszulka basic"
permalink: "https://sklep.pl/produkt/koszulka/"
sku: "TS-001"
gtin: "5901234567890"
product_type: "simple"
currency: "PLN"
price: "49,99 zł"
regular_price: "59,99 zł"
sale_price: "49,99 zł"
in_stock: "true"
on_sale: "true"
modified: "2026-04-30T12:00:00+02:00"
categories: ["Koszulki"]
---
```

**Sekcja "Product details"** z bullet listą:

- SKU i GTIN/EAN
- Cena brutto, cena regularna, cena promocyjna
- Klasa podatkowa VAT
- Najniższa cena z 30 dni (Omnibus)
- Czas dostawy
- Stan magazynu i dostępność
- Waga i wymiary
- Marka, producent
- Osoba odpowiedzialna (GPSR)

**Pełny opis produktu** przekonwertowany na Markdown.

## Przykład pełnej odpowiedzi

```markdown
---
title: "Koszulka basic"
permalink: "https://sklep.pl/produkt/koszulka/"
sku: "TS-001"
price: "49,99 zł"
in_stock: "true"
---

# Koszulka basic

Bawełniana koszulka klasycznego kroju.

## Product details

- **SKU:** TS-001
- **GTIN/EAN:** 5901234567890
- **Price:** 49,99 zł
- **Tax class:** Standard
- **Lowest price (last 30 days):** 45,00 zł
- **Delivery time:** 1-2 dni
- **Availability:** In stock
- **Weight:** 0.2 kg

## Description

Pełny opis produktu z bloków Gutenberga, w tym listy, tabele i nagłówki.
```

## Filtry deweloperskie

| Filtr | Cel |
|---|---|
| `polski/ai_feed/enabled` | Globalny przełącznik (bool) |
| `polski/ai_feed/post_types` | Lista typów treści (string[]) |
| `polski/ai_feed/post_markdown` | Końcowy Markdown wpisu/strony |
| `polski/ai_feed/product_markdown` | Końcowy Markdown produktu |
| `polski/ai_feed/product_facts` | Lista par `[etykieta, wartość]` w sekcji "Product details" |
| `polski/ai_feed/password_required` | Treść Markdown przy ochronie hasłem |

### Przykład - dodanie własnego CPT

```php
add_filter('polski/ai_feed/post_types', static function (array $types): array {
    $types[] = 'recipe';
    return $types;
});
```

### Przykład - dodanie własnego pola do produktu

```php
add_filter('polski/ai_feed/product_facts', static function (array $facts, WC_Product $product): array {
    $color = $product->get_attribute('pa_kolor');
    if ($color !== '') {
        $facts[] = ['Kolor', $color];
    }
    return $facts;
}, 10, 2);
```

## FAQ

**Czy to zastępuje motyw dla zwykłych użytkowników?**

Nie. HTML jest zwracany domyślnie. Markdown trafia tylko do klientów, którzy o niego poproszą przez `Accept` lub parametr URL.

**Czy chronione hasłem treści są wyciekane?**

Nie. Gdy strona wymaga hasła, AI Feed zwraca krótki Markdown z informacją o ochronie zamiast pełnej treści.

**Czy obsługiwane są wersje robocze?**

Tak, dla użytkowników z uprawnieniami do edycji. Akcja "View AI Version" w panelu admina używa preview URL dla wersji roboczych i zaplanowanych.

**Czy mogę dodać własne typy treści?**

Tak, przez filtr `polski/ai_feed/post_types`. Domyślnie obsługiwane są `post`, `page` i `product`.

**Czy działa z HPOS i Block Checkout?**

Tak. Moduł działa na poziomie warstwy widoku produktu, niezależnie od magazynu zamówień (HPOS) i checkoutu (Blocks).
