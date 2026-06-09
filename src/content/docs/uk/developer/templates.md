---
title: Перевизначення шаблонів
description: Перевизначення шаблонів Polski for WooCommerce в темі - список файлів, структура каталогів і приклади.
---

Система шаблонів за зразком WooCommerce. Перевизначте будь-який шаблон, скопіювавши його до `yourtheme/polski/` у темі.

## Як перевизначити шаблон

1. Знайдіть оригінальний шаблон у каталозі плагіна: `wp-content/plugins/polski/templates/`
2. Скопіюйте файл до каталогу теми: `wp-content/themes/tvoja-tema/polski/`
3. Збережіть структуру підкаталогів
4. Змініть скопійований файл

Плагін автоматично використає шаблон із теми замість стандартного.

**Приклад:** щоб перевизначити шаблон ціни Omnibus, скопіюйте:

```
wp-content/plugins/polski/templates/omnibus/price-display.php
```

до:

```
wp-content/themes/tvoja-tema/polski/omnibus/price-display.php
```

## Дочірня тема (child theme)

З дочірньою темою розміщуйте шаблони в каталозі дочірньої теми. Порядок пошуку:

1. `wp-content/themes/docherinia-tema/polski/`
2. `wp-content/themes/batkivska-tema/polski/`
3. `wp-content/plugins/polski/templates/`

## Список шаблонів

### Юридичні вимоги

| Файл шаблону                             | Опис                                    |
| ---------------------------------------- | --------------------------------------- |
| `omnibus/price-display.php`              | Відображення ціни Omnibus               |
| `omnibus/price-history.php`              | Історія цін (таблиця)                   |
| `gpsr/product-info.php`                  | Інформація GPSR на сторінці товару      |
| `gpsr/safety-sheet.php`                  | Картка безпеки товару                   |
| `withdrawal/form.php`                    | Форма відмови від договору              |
| `withdrawal/confirmation.php`            | Підтвердження подання відмови           |
| `withdrawal/email.php`                   | Шаблон листа підтвердження              |
| `dsa/report-form.php`                    | Форма звернення DSA                     |
| `dsa/report-confirmation.php`            | Підтвердження звернення DSA             |
| `gdpr/consent-checkboxes.php`            | Чекбокси згод GDPR                      |
| `ksef/invoice-template.php`              | Шаблон рахунка-фактури KSeF             |
| `greenwashing/product-claims.php`        | Екологічні заяви про товар              |
| `legal-pages/terms-template.php`         | Шаблон правил магазину                  |
| `legal-pages/privacy-template.php`       | Шаблон політики конфіденційності        |
| `legal-pages/withdrawal-template.php`    | Шаблон інформації про відмову           |

### Ціни та інформація про товар

| Файл шаблону                             | Опис                                    |
| ---------------------------------------- | --------------------------------------- |
| `prices/unit-price.php`                  | Ціна за одиницю                         |
| `prices/vat-notice.php`                  | Інформація про ПДВ і доставку           |
| `prices/delivery-time.php`               | Орієнтовний час доставки                |
| `manufacturer/info.php`                  | Інформація про виробника                |
| `manufacturer/logo.php`                  | Логотип виробника                       |

### Харчові продукти

| Файл шаблону                             | Опис                                    |
| ---------------------------------------- | --------------------------------------- |
| `food/nutrients-table.php`               | Таблиця харчової цінності               |
| `food/allergens-list.php`                | Список алергенів                        |
| `food/nutri-score.php`                   | Позначка Nutri-Score                    |

### Каса та замовлення

| Файл шаблону                             | Опис                                    |
| ---------------------------------------- | --------------------------------------- |
| `checkout/button-label.php`              | Мітка кнопки замовлення                 |
| `checkout/legal-checkboxes.php`          | Юридичні чекбокси на касі               |
| `checkout/nip-field.php`                 | Поле NIP з автозаповненням              |
| `checkout/doi-notice.php`                | Повідомлення double opt-in              |

### Модулі магазину

| Файл шаблону                             | Опис                                    |
| ---------------------------------------- | --------------------------------------- |
| `wishlist/table.php`                     | Таблиця списку бажань                   |
| `wishlist/button.php`                    | Кнопка додавання до списку              |
| `wishlist/header-icon.php`               | Іконка в шапці                          |
| `compare/table.php`                      | Таблиця порівняння                      |
| `compare/button.php`                     | Кнопка порівняння                       |
| `compare/floating-bar.php`               | Панель порівняння (внизу екрана)        |
| `quick-view/modal.php`                   | Вікно lightbox швидкого перегляду       |
| `quick-view/button.php`                  | Кнопка швидкого перегляду               |
| `ajax-search/form.php`                   | Поле AJAX-пошуку                        |
| `ajax-search/results.php`               | Випадний список з результатами пошуку   |
| `ajax-search/result-item.php`           | Окремий результат пошуку                |
| `ajax-filters/container.php`            | Контейнер AJAX-фільтрів                 |
| `ajax-filters/filter-category.php`      | Фільтр категорій                        |
| `ajax-filters/filter-price.php`         | Фільтр ціни (повзунок)                  |
| `ajax-filters/filter-attribute.php`     | Фільтр атрибута                         |
| `ajax-filters/active-filters.php`       | Панель активних фільтрів                |
| `product-slider/slider.php`             | Контейнер слайдера                      |
| `product-slider/item.php`               | Картка товару в слайдері                |
| `badges/badge.php`                       | Окремий значок                          |
| `badges/container.php`                   | Контейнер значків на товарі             |
| `waitlist/form.php`                      | Форма списку очікування                 |
| `waitlist/email.php`                     | Лист сповіщення про наявність           |

### Інструменти

| Файл шаблону                             | Опис                                    |
| ---------------------------------------- | --------------------------------------- |
| `tools/compliance-checklist.php`         | Контрольний список відповідності        |
| `tools/audit-report.php`                | Звіт аудиту                             |
| `tools/security-incident-form.php`      | Форма інциденту безпеки                 |
| `tools/verified-review-badge.php`       | Значок перевіреного відгуку             |

## Доступні змінні в шаблонах

Кожен шаблон отримує набір змінних. Приклад для `omnibus/price-display.php`:

```php
<?php
/**
 * Шаблон відображення ціни Omnibus
 *
 * Доступні змінні:
 * @var float  $lowest_price  Найнижча ціна за період
 * @var int    $days          Кількість днів
 * @var int    $product_id    ID товару
 * @var string $price_html    Відформатована ціна HTML
 * @var string $date          Дата найнижчої ціни
 *
 * @package Polski
 */

defined('ABSPATH') || exit;
?>

<div class="polski-omnibus-price">
    <span class="polski-omnibus-label">
        <?php printf(
            esc_html__('Найнижча ціна за %d днів перед зниженням:', 'polski'),
            $days
        ); ?>
    </span>
    <span class="polski-omnibus-amount">
        <?php echo wp_kses_post($price_html); ?>
    </span>
</div>
```

## Перевірка версії шаблону

Кожен шаблон має коментар `@version`. Після оновлення плагіна перевірте, чи перевизначені шаблони потребують оновлення.

Попередження про застарілі шаблони з'являється в **WooCommerce > Статус > Polski**.

```php
/**
 * @version 1.5.0
 */
```

## Хук для зміни шляху до шаблонів

Якщо хочете змінити стандартне розташування шаблонів у темі:

```php
add_filter('polski/template/path', function (string $path): string {
    return 'custom-polski-templates/'; // замість 'polski/'
});
```

Тоді шаблони шукатимуться в: `wp-content/themes/tvoja-tema/custom-polski-templates/`

## Налагодження шаблонів

Перевірте, який шаблон завантажується, увімкнувши режим налагодження:

```php
// У wp-config.php
define('POLSKI_TEMPLATE_DEBUG', true);
```

У режимі налагодження кожен шаблон обгортається HTML-коментарями зі шляхом:

```html
<!-- polski template: /themes/tvoja-tema/polski/omnibus/price-display.php -->
...
<!-- /polski template -->
```

Повідомлення про проблеми: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ця сторінка має виключно інформаційний характер і не є юридичною консультацією. Перед впровадженням проконсультуйтеся з юристом. Polski for WooCommerce є програмним забезпеченням з відкритим кодом (GPLv2), що надається без гарантій.</div>
