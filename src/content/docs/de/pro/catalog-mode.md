---
title: B2B-Katalogmodus
description: Modul für den Katalogmodus in Polski PRO for WooCommerce - Preise verbergen, Käufe sperren, Weiterleitung zu Angebotsanfragen und Integration mit dem RFQ-Modul.
---

Der Katalogmodus verwandelt den Shop in einen Katalog ohne Kaufmöglichkeit. Verbergen Sie Preise, ersetzen Sie Schaltflächen durch Hinweise oder leiten Sie zu einer Angebotsanfrage weiter. Gedacht für B2B-Shops mit individuellen Preisen.

:::note[Anforderungen]
Polski PRO erfordert: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Konfiguration

Gehen Sie zu **WooCommerce > Einstellungen > Polski PRO > Katalogmodus** und aktivieren Sie das Modul (Option `polski_catalog`).

### Haupteinstellungen

| Einstellung | Option in der Datenbank | Standardwert | Beschreibung |
|------------|---------------|------------------|------|
| Katalogmodus aktivieren | `polski_catalog` | Nein | Aktiviert den Katalogmodus |
| Preise verbergen | `polski_catalog_hide_prices` | Ja | Entfernt die Preisanzeige |
| Warenkorb-Button verbergen | `polski_catalog_hide_cart` | Ja | Entfernt die Schaltfläche "In den Warenkorb" |
| Ersatztext für Preis | `polski_catalog_price_text` | "Preis anfragen" | Statt des Preises angezeigter Text |
| Hinweis am Produkt | `polski_catalog_notice` | "" | Auf der Produktseite angezeigter Hinweis |
| Weiterleitung zu RFQ | `polski_catalog_redirect_rfq` | Nein | Weiterleitung zum Angebotsanfrageformular |
| Bedingter Modus | `polski_catalog_conditional` | `all` | `all`, `guests`, `roles` |

### Bedingter Modus

Der Katalogmodus kann aktiv sein:

- **Für alle** (`all`) - jeder sieht den Katalog ohne Preise
- **Nur für nicht angemeldete Nutzer** (`guests`) - angemeldete Kunden sehen Preise und können kaufen
- **Für ausgewählte Rollen** (`roles`) - der Katalog ist nur für ausgewählte WordPress-Rollen aktiv

Der Modus "Nur für nicht angemeldete Nutzer" ist im B2B beliebt, ein Großhändler verlangt eine Registrierung, bevor er die Preise zeigt.

```php
// Beispiel: eigene bedingte Logik
add_filter('polski_pro/catalog/is_active', function (bool $is_active): bool {
    // Katalogmodus für Kunden mit mindestens 5 Bestellungen deaktivieren
    if (is_user_logged_in()) {
        $order_count = wc_get_customer_order_count(get_current_user_id());
        if ($order_count >= 5) {
            return false;
        }
    }
    return $is_active;
});
```

## Funktionsweise

### Preise verbergen

Das Modul verwendet den Filter `woocommerce_get_price_html` und ersetzt den Preis durch den konfigurierten Text.

```php
/**
 * Filtert den Ersatztext für den Preis im Katalogmodus.
 *
 * @param string      $replacement Ersatztext
 * @param \WC_Product $product     Produktobjekt
 */
apply_filters('polski_pro/catalog/price_replacement', string $replacement, \WC_Product $product): string;
```

**Beispiel - unterschiedliche Texte für Kategorien:**

```php
add_filter('polski_pro/catalog/price_replacement', function (string $replacement, \WC_Product $product): string {
    if (has_term('premium', 'product_cat', $product->get_id())) {
        return '<span class="price-inquiry">Preis wird individuell festgelegt</span>';
    }
    return $replacement;
}, 10, 2);
```

### Käufe sperren

Das Modul sperrt den Kauf mit dem Filter `woocommerce_is_purchasable`:

```php
/**
 * Filtert, ob ein Produkt im Katalogmodus kaufbar ist.
 *
 * @param bool        $purchasable Ob das Produkt kaufbar ist
 * @param \WC_Product $product     Produktobjekt
 */
apply_filters('polski_pro/catalog/is_purchasable', bool $purchasable, \WC_Product $product): bool;
```

**Beispiel - Kauf ausgewählter Produkte erlauben:**

```php
add_filter('polski_pro/catalog/is_purchasable', function (bool $purchasable, \WC_Product $product): bool {
    $always_purchasable = [101, 102, 103]; // IDs immer verfügbarer Produkte
    if (in_array($product->get_id(), $always_purchasable, true)) {
        return true;
    }
    return $purchasable;
}, 10, 2);
```

### Hinweis auf der Produktseite

Wenn `polski_catalog_notice` gesetzt ist, wird auf der Produktseite ein Hinweis zum Katalogmodus angezeigt.

Beispielhinweis:

> Um den Preis dieses Produkts zu erfahren, kontaktieren Sie unser Verkaufsteam oder füllen Sie das Angebotsanfrageformular aus.

## Integration mit dem Modul für Angebotsanfragen

Wenn `polski_catalog_redirect_rfq` aktiviert ist, führt die Schaltfläche zum Angebotsanfrageformular ([RFQ-Modul](/pro/quotes)):

1. Schaltfläche "Preis anfragen" statt "In den Warenkorb"
2. Automatische Übergabe der Produkt-ID an das RFQ-Formular
3. Vorausfüllen des Produktnamens im Formular
4. Rückkehr zum Produkt nach dem Senden der Anfrage

Damit die Integration funktioniert, müssen beide Module - Katalog und RFQ - aktiv sein.

## Elemente verbergen

Das Modul verbirgt automatisch:

| Element | WooCommerce-Hook | Effekt |
|---------|-----------------|-------|
| Schaltfläche "In den Warenkorb" | `woocommerce_is_purchasable` | Produkt als nicht kaufbar markiert |
| Preis | `woocommerce_get_price_html` | Preis-HTML durch Text ersetzt |
| Warenkorb-Symbol im Header | `polski_pro/catalog/hide_cart_icon` | Verbirgt das Mini-Warenkorb-Symbol |
| Warenkorbseite | `template_redirect` | Weiterleitung von /cart/ zur Startseite |
| Kasse | `template_redirect` | Weiterleitung von /checkout/ zur Startseite |

### Selektives Verbergen

Aktivieren oder deaktivieren Sie jede Option unabhängig. Zum Beispiel:

- Preise verbergen, aber den Warenkorb-Button lassen (der Kunde kauft "zum unbekannten Preis", Kontakt nach der Bestellung)
- Warenkorb-Button verbergen, aber Preise anzeigen (der Kunde sieht Preise, muss aber zum Kauf anfragen)
- Alles verbergen (vollständiger Katalogmodus)

## Produkte und Kategorien ausschließen

### Produkte ausschließen

Schließen Sie ein Produkt vom Katalogmodus aus: Produktbearbeitung > **Polski PRO > Katalogmodus** > "Vom Katalogmodus ausschließen" markieren.

### Kategorien ausschließen

```php
/**
 * Filtert die vom Katalogmodus ausgeschlossenen Kategorien.
 *
 * @param array $excluded_categories Array der Kategorie-IDs
 */
apply_filters('polski_pro/catalog/excluded_categories', array $excluded_categories): array;
```

**Beispiel:**

```php
add_filter('polski_pro/catalog/excluded_categories', function (array $excluded_categories): array {
    $excluded_categories[] = 15; // "Zubehör" - immer kaufbar
    $excluded_categories[] = 28; // "Outlet"
    return $excluded_categories;
});
```

## CSS-Hilfsklassen

Das Modul fügt dem `<body>` CSS-Klassen hinzu, die das Styling erleichtern:

| Klasse | Wann hinzugefügt |
|-------|----------------|
| `polski-catalog-mode` | Der Katalogmodus ist aktiv |
| `polski-catalog-prices-hidden` | Die Preise sind verborgen |
| `polski-catalog-cart-hidden` | Der Warenkorb-Button ist verborgen |

**CSS-Beispiel:**

```css
.polski-catalog-mode .price {
    display: none; /* Zusätzliches Verbergen des Preises, falls das Theme den Filter nicht respektiert */
}

.polski-catalog-mode .single_add_to_cart_button {
    background-color: #0073aa;
    content: "Preis anfragen";
}
```

## Fehlerbehebung

**Die Preise werden trotz aktiviertem Katalogmodus weiterhin angezeigt**
Einige Themes verwenden eigene Methoden zur Preisanzeige und umgehen den Filter `woocommerce_get_price_html`. Verwenden Sie die CSS-Klassen `.polski-catalog-prices-hidden .price { display: none; }` als Absicherung.

**Der Kunde kann ein Produkt über die direkte URL in den Warenkorb legen**
Das Modul sperrt dies auf Ebene des Filters `woocommerce_is_purchasable`. Tritt das Problem auf, prüfen Sie, ob ein anderes Plugin diesen Filter mit höherer Priorität überschreibt.

**Der bedingte Modus funktioniert mit Cache nicht korrekt**
Cache-Plugins können eine gecachte Version unabhängig vom Anmeldestatus ausliefern. Konfigurieren Sie das Cache-Plugin so, dass es den Cache für angemeldete und nicht angemeldete Nutzer trennt.

## Nächste Schritte

- Probleme melden: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Verwandte Module: [Angebotsanfragen](/pro/quotes)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
