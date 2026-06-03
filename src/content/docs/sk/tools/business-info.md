---
title: Identifikacia firmy v paticke
description: Zobrazovanie udajov firmy (nazov, NIP, adresa, kontakt) v paticke obchodu cez shortcode [polski_business_info] alebo Gutenbergov blok polski/business-info.
---

Modul **Identifikacia firmy** zobrazuje udaje identifikujuce predajcu (nazov, adresa, NIP, REGON, email, telefon) ako jednotny blok v paticke obchodu, na karte produktu alebo na lubovolnom mieste sablony. Udaje sa nacitavaju z nastaveni `polski_general` vyplnenych v sprievodcovi konfiguraciou.

:::note
Cl. 12 zakona o pravach spotrebitela a cl. 206 KSH vyzaduju od podnikatela zverejnenie identifikacnych udajov na stranke obchodu. Tento modul pomaha zhromazdit ich na jednom mieste a udrziavat jednotnost na vsetkych podstrankach.
:::

## Shortcode

```
[polski_business_info]
[polski_business_info format="inline" separator=" • "]
[polski_business_info show_regon="1"]
```

## Gutenbergov blok

Nazov bloku: `polski/business-info` (kategoria Widgets, ikona `id-alt`).
Podporuje `align: wide | full`, `html: false`.

## Atributy

| Atribut     | Typ     | Predvolene | Popis                                                                      |
| ----------- | ------- | ---------- | -------------------------------------------------------------------------- |
| format      | string  | `block`    | `block` (zoznam divov) alebo `inline` (span s oddelovacom)                 |
| separator   | string  | ` | `      | Oddelovac poloziek v rezime `inline`                                       |
| show_label  | bool    | `true`     | Zobrazuje prefixy `NIP:` / `REGON:` pri cislach                            |
| show_regon  | bool    | `false`    | Pripaja REGON (predvolene skryty, kedze sa vyzaduje zriedkavejsie)         |

## Zdroj udajov

Vsetky polia sa nacitavaju z moznosti `polski_general`:

| Kluc moznosti       | Vystupne pole |
| ------------------- | ------------ |
| `company_name`      | Nazov        |
| `company_address`   | Adresa       |
| `company_nip`       | NIP          |
| `company_regon`     | REGON        |
| `company_email`     | Email (mailto + `antispambot`) |
| `company_phone`     | Telefon      |

Email sa vykresluje ako odkaz `mailto:` zabezpeceny funkciou `antispambot()` (prevadza znaky na HTML entity, co stazuje zber botmi).

## Priklady

### Paticka obchodu

```html
<div class="site-footer">
    [polski_business_info format="block" show_regon="1"]
</div>
```

Vykresli:

```html
<div class="polski-business-info polski-business-info--block">
    <div class="polski-business-info__line polski-business-info__line--name">Sklep Polski Sp. z o.o.</div>
    <div class="polski-business-info__line polski-business-info__line--address">ul. Przykladowa 1, 00-001 Warszawa</div>
    <div class="polski-business-info__line polski-business-info__line--nip">NIP: 123-45-67-890</div>
    <div class="polski-business-info__line polski-business-info__line--regon">REGON: 123456789</div>
    <div class="polski-business-info__line polski-business-info__line--email"><a href="mailto:...">...</a></div>
    <div class="polski-business-info__line polski-business-info__line--phone">+48 123 456 789</div>
</div>
```

### Inline verzia pre kontaktnu listu

```
[polski_business_info format="inline" separator=" • " show_label="0"]
```

## CSS styly

Modul pridava triedy, nevynucuje vzhlad. Stylovanie vo vlastnej sablone:

```css
.polski-business-info--block { line-height: 1.6; }
.polski-business-info__line--name { font-weight: 600; }
.polski-business-info__line--email a { color: inherit; text-decoration: underline; }
```

## Zapnutie / vypnutie

Modul je riadeny priznakom `business_info` v **Polski > Moduly**. Ak je vypnuty, shortcode a blok sa neregistruju.

## Obmedzenia

- Ziadna podpora viacerych firiem (napr. znaciek / pobociek), iba jedna sada udajov z `polski_general`
- Ak nie je vyplnene ziadne pole, shortcode vrati prazdny retazec (nevykresluje prazdne HTML)
- Dynamicky blok, nedda sa upravovat vizualne mimo zmeny atributov
