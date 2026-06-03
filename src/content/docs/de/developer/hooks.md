---
title: Hooks (Aktionen und Filter)
description: Vollständige Dokumentation der Hooks von Polski for WooCommerce - 25 Aktionen und Filter mit Signaturen, Parametern und Codebeispielen.
---

Hooks (Aktionen und Filter) zum Erweitern und Anpassen des Plugin-Verhaltens. Alle verwenden den Namespace `polski/`.

## Hooks zum Widerruf des Vertrags (withdrawal)

### `polski/withdrawal/days`

Filtert die Anzahl der Tage für den Widerruf des Vertrags.

```php
/**
 * @param int $days Anzahl der Tage für den Widerruf (Standard 14)
 */
apply_filters('polski/withdrawal/days', int $days): int;
```

**Beispiel:**

```php
add_filter('polski/withdrawal/days', function (int $days): int {
    return 30; // Verlängerung auf 30 Tage
});
```

### `polski/withdrawal/excluded_categories`

Filtert die Produktkategorien, die vom Widerrufsrecht ausgeschlossen sind.

```php
/**
 * @param array $categories Array von Kategorie-IDs
 */
apply_filters('polski/withdrawal/excluded_categories', array $categories): array;
```

**Beispiel:**

```php
add_filter('polski/withdrawal/excluded_categories', function (array $categories): array {
    $categories[] = 15; // ID der Kategorie "Digitale Produkte"
    $categories[] = 22; // ID der Kategorie "Hygieneprodukte"
    return $categories;
});
```

### `polski/withdrawal/form_fields`

Filtert die Felder des Widerrufsformulars.

```php
/**
 * @param array $fields Array der Formularfelder
 */
apply_filters('polski/withdrawal/form_fields', array $fields): array;
```

**Beispiel:**

```php
add_filter('polski/withdrawal/form_fields', function (array $fields): array {
    $fields['reason'] = [
        'type'     => 'textarea',
        'label'    => 'Grund des Widerrufs',
        'required' => false,
    ];
    return $fields;
});
```

### `polski/withdrawal/email_sent`

Aktion, die nach dem Versand der E-Mail-Bestätigung des Widerrufs ausgelöst wird.

```php
/**
 * @param int   $order_id  Bestell-ID
 * @param array $form_data Daten aus dem Formular
 */
do_action('polski/withdrawal/email_sent', int $order_id, array $form_data): void;
```

**Beispiel:**

```php
add_action('polski/withdrawal/email_sent', function (int $order_id, array $form_data): void {
    // Protokollierung der Widerrufe in einem externen System
    wp_remote_post('https://api.crm.pl/withdrawals', [
        'body' => wp_json_encode([
            'order_id' => $order_id,
            'date'     => current_time('mysql'),
        ]),
    ]);
}, 10, 2);
```

## Preis-Hooks (price)

### `polski/price/unit_format`

Filtert das Anzeigeformat des Grundpreises.

```php
/**
 * @param string $format     Format des Grundpreises
 * @param float  $unit_price Grundpreis
 * @param string $unit       Maßeinheit (kg, l, m, Stk.)
 * @param int    $product_id Produkt-ID
 */
apply_filters('polski/price/unit_format', string $format, float $unit_price, string $unit, int $product_id): string;
```

**Beispiel:**

```php
add_filter('polski/price/unit_format', function (string $format, float $unit_price, string $unit, int $product_id): string {
    return sprintf('%s / %s', wc_price($unit_price), $unit);
}, 10, 4);
```

### `polski/price/vat_label`

Filtert das beim Preis angezeigte Mehrwertsteuer-Label.

```php
/**
 * @param string $label      Text des Labels
 * @param string $tax_status Steuerstatus des Produkts
 */
apply_filters('polski/price/vat_label', string $label, string $tax_status): string;
```

**Beispiel:**

```php
add_filter('polski/price/vat_label', function (string $label, string $tax_status): string {
    if ($tax_status === 'taxable') {
        return 'brutto (inkl. MwSt.)';
    }
    return 'von der MwSt. befreit';
}, 10, 2);
```

## Omnibus-Hooks (omnibus)

### `polski/omnibus/lowest_price`

Filtert den niedrigsten Preis der letzten 30 Tage (Omnibus-Richtlinie).

```php
/**
 * @param float $price      Niedrigster Preis
 * @param int   $product_id Produkt-ID
 * @param int   $days       Anzahl der Tage zurück
 */
apply_filters('polski/omnibus/lowest_price', float $price, int $product_id, int $days): float;
```

**Beispiel:**

```php
add_filter('polski/omnibus/lowest_price', function (float $price, int $product_id, int $days): float {
    // Produkte aus der Kategorie "Outlet" überspringen
    if (has_term('outlet', 'product_cat', $product_id)) {
        return 0.0; // Omnibus-Preis nicht anzeigen
    }
    return $price;
}, 10, 3);
```

### `polski/omnibus/display_format`

Filtert das Anzeigeformat des Omnibus-Preises.

```php
/**
 * @param string $html       HTML mit dem Preis
 * @param float  $price      Niedrigster Preis
 * @param int    $product_id Produkt-ID
 */
apply_filters('polski/omnibus/display_format', string $html, float $price, int $product_id): string;
```

**Beispiel:**

```php
add_filter('polski/omnibus/display_format', function (string $html, float $price, int $product_id): string {
    return sprintf(
        '<small class="omnibus-price">Niedrigster Preis der letzten 30 Tage: %s</small>',
        wc_price($price)
    );
}, 10, 3);
```

### `polski/omnibus/price_recorded`

Aktion, die nach dem Speichern des Preises in der Omnibus-Historie ausgelöst wird.

```php
/**
 * @param int   $product_id Produkt-ID
 * @param float $price      Gespeicherter Preis
 */
do_action('polski/omnibus/price_recorded', int $product_id, float $price): void;
```

## KSeF-Hooks (ksef)

### `polski/ksef/invoice_data`

Filtert die Rechnungsdaten vor dem Versand an KSeF.

```php
/**
 * @param array    $data  Rechnungsdaten
 * @param WC_Order $order Bestellobjekt
 */
apply_filters('polski/ksef/invoice_data', array $data, WC_Order $order): array;
```

**Beispiel:**

```php
add_filter('polski/ksef/invoice_data', function (array $data, WC_Order $order): array {
    $data['additional_info'] = 'Rechnung automatisch generiert';
    return $data;
}, 10, 2);
```

### `polski/ksef/invoice_sent`

Aktion, die nach dem erfolgreichen Versand der Rechnung an KSeF ausgelöst wird.

```php
/**
 * @param int    $order_id   Bestell-ID
 * @param string $ksef_id    Referenznummer von KSeF
 * @param array  $response   Antwort der KSeF-API
 */
do_action('polski/ksef/invoice_sent', int $order_id, string $ksef_id, array $response): void;
```

**Beispiel:**

```php
add_action('polski/ksef/invoice_sent', function (int $order_id, string $ksef_id, array $response): void {
    update_post_meta($order_id, '_ksef_reference', $ksef_id);
    $order = wc_get_order($order_id);
    $order->add_order_note(sprintf('Rechnung an KSeF gesendet: %s', $ksef_id));
}, 10, 3);
```

## DSA-Hooks (dsa)

### `polski/dsa/report_fields`

Filtert die Felder des DSA-Meldeformulars.

```php
/**
 * @param array $fields Formularfelder
 */
apply_filters('polski/dsa/report_fields', array $fields): array;
```

**Beispiel:**

```php
add_filter('polski/dsa/report_fields', function (array $fields): array {
    $fields['screenshot'] = [
        'type'     => 'file',
        'label'    => 'Screenshot',
        'required' => false,
        'accept'   => '.jpg,.png,.pdf',
    ];
    return $fields;
});
```

### `polski/dsa/report_submitted`

Aktion, die nach dem Absenden einer DSA-Meldung ausgelöst wird.

```php
/**
 * @param int   $report_id Melde-ID
 * @param array $data      Daten der Meldung
 */
do_action('polski/dsa/report_submitted', int $report_id, array $data): void;
```

## DOI-Hooks - Double-Opt-in (doi)

### `polski/doi/verification_email`

Filtert den Inhalt der DOI-Verifizierungs-E-Mail.

```php
/**
 * @param string $message Inhalt der E-Mail
 * @param string $email   Zu verifizierende E-Mail-Adresse
 * @param string $url     Verifizierungs-URL
 */
apply_filters('polski/doi/verification_email', string $message, string $email, string $url): string;
```

**Beispiel:**

```php
add_filter('polski/doi/verification_email', function (string $message, string $email, string $url): string {
    return sprintf(
        'Hallo! Bestätige deine Registrierung mit einem Klick: <a href="%s">Konto bestätigen</a>',
        esc_url($url)
    );
}, 10, 3);
```

### `polski/doi/verified`

Aktion, die nach der erfolgreichen DOI-Verifizierung ausgelöst wird.

```php
/**
 * @param int    $user_id Benutzer-ID
 * @param string $email   E-Mail-Adresse
 */
do_action('polski/doi/verified', int $user_id, string $email): void;
```

## Cache-Hooks (cache)

### `polski/cache/should_flush`

Filtert die Entscheidung über das Leeren des Plugin-Caches.

```php
/**
 * @param bool   $should_flush Ob der Cache geleert werden soll
 * @param string $group        Cache-Gruppe (omnibus, badges, search)
 */
apply_filters('polski/cache/should_flush', bool $should_flush, string $group): bool;
```

**Beispiel:**

```php
add_filter('polski/cache/should_flush', function (bool $should_flush, string $group): bool {
    // Such-Cache beim Import nicht leeren
    if ($group === 'search' && defined('WP_IMPORTING') && WP_IMPORTING) {
        return false;
    }
    return $should_flush;
}, 10, 2);
```

### `polski/cache/ttl`

Filtert die Lebensdauer des Caches (TTL) in Sekunden.

```php
/**
 * @param int    $ttl   Zeit in Sekunden
 * @param string $group Cache-Gruppe
 */
apply_filters('polski/cache/ttl', int $ttl, string $group): int;
```

## Checkbox-Hooks (checkboxes)

### `polski/checkboxes/render`

Filtert das HTML der gerenderten Checkbox.

```php
/**
 * @param string $html     HTML der Checkbox
 * @param array  $checkbox Daten der Checkbox
 * @param string $location Standort (checkout, registration, contact)
 */
apply_filters('polski/checkboxes/render', string $html, array $checkbox, string $location): string;
```

### `polski/checkboxes/validated`

Aktion, die nach der Validierung der Checkboxen ausgelöst wird.

```php
/**
 * @param array $checkboxes Validierte Checkboxen
 * @param bool  $valid      Ergebnis der Validierung
 */
do_action('polski/checkboxes/validated', array $checkboxes, bool $valid): void;
```

## E-Mail-Hooks (email)

### `polski/email/template`

Filtert den Pfad zur E-Mail-Vorlage.

```php
/**
 * @param string $template Pfad zur Vorlage
 * @param string $type     E-Mail-Typ (withdrawal, doi, waitlist)
 */
apply_filters('polski/email/template', string $template, string $type): string;
```

**Beispiel:**

```php
add_filter('polski/email/template', function (string $template, string $type): string {
    if ($type === 'withdrawal') {
        return get_stylesheet_directory() . '/polski/emails/withdrawal.php';
    }
    return $template;
}, 10, 2);
```

### `polski/email/headers`

Filtert die E-Mail-Header.

```php
/**
 * @param array  $headers E-Mail-Header
 * @param string $type    E-Mail-Typ
 */
apply_filters('polski/email/headers', array $headers, string $type): array;
```

## Hooks für Rechtsseiten (legal_page)

### `polski/legal_page/template_data`

Filtert die Daten, die in die Vorlage einer Rechtsseite eingefügt werden.

```php
/**
 * @param array  $data Vorlagendaten
 * @param string $type Seitentyp (terms, privacy, withdrawal, dsa_report)
 */
apply_filters('polski/legal_page/template_data', array $data, string $type): array;
```

**Beispiel:**

```php
add_filter('polski/legal_page/template_data', function (array $data, string $type): array {
    if ($type === 'terms') {
        $data['delivery_info'] = 'Lieferung innerhalb von 2-5 Werktagen.';
    }
    return $data;
}, 10, 2);
```

### `polski/legal_page/generated`

Aktion, die nach dem Generieren einer Rechtsseite ausgelöst wird.

```php
/**
 * @param int    $page_id Seiten-ID
 * @param string $type    Seitentyp
 */
do_action('polski/legal_page/generated', int $page_id, string $type): void;
```

## Best Practices

1. **Verwende Typen** - deklariere die Typen der Parameter und Rückgabewerte in den Callbacks
2. **Priorität** - die Standardpriorität ist 10, verwende eine höhere (z. B. 20), wenn du das Standardverhalten überschreiben möchtest
3. **Namespace** - erstelle in deinen eigenen Plugins keine Hooks im Namespace `polski/`, um Konflikte zu vermeiden
4. **Kompatibilität** - prüfe die Existenz von Hooks vor der Verwendung: `has_filter('polski/omnibus/lowest_price')`
5. **Dokumentation** - dokumentiere eigene Callbacks mit PHPDoc-Kommentaren

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
