---
title: Polski for WooCommerce
description: Комплексний плагін WordPress для адаптації магазину WooCommerce до польських правових норм і ринкових вимог.
template: splash
hero:
  tagline: Повне рішення для ведення інтернет-магазину в Польщі. Правові вимоги, локальні функції, польські стандарти e-commerce - у версіях FREE і PRO.
  actions:
    - text: Почати з FREE
      link: /getting-started/installation/
      icon: right-arrow
      variant: primary
    - text: Дізнатися про PRO
      link: /pro/overview/
      icon: star
      variant: secondary
    - text: GitHub
      link: https://github.com/wppoland/polski
      icon: external
      variant: minimal
---

![Polski for WooCommerce - банер плагіна](../../../assets/screenshots/banner-772x250.png)

## Дві версії - одне рішення

Polski for WooCommerce - це модульна платформа, створена [wppoland.com](https://wppoland.com), яка адаптує магазин WooCommerce до польських ринкових вимог. Доступна у двох варіантах:

| | FREE | PRO |
|---|---|---|
| Ліцензія | GPLv2 (відкритий код) | Комерційна ліцензія |
| Ціна | Безкоштовно | [wppoland.com/pl/polski-pro](https://wppoland.com/pl/polski-pro/) |
| Правові вимоги | GPSR, Omnibus, GDPR, DSA, KSeF та інші | Усе з FREE |
| Ціни та товари | Ціна за одиницю, VAT, час доставки | Усе з FREE |
| Каса | Кнопка замовлення, чекбокси, NIP | + багатоетапний кошик |
| Модулі магазину | Wishlist, порівняння, фільтри, слайдер | Усе з FREE |
| Фактури | - | Фактура VAT, коригувальна, чек, WZ |
| KSeF | Підготовка | + повна інтеграція з API |
| Продажі | - | Подарункові картки, підписки, афіліація, передзамовлення, бандлінг |
| B2B | - | Каталоговий режим, запити пропозицій |
| Інтеграції | - | InPost, wFirma, Fakturownia, iFirma |
| Згоди | Чекбокси + журналювання | + версіонування, audit trail, re-consent |
| Підтримка | GitHub Issues | Пріоритетна |

### Системні вимоги

| Вимога | Мінімальна версія |
|---|---|
| WordPress | 6.4+ |
| WooCommerce | 8.0+ |
| PHP | 8.1+ |
| MySQL | 5.7+ / MariaDB 10.3+ |

:::tip[Рекомендація]
Для найкращої продуктивності рекомендуємо PHP 8.2+ та WooCommerce 9.x.
:::

---

## FREE - безкоштовна версія з відкритим кодом

Поточна версія: **1.3.2** | Ліцензія: GPLv2 | [GitHub](https://github.com/wppoland/polski)

![Панель модулів Polski for WooCommerce](../../../assets/screenshots/screenshot-1-modules-dashboard.png)

### Правові вимоги

- **[GPSR](/compliance/gpsr/)** - дані виробника, імпортера та відповідальної особи
- **[Omnibus](/compliance/omnibus/)** - найнижча ціна за 30 днів до знижки
- **[Право на відмову](/compliance/withdrawal/)** - форми та процедури повернень
- **[GDPR](/compliance/gdpr/)** - керування згодами, журналювання згод
- **[DSA](/compliance/dsa/)** - контактний пункт, звітування про контент
- **[KSeF](/compliance/ksef/)** - підготовка до інтеграції з е-Фактурами
- **[Greenwashing](/compliance/greenwashing/)** - контроль екологічних заяв
- **[Правові сторінки](/compliance/legal-pages/)** - генерування регламенту, політики конфіденційності

### Ціни та інформація про товар

- **[Ціни за одиницю](/prices/unit-prices/)** - zł/kg, zł/l, zł/m
- **[Відображення VAT](/prices/vat-display/)** - ставка VAT, нетто/брутто
- **[Час доставки](/prices/delivery-time/)** - орієнтовний час на картці товару
- **[Дані виробника](/prices/manufacturer/)** - виробник, марка, GTIN/EAN

### Каса та замовлення

- **[Кнопка замовлення](/checkout/checkout-button/)** - "Замовляю з обов'язком оплати"
- **[Правові чекбокси](/checkout/legal-checkboxes/)** - налаштовувані згоди
- **[Пошук NIP](/checkout/nip-lookup/)** - автозаповнення з API GUS
- **[Double opt-in](/checkout/double-opt-in/)** - верифікація e-mail

### Продовольчі товари

- **[Харчова цінність](/food/nutrients/)** - таблиця за регламентом 1169/2011
- **[Алергени](/food/allergens/)** - 14 основних алергенів
- **[Nutri-Score](/food/nutri-score/)** - позначка A-E

### Модулі магазину

- **[Список бажань](/storefront/wishlist/)**, **[Порівняння](/storefront/compare/)**, **[Швидкий перегляд](/storefront/quick-view/)**
- **[AJAX-пошук](/storefront/ajax-search/)**, **[AJAX-фільтри](/storefront/ajax-filters/)**
- **[Слайдер товарів](/storefront/product-slider/)**, **[Значки](/storefront/badges/)**

### Інструменти та API

- **[Панель відповідності](/tools/compliance-dashboard/)**, **[Аудит магазину](/tools/site-audit/)**
- **[REST API](/developer/rest-api/)**, **[Хуки](/developer/hooks/)**, **[Шорткоди](/developer/shortcodes/)**
- **[WP-CLI](/developer/wp-cli/)**, **[Імпорт CSV](/developer/csv-import/)**, **[Блоки Gutenberg](/developer/blocks/)**

---

## PRO - розширена версія

Поточна версія: **1.1.0** | Вимагає: Polski FREE 1.3.0+ | [Придбати на wppoland.com](https://wppoland.com/pl/polski-pro/)

:::note[PRO розширює FREE]
Версія PRO - це окремий плагін, що встановлюється поруч із безкоштовною версією. Усі модулі FREE залишаються доступними - PRO додає нові функції.
:::

### Фактури та фінанси

- **[Система фактур](/pro/invoices/)** - Фактура VAT, коригувальна, чек, WZ із генеруванням PDF
- **[Інтеграція KSeF](/pro/ksef/)** - електронне надсилання фактур до податкової
- **[Бухгалтерські інтеграції](/pro/accounting/)** - wFirma, Fakturownia, iFirma

### Каса та згоди

- **[Багатоетапний кошик](/pro/multistep-checkout/)** - Address -> Shipping -> Payment -> Review
- **[Керування згодами](/pro/consent-management/)** - версіонування, audit trail, GDPR export

### Продажі та маркетинг

- **[Подарункові картки](/pro/gift-cards/)** - купівля, реалізація, відстеження балансу
- **[Підписки](/pro/subscriptions/)** - циклічні покупки з поновленнями
- **[Партнерська програма](/pro/affiliates/)** - реферальні посилання, комісії
- **[Запити пропозицій](/pro/quotes/)** - RFQ замість кошика
- **[Передзамовлення](/pro/preorders/)** - резервування з датою випуску
- **[Пакети та доповнення](/pro/bundles-addons/)** - бандлінг, add-ons, FBT
- **[Каталоговий режим](/pro/catalog-mode/)** - B2B без цін

### Інтеграції

- **[InPost (Paczkomaty)](/pro/shipping-inpost/)** - API ShipX, карта поштоматів, етикетки

### API PRO

- **[PRO REST API](/pro/pro-api/)** - ендпоінти фактур, KSeF, налаштувань

---

## Швидкий старт

1. **[Встановіть плагін](/getting-started/installation/)** - із панелі WordPress або з файлу ZIP
2. **[Налаштуйте модулі](/getting-started/configuration/)** - увімкніть потрібні функції
3. **[Пройдіть майстер](/getting-started/wizard/)** - дані компанії, правові сторінки, чекбокси

:::note[Потрібна допомога?]
[GitHub Issues](https://github.com/wppoland/polski/issues) - повідомлення про помилки | [GitHub Discussions](https://github.com/wppoland/polski/discussions) - запитання та обговорення
:::

---

## Сумісність

- Теми: Storefront, Astra, GeneratePress, Kadence, flavor theme
- Конструктори сторінок: Gutenberg, Elementor, Beaver Builder
- Платежі: Przelewy24, PayU, BLIK, tpay
- Доставка: InPost, DPD, DHL, Poczta Polska, Orlen Paczka

<div class="disclaimer">Ця сторінка має виключно інформаційний характер і не є юридичною консультацією. Перед впровадженням проконсультуйтеся з юристом. Polski for WooCommerce є програмним забезпеченням з відкритим кодом (GPLv2), що надається без гарантій.</div>
