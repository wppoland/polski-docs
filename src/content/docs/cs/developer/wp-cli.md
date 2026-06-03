---
title: Příkazy WP-CLI
description: Příkazy WP-CLI dostupné v Polski for WooCommerce - migrace dat a test správnosti konfigurace.
---

Příkazy WP-CLI pro správu pluginu z příkazové řádky. Automatizujte migrace dat a ověřujte konfiguraci.

## Požadavky

- WordPress s aktivním pluginem Polski for WooCommerce
- [WP-CLI](https://wp-cli.org/) ve verzi 2.5 nebo novější
- SSH přístup k serveru nebo lokální vývojové prostředí

## wp polski migrate

Migrace dat při aktualizaci pluginu nebo přenosu obchodu.

### Syntaxe

```bash
wp polski migrate [<migration>] [--dry-run] [--force] [--batch-size=<number>]
```

### Argumenty

| Argument       | Typ    | Povinný  | Popis                             |
| -------------- | ------ | -------- | --------------------------------- |
| `<migration>`  | string | Ne       | Název migrace (vynechte = všechny čekající) |

### Možnosti

| Možnost          | Popis                                         |
| ---------------- | --------------------------------------------- |
| `--dry-run`      | Zobrazí plán migrace bez provedení změn       |
| `--force`        | Vynutí opětovné provedení migrace             |
| `--batch-size=N` | Počet záznamů zpracovaných v jedné dávce (výchozí 100) |

### Dostupné migrace

| Název migrace             | Popis                                        |
| ------------------------- | -------------------------------------------- |
| `omnibus_price_history`   | Migrace historie cen Omnibus do nové tabulky |
| `checkboxes_v2`           | Aktualizace struktury checkboxů na v2        |
| `gpsr_meta`               | Migrace dat GPSR do nového formátu meta      |
| `wishlist_to_db`          | Přenesení seznamů přání z usermeta do vyhrazené tabulky |
| `delivery_time_format`    | Aktualizace formátu doby dodání              |
| `badges_cache_rebuild`    | Přestavba cache štítků produktů              |
| `search_index`            | Přestavba indexu AJAX vyhledávání            |

### Příklady

Zobrazit čekající migrace:

```bash
wp polski migrate --dry-run
```

Výsledek:

```
Čekající migrace:
  1. omnibus_price_history - Migrace historie cen (cca 5200 záznamů)
  2. checkboxes_v2 - Aktualizace checkboxů (3 záznamy)
Celkem: 2 migrace
Režim dry-run - žádné změny nebyly provedeny.
```

Provést všechny čekající migrace:

```bash
wp polski migrate
```

Výsledek:

```
Provádění migrace: omnibus_price_history...
  Zpracování dávky 1/52 (100 záznamů)...
  Zpracování dávky 2/52 (100 záznamů)...
  ...
  Migrace omnibus_price_history dokončena. Migrováno 5200 záznamů.

Provádění migrace: checkboxes_v2...
  Migrace checkboxes_v2 dokončena. Migrovány 3 záznamy.

Všechny migrace úspěšně dokončeny.
```

Provést konkrétní migraci s větší dávkou:

```bash
wp polski migrate omnibus_price_history --batch-size=500
```

Vynutit opětovné provedení migrace:

```bash
wp polski migrate search_index --force
```

### Zpracování chyb

Pokud migrace skončí chybou, plugin:

1. Zobrazí podrobnou chybovou zprávu
2. Vrátí změny z aktuální dávky (rollback)
3. Uloží log do `wp-content/debug.log` (pokud je `WP_DEBUG_LOG` zapnutý)
4. Zapamatuje si bod přerušení - další spuštění pokračuje od místa chyby

```bash
wp polski migrate omnibus_price_history
```

Výsledek při chybě:

```
Provádění migrace: omnibus_price_history...
  Zpracování dávky 23/52 (100 záznamů)...
  CHYBA: Nelze uložit záznam #2345 - porušení integrity dat.
  Rollback dávky 23 proveden.
  Migrace přerušena. Spusťte znovu pro pokračování od dávky 23.
```

## wp polski smoke-test

Testuje konfiguraci obchodu: moduly, právní stránky, checkboxy a integrace.

### Syntaxe

```bash
wp polski smoke-test [--module=<module>] [--format=<format>] [--verbose]
```

### Možnosti

| Možnost             | Popis                                     |
| ------------------- | ----------------------------------------- |
| `--module=<module>` | Testuj pouze vybraný modul                |
| `--format=<format>` | Formát výstupu: table (výchozí), json, csv |
| `--verbose`         | Podrobné informace o každém testu         |

### Testované elementy

| Modul               | Testy                                              |
| ------------------- | -------------------------------------------------- |
| `compliance`        | Právní stránky, checkboxy, GPSR, Omnibus, DSA      |
| `checkout`          | Tlačítko objednávky, pole NIP, DOI                 |
| `prices`            | Jednotkové ceny, DPH, doba dodání                  |
| `food`              | Výživové hodnoty, alergeny, Nutri-Score            |
| `storefront`        | Seznam přání, porovnávač, vyhledávač, filtry, slider |
| `integrations`      | REST API, šablony, cache, cron                     |

### Příklady

Úplný test:

```bash
wp polski smoke-test
```

Výsledek:

```
Polski for WooCommerce - Smoke Test
====================================

+---------------------+---------------------------+--------+
| Modul               | Test                      | Stav   |
+---------------------+---------------------------+--------+
| compliance          | Obchodní podmínky         | OK     |
| compliance          | Zásady ochrany údajů      | OK     |
| compliance          | Checkboxy pokladny        | OK     |
| compliance          | Data GPSR                 | WARN   |
| compliance          | Cena Omnibus              | OK     |
| compliance          | Formulář DSA              | OK     |
| checkout            | Popisek tlačítka          | OK     |
| checkout            | Pole NIP                  | OK     |
| checkout            | Double opt-in             | OFF    |
| prices              | Jednotková cena           | OK     |
| prices              | Informace DPH             | OK     |
| prices              | Doba dodání               | WARN   |
| storefront          | AJAX vyhledávač           | OK     |
| storefront          | AJAX filtry               | OK     |
| integrations        | REST API                  | OK     |
| integrations        | Šablony motivu            | OK     |
| integrations        | Cache transient           | OK     |
| integrations        | WP-Cron                   | OK     |
+---------------------+---------------------------+--------+

Výsledek: 15 OK, 2 WARN, 1 OFF
```

Stavy:
- **OK** - test prošel úspěšně
- **WARN** - varování, vyžaduje kontrolu
- **FAIL** - kritická chyba
- **OFF** - modul vypnutý

Test konkrétního modulu s podrobnostmi:

```bash
wp polski smoke-test --module=compliance --verbose
```

Výsledek:

```
Test: compliance/obchodni-podminky
  ID stránky: 45
  Stav: publish
  Poslední aktualizace: 2025-06-01
  Počet slov: 3200
  Výsledek: OK

Test: compliance/gpsr
  Produkty s GPSR: 142/350 (40.6%)
  Chybí data GPSR: 208 produktů
  Výsledek: WARN - Ne všechny produkty mají vyplněna data GPSR
```

Export do JSON (např. pro CI/CD):

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
      "message": "Obchodní podmínky publikovány (ID: 45)"
    }
  ]
}
```

## Integrace s CI/CD

Příkaz `smoke-test` vrací odpovídající kód ukončení:

| Kód | Popis                   |
| --- | ----------------------- |
| 0   | Všechny testy OK        |
| 1   | Varování (WARN)         |
| 2   | Kritické chyby (FAIL)   |

Příklad použití v GitHub Actions:

```yaml
- name: Polski smoke test
  run: wp polski smoke-test --format=json > smoke-test-results.json
  continue-on-error: false
```

Příklad ve skriptu bash:

```bash
#!/bin/bash
wp polski smoke-test --format=json > /tmp/smoke-test.json

EXIT_CODE=$?
if [ $EXIT_CODE -eq 2 ]; then
    echo "Testy Polski FAILED - zkontrolujte konfiguraci"
    exit 1
elif [ $EXIT_CODE -eq 1 ]; then
    echo "Testy Polski WARN - zkontrolujte varování"
fi
```

## Multisite

Příkazy podporují WordPress Multisite. Web určete flagem `--url`:

```bash
wp polski smoke-test --url=sklep1.twojadomena.pl
wp polski migrate --url=sklep2.twojadomena.pl
```

Hlášení problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
