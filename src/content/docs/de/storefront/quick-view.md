---
title: Schnellansicht
description: Schnellansicht-Modul in Polski for WooCommerce - Lightbox, Varianten, Galerie bis zu 4 Bilder.
---

Die Schnellansicht (Quick View) ermoeglicht es Kunden, Produktdetails zu sehen, ohne die Kategorie- oder Suchergebnisseite zu verlassen. Das Produkt oeffnet sich in einem Lightbox-Fenster mit der Moeglichkeit, es in den Warenkorb zu legen.

## Modul aktivieren

Gehen Sie zu **WooCommerce > Polski > Shop-Module** und aktivieren Sie die Option **Schnellansicht**. Auf den Produktkarten erscheint ein Augensymbol oder ein Button **Schnellansicht**.

## Lightbox

Die Schnellansicht oeffnet sich in einem modalen Fenster (Lightbox) mit abgedunkeltem Hintergrund. Das Fenster ist responsiv - auf dem Desktop nimmt es ca. 70% der Bildschirmbreite ein, auf mobilen Geraeten erstreckt es sich auf die volle Breite.

Lightbox-Inhalt:

- Bildergalerie (linke Seite)
- Produktname
- Preis (unter Beruecksichtigung von Omnibus-Aktionen)
- Kurzbeschreibung
- Variantenauswahl (fuer variable Produkte)
- Mengenfeld
- Button **In den Warenkorb**
- Link **Vollstaendige Details ansehen** zur Produktseite

Lightbox schliesst sich durch:
- Klick auf den X-Button
- Klick ausserhalb des Fensters (auf den Overlay)
- Druecken der Escape-Taste
- Zurueck-Button im Browser (History API)

## Variantenunterstuetzung

Fuer variable Produkte zeigt die Schnellansicht Dropdowns mit Attributen an, genau wie auf der Produktseite. Nach Auswahl einer Variante:

- Preis aktualisiert sich auf den Variantenpreis
- Bild wechselt zum der Variante zugewiesenen Bild
- Verfuegbarkeitsstatus aktualisiert sich
- Button **In den Warenkorb** wird erst nach Auswahl aller erforderlichen Attribute aktiv

Variantendaten werden einmalig zusammen mit dem Lightbox geladen - Variantenwechsel erzeugen keine zusaetzlichen Serveranfragen.

## Bildergalerie (bis zu 4 Bilder)

Der Lightbox zeigt bis zu **4 Bilder** des Produkts - Hauptbild und bis zu 3 Galeriebilder. Dieses Limit stellt schnelles Laden und eine uebersichtliche Oberflaeche im Vorschaufenster sicher.

Galerienavigation:

- Klick auf die Miniatur unter dem Hauptbild
- Links-/Rechts-Pfeile auf dem Hauptbild
- Swipe auf Touchgeraeten
- Pfeiltasten auf der Tastatur

Das Galerie-Bildlimit kann per Filter geaendert werden:

```php
add_filter('polski/quick_view/gallery_limit', function (): int {
    return 6;
});
```

## Konfiguration

| Option               | Beschreibung                                            | Standard   |
| -------------------- | ----------------------------------------------- | ----------- |
| Button-Position    | Wo der Button auf der Produktkarte angezeigt wird    | Auf der Miniatur |
| Button-Typ        | Augensymbol oder Text **Schnellansicht**          | Symbol       |
| Galerie              | Wie viele Bilder im Lightbox angezeigt werden                | 4           |
| Beschreibung                 | Ob die Kurzbeschreibung angezeigt wird                       | Ja         |
| Bewertungen                | Ob Bewertungssterne angezeigt werden                    | Ja         |
| Lieferzeit         | Ob die geschaetzte Lieferzeit angezeigt wird            | Ja         |
| Animation             | Oeffnungsanimationstyp (fade/slide/zoom)         | fade        |

## Laden von Inhalten per AJAX

Der Inhalt wird per AJAX nach Klick auf den Button geladen. Waehrend des Ladens wird ein Spinner angezeigt. Produktdaten werden im Browser gecacht - erneutes Oeffnen desselben Produkts sendet keine neue Anfrage.

```php
// Lightbox-Template aendern
add_filter('polski/quick_view/template', function (string $template): string {
    return get_stylesheet_directory() . '/polski/quick-view-custom.php';
});
```

## Integration mit anderen Modulen

Die Schnellansicht integriert sich mit anderen Modulen von Polski for WooCommerce:

- **Wunschliste** - Herz-Button im Lightbox sichtbar
- **Produktvergleich** - Vergleichsbutton im Lightbox sichtbar
- **Labels** - Badges (Sale, Neu, Bestseller) auf dem Bild angezeigt
- **Omnibus-Preis** - niedrigster Preis der letzten 30 Tage beim Aktionspreis sichtbar

## Barrierefreiheit

Der Lightbox unterstuetzt vollstaendige Tastaturnavigation:

- **Tab** - Wechsel zwischen interaktiven Elementen
- **Escape** - Fenster schliessen
- **Pfeile** - Galerienavigation
- Focus Trap - Fokus verlaesst den Lightbox nicht waehrend er geoeffnet ist
- ARIA-Attribute: `role="dialog"`, `aria-modal="true"`, `aria-label`

## CSS-Styling

- `.polski-quick-view-overlay` - Hintergrundabdunklung
- `.polski-quick-view-modal` - Lightbox-Fenster
- `.polski-quick-view-gallery` - Bildergalerie
- `.polski-quick-view-content` - Produktinhalt
- `.polski-quick-view-close` - Schliessen-Button
- `.polski-quick-view-trigger` - Oeffnungsbutton auf der Produktkarte

## Leistung

Skript und Styles werden lazy geladen - nur wenn auf der Seite ein Produkt mit Schnellansicht-Button vorhanden ist. Das JavaScript wiegt ca. 8 KB (gzip) und blockiert das Rendering nicht.

## Fehlerbehebung

**Lightbox oeffnet sich nicht** - pruefen Sie die Browser-Konsole. Haeufigste Ursache ist ein Konflikt mit einem anderen Lightbox-Plugin (z.B. WooCommerce Lightbox, FancyBox). Deaktivieren Sie den Standard-WooCommerce-Lightbox.

**Varianten laden nicht** - stellen Sie sicher, dass das variable Produkt korrekt konfigurierte Varianten mit Preisen hat.

**Galerie zeigt nur 1 Bild** - fuegen Sie Bilder zur Produktgalerie im WooCommerce-Editor hinzu (Abschnitt **Produktgalerie**, nicht nur **Produktbild**).

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
