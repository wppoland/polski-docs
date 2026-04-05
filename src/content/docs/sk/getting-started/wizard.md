---
title: Sprievodca konfiguráciou
description: Sprievodca konfiguráciou pluginu Polski for WooCommerce. Firemné údaje, právne stránky, checkboxy a automatická konfigurácia obchodu krok za krokom.
---

## Čo je sprievodca konfiguráciou?

Sprievodca konfiguráciou je nástroj, ktorý vás prevedie najdôležitejšími nastaveniami pluginu v niekoľkých jednoduchých krokoch. Namiesto ručnej konfigurácie každého modulu sprievodca kladie otázky a automaticky nastavuje príslušné možnosti.

Sprievodca je dostupný po prvej aktivácii pluginu. Môžete ho tiež spustiť znova kedykoľvek - prejdite do **WooCommerce > Polski > Nastavenia** a kliknite na tlačidlo **Spustiť sprievodcu znova**.

:::note[Sprievodca neprepíše existujúce údaje]
Ak spustíte sprievodcu znova, polia budú vyplnené skôr uloženými údajmi. Sprievodca neodstráni ani neprepíše údaje, ktoré nezmeníte.
:::

---

## Krok 1: Firemné údaje

Prvým krokom je doplnenie základných údajov vašej firmy. Tieto údaje sa využívajú na mnohých miestach - na právnych stránkach, v pätičke, v údajoch GPSR a na faktúrach.

### Povinné polia

| Pole | Popis | Príklad |
|------|------|---------|
| Názov firmy | Úplný názov alebo obchodné meno | "Jan Kowalski Sklep Online" |
| Právna forma | Typ podnikania | JDG, sp. z o.o., sp.j., S.A. |
| NIP | Daňové identifikačné číslo | 1234567890 |
| REGON | Číslo REGON | 123456789 |
| KRS | Číslo KRS (ak sa uplatňuje) | 0000123456 |
| Adresa | Ulica, číslo, PSČ, mesto | ul. Przykładowa 10, 00-001 Warszawa |
| Kontaktný e-mail | Adresa na korešpondenciu | kontakt@mojsklep.pl |
| Telefón | Telefónne číslo | +48 123 456 789 |

### Voliteľné polia

- **Číslo bankového účtu** - na zobrazenie na faktúrach a v obchodných podmienkach
- **Registračný orgán** - napr. "Sąd Rejonowy dla m.st. Warszawy"
- **Základné imanie** - vyžadované pre obchodné spoločnosti (napr. "5 000,00 PLN")
- **Meno a priezvisko zástupcu** - osoba oprávnená na zastupovanie

### Validácia NIP

Sprievodca automaticky overuje správnosť čísla NIP:

- Kontroluje kontrolný súčet (váhový algoritmus)
- Voliteľne sťahuje údaje z API GUS (CEIDG/KRS) na porovnanie

Ak je NIP nesprávny, uvidíte varovné hlásenie. Môžete pokračovať, ale odporúčame opraviť číslo.

### Príklad konfigurácie

Pre živnosť:

```
Názov firmy: Jan Kowalski E-Commerce
Právna forma: Jednoosobowa działalność gospodarcza
NIP: 1234567890
REGON: 123456789
KRS: (prázdne - netýka sa živnosti)
Adresa: ul. Handlowa 5/10, 31-001 Kraków
E-mail: sklep@kowalski-ecommerce.pl
Telefón: +48 500 600 700
```

Pre spoločnosť s ručením obmedzeným:

```
Názov firmy: SuperSklep sp. z o.o.
Právna forma: Spółka z ograniczoną odpowiedzialnością
NIP: 9876543210
REGON: 987654321
KRS: 0000654321
Adresa: ul. Biznesowa 22, 00-100 Warszawa
E-mail: biuro@supersklep.pl
Telefón: +48 22 123 45 67
Základné imanie: 50 000,00 PLN
Registračný orgán: Sąd Rejonowy dla m.st. Warszawy, XII Wydział Gospodarczy KRS
```

Kliknite na **Ďalej** pre prechod na ďalší krok.

---

## Krok 2: Právne stránky

V tomto kroku vám sprievodca pomôže vytvoriť právne vyžadované stránky. Každý poľský internetový obchod by mal mať minimálne:

- **Obchodné podmienky** - pravidlá používania obchodu a uzatvárania zmlúv
- **Zásady ochrany osobných údajov** - informácie o spracovaní osobných údajov (GDPR)
- **Zásady vrátenia** - postup a formulár na odstúpenie od zmluvy

### Generovanie stránok

Sprievodca ponúka dva prístupy:

**Možnosť A - vygenerovať nové stránky (odporúčané pre nové obchody)**

1. Zaškrtnite stránky, ktoré chcete vygenerovať
2. Sprievodca vytvorí stránky WordPress s vyplneným obsahom na základe firemných údajov
3. Obsah vychádza zo šablón v súlade s poľským právom

**Možnosť B - priradiť existujúce stránky**

1. Ak už máte vytvorené právne stránky, vyberte ich z rozbaľovacieho zoznamu
2. Sprievodca ich priradí k príslušným nastaveniam WooCommerce

### Šablóny právnych stránok

Generované stránky obsahujú sekcie vyžadované poľským právom. Príkladná štruktúra obchodných podmienok:

```
1. Všeobecné ustanovenia
2. Definície
3. Pravidlá používania obchodu
4. Postup pri zadávaní objednávok
5. Ceny a spôsoby platby
6. Doručenie
7. Právo na odstúpenie od zmluvy
8. Reklamácie a záruka
9. Osobné údaje
10. Záverečné ustanovenia
```

:::caution[Šablóny vyžadujú personalizáciu]
Vygenerované stránky sú východiskový bod, nie hotový právny dokument. Prezrite obsah a prispôsobte ho špecifikám vášho obchodu. V prípade pochybností konzultujte obsah s právnikom špecializujúcim sa na e-commerce.
:::

### Shortcódy na právnych stránkach

Na vygenerovaných stránkach sa využívajú shortcódy, ktoré automaticky vkladajú firemné údaje:

```
[polski_company_name]        - názov firmy
[polski_company_nip]         - NIP
[polski_company_regon]       - REGON
[polski_company_krs]         - KRS
[polski_company_address]     - adresa firmy
[polski_company_email]       - kontaktný e-mail
[polski_company_phone]       - telefón
[polski_withdrawal_period]   - lehota na odstúpenie (štandardne 14 dní)
```

Vďaka shortcódom, keď zmeníte firemné údaje v nastaveniach pluginu, právne stránky sa automaticky aktualizujú.

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

Kliknite na **Ďalej** pre prechod na konfiguráciu checkboxov.

---

## Krok 3: Checkboxy na stránke pokladne

V tomto kroku nakonfigurujete povinné checkboxy zobrazované na stránke pokladne (checkout). Poľské právo vyžaduje, aby zákazník vyjadril súhlas s obchodnými podmienkami pred zadaním objednávky.

### Predvolené checkboxy

Sprievodca navrhuje sadu checkboxov zodpovedajúcich typickým požiadavkám:

**Checkbox 1 - obchodné podmienky (povinný)**

```
Obsah: Prečítal/a som a akceptujem [obchodné podmienky].
Povinný: Áno
Odkaz: /obchodne-podmienky/
Pozícia: Pred tlačidlom objednávky
```

**Checkbox 2 - zásady ochrany osobných údajov (povinný)**

```
Obsah: Oboznámil/a som sa so [zásadami ochrany osobných údajov].
Povinný: Áno
Odkaz: /zasady-ochrany-osobnych-udajov/
Pozícia: Pred tlačidlom objednávky
```

**Checkbox 3 - právo na odstúpenie (povinný)**

```
Obsah: Oboznámil/a som sa s [poučením o práve na odstúpenie od zmluvy]
         a [vzorom formulára na odstúpenie].
Povinný: Áno
Odkaz: /zasady-vratenia/
Pozícia: Pred tlačidlom objednávky
```

**Checkbox 4 - newsletter (voliteľný)**

```
Obsah: Chcem dostávať informácie o novinkách a akciách
       na uvedenú e-mailovú adresu.
Povinný: Nie
Pozícia: Za povinnými checkboxmi
```

### Úprava checkboxov

Každý checkbox môžete prispôsobiť:

- **Obsah** - text zobrazený vedľa checkboxu (podporuje HTML pre odkazy)
- **Povinný** - či zaškrtnutie je nevyhnutné pre zadanie objednávky
- **Pozícia** - kde na stránke pokladne zobraziť checkbox
- **Chybové hlásenie** - text zobrazený, keď zákazník nezaškrtne povinný checkbox

### Pridávanie vlastných checkboxov

Kliknite na **Pridať checkbox** pre vytvorenie ďalšieho. Užitočné scenáre:

- Súhlas so spracovaním údajov na marketingové účely
- Prehlásenie o dovŕšení 18 rokov (obchody s alkoholom)
- Súhlas s telefonickým kontaktom
- Potvrdenie oboznámenia sa s kartou produktu (potravinárske produkty)

### Pozície checkboxov

Dostupné pozície na stránke pokladne:

| Pozícia | Popis |
|---------|------|
| `before_order_button` | Pred tlačidlom "Objednávam s povinnosťou platby" |
| `after_order_button` | Za tlačidlom objednávky |
| `after_billing_form` | Za formulárom fakturačných údajov |
| `after_shipping_form` | Za formulárom dodacích údajov |
| `before_payment_methods` | Pred výberom platobnej metódy |

Kliknite na **Ďalej** pre prechod na zhrnutie.

---

## Krok 4: Aktivácia modulov

Na základe vašich odpovedí sprievodca navrhne zoznam modulov na aktiváciu:

### Odporúčané moduly (automaticky zaškrtnuté)

- Omnibus - sledovanie histórie cien
- Tlačidlo objednávky - text v súlade s právom
- Právne checkboxy - nakonfigurované v predchádzajúcom kroku
- Právne stránky - vygenerované v kroku 2
- Právo na odstúpenie - formulár a poučenie
- Dodacia lehota - informácia na karte produktu
- GPSR - údaje o bezpečnosti produktu

### Voliteľné moduly (na ručné zaškrtnutie)

- Vyhľadávanie NIP - ak predávate firmám (B2B)
- Výživové hodnoty - ak predávate potraviny
- Alergény - ak predávate potraviny
- Zoznam prianí - ak chcete túto funkciu v obchode
- Porovnávač - ak máte produkty na porovnávanie
- DSA - ak prevádzkujete marketplace

Zaškrtnite moduly, ktoré chcete zapnúť, a kliknite na **Ďalej**.

---

## Krok 5: Zhrnutie a aplikovanie

Posledný krok zobrazuje zhrnutie všetkých nastavení:

```
Firemné údaje:
  Názov: Jan Kowalski E-Commerce
  NIP: 1234567890
  Adresa: ul. Handlowa 5/10, 31-001 Kraków

Právne stránky:
  Obchodné podmienky: Budú vytvorené (nová stránka)
  Zásady ochrany osobných údajov: Budú vytvorené (nová stránka)
  Zásady vrátenia: Budú vytvorené (nová stránka)

Checkboxy: 4 (3 povinné, 1 voliteľný)

Moduly na aktiváciu: 7
  - Omnibus
  - Tlačidlo objednávky
  - Právne checkboxy
  - Právne stránky
  - Právo na odstúpenie
  - Dodacia lehota
  - GPSR
```

Skontrolujte zhrnutie a kliknite na **Aplikovať konfiguráciu**. Sprievodca:

1. Uloží firemné údaje v nastaveniach pluginu
2. Vytvorí právne stránky (ak bolo zvolené generovanie)
3. Priradí stránky k nastaveniam WooCommerce
4. Nakonfiguruje checkboxy na stránke pokladne
5. Aktivuje zvolené moduly

Po dokončení uvidíte potvrdzujúce hlásenie a odkaz na dashboard súladu.

---

## Po dokončení sprievodcu

### Skontrolujte stránku produktu

Otvorte ľubovoľný produkt vo vašom obchode a skontrolujte, či sa zobrazili nové prvky:

- Informácia o najnižšej cene (Omnibus) - viditeľná pri produktoch so zľavou
- Odhadovaná dodacia lehota
- Údaje GPSR (výrobca, zodpovedná osoba)

### Skontrolujte stránku pokladne

Pridajte produkt do košíka a prejdite na pokladňu:

- Skontrolujte, či sa checkboxy zobrazujú správne
- Skontrolujte, či tlačidlo má text "Zamawiam z obowiązkiem zapłaty"
- Skúste zadať objednávku bez zaškrtnutia checkboxov - malo by sa zobraziť chybové hlásenie

### Skontrolujte právne stránky

Otvorte vygenerované stránky a skontrolujte ich obsah:

- Či firemné údaje sú správne (shortcódy by mali zobrazovať aktuálne údaje)
- Či štruktúra dokumentu je kompletná
- Či interné odkazy fungujú

### Dashboard súladu

Prejdite do **WooCommerce > Polski > Súlad** - po správnej konfigurácii by väčšina ukazovateľov mala byť zelená. Prvky vyžadujúce ďalšiu pozornosť budú označené žltým stavom s návodom, čo je treba doplniť.

---

## Opätovné spustenie sprievodcu

Sprievodcu je možné spustiť znova kedykoľvek:

1. Prejdite do **WooCommerce > Polski > Nastavenia**
2. Kliknite na **Spustiť sprievodcu znova**
3. Polia budú vyplnené skôr uloženými údajmi
4. Zmeňte to, čo potrebujete, a kliknite na **Aplikovať konfiguráciu**

Sprievodca neodstráni právne stránky ani neresetuje moduly, ktoré ste už nakonfigurovali ručne.

---

## Riešenie problémov

### Právne stránky neboli vytvorené

- Skontrolujte, či váš účet WordPress má oprávnenia administrátora
- Skontrolujte, či v **Nastavenia > Trvalé odkazy** je nastavený formát iný ako "Jednoduché"
- Skúste vytvoriť stránky ručne a priradiť ich v **WooCommerce > Nastavenia > Rozšírené > Nastavenia stránky**

### Checkboxy sa nezobrazujú na pokladni

- Uistite sa, že modul "Právne checkboxy" je aktívny v **WooCommerce > Polski > Moduly**
- Ak používate neštandardnú šablónu pokladne, skontrolujte či podporuje hooky WooCommerce
- Vymažte cache cachovacích pluginov (WP Super Cache, W3 Total Cache, LiteSpeed Cache)

### Sprievodca sa nespúšťa

- Vymažte cache prehliadača a skúste znova
- Skontrolujte konzolu prehliadača (F12) na chyby JavaScript
- Dočasne deaktivujte ďalšie pluginy, ktoré môžu spôsobovať konflikty

Ak problém pretrváva, nahláste ho na [GitHub Issues](https://github.com/wppoland/polski/issues) s popisom problému a snímkou obrazovky. Komunita rada pomôže na [GitHub Discussions](https://github.com/wppoland/polski/discussions).

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
