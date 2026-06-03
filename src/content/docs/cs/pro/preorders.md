---
title: Předprodej (pre-orders)
description: Modul předprodeje Polski PRO for WooCommerce - označování produktů jako pre-order, datum vydání, vlastní text tlačítka a validace košíku.
---

Modul předprodeje umožňuje označovat produkty jako pre-order, zobrazovat datum vydání a měnit text tlačítka. Hodí se v obchodech s elektronikou, knihami, hrami a dalšími produkty nabízenými před vydáním.

:::note[Požadavky]
Polski PRO vyžaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Globální konfigurace

Přejděte do **WooCommerce > Nastavení > Polski PRO > Předprodej**.

| Nastavení | Výchozí hodnota | Popis |
|------------|------------------|------|
| Text tlačítka | "Objednat v předprodeji" | Globální text tlačítka pro pre-order produkty |
| Text dostupnosti | "Dostupné od {date}" | Šablona textu zobrazovaného místo skladového stavu |
| Formát data | `d.m.Y` | Formát zobrazení data vydání |
| Blokovat míchání košíku | Ano | Zakazuje přidávání standardních produktů do košíku s pre-order |
| Zpráva o blokaci | "Produkty v předprodeji musí být objednávány samostatně." | Zpráva zobrazená při pokusu o míchání |

## Konfigurace produktu

### Meta pole

Nastavení najdete v editaci produktu, záložka **Obecné**.

| Meta pole | Klíč | Typ | Popis |
|-----------|-------|-----|------|
| Zapnout předprodej | `_polski_preorder_enabled` | `bool` | Označí produkt jako pre-order |
| Datum vydání | `_polski_preorder_release_date` | `string` (Y-m-d) | Datum, od kterého je produkt dostupný standardně |
| Text tlačítka | `_polski_preorder_button_text` | `string` | Přepisuje globální text tlačítka pro tento produkt |
| Text dostupnosti | `_polski_preorder_availability_text` | `string` | Přepisuje globální text dostupnosti |

### Nastavení přes WP-CLI

```bash
wp post meta update 123 _polski_preorder_enabled "yes"
wp post meta update 123 _polski_preorder_release_date "2026-06-15"
wp post meta update 123 _polski_preorder_button_text "Objednat nyní - vydání 15. června"
```

### Programové nastavení

```php
update_post_meta($product_id, '_polski_preorder_enabled', 'yes');
update_post_meta($product_id, '_polski_preorder_release_date', '2026-06-15');
```

## Zobrazení na frontendu

### Tlačítko nákupu

Tlačítko "Přidat do košíku" se změní na text předprodeje. Týká se:

- Stránky jednotlivého produktu
- Stránek archivu, kategorií a štítků
- Výsledků vyhledávání
- Bloků WooCommerce (Product Grid, Product Collection)

### Text dostupnosti

Místo skladového stavu se zobrazuje text s datem vydání. Placeholder `{date}` se nahradí datem.

**Příklad zobrazení:**

> Dostupné od 15.06.2026

### Automatická deaktivace

Po datu vydání se produkt automaticky vrátí do standardního režimu. WP-Cron to kontroluje denně v 00:01.

```php
/**
 * Akce volaná po automatické deaktivaci předprodeje.
 *
 * @param int    $product_id   ID produktu
 * @param string $release_date Datum vydání (Y-m-d)
 */
do_action('polski_pro/preorder/deactivated', int $product_id, string $release_date);
```

**Příklad - oznámení zákazníkům o dostupnosti:**

```php
add_action('polski_pro/preorder/deactivated', function (int $product_id, string $release_date): void {
    $subscribers = get_post_meta($product_id, '_polski_preorder_subscribers', true);
    if (is_array($subscribers)) {
        foreach ($subscribers as $email) {
            wp_mail(
                $email,
                'Produkt je již dostupný!',
                sprintf('Produkt %s je nyní dostupný k nákupu.', get_the_title($product_id))
            );
        }
    }
}, 10, 2);
```

## Validace košíku

### Blokace míchání produktů

Když je "Blokovat míchání košíku" zapnuto, zákazník nemůže přidat současně:

- Produkty v předprodeji a standardní produkty
- Pre-order produkty s různými daty vydání (volitelně)

Při pokusu o míchání se zobrazí zpráva o blokaci.

### Hook validace

```php
/**
 * Filtruje, zda košík může obsahovat smíšené typy produktů.
 *
 * @param bool $allow       Zda povolit míchání (výchozí false)
 * @param int  $product_id  ID přidávaného produktu
 * @param array $cart_items  Aktuální produkty v košíku
 */
apply_filters('polski_pro/preorder/allow_mixed_cart', bool $allow, int $product_id, array $cart_items): bool;
```

**Příklad - povolení míchání pro VIP:**

```php
add_filter('polski_pro/preorder/allow_mixed_cart', function (bool $allow, int $product_id, array $cart_items): bool {
    if (current_user_can('manage_woocommerce')) {
        return true;
    }
    return $allow;
}, 10, 3);
```

## Shortcode

Zobrazení odpočtu do data vydání:

```
[polski_preorder_countdown product_id="123" format="days" label="Do vydání zbývá:"]
```

| Parametr | Povinný | Popis |
|----------|----------|------|
| `product_id` | Ne | ID produktu (výchozí aktuální) |
| `format` | Ne | Formát: `days`, `full` (dny, hodiny, minuty) |
| `label` | Ne | Text štítku před odpočtem |

## Hooky

### Filtr textu tlačítka

```php
/**
 * Filtruje text tlačítka předprodeje.
 *
 * @param string      $text    Text tlačítka
 * @param \WC_Product $product Objekt produktu
 */
apply_filters('polski_pro/preorder/button_text', string $text, \WC_Product $product): string;
```

**Příklad - dynamický text s cenou:**

```php
add_filter('polski_pro/preorder/button_text', function (string $text, \WC_Product $product): string {
    return sprintf('Objednat za %s - vydání brzy', $product->get_price_html());
}, 10, 2);
```

### Filtr textu dostupnosti

```php
/**
 * Filtruje text dostupnosti předprodeje.
 *
 * @param string      $text         Text dostupnosti
 * @param string      $release_date Datum vydání (Y-m-d)
 * @param \WC_Product $product      Objekt produktu
 */
apply_filters('polski_pro/preorder/availability_text', string $text, string $release_date, \WC_Product $product): string;
```

## Kompatibilita s variantami

Modul funguje s variantními produkty. Každá varianta má nezávislé nastavení pre-order:

- Varianta A - standardní (dostupná ihned)
- Varianta B - pre-order (vydání za 2 týdny)

Míchání pre-order a standardních variant v jednom produktu je povoleno. Blokace se týká pouze míchání různých produktů.

## Řešení problémů

**Produkt se po datu vydání automaticky nepřepíná**
Zkontrolujte, zda WP-Cron funguje správně. Pokud používáte externí CRON, ujistěte se, že je `wp-cron.php` voláno pravidelně. Alternativně spusťte ručně: `wp cron event run polski_pro_preorder_check`.

**Zákazník přidal pre-order a běžné produkty do košíku**
Zkontrolujte, zda je volba "Blokovat míchání košíku" zapnuta. Vymažte cache, pokud používáte pluginy cachující fragmenty košíku.

**Datum vydání se zobrazuje ve špatném formátu**
Zkontrolujte nastavení "Formát data" v konfiguraci modulu. Formát používá standardní placeholdery PHP `date()`.

## Další kroky

- Hlaste problémy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Související moduly: [Balíčky a doplňky](/pro/bundles-addons)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
