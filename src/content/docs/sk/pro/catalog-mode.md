---
title: B2B katalógový režim
description: Modul katalógového režimu Polski PRO for WooCommerce - skrývanie cien, blokovanie nákupov, presmerovanie na cenové ponuky a integrácia s modulom RFQ.
---

Katalógový režim zmení obchod na katalóg bez možnosti nákupu. Skryte ceny, zameňte tlačidlá za správy alebo presmerujte na cenovú ponuku. Určený pre B2B obchody s individuálnymi cenami.

:::note[Požiadavky]
Polski PRO vyžaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski PRO > Katalógový režim** a zapnite modul (možnosť `polski_catalog`).

### Hlavné nastavenia

| Nastavenie | Možnosť v databáze | Predvolená hodnota | Popis |
|------------|---------------|------------------|------|
| Zapnúť katalógový režim | `polski_catalog` | Nie | Aktivuje katalógový režim |
| Skryť ceny | `polski_catalog_hide_prices` | Áno | Odstráni zobrazovanie cien |
| Skryť tlačidlo košíka | `polski_catalog_hide_cart` | Áno | Odstráni tlačidlo "Pridať do košíka" |
| Náhradný text ceny | `polski_catalog_price_text` | "Opýtať sa na cenu" | Text zobrazený namiesto ceny |
| Správa na produkte | `polski_catalog_notice` | "" | Správa zobrazená na stránke produktu |
| Presmerovať na RFQ | `polski_catalog_redirect_rfq` | Nie | Presmerovanie na formulár cenovej ponuky |
| Podmienený režim | `polski_catalog_conditional` | `all` | `all`, `guests`, `roles` |

### Podmienený režim

Katalógový režim môže byť aktívny:

- **Pre všetkých** (`all`) - každý vidí katalóg bez cien
- **Len pre neprihlásených** (`guests`) - prihlásení zákazníci vidia ceny a môžu nakupovať
- **Pre vybrané roly** (`roles`) - katalóg aktívny len pre vybrané roly WordPress

Režim "Len pre neprihlásených" je populárny v B2B - veľkoobchod vyžaduje registráciu pred odhalením cien.

```php
// Przykład: własna logika warunkowa
add_filter('polski_pro/catalog/is_active', function (bool $is_active): bool {
    // Wyłącz tryb katalogowy dla klientów z co najmniej 5 zamówieniami
    if (is_user_logged_in()) {
        $order_count = wc_get_customer_order_count(get_current_user_id());
        if ($order_count >= 5) {
            return false;
        }
    }
    return $is_active;
});
```

## Mechanizmus fungovania

### Skrývanie cien

Modul používa filter `woocommerce_get_price_html` a nahradí cenu nakonfigurovaným textom.

```php
/**
 * Filtruje náhradný text ceny v katalógovom režime.
 *
 * @param string      $replacement Náhradný text
 * @param \WC_Product $product     Objekt produktu
 */
apply_filters('polski_pro/catalog/price_replacement', string $replacement, \WC_Product $product): string;
```

**Príklad - rôzne texty pre kategórie:**

```php
add_filter('polski_pro/catalog/price_replacement', function (string $replacement, \WC_Product $product): string {
    if (has_term('premium', 'product_cat', $product->get_id())) {
        return '<span class="price-inquiry">Cena ustalana indywidualnie</span>';
    }
    return $replacement;
}, 10, 2);
```

### Blokovanie nákupov

Modul blokuje nákup filtrom `woocommerce_is_purchasable`:

```php
/**
 * Filtruje, či je produkt dostupný na nákup v katalógovom režime.
 *
 * @param bool        $purchasable Či je produkt dostupný na nákup
 * @param \WC_Product $product     Objekt produktu
 */
apply_filters('polski_pro/catalog/is_purchasable', bool $purchasable, \WC_Product $product): bool;
```

**Príklad - povolenie nákupu vybraných produktov:**

```php
add_filter('polski_pro/catalog/is_purchasable', function (bool $purchasable, \WC_Product $product): bool {
    $always_purchasable = [101, 102, 103]; // ID produktów zawsze dostępnych
    if (in_array($product->get_id(), $always_purchasable, true)) {
        return true;
    }
    return $purchasable;
}, 10, 2);
```

### Správa na stránke produktu

Keď je `polski_catalog_notice` nastavené, na stránke produktu sa zobrazí správa o katalógovom režime.

Príklad správy:

> Ak chcete poznať cenu tohto produktu, kontaktujte náš obchodný tím alebo vyplňte formulár cenovej ponuky.

## Integrácia s modulom cenových ponúk

Keď je `polski_catalog_redirect_rfq` zapnuté, tlačidlo smeruje na formulár cenovej ponuky ([modul RFQ](/pro/quotes)):

1. Tlačidlo "Opýtať sa na cenu" namiesto "Pridať do košíka"
2. Automatické odovzdanie ID produktu do formulára RFQ
3. Pre-fill názvu produktu vo formulári
4. Návrat na produkt po odoslaní ponuky

Aby integrácia fungovala, oba moduly - katalógový a RFQ - musia byť aktívne.

## Skrývanie prvkov

Modul automaticky skrýva:

| Prvok | Hook WooCommerce | Efekt |
|---------|-----------------|-------|
| Tlačidlo "Pridať do košíka" | `woocommerce_is_purchasable` | Produkt označený ako nedostupný na nákup |
| Cena | `woocommerce_get_price_html` | HTML ceny nahradené textom |
| Ikona košíka v hlavičke | `polski_pro/catalog/hide_cart_icon` | Skryje ikonu mini-košíka |
| Stránka košíka | `template_redirect` | Presmerovanie z /cart/ na domovskú stránku |
| Stránka pokladne | `template_redirect` | Presmerovanie z /checkout/ na domovskú stránku |

### Selektívne skrývanie

Každú možnosť zapnite alebo vypnite nezávisle. Napríklad:

- Skry ceny, ale ponechaj tlačidlo košíka (zákazník kupuje "za neznámu cenu" - kontakt po objednávke)
- Skry tlačidlo košíka, ale zobraz ceny (zákazník vidí ceny, ale musí sa opýtať na nákup)
- Skry všetko (plný katalógový režim)

## Vylúčenie produktov a kategórií

### Vylúčenie produktov

Vylúčte produkt z katalógového režimu: editácia produktu > **Polski PRO > Katalógový režim** > zaškrtnite "Vylúčiť z katalógového režimu".

### Vylúčenie kategórií

```php
/**
 * Filtruje kategórie vylúčené z katalógového režimu.
 *
 * @param array $excluded_categories Pole ID kategórií
 */
apply_filters('polski_pro/catalog/excluded_categories', array $excluded_categories): array;
```

**Príklad:**

```php
add_filter('polski_pro/catalog/excluded_categories', function (array $excluded_categories): array {
    $excluded_categories[] = 15; // "Akcesoria" - zawsze dostępne do zakupu
    $excluded_categories[] = 28; // "Outlet"
    return $excluded_categories;
});
```

## Pomocné CSS triedy

Modul pridáva CSS triedy do `<body>` uľahčujúce štýlovanie:

| Trieda | Kedy sa pridáva |
|-------|----------------|
| `polski-catalog-mode` | Katalógový režim je aktívny |
| `polski-catalog-prices-hidden` | Ceny sú skryté |
| `polski-catalog-cart-hidden` | Tlačidlo košíka je skryté |

**Príklad CSS:**

```css
.polski-catalog-mode .price {
    display: none; /* Dodatkowe ukrycie ceny, jeśli motyw nie respektuje filtra */
}

.polski-catalog-mode .single_add_to_cart_button {
    background-color: #0073aa;
    content: "Zapytaj o cenę";
}
```

## Riešenie problémov

**Ceny sa stále zobrazujú napriek zapnutiu katalógového režimu**
Niektoré šablóny používajú vlastné metódy zobrazovania cien a obchádzajú filter `woocommerce_get_price_html`. Použite CSS triedy `.polski-catalog-prices-hidden .price { display: none; }` ako poistku.

**Zákazník môže pridať produkt do košíka cez priamy URL**
Modul to blokuje na úrovni filtra `woocommerce_is_purchasable`. Ak sa problém vyskytuje, skontrolujte, či iný doplnok neprepisuje tento filter s vyššou prioritou.

**Podmienený režim nefunguje správne s cache**
Cache doplnky môžu servírovať verziu z cache nezávisle od stavu prihlásenia. Nakonfigurujte cache doplnok tak, aby oddeľoval cache pre prihlásených a neprihlásených používateľov.

## Ďalšie kroky

- Nahlasujte problémy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Súvisiace moduly: [Cenové ponuky](/pro/quotes)

<div class="disclaimer">Táto stránka má výlučne informačný charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
