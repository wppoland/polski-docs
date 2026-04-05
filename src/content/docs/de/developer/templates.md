---
title: Template-Ueberschreibung
description: Ueberschreiben von Templates in Polski for WooCommerce im Theme - Dateiliste, Verzeichnisstruktur und Beispiele.
---

Polski for WooCommerce nutzt ein an WooCommerce angelehntes Template-System. Sie koennen jedes Plugin-Template ueberschreiben, indem Sie es in das Verzeichnis `yourtheme/polski/` in Ihrem Theme kopieren.

## Wie ein Template ueberschrieben wird

1. Suchen Sie das Original-Template im Plugin-Verzeichnis: `wp-content/plugins/polski/templates/`
2. Kopieren Sie die Datei in das Theme-Verzeichnis: `wp-content/themes/ihr-theme/polski/`
3. Behalten Sie die Unterverzeichnisstruktur bei
4. Aendern Sie die kopierte Datei

Das Plugin erkennt automatisch das Template im Theme und verwendet es anstelle des Standards.

**Beispiel:** Um das Omnibus-Preistemplate zu ueberschreiben, kopieren Sie:

```
wp-content/plugins/polski/templates/omnibus/price-display.php
```

nach:

```
wp-content/themes/ihr-theme/polski/omnibus/price-display.php
```

## Child Theme

Bei einem Child Theme platzieren Sie Templates im Child-Theme-Verzeichnis. Das Plugin sucht Templates in folgender Reihenfolge:

1. `wp-content/themes/child-theme/polski/`
2. `wp-content/themes/parent-theme/polski/`
3. `wp-content/plugins/polski/templates/`

## Template-Liste

### Rechtliche Anforderungen

| Template-Datei | Beschreibung |
| ---------------------------------------- | --------------------------------------- |
| `omnibus/price-display.php` | Omnibus-Preisanzeige |
| `omnibus/price-history.php` | Preishistorie (Tabelle) |
| `gpsr/product-info.php` | GPSR-Informationen auf der Produktseite |
| `gpsr/safety-sheet.php` | Produktsicherheitsdatenblatt |
| `withdrawal/form.php` | Widerrufsformular |
| `withdrawal/confirmation.php` | Widerrufsbestaetigung |
| `withdrawal/email.php` | E-Mail-Vorlage fuer Bestaetigung |
| `dsa/report-form.php` | DSA-Meldeformular |
| `gdpr/consent-checkboxes.php` | DSGVO-Einwilligungs-Checkboxen |
| `legal-pages/terms-template.php` | AGB-Vorlage |
| `legal-pages/privacy-template.php` | Datenschutzvorlage |

### Preise und Produktinformationen

| Template-Datei | Beschreibung |
| ---------------------------------------- | --------------------------------------- |
| `prices/unit-price.php` | Grundpreis |
| `prices/vat-notice.php` | MwSt.- und Lieferinfo |
| `prices/delivery-time.php` | Geschaetzte Lieferzeit |
| `manufacturer/info.php` | Herstellerinformationen |

### Lebensmittel

| Template-Datei | Beschreibung |
| ---------------------------------------- | --------------------------------------- |
| `food/nutrients-table.php` | Naehrwerttabelle |
| `food/allergens-list.php` | Allergenliste |
| `food/nutri-score.php` | Nutri-Score-Kennzeichnung |

### Kasse und Bestellungen

| Template-Datei | Beschreibung |
| ---------------------------------------- | --------------------------------------- |
| `checkout/button-label.php` | Bestellbutton-Label |
| `checkout/legal-checkboxes.php` | Rechtliche Checkboxen an der Kasse |
| `checkout/nip-field.php` | NIP-Feld mit Auto-Vervollstaendigung |

### Shop-Module

| Template-Datei | Beschreibung |
| ---------------------------------------- | --------------------------------------- |
| `wishlist/table.php` | Wunschlistentabelle |
| `wishlist/button.php` | Hinzufuegen-Button |
| `compare/table.php` | Vergleichstabelle |
| `compare/button.php` | Vergleichsbutton |
| `quick-view/modal.php` | Schnellansicht-Lightbox |
| `ajax-search/form.php` | AJAX-Suchfeld |
| `ajax-search/results.php` | Ergebnis-Dropdown |
| `ajax-filters/container.php` | AJAX-Filtercontainer |
| `product-slider/slider.php` | Slider-Container |
| `badges/badge.php` | Einzelnes Label |

## Verfuegbare Variablen in Templates

Jedes Template erhaelt einen Satz von Variablen. Beispiel fuer `omnibus/price-display.php`:

```php
<?php
/**
 * Template fuer die Omnibus-Preisanzeige
 *
 * Verfuegbare Variablen:
 * @var float  $lowest_price  Niedrigster Preis des Zeitraums
 * @var int    $days          Anzahl der Tage
 * @var int    $product_id    Produkt-ID
 * @var string $price_html    Formatiertes Preis-HTML
 * @var string $date          Datum des niedrigsten Preises
 *
 * @package Polski
 */

defined('ABSPATH') || exit;
?>

<div class="polski-omnibus-price">
    <span class="polski-omnibus-label">
        <?php printf(
            esc_html__('Niedrigster Preis der letzten %d Tage vor der Senkung:', 'polski'),
            $days
        ); ?>
    </span>
    <span class="polski-omnibus-amount">
        <?php echo wp_kses_post($price_html); ?>
    </span>
</div>
```

## Hook zur Aenderung des Template-Pfads

```php
add_filter('polski/template/path', function (string $path): string {
    return 'custom-polski-templates/'; // statt 'polski/'
});
```

## Template-Debugging

Um zu pruefen, welches Template aktuell geladen wird, aktivieren Sie den Debug-Modus:

```php
// In wp-config.php
define('POLSKI_TEMPLATE_DEBUG', true);
```

Im Debug-Modus wird jedes Template von HTML-Kommentaren mit dem Pfad umschlossen:

```html
<!-- polski template: /themes/ihr-theme/polski/omnibus/price-display.php -->
...
<!-- /polski template -->
```

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
