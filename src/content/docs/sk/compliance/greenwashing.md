---
title: Ochrana pred greenwashingom
description: Produktové polia anti-greenwashing v Polski for WooCommerce - základ environmentálneho tvrdenia, certifikát a dátum platnosti podľa Smernice 2024/825.
---

Smernica EÚ 2024/825 zakazuje neopodstatnené environmentálne tvrdenia. Od 27. septembra 2026 nemôžete používať všeobecné ekologické tvrdenia (napr. "eko", "zelený") bez konkrétneho odôvodnenia a certifikátu. Doplnok pridáva produktové polia na dokumentovanie environmentálnych tvrdení.

## Čo je greenwashing

Greenwashing je uvádzanie zákazníkov do omylu ohľadom ekologických vlastností produktu. Príklady zakázaných praktík:

- Používanie všeobecných tvrdení ("eko", "bio", "zelený") bez certifikácie
- Tvrdenia o klimatickej neutralite založené výlučne na kompenzácii emisií
- Naznačovanie environmentálnych prínosov bez vedeckých dôkazov
- Zobrazovanie neoficiálnych ekologických značiek
- Tvrdenia o trvanlivosti produktu bez odôvodnenia

## Produktové polia

V úprave produktu, záložka **Polski - Životné prostredie**, nájdete tri polia na dokumentovanie environmentálnych tvrdení.

### Základ tvrdenia

Pole na opis vedeckého alebo technického základu environmentálneho tvrdenia.

**Čo zadať:**

- Konkrétny environmentálny aspekt, ktorého sa tvrdenie týka (napr. "Produkt vyrobený z 80 % z recyklovaných materiálov")
- Metodológia testovania alebo analýzy (napr. "Analýza životného cyklu produktu (LCA) podľa ISO 14040")
- Výsledky meraní alebo testov (napr. "Uhlíková stopa 2,3 kg CO2e na jednotku - správa firmy XYZ zo dňa 2025-01-15")
- Porovnanie s referenčným produktom (ak je tvrdenie porovnávacie)

**Príklad správneho zápisu:**

```
Deklaracja: "Opakowanie w 100% z materiałów z recyklingu"
Podstawa: Surowiec pochodzi w całości z recyklingu PET post-konsumenckiego.
Dostawca surowca: RecyPET Sp. z o.o., certyfikat EuCertPlast nr 2025/0123.
Proces produkcji potwierdzony audytem wewnętrznym z dnia 2025-03-01.
```

### Certifikát

Pole na informácie o certifikáte potvrdzujúcom environmentálne tvrdenie.

**Akceptované certifikáty:**

- Certifikáty podľa Nariadenia (ES) č. 66/2010 (EU Ecolabel)
- Národné certifikáty uznané Európskou komisiou
- Odvetvové certifikáty vydané akreditovanými certifikačnými orgánmi
- Certifikáty FSC, PEFC (pre drevené/papierové produkty)
- Certifikáty GOTS, OEKO-TEX (pre textílie)
- Certifikáty EuCertPlast, RecyClass (pre plasty)

**Čo zadať:**

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

Dátum, dokedy je certifikát alebo tvrdenie platné.

Po uplynutí dátumu platnosti:

- Environmentálne tvrdenie sa automaticky skryje na stránke produktu
- Administrátor dostane e-mailovú notifikáciu o vypršanom certifikáte
- Produkt sa v zozname produktov označí výstražnou ikonou

Chráni to pred situáciou, keď vypršaný certifikát je naďalej viditeľný pre zákazníkov.

## Zobrazenie na stránke produktu

Po vyplnení polí doplnok zobrazí sekciu "Environmentálna informácia" na stránke produktu s údajmi:

- Obsah environmentálneho tvrdenia
- Názov a číslo certifikátu
- Dátum platnosti certifikátu
- Ikonu certifikátu (ak je rozpoznaná - napr. EU Ecolabel)

Sekcia sa zobrazí v záložke "Doplňujúce informácie" alebo ako samostatná záložka (na nastavenie v konfigurácii).

## Konfigurácia

Nastavenia modulu: **WooCommerce > Nastavenia > Polski > Životné prostredie**.

| Možnosť | Popis | Predvolená hodnota |
|-------|------|------------------|
| Zapnúť modul | Aktivuje environmentálne polia | Nie |
| Pozícia zobrazenia | Kde zobrazovať informáciu na stránke produktu | Záložka "Doplňujúce informácie" |
| Notifikácia o vypršaní | Koľko dní pred vypršaním odoslať notifikáciu | 30 |
| Automatické skrývanie | Skryť tvrdenie po vypršaní certifikátu | Áno |

## Hromadná správa

### Export CSV

Environmentálne údaje sú v exporte produktov WooCommerce. Doplnkové stĺpce:

- `env_claim_basis` - základ tvrdenia
- `env_certificate` - certifikát
- `env_expiry_date` - dátum platnosti (formát YYYY-MM-DD)

### Import CSV

Pripravte súbor CSV so zodpovedajúcimi hlavičkami a importujte štandardnou cestou WooCommerce.

### Filtrovanie produktov

V zozname produktov môžete filtrovať podľa stavu tvrdenia:

- Všetky produkty s tvrdením
- Produkty s vypršaným certifikátom
- Produkty s certifikátom vypršajúcim do 30 dní
- Produkty bez certifikátu (ale s tvrdením)

## Osvedčené postupy

1. **Buďte konkrétni** - namiesto "eko obal" napíšte "obal vyrobený zo 100 % z recyklovaného kartónu, certifikát FSC č. XXXX"
2. **Uvádzajte zdroje** - odvolávajte sa na konkrétne testy, správy, certifikáty
3. **Aktualizujte údaje** - nastavte notifikácie o vypršaní certifikátov a obnovujte ich včas
4. **Vyhýbajte sa všeobecnostiam** - smernica zakazuje tvrdenia, ktoré nemožno overiť
5. **Porovnania musia byť poctivé** - porovnávajte tie isté kategórie produktov, používajte tú istú metodológiu

## Riešenie problémov

**Environmentálne polia sa nezobrazujú v úprave produktu**
Zapnite modul v **WooCommerce > Nastavenia > Polski > Moduly** a skontrolujte, či je možnosť "Zapnúť modul" zaškrtnutá v environmentálnych nastaveniach.

**Tvrdenie zmizlo zo stránky produktu**
Skontrolujte dátum platnosti certifikátu. Po vypršaní sa tvrdenie automaticky skryje. Obnovte certifikát a aktualizujte dátum.

**Nedostávam notifikácie o vypršajúcich certifikátoch**
Skontrolujte, či WP-Cron funguje. Notifikácie sa odosielajú cron úlohou. Na serveroch s vypnutým WP-Cron nakonfigurujte systémový cron.

## Ďalšie kroky

- Nahlasujte problémy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskusie a otázky: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Táto stránka má výlučne informačný charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
