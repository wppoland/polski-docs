---
title: GDPR - ochrana osobných údajov
description: Konfigurácia súhlasov GDPR v Polski for WooCommerce - 7 checkboxov, logovanie súhlasov, shortcode API a súlad s Nariadením o ochrane osobných údajov.
---

GDPR (RODO) vyžaduje od obchodov získanie výslovného súhlasu so spracovaním osobných údajov. Doplnok pridáva 7 konfigurovateľných checkboxov na stránke objednávky, logovanie súhlasov a nástroje na správu súhlasov.

## Požadované súhlasy v poľskom e-commerce

Internetový obchod by mal zbierať súhlasy s:

1. Akceptáciou obchodných podmienok
2. Oboznámením sa so zásadami ochrany súkromia
3. Právom na odstúpenie od zmluvy (potvrdenie oboznámenia)
4. Súhlasom na dodanie digitálneho obsahu pred uplynutím lehoty na odstúpenie
5. Notifikáciami o doručení (SMS/e-mail)
6. Pripomienkami na recenziu
7. Marketingom (newsletter, obchodné ponuky)

## Konfigurácia checkboxov

Prejdite do **WooCommerce > Nastavenia > Polski > GDPR** a nakonfigurujte súhlasy.

### 1. Obchodné podmienky

Povinný checkbox odkazujúci na stránku s obchodnými podmienkami.

| Nastavenie | Popis |
|------------|------|
| Text | Konfigurovateľný, predvolene: "Oboznámil/a som sa s [obchodnými podmienkami] a akceptujem ich" |
| Povinný | Áno (vždy) |
| Stránka s podmienkami | Vyberte zo stránok WordPress |

### 2. Zásady ochrany súkromia

Povinný checkbox odkazujúci na zásady ochrany súkromia.

| Nastavenie | Popis |
|------------|------|
| Text | Predvolene: "Oboznámil/a som sa so [zásadami ochrany súkromia]" |
| Povinný | Áno (vždy) |
| Stránka so zásadami | Vyberte zo stránok WordPress |

### 3. Právo na odstúpenie od zmluvy

Informácia o oboznámení sa s podmienkami odstúpenia.

| Nastavenie | Popis |
|------------|------|
| Text | Predvolene: "Oboznámil/a som sa s podmienkami [odstúpenia od zmluvy]" |
| Povinný | Áno |
| Stránka odstúpenia | Vyberte zo stránok WordPress |

### 4. Digitálny obsah

Súhlas vyžadovaný pri predaji digitálneho obsahu (napr. e-knihy, súbory na stiahnutie).

| Nastavenie | Popis |
|------------|------|
| Text | Predvolene: "Súhlasím s dodaním digitálneho obsahu pred uplynutím lehoty na odstúpenie od zmluvy a beriem na vedomie stratu práva na odstúpenie" |
| Povinný | Áno (keď košík obsahuje digitálne produkty) |
| Podmienka | Zobrazovať iba keď košík obsahuje virtuálne produkty alebo produkty na stiahnutie |

### 5. Notifikácie o doručení

Súhlas s odosielaním SMS/e-mail notifikácií o stave zásielky.

| Nastavenie | Popis |
|------------|------|
| Text | Predvolene: "Súhlasím s prijímaním notifikácií o stave doručenia" |
| Povinný | Nie |
| Kanál | E-mail, SMS alebo oba |

### 6. Pripomienka na recenziu

Súhlas s odoslaním e-mailu so žiadosťou o vystavenie recenzie po nákupe.

| Nastavenie | Popis |
|------------|------|
| Text | Predvolene: "Súhlasím s prijatím e-mailu so žiadosťou o vystavenie hodnotenia zakúpeného produktu" |
| Povinný | Nie |
| Oneskorenie | Počet dní po doručení (predvolene 7) |

### 7. Marketing

Súhlas s marketingovou komunikáciou.

| Nastavenie | Popis |
|------------|------|
| Text | Predvolene: "Súhlasím s prijímaním obchodných informácií elektronickou cestou" |
| Povinný | Nie |
| Rozsah | Newsletter, ponuky, akcie |

## Logovanie súhlasov

Každý súhlas sa ukladá do databázy s údajmi:

| Pole | Popis |
|------|------|
| ID používateľa | ID zákazníka WordPress (alebo 0 pre hostí) |
| ID objednávky | Číslo objednávky WooCommerce |
| Typ súhlasu | Identifikátor checkboxu (napr. `terms`, `privacy`, `marketing`) |
| Hodnota | `granted` alebo `denied` |
| IP adresa | Anonymizovaná IP adresa zákazníka |
| User Agent | Prehliadač a operačný systém |
| Časová značka | Dátum a čas udelenia súhlasu (UTC) |
| Verzia dokumentu | Hash verzie podmienok/zásad v momente udelenia súhlasu |

### Prehliadanie logov súhlasov

Logy súhlasov sú dostupné v:

- **Objednávka WooCommerce** - záložka "Súhlasy GDPR" v bočnom paneli objednávky
- **Profil používateľa** - sekcia "História súhlasov" v profile zákazníka v administračnom paneli
- **Export** - možnosť exportu logov do CSV (**WooCommerce > Nastavenia > Polski > GDPR > Exportovať logy**)

### Anonymizácia IP

Doplnok anonymizuje posledný oktet IPv4 adresy (napr. `192.168.1.xxx`) a poslednú skupinu IPv6. To zabezpečuje súlad s GDPR a zachováva základnú použiteľnosť logov.

## Shortcode API

### Zobrazenie stavu súhlasov zákazníka

```
[polski_consent_status]
```

Zobrazuje prihlásenému zákazníkovi zoznam súhlasov s možnosťou ich odvolania (napr. marketingový súhlas).

### Formulár na odvolanie marketingového súhlasu

```
[polski_consent_withdraw type="marketing"]
```

Formulár na odvolanie marketingového súhlasu. Po odvolaní doplnok automaticky aktualizuje stav súhlasu v databáze.

### Parametre shortcode

| Parameter | Popis | Dostupné hodnoty |
|----------|------|-------------------|
| `type` | Typ súhlasu | `terms`, `privacy`, `withdrawal_right`, `digital_content`, `delivery_notifications`, `review_reminder`, `marketing` |

## Integrácia s WooCommerce Blocks

Checkboxy súhlasov fungujú aj s blokovým formulárom objednávky (WooCommerce Blocks Checkout). Nie je potrebné nič konfigurovať.

## Právo na zabudnutie

Doplnok spolupracuje s nástrojom WordPress **Nástroje > Odstrániť osobné údaje**. Po schválení žiadosti o odstránenie doplnok automaticky:

1. Anonymizuje údaje v logoch súhlasov
2. Odstráni osobné údaje z formulárov odstúpenia
3. Zachová anonymizované záznamy na účely preukázateľnosti

## Právo na prenosnosť údajov

Doplnok spolupracuje s **Nástroje > Exportovať osobné údaje**. Export obsahuje:

- Históriu udelených súhlasov
- Údaje z formulárov (anonymizované)
- Komunikačné preferencie

## Riešenie problémov

**Checkboxy sa nezobrazujú na stránke objednávky**
Skontrolujte, či je modul GDPR zapnutý v **WooCommerce > Nastavenia > Polski > Moduly**. Pri blokovom formulári objednávky potrebujete WooCommerce 8.0+.

**Zákazník hlási, že nemôže odoslať objednávku**
Skontrolujte, či iný doplnok (napr. Germanized, WPML) nepridáva tie isté checkboxy. Vypnite súhlasy z iných doplnkov a používajte iba modul Polski for WooCommerce.

**Logy súhlasov neukladajú IP adresu**
Skontrolujte, či server odovzdáva IP adresu. Za reverzným proxy (napr. Cloudflare) nakonfigurujte hlavičku `X-Forwarded-For` vo WordPress.

## Ďalšie kroky

- Nahlasujte problémy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskusie a otázky: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Táto stránka má výlučne informačný charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
