---
title: Skoliaca dokumentacia RODO
description: Tri HTML sablony na tlac - dennik skoleni, zhrnutie zasad RODO a playbook reakcie na porusenia s 72-hodinovym terminom nahlasenia na UODO.
---

Modul **Skoliaca dokumentacia RODO** generuje tri HTML dokumenty pripravene na tlac, ktore pomahaju pri zaskolovani novych zamestnancov obchodu. Vsetky su prebrandovane udajmi firmy zo sprievodcu konfiguraciou (`polski_general.company_name` + NIP).

:::caution
Su to genericke uvodne sablony. Prisposobte ich skutocnym procesom spracovania udajov vo vasom obchode, nenahradzaju zodpovednu osobu za ochranu udajov ani pravnu konzultaciu.
:::

## Tri dokumenty

| Kluc              | Titul                          | Obsah                                                              |
| ----------------- | ------------------------------ | ------------------------------------------------------------------ |
| `logbook`         | Training logbook               | 6-stlpcova tabulka (datum, zamestnanec, rola, temy, skolitel, podpis), 10 prazdnych riadkov |
| `principles`      | RODO principles summary        | 7 zasad spracovania (cl. 5) + 8 prav dotknutej osoby (kap. III) + operacne pripomienky |
| `breach_playbook` | Data breach response playbook  | 8-krokovy checklist + tabulka dennika incidentu s odkazom na uodo.gov.pl |

## Stahovanie

Prejdite do **Polski > RODO training docs**. Pri kazdom z troch dokumentov je tlacidlo **Download HTML**.

Stiahnuty subor:

- Nazov: `polski-rodo-<kluc>-<YYYYMMDD>.html`
- Content-Type: `text/html; charset=utf-8`
- Standalone `<!doctype html>` so vstavanym CSS na tlac
- Zabezpecenie: nonce `polski_rodo_training_download`, capability `manage_woocommerce`

## Hlavicka dokumentu

Kazdy stiahnuty subor otvara sekcia s udajmi firmy:

```html
<div class="header">Sklep Polski Sp. z o.o. - NIP: 123-45-67-890</div>
<h1>Training logbook</h1>
```

Polia pochadzaju z `polski_general.company_name` a `polski_general.company_nip`.

## Training logbook

Tabulka na vedenie registra skoleni. Jedna osoba = jeden riadok. Stlpce:

1. Date
2. Employee
3. Role
4. Topics covered
5. Trainer
6. Signature

Dokument obsahuje 10 prazdnych riadkov na rucne vyplnenie. Podpis zamestnanca potvrdzuje pritomnost a pochopenie obsahu.

## RODO principles summary

Jednostranova prirucka obsahujuca:

**Sedem zasad spracovania (cl. 5):**
Lawfulness / fairness / transparency, purpose limitation, data minimisation, accuracy, storage limitation, integrity and confidentiality, accountability.

**Osem prav dotknutej osoby (kapitola III):**
Cl. 15 pristup, cl. 16 oprava, cl. 17 vymazanie, cl. 18 obmedzenie, cl. 19 oznamenie, cl. 20 prenositelnost, cl. 21 namietka, cl. 22 ziadne automatizovane rozhodovanie.

**Operacne pripomienky:**
- Nikdy neposielajte tabulky s osobnymi udajmi emailom, iba sifrovanymi kanalmi
- Overte totoznost ziadatela pred pristupom / vymazanim
- Logujte kazde spristupnenie procesorom alebo organom
- Nahlaste podozrenie na porusenie interne do 24h

## Breach response playbook

8-krokovy checklist vyplyvajuci z cl. 33-34 RODO:

1. **Discovery** - zapiste timestamp, osobu zistujucu, dotknute systemy
2. **Containment** - izolujte ucty/systemy do 1h
3. **Internal notification** - zodpovedna osoba a manazment do 24h
4. **Assessment** - kategorie udajov, pocet subjektov, pravdepodobny impact
5. **UODO notification** - vyzadovane do 72h, ked riziko nie je "menej ako pravdepodobne"
6. **Subject notification** - "bez zbytocneho odkladu", ked je riziko vysoke
7. **Remediation** - patche, rotacia autentifikacnych udajov, kontrola logov
8. **Post-mortem** - zavery a aktualizacia skoleni

:::caution
72 hodin je maximum, nahlasenie po tomto termine vyzaduje odovodnenie omeskania. UODO kanal: [uodo.gov.pl](https://uodo.gov.pl).
:::

### Tabulka dennika incidentu

Playbook obsahuje tabulku na doplnenie s 11 poliami:

| Pole                           | Na vyplnenie                              |
| ------------------------------ | ----------------------------------------- |
| Incident ID                    | Interny identifikator                     |
| Detected at (UTC)              | Timestamp zistenia                        |
| Detected by                    | Osoba / system                            |
| Affected systems               | Zoznam systemov                           |
| Affected data categories       | Email, adresa, bankove udaje, zdravotne...|
| Approximate number of subjects | Odhad                                     |
| Likely impact                  | Kradez totoznosti, podvod, spristupnenie  |
| Containment actions            | Reset hesiel, blokovanie IP, zaloha       |
| UODO notified at               | Timestamp odoslania nahlasenia            |
| Subjects notified at           | Timestamp oznamenia subjektom             |
| Status                         | Open / Under investigation / Resolved     |

## Zapnutie

Modul je aktivny cez priznak `rodo_training_docs` v **Polski > Moduly**. Vypnutie skryva admin stranku a rusi handler stahovania.

## Styl tlace

Vstavany CSS:

```css
body { max-width: 820px; margin: 40px auto; line-height: 1.55 }
h1 { font-size: 24px } h2 { font-size: 18px } h3 { font-size: 14px }
table { width: 100%; border-collapse: collapse }
th, td { border: 1px solid #999; padding: 8px; vertical-align: top }
@media print { body { margin: 0 } }
```

## Obmedzenia

- Ziadne verzovanie dokumentov, vygenerovany HTML nema audit trail
- Ziadne PDF (iba HTML - planovane v PRO)
- Ziadna integracia s HR systemom, dennik vediete rucne
- Texty v anglickom jazyku (slovensky preklad sa zapaja cez .po ak je zapnuty)
