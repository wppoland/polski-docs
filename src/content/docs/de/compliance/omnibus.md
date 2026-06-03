---
title: Omnibus-Richtlinie - Preisverfolgung
description: Umsetzung der Omnibus-Richtlinie in Polski for WooCommerce - automatische Verfolgung des niedrigsten Preises der letzten 30 Tage, Anzeigekonfiguration und Shortcode.
---

Die Omnibus-Richtlinie (EU 2019/2161) gilt in Polen seit dem 1. Januar 2023. Bei jeder Preissenkung müssen Sie den niedrigsten Preis der letzten 30 Tage anzeigen. Das Plugin verfolgt die Preishistorie automatisch und zeigt diese Information bei Aktionen an.

## Wie die Preisverfolgung funktioniert

Das Plugin speichert jede Preisänderung eines Produkts (einschließlich Varianten) in der Datenbank. Wenn ein Produkt "im Angebot" ist, berechnet das Plugin den niedrigsten Preis der letzten 30 Tage und zeigt ihn den Kunden an.

Die Verfolgung beginnt nach der Aktivierung des Moduls. Wenn ein Produkt noch keine Preishistorie hat, wird eine Ersatzmeldung angezeigt.

![Produktseite mit angezeigtem niedrigstem Omnibus-Preis](../../../../assets/screenshots/screenshot-4-omnibus-lowest-price.png)

## Konfiguration

Gehen Sie zu **WooCommerce > Einstellungen > Polski > Omnibus** und konfigurieren Sie die verfügbaren Optionen.

### Verfolgungszeitraum

| Option | Beschreibung | Standardwert |
|-------|------|------------------|
| `days` | Anzahl der Tage rückwärts zur Berechnung des niedrigsten Preises | `30` |
| `prune_after_days` | Nach wie vielen Tagen alte Einträge aus der Historie gelöscht werden | `90` |

`prune_after_days` steuert die Größe der Datenbanktabelle. Der Wert `90` bedeutet, dass Daten, die älter als 90 Tage sind, automatisch gelöscht werden.

### Steuern

| Option | Beschreibung | Standardwert |
|-------|------|------------------|
| `include_tax` | Ob der angezeigte Omnibus-Preis die MwSt enthalten soll | `true` |

Stellen Sie dies entsprechend den Preiseinstellungen in WooCommerce ein. Wenn die Preise im Shop Bruttopreise sind, lassen Sie `true`.

### Anzeigeorte

| Option | Beschreibung | Standardwert |
|-------|------|------------------|
| `display_on_sale_only` | Nur bei Produkten im Angebot anzeigen | `true` |
| `show_on_single` | Einzelne Produktseite | `true` |
| `show_on_loop` | Produktliste (Kategorie, Shop) | `false` |
| `show_on_related` | Verwandte Produkte | `false` |
| `show_on_cart` | Warenkorb | `false` |

Aktivieren Sie es mindestens auf der Produktseite (`show_on_single`). In der Produktliste (`show_on_loop`) nimmt es mehr Platz ein, aber manche Auslegungen der Vorschriften verlangen dies.

### Regulärer Preis

| Option | Beschreibung | Standardwert |
|-------|------|------------------|
| `show_regular_price` | Auch den regulären Preis neben dem Omnibus-Preis anzeigen | `false` |

### Textvorlage

| Option | Beschreibung | Standardwert |
|-------|------|------------------|
| `display_text` | Vorlage der angezeigten Meldung | `Niedrigster Preis der {days} Tage vor der Senkung: {price}` |
| `no_history_text` | Text, wenn keine Preishistorie vorliegt | `Keine Daten über den früheren Preis` |

Verfügbare Variablen in der Vorlage `display_text`:

- `{price}` - niedrigster Preis im jeweiligen Zeitraum
- `{days}` - Anzahl der Tage (Standard 30)
- `{date}` - Datum des niedrigsten Preises
- `{regular_price}` - regulärer Preis des Produkts (vor der Aktion)

#### Vorlagenbeispiele

```
Niedrigster Preis der {days} Tage vor der Senkung: {price}
```

```
Niedrigster Preis der letzten {days} Tage: {price} (regulärer Preis: {regular_price})
```

```
Omnibus: {price} (vom {date})
```

### Methode der Preisberechnung

| Option | Beschreibung | Standardwert |
|-------|------|------------------|
| `price_count_from` | Ab wann die 30 Tage gezählt werden | `sale_start` |

Verfügbare Werte:

- `sale_start` - ab dem Startdatum der Aktion (von UOKiK empfohlen)
- `current_date` - ab dem aktuellen Datum

### Variable Produkte

| Option | Beschreibung | Standardwert |
|-------|------|------------------|
| `variable_tracking` | Methode der Variantenverfolgung | `per_variation` |

Verfügbare Werte:

- `per_variation` - separate Verfolgung jeder Variante (empfohlen)
- `parent_only` - Verfolgung nur des Preises des übergeordneten Produkts

`per_variation` liefert genauere Daten, da jede Variante einen anderen Preis und eine andere Senkungshistorie haben kann.

## Shortcode

Verwenden Sie den Shortcode `[polski_omnibus_price]`, um die Information über den niedrigsten Preis an einer beliebigen Stelle der Website anzuzeigen.

### Grundlegende Verwendung

```
[polski_omnibus_price]
```

Zeigt den Omnibus-Preis für das aktuelle Produkt an.

### Mit Parametern

```
[polski_omnibus_price product_id="456" days="30"]
```

### Shortcode-Parameter

| Parameter | Beschreibung | Standardwert |
|----------|------|------------------|
| `product_id` | Produkt-ID | Aktuelles Produkt |
| `days` | Anzahl der Tage | Wert aus den Einstellungen |

### Beispiel für die Verwendung in einer PHP-Vorlage

```php
echo do_shortcode('[polski_omnibus_price product_id="' . $product_id . '"]');
```

## Automatische Bereinigung der Historie

WP-Cron löscht täglich Preishistorie-Einträge, die älter als `prune_after_days` sind. Die Datenbanktabelle wächst nicht unbegrenzt.

Um die Bereinigung manuell zu erzwingen, können Sie WP-CLI verwenden:

```bash
wp cron event run polski_omnibus_prune
```

## Konformität mit den UOKiK-Vorschriften

UOKiK-Richtlinien:

1. Die Information über den niedrigsten Preis muss **bei jeder Ankündigung einer Preissenkung** angezeigt werden
2. Der Referenzzeitraum sind **30 Tage vor Anwendung der Senkung**
3. Für Produkte, die weniger als 30 Tage verkauft werden, geben Sie den niedrigsten Preis seit dem Tag der Markteinführung an
4. Für schnell verderbliche Produkte ist eine Verkürzung des Zeitraums möglich

Das Plugin wendet diese Richtlinien standardmäßig an. Die Option `price_count_from` auf `sale_start` zählt ab dem Startdatum der Aktion, gemäß den Empfehlungen von UOKiK.

## Fehlerbehebung

**Der Omnibus-Preis wird nicht angezeigt**
Prüfen Sie, ob das Produkt in WooCommerce einen Aktionspreis eingestellt hat. Bei aktivierter Option `display_on_sale_only` erscheint die Meldung nur bei einer aktiven Aktion.

**Es wird eine Meldung über fehlende Historie angezeigt**
Die Preisverfolgung beginnt nach der Aktivierung des Moduls. Warten Sie auf eine Preisänderung oder speichern Sie das Produkt erneut, um den ersten Eintrag zur Historie hinzuzufügen.

**Der Omnibus-Preis ist derselbe wie der Aktionspreis**
Das ist korrektes Verhalten, wenn das Produkt in den letzten 30 Tagen keinen niedrigeren Preis hatte.

## Nächste Schritte

- Probleme melden: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskussionen und Fragen: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
