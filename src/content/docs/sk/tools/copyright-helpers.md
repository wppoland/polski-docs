---
title: Pomocniky copyright a atribucie fotografii
description: Shortcode [polski_copyright], blok polski/copyright a [polski_image_credit] - standardny riadok copyright, licencia a atribucia fotografii s respektovanim autorskeho prava.
---

Modul **Copyright helpers** poskytuje tri komponenty: shortcode copyright, Gutenbergov blok `polski/copyright` a shortcode atribucie fotografii. Cielom je odstranit roztrusene paticky typu `© 2020 MojaFirma` (neaktualny rok), chybajuce informacie o licencii a chybajucu atribuciu pri fotografiach pouzivanych pod licenciou Creative Commons.

:::note
Pomaha dodrziavat poziadavky cl. 34 zakona o autorskom prave (citovanie s oznacenim autora) a poziadavky licencii CC (BY - meno autora, SA - rovnake podmienky).
:::

## Riadok copyright

### Shortcode

```
[polski_copyright]
[polski_copyright year="2026" owner="WPPoland" license="GPLv2"]
[polski_copyright license="CC BY-SA 4.0" separator=" - "]
```

### Gutenbergov blok

Nazov: `polski/copyright`. Kategoria Widgets, ikona `shield`.
Podporuje `align: wide | full`, `html: false`.

### Atributy

| Atribut    | Predvolene                                  | Popis                                                       |
| ---------- | ------------------------------------------- | ---------------------------------------------------------- |
| year       | Aktualny rok UTC                            | Rok alebo rozsah (`2019-2026`)                             |
| owner      | `polski_general.company_name` alebo site name | Nazov vlastnika prav                                     |
| license    | (prazdne)                                   | Identifikator SPDX / nazov licencie (dopisany za oddelovacom) |
| separator  | ` - `                                       | Oddelovac medzi riadkom copyright a licenciou              |

Vykresleny HTML:

```html
<span class="polski-copyright">&copy; 2026 WPPoland - License: GPLv2</span>
```

Predvoleny rok je vzdy aktualny (`gmdate('Y')`), ziadne staticke paticky na aktualizaciu kazdeho 1. januara.

## Atribucia fotografii

Shortcode `[polski_image_credit]` vykresluje fotografiu s atribucnym popiskom v sulade s licenciami CC / stockovymi.

```
[polski_image_credit image_id="42" credit="Photo: Jan Kowalski" source="https://unsplash.com/photos/xyz" license="CC BY 4.0"]
[polski_image_credit credit="Photo by Ewa Nowak" license="CC BY-SA 4.0"]
```

### Atributy

| Atribut  | Typ    | Predvolene | Popis                                                              |
| -------- | ------ | --------- | ------------------------------------------------------------------ |
| image_id | int    | (prazdne) | ID prilohy WordPress. Ak je zadane, vykresli obraz + caption       |
| credit   | string | (prazdne) | Meno autora (povinne ak chyba `image_id`, povinne pre CC)          |
| source   | url    | (prazdne) | Odkaz na original (vykresleny ako "source", `rel="nofollow noopener"`) |
| license  | string | (prazdne) | Identifikator licencie (napr. `CC BY 4.0`, `CC0`)                  |
| size     | string | `medium`  | Velkost WordPress (thumbnail/medium/large/full)                    |

### Vykresleny HTML

```html
<figure class="polski-image-credit">
    <img src="..." alt="..." />
    <figcaption class="polski-image-credit__caption">
        Photo: Jan Kowalski - <a href="..." rel="nofollow noopener" target="_blank">source</a> - License: CC BY 4.0
    </figcaption>
</figure>
```

Ak nie je zadane `image_id`, vykresli sa iba `<figure>` so samotnym `<figcaption>` (uzitocne na atribuciu vektorovych ikon vlozenych inline alebo fotografii vykreslovanych sablonou).

### Prax pre licencie CC

| Licencia    | Minimalna atribucia                                  |
| ----------- | ---------------------------------------------------- |
| CC BY 4.0   | `credit` + `source` + `license`                      |
| CC BY-SA 4.0| `credit` + `source` + `license` (informacia o SA)    |
| CC0         | `credit` volitelny, `license="CC0"` odporucane       |
| Unsplash    | `credit` + `source` (poziadavka Unsplash License)    |

## Zapnutie

Modul je aktivny cez priznak `copyright_notice` v **Polski > Moduly**. Vypnutie odoberie oba shortcody aj blok.

## Integracia s modulom Identifikacia firmy

Shortcode `[polski_copyright]` bez atributu `owner` nacita `polski_general.company_name`. Vdaka tomu paticka obchodu zobrazuje aktualny nazov firmy aj po zmene rebrandingu, staci aktualizacia v sprievodcovi, bez upravy sablony.

```html
<footer>
    [polski_copyright] - [polski_business_info format="inline" show_label="0"]
</footer>
```

## Obmedzenia

- Ziadna galeria s atribuciou pre viacero fotografii naraz (treba vkladat shortcode pre kazdu fotografiu)
- Ziadna validacia identifikatora SPDX, kazdy retazec sa dostane do `License:`
- Shortcode image_credit nepodporuje `srcset` pre custom URL (iba pre `image_id`)
