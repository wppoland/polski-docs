---
title: GDPR - ochrana osobných údajov
description: Konfigurácia súhlasov GDPR v Polski for WooCommerce - 7 checkboxov, logovanie súhlasov, API shortcód a súlad s nariadením o ochrane osobných údajov.
---

GDPR vyžaduje od obchodov získanie výslovného súhlasu na spracovanie osobných údajov. Plugin pridáva 7 konfigurovateľných checkboxov na stránke objednávky, logovanie súhlasov a nástroje na správu súhlasov.

## Požadované súhlasy v poľskom e-commerce

Internetový obchod by mal zbierať súhlasy na:

1. Akceptáciu obchodných podmienok
2. Oboznámenie sa so zásadami ochrany osobných údajov
3. Právo na odstúpenie od zmluvy (potvrdenie oboznámenia)
4. Súhlas na dodanie digitálneho obsahu pred uplynutím lehoty na odstúpenie
5. Oznámenia o doručení (SMS/e-mail)
6. Pripomienky na recenziu
7. Marketing (newsletter, obchodné ponuky)

## Konfigurácia checkboxov

Prejdite do **WooCommerce > Nastavenia > Polski > GDPR** a nakonfigurujte súhlasy.

### 1. Obchodné podmienky

Povinný checkbox s odkazom na stránku obchodných podmienok.

| Nastavenie | Popis |
|------------|------|
| Text | Konfigurovateľný, štandardne: "Oboznámil/a som sa s [obchodnými podmienkami] a akceptujem ich ustanovenia" |
| Povinný | Áno (vždy) |
| Stránka obchodných podmienok | Vyberte zo stránok WordPress |

### 2. Zásady ochrany osobných údajov

Povinný checkbox s odkazom na zásady ochrany osobných údajov.

| Nastavenie | Popis |
|------------|------|
| Text | Štandardne: "Oboznámil/a som sa so [zásadami ochrany osobných údajov]" |
| Povinný | Áno (vždy) |
| Stránka zásad | Vyberte zo stránok WordPress |

### 3. Právo na odstúpenie od zmluvy

Informácia o oboznámení sa s podmienkami odstúpenia.

| Nastavenie | Popis |
|------------|------|
| Text | Štandardne: "Oboznámil/a som sa s podmienkami [odstúpenia od zmluvy]" |
| Povinný | Áno |
| Stránka odstúpenia | Vyberte zo stránok WordPress |

### 4. Digitálny obsah

Súhlas vyžadovaný pri predaji digitálneho obsahu (napr. e-booky, súbory na stiahnutie).

| Nastavenie | Popis |
|------------|------|
| Text | Štandardne: "Súhlasím s dodaním digitálneho obsahu pred uplynutím lehoty na odstúpenie od zmluvy a beriem na vedomie stratu práva na odstúpenie" |
| Povinný | Áno (keď košík obsahuje digitálne produkty) |
| Podmienka | Zobrazovať len keď košík obsahuje virtuálne produkty alebo produkty na stiahnutie |

### 5. Oznámenia o doručení

Súhlas na zasielanie SMS/e-mail oznámení o stave zásielky.

| Nastavenie | Popis |
|------------|------|
| Text | Štandardne: "Súhlasím s prijímaním oznámení o stave doručenia" |
| Povinný | Nie |
| Kanál | E-mail, SMS alebo oboje |

### 6. Pripomienka na recenziu

Súhlas na zaslanie e-mailu s požiadavkou na napísanie recenzie po nákupe.

| Nastavenie | Popis |
|------------|------|
| Text | Štandardne: "Súhlasím s prijatím e-mailu s požiadavkou na napísanie recenzie na zakúpený produkt" |
| Povinný | Nie |
| Oneskorenie | Počet dní po doručení (štandardne 7) |

### 7. Marketing

Súhlas na marketingovú komunikáciu.

| Nastavenie | Popis |
|------------|------|
| Text | Štandardne: "Súhlasím s prijímaním obchodných informácií elektronickou cestou" |
| Povinný | Nie |
| Rozsah | Newsletter, ponuky, akcie |

## Logovanie súhlasov

Každý súhlas sa zapisuje do databázy s údajmi:

| Pole | Popis |
|------|------|
| ID používateľa | ID zákazníka WordPress (alebo 0 pre hostí) |
| ID objednávky | Číslo objednávky WooCommerce |
| Typ súhlasu | Identifikátor checkboxu (napr. `terms`, `privacy`, `marketing`) |
| Hodnota | `granted` alebo `denied` |
| IP adresa | Anonymizovaná IP adresa zákazníka |
| User Agent | Prehliadač a operačný systém |
| Časová značka | Dátum a čas udelenia súhlasu (UTC) |
| Verzia dokumentu | Hash verzie obchodných podmienok/zásad v momente udelenia súhlasu |

### Prezeranie logov súhlasov

Logy súhlasov sú dostupné v:

- **Objednávka WooCommerce** - záložka "Súhlasy GDPR" v bočnom paneli objednávky
- **Profil používateľa** - sekcia "História súhlasov" v profile zákazníka v administračnom paneli
- **Export** - možnosť exportu logov do CSV (**WooCommerce > Nastavenia > Polski > GDPR > Exportovať logy**)

### Anonymizácia IP

Plugin anonymizuje posledný oktet adresy IPv4 (napr. `192.168.1.xxx`) a poslednú skupinu IPv6. To zabezpečuje súlad s GDPR a zachováva základnú užitočnosť logov.

## Shortcód API

### Zobrazenie stavu súhlasov zákazníka

```
[polski_consent_status]
```

Zobrazí prihlásenému zákazníkovi zoznam súhlasov s možnosťou ich odvolania (napr. marketingový súhlas).

### Formulár odvolania marketingového súhlasu

```
[polski_consent_withdraw type="marketing"]
```

Formulár na odvolanie marketingového súhlasu. Po odvolaní plugin automaticky aktualizuje stav súhlasu v databáze.

### Parametre shortcódu

| Parameter | Popis | Dostupné hodnoty |
|----------|------|-------------------|
| `type` | Typ súhlasu | `terms`, `privacy`, `withdrawal_right`, `digital_content`, `delivery_notifications`, `review_reminder`, `marketing` |

## Integrácia s WooCommerce Blocks

Checkboxy súhlasov fungujú aj s blokovým formulárom objednávky (WooCommerce Blocks Checkout). Nie je potrebné nič konfigurovať.

## Právo byť zabudnutý

Plugin spolupracuje s nástrojom WordPress **Nástroje > Odstrániť osobné údaje**. Po schválení žiadosti o odstránenie plugin automaticky:

1. Anonymizuje údaje v logoch súhlasov
2. Odstráni osobné údaje z formulárov odstúpenia
3. Zachová anonymizované záznamy na účely zodpovednosti

## Právo na prenositeľnosť údajov

Plugin spolupracuje s **Nástroje > Exportovať osobné údaje**. Export obsahuje:

- Históriu udelených súhlasov
- Údaje z formulárov (anonymizované)
- Komunikačné preferencie

## Riešenie problémov

**Checkboxy sa nezobrazujú na stránke objednávky**
Skontrolujte, či modul GDPR je zapnutý v **WooCommerce > Nastavenia > Polski > Moduly**. Pri blokovom formulári objednávky potrebujete WooCommerce 8.0+.

**Zákazník hlási nemožnosť zadať objednávku**
Skontrolujte, či iný plugin (napr. Germanized, WPML) nepridáva rovnaké checkboxy. Vypnite súhlasy z iných pluginov a používajte len modul Polski for WooCommerce.

**Logy súhlasov neukladajú IP adresu**
Skontrolujte, či server odovzdáva IP adresu. Za reverse proxy (napr. Cloudflare) nakonfigurujte hlavičku `X-Forwarded-For` vo WordPress.

## Ďalšie kroky

- Nahlasovanie problémov: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskusie a otázky: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
