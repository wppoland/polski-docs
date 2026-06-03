---
title: Systém faktur
description: Dokumentace systému faktur Polski PRO for WooCommerce - Faktura VAT, opravná, paragon, WZ, generování PDF, číslování a REST API.
---

Modul faktur generuje prodejní dokumenty přímo ve WooCommerce. Podporuje čtyři typy dokumentů, automatické číslování a PDF.

## Typy dokumentů

### Faktura VAT

Standardní faktura VAT s údaji:

- údaje prodávajícího a kupujícího (včetně NIP obou stran)
- položky s názvem, množstvím, cenou netto, sazbou VAT, částkou VAT a cenou brutto
- souhrn s rozdělením podle sazeb VAT
- číslo faktury, datum vystavení a datum prodeje
- termín a formu platby

### Opravná faktura

Korekce k dřívější faktuře. Obsahuje:

- číslo a datum opravované faktury
- položky před korekcí a po korekci
- rozdíl hodnoty
- důvod korekce

Vystavte korekci z panelu objednávky nebo přes REST API.

### Paragon

Zjednodušený dokument pro zákazníky bez NIP. Obsahuje položky s cenami brutto a souhrn.

### Dokument WZ (packing slip)

Dokument přikládaný k zásilce. Obsahuje seznam produktů a množství, bez cen.

## Konfigurace

Přejděte do **WooCommerce > Nastavení > Polski > Moduly PRO > Faktury**.

### Údaje prodávajícího

| Pole | Popis |
|------|------|
| Název firmy | Plný název firmy prodávajícího |
| NIP | Daňové identifikační číslo prodávajícího |
| Adresa | Ulice, číslo, PSČ, město |
| Číslo bankovního účtu | Číslo účtu pro převody |
| Kontaktní e-mail | E-mailová adresa viditelná na faktuře |

### Číslování

Dostupné strategie číslování:

| Strategie | Formát | Příklad |
|-----------|--------|---------|
| Roční | `FV/{numer}/{rok}` | FV/1/2026 |
| Měsíční | `FV/{numer}/{miesiąc}/{rok}` | FV/1/04/2026 |
| Průběžná | `FV/{numer}` | FV/1 |
| Vlastní vzor | Definovaný uživatelem | FV/2026/04/001 |

Dostupné tokeny ve vlastním formátu:

- `{numer}` - pořadové číslo faktury (s nulováním podle strategie)
- `{rok}` - čtyřmístný rok
- `{miesiac}` - dvojmístný měsíc
- `{dzien}` - dvojmístný den
- `{id_zamowienia}` - ID objednávky WooCommerce

### Automatické generování

Zapněte volbu **Automatické generování faktury**, aby plugin vytvořil fakturu po změně stavu na "Dokončeno".

Můžete také zapnout automatické přiložení PDF faktury k e-mailu "Objednávka dokončena".

## Generování PDF

PDF je generováno knihovnou TCPDF. Šablona obsahuje:

- logo firmy (volitelné, konfigurovatelné v nastavení)
- údaje prodávajícího a kupujícího
- tabulku položek se sloupci VAT
- souhrn s rozdělením podle sazeb VAT
- patičku s údaji firmy

### Písma

Plugin používá písmo DejaVu Sans s podporou polských znaků. Dodatečná konfigurace není potřeba.

## Stav faktury

Cyklus stavů faktury:

```
Draft (Koncept) → Issued (Vystavena) → Sent (Odeslána) → Paid (Zaplacena)
                                                        → Cancelled (Zrušena)
```

| Stav | Popis |
|--------|------|
| Draft | Faktura vytvořena, ale ještě nevystavena. Lze upravovat |
| Issued | Faktura vystavena s přiděleným číslem. Nelze upravovat |
| Sent | Faktura odeslána zákazníkovi (e-mail nebo KSeF) |
| Paid | Faktura zaplacena |
| Cancelled | Faktura zrušena. Vyžaduje vystavení korekce |

## Panel objednávky

V panelu objednávky modul přidává meta box "Faktury" s funkcemi:

- **Vystavit fakturu** - generuje fakturu na základě údajů objednávky
- **Stáhnout PDF** - stáhne fakturu ve formátu PDF
- **Odeslat zákazníkovi** - odešle fakturu e-mailem
- **Vystavit korekci** - vytvoří opravnou fakturu
- **Historie** - seznam všech dokumentů spojených s objednávkou

## VAT na položkách

Každá položka faktury obsahuje podrobné údaje VAT:

- jednotková cena netto
- sazba VAT (23%, 8%, 5%, 0%, zw., np., oo.)
- jednotková částka VAT
- hodnota netto
- hodnota brutto

Plugin načítá sazby VAT z konfigurace WooCommerce Tax. Podporuje více sazeb na jedné faktuře.

## REST API

Endpointy REST API pro správu faktur:

### Seznam faktur

```
GET /wp-json/polski-pro/v1/invoices
```

Parametry query:

| Parametr | Typ | Popis |
|----------|-----|------|
| `order_id` | int | Filtrovat podle ID objednávky |
| `status` | string | Filtrovat podle stavu (draft, issued, sent, paid, cancelled) |
| `type` | string | Filtrovat podle typu (invoice, correction, receipt, packing_slip) |
| `date_from` | string | Datum od (YYYY-MM-DD) |
| `date_to` | string | Datum do (YYYY-MM-DD) |
| `per_page` | int | Počet výsledků na stránku (výchozí 20) |
| `page` | int | Číslo stránky |

### Vytvoření faktury

```
POST /wp-json/polski-pro/v1/invoices
```

```json
{
    "order_id": 123,
    "type": "invoice",
    "auto_number": true
}
```

### Stažení PDF

```
GET /wp-json/polski-pro/v1/invoices/{id}/pdf
```

Vrací soubor PDF jako `application/pdf` s hlavičkou `Content-Disposition: attachment`.

### Vystavení korekce

```
POST /wp-json/polski-pro/v1/invoices/{id}/correction
```

```json
{
    "reason": "Zmiana danych nabywcy",
    "items": [
        {
            "product_id": 45,
            "quantity": 1,
            "net_price": 100.00,
            "vat_rate": 23
        }
    ]
}
```

### Statistiky

```
GET /wp-json/polski-pro/v1/invoices/stats
```

Vrací statistiky faktur: celkový počet, hodnoty netto/brutto, rozdělení podle stavů.

## Hooky

### `polski_pro/invoices/before_generate`

Akce volaná před vygenerováním faktury.

```php
/**
 * @param int    $order_id ID zamówienia
 * @param string $type     Typ dokumentu (invoice, correction, receipt, packing_slip)
 */
do_action('polski_pro/invoices/before_generate', int $order_id, string $type);
```

**Příklad:**

```php
add_action('polski_pro/invoices/before_generate', function (int $order_id, string $type): void {
    if ($type === 'invoice') {
        // Logowanie generowania faktury
        error_log("Generowanie faktury dla zamówienia #{$order_id}");
    }
}, 10, 2);
```

### `polski_pro/invoices/number_format`

Filtruje formát čísla faktury.

```php
/**
 * @param string $number    Wygenerowany numer faktury
 * @param string $type      Typ dokumentu
 * @param int    $order_id  ID zamówienia
 */
apply_filters('polski_pro/invoices/number_format', string $number, string $type, int $order_id): string;
```

**Příklad:**

```php
add_filter('polski_pro/invoices/number_format', function (string $number, string $type, int $order_id): string {
    if ($type === 'correction') {
        return 'KOR/' . $number;
    }
    return $number;
}, 10, 3);
```

### `polski_pro/invoices/pdf_content`

Filtruje data předávaná do šablony PDF.

```php
/**
 * @param array  $data     Dane faktury (seller, buyer, items, totals)
 * @param int    $invoice_id ID faktury
 */
apply_filters('polski_pro/invoices/pdf_content', array $data, int $invoice_id): array;
```

**Příklad:**

```php
add_filter('polski_pro/invoices/pdf_content', function (array $data, int $invoice_id): array {
    $data['footer_note'] = 'Dziękujemy za zakupy!';
    return $data;
}, 10, 2);
```

## Nejčastější problémy

### PDF generuje prázdné stránky

1. Zkontrolujte, zda je nainstalováno rozšíření PHP `mbstring`
2. Ujistěte se, že adresář `wp-content/uploads/polski-pro/invoices/` má oprávnění k zápisu (755)
3. Ověřte, zda jsou údaje prodávajícího vyplněny v nastavení

### Číslování se resetuje

Číslování se resetuje podle strategie: roční - 1. ledna, měsíční - 1. dne měsíce. Chcete průběžné číslování? Zvolte strategii "Průběžná".

### Chybí VAT na položkách

Zkontrolujte konfiguraci WooCommerce Tax. Ujistěte se, že sazby VAT pro Polsko jsou správně nastaveny.

## Související zdroje

- [Integrace KSeF](/pro/ksef/)
- [Nahlásit problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má výhradně informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) dodávaný bez záruky.</div>
