---
title: AI Feed - Sichtbarkeit fuer KI-Agenten
description: Das AI-Feed-Modul liefert einzelne Beitraege, Seiten und WooCommerce-Produkte als Markdown ueber Content Negotiation, sodass KI-Agenten und LLM-Crawler Shop-Inhalte ohne HTML-Parsing lesen koennen.
---

AI Feed stellt Shop-Inhalte als **Markdown** bereit, optimiert fuer Sprachmodelle und Shopping-Agenten. Ein HTTP-Client sendet `Accept: text/markdown` (oder haengt `?output_format=md` an die URL) und erhaelt anstelle der gerenderten HTML-Seite reines Markdown mit YAML-Metadaten.

## Wozu das gut ist

KI-Agenten (ChatGPT shopping, Perplexity, Gemini, eigene LLM-Crawler) ueberspringen zunehmend HTML und fragen direkt nach einer "sauberen" Version der Seite. Klassisches HTML-Scraping ist fragil, teuer und verliert strukturierte Daten. AI Feed dreht das Verhaeltnis um: Der Shop publiziert eine maschinenlesbare Version unter derselben URL wie die Version fuer Menschen.

## Modul aktivieren

Das Modul ist nach dem Update auf 1.11.0 standardmaessig aktiv. Zum Deaktivieren:

```php
add_filter('polski/ai_feed/enabled', '__return_false');
```

Einstellungen in der Option `polski_ai_feed`:

| Schluessel | Standard | Beschreibung |
|---|---|---|
| `enabled` | `true` | Hauptschalter |
| `post_types` | `['post', 'page', 'product']` | Inhaltstypen, die als Markdown ausgeliefert werden |

## So funktioniert die Content Negotiation

Markdown wird in zwei Faellen zurueckgegeben:

1. Der `Accept`-Header enthaelt `text/markdown` (mit Ausschluss von explizitem `q=0`).
2. Die URL enthaelt das Query-Argument `?output_format=md`.

In beiden Faellen liefert die Antwort:

```
Content-Type: text/markdown; charset=UTF-8
Vary: Accept
```

Normale Besucher erhalten weiterhin Standard-HTML. Berechtigungsregeln (`read_post`, Passwortschutz, Entwuerfe) bleiben erhalten.

## Auffindbarkeit

Einzelseiten enthalten im `<head>`:

```html
<link rel="alternate" type="text/markdown" href="https://shop.test/produkt/t-shirt/?output_format=md" />
```

Crawler und KI-Agenten finden so die Markdown-Version, ohne die URL-Konvention zu kennen.

## Admin-Verknuepfung

In den Listen Beitraege, Seiten und Produkte erscheint neben "Anzeigen" die Aktion **"View AI Version"** und oeffnet dasselbe Markdown, das auch ein KI-Agent sehen wuerde - praktisch zum Testen und Vorschau.

## Was eine Produkt-Markdown-Antwort enthaelt

Fuer ein WooCommerce-Produkt enthaelt die Antwort:

**YAML Front Matter**

```yaml
---
title: "Basic T-Shirt"
permalink: "https://shop.test/produkt/t-shirt/"
sku: "TS-001"
gtin: "5901234567890"
product_type: "simple"
currency: "PLN"
price: "49,99 zł"
regular_price: "59,99 zł"
sale_price: "49,99 zł"
in_stock: "true"
on_sale: "true"
modified: "2026-04-30T12:00:00+02:00"
categories: ["T-Shirts"]
---
```

**Bullet-Liste "Product details"**

- SKU und GTIN/EAN
- Bruttopreis, regulaerer Preis, Aktionspreis
- Steuerklasse (USt.)
- Niedrigster Preis der letzten 30 Tage (Omnibus)
- Lieferzeit
- Lagerbestand und Verfuegbarkeit
- Gewicht und Abmessungen
- Marke, Hersteller
- Verantwortliche Person (GPSR)

**Vollstaendige Produktbeschreibung** in Markdown konvertiert.

## Vollstaendiges Antwortbeispiel

```markdown
---
title: "Basic T-Shirt"
permalink: "https://shop.test/produkt/t-shirt/"
sku: "TS-001"
price: "49,99 zł"
in_stock: "true"
---

# Basic T-Shirt

Baumwoll-T-Shirt im klassischen Schnitt.

## Product details

- **SKU:** TS-001
- **GTIN/EAN:** 5901234567890
- **Price:** 49,99 zł
- **Tax class:** Standard
- **Lowest price (last 30 days):** 45,00 zł
- **Delivery time:** 1-2 Tage
- **Availability:** In stock
- **Weight:** 0.2 kg

## Description

Vollstaendige Produktbeschreibung aus Gutenberg-Bloecken, einschliesslich Listen, Tabellen und Ueberschriften.
```

## Entwickler-Filter

| Filter | Zweck |
|---|---|
| `polski/ai_feed/enabled` | Hauptschalter (bool) |
| `polski/ai_feed/post_types` | Liste der Inhaltstypen (string[]) |
| `polski/ai_feed/post_markdown` | Endgueltiges Markdown fuer Beitrag/Seite |
| `polski/ai_feed/product_markdown` | Endgueltiges Markdown fuer Produkt |
| `polski/ai_feed/product_facts` | Liste der `[Label, Wert]`-Paare im Abschnitt "Product details" |
| `polski/ai_feed/password_required` | Markdown bei passwortgeschuetzten Inhalten |

### Beispiel - eigenen CPT registrieren

```php
add_filter('polski/ai_feed/post_types', static function (array $types): array {
    $types[] = 'recipe';
    return $types;
});
```

### Beispiel - eigenes Feld im Produkt ausgeben

```php
add_filter('polski/ai_feed/product_facts', static function (array $facts, WC_Product $product): array {
    $color = $product->get_attribute('pa_farbe');
    if ($color !== '') {
        $facts[] = ['Farbe', $color];
    }
    return $facts;
}, 10, 2);
```

## FAQ

**Ersetzt das Modul mein Theme fuer normale Besucher?**

Nein. HTML wird standardmaessig zurueckgegeben. Markdown wird nur an Clients geliefert, die es ueber `Accept` oder den URL-Parameter anfordern.

**Werden passwortgeschuetzte Seiten preisgegeben?**

Nein. Bei einer passwortgeschuetzten Seite gibt AI Feed eine kurze Markdown-Notiz statt der vollstaendigen Inhalte zurueck.

**Werden Entwuerfe unterstuetzt?**

Ja, fuer Nutzer mit Bearbeitungsrechten. Die Admin-Aktion "View AI Version" verwendet Vorschau-URLs fuer Entwuerfe und geplante Beitraege.

**Kann ich eigene Inhaltstypen hinzufuegen?**

Ja, ueber den Filter `polski/ai_feed/post_types`. Standardmaessig werden `post`, `page` und `product` unterstuetzt.

**Funktioniert das mit HPOS und Block Checkout?**

Ja. Das Modul arbeitet auf der Produktansichtsebene, unabhaengig von der Bestellspeicherung (HPOS) und dem Checkout (Blocks).
