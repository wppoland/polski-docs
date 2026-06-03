---
title: AI Feed pro faktury
description: REST endpoint poskytující fakturu ve formátu Markdown, k použití účetními agenty a agenty zákaznické podpory založenými na LLM.
---

Polski Pro 1.10.0 přidává REST endpoint, který servíruje fakturu ve formátu **Markdown**. Agenti AI (účetní, zákaznická podpora, asistenti kupujícího) dostávají strukturovaná data faktury bez nutnosti parsovat PDF.

## Endpoint

```
GET /wp-json/polski-pro/v1/invoices/{id}/markdown
Accept: text/markdown
```

Odpověď:

```
Content-Type: text/markdown; charset=UTF-8
Cache-Control: private, no-store
```

Body je Markdown s YAML front matter, blokem stran (NIP), tabulkou položek a blokem souhrnů.

## Autentizace

| Role | Přístup |
|---|---|
| Administrator / `manage_woocommerce` | libovolná faktura |
| Přihlášený vlastník objednávky | pouze vlastní faktury |
| Anonymní / jiný uživatel | 401 / 403 |

Faktury obsahují osobní a daňové údaje, proto je endpoint vědomě uzavřen pro anonymní zákazníky. Přihlášení vyžadováno přes cookie WordPress nebo aplikační klíč (REST application password).

## Co se nachází v odpovědi

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

**Sekce stran**

- Seller NIP / Buyer NIP

**Tabulka položek** (Markdown)

| # | Popis | Množství | Jedn. | Cena netto | VAT % | Částka VAT | Cena brutto |

**Souhrn**

- Net total / VAT total / Gross total s měnou

**Dodatečná pole** (pokud jsou přítomná)

- KSeF reference / status
- Důvod korekce (pro opravné faktury)

## Vývojářský filtr

```php
add_filter('polski-pro/ai_feed/invoice_markdown', static function (string $document, \Polski\Pro\Invoice\Model\Invoice $invoice): string {
    if ($invoice->type === \Polski\Pro\Invoice\Model\InvoiceType::FakturaVAT) {
        $document .= "\n\n## Notatka wewnętrzna\n\n- Wystawiono automatycznie po opłaceniu zamówienia.\n";
    }
    return $document;
}, 10, 2);
```

## Příklad použití s curl (přihlášený admin)

```bash
curl -u admin:apppassword \
  -H "Accept: text/markdown" \
  https://sklep.pl/wp-json/polski-pro/v1/invoices/42/markdown
```

## Související

- [AI Feed (FREE)](/pl/tools/ai-feed/) - modul servírující příspěvky, stránky a produkty WooCommerce v Markdownu
- [Faktury PDF](/pl/pro/invoices/) - generování a odesílání faktur jako PDF
- [KSeF](/pl/pro/ksef/) - integrace s Krajowym Systemem e-Faktur

## FAQ

**Funguje endpoint bez přihlášení?**

Ne. Faktury obsahují osobní údaje a NIP. Anonymní zákazník dostane 401.

**Mohu používat REST application password?**

Ano. WordPress 5.6+ podporuje aplikační hesla. Vygenerujte jedno v **Uživatelé > Upravit > Aplikační hesla** a předejte v `Authorization: Basic`.

**Lze stáhnout Markdown faktury z úrovně wp-admin?**

Není zde samostatné tlačítko. URL je stabilní - `/wp-json/polski-pro/v1/invoices/<id>/markdown` - takže ji lze přidat do záložek nebo vložit do účetních nástrojů.

**Co s opravnými fakturami?**

Korekce jsou rovněž podporovány. Front matter obsahuje `original_invoice_id` a sekce "Additional details" obsahuje `correction_reason`.
