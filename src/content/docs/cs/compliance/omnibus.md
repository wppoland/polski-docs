---
title: Smernice Omnibus - sledovani cen
description: Implementace Smernice Omnibus v Polski for WooCommerce - automaticke sledovani nejnizsi ceny za 30 dni, konfigurace zobrazovani a shortcode.
---

Smernice Omnibus (EU 2019/2161), implementovana v Polsku od 1. ledna 2023, zavazuje prodejce informovat spotrebitele o nejnizsi cene produktu za poslednich 30 dnu pred slevou. Polski for WooCommerce automaticky sleduje historii cen a zobrazuje vyzadovanou informaci u kazde akce.

## Jak funguje sledovani cen

Plugin zaznamenava kazdou zmenu ceny produktu WooCommerce (vcetne variantnich produktu) a uchovava historii v databazi. Kdyz je produkt oznacen jako "v akci", system automaticky vypocita nejnizsi cenu za poslednich 30 dnu a zobrazi ji zakaznikum.

Sledovani zacina od okamziku aktivace modulu. Pokud produkt jeste nema historii cen, plugin zobrazi prislusnou zastupnou zpravu.

## Konfigurace

Prejdete do **WooCommerce > Nastaveni > Polski > Omnibus** a nakonfigurujte dostupne moznosti.

### Obdobi sledovani

| Moznost | Popis | Vychozi hodnota |
|-------|------|------------------|
| `days` | Pocet dnu zpet pro vypocet nejnizsi ceny | `30` |
| `prune_after_days` | Po kolika dnech odstranit stare zaznamy z historie | `90` |

Nastaveni `prune_after_days` umoznuje kontrolovat velikost tabulky historie cen v databazi. Hodnota `90` znamena, ze data starsi nez 90 dnu jsou automaticky odstranovana pres WP-Cron.

### Dane

| Moznost | Popis | Vychozi hodnota |
|-------|------|------------------|
| `include_tax` | Zda zobrazovana cena Omnibus ma obsahovat DPH | `true` |

Tato moznost by mela byt v souladu s nastavenim zobrazovani cen ve WooCommerce. Pokud jsou ceny v obchode zobrazovany s DPH, nastavte na `true`.

### Mista zobrazeni

| Moznost | Popis | Vychozi hodnota |
|-------|------|------------------|
| `display_on_sale_only` | Zobrazit pouze u produktu v akci | `true` |
| `show_on_single` | Stranka jednotliveho produktu | `true` |
| `show_on_loop` | Seznam produktu (kategorie, obchod) | `false` |
| `show_on_related` | Souvisejici produkty | `false` |
| `show_on_cart` | Kosik | `false` |

Doporuceni: aktivujte zobrazeni alespon na strance produktu (`show_on_single`). Zobrazeni na seznamu produktu (`show_on_loop`) muze zabrat hodne mista, ale nekterou interpretaci predpisu je vyzadovano.

### Regularni cena

| Moznost | Popis | Vychozi hodnota |
|-------|------|------------------|
| `show_regular_price` | Zobrazit take regularni cenu vedle ceny Omnibus | `false` |

### Sablona textu

| Moznost | Popis | Vychozi hodnota |
|-------|------|------------------|
| `display_text` | Sablona zobrazovane zpravy | `Najniższa cena z {days} dni przed obniżką: {price}` |
| `no_history_text` | Text kdyz neni historie cen | `Brak danych o wcześniejszej cenie` |

Dostupne promenne v sablone `display_text`:

- `{price}` - nejnizsi cena za dane obdobi
- `{days}` - pocet dnu (vychozi 30)
- `{date}` - datum nejnizsi ceny
- `{regular_price}` - regularni cena produktu (pred akci)

#### Priklady sablon

```
Najniższa cena z {days} dni przed obniżką: {price}
```

```
Najniższa cena z ostatnich {days} dni: {price} (cena regularna: {regular_price})
```

```
Omnibus: {price} (z dnia {date})
```

### Zpusob pocitani ceny

| Moznost | Popis | Vychozi hodnota |
|-------|------|------------------|
| `price_count_from` | Od kdy pocitat 30 dni | `sale_start` |

Dostupne hodnoty:

- `sale_start` - od data zahajeni akce (doporuceno UOKiK)
- `current_date` - od aktualniho data

### Variantni produkty

| Moznost | Popis | Vychozi hodnota |
|-------|------|------------------|
| `variable_tracking` | Zpusob sledovani variant | `per_variation` |

Dostupne hodnoty:

- `per_variation` - samostatne sledovani kazde varianty (doporuceno)
- `parent_only` - sledovani pouze ceny hlavniho produktu

Nastaveni `per_variation` zajistuje presnejsi data, protoze kazda varianta muze mit jinou cenu a historii slev.

## Shortcode

Pouzijte shortcode `[polski_omnibus_price]` pro zobrazeni informace o nejnizsi cene na libovolnem miste webu.

### Zakladni pouziti

```
[polski_omnibus_price]
```

Zobrazi cenu Omnibus pro aktualni produkt.

### S parametry

```
[polski_omnibus_price product_id="456" days="30"]
```

### Parametry shortcode

| Parametr | Popis | Vychozi hodnota |
|----------|------|------------------|
| `product_id` | ID produktu | Aktualni produkt |
| `days` | Pocet dnu | Hodnota z nastaveni |

### Priklad pouziti v sablone PHP

```php
echo do_shortcode('[polski_omnibus_price product_id="' . $product_id . '"]');
```

## Automaticke cisteni historie

Plugin registruje ulohu WP-Cron, ktera denne odstrankuje zaznamy historie cen starsi nez hodnota `prune_after_days`. Diky tomu tabulka v databazi neroste bez omezeni.

Pro rucni vynuceni cisteni muzete pouzit WP-CLI:

```bash
wp cron event run polski_omnibus_prune
```

## Soulad s predpisy UOKiK

Urad ochrany hospodarke souteze a spotrebitelu uvadi, ze:

1. Informace o nejnizsi cene musi byt zobrazena **u kazdeho oznameni o sleve**
2. Referencni obdobi je **30 dnu pred uplatnenim slevy**
3. Pro produkty prodavane kratsi dobu nez 30 dnu - uvedte nejnizsi cenu od dne zavedeni do prodeje
4. Pro produkty podlehajici rychle zkaze - mozne zkraceni obdobi

Plugin se ve vychozim stavu ridi temito pokyny. Moznost `price_count_from` nastavena na `sale_start` zajistuje pocitani od data zahajeni akce v souladu s doporucenim UOKiK.

## Reseni problemu

**Cena Omnibus se nezobrazuje**
Zkontrolujte, zda je produkt oznacen jako "v akci" ve WooCommerce (akcni cena musi byt nastavena). Pokud je moznost `display_on_sale_only` aktivovana, zprava se objevi pouze pri aktivni akci.

**Zobrazuje se zprava o chybejici historii**
Sledovani cen zacina od aktivace modulu. Pockejte na prvni zmenu ceny nebo rucne ulozte produkt pro inicializaci zaznamu v historii.

**Cena Omnibus je stejna jako akcni cena**
Toto je spravne chovani, pokud produkt nemel nizsi cenu v poslednich 30 dnech.

## Dalsi kroky

- Hlaseni problemu: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskuse a otazky: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
