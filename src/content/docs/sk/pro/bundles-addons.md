---
title: Balíky, doplnky a "často kupované spolu"
description: Moduly produktových balíkov, doplnkov k produktu a odporúčaní "často kupované spolu" v Polski PRO for WooCommerce.
---

Tri predajné moduly: produktové balíky (bundles), doplnky k produktu (add-ons) a "často kupované spolu" (FBT). Každý funguje nezávisle.

:::note[Požiadavky]
Polski PRO vyžaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Produktové balíky (bundles)

Modul balíkov umožňuje vytvárať konfigurovateľné súbory produktov so spoločnou zľavou. Zákazník kupuje balík ako jeden produkt a jednotlivé súčasti sú viditeľné v podrobnostiach objednávky.

### Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski PRO > Balíky** a zapnite modul (voľba `polski_bundles`).

| Nastavenie | Predvolená hodnota | Popis |
|------------|------------------|------|
| Zapnúť balíky | Nie | Aktivuje funkcionalitu balíkov |
| Spôsob zľavy | Percento | `percent` (percentuálna) alebo `fixed` (pevná suma) |
| Predvolená zľava | 10% | Zľava aplikovaná na nové balíky |
| Zobrazovať úsporu | Áno | Ukazuje zákazníkovi sumu úspory |

### Vytvorenie balíka

1. Prejdite do **Produkty > Pridať nový**
2. V sekcii **Dáta produktu** vyberte typ "Balík Polski PRO"
3. V záložke **Súčasti balíka** pridajte produkty
4. Nastavte množstvo každej súčasti
5. Nakonfigurujte zľavu (prepíše predvolenú)

### Výpočet zľavy

Cena balíka sa počíta automaticky:

```
Cena balíka = Súčet cien súčastí - Zľava

Príklad (zľava 15%):
Produkt A: 100 zł x 1 = 100 zł
Produkt B:  50 zł x 2 = 100 zł
Súčet:                   200 zł
Zľava (15%):              30 zł
Cena balíka:             170 zł
```

Ak je súčasť balíka v akcii, na výpočty sa používa akciová cena.

### Shortcode balíka

```
[polski_bundle product_id="456" show_savings="yes" layout="grid"]
```

| Parameter | Povinný | Popis |
|----------|----------|------|
| `product_id` | Áno | ID produktu-balíka |
| `show_savings` | Nie | Zobraziť sumu úspory (`yes`/`no`) |
| `layout` | Nie | Rozloženie: `grid`, `list`, `compact` |

### Hooky balíkov

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

**Príklad - minimálna cena balíka:**

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

Modul doplnkov umožňuje zobrazovať voliteľné upsellové produkty priamo na stránke produktu. Zákazník môže vybrať ďalšie produkty a kúpiť ich jedným kliknutím spolu s hlavným produktom.

### Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski PRO > Doplnky** a zapnite modul (voľba `polski_addons`).

| Nastavenie | Predvolená hodnota | Popis |
|------------|------------------|------|
| Zapnúť doplnky | Nie | Aktivuje funkcionalitu doplnkov |
| Pozícia zobrazenia | Za tlačidlom košíka | Kde zobraziť sekciu doplnkov |
| Nadpis sekcie | "Dodaj do zamówienia" | Text nadpisu nad zoznamom doplnkov |
| Maximálny počet | 5 | Limit zobrazovaných doplnkov na produkte |

### Priradenie doplnkov

Doplnky sa konfigurujú v úprave produktu, v záložke **Doplnky Polski PRO**:

1. Kliknite "Pridať doplnok"
2. Vyberte produkt z katalógu
3. Nastavte cenu doplnku (predvolene cena produktu)
4. Voliteľne nastavte akciovú cenu doplnku
5. Určte poradie zobrazenia

Doplnky môžu mať inú cenu ako zdrojový produkt - to umožňuje ponúkať špeciálne ceny "spolu s produktom".

### Validácia výberu

Modul validuje:

- Skladovú dostupnosť každého vybraného doplnku
- Správnosť cien (či neboli modifikované na strane klienta)
- Množstevné limity

### Hooky doplnkov

```php
/**
 * Filtruje listę dodatków dla produktu.
 *
 * @param array       $addons  Tablica dodatków z cenami
 * @param \WC_Product $product Produkt główny
 */
apply_filters('polski_pro/addons/items', array $addons, \WC_Product $product): array;
```

**Príklad - filtrovanie doplnkov na základe roly používateľa:**

```php
add_filter('polski_pro/addons/items', function (array $addons, \WC_Product $product): array {
    if (current_user_can('wholesale_customer')) {
        foreach ($addons as &$addon) {
            $addon['price'] = $addon['price'] * 0.8; // 20% veľkoobchodná zľava
        }
    }
    return $addons;
}, 10, 2);
```

## Často kupované spolu (frequently bought together)

Modul odporúčaní zobrazuje produkty najčastejšie kupované spolu s prezeraným produktom, s možnosťou pridania viacerých produktov do košíka jedným kliknutím.

### Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski PRO > Často kupované spolu** a zapnite modul (voľba `polski_fbt`).

| Nastavenie | Predvolená hodnota | Popis |
|------------|------------------|------|
| Zapnúť modul | Nie | Aktivuje odporúčania |
| Zdroj dát | Ručný | `manual` (ručný) alebo `auto` (na základe objednávok) |
| Limit produktov | 3 | Maximálny počet odporúčaných produktov |
| Nadpis sekcie | "Często kupowane razem" | Text nadpisu sekcie |
| Pozícia | Pod krátkym popisom | Kde zobraziť sekciu |

### Ručné priraďovanie

V úprave produktu, záložka **Často kupované spolu**:

1. Vyhľadajte a pridajte súvisiace produkty
2. Nastavte poradie zobrazenia
3. Voliteľne nastavte zľavu za spoločný nákup

### Automatické odporúčania

Keď je zdroj dát nastavený na `auto`, modul analyzuje históriu objednávok a identifikuje produkty najčastejšie kupované spolu. Analýza sa spúšťa raz denne cez WP-Cron.

### Pridanie do košíka

Sekcia "Často kupované spolu" zobrazuje:

- Checkboxy pri každom odporúčanom produkte
- Miniatúrky a názvy produktov
- Ceny jednotlivých produktov
- Celkovú cenu vybraných produktov
- Tlačidlo "Pridať všetky do košíka"

Zákazník zaškrtne vybrané produkty a pridá ich jedným kliknutím. Všetky produkty sa dostanú do košíka ako samostatné položky.

### Shortcode

```
[polski_fbt product_id="789" limit="4" show_prices="yes"]
```

| Parameter | Povinný | Popis |
|----------|----------|------|
| `product_id` | Nie | ID hlavného produktu (predvolene aktuálny) |
| `limit` | Nie | Maximálny počet odporúčaní |
| `show_prices` | Nie | Zobrazovať ceny (`yes`/`no`) |

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

**Príklad - vylúčenie produktov z vybranej kategórie:**

```php
add_filter('polski_pro/fbt/products', function (array $product_ids, int $product_id, string $source): array {
    $excluded_category_id = 42;
    return array_filter($product_ids, function (int $id) use ($excluded_category_id): bool {
        return ! has_term($excluded_category_id, 'product_cat', $id);
    });
}, 10, 3);
```

## Spolupráca modulov

Všetky tri moduly môžu fungovať súčasne na tom istom produkte:

- **Balík** s priradenými **doplnkami** a sekciou **často kupované spolu**
- Súčasti balíka môžu mať vlastné doplnky
- Odporúčania FBT môžu odkazovať na balíky

Poradie zobrazenia na stránke produktu je konfigurovateľné pomocou priority hookov WooCommerce.

## Riešenie problémov

**Cena balíka sa neaktualizuje po zmene cien súčastí**
Cena balíka sa počíta dynamicky. Vymažte Object Cache a transienty WooCommerce.

**Doplnky sa nezobrazujú na stránke produktu**
Skontrolujte, či téma podporuje hook `woocommerce_after_add_to_cart_button`. Niektoré vlastné témy vynechávajú štandardné hooky WooCommerce.

**Automatické odporúčania sú prázdne**
Modul potrebuje historické dáta - automatické odporúčania sa objavia po zozbieraní dostatočného počtu objednávok. Skontrolujte, či je úloha WP-Cron `polski_pro_fbt_analyze` naplánovaná.

## Ďalšie kroky

- Hlásenie problémov: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Súvisiace moduly: [Predpredaj](/pro/preorders), [Katalógový režim](/pro/catalog-mode)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
