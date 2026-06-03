---
title: Přepisování šablon
description: Přepisování šablon Polski for WooCommerce v motivu - seznam souborů, struktura adresářů a příklady.
---

Systém šablon inspirovaný WooCommerce. Přepište libovolnou šablonu zkopírováním do `yourtheme/polski/` v motivu.

## Jak přepsat šablonu

1. Najděte originální šablonu v adresáři pluginu: `wp-content/plugins/polski/templates/`
2. Zkopírujte soubor do adresáře motivu: `wp-content/themes/vas-motiv/polski/`
3. Zachovejte strukturu podadresářů
4. Upravte zkopírovaný soubor

Plugin automaticky použije šablonu z motivu místo výchozí.

**Příklad:** pro přepsání šablony ceny Omnibus zkopírujte:

```
wp-content/plugins/polski/templates/omnibus/price-display.php
```

do:

```
wp-content/themes/vas-motiv/polski/omnibus/price-display.php
```

## Potomkovský motiv (child theme)

U potomkovského motivu umisťujte šablony do adresáře potomkovského motivu. Pořadí hledání:

1. `wp-content/themes/potomkovsky-motiv/polski/`
2. `wp-content/themes/rodicovsky-motiv/polski/`
3. `wp-content/plugins/polski/templates/`

## Seznam šablon

### Právní požadavky

| Soubor šablony                           | Popis                                   |
| ---------------------------------------- | --------------------------------------- |
| `omnibus/price-display.php`              | Zobrazení ceny Omnibus                  |
| `omnibus/price-history.php`              | Historie cen (tabulka)                  |
| `gpsr/product-info.php`                  | Informace GPSR na stránce produktu      |
| `gpsr/safety-sheet.php`                  | Bezpečnostní list produktu              |
| `withdrawal/form.php`                    | Formulář odstoupení od smlouvy          |
| `withdrawal/confirmation.php`            | Potvrzení podání odstoupení             |
| `withdrawal/email.php`                   | Šablona e-mailu potvrzení               |
| `dsa/report-form.php`                    | Formulář hlášení DSA                    |
| `dsa/report-confirmation.php`            | Potvrzení hlášení DSA                   |
| `gdpr/consent-checkboxes.php`            | Checkboxy souhlasu GDPR                 |
| `ksef/invoice-template.php`              | Šablona faktury KSeF                    |
| `greenwashing/product-claims.php`        | Environmentální prohlášení produktu     |
| `legal-pages/terms-template.php`         | Šablona obchodních podmínek             |
| `legal-pages/privacy-template.php`       | Šablona zásad ochrany osobních údajů    |
| `legal-pages/withdrawal-template.php`    | Šablona informace o odstoupení          |

### Ceny a informace o produktu

| Soubor šablony                           | Popis                                   |
| ---------------------------------------- | --------------------------------------- |
| `prices/unit-price.php`                  | Jednotková cena                         |
| `prices/vat-notice.php`                  | Informace o DPH a doručení              |
| `prices/delivery-time.php`               | Odhadovaná doba dodání                  |
| `manufacturer/info.php`                  | Informace o výrobci                     |
| `manufacturer/logo.php`                  | Logo výrobce                            |

### Potraviny

| Soubor šablony                           | Popis                                   |
| ---------------------------------------- | --------------------------------------- |
| `food/nutrients-table.php`               | Tabulka výživových hodnot               |
| `food/allergens-list.php`                | Seznam alergenů                         |
| `food/nutri-score.php`                   | Označení Nutri-Score                    |

### Pokladna a objednávky

| Soubor šablony                           | Popis                                   |
| ---------------------------------------- | --------------------------------------- |
| `checkout/button-label.php`              | Popisek tlačítka objednávky             |
| `checkout/legal-checkboxes.php`          | Právní checkboxy na pokladně            |
| `checkout/nip-field.php`                 | Pole NIP s automatickým doplňováním     |
| `checkout/doi-notice.php`                | Zpráva double opt-in                    |

### Moduly obchodu

| Soubor šablony                           | Popis                                   |
| ---------------------------------------- | --------------------------------------- |
| `wishlist/table.php`                     | Tabulka seznamu přání                   |
| `wishlist/button.php`                    | Tlačítko přidání na seznam              |
| `wishlist/header-icon.php`               | Ikona v hlavičce                        |
| `compare/table.php`                      | Tabulka porovnání                       |
| `compare/button.php`                     | Tlačítko porovnání                      |
| `compare/floating-bar.php`               | Lišta porovnání (dolní část obrazovky)  |
| `quick-view/modal.php`                   | Okno lightbox rychlého náhledu          |
| `quick-view/button.php`                  | Tlačítko rychlého náhledu               |
| `ajax-search/form.php`                   | Pole AJAX vyhledávače                   |
| `ajax-search/results.php`                | Dropdown s výsledky vyhledávání         |
| `ajax-search/result-item.php`            | Jednotlivý výsledek vyhledávání         |
| `ajax-filters/container.php`             | Kontejner AJAX filtrů                   |
| `ajax-filters/filter-category.php`       | Filtr kategorie                         |
| `ajax-filters/filter-price.php`          | Filtr ceny (posuvník)                   |
| `ajax-filters/filter-attribute.php`      | Filtr atributu                          |
| `ajax-filters/active-filters.php`        | Lišta aktivních filtrů                  |
| `product-slider/slider.php`              | Kontejner slideru                       |
| `product-slider/item.php`                | Karta produktu ve slideru               |
| `badges/badge.php`                       | Jednotlivý štítek                       |
| `badges/container.php`                   | Kontejner štítků na produktu            |
| `waitlist/form.php`                      | Formulář seznamu čekajících             |
| `waitlist/email.php`                     | E-mail oznámení o dostupnosti           |

### Nástroje

| Soubor šablony                           | Popis                                   |
| ---------------------------------------- | --------------------------------------- |
| `tools/compliance-checklist.php`         | Kontrolní seznam souladu                |
| `tools/audit-report.php`                 | Zpráva z auditu                         |
| `tools/security-incident-form.php`       | Formulář bezpečnostního incidentu       |
| `tools/verified-review-badge.php`        | Odznak ověřené recenze                  |

## Dostupné proměnné v šablonách

Každá šablona obdrží sadu proměnných. Příklad pro `omnibus/price-display.php`:

```php
<?php
/**
 * Šablona zobrazení ceny Omnibus
 *
 * Dostupné proměnné:
 * @var float  $lowest_price  Nejnižší cena za období
 * @var int    $days          Počet dní
 * @var int    $product_id    ID produktu
 * @var string $price_html    Formátovaná cena HTML
 * @var string $date          Datum nejnižší ceny
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

## Kontrola verze šablony

Každá šablona má komentář `@version`. Po aktualizaci pluginu zkontrolujte, zda přepsané šablony vyžadují aktualizaci.

Varování o zastaralých šablonách se objevuje v **WooCommerce > Stav > Polski**.

```php
/**
 * @version 1.5.0
 */
```

## Hook pro změnu cesty šablon

Pokud chcete změnit výchozí umístění šablon v motivu:

```php
add_filter('polski/template/path', function (string $path): string {
    return 'custom-polski-templates/'; // místo 'polski/'
});
```

Pak budou šablony hledány v: `wp-content/themes/vas-motiv/custom-polski-templates/`

## Ladění šablon

Zjistěte, která šablona je načítána, zapnutím režimu ladění:

```php
// Ve wp-config.php
define('POLSKI_TEMPLATE_DEBUG', true);
```

V režimu ladění je každá šablona obklopena HTML komentáři s cestou:

```html
<!-- polski template: /themes/vas-motiv/polski/omnibus/price-display.php -->
...
<!-- /polski template -->
```

Hlášení problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
