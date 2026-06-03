---
title: Prepísanie šablón
description: Prepísanie šablón Polski for WooCommerce v téme - zoznam súborov, štruktúra adresárov a príklady.
---

Systém šablón vychádza z WooCommerce. Prepíš ľubovoľnú šablónu skopírovaním do `yourtheme/polski/` v téme.

## Ako prepísať šablónu

1. Nájdi pôvodnú šablónu v adresári pluginu: `wp-content/plugins/polski/templates/`
2. Skopíruj súbor do adresára témy: `wp-content/themes/tvoja-tema/polski/`
3. Zachovaj štruktúru podadresárov
4. Uprav skopírovaný súbor

Plugin automaticky použije šablónu z témy namiesto predvolenej.

**Príklad:** ak chceš prepísať šablónu ceny Omnibus, skopíruj:

```
wp-content/plugins/polski/templates/omnibus/price-display.php
```

do:

```
wp-content/themes/tvoja-tema/polski/omnibus/price-display.php
```

## Podriadená téma (child theme)

Pri podriadenej téme umiestňuj šablóny do adresára podriadenej témy. Poradie hľadania:

1. `wp-content/themes/podriadena-tema/polski/`
2. `wp-content/themes/rodicovska-tema/polski/`
3. `wp-content/plugins/polski/templates/`

## Zoznam šablón

### Právne požiadavky

| Súbor šablóny                            | Popis                                   |
| ---------------------------------------- | --------------------------------------- |
| `omnibus/price-display.php`              | Zobrazenie ceny Omnibus                 |
| `omnibus/price-history.php`              | História cien (tabuľka)                 |
| `gpsr/product-info.php`                  | Informácie GPSR na stránke produktu     |
| `gpsr/safety-sheet.php`                  | Bezpečnostný list produktu              |
| `withdrawal/form.php`                    | Formulár na odstúpenie od zmluvy        |
| `withdrawal/confirmation.php`            | Potvrdenie podania odstúpenia           |
| `withdrawal/email.php`                   | Šablóna e-mailu potvrdenia              |
| `dsa/report-form.php`                    | Formulár hlásenia DSA                   |
| `dsa/report-confirmation.php`            | Potvrdenie hlásenia DSA                 |
| `gdpr/consent-checkboxes.php`            | Checkboxy súhlasov GDPR                 |
| `ksef/invoice-template.php`              | Šablóna faktúry KSeF                    |
| `greenwashing/product-claims.php`        | Environmentálne vyhlásenia produktu     |
| `legal-pages/terms-template.php`         | Šablóna obchodných podmienok            |
| `legal-pages/privacy-template.php`       | Šablóna zásad ochrany osobných údajov   |
| `legal-pages/withdrawal-template.php`    | Šablóna informácie o odstúpení          |

### Ceny a informácie o produkte

| Súbor šablóny                            | Popis                                   |
| ---------------------------------------- | --------------------------------------- |
| `prices/unit-price.php`                  | Jednotková cena                         |
| `prices/vat-notice.php`                  | Informácia o DPH a doručení             |
| `prices/delivery-time.php`               | Odhadovaný čas doručenia                |
| `manufacturer/info.php`                  | Informácie o výrobcovi                  |
| `manufacturer/logo.php`                  | Logo výrobcu                            |

### Potravinárske produkty

| Súbor šablóny                            | Popis                                   |
| ---------------------------------------- | --------------------------------------- |
| `food/nutrients-table.php`               | Tabuľka výživových hodnôt               |
| `food/allergens-list.php`                | Zoznam alergénov                        |
| `food/nutri-score.php`                   | Označenie Nutri-Score                   |

### Pokladňa a objednávky

| Súbor šablóny                            | Popis                                   |
| ---------------------------------------- | --------------------------------------- |
| `checkout/button-label.php`              | Označenie tlačidla objednávky           |
| `checkout/legal-checkboxes.php`          | Právne checkboxy na pokladni            |
| `checkout/nip-field.php`                 | Pole NIP s automatickým dopĺňaním       |
| `checkout/doi-notice.php`                | Správa double opt-in                    |

### Moduly obchodu

| Súbor šablóny                            | Popis                                   |
| ---------------------------------------- | --------------------------------------- |
| `wishlist/table.php`                     | Tabuľka zoznamu želaní                  |
| `wishlist/button.php`                    | Tlačidlo pridania do zoznamu            |
| `wishlist/header-icon.php`               | Ikona v hlavičke                        |
| `compare/table.php`                      | Tabuľka porovnania                      |
| `compare/button.php`                     | Tlačidlo porovnania                     |
| `compare/floating-bar.php`               | Lišta porovnania (spodok obrazovky)     |
| `quick-view/modal.php`                   | Lightbox okno rýchleho náhľadu          |
| `quick-view/button.php`                  | Tlačidlo rýchleho náhľadu               |
| `ajax-search/form.php`                   | Pole AJAX vyhľadávača                   |
| `ajax-search/results.php`               | Dropdown s výsledkami vyhľadávania      |
| `ajax-search/result-item.php`           | Jednotlivý výsledok vyhľadávania        |
| `ajax-filters/container.php`            | Kontajner AJAX filtrov                  |
| `ajax-filters/filter-category.php`      | Filter kategórií                        |
| `ajax-filters/filter-price.php`         | Filter ceny (posuvník)                  |
| `ajax-filters/filter-attribute.php`     | Filter atribútu                         |
| `ajax-filters/active-filters.php`       | Lišta aktívnych filtrov                 |
| `product-slider/slider.php`             | Kontajner slidera                       |
| `product-slider/item.php`               | Karta produktu v slideri                |
| `badges/badge.php`                       | Jednotlivé označenie                    |
| `badges/container.php`                   | Kontajner označení na produkte          |
| `waitlist/form.php`                      | Formulár zoznamu čakajúcich             |
| `waitlist/email.php`                     | E-mail upozornenia o dostupnosti        |

### Nástroje

| Súbor šablóny                            | Popis                                   |
| ---------------------------------------- | --------------------------------------- |
| `tools/compliance-checklist.php`         | Kontrolný zoznam zhody                  |
| `tools/audit-report.php`                | Správa z auditu                         |
| `tools/security-incident-form.php`      | Formulár bezpečnostného incidentu       |
| `tools/verified-review-badge.php`       | Odznak overenej recenzie                |

## Dostupné premenné v šablónach

Každá šablóna dostáva sadu premenných. Príklad pre `omnibus/price-display.php`:

```php
<?php
/**
 * Šablóna zobrazenia ceny Omnibus
 *
 * Dostupné premenné:
 * @var float  $lowest_price  Najnižšia cena z obdobia
 * @var int    $days          Počet dní
 * @var int    $product_id    ID produktu
 * @var string $price_html    Naformátovaná cena HTML
 * @var string $date          Dátum najnižšej ceny
 *
 * @package Polski
 */

defined('ABSPATH') || exit;
?>

<div class="polski-omnibus-price">
    <span class="polski-omnibus-label">
        <?php printf(
            esc_html__('Najnižšia cena za %d dní pred zľavou:', 'polski'),
            $days
        ); ?>
    </span>
    <span class="polski-omnibus-amount">
        <?php echo wp_kses_post($price_html); ?>
    </span>
</div>
```

## Kontrola verzie šablóny

Každá šablóna má komentár `@version`. Po aktualizácii pluginu skontroluj, či prepísané šablóny vyžadujú aktualizáciu.

Upozornenie na zastarané šablóny sa zobrazuje v **WooCommerce > Stav > Polski**.

```php
/**
 * @version 1.5.0
 */
```

## Hook na zmenu cesty šablón

Ak chceš zmeniť predvolené umiestnenie šablón v téme:

```php
add_filter('polski/template/path', function (string $path): string {
    return 'custom-polski-templates/'; // namiesto 'polski/'
});
```

Šablóny sa potom budú hľadať v: `wp-content/themes/tvoja-tema/custom-polski-templates/`

## Ladenie šablón

Skontroluj, ktorá šablóna sa načítava, zapnutím režimu debug:

```php
// V wp-config.php
define('POLSKI_TEMPLATE_DEBUG', true);
```

V režime debug je každá šablóna obalená HTML komentármi s cestou:

```html
<!-- polski template: /themes/tvoja-tema/polski/omnibus/price-display.php -->
...
<!-- /polski template -->
```

Hlásenie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informatívny charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
