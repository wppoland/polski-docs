---
title: Produktautoren (Product Authors)
description: Modul für Produktautoren in Polski for WooCommerce - Taxonomie product_author, Anzeige auf der Produktseite und in der Liste, Schema.org Person, Admin-Spalte.
---

Das Modul für Produktautoren fügt WooCommerce die benutzerdefinierte Taxonomie `product_author` hinzu. Es ermöglicht, Urheber (Autoren, Designer, Künstler) zu Produkten zuzuweisen. Ideal für Buchhandlungen, Musikshops, Kunstgalerien und andere Shops, in denen der Urheber eines Produkts für den Kunden von Bedeutung ist.

## Modul aktivieren

Gehe zu **WooCommerce > Polski > Shop-Module** und aktiviere **Produktautoren** (Modul-ID: `product_authors`).

Nach der Aktivierung erscheint im Produktbearbeitungsbereich eine neue Metabox **Produktautor**.

## Taxonomie product_author

Das Modul registriert die hierarchische Taxonomie `product_author`, die mit dem Typ `product` verknüpft ist. Jeder Autor verfügt über:

- **Name** - Vor- und Nachname oder Pseudonym
- **Slug** - URL-freundliche Version des Namens
- **Beschreibung** - Biografie des Autors (angezeigt auf der Autoren-Archivseite)
- **Bild** - Miniaturansicht des Autors (Term-Meta `_thumbnail_id`)

### Autoren verwalten

Die Autoren sind unter **Produkte > Produktautoren** verfügbar. Du kannst Autoren hinzufügen, bearbeiten und löschen, genauso wie Produktkategorien oder -schlagwörter.

Die Zuweisung eines Autors zu einem Produkt erfolgt im Produktbearbeitungsbereich, in der Metabox **Produktautor** auf der rechten Seite.

## Anzeige auf der Produktseite

Auf der Einzelproduktseite wird der Autor unter dem Produkttitel angezeigt (Hook `woocommerce_single_product_summary`, Priorität 6). Angezeigt werden:

- Bild des Autors (Miniaturansicht 48x48 px)
- Vor- und Nachname mit Link zur Autoren-Archivseite
- Beschreibung des Autors (optional, erster Absatz)

Ändere die Anzeigeposition per Filter:

```php
add_filter('polski/product_authors/single_position', function (): array {
    return [
        'hook'     => 'woocommerce_single_product_summary',
        'priority' => 25, // nach dem Preis
    ];
});
```

Anzeige auf der Produktseite deaktivieren:

```php
add_filter('polski/product_authors/show_on_single', '__return_false');
```

## Anzeige in der Produktliste

Auf Kategorie-, Archiv- und Suchergebnisseiten wird der Autor unter dem Produktnamen angezeigt. Angezeigt wird nur der Name des Autors mit Link.

Anzeige in der Liste deaktivieren:

```php
add_filter('polski/product_authors/show_in_loop', '__return_false');
```

## Autoren-Archivseite

Jeder Autor verfügt über eine eigene Archivseite unter der Adresse `deinshop.de/product-author/jan-kowalski/`. Die Seite zeigt:

- Vollständige Biografie des Autors
- Bild des Autors
- Liste aller Produkte des Autors (mit Paginierung)

Die Archivvorlage kann im Theme überschrieben werden: `woocommerce/taxonomy-product_author.php`.

## Schema.org Person

Das Modul fügt automatisch eine Schema.org-Auszeichnung `Person` im JSON-LD-Format auf der Produktseite hinzu:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jan Kowalski",
  "description": "Polnischer Schriftsteller, Autor von Bestsellern.",
  "image": "https://deinshop.de/wp-content/uploads/jan-kowalski.jpg",
  "url": "https://deinshop.de/product-author/jan-kowalski/"
}
```

Die `Person`-Auszeichnung ist über die Eigenschaft `author` im `Product`-Schema mit dem Produkt verknüpft. Das hilft Suchmaschinen, die Urheber von Produkten korrekt zu identifizieren.

Schema.org deaktivieren:

```php
add_filter('polski/product_authors/schema_enabled', '__return_false');
```

## Spalte im Admin-Panel

Das Modul fügt der Produktliste im Admin-Panel (**Produkte > Alle Produkte**) eine Spalte **Autor** hinzu. Die Spalte zeigt den Namen des Autors mit einem Link zum Filtern der Produkte dieses Autors.

Die Spalte ist sortierbar, klicke auf die Überschrift, um die Produkte nach Autor zu sortieren.

## Filtern und Suchen

### Filter im Admin-Panel

In der Produktliste ist ein Dropdown **Nach Autor filtern** neben den vorhandenen Filtern für Kategorie und Status verfügbar.

### WP_Query

Suche im Code nach Produkten eines Autors:

```php
$query = new WP_Query([
    'post_type' => 'product',
    'tax_query' => [
        [
            'taxonomy' => 'product_author',
            'field'    => 'slug',
            'terms'    => 'jan-kowalski',
        ],
    ],
]);
```

### REST API

Die Taxonomie ist über die WooCommerce REST API verfügbar:

```
GET /wp-json/wc/v3/products?product_author=jan-kowalski
GET /wp-json/wp/v2/product_author
```

## Import und Export

Beim CSV-Import/-Export von WooCommerce wird die Spalte `product_author` automatisch berücksichtigt. Verwende den Namen des Autors (nicht den Slug) in der CSV-Datei.

## CSS-Styling

Die CSS-Klassen haben das Präfix `.polski-product-author-`:

- `.polski-product-author` - Container des Autors
- `.polski-product-author__image` - Bild des Autors
- `.polski-product-author__name` - Name des Autors
- `.polski-product-author__bio` - Beschreibung des Autors
- `.polski-product-author--loop` - Container des Autors in der Produktliste

## Fehlerbehebung

**Der Autor wird beim Produkt nicht angezeigt** - prüfe, ob das Theme den Hook `woocommerce_single_product_summary` unterstützt. Einige Themes überschreiben die WooCommerce-Vorlagen.

**Die Autorenseite gibt einen 404 zurück** - gehe zu **Einstellungen > Permalinks** und klicke auf **Änderungen speichern** (flush rewrite rules).

**Das Bild des Autors wird nicht angezeigt** - stelle sicher, dass das Bild in der Bearbeitung des Begriffs hinzugefügt wurde (Produkte > Produktautoren > Bearbeiten).

Probleme melden: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
