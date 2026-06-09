---
title: Товарний фід (Ceneo, Google Merchant)
description: Генерування XML-фідів для польських порівнянь цін та Google Merchant Center.
---

Модуль генерує товарні фіди у форматі XML, сумісні з Ceneo.pl, Nokaut.pl та Google Merchant Center.

:::note[Вимоги]
Polski PRO вимагає: Polski (free) v1.5.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Налаштування

Перейдіть до **WooCommerce > Налаштування > Polski PRO > Товарний фід**.

| Налаштування | Опис | За замовчуванням |
|------------|------|-----------|
| Увімкнено | Активує генерування фідів | Ні |
| Платформи | Ceneo, Nokaut, Google Merchant | Ceneo |
| Варіанти | Експортувати варіанти як окремі пропозиції | Ні |
| Опис | Додати опис продукту до фіду | Так |
| Виключити недоступні | Пропустити продукти без стану складу | Так |

## URL-адреси фідів

Після увімкнення модуля доступні такі URL-адреси:

| Платформа | URL |
|-----------|-----|
| Ceneo | `twojsklep.pl/polski-feed/ceneo.xml` |
| Nokaut | `twojsklep.pl/polski-feed/nokaut.xml` |
| Google Merchant | `twojsklep.pl/polski-feed/google.xml` |

:::tip
Після увімкнення модуля перейдіть до **Налаштування > Постійні посилання** і натисніть "Зберегти", щоб оновити правила URL.
:::

## Структура фіду Ceneo

```xml
<offers version="1">
  <group name="Kategoria">
    <o id="123" url="..." price="49.99" avail="1" weight="0.5">
      <name><![CDATA[Nazwa produktu]]></name>
      <desc><![CDATA[Opis produktu]]></desc>
      <cat><![CDATA[Kategoria > Podkategoria]]></cat>
      <images>
        <image url="..."/>
      </images>
      <attrs>
        <a name="EAN" value="1234567890123"/>
        <a name="Producent" value="Marka"/>
      </attrs>
    </o>
  </group>
</offers>
```

## Зіставлення категорій Ceneo

У редагуванні категорії продукту WooCommerce доступне поле **Категорія Ceneo**, де можна вписати шлях категорії Ceneo (напр. "Elektronika > Smartfony").

## Виключення продуктів

У редагуванні продукту WooCommerce доступне поле **Виключити з фідів** - позначте чекбокс, щоб продукт не з'являвся в жодному фіді.

## Атрибути у фіді

Фід автоматично експортує:
- **EAN** - з SKU продукту
- **Producent** - з поля GPSR Manufacturer
- **Атрибути продукту** - усі визначені у WooCommerce

## Кеш та регенерація

Фіди кешуються на 6 годин. Автоматична регенерація відбувається щодня через cron `polski_daily_maintenance`. При першому доступі фід генерується на льоту.

Файли кешу: `wp-content/uploads/polski-feeds/`
