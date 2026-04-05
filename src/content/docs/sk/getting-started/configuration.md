---
title: Konfigurácia pluginu
description: Prvé kroky po inštalácii pluginu Polski for WooCommerce. Aktivácia modulov, dashboard súladu, prehľad nastavení a prispôsobenie pre potreby obchodu.
---

## Hlavný panel pluginu

Po aktivácii pluginu prejdite do **WooCommerce > Polski**. Uvidíte hlavný panel so sekciami:

- **Stav súladu** - rýchly prehľad, ktoré právne požiadavky sú splnené
- **Aktívne moduly** - zoznam zapnutých modulov s odkazmi na ich nastavenia
- **Vyžadované akcie** - oznámenia o chýbajúcich konfiguráciách
- **Rýchle odkazy** - odkazy na najdôležitejšie nastavenia

![Dashboard modulov Polski for WooCommerce](../../../../assets/screenshots/screenshot-1-modules-dashboard.png)

:::tip[Sprievodca konfiguráciou]
Ak práve začínate, použite [sprievodcu konfiguráciou](/sk/getting-started/wizard/). Prevedie vás najdôležitejšími nastaveniami krok za krokom. Môžete ho spustiť znova kedykoľvek.
:::

---

## Zapínanie a vypínanie modulov

Plugin funguje modulárne - po inštalácii sú všetky moduly vypnuté. Zapínate len tie, ktoré potrebujete.

### Ako zapnúť modul

1. Prejdite do **WooCommerce > Polski > Moduly**
2. Nájdite požadovaný modul v zozname
3. Kliknite na prepínač vedľa názvu modulu pre jeho zapnutie
4. Kliknite na **Uložiť zmeny** v spodnej časti stránky

### Ako vypnúť modul

Kliknite na prepínač pri aktívnom module pre jeho vypnutie. Vypnutie neodstraňuje údaje - môžete modul znova zapnúť bez straty nastavení.

### Odporúčané moduly na začiatok

Pre typický poľský obchod zapnite minimálne tieto moduly:

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

Tu skontrolujete, či váš obchod spĺňa právne požiadavky. Prejdite do **WooCommerce > Polski > Súlad**.

### Ukazovatele stavu

Každá právna požiadavka má jeden z troch stavov:

- **V súlade** (zelený) - požiadavka splnená, konfigurácia kompletná
- **Vyžaduje pozornosť** (žltý) - modul zapnutý, ale chýba časť nastavení
- **Nesúladný** (červený) - modul vypnutý alebo konfigurácia nekompletná

### Kontrolný zoznam

Dashboard zobrazuje kontrolný zoznam s krokmi na vykonanie:

```
[x] Tlačidlo objednávky - text v súlade s právom
[x] Omnibus - zobrazovanie histórie cien zapnuté
[ ] Obchodné podmienky - stránka obchodných podmienok nie je priradená
[ ] Zásady ochrany osobných údajov - stránka nie je priradená
[ ] GPSR - chýbajú údaje výrobcu na 12 produktoch
```

Kliknite na ľubovoľnú položku zoznamu a prejdete priamo k príslušným nastaveniam.

---

## Konfigurácia jednotlivých skupín modulov

### Právne požiadavky

Prejdite do **WooCommerce > Polski > Právny súlad** na konfiguráciu:

**Omnibus (cenová smernica)**

1. Zapnite modul Omnibus
2. Nastavte obdobie sledovania cien (štandardne 30 dní)
3. Vyberte formát zobrazovania najnižšej ceny
4. Uložte zmeny

Plugin začne zaznamenávať históriu cien od momentu zapnutia modulu.

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

Moduly pre obchody s potravinami. Prejdite do **WooCommerce > Polski > Potraviny**.

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

Tieto údaje využívajú rôzne moduly (právne stránky, GPSR, DSA).

### Výkon

- **Načítanie zdrojov** - CSS a JS načítané len na stránkach, kde sú potrebné
- **Cache** - plugin využíva Transients API WordPress na cachovanie údajov
- **Minifikácia** - front-endové zdroje sú minifikované

### Kompatibilita

Ak téma alebo iný plugin spôsobuje konflikt:

1. Prejdite do **WooCommerce > Polski > Nastavenia > Kompatibilita**
2. Zapnite režim kompatibility pre problematické moduly
3. Prispôsobte priority hookov, ak sa prvky zobrazujú v nesprávnom poradí

---

## Overenie konfigurácie

Po konfigurácii skontrolujte, či všetko funguje:

1. **Dashboard súladu** - prejdite do **WooCommerce > Polski > Súlad** a skontrolujte, či všetky ukazovatele sú zelené
2. **Stránka produktu** - otvorte ľubovoľný produkt v obchode a skontrolujte, či sa zobrazujú nové prvky (cena Omnibus, dodacia lehota, údaje GPSR)
3. **Stránka pokladne** - zadajte testovaciu objednávku a skontrolujte, či checkboxy a tlačidlo sú správne
4. **Právne stránky** - otvorte obchodné podmienky a zásady ochrany osobných údajov a skontrolujte ich obsah

Môžete tiež spustiť automatický audit: **WooCommerce > Polski > Nástroje > Audit stránky**.

---

## Ďalšie kroky

- [Sprievodca konfiguráciou](/sk/getting-started/wizard/) - automatická konfigurácia najdôležitejších nastavení
- [Dashboard súladu](/sk/tools/compliance-dashboard/) - monitorovanie stavu právnych požiadaviek
- [Audit stránky](/sk/tools/site-audit/) - automatická verifikácia konfigurácie

Máte otázku? Napíšte na [GitHub Discussions](https://github.com/wppoland/polski/discussions). Našli ste chybu? Nahláste ju na [GitHub Issues](https://github.com/wppoland/polski/issues).

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
