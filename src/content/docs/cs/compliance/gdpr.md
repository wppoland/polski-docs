---
title: GDPR - ochrana osobnich udaju
description: Konfigurace souhlasu GDPR v Polski for WooCommerce - 7 checkboxu, logovani souhlasu, API shortcode a soulad s Narizenim o ochrane osobnich udaju.
---

GDPR vyzaduje od obchodu ziskani vyrazneho souhlasu se zpracovanim osobnich udaju. Plugin pridava 7 konfigurovatelnych checkboxu na strance objednavky, logovani souhlasu a nastroje pro spravu souhlasu.

## Vyzadovane souhlasy v polskem e-commerce

Internetovy obchod by mel ziskavat souhlasy na:

1. Prijeti obchodnich podminek obchodu
2. Seznameni se zasadami ochrany osobnich udaju
3. Pravo na odstoupeni od smlouvy (potvrzeni seznameni)
4. Souhlas s dodanim digitalniho obsahu pred uplynutim lhuty pro odstoupeni
5. Oznameni o dodani (SMS/e-mail)
6. Pripominka recenze
7. Marketing (newsletter, obchodni nabidky)

## Konfigurace checkboxu

Prejdete do **WooCommerce > Nastaveni > Polski > GDPR** a nakonfigurujte souhlasy.

### 1. Obchodni podminky

Povinny checkbox odkazujici na stranku obchodnich podminek.

| Nastaveni | Popis |
|------------|------|
| Text | Konfigurovatelny, vychozi: "Seznamil/a jsem se s [obchodnimi podminkami] a prijimam jejich podminky" |
| Povinny | Ano (vzdy) |
| Stranka podminek | Vyberte ze stranek WordPress |

### 2. Zasady ochrany osobnich udaju

Povinny checkbox odkazujici na zasady ochrany osobnich udaju.

| Nastaveni | Popis |
|------------|------|
| Text | Vychozi: "Seznamil/a jsem se se [zasadami ochrany osobnich udaju]" |
| Povinny | Ano (vzdy) |
| Stranka zasad | Vyberte ze stranek WordPress |

### 3. Pravo na odstoupeni od smlouvy

Informace o seznameni s podminkami odstoupeni.

| Nastaveni | Popis |
|------------|------|
| Text | Vychozi: "Seznamil/a jsem se s podminkami [odstoupeni od smlouvy]" |
| Povinny | Ano |
| Stranka odstoupeni | Vyberte ze stranek WordPress |

### 4. Digitalni obsah

Souhlas vyzadovany pri prodeji digitalniho obsahu (napr. e-knihy, soubory ke stazeni).

| Nastaveni | Popis |
|------------|------|
| Text | Vychozi: "Souhlasim s dodanim digitalniho obsahu pred uplynutim lhuty pro odstoupeni od smlouvy a beru na vedomi ztratu prava na odstoupeni" |
| Povinny | Ano (kdyz kosik obsahuje digitalni produkty) |
| Podminka | Zobrazit pouze kdyz kosik obsahuje virtualni produkty nebo produkty ke stazeni |

### 5. Oznameni o dodani

Souhlas s odesilanim oznameni SMS/e-mail o stavu zasilky.

| Nastaveni | Popis |
|------------|------|
| Text | Vychozi: "Souhlasim s prijimanim oznameni o stavu dodani" |
| Povinny | Ne |
| Kanal | E-mail, SMS nebo oba |

### 6. Pripominka recenze

Souhlas s odesilanim e-mailu s zadosti o napsani recenze po nakupu.

| Nastaveni | Popis |
|------------|------|
| Text | Vychozi: "Souhlasim s prijimanim e-mailu s zadosti o napsani recenze na zakoupeny produkt" |
| Povinny | Ne |
| Zpozdeni | Pocet dnu po dodani (vychozi 7) |

### 7. Marketing

Souhlas s marketingovou komunikaci.

| Nastaveni | Popis |
|------------|------|
| Text | Vychozi: "Souhlasim s prijimanim obchodnich informaci elektronickou cestou" |
| Povinny | Ne |
| Rozsah | Newsletter, nabidky, akce |

## Logovani souhlasu

Kazdy souhlas se zapisuje do databaze s udaji:

| Pole | Popis |
|------|------|
| ID uzivatele | ID zakaznika WordPress (nebo 0 pro hosty) |
| ID objednavky | Cislo objednavky WooCommerce |
| Typ souhlasu | Identifikator checkboxu (napr. `terms`, `privacy`, `marketing`) |
| Hodnota | `granted` nebo `denied` |
| IP adresa | Anonymizovana IP adresa zakaznika |
| User Agent | Prohlizec a operacni system |
| Casove razitko | Datum a cas udeleni souhlasu (UTC) |
| Verze dokumentu | Hash verze podminek/zasad v okamziku udeleni souhlasu |

### Prohlizeni logu souhlasu

Logy souhlasu jsou dostupne v:

- **Objednavka WooCommerce** - zalozka "Souhlasy GDPR" v bocnim panelu objednavky
- **Profil uzivatele** - sekce "Historie souhlasu" v profilu zakaznika v administracnim panelu
- **Export** - moznost exportu logu do CSV (**WooCommerce > Nastaveni > Polski > GDPR > Exportovat logy**)

### Anonymizace IP

Plugin anonymizuje posledni oktet adresy IPv4 (napr. `192.168.1.xxx`) a posledni skupinu IPv6. To zajistuje soulad s GDPR a zachovava zakladni pouzitelnost logu.

## Shortcode API

### Zobrazeni stavu souhlasu zakaznika

```
[polski_consent_status]
```

Ukaze prihlasemu zakaznikovi seznam souhlasu s moznosti jejich odvolani (napr. marketingovy souhlas).

### Formular odvolani marketingoveho souhlasu

```
[polski_consent_withdraw type="marketing"]
```

Formular pro odvolani marketingoveho souhlasu. Po odvolani plugin automaticky aktualizuje stav souhlasu v databazi.

### Parametry shortcode

| Parametr | Popis | Dostupne hodnoty |
|----------|------|-------------------|
| `type` | Typ souhlasu | `terms`, `privacy`, `withdrawal_right`, `digital_content`, `delivery_notifications`, `review_reminder`, `marketing` |

## Integrace s WooCommerce Blocks

Checkboxy souhlasu funguji take s blokovym formularem objednavky (WooCommerce Blocks Checkout). Neni treba nic konfigurovat.

## Pravo byt zapomenut

Plugin spolupracuje s nastrojem WordPress **Nastroje > Odstranit osobni udaje**. Po schvaleni zadosti o odstraneni plugin automaticky:

1. Anonymizuje data v logach souhlasu
2. Odstrani osobni udaje z formularu odstoupeni
3. Zachova anonymizovane zaznamy pro ucely zodpovednosti

## Pravo na prenositelnost dat

Plugin spolupracuje s **Nastroje > Exportovat osobni udaje**. Export obsahuje:

- Historii udelenych souhlasu
- Data z formularu (anonymizovana)
- Komunikacni preference

## Reseni problemu

**Checkboxy se nezobrazuji na strance objednavky**
Zkontrolujte, zda je modul GDPR aktivovan v **WooCommerce > Nastaveni > Polski > Moduly**. Pri blokovem formulari objednavky potrebujete WooCommerce 8.0+.

**Zakaznik hlasi nemoznost slozit objednavku**
Zkontrolujte, zda jiny plugin (napr. Germanized, WPML) nepridava stejne checkboxy. Deaktivujte souhlasy z jinych pluginu a pouzivejte pouze modul Polski for WooCommerce.

**Logy souhlasu neukladaji IP adresu**
Zkontrolujte, zda server predava IP adresu. Za reverse proxy (napr. Cloudflare) nakonfigurujte hlavicku `X-Forwarded-For` ve WordPress.

## Dalsi kroky

- Hlaseni problemu: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskuse a otazky: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
