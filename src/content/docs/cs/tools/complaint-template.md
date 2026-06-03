---
title: Reklamační formulář k tisku
description: Reklamační formulář připravený k tisku - sekce prodejce se vyplní automaticky z údajů průvodce, sekce kupujícího a vady zůstávají prázdné k vyplnění.
---

Modul **Reklamační formulář** generuje dokument reklamace připravený k tisku (reklamační formulář) odpovídající struktuře vyžadované zákonem o právech spotřebitele a běžně používanému vzoru UOKiK. Sekce prodejce se předvyplní údaji z průvodce konfigurací, sekce kupujícího, produktu, popisu vady a požadovaného řešení zůstávají prázdné.

:::caution
Jde o obecnou startovní šablonu. Pomáhá splnit informační požadavky, ale nenahrazuje právní konzultaci pro obchody s netypickým oborem (např. digitální služby, potravinářské produkty, B2B).
:::

## Entry points

| Způsob použití   | Kde                                                    |
| ---------------- | ------------------------------------------------------ |
| Shortcode        | `[polski_complaint_template]` - vloží se do obsahu stránky |
| Admin preview    | **Polski > Complaint template** - náhled a stažení     |
| Stažení HTML     | Tlačítko **Download as HTML** - `text/html` s hlavičkou `Content-Disposition: attachment` |

## Sekce formuláře

Vykreslený dokument se skládá z následujících sekcí:

| Sekce                 | Zdroj                                              | Editovatelná |
| --------------------- | -------------------------------------------------- | ------------ |
| Seller                | `polski_general.company_name/address/nip/email`    | Auto         |
| Customer              | Jméno a příjmení, adresa, e-mail, telefon          | Prázdná pole |
| Order and product     | Číslo objednávky, datum nákupu, název produktu     | Prázdná pole |
| Defect                | Popis vady, datum zjištění                         | Prázdná pole |
| Requested remedy      | Zaškrtávací políčka: oprava, výměna, sleva, odstoupení | K zaškrtnutí |
| Bank account          | Číslo IBAN pro vrácení                             | Prázdné pole |
| Signature             | Datum a podpis                                     | Prázdné pole |

## Automaticky vyplňovaná sekce prodejce

Z volby `polski_general` se načítají čtyři pole:

| Klíč volby        | Pole dokumentu        |
| ----------------- | --------------------- |
| `company_name`    | Název prodejce        |
| `company_address` | Adresa                |
| `company_nip`     | NIP (s prefixem)      |
| `company_email`   | Kontaktní e-mail      |

Pokud není vyplněn žádný z těchto klíčů, sekce Seller obsahuje prázdný řádek k ručnímu doplnění, dokument je i tak strukturálně správný.

## Požadované řešení

Kupující zaškrtne jedno ze čtyř práv vyplývajících z čl. 43a-43g zákona o právech spotřebitele:

- Oprava (repair)
- Výměna (replacement)
- Sleva z ceny (price reduction) s požadovanou částkou
- Odstoupení od smlouvy (withdrawal) s vrácením celé ceny

Všechna čtyři zaškrtávací políčka jsou vykreslena jako znaky `&#9744;` (prázdný čtverec Unicode), kupující je vyplní na výtisku.

## Shortcode

```
[polski_complaint_template]
```

Vložený na stránce **Reklamace** v obchodě, zákazník může tisknout přímo díky CSS `@media print`. Shortcode nepřijímá atributy (všechny údaje pocházejí z `polski_general`).

## Stažení samostatného HTML

Administrátor může stáhnout formulář jako kompletní soubor `.html` (včetně `<!doctype>`, stylu vhodného pro tisk a meta charset). Užitečné pro zaslání e-mailem nebo umístění na server jako statický soubor.

- Název: `polski-complaint-template-<YYYYMMDD>.html`
- Content-Type: `text/html; charset=utf-8`
- Zabezpečení: nonce `polski_complaint_download`, capability `manage_woocommerce`

## Styl tisku

Vestavěné CSS v samostatném HTML:

```css
body { max-width: 780px; margin: 40px auto; line-height: 1.5; }
.field { border-bottom: 1px solid #999; padding: 6px 0; }
.row { display: flex; gap: 24px; }
@media print { body { margin: 0 } .no-print { display: none } }
```

## Zapnutí

Modul je aktivní příznakem `complaint_template` v **Polski > Moduly**. Při vypnutí se shortcode a admin stránka neregistrují.

## Omezení

- Žádný výběr jazyka formuláře (vždy pl)
- Žádná automatická integrace s objednávkami WooCommerce (kupující zadává číslo ručně)
- Žádné PDF, pouze HTML (PDF plánováno v PRO)
- Šablona nepodporuje záměnu loga obchodu
