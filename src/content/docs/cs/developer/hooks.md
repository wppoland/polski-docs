---
title: Hooky (akce a filtry)
description: Kompletni dokumentace hooku Polski for WooCommerce - 25 akci a filtru se signaturami, parametry a priklady kodu.
---

Polski for WooCommerce zpristupnuje sadu hooku (akci a filtru) umoznujicich vyvojarum rozsirovat a upravovat chovani pluginu. Vsechny hooky pouzivaji namespace `polski/`.

## Hooky odstoupeni od smlouvy (withdrawal)

### `polski/withdrawal/days`

Filtruje pocet dnu na odstoupeni od smlouvy.

```php
/**
 * @param int $days Liczba dni na odstąpienie (domyślnie 14)
 */
apply_filters('polski/withdrawal/days', int $days): int;
```

**Priklad:**

```php
add_filter('polski/withdrawal/days', function (int $days): int {
    return 30; // Prodlouzeni na 30 dnu
});
```

### `polski/withdrawal/excluded_categories`

Filtruje kategorie produktu vyloucenych z prava na odstoupeni.

```php
apply_filters('polski/withdrawal/excluded_categories', array $categories): array;
```

### `polski/withdrawal/form_fields`

Filtruje pole formulare odstoupeni od smlouvy.

```php
apply_filters('polski/withdrawal/form_fields', array $fields): array;
```

### `polski/withdrawal/email_sent`

Akce vyvolana po odeslani potvrzeni e-mailem o odstoupeni.

```php
do_action('polski/withdrawal/email_sent', int $order_id, array $form_data): void;
```

## Hooky cenove (price)

### `polski/price/unit_format`

Filtruje format zobrazovani jednotkove ceny.

```php
apply_filters('polski/price/unit_format', string $format, float $unit_price, string $unit, int $product_id): string;
```

### `polski/price/vat_label`

Filtruje stitek DPH zobrazovany u ceny.

```php
apply_filters('polski/price/vat_label', string $label, string $tax_status): string;
```

## Hooky Omnibus (omnibus)

### `polski/omnibus/lowest_price`

Filtruje nejnizsi cenu z poslednich 30 dnu (smernice Omnibus).

```php
apply_filters('polski/omnibus/lowest_price', float $price, int $product_id, int $days): float;
```

### `polski/omnibus/display_format`

Filtruje format zobrazovani ceny Omnibus.

```php
apply_filters('polski/omnibus/display_format', string $html, float $price, int $product_id): string;
```

### `polski/omnibus/price_recorded`

Akce vyvolana po ulozeni ceny do historie Omnibus.

```php
do_action('polski/omnibus/price_recorded', int $product_id, float $price): void;
```

## Hooky KSeF (ksef)

### `polski/ksef/invoice_data`

Filtruje data faktury pred odeslanim do KSeF.

```php
apply_filters('polski/ksef/invoice_data', array $data, WC_Order $order): array;
```

### `polski/ksef/invoice_sent`

Akce vyvolana po uspesnem odeslani faktury do KSeF.

```php
do_action('polski/ksef/invoice_sent', int $order_id, string $ksef_id, array $response): void;
```

## Hooky DSA (dsa)

### `polski/dsa/report_fields`

Filtruje pole formulare hlaseni DSA.

```php
apply_filters('polski/dsa/report_fields', array $fields): array;
```

### `polski/dsa/report_submitted`

Akce vyvolana po podani hlaseni DSA.

```php
do_action('polski/dsa/report_submitted', int $report_id, array $data): void;
```

## Hooky DOI - double opt-in (doi)

### `polski/doi/verification_email`

Filtruje obsah overovaci e-mailove zpravy DOI.

```php
apply_filters('polski/doi/verification_email', string $message, string $email, string $url): string;
```

### `polski/doi/verified`

Akce vyvolana po uspesnem overeni DOI.

```php
do_action('polski/doi/verified', int $user_id, string $email): void;
```

## Hooky cache (cache)

### `polski/cache/should_flush`

Filtruje rozhodnuti o cisteni cache pluginu.

```php
apply_filters('polski/cache/should_flush', bool $should_flush, string $group): bool;
```

### `polski/cache/ttl`

Filtruje dobu zivota cache (TTL) v sekundach.

```php
apply_filters('polski/cache/ttl', int $ttl, string $group): int;
```

## Hooky checkboxu (checkboxes)

### `polski/checkboxes/render`

Filtruje HTML renderovaneho checkboxu.

```php
apply_filters('polski/checkboxes/render', string $html, array $checkbox, string $location): string;
```

### `polski/checkboxes/validated`

Akce vyvolana po validaci checkboxu.

```php
do_action('polski/checkboxes/validated', array $checkboxes, bool $valid): void;
```

## Hooky e-mail (email)

### `polski/email/template`

Filtruje cestu k sablone e-mailu.

```php
apply_filters('polski/email/template', string $template, string $type): string;
```

### `polski/email/headers`

Filtruje hlavicky e-mailu.

```php
apply_filters('polski/email/headers', array $headers, string $type): array;
```

## Hooky pravnich stranek (legal_page)

### `polski/legal_page/template_data`

Filtruje data vkladana do sablony pravni stranky.

```php
apply_filters('polski/legal_page/template_data', array $data, string $type): array;
```

### `polski/legal_page/generated`

Akce vyvolana po vygenerovani pravni stranky.

```php
do_action('polski/legal_page/generated', int $page_id, string $type): void;
```

## Doporucene postupy

1. **Pouzivejte typy** - deklarujte typy parametru a navratovych hodnot v callbackach
2. **Priorita** - vychozi priorita je 10, pouzijte vyssi (napr. 20) pokud chcete prepsat vychozi chovani
3. **Namespace** - nevytvarejte hooky v namespace `polski/` ve svych pluginech pro zamezeni konfliktu
4. **Kompatibilita** - kontrolujte existenci hooku pred pouzitim: `has_filter('polski/omnibus/lowest_price')`
5. **Dokumentace** - dokumentujte vlastni callbacky komentari PHPDoc

Hlaseni problemu: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
