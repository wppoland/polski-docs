---
title: Produkt-Schnellansicht
description: Modul der Produkt-Schnellansicht in Polski for WooCommerce - Lightbox, Varianten, Galerie mit bis zu 4 Bildern.
---

Die Schnellansicht öffnet die Produktdetails in einem Lightbox-Fenster, ohne die Kategorieseite oder die Suchergebnisse zu verlassen. Der Kunde kann das Produkt direkt in den Warenkorb legen.

## Modul aktivieren

Gehen Sie zu **WooCommerce > Polski > Shop-Module** und aktivieren Sie **Schnellansicht**. Auf den Produktkarten erscheint ein Augen-Symbol oder eine Schaltfläche **Schnellansicht**.

## Lightbox

Das Fenster öffnet sich mit abgedunkeltem Hintergrund. Auf dem Desktop nimmt es etwa 70 % der Bildschirmbreite ein, auf dem Mobilgerät die volle Breite.

Inhalt der Lightbox:

- Bildergalerie (linke Seite)
- Produktname
- Preis (unter Berücksichtigung der Omnibus-Aktion)
- Kurzbeschreibung
- Variantenauswahl (für variable Produkte)
- Mengenfeld
- Schaltfläche **In den Warenkorb**
- Link **Vollständige Details ansehen**, der zur Produktseite führt

Die Lightbox schließt sich durch:
- Klick auf die Schaltfläche X
- Klick außerhalb des Fensters (auf das Overlay)
- Drücken der Escape-Taste
- Zurück-Schaltfläche im Browser (History API)

## Variantenunterstützung

Bei variablen Produkten zeigt die Schnellansicht Dropdowns mit den Attributen an. Nach Auswahl einer Variante:

- aktualisiert sich der Preis auf den Preis der Variante
- wechselt das Bild zum der Variante zugewiesenen Bild
- aktualisiert sich der Verfügbarkeitsstatus
- aktiviert sich die Schaltfläche **In den Warenkorb**, sobald alle Attribute ausgewählt sind

Die Variantendaten werden zusammen mit der Lightbox geladen - ein Variantenwechsel erfordert keine weiteren Serveranfragen.

## Bildergalerie (bis zu 4 Bilder)

Die Lightbox zeigt bis zu **4 Bilder** - das Hauptbild und bis zu 3 aus der Galerie. Dadurch lädt das Fenster schnell.

Navigation durch die Galerie:

- Klick auf eine Miniatur unter dem Hauptbild
- Pfeile links/rechts auf dem Hauptbild
- Swipe auf Touch-Geräten
- Pfeiltasten auf der Tastatur

Das Bildlimit der Galerie lässt sich per Filter ändern:

```php
add_filter('polski/quick_view/gallery_limit', function (): int {
    return 6;
});
```

## Konfiguration

In den Moduleinstellungen verfügbare Optionen:

| Option               | Beschreibung                                    | Standard    |
| -------------------- | ----------------------------------------------- | ----------- |
| Position der Schaltfläche | Wo die Schaltfläche auf der Produktkarte angezeigt wird | Auf der Miniatur |
| Schaltflächentyp     | Augen-Symbol oder Text **Schnellansicht**       | Symbol      |
| Galerie              | Wie viele Bilder in der Lightbox angezeigt werden | 4         |
| Beschreibung         | Ob die Kurzbeschreibung angezeigt wird          | Ja          |
| Bewertungen          | Ob Bewertungssterne angezeigt werden            | Ja          |
| Lieferzeit           | Ob die geschätzte Lieferzeit angezeigt wird     | Ja          |
| Animation            | Art der Öffnungsanimation (fade/slide/zoom)     | fade        |

## Laden der Inhalte per AJAX

Der Inhalt wird nach Klick auf die Schaltfläche per AJAX geladen. Während des Ladens ist ein Spinner zu sehen. Die Produktdaten werden im Browser zwischengespeichert - ein erneutes Öffnen desselben Produkts sendet keine neue Anfrage.

```php
// Lightbox-Template ändern
add_filter('polski/quick_view/template', function (string $template): string {
    return get_stylesheet_directory() . '/polski/quick-view-custom.php';
});
```

## Integration mit anderen Modulen

Die Schnellansicht arbeitet mit anderen Modulen zusammen:

- **Wunschliste** - Herz-Schaltfläche in der Lightbox sichtbar
- **Vergleich** - Vergleichsschaltfläche in der Lightbox sichtbar
- **Etiketten** - Abzeichen (Ausverkauf, Neuheit, Bestseller) auf dem Bild angezeigt
- **Omnibus-Preis** - niedrigster Preis der letzten 30 Tage neben dem Aktionspreis sichtbar

## Barrierefreiheit (accessibility)

Die Lightbox unterstützt die Tastaturnavigation:

- **Tab** - Wechsel zwischen interaktiven Elementen
- **Escape** - Fenster schließen
- **Pfeile** - Navigation durch die Galerie
- Focus-Trap - der Fokus verlässt die Lightbox nicht, solange sie geöffnet ist
- ARIA-Attribute: `role="dialog"`, `aria-modal="true"`, `aria-label`

## CSS-Gestaltung

CSS-Klassen des Moduls:

- `.polski-quick-view-overlay` - Abdunkelung des Hintergrunds
- `.polski-quick-view-modal` - Lightbox-Fenster
- `.polski-quick-view-gallery` - Bildergalerie
- `.polski-quick-view-content` - Produktinhalt
- `.polski-quick-view-close` - Schließen-Schaltfläche
- `.polski-quick-view-trigger` - öffnende Schaltfläche auf der Produktkarte

## Leistung

Skript und Styles werden verzögert geladen - nur wenn sich auf der Seite ein Produkt mit Schnellansicht-Schaltfläche befindet. Das JavaScript wiegt etwa 8 KB (gzip) und blockiert das Rendern nicht.

## Fehlerbehebung

**Die Lightbox öffnet sich nicht** - prüfen Sie die Browser-Konsole. Eine häufige Ursache ist ein Konflikt mit einem anderen Lightbox-Plugin (z. B. FancyBox). Deaktivieren Sie die Standard-Lightbox von WooCommerce.

**Die Varianten laden nicht** - prüfen Sie, ob das variable Produkt Varianten mit Preisen konfiguriert hat. Leere Varianten werden übersprungen.

**Die Galerie zeigt nur 1 Bild** - fügen Sie Bilder im Bereich **Produktgalerie** im WooCommerce-Editor hinzu (nicht nur **Produktbild**).

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
