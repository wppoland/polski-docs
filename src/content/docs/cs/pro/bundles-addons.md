---
title: Balíčky, doplňky a "často kupováno společně"
description: Moduly produktových balíčků, doplňků k produktu a doporučení "často kupováno společně" v Polski PRO for WooCommerce.
---

Tři prodejní moduly: balíčky (bundles), doplňky k produktu (add-ons) a "často kupováno společně" (FBT). Každý funguje nezávisle.

:::note[Požadavky]
Polski PRO vyžaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Produktové balíčky (bundles)

Vytvářejte sady produktů se společnou slevou. Zákazník kupuje balíček jako jeden produkt. Komponenty jsou viditelné v detailech objednávky.

### Konfigurace

Přejděte na **WooCommerce > Nastavení > Polski PRO > Balíčky** a zapněte modul (možnost `polski_bundles`).

| Nastavení | Výchozí hodnota | Popis |
|------------|------------------|------|
| Zapnout balíčky | Ne | Aktivuje funkcionalitu balíčků |
| Způsob slevy | Procento | `percent` (procentní) nebo `fixed` (částková) |
| Výchozí sleva | 10 % | Sleva aplikovaná na nové balíčky |
| Zobrazovat úsporu | Ano | Zobrazuje zákazníkovi výši úspory |

### Vytvoření balíčku

1. Přejděte na **Produkty > Přidat nový**
2. V sekci **Data produktu** vyberte typ "Balíček Polski PRO"
3. V záložce **Komponenty balíčku** přidejte produkty
4. Nastavte množství každé komponenty
5. Nakonfigurujte slevu (přepisuje výchozí)

### Výpočet slevy

Cena balíčku se počítá automaticky:

```
Cena balíčku = Součet cen komponent - Sleva

Příklad (sleva 15 %):
Produkt A: 100 zł x 1 = 100 zł
Produkt B:  50 zł x 2 = 100 zł
Součet:                  200 zł
Sleva (15 %):             30 zł
Cena balíčku:            170 zł
```

Pokud je komponenta balíčku v akci, k výpočtu se použije akční cena.

### Shortcode balíčku

```
[polski_bundle product_id="456" show_savings="yes" layout="grid"]
```

| Parametr | Povinný | Popis |
|----------|----------|------|
| `product_id` | Ano | ID produktu-balíčku |
| `show_savings` | Ne | Zobrazit výši úspory (`yes`/`no`) |
| `layout` | Ne | Rozložení: `grid`, `list`, `compact` |

### Hooky balíčků

```php
/**
 * Filtruje vypočtenou cenu balíčku.
 *
 * @param float $bundle_price Vypočtená cena balíčku
 * @param array $items        Komponenty balíčku s cenami
 * @param float $discount     Hodnota slevy
 */
apply_filters('polski_pro/bundles/price', float $bundle_price, array $items, float $discount): float;
```

**Příklad - minimální cena balíčku:**

```php
add_filter('polski_pro/bundles/price', function (float $bundle_price, array $items, float $discount): float {
    $minimum_price = 49.99;
    return max($bundle_price, $minimum_price);
}, 10, 3);
```

```php
/**
 * Akce volaná po přidání balíčku do košíku.
 *
 * @param string $cart_item_key Klíč položky v košíku
 * @param int    $bundle_id    ID produktu-balíčku
 * @param array  $items        Komponenty balíčku
 */
do_action('polski_pro/bundles/added_to_cart', string $cart_item_key, int $bundle_id, array $items);
```

## Doplňky k produktu (add-ons)

Zobrazujte volitelné upsellové produkty na stránce produktu. Zákazník vybere doplňky a koupí je jedním kliknutím spolu s hlavním produktem.

### Konfigurace

Přejděte na **WooCommerce > Nastavení > Polski PRO > Doplňky** a zapněte modul (možnost `polski_addons`).

| Nastavení | Výchozí hodnota | Popis |
|------------|------------------|------|
| Zapnout doplňky | Ne | Aktivuje funkcionalitu doplňků |
| Pozice zobrazení | Po tlačítku košíku | Kde zobrazit sekci doplňků |
| Nadpis sekce | "Přidat k objednávce" | Text nadpisu nad seznamem doplňků |
| Maximální počet | 5 | Limit zobrazených doplňků na produktu |

### Přiřazování doplňků

Doplňky se konfigurují v editaci produktu, v záložce **Doplňky Polski PRO**:

1. Klikněte na "Přidat doplněk"
2. Vyberte produkt z katalogu
3. Nastavte cenu doplňku (výchozí cena produktu)
4. Volitelně nastavte akční cenu doplňku
5. Určete pořadí zobrazení

Doplňky mohou mít jinou cenu než zdrojový produkt - můžete nabízet speciální ceny "spolu s produktem".

### Validace výběru

Modul validuje:

- Skladovou dostupnost každého vybraného doplňku
- Správnost cen (zda nebyly modifikovány na straně klienta)
- Množstevní limity

### Hooky doplňků

```php
/**
 * Filtruje seznam doplňků pro produkt.
 *
 * @param array       $addons  Pole doplňků s cenami
 * @param \WC_Product $product Hlavní produkt
 */
apply_filters('polski_pro/addons/items', array $addons, \WC_Product $product): array;
```

**Příklad - filtrování doplňků na základě role uživatele:**

```php
add_filter('polski_pro/addons/items', function (array $addons, \WC_Product $product): array {
    if (current_user_can('wholesale_customer')) {
        foreach ($addons as &$addon) {
            $addon['price'] = $addon['price'] * 0.8; // 20% velkoobchodní sleva
        }
    }
    return $addons;
}, 10, 2);
```

## Často kupováno společně (frequently bought together)

Zobrazuje produkty nejčastěji kupované společně s prohlíženým produktem. Zákazník přidá více produktů do košíku jedním kliknutím.

### Konfigurace

Přejděte na **WooCommerce > Nastavení > Polski PRO > Často kupováno společně** a zapněte modul (možnost `polski_fbt`).

| Nastavení | Výchozí hodnota | Popis |
|------------|------------------|------|
| Zapnout modul | Ne | Aktivuje doporučení |
| Zdroj dat | Ruční | `manual` (ruční) nebo `auto` (na základě objednávek) |
| Limit produktů | 3 | Maximální počet doporučených produktů |
| Nadpis sekce | "Často kupováno společně" | Text nadpisu sekce |
| Pozice | Pod krátkým popisem | Kde zobrazit sekci |

### Ruční přiřazování

V editaci produktu, záložka **Často kupováno společně**:

1. Vyhledejte a přidejte související produkty
2. Nastavte pořadí zobrazení
3. Volitelně nastavte slevu za nákup společně

### Automatická doporučení

V režimu `auto` modul analyzuje historii objednávek a najde produkty nejčastěji kupované společně. Analýza se spouští jednou denně přes WP-Cron.

### Přidávání do košíku

Sekce "Často kupováno společně" zobrazuje:

- Zaškrtávací políčka u každého doporučeného produktu
- Miniatury a názvy produktů
- Ceny jednotlivých produktů
- Celkovou cenu vybraných produktů
- Tlačítko "Přidat vše do košíku"

Zákazník zaškrtne produkty a přidá je jedním kliknutím. Putují do košíku jako samostatné položky.

### Shortcode

```
[polski_fbt product_id="789" limit="4" show_prices="yes"]
```

| Parametr | Povinný | Popis |
|----------|----------|------|
| `product_id` | Ne | ID hlavního produktu (výchozí aktuální) |
| `limit` | Ne | Maximální počet doporučení |
| `show_prices` | Ne | Zobrazovat ceny (`yes`/`no`) |

### Hooky FBT

```php
/**
 * Filtruje seznam doporučených produktů.
 *
 * @param array $product_ids Pole ID doporučených produktů
 * @param int   $product_id  ID hlavního produktu
 * @param string $source     Zdroj: 'manual' nebo 'auto'
 */
apply_filters('polski_pro/fbt/products', array $product_ids, int $product_id, string $source): array;
```

**Příklad - vyloučení produktů z vybrané kategorie:**

```php
add_filter('polski_pro/fbt/products', function (array $product_ids, int $product_id, string $source): array {
    $excluded_category_id = 42;
    return array_filter($product_ids, function (int $id) use ($excluded_category_id): bool {
        return ! has_term($excluded_category_id, 'product_cat', $id);
    });
}, 10, 3);
```

## Souhra modulů

Všechny tři moduly mohou fungovat současně na stejném produktu:

- **Balíček** s přiřazenými **doplňky** a sekcí **často kupováno společně**
- Komponenty balíčku mohou mít vlastní doplňky
- Doporučení FBT mohou odkazovat na balíčky

Pořadí zobrazení nastavte prioritou hooků WooCommerce.

## Řešení problémů

**Cena balíčku se neaktualizuje po změně cen komponent**
Cena balíčku se počítá dynamicky. Vyprázdněte cache objektů (Object Cache) a transients WooCommerce.

**Doplňky se nezobrazují na stránce produktu**
Zkontrolujte, zda šablona podporuje hook `woocommerce_after_add_to_cart_button`. Některé vlastní šablony vynechávají standardní hooky WooCommerce.

**Automatická doporučení jsou prázdná**
Modul potřebuje historická data - automatická doporučení se objevují po nasbírání dostatečného počtu objednávek. Zkontrolujte, zda je úloha WP-Cron `polski_pro_fbt_analyze` naplánována.

## Další kroky

- Nahlašte problémy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Související moduly: [Předprodej](/pro/preorders), [Katalogový režim](/pro/catalog-mode)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
