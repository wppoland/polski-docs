---
title: B2B katalógový režim
description: Modul katalógového režimu Polski PRO for WooCommerce - skrytie cien, blokácia nákupov, presmerovanie na cenové dopyty a integrácia s modulom RFQ.
---

Katalógový režim premení obchod na katalóg bez možnosti nákupu. Skryte ceny, nahraďte tlačidlá správami alebo presmerujte na cenový dopyt. Určené pre B2B obchody s individuálnymi cenami.

:::note[Požiadavky]
Polski PRO vyžaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski PRO > Katalógový režim** a zapnite modul (voľba `polski_catalog`).

### Hlavné nastavenia

| Nastavenie | Voľba v databáze | Predvolená hodnota | Popis |
|------------|---------------|------------------|------|
| Zapnúť katalógový režim | `polski_catalog` | Nie | Aktivuje katalógový režim |
| Skryť ceny | `polski_catalog_hide_prices` | Áno | Odstráni zobrazovanie cien |
| Skryť tlačidlo košíka | `polski_catalog_hide_cart` | Áno | Odstráni tlačidlo "Pridať do košíka" |
| Náhradný text ceny | `polski_catalog_price_text` | "Zapytaj o cenę" | Text zobrazovaný namiesto ceny |
| Správa na produkte | `polski_catalog_notice` | "" | Správa zobrazovaná na stránke produktu |
| Presmerovať na RFQ | `polski_catalog_redirect_rfq` | Nie | Presmerovanie na formulár cenového dopytu |
| Podmienený režim | `polski_catalog_conditional` | `all` | `all`, `guests`, `roles` |

### Podmienený režim

Katalógový režim môže byť aktívny:

- **Pre všetkých** (`all`) - každý vidí katalóg bez cien
- **Iba pre neprihlásených** (`guests`) - prihlásení zákazníci vidia ceny a môžu nakupovať
- **Pre vybrané roly** (`roles`) - katalóg aktívny iba pre vybrané roly WordPress

Podmienený režim "Iba pre neprihlásených" je populárny v B2B modeloch, kde veľkoobchod vyžaduje registráciu účtu pred odhalením cien.

```php
// Príklad: vlastná podmienená logika
add_filter('polski_pro/catalog/is_active', function (bool $is_active): bool {
    // Vypnúť katalógový režim pre zákazníkov s aspoň 5 objednávkami
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

### Skrytie cien

Modul sa pripojí k filtru `woocommerce_get_price_html` a nahradí HTML ceny nakonfigurovaným náhradným textom.

```php
/**
 * Filtruje tekst zastępczy ceny w trybie katalogowym.
 *
 * @param string      $replacement Tekst zastępczy
 * @param \WC_Product $product     Obiekt produktu
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

### Blokácia nákupov

Modul využíva filter `woocommerce_is_purchasable` na zablokovanie možnosti nákupu:

```php
/**
 * Filtruje, czy produkt jest dostępny do zakupu w trybie katalogowym.
 *
 * @param bool        $purchasable Czy produkt jest dostępny do zakupu
 * @param \WC_Product $product     Obiekt produktu
 */
apply_filters('polski_pro/catalog/is_purchasable', bool $purchasable, \WC_Product $product): bool;
```

**Príklad - povolenie nákupu vybraných produktov:**

```php
add_filter('polski_pro/catalog/is_purchasable', function (bool $purchasable, \WC_Product $product): bool {
    $always_purchasable = [101, 102, 103]; // ID produktov vždy dostupných
    if (in_array($product->get_id(), $always_purchasable, true)) {
        return true;
    }
    return $purchasable;
}, 10, 2);
```

### Správa na stránke produktu

Keď je voľba `polski_catalog_notice` nastavená, na stránke jednotlivého produktu sa zobrazuje správa (notice) informujúca zákazníka o katalógovom režime.

Príklad správy:

> Aby ste zistili cenu tohto produktu, kontaktujte náš obchodný tím alebo vyplňte formulár cenového dopytu.

## Integrácia s modulom cenových dopytov

Keď je voľba `polski_catalog_redirect_rfq` zapnutá, náhradné tlačidlo na stránke produktu smeruje na formulár cenového dopytu ([modul RFQ](/pro/quotes)). Integrácia zahŕňa:

1. Tlačidlo "Opýtať sa na cenu" namiesto "Pridať do košíka"
2. Automatické odovzdanie ID produktu do formulára RFQ
3. Predvyplnenie názvu produktu vo formulári
4. Návrat na produkt po odoslaní dopytu

Aby integrácia fungovala, oba moduly - katalógový a RFQ - musia byť aktívne.

## Skrývanie prvkov

Okrem cien a tlačidla košíka modul automaticky skrýva:

| Prvok | Hook WooCommerce | Efekt |
|---------|-----------------|-------|
| Tlačidlo "Pridať do košíka" | `woocommerce_is_purchasable` | Produkt označený ako nedostupný na nákup |
| Cena | `woocommerce_get_price_html` | HTML ceny nahradené textom |
| Ikona košíka v hlavičke | `polski_pro/catalog/hide_cart_icon` | Skryje ikonu mini-košíka |
| Stránka košíka | `template_redirect` | Presmerovanie z /cart/ na hlavnú stránku |
| Stránka checkoutu | `template_redirect` | Presmerovanie z /checkout/ na hlavnú stránku |

### Selektívne skrývanie

Nie je nutné skrývať všetky prvky naraz. Každú voľbu je možné zapnúť alebo vypnúť nezávisle. Napríklad:

- Skryť ceny, ale nechať tlačidlo košíka (zákazník kupuje "za neznámu cenu" - kontakt po objednávke)
- Skryť tlačidlo košíka, ale zobraziť ceny (zákazník vidí ceny, ale musí sa opýtať na nákup)
- Skryť všetko (plný katalógový režim)

## Vylúčenie produktov a kategórií

### Vylúčenie produktov

Vybrané produkty môžu byť vylúčené z katalógového režimu v úprave produktu, záložka **Polski PRO > Katalógový režim**, zaškrtnutím voľby "Vylúčiť z katalógového režimu".

### Vylúčenie kategórií

```php
/**
 * Filtruje kategorie wykluczone z trybu katalogowego.
 *
 * @param array $excluded_categories Tablica ID kategorii
 */
apply_filters('polski_pro/catalog/excluded_categories', array $excluded_categories): array;
```

**Príklad:**

```php
add_filter('polski_pro/catalog/excluded_categories', function (array $excluded_categories): array {
    $excluded_categories[] = 15; // "Príslušenstvo" - vždy dostupné na nákup
    $excluded_categories[] = 28; // "Výpredaj"
    return $excluded_categories;
});
```

## Pomocné CSS triedy

Modul pridáva CSS triedy k `<body>` uľahčujúce štýlovanie:

| Trieda | Kedy pridaná |
|-------|----------------|
| `polski-catalog-mode` | Katalógový režim je aktívny |
| `polski-catalog-prices-hidden` | Ceny sú skryté |
| `polski-catalog-cart-hidden` | Tlačidlo košíka je skryté |

**Príklad CSS:**

```css
.polski-catalog-mode .price {
    display: none; /* Dodatočné skrytie ceny, ak téma nerešpektuje filter */
}

.polski-catalog-mode .single_add_to_cart_button {
    background-color: #0073aa;
    content: "Zapytaj o cenę";
}
```

## Riešenie problémov

**Ceny sa stále zobrazujú napriek zapnutému katalógovému režimu**
Niektoré témy používajú neštandardné metódy zobrazovania cien, obchádzajúce filter `woocommerce_get_price_html`. Použite CSS triedy `.polski-catalog-prices-hidden .price { display: none; }` ako zabezpečenie.

**Zákazník môže pridať produkt do košíka cez priamy URL**
Modul to blokuje na úrovni filtra `woocommerce_is_purchasable`. Ak problém pretrváva, skontrolujte, či iný plugin neprepíše tento filter s vyššou prioritou.

**Podmienený režim nefunguje správne s cache**
Kešovacie pluginy môžu servírovať kešovanú verziu nezávisle od stavu prihlásenia. Nakonfigurujte kešovací plugin, aby oddeľoval cache pre prihlásených a neprihlásených používateľov.

## Ďalšie kroky

- Hlásenie problémov: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Súvisiace moduly: [Cenové dopyty](/pro/quotes)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
