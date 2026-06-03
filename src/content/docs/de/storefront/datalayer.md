---
title: GA4 DataLayer / GTM
description: GA4-DataLayer-Modul in Polski for WooCommerce - E-Commerce-Ereignisse, Integration mit Google Tag Manager und gtag.js, Messkonfiguration.
---

Das DataLayer-Modul sendet automatisch GA4-E-Commerce-Ereignisse an die Datenschicht (dataLayer). Es unterstützt sowohl den Google Tag Manager (GTM) als auch die direkte Integration über gtag.js. Die Skripte werden mit dem Attribut `defer` geladen, um die Auswirkungen auf die Web Vitals minimal zu halten.

## Modul aktivieren

Gehe zu **WooCommerce > Polski > Shop-Module** und aktiviere **GA4 DataLayer / GTM** (Modul-ID: `datalayer`).

## Konfiguration

Die Moduleinstellungen werden in der Option `polski_datalayer` gespeichert. Gehe zu **WooCommerce > Polski > Shop-Module > GA4 DataLayer / GTM**.

### Verfügbare Einstellungen

| Einstellung            | Format          | Beschreibung                                            |
| ---------------------- | --------------- | ------------------------------------------------------- |
| `gtm_container_id`     | `GTM-XXXXXXX`  | Kennung des Google-Tag-Manager-Containers                |
| `ga4_measurement_id`   | `G-XXXXXXXXXX` | GA4-Mess-ID (für den gtag.js-Modus)                     |
| `use_sku_as_id`        | boolean         | SKU anstelle der Produkt-ID als `item_id` verwenden     |

### Betriebsmodi

**Google Tag Manager** - gib `gtm_container_id` ein. Das Modul fügt den GTM-Container-Snippet ein (Skript im `<head>` und noscript im `<body>`). Die E-Commerce-Ereignisse gelangen in `window.dataLayer`.

**gtag.js** - gib `ga4_measurement_id` ein (ohne GTM). Das Modul lädt das gtag.js-Skript direkt von Google und sendet Ereignisse über `gtag('event', ...)`.

Du kannst beide Modi gleichzeitig verwenden, dann gelangen die Ereignisse sowohl in den dataLayer (GTM) als auch direkt an GA4.

## E-Commerce-Ereignisse

Das Modul sendet folgende Ereignisse gemäß der Spezifikation GA4 Enhanced Ecommerce:

### view_item_list

Anzeige einer Produktliste (Kategorieseite, Suchergebnisse, Shop-Seite).

```javascript
dataLayer.push({
  event: 'view_item_list',
  ecommerce: {
    item_list_id: 'category_tshirts',
    item_list_name: 'T-Shirts',
    items: [
      {
        item_id: 'SKU-001',
        item_name: 'Polo-Shirt',
        item_category: 'T-Shirts',
        price: 89.99,
        index: 0
      }
    ]
  }
});
```

### view_item

Anzeige der Einzelproduktseite.

```javascript
dataLayer.push({
  event: 'view_item',
  ecommerce: {
    currency: 'PLN',
    value: 89.99,
    items: [
      {
        item_id: 'SKU-001',
        item_name: 'Polo-Shirt',
        item_category: 'T-Shirts',
        price: 89.99,
        quantity: 1
      }
    ]
  }
});
```

### add_to_cart

Hinzufügen eines Produkts zum Warenkorb. Das Ereignis wird per AJAX nach dem Klick auf die Schaltfläche **In den Warenkorb** gesendet (sowohl auf der Produktseite als auch in der Liste).

```javascript
dataLayer.push({
  event: 'add_to_cart',
  ecommerce: {
    currency: 'PLN',
    value: 89.99,
    items: [
      {
        item_id: 'SKU-001',
        item_name: 'Polo-Shirt',
        item_category: 'T-Shirts',
        price: 89.99,
        quantity: 1
      }
    ]
  }
});
```

### remove_from_cart

Entfernen eines Produkts aus dem Warenkorb.

```javascript
dataLayer.push({
  event: 'remove_from_cart',
  ecommerce: {
    currency: 'PLN',
    value: 89.99,
    items: [
      {
        item_id: 'SKU-001',
        item_name: 'Polo-Shirt',
        price: 89.99,
        quantity: 1
      }
    ]
  }
});
```

### begin_checkout

Beginn des Bestellvorgangs (Aufruf der Kassenseite).

```javascript
dataLayer.push({
  event: 'begin_checkout',
  ecommerce: {
    currency: 'PLN',
    value: 179.98,
    items: [/* Produkte aus dem Warenkorb */]
  }
});
```

### purchase

Abschluss der Bestellung (Dankesseite). Das Ereignis wird nur einmal pro Bestellung gesendet (abgesichert über ein Cookie).

```javascript
dataLayer.push({
  event: 'purchase',
  ecommerce: {
    transaction_id: '12345',
    currency: 'PLN',
    value: 179.98,
    tax: 33.55,
    shipping: 9.99,
    items: [/* Produkte aus der Bestellung */]
  }
});
```

## GTM-Container-Snippet

Nach Eingabe von `gtm_container_id` fügt das Modul automatisch den GTM-Container-Code ein:

**Im Bereich `<head>`** (Hook `wp_head`, Priorität 1):

```html
<script defer>
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.defer=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');
</script>
```

**Nach dem Öffnen von `<body>`** (Hook `wp_body_open`):

```html
<noscript>
<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
```

## Leistung und Web Vitals

Das Modul ist im Hinblick auf die Core Web Vitals optimiert:

- **Defer** - die GTM- und gtag.js-Skripte werden mit dem Attribut `defer` geladen und blockieren das Rendern der Seite nicht
- **Inline dataLayer** - die E-Commerce-Daten werden als Inline-JSON eingefügt, ohne zusätzliche HTTP-Anfragen
- **Lazy events** - die Ereignisse `add_to_cart` und `remove_from_cart` werden über Event-Delegation registriert (ein Listener am Dokument)
- **No layout shift** - der GTM-noscript-Snippet hat Nullabmessungen und verursacht keinen CLS

## Produktkennung

Standardmäßig wird als `item_id` die WooCommerce-Produkt-ID (Post-ID) verwendet. Aktiviere die Option **SKU als ID verwenden** (`use_sku_as_id`), um stattdessen die SKU des Produkts zu senden.

Wenn einem Produkt keine SKU zugewiesen ist, verwendet das Modul die Produkt-ID als Fallback.

## Daten von variablen Produkten

Für variable Produkte (variable products) sendet das Modul die Daten der ausgewählten Variation:

- `item_id` - SKU der Variation (oder ID der Variation)
- `item_variant` - Name der ausgewählten Attribute (z. B. "Rot / XL")
- `price` - Preis der Variation

## Hooks

```php
// Produktdaten vor dem Senden an den dataLayer ändern
add_filter('polski/datalayer/item_data', function (array $item_data, \WC_Product $product): array {
    $item_data['item_brand'] = $product->get_attribute('marke');
    return $item_data;
}, 10, 2);

// Ein bestimmtes Ereignis deaktivieren
add_filter('polski/datalayer/event_enabled', function (bool $enabled, string $event_name): bool {
    if ($event_name === 'view_item_list') {
        return false;
    }
    return $enabled;
}, 10, 2);

// Daten des purchase-Ereignisses ändern
add_filter('polski/datalayer/purchase_data', function (array $data, \WC_Order $order): array {
    $data['ecommerce']['coupon'] = implode(',', $order->get_coupon_codes());
    return $data;
}, 10, 2);
```

## Debugging

### GTM-Vorschaumodus

Verwende den [Tag Assistant](https://tagassistant.google.com/) für die Vorschau der Ereignisse in Echtzeit. Öffne den Tag Assistant, verbinde ihn mit der Shop-Domain und durchlaufe den gesamten Kaufprozess.

### Browser-Konsole

Prüfe den Inhalt des dataLayer in der Konsole:

```javascript
console.table(window.dataLayer);
```

### GA4 DebugView

Gehe in Google Analytics 4 zu **Verwaltung > DebugView**, um die Ereignisse in Echtzeit von einem Gerät mit aktiviertem Debug-Modus zu sehen.

## Fehlerbehebung

**Das purchase-Ereignis wird nicht gesendet** - prüfe, ob die Dankesseite nicht zwischengespeichert wird. Deaktiviere den Cache für den Endpoint `order-received`.

**Keine add_to_cart-Ereignisse** - stelle sicher, dass das AJAX von WooCommerce korrekt funktioniert. Prüfe die Browser-Konsole auf JavaScript-Fehler.

**Doppelte purchase-Ereignisse** - das Modul setzt nach dem Senden des Ereignisses das Cookie `polski_datalayer_order_{id}`. Wenn das Cookie blockiert wird, kann sich das Ereignis wiederholen.

**Der GTM-Snippet wird nicht geladen** - prüfe, ob das Theme `wp_head()` und `wp_body_open()` aufruft.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
