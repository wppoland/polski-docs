---
title: Hooky (akce a filtry)
description: Kompletní dokumentace hooků Polski for WooCommerce - 25 akcí a filtrů se signaturami, parametry a příklady kódu.
---

Hooky (akce a filtry) pro rozšíření a úpravu chování pluginu. Všechny používají namespace `polski/`.

## Hooky odstoupení od smlouvy (withdrawal)

### `polski/withdrawal/days`

Filtruje počet dní na odstoupení od smlouvy.

```php
/**
 * @param int $days Počet dní na odstoupení (výchozí 14)
 */
apply_filters('polski/withdrawal/days', int $days): int;
```

**Příklad:**

```php
add_filter('polski/withdrawal/days', function (int $days): int {
    return 30; // Prodloužení na 30 dní
});
```

### `polski/withdrawal/excluded_categories`

Filtruje kategorie produktů vyloučených z práva na odstoupení.

```php
/**
 * @param array $categories Pole ID kategorií
 */
apply_filters('polski/withdrawal/excluded_categories', array $categories): array;
```

**Příklad:**

```php
add_filter('polski/withdrawal/excluded_categories', function (array $categories): array {
    $categories[] = 15; // ID kategorie "Digitální produkty"
    $categories[] = 22; // ID kategorie "Hygienické produkty"
    return $categories;
});
```

### `polski/withdrawal/form_fields`

Filtruje pole formuláře odstoupení od smlouvy.

```php
/**
 * @param array $fields Pole formuláře
 */
apply_filters('polski/withdrawal/form_fields', array $fields): array;
```

**Příklad:**

```php
add_filter('polski/withdrawal/form_fields', function (array $fields): array {
    $fields['reason'] = [
        'type'     => 'textarea',
        'label'    => 'Důvod odstoupení',
        'required' => false,
    ];
    return $fields;
});
```

### `polski/withdrawal/email_sent`

Akce volaná po odeslání potvrzovacího e-mailu o odstoupení.

```php
/**
 * @param int   $order_id  ID objednávky
 * @param array $form_data Data z formuláře
 */
do_action('polski/withdrawal/email_sent', int $order_id, array $form_data): void;
```

**Příklad:**

```php
add_action('polski/withdrawal/email_sent', function (int $order_id, array $form_data): void {
    // Logování odstoupení do externího systému
    wp_remote_post('https://api.crm.pl/withdrawals', [
        'body' => wp_json_encode([
            'order_id' => $order_id,
            'date'     => current_time('mysql'),
        ]),
    ]);
}, 10, 2);
```

## Cenové hooky (price)

### `polski/price/unit_format`

Filtruje formát zobrazení jednotkové ceny.

```php
/**
 * @param string $format     Formát jednotkové ceny
 * @param float  $unit_price Jednotková cena
 * @param string $unit       Měrná jednotka (kg, l, m, ks)
 * @param int    $product_id ID produktu
 */
apply_filters('polski/price/unit_format', string $format, float $unit_price, string $unit, int $product_id): string;
```

**Příklad:**

```php
add_filter('polski/price/unit_format', function (string $format, float $unit_price, string $unit, int $product_id): string {
    return sprintf('%s / %s', wc_price($unit_price), $unit);
}, 10, 4);
```

### `polski/price/vat_label`

Filtruje popisek DPH zobrazovaný u ceny.

```php
/**
 * @param string $label      Text popisku
 * @param string $tax_status Daňový status produktu
 */
apply_filters('polski/price/vat_label', string $label, string $tax_status): string;
```

**Příklad:**

```php
add_filter('polski/price/vat_label', function (string $label, string $tax_status): string {
    if ($tax_status === 'taxable') {
        return 's DPH';
    }
    return 'osvobozeno od DPH';
}, 10, 2);
```

## Hooky Omnibus (omnibus)

### `polski/omnibus/lowest_price`

Filtruje nejnižší cenu za posledních 30 dní (směrnice Omnibus).

```php
/**
 * @param float $price      Nejnižší cena
 * @param int   $product_id ID produktu
 * @param int   $days       Počet dní zpět
 */
apply_filters('polski/omnibus/lowest_price', float $price, int $product_id, int $days): float;
```

**Příklad:**

```php
add_filter('polski/omnibus/lowest_price', function (float $price, int $product_id, int $days): float {
    // Vynechání produktů z kategorie "Outlet"
    if (has_term('outlet', 'product_cat', $product_id)) {
        return 0.0; // Nezobrazuj cenu Omnibus
    }
    return $price;
}, 10, 3);
```

### `polski/omnibus/display_format`

Filtruje formát zobrazení ceny Omnibus.

```php
/**
 * @param string $html       HTML s cenou
 * @param float  $price      Nejnižší cena
 * @param int    $product_id ID produktu
 */
apply_filters('polski/omnibus/display_format', string $html, float $price, int $product_id): string;
```

**Příklad:**

```php
add_filter('polski/omnibus/display_format', function (string $html, float $price, int $product_id): string {
    return sprintf(
        '<small class="omnibus-price">Nejnižší cena za 30 dní: %s</small>',
        wc_price($price)
    );
}, 10, 3);
```

### `polski/omnibus/price_recorded`

Akce volaná po uložení ceny do historie Omnibus.

```php
/**
 * @param int   $product_id ID produktu
 * @param float $price      Uložená cena
 */
do_action('polski/omnibus/price_recorded', int $product_id, float $price): void;
```

## Hooky KSeF (ksef)

### `polski/ksef/invoice_data`

Filtruje data faktury před odesláním do KSeF.

```php
/**
 * @param array    $data  Data faktury
 * @param WC_Order $order Objekt objednávky
 */
apply_filters('polski/ksef/invoice_data', array $data, WC_Order $order): array;
```

**Příklad:**

```php
add_filter('polski/ksef/invoice_data', function (array $data, WC_Order $order): array {
    $data['additional_info'] = 'Faktura vygenerována automaticky';
    return $data;
}, 10, 2);
```

### `polski/ksef/invoice_sent`

Akce volaná po úspěšném odeslání faktury do KSeF.

```php
/**
 * @param int    $order_id   ID objednávky
 * @param string $ksef_id    Referenční číslo KSeF
 * @param array  $response   Odpověď z API KSeF
 */
do_action('polski/ksef/invoice_sent', int $order_id, string $ksef_id, array $response): void;
```

**Příklad:**

```php
add_action('polski/ksef/invoice_sent', function (int $order_id, string $ksef_id, array $response): void {
    update_post_meta($order_id, '_ksef_reference', $ksef_id);
    $order = wc_get_order($order_id);
    $order->add_order_note(sprintf('Faktura odeslána do KSeF: %s', $ksef_id));
}, 10, 3);
```

## Hooky DSA (dsa)

### `polski/dsa/report_fields`

Filtruje pole formuláře hlášení DSA.

```php
/**
 * @param array $fields Pole formuláře
 */
apply_filters('polski/dsa/report_fields', array $fields): array;
```

**Příklad:**

```php
add_filter('polski/dsa/report_fields', function (array $fields): array {
    $fields['screenshot'] = [
        'type'     => 'file',
        'label'    => 'Snímek obrazovky',
        'required' => false,
        'accept'   => '.jpg,.png,.pdf',
    ];
    return $fields;
});
```

### `polski/dsa/report_submitted`

Akce volaná po odeslání hlášení DSA.

```php
/**
 * @param int   $report_id ID hlášení
 * @param array $data      Data hlášení
 */
do_action('polski/dsa/report_submitted', int $report_id, array $data): void;
```

## Hooky DOI - double opt-in (doi)

### `polski/doi/verification_email`

Filtruje obsah ověřovacího e-mailu DOI.

```php
/**
 * @param string $message Obsah e-mailu
 * @param string $email   E-mailová adresa k ověření
 * @param string $url     Ověřovací URL
 */
apply_filters('polski/doi/verification_email', string $message, string $email, string $url): string;
```

**Příklad:**

```php
add_filter('polski/doi/verification_email', function (string $message, string $email, string $url): string {
    return sprintf(
        'Dobrý den! Potvrďte registraci kliknutím: <a href="%s">Potvrdit účet</a>',
        esc_url($url)
    );
}, 10, 3);
```

### `polski/doi/verified`

Akce volaná po úspěšném ověření DOI.

```php
/**
 * @param int    $user_id ID uživatele
 * @param string $email   E-mailová adresa
 */
do_action('polski/doi/verified', int $user_id, string $email): void;
```

## Hooky cache (cache)

### `polski/cache/should_flush`

Filtruje rozhodnutí o vymazání cache pluginu.

```php
/**
 * @param bool   $should_flush Zda vymazat cache
 * @param string $group        Skupina cache (omnibus, badges, search)
 */
apply_filters('polski/cache/should_flush', bool $should_flush, string $group): bool;
```

**Příklad:**

```php
add_filter('polski/cache/should_flush', function (bool $should_flush, string $group): bool {
    // Nemaž cache vyhledávání při importu
    if ($group === 'search' && defined('WP_IMPORTING') && WP_IMPORTING) {
        return false;
    }
    return $should_flush;
}, 10, 2);
```

### `polski/cache/ttl`

Filtruje dobu života cache (TTL) v sekundách.

```php
/**
 * @param int    $ttl   Čas v sekundách
 * @param string $group Skupina cache
 */
apply_filters('polski/cache/ttl', int $ttl, string $group): int;
```

## Hooky checkboxů (checkboxes)

### `polski/checkboxes/render`

Filtruje HTML vykresleného checkboxu.

```php
/**
 * @param string $html     HTML checkboxu
 * @param array  $checkbox Data checkboxu
 * @param string $location Umístění (checkout, registration, contact)
 */
apply_filters('polski/checkboxes/render', string $html, array $checkbox, string $location): string;
```

### `polski/checkboxes/validated`

Akce volaná po validaci checkboxů.

```php
/**
 * @param array $checkboxes Validované checkboxy
 * @param bool  $valid      Výsledek validace
 */
do_action('polski/checkboxes/validated', array $checkboxes, bool $valid): void;
```

## Hooky e-mailu (email)

### `polski/email/template`

Filtruje cestu k šabloně e-mailu.

```php
/**
 * @param string $template Cesta k šabloně
 * @param string $type     Typ e-mailu (withdrawal, doi, waitlist)
 */
apply_filters('polski/email/template', string $template, string $type): string;
```

**Příklad:**

```php
add_filter('polski/email/template', function (string $template, string $type): string {
    if ($type === 'withdrawal') {
        return get_stylesheet_directory() . '/polski/emails/withdrawal.php';
    }
    return $template;
}, 10, 2);
```

### `polski/email/headers`

Filtruje hlavičky e-mailu.

```php
/**
 * @param array  $headers Hlavičky e-mailu
 * @param string $type    Typ e-mailu
 */
apply_filters('polski/email/headers', array $headers, string $type): array;
```

## Hooky právních stránek (legal_page)

### `polski/legal_page/template_data`

Filtruje data vkládaná do šablony právní stránky.

```php
/**
 * @param array  $data Data šablony
 * @param string $type Typ stránky (terms, privacy, withdrawal, dsa_report)
 */
apply_filters('polski/legal_page/template_data', array $data, string $type): array;
```

**Příklad:**

```php
add_filter('polski/legal_page/template_data', function (array $data, string $type): array {
    if ($type === 'terms') {
        $data['delivery_info'] = 'Doručení během 2-5 pracovních dní.';
    }
    return $data;
}, 10, 2);
```

### `polski/legal_page/generated`

Akce volaná po vygenerování právní stránky.

```php
/**
 * @param int    $page_id ID stránky
 * @param string $type    Typ stránky
 */
do_action('polski/legal_page/generated', int $page_id, string $type): void;
```

## Nejlepší postupy

1. **Používejte typy** - deklarujte typy parametrů a návratových hodnot v callbacích
2. **Priorita** - výchozí priorita je 10, používejte vyšší (např. 20), pokud chcete přepsat výchozí chování
3. **Namespace** - nevytvářejte hooky v namespace `polski/` ve svých pluginech, abyste předešli konfliktům
4. **Kompatibilita** - před použitím ověřujte existenci hooků: `has_filter('polski/omnibus/lowest_price')`
5. **Dokumentace** - dokumentujte vlastní callbacky komentáři PHPDoc

Hlášení problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
