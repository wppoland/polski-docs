---
title: NIP na pokladni
description: Validácia čísla NIP s kontrolným súčtom, overenie v API GUS REGON a automatické sťahovanie firemných údajov na stránke pokladne WooCommerce.
---

Firemní zákazníci zadávajúci objednávky v internetových obchodoch potrebujú možnosť uviesť číslo NIP, aby dostali faktúru s DPH. Plugin Polski for WooCommerce pridáva pole NIP na stránku pokladne s úplnou validáciou - od kontrolného súčtu po overenie v databáze GUS REGON s automatickým doplnením firemných údajov.

## Funkcionality

Modul NIP ponúka tri úrovne overenia:

1. **Validácia formátu** - kontrola, či číslo pozostáva z 10 číslic
2. **Validácia kontrolného súčtu** - algoritmus overenia kontrolnej číslice NIP
3. **Overenie GUS REGON** - kontrola v databáze Hlavného štatistického úradu s automatickým stiahnutím firemných údajov

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski > Pokladňa** a nakonfigurujte sekciu "NIP".

### Základné nastavenia

| Nastavenie | Predvolená hodnota | Popis |
|------------|-----------------|------|
| Zapnúť pole NIP | Áno | Pridá pole NIP na stránku pokladne |
| Pole povinné | Nie | Či je NIP povinný |
| Pozícia poľa | Za poľom firmy | Kde zobraziť pole NIP |
| Validácia kontrolného súčtu | Áno | Kontroluje správnosť čísla NIP |
| Overenie GUS REGON | Nie | Overuje NIP v databáze GUS |
| Automatické doplnenie | Áno | Sťahuje firemné údaje z GUS |

### Podmienené zobrazovanie

Pole NIP môže byť zobrazované:

- **Vždy** - viditeľné pre všetkých zákazníkov
- **Po zaškrtnutí checkboxu "Chcem faktúru"** - zobrazí sa po zaškrtnutí
- **Po vyplnení názvu firmy** - zobrazí sa, keď pole "Firma" je vyplnené

Odporúčaná možnosť je zobrazovanie po zaškrtnutí checkboxu "Chcem faktúru" - je to najčitateľnejšie pre zákazníka.

## Validácia kontrolného súčtu

Algoritmus validácie NIP je založený na systéme váh. Kontrolná číslica (posledná, desiata číslica) sa vypočíta na základe deviatich predchádzajúcich číslic.

### Algoritmus

Váhy pre jednotlivé číslice NIP: `6, 5, 7, 2, 3, 4, 5, 6, 7`

```
NIP: 1234567890
Suma = 1*6 + 2*5 + 3*7 + 4*2 + 5*3 + 6*4 + 7*5 + 8*6 + 9*7 = 214
Zvyšok = 214 mod 11
Ak zvyšok == posledná číslica NIP → NIP správny
```

Plugin vykonáva túto validáciu na strane klienta (JavaScript) aj na strane servera (PHP). Serverová validácia je vždy aktívna - nie je ju možné obísť vypnutím JavaScriptu.

### Obsluha vstupných formátov

Plugin akceptuje NIP v rôznych formátoch:

- `1234567890` - len číslice
- `123-456-78-90` - s pomlčkami
- `123 456 78 90` - s medzerami
- `PL1234567890` - s prefixom krajiny

Všetky formáty sú normalizované na 10 číslic pred validáciou.

## Overenie GUS REGON

### Konfigurácia API

API GUS REGON vyžaduje prístupový kľúč. Plugin podporuje dve prostredia:

| Prostredie | URL | Kľúč | Použitie |
|------------|-----|-------|-------------|
| Testovacie | `https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnwordbir.svc` | `abcde12345abcde12345` (verejný testovací kľúč) | Vývoj a testovanie |
| Produkčné | `https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnetrzny.svc` | Vlastný kľúč z GUS | Prevádzkovaný obchod |

### Získanie produkčného kľúča

1. Prejdite na stránku: https://api.stat.gov.pl/Home/BirIndex
2. Zaregistrujte sa a prihláste
3. Podajte žiadosť o prístup k API REGON
4. Kľúč bude zaslaný na uvedenú e-mailovú adresu (čakacia doba: 1-3 pracovné dni)

### Konfigurácia v plugine

1. Prejdite do **WooCommerce > Nastavenia > Polski > Pokladňa > NIP**
2. Zapnite **Overenie GUS REGON**
3. Vyberte prostredie: **Testovacie** alebo **Produkčné**
4. Vložte API kľúč (pre produkčné prostredie)
5. Uložte nastavenia

### Testovací režim

V testovacom režime plugin používa verejný testovací kľúč GUS. Testovacia databáza obsahuje fiktívne údaje - neslúži na overenie skutočných čísiel NIP. Používajte ho výlučne počas vývoja a testovania integrácie.

## Automatické sťahovanie firemných údajov

Po overení NIP v GUS REGON plugin automaticky doplní polia formulára:

| Pole WooCommerce | Údaje z GUS |
|-----------------|------------|
| Firma (company) | Názov firmy |
| Adresa 1 | Ulica a číslo |
| Mesto | Mesto |
| PSČ | PSČ |
| Vojvodstvo | Vojvodstvo |

Zákazník vidí doplnené údaje a môže ich opraviť pred zadaním objednávky.

### Správanie pri automatickom doplnení

- Polia sú doplnené len ak sú prázdne alebo obsahujú skôr stiahnuté údaje z GUS
- Ak zákazník ručne zmenil údaje, plugin neprepíše zmeny
- Zákazník je informovaný hlásením o stiahnutí údajov

## Uchovávanie NIP

Číslo NIP sa ukladá ako metadáta objednávky:

- kľúč: `_billing_nip`
- viditeľné v administračnom paneli objednávky
- dostupné v šablónach e-mailov
- exportovateľné v reportoch

### Zobrazovanie NIP v objednávke

NIP sa automaticky zobrazuje:

- v podrobnostiach objednávky (administračný panel)
- v e-maili potvrdenia objednávky
- na stránke "Môj účet > Objednávky"

## Programový prístup

### Získanie NIP z objednávky

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
    // Dodatkowa logika walidacji
    // np. sprawdzenie na liście zablokowanych NIP-ów
    $blocked_nips = ['0000000000'];

    if (in_array($nip, $blocked_nips, true)) {
        return false;
    }

    return $is_valid;
}, 10, 2);
```

## Najčastejšie problémy

### Overenie GUS vracia chybu

1. Skontrolujte, či API kľúč je správny a aktívny
2. Overte, či server môže nadviazať HTTPS spojenie s api.stat.gov.pl
3. API GUS býva nedostupné - plugin obsluhuje timeout a zobrazuje príslušné hlásenie
4. Uistite sa, že PHP rozšírenie SOAP je nainštalované na serveri

### Pole NIP sa nezobrazuje

1. Skontrolujte, či modul NIP je zapnutý
2. Overte nastavenie podmieneného zobrazovania
3. Vymažte cache (cachovacie pluginy môžu cachovať formulár pokladne)

### Firemné údaje sa nedoplňujú automaticky

1. Skontrolujte konzolu prehliadača na chyby AJAX
2. Overte, či endpoint REST API pluginu je dostupný
3. Uistite sa, že NIP je správny a firma existuje v databáze GUS

## Súvisiace zdroje

- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
