---
title: GA4 DataLayer / GTM
description: Moduł GA4 DataLayer w Polski for WooCommerce - zdarzenia ecommerce, integracja z Google Tag Manager i gtag.js, konfiguracja pomiarów.
---

Moduł DataLayer automatycznie wysyła zdarzenia ecommerce GA4 do warstwy danych (dataLayer). Obsługuje zarówno Google Tag Manager (GTM), jak i bezpośrednią integrację gtag.js. Skrypty ładowane są z atrybutem `defer` dla minimalnego wpływu na Web Vitals.

## Włączenie modułu

Przejdź do **WooCommerce > Polski > Moduły sklepowe** i włącz **GA4 DataLayer / GTM** (ID modułu: `datalayer`).

## Konfiguracja

Ustawienia modułu zapisywane są w opcji `polski_datalayer`. Przejdź do **WooCommerce > Polski > Moduły sklepowe > GA4 DataLayer / GTM**.

### Dostępne ustawienia

| Ustawienie             | Format          | Opis                                                    |
| ---------------------- | --------------- | ------------------------------------------------------- |
| `gtm_container_id`     | `GTM-XXXXXXX`  | Identyfikator kontenera Google Tag Manager               |
| `ga4_measurement_id`   | `G-XXXXXXXXXX` | Identyfikator pomiaru GA4 (dla trybu gtag.js)           |
| `use_sku_as_id`        | boolean         | Użyj SKU zamiast ID produktu jako `item_id`             |

### Tryby pracy

**Google Tag Manager** - wpisz `gtm_container_id`. Moduł wstrzyknie snippet kontenera GTM (skrypt w `<head>` i noscript w `<body>`). Zdarzenia ecommerce trafiają do `window.dataLayer`.

**gtag.js** - wpisz `ga4_measurement_id` (bez GTM). Moduł załaduje skrypt gtag.js bezpośrednio z Google i wyśle zdarzenia przez `gtag('event', ...)`.

Możesz użyć obu trybów jednocześnie - wtedy zdarzenia trafiają zarówno do dataLayer (GTM), jak i bezpośrednio do GA4.

## Zdarzenia ecommerce

Moduł wysyła następujące zdarzenia zgodne ze specyfikacją GA4 Enhanced Ecommerce:

### view_item_list

Wyświetlenie listy produktów (strona kategorii, wyniki wyszukiwania, strona sklepu).

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

Wyświetlenie strony pojedynczego produktu.

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

Dodanie produktu do koszyka. Zdarzenie wysyłane jest przez AJAX po kliknięciu przycisku **Dodaj do koszyka** (zarówno na stronie produktu, jak i na liście).

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

Usunięcie produktu z koszyka.

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

Rozpoczęcie procesu składania zamówienia (wejście na stronę kasy).

```javascript
dataLayer.push({
  event: 'begin_checkout',
  ecommerce: {
    currency: 'PLN',
    value: 179.98,
    items: [/* produkty z koszyka */]
  }
});
```

### purchase

Zakończenie zamówienia (strona podziękowania). Zdarzenie wysyłane jest tylko raz na zamówienie (zabezpieczenie przez cookie).

```javascript
dataLayer.push({
  event: 'purchase',
  ecommerce: {
    transaction_id: '12345',
    currency: 'PLN',
    value: 179.98,
    tax: 33.55,
    shipping: 9.99,
    items: [/* produkty z zamówienia */]
  }
});
```

## Snippet kontenera GTM

Po wpisaniu `gtm_container_id` moduł automatycznie wstrzykuje kod kontenera GTM:

**W sekcji `<head>`** (hook `wp_head`, priorytet 1):

```html
<script defer>
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.defer=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');
</script>
```

**Po otwarciu `<body>`** (hook `wp_body_open`):

```html
<noscript>
<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
```

## Wydajność i Web Vitals

Moduł jest zoptymalizowany pod kątem Core Web Vitals:

- **Defer** - skrypty GTM i gtag.js ładowane są z atrybutem `defer`, nie blokują renderowania strony
- **Inline dataLayer** - dane ecommerce wstrzykiwane są jako inline JSON, bez dodatkowych zapytań HTTP
- **Lazy events** - zdarzenia `add_to_cart` i `remove_from_cart` rejestrowane są przez delegację zdarzeń (jeden listener na dokumencie)
- **No layout shift** - snippet GTM noscript ma zerowe wymiary, nie powoduje CLS

## Identyfikator produktu

Domyślnie jako `item_id` używany jest ID produktu WooCommerce (post ID). Włącz opcję **Użyj SKU jako ID** (`use_sku_as_id`), aby zamiast tego wysyłać SKU produktu.

Gdy produkt nie ma przypisanego SKU, moduł używa ID produktu jako fallback.

## Dane produktów wariantowych

Dla produktów zmiennych (variable products) moduł wysyła dane wybranej wariacji:

- `item_id` - SKU wariacji (lub ID wariacji)
- `item_variant` - nazwa wybranych atrybutów (np. "Czerwony / XL")
- `price` - cena wariacji

## Hooki

```php
// Modyfikacja danych produktu przed wysłaniem do dataLayer
add_filter('polski/datalayer/item_data', function (array $item_data, \WC_Product $product): array {
    $item_data['item_brand'] = $product->get_attribute('marka');
    return $item_data;
}, 10, 2);

// Wyłączenie konkretnego zdarzenia
add_filter('polski/datalayer/event_enabled', function (bool $enabled, string $event_name): bool {
    if ($event_name === 'view_item_list') {
        return false;
    }
    return $enabled;
}, 10, 2);

// Modyfikacja danych zdarzenia purchase
add_filter('polski/datalayer/purchase_data', function (array $data, \WC_Order $order): array {
    $data['ecommerce']['coupon'] = implode(',', $order->get_coupon_codes());
    return $data;
}, 10, 2);
```

## Debugowanie

### Tryb podglądu GTM

Użyj [Tag Assistant](https://tagassistant.google.com/) do podglądu zdarzeń w czasie rzeczywistym. Otwórz Tag Assistant, połącz z domeną sklepu i przejdź przez cały proces zakupowy.

### Konsola przeglądarki

Sprawdź zawartość dataLayer w konsoli:

```javascript
console.table(window.dataLayer);
```

### DebugView GA4

W Google Analytics 4 przejdź do **Admin > DebugView**, aby zobaczyć zdarzenia w czasie rzeczywistym z urządzenia z włączonym trybem debug.

## Rozwiązywanie problemów

**Zdarzenie purchase nie wysyła się** - sprawdź, czy strona podziękowania nie jest cachowana. Wyłącz cache dla endpointu `order-received`.

**Brak zdarzeń add_to_cart** - upewnij się, że AJAX WooCommerce działa poprawnie. Sprawdź konsolę przeglądarki pod kątem błędów JavaScript.

**Duplikaty zdarzeń purchase** - moduł ustawia cookie `polski_datalayer_order_{id}` po wysłaniu zdarzenia. Jeśli cookie jest blokowane, zdarzenie może się powtórzyć.

**GTM snippet nie ładuje się** - sprawdź, czy motyw wywołuje `wp_head()` i `wp_body_open()`.

Zgłaszanie problemów: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ta strona ma wyłącznie charakter informacyjny i nie stanowi porady prawnej. Polski for WooCommerce jest oprogramowaniem open source (GPLv2) dostarczanym bez gwarancji.</div>
