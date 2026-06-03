---
title: Vorbestellung (Pre-Orders)
description: Vorbestellungsmodul von Polski PRO for WooCommerce - Produkte als Pre-Order kennzeichnen, Erscheinungsdatum, benutzerdefinierter Button-Text und Warenkorb-Validierung.
---

Das Vorbestellungsmodul erlaubt es, Produkte als Pre-Order zu kennzeichnen, das Erscheinungsdatum anzuzeigen und den Button-Text zu ändern. Nützlich in Shops mit Elektronik, Büchern, Spielen und anderen Produkten, die vor dem Erscheinen angeboten werden.

:::note[Voraussetzungen]
Polski PRO erfordert: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Globale Konfiguration

Gehen Sie zu **WooCommerce > Einstellungen > Polski PRO > Vorbestellung**.

| Einstellung | Standardwert | Beschreibung |
|------------|------------------|------|
| Button-Text | "Vorbestellen" | Globaler Button-Text für Pre-Order-Produkte |
| Verfügbarkeitstext | "Verfügbar ab {date}" | Textvorlage, die anstelle des Lagerbestands angezeigt wird |
| Datumsformat | `d.m.Y` | Anzeigeformat des Erscheinungsdatums |
| Warenkorb-Mischung blockieren | Ja | Verhindert das Hinzufügen normaler Produkte zum Warenkorb mit Pre-Order |
| Sperr-Meldung | "Vorbestellte Produkte müssen separat bestellt werden." | Meldung beim Versuch der Mischung |

## Produktkonfiguration

### Meta-Felder

Die Einstellungen finden Sie in der Produktbearbeitung, Reiter **Allgemein**.

| Meta-Feld | Schlüssel | Typ | Beschreibung |
|-----------|-------|-----|------|
| Vorbestellung aktivieren | `_polski_preorder_enabled` | `bool` | Kennzeichnet das Produkt als Pre-Order |
| Erscheinungsdatum | `_polski_preorder_release_date` | `string` (Y-m-d) | Datum, ab dem das Produkt regulär verfügbar ist |
| Button-Text | `_polski_preorder_button_text` | `string` | Überschreibt den globalen Button-Text für dieses Produkt |
| Verfügbarkeitstext | `_polski_preorder_availability_text` | `string` | Überschreibt den globalen Verfügbarkeitstext |

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

## Anzeige im Frontend

### Kauf-Button

Der Button "In den Warenkorb" wechselt zum Vorbestellungstext. Das betrifft:

- die Einzelproduktseite
- Archiv-, Kategorie- und Tag-Seiten
- Suchergebnisse
- WooCommerce-Blöcke (Product Grid, Product Collection)

### Verfügbarkeitstext

Anstelle des Lagerbestands wird der Text mit dem Erscheinungsdatum angezeigt. Der Platzhalter `{date}` wird durch das Datum ersetzt.

**Anzeigebeispiel:**

> Verfügbar ab 15.06.2026

### Automatische Deaktivierung

Nach dem Erscheinungsdatum kehrt das Produkt automatisch in den Standardmodus zurück. WP-Cron prüft dies täglich um 00:01 Uhr.

```php
/**
 * Akcja wywoływana po automatycznej dezaktywacji przedsprzedaży.
 *
 * @param int    $product_id   ID produktu
 * @param string $release_date Data premiery (Y-m-d)
 */
do_action('polski_pro/preorder/deactivated', int $product_id, string $release_date);
```

**Beispiel - Kunden über Verfügbarkeit benachrichtigen:**

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

### Sperre für gemischte Produkte

Wenn "Warenkorb-Mischung blockieren" aktiviert ist, kann der Kunde nicht gleichzeitig hinzufügen:

- vorbestellte Produkte und Standardprodukte
- Pre-Order-Produkte mit unterschiedlichen Erscheinungsdaten (optional)

Beim Versuch der Mischung wird die Sperr-Meldung angezeigt.

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

**Beispiel - Mischung für VIP erlauben:**

```php
add_filter('polski_pro/preorder/allow_mixed_cart', function (bool $allow, int $product_id, array $cart_items): bool {
    if (current_user_can('manage_woocommerce')) {
        return true;
    }
    return $allow;
}, 10, 3);
```

## Shortcode

Anzeige eines Countdowns bis zum Erscheinungsdatum:

```
[polski_preorder_countdown product_id="123" format="days" label="Do premiery pozostało:"]
```

| Parameter | Erforderlich | Beschreibung |
|----------|----------|------|
| `product_id` | Nein | Produkt-ID (standardmäßig das aktuelle) |
| `format` | Nein | Format: `days`, `full` (Tage, Stunden, Minuten) |
| `label` | Nein | Beschriftungstext vor dem Countdown |

## Hooks

### Filter für den Button-Text

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

### Filter für den Verfügbarkeitstext

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

## Kompatibilität mit Varianten

Das Modul funktioniert mit variablen Produkten. Jede Variante hat unabhängige Pre-Order-Einstellungen:

- Variante A - Standard (sofort verfügbar)
- Variante B - Pre-Order (Erscheinung in 2 Wochen)

Das Mischen von Pre-Order- und Standardvarianten innerhalb eines Produkts ist erlaubt. Die Sperre betrifft nur das Mischen unterschiedlicher Produkte.

## Fehlerbehebung

**Das Produkt wechselt nach dem Erscheinungsdatum nicht automatisch um**
Prüfen Sie, ob WP-Cron korrekt funktioniert. Wenn Sie einen externen CRON nutzen, stellen Sie sicher, dass `wp-cron.php` regelmäßig aufgerufen wird. Alternativ manuell ausführen: `wp cron event run polski_pro_preorder_check`.

**Der Kunde hat Pre-Order- und reguläre Produkte zum Warenkorb hinzugefügt**
Prüfen Sie, ob die Option "Warenkorb-Mischung blockieren" aktiviert ist. Leeren Sie den Cache, wenn Sie Plugins nutzen, die Warenkorb-Fragmente cachen.

**Das Erscheinungsdatum wird im falschen Format angezeigt**
Prüfen Sie die Einstellung "Datumsformat" in der Modulkonfiguration. Das Format nutzt die Standard-Platzhalter von PHP `date()`.

## Nächste Schritte

- Probleme melden: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Verwandte Module: [Bundles und Add-ons](/pro/bundles-addons)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
