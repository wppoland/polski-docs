---
title: Pakiety, dodatki i "często kupowane razem"
description: Moduły pakietów produktowych, dodatków do produktu i rekomendacji "często kupowane razem" w Polski PRO for WooCommerce.
---

Polski PRO for WooCommerce oferuje trzy uzupełniające się moduły sprzedażowe: pakiety produktowe (bundles), dodatki do produktu (add-ons) oraz rekomendacje "często kupowane razem" (frequently bought together). Każdy moduł działa niezależnie i może być włączony osobno.

:::note[Wymagania]
Polski PRO wymaga: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Pakiety produktowe (bundles)

Moduł pakietów pozwala tworzyć konfigurowalne zestawy produktów ze wspólnym rabatem. Klient kupuje pakiet jako jeden produkt, a poszczególne składniki są widoczne w szczegółach zamówienia.

### Konfiguracja

Przejdź do **WooCommerce > Ustawienia > Polski PRO > Pakiety** i włącz moduł (opcja `polski_bundles`).

| Ustawienie | Domyślna wartość | Opis |
|------------|------------------|------|
| Włącz pakiety | Nie | Aktywuje funkcjonalność pakietów |
| Sposób rabatu | Procent | `percent` (procentowy) lub `fixed` (kwotowy) |
| Domyślny rabat | 10% | Rabat stosowany do nowych pakietów |
| Wyświetlaj oszczędność | Tak | Pokazuje kwotę oszczędności klientowi |

### Tworzenie pakietu

1. Przejdź do **Produkty > Dodaj nowy**
2. W sekcji **Dane produktu** wybierz typ "Pakiet Polski PRO"
3. W zakładce **Składniki pakietu** dodaj produkty
4. Ustaw ilość każdego składnika
5. Skonfiguruj rabat (nadpisuje domyślny)

### Obliczanie rabatu

Cena pakietu jest obliczana automatycznie:

```
Cena pakietu = Suma cen składników - Rabat

Przykład (rabat 15%):
Produkt A: 100 zł x 1 = 100 zł
Produkt B:  50 zł x 2 = 100 zł
Suma:                    200 zł
Rabat (15%):              30 zł
Cena pakietu:            170 zł
```

Jeśli składnik pakietu jest w promocji, do obliczeń używana jest cena promocyjna.

### Shortcode pakietu

```
[polski_bundle product_id="456" show_savings="yes" layout="grid"]
```

| Parametr | Wymagany | Opis |
|----------|----------|------|
| `product_id` | Tak | ID produktu-pakietu |
| `show_savings` | Nie | Wyświetl kwotę oszczędności (`yes`/`no`) |
| `layout` | Nie | Układ: `grid`, `list`, `compact` |

### Hooki pakietów

```php
/**
 * Filtruje obliczoną cenę pakietu.
 *
 * @param float $bundle_price Obliczona cena pakietu
 * @param array $items        Składniki pakietu z cenami
 * @param float $discount     Wartość rabatu
 */
apply_filters('polski_pro/bundles/price', float $bundle_price, array $items, float $discount): float;
```

**Przykład - minimalna cena pakietu:**

```php
add_filter('polski_pro/bundles/price', function (float $bundle_price, array $items, float $discount): float {
    $minimum_price = 49.99;
    return max($bundle_price, $minimum_price);
}, 10, 3);
```

```php
/**
 * Akcja wywoływana po dodaniu pakietu do koszyka.
 *
 * @param string $cart_item_key Klucz pozycji w koszyku
 * @param int    $bundle_id    ID produktu-pakietu
 * @param array  $items        Składniki pakietu
 */
do_action('polski_pro/bundles/added_to_cart', string $cart_item_key, int $bundle_id, array $items);
```

## Dodatki do produktu (add-ons)

Moduł dodatków pozwala wyświetlać opcjonalne produkty upsellowe bezpośrednio na stronie produktu. Klient może wybrać dodatkowe produkty i kupić je jednym kliknięciem razem z produktem głównym.

### Konfiguracja

Przejdź do **WooCommerce > Ustawienia > Polski PRO > Dodatki** i włącz moduł (opcja `polski_addons`).

| Ustawienie | Domyślna wartość | Opis |
|------------|------------------|------|
| Włącz dodatki | Nie | Aktywuje funkcjonalność dodatków |
| Pozycja wyświetlania | Po przycisku koszyka | Gdzie wyświetlić sekcję dodatków |
| Nagłówek sekcji | "Dodaj do zamówienia" | Tekst nagłówka nad listą dodatków |
| Maksymalna liczba | 5 | Limit wyświetlanych dodatków na produkcie |

### Przypisywanie dodatków

Dodatki konfiguruje się w edycji produktu, w zakładce **Dodatki Polski PRO**:

1. Kliknij "Dodaj dodatek"
2. Wybierz produkt z katalogu
3. Ustaw cenę dodatku (domyślnie cena produktu)
4. Opcjonalnie ustaw cenę promocyjną dodatku
5. Określ kolejność wyświetlania

Dodatki mogą mieć inną cenę niż produkt źródłowy - pozwala to na oferowanie specjalnych cen "razem z produktem".

### Walidacja wyboru

Moduł waliduje:

- Dostępność magazynową każdego wybranego dodatku
- Poprawność cen (czy nie zostały zmodyfikowane po stronie klienta)
- Limity ilościowe

### Hooki dodatków

```php
/**
 * Filtruje listę dodatków dla produktu.
 *
 * @param array       $addons  Tablica dodatków z cenami
 * @param \WC_Product $product Produkt główny
 */
apply_filters('polski_pro/addons/items', array $addons, \WC_Product $product): array;
```

**Przykład - filtrowanie dodatków na podstawie roli użytkownika:**

```php
add_filter('polski_pro/addons/items', function (array $addons, \WC_Product $product): array {
    if (current_user_can('wholesale_customer')) {
        foreach ($addons as &$addon) {
            $addon['price'] = $addon['price'] * 0.8; // 20% rabatu hurtowego
        }
    }
    return $addons;
}, 10, 2);
```

## Często kupowane razem (frequently bought together)

Moduł rekomendacji wyświetla produkty najczęściej kupowane razem z przeglądanym produktem, z możliwością dodania wielu produktów do koszyka jednym kliknięciem.

### Konfiguracja

Przejdź do **WooCommerce > Ustawienia > Polski PRO > Często kupowane razem** i włącz moduł (opcja `polski_fbt`).

| Ustawienie | Domyślna wartość | Opis |
|------------|------------------|------|
| Włącz moduł | Nie | Aktywuje rekomendacje |
| Źródło danych | Ręczne | `manual` (ręczne) lub `auto` (na podstawie zamówień) |
| Limit produktów | 3 | Maksymalna liczba rekomendowanych produktów |
| Nagłówek sekcji | "Często kupowane razem" | Tekst nagłówka sekcji |
| Pozycja | Pod opisem krótkim | Gdzie wyświetlić sekcję |

### Ręczne przypisywanie

W edycji produktu, zakładka **Często kupowane razem**:

1. Wyszukaj i dodaj powiązane produkty
2. Ustaw kolejność wyświetlania
3. Opcjonalnie ustaw rabat za zakup razem

### Automatyczne rekomendacje

Gdy źródło danych jest ustawione na `auto`, moduł analizuje historię zamówień i identyfikuje produkty najczęściej kupowane razem. Analiza jest uruchamiana raz dziennie przez WP-Cron.

### Dodawanie do koszyka

Sekcja "Często kupowane razem" wyświetla:

- Checkboxy przy każdym rekomendowanym produkcie
- Miniaturki i nazwy produktów
- Ceny poszczególnych produktów
- Łączną cenę wybranych produktów
- Przycisk "Dodaj wszystkie do koszyka"

Klient zaznacza wybrane produkty i dodaje je jednym kliknięciem. Wszystkie produkty trafiają do koszyka jako osobne pozycje.

### Shortcode

```
[polski_fbt product_id="789" limit="4" show_prices="yes"]
```

| Parametr | Wymagany | Opis |
|----------|----------|------|
| `product_id` | Nie | ID produktu głównego (domyślnie bieżący) |
| `limit` | Nie | Maksymalna liczba rekomendacji |
| `show_prices` | Nie | Wyświetlaj ceny (`yes`/`no`) |

### Hooki FBT

```php
/**
 * Filtruje listę rekomendowanych produktów.
 *
 * @param array $product_ids Tablica ID rekomendowanych produktów
 * @param int   $product_id  ID produktu głównego
 * @param string $source     Źródło: 'manual' lub 'auto'
 */
apply_filters('polski_pro/fbt/products', array $product_ids, int $product_id, string $source): array;
```

**Przykład - wykluczenie produktów z wybranej kategorii:**

```php
add_filter('polski_pro/fbt/products', function (array $product_ids, int $product_id, string $source): array {
    $excluded_category_id = 42;
    return array_filter($product_ids, function (int $id) use ($excluded_category_id): bool {
        return ! has_term($excluded_category_id, 'product_cat', $id);
    });
}, 10, 3);
```

## Współdziałanie modułów

Wszystkie trzy moduły mogą działać jednocześnie na tym samym produkcie:

- **Pakiet** z przypisanymi **dodatkami** i sekcją **często kupowane razem**
- Składniki pakietu mogą mieć własne dodatki
- Rekomendacje FBT mogą wskazywać na pakiety

Kolejność wyświetlania na stronie produktu jest konfigurowalna za pomocą priorytetu hooków WooCommerce.

## Rozwiązywanie problemów

**Cena pakietu nie aktualizuje się po zmianie cen składników**
Cena pakietu jest obliczana dynamicznie. Wyczyść cache obiektów (Object Cache) i transients WooCommerce.

**Dodatki nie wyświetlają się na stronie produktu**
Sprawdź, czy motyw obsługuje hook `woocommerce_after_add_to_cart_button`. Niektóre niestandardowe motywy pomijają standardowe hooki WooCommerce.

**Rekomendacje automatyczne są puste**
Moduł potrzebuje danych historycznych - rekomendacje automatyczne pojawiają się po zebraniu wystarczającej liczby zamówień. Sprawdź, czy zadanie WP-Cron `polski_pro_fbt_analyze` jest zaplanowane.

## Dalsze kroki

- Zgłaszaj problemy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Powiązane moduły: [Przedsprzedaż](/pro/preorders), [Tryb katalogowy](/pro/catalog-mode)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
