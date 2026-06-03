---
title: Pomocníky pro copyright a atribuci fotografií
description: Shortcode [polski_copyright], blok polski/copyright a [polski_image_credit] - standardní řádek copyright, licence a atribuce fotografií s respektem k autorskému právu.
---

Modul **Copyright helpers** poskytuje tři komponenty: shortcode copyright, blok Gutenberg `polski/copyright` a shortcode atribuce fotografií. Cílem je odstranit roztroušené patičky typu `© 2020 MojeFirma` (neaktuální rok), chybějící informace o licenci a chybějící atribuci u fotografií používaných pod licencí Creative Commons.

:::note
Pomáhá dodržet požadavky čl. 34 autorského zákona (citace s označením autora) a požadavky licence CC (BY - jméno autora, SA - stejné podmínky).
:::

## Řádek copyright

### Shortcode

```
[polski_copyright]
[polski_copyright year="2026" owner="WPPoland" license="GPLv2"]
[polski_copyright license="CC BY-SA 4.0" separator=" - "]
```

### Blok Gutenberg

Název: `polski/copyright`. Kategorie Widgets, ikona `shield`.
Podporuje `align: wide | full`, `html: false`.

### Atributy

| Atribut    | Výchozí                                     | Popis                                                      |
| ---------- | ------------------------------------------- | ---------------------------------------------------------- |
| year       | Aktuální rok UTC                            | Rok nebo rozsah (`2019-2026`)                              |
| owner      | `polski_general.company_name` nebo název webu | Jméno vlastníka práv                                     |
| license    | (prázdné)                                   | Identifikátor SPDX / název licence (připojen za separátorem) |
| separator  | ` - `                                       | Separátor mezi řádkem copyright a licencí                  |

Vykreslené HTML:

```html
<span class="polski-copyright">&copy; 2026 WPPoland - License: GPLv2</span>
```

Výchozí rok je vždy aktuální (`gmdate('Y')`), žádné statické patičky k aktualizaci každý 1. ledna.

## Atribuce fotografií

Shortcode `[polski_image_credit]` vykresluje fotografii s atribučním popiskem odpovídajícím licencím CC / stockovým.

```
[polski_image_credit image_id="42" credit="Photo: Jan Kowalski" source="https://unsplash.com/photos/xyz" license="CC BY 4.0"]
[polski_image_credit credit="Photo by Ewa Nowak" license="CC BY-SA 4.0"]
```

### Atributy

| Atribut  | Typ    | Výchozí   | Popis                                                              |
| -------- | ------ | --------- | ------------------------------------------------------------------ |
| image_id | int    | (prázdné) | ID přílohy WordPress. Pokud je zadáno, vykreslí obrázek + caption  |
| credit   | string | (prázdné) | Jméno autora (vyžadováno, pokud chybí `image_id`, povinné pro CC)  |
| source   | url    | (prázdné) | Odkaz na originál (vykreslen jako "source", `rel="nofollow noopener"`) |
| license  | string | (prázdné) | Identifikátor licence (např. `CC BY 4.0`, `CC0`)                  |
| size     | string | `medium`  | Velikost WordPress (thumbnail/medium/large/full)                   |

### Vykreslené HTML

```html
<figure class="polski-image-credit">
    <img src="..." alt="..." />
    <figcaption class="polski-image-credit__caption">
        Photo: Jan Kowalski - <a href="..." rel="nofollow noopener" target="_blank">source</a> - License: CC BY 4.0
    </figcaption>
</figure>
```

Pokud není zadáno `image_id`, vykreslí se pouze `<figure>` se samotným `<figcaption>` (užitečné pro atribuci vektorových ikon vložených inline nebo fotografií vykreslovaných šablonou).

### Praxe pro licence CC

| Licence     | Minimální atribuce                                   |
| ----------- | ---------------------------------------------------- |
| CC BY 4.0   | `credit` + `source` + `license`                      |
| CC BY-SA 4.0| `credit` + `source` + `license` (informace o SA)     |
| CC0         | `credit` volitelné, `license="CC0"` doporučeno       |
| Unsplash    | `credit` + `source` (požadavek Unsplash License)     |

## Zapnutí

Modul je aktivní přes příznak `copyright_notice` v **Polski > Moduly**. Vypnutí odebere oba shortcody i blok.

## Integrace s modulem Identifikace firmy

Shortcode `[polski_copyright]` bez atributu `owner` čte `polski_general.company_name`. Díky tomu patička obchodu ukazuje aktuální název firmy i po změně rebrandingu, stačí aktualizace v průvodci, bez úpravy šablony.

```html
<footer>
    [polski_copyright] - [polski_business_info format="inline" show_label="0"]
</footer>
```

## Omezení

- Žádná galerie s atribucí pro více fotografií najednou (je třeba vkládat shortcode pro každou fotografii)
- Žádná validace identifikátoru SPDX, libovolný řetězec se dostane do `License:`
- Shortcode image_credit nepodporuje `srcset` pro vlastní URL (pouze pro `image_id`)
