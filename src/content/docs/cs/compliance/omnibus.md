---
title: Směrnice Omnibus - sledování cen
description: Implementace Směrnice Omnibus v Polski for WooCommerce - automatické sledování nejnižší ceny za 30 dnů, konfigurace zobrazování a shortcode.
---

Směrnice Omnibus (EU 2019/2161) platí v Polsku od 1. ledna 2023. Při každém zlevnění musíte ukázat nejnižší cenu za posledních 30 dnů. Plugin automaticky sleduje historii cen a zobrazuje tuto informaci u akcí.

## Jak funguje sledování cen

Plugin zapisuje do databáze každou změnu ceny produktu (včetně variant). Když je produkt "v akci", plugin vypočítá nejnižší cenu za 30 dnů a ukáže ji zákazníkům.

Sledování začíná po zapnutí modulu. Pokud produkt ještě nemá historii cen, zobrazí se náhradní zpráva.

![Stránka produktu se zobrazenou nejnižší cenou Omnibus](../../../../assets/screenshots/screenshot-4-omnibus-lowest-price.png)

## Konfigurace

Přejděte do **WooCommerce > Nastavení > Polski > Omnibus** a nakonfigurujte dostupné možnosti.

### Období sledování

| Možnost | Popis | Výchozí hodnota |
|-------|------|------------------|
| `days` | Počet dnů zpět pro výpočet nejnižší ceny | `30` |
| `prune_after_days` | Po kolika dnech odstranit staré záznamy z historie | `90` |

`prune_after_days` kontroluje velikost tabulky v databázi. Hodnota `90` znamená, že data starší než 90 dnů se automaticky mažou.

### Daně

| Možnost | Popis | Výchozí hodnota |
|-------|------|------------------|
| `include_tax` | Zda má zobrazovaná cena Omnibus obsahovat DPH | `true` |

Nastavte v souladu s nastavením cen ve WooCommerce. Pokud jsou ceny v obchodě s DPH, nechte `true`.

### Místa zobrazení

| Možnost | Popis | Výchozí hodnota |
|-------|------|------------------|
| `display_on_sale_only` | Zobrazit pouze u produktů v akci | `true` |
| `show_on_single` | Stránka jednotlivého produktu | `true` |
| `show_on_loop` | Seznam produktů (kategorie, obchod) | `false` |
| `show_on_related` | Související produkty | `false` |
| `show_on_cart` | Košík | `false` |

Zapněte minimálně na stránce produktu (`show_on_single`). Na seznamu produktů (`show_on_loop`) zabírá více místa, ale některé interpretace předpisů to vyžadují.

### Regulérní cena

| Možnost | Popis | Výchozí hodnota |
|-------|------|------------------|
| `show_regular_price` | Zobrazit také regulérní cenu vedle ceny Omnibus | `false` |

### Šablona textu

| Možnost | Popis | Výchozí hodnota |
|-------|------|------------------|
| `display_text` | Šablona zobrazované zprávy | `Najniższa cena z {days} dni przed obniżką: {price}` |
| `no_history_text` | Text, když není historie cen | `Brak danych o wcześniejszej cenie` |

Dostupné proměnné v šabloně `display_text`:

- `{price}` - nejnižší cena za dané období
- `{days}` - počet dnů (výchozí 30)
- `{date}` - datum nejnižší ceny
- `{regular_price}` - regulérní cena produktu (před akcí)

#### Příklady šablon

```
Najniższa cena z {days} dni przed obniżką: {price}
```

```
Najniższa cena z ostatnich {days} dni: {price} (cena regularna: {regular_price})
```

```
Omnibus: {price} (z dnia {date})
```

### Způsob počítání ceny

| Možnost | Popis | Výchozí hodnota |
|-------|------|------------------|
| `price_count_from` | Od kdy počítat 30 dnů | `sale_start` |

Dostupné hodnoty:

- `sale_start` - od data zahájení akce (doporučeno UOKiK)
- `current_date` - od aktuálního data

### Variantní produkty

| Možnost | Popis | Výchozí hodnota |
|-------|------|------------------|
| `variable_tracking` | Způsob sledování variant | `per_variation` |

Dostupné hodnoty:

- `per_variation` - samostatné sledování každé varianty (doporučeno)
- `parent_only` - sledování pouze ceny nadřazeného produktu

`per_variation` poskytuje přesnější data, protože každá varianta může mít jinou cenu a historii zlevnění.

## Shortcode

Použijte shortcode `[polski_omnibus_price]` pro zobrazení informace o nejnižší ceně na libovolném místě webu.

### Základní použití

```
[polski_omnibus_price]
```

Zobrazí cenu Omnibus pro aktuální produkt.

### S parametry

```
[polski_omnibus_price product_id="456" days="30"]
```

### Parametry shortcode

| Parametr | Popis | Výchozí hodnota |
|----------|------|------------------|
| `product_id` | ID produktu | Aktuální produkt |
| `days` | Počet dnů | Hodnota z nastavení |

### Příklad použití v šabloně PHP

```php
echo do_shortcode('[polski_omnibus_price product_id="' . $product_id . '"]');
```

## Automatické čištění historie

WP-Cron denně maže záznamy historie cen starší než `prune_after_days`. Tabulka v databázi neroste bez omezení.

Pro ruční vynucení čištění můžete použít WP-CLI:

```bash
wp cron event run polski_omnibus_prune
```

## Soulad s předpisy UOKiK

Pokyny UOKiK:

1. Informace o nejnižší ceně musí být zobrazena **u každého oznámení o zlevnění**
2. Referenční období je **30 dnů před uplatněním slevy**
3. Pro produkty prodávané kratší dobu než 30 dnů uveďte nejnižší cenu od dne uvedení do prodeje
4. Pro produkty podléhající rychlé zkáze je možné zkrácení období

Plugin ve výchozím stavu dodržuje tyto pokyny. Možnost `price_count_from` nastavená na `sale_start` počítá od data zahájení akce, v souladu s doporučeními UOKiK.

## Řešení problémů

**Cena Omnibus se nezobrazuje**
Zkontrolujte, zda má produkt nastavenou akční cenu ve WooCommerce. Při zapnuté možnosti `display_on_sale_only` se zpráva objeví pouze při aktivní akci.

**Zobrazuje se zpráva o chybějící historii**
Sledování cen začíná po zapnutí modulu. Počkejte na změnu ceny nebo uložte produkt znovu, abyste přidali první záznam do historie.

**Cena Omnibus je stejná jako akční cena**
Toto je správné chování, pokud produkt neměl nižší cenu v posledních 30 dnech.

## Další kroky

- Nahlašujte problémy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskuse a dotazy: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
