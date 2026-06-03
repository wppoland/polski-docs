---
title: Template-Überschreibung
description: Überschreiben von Templates in Polski for WooCommerce im Theme - Dateiliste, Verzeichnisstruktur und Beispiele.
---

Ein an WooCommerce angelehntes Template-System. Überschreibe ein beliebiges Template, indem du es nach `yourtheme/polski/` in deinem Theme kopierst.

## So überschreibst du ein Template

1. Finde das Original-Template im Plugin-Verzeichnis: `wp-content/plugins/polski/templates/`
2. Kopiere die Datei in das Theme-Verzeichnis: `wp-content/themes/dein-theme/polski/`
3. Behalte die Struktur der Unterverzeichnisse bei
4. Bearbeite die kopierte Datei

Das Plugin verwendet automatisch das Template aus dem Theme anstelle des Standards.

**Beispiel:** Um das Template des Omnibus-Preises zu überschreiben, kopiere:

```
wp-content/plugins/polski/templates/omnibus/price-display.php
```

nach:

```
wp-content/themes/dein-theme/polski/omnibus/price-display.php
```

## Child-Theme

Bei einem Child-Theme platzierst du die Templates im Verzeichnis des Child-Themes. Suchreihenfolge:

1. `wp-content/themes/child-theme/polski/`
2. `wp-content/themes/parent-theme/polski/`
3. `wp-content/plugins/polski/templates/`

## Liste der Templates

### Rechtliche Anforderungen

| Template-Datei                           | Beschreibung                            |
| ---------------------------------------- | --------------------------------------- |
| `omnibus/price-display.php`              | Anzeige des Omnibus-Preises             |
| `omnibus/price-history.php`              | Preishistorie (Tabelle)                 |
| `gpsr/product-info.php`                  | GPSR-Informationen auf der Produktseite |
| `gpsr/safety-sheet.php`                  | Sicherheitsdatenblatt des Produkts      |
| `withdrawal/form.php`                    | Widerrufsformular                       |
| `withdrawal/confirmation.php`            | Bestätigung des eingereichten Widerrufs |
| `withdrawal/email.php`                   | E-Mail-Vorlage der Bestätigung          |
| `dsa/report-form.php`                    | DSA-Meldeformular                       |
| `dsa/report-confirmation.php`            | Bestätigung der DSA-Meldung             |
| `gdpr/consent-checkboxes.php`            | DSGVO-Einwilligungs-Checkboxen          |
| `ksef/invoice-template.php`              | KSeF-Rechnungsvorlage                   |
| `greenwashing/product-claims.php`        | Umweltaussagen des Produkts             |
| `legal-pages/terms-template.php`         | Vorlage der Shop-AGB                    |
| `legal-pages/privacy-template.php`       | Vorlage der Datenschutzerklärung        |
| `legal-pages/withdrawal-template.php`    | Vorlage der Widerrufsbelehrung          |

### Preise und Produktinformationen

| Template-Datei                           | Beschreibung                            |
| ---------------------------------------- | --------------------------------------- |
| `prices/unit-price.php`                  | Grundpreis                              |
| `prices/vat-notice.php`                  | Hinweis zu MwSt. und Versand            |
| `prices/delivery-time.php`               | Geschätzte Lieferzeit                   |
| `manufacturer/info.php`                  | Informationen über den Hersteller       |
| `manufacturer/logo.php`                  | Logo des Herstellers                    |

### Lebensmittelprodukte

| Template-Datei                           | Beschreibung                            |
| ---------------------------------------- | --------------------------------------- |
| `food/nutrients-table.php`               | Nährwerttabelle                         |
| `food/allergens-list.php`                | Allergenliste                           |
| `food/nutri-score.php`                   | Nutri-Score-Kennzeichnung               |

### Kasse und Bestellungen

| Template-Datei                           | Beschreibung                            |
| ---------------------------------------- | --------------------------------------- |
| `checkout/button-label.php`              | Label des Bestellbuttons                |
| `checkout/legal-checkboxes.php`          | Rechtliche Checkboxen an der Kasse      |
| `checkout/nip-field.php`                 | NIP-Feld mit automatischem Ausfüllen    |
| `checkout/doi-notice.php`                | Double-Opt-in-Hinweis                   |

### Shop-Module

| Template-Datei                           | Beschreibung                            |
| ---------------------------------------- | --------------------------------------- |
| `wishlist/table.php`                     | Wunschlisten-Tabelle                    |
| `wishlist/button.php`                    | Button zum Hinzufügen zur Liste         |
| `wishlist/header-icon.php`               | Symbol im Header                        |
| `compare/table.php`                      | Vergleichstabelle                       |
| `compare/button.php`                     | Vergleichsbutton                        |
| `compare/floating-bar.php`               | Vergleichsleiste (unten am Bildschirm)  |
| `quick-view/modal.php`                   | Lightbox-Fenster der Schnellansicht     |
| `quick-view/button.php`                  | Button der Schnellansicht               |
| `ajax-search/form.php`                   | Feld der AJAX-Suche                     |
| `ajax-search/results.php`               | Dropdown mit Suchergebnissen            |
| `ajax-search/result-item.php`           | Einzelnes Suchergebnis                  |
| `ajax-filters/container.php`            | Container der AJAX-Filter               |
| `ajax-filters/filter-category.php`      | Kategoriefilter                         |
| `ajax-filters/filter-price.php`         | Preisfilter (Schieberegler)             |
| `ajax-filters/filter-attribute.php`     | Attributfilter                          |
| `ajax-filters/active-filters.php`       | Leiste der aktiven Filter               |
| `product-slider/slider.php`             | Container des Sliders                   |
| `product-slider/item.php`               | Produktkarte im Slider                  |
| `badges/badge.php`                       | Einzelnes Abzeichen                     |
| `badges/container.php`                   | Container der Abzeichen auf dem Produkt |
| `waitlist/form.php`                      | Formular der Warteliste                 |
| `waitlist/email.php`                     | E-Mail zur Verfügbarkeitsbenachrichtigung |

### Werkzeuge

| Template-Datei                           | Beschreibung                            |
| ---------------------------------------- | --------------------------------------- |
| `tools/compliance-checklist.php`         | Compliance-Checkliste                   |
| `tools/audit-report.php`                | Audit-Bericht                           |
| `tools/security-incident-form.php`      | Formular für Sicherheitsvorfälle        |
| `tools/verified-review-badge.php`       | Abzeichen der verifizierten Bewertung   |

## Verfügbare Variablen in den Templates

Jedes Template erhält einen Satz von Variablen. Beispiel für `omnibus/price-display.php`:

```php
<?php
/**
 * Template zur Anzeige des Omnibus-Preises
 *
 * Verfügbare Variablen:
 * @var float  $lowest_price  Niedrigster Preis des Zeitraums
 * @var int    $days          Anzahl der Tage
 * @var int    $product_id    Produkt-ID
 * @var string $price_html    Formatierter Preis HTML
 * @var string $date          Datum des niedrigsten Preises
 *
 * @package Polski
 */

defined('ABSPATH') || exit;
?>

<div class="polski-omnibus-price">
    <span class="polski-omnibus-label">
        <?php printf(
            esc_html__('Niedrigster Preis der %d Tage vor der Preissenkung:', 'polski'),
            $days
        ); ?>
    </span>
    <span class="polski-omnibus-amount">
        <?php echo wp_kses_post($price_html); ?>
    </span>
</div>
```

## Überprüfen der Template-Version

Jedes Template hat einen `@version`-Kommentar. Prüfe nach einem Plugin-Update, ob die überschriebenen Templates aktualisiert werden müssen.

Eine Warnung vor veralteten Templates erscheint unter **WooCommerce > Status > Polski**.

```php
/**
 * @version 1.5.0
 */
```

## Hook zur Änderung des Template-Pfads

Wenn du den Standardspeicherort der Templates im Theme ändern möchtest:

```php
add_filter('polski/template/path', function (string $path): string {
    return 'custom-polski-templates/'; // anstelle von 'polski/'
});
```

Dann werden die Templates gesucht in: `wp-content/themes/dein-theme/custom-polski-templates/`

## Templates debuggen

Prüfe, welches Template geladen wird, indem du den Debug-Modus aktivierst:

```php
// In wp-config.php
define('POLSKI_TEMPLATE_DEBUG', true);
```

Im Debug-Modus wird jedes Template von HTML-Kommentaren mit dem Pfad umschlossen:

```html
<!-- polski template: /themes/dein-theme/polski/omnibus/price-display.php -->
...
<!-- /polski template -->
```

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
