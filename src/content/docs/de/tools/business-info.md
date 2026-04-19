---
title: Unternehmensidentifikation - Footer und Shortcode
description: Zeigt die gesetzlich geforderten Unternehmensdaten des Shops (Name, Adresse, NIP, REGON, E-Mail, Telefon) als Footer-Block, Shortcode oder Gutenberg-Block. Daten werden aus dem Setup-Assistenten uebernommen.
---

Das Modul **Unternehmensidentifikation** zentralisiert die Ausgabe der Unternehmensdaten (Name, Adresse, NIP, REGON, E-Mail, Telefon). Das polnische Verbraucherrechtegesetz (Art. 12 Ustawa o prawach konsumenta und Art. 206 KSH) verpflichtet E-Commerce-Verkaeufer, diese Informationen zu veroeffentlichen, damit der Kunde die Gegenseite identifizieren kann. Dieses Modul hilft, die Daten konsistent im Footer, in Bestellbestaetigungen und auf rechtlichen Seiten zu platzieren.

## Datenquelle

Alle Felder stammen aus der Option `polski_general`, die vom Setup-Assistenten befuellt wird:

| Feld                 | Schluessel          |
| -------------------- | ------------------- |
| Firmenname           | `company_name`      |
| Adresse              | `company_address`   |
| NIP (poln. Steuer-ID)| `company_nip`       |
| REGON (Statistik-Nr.)| `company_regon`     |
| E-Mail               | `company_email`     |
| Telefon              | `company_phone`     |

Aktualisieren Sie sie unter **Polski > Setup-Assistent > Unternehmensdaten**.

## Konfiguration

Gehen Sie zu **Polski > Module** und aktivieren Sie "Business identification". Es gibt keinen dedizierten Einstellungsbildschirm. Die Darstellung wird pro Verwendung ueber Shortcode-Attribute oder Gutenberg-Block-Einstellungen gesteuert.

## Shortcode

```
[polski_business_info]
[polski_business_info format="inline" separator=" - " show_regon="1" show_label="0"]
```

| Attribut      | Standard | Werte                 | Beschreibung                                                          |
| ------------- | -------- | --------------------- | --------------------------------------------------------------------- |
| `format`      | `block`  | `block`, `inline`     | Block = ein Feld pro Zeile im `<div>`. Inline = einzelner `<span>`   |
| `separator`   | ` \| `   | beliebig              | Trennzeichen zwischen Feldern im Inline-Format                        |
| `show_label`  | `1`      | `1`, `0`              | Ob NIP / REGON mit "NIP:" / "REGON:" beschriftet werden               |
| `show_regon`  | `0`      | `1`, `0`              | Ob die REGON-Zeile gerendert wird (viele Shops blenden sie aus)       |

## Gutenberg-Block

Blockname: `polski/business-info`. Kategorie: Widgets. Unterstuetzt Breit-/Vollbreitausrichtung. Attribute entsprechen dem Shortcode. Rendering ist dynamisch (serverseitiger render_callback), sodass eine Aktualisierung der Unternehmensdaten im Assistenten wirkt, ohne dass die Seite neu gespeichert werden muss.

## E-Mail-Signatur

E-Mail-Vorlagen koennen den Shortcode ueber WooCommerce-Filter wiederverwenden:

```php
add_filter('woocommerce_email_footer_text', function (string $text): string {
    return do_shortcode('[polski_business_info format="inline"]');
});
```

## E-Mail-Obfuskierung

Die E-Mail-Adresse wird vor dem Rendering durch `antispambot()` geschleust, sodass Crawler eine HTML-Entity-kodierte Fassung statt eines parsebaren `mailto` sehen.

## Berechtigungen

- Lesen: oeffentlich (Shortcode und Block sind frontend-sicher)
- Bearbeiten der Quelldaten: `manage_options` (Setup-Assistent)

## Grenzen

- Nur eine Geschaeftseinheit - keine Multi-Brand oder Sprach-Override
- Keine Ausgabe strukturierter Daten (schema.org/Organization) - fuer 2.2.0 geplant
- Telefon wird als reiner Text gerendert, nicht als `tel:` (verhindert unbeabsichtigtes Click-to-Dial am Desktop)
- Keine laenderabhaengige Anzeige (die Daten werden allen Besuchern gleich angezeigt)
