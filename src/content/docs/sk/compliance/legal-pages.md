---
title: Právne stránky
description: Automatické generovanie právnych stránok v Polski for WooCommerce - obchodné podmienky, zásady ochrany osobných údajov, zásady vrátenia, reklamácie, prílohy k e-mailom a informácia ODR.
---

Každý internetový obchod v Poľsku musí sprístupniť zákazníkom súbor právnych dokumentov. Polski for WooCommerce automaticky generuje štyri kľúčové právne stránky prispôsobené poľskému právu, umožňuje ich prikladanie k transakčným e-mailom a zobrazuje požadovanú informáciu o platforme ODR.

## Generované právne stránky

### 1. Obchodné podmienky

Generované obchodné podmienky obsahujú prvky vyžadované zákonom o právach spotrebiteľa:

- Identifikačné údaje predajcu (názov, adresa, NIP, REGON, KRS)
- Postup pri zadávaní objednávky
- Spôsoby platby
- Náklady a spôsoby doručenia
- Právo na odstúpenie od zmluvy (14 dní)
- Reklamačný postup
- Mimosúdne spôsoby riešenia reklamácií a uplatňovania nárokov
- Záverečné ustanovenia

### 2. Zásady ochrany osobných údajov

Generované zásady ochrany osobných údajov v súlade s GDPR obsahujú:

- Údaje správcu osobných údajov
- Účely a právne základy spracovania údajov
- Kategórie spracúvaných údajov
- Príjemcovia údajov (kuriéri, platobné brány, hosting)
- Obdobie uchovávania údajov
- Práva dotknutých osôb
- Informácia o súboroch cookies
- Informácia o profilovaní (ak sa uplatňuje)

### 3. Zásady vrátenia

Generované zásady vrátenia zahŕňajú:

- Lehotu na odstúpenie od zmluvy (14 dní)
- Vzor formulára na odstúpenie
- Postup vrátenia tovaru
- Náklady na vrátenie (kto znáša)
- Lehotu na vrátenie platby
- Výnimky z práva na odstúpenie
- Stav vráteného tovaru

### 4. Reklamačné zásady

Generované reklamačné zásady obsahujú:

- Právny základ (zákonná zodpovednosť za vady, záruka)
- Spôsoby podania reklamácie
- Lehotu na vybavenie reklamácie (14 dní)
- Oprávnenia spotrebiteľa (oprava, výmena, zníženie ceny, odstúpenie)
- Reklamačný formulár
- Kontaktné údaje na podávanie reklamácií

## Konfigurácia generátora

Prejdite do **WooCommerce > Nastavenia > Polski > Právne stránky** na generovanie alebo aktualizáciu stránok.

### Údaje predajcu

Pred generovaním stránok vyplňte firemné údaje:

| Pole | Popis | Príklad |
|------|------|---------|
| Názov firmy | Úplný názov alebo obchodné meno | Sklep XYZ Jan Kowalski |
| Adresa | Ulica, číslo | ul. Przykładowa 1/2 |
| PSČ a mesto | - | 00-001 Warszawa |
| NIP | Daňové identifikačné číslo | 1234567890 |
| REGON | - | 123456789 |
| KRS | Ak sa uplatňuje | 0000123456 |
| Kontaktný e-mail | - | kontakt@sklep.pl |
| Telefón | - | +48 123 456 789 |
| Číslo bankového účtu | Na vrátenia | PL 12 3456 7890 1234 5678 9012 3456 |

### Generovanie stránok

1. Vyplňte údaje predajcu
2. Kliknite na "Generovať právne stránky"
3. Systém vytvorí 4 stránky WordPress v stave "Koncept"
4. Prezrite obsah každej stránky
5. Publikujte stránky po overení

Stránky sa vytvárajú ako koncepty, pretože pred publikáciou sa odporúča konzultovať ich obsah s právnikom.

### Aktualizácia stránok

Keď zmeníte firemné údaje, kliknite na "Aktualizovať právne stránky". Systém aktualizuje vygenerované sekcie, pričom zachová vaše ručné úpravy v označených blokoch.

Štruktúra generovanej stránky:

```
<!-- POLSKI-AUTO-START -->
Automaticky vygenerovaný obsah - neupravujte tento blok
<!-- POLSKI-AUTO-END -->

Váš ďalší obsah - bezpečne upravujte nižšie
```

Pri aktualizácii systém prepíše len obsah medzi značkami `POLSKI-AUTO-START` a `POLSKI-AUTO-END`. Obsah pridaný mimo tieto značky je zachovaný.

## Prílohy k e-mailom

Plugin umožňuje prikladanie právnych stránok ako PDF príloh k transakčným e-mailom WooCommerce.

### Konfigurácia

V **WooCommerce > Nastavenia > Polski > Právne stránky > Prílohy e-mailov** nakonfigurujte, ktoré dokumenty prikladať k jednotlivým typom e-mailov:

| E-mail | Odporúčané prílohy |
|--------|---------------------|
| Nová objednávka (zákazník) | Obchodné podmienky, Zásady ochrany osobných údajov, Zásady vrátenia |
| Objednávka zrealizovaná | Zásady vrátenia |
| Faktúra | Obchodné podmienky |
| Dobropis | Zásady vrátenia, Reklamačné zásady |

### Formát príloh

Dokumenty sú automaticky konvertované do formátu PDF s hlavičkou obsahujúcou logo obchodu a dátum vygenerovávania. Veľkosť súboru je optimalizovaná, aby nezaťažovala poštový server.

| Možnosť | Popis | Predvolená hodnota |
|-------|------|------------------|
| Formát | Typ prílohy | PDF |
| Logo v hlavičke | Či priložiť logo obchodu | Áno |
| Veľkosť papiera | - | A4 |
| Okraj | Okraj dokumentu | 20mm |

## Informácia ODR

Nariadenie EÚ 524/2013 vyžaduje od internetových predajcov umiestnenie odkazu na platformu ODR (Online Dispute Resolution) - platformu mimosúdneho riešenia sporov.

### Automatické zobrazovanie

Plugin automaticky pridáva informáciu ODR v:

- **Pätičke obchodu** - odkaz na platformu ODR
- **Obchodných podmienkach** - sekcia o mimosúdnom riešení sporov
- **Transakčných e-mailoch** - pätička s odkazom ODR

### Obsah informácie ODR

Štandardný obsah zobrazovaný pluginom:

> Platforma ODR (Online Dispute Resolution) je dostupná na adrese: https://ec.europa.eu/consumers/odr/. Platforma slúži na riešenie sporov medzi spotrebiteľmi a podnikateľmi na úrovni EÚ.

### Konfigurácia ODR

| Možnosť | Popis | Predvolená hodnota |
|-------|------|------------------|
| Zobrazovať v pätičke | Pridať informáciu ODR do pätičky obchodu | Áno |
| Zobrazovať v e-mailoch | Pridať informáciu ODR do transakčných e-mailov | Áno |
| Text ODR | Konfigurovateľný text informácie | Predvolený obsah |
| Pozícia v pätičke | Miesto zobrazovania | Pred informáciou o autorských právach |

## Verziovanie dokumentov

Plugin automaticky zaznamenáva verzie právnych stránok:

- Každá zmena obsahu vytvára novú verziu
- Dátum poslednej aktualizácie je zobrazený na stránke
- Logy súhlasov GDPR obsahujú hash verzie dokumentu, ktorá platila v momente udelenia súhlasu
- História verzií je dostupná v **Revíziách** stránky WordPress

## Viacjazyčnosť

Generované stránky sú štandardne v poľštine. Ak používate WPML alebo Polylang, plugin generuje samostatné stránky pre každý aktívny jazyk. Preklady sú dodávané pre:

- Poľštinu (predvolená)
- Angličtinu
- Nemčinu

Pre ostatné jazyky sa generuje poľská verzia s možnosťou ručného prekladu.

## Riešenie problémov

**Stránky sa negenerujú**
Skontrolujte, či všetky povinné polia údajov predajcu sú vyplnené. Polia názov firmy, adresa, NIP a e-mail sú povinné.

**PDF prílohy sa neprikladajú k e-mailom**
Skontrolujte, či na serveri je nainštalovaná knižnica na generovanie PDF. Plugin vyžaduje PHP rozšírenie `mbstring` a `dom`. Skontrolujte logy PHP na chyby.

**Informácia ODR sa nezobrazuje v pätičke**
Skontrolujte, či téma podporuje hooky pätičky WooCommerce (`wp_footer` alebo `woocommerce_after_footer`). Niektoré témy vyžadujú ručné pridanie widgetu.

**Aktualizácia prepísala moje zmeny**
Upravujte obsah len mimo značiek `POLSKI-AUTO-START` / `POLSKI-AUTO-END`. Obsah medzi týmito značkami je prepísaný pri každej aktualizácii.

## Ďalšie kroky

- Nahlasovanie problémov: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskusie a otázky: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
