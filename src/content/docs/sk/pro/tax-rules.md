---
title: Daňové pravidlá
description: Engine pravidiel na automatické priraďovanie kódov GTU, JPK_V7 a daňových tried k produktom WooCommerce.
---

Modul daňových pravidiel umožňuje zautomatizovať priraďovanie kódov GTU, kódov JPK_V7, daňových tried a kategórií/štítkov k produktom WooCommerce na základe pravidiel podmienka/akcia. Funguje pri uložení produktu, v dennom crone aj manuálne (dry run + run now).

:::note[Požiadavky]
Polski PRO vyžaduje: Polski (free) v1.6.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Ako to funguje

1. Vytvoríte pravidlo: názov, režim zhody (all/any), podmienky, akcie, spúšťače a prioritu.
2. Engine kontroluje podmienky voči každému produktu a aplikuje akcie, ak pravidlo pasuje.
3. Každé aplikovanie pravidla sa zaznamenáva do audit logu (kto, čo, kedy, dry run alebo naživo).
4. Spúšťače:
   - **Pri uložení produktu** - pravidlo sa spustí po vytvorení alebo úprave produktu
   - **Denne** - pravidlo funguje v nočnom crone na celom katalógu
   - **Týždenne** - pravidlo funguje raz za týždeň (WP cron)
   - **Mesačne** - pravidlo funguje raz za 30 dní (WP cron)
   - **Ručne** - pravidlo sa spustí iba z úrovne panela (Dry run / Run now)

## Konfigurácia

Prejdite do **WooCommerce > Daňové pravidlá** a kliknite na **Pridať pravidlo**.

### Polia pravidla

| Pole | Popis |
|------|------|
| Názov | Popisný názov pre tím (napr. "Knihy -> GTU_12") |
| Zapnuté | Pravidlo môžete dočasne vypnúť bez odstránenia |
| Režim zhody | `all` - všetky podmienky musia pasovať, `any` - stačí jedna |
| Spúšťače | Kedy pravidlo funguje (uloženie / cron / ručne) |
| Priorita | Poradie spúšťania, vzostupne (10 je predvolená hodnota) |

### Podmienky

Formát: `field | operator | value | key` (posledné pole voliteľné).

Príklady polí: `title`, `sku`, `price`, `regular_price`, `stock_quantity`, `stock_status`, `category`, `tag`, `type`, `attribute`, `tax_class`, `meta_field`, `gtu_code`, `jpk_v7_code`, `taxonomy`.

Pole `taxonomy` podporuje ľubovoľnú vlastnú taxonómiu (napr. `product_brand`, `pwb-brand`). Do poľa `key` zadajte slug taxonómie, do `value` zoznam ID termov:

```
taxonomy | in | 12,34,56 | product_brand
```

Operátory: `equals`, `not_equals`, `contains`, `not_contains`, `starts_with`, `ends_with`, `gt`, `gte`, `lt`, `lte`, `in`, `not_in`, `is_empty`, `is_not_empty`.

Príklady:

```
title | contains | kniha
price | gte | 100
category | in | 42,56,78
meta_field | equals | ano | _polski_tabletka
```

### Akcie

Formát: `action_type | value`.

| Akcia | Popis | Príklad |
|-------|------|---------|
| `set_gtu_code` | Priraďuje kód GTU k produktu | `set_gtu_code \| GTU_06` |
| `remove_gtu_code` | Odstraňuje kód GTU | `remove_gtu_code \| ` |
| `set_jpk_v7_code` | Priraďuje kód JPK_V7 | `set_jpk_v7_code \| GTU_12` |
| `set_tax_class` | Nastavuje daňovú triedu WooCommerce | `set_tax_class \| reduced-rate` |
| `add_category` | Pridáva produkt do kategórie | `add_category \| 42` |
| `add_tag` | Pridáva štítok | `add_tag \| 77` |
| `set_meta_field` | Nastavuje meta pole | `set_meta_field \| _polski_custom:nejaky-znacnik` |
| `mark_receipt_with_nip` | Označuje produkt ako vyžadujúci doklad s NIP | `mark_receipt_with_nip \| 1` |

### Dry run a Audit log

Každé pravidlo má v paneli tlačidlá:

- **Dry run** - prejde všetky produkty a zaznamená do logu, čo by sa zmenilo, bez zmien v databáze.
- **Run now** - aplikuje pravidlo na celý katalóg a uloží zmeny.

Záložka **Audit log** zobrazuje posledných 200 aplikovaní pravidiel: dátum, pravidlo, produkt, či sa zhodlo, či dry run a aplikované akcie.

## Príklady

### Všetky knihy -> JPK_V7 `GTU_12`

- Režim zhody: `any`
- Podmienka: `category | in | <ID kategórie Knihy>`
- Podmienka: `title | contains | kniha`
- Akcia: `set_jpk_v7_code | GTU_12`

### Lieky -> znížená sadzba VAT 8%

- Režim zhody: `all`
- Podmienka: `category | equals | <ID kategórie Lieky>`
- Akcia: `set_tax_class | reduced-rate`
- Akcia: `set_gtu_code | GTU_09`

### Služby > 15 000 PLN -> doklad s NIP vyžadovaný

- Režim zhody: `all`
- Podmienka: `type | equals | service`
- Podmienka: `price | gte | 15000`
- Akcia: `mark_receipt_with_nip | 1`

## Integrácie

Priradené kódy GTU a JPK_V7 sa ukladajú ako meta produktov a môžu byť využité:

- modulom fakturovania (Faktúra VAT PDF + KSeF)
- exportom JPK_VAT
- účtovnými integráciami (wFirma, Fakturownia, iFirma)

## Smart Pickers (pomocník v editore)

V hornej časti editora pravidla panel **Insert helper** umožňuje pridávať riadky podmienok a akcií bez ručného zadávania ID. Dostupné pickery:

- **Kategória** - zoznam všetkých `product_cat` (Select2, vyhľadávač). Tlačidlá: "Append as condition" (pridá `category | in | <ID>`) a "Append as action" (pridá `add_category | <ID>`).
- **Štítok** - analogicky pre `product_tag`.
- **Daňová trieda** - zoznam daňových tried WooCommerce (Standard + všetky dodatočné). Pickery: `set_tax_class | <slug>` a `tax_class | equals | <slug>`.
- **Kód GTU** - dropdown `GTU_01` - `GTU_13`. Tri tlačidlá: pridanie ako `set_gtu_code`, `set_jpk_v7_code` alebo podmienky `gtu_code | equals | <CODE>`.

Textarea zostáva zdrojom pravdy - pickery iba dopisujú hotové riadky.

## Skupiny pravidiel

Každé pravidlo môže mať voliteľný **štítok skupiny** (pole `group_label` v editore). Skupiny sa používajú iba na organizáciu a filtrovanie v paneli - neovplyvňujú fungovanie pravidiel. Príklady skupín: "Knihy", "Lieky", "Potraviny VAT 5%", "Vybavenie - GTU_06".

## Vyhľadávanie a filtrovanie

Zoznam pravidiel v paneli podporuje:

- **Vyhľadávanie** podľa názvu pravidla (nezávislé od veľkosti písmen)
- **Filter stavu**: enabled / disabled
- **Filter spúšťača**: on_save / daily / manual
- **Filter skupiny** (viditeľný iba ak sú priradené štítky)

## Import / export pravidiel

V záložke **Import / export**:

- **Export** - stiahne všetky pravidlá ako prenosný súbor JSON (formát `polski.tax_rules`, v1). Používajte na zálohu alebo migráciu medzi obchodmi.
- **Import** - nahrá skôr exportovaný JSON. Pravidlá sú vždy **pridávané** (nikdy neprepisujú existujúce podľa ID), takže môžete bezpečne spájať pravidlá z viacerých obchodov.

Súbor JSON má štruktúru:

```json
{
  "format": "polski.tax_rules",
  "version": 1,
  "exported_at": "2026-04-19T12:00:00+00:00",
  "rules": [
    {
      "name": "Ksiazki -> GTU_12",
      "group_label": "Ksiazki",
      "enabled": true,
      "match_mode": "all",
      "priority": 10,
      "triggers": ["on_save"],
      "conditions": [
        { "field": "category", "operator": "in", "value": [42], "key": null }
      ],
      "actions": [
        { "type": "set_jpk_v7_code", "value": "GTU_12" }
      ]
    }
  ]
}
```

## WP-CLI

Pre veľké obchody a automatizáciu:

```bash
# Zoznam pravidiel
wp polski tax-rules list
wp polski tax-rules list --format=json

# Spusti pravidlo #3 v režime dry-run
wp polski tax-rules run 3 --dry-run

# Spusti pravidlo #3 naživo (dávky po 100 produktov)
wp polski tax-rules run 3 --batch-size=100

# Export pravidiel do súboru
wp polski tax-rules export --file=/tmp/rules.json

# Import zo súboru
wp polski tax-rules import /tmp/rules.json
```

## Hromadná akcia v zozname produktov

V štandardnom zozname produktov WooCommerce (`wp-admin/edit.php?post_type=product`) sú v dropdowne "Hromadné akcie" dostupné dve položky:

- **Apply tax rules** - spustí všetky aktívne pravidlá na označených produktoch.
- **Dry-run tax rules** - reportuje, čo by sa zmenilo, bez uloženia.

Po vykonaní panel zobrazí oznámenie s počtom spracovaných produktov, zhôd a zmien.

## Limity a výkon

- Denný cron spracúva katalóg v dávkach po 50 produktov.
- Log je obmedzený na 10 000 riadkov - staršie sa automaticky mažú.
- Engine sa chráni pred rekurziou: pravidlo sa nespúšťa viackrát počas interného uloženia produktu.

:::caution
Vždy otestujte nové pravidlo v režime **Dry run**, kým ho spustíte na celom katalógu. Po zmene daňovej triedy / kódu JPK je potrebné znova prepočítať faktúry a exporty.
:::
