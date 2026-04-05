---
title: Перевизначення шаблонiв
description: Перевизначення шаблонiв Polski for WooCommerce у темi - список файлiв, структура каталогiв та приклади.
---

Система шаблонiв за зразком WooCommerce. Перевизначте будь-який шаблон, скопiювавши його до `yourtheme/polski/` у темi.

## Як перевизначити шаблон

1. Знайдiть оригiнальний шаблон у каталозi плагiна: `wp-content/plugins/polski/templates/`
2. Скопiюйте файл до каталогу теми: `wp-content/themes/twoj-motyw/polski/`
3. Збережiть структуру пiдкаталогiв
4. Модифiкуйте скопiйований файл

Плагiн автоматично виявить шаблон у темi та використає його замiсть стандартного.

**Приклад:** щоб перевизначити шаблон цiни Omnibus, скопiюйте:

```
wp-content/plugins/polski/templates/omnibus/price-display.php
```

до:

```
wp-content/themes/twoj-motyw/polski/omnibus/price-display.php
```

## Дочiрня тема (child theme)

Якщо ви використовуєте дочiрню тему, розмiщуйте шаблони в каталозi дочiрньої теми. Плагiн шукає шаблони у такому порядку:

1. `wp-content/themes/motyw-potomny/polski/`
2. `wp-content/themes/motyw-rodzic/polski/`
3. `wp-content/plugins/polski/templates/`

## Список шаблонiв

### Правовi вимоги

| Файл шаблону                            | Опис                                    |
| ---------------------------------------- | --------------------------------------- |
| `omnibus/price-display.php`              | Вiдображення цiни Omnibus               |
| `omnibus/price-history.php`              | Iсторiя цiн (таблиця)                  |
| `gpsr/product-info.php`                  | Iнформацiя GPSR на сторiнцi продукту    |
| `gpsr/safety-sheet.php`                  | Картка безпеки продукту                 |
| `withdrawal/form.php`                    | Форма вiдмови вiд договору              |
| `withdrawal/confirmation.php`            | Пiдтвердження подання вiдмови           |
| `withdrawal/email.php`                   | Шаблон e-mail пiдтвердження             |
| `dsa/report-form.php`                    | Форма повiдомлення DSA                  |
| `dsa/report-confirmation.php`            | Пiдтвердження повiдомлення DSA          |
| `gdpr/consent-checkboxes.php`            | Чекбокси згод GDPR                      |
| `ksef/invoice-template.php`              | Шаблон рахунку-фактури KSeF             |
| `greenwashing/product-claims.php`        | Екологiчнi заяви продукту               |
| `legal-pages/terms-template.php`         | Шаблон регламенту магазину              |
| `legal-pages/privacy-template.php`       | Шаблон полiтики конфiденцiйностi        |
| `legal-pages/withdrawal-template.php`    | Шаблон iнформацii про вiдмову           |

### Цiни та iнформацiя про продукт

| Файл шаблону                            | Опис                                    |
| ---------------------------------------- | --------------------------------------- |
| `prices/unit-price.php`                  | Одинична цiна                           |
| `prices/vat-notice.php`                  | Iнформацiя про ПДВ та доставку          |
| `prices/delivery-time.php`               | Орiєнтовний час доставки                |
| `manufacturer/info.php`                  | Iнформацiя про виробника                |
| `manufacturer/logo.php`                  | Логотип виробника                       |

### Харчовi продукти

| Файл шаблону                            | Опис                                    |
| ---------------------------------------- | --------------------------------------- |
| `food/nutrients-table.php`               | Таблиця харчової цiнностi               |
| `food/allergens-list.php`                | Список алергенiв                        |
| `food/nutri-score.php`                   | Позначення Nutri-Score                  |

### Каса та замовлення

| Файл шаблону                            | Опис                                    |
| ---------------------------------------- | --------------------------------------- |
| `checkout/button-label.php`              | Мiтка кнопки замовлення                 |
| `checkout/legal-checkboxes.php`          | Юридичнi чекбокси на касi               |
| `checkout/nip-field.php`                 | Поле NIP з автозаповненням              |
| `checkout/doi-notice.php`                | Повiдомлення double opt-in              |

### Модулi магазину

| Файл шаблону                            | Опис                                    |
| ---------------------------------------- | --------------------------------------- |
| `wishlist/table.php`                     | Таблиця списку бажань                   |
| `wishlist/button.php`                    | Кнопка додавання до списку              |
| `wishlist/header-icon.php`               | Iконка в заголовку                      |
| `compare/table.php`                      | Таблиця порiвняння                      |
| `compare/button.php`                     | Кнопка порiвняння                       |
| `compare/floating-bar.php`               | Панель порiвняння (низ екрану)           |
| `quick-view/modal.php`                   | Вiкно lightbox швидкого перегляду       |
| `quick-view/button.php`                  | Кнопка швидкого перегляду               |
| `ajax-search/form.php`                   | Поле AJAX-пошуку                        |
| `ajax-search/results.php`               | Dropdown з результатами пошуку          |
| `ajax-search/result-item.php`           | Окремий результат пошуку                |
| `ajax-filters/container.php`            | Контейнер AJAX-фiльтрiв                |
| `ajax-filters/filter-category.php`      | Фiльтр категорiй                       |
| `ajax-filters/filter-price.php`         | Фiльтр цiни (повзунок)                 |
| `ajax-filters/filter-attribute.php`     | Фiльтр атрибуту                         |
| `ajax-filters/active-filters.php`       | Панель активних фiльтрiв                |
| `product-slider/slider.php`             | Контейнер слайдера                      |
| `product-slider/item.php`               | Картка продукту в слайдерi              |
| `badges/badge.php`                       | Окрема мiтка                            |
| `badges/container.php`                   | Контейнер мiток на продуктi             |
| `waitlist/form.php`                      | Форма списку очiкування                 |
| `waitlist/email.php`                     | E-mail повiдомлення про наявнiсть       |

### Iнструменти

| Файл шаблону                            | Опис                                    |
| ---------------------------------------- | --------------------------------------- |
| `tools/compliance-checklist.php`         | Контрольний список вiдповiдностi        |
| `tools/audit-report.php`                | Звiт з аудиту                           |
| `tools/security-incident-form.php`      | Форма iнциденту безпеки                 |
| `tools/verified-review-badge.php`       | Значок верифiкованого вiдгуку           |

## Доступнi змiннi в шаблонах

Кожний шаблон отримує набiр змiнних. Приклад для `omnibus/price-display.php`:

```php
<?php
/**
 * Шаблон відображення ціни Omnibus
 *
 * Доступні змінні:
 * @var float  $lowest_price  Найнижча ціна за період
 * @var int    $days          Кількість днів
 * @var int    $product_id    ID продукту
 * @var string $price_html    Форматована ціна HTML
 * @var string $date          Дата найнижчої ціни
 *
 * @package Polski
 */

defined('ABSPATH') || exit;
?>

<div class="polski-omnibus-price">
    <span class="polski-omnibus-label">
        <?php printf(
            esc_html__('Najniższa cena z %d dni przed obniżką:', 'polski'),
            $days
        ); ?>
    </span>
    <span class="polski-omnibus-amount">
        <?php echo wp_kses_post($price_html); ?>
    </span>
</div>
```

## Перевiрка версii шаблону

Кожний шаблон мiстить коментар `@version` у заголовку. Пiсля оновлення плагiна перевiрте, чи вашi перевизначенi шаблони потребують оновлення.

Плагiн вiдображає попередження в панелi адмiнiстратора (**WooCommerce > Status > Polski**), якщо виявить застарiлi шаблони в темi.

```php
/**
 * @version 1.5.0
 */
```

## Хук для змiни шляху шаблонiв

Якщо ви хочете змiнити стандартне розташування шаблонiв у темi:

```php
add_filter('polski/template/path', function (string $path): string {
    return 'custom-polski-templates/'; // замість 'polski/'
});
```

Тодi шаблони будуть шукатися в: `wp-content/themes/twoj-motyw/custom-polski-templates/`

## Налагодження шаблонiв

Щоб перевiрити, який шаблон завантажується зараз, увiмкнiть режим debug:

```php
// У wp-config.php
define('POLSKI_TEMPLATE_DEBUG', true);
```

У режимi debug кожний шаблон оточений HTML-коментарями, що вказують шлях:

```html
<!-- polski template: /themes/twoj-motyw/polski/omnibus/price-display.php -->
...
<!-- /polski template -->
```

Повiдомлення про проблеми: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ця сторінка має виключно інформаційний характер і не є юридичною консультацією. Перед впровадженням зверніться до юриста. Polski for WooCommerce - це програмне забезпечення з відкритим кодом (GPLv2), що надається без гарантій.</div>
