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
 * @param int $days Liczba dni na odstąpienie (domyślnie 14)
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
 * @param array $categories Tablica ID kategorii
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
 * @param array $fields Tablica pól formularza
 */
apply_filters('polski/withdrawal/form_fields', array $fields): array;
```

**Príklad:**

```php
add_filter('polski/withdrawal/form_fields', function (array $fields): array {
    $fields['reason'] = [
        'type'     => 'textarea',
        'label'    => 'Powód odstąpienia',
        'required' => false,
    ];
    return $fields;
});
```

### `polski/withdrawal/email_sent`

Akcia volaná po zaslaní potvrdzujúceho e-mailu o odstúpení.

```php
/**
 * @param int   $order_id  ID zamówienia
 * @param array $form_data Dane z formularza
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

Filtruje formát zobrazovania jednotkovej ceny.

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

Filtruje štítok DPH zobrazovaný pri cene.

```php
/**
 * @param string $label      Text štítku
 * @param string $tax_status Daňový stav produktu
 */
apply_filters('polski/price/vat_label', string $label, string $tax_status): string;
```

**Príklad:**

```php
add_filter('polski/price/vat_label', function (string $label, string $tax_status): string {
    if ($tax_status === 'taxable') {
        return 'brutto (s DPH)';
    }
    return 'oslobodený od DPH';
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
        return 0.0; // Nezobrazovať cenu Omnibus
    }
    return $price;
}, 10, 3);
```

### `polski/omnibus/display_format`

Filtruje formát zobrazovania ceny Omnibus.

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
        '<small class="omnibus-price">Najniższa cena z 30 dni: %s</small>',
        wc_price($price)
    );
}, 10, 3);
```

### `polski/omnibus/price_recorded`

Akcia volaná po uložení ceny do histórie Omnibus.

```php
/**
 * @param int   $product_id ID produktu
 * @param float $price      Uložená cena
 */
do_action('polski/omnibus/price_recorded', int $product_id, float $price): void;
```

## Hooky KSeF (ksef)

### `polski/ksef/invoice_data`

Filtruje údaje faktúry pred zaslaním do KSeF.

```php
/**
 * @param array    $data  Údaje faktúry
 * @param WC_Order $order Objekt objednávky
 */
apply_filters('polski/ksef/invoice_data', array $data, WC_Order $order): array;
```

### `polski/ksef/invoice_sent`

Akcia volaná po úspešnom zaslaní faktúry do KSeF.

```php
/**
 * @param int    $order_id   ID objednávky
 * @param string $ksef_id    Referenčné číslo KSeF
 * @param array  $response   Odpoveď z API KSeF
 */
do_action('polski/ksef/invoice_sent', int $order_id, string $ksef_id, array $response): void;
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

### `polski/dsa/report_submitted`

Akcia volaná po podaní hlásenia DSA.

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
 * @param string $url     Overovacie URL
 */
apply_filters('polski/doi/verification_email', string $message, string $email, string $url): string;
```

### `polski/doi/verified`

Akcia volaná po úspešnom overení DOI.

```php
/**
 * @param int    $user_id ID používateľa
 * @param string $email   E-mailová adresa
 */
do_action('polski/doi/verified', int $user_id, string $email): void;
```

## Hooky cache (cache)

### `polski/cache/should_flush`

Filtruje rozhodnutie o čistení cache pluginu.

```php
/**
 * @param bool   $should_flush Či čistiť cache
 * @param string $group        Skupina cache (omnibus, badges, search)
 */
apply_filters('polski/cache/should_flush', bool $should_flush, string $group): bool;
```

### `polski/cache/ttl`

Filtruje čas života cache (TTL) v sekundách.

```php
/**
 * @param int    $ttl   Čas v sekundách
 * @param string $group Skupina cache
 */
apply_filters('polski/cache/ttl', int $ttl, string $group): int;
```

## Hooky checkboxov (checkboxes)

### `polski/checkboxes/render`

Filtruje HTML renderovaného checkboxu.

```php
/**
 * @param string $html     HTML checkboxu
 * @param array  $checkbox Údaje checkboxu
 * @param string $location Lokalizácia (checkout, registration, contact)
 */
apply_filters('polski/checkboxes/render', string $html, array $checkbox, string $location): string;
```

### `polski/checkboxes/validated`

Akcia volaná po validácii checkboxov.

```php
/**
 * @param array $checkboxes Validované checkboxy
 * @param bool  $valid      Výsledok validácie
 */
do_action('polski/checkboxes/validated', array $checkboxes, bool $valid): void;
```

## Hooky e-mail (email)

### `polski/email/template`

Filtruje cestu k šablóne e-mailu.

```php
/**
 * @param string $template Cesta k šablóne
 * @param string $type     Typ e-mailu (withdrawal, doi, waitlist)
 */
apply_filters('polski/email/template', string $template, string $type): string;
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

### `polski/legal_page/generated`

Akcia volaná po vygenerovaní právnej stránky.

```php
/**
 * @param int    $page_id ID stránky
 * @param string $type    Typ stránky
 */
do_action('polski/legal_page/generated', int $page_id, string $type): void;
```

## Najlepšie postupy

1. **Používajte typy** - deklarujte typy parametrov a návratových hodnôt v callbackoch
2. **Priorita** - predvolená priorita je 10, použite vyššiu (napr. 20) ak chcete prepísať predvolené správanie
3. **Namespace** - nevytvárajte hooky v namespace `polski/` vo svojich pluginoch, aby ste sa vyhli konfliktom
4. **Kompatibilita** - kontrolujte existenciu hookov pred použitím: `has_filter('polski/omnibus/lowest_price')`
5. **Dokumentácia** - dokumentujte vlastné callbacky komentármi PHPDoc

Nahlasovanie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
