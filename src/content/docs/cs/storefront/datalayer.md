---
title: GA4 DataLayer / GTM
description: Modul GA4 DataLayer v Polski for WooCommerce - e-commerce události, integrace s Google Tag Manager a gtag.js, konfigurace měření.
---

Modul DataLayer automaticky odesílá e-commerce události GA4 do datové vrstvy (dataLayer). Podporuje jak Google Tag Manager (GTM), tak přímou integraci gtag.js. Skripty jsou načítány s atributem `defer` pro minimální vliv na Web Vitals.

## Zapnutí modulu

Přejděte do **WooCommerce > Polski > Moduly obchodu** a zapněte **GA4 DataLayer / GTM** (ID modulu: `datalayer`).

## Konfigurace

Nastavení modulu se ukládají do volby `polski_datalayer`. Přejděte do **WooCommerce > Polski > Moduly obchodu > GA4 DataLayer / GTM**.

### Dostupná nastavení

| Nastavení              | Formát          | Popis                                                   |
| ---------------------- | --------------- | ------------------------------------------------------- |
| `gtm_container_id`     | `GTM-XXXXXXX`  | Identifikátor kontejneru Google Tag Manager              |
| `ga4_measurement_id`   | `G-XXXXXXXXXX` | Identifikátor měření GA4 (pro režim gtag.js)            |
| `use_sku_as_id`        | boolean         | Použít SKU místo ID produktu jako `item_id`             |

### Režimy práce

**Google Tag Manager** - zadejte `gtm_container_id`. Modul vloží snippet kontejneru GTM (skript v `<head>` a noscript v `<body>`). E-commerce události putují do `window.dataLayer`.

**gtag.js** - zadejte `ga4_measurement_id` (bez GTM). Modul načte skript gtag.js přímo z Google a odešle události přes `gtag('event', ...)`.

Můžete použít oba režimy současně, potom události putují jak do dataLayer (GTM), tak přímo do GA4.

## E-commerce události

Modul odesílá následující události odpovídající specifikaci GA4 Enhanced Ecommerce:

### view_item_list

Zobrazení seznamu produktů (stránka kategorie, výsledky vyhledávání, stránka obchodu).

```javascript
dataLayer.push({
  event: 'view_item_list',
  ecommerce: {
    item_list_id: 'category_koszulki',
    item_list_name: 'Koszulki',
    items: [
      {
        item_id: 'SKU-001',
        item_name: 'Koszulka polo',
        item_category: 'Koszulki',
        price: 89.99,
        index: 0
      }
    ]
  }
});
```

### view_item

Zobrazení stránky jednotlivého produktu.

```javascript
dataLayer.push({
  event: 'view_item',
  ecommerce: {
    currency: 'PLN',
    value: 89.99,
    items: [
      {
        item_id: 'SKU-001',
        item_name: 'Koszulka polo',
        item_category: 'Koszulki',
        price: 89.99,
        quantity: 1
      }
    ]
  }
});
```

### add_to_cart

Přidání produktu do košíku. Událost se odesílá přes AJAX po kliknutí na tlačítko **Přidat do košíku** (jak na stránce produktu, tak v seznamu).

```javascript
dataLayer.push({
  event: 'add_to_cart',
  ecommerce: {
    currency: 'PLN',
    value: 89.99,
    items: [
      {
        item_id: 'SKU-001',
        item_name: 'Koszulka polo',
        item_category: 'Koszulki',
        price: 89.99,
        quantity: 1
      }
    ]
  }
});
```

### remove_from_cart

Odstranění produktu z košíku.

```javascript
dataLayer.push({
  event: 'remove_from_cart',
  ecommerce: {
    currency: 'PLN',
    value: 89.99,
    items: [
      {
        item_id: 'SKU-001',
        item_name: 'Koszulka polo',
        price: 89.99,
        quantity: 1
      }
    ]
  }
});
```

### begin_checkout

Zahájení procesu objednávky (vstup na stránku pokladny).

```javascript
dataLayer.push({
  event: 'begin_checkout',
  ecommerce: {
    currency: 'PLN',
    value: 179.98,
    items: [/* produkty z košíku */]
  }
});
```

### purchase

Dokončení objednávky (stránka poděkování). Událost se odesílá pouze jednou na objednávku (zabezpečení pomocí cookie).

```javascript
dataLayer.push({
  event: 'purchase',
  ecommerce: {
    transaction_id: '12345',
    currency: 'PLN',
    value: 179.98,
    tax: 33.55,
    shipping: 9.99,
    items: [/* produkty z objednávky */]
  }
});
```

## Snippet kontejneru GTM

Po zadání `gtm_container_id` modul automaticky vloží kód kontejneru GTM:

**V sekci `<head>`** (hook `wp_head`, priorita 1):

```html
<script defer>
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.defer=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');
</script>
```

**Po otevření `<body>`** (hook `wp_body_open`):

```html
<noscript>
<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
```

## Výkon a Web Vitals

Modul je optimalizován s ohledem na Core Web Vitals:

- **Defer** - skripty GTM a gtag.js jsou načítány s atributem `defer`, neblokují vykreslování stránky
- **Inline dataLayer** - e-commerce data jsou vkládána jako inline JSON, bez dodatečných HTTP požadavků
- **Lazy events** - události `add_to_cart` a `remove_from_cart` jsou registrovány delegací událostí (jeden listener na dokumentu)
- **No layout shift** - snippet GTM noscript má nulové rozměry, nezpůsobuje CLS

## Identifikátor produktu

Ve výchozím nastavení se jako `item_id` používá ID produktu WooCommerce (post ID). Zapněte volbu **Použít SKU jako ID** (`use_sku_as_id`), aby se místo toho odesílalo SKU produktu.

Když produkt nemá přiřazené SKU, modul jako fallback použije ID produktu.

## Data variantních produktů

Pro variabilní produkty (variable products) modul odesílá data zvolené varianty:

- `item_id` - SKU varianty (nebo ID varianty)
- `item_variant` - název zvolených atributů (např. "Červená / XL")
- `price` - cena varianty

## Hooky

```php
// Úprava dat produktu před odesláním do dataLayer
add_filter('polski/datalayer/item_data', function (array $item_data, \WC_Product $product): array {
    $item_data['item_brand'] = $product->get_attribute('marka');
    return $item_data;
}, 10, 2);

// Vypnutí konkrétní události
add_filter('polski/datalayer/event_enabled', function (bool $enabled, string $event_name): bool {
    if ($event_name === 'view_item_list') {
        return false;
    }
    return $enabled;
}, 10, 2);

// Úprava dat události purchase
add_filter('polski/datalayer/purchase_data', function (array $data, \WC_Order $order): array {
    $data['ecommerce']['coupon'] = implode(',', $order->get_coupon_codes());
    return $data;
}, 10, 2);
```

## Ladění

### Režim náhledu GTM

Použijte [Tag Assistant](https://tagassistant.google.com/) pro náhled událostí v reálném čase. Otevřete Tag Assistant, připojte k doméně obchodu a projděte celým nákupním procesem.

### Konzole prohlížeče

Zkontrolujte obsah dataLayer v konzoli:

```javascript
console.table(window.dataLayer);
```

### DebugView GA4

V Google Analytics 4 přejděte do **Admin > DebugView**, abyste viděli události v reálném čase ze zařízení se zapnutým režimem debug.

## Řešení problémů

**Událost purchase se neodesílá** - zkontrolujte, zda stránka poděkování není ukládána do mezipaměti. Vypněte mezipaměť pro endpoint `order-received`.

**Chybí události add_to_cart** - ujistěte se, že AJAX WooCommerce funguje správně. Zkontrolujte konzoli prohlížeče na chyby JavaScriptu.

**Duplicitní události purchase** - modul nastavuje cookie `polski_datalayer_order_{id}` po odeslání události. Pokud je cookie blokována, událost se může opakovat.

**Snippet GTM se nenačítá** - zkontrolujte, zda šablona volá `wp_head()` a `wp_body_open()`.

Hlášení problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Polski for WooCommerce je software s otevřeným zdrojovým kódem (GPLv2) poskytovaný bez záruky.</div>
