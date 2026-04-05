---
title: Systém faktúr
description: Dokumentácia systému faktúr Polski PRO for WooCommerce - faktúra s DPH, opravná faktúra, účtenka, dodací list, generovanie PDF, číslovanie a REST API.
---

Modul faktúr v Polski PRO for WooCommerce umožňuje generovanie predajných dokumentov priamo z prostredia WooCommerce. Podporuje štyri typy dokumentov, automatické číslovanie, generovanie PDF a kompletný životný cyklus faktúry.

## Typy dokumentov

### Faktúra s DPH

Štandardná faktúra s DPH obsahujúca:

- údaje predávajúceho a kupujúceho (vrátane IČ DPH oboch strán)
- položky s názvom, množstvom, cenou bez DPH, sadzbou DPH, sumou DPH a cenou s DPH
- zhrnutie s rozpisom podľa sadzieb DPH
- číslo faktúry, dátum vystavenia a dátum predaja
- lehotu a formu platby

### Opravná faktúra

Opravný dokument k predtým vystavenej faktúre. Obsahuje:

- číslo a dátum opravovanej faktúry
- položky pred opravou a po oprave
- rozdiel hodnôt
- dôvod opravy

Opravnú faktúru je možné vystaviť z panelu objednávky alebo cez REST API.

### Účtenka

Zjednodušený predajný dokument pre individuálnych zákazníkov (bez IČ DPH kupujúceho). Obsahuje položky s cenami s DPH a zhrnutie.

### Dodací list (packing slip)

Dokument externého výdaja prikladaný k zásielke. Obsahuje zoznam produktov, množstvá a prípadné poznámky k objednávke. Neobsahuje ceny.

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski > Moduly PRO > Faktúry**.

### Údaje predávajúceho

| Pole | Popis |
|------|-------|
| Názov firmy | Úplný názov firmy predávajúceho |
| IČ DPH | Daňové identifikačné číslo predávajúceho |
| Adresa | Ulica, číslo, PSČ, mesto |
| Číslo bankového účtu | Číslo účtu pre prevody |
| Kontaktný e-mail | E-mailová adresa zobrazená na faktúre |

### Číslovanie

Plugin ponúka niekoľko stratégií číslovania faktúr:

| Stratégia | Formát | Príklad |
|-----------|--------|---------|
| Ročná | `FV/{číslo}/{rok}` | FV/1/2026 |
| Mesačná | `FV/{číslo}/{mesiac}/{rok}` | FV/1/04/2026 |
| Priebežná | `FV/{číslo}` | FV/1 |
| Vlastný vzor | Definovaný používateľom | FV/2026/04/001 |

Dostupné tokeny vo vlastnom formáte:

- `{numer}` - poradové číslo faktúry (s nulovaniem podľa stratégie)
- `{rok}` - štvorciferný rok
- `{miesiac}` - dvojciferný mesiac
- `{dzien}` - dvojciferný deň
- `{id_zamowienia}` - ID objednávky WooCommerce

### Automatické generovanie

Plugin môže automaticky vygenerovať faktúru po zmene stavu objednávky na "Vybavená" (completed). Zapnite možnosť **Automatické generovanie faktúry** v nastaveniach modulu.

Môžete tiež nastaviť automatické odosielanie faktúry v PDF ako prílohy e-mailu WooCommerce "Objednávka vybavená".

## Generovanie PDF

Faktúry PDF sú generované pomocou knižnice TCPDF. Šablóna PDF obsahuje:

- logo firmy (voliteľné, konfigurovateľné v nastaveniach)
- údaje predávajúceho a kupujúceho
- tabuľku položiek so stĺpcami DPH
- zhrnutie s rozpisom podľa sadzieb DPH
- pätičku s údajmi firmy

### Písma

Plugin používa písmo DejaVu Sans, ktoré podporuje poľské diakritické znaky. Nevyžaduje ďalšiu konfiguráciu.

## Stav faktúry

Každá faktúra prechádza cyklom stavov:

```
Draft (Koncept) → Issued (Vystavená) → Sent (Odoslaná) → Paid (Uhradená)
                                                         → Cancelled (Zrušená)
```

| Stav | Popis |
|--------|------|
| Draft | Faktúra vytvorená, ale zatiaľ nevystavená. Je možné ju upraviť |
| Issued | Faktúra vystavená s prideleným číslom. Nie je možné ju upraviť |
| Sent | Faktúra odoslaná zákazníkovi (e-mailom alebo do KSeF) |
| Paid | Faktúra uhradená |
| Cancelled | Faktúra zrušená. Vyžaduje vystavenie opravy |

## Panel objednávky

V administračnom paneli objednávky WooCommerce modul pridáva meta box "Faktúry" s nasledujúcimi funkciami:

- **Vystaviť faktúru** - vygeneruje faktúru na základe údajov objednávky
- **Stiahnuť PDF** - stiahne faktúru vo formáte PDF
- **Odoslať zákazníkovi** - odošle faktúru e-mailom
- **Vystaviť opravu** - vytvorí opravnú faktúru
- **História** - zoznam všetkých dokumentov spojených s objednávkou

## DPH na položkách

Každá položka faktúry obsahuje podrobné údaje o DPH:

- jednotková cena bez DPH
- sadzba DPH (23%, 8%, 5%, 0%, oslobodené, neplatca, opačný prenos)
- jednotková suma DPH
- hodnota bez DPH
- hodnota s DPH

Plugin automaticky rozpozná sadzbu DPH z konfigurácie WooCommerce Tax. Podporuje viacero sadzieb DPH na jednej faktúre so správnym zhrnutím.

## REST API

Modul sprístupňuje REST API endpointy na programovú správu faktúr.

### Zoznam faktúr

```
GET /wp-json/polski-pro/v1/invoices
```

Parametre query:

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

### Vystavenie opravy

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

Vracia štatistiky faktúr: celkový počet, hodnoty bez/s DPH, rozpis podľa stavov.

## Hooky

### `polski_pro/invoices/before_generate`

Akcia volaná pred vygenerovaním faktúry.

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
        // Logovanie generovania faktúry
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

### PDF generuje prázdne stránky

1. Skontrolujte, či je rozšírenie PHP `mbstring` nainštalované
2. Uistite sa, že priečinok `wp-content/uploads/polski-pro/invoices/` má oprávnenia na zápis (755)
3. Overte, či sú údaje predávajúceho vyplnené v nastaveniach

### Číslovanie sa resetuje

Číslovanie sa resetuje podľa zvolenej stratégie - ročná sa resetuje 1. januára, mesačná 1. dňa každého mesiaca. Ak chcete priebežné číslovanie, vyberte stratégiu "Priebežná".

### Chýba DPH na položkách

Skontrolujte konfiguráciu WooCommerce Tax. Plugin čerpá sadzby DPH z daňových nastavení WooCommerce. Uistite sa, že sadzby sú správne nakonfigurované pre Poľsko.

## Súvisiace zdroje

- [Integrácia KSeF](/pro/ksef/)
- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
