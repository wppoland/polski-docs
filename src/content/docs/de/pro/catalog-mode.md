---
title: B2B-Katalogmodus
description: Modul fuer den Katalogmodus in Polski PRO for WooCommerce - Preise verbergen, Kaeufe sperren, Weiterleitung zu Angebotsanfragen und Integration mit dem RFQ-Modul.
---

Der Katalogmodus verwandelt den Shop in einen Katalog ohne Kaufmoeglichkeit. Verbergen Sie Preise, ersetzen Sie Buttons durch Meldungen oder leiten Sie zu Angebotsanfragen weiter. Fuer B2B-Shops mit individuellen Preisen.

:::note[Wymagania]
Polski PRO wymaga: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Konfiguration

Gehen Sie zu **WooCommerce > Ustawienia > Polski PRO > Tryb katalogowy** und aktivieren Sie das Modul (Option `polski_catalog`).

### Haupteinstellungen

| Einstellung | Option in der Datenbank | Standardwert | Beschreibung |
|------------|---------------|------------------|------|
| Katalogmodus aktivieren | `polski_catalog` | Nein | Aktiviert den Katalogmodus |
| Preise verbergen | `polski_catalog_hide_prices` | Ja | Entfernt die Preisanzeige |
| Warenkorb-Schaltflaeche verbergen | `polski_catalog_hide_cart` | Ja | Entfernt die Schaltflaeche "In den Warenkorb" |
| Preis-Ersatztext | `polski_catalog_price_text` | "Zapytaj o cenę" | Text, der anstelle des Preises angezeigt wird |
| Meldung auf dem Produkt | `polski_catalog_notice` | "" | Meldung, die auf der Produktseite angezeigt wird |
| Weiterleitung zu RFQ | `polski_catalog_redirect_rfq` | Nein | Weiterleitung zum Angebotsanfrageformular |
| Bedingter Modus | `polski_catalog_conditional` | `all` | `all`, `guests`, `roles` |

### Bedingter Modus

Der Katalogmodus kann aktiv sein:

- **Fuer alle** (`all`) - jeder sieht den Katalog ohne Preise
- **Nur fuer nicht angemeldete Besucher** (`guests`) - angemeldete Kunden sehen Preise und koennen kaufen
- **Fuer ausgewaehlte Rollen** (`roles`) - Katalog nur fuer ausgewaehlte WordPress-Rollen aktiv

Der bedingte Modus "Nur fuer nicht angemeldete Besucher" ist beliebt in B2B-Modellen, bei denen der Grosshaendler eine Kontoregistrierung vor der Preisanzeige verlangt.

```php
// Przykład: własna logika warunkowa
add_filter('polski_pro/catalog/is_active', function (bool $is_active): bool {
    // Wyłącz tryb katalogowy dla klientów z co najmniej 5 zamówieniami
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

Das Modul klinkt sich in den Filter `woocommerce_get_price_html` ein und ersetzt den Preis-HTML durch den konfigurierten Ersatztext.

```php
/**
 * Filtruje tekst zastępczy ceny w trybie katalogowym.
 *
 * @param string      $replacement Tekst zastępczy
 * @param \WC_Product $product     Obiekt produktu
 */
apply_filters('polski_pro/catalog/price_replacement', string $replacement, \WC_Product $product): string;
```

**Beispiel - verschiedene Texte fuer Kategorien:**

```php
add_filter('polski_pro/catalog/price_replacement', function (string $replacement, \WC_Product $product): string {
    if (has_term('premium', 'product_cat', $product->get_id())) {
        return '<span class="price-inquiry">Cena ustalana indywidualnie</span>';
    }
    return $replacement;
}, 10, 2);
```

### Kaeufe sperren

Das Modul nutzt den Filter `woocommerce_is_purchasable`, um die Kaufmoeglichkeit zu blockieren:

```php
/**
 * Filtruje, czy produkt jest dostępny do zakupu w trybie katalogowym.
 *
 * @param bool        $purchasable Czy produkt jest dostępny do zakupu
 * @param \WC_Product $product     Obiekt produktu
 */
apply_filters('polski_pro/catalog/is_purchasable', bool $purchasable, \WC_Product $product): bool;
```

**Beispiel - Kauf bestimmter Produkte erlauben:**

```php
add_filter('polski_pro/catalog/is_purchasable', function (bool $purchasable, \WC_Product $product): bool {
    $always_purchasable = [101, 102, 103]; // ID produktów zawsze dostępnych
    if (in_array($product->get_id(), $always_purchasable, true)) {
        return true;
    }
    return $purchasable;
}, 10, 2);
```

### Meldung auf der Produktseite

Wenn die Option `polski_catalog_notice` gesetzt ist, wird auf der Einzelproduktseite eine Meldung (Notice) angezeigt, die den Kunden ueber den Katalogmodus informiert.

Beispielmeldung:

> Um den Preis dieses Produkts zu erfahren, kontaktieren Sie unser Vertriebsteam oder fuellen Sie das Angebotsanfrageformular aus.

## Integration mit dem Angebotsanfragemodul

Wenn die Option `polski_catalog_redirect_rfq` aktiviert ist, fuehrt die Ersatzschaltflaeche auf der Produktseite zum Angebotsanfrageformular ([RFQ-Modul](/pro/quotes)). Die Integration umfasst:

1. Schaltflaeche "Preis anfragen" statt "In den Warenkorb"
2. Automatische Uebergabe der Produkt-ID an das RFQ-Formular
3. Vorbefuellung des Produktnamens im Formular
4. Rueckkehr zum Produkt nach dem Absenden der Anfrage

Damit die Integration funktioniert, muessen beide Module - Katalog und RFQ - aktiv sein.

## Elemente verbergen

Neben Preisen und der Warenkorb-Schaltflaeche verbirgt das Modul automatisch:

| Element | WooCommerce-Hook | Effekt |
|---------|-----------------|-------|
| Schaltflaeche "In den Warenkorb" | `woocommerce_is_purchasable` | Produkt als nicht kaufbar markiert |
| Preis | `woocommerce_get_price_html` | Preis-HTML durch Text ersetzt |
| Warenkorb-Symbol im Header | `polski_pro/catalog/hide_cart_icon` | Verbirgt das Mini-Warenkorb-Symbol |
| Warenkorbseite | `template_redirect` | Weiterleitung von /cart/ zur Startseite |
| Checkout-Seite | `template_redirect` | Weiterleitung von /checkout/ zur Startseite |

### Selektives Verbergen

Es muessen nicht alle Elemente gleichzeitig verborgen werden. Jede Option kann unabhaengig ein- oder ausgeschaltet werden. Zum Beispiel:

- Preise verbergen, aber Warenkorb-Schaltflaeche belassen (Kunde kauft zum "unbekannten Preis" - Kontakt nach Bestellung)
- Warenkorb-Schaltflaeche verbergen, aber Preise zeigen (Kunde sieht Preise, muss aber den Kauf anfragen)
- Alles verbergen (vollstaendiger Katalogmodus)

## Produkte und Kategorien ausschliessen

### Produkte ausschliessen

Ausgewaehlte Produkte koennen vom Katalogmodus ausgeschlossen werden - in der Produktbearbeitung, Tab **Polski PRO > Tryb katalogowy**, Option "Vom Katalogmodus ausschliessen" aktivieren.

### Kategorien ausschliessen

```php
/**
 * Filtruje kategorie wykluczone z trybu katalogowego.
 *
 * @param array $excluded_categories Tablica ID kategorii
 */
apply_filters('polski_pro/catalog/excluded_categories', array $excluded_categories): array;
```

**Beispiel:**

```php
add_filter('polski_pro/catalog/excluded_categories', function (array $excluded_categories): array {
    $excluded_categories[] = 15; // "Akcesoria" - zawsze dostępne do zakupu
    $excluded_categories[] = 28; // "Outlet"
    return $excluded_categories;
});
```

## CSS-Hilfsklassen

Das Modul fuegt dem `<body>` CSS-Klassen zur Unterstuetzung des Stylings hinzu:

| Klasse | Wann hinzugefuegt |
|-------|----------------|
| `polski-catalog-mode` | Katalogmodus ist aktiv |
| `polski-catalog-prices-hidden` | Preise sind verborgen |
| `polski-catalog-cart-hidden` | Warenkorb-Schaltflaeche ist verborgen |

**CSS-Beispiel:**

```css
.polski-catalog-mode .price {
    display: none; /* Dodatkowe ukrycie ceny, jeśli motyw nie respektuje filtra */
}

.polski-catalog-mode .single_add_to_cart_button {
    background-color: #0073aa;
    content: "Zapytaj o cenę";
}
```

## Fehlerbehebung

**Preise werden trotz aktiviertem Katalogmodus weiterhin angezeigt**
Einige Themes verwenden nicht-standardmaessige Methoden zur Preisanzeige und umgehen den Filter `woocommerce_get_price_html`. Verwenden Sie die CSS-Klassen `.polski-catalog-prices-hidden .price { display: none; }` als Absicherung.

**Kunde kann Produkt ueber direkte URL in den Warenkorb legen**
Das Modul blockiert dies auf Ebene des Filters `woocommerce_is_purchasable`. Wenn das Problem auftritt, pruefen Sie, ob ein anderes Plugin diesen Filter mit hoeherer Prioritaet ueberschreibt.

**Bedingter Modus funktioniert nicht korrekt mit Cache**
Cache-Plugins koennen die gecachte Version unabhaengig vom Anmeldestatus ausliefern. Konfigurieren Sie das Cache-Plugin so, dass es den Cache fuer angemeldete und nicht angemeldete Benutzer trennt.

## Naechste Schritte

- Probleme melden: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Verwandte Module: [Angebotsanfragen](/pro/quotes)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
