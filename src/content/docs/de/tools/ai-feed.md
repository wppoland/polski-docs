---
title: AI Feed - Sichtbarkeit für KI-Agenten
description: Das AI-Feed-Modul liefert einzelne Beiträge, Seiten und WooCommerce-Produkte im Markdown-Format über Content Negotiation, sodass KI-Agenten und LLMs Shop-Inhalte ohne HTML-Parsing lesen können.
---

AI Feed stellt die Shop-Inhalte im **Markdown**-Format bereit, optimiert für Sprachmodelle und Einkaufsagenten. Ein HTTP-Client sendet den Header `Accept: text/markdown` (oder fügt der URL `?output_format=md` hinzu) und erhält statt der gerenderten HTML-Seite reines Markdown mit YAML-Metadaten.

## Wofür das gut ist

KI-Agenten (ChatGPT Shopping, Perplexity, Gemini, eigene LLM-Crawler) überspringen zunehmend HTML und fragen direkt nach der "sauberen" Version der Seite. Klassisches HTML-Scraping ist unzuverlässig, kostspielig und verlor strukturierte Daten. AI Feed dreht das Verhältnis um: Der Shop veröffentlicht selbst eine maschinenlesbare Version unter derselben URL wie die Version für Menschen.

## Modul aktivieren

Das Modul ist nach dem Update auf Version 1.11.0 standardmäßig aktiv. Sie können es per Filter deaktivieren:

```php
add_filter('polski/ai_feed/enabled', '__return_false');
```

Einstellungen in der Option `polski_ai_feed`:

| Schlüssel | Standardwert | Beschreibung |
|---|---|---|
| `enabled` | `true` | Globaler Schalter |
| `post_types` | `['post', 'page', 'product']` | Inhaltstypen, die als Markdown ausgeliefert werden |

## Wie Content Negotiation funktioniert

Markdown wird in zwei Fällen zurückgegeben:

1. Der **Header `Accept`** enthält `text/markdown` (mit Ausnahme eines expliziten `q=0`).
2. Der **URL-Parameter** `?output_format=md` ist in der Anfrage vorhanden.

In beiden Fällen hat die Antwort die Header:

```
Content-Type: text/markdown; charset=UTF-8
Vary: Accept
```

Normale Besucher erhalten weiterhin Standard-HTML. Die Berechtigungslogik (`read_post`, Passwortschutz, Entwürfe) bleibt erhalten.

## Erkennung der Markdown-Version

Auf der HTML-Seite eines einzelnen Beitrags fügen wir im `<head>` hinzu:

```html
<link rel="alternate" type="text/markdown" href="https://sklep.pl/produkt/koszulka/?output_format=md" />
```

Crawler und KI-Agenten können die Markdown-Version finden, ohne die URL-Konvention kennen zu müssen.

## Verknüpfung im Admin-Panel

In der Liste der Beiträge, Seiten und Produkte erscheint neben der Aktion "Anzeigen" ein Link **"View AI Version"**. Er öffnet dieselbe Markdown-Version, die ein KI-Agent sieht - praktisch zum Testen und zur Vorschau.

## Was die Markdown-Version eines Produkts enthält

Für ein WooCommerce-Produkt enthält die Antwort:

**YAML-Kopf (Front Matter)**

```yaml
---
title: "Koszulka basic"
permalink: "https://sklep.pl/produkt/koszulka/"
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
categories: ["Koszulki"]
---
```

**Abschnitt "Product details"** mit einer Aufzählung:

- SKU und GTIN/EAN
- Bruttopreis, regulärer Preis, Aktionspreis
- Steuerklasse VAT
- Niedrigster Preis der letzten 30 Tage (Omnibus)
- Lieferzeit
- Lagerbestand und Verfügbarkeit
- Gewicht und Abmessungen
- Marke, Hersteller
- Verantwortliche Person (GPSR)

**Vollständige Produktbeschreibung**, in Markdown konvertiert.

## Beispiel einer vollständigen Antwort

```markdown
---
title: "Koszulka basic"
permalink: "https://sklep.pl/produkt/koszulka/"
sku: "TS-001"
price: "49,99 zł"
in_stock: "true"
---

# Koszulka basic

Bawełniana koszulka klasycznego kroju.

## Product details

- **SKU:** TS-001
- **GTIN/EAN:** 5901234567890
- **Price:** 49,99 zł
- **Tax class:** Standard
- **Lowest price (last 30 days):** 45,00 zł
- **Delivery time:** 1-2 dni
- **Availability:** In stock
- **Weight:** 0.2 kg

## Description

Pełny opis produktu z bloków Gutenberga, w tym listy, tabele i nagłówki.
```

## Manifest /llms.txt

Gemäß dem Standard [llmstxt.org](https://llmstxt.org) stellt der Shop im Wurzelverzeichnis der Domain die Datei `/llms.txt` bereit. KI-Agenten schauen zuerst dort, um die Struktur der Website zu erkunden, ohne die URL-Konvention zu kennen.

```bash
curl https://sklep.pl/llms.txt
```

Antwort (Markdown):

```markdown
# Twój sklep

> Sklep z polskimi pamiątkami online.

## Legal

- [Regulamin](https://sklep.pl/regulamin/?output_format=md): Terms and conditions
- [Polityka prywatności](https://sklep.pl/polityka/?output_format=md): Privacy policy
- [Zwroty](https://sklep.pl/zwroty/?output_format=md): Returns and withdrawal policy

## Shop

- [Sklep](https://sklep.pl/sklep/): Storefront

## Product categories

- [Koszulki](https://sklep.pl/kategoria/koszulki/)
- [Bluzy](https://sklep.pl/kategoria/bluzy/)
```

**Was sich standardmäßig im Manifest befindet:**

- Titel und Beschreibung des Shops (`get_bloginfo('name')`, `get_bloginfo('description')`)
- Abschnitt "Legal" mit `?output_format=md`-Links zu den Rechtsseiten (AGB, Datenschutzerklärung, Rückgabe, Reklamationen) - nur wenn die Seiten angelegt sind
- Abschnitt "Shop" mit einem Link zur WooCommerce-Shopseite
- Abschnitt "Product categories" mit den 20 beliebtesten Produktkategorien (sortiert nach Produktanzahl)

**Deaktivierung**

```php
add_filter('polski/ai_feed/llms_txt_enabled', '__return_false');
```

**Abschnitte anpassen**

```php
add_filter('polski/ai_feed/llms_txt_sections', static function (array $sections): array {
    $sections['Resources'] = [
        ['Blog', home_url('/blog/'), 'Najnowsze wpisy'],
        ['FAQ', home_url('/faq/')],
    ];
    return $sections;
});
```

**Kategorielimit**

```php
add_filter('polski/ai_feed/llms_txt_category_limit', static fn () => 50);
```

## Entwicklerfilter

| Filter | Zweck |
|---|---|
| `polski/ai_feed/enabled` | Globaler Schalter (bool) |
| `polski/ai_feed/post_types` | Liste der Inhaltstypen (string[]) |
| `polski/ai_feed/post_markdown` | Finales Markdown eines Beitrags/einer Seite |
| `polski/ai_feed/product_markdown` | Finales Markdown eines Produkts |
| `polski/ai_feed/product_facts` | Liste der Paare `[Bezeichnung, Wert]` im Abschnitt "Product details" |
| `polski/ai_feed/password_required` | Markdown-Inhalt bei Passwortschutz |
| `polski/ai_feed/llms_txt_enabled` | Schalter für `/llms.txt` (bool) |
| `polski/ai_feed/llms_txt_sections` | Abschnittszuordnung `[heading => list]` im Manifest |
| `polski/ai_feed/llms_txt_category_limit` | Maximale Anzahl der Produktkategorien (int) |

### Beispiel - Hinzufügen eines eigenen CPT

```php
add_filter('polski/ai_feed/post_types', static function (array $types): array {
    $types[] = 'recipe';
    return $types;
});
```

### Beispiel - Hinzufügen eines eigenen Feldes zum Produkt

```php
add_filter('polski/ai_feed/product_facts', static function (array $facts, WC_Product $product): array {
    $color = $product->get_attribute('pa_kolor');
    if ($color !== '') {
        $facts[] = ['Kolor', $color];
    }
    return $facts;
}, 10, 2);
```

## FAQ

**Ersetzt das das Theme für normale Nutzer?**

Nein. HTML wird standardmäßig zurückgegeben. Markdown gelangt nur zu Clients, die es über `Accept` oder den URL-Parameter anfordern.

**Werden passwortgeschützte Inhalte preisgegeben?**

Nein. Wenn eine Seite ein Passwort verlangt, gibt AI Feed statt des vollständigen Inhalts ein kurzes Markdown mit einem Hinweis auf den Schutz zurück.

**Werden Entwürfe unterstützt?**

Ja, für Nutzer mit Bearbeitungsrechten. Die Aktion "View AI Version" im Admin-Panel verwendet für Entwürfe und geplante Beiträge die Vorschau-URL.

**Kann ich eigene Inhaltstypen hinzufügen?**

Ja, über den Filter `polski/ai_feed/post_types`. Standardmäßig werden `post`, `page` und `product` unterstützt.

**Funktioniert es mit HPOS und Block Checkout?**

Ja. Das Modul arbeitet auf der Ebene der Produktansicht, unabhängig vom Bestellspeicher (HPOS) und vom Checkout (Blocks).
