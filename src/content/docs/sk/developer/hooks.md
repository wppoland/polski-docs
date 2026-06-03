---
title: Hooky (akcie a filtre)
description: Kompletná dokumentácia hookov Polski for WooCommerce - 25 akcií a filtrov so signatúrami, parametrami a príkladmi kódu.
---

Hooky (akcie a filtre) na rozšírenie a úpravu správania pluginu. Všetky používajú namespace `polski/`.

## Hooky odstúpenia od zmluvy (withdrawal)

### `polski/withdrawal/days`

Filtruje počet dní na odstúpenie od zmluvy.

```php
/**
 * @param int $days Počet dní na odstúpenie (predvolene 14)
 */
apply_filters('polski/withdrawal/days', int $days): int;
```

**Príklad:**

```php
add_filter('polski/withdrawal/days', function (int $days): int {
    return 30; // Predĺženie na 30 dní
});
```

### `polski/withdrawal/excluded_categories`

Filtruje kategórie produktov vylúčených z práva na odstúpenie.

```php
/**
 * @param array $categories Pole ID kategórií
 */
apply_filters('polski/withdrawal/excluded_categories', array $categories): array;
```

**Príklad:**

```php
add_filter('polski/withdrawal/excluded_categories', function (array $categories): array {
    $categories[] = 15; // ID kategórie "Digitálne produkty"
    $categories[] = 22; // ID kategórie "Hygienické produkty"
    return $categories;
});
```

### `polski/withdrawal/form_fields`

Filtruje polia formulára na odstúpenie od zmluvy.

```php
/**
 * @param array $fields Pole polí formulára
 */
apply_filters('polski/withdrawal/form_fields', array $fields): array;
```

**Príklad:**

```php
add_filter('polski/withdrawal/form_fields', function (array $fields): array {
    $fields['reason'] = [
        'type'     => 'textarea',
        'label'    => 'Dôvod odstúpenia',
        'required' => false,
    ];
    return $fields;
});
```

### `polski/withdrawal/email_sent`

Akcia vyvolaná po odoslaní e-mailového potvrdenia odstúpenia.

```php
/**
 * @param int   $order_id  ID objednávky
 * @param array $form_data Údaje z formulára
 */
do_action('polski/withdrawal/email_sent', int $order_id, array $form_data): void;
```

**Príklad:**

```php
add_action('polski/withdrawal/email_sent', function (int $order_id, array $form_data): void {
    // Logovanie odstúpení do externého systému
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

Filtruje formát zobrazenia jednotkovej ceny.

```php
/**
 * @param string $format     Formát jednotkovej ceny
 * @param float  $unit_price Jednotková cena
 * @param string $unit       Merná jednotka (kg, l, m, ks)
 * @param int    $product_id ID produktu
 */
apply_filters('polski/price/unit_format', string $format, float $unit_price, string $unit, int $product_id): string;
```

**Príklad:**

```php
add_filter('polski/price/unit_format', function (string $format, float $unit_price, string $unit, int $product_id): string {
    return sprintf('%s / %s', wc_price($unit_price), $unit);
}, 10, 4);
```

### `polski/price/vat_label`

Filtruje označenie DPH zobrazené pri cene.

```php
/**
 * @param string $label      Text označenia
 * @param string $tax_status Daňový status produktu
 */
apply_filters('polski/price/vat_label', string $label, string $tax_status): string;
```

**Príklad:**

```php
add_filter('polski/price/vat_label', function (string $label, string $tax_status): string {
    if ($tax_status === 'taxable') {
        return 's DPH';
    }
    return 'oslobodené od DPH';
}, 10, 2);
```

## Hooky Omnibus (omnibus)

### `polski/omnibus/lowest_price`

Filtruje najnižšiu cenu za posledných 30 dní (smernica Omnibus).

```php
/**
 * @param float $price      Najnižšia cena
 * @param int   $product_id ID produktu
 * @param int   $days       Počet dní dozadu
 */
apply_filters('polski/omnibus/lowest_price', float $price, int $product_id, int $days): float;
```

**Príklad:**

```php
add_filter('polski/omnibus/lowest_price', function (float $price, int $product_id, int $days): float {
    // Vynechanie produktov z kategórie "Outlet"
    if (has_term('outlet', 'product_cat', $product_id)) {
        return 0.0; // Nezobrazuj cenu Omnibus
    }
    return $price;
}, 10, 3);
```

### `polski/omnibus/display_format`

Filtruje formát zobrazenia ceny Omnibus.

```php
/**
 * @param string $html       HTML s cenou
 * @param float  $price      Najnižšia cena
 * @param int    $product_id ID produktu
 */
apply_filters('polski/omnibus/display_format', string $html, float $price, int $product_id): string;
```

**Príklad:**

```php
add_filter('polski/omnibus/display_format', function (string $html, float $price, int $product_id): string {
    return sprintf(
        '<small class="omnibus-price">Najnižšia cena za 30 dní: %s</small>',
        wc_price($price)
    );
}, 10, 3);
```

### `polski/omnibus/price_recorded`

Akcia vyvolaná po uložení ceny do histórie Omnibus.

```php
/**
 * @param int   $product_id ID produktu
 * @param float $price      Uložená cena
 */
do_action('polski/omnibus/price_recorded', int $product_id, float $price): void;
```

## Hooky KSeF (ksef)

### `polski/ksef/invoice_data`

Filtruje údaje faktúry pred odoslaním do KSeF.

```php
/**
 * @param array    $data  Údaje faktúry
 * @param WC_Order $order Objekt objednávky
 */
apply_filters('polski/ksef/invoice_data', array $data, WC_Order $order): array;
```

**Príklad:**

```php
add_filter('polski/ksef/invoice_data', function (array $data, WC_Order $order): array {
    $data['additional_info'] = 'Faktúra vygenerovaná automaticky';
    return $data;
}, 10, 2);
```

### `polski/ksef/invoice_sent`

Akcia vyvolaná po úspešnom odoslaní faktúry do KSeF.

```php
/**
 * @param int    $order_id   ID objednávky
 * @param string $ksef_id    Referenčné číslo KSeF
 * @param array  $response   Odpoveď z API KSeF
 */
do_action('polski/ksef/invoice_sent', int $order_id, string $ksef_id, array $response): void;
```

**Príklad:**

```php
add_action('polski/ksef/invoice_sent', function (int $order_id, string $ksef_id, array $response): void {
    update_post_meta($order_id, '_ksef_reference', $ksef_id);
    $order = wc_get_order($order_id);
    $order->add_order_note(sprintf('Faktúra odoslaná do KSeF: %s', $ksef_id));
}, 10, 3);
```

## Hooky DSA (dsa)

### `polski/dsa/report_fields`

Filtruje polia formulára hlásenia DSA.

```php
/**
 * @param array $fields Polia formulára
 */
apply_filters('polski/dsa/report_fields', array $fields): array;
```

**Príklad:**

```php
add_filter('polski/dsa/report_fields', function (array $fields): array {
    $fields['screenshot'] = [
        'type'     => 'file',
        'label'    => 'Snímka obrazovky',
        'required' => false,
        'accept'   => '.jpg,.png,.pdf',
    ];
    return $fields;
});
```

### `polski/dsa/report_submitted`

Akcia vyvolaná po podaní hlásenia DSA.

```php
/**
 * @param int   $report_id ID hlásenia
 * @param array $data      Údaje hlásenia
 */
do_action('polski/dsa/report_submitted', int $report_id, array $data): void;
```

## Hooky DOI - double opt-in (doi)

### `polski/doi/verification_email`

Filtruje obsah overovacieho e-mailu DOI.

```php
/**
 * @param string $message Obsah e-mailu
 * @param string $email   E-mailová adresa na overenie
 * @param string $url     Overovacia URL
 */
apply_filters('polski/doi/verification_email', string $message, string $email, string $url): string;
```

**Príklad:**

```php
add_filter('polski/doi/verification_email', function (string $message, string $email, string $url): string {
    return sprintf(
        'Ahoj! Potvrď registráciu kliknutím: <a href="%s">Potvrdiť účet</a>',
        esc_url($url)
    );
}, 10, 3);
```

### `polski/doi/verified`

Akcia vyvolaná po úspešnom overení DOI.

```php
/**
 * @param int    $user_id ID používateľa
 * @param string $email   E-mailová adresa
 */
do_action('polski/doi/verified', int $user_id, string $email): void;
```

## Hooky cache (cache)

### `polski/cache/should_flush`

Filtruje rozhodnutie o vyčistení cache pluginu.

```php
/**
 * @param bool   $should_flush Či vyčistiť cache
 * @param string $group        Skupina cache (omnibus, badges, search)
 */
apply_filters('polski/cache/should_flush', bool $should_flush, string $group): bool;
```

**Príklad:**

```php
add_filter('polski/cache/should_flush', function (bool $should_flush, string $group): bool {
    // Nečisti cache vyhľadávania pri importe
    if ($group === 'search' && defined('WP_IMPORTING') && WP_IMPORTING) {
        return false;
    }
    return $should_flush;
}, 10, 2);
```

### `polski/cache/ttl`

Filtruje čas životnosti cache (TTL) v sekundách.

```php
/**
 * @param int    $ttl   Čas v sekundách
 * @param string $group Skupina cache
 */
apply_filters('polski/cache/ttl', int $ttl, string $group): int;
```

## Hooky checkboxov (checkboxes)

### `polski/checkboxes/render`

Filtruje HTML vykresľovaného checkboxu.

```php
/**
 * @param string $html     HTML checkboxu
 * @param array  $checkbox Údaje checkboxu
 * @param string $location Umiestnenie (checkout, registration, contact)
 */
apply_filters('polski/checkboxes/render', string $html, array $checkbox, string $location): string;
```

### `polski/checkboxes/validated`

Akcia vyvolaná po validácii checkboxov.

```php
/**
 * @param array $checkboxes Zvalidované checkboxy
 * @param bool  $valid      Výsledok validácie
 */
do_action('polski/checkboxes/validated', array $checkboxes, bool $valid): void;
```

## Hooky e-mailu (email)

### `polski/email/template`

Filtruje cestu k šablóne e-mailu.

```php
/**
 * @param string $template Cesta k šablóne
 * @param string $type     Typ e-mailu (withdrawal, doi, waitlist)
 */
apply_filters('polski/email/template', string $template, string $type): string;
```

**Príklad:**

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

## Hooky právnych stránok (legal_page)

### `polski/legal_page/template_data`

Filtruje údaje vkladané do šablóny právnej stránky.

```php
/**
 * @param array  $data Údaje šablóny
 * @param string $type Typ stránky (terms, privacy, withdrawal, dsa_report)
 */
apply_filters('polski/legal_page/template_data', array $data, string $type): array;
```

**Príklad:**

```php
add_filter('polski/legal_page/template_data', function (array $data, string $type): array {
    if ($type === 'terms') {
        $data['delivery_info'] = 'Doručenie do 2-5 pracovných dní.';
    }
    return $data;
}, 10, 2);
```

### `polski/legal_page/generated`

Akcia vyvolaná po vygenerovaní právnej stránky.

```php
/**
 * @param int    $page_id ID stránky
 * @param string $type    Typ stránky
 */
do_action('polski/legal_page/generated', int $page_id, string $type): void;
```

## Najlepšie postupy

1. **Používaj typy** - deklaruj typy parametrov a návratových hodnôt v callbackoch
2. **Priorita** - predvolená priorita je 10, použi vyššiu (napr. 20), ak chceš prepísať predvolené správanie
3. **Namespace** - nevytváraj hooky v namespace `polski/` vo svojich pluginoch, aby si predišiel konfliktom
4. **Kompatibilita** - kontroluj existenciu hookov pred použitím: `has_filter('polski/omnibus/lowest_price')`
5. **Dokumentácia** - dokumentuj vlastné callbacky komentármi PHPDoc

Hlásenie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informatívny charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
