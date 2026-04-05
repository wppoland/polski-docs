---
title: Pakete, Add-ons und "Haeufig zusammen gekauft"
description: Module fuer Produktpakete, Produkt-Add-ons und Empfehlungen "Haeufig zusammen gekauft" in Polski PRO for WooCommerce.
---

Polski PRO for WooCommerce bietet drei sich ergaenzende Verkaufsmodule: Produktpakete (Bundles), Produkt-Add-ons und Empfehlungen "Haeufig zusammen gekauft" (Frequently Bought Together). Jedes Modul arbeitet unabhaengig und kann einzeln aktiviert werden.

:::note[Wymagania]
Polski PRO wymaga: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Produktpakete (Bundles)

Das Paketmodul ermoeglicht die Erstellung konfigurierbarer Produktsets mit einem gemeinsamen Rabatt. Der Kunde kauft das Paket als ein Produkt, wobei die einzelnen Bestandteile in den Bestelldetails sichtbar sind.

### Konfiguration

Gehen Sie zu **WooCommerce > Ustawienia > Polski PRO > Pakiety** und aktivieren Sie das Modul (Option `polski_bundles`).

| Einstellung | Standardwert | Beschreibung |
|------------|------------------|------|
| Pakete aktivieren | Nein | Aktiviert die Paketfunktionalitaet |
| Rabattart | Prozent | `percent` (prozentual) oder `fixed` (Festbetrag) |
| Standardrabatt | 10% | Rabatt fuer neue Pakete |
| Ersparnis anzeigen | Ja | Zeigt dem Kunden den Sparbetrag |

### Paket erstellen

1. Gehen Sie zu **Produkte > Neu hinzufuegen**
2. Waehlen Sie im Abschnitt **Produktdaten** den Typ "Paket Polski PRO"
3. Fuegen Sie im Tab **Paketbestandteile** Produkte hinzu
4. Legen Sie die Menge jedes Bestandteils fest
5. Konfigurieren Sie den Rabatt (ueberschreibt den Standardwert)

### Rabattberechnung

Der Paketpreis wird automatisch berechnet:

```
Cena pakietu = Suma cen składników - Rabat

Przykład (rabat 15%):
Produkt A: 100 zł x 1 = 100 zł
Produkt B:  50 zł x 2 = 100 zł
Suma:                    200 zł
Rabat (15%):              30 zł
Cena pakietu:            170 zł
```

Wenn ein Paketbestandteil im Angebot ist, wird der Aktionspreis fuer die Berechnung verwendet.

### Paket-Shortcode

```
[polski_bundle product_id="456" show_savings="yes" layout="grid"]
```

| Parameter | Erforderlich | Beschreibung |
|----------|----------|------|
| `product_id` | Ja | ID des Paketprodukts |
| `show_savings` | Nein | Sparbetrag anzeigen (`yes`/`no`) |
| `layout` | Nein | Layout: `grid`, `list`, `compact` |

### Paket-Hooks

```php
/**
 * Filtruje obliczoną cenę pakietu.
 *
 * @param float $bundle_price Obliczona cena pakietu
 * @param array $items        Składniki pakietu z cenami
 * @param float $discount     Wartość rabatu
 */
apply_filters('polski_pro/bundles/price', float $bundle_price, array $items, float $discount): float;
```

**Beispiel - Mindestpreis fuer Pakete:**

```php
add_filter('polski_pro/bundles/price', function (float $bundle_price, array $items, float $discount): float {
    $minimum_price = 49.99;
    return max($bundle_price, $minimum_price);
}, 10, 3);
```

```php
/**
 * Akcja wywoływana po dodaniu pakietu do koszyka.
 *
 * @param string $cart_item_key Klucz pozycji w koszyku
 * @param int    $bundle_id    ID produktu-pakietu
 * @param array  $items        Składniki pakietu
 */
do_action('polski_pro/bundles/added_to_cart', string $cart_item_key, int $bundle_id, array $items);
```

## Produkt-Add-ons

Das Add-on-Modul ermoeglicht die Anzeige optionaler Upsell-Produkte direkt auf der Produktseite. Der Kunde kann zusaetzliche Produkte auswaehlen und sie mit einem Klick zusammen mit dem Hauptprodukt kaufen.

### Konfiguration

Gehen Sie zu **WooCommerce > Ustawienia > Polski PRO > Dodatki** und aktivieren Sie das Modul (Option `polski_addons`).

| Einstellung | Standardwert | Beschreibung |
|------------|------------------|------|
| Add-ons aktivieren | Nein | Aktiviert die Add-on-Funktionalitaet |
| Anzeigeposition | Nach der Warenkorb-Schaltflaeche | Position der Add-on-Sektion |
| Sektionsueberschrift | "Dodaj do zamówienia" | Ueberschriftstext ueber der Add-on-Liste |
| Maximale Anzahl | 5 | Limit der angezeigten Add-ons pro Produkt |

### Add-ons zuweisen

Add-ons werden in der Produktbearbeitung im Tab **Dodatki Polski PRO** konfiguriert:

1. Klicken Sie auf "Dodatek hinzufuegen"
2. Waehlen Sie ein Produkt aus dem Katalog
3. Legen Sie den Add-on-Preis fest (Standard: Produktpreis)
4. Optional: Legen Sie einen Aktionspreis fuer das Add-on fest
5. Bestimmen Sie die Anzeigereihenfolge

Add-ons koennen einen anderen Preis als das Quellprodukt haben - dies ermoeglicht spezielle "Zusammen mit Produkt"-Preise.

### Auswahlvalidierung

Das Modul validiert:

- Lagerverfuegbarkeit jedes gewaehlten Add-ons
- Preiskorrektheit (ob Preise nicht clientseitig manipuliert wurden)
- Mengenlimits

### Add-on-Hooks

```php
/**
 * Filtruje listę dodatków dla produktu.
 *
 * @param array       $addons  Tablica dodatków z cenami
 * @param \WC_Product $product Produkt główny
 */
apply_filters('polski_pro/addons/items', array $addons, \WC_Product $product): array;
```

**Beispiel - Add-ons basierend auf Benutzerrolle filtern:**

```php
add_filter('polski_pro/addons/items', function (array $addons, \WC_Product $product): array {
    if (current_user_can('wholesale_customer')) {
        foreach ($addons as &$addon) {
            $addon['price'] = $addon['price'] * 0.8; // 20% rabatu hurtowego
        }
    }
    return $addons;
}, 10, 2);
```

## Haeufig zusammen gekauft (Frequently Bought Together)

Das Empfehlungsmodul zeigt Produkte an, die am haeufigsten zusammen mit dem angesehenen Produkt gekauft werden, mit der Moeglichkeit, mehrere Produkte mit einem Klick in den Warenkorb zu legen.

### Konfiguration

Gehen Sie zu **WooCommerce > Ustawienia > Polski PRO > Często kupowane razem** und aktivieren Sie das Modul (Option `polski_fbt`).

| Einstellung | Standardwert | Beschreibung |
|------------|------------------|------|
| Modul aktivieren | Nein | Aktiviert die Empfehlungen |
| Datenquelle | Manuell | `manual` (manuell) oder `auto` (basierend auf Bestellungen) |
| Produktlimit | 3 | Maximale Anzahl empfohlener Produkte |
| Sektionsueberschrift | "Często kupowane razem" | Ueberschriftstext der Sektion |
| Position | Unter der Kurzbeschreibung | Position der Sektion |

### Manuelle Zuweisung

In der Produktbearbeitung, Tab **Często kupowane razem**:

1. Suchen und fuegen Sie verwandte Produkte hinzu
2. Legen Sie die Anzeigereihenfolge fest
3. Optional: Legen Sie einen Rabatt fuer den gemeinsamen Kauf fest

### Automatische Empfehlungen

Wenn die Datenquelle auf `auto` eingestellt ist, analysiert das Modul die Bestellhistorie und identifiziert haeufig zusammen gekaufte Produkte. Die Analyse wird einmal taeglich ueber WP-Cron ausgefuehrt.

### In den Warenkorb legen

Die Sektion "Haeufig zusammen gekauft" zeigt:

- Checkboxen bei jedem empfohlenen Produkt
- Miniaturbilder und Produktnamen
- Preise der einzelnen Produkte
- Gesamtpreis der ausgewaehlten Produkte
- Schaltflaeche "Alle in den Warenkorb"

Der Kunde waehlt die gewuenschten Produkte und fuegt sie mit einem Klick hinzu. Alle Produkte landen als separate Positionen im Warenkorb.

### Shortcode

```
[polski_fbt product_id="789" limit="4" show_prices="yes"]
```

| Parameter | Erforderlich | Beschreibung |
|----------|----------|------|
| `product_id` | Nein | ID des Hauptprodukts (Standard: aktuelles Produkt) |
| `limit` | Nein | Maximale Anzahl der Empfehlungen |
| `show_prices` | Nein | Preise anzeigen (`yes`/`no`) |

### FBT-Hooks

```php
/**
 * Filtruje listę rekomendowanych produktów.
 *
 * @param array $product_ids Tablica ID rekomendowanych produktów
 * @param int   $product_id  ID produktu głównego
 * @param string $source     Źródło: 'manual' lub 'auto'
 */
apply_filters('polski_pro/fbt/products', array $product_ids, int $product_id, string $source): array;
```

**Beispiel - Produkte einer bestimmten Kategorie ausschliessen:**

```php
add_filter('polski_pro/fbt/products', function (array $product_ids, int $product_id, string $source): array {
    $excluded_category_id = 42;
    return array_filter($product_ids, function (int $id) use ($excluded_category_id): bool {
        return ! has_term($excluded_category_id, 'product_cat', $id);
    });
}, 10, 3);
```

## Zusammenspiel der Module

Alle drei Module koennen gleichzeitig auf demselben Produkt arbeiten:

- **Paket** mit zugewiesenen **Add-ons** und Sektion **Haeufig zusammen gekauft**
- Paketbestandteile koennen eigene Add-ons haben
- FBT-Empfehlungen koennen auf Pakete verweisen

Die Anzeigereihenfolge auf der Produktseite ist ueber die Prioritaet der WooCommerce-Hooks konfigurierbar.

## Fehlerbehebung

**Paketpreis aktualisiert sich nach Preisaenderung der Bestandteile nicht**
Der Paketpreis wird dynamisch berechnet. Leeren Sie den Object-Cache und WooCommerce-Transients.

**Add-ons werden auf der Produktseite nicht angezeigt**
Pruefen Sie, ob das Theme den Hook `woocommerce_after_add_to_cart_button` unterstuetzt. Einige benutzerdefinierte Themes ueberspringen Standard-WooCommerce-Hooks.

**Automatische Empfehlungen sind leer**
Das Modul benoetigt historische Daten - automatische Empfehlungen erscheinen nach Sammlung einer ausreichenden Anzahl von Bestellungen. Pruefen Sie, ob die WP-Cron-Aufgabe `polski_pro_fbt_analyze` geplant ist.

## Naechste Schritte

- Probleme melden: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Verwandte Module: [Vorbestellungen](/pro/preorders), [Katalogmodus](/pro/catalog-mode)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
