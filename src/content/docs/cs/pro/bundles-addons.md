---
title: Balicky, doplnky a "casto kupovano spolecne"
description: Moduly produktovych balicku, doplnku k produktu a doporuceni "casto kupovano spolecne" v Polski PRO for WooCommerce.
---

Polski PRO for WooCommerce nabizi tri vzajemne se doplnujici prodejni moduly: produktove balicky (bundles), doplnky k produktu (add-ons) a doporuceni "casto kupovano spolecne" (frequently bought together). Kazdy modul funguje nezavisle a lze ho zapnout samostatne.

:::note[Pozadavky]
Polski PRO vyzaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Produktove balicky (bundles)

Modul balicku umoznuje vytvaret konfigurovatelne sady produktu se spolecnou slevou. Zakaznik kupuje balicek jako jeden produkt a jednotlive slozky jsou viditelne v detailech objednavky.

### Konfigurace

Prejdete do **WooCommerce > Nastaveni > Polski PRO > Balicky** a zapnete modul (moznost `polski_bundles`).

| Nastaveni | Vychozi hodnota | Popis |
|-----------|-----------------|-------|
| Zapnout balicky | Ne | Aktivuje funkcionalitu balicku |
| Zpusob slevy | Procento | `percent` (procentualni) nebo `fixed` (pevna castka) |
| Vychozi sleva | 10 % | Sleva pouzivana na nove balicky |
| Zobrazovat usporou | Ano | Zobrazuje castku uspory zakaznikovi |

### Vytvoreni balicku

1. Prejdete do **Produkty > Pridat novy**
2. V sekci **Data produktu** vyberte typ "Balicek Polski PRO"
3. V zalozce **Slozky balicku** pridejte produkty
4. Nastavte mnozstvi kazde slozky
5. Nakonfigurujte slevu (prepise vychozi)

### Vypocet slevy

Cena balicku je vypocitana automaticky:

```
Cena pakietu = Suma cen składników - Rabat

Przykład (rabat 15%):
Produkt A: 100 zł x 1 = 100 zł
Produkt B:  50 zł x 2 = 100 zł
Suma:                    200 zł
Rabat (15%):              30 zł
Cena pakietu:            170 zł
```

Pokud je slozka balicku v akci, pro vypocty se pouziva akcni cena.

### Shortcode balicku

```
[polski_bundle product_id="456" show_savings="yes" layout="grid"]
```

| Parametr | Povinny | Popis |
|----------|---------|-------|
| `product_id` | Ano | ID produktu-balicku |
| `show_savings` | Ne | Zobrazit castku uspory (`yes`/`no`) |
| `layout` | Ne | Rozlozeni: `grid`, `list`, `compact` |

### Hooky balicku

```php
/**
 * Filtruje obliczoną cenę pakietu.
 *
 * @param float $bundle_price Obliczona cena pakietu
 * @param array $items        Składniki pakietu z cenami
 * @param float $discount     Wartość rabatu
 */
apply_filters('polski_pro/bundles/price', float $bundle_price, array $items, float $discount): float;
```

**Priklad - minimalni cena balicku:**

```php
add_filter('polski_pro/bundles/price', function (float $bundle_price, array $items, float $discount): float {
    $minimum_price = 49.99;
    return max($bundle_price, $minimum_price);
}, 10, 3);
```

```php
/**
 * Akcja wywoływana po dodaniu pakietu do koszyka.
 *
 * @param string $cart_item_key Klucz pozycji w koszyku
 * @param int    $bundle_id    ID produktu-pakietu
 * @param array  $items        Składniki pakietu
 */
do_action('polski_pro/bundles/added_to_cart', string $cart_item_key, int $bundle_id, array $items);
```

## Doplnky k produktu (add-ons)

Modul doplnku umoznuje zobrazovat volitelne upsellove produkty primo na strance produktu. Zakaznik muze vybrat doplnkove produkty a zakoupit je jednim kliknutim spolecne s hlavnim produktem.

### Konfigurace

Prejdete do **WooCommerce > Nastaveni > Polski PRO > Doplnky** a zapnete modul (moznost `polski_addons`).

| Nastaveni | Vychozi hodnota | Popis |
|-----------|-----------------|-------|
| Zapnout doplnky | Ne | Aktivuje funkcionalitu doplnku |
| Pozice zobrazeni | Za tlacitkem kosiku | Kde zobrazit sekci doplnku |
| Nadpis sekce | "Dodaj do zamówienia" | Text nadpisu nad seznamem doplnku |
| Maximalni pocet | 5 | Limit zobrazovanych doplnku na produktu |

### Prirazovani doplnku

Doplnky se konfiguraji v uprave produktu, v zalozce **Doplnky Polski PRO**:

1. Kliknete "Pridat doplnek"
2. Vyberte produkt z katalogu
3. Nastavte cenu doplnku (vychozi cena produktu)
4. Volitelne nastavte akcni cenu doplnku
5. Urcete poradi zobrazeni

Doplnky mohou mit jinou cenu nez zdrojovy produkt - to umoznuje nabizet specialni ceny "spolecne s produktem".

### Validace vyberu

Modul validuje:

- Skladovou dostupnost kazdeho vybraneho doplnku
- Spravnost cen (zda nebyly modifikovany na strane klienta)
- Mnozstevni limity

### Hooky doplnku

```php
/**
 * Filtruje listę dodatków dla produktu.
 *
 * @param array       $addons  Tablica dodatków z cenami
 * @param \WC_Product $product Produkt główny
 */
apply_filters('polski_pro/addons/items', array $addons, \WC_Product $product): array;
```

**Priklad - filtrovani doplnku na zaklade role uzivatele:**

```php
add_filter('polski_pro/addons/items', function (array $addons, \WC_Product $product): array {
    if (current_user_can('wholesale_customer')) {
        foreach ($addons as &$addon) {
            $addon['price'] = $addon['price'] * 0.8; // 20% velkoobchodni sleva
        }
    }
    return $addons;
}, 10, 2);
```

## Casto kupovano spolecne (frequently bought together)

Modul doporuceni zobrazuje produkty nejcasteji kupovane spolecne s prohlizenym produktem, s moznosti pridani vice produktu do kosiku jednim kliknutim.

### Konfigurace

Prejdete do **WooCommerce > Nastaveni > Polski PRO > Casto kupovano spolecne** a zapnete modul (moznost `polski_fbt`).

| Nastaveni | Vychozi hodnota | Popis |
|-----------|-----------------|-------|
| Zapnout modul | Ne | Aktivuje doporuceni |
| Zdroj dat | Rucni | `manual` (rucni) nebo `auto` (na zaklade objednavek) |
| Limit produktu | 3 | Maximalni pocet doporucovanych produktu |
| Nadpis sekce | "Często kupowane razem" | Text nadpisu sekce |
| Pozice | Pod kratkym popisem | Kde zobrazit sekci |

### Rucni prirazovani

V uprave produktu, zalozka **Casto kupovano spolecne**:

1. Vyhledejte a pridejte souvisejici produkty
2. Nastavte poradi zobrazeni
3. Volitelne nastavte slevu za nakup spolecne

### Automaticka doporuceni

Kdyz je zdroj dat nastaven na `auto`, modul analyzuje historii objednavek a identifikuje produkty nejcasteji kupovane spolecne. Analyza je spoustena jednou denne pres WP-Cron.

### Pridavani do kosiku

Sekce "Casto kupovano spolecne" zobrazuje:

- Checkboxy u kazdeho doporucovaneho produktu
- Miniatury a nazvy produktu
- Ceny jednotlivych produktu
- Celkovou cenu vybranych produktu
- Tlacitko "Pridat vse do kosiku"

Zakaznik zaskrtne vybrane produkty a prida je jednim kliknutim. Vsechny produkty se objevi v kosiku jako samostatne polozky.

### Shortcode

```
[polski_fbt product_id="789" limit="4" show_prices="yes"]
```

| Parametr | Povinny | Popis |
|----------|---------|-------|
| `product_id` | Ne | ID hlavniho produktu (vychozi aktualni) |
| `limit` | Ne | Maximalni pocet doporuceni |
| `show_prices` | Ne | Zobrazovat ceny (`yes`/`no`) |

### Hooky FBT

```php
/**
 * Filtruje listę rekomendowanych produktów.
 *
 * @param array $product_ids Tablica ID rekomendowanych produktów
 * @param int   $product_id  ID produktu głównego
 * @param string $source     Źródło: 'manual' lub 'auto'
 */
apply_filters('polski_pro/fbt/products', array $product_ids, int $product_id, string $source): array;
```

**Priklad - vylouceni produktu z vybrane kategorie:**

```php
add_filter('polski_pro/fbt/products', function (array $product_ids, int $product_id, string $source): array {
    $excluded_category_id = 42;
    return array_filter($product_ids, function (int $id) use ($excluded_category_id): bool {
        return ! has_term($excluded_category_id, 'product_cat', $id);
    });
}, 10, 3);
```

## Soucinnost modulu

Vsechny tri moduly mohou fungovat soucasne na stejnem produktu:

- **Balicek** s prirazenymi **doplnky** a sekci **casto kupovano spolecne**
- Slozky balicku mohou mit vlastni doplnky
- Doporuceni FBT mohou odkazovat na balicky

Poradi zobrazeni na strance produktu je konfigurovatelne pomoci priority hooku WooCommerce.

## Reseni problemu

**Cena balicku se neaktualizuje po zmene cen slozek**
Cena balicku je vypocitavana dynamicky. Vycistete Object Cache a transients WooCommerce.

**Doplnky se nezobrazuji na strance produktu**
Zkontrolujte, ze motiv podporuje hook `woocommerce_after_add_to_cart_button`. Nektere nestandardni motivy vynechavaji standardni hooky WooCommerce.

**Automaticka doporuceni jsou prazdna**
Modul potrebuje historicka data - automaticka doporuceni se objevi po shromazdeni dostatecneho poctu objednavek. Zkontrolujte, ze uloha WP-Cron `polski_pro_fbt_analyze` je naplanowana.

## Dalsi kroky

- Hlaste problemy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Souvisejici moduly: [Predprodej](/pro/preorders), [Katalogovy rezim](/pro/catalog-mode)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
