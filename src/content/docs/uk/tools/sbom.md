---
title: Генератор SBOM (Software Bill of Materials)
description: Експорт документа CycloneDX 1.4, що описує залежності плагіна - PHP (composer.lock), JS (package-lock.json) та заголовок плагіна. Корисно для аудитів CRA та імпорту в Dependency-Track.
---

Модуль **SBOM** генерує документ **CycloneDX 1.4 JSON**, що описує залежності плагіна Polski for WooCommerce (а також Polski Pro, якщо встановлено). SBOM дедалі частіше є обовʼязковим додатком до аудитів безпеки та пакетів документації CRA, а його структура CycloneDX приймається сканерами вразливостей (Trivy, Dependency-Track, OWASP DT).

:::note
SBOM, згенерований цим модулем, описує бібліотеки, залежні **від плагіна**. Для повного SBOM усього магазину вам додатково знадобиться сканування WordPress Core, інших плагінів, теми та системних залежностей.
:::

## Що сканується

| Джерело             | Обсяг                                                                      |
| ------------------- | -------------------------------------------------------------------------- |
| `composer.lock`     | Пакети PHP із секції `packages` (scope `required`) та `packages-dev` (scope `optional`) |
| `package-lock.json` | Пакети npm з мапи `packages` (npm v7+); прапорець `dev` -> scope `optional`  |
| Заголовок плагіна   | Метадані компонента застосунку: `name`, `version`, `publisher: WPPoland`   |

Для кожного пакета будується `purl` (Package URL) у форматі:

- PHP: `pkg:composer/<vendor>/<name>@<version>`
- JS: `pkg:npm/<name>@<version>`

Ліцензії нормалізуються до масиву `{license: {id: "<SPDX>"}}`.

## Завантаження

Перейдіть до **Polski > SBOM** і натисніть **Download SBOM (JSON)** біля обраної цілі (FREE або PRO). Файл:

- Назва: `<slug>-sbom-<version>-<timestamp>.cdx.json`
- Content-Type: `application/vnd.cyclonedx+json; charset=utf-8`
- Content-Disposition: `attachment`

## Приклад фрагмента

```json
{
  "bomFormat": "CycloneDX",
  "specVersion": "1.4",
  "serialNumber": "urn:uuid:8f3a...",
  "version": 1,
  "metadata": {
    "timestamp": "2026-04-19T09:00:00+00:00",
    "tools": [{"vendor": "WPPoland", "name": "Polski SBOM generator", "version": "1.0"}],
    "component": {
      "type": "application",
      "bom-ref": "wppoland/polski",
      "name": "polski",
      "version": "2.1.0",
      "publisher": "WPPoland"
    }
  },
  "components": [
    {
      "type": "library",
      "bom-ref": "composer:symfony/console",
      "name": "symfony/console",
      "version": "6.4.0",
      "scope": "required",
      "purl": "pkg:composer/symfony/console@6.4.0",
      "licenses": [{"license": {"id": "MIT"}}]
    }
  ]
}
```

## Дозволи

Доступ до сторінки та завантаження: `manage_woocommerce`. Робота заснована на `admin_post` + nonce `polski_sbom_download`.

## Імпорти

Згенерований файл можна безпосередньо імпортувати до:

- **Dependency-Track** (File Upload або REST `/api/v1/bom`)
- **Trivy** (`trivy sbom <file>.cdx.json`)
- **Grype** (`grype sbom:<file>.cdx.json`)
- **OWASP CycloneDX CLI** (`cyclonedx validate`)

## Обмеження

- SBOM описує лише один каталог плагіна; він не агрегує весь WordPress
- Відсутній розділ хешів файлів (`hashes`), він буде доданий у PRO
- Ненормалізовані ліцензії (наприклад, `MIT OR Apache-2.0`) потрапляють як `id` у незмінному вигляді
- Не виявляє залежностей, завантажених поза `composer.lock` / `package-lock.json`
