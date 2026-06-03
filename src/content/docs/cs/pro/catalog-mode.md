---
title: Katalogový režim B2B
description: Modul katalogového režimu Polski PRO for WooCommerce - skrývání cen, blokace nákupů, přesměrování na poptávky a integrace s modulem RFQ.
---

Katalogový režim mění obchod v katalog bez možnosti nákupu. Skryjte ceny, změňte tlačítka na zprávy nebo přesměrujte na poptávku. Určeno pro B2B obchody s individuálními cenami.

:::note[Požadavky]
Polski PRO vyžaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Konfigurace

Přejděte na **WooCommerce > Nastavení > Polski PRO > Katalogový režim** a zapněte modul (možnost `polski_catalog`).

### Hlavní nastavení

| Nastavení | Možnost v databázi | Výchozí hodnota | Popis |
|------------|---------------|------------------|------|
| Zapnout katalogový režim | `polski_catalog` | Ne | Aktivuje katalogový režim |
| Skrýt ceny | `polski_catalog_hide_prices` | Ano | Odstraní zobrazení cen |
| Skrýt tlačítko košíku | `polski_catalog_hide_cart` | Ano | Odstraní tlačítko "Přidat do košíku" |
| Náhradní text ceny | `polski_catalog_price_text` | "Zeptat se na cenu" | Text zobrazený místo ceny |
| Zpráva na produktu | `polski_catalog_notice` | "" | Zpráva zobrazená na stránce produktu |
| Přesměrovat na RFQ | `polski_catalog_redirect_rfq` | Ne | Přesměrování na formulář poptávky |
| Podmíněný režim | `polski_catalog_conditional` | `all` | `all`, `guests`, `roles` |

### Podmíněný režim

Katalogový režim může být aktivní:

- **Pro všechny** (`all`) - každý vidí katalog bez cen
- **Pouze pro nepřihlášené** (`guests`) - přihlášení zákazníci vidí ceny a mohou nakupovat
- **Pro vybrané role** (`roles`) - katalog aktivní pouze pro vybrané role WordPress

Režim "Pouze pro nepřihlášené" je v B2B oblíbený - velkoobchod vyžaduje registraci před odhalením cen.

```php
// Příklad: vlastní podmíněná logika
add_filter('polski_pro/catalog/is_active', function (bool $is_active): bool {
    // Vypnout katalogový režim pro zákazníky s alespoň 5 objednávkami
    if (is_user_logged_in()) {
        $order_count = wc_get_customer_order_count(get_current_user_id());
        if ($order_count >= 5) {
            return false;
        }
    }
    return $is_active;
});
```

## Mechanismus fungování

### Skrývání cen

Modul používá filtr `woocommerce_get_price_html` a nahrazuje cenu nakonfigurovaným textem.

```php
/**
 * Filtruje náhradní text ceny v katalogovém režimu.
 *
 * @param string      $replacement Náhradní text
 * @param \WC_Product $product     Objekt produktu
 */
apply_filters('polski_pro/catalog/price_replacement', string $replacement, \WC_Product $product): string;
```

**Příklad - různé texty pro kategorie:**

```php
add_filter('polski_pro/catalog/price_replacement', function (string $replacement, \WC_Product $product): string {
    if (has_term('premium', 'product_cat', $product->get_id())) {
        return '<span class="price-inquiry">Cena stanovena individuálně</span>';
    }
    return $replacement;
}, 10, 2);
```

### Blokace nákupů

Modul blokuje nákup filtrem `woocommerce_is_purchasable`:

```php
/**
 * Filtruje, zda je produkt dostupný k nákupu v katalogovém režimu.
 *
 * @param bool        $purchasable Zda je produkt dostupný k nákupu
 * @param \WC_Product $product     Objekt produktu
 */
apply_filters('polski_pro/catalog/is_purchasable', bool $purchasable, \WC_Product $product): bool;
```

**Příklad - povolení nákupu vybraných produktů:**

```php
add_filter('polski_pro/catalog/is_purchasable', function (bool $purchasable, \WC_Product $product): bool {
    $always_purchasable = [101, 102, 103]; // ID vždy dostupných produktů
    if (in_array($product->get_id(), $always_purchasable, true)) {
        return true;
    }
    return $purchasable;
}, 10, 2);
```

### Zpráva na stránce produktu

Když je `polski_catalog_notice` nastaven, na stránce produktu se zobrazí zpráva o katalogovém režimu.

Příklad zprávy:

> Chcete-li zjistit cenu tohoto produktu, kontaktujte náš obchodní tým nebo vyplňte formulář poptávky.

## Integrace s modulem poptávek

Když je `polski_catalog_redirect_rfq` zapnuto, tlačítko směřuje na formulář poptávky ([modul RFQ](/pro/quotes)):

1. Tlačítko "Zeptat se na cenu" místo "Přidat do košíku"
2. Automatické předání ID produktu do RFQ formuláře
3. Předvyplnění názvu produktu ve formuláři
4. Návrat k produktu po odeslání poptávky

Aby integrace fungovala, oba moduly - katalogový a RFQ - musí být aktivní.

## Skrývání prvků

Modul automaticky skrývá:

| Prvek | Hook WooCommerce | Efekt |
|---------|-----------------|-------|
| Tlačítko "Přidat do košíku" | `woocommerce_is_purchasable` | Produkt označen jako nedostupný k nákupu |
| Cena | `woocommerce_get_price_html` | HTML ceny nahrazeno textem |
| Ikona košíku v hlavičce | `polski_pro/catalog/hide_cart_icon` | Skrývá ikonu mini-košíku |
| Stránka košíku | `template_redirect` | Přesměrování z /cart/ na domovskou stránku |
| Stránka pokladny | `template_redirect` | Přesměrování z /checkout/ na domovskou stránku |

### Selektivní skrývání

Každou možnost zapněte nebo vypněte nezávisle. Například:

- Skryjte ceny, ale ponechte tlačítko košíku (zákazník nakupuje "za neznámou cenu" - kontakt po objednávce)
- Skryjte tlačítko košíku, ale zobrazte ceny (zákazník vidí ceny, ale musí se zeptat na nákup)
- Skryjte vše (plný katalogový režim)

## Vylučování produktů a kategorií

### Vylučování produktů

Vylučte produkt z katalogového režimu: editace produktu > **Polski PRO > Katalogový režim** > zaškrtněte "Vyloučit z katalogového režimu".

### Vylučování kategorií

```php
/**
 * Filtruje kategorie vyloučené z katalogového režimu.
 *
 * @param array $excluded_categories Pole ID kategorií
 */
apply_filters('polski_pro/catalog/excluded_categories', array $excluded_categories): array;
```

**Příklad:**

```php
add_filter('polski_pro/catalog/excluded_categories', function (array $excluded_categories): array {
    $excluded_categories[] = 15; // "Příslušenství" - vždy dostupné k nákupu
    $excluded_categories[] = 28; // "Outlet"
    return $excluded_categories;
});
```

## Pomocné CSS třídy

Modul přidává CSS třídy do `<body>` usnadňující stylování:

| Třída | Kdy se přidává |
|-------|----------------|
| `polski-catalog-mode` | Katalogový režim je aktivní |
| `polski-catalog-prices-hidden` | Ceny jsou skryté |
| `polski-catalog-cart-hidden` | Tlačítko košíku je skryté |

**Příklad CSS:**

```css
.polski-catalog-mode .price {
    display: none; /* Dodatečné skrytí ceny, pokud šablona nerespektuje filtr */
}

.polski-catalog-mode .single_add_to_cart_button {
    background-color: #0073aa;
    content: "Zeptat se na cenu";
}
```

## Řešení problémů

**Ceny se stále zobrazují i přes zapnutí katalogového režimu**
Některé šablony používají vlastní metody zobrazení cen a obcházejí filtr `woocommerce_get_price_html`. Použijte CSS třídy `.polski-catalog-prices-hidden .price { display: none; }` jako pojistku.

**Zákazník může přidat produkt do košíku přes přímou URL**
Modul to blokuje na úrovni filtru `woocommerce_is_purchasable`. Pokud se problém vyskytuje, zkontrolujte, zda jiný plugin nepřepisuje tento filtr s vyšší prioritou.

**Podmíněný režim nefunguje správně s cache**
Cachovací pluginy mohou servírovat cachovanou verzi nezávisle na stavu přihlášení. Nakonfigurujte cache plugin tak, aby rozdělil cache pro přihlášené a nepřihlášené uživatele.

## Další kroky

- Nahlašte problémy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Související moduly: [Poptávky](/pro/quotes)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
