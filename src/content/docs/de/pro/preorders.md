---
title: Vorbestellungen (Pre-Orders)
description: Modul fuer Vorbestellungen in Polski PRO for WooCommerce - Produkte als Pre-Order kennzeichnen, Erscheinungsdatum, benutzerdefinierter Schaltflaechentext und Warenkorb-Validierung.
---

Das Vorbestellungsmodul ermoeglicht es, Produkte als vorbestellbar zu kennzeichnen, das Erscheinungsdatum anzuzeigen, den Text der Kaufschaltflaeche zu aendern und das Mischen von Pre-Order-Produkten mit Standardprodukten im Warenkorb zu kontrollieren. Es ist nuetzlich in Shops fuer Elektronik, Buecher, Spiele und jedes Sortiment, bei dem Produkte vor dem offiziellen Verfuegbarkeitsdatum angeboten werden.

:::note[Wymagania]
Polski PRO wymaga: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Globale Konfiguration

Gehen Sie zu **WooCommerce > Ustawienia > Polski PRO > Przedsprzedaż**.

| Einstellung | Standardwert | Beschreibung |
|------------|------------------|------|
| Schaltflaechentext | "Zamów w przedsprzedaży" | Globaler Schaltflaechentext fuer Pre-Order-Produkte |
| Verfuegbarkeitstext | "Dostępne od {date}" | Textvorlage, die anstelle des Lagerstatus angezeigt wird |
| Datumsformat | `d.m.Y` | Format zur Anzeige des Erscheinungsdatums |
| Mischung im Warenkorb blockieren | Ja | Verbietet das Hinzufuegen von Standardprodukten zum Warenkorb mit Pre-Order |
| Sperrmeldung | "Produkty w przedsprzedaży muszą być zamawiane osobno." | Meldung bei Versuch der Mischung |

## Produktkonfiguration

### Metafelder

Die Vorbestellungseinstellungen befinden sich in der Produktbearbeitung, im Tab **Allgemein** im Produktdatenbereich.

| Metafeld | Schluessel | Typ | Beschreibung |
|-----------|-------|-----|------|
| Vorbestellung aktivieren | `_polski_preorder_enabled` | `bool` | Kennzeichnet das Produkt als Pre-Order |
| Erscheinungsdatum | `_polski_preorder_release_date` | `string` (Y-m-d) | Datum, ab dem das Produkt standardmaessig verfuegbar ist |
| Schaltflaechentext | `_polski_preorder_button_text` | `string` | Ueberschreibt den globalen Schaltflaechentext fuer dieses Produkt |
| Verfuegbarkeitstext | `_polski_preorder_availability_text` | `string` | Ueberschreibt den globalen Verfuegbarkeitstext |

### Einstellung per WP-CLI

```bash
wp post meta update 123 _polski_preorder_enabled "yes"
wp post meta update 123 _polski_preorder_release_date "2026-06-15"
wp post meta update 123 _polski_preorder_button_text "Zamów teraz - premiera 15 czerwca"
```

### Programmatische Einstellung

```php
update_post_meta($product_id, '_polski_preorder_enabled', 'yes');
update_post_meta($product_id, '_polski_preorder_release_date', '2026-06-15');
```

## Frontend-Anzeige

### Kaufschaltflaeche

Wenn ein Produkt als Pre-Order gekennzeichnet ist, aendert sich der Text der Schaltflaeche "In den Warenkorb" zum konfigurierten Vorbestellungstext. Dies betrifft:

- Einzelne Produktseiten
- Archiv-, Kategorie- und Tag-Seiten
- Suchergebnisse
- WooCommerce-Bloecke (Product Grid, Product Collection)

### Verfuegbarkeitstext

Anstelle des Standard-Lagerstatus ("Auf Lager", "Nicht vorraetig") wird der Verfuegbarkeitstext mit Erscheinungsdatum angezeigt. Der Platzhalter `{date}` wird durch das formatierte Datum ersetzt.

**Anzeigebeispiel:**

> Dostępne od 15.06.2026

### Automatische Deaktivierung

Nach Ueberschreiten des Erscheinungsdatums kehrt das Produkt automatisch in den Standardmodus zurueck. Die Deaktivierung erfolgt durch eine taeglich um 00:01 Uhr ausgefuehrte WP-Cron-Aufgabe.

```php
/**
 * Akcja wywoływana po automatycznej dezaktywacji przedsprzedaży.
 *
 * @param int    $product_id   ID produktu
 * @param string $release_date Data premiery (Y-m-d)
 */
do_action('polski_pro/preorder/deactivated', int $product_id, string $release_date);
```

**Beispiel - Kunden ueber Verfuegbarkeit benachrichtigen:**

```php
add_action('polski_pro/preorder/deactivated', function (int $product_id, string $release_date): void {
    $subscribers = get_post_meta($product_id, '_polski_preorder_subscribers', true);
    if (is_array($subscribers)) {
        foreach ($subscribers as $email) {
            wp_mail(
                $email,
                'Produkt jest już dostępny!',
                sprintf('Produkt %s jest teraz dostępny do zakupu.', get_the_title($product_id))
            );
        }
    }
}, 10, 2);
```

## Warenkorb-Validierung

### Produktmischung blockieren

Wenn die Option "Mischung im Warenkorb blockieren" aktiviert ist, kann der Kunde nicht gleichzeitig folgendes in den Warenkorb legen:

- Vorbestellungsprodukte und Standardprodukte
- Pre-Order-Produkte mit unterschiedlichen Erscheinungsdaten (optional)

Beim Versuch, einen anderen Produkttyp hinzuzufuegen, wird die Sperrmeldung angezeigt und das Produkt wird nicht hinzugefuegt.

### Validierungs-Hook

```php
/**
 * Filtruje, czy koszyk może zawierać mieszane typy produktów.
 *
 * @param bool $allow       Czy pozwolić na mieszanie (domyślnie false)
 * @param int  $product_id  ID dodawanego produktu
 * @param array $cart_items  Aktualne produkty w koszyku
 */
apply_filters('polski_pro/preorder/allow_mixed_cart', bool $allow, int $product_id, array $cart_items): bool;
```

**Beispiel - Mischung fuer VIP-Kunden erlauben:**

```php
add_filter('polski_pro/preorder/allow_mixed_cart', function (bool $allow, int $product_id, array $cart_items): bool {
    if (current_user_can('manage_woocommerce')) {
        return true;
    }
    return $allow;
}, 10, 3);
```

## Shortcode

Countdown bis zum Erscheinungsdatum anzeigen:

```
[polski_preorder_countdown product_id="123" format="days" label="Do premiery pozostało:"]
```

| Parameter | Erforderlich | Beschreibung |
|----------|----------|------|
| `product_id` | Nein | Produkt-ID (Standard: aktuelles Produkt) |
| `format` | Nein | Format: `days`, `full` (Tage, Stunden, Minuten) |
| `label` | Nein | Labeltext vor dem Countdown |

## Hooks

### Schaltflaechentext-Filter

```php
/**
 * Filtruje tekst przycisku przedsprzedaży.
 *
 * @param string      $text    Tekst przycisku
 * @param \WC_Product $product Obiekt produktu
 */
apply_filters('polski_pro/preorder/button_text', string $text, \WC_Product $product): string;
```

**Beispiel - dynamischer Text mit Preis:**

```php
add_filter('polski_pro/preorder/button_text', function (string $text, \WC_Product $product): string {
    return sprintf('Zamów za %s - premiera wkrótce', $product->get_price_html());
}, 10, 2);
```

### Verfuegbarkeitstext-Filter

```php
/**
 * Filtruje tekst dostępności przedsprzedaży.
 *
 * @param string      $text         Tekst dostępności
 * @param string      $release_date Data premiery (Y-m-d)
 * @param \WC_Product $product      Obiekt produktu
 */
apply_filters('polski_pro/preorder/availability_text', string $text, string $release_date, \WC_Product $product): string;
```

## Kompatibilitaet mit Varianten

Das Vorbestellungsmodul funktioniert mit variablen Produkten. Jede Variante kann unabhaengige Pre-Order-Einstellungen haben:

- Variante A - Standard (sofort verfuegbar)
- Variante B - Pre-Order (Erscheinung in 2 Wochen)

Die Mischung von Pre-Order- und Standard-Varianten innerhalb eines Produkts ist erlaubt - die Warenkorb-Validierung betrifft nur die Mischung verschiedener Produkte.

## Fehlerbehebung

**Produkt wechselt nach dem Erscheinungsdatum nicht automatisch**
Pruefen Sie, ob WP-Cron korrekt funktioniert. Wenn Sie einen externen CRON verwenden, stellen Sie sicher, dass `wp-cron.php` regelmaessig aufgerufen wird. Alternativ fuehren Sie manuell aus: `wp cron event run polski_pro_preorder_check`.

**Kunde hat Pre-Order- und Standardprodukte in den Warenkorb gelegt**
Pruefen Sie, ob die Option "Mischung im Warenkorb blockieren" aktiviert ist. Leeren Sie den Cache, wenn Sie Cache-Plugins verwenden, die Warenkorb-Fragmente cachen.

**Erscheinungsdatum wird im falschen Format angezeigt**
Pruefen Sie die Einstellung "Datumsformat" in der Modulkonfiguration. Das Format verwendet Standard-PHP-`date()`-Platzhalter.

## Naechste Schritte

- Probleme melden: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Verwandte Module: [Pakete und Add-ons](/pro/bundles-addons)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
