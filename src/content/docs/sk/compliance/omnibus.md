---
title: Smernica Omnibus - sledovanie cien
description: Implementácia smernice Omnibus v Polski for WooCommerce - automatické sledovanie najnižšej ceny za 30 dní, konfigurácia zobrazovania a shortcód.
---

Smernica Omnibus (EU 2019/2161), implementovaná v Poľsku od 1. januára 2023, zaväzuje predajcov informovať spotrebiteľov o najnižšej cene produktu za posledných 30 dní pred zľavou. Polski for WooCommerce automaticky sleduje históriu cien a zobrazuje požadovanú informáciu pri každej akcii.

## Ako funguje sledovanie cien

Plugin zaznamenáva každú zmenu ceny produktu WooCommerce (vrátane variantných produktov) a ukladá históriu do databázy. Keď je produkt označený ako "v akcii", systém automaticky vypočíta najnižšiu cenu za posledných 30 dní a zobrazí ju zákazníkom.

Sledovanie sa začína od momentu aktivácie modulu. Ak produkt ešte nemá históriu cien, plugin zobrazí príslušné náhradné hlásenie.

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski > Omnibus** a nakonfigurujte dostupné možnosti.

### Obdobie sledovania

| Možnosť | Popis | Predvolená hodnota |
|-------|------|------------------|
| `days` | Počet dní dozadu na výpočet najnižšej ceny | `30` |
| `prune_after_days` | Po koľkých dňoch odstrániť staré záznamy z histórie | `90` |

Nastavenie `prune_after_days` umožňuje kontrolovať veľkosť tabuľky histórie cien v databáze. Hodnota `90` znamená, že údaje staršie ako 90 dní sú automaticky odstraňované cez WP-Cron.

### Dane

| Možnosť | Popis | Predvolená hodnota |
|-------|------|------------------|
| `include_tax` | Či zobrazená cena Omnibus má obsahovať DPH | `true` |

Táto možnosť by mala byť v súlade s nastaveniami zobrazovania cien vo WooCommerce. Ak sú ceny v obchode zobrazované s DPH, nastavte na `true`.

### Miesta zobrazovania

| Možnosť | Popis | Predvolená hodnota |
|-------|------|------------------|
| `display_on_sale_only` | Zobrazovať len pri produktoch v akcii | `true` |
| `show_on_single` | Stránka jednotlivého produktu | `true` |
| `show_on_loop` | Zoznam produktov (kategória, obchod) | `false` |
| `show_on_related` | Súvisiace produkty | `false` |
| `show_on_cart` | Košík | `false` |

Odporúčanie: zapnite zobrazovanie aspoň na stránke produktu (`show_on_single`). Zobrazovanie na zozname produktov (`show_on_loop`) môže zaberať veľa miesta, ale je vyžadované niektorými interpretáciami predpisov.

### Bežná cena

| Možnosť | Popis | Predvolená hodnota |
|-------|------|------------------|
| `show_regular_price` | Zobrazovať aj bežnú cenu vedľa ceny Omnibus | `false` |

### Šablóna textu

| Možnosť | Popis | Predvolená hodnota |
|-------|------|------------------|
| `display_text` | Šablóna zobrazovaného hlásenia | `Najniższa cena z {days} dni przed obniżką: {price}` |
| `no_history_text` | Text keď chýba história cien | `Brak danych o wcześniejszej cenie` |

Dostupné premenné v šablóne `display_text`:

- `{price}` - najnižšia cena za dané obdobie
- `{days}` - počet dní (štandardne 30)
- `{date}` - dátum najnižšej ceny
- `{regular_price}` - bežná cena produktu (pred akciou)

#### Príklady šablón

```
Najniższa cena z {days} dni przed obniżką: {price}
```

```
Najniższa cena z ostatnich {days} dni: {price} (cena regularna: {regular_price})
```

```
Omnibus: {price} (z dnia {date})
```

### Spôsob výpočtu ceny

| Možnosť | Popis | Predvolená hodnota |
|-------|------|------------------|
| `price_count_from` | Od kedy počítať 30 dní | `sale_start` |

Dostupné hodnoty:

- `sale_start` - od dátumu začiatku akcie (odporúčané UOKiK)
- `current_date` - od aktuálneho dátumu

### Variantné produkty

| Možnosť | Popis | Predvolená hodnota |
|-------|------|------------------|
| `variable_tracking` | Spôsob sledovania variantov | `per_variation` |

Dostupné hodnoty:

- `per_variation` - samostatné sledovanie každého variantu (odporúčané)
- `parent_only` - sledovanie len ceny nadradeného produktu

Nastavenie `per_variation` zabezpečuje presnejšie údaje, pretože každý variant môže mať inú cenu a históriu zliav.

## Shortcód

Použite shortcód `[polski_omnibus_price]` na zobrazenie informácie o najnižšej cene na ľubovoľnom mieste stránky.

### Základné použitie

```
[polski_omnibus_price]
```

Zobrazí cenu Omnibus pre aktuálny produkt.

### S parametrami

```
[polski_omnibus_price product_id="456" days="30"]
```

### Parametre shortcódu

| Parameter | Popis | Predvolená hodnota |
|----------|------|------------------|
| `product_id` | ID produktu | Aktuálny produkt |
| `days` | Počet dní | Hodnota z nastavení |

### Príklad použitia v PHP šablóne

```php
echo do_shortcode('[polski_omnibus_price product_id="' . $product_id . '"]');
```

## Automatické čistenie histórie

Plugin registruje úlohu WP-Cron, ktorá denne odstraňuje záznamy histórie cien staršie ako hodnota `prune_after_days`. Vďaka tomu tabuľka v databáze nerastie bez obmedzení.

Na ručné vynútenie čistenia môžete použiť WP-CLI:

```bash
wp cron event run polski_omnibus_prune
```

## Súlad s predpismi UOKiK

Úrad na ochranu hospodárskej súťaže a spotrebiteľov uvádza, že:

1. Informácia o najnižšej cene musí byť zobrazená **pri každom oznámení o zľave**
2. Referenčné obdobie je **30 dní pred uplatnením zľavy**
3. Pre produkty predávané kratšie ako 30 dní - uveďte najnižšiu cenu od dňa zavedenia do predaja
4. Pre produkty podliehajúce rýchlemu kazeniu - možné skrátenie obdobia

Plugin štandardne dodržiava tieto usmernenia. Možnosť `price_count_from` nastavená na `sale_start` zabezpečuje počítanie od dátumu začiatku akcie, v súlade s odporúčaniami UOKiK.

## Riešenie problémov

**Cena Omnibus sa nezobrazuje**
Skontrolujte, či je produkt označený ako "v akcii" vo WooCommerce (akciová cena musí byť nastavená). Ak je možnosť `display_on_sale_only` zapnutá, hlásenie sa zobrazí len pri aktívnej akcii.

**Zobrazuje sa hlásenie o chýbajúcej histórii**
Sledovanie cien sa začína od aktivácie modulu. Počkajte na prvú zmenu ceny alebo ručne uložte produkt, aby sa inicializoval záznam v histórii.

**Cena Omnibus je rovnaká ako akciová cena**
Toto je správne správanie, ak produkt nemal nižšiu cenu za posledných 30 dní.

## Ďalšie kroky

- Nahlasovanie problémov: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskusie a otázky: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
