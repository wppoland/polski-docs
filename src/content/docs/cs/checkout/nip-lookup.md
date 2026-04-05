---
title: NIP na pokladne
description: Validace cisla NIP s kontrolnim souctem, overeni v API GUS REGON a automaticke stahovani udaju firmy na strance pokladny WooCommerce.
---

Firemni zakaznici potrebuji pole NIP na pokladne pro ziskani faktury s DPH. Plugin pridava pole NIP s validaci kontrolniho souctu a overenim v bazi GUS REGON. Udaje firmy se doplni automaticky.

## Funkce

Modul NIP nabizi tri urovne overeni:

1. **Validace formatu** - kontrola, zda cislo sestava z 10 cislic
2. **Validace kontrolniho souctu** - algoritmus overeni kontrolni cislice NIP
3. **Overeni GUS REGON** - kontrola v databazi Hlavniho statistickeho uradu s automatickym stazenim udaju firmy

## Konfigurace

Prejdete do **WooCommerce > Nastaveni > Polski > Pokladna** a nakonfigurujte sekci "NIP".

### Zakladni nastaveni

| Nastaveni | Vychozi hodnota | Popis |
|------------|-----------------|------|
| Aktivovat pole NIP | Ano | Pridava pole NIP na stranku pokladny |
| Pole povinne | Ne | Zda je NIP povinny |
| Pozice pole | Za polem firmy | Kde zobrazit pole NIP |
| Validace kontrolniho souctu | Ano | Kontroluje spravnost cisla NIP |
| Overeni GUS REGON | Ne | Overuje NIP v databazi GUS |
| Automaticke doplnovani | Ano | Stahuje udaje firmy z GUS |

### Podminene zobrazeni

Pole NIP muze byt zobrazeno:

- **Vzdy** - viditelne pro vsechny zakazniky
- **Po zaznaceni checkboxu "Chci fakturu"** - objevi se po zaznaceni
- **Po vyplneni nazvu firmy** - objevi se, kdyz pole "Firma" je vyplneno

Doporucena moznost je zobrazeni po zaznaceni checkboxu "Chci fakturu" - je to nejprehlednejsi pro zakaznika.

## Validace kontrolniho souctu

Algoritmus validace NIP je zalozen na systemu vah. Kontrolni cislice (posledni, desata cislice) je vypocitana na zaklade deviti predchozich cislic.

### Algoritmus

Vahy pro jednotlive cislice NIP: `6, 5, 7, 2, 3, 4, 5, 6, 7`

```
NIP: 1234567890
Suma = 1*6 + 2*5 + 3*7 + 4*2 + 5*3 + 6*4 + 7*5 + 8*6 + 9*7 = 214
Zbytek = 214 mod 11
Pokud zbytek == posledni cislice NIP → NIP spravny
```

Plugin provadi tuto validaci jak na strane klienta (JavaScript), tak na strane serveru (PHP). Serverova validace je vzdy aktivni - nelze ji obejit deaktivaci JavaScriptu.

### Obsluha vstupnich formatu

Plugin akceptuje NIP v ruznych formatech:

- `1234567890` - same cislice
- `123-456-78-90` - s pomlckami
- `123 456 78 90` - s mezerami
- `PL1234567890` - s prefixem zeme

Vsechny formaty jsou normalizovany na 10 cislic pred validaci.

## Overeni GUS REGON

### Konfigurace API

API GUS REGON vyzaduje pristupovy klic. Plugin podporuje dve prostredi:

| Prostredi | URL | Klic | Pouziti |
|------------|-----|-------|-------------|
| Testovaci | `https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnwordbir.svc` | `abcde12345abcde12345` (verejny testovaci klic) | Vyvoj a testovani |
| Produkcni | `https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnetrzny.svc` | Vlastni klic z GUS | Fungujici obchod |

### Ziskani produkcniho klice

1. Prejdete na stranku: https://api.stat.gov.pl/Home/BirIndex
2. Zaregistrujte se a prihlaste
3. Podejte zadost o pristup k API REGON
4. Klic bude zaslan na zadanou e-mailovou adresu (doba cekani: 1-3 pracovni dny)

### Konfigurace v pluginu

1. Prejdete do **WooCommerce > Nastaveni > Polski > Pokladna > NIP**
2. Aktivujte **Overeni GUS REGON**
3. Zvolte prostredi: **Testovaci** nebo **Produkcni**
4. Vlozte klic API (pro produkcni prostredi)
5. Ulozte nastaveni

### Testovaci rezim

V testovacim rezimu plugin pouziva verejny testovaci klic GUS. Testovaci databaze obsahuje fiktivni data - neslouzi k overeni skutecnych cisel NIP. Pouzivejte jej vyhradne behem vyvoje a testovani integrace.

## Automaticke stahovani udaju firmy

Po overeni NIP v GUS REGON plugin automaticky doplni pole formulare:

| Pole WooCommerce | Data z GUS |
|-----------------|------------|
| Firma (company) | Nazev firmy |
| Adresa 1 | Ulice a cislo |
| Mesto | Mesto |
| PSC | PSC |
| Kraj | Vojvodstvi |

Zakaznik vidi doplnene udaje a muze je opravit pred slozenim objednavky.

### Chovani pri automatickem doplnovani

- Pole jsou doplnovana pouze pokud jsou prazdna nebo obsahuji drive stazena data z GUS
- Pokud zakaznik rucne zmenil udaje, plugin zmeny neprepisuje
- Zakaznik je informovan zpravou o stazeni dat

## Uchovavani NIP

Cislo NIP je ukladano jako metadata objednavky:

- klic: `_billing_nip`
- viditelne v administracnim panelu objednavky
- dostupne v sablonach e-mailu
- exportovatelne v reportech

### Zobrazeni NIP v objednavce

NIP je automaticky zobrazovan:

- v detailech objednavky (administracni panel)
- v e-mailu potvrzeni objednavky
- na strance "Muj ucet > Objednavky"

## Programaticky pristup

### Ziskani NIP z objednavky

```php
$order = wc_get_order($order_id);
$nip = $order->get_meta('_billing_nip');
```

### Validace NIP v PHP

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

### Hook validace

```php
add_filter('polski/checkout/validate_nip', function (bool $is_valid, string $nip): bool {
    // Doplnkova logika validace
    $blocked_nips = ['0000000000'];

    if (in_array($nip, $blocked_nips, true)) {
        return false;
    }

    return $is_valid;
}, 10, 2);
```

## Nejcastejsi problemy

### Overeni GUS vraci chybu

1. Zkontrolujte, zda klic API je spravny a aktivni
2. Overite, zda server muze navazat HTTPS spojeni s api.stat.gov.pl
3. API GUS byva nedostupne - plugin obsluhuje timeout a zobrazuje prislusnou zpravu
4. Ujistete se, ze rozsireni PHP SOAP je nainstalovano na serveru

### Pole NIP se nezobrazuje

1. Zkontrolujte, zda je modul NIP aktivovan
2. Overite nastaveni podmineného zobrazeni
3. Vymažte cache (cachovaci pluginy mohou cachovat formular pokladny)

### Udaje firmy se nedoplnuji automaticky

1. Zkontrolujte konzoli prohlizece na chyby AJAX
2. Overite, zda endpoint REST API pluginu je dostupny
3. Ujistete se, ze NIP je spravny a firma existuje v databazi GUS

## Souvisejici zdroje

- [Nahlasit problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
