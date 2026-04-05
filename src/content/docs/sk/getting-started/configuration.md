---
title: Konfigurácia pluginu
description: Prvé kroky po inštalácii pluginu Polski for WooCommerce. Aktivácia modulov, dashboard súladu, prehľad nastavení a prispôsobenie pre potreby obchodu.
---

## Hlavný panel pluginu

Po inštalácii a aktivácii pluginu prejdite do **WooCommerce > Polski** v menu administračného panelu. Uvidíte hlavný panel (dashboard) rozdelený na niekoľko sekcií:

- **Stav súladu** - rýchly prehľad, ktoré právne požiadavky sú splnené
- **Aktívne moduly** - zoznam zapnutých modulov s odkazmi na ich nastavenia
- **Vyžadované akcie** - oznámenia o chýbajúcich konfiguráciách
- **Rýchle odkazy** - odkazy na najdôležitejšie nastavenia

:::tip[Sprievodca konfiguráciou]
Ak práve začínate, odporúčame využiť [sprievodcu konfiguráciou](/sk/getting-started/wizard/), ktorý vás prevedie najdôležitejšími nastaveniami krok za krokom. Sprievodcu je možné spustiť znova kedykoľvek z dashboardu.
:::

---

## Zapínanie a vypínanie modulov

Plugin funguje modulárne - štandardne po inštalácii nie je žiadny modul aktívny. Vďaka tomu plugin neovplyvňuje výkon obchodu, kým nezapnete konkrétne funkcie.

### Ako zapnúť modul

1. Prejdite do **WooCommerce > Polski > Moduly**
2. Nájdite požadovaný modul v zozname
3. Kliknite na prepínač vedľa názvu modulu pre jeho zapnutie
4. Kliknite na **Uložiť zmeny** v spodnej časti stránky

### Ako vypnúť modul

Postup je rovnaký - kliknite na prepínač pri aktívnom module pre jeho vypnutie. Vypnutie modulu neodstraňuje uložené údaje, takže ho môžete znova zapnúť bez straty konfigurácie.

### Odporúčané moduly na začiatok

Pre typický poľský internetový obchod odporúčame aktivovať nasledujúce moduly ako minimum:

| Modul | Prečo je dôležitý |
|-------|-------------------|
| Omnibus | Právne vyžadovaný - zobrazovanie histórie cien |
| Tlačidlo objednávky | Právne vyžadované - "Objednávam s povinnosťou platby" |
| Právne checkboxy | Právne vyžadované - súhlasy pri zadávaní objednávky |
| Právne stránky | Obchodné podmienky a zásady ochrany osobných údajov |
| Právo na odstúpenie | Právne vyžadované - formulár a poučenie o odstúpení |
| Dodacia lehota | Odporúčaný - odhadovaný čas doručenia na karte produktu |
| GPSR | Vyžadovaný od 13.12.2024 - údaje o bezpečnosti produktu |

---

## Dashboard súladu

Dashboard súladu je centrálne miesto, kde skontrolujete právny stav vášho obchodu. Prejdite do **WooCommerce > Polski > Súlad**, aby ste videli:

### Ukazovatele stavu

Každá právna požiadavka má jeden z troch stavov:

- **V súlade** (zelený) - požiadavka je splnená, konfigurácia je kompletná
- **Vyžaduje pozornosť** (žltý) - modul je zapnutý, ale chýba časť konfigurácie
- **Nesúladný** (červený) - modul je vypnutý alebo konfigurácia je nekompletná

### Kontrolný zoznam

Dashboard zobrazuje kontrolný zoznam s konkrétnymi krokmi na vykonanie:

```
[x] Tlačidlo objednávky - text v súlade s právom
[x] Omnibus - zobrazovanie histórie cien zapnuté
[ ] Obchodné podmienky - stránka obchodných podmienok nie je priradená
[ ] Zásady ochrany osobných údajov - stránka nie je priradená
[ ] GPSR - chýbajú údaje výrobcu na 12 produktoch
```

Kliknutím na ľubovoľnú položku zoznamu prejdete priamo k príslušným nastaveniam.

---

## Konfigurácia jednotlivých skupín modulov

### Právny súlad

Prejdite do **WooCommerce > Polski > Právny súlad** na konfiguráciu:

**Omnibus (cenová smernica)**

1. Zapnite modul Omnibus
2. Nastavte obdobie sledovania cien (štandardne 30 dní)
3. Vyberte formát zobrazovania najnižšej ceny
4. Uložte zmeny

Plugin automaticky začne zaznamenávať históriu cien od momentu aktivácie modulu.

**GPSR (bezpečnosť produktov)**

1. Zapnite modul GPSR
2. Doplňte údaje predvoleného výrobcu v globálnych nastaveniach
3. Pre jednotlivé produkty - upravte údaje v záložke "GPSR" na stránke úpravy produktu

**Právne stránky**

1. Zapnite modul právnych stránok
2. Použite generátor na vytvorenie obchodných podmienok, zásad ochrany osobných údajov a zásad vrátenia
3. Priraďte vygenerované stránky v **WooCommerce > Nastavenia > Rozšírené > Nastavenia stránky**

### Ceny a informácie o produkte

Prejdite do **WooCommerce > Polski > Ceny** na konfiguráciu:

**Jednotkové ceny**

1. Zapnite modul jednotkových cien
2. Vyberte predvolenú mernú jednotku (kg, l, m, ks)
3. Na karte produktu doplňte pole "Základné množstvo" a "Merná jednotka"

Príklad konfigurácie v editore produktu:

```
Cena produktu: 15,99 PLN
Základné množstvo: 500
Merná jednotka: g
Referenčná jednotka: kg

Výsledok: 15,99 PLN / 500g (31,98 PLN/kg)
```

**Dodacia lehota**

1. Zapnite modul dodacej lehoty
2. Nastavte predvolenú dodaciu lehotu (napr. "1-3 pracovné dni")
3. Voliteľne - nastavte individuálny čas pre jednotlivé produkty

### Pokladňa a objednávky

Prejdite do **WooCommerce > Polski > Pokladňa** na konfiguráciu:

**Tlačidlo objednávky**

1. Zapnite modul
2. Predvolený text je "Zamawiam z obowiązkiem zapłaty"
3. Môžete prispôsobiť text, ale musí spĺňať požiadavky čl. 17 zákona o právach spotrebiteľa

**Právne checkboxy**

1. Zapnite modul checkboxov
2. Pridajte vyžadované súhlasy (obchodné podmienky, zásady ochrany osobných údajov)
3. Nakonfigurujte obsah každého checkboxu vrátane odkazov na právne stránky
4. Označte, ktoré checkboxy sú povinné

Príklad konfigurácie checkboxu:

```
Štítok: obchodné podmienky
Obsah: Oboznámil/a som sa s [obchodnými podmienkami] a akceptujem ich ustanovenia.
Povinný: Áno
Odkaz: /obchodne-podmienky/
Pozícia: Pred tlačidlom objednávky
```

**Vyhľadávanie NIP**

1. Zapnite modul NIP
2. Pole NIP sa automaticky zobrazí na stránke pokladne
3. Po zadaní NIP a kliknutí na "Skontrolovať" sa firemné údaje automaticky doplnia z databázy GUS

### Potravinárske produkty

Tieto moduly sú určené pre obchody predávajúce potraviny. Prejdite do **WooCommerce > Polski > Potraviny**.

1. Zapnite potrebné moduly (výživové hodnoty, alergény, Nutri-Score)
2. Na stránke úpravy produktu sa zobrazia nové záložky na doplnenie údajov
3. Údaje sa automaticky zobrazia na karte produktu v obchode

### Obchodné moduly

Prejdite do **WooCommerce > Polski > Obchod** na aktiváciu ďalších funkcií:

- Zoznam prianí, porovnávač, rýchly náhľad - zapnite a prispôsobte vzhľad
- AJAX vyhľadávanie - zapnite a nakonfigurujte počet zobrazovaných výsledkov
- AJAX filtre - zapnite a vyberte atribúty na filtrovanie
- Slider a odznaky - nakonfigurujte štýl a správanie

---

## Globálne nastavenia

V záložke **WooCommerce > Polski > Nastavenia** nájdete globálne možnosti:

### Firemné údaje

Doplňte základné údaje vašej firmy:

- Názov firmy
- NIP (IČ DPH)
- REGON
- Adresa sídla
- Kontaktná e-mailová adresa
- Telefónne číslo

Tieto údaje sa využívajú rôznymi modulmi (právne stránky, GPSR, DSA).

### Výkon

- **Načítanie zdrojov** - CSS a JS načítané len na stránkach, kde sú potrebné
- **Cache** - plugin využíva Transients API WordPress na cachovanie údajov
- **Minifikácia** - front-endové zdroje sú minifikované

### Kompatibilita

Ak používate neštandardnú tému alebo pluginy, ktoré spôsobujú konflikty:

1. Prejdite do **WooCommerce > Polski > Nastavenia > Kompatibilita**
2. Zapnite režim kompatibility pre problematické moduly
3. Prispôsobte priority hookov, ak sa prvky zobrazujú v nesprávnom poradí

---

## Overenie konfigurácie

Po nakonfigurovaní modulov sa oplatí skontrolovať, či všetko funguje:

1. **Dashboard súladu** - prejdite do **WooCommerce > Polski > Súlad** a skontrolujte, či všetky ukazovatele sú zelené
2. **Stránka produktu** - otvorte ľubovoľný produkt v obchode a skontrolujte, či sa zobrazujú nové prvky (cena Omnibus, dodacia lehota, údaje GPSR)
3. **Stránka pokladne** - zadajte testovaciu objednávku a skontrolujte, či checkboxy a tlačidlo sú správne
4. **Právne stránky** - otvorte obchodné podmienky a zásady ochrany osobných údajov a skontrolujte ich obsah

Môžete tiež spustiť automatický audit: **WooCommerce > Polski > Nástroje > Audit stránky**.

---

## Ďalšie kroky

- [Sprievodca konfiguráciou](/sk/getting-started/wizard/) - automatická konfigurácia najdôležitejších nastavení
- [Dashboard súladu](/sk/tools/compliance-dashboard/) - monitorovanie stavu právneho súladu
- [Audit stránky](/sk/tools/site-audit/) - automatická verifikácia konfigurácie

Máte otázku? Napíšte na [GitHub Discussions](https://github.com/wppoland/polski/discussions). Našli ste chybu? Nahláste ju na [GitHub Issues](https://github.com/wppoland/polski/issues).

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
