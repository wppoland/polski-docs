---
title: WP-CLI-Befehle
description: WP-CLI-Befehle in Polski for WooCommerce - Datenmigration und Test der Konfiguration auf Korrektheit.
---

WP-CLI-Befehle zur Verwaltung des Plugins über die Befehlszeile. Automatisiere Datenmigrationen und überprüfe die Konfiguration.

## Voraussetzungen

- WordPress mit aktivem Plugin Polski for WooCommerce
- [WP-CLI](https://wp-cli.org/) in der Version 2.5 oder neuer
- SSH-Zugang zum Server oder eine lokale Entwicklungsumgebung

## wp polski migrate

Datenmigration beim Plugin-Update oder beim Umzug des Shops.

### Syntax

```bash
wp polski migrate [<migration>] [--dry-run] [--force] [--batch-size=<number>]
```

### Argumente

| Argument       | Typ    | Erforderlich | Beschreibung                      |
| -------------- | ------ | ------------ | --------------------------------- |
| `<migration>`  | string | Nein         | Name der Migration (weglassen = alle ausstehenden) |

### Optionen

| Option           | Beschreibung                                  |
| ---------------- | --------------------------------------------- |
| `--dry-run`      | Migrationsplan anzeigen, ohne Änderungen vorzunehmen |
| `--force`        | Erzwingt die erneute Ausführung der Migration |
| `--batch-size=N` | Anzahl der pro Stapel verarbeiteten Datensätze (Standard 100) |

### Verfügbare Migrationen

| Name der Migration        | Beschreibung                                 |
| ------------------------- | -------------------------------------------- |
| `omnibus_price_history`   | Migration der Omnibus-Preishistorie in die neue Tabelle |
| `checkboxes_v2`           | Aktualisierung der Checkbox-Struktur auf v2  |
| `gpsr_meta`               | Migration der GPSR-Daten in das neue Meta-Format |
| `wishlist_to_db`          | Übertragung der Wunschlisten von usermeta in eine dedizierte Tabelle |
| `delivery_time_format`    | Aktualisierung des Lieferzeitformats         |
| `badges_cache_rebuild`    | Neuaufbau des Cache der Produktabzeichen     |
| `search_index`            | Neuaufbau des AJAX-Suchindex                 |

### Beispiele

Ausstehende Migrationen anzeigen:

```bash
wp polski migrate --dry-run
```

Ergebnis:

```
Ausstehende Migrationen:
  1. omnibus_price_history - Migration der Preishistorie (ca. 5200 Datensätze)
  2. checkboxes_v2 - Aktualisierung der Checkboxen (3 Datensätze)
Insgesamt: 2 Migrationen
Dry-Run-Modus - es wurden keine Änderungen vorgenommen.
```

Alle ausstehenden Migrationen ausführen:

```bash
wp polski migrate
```

Ergebnis:

```
Migration wird ausgeführt: omnibus_price_history...
  Stapel 1/52 wird verarbeitet (100 Datensätze)...
  Stapel 2/52 wird verarbeitet (100 Datensätze)...
  ...
  Migration omnibus_price_history abgeschlossen. 5200 Datensätze migriert.

Migration wird ausgeführt: checkboxes_v2...
  Migration checkboxes_v2 abgeschlossen. 3 Datensätze migriert.

Alle Migrationen erfolgreich abgeschlossen.
```

Eine bestimmte Migration mit größerem Stapel ausführen:

```bash
wp polski migrate omnibus_price_history --batch-size=500
```

Erneute Ausführung einer Migration erzwingen:

```bash
wp polski migrate search_index --force
```

### Fehlerbehandlung

Wenn eine Migration mit einem Fehler endet, wird das Plugin:

1. Eine detaillierte Fehlermeldung anzeigen
2. Die Änderungen des aktuellen Stapels rückgängig machen (Rollback)
3. Ein Protokoll in `wp-content/debug.log` speichern (wenn `WP_DEBUG_LOG` aktiviert ist)
4. Den Unterbrechungspunkt merken - die nächste Ausführung setzt an der Fehlerstelle fort

```bash
wp polski migrate omnibus_price_history
```

Ergebnis bei einem Fehler:

```
Migration wird ausgeführt: omnibus_price_history...
  Stapel 23/52 wird verarbeitet (100 Datensätze)...
  FEHLER: Datensatz #2345 kann nicht gespeichert werden - Verletzung der Datenintegrität.
  Rollback von Stapel 23 durchgeführt.
  Migration unterbrochen. Erneut ausführen, um ab Stapel 23 fortzusetzen.
```

## wp polski smoke-test

Testet die Konfiguration des Shops: Module, Rechtsseiten, Checkboxen und Integrationen.

### Syntax

```bash
wp polski smoke-test [--module=<module>] [--format=<format>] [--verbose]
```

### Optionen

| Option              | Beschreibung                              |
| ------------------- | ----------------------------------------- |
| `--module=<module>` | Nur das ausgewählte Modul testen          |
| `--format=<format>` | Ausgabeformat: table (Standard), json, csv |
| `--verbose`         | Detaillierte Informationen zu jedem Test  |

### Getestete Elemente

| Modul               | Tests                                              |
| ------------------- | -------------------------------------------------- |
| `compliance`        | Rechtsseiten, Checkboxen, GPSR, Omnibus, DSA       |
| `checkout`          | Bestellbutton, NIP-Felder, DOI                     |
| `prices`            | Grundpreise, MwSt., Lieferzeit                     |
| `food`              | Nährwerte, Allergene, Nutri-Score                  |
| `storefront`        | Wishlist, Vergleich, Suche, Filter, Slider         |
| `integrations`      | REST API, Templates, Cache, Cron                   |

### Beispiele

Vollständiger Test:

```bash
wp polski smoke-test
```

Ergebnis:

```
Polski for WooCommerce - Smoke Test
====================================

+---------------------+---------------------------+--------+
| Modul               | Test                      | Status |
+---------------------+---------------------------+--------+
| compliance          | Shop-AGB                  | OK     |
| compliance          | Datenschutzerklärung      | OK     |
| compliance          | Checkboxen an der Kasse   | OK     |
| compliance          | GPSR-Daten                | WARN   |
| compliance          | Omnibus-Preis             | OK     |
| compliance          | DSA-Formular              | OK     |
| checkout            | Button-Label              | OK     |
| checkout            | NIP-Feld                  | OK     |
| checkout            | Double-Opt-in             | OFF    |
| prices              | Grundpreis                | OK     |
| prices              | MwSt.-Hinweis             | OK     |
| prices              | Lieferzeit                | WARN   |
| storefront          | AJAX-Suche                | OK     |
| storefront          | AJAX-Filter               | OK     |
| integrations        | REST API                  | OK     |
| integrations        | Theme-Templates           | OK     |
| integrations        | Transient-Cache           | OK     |
| integrations        | WP-Cron                   | OK     |
+---------------------+---------------------------+--------+

Ergebnis: 15 OK, 2 WARN, 1 OFF
```

Status:
- **OK** - Test erfolgreich bestanden
- **WARN** - Warnung, Überprüfung erforderlich
- **FAIL** - kritischer Fehler
- **OFF** - Modul deaktiviert

Test eines bestimmten Moduls mit Details:

```bash
wp polski smoke-test --module=compliance --verbose
```

Ergebnis:

```
Test: compliance/agb
  Seiten-ID: 45
  Status: publish
  Letzte Aktualisierung: 2025-06-01
  Wortanzahl: 3200
  Ergebnis: OK

Test: compliance/gpsr
  Produkte mit GPSR: 142/350 (40.6%)
  Keine GPSR-Daten: 208 Produkte
  Ergebnis: WARN - Nicht alle Produkte haben ausgefüllte GPSR-Daten
```

Export nach JSON (z. B. für CI/CD):

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
      "message": "Shop-AGB veröffentlicht (ID: 45)"
    }
  ]
}
```

## Integration mit CI/CD

Der Befehl `smoke-test` gibt einen entsprechenden Exit-Code zurück:

| Code | Beschreibung            |
| ---- | ----------------------- |
| 0    | Alle Tests OK           |
| 1    | Warnungen (WARN)        |
| 2    | Kritische Fehler (FAIL) |

Beispiel für die Verwendung in GitHub Actions:

```yaml
- name: Polski smoke test
  run: wp polski smoke-test --format=json > smoke-test-results.json
  continue-on-error: false
```

Beispiel in einem Bash-Skript:

```bash
#!/bin/bash
wp polski smoke-test --format=json > /tmp/smoke-test.json

EXIT_CODE=$?
if [ $EXIT_CODE -eq 2 ]; then
    echo "Polski-Tests FAILED - Konfiguration prüfen"
    exit 1
elif [ $EXIT_CODE -eq 1 ]; then
    echo "Polski-Tests WARN - Warnungen prüfen"
fi
```

## Multisite

Die Befehle unterstützen WordPress Multisite. Gib die Seite mit dem Flag `--url` an:

```bash
wp polski smoke-test --url=shop1.deinedomain.de
wp polski migrate --url=shop2.deinedomain.de
```

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
