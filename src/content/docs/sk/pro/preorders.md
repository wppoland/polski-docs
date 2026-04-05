---
title: Predpredaj (pre-orders)
description: Modul predpredaja Polski PRO for WooCommerce - označenie produktov ako pre-order, dátum premiéry, vlastný text tlačidla a validácia košíka.
---

Modul predpredaja umožňuje označovať produkty ako pre-order, zobrazovať dátum premiéry a meniť text tlačidla. Užitočný v obchodoch s elektronikou, knihami, hrami a inými produktmi ponúkanými pred premiérou.

:::note[Požiadavky]
Polski PRO vyžaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Globálna konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski PRO > Predpredaj**.

| Nastavenie | Predvolená hodnota | Popis |
|------------|------------------|------|
| Text tlačidla | "Zamów w przedsprzedaży" | Globálny text tlačidla pre produkty pre-order |
| Text dostupnosti | "Dostępne od {date}" | Šablóna textu zobrazovaného namiesto stavu skladu |
| Formát dátumu | `d.m.Y` | Formát zobrazenia dátumu premiéry |
| Blokovať miešanie košíka | Áno | Zakazuje pridávanie štandardných produktov do košíka s pre-order |
| Správa blokácie | "Produkty w przedsprzedaży muszą być zamawiane osobno." | Správa zobrazovaná pri pokuse o miešanie |

## Konfigurácia produktu

### Meta polia

Nastavenia predpredaja sa nachádzajú v úprave produktu, v záložke **Všeobecné** v paneli dát produktu.

| Meta pole | Kľúč | Typ | Popis |
|-----------|-------|-----|------|
| Zapnúť predpredaj | `_polski_preorder_enabled` | `bool` | Označí produkt ako pre-order |
| Dátum premiéry | `_polski_preorder_release_date` | `string` (Y-m-d) | Dátum, od ktorého je produkt dostupný štandardne |
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

Keď je produkt označený ako pre-order, text tlačidla "Pridať do košíka" sa zmení na nakonfigurovaný text predpredaja. Týka sa to:

- Stránky jednotlivého produktu
- Stránok archívu, kategórií a štítkov
- Výsledkov vyhľadávania
- Blokov WooCommerce (Product Grid, Product Collection)

### Text dostupnosti

Namiesto štandardného stavu skladu ("Skladom", "Nedostupné") sa zobrazuje text dostupnosti s dátumom premiéry. Placeholder `{date}` je nahradený naformátovaným dátumom.

**Príklad zobrazenia:**

> Dostępne od 15.06.2026

### Automatická deaktivácia

Po prekročení dátumu premiéry sa produkt automaticky vráti do štandardného režimu. Deaktivácia prebieha cez úlohu WP-Cron spúšťanú denne o 00:01.

```php
/**
 * Akcja wywoływana po automatycznej dezaktywacji przedsprzedaży.
 *
 * @param int    $product_id   ID produktu
 * @param string $release_date Data premiery (Y-m-d)
 */
do_action('polski_pro/preorder/deactivated', int $product_id, string $release_date);
```

**Príklad - notifikácia zákazníkov o dostupnosti:**

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

### Blokácia miešania produktov

Keď je voľba "Blokovať miešanie košíka" zapnutá, zákazník nemôže pridať do košíka súčasne:

- Produkty v predpredaji a štandardné produkty
- Produkty pre-order s rôznymi dátumami premiéry (voliteľne)

Pri pokuse o pridanie produktu iného typu sa zobrazí správa blokácie a produkt sa nepridá.

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

Zobrazenie odpočítavania do dátumu premiéry:

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

Modul predpredaja funguje s variantnými produktmi. Každý variant môže mať nezávislé nastavenia pre-order:

- Variant A - štandardný (dostupný ihneď)
- Variant B - pre-order (premiéra o 2 týždne)

Miešanie variantov pre-order a štandardných v rámci jedného produktu je povolené - validácia košíka sa týka iba miešania rôznych produktov.

## Riešenie problémov

**Produkt sa automaticky neprepína po dátume premiéry**
Skontrolujte, či WP-Cron funguje správne. Ak používate externý CRON, uistite sa, že `wp-cron.php` je volaný pravidelne. Alternatívne spustite manuálne: `wp cron event run polski_pro_preorder_check`.

**Zákazník pridal produkty pre-order a bežné do košíka**
Skontrolujte, či je voľba "Blokovať miešanie košíka" zapnutá. Vymažte cache, ak používate pluginy kešujúce fragmenty košíka.

**Dátum premiéry sa zobrazuje v zlom formáte**
Skontrolujte nastavenie "Formát dátumu" v konfigurácii modulu. Formát používa štandardné placeholdery PHP `date()`.

## Ďalšie kroky

- Hlásenie problémov: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Súvisiace moduly: [Balíky a doplnky](/pro/bundles-addons)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
