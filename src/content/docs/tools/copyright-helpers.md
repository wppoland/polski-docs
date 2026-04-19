---
title: Helpery copyright i atrybucji zdjec
description: Shortcode [polski_copyright], blok polski/copyright oraz [polski_image_credit] - standardowa linia copyright, licencja i atrybucja zdjec z respektem dla prawa autorskiego.
---

Modul **Copyright helpers** dostarcza trzy komponenty: shortcode copyright, blok Gutenberga `polski/copyright` i shortcode atrybucji zdjec. Celem jest wyeliminowanie rozproszonych stopek typu `© 2020 MojaFirma` (nieaktualny rok), brakujacych informacji o licencji oraz braku atrybucji przy zdjeciach uzywanych na licencji Creative Commons.

:::note
Pomaga zachowac wymogi Art. 34 ustawy o prawie autorskim (cytowanie z oznaczeniem tworcy) oraz wymagania licencji CC (BY - nazwa autora, SA - te same warunki).
:::

## Linia copyright

### Shortcode

```
[polski_copyright]
[polski_copyright year="2026" owner="WPPoland" license="GPLv2"]
[polski_copyright license="CC BY-SA 4.0" separator=" - "]
```

### Blok Gutenberga

Nazwa: `polski/copyright`. Kategoria Widgets, ikona `shield`.
Obsluguje `align: wide | full`, `html: false`.

### Atrybuty

| Atrybut    | Domyslnie                                   | Opis                                                       |
| ---------- | ------------------------------------------- | ---------------------------------------------------------- |
| year       | Biezacy rok UTC                             | Rok lub zakres (`2019-2026`)                               |
| owner      | `polski_general.company_name` lub site name | Nazwa wlasciciela praw                                     |
| license    | (puste)                                     | Identyfikator SPDX / nazwa licencji (dopisana po separatorze) |
| separator  | ` - `                                       | Separator miedzy linia copyright a licencja                |

Renderowany HTML:

```html
<span class="polski-copyright">&copy; 2026 WPPoland - License: GPLv2</span>
```

Domyslny rok jest zawsze aktualny (`gmdate('Y')`) — zadnych statycznych stopek do aktualizacji co 1 stycznia.

## Atrybucja zdjec

Shortcode `[polski_image_credit]` renderuje zdjecie z podpisem atrybucyjnym zgodnym z licencjami CC / stockowymi.

```
[polski_image_credit image_id="42" credit="Photo: Jan Kowalski" source="https://unsplash.com/photos/xyz" license="CC BY 4.0"]
[polski_image_credit credit="Photo by Ewa Nowak" license="CC BY-SA 4.0"]
```

### Atrybuty

| Atrybut  | Typ    | Domyslnie | Opis                                                               |
| -------- | ------ | --------- | ------------------------------------------------------------------ |
| image_id | int    | (puste)   | ID zalacznika WordPress. Gdy podany, renderuje obraz + caption     |
| credit   | string | (puste)   | Nazwa tworcy (wymagane jesli brak `image_id`, obowiazkowe dla CC)  |
| source   | url    | (puste)   | Link do oryginalu (renderowany jako "source", `rel="nofollow noopener"`) |
| license  | string | (puste)   | Identyfikator licencji (np. `CC BY 4.0`, `CC0`)                    |
| size     | string | `medium`  | Rozmiar WordPress (thumbnail/medium/large/full)                    |

### Renderowany HTML

```html
<figure class="polski-image-credit">
    <img src="..." alt="..." />
    <figcaption class="polski-image-credit__caption">
        Photo: Jan Kowalski - <a href="..." rel="nofollow noopener" target="_blank">source</a> - License: CC BY 4.0
    </figcaption>
</figure>
```

Gdy nie podano `image_id`, renderowany jest tylko `<figure>` z samym `<figcaption>` (uzyteczne do atrybucji ikon wektorowych osadzonych inline lub zdjec renderowanych przez motyw).

### Praktyka dla licencji CC

| Licencja    | Minimalna atrybucja                                  |
| ----------- | ---------------------------------------------------- |
| CC BY 4.0   | `credit` + `source` + `license`                      |
| CC BY-SA 4.0| `credit` + `source` + `license` (informacja o SA)    |
| CC0         | `credit` opcjonalne, `license="CC0"` zalecane        |
| Unsplash    | `credit` + `source` (wymaganie Unsplash License)     |

## Wlaczenie

Modul aktywny przez flage `copyright_notice` w **Polski > Moduly**. Wylaczenie zdejmuje oba shortcody i blok.

## Integracja z modulem Identyfikacja firmy

Shortcode `[polski_copyright]` bez atrybutu `owner` odczytuje `polski_general.company_name`. Dzieki temu stopka sklepu pokazuje aktualna nazwe firmy nawet po zmianie rebrandingu — wystarczy aktualizacja w kreatorze, bez edycji motywu.

```html
<footer>
    [polski_copyright] - [polski_business_info format="inline" show_label="0"]
</footer>
```

## Ograniczenia

- Brak galerii z atrybucja dla wielu zdjec naraz (trzeba osadzac shortcode per zdjecie)
- Brak walidacji identyfikatora SPDX - kazdy string trafia do `License:`
- Shortcode image_credit nie wspiera `srcset` dla custom URL (tylko dla `image_id`)
