---
title: Hooks (Actions und Filter)
description: Vollstaendige Hook-Dokumentation von Polski for WooCommerce - 25 Actions und Filter mit Signaturen, Parametern und Codebeispielen.
---

Polski for WooCommerce stellt einen Satz von Hooks (Actions und Filtern) bereit, die Entwicklern das Erweitern und Aendern des Plugin-Verhaltens ermoeglichen. Alle Hooks verwenden den Namespace `polski/`.

## Widerrufs-Hooks (withdrawal)

### `polski/withdrawal/days`

Filtert die Anzahl der Tage fuer den Widerruf.

```php
/**
 * @param int $days Anzahl der Widerrufstage (Standard 14)
 */
apply_filters('polski/withdrawal/days', int $days): int;
```

**Beispiel:**

```php
add_filter('polski/withdrawal/days', function (int $days): int {
    return 30; // Verlaengerung auf 30 Tage
});
```

### `polski/withdrawal/excluded_categories`

Filtert Produktkategorien, die vom Widerrufsrecht ausgeschlossen sind.

```php
apply_filters('polski/withdrawal/excluded_categories', array $categories): array;
```

### `polski/withdrawal/form_fields`

Filtert die Felder des Widerrufsformulars.

```php
apply_filters('polski/withdrawal/form_fields', array $fields): array;
```

### `polski/withdrawal/email_sent`

Action, die nach dem Versand der Widerrufsbestaetigungs-E-Mail aufgerufen wird.

```php
do_action('polski/withdrawal/email_sent', int $order_id, array $form_data): void;
```

## Preis-Hooks (price)

### `polski/price/unit_format`

Filtert das Anzeigeformat des Grundpreises.

```php
apply_filters('polski/price/unit_format', string $format, float $unit_price, string $unit, int $product_id): string;
```

### `polski/price/vat_label`

Filtert das MwSt.-Label neben dem Preis.

```php
apply_filters('polski/price/vat_label', string $label, string $tax_status): string;
```

## Omnibus-Hooks (omnibus)

### `polski/omnibus/lowest_price`

Filtert den niedrigsten Preis der letzten 30 Tage (Omnibus-Richtlinie).

```php
apply_filters('polski/omnibus/lowest_price', float $price, int $product_id, int $days): float;
```

### `polski/omnibus/display_format`

Filtert das Anzeigeformat des Omnibus-Preises.

```php
apply_filters('polski/omnibus/display_format', string $html, float $price, int $product_id): string;
```

### `polski/omnibus/price_recorded`

Action, die nach dem Speichern eines Preises in der Omnibus-Historie aufgerufen wird.

```php
do_action('polski/omnibus/price_recorded', int $product_id, float $price): void;
```

## KSeF-Hooks (ksef)

### `polski/ksef/invoice_data`

Filtert Rechnungsdaten vor dem Senden an KSeF.

```php
apply_filters('polski/ksef/invoice_data', array $data, WC_Order $order): array;
```

### `polski/ksef/invoice_sent`

Action, die nach erfolgreichem Rechnungsversand an KSeF aufgerufen wird.

```php
do_action('polski/ksef/invoice_sent', int $order_id, string $ksef_id, array $response): void;
```

## DSA-Hooks (dsa)

### `polski/dsa/report_fields`

Filtert die Felder des DSA-Meldeformulars.

```php
apply_filters('polski/dsa/report_fields', array $fields): array;
```

### `polski/dsa/report_submitted`

Action, die nach dem Einreichen einer DSA-Meldung aufgerufen wird.

```php
do_action('polski/dsa/report_submitted', int $report_id, array $data): void;
```

## DOI-Hooks - Double Opt-in (doi)

### `polski/doi/verification_email`

Filtert den Inhalt der DOI-Verifizierungs-E-Mail.

```php
apply_filters('polski/doi/verification_email', string $message, string $email, string $url): string;
```

### `polski/doi/verified`

Action, die nach erfolgreicher DOI-Verifizierung aufgerufen wird.

```php
do_action('polski/doi/verified', int $user_id, string $email): void;
```

## Cache-Hooks (cache)

### `polski/cache/should_flush`

Filtert die Entscheidung ueber das Leeren des Plugin-Caches.

```php
apply_filters('polski/cache/should_flush', bool $should_flush, string $group): bool;
```

### `polski/cache/ttl`

Filtert die Cache-Lebensdauer (TTL) in Sekunden.

```php
apply_filters('polski/cache/ttl', int $ttl, string $group): int;
```

## Checkbox-Hooks (checkboxes)

### `polski/checkboxes/render`

Filtert das HTML der gerenderten Checkbox.

```php
apply_filters('polski/checkboxes/render', string $html, array $checkbox, string $location): string;
```

### `polski/checkboxes/validated`

Action, die nach der Checkbox-Validierung aufgerufen wird.

```php
do_action('polski/checkboxes/validated', array $checkboxes, bool $valid): void;
```

## E-Mail-Hooks (email)

### `polski/email/template`

Filtert den Pfad zur E-Mail-Vorlage.

```php
apply_filters('polski/email/template', string $template, string $type): string;
```

### `polski/email/headers`

Filtert die E-Mail-Header.

```php
apply_filters('polski/email/headers', array $headers, string $type): array;
```

## Rechtsseiten-Hooks (legal_page)

### `polski/legal_page/template_data`

Filtert die in die Rechtsseitenvorlage eingefuegten Daten.

```php
apply_filters('polski/legal_page/template_data', array $data, string $type): array;
```

### `polski/legal_page/generated`

Action, die nach der Generierung einer Rechtsseite aufgerufen wird.

```php
do_action('polski/legal_page/generated', int $page_id, string $type): void;
```

## Best Practices

1. **Typen verwenden** - deklarieren Sie Parameter- und Rueckgabetypen in Callbacks
2. **Prioritaet** - Standardprioritaet ist 10, verwenden Sie eine hoehere (z.B. 20), um das Standardverhalten zu ueberschreiben
3. **Namespace** - erstellen Sie keine Hooks im Namespace `polski/` in Ihren Plugins, um Konflikte zu vermeiden
4. **Kompatibilitaet** - pruefen Sie die Existenz von Hooks vor der Verwendung: `has_filter('polski/omnibus/lowest_price')`
5. **Dokumentation** - dokumentieren Sie eigene Callbacks mit PHPDoc-Kommentaren

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
