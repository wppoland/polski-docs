---
title: Ochrana pred greenwashingem
description: Produktova pole anti-greenwashing v Polski for WooCommerce - zaklad environmentalniho prohlaseni, certifikat a datum platnosti podle Smernice 2024/825.
---

Smernice EU 2024/825 (Empowering Consumers Directive) zakazuje neopodstatnena environmentalni prohlaseni v elektronickem obchode. Od 27. zari 2026 prodejci nesmi pouzivat obecna ekologicka tvrzeni (napr. "eko", "zeleny", "setrny k zivotnimu prostredi") bez konkretniho zduvodneni a certifikace. Polski for WooCommerce dodava produktova pole umoznujici dokumentovat a zobrazovat zaklady environmentalnich prohlaseni.

## Co je greenwashing

Greenwashing je praktika spocivajici v uvadeni spotrebitelu v omyl ohledne environmentalnich vlastnosti produktu nebo cinnosti firmy. Priklady zakazanych praktik:

- Pouzivani obecnych prohlaseni ("eko", "bio", "zeleny") bez certifikace
- Tvrzeni o klimaticke neutralite zalozena vyhradne na kompenzaci emisi
- Naznacovani environmentalnich vyhod bez vedeckych dukazu
- Zobrazovani neoficialnich ekologickych znacek
- Tvrzeni o trvanlivosti produktu bez zduvodneni

## Produktova pole

V editaci produktu WooCommerce, v zalozce **Polski - Zivotni prostredi**, jsou dostupna tri pole umoznujici zdokumentovat environmentalni prohlaseni.

### Zaklad prohlaseni

Textove pole na popis vedeckeho nebo technickeho zakladu environmentalniho prohlaseni.

**Co vyplnit:**

- Konkretni environmentalni aspekt, ktereho se prohlaseni tyka (napr. "Produkt vyroben z 80 % recyklovanych materialu")
- Metodologie vyzkumu nebo analyzy (napr. "Analyza zivotniho cyklu produktu (LCA) v souladu s ISO 14040")
- Vysledky mereni nebo vyzkumu (napr. "Uhlikova stopa 2,3 kg CO2e na jednotku - zprava firmy XYZ ze dne 2025-01-15")
- Srovnani s referencnim produktem (pokud je prohlaseni srovnavaci)

**Priklad spravneho zapisu:**

```
Deklaracja: "Opakowanie w 100% z materiałów z recyklingu"
Podstawa: Surowiec pochodzi w całości z recyklingu PET post-konsumenckiego.
Dostawca surowca: RecyPET Sp. z o.o., certyfikat EuCertPlast nr 2025/0123.
Proces produkcji potwierdzony audytem wewnętrznym z dnia 2025-03-01.
```

### Certifikat

Pole na informace o oficialnim certifikatu potvrzujicim environmentalni prohlaseni.

**Akceptovane certifikaty:**

- Certifikaty v souladu s Narizenim (ES) c. 66/2010 (EU Ecolabel)
- Narodni certifikaty uznane Evropskou komisi
- Oborove certifikaty vydane akreditovanymi certifikacnimi organy
- Certifikaty FSC, PEFC (pro drevene/papirove vyrobky)
- Certifikaty GOTS, OEKO-TEX (pro textil)
- Certifikaty EuCertPlast, RecyClass (pro plasty)

**Co vyplnit:**

- Nazev certifikatu
- Cislo certifikatu
- Certifikacni organ
- Odkaz na overeni (pokud je k dispozici)

**Priklad:**

```
EU Ecolabel - numer licencji PL/032/005
Jednostka certyfikująca: PCBC S.A.
Weryfikacja: https://environment.ec.europa.eu/ecolabel_en
```

### Datum platnosti

Pole data urcujici, do kdy certifikat nebo environmentalni prohlaseni zustava v platnosti.

Po uplyuti data platnosti:

- Environmentalni prohlaseni je automaticky skryto na strance produktu
- Administrator obdrzi e-mailove oznameni o vyprselm certifikatu
- Produkt je na seznamu produktu oznacen varovnou ikonou

Toto zabezpeceni chrani pred situaci, kdy vyprsely certifikat je stale zobrazovan zakaznikum.

## Zobrazeni na strance produktu

Kdyz jsou environmentalni pole vyplnena, plugin zobrazi sekci "Environmentalni informace" na strance produktu. Sekce obsahuje:

- Obsah environmentalniho prohlaseni
- Nazev a cislo certifikatu
- Datum platnosti certifikatu
- Ikonu certifikatu (pokud je rozpoznan - napr. EU Ecolabel)

Sekce je zobrazena v zalozce "Doplnkove informace" na strance produktu nebo jako samostatna zalozka (konfigurovatelne v nastaveni).

## Konfigurace

Nastaveni modulu: **WooCommerce > Nastaveni > Polski > Zivotni prostredi**.

| Moznost | Popis | Vychozi hodnota |
|-------|------|------------------|
| Aktivovat modul | Aktivuje environmentalni pole | Ne |
| Pozice zobrazeni | Kde zobrazit informace na strance produktu | Zalozka "Doplnkove informace" |
| Oznameni o vyprseni | Kolik dni pred vyprsenim odeslat oznameni | 30 |
| Automaticke skryti | Skryt prohlaseni po vyprseni certifikatu | Ano |

## Hromadna sprava

### CSV export

Environmentalni data jsou zahrnuta v exportu produktu WooCommerce. Doplnkove sloupce:

- `env_claim_basis` - zaklad prohlaseni
- `env_certificate` - certifikat
- `env_expiry_date` - datum platnosti (format YYYY-MM-DD)

### CSV import

Pripravte soubor CSV s prislusnymi zahlavi a importujte standardni cestou WooCommerce.

### Filtrovani produktu

Na seznamu produktu v administracnim panelu muzete filtrovat produkty podle stavu environmentalniho prohlaseni:

- Vsechny produkty s prohlasenim
- Produkty s vyprselym certifikatem
- Produkty s certifikatem vyprchavajicim do 30 dnu
- Produkty bez certifikatu (ale s prohlasenim)

## Dobre postupy

1. **Budte konkretni** - misto "eko obal" napiste "obal vyrobeny ze 100 % recyklovaneho kartonu, certifikat FSC c. XXXX"
2. **Uvadejte zdroje** - odvolavejte se na konkretni vyzkumy, zpravy, certifikaty
3. **Aktualizujte data** - nastavte oznameni o vyprchavani certifikatu a obnovujte je vcas
4. **Vyhybejte se obecnostem** - smernice zakazuje tvrzeni, ktera nelze overit
5. **Srovnani musi byt fer** - srovnavejte stejne kategorie produktu, pouzivejte stejnou metodologii

## Reseni problemu

**Environmentalni pole se nezobrazuji v editaci produktu**
Aktivujte modul v **WooCommerce > Nastaveni > Polski > Moduly** a ujistete se, ze moznost "Aktivovat modul" je zaznacena v environmentalnich nastavenich.

**Prohlaseni zmizelo ze stranky produktu**
Zkontrolujte datum platnosti certifikatu. Pokud certifikat vyprsiel, prohlaseni je automaticky skryto. Obnovte certifikat a aktualizujte datum platnosti.

**Nedostavani oznameni o vyprchavajicich certifikatech**
Zkontrolujte, zda WP-Cron funguje spravne. Oznameni jsou odesilana prostrednictvim planovane ulohy cron. Na serverech s deaktivovanym WP-Cron nakonfigurujte systemovy cron.

## Dalsi kroky

- Hlaseni problemu: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskuse a otazky: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
