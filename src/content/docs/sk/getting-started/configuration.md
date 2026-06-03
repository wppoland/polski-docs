---
title: Konfigurácia pluginu
description: Prvé kroky po inštalácii pluginu Polski for WooCommerce. Zapínanie modulov, dashboard súladu, prehľad nastavení a prispôsobenie potrebám obchodu.
---

## Hlavný panel pluginu

Po aktivácii pluginu prejdite do **WooCommerce > Polski**. Uvidíte hlavný panel so sekciami:

- **Stav súladu** - rýchly prehľad, ktoré právne požiadavky sú splnené
- **Aktívne moduly** - zoznam zapnutých modulov s odkazmi na ich nastavenia
- **Vyžadované akcie** - upozornenia na chýbajúce konfigurácie
- **Rýchle odkazy** - prepojenia na najdôležitejšie nastavenia

![Dashboard modulov Polski for WooCommerce](../../../../assets/screenshots/screenshot-1-modules-dashboard.png)

:::tip[Sprievodca konfiguráciou]
Ak práve začínate, použite [sprievodcu konfiguráciou](getting-started/wizard/). Prevedie vás najdôležitejšími nastaveniami krok za krokom. Môžete ho kedykoľvek spustiť znova.
:::

---

## Zapínanie a vypínanie modulov

Plugin funguje modulárne - po inštalácii sú všetky moduly vypnuté. Zapínate len tie, ktoré potrebujete.

### Ako zapnúť modul

1. Prejdite do **WooCommerce > Polski > Moduly**
2. Nájdite v zozname modul, ktorý vás zaujíma
3. Kliknite na prepínač vedľa názvu modulu, aby ste ho zapli
4. Kliknite na **Uložiť zmeny** v dolnej časti stránky

### Ako vypnúť modul

Kliknite na prepínač pri aktívnom module, aby ste ho vypli. Vypnutie neodstráni dáta - modul môžete znova zapnúť bez straty nastavení.

### Odporúčané moduly na začiatok

Pre typický poľský obchod zapnite aspoň tieto moduly:

| Modul | Prečo je dôležitý |
|-------|-------------------|
| Omnibus | Vyžadovaný zákonom - zobrazovanie histórie cien |
| Tlačidlo objednávky | Vyžadované zákonom - "Objednávam s povinnosťou platby" |
| Právne checkboxy | Vyžadované zákonom - súhlasy pri zadávaní objednávky |
| Právne stránky | Obchodné podmienky a zásady ochrany osobných údajov |
| Právo na odstúpenie | Vyžadované zákonom - formulár a poučenie o odstúpení |
| Čas dodania | Odporúčaný - odhadovaný čas dodania na karte produktu |
| GPSR | Vyžadovaný od 13.12.2024 - údaje o bezpečnosti produktu |

---

## Dashboard súladu

Tu skontrolujete, či váš obchod spĺňa právne požiadavky. Prejdite do **WooCommerce > Polski > Súlad**.

### Indikátory stavu

Každá právna požiadavka má jeden z troch stavov:

- **V súlade** (zelený) - požiadavka splnená, konfigurácia kompletná
- **Vyžaduje pozornosť** (žltý) - modul zapnutý, ale chýba časť nastavení
- **Nesúlad** (červený) - modul vypnutý alebo konfigurácia neúplná

### Kontrolný zoznam

Dashboard zobrazuje kontrolný zoznam s krokmi na vykonanie:

```
[x] Tlačidlo objednávky - text v súlade so zákonom
[x] Omnibus - zobrazovanie histórie cien zapnuté
[ ] Obchodné podmienky - stránka obchodných podmienok nie je priradená
[ ] Zásady ochrany osobných údajov - stránka nie je priradená
[ ] GPSR - chýbajú údaje výrobcu pri 12 produktoch
```

Kliknite na ľubovoľnú položku zoznamu, aby ste prešli priamo k príslušným nastaveniam.

---

## Konfigurácia jednotlivých skupín modulov

### Právne požiadavky

Prejdite do **WooCommerce > Polski > Právny súlad**, aby ste nakonfigurovali:

**Omnibus (cenová smernica)**

1. Zapnite modul Omnibus
2. Nastavte obdobie sledovania cien (predvolene 30 dní)
3. Vyberte formát zobrazovania najnižšej ceny
4. Uložte zmeny

Plugin začne zaznamenávať históriu cien od momentu zapnutia modulu.

**GPSR (bezpečnosť produktov)**

1. Zapnite modul GPSR
2. Vyplňte údaje predvoleného výrobcu v globálnych nastaveniach
3. Pre jednotlivé produkty - upravte údaje v záložke "GPSR" na stránke úpravy produktu

**Právne stránky**

1. Zapnite modul právnych stránok
2. Použite generátor na vytvorenie obchodných podmienok, zásad ochrany osobných údajov a zásad vrátenia tovaru
3. Priraďte vygenerované stránky v **WooCommerce > Nastavenia > Pokročilé > Nastavenia stránok**

### Ceny a informácie o produkte

Prejdite do **WooCommerce > Polski > Ceny**, aby ste nakonfigurovali:

**Jednotkové ceny**

1. Zapnite modul jednotkových cien
2. Vyberte predvolenú mernú jednotku (kg, l, m, ks)
3. Na karte produktu vyplňte pole "Základné množstvo" a "Merná jednotka"

Príklad konfigurácie v editore produktu:

```
Cena produktu: 15,99 zł
Základné množstvo: 500
Merná jednotka: g
Referenčná jednotka: kg

Výsledok: 15,99 zł / 500g (31,98 zł/kg)
```

**Čas dodania**

1. Zapnite modul času dodania
2. Nastavte predvolený čas dodania (napr. "1-3 pracovné dni")
3. Voliteľne - nastavte individuálny čas pre jednotlivé produkty

### Pokladňa a objednávky

Prejdite do **WooCommerce > Polski > Pokladňa**, aby ste nakonfigurovali:

**Tlačidlo objednávky**

1. Zapnite modul
2. Predvolený text je "Objednávam s povinnosťou platby"
3. Text môžete prispôsobiť, ale musí spĺňať požiadavky čl. 17 zákona o právach spotrebiteľa

**Právne checkboxy**

1. Zapnite modul checkboxov
2. Pridajte vyžadované súhlasy (obchodné podmienky, zásady ochrany osobných údajov)
3. Nakonfigurujte obsah každého checkboxu vrátane odkazov na právne stránky
4. Označte, ktoré checkboxy sú povinné

Príklad konfigurácie checkboxu:

```
Štítok: obchodné podmienky
Obsah: Oboznámil/a som sa s [obchodnými podmienkami] a akceptujem ich ustanovenia.
Vyžadovaný: Áno
Odkaz: /obchodne-podmienky/
Pozícia: Pred tlačidlom objednávky
```

**Vyhľadávanie NIP**

1. Zapnite modul NIP
2. Pole NIP sa automaticky zobrazí na stránke pokladne
3. Po zadaní NIP a kliknutí na "Skontrolovať" sa údaje firmy automaticky vyplnia z databázy GUS

### Potravinové produkty

Moduly pre obchody s potravinami. Prejdite do **WooCommerce > Polski > Potraviny**.

1. Zapnite potrebné moduly (výživové hodnoty, alergény, Nutri-Score)
2. V úprave produktu sa zobrazia nové záložky na vyplnenie
3. Údaje sa automaticky zobrazia na stránke produktu

### Moduly obchodu

Prejdite do **WooCommerce > Polski > Obchod**, aby ste zapli ďalšie funkcie:

- Zoznam želaní, porovnávač, rýchly náhľad - zapnite a prispôsobte vzhľad
- AJAX vyhľadávač - zapnite a nakonfigurujte počet zobrazovaných výsledkov
- AJAX filtre - zapnite a vyberte atribúty na filtrovanie
- Slider a odznaky - nakonfigurujte štýl a správanie

---

## Globálne nastavenia

V záložke **WooCommerce > Polski > Nastavenia** nájdete globálne možnosti:

### Údaje firmy

Vyplňte základné údaje vašej firmy:

- Názov firmy
- NIP
- REGON
- Adresa sídla
- Kontaktná e-mailová adresa
- Telefónne číslo

Tieto údaje využívajú rôzne moduly (právne stránky, GPSR, DSA).

### Výkon

- **Načítavanie zdrojov** - CSS a JS sa načítavajú len na stránkach, kde sú potrebné
- **Cache** - plugin využíva Transients API WordPress na cachovanie dát
- **Minifikácia** - front-endové zdroje sú minifikované

### Kompatibilita

Ak šablóna alebo iný plugin spôsobuje konflikt:

1. Prejdite do **WooCommerce > Polski > Nastavenia > Kompatibilita**
2. Zapnite režim kompatibility pre problematické moduly
3. Upravte priority hookov, ak sa prvky zobrazujú v nesprávnom poradí

---

## Overenie konfigurácie

Po konfigurácii skontrolujte, či všetko funguje:

1. **Dashboard súladu** - prejdite do **WooCommerce > Polski > Súlad** a skontrolujte, či sú všetky indikátory zelené
2. **Stránka produktu** - otvorte ľubovoľný produkt v obchode a skontrolujte, či sa zobrazujú nové prvky (cena Omnibus, čas dodania, údaje GPSR)
3. **Stránka pokladne** - zadajte testovaciu objednávku a skontrolujte, či sú checkboxy a tlačidlo správne
4. **Právne stránky** - otvorte obchodné podmienky a zásady ochrany osobných údajov a skontrolujte ich obsah

Môžete tiež spustiť automatický audit: **WooCommerce > Polski > Nástroje > Audit stránky**.

---

## Ďalšie kroky

- [Sprievodca konfiguráciou](getting-started/wizard/) - automatická konfigurácia najdôležitejších nastavení
- [Dashboard súladu](tools/compliance-dashboard/) - monitorovanie stavu právnych požiadaviek
- [Audit stránky](tools/site-audit/) - automatické overenie konfigurácie

Máte otázku? Napíšte na [GitHub Discussions](https://github.com/wppoland/polski/discussions). Našli ste chybu? Nahláste ju na [GitHub Issues](https://github.com/wppoland/polski/issues).

<div class="disclaimer">Táto stránka má výlučne informatívny charakter a nepredstavuje právnu radu. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
