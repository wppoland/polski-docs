---
title: Pravni stranky
description: Automaticke generovani pravnich stranek v Polski for WooCommerce - obchodni podminky, zasady ochrany osobnich udaju, zasady vraceni, reklamace, prilohy e-mailu a informace ODR.
---

Kazdy internetovy obchod v Polsku musi zpristupnit zakaznikum sadu pravnich dokumentu. Polski for WooCommerce automaticky generuje ctyri klicove pravni stranky prizpusobene polskemu pravu, umoznuje jejich prikladani k transakcnim e-mailum a zobrazuje vyzadovanou informaci o platforme ODR.

## Generovane pravni stranky

### 1. Obchodni podminky

Generovane obchodni podminky obsahuji elementy vyzadovane zakonem o pravech spotrebitele:

- Identifikacni udaje prodejce (nazev, adresa, NIP, REGON, KRS)
- Postup skladani objednavek
- Zpusoby platby
- Naklady a zpusoby doruceni
- Pravo na odstoupeni od smlouvy (14 dnu)
- Postup reklamace
- Mimosoudni zpusoby reseni reklamaci a uplatnovani naroku
- Zaverecna ustanoveni

### 2. Zasady ochrany osobnich udaju

Generovane zasady ochrany osobnich udaju v souladu s GDPR obsahuji:

- Udaje spravce osobnich udaju
- Ucely a pravni zaklady zpracovani dat
- Kategorie zpracovavanych dat
- Prijemci dat (kuryrni sluzby, platebni brany, hosting)
- Doba uchovavani dat
- Prava subjektu udaju
- Informace o cookies
- Informace o profilovani (pokud se tyka)

### 3. Zasady vraceni

Generovane zasady vraceni zahrnuji:

- Lhuta pro odstoupeni od smlouvy (14 dnu)
- Vzor formulare odstoupeni
- Postup vraceni zbozi
- Naklady na vraceni (kdo hradí)
- Lhuta pro vraceni platby
- Vyjimky z prava na odstoupeni
- Stav vraceneho zbozi

### 4. Reklamacni rad

Generovany reklamacni rad obsahuje:

- Pravni zaklad (odpovědnost za vady, zaruka)
- Zpusoby podani reklamace
- Lhuta pro vyrizeni reklamace (14 dnu)
- Prava spotrebitele (oprava, vymena, snizeni ceny, odstoupeni)
- Formular reklamace
- Kontaktni udaje pro podani reklamaci

## Konfigurace generatoru

Prejdete do **WooCommerce > Nastaveni > Polski > Pravni stranky** pro generovani nebo aktualizaci stranek.

### Udaje prodejce

Pred generovanim stranek vyplnte udaje firmy:

| Pole | Popis | Priklad |
|------|------|---------|
| Nazev firmy | Uplny nazev nebo firma | Sklep XYZ Jan Kowalski |
| Adresa | Ulice, cislo | ul. Przykładowa 1/2 |
| PSC a mesto | - | 00-001 Warszawa |
| NIP | Danove identifikacni cislo | 1234567890 |
| REGON | - | 123456789 |
| KRS | Pokud se tyka | 0000123456 |
| Kontaktni e-mail | - | kontakt@sklep.pl |
| Telefon | - | +48 123 456 789 |
| Cislo bankovniho uctu | Pro vraceni | PL 12 3456 7890 1234 5678 9012 3456 |

### Generovani stranek

1. Vyplnte udaje prodejce
2. Kliknete "Generovat pravni stranky"
3. System vytvori 4 stranky WordPress ve stavu "Koncept"
4. Projdete obsah kazde stranky
5. Publikujte stranky po overeni

Stranky jsou vytvareny jako koncepty, protoze pred publikaci je doporuceno konzultovat jejich obsah s pravnikem.

### Aktualizace stranek

Kdyz zmenite udaje firmy, kliknete "Aktualizovat pravni stranky". System aktualizuje generovane sekce se zachovanim vasich rucnich uprav v oznacenych blocich.

Struktura generovane stranky:

```
<!-- POLSKI-AUTO-START -->
Automaticky generovany obsah - needitujte tento blok
<!-- POLSKI-AUTO-END -->

Vas doplnkovy obsah - bezpecne editujte nize
```

Pri aktualizaci system prepisuje pouze obsah mezi znackami `POLSKI-AUTO-START` a `POLSKI-AUTO-END`. Obsah pridany mimo tyto znacky je zachovan.

## Prilohy e-mailu

Plugin umoznuje prikladani pravnich stranek jako prilohy PDF k transakcnim e-mailum WooCommerce.

### Konfigurace

V **WooCommerce > Nastaveni > Polski > Pravni stranky > Prilohy e-mailu** nakonfigurujte, ktere dokumenty prikladat k jednotlivym typum e-mailu:

| E-mail | Doporucene prilohy |
|--------|---------------------|
| Nova objednavka (zakaznik) | Obchodni podminky, Zasady ochrany osobnich udaju, Zasady vraceni |
| Objednavka vyrizena | Zasady vraceni |
| Faktura | Obchodni podminky |
| Dobropis | Zasady vraceni, Reklamacni rad |

### Format priloh

Dokumenty jsou automaticky konvertovany do formatu PDF s hlavickou obsahujici logo obchodu a datum generovani. Velikost souboru je optimalizovana pro zatez postovniho serveru.

| Moznost | Popis | Vychozi hodnota |
|-------|------|------------------|
| Format | Typ prilohy | PDF |
| Logo v hlavicce | Zda prilozit logo obchodu | Ano |
| Velikost papiru | - | A4 |
| Okraj | Okraj dokumentu | 20mm |

## Informace ODR

Narizeni EU 524/2013 vyzaduje od internetovych prodejcu umisteni odkazu na platformu ODR (Online Dispute Resolution) - platformu mimosoudniho reseni sporu.

### Automaticke zobrazeni

Plugin automaticky pridava informaci ODR v:

- **Paticce obchodu** - odkaz na platformu ODR
- **Obchodnich podminkach** - sekce o mimosoudnim reseni sporu
- **Transakcnich e-mailech** - paticka s odkazem ODR

### Obsah informace ODR

Standardni obsah zobrazovany pluginem:

> Platforma ODR (Online Dispute Resolution) dostępna jest pod adresem: https://ec.europa.eu/consumers/odr/. Platforma służy rozstrzyganiu sporów pomiędzy konsumentami i przedsiębiorcami na szczeblu unijnym.

### Konfigurace ODR

| Moznost | Popis | Vychozi hodnota |
|-------|------|------------------|
| Zobrazit v paticce | Pridat informaci ODR do paticky obchodu | Ano |
| Zobrazit v e-mailech | Pridat informaci ODR do transakcnich e-mailu | Ano |
| Text ODR | Konfigurovatelny text informace | Vychozi obsah |
| Pozice v paticce | Misto zobrazeni | Pred informaci o autorskych pravech |

## Verzovani dokumentu

Plugin automaticky zaznamenava verze pravnich stranek:

- Kazda zmena obsahu vytvori novou verzi
- Datum posledni aktualizace je zobrazeno na strance
- Logy souhlasu GDPR obsahuji hash verze dokumentu, ktera platila v okamziku udeleni souhlasu
- Historie verzi je dostupna v **Revizich** stranky WordPress

## Vicejazycnost

Generovane stranky jsou ve vychozim stavu v polstine. Pokud pouzivate WPML nebo Polylang, plugin generuje samostatne stranky pro kazdy aktivni jazyk. Preklady jsou dodavany pro:

- Polstinu (vychozi)
- Anglictinu
- Nemcinu

Pro ostatni jazyky je generovana polska verze s moznosti rucniho prekladu.

## Reseni problemu

**Stranky se negeneruji**
Zkontrolujte, zda vsechna vyzadovana pole udaju prodejce jsou vyplnena. Pole nazev firmy, adresa, NIP a e-mail jsou povinna.

**Prilohy PDF nejsou prikladany k e-mailum**
Zkontrolujte, zda na serveru je nainstalovana knihovna pro generovani PDF. Plugin vyzaduje rozsireni PHP `mbstring` a `dom`. Zkontrolujte logy PHP na chyby.

**Informace ODR se nezobrazuje v paticce**
Zkontrolujte, zda motiv podporuje hooky paticky WooCommerce (`wp_footer` nebo `woocommerce_after_footer`). Nektere motivy vyzaduji rucni pridani widgetu.

**Aktualizace prepsala moje zmeny**
Editujte obsah pouze mimo znacky `POLSKI-AUTO-START` / `POLSKI-AUTO-END`. Obsah mezi temito znackami je prepsan pri kazde aktualizaci.

## Dalsi kroky

- Hlaseni problemu: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskuse a otazky: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
