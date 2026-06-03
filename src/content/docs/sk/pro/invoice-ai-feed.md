---
title: AI Feed pre faktúry
description: REST endpoint sprístupňujúci faktúru vo formáte Markdown, na použitie účtovnými agentmi a agentmi zákazníckej podpory založenými na LLM.
---

Polski Pro 1.10.0 pridáva REST endpoint, ktorý poskytuje faktúru vo formáte **Markdown**. AI agenti (účtovníci, zákaznícka podpora, asistenti kupujúceho) dostávajú štruktúrované dáta faktúry bez nutnosti parsovať PDF.

## Endpoint

```
GET /wp-json/polski-pro/v1/invoices/{id}/markdown
Accept: text/markdown
```

Odpoveď:

```
Content-Type: text/markdown; charset=UTF-8
Cache-Control: private, no-store
```

Telo je Markdown s YAML front matter, blokom strán (NIP), tabuľkou položiek a blokom súhrnov.

## Autentifikácia

| Rola | Prístup |
|---|---|
| Administrátor / `manage_woocommerce` | ľubovoľná faktúra |
| Prihlásený vlastník objednávky | iba vlastné faktúry |
| Anonymný / iný používateľ | 401 / 403 |

Faktúry obsahujú osobné a daňové údaje, preto je endpoint zámerne uzavretý pre anonymných zákazníkov. Prihlásenie je vyžadované cez cookie WordPress alebo aplikačný kľúč (REST application password).

## Čo sa nachádza v odpovedi

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

**Sekcia strán**

- Seller NIP / Buyer NIP

**Tabuľka položiek** (Markdown)

| # | Opis | Ilość | Jedn. | Cena netto | VAT % | Kwota VAT | Cena brutto |

**Súhrn**

- Net total / VAT total / Gross total s menou

**Dodatočné polia** (ak sú prítomné)

- KSeF reference / status
- Dôvod korekcie (pre opravné faktúry)

## Vývojársky filter

```php
add_filter('polski-pro/ai_feed/invoice_markdown', static function (string $document, \Polski\Pro\Invoice\Model\Invoice $invoice): string {
    if ($invoice->type === \Polski\Pro\Invoice\Model\InvoiceType::FakturaVAT) {
        $document .= "\n\n## Notatka wewnętrzna\n\n- Wystawiono automatycznie po opłaceniu zamówienia.\n";
    }
    return $document;
}, 10, 2);
```

## Príklad použitia s curl (prihlásený admin)

```bash
curl -u admin:apppassword \
  -H "Accept: text/markdown" \
  https://sklep.pl/wp-json/polski-pro/v1/invoices/42/markdown
```

## Súvisiace

- [AI Feed (FREE)](/pl/tools/ai-feed/) - modul poskytujúci príspevky, stránky a produkty WooCommerce v Markdown
- [Faktúry PDF](/pl/pro/invoices/) - generovanie a odosielanie faktúr ako PDF
- [KSeF](/pl/pro/ksef/) - integrácia s Krajowym Systemem e-Faktur

## FAQ

**Funguje endpoint bez prihlásenia?**

Nie. Faktúry obsahujú osobné údaje a NIP. Anonymný zákazník dostane 401.

**Môžem používať REST application password?**

Áno. WordPress 5.6+ podporuje aplikačné heslá. Vygenerujte jedno v **Používatelia > Upraviť > Aplikačné heslá** a odovzdajte v `Authorization: Basic`.

**Dá sa stiahnuť Markdown faktúry z úrovne wp-admin?**

Nie je samostatné tlačidlo. URL je stabilný - `/wp-json/polski-pro/v1/invoices/<id>/markdown` - takže ho možno uložiť do záložiek alebo vložiť do účtovných nástrojov.

**Čo s opravnými faktúrami?**

Korekcie sú tiež podporované. Front matter obsahuje `original_invoice_id` a sekcia "Additional details" obsahuje `correction_reason`.
