---
title: Danova pravidla
description: Engine pravidel pro automaticke prirazovani kodu GTU, JPK_V7 a danovych trid k produktum WooCommerce.
---

Modul Danovych pravidel umoznuje automatizovat prirazovani kodu GTU, kodu JPK_V7, danovych trid a kategorii/tagu k produktum WooCommerce na zaklade pravidel typu podminka/akce. Funguje pri ulozeni produktu, v dennim cronu a take manualne (dry run + run now).

:::note[Pozadavky]
Polski PRO vyzaduje: Polski (free) v1.6.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Jak to funguje

1. Vytvorite pravidlo: nazev, rezim shody (all/any), podminky, akce, spoustece a prioritu.
2. Engine zkontroluje podminky vuci kazdemu produktu a aplikuje akce, pokud pravidlo odpovida.
3. Kazde pouziti pravidla se zapise do auditniho logu (kdo, co, kdy, dry run nebo naostro).
4. Spoustece:
   - **Pri ulozeni produktu** - pravidlo se spusti po vytvoreni nebo uprave produktu
   - **Denne** - pravidlo bezi v nocnim cronu na celem katalogu
   - **Tydne** - pravidlo bezi jednou tydne (WP cron)
   - **Mesicne** - pravidlo bezi jednou za 30 dni (WP cron)
   - **Rucne** - pravidlo se spousti pouze z administracniho panelu (Dry run / Run now)

## Konfigurace

Prejdete do **WooCommerce > Danova pravidla** a kliknete na **Pridat pravidlo**.

### Pole pravidla

| Pole | Popis |
|------|------|
| Nazev | Popisny nazev pro tym (napr. "Knihy -> GTU_12") |
| Zapnuto | Pravidlo lze docasne vypnout bez odstraneni |
| Rezim shody | `all` - musi odpovidat vsechny podminky, `any` - staci jedna |
| Spoustece | Kdy pravidlo bezi (ulozeni / cron / rucne) |
| Priorita | Poradi spousteni, vzestupne (10 je vychozi hodnota) |

### Podminky

Format: `field | operator | value | key` (posledni pole je volitelne).

Priklady poli: `title`, `sku`, `price`, `regular_price`, `stock_quantity`, `stock_status`, `category`, `tag`, `type`, `attribute`, `tax_class`, `meta_field`, `gtu_code`, `jpk_v7_code`, `taxonomy`.

Pole `taxonomy` podporuje libovolnou vlastni taxonomii (napr. `product_brand`, `pwb-brand`). Do pole `key` zadejte slug taxonomie, do `value` seznam ID termu:

```
taxonomy | in | 12,34,56 | product_brand
```

Operatory: `equals`, `not_equals`, `contains`, `not_contains`, `starts_with`, `ends_with`, `gt`, `gte`, `lt`, `lte`, `in`, `not_in`, `is_empty`, `is_not_empty`.

Priklady:

```
title | contains | kniha
price | gte | 100
category | in | 42,56,78
meta_field | equals | ano | _polski_tabletka
```

### Akce

Format: `action_type | value`.

| Akce | Popis | Priklad |
|-------|------|---------|
| `set_gtu_code` | Prirazuje kod GTU k produktu | `set_gtu_code \| GTU_06` |
| `remove_gtu_code` | Odstranuje kod GTU | `remove_gtu_code \| ` |
| `set_jpk_v7_code` | Prirazuje kod JPK_V7 | `set_jpk_v7_code \| GTU_12` |
| `set_tax_class` | Nastavuje danovou tridu WooCommerce | `set_tax_class \| reduced-rate` |
| `add_category` | Prida produkt do kategorie | `add_category \| 42` |
| `add_tag` | Prida tag | `add_tag \| 77` |
| `set_meta_field` | Nastavuje meta pole | `set_meta_field \| _polski_custom:jakysi-znacka` |
| `mark_receipt_with_nip` | Oznacuje produkt jako vyzadujici uctenku s NIP | `mark_receipt_with_nip \| 1` |

### Dry run a Audit log

Kazde pravidlo ma v panelu tlacitka:

- **Dry run** - projde vsechny produkty a zapise do logu, co by se zmenilo, bez zmen v databazi.
- **Run now** - aplikuje pravidlo na cely katalog a ulozi zmeny.

Zalozka **Audit log** zobrazuje poslednich 200 pouziti pravidel: datum, pravidlo, produkt, zda doslo ke shode, zda slo o dry run a aplikovane akce.

## Priklady

### Vsechny knihy -> JPK_V7 `GTU_12`

- Rezim shody: `any`
- Podminka: `category | in | <ID kategorie Knihy>`
- Podminka: `title | contains | kniha`
- Akce: `set_jpk_v7_code | GTU_12`

### Leky -> snizena sazba DPH 8%

- Rezim shody: `all`
- Podminka: `category | equals | <ID kategorie Leky>`
- Akce: `set_tax_class | reduced-rate`
- Akce: `set_gtu_code | GTU_09`

### Sluzby > 15 000 PLN -> uctenka s NIP vyzadovana

- Rezim shody: `all`
- Podminka: `type | equals | service`
- Podminka: `price | gte | 15000`
- Akce: `mark_receipt_with_nip | 1`

## Integrace

Prirazene kody GTU a JPK_V7 se ukladaji jako meta produktu a mohou byt vyuzity:

- modulem fakturace (Faktura VAT PDF + KSeF)
- exportem JPK_VAT
- ucetnimi integracemi (wFirma, Fakturownia, iFirma)

## Smart Pickers (pomocnik v editoru)

V horni casti editoru pravidla panel **Insert helper** umoznuje pridavat radky podminek a akci bez rucniho zadavani ID. Dostupne pickery:

- **Kategorie** - seznam vsech `product_cat` (Select2, vyhledavac). Tlacitka: "Append as condition" (prida `category | in | <ID>`) a "Append as action" (prida `add_category | <ID>`).
- **Tag** - analogicky pro `product_tag`.
- **Danova trida** - seznam danovych trid WooCommerce (Standard + vsechny dalsi). Pickery: `set_tax_class | <slug>` a `tax_class | equals | <slug>`.
- **Kod GTU** - dropdown `GTU_01` - `GTU_13`. Tri tlacitka: pridani jako `set_gtu_code`, `set_jpk_v7_code` nebo podminky `gtu_code | equals | <CODE>`.

Textarea zustava zdrojem pravdy - pickery pouze dopisuji hotove radky.

## Skupiny pravidel

Kazde pravidlo muze mit volitelny **stitek skupiny** (pole `group_label` v editoru). Skupiny se pouzivaji pouze pro organizaci a filtrovani v panelu - neovlivnuji fungovani pravidel. Priklady skupin: "Knihy", "Leky", "Potraviny DPH 5%", "Vybaveni - GTU_06".

## Vyhledavani a filtrovani

Seznam pravidel v panelu podporuje:

- **Vyhledavani** podle nazvu pravidla (nezavisle na velikosti pismen)
- **Filtr stavu**: enabled / disabled
- **Filtr spoustece**: on_save / daily / manual
- **Filtr skupiny** (viditelny pouze pokud jsou prirazene stitky)

## Import / export pravidel

V zalozce **Import / export**:

- **Export** - stahne vsechna pravidla jako prenosny soubor JSON (format `polski.tax_rules`, v1). Pouzivejte pro zalohu nebo migraci mezi obchody.
- **Import** - nahraje drive exportovany JSON. Pravidla jsou vzdy **pridavana** (nikdy neprepisuji existujici podle ID), takze lze bezpecne slucovat pravidla z vice obchodu.

Soubor JSON ma strukturu:

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

Pro velke obchody a automatizaci:

```bash
# Seznam pravidel
wp polski tax-rules list
wp polski tax-rules list --format=json

# Spustit pravidlo #3 v rezimu dry-run
wp polski tax-rules run 3 --dry-run

# Spustit pravidlo #3 naostro (davky po 100 produktech)
wp polski tax-rules run 3 --batch-size=100

# Export pravidel do souboru
wp polski tax-rules export --file=/tmp/rules.json

# Import ze souboru
wp polski tax-rules import /tmp/rules.json
```

## Hromadna akce v seznamu produktu

Ve standardnim seznamu produktu WooCommerce (`wp-admin/edit.php?post_type=product`) jsou v dropdownu "Hromadne akce" dostupne dve polozky:

- **Apply tax rules** - spousti vsechna aktivni pravidla na oznacenych produktech.
- **Dry-run tax rules** - reportuje, co by se zmenilo, bez ulozeni.

Po provedeni panel zobrazi notice s poctem zpracovanych produktu, shod a zmen.

## Limity a vykon

- Denni cron zpracovava katalog v davkach po 50 produktech.
- Log je omezen na 10 000 radku - starsi se automaticky mazou.
- Engine se chrani pred rekurzi: pravidlo se nespousti opakovane behem interniho ulozeni produktu.

:::caution
Vzdy otestujte nove pravidlo v rezimu **Dry run**, nez ho spustite na celem katalogu. Po zmene danove tridy / kodu JPK je treba znovu prepocitat faktury a exporty.
:::
