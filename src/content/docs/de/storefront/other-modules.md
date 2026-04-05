---
title: Weitere Shop-Module
description: Zusaetzliche Module in Polski for WooCommerce - Tab-Manager, hervorgehobenes Video, Galerie-Zoom, Warteliste, unendliches Scrollen, Popup.
---

Polski for WooCommerce bietet eine Reihe zusaetzlicher Module zur Verbesserung des Shop-Betriebs. Jedes Modul kann unabhaengig unter **WooCommerce > Polski > Shop-Module** aktiviert werden.

## Tab-Manager

Der Tab-Manager ermoeglicht die Kontrolle ueber die auf der Produktseite angezeigten Tabs (Beschreibung, Zusaetzliche Informationen, Bewertungen usw.).

### Moeglichkeiten

- **Reihenfolge aendern** - Tabs per Drag & Drop in die gewuenschte Reihenfolge bringen
- **Tabs ausblenden** - gewaehlten Tab ausblenden, ohne Inhalte zu loeschen
- **Umbenennen** - Tabs eigene Namen geben (z.B. "Details" statt "Beschreibung")
- **Tabs hinzufuegen** - benutzerdefinierte Tabs mit eigenem Inhalt erstellen
- **Globale Tabs** - Tabs sichtbar auf allen Produkten
- **Tabs pro Produkt** - Tabs nur auf gewaehltem Produkt sichtbar
- **Tabs pro Kategorie** - Tabs sichtbar auf Produkten einer bestimmten Kategorie

Programmatisch:

```php
add_filter('woocommerce_product_tabs', function (array $tabs): array {
    $tabs['custom_tab'] = [
        'title'    => 'Garantie',
        'priority' => 25,
        'callback' => function (): void {
            echo '<p>Produkt mit 24-monatiger Herstellergarantie.</p>';
        },
    ];
    return $tabs;
});
```

## Hervorgehobenes Video

Das Modul ermoeglicht das Ersetzen oder Ergaenzen des Hauptproduktfotos durch ein Video.

### Unterstuetzte Quellen

- **YouTube** - Video-URL einfuegen
- **Vimeo** - Video-URL einfuegen
- **Eigenes Video** - MP4-Datei in die Medienbibliothek hochladen
- **Externe URL** - Link zu MP4/WebM-Datei

### Lazy Loading

YouTube- und Vimeo-Videos werden traege geladen - der iframe mit dem Player wird erst nach Klick auf die Miniatur mit Play-Symbol eingefuegt. Dadurch wird die Produktseite nicht durch externe Player-Skripte verlangsamt.

## Galerie-Zoom

Das Modul fuegt eine Vergroesserung der Produktfotos beim Ueberfahren mit dem Cursor oder Klicken hinzu.

### Zoom-Modi

- **Hover** - Vergroesserung innerhalb des Fotos beim Ueberfahren
- **Lupe** - dem Cursor folgende Lupe
- **Lightbox** - Vollbild-Ansicht beim Klicken

```php
// Zoom-Typ aendern
add_filter('polski/gallery_zoom/type', function (): string {
    return 'lens'; // 'hover', 'lens', 'lightbox'
});

// Vergroesserungsskala aendern
add_filter('polski/gallery_zoom/scale', function (): float {
    return 2.5; // Standard 2.0
});
```

## Warteliste (Waitlist)

Das Modul ermoeglicht es Kunden, sich fuer eine E-Mail-Benachrichtigung ueber die Verfuegbarkeit eines voruebergehend nicht verfuegbaren Produkts anzumelden.

### Funktionsweise

1. Kunde besucht die Seite eines nicht verfuegbaren Produkts
2. Statt des Buttons **In den Warenkorb** sieht er ein Formular mit E-Mail-Feld
3. Kunde gibt E-Mail-Adresse ein und klickt **Benachrichtigen**
4. Wenn das Produkt wieder auf Lager ist, sendet das System automatisch eine Benachrichtigung

### DSGVO-Einwilligung

Das Anmeldeformular enthaelt eine Checkbox zur Einwilligung in die Verarbeitung personenbezogener Daten gemaess DSGVO.

```php
add_filter('polski/waitlist/consent_text', function (): string {
    return 'Ich stimme dem Erhalt einer einmaligen Benachrichtigung ueber die Produktverfuegbarkeit zu.';
});
```

## Unendliches Scrollen (Infinite Scroll)

Das Modul ersetzt die traditionelle Paginierung durch automatisches Laden weiterer Produktseiten beim Scrollen.

### Modi

- **Automatisch** - naechste Seite laedt automatisch, wenn der Nutzer das Listenende erreicht
- **Button** - zeigt einen Button **Mehr laden** statt automatischem Laden

### SEO

Unendliches Scrollen unterstuetzt den Parameter `?paged=N` in der URL (History API). Suchmaschinen sehen weiterhin die klassische Paginierung - das Modul liefert paginierte URLs fuer Bots.

```php
// Infinite Scroll auf mobilen Geraeten deaktivieren
add_filter('polski/infinite_scroll/enabled', function (): bool {
    return ! wp_is_mobile();
});
```

## Popup

Das Modul zeigt ein konfigurierbares Popup (Modalfenster) auf der Shop-Seite an.

### Popup-Typen

- **Newsletter** - Newsletter-Anmeldeformular
- **Informativ** - beliebiger HTML-Inhalt/Shortcodes
- **Produkt** - Bewerbung eines ausgewaehlten Produkts
- **Exit** - wird beim Verlassensversuch der Seite angezeigt (Exit Intent)

### Ausloeser

| Ausloeser        | Beschreibung                                        |
| ---------------- | ------------------------------------------- |
| Zeit             | Nach X Sekunden seit Seitenaufruf         |
| Scroll           | Nach Scrollen von X% der Seite                   |
| Exit Intent      | Wenn der Cursor das Browserfenster verlaesst         |
| Klick       | Nach Klick auf ein Element mit CSS-Klasse          |
| Besuchszahl     | Nach dem N-ten Seitenbesuch                 |

### Anzeigebeschraenkungen

- **Einmal pro Sitzung** - Popup wird einmal waehrend des Besuchs angezeigt
- **Einmal alle X Tage** - Popup erscheint nicht erneut fuer X Tage (Cookie)
- **Nur neue Besucher** - Popup nur fuer neue Besucher sichtbar
- **Ausgewaehlte Seiten** - Popup nur auf angegebenen Seiten sichtbar

### Rechtliche Anforderungen

Das Popup sollte die Shop-Nutzung nicht behindern (Dark Patterns). Das Modul erzwingt:
- Sichtbarer Schliessen-Button (X)
- Schliessen durch Klick auf den Hintergrund
- Schliessen per Escape-Taste
- Keine Blockierung des Seitenscrollens unter dem Popup

## Fehlerbehebung

**Tab-Manager speichert Reihenfolge nicht** - leeren Sie den Browser- und WordPress-Cache. Das Problem kann auch durch einen Konflikt mit einem Tab-Plugin verursacht werden.

**Zoom funktioniert auf Mobile nicht** - Hover- und Linsen-Modus funktionieren nicht auf Touchgeraeten. Verwenden Sie den Lightbox-Modus fuer Mobile.

**Infinite Scroll laedt keine weiteren Seiten** - pruefen Sie, ob das Theme die Standard-WooCommerce-Paginierung (`woocommerce_pagination()`) verwendet.

**Popup wird nicht angezeigt** - pruefen Sie die Cookie-Einstellungen. Wenn das Popup bereits angezeigt wurde, blockiert ein Cookie die erneute Anzeige. Loeschen Sie Cookies oder stellen Sie eine andere Haeufigkeit ein.

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
