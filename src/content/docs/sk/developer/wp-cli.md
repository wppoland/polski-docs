---
title: WP-CLI príkazy
description: WP-CLI príkazy dostupné v Polski for WooCommerce - migrácia údajov a test správnosti konfigurácie.
---

WP-CLI príkazy na správu pluginu z príkazového riadku. Automatizujte migrácie údajov a overujte konfiguráciu.

## Požiadavky

- WordPress s aktívnym pluginom Polski for WooCommerce
- [WP-CLI](https://wp-cli.org/) vo verzii 2.5 alebo novšej
- SSH prístup k serveru alebo lokálne vývojové prostredie

## wp polski migrate

Príkaz migrácie údajov pri aktualizácii pluginu alebo prenose obchodu.

### Syntax

```bash
wp polski migrate [<migration>] [--dry-run] [--force] [--batch-size=<number>]
```

### Argumenty

| Argument       | Typ    | Povinný | Popis                              |
| -------------- | ------ | -------- | --------------------------------- |
| `<migration>`  | string | Nie      | Názov migrácie (vynechať = všetky čakajúce) |

### Možnosti

| Možnosť          | Popis                                          |
| ---------------- | --------------------------------------------- |
| `--dry-run`      | Zobrazí plán migrácie bez vykonania zmien      |
| `--force`        | Vynúti opätovné vykonanie migrácie             |
| `--batch-size=N` | Počet záznamov spracovaných v jednej dávke (štandardne 100) |

### Dostupné migrácie

| Názov migrácie            | Popis                                         |
| ------------------------- | -------------------------------------------- |
| `omnibus_price_history`   | Migrácia histórie cien Omnibus do novej tabuľky |
| `checkboxes_v2`           | Aktualizácia štruktúry checkboxov na v2       |
| `gpsr_meta`               | Migrácia údajov GPSR do nového formátu meta   |
| `wishlist_to_db`          | Prenesenie zoznamov prianí z usermeta do špeciálnej tabuľky |
| `delivery_time_format`    | Aktualizácia formátu dodacej lehoty           |
| `badges_cache_rebuild`    | Obnova cache etikiet produktov                |
| `search_index`            | Prebudovanie indexu AJAX vyhľadávania         |

### Príklady

Zobrazenie čakajúcich migrácií:

```bash
wp polski migrate --dry-run
```

Vykonanie všetkých čakajúcich migrácií:

```bash
wp polski migrate
```

Vykonanie konkrétnej migrácie s väčšou dávkou:

```bash
wp polski migrate omnibus_price_history --batch-size=500
```

Vynútenie opätovného vykonania migrácie:

```bash
wp polski migrate search_index --force
```

## wp polski smoke-test

Príkaz testujúci správnosť konfigurácie obchodu. Kontroluje všetky moduly pluginu, právne stránky, checkboxy a integrácie.

### Syntax

```bash
wp polski smoke-test [--module=<module>] [--format=<format>] [--verbose]
```

### Možnosti

| Možnosť              | Popis                                      |
| ------------------- | ----------------------------------------- |
| `--module=<module>` | Testovať len vybraný modul                 |
| `--format=<format>` | Formát výstupu: table (štandardne), json, csv |
| `--verbose`         | Podrobné informácie o každom teste          |

### Testované prvky

| Modul              | Testy                                              |
| ------------------- | -------------------------------------------------- |
| `compliance`        | Právne stránky, checkboxy, GPSR, Omnibus, DSA       |
| `checkout`          | Tlačidlo objednávky, polia NIP, DOI                 |
| `prices`            | Jednotkové ceny, DPH, dodacia lehota                |
| `food`              | Výživové hodnoty, alergény, Nutri-Score              |
| `storefront`        | Wishlist, porovnávač, vyhľadávač, filtre, slider    |
| `integrations`      | REST API, šablóny, cache, cron                       |

### Príklady

Úplný test:

```bash
wp polski smoke-test
```

Test konkrétneho modulu s podrobnosťami:

```bash
wp polski smoke-test --module=compliance --verbose
```

Export do JSON (napr. pre CI/CD):

```bash
wp polski smoke-test --format=json
```

## Integrácia s CI/CD

Príkaz `smoke-test` vracia príslušný kód ukončenia:

| Kód | Popis                    |
| --- | ----------------------- |
| 0   | Všetky testy OK          |
| 1   | Varovania (WARN)         |
| 2   | Kritické chyby (FAIL)   |

Príklad použitia v GitHub Actions:

```yaml
- name: Polski smoke test
  run: wp polski smoke-test --format=json > smoke-test-results.json
  continue-on-error: false
```

## Multisite

WP-CLI príkazy podporujú inštalácie WordPress Multisite. Použite príznak `--url` na určenie konkrétnej stránky:

```bash
wp polski smoke-test --url=obchod1.vasadomena.pl
wp polski migrate --url=obchod2.vasadomena.pl
```

Nahlasovanie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
