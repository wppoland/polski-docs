---
title: Pruvodce konfiguraci
description: Pruvodce konfiguraci pluginu Polski for WooCommerce. Udaje firmy, pravni stranky, checkboxy a automaticka konfigurace obchodu krok za krokem.
---

## Co je pruvodce konfiguraci?

Pruvodce konfiguraci je nastroj, ktery vas provede nejdulezitejsimi nastavenimi pluginu v nekolika jednoduchych krocich. Misto rucni konfigurace kazdeho modulu pruvodce klada otazky a automaticky nastavi prislusne moznosti.

Pruvodce je dostupny po prvni aktivaci pluginu. Muzete jej take spustit znovu kdykoli - prejdete do **WooCommerce > Polski > Nastaveni** a kliknete na tlacitko **Spustit pruvodce znovu**.

:::note[Pruvodce neprepisuje existujici data]
Pokud spoustite pruvodce znovu, pole budou vyplnena drive ulozenymi daty. Pruvodce neodstrani ani neprepise data, ktera nezmenite.
:::

---

## Krok 1: Udaje firmy

Prvnim krokem je doplneni zakladnich udaju vasi firmy. Tyto udaje jsou vyuzivany na mnoha mistech - na pravnich strankach, v paticce, v datech GPSR a na fakturach.

### Povinna pole

| Pole | Popis | Priklad |
|------|------|---------|
| Nazev firmy | Uplny nazev nebo obchodni firma | "Jan Kowalski Sklep Online" |
| Pravni forma | Typ podnikani | JDG, sp. z o.o., sp.j., S.A. |
| NIP | Danove identifikacni cislo | 1234567890 |
| REGON | Cislo REGON | 123456789 |
| KRS | Cislo KRS (pokud se tyka) | 0000123456 |
| Adresa | Ulice, cislo, PSC, mesto | ul. Przykładowa 10, 00-001 Warszawa |
| Kontaktni e-mail | Adresa pro korespondenci | kontakt@mojsklep.pl |
| Telefon | Telefonni cislo | +48 123 456 789 |

### Volitelna pole

- **Cislo bankovniho uctu** - pro zobrazeni na fakturach a v obchodnich podminkach
- **Registracni organ** - napr. "Sąd Rejonowy dla m.st. Warszawy"
- **Zakladni kapital** - vyzadovano pro spolecnosti (napr. "5 000,00 PLN")
- **Jmeno a prijmeni zastupce** - osoba opravnena k zastupovani

### Validace NIP

Pruvodce automaticky overuje spravnost cisla NIP:

- Kontroluje kontrolni soucet (vahovy algoritmus)
- Volitelne stahuje data z API GUS (CEIDG/KRS) pro porovnani

Pokud je NIP nespravny, uvidite varovnou zpravu. Muzete pokracovat, ale doporucujeme cislo opravit.

### Priklad konfigurace

Pro zivnostnika:

```
Nazev firmy: Jan Kowalski E-Commerce
Pravni forma: Jednoosobowa działalność gospodarcza
NIP: 1234567890
REGON: 123456789
KRS: (prazdne - netyka se zivnostniku)
Adresa: ul. Handlowa 5/10, 31-001 Kraków
E-mail: sklep@kowalski-ecommerce.pl
Telefon: +48 500 600 700
```

Pro spolecnost s rucenim omezenym:

```
Nazev firmy: SuperSklep sp. z o.o.
Pravni forma: Spółka z ograniczoną odpowiedzialnością
NIP: 9876543210
REGON: 987654321
KRS: 0000654321
Adresa: ul. Biznesowa 22, 00-100 Warszawa
E-mail: biuro@supersklep.pl
Telefon: +48 22 123 45 67
Zakladni kapital: 50 000,00 PLN
Registracni organ: Sąd Rejonowy dla m.st. Warszawy, XII Wydział Gospodarczy KRS
```

Kliknete **Dalsi** pro prechod k dalsimu kroku.

---

## Krok 2: Pravni stranky

V tomto kroku vam pruvodce pomuze vytvorit zakonem vyzadovane stranky. Kazdy polsky internetovy obchod by mel mit alespon:

- **Obchodni podminky** - pravidla vyuzivani obchodu a uzavirani smluv
- **Zasady ochrany osobnich udaju** - informace o zpracovani osobnich udaju (GDPR)
- **Zasady vraceni zbozi** - postup a formular pro odstoupeni od smlouvy

### Generovani stranek

Pruvodce nabizi dva pristupy:

**Moznost A - vygenerujte nove stranky (doporuceno pro nove obchody)**

1. Zaznacte stranky, ktere chcete vygenerovat
2. Pruvodce vytvori stranky WordPress s vyplnenym obsahem na zaklade udaju firmy
3. Obsah vychazi ze sablon v souladu s polskym pravem

**Moznost B - priradte existujici stranky**

1. Pokud jiz mate vytvorene pravni stranky, vyberte je z rozbalovacieho seznamu
2. Pruvodce je priradi k prislusnym nastavenim WooCommerce

### Sablony pravnich stranek

Generovane stranky obsahuji sekce vyzadovane polskym pravem. Priklad struktury obchodnich podminek:

```
1. Obecna ustanoveni
2. Definice
3. Pravidla vyuzivani obchodu
4. Postup skladani objednavek
5. Ceny a platebni metody
6. Doruceani
7. Pravo na odstoupeni od smlouvy
8. Reklamace a zaruka
9. Osobni udaje
10. Zaverecna ustanoveni
```

:::caution[Sablony vyzaduji personalizaci]
Vygenerovane stranky jsou vychozim bodem, nikoli hotovym pravnim dokumentem. Projdete obsah a prizpusobte jej specifickym okolnostem vaseho obchodu. V pripade pochybnosti konzultujte obsah s pravnikem specializujicim se na e-commerce.
:::

### Shortcody na pravnich strankach

Na generovanych strankach jsou vyuzivany shortcody, ktere automaticky vkladaji udaje firmy:

```
[polski_company_name]        - nazev firmy
[polski_company_nip]         - NIP
[polski_company_regon]       - REGON
[polski_company_krs]         - KRS
[polski_company_address]     - adresa firmy
[polski_company_email]       - kontaktni e-mail
[polski_company_phone]       - telefon
[polski_withdrawal_period]   - lhuta pro odstoupeni (vychozi 14 dni)
```

Diky shortcodum se pri zmene udaju firmy v nastaveni pluginu pravni stranky automaticky aktualizuji.

Priklad pouziti v textu obchodnich podminek:

```
Vlastnikem internetoveho obchodu je [polski_company_name],
NIP: [polski_company_nip], REGON: [polski_company_regon],
se sidlem na adrese: [polski_company_address].

Kontakt: [polski_company_email], tel. [polski_company_phone].
```

Vysledek na strance:

```
Vlastnikem internetoveho obchodu je Jan Kowalski E-Commerce,
NIP: 1234567890, REGON: 123456789,
se sidlem na adrese: ul. Handlowa 5/10, 31-001 Kraków.

Kontakt: sklep@kowalski-ecommerce.pl, tel. +48 500 600 700.
```

Kliknete **Dalsi** pro prechod ke konfiguraci checkboxu.

---

## Krok 3: Checkboxy na strance pokladny

V tomto kroku nakonfigurujete povinne checkboxy zobrazovane na strance pokladny (checkout). Polske pravo vyzaduje, aby zakaznik souhlasil s obchodnimi podminkami pred slozenim objednavky.

### Vychozi checkboxy

Pruvodce navrhuje sadu checkboxu odpovidajicich typickym pozadavkum:

**Checkbox 1 - obchodni podminky (povinny)**

```
Obsah: Precetl/a jsem a prijimam [obchodni podminky].
Povinny: Ano
Odkaz: /obchodni-podminky/
Pozice: Pred tlacitkem objednavky
```

**Checkbox 2 - zasady ochrany osobnich udaju (povinny)**

```
Obsah: Seznamil/a jsem se se [zasadami ochrany osobnich udaju].
Povinny: Ano
Odkaz: /zasady-ochrany-osobnich-udaju/
Pozice: Pred tlacitkem objednavky
```

**Checkbox 3 - pravo na odstoupeni (povinny)**

```
Obsah: Seznamil/a jsem se s [poucenim o pravu na odstoupeni od smlouvy]
         a [vzorem formulare odstoupeni].
Povinny: Ano
Odkaz: /zasady-vraceni/
Pozice: Pred tlacitkem objednavky
```

**Checkbox 4 - newsletter (volitelny)**

```
Obsah: Chci dostavat informace o novinkach a akcich
       na zadanou e-mailovou adresu.
Povinny: Ne
Pozice: Za povinnymi checkboxy
```

### Editace checkboxu

Kazdy checkbox muzete prizpusobit:

- **Obsah** - text zobrazovany u checkboxu (podporuje HTML pro odkazy)
- **Povinny** - zda je zaznaceni nutne pro slozeni objednavky
- **Pozice** - kde na strance pokladny zobrazit checkbox
- **Chybova zprava** - text zobrazovany, kdyz zakaznik nezaskrtne povinny checkbox

### Pridani vlastnich checkboxu

Kliknete **Pridat checkbox** pro vytvoreni dalsiho. Uzitecne scenare:

- Souhlas se zpracovanim dat pro marketingove ucely
- Prohlaseni o dovrseni 18 let (obchody s alkoholem)
- Souhlas s telefonickym kontaktem
- Potvrzeni seznameni se s kartou produktu (potraviny)

### Pozice checkboxu

Dostupne pozice na strance pokladny:

| Pozice | Popis |
|---------|------|
| `before_order_button` | Pred tlacitkem "Objednavka se zavazkem platby" |
| `after_order_button` | Za tlacitkem objednavky |
| `after_billing_form` | Za formularem platebnich udaju |
| `after_shipping_form` | Za formularem dodacich udaju |
| `before_payment_methods` | Pred vyberem platebni metody |

Kliknete **Dalsi** pro prechod k souhrnu.

---

## Krok 4: Aktivace modulu

Na zaklade vasich odpovedi pruvodce navrhne seznam modulu k aktivaci:

### Doporucene moduly (automaticky zaznacene)

- Omnibus - sledovani historie cen
- Tlacitko objednavky - text v souladu s pravem
- Pravni checkboxy - nakonfigurovane v predchozim kroku
- Pravni stranky - vygenerovane v kroku 2
- Pravo na odstoupeni - formular a pouceni
- Doba dodani - informace na strance produktu
- GPSR - udaje o bezpecnosti produktu

### Volitelne moduly (k rucnimu zaznaceni)

- Vyhledavani NIP - pokud prodavate firmam (B2B)
- Vyzivove hodnoty - pokud prodavate potraviny
- Alergeny - pokud prodavate potraviny
- Wishlist - pokud chcete tuto funkci v obchode
- Porovnavac - pokud mate produkty k porovnani
- DSA - pokud provozujete marketplace

Zaznacte moduly, ktere chcete aktivovat, a kliknete **Dalsi**.

---

## Krok 5: Souhrn a pouziti

Posledni krok zobrazuje souhrn vsech nastaveni:

```
Udaje firmy:
  Nazev: Jan Kowalski E-Commerce
  NIP: 1234567890
  Adresa: ul. Handlowa 5/10, 31-001 Kraków

Pravni stranky:
  Obchodni podminky: Budou vytvoreny (nova stranka)
  Zasady ochrany osobnich udaju: Budou vytvoreny (nova stranka)
  Zasady vraceni: Budou vytvoreny (nova stranka)

Checkboxy: 4 (3 povinne, 1 volitelny)

Moduly k aktivaci: 7
  - Omnibus
  - Tlacitko objednavky
  - Pravni checkboxy
  - Pravni stranky
  - Pravo na odstoupeni
  - Doba dodani
  - GPSR
```

Zkontrolujte souhrn a kliknete **Pouzit konfiguraci**. Pruvodce:

1. Ulozi udaje firmy v nastaveni pluginu
2. Vytvori pravni stranky (pokud bylo zvoleno generovani)
3. Priradi stranky k nastavenim WooCommerce
4. Nakonfiguruje checkboxy na strance pokladny
5. Aktivuje vybrane moduly

Po dokonceni uvidite potvrzujici zpravu a odkaz na dashboard souladu.

---

## Po dokonceni pruvodce

### Zkontrolujte stranku produktu

Otevrte libovolny produkt v obchode a zkontrolujte, zda se objevily nove elementy:

- Informace o nejnizsi cene (Omnibus) - viditelna u produktu ve sleve
- Odhadovana doba dodani
- Udaje GPSR (vyrobce, odpovedna osoba)

### Zkontrolujte stranku pokladny

Pridejte produkt do kosiku a prejdete k pokladne:

- Zkontrolujte, zda se checkboxy zobrazuji spravne
- Zkontrolujte, zda ma tlacitko text "Zamawiam z obowiązkiem zapłaty"
- Zkuste slozit objednavku bez zaznaceni checkboxu - mel by se objevit chybovy oznam

### Zkontrolujte pravni stranky

Otevrte vygenerovane stranky a zkontrolujte jejich obsah:

- Zda jsou udaje firmy spravne (shortcody by mely zobrazovat aktualni data)
- Zda je struktura dokumentu kompletni
- Zda funguji interni odkazy

### Dashboard souladu

Prejdete do **WooCommerce > Polski > Soulad** - po spravne konfiguraci by vetsina ukazatelu mela byt zelena. Elementy vyzadujici dalsi pozornost budou oznaceny zlutym stavem s instrukci, co je treba doplnit.

---

## Opetovne spusteni pruvodce

Pruvodce lze spustit znovu kdykoli:

1. Prejdete do **WooCommerce > Polski > Nastaveni**
2. Kliknete **Spustit pruvodce znovu**
3. Pole budou vyplnena drive ulozenymi daty
4. Zmente, co potrebujete, a kliknete **Pouzit konfiguraci**

Pruvodce neodstrani pravni stranky ani neresetuje moduly, ktere jste jiz rucne nakonfigurovali.

---

## Reseni problemu

### Pravni stranky nebyly vytvoreny

- Zkontrolujte, zda ma vas ucet WordPress opravneni administratora
- Zkontrolujte, zda je v **Nastaveni > Trvalé odkazy** nastaven format jiny nez "Jednoduchy"
- Zkuste vytvorit stranky rucne a priradit je v **WooCommerce > Nastaveni > Pokrocile > Nastaveni stranky**

### Checkboxy se nezobrazuji na pokladne

- Ujistete se, ze modul "Pravni checkboxy" je aktivni v **WooCommerce > Polski > Moduly**
- Pokud pouzivate nestandardni sablonu pokladny, zkontrolujte zda podporuje hooky WooCommerce
- Vymažte cache cachovacich pluginu (WP Super Cache, W3 Total Cache, LiteSpeed Cache)

### Pruvodce se nespousti

- Vymažte cache prohlizece a zkuste znovu
- Zkontrolujte konzoli prohlizece (F12) na chyby JavaScriptu
- Docasne deaktivujte jine pluginy, ktere mohou zpusobovat konflikt

Pokud problem pretrva, nahlaste jej na [GitHub Issues](https://github.com/wppoland/polski/issues) s popisem problemu a snimkem obrazovky. Komunita rada pomuze na [GitHub Discussions](https://github.com/wppoland/polski/discussions).

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
