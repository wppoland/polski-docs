---
title: System faktur
description: Dokumentace systemu faktur Polski PRO for WooCommerce - faktura DPH, opravna faktura, uctenka, dodaci list, generovani PDF, cislovani a REST API.
---

Modul faktur generuje prodejni dokumenty primo ve WooCommerce. Podporuje ctyri typy dokumentu, automaticke cislovani a PDF.

## Typy dokumentu

### Faktura DPH

Standardni faktura DPH obsahujici:

- udaje prodavajiciho a kupujiciho (vcetne DIC obou stran)
- polozky s nazvem, mnozstvim, cenou bez DPH, sazbou DPH, castkou DPH a cenou s DPH
- souhrn s rozpisem podle sazeb DPH
- cislo faktury, datum vystaveni a datum uskutecneni zdanitelneho plneni
- splatnost a zpusob platby

### Opravna faktura

Opravny dokument k drive vystavene fakture. Obsahuje:

- cislo a datum opravovane faktury
- polozky pred opravou a po oprave
- rozdil hodnot
- duvod opravy

Opravnou fakturu lze vystavit z panelu objednavky nebo pres REST API.

### Uctenka

Zjednoduseny prodejni dokument pro fyzicke osoby (bez DIC kupujiciho). Obsahuje polozky s cenami vcetne DPH a souhrn.

### Dodaci list (packing slip)

Dokument o vydani zbozi prilozeny k zasilce. Obsahuje seznam produktu, mnozstvi a pripadne poznamky k objednavce. Neobsahuje ceny.

## Konfigurace

Prejdete do **WooCommerce > Nastaveni > Polski > Moduly PRO > Faktury**.

### Udaje prodavajiciho

| Pole | Popis |
|------|-------|
| Nazev firmy | Uplny nazev firmy prodavajiciho |
| DIC | Danove identifikacni cislo prodavajiciho |
| Adresa | Ulice, cislo, PSC, mesto |
| Cislo bankovniho uctu | Cislo uctu pro prevody |
| Kontaktni e-mail | E-mailova adresa zobrazena na fakture |

### Cislovani

Plugin nabizi nekolik strategii cislovani faktur:

| Strategie | Format | Priklad |
|-----------|--------|---------|
| Rocni | `FV/{numer}/{rok}` | FV/1/2026 |
| Mesicni | `FV/{numer}/{miesiąc}/{rok}` | FV/1/04/2026 |
| Prubezne | `FV/{numer}` | FV/1 |
| Vlastni vzor | Definovany uzivatelem | FV/2026/04/001 |

Dostupne tokeny ve vlastnim formatu:

- `{numer}` - poradove cislo faktury (s nulovanim podle strategie)
- `{rok}` - rok ctyrmistny
- `{miesiac}` - mesic dvoumistny
- `{dzien}` - den dvoumistny
- `{id_zamowienia}` - ID objednavky WooCommerce

### Automaticke generovani

Plugin muze automaticky vygenerovat fakturu po zmene stavu objednavky na "Dokonceno" (completed). Zapnete moznost **Automaticke generovani faktury** v nastaveni modulu.

Muzete take nakonfigurovat automaticke odesilani PDF faktury jako prilohy e-mailu WooCommerce "Objednavka dokoncena".

## Generovani PDF

PDF faktury jsou generovany pomoci knihovny TCPDF. Sablona PDF obsahuje:

- logo firmy (volitelne, konfigurovatelne v nastaveni)
- udaje prodavajiciho a kupujiciho
- tabulku polozek se sloupci DPH
- souhrn s rozpisem podle sazeb DPH
- paticku s udaji firmy

### Pisma

Plugin pouziva pismo DejaVu Sans, ktere podporuje ceske a polske diakritiche znaky. Nevyzaduje dalsi konfiguraci.

## Status faktury

Kazda faktura prochazi cyklem statusu:

```
Draft (Koncept) → Issued (Vystavena) → Sent (Odeslana) → Paid (Zaplacena)
                                                        → Cancelled (Stornovana)
```

| Status | Popis |
|--------|-------|
| Draft | Faktura vytvorena, ale dosud nevystavena. Lze upravovat |
| Issued | Faktura vystavena s pridelenym cislem. Nelze upravovat |
| Sent | Faktura odeslana zakaznikovi (e-mail nebo KSeF) |
| Paid | Faktura zaplacena |
| Cancelled | Faktura stornovana. Vyzaduje vystaveni opravne faktury |

## Panel objednavky

V administracnim panelu objednavky WooCommerce modul pridava meta box "Faktury" s nasledujicimi funkcemi:

- **Vystavit fakturu** - vygeneruje fakturu na zaklade udaju objednavky
- **Stahnout PDF** - stahne fakturu ve formatu PDF
- **Odeslat zakaznikovi** - odesle fakturu e-mailem
- **Vystavit opravu** - vytvori opravnou fakturu
- **Historie** - seznam vsech dokumentu souvisejicich s objednavkou

## DPH na polozkach

Kazda polozka faktury obsahuje podrobne udaje o DPH:

- jednotkova cena bez DPH
- sazba DPH (23 %, 8 %, 5 %, 0 %, osv., np., oo.)
- jednotkova castka DPH
- hodnota bez DPH
- hodnota s DPH

Plugin automaticky rozpoznava sazbu DPH z konfigurace WooCommerce Tax. Podporuje vice sazeb DPH na jedne fakture se spravnym souhrnem.

## REST API

Modul poskytuje endpointy REST API pro programovou spravu faktur.

### Seznam faktur

```
GET /wp-json/polski-pro/v1/invoices
```

Parametry dotazu:

| Parametr | Typ | Popis |
|----------|-----|-------|
| `order_id` | int | Filtrovat podle ID objednavky |
| `status` | string | Filtrovat podle statusu (draft, issued, sent, paid, cancelled) |
| `type` | string | Filtrovat podle typu (invoice, correction, receipt, packing_slip) |
| `date_from` | string | Datum od (YYYY-MM-DD) |
| `date_to` | string | Datum do (YYYY-MM-DD) |
| `per_page` | int | Pocet vysledku na stranku (vychozi 20) |
| `page` | int | Cislo stranky |

### Vytvoreni faktury

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

### Stazeni PDF

```
GET /wp-json/polski-pro/v1/invoices/{id}/pdf
```

Vraci soubor PDF jako `application/pdf` s hlavickou `Content-Disposition: attachment`.

### Vystaveni opravne faktury

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

Vraci statistiky faktur: celkovy pocet, hodnoty bez DPH/s DPH, rozpis podle statusu.

## Hooky

### `polski_pro/invoices/before_generate`

Akce volana pred vygenerovanim faktury.

```php
/**
 * @param int    $order_id ID zamówienia
 * @param string $type     Typ dokumentu (invoice, correction, receipt, packing_slip)
 */
do_action('polski_pro/invoices/before_generate', int $order_id, string $type);
```

**Priklad:**

```php
add_action('polski_pro/invoices/before_generate', function (int $order_id, string $type): void {
    if ($type === 'invoice') {
        // Logovani generovani faktury
        error_log("Generowanie faktury dla zamówienia #{$order_id}");
    }
}, 10, 2);
```

### `polski_pro/invoices/number_format`

Filtruje format cisla faktury.

```php
/**
 * @param string $number    Wygenerowany numer faktury
 * @param string $type      Typ dokumentu
 * @param int    $order_id  ID zamówienia
 */
apply_filters('polski_pro/invoices/number_format', string $number, string $type, int $order_id): string;
```

**Priklad:**

```php
add_filter('polski_pro/invoices/number_format', function (string $number, string $type, int $order_id): string {
    if ($type === 'correction') {
        return 'KOR/' . $number;
    }
    return $number;
}, 10, 3);
```

### `polski_pro/invoices/pdf_content`

Filtruje data predavana do sablony PDF.

```php
/**
 * @param array  $data     Dane faktury (seller, buyer, items, totals)
 * @param int    $invoice_id ID faktury
 */
apply_filters('polski_pro/invoices/pdf_content', array $data, int $invoice_id): array;
```

**Priklad:**

```php
add_filter('polski_pro/invoices/pdf_content', function (array $data, int $invoice_id): array {
    $data['footer_note'] = 'Dziękujemy za zakupy!';
    return $data;
}, 10, 2);
```

## Nejcastejsi problemy

### PDF generuje prazdne stranky

1. Overite, ze rozsireni PHP `mbstring` je nainstalovano
2. Ujistete se, ze adresar `wp-content/uploads/polski-pro/invoices/` ma opravneni pro zapis (755)
3. Zkontrolujte, ze udaje prodavajiciho jsou vyplneny v nastaveni

### Cislovani se resetuje

Cislovani se resetuje podle zvolene strategie - rocni se resetuje 1. ledna, mesicni 1. dne kazdeho mesice. Pokud chcete prubezne cislovani, zvolte strategii "Prubezne".

### Chybi DPH na polozkach

Zkontrolujte konfiguraci WooCommerce Tax. Plugin cte sazby DPH z danovych nastaveni WooCommerce. Ujistete se, ze sazby jsou spravne nastaveny.

## Souvisejici zdroje

- [Integrace KSeF](/pro/ksef/)
- [Nahlasit problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
