---
title: AI Feed для рахунків-фактур
description: REST-ендпоінт, що надає рахунок-фактуру у форматі Markdown, для використання бухгалтерськими агентами та агентами підтримки клієнтів на основі LLM.
---

Polski Pro 1.10.0 додає REST-ендпоінт, який віддає рахунок-фактуру у форматі **Markdown**. AI-агенти (бухгалтери, підтримка клієнтів, асистенти покупця) отримують структуровані дані рахунка без потреби парсити PDF.

## Ендпоінт

```
GET /wp-json/polski-pro/v1/invoices/{id}/markdown
Accept: text/markdown
```

Відповідь:

```
Content-Type: text/markdown; charset=UTF-8
Cache-Control: private, no-store
```

Body - це Markdown з YAML front matter, блоком сторін (NIP), таблицею позицій та блоком підсумків.

## Автентифікація

| Роль | Доступ |
|---|---|
| Адміністратор / `manage_woocommerce` | будь-який рахунок |
| Авторизований власник замовлення | лише свої рахунки |
| Анонімний / інший користувач | 401 / 403 |

Рахунки-фактури містять персональні та податкові дані, тому ендпоінт свідомо закритий для анонімних клієнтів. Авторизація потрібна через cookie WordPress або ключ застосунку (REST application password).

## Що міститься у відповіді

**YAML front matter**

```yaml
---
number: "FV/2026/05/001"
type: "faktura_vat"
status: "issued"
order_id: "555"
currency: "PLN"
net_total: "200.00"
vat_total: "46.00"
gross_total: "246.00"
issued_at: "2026-05-01T10:00:00+00:00"
nip_seller: "5260250274"
nip_buyer: "7010019999"
ksef_reference: "KSEF-123"
ksef_status: "sent"
---
```

**Секція сторін**

- Seller NIP / Buyer NIP

**Таблиця позицій** (Markdown)

| # | Опис | Кількість | Од. | Ціна нетто | VAT % | Сума VAT | Ціна брутто |

**Підсумок**

- Net total / VAT total / Gross total з валютою

**Додаткові поля** (якщо наявні)

- KSeF reference / status
- Причина корекції (для коригувальних рахунків)

## Фільтр для розробників

```php
add_filter('polski-pro/ai_feed/invoice_markdown', static function (string $document, \Polski\Pro\Invoice\Model\Invoice $invoice): string {
    if ($invoice->type === \Polski\Pro\Invoice\Model\InvoiceType::FakturaVAT) {
        $document .= "\n\n## Notatka wewnętrzna\n\n- Wystawiono automatycznie po opłaceniu zamówienia.\n";
    }
    return $document;
}, 10, 2);
```

## Приклад використання з curl (авторизований адмін)

```bash
curl -u admin:apppassword \
  -H "Accept: text/markdown" \
  https://sklep.pl/wp-json/polski-pro/v1/invoices/42/markdown
```

## Повʼязане

- [AI Feed (FREE)](/pl/tools/ai-feed/) - модуль, що віддає записи, сторінки та продукти WooCommerce у Markdown
- [Рахунки-фактури PDF](/pl/pro/invoices/) - генерація та надсилання рахунків як PDF
- [KSeF](/pl/pro/ksef/) - інтеграція з Krajowy System e-Faktur

## FAQ

**Чи працює ендпоінт без авторизації?**

Ні. Рахунки містять персональні дані та NIP. Анонімний клієнт отримує 401.

**Чи можу я використовувати REST application password?**

Так. WordPress 5.6+ підтримує паролі застосунків. Згенеруйте один у **Користувачі > Редагувати > Паролі застосунків** і передайте в `Authorization: Basic`.

**Чи можна завантажити Markdown рахунка з рівня wp-admin?**

Окремої кнопки немає. URL стабільний - `/wp-json/polski-pro/v1/invoices/<id>/markdown` - тому його можна зберегти в закладках або вбудувати в бухгалтерські інструменти.

**Що з коригувальними рахунками?**

Корекції також підтримуються. Front matter містить `original_invoice_id`, а секція "Additional details" містить `correction_reason`.
