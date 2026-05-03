---
title: AI Feed dla faktur
description: Endpoint REST udostępniający fakturę w formacie Markdown, do użytku przez agentów księgowych i obsługi klienta opartych o LLM.
---

Polski Pro 1.10.0 dodaje endpoint REST, który serwuje fakturę w formacie **Markdown**. Agenci AI (księgowi, obsługa klienta, asystenci kupującego) dostają strukturalne dane faktury bez konieczności parsowania PDF.

## Endpoint

```
GET /wp-json/polski-pro/v1/invoices/{id}/markdown
Accept: text/markdown
```

Odpowiedź:

```
Content-Type: text/markdown; charset=UTF-8
Cache-Control: private, no-store
```

Body to Markdown z YAML front matter, blokiem stron (NIP), tabelą pozycji oraz blokiem podsumowań.

## Uwierzytelnianie

| Rola | Dostęp |
|---|---|
| Administrator / `manage_woocommerce` | dowolna faktura |
| Zalogowany właściciel zamówienia | tylko swoje faktury |
| Anonimowy / inny użytkownik | 401 / 403 |

Faktury zawierają dane osobowe i podatkowe, więc endpoint jest świadomie zamknięty dla anonimowych klientów. Logowanie wymagane przez ciasteczko WordPress lub klucz aplikacyjny (REST application password).

## Co znajduje się w odpowiedzi

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

**Sekcja stron**

- Seller NIP / Buyer NIP

**Tabela pozycji** (Markdown)

| # | Opis | Ilość | Jedn. | Cena netto | VAT % | Kwota VAT | Cena brutto |

**Podsumowanie**

- Net total / VAT total / Gross total z walutą

**Dodatkowe pola** (jeśli obecne)

- KSeF reference / status
- Powód korekty (dla faktur korygujących)

## Filtr deweloperski

```php
add_filter('polski-pro/ai_feed/invoice_markdown', static function (string $document, \Polski\Pro\Invoice\Model\Invoice $invoice): string {
    if ($invoice->type === \Polski\Pro\Invoice\Model\InvoiceType::FakturaVAT) {
        $document .= "\n\n## Notatka wewnętrzna\n\n- Wystawiono automatycznie po opłaceniu zamówienia.\n";
    }
    return $document;
}, 10, 2);
```

## Przykład użycia z curl (zalogowany admin)

```bash
curl -u admin:apppassword \
  -H "Accept: text/markdown" \
  https://sklep.pl/wp-json/polski-pro/v1/invoices/42/markdown
```

## Powiązane

- [AI Feed (FREE)](/pl/tools/ai-feed/) - moduł serwujący wpisy, strony i produkty WooCommerce w Markdown
- [Faktury PDF](/pl/pro/invoices/) - generowanie i wysyłka faktur jako PDF
- [KSeF](/pl/pro/ksef/) - integracja z Krajowym Systemem e-Faktur

## FAQ

**Czy endpoint działa bez logowania?**

Nie. Faktury zawierają dane osobowe i NIP. Anonimowy klient dostaje 401.

**Czy mogę używać REST application password?**

Tak. WordPress 5.6+ obsługuje hasła aplikacyjne. Wygeneruj jedno w **Użytkownicy > Edytuj > Hasła aplikacyjne** i przekaż w `Authorization: Basic`.

**Czy można pobrać Markdown faktury z poziomu wp-admin?**

Nie ma osobnego przycisku. URL jest stabilny - `/wp-json/polski-pro/v1/invoices/<id>/markdown` - więc można go zbookmarkować lub osadzić w narzędziach księgowych.

**Co z fakturami korygującymi?**

Korekty również są obsługiwane. Front matter zawiera `original_invoice_id`, a sekcja "Additional details" zawiera `correction_reason`.
