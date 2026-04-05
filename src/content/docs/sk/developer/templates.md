---
title: Prepísanie šablón
description: Prepísanie šablón Polski for WooCommerce v téme - zoznam súborov, štruktúra adresárov a príklady.
---

Polski for WooCommerce využíva systém šablón inšpirovaný WooCommerce. Môžete prepísať ľubovoľnú šablónu pluginu skopírovaním do adresára `yourtheme/polski/` vo vašej téme.

## Ako prepísať šablónu

1. Nájdite originálnu šablónu v adresári pluginu: `wp-content/plugins/polski/templates/`
2. Skopírujte súbor do adresára témy: `wp-content/themes/vasa-tema/polski/`
3. Zachovajte štruktúru podadresárov
4. Upravte skopírovaný súbor

Plugin automaticky rozpozná šablónu v téme a použije ju namiesto predvolenej.

**Príklad:** na prepísanie šablóny ceny Omnibus skopírujte:

```
wp-content/plugins/polski/templates/omnibus/price-display.php
```

do:

```
wp-content/themes/vasa-tema/polski/omnibus/price-display.php
```

## Potomková téma (child theme)

Ak používate potomkovú tému, šablóny umiestňujte do adresára potomkovej témy. Plugin hľadá šablóny v nasledujúcom poradí:

1. `wp-content/themes/potomkova-tema/polski/`
2. `wp-content/themes/rodicovska-tema/polski/`
3. `wp-content/plugins/polski/templates/`

## Zoznam šablón

### Právny súlad

| Súbor šablóny                            | Popis                                    |
| ---------------------------------------- | --------------------------------------- |
| `omnibus/price-display.php`              | Zobrazenie ceny Omnibus                  |
| `omnibus/price-history.php`              | História cien (tabuľka)                  |
| `gpsr/product-info.php`                  | Informácie GPSR na stránke produktu      |
| `gpsr/safety-sheet.php`                  | Bezpečnostný list produktu               |
| `withdrawal/form.php`                    | Formulár na odstúpenie od zmluvy         |
| `withdrawal/confirmation.php`            | Potvrdenie podania odstúpenia            |
| `withdrawal/email.php`                   | Šablóna potvrdzujúceho e-mailu           |
| `dsa/report-form.php`                    | Formulár hlásenia DSA                    |
| `dsa/report-confirmation.php`            | Potvrdenie hlásenia DSA                  |
| `gdpr/consent-checkboxes.php`            | Checkboxy súhlasov GDPR                  |
| `ksef/invoice-template.php`              | Šablóna faktúry KSeF                     |
| `greenwashing/product-claims.php`        | Environmentálne vyhlásenia produktu      |
| `legal-pages/terms-template.php`         | Šablóna obchodných podmienok             |
| `legal-pages/privacy-template.php`       | Šablóna zásad ochrany osobných údajov    |
| `legal-pages/withdrawal-template.php`    | Šablóna informácie o odstúpení           |

### Ceny a informácie o produkte

| Súbor šablóny                            | Popis                                    |
| ---------------------------------------- | --------------------------------------- |
| `prices/unit-price.php`                  | Jednotková cena                          |
| `prices/vat-notice.php`                  | Informácia o DPH a doručení              |
| `prices/delivery-time.php`               | Odhadovaná dodacia lehota                |
| `manufacturer/info.php`                  | Informácie o výrobcovi                   |
| `manufacturer/logo.php`                  | Logo výrobcu                             |

### Potravinárske produkty

| Súbor šablóny                            | Popis                                    |
| ---------------------------------------- | --------------------------------------- |
| `food/nutrients-table.php`               | Tabuľka výživových hodnôt                |
| `food/allergens-list.php`                | Zoznam alergénov                         |
| `food/nutri-score.php`                   | Označenie Nutri-Score                    |

### Pokladňa a objednávky

| Súbor šablóny                            | Popis                                    |
| ---------------------------------------- | --------------------------------------- |
| `checkout/button-label.php`              | Štítok tlačidla objednávky               |
| `checkout/legal-checkboxes.php`          | Právne checkboxy na pokladni             |
| `checkout/nip-field.php`                 | Pole NIP s automatickým doplnením        |
| `checkout/doi-notice.php`                | Hlásenie double opt-in                   |

### Obchodné moduly

| Súbor šablóny                            | Popis                                    |
| ---------------------------------------- | --------------------------------------- |
| `wishlist/table.php`                     | Tabuľka zoznamu prianí                   |
| `wishlist/button.php`                    | Tlačidlo pridania do zoznamu             |
| `wishlist/header-icon.php`               | Ikona v hlavičke                         |
| `compare/table.php`                      | Tabuľka porovnania                       |
| `compare/button.php`                     | Tlačidlo porovnania                      |
| `compare/floating-bar.php`               | Lišta porovnania (spodok obrazovky)      |
| `quick-view/modal.php`                   | Okno lightbox rýchleho náhľadu           |
| `quick-view/button.php`                  | Tlačidlo rýchleho náhľadu               |
| `ajax-search/form.php`                   | Pole AJAX vyhľadávača                    |
| `ajax-search/results.php`               | Dropdown s výsledkami vyhľadávania        |
| `ajax-search/result-item.php`           | Jednotlivý výsledok vyhľadávania         |
| `ajax-filters/container.php`            | Kontajner AJAX filtrov                   |
| `ajax-filters/filter-category.php`      | Filter kategórie                         |
| `ajax-filters/filter-price.php`         | Filter ceny (posuvník)                   |
| `ajax-filters/filter-attribute.php`     | Filter atribútu                          |
| `ajax-filters/active-filters.php`       | Lišta aktívnych filtrov                  |
| `product-slider/slider.php`             | Kontajner slidera                        |
| `product-slider/item.php`               | Karta produktu v slideri                 |
| `badges/badge.php`                       | Jednotlivá etiketa                       |
| `badges/container.php`                   | Kontajner etikiet na produkte            |
| `waitlist/form.php`                      | Formulár zoznamu čakajúcich              |
| `waitlist/email.php`                     | E-mail oznámenia o dostupnosti           |

### Nástroje

| Súbor šablóny                            | Popis                                    |
| ---------------------------------------- | --------------------------------------- |
| `tools/compliance-checklist.php`         | Kontrolný zoznam súladu                  |
| `tools/audit-report.php`                | Správa z auditu                          |
| `tools/security-incident-form.php`      | Formulár bezpečnostného incidentu        |
| `tools/verified-review-badge.php`       | Odznak overenej recenzie                 |

## Dostupné premenné v šablónach

Každá šablóna dostáva súbor premenných. Príklad pre `omnibus/price-display.php`:

```php
<?php
/**
 * Šablóna zobrazenia ceny Omnibus
 *
 * Dostupné premenné:
 * @var float  $lowest_price  Najnižšia cena za obdobie
 * @var int    $days          Počet dní
 * @var int    $product_id    ID produktu
 * @var string $price_html    Formátovaná cena HTML
 * @var string $date          Dátum najnižšej ceny
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

## Kontrola verzie šablóny

Každá šablóna obsahuje komentár `@version` v hlavičke. Po aktualizácii pluginu skontrolujte, či vaše prepísané šablóny vyžadujú aktualizáciu.

Plugin zobrazuje varovanie v paneli admina (**WooCommerce > Stav > Polski**), ak rozpozná zastarané šablóny v téme.

```php
/**
 * @version 1.5.0
 */
```

## Hook na zmenu cesty šablón

Ak chcete zmeniť predvolenú lokáciu šablón v téme:

```php
add_filter('polski/template/path', function (string $path): string {
    return 'custom-polski-templates/'; // namiesto 'polski/'
});
```

Potom budú šablóny hľadané v: `wp-content/themes/vasa-tema/custom-polski-templates/`

## Ladenie šablón

Na zistenie, ktorá šablóna sa aktuálne načítava, zapnite režim ladenia:

```php
// V wp-config.php
define('POLSKI_TEMPLATE_DEBUG', true);
```

V režime ladenia je každá šablóna obklopená HTML komentármi ukazujúcimi cestu:

```html
<!-- polski template: /themes/vasa-tema/polski/omnibus/price-display.php -->
...
<!-- /polski template -->
```

Nahlasovanie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
