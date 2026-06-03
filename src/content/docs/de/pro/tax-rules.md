---
title: Steuerregeln
description: Regel-Engine zur automatischen Zuweisung von GTU-Codes, JPK_V7-Codes und Steuerklassen zu WooCommerce-Produkten.
---

Das Modul Steuerregeln ermoeglicht die Automatisierung der Zuweisung von GTU-Codes, JPK_V7-Codes, Steuerklassen sowie Kategorien/Tags zu WooCommerce-Produkten auf Basis von Bedingungs-/Aktionsregeln. Es funktioniert beim Speichern eines Produkts, im taeglichen Cron und manuell (Dry Run + Run Now).

:::note[Voraussetzungen]
Polski PRO erfordert: Polski (free) v1.6.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## So funktioniert es

1. Du erstellst eine Regel: Name, Abgleichsmodus (all/any), Bedingungen, Aktionen, Trigger und Prioritaet.
2. Die Engine prueft die Bedingungen gegen jedes Produkt und wendet die Aktionen an, wenn die Regel passt.
3. Jede Anwendung einer Regel wird im Audit-Log gespeichert (wer, was, wann, Dry Run oder live).
4. Trigger:
   - **Beim Speichern des Produkts** - die Regel wird nach dem Erstellen oder Bearbeiten eines Produkts ausgefuehrt
   - **Taeglich** - die Regel laeuft im naechtlichen Cron auf dem gesamten Katalog
   - **Woechentlich** - die Regel laeuft einmal pro Woche (WP-Cron)
   - **Monatlich** - die Regel laeuft einmal alle 30 Tage (WP-Cron)
   - **Manuell** - die Regel wird nur aus dem Panel ausgeloest (Dry Run / Run Now)

## Konfiguration

Gehe zu **WooCommerce > Steuerregeln** und klicke auf **Regel hinzufuegen**.

### Felder der Regel

| Feld | Beschreibung |
|------|------|
| Name | Beschreibender Name fuer das Team (z. B. "Buecher -> GTU_12") |
| Aktiviert | Du kannst eine Regel voruebergehend deaktivieren, ohne sie zu loeschen |
| Abgleichsmodus | `all` - alle Bedingungen muessen passen, `any` - eine genuegt |
| Trigger | Wann die Regel laeuft (Speichern / Cron / manuell) |
| Prioritaet | Reihenfolge der Ausfuehrung, aufsteigend (10 ist der Standardwert) |

### Bedingungen

Format: `field | operator | value | key` (das letzte Feld ist optional).

Beispielfelder: `title`, `sku`, `price`, `regular_price`, `stock_quantity`, `stock_status`, `category`, `tag`, `type`, `attribute`, `tax_class`, `meta_field`, `gtu_code`, `jpk_v7_code`, `taxonomy`.

Das Feld `taxonomy` unterstuetzt jede benutzerdefinierte Taxonomie (z. B. `product_brand`, `pwb-brand`). Trage im Feld `key` den Slug der Taxonomie ein, in `value` die Liste der Term-IDs:

```
taxonomy | in | 12,34,56 | product_brand
```

Operatoren: `equals`, `not_equals`, `contains`, `not_contains`, `starts_with`, `ends_with`, `gt`, `gte`, `lt`, `lte`, `in`, `not_in`, `is_empty`, `is_not_empty`.

Beispiele:

```
title | contains | ksiazka
price | gte | 100
category | in | 42,56,78
meta_field | equals | tak | _polski_tabletka
```

### Aktionen

Format: `action_type | value`.

| Aktion | Beschreibung | Beispiel |
|-------|------|---------|
| `set_gtu_code` | Weist dem Produkt einen GTU-Code zu | `set_gtu_code \| GTU_06` |
| `remove_gtu_code` | Entfernt den GTU-Code | `remove_gtu_code \| ` |
| `set_jpk_v7_code` | Weist einen JPK_V7-Code zu | `set_jpk_v7_code \| GTU_12` |
| `set_tax_class` | Setzt die WooCommerce-Steuerklasse | `set_tax_class \| reduced-rate` |
| `add_category` | Fuegt das Produkt einer Kategorie hinzu | `add_category \| 42` |
| `add_tag` | Fuegt einen Tag hinzu | `add_tag \| 77` |
| `set_meta_field` | Setzt ein Meta-Feld | `set_meta_field \| _polski_custom:jakis-znacznik` |
| `mark_receipt_with_nip` | Markiert das Produkt als beleg-mit-NIP-pflichtig | `mark_receipt_with_nip \| 1` |

### Dry Run und Audit-Log

Jede Regel hat im Panel Schaltflaechen:

- **Dry Run** - durchlaeuft alle Produkte und speichert im Log, was geaendert wuerde, ohne Aenderungen in der Datenbank.
- **Run Now** - wendet die Regel auf den gesamten Katalog an und speichert die Aenderungen.

Der Reiter **Audit-Log** zeigt die letzten 200 Regelanwendungen: Datum, Regel, Produkt, ob abgeglichen, ob Dry Run, sowie die angewendeten Aktionen.

## Beispiele

### Alle Buecher -> JPK_V7 `GTU_12`

- Abgleichsmodus: `any`
- Bedingung: `category | in | <ID der Kategorie Buecher>`
- Bedingung: `title | contains | ksiazka`
- Aktion: `set_jpk_v7_code | GTU_12`

### Medikamente -> reduzierter MwSt.-Satz 8%

- Abgleichsmodus: `all`
- Bedingung: `category | equals | <ID der Kategorie Medikamente>`
- Aktion: `set_tax_class | reduced-rate`
- Aktion: `set_gtu_code | GTU_09`

### Dienstleistungen > 15 000 PLN -> Beleg mit NIP erforderlich

- Abgleichsmodus: `all`
- Bedingung: `type | equals | service`
- Bedingung: `price | gte | 15000`
- Aktion: `mark_receipt_with_nip | 1`

## Integrationen

Zugewiesene GTU- und JPK_V7-Codes werden als Produkt-Meta gespeichert und koennen genutzt werden von:

- dem Rechnungsmodul (Rechnung MwSt. PDF + KSeF)
- dem JPK_VAT-Export
- Buchhaltungsintegrationen (wFirma, Fakturownia, iFirma)

## Smart Pickers (Helfer im Editor)

Oben im Regel-Editor ermoeglicht das Panel **Insert helper**, Bedingungs- und Aktionszeilen hinzuzufuegen, ohne IDs manuell einzugeben. Verfuegbare Picker:

- **Kategorie** - Liste aller `product_cat` (Select2, Suche). Schaltflaechen: "Append as condition" (fuegt `category | in | <ID>` hinzu) und "Append as action" (fuegt `add_category | <ID>` hinzu).
- **Tag** - analog fuer `product_tag`.
- **Steuerklasse** - Liste der WooCommerce-Steuerklassen (Standard + alle zusaetzlichen). Picker: `set_tax_class | <slug>` und `tax_class | equals | <slug>`.
- **GTU-Code** - Dropdown `GTU_01` - `GTU_13`. Drei Schaltflaechen: Hinzufuegen als `set_gtu_code`, `set_jpk_v7_code` oder Bedingung `gtu_code | equals | <CODE>`.

Das Textarea bleibt die Quelle der Wahrheit - die Picker fuegen nur fertige Zeilen hinzu.

## Regelgruppen

Jede Regel kann ein optionales **Gruppen-Label** haben (Feld `group_label` im Editor). Gruppen werden nur zur Organisation und Filterung im Panel verwendet - sie beeinflussen die Funktionsweise der Regeln nicht. Beispiele fuer Gruppen: "Buecher", "Medikamente", "Lebensmittel MwSt. 5%", "Ausstattung - GTU_06".

## Suche und Filterung

Die Regelliste im Panel unterstuetzt:

- **Suche** nach dem Regelnamen (unabhaengig von Gross-/Kleinschreibung)
- **Statusfilter**: enabled / disabled
- **Trigger-Filter**: on_save / daily / manual
- **Gruppenfilter** (nur sichtbar, wenn Labels zugewiesen sind)

## Import / Export von Regeln

Im Reiter **Import / export**:

- **Export** - laedt alle Regeln als portable JSON-Datei herunter (Format `polski.tax_rules`, v1). Nutze es fuer Sicherungskopien oder die Migration zwischen Shops.
- **Import** - laedt zuvor exportiertes JSON hoch. Regeln werden immer **angehaengt** (ueberschreiben nie bestehende nach ID), sodass Regeln aus mehreren Shops sicher zusammengefuehrt werden koennen.

Die JSON-Datei hat folgende Struktur:

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

Fuer grosse Shops und Automatisierung:

```bash
# Liste der Regeln
wp polski tax-rules list
wp polski tax-rules list --format=json

# Regel #3 im Dry-Run-Modus ausfuehren
wp polski tax-rules run 3 --dry-run

# Regel #3 live ausfuehren (Pakete zu je 100 Produkten)
wp polski tax-rules run 3 --batch-size=100

# Regeln in eine Datei exportieren
wp polski tax-rules export --file=/tmp/rules.json

# Aus einer Datei importieren
wp polski tax-rules import /tmp/rules.json
```

## Massenaktion in der Produktliste

In der Standard-Produktliste von WooCommerce (`wp-admin/edit.php?post_type=product`) sind im Dropdown "Massenaktionen" zwei Eintraege verfuegbar:

- **Apply tax rules** - fuehrt alle aktiven Regeln auf den markierten Produkten aus.
- **Dry-run tax rules** - meldet, was sich aendern wuerde, ohne zu speichern.

Nach der Ausfuehrung zeigt das Panel einen Hinweis mit der Anzahl der verarbeiteten Produkte, Abgleiche und Aenderungen.

## Limits und Leistung

- Der taegliche Cron verarbeitet den Katalog in Paketen zu je 50 Produkten.
- Das Log ist auf 10 000 Zeilen begrenzt - aeltere werden automatisch geloescht.
- Die Engine schuetzt sich vor Rekursion: Eine Regel wird waehrend des internen Speicherns eines Produkts nicht mehrfach ausgeloest.

:::caution
Teste eine neue Regel immer im **Dry Run** Modus, bevor du sie auf dem gesamten Katalog ausfuehrst. Nach einer Aenderung der Steuerklasse / des JPK-Codes muessen Rechnungen und Exporte neu berechnet werden.
:::
