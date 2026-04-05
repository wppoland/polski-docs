---
title: Katalogovy rezim B2B
description: Modul katalogoveho rezimu Polski PRO for WooCommerce - skryvani cen, blokace nakupu, presmerovani na poptavky a integrace s modulem RFQ.
---

Katalogovy rezim premenuje obchod WooCommerce na katalog produktu bez moznosti nakupu. Ceny mohou byt skryty, tlacitka "Pridat do kosiku" nahrazena zpravami nebo presmerovana na formular poptavky. Modul je urcen predevsim pro B2B obchody, kde jsou ceny vyjednavany individualne, a pro obchody, ktere chteji prezentovat nabidku bez umozneni primych nakupu.

:::note[Pozadavky]
Polski PRO vyzaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Konfigurace

Prejdete do **WooCommerce > Nastaveni > Polski PRO > Katalogovy rezim** a zapnete modul (moznost `polski_catalog`).

### Hlavni nastaveni

| Nastaveni | Moznost v databazi | Vychozi hodnota | Popis |
|-----------|-------------------|-----------------|-------|
| Zapnout katalogovy rezim | `polski_catalog` | Ne | Aktivuje katalogovy rezim |
| Skryt ceny | `polski_catalog_hide_prices` | Ano | Odstrani zobrazeni cen |
| Skryt tlacitko kosiku | `polski_catalog_hide_cart` | Ano | Odstrani tlacitko "Pridat do kosiku" |
| Nahradni text ceny | `polski_catalog_price_text` | "Zapytaj o cenę" | Text zobrazeny namisto ceny |
| Zprava na produktu | `polski_catalog_notice` | "" | Zprava zobrazena na strance produktu |
| Presmerovat na RFQ | `polski_catalog_redirect_rfq` | Ne | Presmerovani na formular poptavky |
| Podmineny rezim | `polski_catalog_conditional` | `all` | `all`, `guests`, `roles` |

### Podmineny rezim

Katalogovy rezim muze byt aktivni:

- **Pro vsechny** (`all`) - kazdy vidi katalog bez cen
- **Pouze pro neprihlasene** (`guests`) - prihlaseni zakaznici vidi ceny a mohou nakupovat
- **Pro vybrane role** (`roles`) - katalog aktivni pouze pro vybrane role WordPressu

Podmineny rezim "Pouze pro neprihlasene" je popularni v B2B modelech, kde velkoobchod vyzaduje registraci uctu pred odhalenem cen.

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

## Mechanismus fungovani

### Skryvani cen

Modul se pripojuje k filtru `woocommerce_get_price_html` a nahrazuje HTML ceny nastavenym nahradnim textem.

```php
/**
 * Filtruje tekst zastępczy ceny w trybie katalogowym.
 *
 * @param string      $replacement Tekst zastępczy
 * @param \WC_Product $product     Obiekt produktu
 */
apply_filters('polski_pro/catalog/price_replacement', string $replacement, \WC_Product $product): string;
```

**Priklad - ruzne texty pro kategorie:**

```php
add_filter('polski_pro/catalog/price_replacement', function (string $replacement, \WC_Product $product): string {
    if (has_term('premium', 'product_cat', $product->get_id())) {
        return '<span class="price-inquiry">Cena ustalana indywidualnie</span>';
    }
    return $replacement;
}, 10, 2);
```

### Blokace nakupu

Modul vyuziva filtr `woocommerce_is_purchasable` pro blokovani moznosti nakupu:

```php
/**
 * Filtruje, czy produkt jest dostępny do zakupu w trybie katalogowym.
 *
 * @param bool        $purchasable Czy produkt jest dostępny do zakupu
 * @param \WC_Product $product     Obiekt produktu
 */
apply_filters('polski_pro/catalog/is_purchasable', bool $purchasable, \WC_Product $product): bool;
```

**Priklad - povoleni nakupu vybranych produktu:**

```php
add_filter('polski_pro/catalog/is_purchasable', function (bool $purchasable, \WC_Product $product): bool {
    $always_purchasable = [101, 102, 103]; // ID produktů vždy dostupných
    if (in_array($product->get_id(), $always_purchasable, true)) {
        return true;
    }
    return $purchasable;
}, 10, 2);
```

### Zprava na strance produktu

Kdyz je moznost `polski_catalog_notice` nastavena, na strance jednotliveho produktu se zobrazuje zprava (notice) informujici zakaznika o katalogovem rezimu.

Priklad zpravy:

> Pro zjisteni ceny tohoto produktu kontaktujte nas obchodni tym nebo vyplnte formular poptavky.

## Integrace s modulem poptavek

Kdyz je moznost `polski_catalog_redirect_rfq` zapnuta, nahradni tlacitko na strance produktu smeruje na formular poptavky ([modul RFQ](/pro/quotes)). Integrace zahrnuje:

1. Tlacitko "Zeptejte se na cenu" namisto "Pridat do kosiku"
2. Automaticke predani ID produktu do formulare RFQ
3. Pre-fill nazvu produktu ve formulari
4. Navrat k produktu po odeslani poptavky

Aby integrace fungovala, oba moduly - katalogovy a RFQ - musi byt aktivni.

## Skryvani elementu

Krome cen a tlacitka kosiku modul automaticky skryva:

| Element | Hook WooCommerce | Efekt |
|---------|-----------------|-------|
| Tlacitko "Pridat do kosiku" | `woocommerce_is_purchasable` | Produkt oznacen jako nedostupny k nakupu |
| Cena | `woocommerce_get_price_html` | HTML ceny nahrazeno textem |
| Ikona kosiku v hlavicce | `polski_pro/catalog/hide_cart_icon` | Skryje ikonu mini-kosiku |
| Stranka kosiku | `template_redirect` | Presmerovani z /cart/ na hlavni stranku |
| Stranka pokladny | `template_redirect` | Presmerovani z /checkout/ na hlavni stranku |

### Selektivni skryvani

Neni nutne skryvat vsechny elementy najednou. Kazdou moznost lze zapnout nebo vypnout nezavisle. Napriklad:

- Skryt ceny, ale nechat tlacitko kosiku (zakaznik nakupuje "za neznamou cenu" - kontakt po objednavce)
- Skryt tlacitko kosiku, ale ukazat ceny (zakaznik vidi ceny, ale musi pozadat o nakup)
- Skryt vse (uplny katalogovy rezim)

## Vylucovani produktu a kategorii

### Vylucovani produktu

Vybrane produkty mohou byt vylouceny z katalogoveho rezimu v uprave produktu, zalozka **Polski PRO > Katalogovy rezim**, zaskrtnutim moznosti "Vyloucit z katalogoveho rezimu".

### Vylucovani kategorii

```php
/**
 * Filtruje kategorie wykluczone z trybu katalogowego.
 *
 * @param array $excluded_categories Tablica ID kategorii
 */
apply_filters('polski_pro/catalog/excluded_categories', array $excluded_categories): array;
```

**Priklad:**

```php
add_filter('polski_pro/catalog/excluded_categories', function (array $excluded_categories): array {
    $excluded_categories[] = 15; // "Příslušenství" - vždy dostupné k nákupu
    $excluded_categories[] = 28; // "Outlet"
    return $excluded_categories;
});
```

## Pomocne CSS tridy

Modul pridava CSS tridy k `<body>` pro snazsi stylizaci:

| Trida | Kdy se pridava |
|-------|----------------|
| `polski-catalog-mode` | Katalogovy rezim je aktivni |
| `polski-catalog-prices-hidden` | Ceny jsou skryty |
| `polski-catalog-cart-hidden` | Tlacitko kosiku je skryto |

**Priklad CSS:**

```css
.polski-catalog-mode .price {
    display: none; /* Dodatečné skrytí ceny, pokud motiv nerespektuje filtr */
}

.polski-catalog-mode .single_add_to_cart_button {
    background-color: #0073aa;
    content: "Zapytaj o cenę";
}
```

## Reseni problemu

**Ceny se stale zobrazuji navzdory zapnutemu katalogovemu rezimu**
Nektere motivy pouzivaji nestandardni metody zobrazeni cen, obchazejici filtr `woocommerce_get_price_html`. Pouzijte CSS tridy `.polski-catalog-prices-hidden .price { display: none; }` jako zabezpeceni.

**Zakaznik muze pridat produkt do kosiku pres primy URL**
Modul to blokuje na urovni filtru `woocommerce_is_purchasable`. Pokud problem pretrvava, zkontrolujte, ze jiny plugin neprepise tento filtr s vyssi prioritou.

**Podmineny rezim nefunguje spravne s cache**
Cache pluginy mohou servovat cachovanu verzi nezavisle na stavu prihlaseni. Nakonfigurujte cache plugin, aby rozlisoval cache pro prihlasene a neprihlasene uzivatele.

## Dalsi kroky

- Hlaste problemy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Souvisejici moduly: [Poptavky](/pro/quotes)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
