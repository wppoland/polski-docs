---
title: WP-CLI prikazy
description: WP-CLI prikazy dostupne v Polski for WooCommerce - migrace dat a test spravnosti konfigurace.
---

WP-CLI prikazy pro spravu pluginu z prikazoveho radku. Automatizujte migrace dat a overujte spravnost konfigurace.

## Pozadavky

- WordPress s aktivnim pluginem Polski for WooCommerce
- [WP-CLI](https://wp-cli.org/) ve verzi 2.5 nebo novejsi
- SSH pristup k serveru nebo lokalni vyvojove prostredi

## wp polski migrate

Prikaz migrace dat pri aktualizaci pluginu nebo prenosu obchodu.

### Syntaxe

```bash
wp polski migrate [<migration>] [--dry-run] [--force] [--batch-size=<number>]
```

### Argumenty

| Argument | Typ | Povinny | Popis |
| -------------- | ------ | -------- | --------------------------------- |
| `<migration>` | string | Ne | Nazev migrace (vynechte = vsechny cekajici) |

### Moznosti

| Moznost | Popis |
| ---------------- | --------------------------------------------- |
| `--dry-run` | Zobrazi plan migrace bez provedeni zmen |
| `--force` | Vynuti opetovne provedeni migrace |
| `--batch-size=N` | Pocet zaznamu zpracovanych v jedne davce (vychozi 100) |

### Dostupne migrace

| Nazev migrace | Popis |
| ------------------------- | -------------------------------------------- |
| `omnibus_price_history` | Migrace historie cen Omnibus do nove tabulky |
| `checkboxes_v2` | Aktualizace struktury checkboxu na v2 |
| `gpsr_meta` | Migrace dat GPSR do noveho formatu meta |
| `wishlist_to_db` | Preneseni wishlistu z usermeta do vyhrazene tabulky |
| `delivery_time_format` | Aktualizace formatu doby dodani |
| `badges_cache_rebuild` | Prestavba cache stitku produktu |
| `search_index` | Prestavba indexu AJAX vyhledavani |

### Priklady

Zobrazit cekajici migrace:

```bash
wp polski migrate --dry-run
```

Provest vsechny cekajici migrace:

```bash
wp polski migrate
```

Provest konkretni migraci s vetsi davkou:

```bash
wp polski migrate omnibus_price_history --batch-size=500
```

## wp polski smoke-test

Prikaz testujici spravnost konfigurace obchodu. Kontroluje vsechny moduly pluginu, pravni stranky, checkboxy a integrace.

### Syntaxe

```bash
wp polski smoke-test [--module=<module>] [--format=<format>] [--verbose]
```

### Moznosti

| Moznost | Popis |
| ------------------- | ----------------------------------------- |
| `--module=<module>` | Testuj pouze vybrany modul |
| `--format=<format>` | Format vystupu: table (vychozi), json, csv |
| `--verbose` | Podrobne informace o kazdem testu |

### Testovane elementy

| Modul | Testy |
| ------------------- | -------------------------------------------------- |
| `compliance` | Pravni stranky, checkboxy, GPSR, Omnibus, DSA |
| `checkout` | Tlacitko objednavky, pole NIP, DOI |
| `prices` | Jednotkove ceny, DPH, doba dodani |
| `food` | Vyzivove hodnoty, alergeny, Nutri-Score |
| `storefront` | Wishlist, porovnavac, vyhledavac, filtry, slider |
| `integrations` | REST API, sablony, cache, cron |

### Priklady

Uplny test:

```bash
wp polski smoke-test
```

Test konkretniho modulu s podrobnostmi:

```bash
wp polski smoke-test --module=compliance --verbose
```

Export do JSON (napr. pro CI/CD):

```bash
wp polski smoke-test --format=json
```

## Integrace s CI/CD

Prikaz `smoke-test` vraci prislusny kod ukonceni:

| Kod | Popis |
| --- | ----------------------- |
| 0 | Vsechny testy OK |
| 1 | Varovani (WARN) |
| 2 | Kriticke chyby (FAIL) |

Priklad pouziti v GitHub Actions:

```yaml
- name: Polski smoke test
  run: wp polski smoke-test --format=json > smoke-test-results.json
  continue-on-error: false
```

## Multisite

WP-CLI prikazy podporuji instalace WordPress Multisite. Pouzijte flag `--url` pro ukazani na konkretni web:

```bash
wp polski smoke-test --url=sklep1.twojadomena.pl
wp polski migrate --url=sklep2.twojadomena.pl
```

Hlaseni problemu: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
