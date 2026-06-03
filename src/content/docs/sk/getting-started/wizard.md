---
title: Sprievodca konfiguráciou
description: Príručka k sprievodcovi konfiguráciou pluginu Polski for WooCommerce. Údaje firmy, právne stránky, checkboxy a automatická konfigurácia obchodu krok za krokom.
---

## Čo je sprievodca konfiguráciou?

Sprievodca vás prevedie najdôležitejšími nastaveniami pluginu v niekoľkých krokoch. Namiesto manuálnej konfigurácie každého modulu odpovedáte na otázky - sprievodca nastaví všetko za vás.

Sprievodca sa objaví po prvej aktivácii pluginu. Ak ho chcete spustiť znova, prejdite do **WooCommerce > Polski > Nastavenia** a kliknite na **Spustiť sprievodcu znova**.

:::note[Sprievodca neprepisuje existujúce dáta]
Ak spúšťate sprievodcu znova, polia budú vyplnené predtým uloženými dátami. Sprievodca neodstráni ani neprepíše dáta, ktoré nezmeníte.
:::

---

## Krok 1: Údaje firmy

Zadajte údaje svojej firmy. Plugin ich používa na právnych stránkach, v päte, v údajoch GPSR a na faktúrach.

### Vyžadované polia

| Pole | Popis | Príklad |
|------|------|---------|
| Názov firmy | Úplný názov alebo firma | "Jan Kowalski Sklep Online" |
| Právna forma | Typ činnosti | JDG, sp. z o.o., sp.j., S.A. |
| NIP | Daňové identifikačné číslo | 1234567890 |
| REGON | Číslo REGON | 123456789 |
| KRS | Číslo KRS (ak sa týka) | 0000123456 |
| Adresa | Ulica, číslo, PSČ, mesto | ul. Przykładowa 10, 00-001 Warszawa |
| Kontaktný e-mail | Adresa na korešpondenciu | kontakt@mojsklep.pl |
| Telefón | Telefónne číslo | +48 123 456 789 |

### Voliteľné polia

- **Číslo bankového účtu** - na zobrazenie na faktúrach a v obchodných podmienkach
- **Registrový orgán** - napr. "Sąd Rejonowy dla m.st. Warszawy"
- **Základné imanie** - vyžadované pre spoločnosti (napr. "5 000,00 zł")
- **Meno a priezvisko zástupcu** - osoba oprávnená na zastupovanie

### Validácia NIP

Sprievodca automaticky kontroluje správnosť NIP:

- Kontroluje kontrolný súčet (váhový algoritmus)
- Voliteľne sťahuje údaje z API GUS (CEIDG/KRS) na porovnanie

Ak je NIP nesprávny, uvidíte výstražné hlásenie. Môžete pokračovať, ale odporúčame číslo opraviť.

### Príklad konfigurácie

Pre jednoosobovú podnikateľskú činnosť:

```
Názov firmy: Jan Kowalski E-Commerce
Právna forma: Jednoosobová podnikateľská činnosť
NIP: 1234567890
REGON: 123456789
KRS: (prázdne - netýka sa JDG)
Adresa: ul. Handlowa 5/10, 31-001 Kraków
E-mail: sklep@kowalski-ecommerce.pl
Telefón: +48 500 600 700
```

Pre spoločnosť s ručením obmedzeným:

```
Názov firmy: SuperSklep sp. z o.o.
Právna forma: Spoločnosť s ručením obmedzeným
NIP: 9876543210
REGON: 987654321
KRS: 0000654321
Adresa: ul. Biznesowa 22, 00-100 Warszawa
E-mail: biuro@supersklep.pl
Telefón: +48 22 123 45 67
Základné imanie: 50 000,00 zł
Registrový orgán: Sąd Rejonowy dla m.st. Warszawy, XII Wydział Gospodarczy KRS
```

Kliknite na **Ďalej**, aby ste prešli k ďalšiemu kroku.

---

## Krok 2: Právne stránky

Sprievodca vám pomôže vytvoriť vyžadované právne stránky. Každý poľský obchod by mal mať aspoň:

- **Obchodné podmienky** - pravidlá používania obchodu a uzatvárania zmlúv
- **Zásady ochrany osobných údajov** - informácie o spracúvaní osobných údajov (RODO)
- **Zásady vrátenia tovaru** - postup a formulár odstúpenia od zmluvy

### Generovanie stránok

Sprievodca ponúka dva prístupy:

**Možnosť A - vygenerujte nové stránky (odporúčané pre nové obchody)**

1. Označte stránky, ktoré chcete vygenerovať
2. Sprievodca vytvorí stránky WordPress s vyplneným obsahom na základe údajov firmy
3. Obsah vychádza zo šablón založených na poľských predpisoch

**Možnosť B - priraďte existujúce stránky**

1. Ak už máte vytvorené právne stránky, vyberte ich z rozbaľovacieho zoznamu
2. Sprievodca ich priradí k príslušným nastaveniam WooCommerce

### Šablóny právnych stránok

Generované stránky obsahujú sekcie vyžadované poľským právom. Príklad štruktúry obchodných podmienok:

```
1. Všeobecné ustanovenia
2. Definície
3. Pravidlá používania obchodu
4. Postup zadávania objednávok
5. Ceny a spôsoby platby
6. Dodanie
7. Právo na odstúpenie od zmluvy
8. Reklamácie a záruka
9. Osobné údaje
10. Záverečné ustanovenia
```

:::caution[Šablóny vyžadujú personalizáciu]
Vygenerované stránky sú východiskovým bodom, nie hotovým právnym dokumentom. Prezrite si obsah a prispôsobte ho svojmu obchodu. V prípade pochybností sa poraďte s právnikom pre e-commerce.
:::

### Shortcody na právnych stránkach

Právne stránky používajú shortcody, ktoré automaticky vkladajú údaje firmy:

```
[polski_company_name]        - názov firmy
[polski_company_nip]         - NIP
[polski_company_regon]       - REGON
[polski_company_krs]         - KRS
[polski_company_address]     - adresa firmy
[polski_company_email]       - kontaktný e-mail
[polski_company_phone]       - telefón
[polski_withdrawal_period]   - lehota na odstúpenie (predvolene 14 dní)
```

Keď zmeníte údaje firmy v nastaveniach, právne stránky sa automaticky aktualizujú.

Príklad použitia v obsahu obchodných podmienok:

```
Vlastníkom internetového obchodu je [polski_company_name],
NIP: [polski_company_nip], REGON: [polski_company_regon],
so sídlom na adrese: [polski_company_address].

Kontakt: [polski_company_email], tel. [polski_company_phone].
```

Výsledok na stránke:

```
Vlastníkom internetového obchodu je Jan Kowalski E-Commerce,
NIP: 1234567890, REGON: 123456789,
so sídlom na adrese: ul. Handlowa 5/10, 31-001 Kraków.

Kontakt: sklep@kowalski-ecommerce.pl, tel. +48 500 600 700.
```

Kliknite na **Ďalej**, aby ste prešli ku konfigurácii checkboxov.

---

## Krok 3: Checkboxy na stránke pokladne

Nakonfigurujte checkboxy na stránke pokladne (checkout). Poľské právo vyžaduje, aby zákazník akceptoval obchodné podmienky pred zadaním objednávky.

### Predvolené checkboxy

Sprievodca navrhuje sadu checkboxov zodpovedajúcu typickým požiadavkám:

**Checkbox 1 - obchodné podmienky (povinný)**

```
Obsah: Prečítal/a som a akceptujem [obchodné podmienky obchodu].
Vyžadovaný: Áno
Odkaz: /obchodne-podmienky/
Pozícia: Pred tlačidlom objednávky
```

**Checkbox 2 - zásady ochrany osobných údajov (povinný)**

```
Obsah: Oboznámil/a som sa so [zásadami ochrany osobných údajov].
Vyžadovaný: Áno
Odkaz: /zasady-ochrany-osobnych-udajov/
Pozícia: Pred tlačidlom objednávky
```

**Checkbox 3 - právo na odstúpenie (povinný)**

```
Obsah: Oboznámil/a som sa s [poučením o práve na odstúpenie od zmluvy]
         a so [vzorom formulára odstúpenia].
Vyžadovaný: Áno
Odkaz: /zasady-vratenia-tovaru/
Pozícia: Pred tlačidlom objednávky
```

**Checkbox 4 - newsletter (voliteľný)**

```
Obsah: Chcem dostávať informácie o novinkách a akciách
       na uvedenú e-mailovú adresu.
Vyžadovaný: Nie
Pozícia: Po povinných checkboxoch
```

### Úprava checkboxov

Každý checkbox môžete prispôsobiť:

- **Obsah** - text zobrazený vedľa checkboxu (podporuje HTML pre odkazy)
- **Vyžadovaný** - či je zaškrtnutie nevyhnutné na zadanie objednávky
- **Pozícia** - kde na stránke pokladne checkbox zobraziť
- **Chybové hlásenie** - text zobrazený, keď zákazník nezaškrtne vyžadovaný checkbox

### Pridávanie vlastných checkboxov

Kliknite na **Pridať checkbox**, aby ste vytvorili ďalší. Užitočné scenáre:

- Súhlas so spracúvaním údajov na marketingové účely
- Vyhlásenie o dovŕšení 18 rokov (obchody s alkoholom)
- Súhlas s telefonickým kontaktom
- Potvrdenie oboznámenia sa s kartou produktu (potravinové produkty)

### Pozície checkboxov

Dostupné pozície na stránke pokladne:

| Pozícia | Popis |
|---------|------|
| `before_order_button` | Pred tlačidlom "Objednávam s povinnosťou platby" |
| `after_order_button` | Po tlačidle objednávky |
| `after_billing_form` | Po formulári platobných údajov |
| `after_shipping_form` | Po formulári údajov dodania |
| `before_payment_methods` | Pred výberom spôsobu platby |

Kliknite na **Ďalej**, aby ste prešli k zhrnutiu.

---

## Krok 4: Aktivácia modulov

Sprievodca navrhne moduly na zapnutie na základe vašich odpovedí:

### Odporúčané moduly (automaticky označené)

- Omnibus - sledovanie histórie cien
- Tlačidlo objednávky - text v súlade so zákonom
- Právne checkboxy - nakonfigurované v predchádzajúcom kroku
- Právne stránky - vygenerované v kroku 2
- Právo na odstúpenie - formulár a poučenie
- Čas dodania - informácia na karte produktu
- GPSR - údaje o bezpečnosti produktu

### Voliteľné moduly (na manuálne označenie)

- Vyhľadávanie NIP - ak predávate firmám (B2B)
- Výživové hodnoty - ak predávate potraviny
- Alergény - ak predávate potraviny
- Zoznam želaní - ak chcete túto funkciu v obchode
- Porovnávač - ak máte produkty na porovnávanie
- DSA - ak prevádzkujete marketplace

Označte moduly, ktoré chcete zapnúť, a kliknite na **Ďalej**.

---

## Krok 5: Zhrnutie a uplatnenie

Posledný krok zobrazuje zhrnutie nastavení:

```
Údaje firmy:
  Názov: Jan Kowalski E-Commerce
  NIP: 1234567890
  Adresa: ul. Handlowa 5/10, 31-001 Kraków

Právne stránky:
  Obchodné podmienky: Bude vytvorená (nová stránka)
  Zásady ochrany osobných údajov: Bude vytvorená (nová stránka)
  Zásady vrátenia tovaru: Bude vytvorená (nová stránka)

Checkboxy: 4 (3 povinné, 1 voliteľný)

Moduly na aktiváciu: 7
  - Omnibus
  - Tlačidlo objednávky
  - Právne checkboxy
  - Právne stránky
  - Právo na odstúpenie
  - Čas dodania
  - GPSR
```

Skontrolujte zhrnutie a kliknite na **Uplatniť konfiguráciu**. Sprievodca:

1. Uloží údaje firmy v nastaveniach pluginu
2. Vytvorí právne stránky (ak bolo vybrané generovanie)
3. Priradí stránky k nastaveniam WooCommerce
4. Nakonfiguruje checkboxy na stránke pokladne
5. Aktivuje vybrané moduly

Po dokončení uvidíte potvrdzujúce hlásenie a odkaz na dashboard súladu.

---

## Po dokončení sprievodcu

### Skontrolujte stránku produktu

Otvorte ľubovoľný produkt vo svojom obchode a skontrolujte, či sa objavili nové prvky:

- Informácia o najnižšej cene (Omnibus) - viditeľná pri produktoch so zľavou
- Odhadovaný čas dodania
- Údaje GPSR (výrobca, zodpovedná osoba)

### Skontrolujte stránku pokladne

Pridajte produkt do košíka a prejdite k pokladni:

- Skontrolujte, či sa checkboxy zobrazujú správne
- Skontrolujte, či má tlačidlo text "Objednávam s povinnosťou platby"
- Skúste zadať objednávku bez zaškrtnutia checkboxov - malo by sa objaviť chybové hlásenie

### Skontrolujte právne stránky

Otvorte vygenerované stránky a skontrolujte ich obsah:

- Či sú údaje firmy správne (shortcody by mali zobrazovať aktuálne údaje)
- Či je štruktúra dokumentu kompletná
- Či interné odkazy fungujú

### Dashboard súladu

Prejdite do **WooCommerce > Polski > Súlad** - po správnej konfigurácii by väčšina indikátorov mala byť zelená. Prvky vyžadujúce dodatočnú pozornosť budú označené žltým stavom s pokynom, čo treba doplniť.

---

## Opätovné spustenie sprievodcu

Sprievodcu možno spustiť znova v ľubovoľnom okamihu:

1. Prejdite do **WooCommerce > Polski > Nastavenia**
2. Kliknite na **Spustiť sprievodcu znova**
3. Polia budú vyplnené predtým uloženými dátami
4. Zmeňte to, čo potrebujete, a kliknite na **Uplatniť konfiguráciu**

Sprievodca neodstráni právne stránky ani nezresetuje moduly nakonfigurované manuálne.

---

## Riešenie problémov

### Právne stránky neboli vytvorené

- Skontrolujte, či má vaše konto WordPress oprávnenia administrátora
- Skontrolujte, či je v **Nastavenia > Trvalé odkazy** nastavený iný formát ako "Obyčajný"
- Skúste vytvoriť stránky manuálne a priradiť ich v **WooCommerce > Nastavenia > Pokročilé > Nastavenia stránok**

### Checkboxy sa nezobrazujú na pokladni

- Uistite sa, že modul "Právne checkboxy" je aktívny v **WooCommerce > Polski > Moduly**
- Ak používate vlastnú šablónu pokladne, skontrolujte, či podporuje hooky WooCommerce
- Vymažte cache cachovacích pluginov (WP Super Cache, W3 Total Cache, LiteSpeed Cache)

### Sprievodca sa nespúšťa

- Vymažte cache prehliadača a skúste znova
- Skontrolujte konzolu prehliadača (F12) z hľadiska chýb JavaScript
- Dočasne deaktivujte iné pluginy, ktoré môžu spôsobovať konflikt

Problém nezmizne? Nahláste ho na [GitHub Issues](https://github.com/wppoland/polski/issues) s popisom a snímkou obrazovky. Môžete sa tiež opýtať na [GitHub Discussions](https://github.com/wppoland/polski/discussions).

<div class="disclaimer">Táto stránka má výlučne informatívny charakter a nepredstavuje právnu radu. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
