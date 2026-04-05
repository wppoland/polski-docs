---
title: WP-CLI-Befehle
description: WP-CLI-Befehle in Polski for WooCommerce - Datenmigration und Konfigurationstest.
---

WP-CLI-Befehle zur Plugin-Verwaltung ueber die Kommandozeile. Automatisieren Sie Datenmigrationen und pruefen Sie die Konfiguration.

## Anforderungen

- WordPress mit aktivem Plugin Polski for WooCommerce
- [WP-CLI](https://wp-cli.org/) in Version 2.5 oder neuer
- SSH-Zugang zum Server oder lokale Entwicklungsumgebung

## wp polski migrate

Befehl zur Datenmigration bei Plugin-Updates oder Shop-Umzuegen.

### Syntax

```bash
wp polski migrate [<migration>] [--dry-run] [--force] [--batch-size=<number>]
```

### Argumente

| Argument       | Typ    | Erforderlich | Beschreibung                              |
| -------------- | ------ | -------- | --------------------------------- |
| `<migration>`  | string | Nein      | Migrationsname (auslassen = alle ausstehenden) |

### Optionen

| Option            | Beschreibung                                          |
| ---------------- | --------------------------------------------- |
| `--dry-run`      | Migrationsplan anzeigen ohne Aenderungen durchzufuehren  |
| `--force`        | Erneute Ausfuehrung der Migration erzwingen             |
| `--batch-size=N` | Anzahl der pro Batch verarbeiteten Datensaetze (Standard 100) |

### Verfuegbare Migrationen

| Migrationsname            | Beschreibung                                         |
| ------------------------- | -------------------------------------------- |
| `omnibus_price_history`   | Migration der Omnibus-Preishistorie in neue Tabelle |
| `checkboxes_v2`           | Aktualisierung der Checkbox-Struktur auf v2      |
| `gpsr_meta`               | Migration der GPSR-Daten in neues Meta-Format  |
| `wishlist_to_db`          | Verschiebung der Wunschlisten von usermeta in dedizierte Tabelle |
| `delivery_time_format`    | Aktualisierung des Lieferzeitformats           |
| `badges_cache_rebuild`    | Neuaufbau des Label-Caches             |
| `search_index`            | Neuaufbau des AJAX-Suchindex         |

### Beispiele

Ausstehende Migrationen anzeigen:

```bash
wp polski migrate --dry-run
```

Alle ausstehenden Migrationen ausfuehren:

```bash
wp polski migrate
```

Bestimmte Migration mit groesserem Batch:

```bash
wp polski migrate omnibus_price_history --batch-size=500
```

Erneute Ausfuehrung einer Migration erzwingen:

```bash
wp polski migrate search_index --force
```

## wp polski smoke-test

Befehl zum Testen der Shop-Konfigurationskorrektheit. Prueft alle Plugin-Module, Rechtsseiten, Checkboxen und Integrationen.

### Syntax

```bash
wp polski smoke-test [--module=<module>] [--format=<format>] [--verbose]
```

### Optionen

| Option              | Beschreibung                                      |
| ------------------- | ----------------------------------------- |
| `--module=<module>` | Nur gewaehltes Modul testen                |
| `--format=<format>` | Ausgabeformat: table (Standard), json, csv |
| `--verbose`         | Detaillierte Informationen zu jedem Test    |

### Getestete Elemente

| Modul              | Tests                                              |
| ------------------- | -------------------------------------------------- |
| `compliance`        | Rechtsseiten, Checkboxen, GPSR, Omnibus, DSA       |
| `checkout`          | Bestellbutton, NIP-Felder, DOI                 |
| `prices`            | Grundpreise, MwSt., Lieferzeit                |
| `food`              | Naehrwerte, Allergene, Nutri-Score            |
| `storefront`        | Wunschliste, Vergleich, Suche, Filter, Slider |
| `integrations`      | REST API, Templates, Cache, Cron                     |

### Beispiele

Vollstaendiger Test:

```bash
wp polski smoke-test
```

Test eines bestimmten Moduls mit Details:

```bash
wp polski smoke-test --module=compliance --verbose
```

Export als JSON (z.B. fuer CI/CD):

```bash
wp polski smoke-test --format=json
```

## CI/CD-Integration

Der Befehl `smoke-test` gibt den entsprechenden Exit-Code zurueck:

| Code | Beschreibung                    |
| --- | ----------------------- |
| 0   | Alle Tests OK      |
| 1   | Warnungen (WARN)     |
| 2   | Kritische Fehler (FAIL) |

Beispiel fuer GitHub Actions:

```yaml
- name: Polski smoke test
  run: wp polski smoke-test --format=json > smoke-test-results.json
  continue-on-error: false
```

## Multisite

WP-CLI-Befehle unterstuetzen WordPress-Multisite-Installationen. Verwenden Sie das Flag `--url` zur Angabe einer bestimmten Seite:

```bash
wp polski smoke-test --url=shop1.ihredomain.pl
wp polski migrate --url=shop2.ihredomain.pl
```

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
