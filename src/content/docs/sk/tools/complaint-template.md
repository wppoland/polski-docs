---
title: Reklamacny formular na tlac
description: Reklamacny formular pripraveny na tlac - sekcia predajcu sa vyplna automaticky z udajov sprievodcu, sekcie kupujuceho a vady ostavaju prazdne na vyplnenie.
---

Modul **Reklamacny formular** generuje dokument reklamacie pripraveny na tlac (reklamacny formular) v sulade so strukturou vyzadovanou zakonom o pravach spotrebitela a bezne pouzivanym vzorom UOKiK. Sekcia predajcu sa vopred vyplna udajmi zo sprievodcu konfiguraciou, sekcie kupujuceho, produktu, popisu vady a poziadovaneho riesenia ostavaju prazdne.

:::caution
Toto je genericka uvodna sablona. Pomaha splnit informacne poziadavky, ale nenahradza pravnu konzultaciu pre obchody s netypickym odvetvim (napr. digitalne sluzby, potraviny, B2B).
:::

## Entry points

| Sposob pouzitia  | Kde                                                    |
| ---------------- | ------------------------------------------------------ |
| Shortcode        | `[polski_complaint_template]` - vlozi do obsahu stranky |
| Admin preview    | **Polski > Complaint template** - nahlad a stiahnutie   |
| Stiahnutie HTML  | Tlacidlo **Download as HTML** - `text/html` s hlavickou `Content-Disposition: attachment` |

## Sekcie formulara

Vykresleny dokument sa sklada z nasledujucich sekcii:

| Sekcia                | Zdroj                                              | Editovatelna |
| --------------------- | -------------------------------------------------- | ---------- |
| Seller                | `polski_general.company_name/address/nip/email`    | Auto       |
| Customer              | Meno a priezvisko, adresa, email, telefon          | Prazdne polia |
| Order and product     | Cislo objednavky, datum nakupu, nazov produktu     | Prazdne polia |
| Defect                | Popis vady, datum zistenia                         | Prazdne polia |
| Requested remedy      | Checkboxy: oprava, vymena, zlava, odstupenie       | Na zaznacenie |
| Bank account          | Cislo IBAN na vratenie                             | Prazdne pole |
| Signature             | Datum a podpis                                     | Prazdne pole |

## Automaticky vyplnana sekcia predajcu

Z moznosti `polski_general` sa nacitavaju styri polia:

| Kluc moznosti     | Pole dokumentu        |
| ----------------- | --------------------- |
| `company_name`    | Nazov predajcu        |
| `company_address` | Adresa                |
| `company_nip`     | NIP (s prefixom)      |
| `company_email`   | Kontaktny email       |

Ak nie je vyplneny ziadny z tychto klucov, sekcia Seller obsahuje prazdny riadok na rucne doplnenie, dokument je aj tak strukturalne spravny.

## Poziadovane riesenie

Kupujuci zaznaci jedno zo styroch opravneni vyplyvajucich z cl. 43a-43g zakona o pravach spotrebitela:

- Oprava (repair)
- Vymena (replacement)
- Znizenie ceny (price reduction) s pozadovanou sumou
- Odstupenie od zmluvy (withdrawal) s vratenim plnej ceny

Vsetky styri checkboxy sa vykresluju ako znaky `&#9744;` (prazdny Unicode stvorec), kupujuci ich vyplna na vytlacku.

## Shortcode

```
[polski_complaint_template]
```

Vlozeny na stranke **Reklamacie** v obchode, zakaznik moze tlacit priamo cez CSS `@media print`. Shortcode neprijima atributy (vsetky udaje su z `polski_general`).

## Stiahnutie standalone HTML

Administrator moze stiahnut formular ako kompletny subor `.html` (vratane `<!doctype>`, print-friendly stylu a meta charset). Uzitocne na odoslanie emailom alebo umiestnenie na server ako staticky subor.

- Nazov: `polski-complaint-template-<YYYYMMDD>.html`
- Content-Type: `text/html; charset=utf-8`
- Zabezpecenie: nonce `polski_complaint_download`, capability `manage_woocommerce`

## Styl tlace

Vstavany CSS v standalone HTML:

```css
body { max-width: 780px; margin: 40px auto; line-height: 1.5; }
.field { border-bottom: 1px solid #999; padding: 6px 0; }
.row { display: flex; gap: 24px; }
@media print { body { margin: 0 } .no-print { display: none } }
```

## Zapnutie

Modul je aktivny priznakom `complaint_template` v **Polski > Moduly**. Po vypnuti sa shortcode a admin stranka neregistruju.

## Obmedzenia

- Ziadny vyber jazyka formulara (vzdy pl)
- Ziadna automaticka integracia s objednavkami WooCommerce (kupujuci zadava cislo rucne)
- Ziadne PDF, iba HTML (PDF planovane v PRO)
- Sablona nepodporuje vymenu loga obchodu
