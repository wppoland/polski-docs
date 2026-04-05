---
title: Ochrana pred greenwashingom
description: Produktové polia anti-greenwashing v Polski for WooCommerce - základ environmentálneho vyhlásenia, certifikát a dátum platnosti podľa smernice 2024/825.
---

Smernica EÚ 2024/825 zakazuje neodôvodnené environmentálne vyhlásenia. Od 27. septembra 2026 nemôžete používať všeobecné ekologické tvrdenia (napr. "eko", "zelený") bez konkrétneho odôvodnenia a certifikátu. Plugin pridáva produktové polia na dokumentovanie environmentálnych vyhlásení.

## Čo je greenwashing

Greenwashing je zavádzanie zákazníkov o ekologických vlastnostiach produktu. Príklady zakázaných praktík:

- Používanie všeobecných vyhlásení ("eko", "bio", "zelený") bez certifikácie
- Tvrdenia o klimatickej neutralite založené výlučne na kompenzácii emisií
- Naznačovanie environmentálnych výhod bez vedeckých dôkazov
- Zobrazovanie neoficiálnych ekologických značiek
- Tvrdenia o trvanlivosti produktu bez odôvodnenia

## Produktové polia

V úprave produktu, v záložke **Polski - Životné prostredie**, nájdete tri polia na dokumentovanie environmentálnych vyhlásení.

### Základ vyhlásenia

Textové pole na popis vedeckého alebo technického základu environmentálneho vyhlásenia.

**Čo zapísať:**

- Konkrétny environmentálny aspekt, ktorého sa vyhlásenie týka (napr. "Produkt vyrobený z 80% recyklovaných materiálov")
- Metodológia výskumu alebo analýzy (napr. "Analýza životného cyklu produktu (LCA) v súlade s ISO 14040")
- Výsledky meraní alebo výskumov (napr. "Uhlíková stopa 2,3 kg CO2e na jednotku - správa firmy XYZ z dňa 2025-01-15")
- Porovnanie s referenčným produktom (ak je vyhlásenie porovnávacie)

**Príklad správneho záznamu:**

```
Deklaracja: "Opakowanie w 100% z materiałów z recyklingu"
Podstawa: Surowiec pochodzi w całości z recyklingu PET post-konsumenckiego.
Dostawca surowca: RecyPET Sp. z o.o., certyfikat EuCertPlast nr 2025/0123.
Proces produkcji potwierdzony audytem wewnętrznym z dnia 2025-03-01.
```

### Certifikát

Pole na informácie o oficiálnom certifikáte potvrdzujúcom environmentálne vyhlásenie.

**Akceptované certifikáty:**

- Certifikáty v súlade s nariadením (ES) č. 66/2010 (EU Ecolabel)
- Národné certifikáty uznané Európskou komisiou
- Odvetvové certifikáty vydané akreditovanými certifikačnými orgánmi
- Certifikáty FSC, PEFC (pre drevené/papierové produkty)
- Certifikáty GOTS, OEKO-TEX (pre textílie)
- Certifikáty EuCertPlast, RecyClass (pre plasty)

**Čo zapísať:**

- Názov certifikátu
- Číslo certifikátu
- Certifikačný orgán
- Odkaz na overenie (ak je dostupný)

**Príklad:**

```
EU Ecolabel - numer licencji PL/032/005
Jednostka certyfikująca: PCBC S.A.
Weryfikacja: https://environment.ec.europa.eu/ecolabel_en
```

### Dátum platnosti

Pole dátumu určujúce, do kedy si certifikát alebo environmentálne vyhlásenie zachováva platnosť.

Po uplynutí dátumu platnosti:

- Environmentálne vyhlásenie je automaticky skryté na stránke produktu
- Administrátor dostane e-mailové oznámenie o vypršanom certifikáte
- Produkt je označený v zozname produktov výstražnou ikonou

To chráni pred zobrazovaním vypršaného certifikátu zákazníkom.

## Zobrazenie na stránke produktu

Keď sú environmentálne polia vyplnené, plugin zobrazí sekciu "Environmentálna informácia" na stránke produktu. Sekcia obsahuje:

- Obsah environmentálneho vyhlásenia
- Názov a číslo certifikátu
- Dátum platnosti certifikátu
- Ikonu certifikátu (ak je rozpoznaný - napr. EU Ecolabel)

Sekcia sa zobrazuje v záložke "Ďalšie informácie" na stránke produktu alebo ako samostatná záložka (konfigurovateľné v nastaveniach).

## Konfigurácia

Nastavenia modulu: **WooCommerce > Nastavenia > Polski > Životné prostredie**.

| Možnosť | Popis | Predvolená hodnota |
|-------|------|------------------|
| Zapnúť modul | Aktivuje environmentálne polia | Nie |
| Pozícia zobrazovania | Kde zobrazovať informáciu na stránke produktu | Záložka "Ďalšie informácie" |
| Oznámenie o vypršaní | Koľko dní pred vypršaním odoslať oznámenie | 30 |
| Automatické skrytie | Skryť vyhlásenie po vypršaní certifikátu | Áno |

## Hromadná správa

### Export CSV

Environmentálne údaje sú zahrnuté v exporte produktov. Ďalšie stĺpce:

- `env_claim_basis` - základ vyhlásenia
- `env_certificate` - certifikát
- `env_expiry_date` - dátum platnosti (formát YYYY-MM-DD)

### Import CSV

Pripravte súbor CSV s príslušnými hlavičkami a importujte cez WooCommerce.

### Filtrovanie produktov

V zozname produktov môžete filtrovať podľa stavu environmentálneho vyhlásenia:

- Všetky produkty s vyhlásením
- Produkty s vypršaným certifikátom
- Produkty s certifikátom vypršiavajúcim v priebehu 30 dní
- Produkty bez certifikátu (ale s vyhlásením)

## Dobré praktiky

1. **Buďte konkrétni** - namiesto "eko obal" napíšte "obal vyrobený zo 100% recyklovaného kartónu, certifikát FSC č. XXXX"
2. **Uvádzajte zdroje** - odvolávajte sa na konkrétne výskumy, správy, certifikáty
3. **Aktualizujte údaje** - nastavte oznámenia o vypršaní certifikátov a obnovujte ich včas
4. **Vyhýbajte sa všeobecnostiam** - smernica zakazuje tvrdenia, ktoré nie je možné overiť
5. **Porovnania musia byť poctivé** - porovnávajte rovnaké kategórie produktov, používajte rovnakú metodológiu

## Riešenie problémov

**Environmentálne polia sa nezobrazujú v úprave produktu**
Zapnite modul v **WooCommerce > Nastavenia > Polski > Moduly** a zaškrtnite "Zapnúť modul" v environmentálnych nastaveniach.

**Vyhlásenie zmizlo zo stránky produktu**
Skontrolujte dátum platnosti certifikátu. Ak certifikát vypršal, vyhlásenie je automaticky skryté. Obnovte certifikát a aktualizujte dátum platnosti.

**Nedostávam oznámenia o vypršiavajúcich certifikátoch**
Skontrolujte, či WP-Cron funguje správne. Oznámenia posiela naplánovaná úloha cron. Na serveroch s vypnutým WP-Cron nakonfigurujte systémový cron.

## Ďalšie kroky

- Nahlasovanie problémov: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskusie a otázky: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
