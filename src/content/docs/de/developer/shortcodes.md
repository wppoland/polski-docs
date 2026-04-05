---
title: Shortcodes
description: Vollstaendige Liste der 23 Shortcodes von Polski for WooCommerce mit Parametern, Verwendungsbeispielen und PHP-Code.
---

23 Shortcodes zur Anzeige rechtlicher Daten, Produktinformationen und Shop-Module an beliebiger Stelle.

## Shortcodes fuer rechtliche Anforderungen

### `[polski_gpsr]`

Zeigt GPSR-Informationen (General Product Safety Regulation) fuer ein Produkt an.

| Parameter | Typ | Standard | Beschreibung |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int | (aktuell) | Produkt-ID |
| `fields` | string | `all` | Anzuzeigende Felder |
| `layout` | string | `list` | Layout: list, table, inline |

### `[polski_omnibus_price]`

Zeigt den niedrigsten Preis der letzten 30 Tage (Omnibus-Richtlinie) an.

| Parameter | Typ | Standard | Beschreibung |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int | (aktuell) | Produkt-ID |
| `days` | int | `30` | Tage zurueck |
| `label` | string | (Standard) | Labeltext |
| `show_date` | string | `no` | Datum des niedrigsten Preises anzeigen |

### `[polski_withdrawal_form]`

Zeigt das Widerrufsformular an.

### `[polski_dsa_report]`

Zeigt das DSA-Meldeformular fuer illegale Inhalte an.

### `[polski_tax_notice]`

Zeigt MwSt.- und Lieferkosteninformation an.

## Shortcodes fuer Produktinformationen

### `[polski_unit_price]`

Zeigt den Grundpreis des Produkts an (z.B. Preis pro kg, Liter).

### `[polski_delivery_time]`

Zeigt die geschaetzte Lieferzeit an.

### `[polski_manufacturer]`

Zeigt Herstellerinformationen an.

### `[polski_nutrients]`

Zeigt die Naehrwerttabelle an (fuer Lebensmittel).

### `[polski_allergens]`

Zeigt die Allergenliste an (fuer Lebensmittel).

## Shortcodes fuer Shop-Module

### `[polski_wishlist]`

Zeigt die Wunschlistentabelle an.

```html
[polski_wishlist columns="image,name,price,add_to_cart" max_items="20"]
```

### `[polski_compare]`

Zeigt die Produktvergleichstabelle an.

```html
[polski_compare hide_similar="yes"]
```

### `[polski_ajax_search]`

Zeigt die AJAX-Suche mit Vorschlaegen an.

```html
[polski_ajax_search placeholder="Was suchen Sie?" show_cat="yes" limit="10"]
```

### `[polski_ajax_filters]`

Zeigt AJAX-Filter zur Produktfilterung an.

```html
[polski_ajax_filters filters="category,price,pa_color,stock" style="accordion"]
```

### `[polski_product_slider]`

Zeigt ein Produktkarussell an.

```html
[polski_product_slider type="sale" limit="12" title="Angebote" arrows="yes" dots="yes"]
```

### `[polski_nutri_score]`

Zeigt die Nutri-Score-Bewertung eines Lebensmittels an.

### `[polski_checkout_button]`

Zeigt den Kaufbutton mit gesetzeskonformem Label an.

### `[polski_legal_checkboxes]`

Zeigt rechtliche Checkboxen ausserhalb der Kasse an (z.B. auf der Registrierungsseite).

### `[polski_nip_field]`

Zeigt das NIP-Feld mit Echtzeit-Validierung an (VIES/GUS-API).

### `[polski_greenwashing_info]`

Zeigt verifizierte Umweltinformationen des Produkts an (Anti-Greenwashing).

### `[polski_security_incident]`

Zeigt das Formular zur Meldung eines Sicherheitsvorfalls an (CRA).

### `[polski_verified_badge]`

Zeigt das Badge fuer verifizierten Kauf bei Bewertungen an.

## Verwendung von Shortcodes in PHP-Templates

Alle Shortcodes koennen in PHP-Templates aufgerufen werden:

```php
// Einzelner Shortcode
echo do_shortcode('[polski_omnibus_price]');

// Shortcode mit Parametern
echo do_shortcode('[polski_product_slider type="featured" limit="6"]');

// Bedingte Anzeige
if (shortcode_exists('polski_gpsr')) {
    echo do_shortcode('[polski_gpsr]');
}
```

## Verwendung von Shortcodes in Gutenberg

Verwenden Sie im Gutenberg-Editor den Block **Shortcode** und fuegen Sie den gewuenschten Shortcode ein. Alternativ haben viele dieser Shortcodes dedizierte Gutenberg-Bloecke mit Vorschau im Editor.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
