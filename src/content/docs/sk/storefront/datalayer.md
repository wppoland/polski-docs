---
title: GA4 DataLayer / GTM
description: Modul GA4 DataLayer v Polski for WooCommerce - ecommerce udalosti, integrácia s Google Tag Manager a gtag.js, konfigurácia meraní.
---

Modul DataLayer automaticky odosiela ecommerce udalosti GA4 do dátovej vrstvy (dataLayer). Podporuje Google Tag Manager (GTM) aj priamu integráciu gtag.js. Skripty sa načítavajú s atribútom `defer` pre minimálny vplyv na Web Vitals.

## Zapnutie modulu

Prejdite do **WooCommerce > Polski > Moduly obchodu** a zapnite **GA4 DataLayer / GTM** (ID modulu: `datalayer`).

## Konfigurácia

Nastavenia modulu sa ukladajú v možnosti `polski_datalayer`. Prejdite do **WooCommerce > Polski > Moduly obchodu > GA4 DataLayer / GTM**.

### Dostupné nastavenia

| Nastavenie             | Formát          | Popis                                                    |
| ---------------------- | --------------- | ------------------------------------------------------- |
| `gtm_container_id`     | `GTM-XXXXXXX`  | Identifikátor kontajnera Google Tag Manager              |
| `ga4_measurement_id`   | `G-XXXXXXXXXX` | Identifikátor merania GA4 (pre režim gtag.js)            |
| `use_sku_as_id`        | boolean         | Použiť SKU namiesto ID produktu ako `item_id`            |

### Režimy prevádzky

**Google Tag Manager** - zadajte `gtm_container_id`. Modul vloží snippet kontajnera GTM (skript v `<head>` a noscript v `<body>`). Ecommerce udalosti sa dostávajú do `window.dataLayer`.

**gtag.js** - zadajte `ga4_measurement_id` (bez GTM). Modul načíta skript gtag.js priamo od Google a odošle udalosti cez `gtag('event', ...)`.

Môžete použiť oba režimy súčasne, vtedy sa udalosti dostávajú do dataLayer (GTM) aj priamo do GA4.

## Ecommerce udalosti

Modul odosiela nasledujúce udalosti v súlade so špecifikáciou GA4 Enhanced Ecommerce:

### view_item_list

Zobrazenie zoznamu produktov (stránka kategórie, výsledky vyhľadávania, stránka obchodu).

```javascript
dataLayer.push({
  event: 'view_item_list',
  ecommerce: {
    item_list_id: 'category_tricka',
    item_list_name: 'Tričká',
    items: [
      {
        item_id: 'SKU-001',
        item_name: 'Polo tričko',
        item_category: 'Tričká',
        price: 89.99,
        index: 0
      }
    ]
  }
});
```

### view_item

Zobrazenie stránky jednotlivého produktu.

```javascript
dataLayer.push({
  event: 'view_item',
  ecommerce: {
    currency: 'PLN',
    value: 89.99,
    items: [
      {
        item_id: 'SKU-001',
        item_name: 'Polo tričko',
        item_category: 'Tričká',
        price: 89.99,
        quantity: 1
      }
    ]
  }
});
```

### add_to_cart

Pridanie produktu do košíka. Udalosť sa odosiela cez AJAX po kliknutí na tlačidlo **Pridať do košíka** (na stránke produktu aj v zozname).

```javascript
dataLayer.push({
  event: 'add_to_cart',
  ecommerce: {
    currency: 'PLN',
    value: 89.99,
    items: [
      {
        item_id: 'SKU-001',
        item_name: 'Polo tričko',
        item_category: 'Tričká',
        price: 89.99,
        quantity: 1
      }
    ]
  }
});
```

### remove_from_cart

Odstránenie produktu z košíka.

```javascript
dataLayer.push({
  event: 'remove_from_cart',
  ecommerce: {
    currency: 'PLN',
    value: 89.99,
    items: [
      {
        item_id: 'SKU-001',
        item_name: 'Polo tričko',
        price: 89.99,
        quantity: 1
      }
    ]
  }
});
```

### begin_checkout

Začatie procesu zadávania objednávky (vstup na stránku pokladne).

```javascript
dataLayer.push({
  event: 'begin_checkout',
  ecommerce: {
    currency: 'PLN',
    value: 179.98,
    items: [/* produkty z košíka */]
  }
});
```

### purchase

Dokončenie objednávky (stránka poďakovania). Udalosť sa odosiela len raz na objednávku (zabezpečené cez cookie).

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

## Snippet kontajnera GTM

Po zadaní `gtm_container_id` modul automaticky vloží kód kontajnera GTM:

**V sekcii `<head>`** (hook `wp_head`, priorita 1):

```html
<script defer>
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.defer=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');
</script>
```

**Po otvorení `<body>`** (hook `wp_body_open`):

```html
<noscript>
<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
```

## Výkon a Web Vitals

Modul je optimalizovaný pre Core Web Vitals:

- **Defer** - skripty GTM a gtag.js sa načítavajú s atribútom `defer`, neblokujú vykresľovanie stránky
- **Inline dataLayer** - ecommerce údaje sa vkladajú ako inline JSON, bez dodatočných HTTP dopytov
- **Lazy events** - udalosti `add_to_cart` a `remove_from_cart` sú registrované cez delegáciu udalostí (jeden listener na dokumente)
- **No layout shift** - GTM noscript snippet má nulové rozmery, nespôsobuje CLS

## Identifikátor produktu

Predvolene sa ako `item_id` používa ID produktu WooCommerce (post ID). Zapnite možnosť **Použiť SKU ako ID** (`use_sku_as_id`), aby sa namiesto toho odosielalo SKU produktu.

Keď produkt nemá priradené SKU, modul použije ID produktu ako fallback.

## Údaje variantných produktov

Pre variabilné produkty (variable products) modul odosiela údaje vybraného variantu:

- `item_id` - SKU variantu (alebo ID variantu)
- `item_variant` - názov vybraných atribútov (napr. "Červený / XL")
- `price` - cena variantu

## Hooky

```php
// Úprava údajov produktu pred odoslaním do dataLayer
add_filter('polski/datalayer/item_data', function (array $item_data, \WC_Product $product): array {
    $item_data['item_brand'] = $product->get_attribute('marka');
    return $item_data;
}, 10, 2);

// Vypnutie konkrétnej udalosti
add_filter('polski/datalayer/event_enabled', function (bool $enabled, string $event_name): bool {
    if ($event_name === 'view_item_list') {
        return false;
    }
    return $enabled;
}, 10, 2);

// Úprava údajov udalosti purchase
add_filter('polski/datalayer/purchase_data', function (array $data, \WC_Order $order): array {
    $data['ecommerce']['coupon'] = implode(',', $order->get_coupon_codes());
    return $data;
}, 10, 2);
```

## Ladenie

### Režim náhľadu GTM

Použite [Tag Assistant](https://tagassistant.google.com/) na náhľad udalostí v reálnom čase. Otvorte Tag Assistant, pripojte sa k doméne obchodu a prejdite celým nákupným procesom.

### Konzola prehliadača

Skontrolujte obsah dataLayer v konzole:

```javascript
console.table(window.dataLayer);
```

### DebugView GA4

V Google Analytics 4 prejdite do **Admin > DebugView**, aby ste videli udalosti v reálnom čase zo zariadenia so zapnutým režimom debug.

## Riešenie problémov

**Udalosť purchase sa neodosiela** - skontrolujte, či stránka poďakovania nie je cachovaná. Vypnite cache pre endpoint `order-received`.

**Chýbajú udalosti add_to_cart** - uistite sa, že AJAX WooCommerce funguje správne. Skontrolujte konzolu prehliadača na chyby JavaScriptu.

**Duplikáty udalostí purchase** - modul po odoslaní udalosti nastaví cookie `polski_datalayer_order_{id}`. Ak je cookie blokované, udalosť sa môže zopakovať.

**GTM snippet sa nenačítava** - skontrolujte, či šablóna volá `wp_head()` a `wp_body_open()`.

Nahlasovanie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informačný charakter a nepredstavuje právnu radu. Polski for WooCommerce je open source softvér (GPLv2) dodávaný bez záruky.</div>
