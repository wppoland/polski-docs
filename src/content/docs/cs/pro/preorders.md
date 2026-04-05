---
title: Predprodej (pre-orders)
description: Modul predprodeje Polski PRO for WooCommerce - oznaceni produktu jako pre-order, datum premiery, vlastni text tlacitka a validace kosiku.
---

Modul predprodeje umoznuje oznacovat produkty jako dostupne v predprodeji, zobrazovat datum premiery, menit text tlacitka nakupu a ridit michani produktu pre-order se standardnimi v kosiku. Je uzitecny v obchodech s elektronikou, knihami, hrami a jakymkoli sortimentem, kde jsou produkty nabizeny pred oficialnim datem dostupnosti.

:::note[Pozadavky]
Polski PRO vyzaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Globalni konfigurace

Prejdete do **WooCommerce > Nastaveni > Polski PRO > Predprodej**.

| Nastaveni | Vychozi hodnota | Popis |
|-----------|-----------------|-------|
| Text tlacitka | "Zamów w przedsprzedaży" | Globalni text tlacitka pro produkty pre-order |
| Text dostupnosti | "Dostępne od {date}" | Sablona textu zobrazovaneho namisto stavu skladu |
| Format data | `d.m.Y` | Format zobrazeni data premiery |
| Blokovat michani kosiku | Ano | Zakazuje pridavani standardnich produktu do kosiku s pre-order |
| Zprava blokace | "Produkty w przedsprzedaży muszą być zamawiane osobno." | Zprava zobrazena pri pokusu o michani |

## Konfigurace produktu

### Meta pole

Nastaveni predprodeje se nachazi v uprave produktu, v zalozce **Obecne** v panelu dat produktu.

| Meta pole | Klic | Typ | Popis |
|-----------|------|-----|-------|
| Zapnout predprodej | `_polski_preorder_enabled` | `bool` | Oznaci produkt jako pre-order |
| Datum premiery | `_polski_preorder_release_date` | `string` (Y-m-d) | Datum, od ktereho je produkt standardne dostupny |
| Text tlacitka | `_polski_preorder_button_text` | `string` | Prepise globalni text tlacitka pro tento produkt |
| Text dostupnosti | `_polski_preorder_availability_text` | `string` | Prepise globalni text dostupnosti |

### Nastaveni pres WP-CLI

```bash
wp post meta update 123 _polski_preorder_enabled "yes"
wp post meta update 123 _polski_preorder_release_date "2026-06-15"
wp post meta update 123 _polski_preorder_button_text "Zamów teraz - premiera 15 czerwca"
```

### Programove nastaveni

```php
update_post_meta($product_id, '_polski_preorder_enabled', 'yes');
update_post_meta($product_id, '_polski_preorder_release_date', '2026-06-15');
```

## Zobrazeni na frontendu

### Tlacitko nakupu

Kdyz je produkt oznacen jako pre-order, text tlacitka "Pridat do kosiku" se zmeni na nastaveny text predprodeje. Tyka se to:

- Stranky jednotliveho produktu
- Stranek archivu, kategorii a stitku
- Vysledku vyhledavani
- Bloku WooCommerce (Product Grid, Product Collection)

### Text dostupnosti

Namisto standardniho stavu skladu ("Skladem", "Neni skladem") je zobrazen text dostupnosti s datem premiery. Placeholder `{date}` je nahrazen formatovanym datem.

**Priklad zobrazeni:**

> Dostępne od 15.06.2026

### Automaticka deaktivace

Po prekroceni data premiery se produkt automaticky vraci do standardniho rezimu. Deaktivace probiha pres ulohu WP-Cron spoustenou denne v 00:01.

```php
/**
 * Akcja wywoływana po automatycznej dezaktywacji przedsprzedaży.
 *
 * @param int    $product_id   ID produktu
 * @param string $release_date Data premiery (Y-m-d)
 */
do_action('polski_pro/preorder/deactivated', int $product_id, string $release_date);
```

**Priklad - oznameni zakaznikum o dostupnosti:**

```php
add_action('polski_pro/preorder/deactivated', function (int $product_id, string $release_date): void {
    $subscribers = get_post_meta($product_id, '_polski_preorder_subscribers', true);
    if (is_array($subscribers)) {
        foreach ($subscribers as $email) {
            wp_mail(
                $email,
                'Produkt jest już dostępny!',
                sprintf('Produkt %s jest teraz dostępny do zakupu.', get_the_title($product_id))
            );
        }
    }
}, 10, 2);
```

## Validace kosiku

### Blokace michani produktu

Kdyz je moznost "Blokovat michani kosiku" zapnuta, zakaznik nemuze pridat do kosiku soucasne:

- Produkty v predprodeji a standardni produkty
- Produkty pre-order s ruznymi daty premiery (volitelne)

Pri pokusu o pridani produktu jineho typu se zobrazi zprava blokace a produkt neni pridan.

### Hook validace

```php
/**
 * Filtruje, czy koszyk może zawierać mieszane typy produktów.
 *
 * @param bool $allow       Czy pozwolić na mieszanie (domyślnie false)
 * @param int  $product_id  ID dodawanego produktu
 * @param array $cart_items  Aktualne produkty w koszyku
 */
apply_filters('polski_pro/preorder/allow_mixed_cart', bool $allow, int $product_id, array $cart_items): bool;
```

**Priklad - povoleni michani pro VIP:**

```php
add_filter('polski_pro/preorder/allow_mixed_cart', function (bool $allow, int $product_id, array $cart_items): bool {
    if (current_user_can('manage_woocommerce')) {
        return true;
    }
    return $allow;
}, 10, 3);
```

## Shortcode

Zobrazeni odpocitavani do data premiery:

```
[polski_preorder_countdown product_id="123" format="days" label="Do premiery pozostało:"]
```

| Parametr | Povinny | Popis |
|----------|---------|-------|
| `product_id` | Ne | ID produktu (vychozi aktualni) |
| `format` | Ne | Format: `days`, `full` (dny, hodiny, minuty) |
| `label` | Ne | Text stitku pred odpocitavanim |

## Hooky

### Filtr textu tlacitka

```php
/**
 * Filtruje tekst przycisku przedsprzedaży.
 *
 * @param string      $text    Tekst przycisku
 * @param \WC_Product $product Obiekt produktu
 */
apply_filters('polski_pro/preorder/button_text', string $text, \WC_Product $product): string;
```

**Priklad - dynamicky text s cenou:**

```php
add_filter('polski_pro/preorder/button_text', function (string $text, \WC_Product $product): string {
    return sprintf('Zamów za %s - premiera wkrótce', $product->get_price_html());
}, 10, 2);
```

### Filtr textu dostupnosti

```php
/**
 * Filtruje tekst dostępności przedsprzedaży.
 *
 * @param string      $text         Tekst dostępności
 * @param string      $release_date Data premiery (Y-m-d)
 * @param \WC_Product $product      Obiekt produktu
 */
apply_filters('polski_pro/preorder/availability_text', string $text, string $release_date, \WC_Product $product): string;
```

## Kompatibilita s variantami

Modul predprodeje funguje s variantnimi produkty. Kazdy variant muze mit nezavisle nastaveni pre-order:

- Varianta A - standardni (dostupna ihned)
- Varianta B - pre-order (premiera za 2 tydny)

Michani variant pre-order a standardnich v ramci jednoho produktu je povoleno - validace kosiku se tyka pouze michani ruznych produktu.

## Reseni problemu

**Produkt se automaticky neprepina po datu premiery**
Zkontrolujte, ze WP-Cron funguje spravne. Pokud pouzivate externi CRON, ujistete se, ze `wp-cron.php` je volany pravidelne. Alternativne spustte rucne: `wp cron event run polski_pro_preorder_check`.

**Zakaznik pridal produkty pre-order a bezne do kosiku**
Zkontrolujte, ze moznost "Blokovat michani kosiku" je zapnuta. Vycistete cache, pokud pouzivate cache pluginy cachovaci fragmenty kosiku.

**Datum premiery se zobrazuje ve spatnem formatu**
Zkontrolujte nastaveni "Format data" v konfiguraci modulu. Format vyuziva standardni placeholdery PHP `date()`.

## Dalsi kroky

- Hlaste problemy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Souvisejici moduly: [Balicky a doplnky](/pro/bundles-addons)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
