---
title: Právne stránky
description: Automatické generovanie právnych stránok v Polski for WooCommerce - obchodné podmienky, zásady ochrany súkromia, zásady vrátenia, reklamácie, prílohy k e-mailom a informácia ODR.
---

Každý internetový obchod v Poľsku musí mať právne dokumenty. Doplnok generuje štyri právne stránky, prikladá ich k e-mailom a zobrazuje informáciu o platforme ODR.

## Generované právne stránky

### 1. Obchodné podmienky

Obchodné podmienky obsahujú prvky vyžadované zákonom o právach spotrebiteľa:

- Identifikačné údaje predávajúceho (názov, adresa, NIP, REGON, KRS)
- Postup podania objednávky
- Spôsoby platby
- Náklady a spôsoby doručenia
- Právo na odstúpenie od zmluvy (14 dní)
- Postup reklamácie
- Mimosúdne spôsoby riešenia reklamácií a uplatňovania nárokov
- Záverečné ustanovenia

### 2. Zásady ochrany súkromia

Zásady ochrany súkromia v súlade s GDPR obsahujú:

- Údaje prevádzkovateľa osobných údajov
- Účely a právne základy spracovania údajov
- Kategórie spracúvaných údajov
- Príjemcovia údajov (kuriéri, platobné brány, hosting)
- Doba uchovávania údajov
- Práva dotknutých osôb
- Informácia o súboroch cookies
- Informácia o profilovaní (ak sa týka)

### 3. Zásady vrátenia

Zásady vrátenia zahŕňajú:

- Lehotu na odstúpenie od zmluvy (14 dní)
- Vzor formulára na odstúpenie
- Postup vrátenia tovaru
- Náklady na vrátenie (kto ich znáša)
- Lehotu na vrátenie platby
- Výnimky z práva na odstúpenie
- Stav vráteného tovaru

### 4. Zásady reklamácie

Zásady reklamácie obsahujú:

- Právny základ (zodpovednosť za vady, záruka)
- Spôsoby podania reklamácie
- Lehotu na posúdenie reklamácie (14 dní)
- Oprávnenia spotrebiteľa (oprava, výmena, zníženie ceny, odstúpenie)
- Formulár reklamácie
- Kontaktné údaje na podávanie reklamácií

## Konfigurácia generátora

Prejdite do **WooCommerce > Nastavenia > Polski > Právne stránky** na vygenerovanie alebo aktualizáciu stránok.

### Údaje predávajúceho

Najprv vyplňte údaje firmy:

| Pole | Popis | Príklad |
|------|------|---------|
| Názov firmy | Úplný názov alebo firma | Obchod XYZ Jan Kowalski |
| Adresa | Ulica, číslo | ul. Przykładowa 1/2 |
| PSČ a mesto | - | 00-001 Warszawa |
| NIP | Daňové identifikačné číslo | 1234567890 |
| REGON | - | 123456789 |
| KRS | Ak sa týka | 0000123456 |
| Kontaktný e-mail | - | kontakt@sklep.pl |
| Telefón | - | +48 123 456 789 |
| Číslo bankového účtu | Na vrátenie platieb | PL 12 3456 7890 1234 5678 9012 3456 |

### Generovanie stránok

1. Vyplňte údaje predávajúceho
2. Kliknite na "Generovať právne stránky"
3. Systém vytvorí 4 stránky WordPress v stave "Koncept"
4. Prezrite si obsah každej stránky
5. Publikujte stránky po overení

Stránky sa vytvárajú ako koncepty - prezrite si ich a poraďte sa s právnikom pred publikáciou.

### Aktualizácia stránok

Po zmene údajov firmy kliknite na "Aktualizovať právne stránky". Doplnok aktualizuje vygenerované sekcie a zachová vaše manuálne zmeny.

Štruktúra generovanej stránky:

```
<!-- POLSKI-AUTO-START -->
Automatycznie wygenerowana treść - nie edytuj tego bloku
<!-- POLSKI-AUTO-END -->

Twoja dodatkowa treść - bezpiecznie edytuj poniżej
```

Pri aktualizácii doplnok prepisuje iba obsah medzi `POLSKI-AUTO-START` a `POLSKI-AUTO-END`. Obsah mimo týchto značiek sa zachováva.

## Prílohy k e-mailom

Doplnok prikladá právne stránky ako PDF k transakčným e-mailom WooCommerce.

### Konfigurácia

V **WooCommerce > Nastavenia > Polski > Právne stránky > Prílohy e-mailov** nakonfigurujte, ktoré dokumenty prikladať k jednotlivým typom e-mailov:

| E-mail | Odporúčané prílohy |
|--------|---------------------|
| Nová objednávka (zákazník) | Obchodné podmienky, Zásady ochrany súkromia, Zásady vrátenia |
| Objednávka vybavená | Zásady vrátenia |
| Faktúra | Obchodné podmienky |
| Dobropis | Zásady vrátenia, Zásady reklamácie |

### Formát príloh

Dokumenty sa konvertujú do PDF s logom obchodu a dátumom. Veľkosť súboru je optimalizovaná.

| Možnosť | Popis | Predvolená hodnota |
|-------|------|------------------|
| Formát | Typ prílohy | PDF |
| Logo v hlavičke | Či priložiť logo obchodu | Áno |
| Veľkosť papiera | - | A4 |
| Okraj | Okraj dokumentu | 20mm |

## Informácia ODR

Nariadenie EÚ 524/2013 vyžaduje od internetových obchodov odkaz na platformu ODR (Online Dispute Resolution) na mimosúdne riešenie sporov.

### Automatické zobrazenie

Doplnok automaticky pridáva informáciu ODR v:

- **Päte obchodu** - odkaz na platformu ODR
- **Obchodných podmienkach** - sekcia o mimosúdnom riešení sporov
- **Transakčných e-mailoch** - päta s odkazom ODR

### Obsah informácie ODR

Štandardný obsah zobrazovaný doplnkom:

> Platforma ODR (Online Dispute Resolution) je dostupná na adrese: https://ec.europa.eu/consumers/odr/. Platforma slúži na riešenie sporov medzi spotrebiteľmi a podnikateľmi na úrovni EÚ.

### Konfigurácia ODR

| Možnosť | Popis | Predvolená hodnota |
|-------|------|------------------|
| Zobrazovať v päte | Pridaj informáciu ODR do päty obchodu | Áno |
| Zobrazovať v e-mailoch | Pridaj informáciu ODR do transakčných e-mailov | Áno |
| Text ODR | Konfigurovateľný text informácie | Predvolený obsah |
| Pozícia v päte | Miesto zobrazenia | Pred informáciou o autorských právach |

## Verzovanie dokumentov

Doplnok zaznamenáva verzie právnych stránok:

- Každá zmena obsahu vytvára novú verziu
- Dátum poslednej aktualizácie sa zobrazuje na stránke
- Logy súhlasov GDPR obsahujú hash verzie dokumentu z momentu udelenia súhlasu
- História verzií je dostupná v **Revíziách** stránky WordPress

## Viacjazyčnosť

Stránky sa generujú po poľsky. Pri WPML alebo Polylang doplnok vytvára samostatné stránky pre každý jazyk. Hotové preklady:

- Poľský (predvolený)
- Anglický
- Nemecký

Pre ostatné jazyky sa vytvára poľská verzia na manuálny preklad.

## Riešenie problémov

**Stránky sa negenerujú**
Skontrolujte, či ste vyplnili všetky požadované polia: názov firmy, adresa, NIP a e-mail.

**Prílohy PDF sa nepriložia k e-mailom**
Skontrolujte, či má server rozšírenia PHP `mbstring` a `dom`. Skontrolujte logy PHP kvôli chybám.

**Informácia ODR sa nezobrazuje v päte**
Skontrolujte, či téma podporuje hooky päty (`wp_footer` alebo `woocommerce_after_footer`). Niektoré témy vyžadujú pridanie widgetu manuálne.

**Aktualizácia prepísala moje zmeny**
Upravujte obsah iba mimo značiek `POLSKI-AUTO-START` / `POLSKI-AUTO-END`. Obsah medzi týmito značkami sa prepisuje pri každej aktualizácii.

## Ďalšie kroky

- Nahlasujte problémy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskusie a otázky: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Táto stránka má výlučne informačný charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
