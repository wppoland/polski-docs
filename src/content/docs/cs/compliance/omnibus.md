---
title: Smernice Omnibus - sledovani cen
description: Implementace Smernice Omnibus v Polski for WooCommerce - automaticke sledovani nejnizsi ceny za 30 dni, konfigurace zobrazovani a shortcode.
---

Smernice Omnibus (EU 2019/2161) plati v Polsku od 1. ledna 2023. Pri kazde sleve musite ukazat nejnizsi cenu za poslednich 30 dni. Plugin automaticky sleduje historii cen a zobrazuje tuto informaci u akci.

## Jak funguje sledovani cen

Plugin zapisuje kazdou zmenu ceny produktu (vcetne variant) do databaze. Kdyz je produkt "v akci", plugin vypocita nejnizsi cenu za 30 dni a ukaze ji zakaznikum.

Sledovani zacina po aktivaci modulu. Pokud produkt jeste nema historii cen, zobrazi se nahradni zprava.

![Stranka produktu se zobrazenou nejnizsi cenou Omnibus](../../../../assets/screenshots/screenshot-4-omnibus-lowest-price.png)

## Konfigurace

Prejdete do **WooCommerce > Nastaveni > Polski > Omnibus** a nakonfigurujte dostupne moznosti.

### Obdobi sledovani

| Moznost | Popis | Vychozi hodnota |
|-------|------|------------------|
| `days` | Pocet dnu zpet pro vypocet nejnizsi ceny | `30` |
| `prune_after_days` | Po kolika dnech odstranit stare zaznamy z historie | `90` |

`prune_after_days` kontroluje velikost tabulky v databazi. Hodnota `90` znamena, ze data starsi nez 90 dni se automaticky mazou.

### Dane

| Moznost | Popis | Vychozi hodnota |
|-------|------|------------------|
| `include_tax` | Zda zobrazovana cena Omnibus ma obsahovat DPH | `true` |

Nastavte v souladu s nastavenim cen ve WooCommerce. Pokud jsou ceny v obchode s DPH, nechte `true`.

### Mista zobrazeni

| Moznost | Popis | Vychozi hodnota |
|-------|------|------------------|
| `display_on_sale_only` | Zobrazit pouze u produktu v akci | `true` |
| `show_on_single` | Stranka jednotliveho produktu | `true` |
| `show_on_loop` | Seznam produktu (kategorie, obchod) | `false` |
| `show_on_related` | Souvisejici produkty | `false` |
| `show_on_cart` | Kosik | `false` |

Aktivujte minimalne na strance produktu (`show_on_single`). Na seznamu produktu (`show_on_loop`) zabira vice mista, ale nektere interpretace predpisu to vyzaduji.

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

`per_variation` dava presnejsi data, protoze kazda varianta muze mit jinou cenu a historii slev.

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

WP-Cron denne maze zaznamy historie cen starsi nez `prune_after_days`. Tabulka v databazi neroste bez omezeni.

Pro rucni vynuceni cisteni pouzijte WP-CLI:

```bash
wp cron event run polski_omnibus_prune
```

## Soulad s predpisy UOKiK

Pokyny UOKiK:

1. Informace o nejnizsi cene musi byt zobrazena **u kazdeho oznameni o sleve**
2. Referencni obdobi je **30 dnu pred uplatnenim slevy**
3. Pro produkty prodavane kratsi dobu nez 30 dnu - uvedte nejnizsi cenu od dne zavedeni do prodeje
4. Pro produkty podlehajici rychle zkaze - mozne zkraceni obdobi

Plugin ve vychozim stavu dodrzuje tyto pokyny. Moznost `price_count_from` na `sale_start` pocita od data zahajeni akce v souladu s doporucenimi UOKiK.

## Reseni problemu

**Cena Omnibus se nezobrazuje**
Zkontrolujte, zda ma produkt nastavenou akcni cenu ve WooCommerce. Pri aktivovane moznosti `display_on_sale_only` se zprava objevi pouze pri aktivni akci.

**Zobrazuje se zprava o chybejici historii**
Sledovani cen zacina po aktivaci modulu. Pockejte na zmenu ceny nebo ulozte produkt znovu pro pridani prvniho zaznamu do historie.

**Cena Omnibus je stejna jako akcni cena**
Toto je spravne chovani, pokud produkt nemel nizsi cenu v poslednich 30 dnech.

## Dalsi kroky

- Hlaseni problemu: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskuse a otazky: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
