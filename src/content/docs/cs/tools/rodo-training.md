---
title: Školicí dokumentace RODO
description: Tři HTML šablony k tisku - deník školení, shrnutí zásad RODO a playbook reakce na narušení s 72hodinovou lhůtou pro hlášení na UODO.
---

Modul **Školicí dokumentace RODO** generuje tři HTML dokumenty připravené k tisku, které jsou užitečné při zaškolování nových zaměstnanců obchodu. Všechny jsou předem opatřeny firemními údaji z průvodce konfigurací (`polski_general.company_name` + NIP).

:::caution
Jde o obecné startovní šablony. Přizpůsobte je skutečným procesům zpracování dat ve vašem obchodě, nenahrazují DPO ani právní konzultaci.
:::

## Tři dokumenty

| Klíč              | Název                          | Obsah                                                              |
| ----------------- | ------------------------------ | ------------------------------------------------------------------ |
| `logbook`         | Training logbook               | 6sloupcová tabulka (datum, zaměstnanec, role, témata, školitel, podpis), 10 prázdných řádků |
| `principles`      | RODO principles summary        | 7 zásad zpracování (čl. 5) + 8 práv subjektu údajů (kap. III) + provozní připomínky |
| `breach_playbook` | Data breach response playbook  | 8krokový checklist + tabulka deníku incidentu s odkazem na uodo.gov.pl |

## Stahování

Přejděte do **Polski > RODO training docs**. U každého ze tří dokumentů se nachází tlačítko **Download HTML**.

Stažený soubor:

- Název: `polski-rodo-<klíč>-<YYYYMMDD>.html`
- Content-Type: `text/html; charset=utf-8`
- Samostatný `<!doctype html>` s vestavěným CSS pro tisk
- Zabezpečení: nonce `polski_rodo_training_download`, capability `manage_woocommerce`

## Hlavička dokumentu

Každý stažený soubor otevírá sekce s firemními údaji:

```html
<div class="header">Sklep Polski Sp. z o.o. - NIP: 123-45-67-890</div>
<h1>Training logbook</h1>
```

Pole pocházejí z `polski_general.company_name` a `polski_general.company_nip`.

## Training logbook

Tabulka pro vedení registru školení. Jedna osoba = jeden řádek. Sloupce:

1. Date
2. Employee
3. Role
4. Topics covered
5. Trainer
6. Signature

Dokument obsahuje 10 prázdných řádků k ručnímu vyplnění. Podpis zaměstnance potvrzuje účast a porozumění obsahu.

## RODO principles summary

Jednostránkový průvodce obsahující:

**Sedm zásad zpracování (čl. 5):**
Lawfulness / fairness / transparency, purpose limitation, data minimisation, accuracy, storage limitation, integrity and confidentiality, accountability.

**Osm práv subjektu údajů (kapitola III):**
Čl. 15 přístup, čl. 16 oprava, čl. 17 výmaz, čl. 18 omezení, čl. 19 oznámení, čl. 20 přenositelnost, čl. 21 námitka, čl. 22 absence automatizovaného rozhodování.

**Provozní připomínky:**
- Nikdy neposílejte tabulky s osobními údaji e-mailem, pouze šifrované kanály
- Ověřujte totožnost žadatele před přístupem / výmazem
- Logujte každé zpřístupnění zpracovatelům nebo orgánům
- Hlaste podezření na narušení interně do 24h

## Breach response playbook

8krokový checklist vyplývající z čl. 33-34 RODO:

1. **Discovery** - zaznamenejte timestamp, osobu, která zjistila, dotčené systémy
2. **Containment** - izolujte účty/systémy do 1h
3. **Internal notification** - DPO a management do 24h
4. **Assessment** - kategorie dat, počet subjektů, pravděpodobný dopad
5. **UODO notification** - vyžadováno do 72h, pokud riziko není "méně než pravděpodobné"
6. **Subject notification** - "bez zbytečného odkladu", pokud je riziko vysoké
7. **Remediation** - patche, rotace přihlašovacích údajů, kontrola logů
8. **Post-mortem** - závěry a aktualizace školení

:::caution
72 hodin je maximum, hlášení po této lhůtě vyžaduje odůvodnění zpoždění. Kanál UODO: [uodo.gov.pl](https://uodo.gov.pl).
:::

### Tabulka deníku incidentu

Playbook obsahuje tabulku k vyplnění s 11 poli:

| Pole                           | K vyplnění                                |
| ------------------------------ | ----------------------------------------- |
| Incident ID                    | Interní identifikátor                     |
| Detected at (UTC)              | Timestamp zjištění                        |
| Detected by                    | Osoba / systém                            |
| Affected systems               | Seznam systémů                            |
| Affected data categories       | E-mail, adresa, bankovní údaje, zdravotní... |
| Approximate number of subjects | Odhad                                     |
| Likely impact                  | Krádež identity, podvod, zpřístupnění     |
| Containment actions            | Reset hesel, blokace IP, záloha           |
| UODO notified at               | Timestamp odeslání hlášení                |
| Subjects notified at           | Timestamp oznámení subjektům              |
| Status                         | Open / Under investigation / Resolved     |

## Zapnutí

Modul je aktivní přes příznak `rodo_training_docs` v **Polski > Moduly**. Vypnutí skryje admin stránku a zruší handler stahování.

## Styl tisku

Vestavěné CSS:

```css
body { max-width: 820px; margin: 40px auto; line-height: 1.55 }
h1 { font-size: 24px } h2 { font-size: 18px } h3 { font-size: 14px }
table { width: 100%; border-collapse: collapse }
th, td { border: 1px solid #999; padding: 8px; vertical-align: top }
@media print { body { margin: 0 } }
```

## Omezení

- Žádné verzování dokumentů, vygenerované HTML nemá audit trail
- Žádné PDF (pouze HTML - plánováno v PRO)
- Žádná integrace se systémem HR, deník vedete ručně
- Texty v anglickém jazyce (polský překlad přichází přes .po, pokud je zapnut)
