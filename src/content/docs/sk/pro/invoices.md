---
title: Systém faktúr
description: Dokumentácia systému faktúr Polski PRO for WooCommerce - Faktúra VAT, opravná, doklad, WZ, generovanie PDF, číslovanie a REST API.
---

Modul faktúr generuje predajné doklady priamo vo WooCommerce. Podporuje štyri typy dokladov, automatické číslovanie a PDF.

## Typy dokladov

### Faktúra VAT

Štandardná faktúra VAT s údajmi:

- údaje predávajúceho a kupujúceho (vrátane NIP oboch strán)
- položky s názvom, množstvom, cenou netto, sadzbou VAT, sumou VAT a cenou brutto
- súhrn s rozpisom podľa sadzieb VAT
- číslo faktúry, dátum vystavenia a dátum predaja
- termín a formu platby

### Opravná faktúra

Korekcia k predchádzajúcej faktúre. Obsahuje:

- číslo a dátum opravovanej faktúry
- položky pred korekciou a po korekcii
- rozdiel hodnôt
- dôvod korekcie

Vystavte korekciu z panela objednávky alebo cez REST API.

### Doklad

Zjednodušený doklad pre zákazníkov bez NIP. Obsahuje položky s cenami brutto a súhrn.

### Dokument WZ (packing slip)

Dokument priložený k zásielke. Obsahuje zoznam produktov a množstiev, bez cien.

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski > Moduly PRO > Faktúry**.

### Údaje predávajúceho

| Pole | Popis |
|------|------|
| Názov firmy | Úplný názov firmy predávajúceho |
| NIP | Daňové identifikačné číslo predávajúceho |
| Adresa | Ulica, číslo, PSČ, mesto |
| Číslo bankového účtu | Číslo účtu pre prevody |
| Kontaktný e-mail | E-mailová adresa viditeľná na faktúre |

### Číslovanie

Dostupné stratégie číslovania:

| Stratégia | Formát | Príklad |
|-----------|--------|---------|
| Ročná | `FV/{numer}/{rok}` | FV/1/2026 |
| Mesačná | `FV/{numer}/{miesiąc}/{rok}` | FV/1/04/2026 |
| Súvislá | `FV/{numer}` | FV/1 |
| Vlastný vzor | Definovaný používateľom | FV/2026/04/001 |

Dostupné tokeny vo vlastnom formáte:

- `{numer}` - poradové číslo faktúry (s nulovaním podľa stratégie)
- `{rok}` - štvorciferný rok
- `{miesiac}` - dvojciferný mesiac
- `{dzien}` - dvojciferný deň
- `{id_zamowienia}` - ID objednávky WooCommerce

### Automatické generovanie

Zapnite voľbu **Automatické generovanie faktúry**, aby plugin vytváral faktúru po zmene stavu na "Dokončené".

Môžete tiež zapnúť automatické prikladanie PDF faktúry k e-mailu "Objednávka dokončená".

## Generovanie PDF

PDF je generované knižnicou TCPDF. Šablóna obsahuje:

- logo firmy (voliteľné, konfigurovateľné v nastaveniach)
- údaje predávajúceho a kupujúceho
- tabuľku položiek so stĺpcami VAT
- súhrn s rozpisom podľa sadzieb VAT
- pätu s údajmi firmy

### Písma

Plugin používa písmo DejaVu Sans s podporou poľských znakov. Dodatočná konfigurácia nie je potrebná.

## Stav faktúry

Cyklus stavov faktúry:

```
Draft (Koncept) → Issued (Vystavená) → Sent (Odoslaná) → Paid (Zaplatená)
                                                       → Cancelled (Zrušená)
```

| Stav | Popis |
|--------|------|
| Draft | Faktúra vytvorená, ale ešte nevystavená. Možno upravovať |
| Issued | Faktúra vystavená s prideleným číslom. Nemožno upravovať |
| Sent | Faktúra odoslaná zákazníkovi (e-mail alebo KSeF) |
| Paid | Faktúra zaplatená |
| Cancelled | Faktúra zrušená. Vyžaduje vystavenie korekcie |

## Panel objednávky

V paneli objednávky modul pridáva meta box "Faktúry" s funkciami:

- **Vystaviť faktúru** - generuje faktúru na základe údajov objednávky
- **Stiahnuť PDF** - stiahne faktúru vo formáte PDF
- **Odoslať zákazníkovi** - odošle faktúru e-mailom
- **Vystaviť korekciu** - vytvorí opravnú faktúru
- **História** - zoznam všetkých dokladov spojených s objednávkou

## VAT na položkách

Každá položka faktúry obsahuje podrobné údaje VAT:

- jednotková cena netto
- sadzba VAT (23%, 8%, 5%, 0%, zw., np., oo.)
- jednotková suma VAT
- hodnota netto
- hodnota brutto

Plugin načítava sadzby VAT z konfigurácie WooCommerce Tax. Podporuje viacero sadzieb na jednej faktúre.

## REST API

Endpointy REST API na správu faktúr:

### Zoznam faktúr

```
GET /wp-json/polski-pro/v1/invoices
```

Query parametre:

| Parameter | Typ | Popis |
|----------|-----|------|
| `order_id` | int | Filtrovať podľa ID objednávky |
| `status` | string | Filtrovať podľa stavu (draft, issued, sent, paid, cancelled) |
| `type` | string | Filtrovať podľa typu (invoice, correction, receipt, packing_slip) |
| `date_from` | string | Dátum od (YYYY-MM-DD) |
| `date_to` | string | Dátum do (YYYY-MM-DD) |
| `per_page` | int | Počet výsledkov na stránku (predvolene 20) |
| `page` | int | Číslo stránky |

### Vytvorenie faktúry

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

### Stiahnutie PDF

```
GET /wp-json/polski-pro/v1/invoices/{id}/pdf
```

Vracia súbor PDF ako `application/pdf` s hlavičkou `Content-Disposition: attachment`.

### Vystavenie korekcie

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

### Štatistiky

```
GET /wp-json/polski-pro/v1/invoices/stats
```

Vracia štatistiky faktúr: celkový počet, hodnoty netto/brutto, rozpis podľa stavov.

## Hooky

### `polski_pro/invoices/before_generate`

Akcia vyvolaná pred vygenerovaním faktúry.

```php
/**
 * @param int    $order_id ID zamówienia
 * @param string $type     Typ dokumentu (invoice, correction, receipt, packing_slip)
 */
do_action('polski_pro/invoices/before_generate', int $order_id, string $type);
```

**Príklad:**

```php
add_action('polski_pro/invoices/before_generate', function (int $order_id, string $type): void {
    if ($type === 'invoice') {
        // Logowanie generowania faktury
        error_log("Generowanie faktury dla zamówienia #{$order_id}");
    }
}, 10, 2);
```

### `polski_pro/invoices/number_format`

Filtruje formát čísla faktúry.

```php
/**
 * @param string $number    Wygenerowany numer faktury
 * @param string $type      Typ dokumentu
 * @param int    $order_id  ID zamówienia
 */
apply_filters('polski_pro/invoices/number_format', string $number, string $type, int $order_id): string;
```

**Príklad:**

```php
add_filter('polski_pro/invoices/number_format', function (string $number, string $type, int $order_id): string {
    if ($type === 'correction') {
        return 'KOR/' . $number;
    }
    return $number;
}, 10, 3);
```

### `polski_pro/invoices/pdf_content`

Filtruje dáta odovzdávané do šablóny PDF.

```php
/**
 * @param array  $data     Dane faktury (seller, buyer, items, totals)
 * @param int    $invoice_id ID faktury
 */
apply_filters('polski_pro/invoices/pdf_content', array $data, int $invoice_id): array;
```

**Príklad:**

```php
add_filter('polski_pro/invoices/pdf_content', function (array $data, int $invoice_id): array {
    $data['footer_note'] = 'Dziękujemy za zakupy!';
    return $data;
}, 10, 2);
```

## Najčastejšie problémy

### PDF generuje prázdne strany

1. Skontrolujte, či je rozšírenie PHP `mbstring` nainštalované
2. Uistite sa, že adresár `wp-content/uploads/polski-pro/invoices/` má oprávnenia na zápis (755)
3. Overte, či sú údaje predávajúceho vyplnené v nastaveniach

### Číslovanie sa resetuje

Číslovanie sa resetuje podľa stratégie: ročné - 1. januára, mesačné - 1. deň mesiaca. Chcete súvislé číslovanie? Vyberte stratégiu "Súvislá".

### Chýba VAT na položkách

Skontrolujte konfiguráciu WooCommerce Tax. Uistite sa, že sadzby VAT pre Poľsko sú správne nastavené.

## Súvisiace zdroje

- [Integrácia KSeF](/pro/ksef/)
- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informačný charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) dodávaný bez záruky.</div>
