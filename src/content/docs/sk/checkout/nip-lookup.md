---
title: NIP v pokladni
description: Validácia čísla NIP s kontrolným súčtom, overenie v API GUS REGON a automatické načítanie údajov firmy na stránke pokladne WooCommerce.
---

Firemní zákazníci potrebujú pole NIP v pokladni, aby získali faktúru DPH. Doplnok Polski for WooCommerce pridáva pole NIP s validáciou kontrolného súčtu a overením v databáze GUS REGON. Údaje firmy sa dopĺňajú automaticky.

## Funkcionality

Modul NIP overuje číslo na troch úrovniach:

1. **Validácia formátu** - kontrola, či sa číslo skladá z 10 číslic
2. **Validácia kontrolného súčtu** - algoritmus overenia kontrolnej číslice NIP
3. **Overenie GUS REGON** - kontrola v databáze Hlavného štatistického úradu s automatickým načítaním údajov firmy

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski > Pokladňa** a nakonfigurujte sekciu "NIP".

### Základné nastavenia

| Nastavenie | Predvolená hodnota | Popis |
|------------|-----------------|------|
| Zapnúť pole NIP | Áno | Pridáva pole NIP na stránku pokladne |
| Pole povinné | Nie | Či je NIP povinný |
| Pozícia poľa | Za poľom firmy | Kde zobraziť pole NIP |
| Validácia kontrolného súčtu | Áno | Kontroluje správnosť čísla NIP |
| Overenie GUS REGON | Nie | Overuje NIP v databáze GUS |
| Automatické dopĺňanie | Áno | Načítava údaje firmy z GUS |

### Podmienené zobrazenie

Pole NIP môže byť zobrazené:

- **Vždy** - viditeľné pre všetkých zákazníkov
- **Po zaškrtnutí poľa "Chcem faktúru"** - objaví sa po zaškrtnutí
- **Po zadaní názvu firmy** - objaví sa, keď je pole "Firma" vyplnené

Odporúčaná možnosť je zobrazenie po zaškrtnutí poľa "Chcem faktúru" - je to najprehľadnejšie pre zákazníka.

## Validácia kontrolného súčtu

NIP je validovaný systémom váh. Posledná číslica (kontrolná) musí zodpovedať výsledku výpočtu z deviatich predchádzajúcich číslic.

### Algoritmus

Váhy pre jednotlivé číslice NIP: `6, 5, 7, 2, 3, 4, 5, 6, 7`

```
NIP: 1234567890
Súčet = 1*6 + 2*5 + 3*7 + 4*2 + 5*3 + 6*4 + 7*5 + 8*6 + 9*7 = 214
Zvyšok = 214 mod 11
Ak zvyšok == posledná číslica NIP → NIP je správny
```

Doplnok validuje NIP na strane klienta (JavaScript) aj servera (PHP). Serverová validácia je vždy aktívna - nedá sa obísť.

### Obsluha vstupných formátov

Doplnok akceptuje NIP v rôznych formátoch:

- `1234567890` - len číslice
- `123-456-78-90` - s pomlčkami
- `123 456 78 90` - s medzerami
- `PL1234567890` - s prefixom krajiny

Všetky formáty sú normalizované na 10 číslic pred validáciou.

## Overenie GUS REGON

### Konfigurácia API

API GUS REGON vyžaduje prístupový kľúč. Doplnok podporuje dve prostredia:

| Prostredie | URL | Kľúč | Použitie |
|------------|-----|-------|-------------|
| Testovacie | `https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnwordbir.svc` | `abcde12345abcde12345` (verejný testovací kľúč) | Vývoj a testovanie |
| Produkčné | `https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnetrzny.svc` | Vlastný kľúč z GUS | Fungujúci obchod |

### Získanie produkčného kľúča

1. Prejdite na stránku: https://api.stat.gov.pl/Home/BirIndex
2. Zaregistrujte sa a prihláste
3. Podajte žiadosť o prístup k API REGON
4. Kľúč bude odoslaný na zadanú e-mailovú adresu (čas čakania: 1-3 pracovné dni)

### Konfigurácia v doplnku

1. Prejdite do **WooCommerce > Nastavenia > Polski > Pokladňa > NIP**
2. Zapnite **Overenie GUS REGON**
3. Vyberte prostredie: **Testovacie** alebo **Produkčné**
4. Vložte kľúč API (pre produkčné prostredie)
5. Uložte nastavenia

### Testovací režim

Testovací režim využíva verejný kľúč GUS. Testovacia databáza obsahuje fiktívne údaje - neoveríte v nej skutočné čísla NIP. Používajte ho len počas vytvárania a testovania obchodu.

## Automatické načítanie údajov firmy

Po overení NIP doplnok automaticky dopĺňa polia formulára:

| Pole WooCommerce | Údaje z GUS |
|-----------------|------------|
| Firma (company) | Názov firmy |
| Adresa 1 | Ulica a číslo |
| Mesto | Obec |
| PSČ | PSČ |
| Vojvodstvo | Vojvodstvo |

Zákazník vidí doplnené údaje a môže ich opraviť pred objednávkou.

### Správanie pri automatickom dopĺňaní

- Polia sú dopĺňané len ak sú prázdne alebo obsahujú skôr načítané údaje z GUS
- Ak zákazník ručne zmenil údaje, doplnok zmeny neprepisuje
- Zákazník je informovaný oznamom o načítaní údajov

## Uchovávanie NIP

Číslo NIP sa ukladá ako metadáta objednávky:

- kľúč: `_billing_nip`
- viditeľný v administračnom paneli objednávky
- dostupný v šablónach e-mailov
- exportovateľný v reportoch

### Zobrazenie NIP v objednávke

NIP sa zobrazuje automaticky:

- v detailoch objednávky (administračný panel)
- v e-maile s potvrdením objednávky
- na stránke "Môj účet > Objednávky"

## Programový prístup

### Načítanie NIP z objednávky

```php
$order = wc_get_order($order_id);
$nip = $order->get_meta('_billing_nip');
```

### Validácia NIP v PHP

```php
function validate_nip(string $nip): bool {
    $nip = preg_replace('/[^0-9]/', '', $nip);

    if (strlen($nip) !== 10) {
        return false;
    }

    $weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
    $sum = 0;

    for ($i = 0; $i < 9; $i++) {
        $sum += (int) $nip[$i] * $weights[$i];
    }

    return ($sum % 11) === (int) $nip[9];
}
```

### Hook validácie

```php
add_filter('polski/checkout/validate_nip', function (bool $is_valid, string $nip): bool {
    // Doplnková logika validácie
    // napr. kontrola v zozname zablokovaných NIP
    $blocked_nips = ['0000000000'];

    if (in_array($nip, $blocked_nips, true)) {
        return false;
    }

    return $is_valid;
}, 10, 2);
```

## Najčastejšie problémy

### Overenie GUS vracia chybu

1. Skontrolujte, či je kľúč API správny a aktívny
2. Overte, či server dokáže nadviazať HTTPS spojenie s api.stat.gov.pl
3. API GUS býva nedostupné - doplnok obsluhuje timeout a zobrazuje príslušný oznam
4. Uistite sa, že rozšírenie PHP SOAP je nainštalované na serveri

### Pole NIP sa nezobrazuje

1. Skontrolujte, či je modul NIP zapnutý
2. Overte nastavenie podmieneného zobrazenia
3. Vyčistite cache (cachovacie doplnky môžu cachovať formulár pokladne)

### Údaje firmy sa nedopĺňajú automaticky

1. Skontrolujte konzolu prehliadača kvôli chybám AJAX
2. Overte, či je endpoint REST API doplnku dostupný
3. Uistite sa, že NIP je správny a firma existuje v databáze GUS

## Súvisiace zdroje

- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informatívny charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
