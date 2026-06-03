---
title: Shortcodes
description: Vollständige Liste der 23 Shortcodes von Polski for WooCommerce mit Parametern, Verwendungsbeispielen und PHP-Code.
---

23 Shortcodes zur Anzeige von Rechtsdaten, Produktinformationen und Shop-Modulen an beliebiger Stelle.

## Shortcodes für rechtliche Anforderungen

### `[polski_gpsr]`

Zeigt GPSR-Informationen (General Product Safety Regulation) für ein Produkt an.

**Parameter:**

| Parameter    | Typ    | Standard   | Beschreibung                  |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktuell)  | Produkt-ID                    |
| `fields`     | string | `all`      | Anzuzeigende Felder           |
| `layout`     | string | `list`     | Layout: list, table, inline   |

**Beispiel:**

```html
[polski_gpsr product_id="123" fields="manufacturer,contact,safety" layout="table"]
```

**Im PHP-Template:**

```php
echo do_shortcode('[polski_gpsr]'); // Auf der Produktseite - ruft die ID automatisch ab
```

### `[polski_omnibus_price]`

Zeigt den niedrigsten Preis der letzten 30 Tage an (Omnibus-Richtlinie).

**Parameter:**

| Parameter    | Typ    | Standard   | Beschreibung                  |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktuell)  | Produkt-ID                    |
| `days`       | int    | `30`       | Anzahl der Tage zurück        |
| `label`      | string | (Standard) | Text des Labels               |
| `show_date`  | string | `no`       | Datum des niedrigsten Preises anzeigen |

**Beispiel:**

```html
[polski_omnibus_price product_id="456" label="Niedrigster Preis der letzten 30 Tage:" show_date="yes"]
```

### `[polski_withdrawal_form]`

Zeigt das Widerrufsformular an.

**Parameter:**

| Parameter   | Typ    | Standard  | Beschreibung                    |
| ----------- | ------ | --------- | ------------------------------- |
| `order_id`  | int    | (leer)    | Vorausfüllen der Bestellnummer  |
| `show_info` | string | `yes`     | Informationen zum Widerrufsrecht anzeigen |
| `redirect`  | string | (leer)    | Weiterleitungs-URL nach dem Absenden |

**Beispiel:**

```html
[polski_withdrawal_form show_info="yes"]
```

**Dedizierte Widerrufsseite:**

Erstelle eine Seite mit dem Slug `widerruf` und füge ein:

```html
<h2>Widerrufsformular</h2>
<p>Gemäß dem Verbraucherschutzgesetz hast du 14 Tage Zeit, um den Vertrag zu widerrufen.</p>
[polski_withdrawal_form]
```

### `[polski_dsa_report]`

Zeigt ein Formular zur Meldung illegaler Inhalte an (Digital Services Act).

**Parameter:**

| Parameter    | Typ    | Standard  | Beschreibung                  |
| ------------ | ------ | --------- | ----------------------------- |
| `product_id` | int    | (leer)    | ID des zu meldenden Produkts  |
| `categories` | string | `all`     | Meldekategorien               |
| `show_info`  | string | `yes`     | Informationen zum DSA anzeigen |

**Beispiel:**

```html
[polski_dsa_report categories="illegal_content,counterfeit,safety"]
```

### `[polski_tax_notice]`

Zeigt einen Hinweis zur Mehrwertsteuer und zu den Versandkosten an.

**Parameter:**

| Parameter   | Typ    | Standard                   | Beschreibung             |
| ----------- | ------ | -------------------------- | ------------------------ |
| `text`      | string | `Preis inkl. MwSt. Versandkosten werden an der Kasse berechnet.` | Inhalt des Hinweises |
| `link_text` | string | `Versandkosten`            | Text des Links           |
| `link_url`  | string | (leer)                     | URL der Seite mit den Kosten |

**Beispiel:**

```html
[polski_tax_notice text="Bruttopreis inkl. 23% MwSt." link_text="Versandkosten prüfen" link_url="/versand/"]
```

## Shortcodes für Produktinformationen

### `[polski_unit_price]`

Zeigt den Grundpreis eines Produkts an (z. B. Preis pro kg, Liter).

**Parameter:**

| Parameter    | Typ    | Standard   | Beschreibung                  |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktuell)  | Produkt-ID                    |
| `format`     | string | `auto`     | Format: auto, per_kg, per_l, per_m, per_unit |

**Beispiel:**

```html
[polski_unit_price product_id="789" format="per_kg"]
```

### `[polski_delivery_time]`

Zeigt die geschätzte Lieferzeit an.

**Parameter:**

| Parameter    | Typ    | Standard   | Beschreibung                  |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktuell)  | Produkt-ID                    |
| `format`     | string | `range`    | Format: range, exact, text    |
| `label`      | string | `Lieferzeit:` | Label                      |

**Beispiel:**

```html
[polski_delivery_time label="Versand in:" format="range"]
```

### `[polski_manufacturer]`

Zeigt Informationen über den Hersteller an.

**Parameter:**

| Parameter    | Typ    | Standard   | Beschreibung                  |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktuell)  | Produkt-ID                    |
| `fields`     | string | `all`      | Felder: name, address, url, logo |
| `link`       | string | `yes`      | Zur Herstellerseite verlinken |

**Beispiel:**

```html
[polski_manufacturer fields="name,logo" link="yes"]
```

### `[polski_nutrients]`

Zeigt eine Nährwerttabelle an (für Lebensmittelprodukte).

**Parameter:**

| Parameter    | Typ    | Standard   | Beschreibung                  |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktuell)  | Produkt-ID                    |
| `per`        | string | `100g`     | Werte pro: 100g, 100ml, serving |
| `layout`     | string | `table`    | Layout: table, list, compact  |

**Beispiel:**

```html
[polski_nutrients per="serving" layout="compact"]
```

### `[polski_allergens]`

Zeigt eine Liste der Allergene an (für Lebensmittelprodukte).

**Parameter:**

| Parameter    | Typ    | Standard   | Beschreibung                  |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktuell)  | Produkt-ID                    |
| `highlight`  | string | `bold`     | Hervorhebung: bold, color, icon |
| `layout`     | string | `inline`   | Layout: inline, list          |

**Beispiel:**

```html
[polski_allergens highlight="bold" layout="list"]
```

## Shortcodes für Shop-Module

### `[polski_wishlist]`

Zeigt die Wunschlisten-Tabelle an.

**Parameter:**

| Parameter    | Typ    | Standard | Beschreibung                  |
| ------------ | ------ | -------- | ----------------------------- |
| `columns`    | string | `all`    | Anzuzeigende Spalten          |
| `max_items`  | int    | `50`     | Produktlimit                  |
| `show_empty` | string | `yes`    | Hinweis bei leerer Liste      |

**Beispiel:**

```html
[polski_wishlist columns="image,name,price,add_to_cart" max_items="20"]
```

### `[polski_compare]`

Zeigt die Produktvergleichstabelle an.

**Parameter:**

| Parameter      | Typ    | Standard | Beschreibung                  |
| -------------- | ------ | -------- | ----------------------------- |
| `columns`      | string | `all`    | Anzuzeigende Merkmale         |
| `hide_similar` | string | `no`     | Identische Merkmale ausblenden |
| `show_remove`  | string | `yes`    | Entfernen-Button              |

**Beispiel:**

```html
[polski_compare hide_similar="yes"]
```

### `[polski_ajax_search]`

Zeigt eine AJAX-Suche mit Vorschlägen an.

**Parameter:**

| Parameter     | Typ    | Standard            | Beschreibung             |
| ------------- | ------ | ------------------- | ------------------------ |
| `placeholder` | string | `Produkte suchen…`  | Platzhaltertext          |
| `width`       | string | `100%`              | Breite des Feldes        |
| `show_icon`   | string | `yes`               | Lupensymbol              |
| `show_cat`    | string | `no`                | Kategoriefilter          |
| `limit`       | int    | `8`                 | Limit der Vorschläge     |

**Beispiel:**

```html
[polski_ajax_search placeholder="Wonach suchst du?" show_cat="yes" limit="10"]
```

### `[polski_ajax_filters]`

Zeigt AJAX-Filter zum Filtern von Produkten an.

**Parameter:**

| Parameter    | Typ    | Standard   | Beschreibung                  |
| ------------ | ------ | ---------- | ----------------------------- |
| `filters`    | string | `all`      | Filtertypen                   |
| `style`      | string | `expanded` | Stil: expanded, compact, accordion |
| `show_count` | string | `yes`      | Produktzähler                 |
| `show_reset` | string | `yes`      | Zurücksetzen-Button           |
| `columns`    | int    | `1`        | Filterspalten                 |
| `ajax`       | string | `yes`      | AJAX-Modus                    |

**Beispiel:**

```html
[polski_ajax_filters filters="category,price,pa_color,stock" style="accordion"]
```

### `[polski_product_slider]`

Zeigt ein Produktkarussell an.

**Parameter:**

| Parameter        | Typ    | Standard | Beschreibung                  |
| ---------------- | ------ | -------- | ----------------------------- |
| `type`           | string | `latest` | Typ: related, sale, featured, bestsellers, latest, category, ids |
| `limit`          | int    | `8`      | Produktlimit                  |
| `columns`        | int    | `4`      | Spalten Desktop               |
| `columns_tablet` | int    | `2`      | Spalten Tablet                |
| `columns_mobile` | int    | `1`      | Spalten Mobil                 |
| `category`       | string | (leer)   | Slug der Kategorie            |
| `ids`            | string | (leer)   | Produkt-IDs                   |
| `arrows`         | string | `yes`    | Navigationspfeile             |
| `dots`           | string | `no`     | Paginierungspunkte            |
| `autoplay`       | string | `no`     | Autoplay                      |
| `autoplay_speed` | int    | `5000`   | Pause in ms                   |
| `title`          | string | (leer)   | Überschrift                   |
| `orderby`        | string | `date`   | Sortierung                    |
| `order`          | string | `DESC`   | Richtung                      |

**Beispiel:**

```html
[polski_product_slider type="sale" limit="12" title="Angebote" arrows="yes" dots="yes"]
```

### `[polski_nutri_score]`

Zeigt die Nutri-Score-Bewertung eines Lebensmittelprodukts an.

**Parameter:**

| Parameter    | Typ    | Standard   | Beschreibung                  |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktuell)  | Produkt-ID                    |
| `size`       | string | `medium`   | Größe: small, medium, large   |

**Beispiel:**

```html
[polski_nutri_score product_id="321" size="large"]
```

### `[polski_checkout_button]`

Zeigt einen Kaufbutton mit einem rechtlich der EU-Richtlinie entsprechenden Label an.

**Parameter:**

| Parameter | Typ    | Standard                     | Beschreibung     |
| --------- | ------ | ---------------------------- | ---------------- |
| `text`    | string | `Zahlungspflichtig bestellen` | Text des Buttons |
| `class`   | string | (leer)                       | Zusätzliche CSS-Klasse |

**Beispiel:**

```html
[polski_checkout_button text="Kaufen und bezahlen" class="my-checkout-btn"]
```

### `[polski_legal_checkboxes]`

Zeigt rechtliche Checkboxen außerhalb der Kasse an (z. B. auf der Registrierungsseite).

**Parameter:**

| Parameter  | Typ    | Standard | Beschreibung                  |
| ---------- | ------ | -------- | ----------------------------- |
| `location` | string | `custom` | Standort: checkout, registration, contact, custom |
| `ids`      | string | (leer)   | IDs der anzuzeigenden Checkboxen |

**Beispiel:**

```html
[polski_legal_checkboxes location="registration"]
```

### `[polski_nip_field]`

Zeigt ein NIP-Feld mit Echtzeitvalidierung an (VIES/GUS-API).

**Parameter:**

| Parameter  | Typ    | Standard | Beschreibung                  |
| ---------- | ------ | -------- | ----------------------------- |
| `required` | string | `no`     | Pflichtfeld                   |
| `autofill` | string | `yes`    | Automatisches Ausfüllen der Firmendaten |
| `label`    | string | `NIP`    | Label des Feldes              |

**Beispiel:**

```html
[polski_nip_field required="yes" autofill="yes" label="NIP-Nummer des Unternehmens"]
```

### `[polski_greenwashing_info]`

Zeigt verifizierte Umweltinformationen eines Produkts an (Anti-Greenwashing).

**Parameter:**

| Parameter    | Typ    | Standard   | Beschreibung                  |
| ------------ | ------ | ---------- | ----------------------------- |
| `product_id` | int    | (aktuell)  | Produkt-ID                    |
| `fields`     | string | `all`      | Felder: claims, certifications, evidence |

**Beispiel:**

```html
[polski_greenwashing_info fields="claims,certifications"]
```

### `[polski_security_incident]`

Zeigt ein Formular zur Meldung eines Sicherheitsvorfalls an (CRA).

**Parameter:**

| Parameter   | Typ    | Standard | Beschreibung                  |
| ----------- | ------ | -------- | ----------------------------- |
| `show_info` | string | `yes`    | Informationen zum CRA         |

**Beispiel:**

```html
[polski_security_incident show_info="yes"]
```

### `[polski_verified_badge]`

Zeigt ein Abzeichen für einen verifizierten Kauf bei einer Bewertung an.

**Parameter:**

| Parameter | Typ    | Standard            | Beschreibung             |
| --------- | ------ | ------------------- | ------------------------ |
| `text`    | string | `Verifizierter Kauf` | Text des Abzeichens     |
| `icon`    | string | `checkmark`         | Symbol: checkmark, shield |

**Beispiel:**

```html
[polski_verified_badge text="Bestätigte Bestellung" icon="shield"]
```

## Verwendung der Shortcodes in PHP-Templates

Alle Shortcodes können in PHP-Templates aufgerufen werden:

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

## Verwendung der Shortcodes in Gutenberg

Verwende in Gutenberg den Block **Shortcode** und füge den Shortcode ein. Viele Shortcodes haben auch dedizierte Blöcke mit Vorschau.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
