---
title: Nutri-Score
description: Відображення позначки Nutri-Score A-E з CSS-класами для кожного рівня на сторінці продукту WooCommerce.
---

Nutri-Score оцінює харчову якість продукту в шкалі від A (найкраща) до E (найгірша). В Польщі добровільний, але дедалі популярніший. Плагін Polski for WooCommerce відображає позначку Nutri-Score на сторінці продукту.

## Що таке Nutri-Score

Система Nutri-Score класифікує харчові продукти на основі алгоритму, що враховує:

**Негативні компоненти (від'ємні бали):**
- енергетична цінність
- цукри
- насичені жирні кислоти
- сіль (натрій)

**Позитивні компоненти (додатні бали):**
- фрукти, овочі, горіхи, олії (ріпакова, горіхова, оливкова)
- клітковина
- білок

На основі балансу балів продукт отримує оцінку:

| Рівень | Колір | Діапазон балів (тверда їжа) | Опис |
|--------|-------|----------------------------|------|
| A | Темно-зелений (#038141) | від -15 до -1 | Найвища харчова якість |
| B | Світло-зелений (#85BB2F) | від 0 до 2 | Добра харчова якість |
| C | Жовтий (#FECB02) | від 3 до 10 | Середня харчова якість |
| D | Помаранчевий (#EE8100) | від 11 до 18 | Низька харчова якість |
| E | Червоний (#E63E11) | від 19 до 40 | Найнижча харчова якість |

## Налаштування

### Увімкнення модуля

Перейдіть до **WooCommerce > Налаштування > Polski > Харчування** та активуйте підмодуль "Nutri-Score".

### Параметри

| Налаштування | За замовчуванням | Опис |
|--------------|------------------|------|
| Увімкнути Nutri-Score | Ні | Активує відображення позначки |
| Позиція на сторінці продукту | Під ціною | Де відображати позначку |
| Показати у лістингу | Так | Чи відображати на сторінках категорій |
| Розмір позначки | Нормальний | `малий`, `нормальний`, `великий` |
| Стиль позначки | Повний | `повний` (усі літери), `компактний` (тільки активна літера) |

### Призначення Nutri-Score продукту

У редакторі продукту, у вкладці "Харчування", виберіть рівень Nutri-Score зі спадного списку:

- A - Найвища харчова якість
- B - Добра харчова якість
- C - Середня харчова якість
- D - Низька харчова якість
- E - Найнижча харчова якість

Плагін не обчислює Nutri-Score автоматично - ви повинні знати оцінку свого продукту. Для обчислення можна використати офіційний калькулятор або дані від виробника.

## Згенерований HTML

Позначка Nutri-Score рендериться як набір HTML-елементів з відповідними CSS-класами:

```html
<div class="polski-nutri-score polski-nutri-score--active-c">
    <span class="polski-nutri-score__label">Nutri-Score</span>
    <div class="polski-nutri-score__badges">
        <span class="polski-nutri-score__badge polski-nutri-score__badge--a">A</span>
        <span class="polski-nutri-score__badge polski-nutri-score__badge--b">B</span>
        <span class="polski-nutri-score__badge polski-nutri-score__badge--c polski-nutri-score__badge--active">C</span>
        <span class="polski-nutri-score__badge polski-nutri-score__badge--d">D</span>
        <span class="polski-nutri-score__badge polski-nutri-score__badge--e">E</span>
    </div>
</div>
```

## CSS-класи для кожного рівня

Плагін генерує CSS-класи для кожного рівня, що дозволяє повністю контролювати стилізацію:

### Класи на контейнері

| Клас | Опис |
|------|------|
| `.polski-nutri-score` | Головний контейнер |
| `.polski-nutri-score--active-a` | Активний рівень A |
| `.polski-nutri-score--active-b` | Активний рівень B |
| `.polski-nutri-score--active-c` | Активний рівень C |
| `.polski-nutri-score--active-d` | Активний рівень D |
| `.polski-nutri-score--active-e` | Активний рівень E |
| `.polski-nutri-score--small` | Малий розмір |
| `.polski-nutri-score--normal` | Нормальний розмір |
| `.polski-nutri-score--large` | Великий розмір |

### Класи на позначках

| Клас | Опис |
|------|------|
| `.polski-nutri-score__badge` | Кожна позначка (літера) |
| `.polski-nutri-score__badge--a` | Позначка A |
| `.polski-nutri-score__badge--b` | Позначка B |
| `.polski-nutri-score__badge--c` | Позначка C |
| `.polski-nutri-score__badge--d` | Позначка D |
| `.polski-nutri-score__badge--e` | Позначка E |
| `.polski-nutri-score__badge--active` | Активна (вибрана) позначка |

## Стилі CSS за замовчуванням

Плагін містить вбудовані стилі CSS для позначки Nutri-Score:

```css
.polski-nutri-score {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0.5em 0;
}

.polski-nutri-score__label {
    font-size: 0.75em;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #666;
    margin-bottom: 0.3em;
}

.polski-nutri-score__badges {
    display: inline-flex;
    gap: 2px;
    border-radius: 4px;
    overflow: hidden;
}

.polski-nutri-score__badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2em;
    height: 2em;
    font-weight: 700;
    font-size: 0.85em;
    color: #fff;
    opacity: 0.35;
    transition: opacity 0.2s, transform 0.2s;
}

.polski-nutri-score__badge--active {
    opacity: 1;
    transform: scale(1.15);
    border-radius: 3px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
}

/* Кольори для кожного рівня */
.polski-nutri-score__badge--a {
    background-color: #038141;
}

.polski-nutri-score__badge--b {
    background-color: #85BB2F;
}

.polski-nutri-score__badge--c {
    background-color: #FECB02;
    color: #333;
}

.polski-nutri-score__badge--d {
    background-color: #EE8100;
}

.polski-nutri-score__badge--e {
    background-color: #E63E11;
}

/* Розміри */
.polski-nutri-score--small .polski-nutri-score__badge {
    width: 1.5em;
    height: 1.5em;
    font-size: 0.7em;
}

.polski-nutri-score--large .polski-nutri-score__badge {
    width: 2.5em;
    height: 2.5em;
    font-size: 1em;
}
```

### Перевизначення стилів

Щоб налаштувати вигляд позначки у своїй темі, перевизначте CSS-класи у файлі `style.css` теми:

```css
/* Приклад: квадратні позначки із закругленими кутами */
.polski-nutri-score__badges {
    gap: 4px;
    border-radius: 0;
}

.polski-nutri-score__badge {
    border-radius: 6px;
    width: 2.2em;
    height: 2.2em;
}

/* Приклад: темна тема */
.polski-nutri-score__label {
    color: #ccc;
}

.polski-nutri-score__badge {
    opacity: 0.25;
}
```

## Програмний доступ

### Отримання Nutri-Score продукту

```php
$nutri_score = get_post_meta($product_id, '_polski_nutri_score', true);
// Повертає: 'a', 'b', 'c', 'd', 'e' або '' (порожній)
```

### Встановлення Nutri-Score

```php
update_post_meta($product_id, '_polski_nutri_score', 'b');
```

### Фільтр HTML позначки

```php
add_filter('polski/nutri_score/html', function (string $html, string $score, int $product_id): string {
    // Модифікація HTML позначки
    return $html;
}, 10, 3);
```

### Умовне відображення

```php
add_filter('polski/nutri_score/display', function (bool $display, int $product_id): bool {
    // Сховати Nutri-Score для продуктів без заповненої харчової цінності
    $nutrients = get_post_meta($product_id, '_polski_nutrients', true);

    if (empty($nutrients)) {
        return false;
    }

    return $display;
}, 10, 2);
```

## Імпорт CSV

| Колонка CSV | Опис | Значення |
|-------------|------|----------|
| `polski_nutri_score` | Рівень Nutri-Score | `a`, `b`, `c`, `d`, `e` |

Приклад:

```csv
"Jabłko",a
"Chipsy ziemniaczane",d
"Cola",e
"Jogurt naturalny",b
```

## Schema.org

Плагін додає Nutri-Score до структурованих даних продукту:

```json
{
    "@type": "Product",
    "additionalProperty": [
        {
            "@type": "PropertyValue",
            "name": "Nutri-Score",
            "value": "B"
        }
    ]
}
```

## Доступність (a11y)

Позначка Nutri-Score містить ARIA-атрибути для читачів екрану:

```html
<div class="polski-nutri-score" role="img" aria-label="Nutri-Score: C - średnia jakość odżywcza">
```

Кожна неактивна позначка має `aria-hidden="true"`, а активна містить `aria-current="true"`.

## Найпоширеніші проблеми

### Позначка не відображається

1. Перевірте, чи підмодуль Nutri-Score увімкнено
2. Переконайтеся, що продукт має призначений рівень Nutri-Score
3. Перевірте, чи CSS плагіна завантажений (відсутність конфлікту з оптимізаційними плагінами)

### Кольори позначки відрізняються від очікуваних

Тема може перевизначати кольори фону. Використовуйте більш специфічні CSS-селектори або додайте `!important`:

```css
.polski-nutri-score__badge--a {
    background-color: #038141 !important;
}
```

### Позначка завелика або замала

Змініть розмір у налаштуваннях (**WooCommerce > Налаштування > Polski > Харчування > Nutri-Score > Розмір позначки**) або перевизначте CSS-клас розміру.

## Пов'язані ресурси

- [Модуль харчових продуктів](/uk/food/food-overview/)
- [Харчова цінність](/uk/food/nutrients/)
- [Повідомити про проблему](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ця сторінка має виключно інформаційний характер і не є юридичною консультацією. Перед впровадженням зверніться до юриста. Polski for WooCommerce - це програмне забезпечення з відкритим кодом (GPLv2), що надається без гарантій.</div>
