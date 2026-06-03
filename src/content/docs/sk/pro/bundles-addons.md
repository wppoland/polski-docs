---
title: Balíčky, doplnky a "často kupované spolu"
description: Moduly produktových balíčkov, doplnkov k produktu a odporúčaní "často kupované spolu" v Polski PRO for WooCommerce.
---

Tri predajné moduly: balíčky (bundles), doplnky k produktu (add-ons) a "často kupované spolu" (FBT). Každý funguje nezávisle.

:::note[Požiadavky]
Polski PRO vyžaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Produktové balíčky (bundles)

Vytvárajte sady produktov so spoločnou zľavou. Zákazník kúpi balíček ako jeden produkt. Zložky vidno v detailoch objednávky.

### Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski PRO > Balíčky** a zapnite modul (možnosť `polski_bundles`).

| Nastavenie | Predvolená hodnota | Popis |
|------------|------------------|------|
| Zapnúť balíčky | Nie | Aktivuje funkcionalitu balíčkov |
| Spôsob zľavy | Percento | `percent` (percentuálna) alebo `fixed` (sumová) |
| Predvolená zľava | 10 % | Zľava aplikovaná na nové balíčky |
| Zobrazovať úsporu | Áno | Zobrazí zákazníkovi sumu úspory |

### Vytvorenie balíčka

1. Prejdite do **Produkty > Pridať nový**
2. V sekcii **Údaje produktu** vyberte typ "Balíček Polski PRO"
3. V záložke **Zložky balíčka** pridajte produkty
4. Nastavte množstvo každej zložky
5. Nakonfigurujte zľavu (prepisuje predvolenú)

### Výpočet zľavy

Cena balíčka sa počíta automaticky:

```
Cena balíčka = Súčet cien zložiek - Zľava

Príklad (zľava 15 %):
Produkt A: 100 zł x 1 = 100 zł
Produkt B:  50 zł x 2 = 100 zł
Súčet:                   200 zł
Zľava (15 %):             30 zł
Cena balíčka:           170 zł
```

Ak je zložka balíčka v akcii, na výpočet sa použije akciová cena.

### Shortcode balíčka

```
[polski_bundle product_id="456" show_savings="yes" layout="grid"]
```

| Parameter | Povinný | Popis |
|----------|----------|------|
| `product_id` | Áno | ID produktu-balíčka |
| `show_savings` | Nie | Zobraziť sumu úspory (`yes`/`no`) |
| `layout` | Nie | Rozloženie: `grid`, `list`, `compact` |

### Hooky balíčkov

```php
/**
 * Filtruje vypočítanú cenu balíčka.
 *
 * @param float $bundle_price Vypočítaná cena balíčka
 * @param array $items        Zložky balíčka s cenami
 * @param float $discount     Hodnota zľavy
 */
apply_filters('polski_pro/bundles/price', float $bundle_price, array $items, float $discount): float;
```

**Príklad - minimálna cena balíčka:**

```php
add_filter('polski_pro/bundles/price', function (float $bundle_price, array $items, float $discount): float {
    $minimum_price = 49.99;
    return max($bundle_price, $minimum_price);
}, 10, 3);
```

```php
/**
 * Akcia vyvolaná po pridaní balíčka do košíka.
 *
 * @param string $cart_item_key Kľúč položky v košíku
 * @param int    $bundle_id    ID produktu-balíčka
 * @param array  $items        Zložky balíčka
 */
do_action('polski_pro/bundles/added_to_cart', string $cart_item_key, int $bundle_id, array $items);
```

## Doplnky k produktu (add-ons)

Zobrazujte voliteľné upsellové produkty na stránke produktu. Zákazník vyberie doplnky a kúpi ich jedným kliknutím spolu s hlavným produktom.

### Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski PRO > Doplnky** a zapnite modul (možnosť `polski_addons`).

| Nastavenie | Predvolená hodnota | Popis |
|------------|------------------|------|
| Zapnúť doplnky | Nie | Aktivuje funkcionalitu doplnkov |
| Pozícia zobrazovania | Za tlačidlom košíka | Kde zobraziť sekciu doplnkov |
| Nadpis sekcie | "Pridať k objednávke" | Text nadpisu nad zoznamom doplnkov |
| Maximálny počet | 5 | Limit zobrazovaných doplnkov na produkte |

### Priraďovanie doplnkov

Doplnky sa konfigurujú v editácii produktu, v záložke **Doplnky Polski PRO**:

1. Kliknite "Pridať doplnok"
2. Vyberte produkt z katalógu
3. Nastavte cenu doplnku (predvolene cena produktu)
4. Voliteľne nastavte akciovú cenu doplnku
5. Určte poradie zobrazovania

Doplnky môžu mať inú cenu než zdrojový produkt, môžete ponúkať špeciálne ceny "spolu s produktom".

### Validácia výberu

Modul validuje:

- Skladovú dostupnosť každého vybraného doplnku
- Správnosť cien (či neboli upravené na strane klienta)
- Množstvové limity

### Hooky doplnkov

```php
/**
 * Filtruje zoznam doplnkov pre produkt.
 *
 * @param array       $addons  Pole doplnkov s cenami
 * @param \WC_Product $product Hlavný produkt
 */
apply_filters('polski_pro/addons/items', array $addons, \WC_Product $product): array;
```

**Príklad - filtrovanie doplnkov na základe roly používateľa:**

```php
add_filter('polski_pro/addons/items', function (array $addons, \WC_Product $product): array {
    if (current_user_can('wholesale_customer')) {
        foreach ($addons as &$addon) {
            $addon['price'] = $addon['price'] * 0.8; // 20% rabatu hurtowego
        }
    }
    return $addons;
}, 10, 2);
```

## Často kupované spolu (frequently bought together)

Zobrazuje produkty najčastejšie kupované spolu s prehliadaným. Zákazník pridá viacero produktov do košíka jedným kliknutím.

### Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski PRO > Často kupované spolu** a zapnite modul (možnosť `polski_fbt`).

| Nastavenie | Predvolená hodnota | Popis |
|------------|------------------|------|
| Zapnúť modul | Nie | Aktivuje odporúčania |
| Zdroj dát | Ručne | `manual` (ručné) alebo `auto` (na základe objednávok) |
| Limit produktov | 3 | Maximálny počet odporúčaných produktov |
| Nadpis sekcie | "Často kupované spolu" | Text nadpisu sekcie |
| Pozícia | Pod krátkym popisom | Kde zobraziť sekciu |

### Ručné priraďovanie

V editácii produktu, záložka **Často kupované spolu**:

1. Vyhľadajte a pridajte súvisiace produkty
2. Nastavte poradie zobrazovania
3. Voliteľne nastavte zľavu za nákup spolu

### Automatické odporúčania

V režime `auto` modul analyzuje históriu objednávok a nájde produkty najčastejšie kupované spolu. Analýza sa spúšťa raz denne cez WP-Cron.

### Pridávanie do košíka

Sekcia "Často kupované spolu" zobrazuje:

- Checkboxy pri každom odporúčanom produkte
- Miniatúry a názvy produktov
- Ceny jednotlivých produktov
- Celkovú cenu vybraných produktov
- Tlačidlo "Pridať všetky do košíka"

Zákazník zaškrtne produkty a pridá ich jedným kliknutím. Dostanú sa do košíka ako samostatné položky.

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
 * Filtruje zoznam odporúčaných produktov.
 *
 * @param array $product_ids Pole ID odporúčaných produktov
 * @param int   $product_id  ID hlavného produktu
 * @param string $source     Zdroj: 'manual' alebo 'auto'
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

## Súčinnosť modulov

Všetky tri moduly môžu fungovať súčasne na rovnakom produkte:

- **Balíček** s priradenými **doplnkami** a sekciou **často kupované spolu**
- Zložky balíčka môžu mať vlastné doplnky
- Odporúčania FBT môžu ukazovať na balíčky

Poradie zobrazovania nastavte prioritou hookov WooCommerce.

## Riešenie problémov

**Cena balíčka sa neaktualizuje po zmene cien zložiek**
Cena balíčka sa počíta dynamicky. Vyčistite cache objektov (Object Cache) a transients WooCommerce.

**Doplnky sa nezobrazujú na stránke produktu**
Skontrolujte, či šablóna podporuje hook `woocommerce_after_add_to_cart_button`. Niektoré vlastné šablóny vynechávajú štandardné hooky WooCommerce.

**Automatické odporúčania sú prázdne**
Modul potrebuje historické dáta, automatické odporúčania sa objavia po nazbieraní dostatočného počtu objednávok. Skontrolujte, či je úloha WP-Cron `polski_pro_fbt_analyze` naplánovaná.

## Ďalšie kroky

- Nahlasujte problémy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Súvisiace moduly: [Predpredaj](/pro/preorders), [Katalógový režim](/pro/catalog-mode)

<div class="disclaimer">Táto stránka má výlučne informačný charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
