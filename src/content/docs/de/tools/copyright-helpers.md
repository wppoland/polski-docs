---
title: Copyright- und Bildnachweis-Helfer
description: Shortcode [polski_copyright], Block polski/copyright sowie [polski_image_credit] - Standard-Copyright-Zeile, Lizenz und Bildnachweis unter Wahrung des Urheberrechts.
---

Das Modul **Copyright helpers** stellt drei Komponenten bereit: den Copyright-Shortcode, den Gutenberg-Block `polski/copyright` und den Shortcode für Bildnachweise. Ziel ist es, verstreute Fußzeilen vom Typ `© 2020 MeineFirma` (veraltetes Jahr), fehlende Lizenzangaben sowie fehlende Nachweise bei Bildern, die unter einer Creative-Commons-Lizenz verwendet werden, zu vermeiden.

:::note
Hilft, die Anforderungen aus Art. 34 des Urheberrechtsgesetzes (Zitieren mit Nennung des Urhebers) sowie die Anforderungen der CC-Lizenzen zu wahren (BY - Name des Autors, SA - dieselben Bedingungen).
:::

## Copyright-Zeile

### Shortcode

```
[polski_copyright]
[polski_copyright year="2026" owner="WPPoland" license="GPLv2"]
[polski_copyright license="CC BY-SA 4.0" separator=" - "]
```

### Gutenberg-Block

Name: `polski/copyright`. Kategorie Widgets, Symbol `shield`.
Unterstützt `align: wide | full`, `html: false`.

### Attribute

| Attribut   | Standard                                    | Beschreibung                                               |
| ---------- | ------------------------------------------- | ---------------------------------------------------------- |
| year       | Aktuelles UTC-Jahr                          | Jahr oder Bereich (`2019-2026`)                            |
| owner      | `polski_general.company_name` oder site name | Name des Rechteinhabers                                    |
| license    | (leer)                                      | SPDX-Kennung / Lizenzname (nach dem Trennzeichen angehängt) |
| separator  | ` - `                                       | Trennzeichen zwischen Copyright-Zeile und Lizenz           |

Gerendertes HTML:

```html
<span class="polski-copyright">&copy; 2026 WPPoland - License: GPLv2</span>
```

Das Standardjahr ist immer aktuell (`gmdate('Y')`), keine statischen Fußzeilen, die jedes Jahr am 1. Januar aktualisiert werden müssen.

## Bildnachweis

Der Shortcode `[polski_image_credit]` rendert ein Bild mit einer Nachweis-Bildunterschrift, die mit CC- / Stock-Lizenzen konform ist.

```
[polski_image_credit image_id="42" credit="Photo: Jan Kowalski" source="https://unsplash.com/photos/xyz" license="CC BY 4.0"]
[polski_image_credit credit="Photo by Ewa Nowak" license="CC BY-SA 4.0"]
```

### Attribute

| Attribut | Typ    | Standard  | Beschreibung                                                       |
| -------- | ------ | --------- | ------------------------------------------------------------------ |
| image_id | int    | (leer)    | ID des WordPress-Anhangs. Wenn angegeben, wird Bild + caption gerendert |
| credit   | string | (leer)    | Name des Urhebers (erforderlich, wenn `image_id` fehlt, Pflicht bei CC) |
| source   | url    | (leer)    | Link zum Original (gerendert als "source", `rel="nofollow noopener"`) |
| license  | string | (leer)    | Lizenzkennung (z. B. `CC BY 4.0`, `CC0`)                           |
| size     | string | `medium`  | WordPress-Größe (thumbnail/medium/large/full)                      |

### Gerendertes HTML

```html
<figure class="polski-image-credit">
    <img src="..." alt="..." />
    <figcaption class="polski-image-credit__caption">
        Photo: Jan Kowalski - <a href="..." rel="nofollow noopener" target="_blank">source</a> - License: CC BY 4.0
    </figcaption>
</figure>
```

Wenn `image_id` nicht angegeben ist, wird nur eine `<figure>` mit reiner `<figcaption>` gerendert (nützlich für den Nachweis inline eingebetteter Vektor-Icons oder vom Theme gerenderter Bilder).

### Praxis für CC-Lizenzen

| Lizenz      | Mindest-Nachweis                                     |
| ----------- | ---------------------------------------------------- |
| CC BY 4.0   | `credit` + `source` + `license`                      |
| CC BY-SA 4.0| `credit` + `source` + `license` (Hinweis auf SA)     |
| CC0         | `credit` optional, `license="CC0"` empfohlen         |
| Unsplash    | `credit` + `source` (Anforderung der Unsplash License) |

## Aktivierung

Das Modul wird über das Flag `copyright_notice` in **Polski > Module** aktiviert. Die Deaktivierung entfernt beide Shortcodes und den Block.

## Integration mit dem Modul Firmenidentifikation

Der Shortcode `[polski_copyright]` ohne das Attribut `owner` liest `polski_general.company_name`. Dadurch zeigt die Shop-Fußzeile auch nach einem Rebranding den aktuellen Firmennamen, es genügt eine Aktualisierung im Assistenten, ohne das Theme zu bearbeiten.

```html
<footer>
    [polski_copyright] - [polski_business_info format="inline" show_label="0"]
</footer>
```

## Einschränkungen

- Keine Galerie mit Nachweisen für mehrere Bilder gleichzeitig (der Shortcode muss pro Bild eingebettet werden)
- Keine Validierung der SPDX-Kennung, jeder String landet in `License:`
- Der Shortcode image_credit unterstützt kein `srcset` für custom URL (nur für `image_id`)
