---
title: Steuerregeln
description: Regel-Engine zur automatischen Zuweisung von GTU-, JPK_V7-Codes und Steuerklassen zu WooCommerce-Produkten in Polski PRO.
---

Das Modul Steuerregeln automatisiert die Zuweisung von GTU-Codes, JPK_V7-Codes, WooCommerce-Steuerklassen, Kategorien/Schlagwoertern und eigenen Meta-Feldern zu Produkten mithilfe von Bedingung/Aktion-Regeln. Die Engine laeuft beim Speichern des Produkts, im geplanten Cron und manuell (Dry Run + Run Now).

:::note[Voraussetzungen]
Polski PRO benoetigt: Polski (free) v1.6.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Funktionsweise

1. Regel anlegen: Name, Match-Modus (all/any), Bedingungen, Aktionen, Trigger, Prioritaet.
2. Die Engine prueft Bedingungen gegen jedes Produkt und wendet Aktionen an, wenn die Regel zutrifft.
3. Jede Anwendung wird im Audit-Log festgehalten (wer/was/wann, Dry-Run oder live).
4. Trigger:
   - **Beim Speichern des Produkts** - die Regel laeuft nach Erstellung oder Aktualisierung.
   - **Taeglich** - die Regel laeuft im naechtlichen Cron gegen den gesamten Katalog.
   - **Woechentlich** - einmal pro Woche (WP-Cron).
   - **Monatlich** - einmal pro 30 Tage (WP-Cron).
   - **Manuell** - die Regel laeuft nur beim Klick auf Run / Dry Run im Adminbereich.

## Konfiguration

Oeffne **WooCommerce > Steuerregeln** und klicke **Regel hinzufuegen**.

### Regelfelder

| Feld | Beschreibung |
|------|--------------|
| Name | Sprechender Bezeichner (z. B. "Buecher -> GTU_12"). |
| Gruppe (optional) | Freies Label fuer Filter in der Liste. |
| Aktiviert | Regel temporaer ausschalten ohne sie zu loeschen. |
| Match-Modus | `all` - jede Bedingung muss zutreffen, `any` - mindestens eine. |
| Trigger | Wann die Regel laeuft (save / daily / weekly / monthly / manual). |
| Prioritaet | Ausfuehrungsreihenfolge, aufsteigend (Standard 10). |

### Bedingungen

Format: `field | operator | value | key` (letztes Feld optional).

Felder: `title`, `sku`, `price`, `regular_price`, `stock_quantity`, `stock_status`, `category`, `tag`, `type`, `attribute`, `tax_class`, `meta_field`, `gtu_code`, `jpk_v7_code`, `taxonomy`.

Operatoren: `equals`, `not_equals`, `contains`, `not_contains`, `starts_with`, `ends_with`, `gt`, `gte`, `lt`, `lte`, `in`, `not_in`, `is_empty`, `is_not_empty`.

Das Feld `taxonomy` akzeptiert jede benutzerdefinierte Taxonomie; den Slug in `key`, eine Liste von Term-IDs in `value`:

```
taxonomy | in | 12,34,56 | product_brand
```

### Aktionen

Format: `action_type | value`.

| Aktion | Beschreibung | Beispiel |
|--------|--------------|----------|
| `set_gtu_code` | GTU-Code zuweisen | `set_gtu_code \| GTU_06` |
| `set_jpk_v7_code` | JPK_V7-Code zuweisen | `set_jpk_v7_code \| GTU_12` |
| `set_tax_class` | WooCommerce-Steuerklasse setzen | `set_tax_class \| reduced-rate` |
| `add_category` / `remove_category` | Kategorie hinzufuegen/entfernen | `add_category \| 42` |
| `add_tag` / `remove_tag` | Schlagwort hinzufuegen/entfernen | `add_tag \| 77` |
| `set_meta_field` | Meta-Feld setzen | `set_meta_field \| _polski_custom:flag` |
| `mark_receipt_with_nip` | Produkt als "Beleg mit NIP" markieren | `mark_receipt_with_nip \| 1` |

### Dry Run und Audit-Log

Jede Regel bietet Dry Run (Vorschau ohne Schreiben) und Run Now (auf den ganzen Katalog anwenden). Der Tab Audit-Log zeigt die letzten 200 Anwendungen mit Zeitstempel, Regel, Produkt, Match-Flag, Dry-Run-Flag und angewandten Aktionen.

## Smart Pickers (Editor-Hilfe)

Im Regel-Editor erlaubt das Panel **Insert helper** das Einfuegen von Bedingungs-/Aktionszeilen ohne manuelles Suchen nach IDs:

- **Kategorie** - alle `product_cat`-Terms (Select2). Buttons haengen `category | in | <ID>` oder `add_category | <ID>` an.
- **Schlagwort** - analog fuer `product_tag`.
- **Steuerklasse** - Liste der WooCommerce-Steuerklassen. Buttons haengen `set_tax_class | <slug>` oder `tax_class | equals | <slug>` an.
- **GTU-Code** - Dropdown `GTU_01` - `GTU_13`. Drei Buttons: `set_gtu_code`, `set_jpk_v7_code` oder Bedingung `gtu_code | equals | <CODE>`.

Das Textfeld bleibt die Source of Truth - Pickers haengen nur Zeilen an.

## Regelgruppen

Jede Regel kann ein optionales **Gruppen-Label** tragen. Gruppen dienen nur der Organisation und dem Filtern in der Adminliste; sie beeinflussen die Ausfuehrung nicht.

## Suche und Filter

Die Regelliste unterstuetzt Namenssuche (case-insensitive), Status-Filter (enabled/disabled), Trigger-Filter und Gruppen-Filter.

## Import und Export

Der Tab **Import / export** erlaubt:

- **Export** aller Regeln als portable JSON-Datei (Format `polski.tax_rules`, v1) fuer Backup oder Migration.
- **Import** einer zuvor exportierten JSON-Datei. Importe fuegen Regeln immer **hinzu** (nie per ID ersetzen), sodass mehrere Quellen sicher zusammengefuehrt werden koennen.

## WP-CLI

Fuer grosse Kataloge und Automatisierung:

```bash
wp polski tax-rules list
wp polski tax-rules run 3 --dry-run
wp polski tax-rules run 3 --batch-size=100
wp polski tax-rules export --file=/tmp/rules.json
wp polski tax-rules import /tmp/rules.json
```

## Massenaktion auf der Produktliste

In der standardmaessigen WooCommerce-Produktliste (`wp-admin/edit.php?post_type=product`) bietet das Dropdown **Aktionen in Massen** zwei Eintraege:

- **Apply tax rules** - fuehrt alle aktiven Regeln gegen die ausgewaehlten Produkte aus.
- **Dry-run tax rules** - meldet, was sich aendern wuerde, ohne zu schreiben.

Nach Ausfuehrung zeigt ein Admin-Hinweis die Anzahl verarbeiteter Produkte, Regeltreffer und angewandter Aenderungen.

## Integration

Zugewiesene GTU- und JPK_V7-Codes werden als Produkt-Meta gespeichert und koennen verwendet werden von:

- Dem Rechnungsmodul (Faktura VAT PDF + KSeF)
- JPK_VAT-Export
- Buchhaltungsintegrationen (wFirma, Fakturownia, iFirma)

## Grenzen und Performance

- Der taegliche Cron verarbeitet den Katalog in Batches zu 50 Produkten.
- Der Audit-Log ist auf 10.000 Zeilen begrenzt; aeltere werden automatisch entfernt.
- Die Engine schuetzt vor Rekursion: Eine Regel wird nicht waehrend ihrer eigenen internen Produktspeicherung erneut ausgeloest.

:::caution
Teste eine neue Regel immer zuerst mit **Dry Run**, bevor du sie gegen den ganzen Katalog laesst. Nach Aenderung einer Steuerklasse oder eines JPK-Codes sollten Rechnungen und Exporte neu berechnet werden.
:::
