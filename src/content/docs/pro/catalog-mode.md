---
title: Tryb katalogowy B2B
description: Moduł trybu katalogowego Polski PRO for WooCommerce - ukrywanie cen, blokada zakupów, przekierowanie do zapytań ofertowych i integracja z modułem RFQ.
---

Tryb katalogowy zamienia sklep w katalog bez możliwości zakupu. Ukryj ceny, zamień przyciski na komunikaty lub przekieruj do zapytania ofertowego. Przeznaczony dla sklepów B2B z indywidualnymi cenami.

:::note[Wymagania]
Polski PRO wymaga: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Konfiguracja

Przejdź do **WooCommerce > Ustawienia > Polski PRO > Tryb katalogowy** i włącz moduł (opcja `polski_catalog`).

### Ustawienia główne

| Ustawienie | Opcja w bazie | Domyślna wartość | Opis |
|------------|---------------|------------------|------|
| Włącz tryb katalogowy | `polski_catalog` | Nie | Aktywuje tryb katalogowy |
| Ukryj ceny | `polski_catalog_hide_prices` | Tak | Usuwa wyświetlanie cen |
| Ukryj przycisk koszyka | `polski_catalog_hide_cart` | Tak | Usuwa przycisk "Dodaj do koszyka" |
| Tekst zastępczy ceny | `polski_catalog_price_text` | "Zapytaj o cenę" | Tekst wyświetlany zamiast ceny |
| Komunikat na produkcie | `polski_catalog_notice` | "" | Komunikat wyświetlany na stronie produktu |
| Przekieruj do RFQ | `polski_catalog_redirect_rfq` | Nie | Przekierowanie do formularza zapytania ofertowego |
| Tryb warunkowy | `polski_catalog_conditional` | `all` | `all`, `guests`, `roles` |

### Tryb warunkowy

Tryb katalogowy może być aktywny:

- **Dla wszystkich** (`all`) - każdy widzi katalog bez cen
- **Tylko dla niezalogowanych** (`guests`) - zalogowani klienci widzą ceny i mogą kupować
- **Dla wybranych ról** (`roles`) - katalog aktywny tylko dla wybranych ról WordPress

Tryb "Tylko dla niezalogowanych" jest popularny w B2B - hurtownia wymaga rejestracji przed odsłonięciem cen.

```php
// Przykład: własna logika warunkowa
add_filter('polski_pro/catalog/is_active', function (bool $is_active): bool {
    // Wyłącz tryb katalogowy dla klientów z co najmniej 5 zamówieniami
    if (is_user_logged_in()) {
        $order_count = wc_get_customer_order_count(get_current_user_id());
        if ($order_count >= 5) {
            return false;
        }
    }
    return $is_active;
});
```

## Mechanizm działania

### Ukrywanie cen

Moduł używa filtra `woocommerce_get_price_html` i zastępuje cenę skonfigurowanym tekstem.

```php
/**
 * Filtruje tekst zastępczy ceny w trybie katalogowym.
 *
 * @param string      $replacement Tekst zastępczy
 * @param \WC_Product $product     Obiekt produktu
 */
apply_filters('polski_pro/catalog/price_replacement', string $replacement, \WC_Product $product): string;
```

**Przykład - różne teksty dla kategorii:**

```php
add_filter('polski_pro/catalog/price_replacement', function (string $replacement, \WC_Product $product): string {
    if (has_term('premium', 'product_cat', $product->get_id())) {
        return '<span class="price-inquiry">Cena ustalana indywidualnie</span>';
    }
    return $replacement;
}, 10, 2);
```

### Blokada zakupów

Moduł blokuje zakup filtrem `woocommerce_is_purchasable`:

```php
/**
 * Filtruje, czy produkt jest dostępny do zakupu w trybie katalogowym.
 *
 * @param bool        $purchasable Czy produkt jest dostępny do zakupu
 * @param \WC_Product $product     Obiekt produktu
 */
apply_filters('polski_pro/catalog/is_purchasable', bool $purchasable, \WC_Product $product): bool;
```

**Przykład - zezwolenie na zakup wybranych produktów:**

```php
add_filter('polski_pro/catalog/is_purchasable', function (bool $purchasable, \WC_Product $product): bool {
    $always_purchasable = [101, 102, 103]; // ID produktów zawsze dostępnych
    if (in_array($product->get_id(), $always_purchasable, true)) {
        return true;
    }
    return $purchasable;
}, 10, 2);
```

### Komunikat na stronie produktu

Gdy `polski_catalog_notice` jest ustawiony, na stronie produktu wyświetla się komunikat o trybie katalogowym.

Przykład komunikatu:

> Aby poznać cenę tego produktu, skontaktuj się z naszym zespołem handlowym lub wypełnij formularz zapytania ofertowego.

## Integracja z modułem zapytań ofertowych

Gdy `polski_catalog_redirect_rfq` jest włączone, przycisk kieruje do formularza zapytania ofertowego ([moduł RFQ](/pro/quotes)):

1. Przycisk "Zapytaj o cenę" zamiast "Dodaj do koszyka"
2. Automatyczne przekazanie ID produktu do formularza RFQ
3. Pre-fill nazwy produktu w formularzu
4. Powrót do produktu po wysłaniu zapytania

Aby integracja działała, oba moduły - katalogowy i RFQ - muszą być aktywne.

## Ukrywanie elementów

Moduł automatycznie ukrywa:

| Element | Hook WooCommerce | Efekt |
|---------|-----------------|-------|
| Przycisk "Dodaj do koszyka" | `woocommerce_is_purchasable` | Produkt oznaczony jako niedostępny do zakupu |
| Cena | `woocommerce_get_price_html` | HTML ceny zastąpiony tekstem |
| Ikona koszyka w nagłówku | `polski_pro/catalog/hide_cart_icon` | Ukrywa ikonę mini-koszyka |
| Strona koszyka | `template_redirect` | Przekierowanie z /cart/ na stronę główną |
| Strona kasy | `template_redirect` | Przekierowanie z /checkout/ na stronę główną |

### Selektywne ukrywanie

Każdą opcję włącz lub wyłącz niezależnie. Na przykład:

- Ukryj ceny, ale zostaw przycisk koszyka (klient kupuje "za nieznaną cenę" - kontakt po zamówieniu)
- Ukryj przycisk koszyka, ale pokaż ceny (klient widzi ceny, ale musi zapytać o zakup)
- Ukryj wszystko (pełny tryb katalogowy)

## Wykluczanie produktów i kategorii

### Wykluczanie produktów

Wyklucz produkt z trybu katalogowego: edycja produktu > **Polski PRO > Tryb katalogowy** > zaznacz "Wyklucz z trybu katalogowego".

### Wykluczanie kategorii

```php
/**
 * Filtruje kategorie wykluczone z trybu katalogowego.
 *
 * @param array $excluded_categories Tablica ID kategorii
 */
apply_filters('polski_pro/catalog/excluded_categories', array $excluded_categories): array;
```

**Przykład:**

```php
add_filter('polski_pro/catalog/excluded_categories', function (array $excluded_categories): array {
    $excluded_categories[] = 15; // "Akcesoria" - zawsze dostępne do zakupu
    $excluded_categories[] = 28; // "Outlet"
    return $excluded_categories;
});
```

## CSS klasy pomocnicze

Moduł dodaje klasy CSS do `<body>` ułatwiające stylowanie:

| Klasa | Kiedy dodawana |
|-------|----------------|
| `polski-catalog-mode` | Tryb katalogowy jest aktywny |
| `polski-catalog-prices-hidden` | Ceny są ukryte |
| `polski-catalog-cart-hidden` | Przycisk koszyka jest ukryty |

**Przykład CSS:**

```css
.polski-catalog-mode .price {
    display: none; /* Dodatkowe ukrycie ceny, jeśli motyw nie respektuje filtra */
}

.polski-catalog-mode .single_add_to_cart_button {
    background-color: #0073aa;
    content: "Zapytaj o cenę";
}
```

## Rozwiązywanie problemów

**Ceny nadal się wyświetlają mimo włączenia trybu katalogowego**
Niektóre motywy używają niestandardowych metod wyświetlania cen, omijając filtr `woocommerce_get_price_html`. Użyj klas CSS `.polski-catalog-prices-hidden .price { display: none; }` jako zabezpieczenia.

**Klient może dodać produkt do koszyka przez bezpośredni URL**
Moduł blokuje to na poziomie filtra `woocommerce_is_purchasable`. Jeśli problem występuje, sprawdź, czy inna wtyczka nie nadpisuje tego filtra z wyższym priorytetem.

**Tryb warunkowy nie działa poprawnie z cache**
Wtyczki cache'ujące mogą serwować wersję cache'owaną niezależnie od stanu zalogowania. Skonfiguruj wtyczkę cache, aby rozdzielała cache dla zalogowanych i niezalogowanych użytkowników.

## Dalsze kroki

- Zgłaszaj problemy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Powiązane moduły: [Zapytania ofertowe](/pro/quotes)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
