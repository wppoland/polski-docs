---
title: Хелпери copyright та атрибуції фото
description: Шорткод [polski_copyright], блок polski/copyright та [polski_image_credit] - стандартний рядок copyright, ліцензія та атрибуція фото з повагою до авторського права.
---

Модуль **Copyright helpers** надає три компоненти: шорткод copyright, блок Gutenberg `polski/copyright` і шорткод атрибуції фото. Мета - усунути розрізнені футери на кшталт `© 2020 MojaFirma` (неактуальний рік), відсутність інформації про ліцензію та відсутність атрибуції для фото, використаних за ліцензією Creative Commons.

:::note
Допомагає дотримуватися вимог ст. 34 Закону про авторське право (цитування з зазначенням автора) та вимог ліцензій CC (BY - ім'я автора, SA - ті самі умови).
:::

## Рядок copyright

### Шорткод

```
[polski_copyright]
[polski_copyright year="2026" owner="WPPoland" license="GPLv2"]
[polski_copyright license="CC BY-SA 4.0" separator=" - "]
```

### Блок Gutenberg

Назва: `polski/copyright`. Категорія Widgets, іконка `shield`.
Підтримує `align: wide | full`, `html: false`.

### Атрибути

| Атрибут    | За замовчуванням                            | Опис                                                       |
| ---------- | ------------------------------------------- | ---------------------------------------------------------- |
| year       | Поточний рік UTC                            | Рік або діапазон (`2019-2026`)                             |
| owner      | `polski_general.company_name` або site name | Назва власника прав                                        |
| license    | (порожнє)                                   | Ідентифікатор SPDX / назва ліцензії (дописується після роздільника) |
| separator  | ` - `                                       | Роздільник між рядком copyright і ліцензією                |

Згенерований HTML:

```html
<span class="polski-copyright">&copy; 2026 WPPoland - License: GPLv2</span>
```

Рік за замовчуванням завжди актуальний (`gmdate('Y')`), жодних статичних футерів, які треба оновлювати 1 січня.

## Атрибуція фото

Шорткод `[polski_image_credit]` рендерить фото з атрибуційним підписом, що відповідає ліцензіям CC / стокових сервісів.

```
[polski_image_credit image_id="42" credit="Photo: Jan Kowalski" source="https://unsplash.com/photos/xyz" license="CC BY 4.0"]
[polski_image_credit credit="Photo by Ewa Nowak" license="CC BY-SA 4.0"]
```

### Атрибути

| Атрибут  | Тип    | За замовчуванням | Опис                                                               |
| -------- | ------ | ---------------- | ------------------------------------------------------------------ |
| image_id | int    | (порожнє)        | ID вкладення WordPress. Коли вказано, рендерить зображення + caption |
| credit   | string | (порожнє)        | Ім'я автора (обов'язкове, якщо немає `image_id`, обов'язкове для CC) |
| source   | url    | (порожнє)        | Посилання на оригінал (рендериться як "source", `rel="nofollow noopener"`) |
| license  | string | (порожнє)        | Ідентифікатор ліцензії (наприклад, `CC BY 4.0`, `CC0`)             |
| size     | string | `medium`         | Розмір WordPress (thumbnail/medium/large/full)                     |

### Згенерований HTML

```html
<figure class="polski-image-credit">
    <img src="..." alt="..." />
    <figcaption class="polski-image-credit__caption">
        Photo: Jan Kowalski - <a href="..." rel="nofollow noopener" target="_blank">source</a> - License: CC BY 4.0
    </figcaption>
</figure>
```

Коли `image_id` не вказано, рендериться лише `<figure>` із самим `<figcaption>` (корисно для атрибуції векторних іконок, вбудованих inline, або фото, що рендеряться темою).

### Практика для ліцензій CC

| Ліцензія    | Мінімальна атрибуція                                 |
| ----------- | ---------------------------------------------------- |
| CC BY 4.0   | `credit` + `source` + `license`                      |
| CC BY-SA 4.0| `credit` + `source` + `license` (інформація про SA)  |
| CC0         | `credit` опціональний, `license="CC0"` рекомендований |
| Unsplash    | `credit` + `source` (вимога Unsplash License)        |

## Увімкнення

Модуль активний через прапорець `copyright_notice` у **Polski > Модулі**. Вимкнення прибирає обидва шорткоди і блок.

## Інтеграція з модулем Ідентифікація компанії

Шорткод `[polski_copyright]` без атрибута `owner` читає `polski_general.company_name`. Завдяки цьому футер магазину показує актуальну назву компанії навіть після ребрендингу, достатньо оновити дані в майстрі, без редагування теми.

```html
<footer>
    [polski_copyright] - [polski_business_info format="inline" show_label="0"]
</footer>
```

## Обмеження

- Немає галереї з атрибуцією для кількох фото одразу (треба вбудовувати шорткод для кожного фото)
- Немає валідації ідентифікатора SPDX, будь-який рядок потрапляє в `License:`
- Шорткод image_credit не підтримує `srcset` для власного URL (лише для `image_id`)
