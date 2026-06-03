---
title: Pakete, Add-ons und "Häufig zusammen gekauft"
description: Module für Produktpakete, Produkt-Add-ons und "Häufig zusammen gekauft"-Empfehlungen in Polski PRO for WooCommerce.
---

Drei Verkaufsmodule: Pakete (Bundles), Produkt-Add-ons und "Häufig zusammen gekauft" (FBT). Jedes funktioniert unabhängig.

:::note[Anforderungen]
Polski PRO erfordert: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Produktpakete (Bundles)

Erstellen Sie Produktsets mit einem gemeinsamen Rabatt. Der Kunde kauft das Paket als ein Produkt. Die Bestandteile sind in den Bestelldetails sichtbar.

### Konfiguration

Gehen Sie zu **WooCommerce > Einstellungen > Polski PRO > Pakete** und aktivieren Sie das Modul (Option `polski_bundles`).

| Einstellung | Standardwert | Beschreibung |
|------------|------------------|------|
| Pakete aktivieren | Nein | Aktiviert die Paketfunktion |
| Rabattmethode | Prozent | `percent` (prozentual) oder `fixed` (Festbetrag) |
| Standardrabatt | 10% | Auf neue Pakete angewendeter Rabatt |
| Ersparnis anzeigen | Ja | Zeigt dem Kunden den Ersparnisbetrag |

### Paket erstellen

1. Gehen Sie zu **Produkte > Neu hinzufügen**
2. Wählen Sie im Abschnitt **Produktdaten** den Typ "Polski PRO Paket"
3. Fügen Sie im Tab **Paketbestandteile** Produkte hinzu
4. Legen Sie die Menge jedes Bestandteils fest
5. Konfigurieren Sie den Rabatt (überschreibt den Standard)

### Rabattberechnung

Der Paketpreis wird automatisch berechnet:

```
Paketpreis = Summe der Bestandteilpreise - Rabatt

Beispiel (Rabatt 15%):
Produkt A: 100 zł x 1 = 100 zł
Produkt B:  50 zł x 2 = 100 zł
Summe:                   200 zł
Rabatt (15%):             30 zł
Paketpreis:              170 zł
```

Ist ein Paketbestandteil im Angebot, wird für die Berechnung der Aktionspreis verwendet.

### Paket-Shortcode

```
[polski_bundle product_id="456" show_savings="yes" layout="grid"]
```

| Parameter | Erforderlich | Beschreibung |
|----------|----------|------|
| `product_id` | Ja | ID des Paketprodukts |
| `show_savings` | Nein | Ersparnisbetrag anzeigen (`yes`/`no`) |
| `layout` | Nein | Layout: `grid`, `list`, `compact` |

### Paket-Hooks

```php
/**
 * Filtert den berechneten Paketpreis.
 *
 * @param float $bundle_price Berechneter Paketpreis
 * @param array $items        Paketbestandteile mit Preisen
 * @param float $discount     Rabattwert
 */
apply_filters('polski_pro/bundles/price', float $bundle_price, array $items, float $discount): float;
```

**Beispiel - Mindestpaketpreis:**

```php
add_filter('polski_pro/bundles/price', function (float $bundle_price, array $items, float $discount): float {
    $minimum_price = 49.99;
    return max($bundle_price, $minimum_price);
}, 10, 3);
```

```php
/**
 * Aktion, die nach Hinzufügen eines Pakets zum Warenkorb ausgelöst wird.
 *
 * @param string $cart_item_key Schlüssel der Position im Warenkorb
 * @param int    $bundle_id    ID des Paketprodukts
 * @param array  $items        Paketbestandteile
 */
do_action('polski_pro/bundles/added_to_cart', string $cart_item_key, int $bundle_id, array $items);
```

## Produkt-Add-ons

Zeigen Sie optionale Upsell-Produkte auf der Produktseite an. Der Kunde wählt Add-ons und kauft sie mit einem Klick zusammen mit dem Hauptprodukt.

### Konfiguration

Gehen Sie zu **WooCommerce > Einstellungen > Polski PRO > Add-ons** und aktivieren Sie das Modul (Option `polski_addons`).

| Einstellung | Standardwert | Beschreibung |
|------------|------------------|------|
| Add-ons aktivieren | Nein | Aktiviert die Add-on-Funktion |
| Anzeigeposition | Nach dem Warenkorb-Button | Wo der Add-on-Abschnitt angezeigt wird |
| Abschnittsüberschrift | "Zur Bestellung hinzufügen" | Text der Überschrift über der Add-on-Liste |
| Maximale Anzahl | 5 | Limit der angezeigten Add-ons pro Produkt |

### Add-ons zuweisen

Add-ons werden in der Produktbearbeitung im Tab **Polski PRO Add-ons** konfiguriert:

1. Klicken Sie auf "Add-on hinzufügen"
2. Wählen Sie ein Produkt aus dem Katalog
3. Legen Sie den Add-on-Preis fest (Standard: Produktpreis)
4. Legen Sie optional einen Aktionspreis für das Add-on fest
5. Bestimmen Sie die Anzeigereihenfolge

Add-ons können einen anderen Preis als das Quellprodukt haben, Sie können spezielle "zusammen mit dem Produkt"-Preise anbieten.

### Auswahlvalidierung

Das Modul validiert:

- Die Lagerverfügbarkeit jedes ausgewählten Add-ons
- Die Korrektheit der Preise (ob sie nicht clientseitig geändert wurden)
- Mengenlimits

### Add-on-Hooks

```php
/**
 * Filtert die Liste der Add-ons für ein Produkt.
 *
 * @param array       $addons  Array der Add-ons mit Preisen
 * @param \WC_Product $product Hauptprodukt
 */
apply_filters('polski_pro/addons/items', array $addons, \WC_Product $product): array;
```

**Beispiel - Filterung der Add-ons anhand der Benutzerrolle:**

```php
add_filter('polski_pro/addons/items', function (array $addons, \WC_Product $product): array {
    if (current_user_can('wholesale_customer')) {
        foreach ($addons as &$addon) {
            $addon['price'] = $addon['price'] * 0.8; // 20% Großhandelsrabatt
        }
    }
    return $addons;
}, 10, 2);
```

## Häufig zusammen gekauft (Frequently Bought Together)

Zeigt die Produkte an, die am häufigsten zusammen mit dem angesehenen Produkt gekauft werden. Der Kunde fügt mehrere Produkte mit einem Klick in den Warenkorb.

### Konfiguration

Gehen Sie zu **WooCommerce > Einstellungen > Polski PRO > Häufig zusammen gekauft** und aktivieren Sie das Modul (Option `polski_fbt`).

| Einstellung | Standardwert | Beschreibung |
|------------|------------------|------|
| Modul aktivieren | Nein | Aktiviert die Empfehlungen |
| Datenquelle | Manuell | `manual` (manuell) oder `auto` (auf Basis der Bestellungen) |
| Produktlimit | 3 | Maximale Anzahl empfohlener Produkte |
| Abschnittsüberschrift | "Häufig zusammen gekauft" | Text der Abschnittsüberschrift |
| Position | Unter der Kurzbeschreibung | Wo der Abschnitt angezeigt wird |

### Manuelle Zuweisung

In der Produktbearbeitung, Tab **Häufig zusammen gekauft**:

1. Suchen und fügen Sie verwandte Produkte hinzu
2. Legen Sie die Anzeigereihenfolge fest
3. Legen Sie optional einen Rabatt für den gemeinsamen Kauf fest

### Automatische Empfehlungen

Im Modus `auto` analysiert das Modul die Bestellhistorie und findet die am häufigsten zusammen gekauften Produkte. Die Analyse läuft einmal täglich über WP-Cron.

### Hinzufügen zum Warenkorb

Der Abschnitt "Häufig zusammen gekauft" zeigt:

- Checkboxen bei jedem empfohlenen Produkt
- Miniaturbilder und Produktnamen
- Preise der einzelnen Produkte
- Gesamtpreis der ausgewählten Produkte
- Schaltfläche "Alle in den Warenkorb"

Der Kunde markiert Produkte und fügt sie mit einem Klick hinzu. Sie gelangen als separate Positionen in den Warenkorb.

### Shortcode

```
[polski_fbt product_id="789" limit="4" show_prices="yes"]
```

| Parameter | Erforderlich | Beschreibung |
|----------|----------|------|
| `product_id` | Nein | ID des Hauptprodukts (Standard: aktuelles) |
| `limit` | Nein | Maximale Anzahl der Empfehlungen |
| `show_prices` | Nein | Preise anzeigen (`yes`/`no`) |

### FBT-Hooks

```php
/**
 * Filtert die Liste der empfohlenen Produkte.
 *
 * @param array $product_ids Array der IDs empfohlener Produkte
 * @param int   $product_id  ID des Hauptprodukts
 * @param string $source     Quelle: 'manual' oder 'auto'
 */
apply_filters('polski_pro/fbt/products', array $product_ids, int $product_id, string $source): array;
```

**Beispiel - Ausschluss von Produkten einer bestimmten Kategorie:**

```php
add_filter('polski_pro/fbt/products', function (array $product_ids, int $product_id, string $source): array {
    $excluded_category_id = 42;
    return array_filter($product_ids, function (int $id) use ($excluded_category_id): bool {
        return ! has_term($excluded_category_id, 'product_cat', $id);
    });
}, 10, 3);
```

## Zusammenwirken der Module

Alle drei Module können gleichzeitig auf demselben Produkt arbeiten:

- **Paket** mit zugewiesenen **Add-ons** und einem Abschnitt **Häufig zusammen gekauft**
- Paketbestandteile können eigene Add-ons haben
- FBT-Empfehlungen können auf Pakete verweisen

Die Anzeigereihenfolge stellen Sie über die Priorität der WooCommerce-Hooks ein.

## Fehlerbehebung

**Der Paketpreis aktualisiert sich nach Änderung der Bestandteilpreise nicht**
Der Paketpreis wird dynamisch berechnet. Leeren Sie den Objekt-Cache (Object Cache) und die WooCommerce-Transients.

**Add-ons werden auf der Produktseite nicht angezeigt**
Prüfen Sie, ob das Theme den Hook `woocommerce_after_add_to_cart_button` unterstützt. Einige benutzerdefinierte Themes überspringen die Standard-WooCommerce-Hooks.

**Automatische Empfehlungen sind leer**
Das Modul benötigt historische Daten, automatische Empfehlungen erscheinen nach dem Sammeln einer ausreichenden Anzahl von Bestellungen. Prüfen Sie, ob die WP-Cron-Aufgabe `polski_pro_fbt_analyze` geplant ist.

## Nächste Schritte

- Probleme melden: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Verwandte Module: [Vorbestellung](/pro/preorders), [Katalogmodus](/pro/catalog-mode)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
