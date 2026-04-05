---
title: Nadpisywanie szablonów
description: Nadpisywanie szablonów Polski for WooCommerce w motywie - lista plików, struktura katalogów i przykłady.
---

Polski for WooCommerce korzysta z systemu szablonów wzorowanego na WooCommerce. Możesz nadpisać dowolny szablon wtyczki kopiując go do katalogu `yourtheme/polski/` w swoim motywie.

## Jak nadpisać szablon

1. Znajdź oryginalny szablon w katalogu wtyczki: `wp-content/plugins/polski/templates/`
2. Skopiuj plik do katalogu motywu: `wp-content/themes/twoj-motyw/polski/`
3. Zachowaj strukturę podkatalogów
4. Zmodyfikuj skopiowany plik

Wtyczka automatycznie wykryje szablon w motywie i użyje go zamiast domyślnego.

**Przykład:** aby nadpisać szablon ceny Omnibus, skopiuj:

```
wp-content/plugins/polski/templates/omnibus/price-display.php
```

do:

```
wp-content/themes/twoj-motyw/polski/omnibus/price-display.php
```

## Motyw potomny (child theme)

Jeśli korzystasz z motywu potomnego, szablony umieszczaj w katalogu motywu potomnego. Wtyczka szuka szablonów w następującej kolejności:

1. `wp-content/themes/motyw-potomny/polski/`
2. `wp-content/themes/motyw-rodzic/polski/`
3. `wp-content/plugins/polski/templates/`

## Lista szablonów

### Wymogi prawne

| Plik szablonu                            | Opis                                    |
| ---------------------------------------- | --------------------------------------- |
| `omnibus/price-display.php`              | Wyświetlanie ceny Omnibus               |
| `omnibus/price-history.php`              | Historia cen (tabela)                   |
| `gpsr/product-info.php`                  | Informacje GPSR na stronie produktu     |
| `gpsr/safety-sheet.php`                  | Karta bezpieczeństwa produktu           |
| `withdrawal/form.php`                    | Formularz odstąpienia od umowy          |
| `withdrawal/confirmation.php`            | Potwierdzenie złożenia odstąpienia      |
| `withdrawal/email.php`                   | Szablon e-maila potwierdzenia           |
| `dsa/report-form.php`                    | Formularz zgłoszenia DSA                |
| `dsa/report-confirmation.php`            | Potwierdzenie zgłoszenia DSA            |
| `gdpr/consent-checkboxes.php`            | Checkboxy zgód RODO                     |
| `ksef/invoice-template.php`              | Szablon faktury KSeF                    |
| `greenwashing/product-claims.php`        | Oświadczenia środowiskowe produktu      |
| `legal-pages/terms-template.php`         | Szablon regulaminu sklepu               |
| `legal-pages/privacy-template.php`       | Szablon polityki prywatności            |
| `legal-pages/withdrawal-template.php`    | Szablon informacji o odstąpieniu        |

### Ceny i informacje o produkcie

| Plik szablonu                            | Opis                                    |
| ---------------------------------------- | --------------------------------------- |
| `prices/unit-price.php`                  | Cena jednostkowa                        |
| `prices/vat-notice.php`                  | Informacja o VAT i dostawie             |
| `prices/delivery-time.php`               | Szacowany czas dostawy                  |
| `manufacturer/info.php`                  | Informacje o producencie                |
| `manufacturer/logo.php`                  | Logo producenta                         |

### Produkty spożywcze

| Plik szablonu                            | Opis                                    |
| ---------------------------------------- | --------------------------------------- |
| `food/nutrients-table.php`               | Tabela wartości odżywczych              |
| `food/allergens-list.php`                | Lista alergenów                         |
| `food/nutri-score.php`                   | Oznaczenie Nutri-Score                  |

### Kasa i zamówienia

| Plik szablonu                            | Opis                                    |
| ---------------------------------------- | --------------------------------------- |
| `checkout/button-label.php`              | Etykieta przycisku zamówienia           |
| `checkout/legal-checkboxes.php`          | Checkboxy prawne na kasie               |
| `checkout/nip-field.php`                 | Pole NIP z autouzupełnianiem            |
| `checkout/doi-notice.php`                | Komunikat double opt-in                 |

### Moduły sklepowe

| Plik szablonu                            | Opis                                    |
| ---------------------------------------- | --------------------------------------- |
| `wishlist/table.php`                     | Tabela listy życzeń                     |
| `wishlist/button.php`                    | Przycisk dodania do listy               |
| `wishlist/header-icon.php`               | Ikona w nagłówku                        |
| `compare/table.php`                      | Tabela porównania                       |
| `compare/button.php`                     | Przycisk porównania                     |
| `compare/floating-bar.php`               | Pasek porównania (dół ekranu)           |
| `quick-view/modal.php`                   | Okno lightbox szybkiego podglądu        |
| `quick-view/button.php`                  | Przycisk szybkiego podglądu             |
| `ajax-search/form.php`                   | Pole wyszukiwarki AJAX                  |
| `ajax-search/results.php`               | Dropdown z wynikami wyszukiwania        |
| `ajax-search/result-item.php`           | Pojedynczy wynik wyszukiwania           |
| `ajax-filters/container.php`            | Kontener filtrów AJAX                   |
| `ajax-filters/filter-category.php`      | Filtr kategorii                         |
| `ajax-filters/filter-price.php`         | Filtr ceny (suwak)                      |
| `ajax-filters/filter-attribute.php`     | Filtr atrybutu                          |
| `ajax-filters/active-filters.php`       | Pasek aktywnych filtrów                 |
| `product-slider/slider.php`             | Kontener slidera                        |
| `product-slider/item.php`               | Karta produktu w sliderze               |
| `badges/badge.php`                       | Pojedyncza etykieta                     |
| `badges/container.php`                   | Kontener etykiet na produkcie           |
| `waitlist/form.php`                      | Formularz listy oczekujących            |
| `waitlist/email.php`                     | E-mail powiadomienia o dostępności      |

### Narzędzia

| Plik szablonu                            | Opis                                    |
| ---------------------------------------- | --------------------------------------- |
| `tools/compliance-checklist.php`         | Lista kontrolna zgodności               |
| `tools/audit-report.php`                | Raport z audytu                         |
| `tools/security-incident-form.php`      | Formularz incydentu bezpieczeństwa      |
| `tools/verified-review-badge.php`       | Odznaka zweryfikowanej opinii           |

## Dostępne zmienne w szablonach

Każdy szablon otrzymuje zestaw zmiennych. Przykład dla `omnibus/price-display.php`:

```php
<?php
/**
 * Szablon wyświetlania ceny Omnibus
 *
 * Dostępne zmienne:
 * @var float  $lowest_price  Najniższa cena z okresu
 * @var int    $days          Liczba dni
 * @var int    $product_id    ID produktu
 * @var string $price_html    Sformatowana cena HTML
 * @var string $date          Data najniższej ceny
 *
 * @package Polski
 */

defined('ABSPATH') || exit;
?>

<div class="polski-omnibus-price">
    <span class="polski-omnibus-label">
        <?php printf(
            esc_html__('Najniższa cena z %d dni przed obniżką:', 'polski'),
            $days
        ); ?>
    </span>
    <span class="polski-omnibus-amount">
        <?php echo wp_kses_post($price_html); ?>
    </span>
</div>
```

## Sprawdzanie wersji szablonu

Każdy szablon zawiera komentarz `@version` w nagłówku. Po aktualizacji wtyczki sprawdź, czy Twoje nadpisane szablony wymagają aktualizacji.

Wtyczka wyświetla ostrzeżenie w panelu admina (**WooCommerce > Status > Polski**), jeśli wykryje przestarzałe szablony w motywie.

```php
/**
 * @version 1.5.0
 */
```

## Hook do zmiany ścieżki szablonów

Jeśli chcesz zmienić domyślną lokalizację szablonów w motywie:

```php
add_filter('polski/template/path', function (string $path): string {
    return 'custom-polski-templates/'; // zamiast 'polski/'
});
```

Wtedy szablony szukane będą w: `wp-content/themes/twoj-motyw/custom-polski-templates/`

## Debugowanie szablonów

Aby sprawdzić, który szablon jest aktualnie ładowany, włącz tryb debug:

```php
// W wp-config.php
define('POLSKI_TEMPLATE_DEBUG', true);
```

W trybie debug każdy szablon otoczony jest komentarzami HTML wskazującymi ścieżkę:

```html
<!-- polski template: /themes/twoj-motyw/polski/omnibus/price-display.php -->
...
<!-- /polski template -->
```

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Przed wdrożeniem skonsultuj się z prawnikiem. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
