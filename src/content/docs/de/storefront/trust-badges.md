---
title: Vertrauenssiegel (trust badges)
description: Modul für Vertrauenssiegel in Polski for WooCommerce - konfigurierbare Vertrauenssignale auf Produkt-, Warenkorb- und Checkout-Seiten.
---

Vertrauenssiegel sind grafische Elemente, die Kunden über sichere Zahlungen, schnelle Lieferung, Rückgabemöglichkeiten und Qualitätsgarantie informieren. Sie helfen, die Conversion zu steigern, indem sie in entscheidenden Momenten der Kaufreise Vertrauen aufbauen.

## Modul aktivieren

Gehen Sie zu **WooCommerce > Polski > Shop-Module** und aktivieren Sie **Vertrauenssiegel**. Die Symbole erscheinen automatisch auf den Produkt-, Warenkorb- und Checkout-Seiten.

## Funktionen

- Konfigurierbare Vertrauenssignale mit inline eingebetteten SVG-Symbolen
- Anzeige auf den Produkt-, Warenkorb- und Bestellübersichtsseiten
- 7 Symboltypen: Schloss (lock), Lkw (truck), Aktualisieren (refresh), Schild (shield), Stern (star), Häkchen (check), Herz (heart)
- Eigene Texte unter jedem Siegel
- Reines CSS ohne externe Abhängigkeiten
- Responsive Anordnung auf Mobilgeräten

## Einstellungen

Konfiguration unter **WooCommerce > Polski > Shop-Module > Vertrauenssiegel**.

| Einstellung | Standard | Beschreibung |
|---|---|---|
| `show_on_product` | `true` | Siegel auf der Produktseite anzeigen |
| `show_on_cart` | `true` | Siegel auf der Warenkorbseite anzeigen |
| `show_on_checkout` | `true` | Siegel auf der Checkout-Seite anzeigen |

Jedes Siegel lässt sich einzeln aktivieren/deaktivieren und konfigurieren:

- **Symbol** - Auswahl aus 7 verfügbaren Typen
- **Titel** - kurzer Text unter dem Symbol (z. B. "Sichere Zahlung")
- **Reihenfolge** - Position relativ zu den anderen Siegeln

Option in der Datenbank: `polski_trust_badges`.

## Standardsiegel

Nach der Aktivierung des Moduls stehen 4 vordefinierte Siegel zur Verfügung:

| Siegel | Symbol | Standardtext |
|---|---|---|
| Sichere Zahlung | lock | Verschlüsselte SSL-Verbindung |
| Schnelle Lieferung | truck | Versand in 24h |
| Rückgabe | refresh | 14 Tage Rückgaberecht |
| Qualitätsgarantie | shield | Originalprodukte |

## Technische Details

### SVG-Symbole

Alle Symbole werden als inline SVG gerendert - keine HTTP-Anfragen, keine Abhängigkeit von Symbol-Bibliotheken. Jedes Symbol hat eine Größe von 32x32px und erbt die Farbe aus dem CSS.

### Hooks

```php
// Liste der Siegel filtern
add_filter('polski/trust_badges/items', function (array $badges): array {
    // Eigenes Siegel hinzufügen
    $badges[] = [
        'icon'  => 'star',
        'title' => 'Ponad 1000 opinii',
    ];
    return $badges;
});

// Position auf der Produktseite ändern
add_filter('polski/trust_badges/product_hook', function (): string {
    return 'woocommerce_after_add_to_cart_form'; // Standard: woocommerce_product_meta_end
});
```

### CSS-Klassen

- `.polski-trust-badges` - Hauptcontainer
- `.polski-trust-badge` - einzelnes Siegel
- `.polski-trust-badge__icon` - SVG-Symbol
- `.polski-trust-badge__title` - Text unter dem Symbol

```css
.polski-trust-badges {
    display: flex;
    gap: 1rem;
    justify-content: center;
    padding: 1rem 0;
    border-top: 1px solid #e5e7eb;
}
```

### Modul-ID

`trust_badges`

## Fehlerbehebung

**Die Siegel werden nicht angezeigt** - prüfen Sie, ob Ihr Theme die WooCommerce-Hooks auf der Produktseite (`woocommerce_product_meta_end`) und im Warenkorb (`woocommerce_after_cart_totals`) unterstützt.

**Die Symbole sind zu klein/zu groß** - überschreiben Sie die Größe im CSS: `.polski-trust-badge__icon svg { width: 40px; height: 40px; }`.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
