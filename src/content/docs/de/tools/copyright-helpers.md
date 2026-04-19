---
title: Copyright-Helfer - Hinweis, Bildnachweis, Gutenberg-Block
description: Wiederverwendbare Shortcodes und ein Gutenberg-Block fuer Copyright-Hinweise (c YYYY Inhaber - Lizenz) und Bildnachweise pro Bild (Autor, Quelle, Lizenz).
---

Das Modul **Copyright-Helfer** stellt drei wiederverwendbare Ausgaben fuer Copyright- und Urhebernachweise bereit:

- Shortcode `[polski_copyright]` - Standard-Copyright-Zeile
- Shortcode `[polski_image_credit]` - Bildnachweis-Fusszeile pro Bild
- Gutenberg-Block `polski/copyright` - dynamischer Block, der dasselbe Rendering nutzt

Dies sind kleine Bausteine, kein vollstaendiges DAM. Sie dienen dazu, Stockfotos, Nutzerbeitraege und eigene Inhalte konsistent im Shop zuzuordnen.

## Copyright-Zeile

```
[polski_copyright]
[polski_copyright year="2020 - 2026" owner="Przykladowa Firma sp. z o.o." license="CC BY 4.0"]
```

| Attribut    | Standard                                                       | Beschreibung                                    |
| ----------- | -------------------------------------------------------------- | ----------------------------------------------- |
| `year`      | aktuelles UTC-Jahr                                             | Einzeljahr oder Bereich                         |
| `owner`     | `polski_general.company_name` oder WordPress-Seitentitel       | Rechteinhaber                                   |
| `license`   | leer                                                           | Lizenzkennung (SPDX, Creative Commons)          |
| `separator` | ` - `                                                          | Trennzeichen zwischen Inhaber und Lizenz        |

Ausgabe:

```html
<span class="polski-copyright">&copy; 2026 Przykladowa Firma - License: CC BY 4.0</span>
```

## Gutenberg-Block

Blockname: `polski/copyright`. Kategorie: Widgets. Unterstuetzt Breit-/Vollbreitausrichtung. Attribute: `owner`, `year`, `license`. Das Rendering ist dynamisch, sodass das "aktuelle Jahr" ohne erneutes Speichern der Seite automatisch aktualisiert wird.

## Bildnachweis

```
[polski_image_credit image_id="42" credit="Photo: Jan Kowalski" source="https://example.com" license="CC BY-SA 4.0"]
[polski_image_credit credit="Photo by Jan Kowalski"]
```

| Attribut   | Standard  | Beschreibung                                                                        |
| ---------- | --------- | ----------------------------------------------------------------------------------- |
| `image_id` | leer      | WordPress-Anhang-ID. Wenn gesetzt, wird das Bild vor der Bildunterschrift gerendert |
| `credit`   | leer      | Autor oder Nachweis-String (erforderlich, sofern `image_id` nicht allein gesetzt)   |
| `source`   | leer      | URL zur Quelle. Wird als "source"-Link mit `rel="nofollow noopener"` gerendert     |
| `license`  | leer      | Lizenzkennung                                                                       |
| `size`     | `medium`  | WordPress-Bildgroessen-Slug                                                         |

Die Ausgabe ist eine `<figure>` mit `<figcaption>`:

```html
<figure class="polski-image-credit">
  <img src="..." alt="..." />
  <figcaption class="polski-image-credit__caption">Photo: Jan Kowalski - <a href="..." rel="nofollow noopener" target="_blank">source</a> - License: CC BY-SA 4.0</figcaption>
</figure>
```

## Typische Einsatzgebiete

- Shop-Footer-Copyright-Zeile (mit automatisch befuelltem Jahr und Firmennamen)
- Produktgalerie-Nachweise fuer Stockfotos
- Blog-Beitragsheldenbild-Nachweis
- Team-Portraet-Nachweis

## Integration mit Themes

Die meisten Block-Themes stellen ein Seitenfooter-Template bereit. Den **Copyright notice**-Block dort einfuegen und fest codierte Copyright-Texte entfernen - das Jahr aktualisiert sich nach dem Jahreswechsel automatisch, ohne Theme-Aenderung.

## Berechtigungen

- Oeffentlich (frontend-sicher)
- Keine Admin-UI

## Grenzen

- Kein DAM - das Plugin verfolgt keine Lizenzen, die an Medien gebunden sind (fuer 2.3.0 geplant)
- Lizenzfeld akzeptiert jeden String - keine SPDX-Validierung
- Der Bildnachweis-Shortcode erzeugt noch keine schema.org `Photograph`-Strukturdaten
- Styling ist minimal - `.polski-copyright` und `.polski-image-credit` im Theme-CSS ueberschreiben
