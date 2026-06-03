---
title: Konfigurace pluginu
description: První kroky po instalaci pluginu Polski for WooCommerce. Zapínání modulů, dashboard souladu, přehled nastavení a přizpůsobení potřebám obchodu.
---

## Hlavní panel pluginu

Po aktivaci pluginu přejděte do **WooCommerce > Polski**. Uvidíte hlavní panel se sekcemi:

- **Stav souladu** - rychlý přehled, které právní požadavky jsou splněny
- **Aktivní moduly** - seznam zapnutých modulů s odkazy na jejich nastavení
- **Požadované kroky** - oznámení o chybějících konfiguracích
- **Rychlé odkazy** - odkazy na nejdůležitější nastavení

![Dashboard modulů Polski for WooCommerce](../../../../assets/screenshots/screenshot-1-modules-dashboard.png)

:::tip[Průvodce konfigurací]
Pokud teprve začínáte, použijte [průvodce konfigurací](getting-started/wizard/). Provede vás krok za krokem nejdůležitějšími nastaveními. Můžete ho kdykoli spustit znovu.
:::

---

## Zapínání a vypínání modulů

Plugin funguje modulárně - po instalaci jsou všechny moduly vypnuté. Zapínáte pouze ty, které potřebujete.

### Jak zapnout modul

1. Přejděte do **WooCommerce > Polski > Moduly**
2. Najděte na seznamu modul, který vás zajímá
3. Klikněte na přepínač vedle názvu modulu, abyste ho zapnuli
4. Klikněte na **Uložit změny** v dolní části stránky

### Jak vypnout modul

Klikněte na přepínač u aktivního modulu, abyste ho vypnuli. Vypnutí nesmaže data - modul můžete znovu zapnout bez ztráty nastavení.

### Doporučené moduly na začátek

Pro typický polský obchod zapněte alespoň tyto moduly:

| Modul | Proč je důležitý |
|-------|-------------------|
| Omnibus | Vyžadováno zákonem - zobrazování historie cen |
| Tlačítko objednávky | Vyžadováno zákonem - "Objednávám s povinností platby" |
| Právní checkboxy | Vyžadováno zákonem - souhlasy při dokončení objednávky |
| Právní stránky | Obchodní podmínky a zásady ochrany osobních údajů |
| Právo na odstoupení | Vyžadováno zákonem - formulář a poučení o odstoupení |
| Doba dodání | Doporučeno - odhadovaná doba dodání na kartě produktu |
| GPSR | Vyžadováno od 13.12.2024 - údaje o bezpečnosti produktu |

---

## Dashboard souladu

Zde zkontrolujete, zda váš obchod splňuje právní požadavky. Přejděte do **WooCommerce > Polski > Soulad**.

### Indikátory stavu

Každý právní požadavek má jeden ze tří stavů:

- **V souladu** (zelený) - požadavek splněn, konfigurace kompletní
- **Vyžaduje pozornost** (žlutý) - modul zapnutý, ale chybí část nastavení
- **Není v souladu** (červený) - modul vypnutý nebo konfigurace neúplná

### Kontrolní seznam

Dashboard zobrazuje kontrolní seznam s kroky k provedení:

```
[x] Tlačítko objednávky - text v souladu se zákonem
[x] Omnibus - zobrazování historie cen zapnuto
[ ] Obchodní podmínky - stránka s podmínkami není přiřazena
[ ] Zásady ochrany osobních údajů - stránka není přiřazena
[ ] GPSR - chybí údaje výrobce u 12 produktů
```

Klikněte na libovolnou položku seznamu, abyste přešli přímo do odpovídajících nastavení.

---

## Konfigurace jednotlivých skupin modulů

### Právní požadavky

Přejděte do **WooCommerce > Polski > Právní soulad**, abyste nakonfigurovali:

**Omnibus (cenová směrnice)**

1. Zapněte modul Omnibus
2. Nastavte období sledování cen (výchozí 30 dní)
3. Vyberte formát zobrazování nejnižší ceny
4. Uložte změny

Plugin začne zaznamenávat historii cen od okamžiku zapnutí modulu.

**GPSR (bezpečnost produktů)**

1. Zapněte modul GPSR
2. Doplňte údaje výchozího výrobce v globálních nastaveních
3. Pro jednotlivé produkty - upravte údaje na záložce "GPSR" na stránce úpravy produktu

**Právní stránky**

1. Zapněte modul právních stránek
2. Použijte generátor k vytvoření obchodních podmínek, zásad ochrany osobních údajů a zásad vrácení zboží
3. Přiřaďte vygenerované stránky v **WooCommerce > Nastavení > Pokročilé > Nastavení stránek**

### Ceny a informace o produktu

Přejděte do **WooCommerce > Polski > Ceny**, abyste nakonfigurovali:

**Jednotkové ceny**

1. Zapněte modul jednotkových cen
2. Vyberte výchozí měrnou jednotku (kg, l, m, ks)
3. Na kartě produktu doplňte pole "Základní množství" a "Měrná jednotka"

Příklad konfigurace v editoru produktu:

```
Cena produktu: 15,99 zł
Základní množství: 500
Měrná jednotka: g
Referenční jednotka: kg

Výsledek: 15,99 zł / 500g (31,98 zł/kg)
```

**Doba dodání**

1. Zapněte modul doby dodání
2. Nastavte výchozí dobu dodání (např. "1-3 pracovní dny")
3. Volitelně - nastavte individuální dobu pro jednotlivé produkty

### Pokladna a objednávky

Přejděte do **WooCommerce > Polski > Pokladna**, abyste nakonfigurovali:

**Tlačítko objednávky**

1. Zapněte modul
2. Výchozí text je "Objednávám s povinností platby"
3. Text můžete přizpůsobit, ale musí splňovat požadavky čl. 17 zákona o právech spotřebitele

**Právní checkboxy**

1. Zapněte modul checkboxů
2. Přidejte vyžadované souhlasy (obchodní podmínky, zásady ochrany osobních údajů)
3. Nakonfigurujte obsah každého checkboxu, včetně odkazů na právní stránky
4. Označte, které checkboxy jsou povinné

Příklad konfigurace checkboxu:

```
Štítek: obchodní podmínky
Obsah: Seznámil/a jsem se s [obchodními podmínkami] a přijímám jejich ustanovení.
Vyžadováno: Ano
Odkaz: /obchodni-podminky/
Pozice: Před tlačítkem objednávky
```

**Vyhledávání NIP**

1. Zapněte modul NIP
2. Pole NIP se na stránce pokladny objeví automaticky
3. Po zadání NIP a kliknutí na "Ověřit" se údaje firmy automaticky doplní z databáze GUS

### Potravinové produkty

Moduly pro obchody s potravinami. Přejděte do **WooCommerce > Polski > Potraviny**.

1. Zapněte potřebné moduly (výživové hodnoty, alergeny, Nutri-Score)
2. V úpravě produktu se objeví nové záložky k vyplnění
3. Údaje se na stránce produktu zobrazí automaticky

### Obchodní moduly

Přejděte do **WooCommerce > Polski > Obchod**, abyste zapnuli další funkce:

- Seznam přání, porovnávač, rychlý náhled - zapněte a přizpůsobte vzhled
- Vyhledávač AJAX - zapněte a nakonfigurujte počet zobrazovaných výsledků
- Filtry AJAX - zapněte a vyberte atributy k filtrování
- Slider a odznaky - nakonfigurujte styl a chování

---

## Globální nastavení

Na záložce **WooCommerce > Polski > Nastavení** najdete globální možnosti:

### Údaje firmy

Doplňte základní údaje své firmy:

- Název firmy
- NIP
- REGON
- Adresa sídla
- Kontaktní e-mailová adresa
- Telefonní číslo

Tyto údaje využívají různé moduly (právní stránky, GPSR, DSA).

### Výkon

- **Načítání zdrojů** - CSS a JS se načítají jen na stránkách, kde jsou potřeba
- **Cache** - plugin využívá Transients API WordPress k cachování dat
- **Minifikace** - frontendové zdroje jsou minifikované

### Kompatibilita

Pokud šablona nebo jiný plugin způsobuje konflikt:

1. Přejděte do **WooCommerce > Polski > Nastavení > Kompatibilita**
2. Zapněte režim kompatibility pro problematické moduly
3. Upravte priority hooků, pokud se prvky zobrazují ve špatném pořadí

---

## Ověření konfigurace

Po konfiguraci zkontrolujte, zda vše funguje:

1. **Dashboard souladu** - přejděte do **WooCommerce > Polski > Soulad** a zkontrolujte, zda jsou všechny indikátory zelené
2. **Stránka produktu** - otevřete libovolný produkt v obchodě a zkontrolujte, zda se zobrazují nové prvky (cena Omnibus, doba dodání, údaje GPSR)
3. **Stránka pokladny** - dokončete testovací objednávku a zkontrolujte, zda jsou checkboxy a tlačítko správné
4. **Právní stránky** - otevřete obchodní podmínky a zásady ochrany osobních údajů a zkontrolujte jejich obsah

Můžete také spustit automatický audit: **WooCommerce > Polski > Nástroje > Audit obchodu**.

---

## Další kroky

- [Průvodce konfigurací](getting-started/wizard/) - automatická konfigurace nejdůležitějších nastavení
- [Dashboard souladu](tools/compliance-dashboard/) - monitorování stavu právních požadavků
- [Audit obchodu](tools/site-audit/) - automatické ověření konfigurace

Máte otázku? Napište na [GitHub Discussions](https://github.com/wppoland/polski/discussions). Našli jste chybu? Nahlaste ji na [GitHub Issues](https://github.com/wppoland/polski/issues).

<div class="disclaimer">Tato stránka má výhradně informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) dodávaný bez záruky.</div>
