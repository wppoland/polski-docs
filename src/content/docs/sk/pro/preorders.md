---
title: Predpredaj (pre-orders)
description: Modul predpredaja Polski PRO for WooCommerce - označovanie produktov ako pre-order, dátum uvedenia, vlastný text tlačidla a validácia košíka.
---

Modul predpredaja umožňuje označovať produkty ako pre-order, zobrazovať dátum uvedenia a meniť text tlačidla. Užitočný v obchodoch s elektronikou, knihami, hrami a inými produktmi ponúkanými pred uvedením.

:::note[Požiadavky]
Polski PRO vyžaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Globálna konfigurácia

Prejdite na **WooCommerce > Nastavenia > Polski PRO > Predpredaj**.

| Nastavenie | Predvolená hodnota | Popis |
|------------|------------------|------|
| Text tlačidla | "Objednať v predpredaji" | Globálny text tlačidla pre pre-order produkty |
| Text dostupnosti | "Dostupné od {date}" | Šablóna textu zobrazovaného namiesto stavu skladu |
| Formát dátumu | `d.m.Y` | Formát zobrazenia dátumu uvedenia |
| Blokovať miešanie košíka | Áno | Zakazuje pridávanie štandardných produktov do košíka s pre-order |
| Správa blokovania | "Produkty v predpredaji musia byť objednané samostatne." | Správa zobrazená pri pokuse o miešanie |

## Konfigurácia produktu

### Meta polia

Nastavenia nájdete pri úprave produktu, záložka **Všeobecné**.

| Meta pole | Kľúč | Typ | Popis |
|-----------|-------|-----|------|
| Zapnúť predpredaj | `_polski_preorder_enabled` | `bool` | Označuje produkt ako pre-order |
| Dátum uvedenia | `_polski_preorder_release_date` | `string` (Y-m-d) | Dátum, od ktorého je produkt dostupný štandardne |
| Text tlačidla | `_polski_preorder_button_text` | `string` | Prepíše globálny text tlačidla pre tento produkt |
| Text dostupnosti | `_polski_preorder_availability_text` | `string` | Prepíše globálny text dostupnosti |

### Nastavenie cez WP-CLI

```bash
wp post meta update 123 _polski_preorder_enabled "yes"
wp post meta update 123 _polski_preorder_release_date "2026-06-15"
wp post meta update 123 _polski_preorder_button_text "Zamów teraz - premiera 15 czerwca"
```

### Programové nastavenie

```php
update_post_meta($product_id, '_polski_preorder_enabled', 'yes');
update_post_meta($product_id, '_polski_preorder_release_date', '2026-06-15');
```

## Zobrazenie na frontende

### Tlačidlo nákupu

Tlačidlo "Pridať do košíka" sa zmení na text predpredaja. Týka sa:

- Stránky jednotlivého produktu
- Stránok archívu, kategórií a tagov
- Výsledkov vyhľadávania
- Blokov WooCommerce (Product Grid, Product Collection)

### Text dostupnosti

Namiesto stavu skladu sa zobrazuje text s dátumom uvedenia. Placeholder `{date}` sa nahradí dátumom.

**Príklad zobrazenia:**

> Dostupné od 15.06.2026

### Automatická deaktivácia

Po dátume uvedenia sa produkt automaticky vráti do štandardného režimu. WP-Cron to kontroluje denne o 00:01.

```php
/**
 * Akcja wywoływana po automatycznej dezaktywacji przedsprzedaży.
 *
 * @param int    $product_id   ID produktu
 * @param string $release_date Data premiery (Y-m-d)
 */
do_action('polski_pro/preorder/deactivated', int $product_id, string $release_date);
```

**Príklad - upozornenie zákazníkov na dostupnosť:**

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

## Validácia košíka

### Blokovanie miešania produktov

Keď je "Blokovať miešanie košíka" zapnuté, zákazník nemôže pridať súčasne:

- Produkty v predpredaji a štandardné produkty
- Pre-order produkty s rôznymi dátumami uvedenia (voliteľne)

Pri pokuse o miešanie sa zobrazí správa blokovania.

### Hook validácie

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

**Príklad - povolenie miešania pre VIP:**

```php
add_filter('polski_pro/preorder/allow_mixed_cart', function (bool $allow, int $product_id, array $cart_items): bool {
    if (current_user_can('manage_woocommerce')) {
        return true;
    }
    return $allow;
}, 10, 3);
```

## Shortcode

Zobrazenie odpočítavania do dátumu uvedenia:

```
[polski_preorder_countdown product_id="123" format="days" label="Do premiery pozostało:"]
```

| Parameter | Povinný | Popis |
|----------|----------|------|
| `product_id` | Nie | ID produktu (predvolene aktuálny) |
| `format` | Nie | Formát: `days`, `full` (dni, hodiny, minúty) |
| `label` | Nie | Text štítku pred odpočítavaním |

## Hooky

### Filter textu tlačidla

```php
/**
 * Filtruje tekst przycisku przedsprzedaży.
 *
 * @param string      $text    Tekst przycisku
 * @param \WC_Product $product Obiekt produktu
 */
apply_filters('polski_pro/preorder/button_text', string $text, \WC_Product $product): string;
```

**Príklad - dynamický text s cenou:**

```php
add_filter('polski_pro/preorder/button_text', function (string $text, \WC_Product $product): string {
    return sprintf('Zamów za %s - premiera wkrótce', $product->get_price_html());
}, 10, 2);
```

### Filter textu dostupnosti

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

## Kompatibilita s variantmi

Modul funguje s variantnými produktmi. Každý variant má nezávislé nastavenia pre-order:

- Variant A - štandardný (dostupný hneď)
- Variant B - pre-order (uvedenie o 2 týždne)

Miešanie pre-order a štandardných variantov v jednom produkte je povolené. Blokovanie sa týka iba miešania rôznych produktov.

## Riešenie problémov

**Produkt sa neprepína automaticky po dátume uvedenia**
Skontrolujte, či WP-Cron funguje správne. Ak používate externý CRON, uistite sa, že `wp-cron.php` sa volá pravidelne. Alternatívne spustite ručne: `wp cron event run polski_pro_preorder_check`.

**Zákazník pridal pre-order a bežné produkty do košíka**
Skontrolujte, či je možnosť "Blokovať miešanie košíka" zapnutá. Vyčistite cache, ak používate pluginy cacheujúce fragmenty košíka.

**Dátum uvedenia sa zobrazuje v zlom formáte**
Skontrolujte nastavenie "Formát dátumu" v konfigurácii modulu. Formát používa štandardné PHP placeholdery `date()`.

## Ďalšie kroky

- Nahlasujte problémy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Súvisiace moduly: [Balíčky a doplnky](/pro/bundles-addons)

<div class="disclaimer">Táto stránka má výlučne informačný charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
