---
title: Konfigurace pluginu
description: Prvni kroky po instalaci pluginu Polski for WooCommerce. Aktivace modulu, dashboard souladu, prehled nastaveni a prizpusobeni potrebam obchodu.
---

## Hlavni panel pluginu

Po aktivaci pluginu prejdete do **WooCommerce > Polski**. Uvidite hlavni panel se sekcemi:

- **Stav souladu** - rychly prehled, ktere pravni pozadavky jsou splneny
- **Aktivni moduly** - seznam aktivovanych modulu s odkazy na jejich nastaveni
- **Vyzadovane akce** - oznameni o chybejicich konfiguracich
- **Rychle odkazy** - odkazy na nejdulezitejsi nastaveni

![Dashboard modulu Polski for WooCommerce](../../../../assets/screenshots/screenshot-1-modules-dashboard.png)

:::tip[Pruvodce konfiguraci]
Pokud teprve zacinat, pouzijte [pruvodce konfiguraci](/cs/getting-started/wizard/). Provede vas nejdulezitejsimi nastavenimi krok za krokem. Muzete jej spustit znovu kdykoli.
:::

---

## Aktivace a deaktivace modulu

Plugin funguje modularne - po instalaci jsou vsechny moduly vypnute. Aktivujete pouze ty, ktere potrebujete.

### Jak aktivovat modul

1. Prejdete do **WooCommerce > Polski > Moduly**
2. Najdete pozadovany modul v seznamu
3. Kliknete na prepinac u nazvu modulu pro jeho aktivaci
4. Kliknete **Ulozit zmeny** ve spodni casti stranky

### Jak deaktivovat modul

Kliknete na prepinac u aktivniho modulu. Deaktivace neodstrani data - muzete modul znovu aktivovat bez ztraty nastaveni.

### Doporucene moduly pro start

Pro typicky polsky obchod aktivujte minimalne tyto moduly:

| Modul | Proc je dulezity |
|-------|-------------------|
| Omnibus | Zakonny pozadavek - zobrazovani historie cen |
| Tlacitko objednavky | Zakonny pozadavek - "Objednavka se zavazkem platby" |
| Pravni checkboxy | Zakonny pozadavek - souhlasy pri skladani objednavky |
| Pravni stranky | Obchodni podminky a zasady ochrany osobnich udaju |
| Pravo na odstoupeni | Zakonny pozadavek - formular a pouceni o odstoupeni |
| Doba dodani | Doporuceno - odhadovana doba dodani na strance produktu |
| GPSR | Vyzadovano od 13. 12. 2024 - udaje o bezpecnosti produktu |

---

## Dashboard souladu

Zde zkontrolujete, zda vas obchod splnuje pravni pozadavky. Prejdete do **WooCommerce > Polski > Soulad**.

### Ukazatele stavu

Kazdy pravni pozadavek ma jeden ze tri stavu:

- **Vyhovujici** (zeleny) - pozadavek je splnen, konfigurace je kompletni
- **Vyzaduje pozornost** (zluty) - modul je aktivovan, ale chybi cast konfigurace
- **Nevyhovujici** (cerveny) - modul je deaktivovan nebo konfigurace je nekompletni

### Kontrolni seznam

Dashboard zobrazuje kontrolni seznam s konkretnymi kroky k provedeni:

```
[x] Tlacitko objednavky - text v souladu s pravem
[x] Omnibus - zobrazovani historie cen aktivovano
[ ] Obchodni podminky - stranka neni prirazena
[ ] Zasady ochrany osobnich udaju - stranka neni prirazena
[ ] GPSR - chybi udaje vyrobce u 12 produktu
```

Kliknutim na libovolnou polozku seznamu prejdete primo na prislusna nastaveni.

---

## Konfigurace jednotlivych skupin modulu

### Pravni pozadavky

Prejdete do **WooCommerce > Polski > Pravni soulad** pro konfiguraci:

**Omnibus (cenova smernice)**

1. Aktivujte modul Omnibus
2. Nastavte obdobi sledovani cen (vychozi 30 dni)
3. Zvolte format zobrazovani nejnizsi ceny
4. Ulozte zmeny

Plugin zacne zaznamenavat historii cen od okamziku aktivace modulu.

**GPSR (bezpecnost produktu)**

1. Aktivujte modul GPSR
2. Doplnte udaje vychoziho vyrobce v globalnich nastaveních
3. Pro jednotlive produkty - upravte udaje v zalozce "GPSR" na strance editace produktu

**Pravni stranky**

1. Aktivujte modul pravnich stranek
2. Pouzijte generator pro vytvoreni obchodnich podminek, zasad ochrany osobnich udaju a zasad vraceni zbozi
3. Priradte vygenerovane stranky v **WooCommerce > Nastaveni > Pokrocile > Nastaveni stranky**

### Ceny a informace o produktu

Prejdete do **WooCommerce > Polski > Ceny** pro konfiguraci:

**Jednotkove ceny**

1. Aktivujte modul jednotkovych cen
2. Zvolte vychozi mernou jednotku (kg, l, m, ks)
3. Na strance produktu doplnte pole "Bazove mnozstvi" a "Merna jednotka"

Priklad konfigurace v editoru produktu:

```
Cena produktu: 15,99 PLN
Bazove mnozstvi: 500
Merna jednotka: g
Referencni jednotka: kg

Vysledek: 15,99 PLN / 500g (31,98 PLN/kg)
```

**Doba dodani**

1. Aktivujte modul doby dodani
2. Nastavte vychozi dobu dodani (napr. "1-3 pracovni dny")
3. Volitelne - nastavte individualni dobu pro jednotlive produkty

### Pokladna a objednavky

Prejdete do **WooCommerce > Polski > Pokladna** pro konfiguraci:

**Tlacitko objednavky**

1. Aktivujte modul
2. Vychozi text je "Zamawiam z obowiązkiem zapłaty"
3. Text lze prizpusobit, ale musi splnovat pozadavky cl. 17 zakona o pravech spotrebitele

**Pravni checkboxy**

1. Aktivujte modul checkboxu
2. Pridejte vyzadovane souhlasy (obchodni podminky, zasady ochrany osobnich udaju)
3. Nakonfigurujte obsah kazdeho checkboxu vcetne odkazu na pravni stranky
4. Oznacte, ktere checkboxy jsou povinne

Priklad konfigurace checkboxu:

```
Stitek: obchodni podminky
Obsah: Seznamil/a jsem se s [obchodnimi podminkami] a prijimam jejich ustanoveni.
Povinny: Ano
Odkaz: /obchodni-podminky/
Pozice: Pred tlacitkem objednavky
```

**Vyhledavani NIP**

1. Aktivujte modul NIP
2. Pole NIP se automaticky objevi na strance pokladny
3. Po zadani NIP a kliknuti na "Overit" se udaje firmy automaticky doplni z databaze GUS

### Potraviny

Moduly pro obchody s potravinami. Prejdete do **WooCommerce > Polski > Potraviny**.

1. Aktivujte potrebne moduly (vyzivove hodnoty, alergeny, Nutri-Score)
2. Na strance editace produktu se objevi nove zalozky pro doplneni dat
3. Data se automaticky zobrazi na strance produktu v obchode

### Moduly obchodu

Prejdete do **WooCommerce > Polski > Obchod** pro aktivaci doplnkovych funkci:

- Wishlist, porovnavac, rychly nahled - aktivujte a prizpusobte vzhled
- AJAX vyhledavac - aktivujte a nakonfigurujte pocet zobrazovanych vysledku
- AJAX filtry - aktivujte a zvolte atributy pro filtrovani
- Slider a stitky - nakonfigurujte styl a chovani

---

## Globalni nastaveni

V zalozce **WooCommerce > Polski > Nastaveni** naleznete globalni moznosti:

### Udaje firmy

Doplnte zakladni udaje vasi firmy:

- Nazev firmy
- NIP (DIC)
- REGON (IC)
- Adresa sidla
- Kontaktni e-mail
- Telefonni cislo

Tyto udaje jsou vyuzivany ruznymi moduly (pravni stranky, GPSR, DSA).

### Vykon

- **Nacitani zdroju** - CSS a JS nacitane pouze na strankach, kde jsou potreba
- **Cache** - plugin vyuziva Transients API WordPress pro cachovani dat
- **Minifikace** - front-endove zdroje jsou minifikovane

### Kompatibilita

Pokud motiv nebo jiny plugin zpusobuje konflikt:

1. Prejdete do **WooCommerce > Polski > Nastaveni > Kompatibilita**
2. Aktivujte rezim kompatibility pro problematicke moduly
3. Prizpusobte priority hooku, pokud se elementy zobrazuji v nespravnem poradi

---

## Overeni konfigurace

Po konfiguraci zkontrolujte, zda vse funguje:

1. **Dashboard souladu** - prejdete do **WooCommerce > Polski > Soulad** a zkontrolujte, zda jsou vsechny ukazatele zelene
2. **Stranka produktu** - otevrte libovolny produkt v obchode a zkontrolujte, zda se zobrazuji nove elementy (cena Omnibus, doba dodani, udaje GPSR)
3. **Stranka pokladny** - udelejte testovaci objednavku a zkontrolujte, zda jsou checkboxy a tlacitko spravne
4. **Pravni stranky** - otevrte obchodni podminky a zasady ochrany osobnich udaju a zkontrolujte jejich obsah

Muzete take spustit automaticky audit: **WooCommerce > Polski > Nastroje > Audit webu**.

---

## Dalsi kroky

- [Pruvodce konfiguraci](/cs/getting-started/wizard/) - automaticka konfigurace nejdulezitejsich nastaveni
- [Dashboard souladu](/cs/tools/compliance-dashboard/) - monitorovani stavu pravnich pozadavku
- [Audit webu](/cs/tools/site-audit/) - automaticka kontrola konfigurace

Mate otazku? Napiste na [GitHub Discussions](https://github.com/wppoland/polski/discussions). Nasli jste chybu? Nahlaste ji na [GitHub Issues](https://github.com/wppoland/polski/issues).

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
