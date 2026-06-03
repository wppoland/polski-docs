---
title: Firmenidentifikation in der Fußzeile
description: Anzeige der Firmendaten (Name, NIP, Adresse, Kontakt) in der Shop-Fußzeile über den Shortcode [polski_business_info] oder den Gutenberg-Block polski/business-info.
---

Das Modul **Firmenidentifikation** zeigt die Verkäuferdaten (Name, Adresse, NIP, REGON, E-Mail, Telefon) als zusammenhängenden Block in der Shop-Fußzeile, auf der Produktseite oder an einer beliebigen Stelle des Themes an. Die Daten werden aus den Einstellungen `polski_general` bezogen, die im Konfigurationsassistenten ausgefüllt werden.

:::note
Art. 12 des Verbraucherrechtegesetzes sowie Art. 206 KSH verlangen vom Unternehmer, die Identifikationsdaten auf der Shop-Seite offenzulegen. Dieses Modul hilft, sie an einem Ort zu sammeln und über alle Unterseiten hinweg konsistent zu halten.
:::

## Shortcode

```
[polski_business_info]
[polski_business_info format="inline" separator=" • "]
[polski_business_info show_regon="1"]
```

## Gutenberg-Block

Blockname: `polski/business-info` (Kategorie Widgets, Symbol `id-alt`).
Unterstützt `align: wide | full`, `html: false`.

## Attribute

| Attribut    | Typ     | Standard  | Beschreibung                                                               |
| ----------- | ------- | --------- | -------------------------------------------------------------------------- |
| format      | string  | `block`   | `block` (Liste von divs) oder `inline` (span mit Trennzeichen)             |
| separator   | string  | ` | `     | Trennzeichen der Positionen im Modus `inline`                              |
| show_label  | bool    | `true`    | Zeigt die Präfixe `NIP:` / `REGON:` vor den Nummern an                     |
| show_regon  | bool    | `false`   | Fügt REGON hinzu (standardmäßig ausgeblendet, da seltener erforderlich)    |

## Datenquelle

Alle Felder werden aus der Option `polski_general` bezogen:

| Optionsschlüssel    | Ausgabefeld  |
| ------------------- | ------------ |
| `company_name`      | Name         |
| `company_address`   | Adresse      |
| `company_nip`       | NIP          |
| `company_regon`     | REGON        |
| `company_email`     | E-Mail (mailto + `antispambot`) |
| `company_phone`     | Telefon      |

Die E-Mail wird als `mailto:`-Link gerendert, der durch die Funktion `antispambot()` geschützt ist (sie wandelt Zeichen in HTML-Entitäten um und erschwert so das Sammeln durch Bots).

## Beispiele

### Shop-Fußzeile

```html
<div class="site-footer">
    [polski_business_info format="block" show_regon="1"]
</div>
```

Rendert:

```html
<div class="polski-business-info polski-business-info--block">
    <div class="polski-business-info__line polski-business-info__line--name">Sklep Polski Sp. z o.o.</div>
    <div class="polski-business-info__line polski-business-info__line--address">ul. Przykladowa 1, 00-001 Warszawa</div>
    <div class="polski-business-info__line polski-business-info__line--nip">NIP: 123-45-67-890</div>
    <div class="polski-business-info__line polski-business-info__line--regon">REGON: 123456789</div>
    <div class="polski-business-info__line polski-business-info__line--email"><a href="mailto:...">...</a></div>
    <div class="polski-business-info__line polski-business-info__line--phone">+48 123 456 789</div>
</div>
```

### Inline-Variante für die Kontaktleiste

```
[polski_business_info format="inline" separator=" • " show_label="0"]
```

## CSS-Stile

Das Modul fügt Klassen hinzu, erzwingt aber kein Aussehen. Das Styling erfolgt im eigenen Theme:

```css
.polski-business-info--block { line-height: 1.6; }
.polski-business-info__line--name { font-weight: 600; }
.polski-business-info__line--email a { color: inherit; text-decoration: underline; }
```

## Aktivieren / Deaktivieren

Das Modul wird über das Flag `business_info` in **Polski > Module** gesteuert. Ist es deaktiviert, werden Shortcode und Block nicht registriert.

## Einschränkungen

- Keine Unterstützung für mehrere Firmen (z. B. Marken / Filialen), nur ein Datensatz aus `polski_general`
- Wenn kein Feld ausgefüllt ist, gibt der Shortcode einen leeren String zurück (es wird kein leeres HTML gerendert)
- Dynamischer Block, er lässt sich abgesehen von Attributänderungen nicht visuell bearbeiten
