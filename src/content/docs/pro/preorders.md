---
title: Przedsprzedaż (pre-orders)
description: Moduł przedsprzedaży Polski PRO for WooCommerce - oznaczanie produktów jako pre-order, data premiery, niestandardowy tekst przycisku i walidacja koszyka.
---

Moduł przedsprzedaży pozwala oznaczać produkty jako dostępne w przedsprzedaży, wyświetlać datę premiery, zmieniać tekst przycisku zakupu oraz kontrolować mieszanie produktów pre-order ze standardowymi w koszyku. Jest przydatny w sklepach z elektroniką, książkami, grami i każdym asortymentem, gdzie produkty są oferowane przed oficjalną datą dostępności.

:::note[Wymagania]
Polski PRO wymaga: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Konfiguracja globalna

Przejdź do **WooCommerce > Ustawienia > Polski PRO > Przedsprzedaż**.

| Ustawienie | Domyślna wartość | Opis |
|------------|------------------|------|
| Tekst przycisku | "Zamów w przedsprzedaży" | Globalny tekst przycisku dla produktów pre-order |
| Tekst dostępności | "Dostępne od {date}" | Szablon tekstu wyświetlanego zamiast stanu magazynowego |
| Format daty | `d.m.Y` | Format wyświetlania daty premiery |
| Blokuj mieszanie koszyka | Tak | Zabrania dodawania standardowych produktów do koszyka z pre-order |
| Komunikat blokady | "Produkty w przedsprzedaży muszą być zamawiane osobno." | Komunikat wyświetlany przy próbie mieszania |

## Konfiguracja produktu

### Meta pola

Ustawienia przedsprzedaży znajdują się w edycji produktu, w zakładce **Ogólne** w panelu danych produktu.

| Meta pole | Klucz | Typ | Opis |
|-----------|-------|-----|------|
| Włącz przedsprzedaż | `_polski_preorder_enabled` | `bool` | Oznacza produkt jako pre-order |
| Data premiery | `_polski_preorder_release_date` | `string` (Y-m-d) | Data, od której produkt jest dostępny standardowo |
| Tekst przycisku | `_polski_preorder_button_text` | `string` | Nadpisuje globalny tekst przycisku dla tego produktu |
| Tekst dostępności | `_polski_preorder_availability_text` | `string` | Nadpisuje globalny tekst dostępności |

### Ustawienie przez WP-CLI

```bash
wp post meta update 123 _polski_preorder_enabled "yes"
wp post meta update 123 _polski_preorder_release_date "2026-06-15"
wp post meta update 123 _polski_preorder_button_text "Zamów teraz - premiera 15 czerwca"
```

### Ustawienie programowe

```php
update_post_meta($product_id, '_polski_preorder_enabled', 'yes');
update_post_meta($product_id, '_polski_preorder_release_date', '2026-06-15');
```

## Wyświetlanie na froncie

### Przycisk zakupu

Gdy produkt jest oznaczony jako pre-order, tekst przycisku "Dodaj do koszyka" zmienia się na skonfigurowany tekst przedsprzedaży. Dotyczy to:

- Strony pojedynczego produktu
- Stron archiwum, kategorii i tagów
- Wyników wyszukiwania
- Bloków WooCommerce (Product Grid, Product Collection)

### Tekst dostępności

Zamiast standardowego stanu magazynowego ("W magazynie", "Brak w magazynie") wyświetlany jest tekst dostępności z datą premiery. Placeholder `{date}` jest zamieniany na sformatowaną datę.

**Przykład wyświetlania:**

> Dostępne od 15.06.2026

### Automatyczna dezaktywacja

Po przekroczeniu daty premiery produkt automatycznie wraca do trybu standardowego. Dezaktywacja odbywa się przez zadanie WP-Cron uruchamiane codziennie o 00:01.

```php
/**
 * Akcja wywoływana po automatycznej dezaktywacji przedsprzedaży.
 *
 * @param int    $product_id   ID produktu
 * @param string $release_date Data premiery (Y-m-d)
 */
do_action('polski_pro/preorder/deactivated', int $product_id, string $release_date);
```

**Przykład - powiadomienie klientów o dostępności:**

```php
add_action('polski_pro/preorder/deactivated', function (int $product_id, string $release_date): void {
    $subscribers = get_post_meta($product_id, '_polski_preorder_subscribers', true);
    if (is_array($subscribers)) {
        foreach ($subscribers as $email) {
            wp_mail(
                $email,
                'Produkt jest już dostępny!',
                sprintf('Produkt %s jest teraz dostępny do zakupu.', get_the_title($product_id))
            );
        }
    }
}, 10, 2);
```

## Walidacja koszyka

### Blokada mieszania produktów

Gdy opcja "Blokuj mieszanie koszyka" jest włączona, klient nie może dodać do koszyka jednocześnie:

- Produktów w przedsprzedaży i standardowych produktów
- Produktów pre-order z różnymi datami premiery (opcjonalnie)

Przy próbie dodania produktu innego typu wyświetlany jest komunikat blokady i produkt nie zostaje dodany.

### Hook walidacji

```php
/**
 * Filtruje, czy koszyk może zawierać mieszane typy produktów.
 *
 * @param bool $allow       Czy pozwolić na mieszanie (domyślnie false)
 * @param int  $product_id  ID dodawanego produktu
 * @param array $cart_items  Aktualne produkty w koszyku
 */
apply_filters('polski_pro/preorder/allow_mixed_cart', bool $allow, int $product_id, array $cart_items): bool;
```

**Przykład - zezwolenie na mieszanie dla VIP:**

```php
add_filter('polski_pro/preorder/allow_mixed_cart', function (bool $allow, int $product_id, array $cart_items): bool {
    if (current_user_can('manage_woocommerce')) {
        return true;
    }
    return $allow;
}, 10, 3);
```

## Shortcode

Wyświetlanie odliczania do daty premiery:

```
[polski_preorder_countdown product_id="123" format="days" label="Do premiery pozostało:"]
```

| Parametr | Wymagany | Opis |
|----------|----------|------|
| `product_id` | Nie | ID produktu (domyślnie bieżący) |
| `format` | Nie | Format: `days`, `full` (dni, godziny, minuty) |
| `label` | Nie | Tekst etykiety przed odliczaniem |

## Hooki

### Filtr tekstu przycisku

```php
/**
 * Filtruje tekst przycisku przedsprzedaży.
 *
 * @param string      $text    Tekst przycisku
 * @param \WC_Product $product Obiekt produktu
 */
apply_filters('polski_pro/preorder/button_text', string $text, \WC_Product $product): string;
```

**Przykład - dynamiczny tekst z ceną:**

```php
add_filter('polski_pro/preorder/button_text', function (string $text, \WC_Product $product): string {
    return sprintf('Zamów za %s - premiera wkrótce', $product->get_price_html());
}, 10, 2);
```

### Filtr tekstu dostępności

```php
/**
 * Filtruje tekst dostępności przedsprzedaży.
 *
 * @param string      $text         Tekst dostępności
 * @param string      $release_date Data premiery (Y-m-d)
 * @param \WC_Product $product      Obiekt produktu
 */
apply_filters('polski_pro/preorder/availability_text', string $text, string $release_date, \WC_Product $product): string;
```

## Kompatybilność z wariantami

Moduł przedsprzedaży działa z produktami wariantowymi. Każdy wariant może mieć niezależne ustawienia pre-order:

- Wariant A - standardowy (dostępny od razu)
- Wariant B - pre-order (premiera za 2 tygodnie)

Mieszanie wariantów pre-order i standardowych w ramach jednego produktu jest dozwolone - walidacja koszyka dotyczy tylko mieszania różnych produktów.

## Rozwiązywanie problemów

**Produkt nie przełącza się automatycznie po dacie premiery**
Sprawdź, czy WP-Cron działa poprawnie. Jeśli korzystasz z zewnętrznego CRON-a, upewnij się, że `wp-cron.php` jest wywoływany regularnie. Alternatywnie uruchom ręcznie: `wp cron event run polski_pro_preorder_check`.

**Klient dodał produkty pre-order i zwykłe do koszyka**
Sprawdź, czy opcja "Blokuj mieszanie koszyka" jest włączona. Wyczyść cache, jeśli korzystasz z wtyczek cache'ujących fragmenty koszyka.

**Data premiery wyświetla się w złym formacie**
Sprawdź ustawienie "Format daty" w konfiguracji modułu. Format korzysta ze standardowych placeholderów PHP `date()`.

## Dalsze kroki

- Zgłaszaj problemy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Powiązane moduły: [Pakiety i dodatki](/pro/bundles-addons)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
