---
title: WP-CLI príkazy
description: WP-CLI príkazy dostupné v Polski for WooCommerce - migrácia údajov a test správnosti konfigurácie.
---

WP-CLI príkazy na správu pluginu z príkazového riadka. Automatizuj migrácie údajov a overuj konfiguráciu.

## Požiadavky

- WordPress s aktívnym pluginom Polski for WooCommerce
- [WP-CLI](https://wp-cli.org/) vo verzii 2.5 alebo novšej
- SSH prístup k serveru alebo lokálne vývojové prostredie

## wp polski migrate

Migrácia údajov pri aktualizácii pluginu alebo prenose obchodu.

### Syntax

```bash
wp polski migrate [<migration>] [--dry-run] [--force] [--batch-size=<number>]
```

### Argumenty

| Argument       | Typ    | Vyžadovaný | Popis                             |
| -------------- | ------ | -------- | --------------------------------- |
| `<migration>`  | string | Nie      | Názov migrácie (vynechaj = všetky čakajúce) |

### Možnosti

| Možnosť          | Popis                                         |
| ---------------- | --------------------------------------------- |
| `--dry-run`      | Zobraz plán migrácie bez vykonania zmien      |
| `--force`        | Vynúť opätovné vykonanie migrácie             |
| `--batch-size=N` | Počet záznamov spracovaných v jednej dávke (predvolene 100) |

### Dostupné migrácie

| Názov migrácie            | Popis                                        |
| ------------------------- | -------------------------------------------- |
| `omnibus_price_history`   | Migrácia histórie cien Omnibus do novej tabuľky |
| `checkboxes_v2`           | Aktualizácia štruktúry checkboxov na v2      |
| `gpsr_meta`               | Migrácia údajov GPSR do nového formátu meta  |
| `wishlist_to_db`          | Prenos zoznamov želaní z usermeta do vyhradenej tabuľky |
| `delivery_time_format`    | Aktualizácia formátu času doručenia          |
| `badges_cache_rebuild`    | Obnova cache označení produktov              |
| `search_index`            | Prebudovanie indexu AJAX vyhľadávania        |

### Príklady

Zobraz čakajúce migrácie:

```bash
wp polski migrate --dry-run
```

Výsledok:

```
Čakajúce migrácie:
  1. omnibus_price_history - Migrácia histórie cien (cca 5200 záznamov)
  2. checkboxes_v2 - Aktualizácia checkboxov (3 záznamy)
Spolu: 2 migrácie
Režim dry-run - žiadne zmeny neboli vykonané.
```

Vykonaj všetky čakajúce migrácie:

```bash
wp polski migrate
```

Výsledok:

```
Vykonávanie migrácie: omnibus_price_history...
  Spracovanie dávky 1/52 (100 záznamov)...
  Spracovanie dávky 2/52 (100 záznamov)...
  ...
  Migrácia omnibus_price_history dokončená. Zmigrovaných 5200 záznamov.

Vykonávanie migrácie: checkboxes_v2...
  Migrácia checkboxes_v2 dokončená. Zmigrované 3 záznamy.

Všetky migrácie úspešne dokončené.
```

Vykonaj konkrétnu migráciu s väčšou dávkou:

```bash
wp polski migrate omnibus_price_history --batch-size=500
```

Vynúť opätovné vykonanie migrácie:

```bash
wp polski migrate search_index --force
```

### Spracovanie chýb

Ak sa migrácia skončí chybou, plugin:

1. Zobrazí podrobnú chybovú správu
2. Vráti zmeny z aktuálnej dávky (rollback)
3. Uloží log do `wp-content/debug.log` (ak je `WP_DEBUG_LOG` zapnutý)
4. Zapamätá si bod prerušenia - ďalšie spustenie pokračuje od miesta chyby

```bash
wp polski migrate omnibus_price_history
```

Výsledok pri chybe:

```
Vykonávanie migrácie: omnibus_price_history...
  Spracovanie dávky 23/52 (100 záznamov)...
  CHYBA: Nie je možné uložiť záznam #2345 - narušenie integrity údajov.
  Rollback dávky 23 vykonaný.
  Migrácia prerušená. Spusti znova, aby pokračovala od dávky 23.
```

## wp polski smoke-test

Testuje konfiguráciu obchodu: moduly, právne stránky, checkboxy a integrácie.

### Syntax

```bash
wp polski smoke-test [--module=<module>] [--format=<format>] [--verbose]
```

### Možnosti

| Možnosť            | Popis                                     |
| ------------------- | ----------------------------------------- |
| `--module=<module>` | Testuj len vybraný modul                  |
| `--format=<format>` | Formát výstupu: table (predvolene), json, csv |
| `--verbose`         | Podrobné informácie o každom teste        |

### Testované prvky

| Modul              | Testy                                              |
| ------------------- | -------------------------------------------------- |
| `compliance`        | Právne stránky, checkboxy, GPSR, Omnibus, DSA      |
| `checkout`          | Tlačidlo objednávky, polia NIP, DOI                |
| `prices`            | Jednotkové ceny, DPH, čas doručenia                |
| `food`              | Výživové hodnoty, alergény, Nutri-Score            |
| `storefront`        | Wishlist, porovnávač, vyhľadávač, filtre, slider   |
| `integrations`      | REST API, šablóny, cache, cron                     |

### Príklady

Plný test:

```bash
wp polski smoke-test
```

Výsledok:

```
Polski for WooCommerce - Smoke Test
====================================

+---------------------+---------------------------+--------+
| Modul               | Test                      | Status |
+---------------------+---------------------------+--------+
| compliance          | Obchodné podmienky        | OK     |
| compliance          | Ochrana osobných údajov   | OK     |
| compliance          | Checkboxy pokladne        | OK     |
| compliance          | Údaje GPSR                | WARN   |
| compliance          | Cena Omnibus              | OK     |
| compliance          | Formulár DSA              | OK     |
| checkout            | Označenie tlačidla        | OK     |
| checkout            | Pole NIP                  | OK     |
| checkout            | Double opt-in             | OFF    |
| prices              | Jednotková cena           | OK     |
| prices              | Informácia DPH            | OK     |
| prices              | Čas doručenia             | WARN   |
| storefront          | AJAX vyhľadávač           | OK     |
| storefront          | AJAX filtre               | OK     |
| integrations        | REST API                  | OK     |
| integrations        | Šablóny témy              | OK     |
| integrations        | Cache transient           | OK     |
| integrations        | WP-Cron                   | OK     |
+---------------------+---------------------------+--------+

Výsledok: 15 OK, 2 WARN, 1 OFF
```

Statusy:
- **OK** - test prešiel úspešne
- **WARN** - upozornenie, vyžaduje kontrolu
- **FAIL** - kritická chyba
- **OFF** - modul vypnutý

Test konkrétneho modulu s podrobnosťami:

```bash
wp polski smoke-test --module=compliance --verbose
```

Výsledok:

```
Test: compliance/obchodne-podmienky
  ID stránky: 45
  Status: publish
  Posledná aktualizácia: 2025-06-01
  Počet slov: 3200
  Výsledok: OK

Test: compliance/gpsr
  Produkty s GPSR: 142/350 (40.6%)
  Bez údajov GPSR: 208 produktov
  Výsledok: WARN - Nie všetky produkty majú vyplnené údaje GPSR
```

Export do JSON (napr. pre CI/CD):

```bash
wp polski smoke-test --format=json
```

```json
{
  "timestamp": "2025-06-15T12:00:00+02:00",
  "total_tests": 18,
  "passed": 15,
  "warnings": 2,
  "failed": 0,
  "disabled": 1,
  "tests": [
    {
      "module": "compliance",
      "test": "terms_page",
      "status": "ok",
      "message": "Obchodné podmienky publikované (ID: 45)"
    }
  ]
}
```

## Integrácia s CI/CD

Príkaz `smoke-test` vracia príslušný návratový kód:

| Kód | Popis                   |
| --- | ----------------------- |
| 0   | Všetky testy OK         |
| 1   | Upozornenia (WARN)      |
| 2   | Kritické chyby (FAIL)   |

Príklad použitia v GitHub Actions:

```yaml
- name: Polski smoke test
  run: wp polski smoke-test --format=json > smoke-test-results.json
  continue-on-error: false
```

Príklad v bash skripte:

```bash
#!/bin/bash
wp polski smoke-test --format=json > /tmp/smoke-test.json

EXIT_CODE=$?
if [ $EXIT_CODE -eq 2 ]; then
    echo "Testy Polski FAILED - skontroluj konfiguráciu"
    exit 1
elif [ $EXIT_CODE -eq 1 ]; then
    echo "Testy Polski WARN - skontroluj upozornenia"
fi
```

## Multisite

Príkazy podporujú WordPress Multisite. Uveď stránku flagom `--url`:

```bash
wp polski smoke-test --url=obchod1.tvojadomena.sk
wp polski migrate --url=obchod2.tvojadomena.sk
```

Hlásenie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informatívny charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
