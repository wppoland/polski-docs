---
title: Průvodce konfigurací
description: Průvodce konfigurací pluginu Polski for WooCommerce. Údaje firmy, právní stránky, checkboxy a automatická konfigurace obchodu krok za krokem.
---

## Co je průvodce konfigurací?

Průvodce vás v několika krocích provede nejdůležitějšími nastaveními pluginu. Místo ručního konfigurování každého modulu odpovídáte na otázky - průvodce nastaví vše za vás.

Průvodce se objeví po první aktivaci pluginu. Pro opětovné spuštění přejděte do **WooCommerce > Polski > Nastavení** a klikněte na **Spustit průvodce znovu**.

:::note[Průvodce nepřepisuje existující data]
Pokud spouštíte průvodce znovu, pole budou vyplněna dříve uloženými daty. Průvodce nesmaže ani nepřepíše data, která nezměníte.
:::

---

## Krok 1: Údaje firmy

Zadejte údaje své firmy. Plugin je používá na právních stránkách, v patičce, v údajích GPSR a na fakturách.

### Povinná pole

| Pole | Popis | Příklad |
|------|------|---------|
| Název firmy | Plný název nebo firma | "Jan Kowalski Sklep Online" |
| Právní forma | Typ podnikání | JDG, sp. z o.o., sp.j., S.A. |
| NIP | Daňové identifikační číslo | 1234567890 |
| REGON | Číslo REGON | 123456789 |
| KRS | Číslo KRS (pokud se týká) | 0000123456 |
| Adresa | Ulice, číslo, PSČ, město | ul. Przykładowa 10, 00-001 Warszawa |
| Kontaktní e-mail | Adresa pro korespondenci | kontakt@mojsklep.pl |
| Telefon | Telefonní číslo | +48 123 456 789 |

### Volitelná pole

- **Číslo bankovního účtu** - pro zobrazení na fakturách a v obchodních podmínkách
- **Registrační orgán** - např. "Sąd Rejonowy dla m.st. Warszawy"
- **Základní kapitál** - vyžadovaný pro společnosti (např. "5 000,00 zł")
- **Jméno a příjmení zástupce** - osoba oprávněná k zastupování

### Validace NIP

Průvodce automaticky kontroluje správnost NIP:

- Kontroluje kontrolní součet (váhový algoritmus)
- Volitelně stahuje data z API GUS (CEIDG/KRS) k porovnání

Pokud je NIP nesprávný, uvidíte varovnou zprávu. Můžete pokračovat, ale doporučujeme číslo opravit.

### Příklad konfigurace

Pro fyzickou osobu podnikatele:

```
Název firmy: Jan Kowalski E-Commerce
Právní forma: Fyzická osoba podnikatel
NIP: 1234567890
REGON: 123456789
KRS: (prázdné - netýká se JDG)
Adresa: ul. Handlowa 5/10, 31-001 Kraków
E-mail: sklep@kowalski-ecommerce.pl
Telefon: +48 500 600 700
```

Pro společnost s ručením omezeným:

```
Název firmy: SuperSklep sp. z o.o.
Právní forma: Společnost s ručením omezeným
NIP: 9876543210
REGON: 987654321
KRS: 0000654321
Adresa: ul. Biznesowa 22, 00-100 Warszawa
E-mail: biuro@supersklep.pl
Telefon: +48 22 123 45 67
Základní kapitál: 50 000,00 zł
Registrační orgán: Sąd Rejonowy dla m.st. Warszawy, XII Wydział Gospodarczy KRS
```

Klikněte na **Dále**, abyste přešli k dalšímu kroku.

---

## Krok 2: Právní stránky

Průvodce vám pomůže vytvořit vyžadované právní stránky. Každý polský obchod by měl mít alespoň:

- **Obchodní podmínky** - pravidla používání obchodu a uzavírání smluv
- **Zásady ochrany osobních údajů** - informace o zpracování osobních údajů (GDPR)
- **Zásady vrácení zboží** - postup a formulář odstoupení od smlouvy

### Generování stránek

Průvodce nabízí dva přístupy:

**Možnost A - vygenerovat nové stránky (doporučeno pro nové obchody)**

1. Zaškrtněte stránky, které chcete vygenerovat
2. Průvodce vytvoří stránky WordPress s vyplněným obsahem na základě údajů firmy
3. Obsah vychází ze šablon založených na polských předpisech

**Možnost B - přiřadit existující stránky**

1. Pokud již máte vytvořené právní stránky, vyberte je z rozbalovacího seznamu
2. Průvodce je přiřadí k odpovídajícím nastavením WooCommerce

### Šablony právních stránek

Generované stránky obsahují sekce vyžadované polským právem. Příklad struktury obchodních podmínek:

```
1. Obecná ustanovení
2. Definice
3. Pravidla používání obchodu
4. Postup podávání objednávek
5. Ceny a metody platby
6. Dodání
7. Právo na odstoupení od smlouvy
8. Reklamace a záruka
9. Osobní údaje
10. Závěrečná ustanovení
```

:::caution[Šablony vyžadují personalizaci]
Vygenerované stránky jsou výchozím bodem, nikoli hotovým právním dokumentem. Projděte si obsah a přizpůsobte ho svému obchodu. V případě pochybností se poraďte s právníkem na e-commerce.
:::

### Shortcody na právních stránkách

Právní stránky používají shortcody, které automaticky vkládají údaje firmy:

```
[polski_company_name]        - název firmy
[polski_company_nip]         - NIP
[polski_company_regon]       - REGON
[polski_company_krs]         - KRS
[polski_company_address]     - adresa firmy
[polski_company_email]       - kontaktní e-mail
[polski_company_phone]       - telefon
[polski_withdrawal_period]   - lhůta na odstoupení (výchozí 14 dní)
```

Když změníte údaje firmy v nastavení, právní stránky se automaticky aktualizují.

Příklad použití v obsahu obchodních podmínek:

```
Vlastníkem internetového obchodu je [polski_company_name],
NIP: [polski_company_nip], REGON: [polski_company_regon],
se sídlem na adrese: [polski_company_address].

Kontakt: [polski_company_email], tel. [polski_company_phone].
```

Výsledek na stránce:

```
Vlastníkem internetového obchodu je Jan Kowalski E-Commerce,
NIP: 1234567890, REGON: 123456789,
se sídlem na adrese: ul. Handlowa 5/10, 31-001 Kraków.

Kontakt: sklep@kowalski-ecommerce.pl, tel. +48 500 600 700.
```

Klikněte na **Dále**, abyste přešli ke konfiguraci checkboxů.

---

## Krok 3: Checkboxy na stránce pokladny

Nakonfigurujte checkboxy na stránce pokladny (checkout). Polské právo vyžaduje, aby zákazník před dokončením objednávky přijal obchodní podmínky.

### Výchozí checkboxy

Průvodce navrhuje sadu checkboxů odpovídající typickým požadavkům:

**Checkbox 1 - obchodní podmínky (povinný)**

```
Obsah: Přečetl/a jsem si a přijímám [obchodní podmínky obchodu].
Vyžadováno: Ano
Odkaz: /obchodni-podminky/
Pozice: Před tlačítkem objednávky
```

**Checkbox 2 - zásady ochrany osobních údajů (povinný)**

```
Obsah: Seznámil/a jsem se se [zásadami ochrany osobních údajů].
Vyžadováno: Ano
Odkaz: /zasady-ochrany-osobnich-udaju/
Pozice: Před tlačítkem objednávky
```

**Checkbox 3 - právo na odstoupení (povinný)**

```
Obsah: Seznámil/a jsem se s [poučením o právu na odstoupení od smlouvy]
         a [vzorem formuláře odstoupení].
Vyžadováno: Ano
Odkaz: /zasady-vraceni-zbozi/
Pozice: Před tlačítkem objednávky
```

**Checkbox 4 - newsletter (volitelný)**

```
Obsah: Chci dostávat informace o novinkách a akcích
       na uvedenou e-mailovou adresu.
Vyžadováno: Ne
Pozice: Po povinných checkboxech
```

### Úprava checkboxů

Každý checkbox můžete přizpůsobit:

- **Obsah** - text zobrazený vedle checkboxu (podporuje HTML pro odkazy)
- **Vyžadováno** - zda je zaškrtnutí nutné k dokončení objednávky
- **Pozice** - kde na stránce pokladny checkbox zobrazit
- **Chybová zpráva** - text zobrazený, když zákazník nezaškrtne povinný checkbox

### Přidávání vlastních checkboxů

Klikněte na **Přidat checkbox**, abyste vytvořili další. Užitečné scénáře:

- Souhlas se zpracováním dat pro marketingové účely
- Prohlášení o dosažení 18 let (obchody s alkoholem)
- Souhlas s telefonickým kontaktem
- Potvrzení seznámení s kartou produktu (potravinové produkty)

### Pozice checkboxů

Dostupné pozice na stránce pokladny:

| Pozice | Popis |
|---------|------|
| `before_order_button` | Před tlačítkem "Objednávám s povinností platby" |
| `after_order_button` | Po tlačítku objednávky |
| `after_billing_form` | Po formuláři platebních údajů |
| `after_shipping_form` | Po formuláři dodacích údajů |
| `before_payment_methods` | Před výběrem metody platby |

Klikněte na **Dále**, abyste přešli k souhrnu.

---

## Krok 4: Aktivace modulů

Průvodce navrhne moduly k zapnutí na základě vašich odpovědí:

### Doporučené moduly (automaticky zaškrtnuté)

- Omnibus - sledování historie cen
- Tlačítko objednávky - text v souladu se zákonem
- Právní checkboxy - nakonfigurované v předchozím kroku
- Právní stránky - vygenerované v kroku 2
- Právo na odstoupení - formulář a poučení
- Doba dodání - informace na kartě produktu
- GPSR - údaje o bezpečnosti produktu

### Volitelné moduly (k ručnímu zaškrtnutí)

- Vyhledávání NIP - pokud prodáváte firmám (B2B)
- Výživové hodnoty - pokud prodáváte potraviny
- Alergeny - pokud prodáváte potraviny
- Seznam přání - pokud chcete tuto funkci v obchodě
- Porovnávač - pokud máte produkty k porovnávání
- DSA - pokud provozujete marketplace

Zaškrtněte moduly, které chcete zapnout, a klikněte na **Dále**.

---

## Krok 5: Souhrn a uplatnění

Poslední krok zobrazuje souhrn nastavení:

```
Údaje firmy:
  Název: Jan Kowalski E-Commerce
  NIP: 1234567890
  Adresa: ul. Handlowa 5/10, 31-001 Kraków

Právní stránky:
  Obchodní podmínky: Budou vytvořeny (nová stránka)
  Zásady ochrany osobních údajů: Budou vytvořeny (nová stránka)
  Zásady vrácení zboží: Budou vytvořeny (nová stránka)

Checkboxy: 4 (3 povinné, 1 volitelný)

Moduly k aktivaci: 7
  - Omnibus
  - Tlačítko objednávky
  - Právní checkboxy
  - Právní stránky
  - Právo na odstoupení
  - Doba dodání
  - GPSR
```

Zkontrolujte souhrn a klikněte na **Uplatnit konfiguraci**. Průvodce:

1. Uloží údaje firmy v nastavení pluginu
2. Vytvoří právní stránky (pokud bylo vybráno generování)
3. Přiřadí stránky k nastavení WooCommerce
4. Nakonfiguruje checkboxy na stránce pokladny
5. Aktivuje vybrané moduly

Po dokončení uvidíte potvrzovací zprávu a odkaz na dashboard souladu.

---

## Po dokončení průvodce

### Zkontrolujte stránku produktu

Otevřete libovolný produkt ve svém obchodě a zkontrolujte, zda se objevily nové prvky:

- Informace o nejnižší ceně (Omnibus) - viditelná u produktů se zlevněním
- Odhadovaná doba dodání
- Údaje GPSR (výrobce, odpovědná osoba)

### Zkontrolujte stránku pokladny

Přidejte produkt do košíku a přejděte do pokladny:

- Zkontrolujte, zda se checkboxy zobrazují správně
- Zkontrolujte, zda má tlačítko text "Objednávám s povinností platby"
- Zkuste dokončit objednávku bez zaškrtnutí checkboxů - měla by se objevit chybová zpráva

### Zkontrolujte právní stránky

Otevřete vygenerované stránky a zkontrolujte jejich obsah:

- Zda jsou údaje firmy správné (shortcody by měly zobrazovat aktuální data)
- Zda je struktura dokumentu kompletní
- Zda interní odkazy fungují

### Dashboard souladu

Přejděte do **WooCommerce > Polski > Soulad** - po správné konfiguraci by většina indikátorů měla být zelená. Prvky vyžadující další pozornost budou označeny žlutým stavem s instrukcí, co je třeba doplnit.

---

## Opětovné spuštění průvodce

Průvodce lze kdykoli spustit znovu:

1. Přejděte do **WooCommerce > Polski > Nastavení**
2. Klikněte na **Spustit průvodce znovu**
3. Pole budou vyplněna dříve uloženými daty
4. Změňte, co potřebujete, a klikněte na **Uplatnit konfiguraci**

Průvodce nesmaže právní stránky ani neresetuje moduly nakonfigurované ručně.

---

## Řešení problémů

### Právní stránky nebyly vytvořeny

- Zkontrolujte, zda má váš účet WordPress oprávnění administrátora
- Zkontrolujte, zda je v **Nastavení > Trvalé odkazy** nastaven jiný formát než "Prostý"
- Zkuste vytvořit stránky ručně a přiřadit je v **WooCommerce > Nastavení > Pokročilé > Nastavení stránek**

### Checkboxy se nezobrazují v pokladně

- Ujistěte se, že je modul "Právní checkboxy" aktivní v **WooCommerce > Polski > Moduly**
- Pokud používáte vlastní šablonu pokladny, zkontrolujte, zda podporuje hooky WooCommerce
- Vyčistěte cache cachovacích pluginů (WP Super Cache, W3 Total Cache, LiteSpeed Cache)

### Průvodce se nespustí

- Vyčistěte cache prohlížeče a zkuste to znovu
- Zkontrolujte konzoli prohlížeče (F12) z hlediska chyb JavaScriptu
- Dočasně deaktivujte jiné pluginy, které mohou způsobovat konflikt

Problém nezmizí? Nahlaste ho na [GitHub Issues](https://github.com/wppoland/polski/issues) s popisem a snímkem obrazovky. Můžete se také zeptat na [GitHub Discussions](https://github.com/wppoland/polski/discussions).

<div class="disclaimer">Tato stránka má výhradně informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) dodávaný bez záruky.</div>
