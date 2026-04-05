---
title: Prepis sablon
description: Prepisovani sablon Polski for WooCommerce v motivu - seznam souboru, struktura adresaru a priklady.
---

Polski for WooCommerce vyuziva system sablon inspirovany WooCommerce. Muzete prepsat libovolnou sablonu pluginu kopiovanim do adresare `yourtheme/polski/` ve vasem motivu.

## Jak prepsat sablonu

1. Najdete originalni sablonu v adresari pluginu: `wp-content/plugins/polski/templates/`
2. Zkopirujte soubor do adresare motivu: `wp-content/themes/vas-motiv/polski/`
3. Zachovejte strukturu podadresaru
4. Upravte zkopirovalny soubor

Plugin automaticky detekuje sablonu v motivu a pouzije ji misto vychozi.

**Priklad:** pro prepis sablony ceny Omnibus zkopirujte:

```
wp-content/plugins/polski/templates/omnibus/price-display.php
```

do:

```
wp-content/themes/vas-motiv/polski/omnibus/price-display.php
```

## Potomkovy motiv (child theme)

Pokud pouzivate potomkovy motiv, sablony umistujte do adresare potomkoveho motivu. Plugin hleda sablony v nasledujicim poradi:

1. `wp-content/themes/potomkovy-motiv/polski/`
2. `wp-content/themes/rodicovsky-motiv/polski/`
3. `wp-content/plugins/polski/templates/`

## Seznam sablon

### Pravni soulad

| Soubor sablony | Popis |
| ---------------------------------------- | --------------------------------------- |
| `omnibus/price-display.php` | Zobrazeni ceny Omnibus |
| `omnibus/price-history.php` | Historie cen (tabulka) |
| `gpsr/product-info.php` | Informace GPSR na strance produktu |
| `gpsr/safety-sheet.php` | Bezpecnostni list produktu |
| `withdrawal/form.php` | Formular odstoupeni od smlouvy |
| `withdrawal/confirmation.php` | Potvrzeni podani odstoupeni |
| `withdrawal/email.php` | Sablona e-mailu potvrzeni |
| `dsa/report-form.php` | Formular hlaseni DSA |
| `gdpr/consent-checkboxes.php` | Checkboxy souhlasu GDPR |
| `ksef/invoice-template.php` | Sablona faktury KSeF |
| `greenwashing/product-claims.php` | Environmentalni prohlaseni produktu |
| `legal-pages/terms-template.php` | Sablona obchodnich podminek |
| `legal-pages/privacy-template.php` | Sablona zasad ochrany osobnich udaju |

### Ceny a informace o produktu

| Soubor sablony | Popis |
| ---------------------------------------- | --------------------------------------- |
| `prices/unit-price.php` | Jednotkova cena |
| `prices/vat-notice.php` | Informace o DPH a doruceni |
| `prices/delivery-time.php` | Odhadovana doba dodani |
| `manufacturer/info.php` | Informace o vyrobci |

### Potraviny

| Soubor sablony | Popis |
| ---------------------------------------- | --------------------------------------- |
| `food/nutrients-table.php` | Tabulka vyzivovych hodnot |
| `food/allergens-list.php` | Seznam alergenu |
| `food/nutri-score.php` | Oznaceni Nutri-Score |

### Pokladna a objednavky

| Soubor sablony | Popis |
| ---------------------------------------- | --------------------------------------- |
| `checkout/button-label.php` | Stitek tlacitka objednavky |
| `checkout/legal-checkboxes.php` | Pravni checkboxy na pokladne |
| `checkout/nip-field.php` | Pole NIP s autodoplnenim |
| `checkout/doi-notice.php` | Zprava double opt-in |

### Moduly obchodu

| Soubor sablony | Popis |
| ---------------------------------------- | --------------------------------------- |
| `wishlist/table.php` | Tabulka wishlistu |
| `wishlist/button.php` | Tlacitko pridani na seznam |
| `compare/table.php` | Tabulka porovnani |
| `compare/button.php` | Tlacitko porovnani |
| `quick-view/modal.php` | Okno lightbox rychleho nahledu |
| `ajax-search/form.php` | Pole AJAX vyhledavace |
| `ajax-search/results.php` | Dropdown s vysledky vyhledavani |
| `ajax-filters/container.php` | Kontejner AJAX filtru |
| `product-slider/slider.php` | Kontejner slideru |
| `badges/badge.php` | Jednotlivy stitek |

### Nastroje

| Soubor sablony | Popis |
| ---------------------------------------- | --------------------------------------- |
| `tools/compliance-checklist.php` | Kontrolni seznam souladu |
| `tools/audit-report.php` | Zprava z auditu |
| `tools/security-incident-form.php` | Formular bezpecnostniho incidentu |
| `tools/verified-review-badge.php` | Odznak overene recenze |

## Dostupne promenne v sablonach

Kazda sablona obdrzi sadu promennych. Priklad pro `omnibus/price-display.php`:

```php
<?php
/**
 * Sablona zobrazeni ceny Omnibus
 *
 * Dostupne promenne:
 * @var float  $lowest_price  Nejnizsi cena za obdobi
 * @var int    $days          Pocet dnu
 * @var int    $product_id    ID produktu
 * @var string $price_html    Formatovana cena HTML
 * @var string $date          Datum nejnizsi ceny
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

## Hook pro zmenu cesty sablon

```php
add_filter('polski/template/path', function (string $path): string {
    return 'custom-polski-templates/'; // misto 'polski/'
});
```

## Ladeni sablon

Pro zjisteni, ktera sablona je aktualne nacitana, aktivujte rezim ladeni:

```php
// Ve wp-config.php
define('POLSKI_TEMPLATE_DEBUG', true);
```

Hlaseni problemu: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
