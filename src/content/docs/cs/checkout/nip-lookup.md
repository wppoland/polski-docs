---
title: NIP v pokladně
description: Validace čísla NIP kontrolním součtem, ověření v API GUS REGON a automatické načítání údajů o firmě na stránce pokladny WooCommerce.
---

Firemní zákazníci potřebují v pokladně pole NIP, aby získali VAT fakturu. Zásuvný modul Polski for WooCommerce přidává pole NIP s validací kontrolního součtu a ověřením v databázi GUS REGON. Údaje o firmě se doplní automaticky.

## Funkce

Modul NIP ověřuje číslo na třech úrovních:

1. **Validace formátu** - kontrola, zda se číslo skládá z 10 číslic
2. **Validace kontrolního součtu** - algoritmus ověření kontrolní číslice NIP
3. **Ověření GUS REGON** - kontrola v databázi Hlavního statistického úřadu s automatickým načtením údajů o firmě

## Konfigurace

Přejděte do **WooCommerce > Nastavení > Polski > Pokladna** a nakonfigurujte sekci "NIP".

### Základní nastavení

| Nastavení | Výchozí hodnota | Popis |
|------------|-----------------|------|
| Zapnout pole NIP | Ano | Přidá pole NIP na stránku pokladny |
| Pole povinné | Ne | Zda je NIP povinný |
| Pozice pole | Za polem firmy | Kde zobrazit pole NIP |
| Validace kontrolního součtu | Ano | Kontroluje správnost čísla NIP |
| Ověření GUS REGON | Ne | Ověřuje NIP v databázi GUS |
| Automatické doplňování | Ano | Načítá údaje o firmě z GUS |

### Podmíněné zobrazení

Pole NIP může být zobrazeno:

- **Vždy** - viditelné pro všechny zákazníky
- **Po zaškrtnutí pole "Chci fakturu"** - objeví se po zaškrtnutí
- **Po vyplnění názvu firmy** - objeví se, když je pole "Firma" vyplněno

Doporučenou možností je zobrazení po zaškrtnutí pole "Chci fakturu" - je to pro zákazníka nejpřehlednější.

## Validace kontrolního součtu

NIP se validuje systémem vah. Poslední číslice (kontrolní) musí odpovídat výsledku výpočtu z devíti předchozích číslic.

### Algoritmus

Váhy pro jednotlivé číslice NIP: `6, 5, 7, 2, 3, 4, 5, 6, 7`

```
NIP: 1234567890
Suma = 1*6 + 2*5 + 3*7 + 4*2 + 5*3 + 6*4 + 7*5 + 8*6 + 9*7 = 214
Zbytek = 214 mod 11
Pokud zbytek == poslední číslice NIP → NIP správný
```

Zásuvný modul validuje NIP na straně klienta (JavaScript) i serveru (PHP). Serverová validace je vždy aktivní - nelze ji obejít.

### Zpracování vstupních formátů

Zásuvný modul akceptuje NIP v různých formátech:

- `1234567890` - jen číslice
- `123-456-78-90` - s pomlčkami
- `123 456 78 90` - s mezerami
- `PL1234567890` - s prefixem země

Všechny formáty se před validací normalizují na 10 číslic.

## Ověření GUS REGON

### Konfigurace API

API GUS REGON vyžaduje přístupový klíč. Zásuvný modul podporuje dvě prostředí:

| Prostředí | URL | Klíč | Použití |
|------------|-----|-------|-------------|
| Testovací | `https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnwordbir.svc` | `abcde12345abcde12345` (veřejný testovací klíč) | Vývoj a testování |
| Produkční | `https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnetrzny.svc` | Vlastní klíč z GUS | Fungující obchod |

### Získání produkčního klíče

1. Přejděte na stránku: https://api.stat.gov.pl/Home/BirIndex
2. Zaregistrujte se a přihlaste
3. Podejte žádost o přístup k API REGON
4. Klíč bude zaslán na zadanou e-mailovou adresu (čekací doba: 1-3 pracovní dny)

### Konfigurace v zásuvném modulu

1. Přejděte do **WooCommerce > Nastavení > Polski > Pokladna > NIP**
2. Zapněte **Ověření GUS REGON**
3. Vyberte prostředí: **Testovací** nebo **Produkční**
4. Vložte API klíč (pro produkční prostředí)
5. Uložte nastavení

### Testovací režim

Testovací režim používá veřejný klíč GUS. Testovací databáze obsahuje fiktivní data - neověřujete v ní skutečná NIP čísla. Používejte ho jen během tvorby a testování obchodu.

## Automatické načítání údajů o firmě

Po ověření NIP zásuvný modul automaticky doplní pole formuláře:

| Pole WooCommerce | Data z GUS |
|-----------------|------------|
| Firma (company) | Název firmy |
| Adresa 1 | Ulice a číslo |
| Město | Obec |
| PSČ | PSČ |
| Vojvodství | Vojvodství |

Zákazník vidí doplněná data a může je před objednávkou opravit.

### Chování při automatickém doplňování

- Pole se doplní jen pokud jsou prázdná nebo obsahují dříve načtená data z GUS
- Pokud zákazník data ručně změnil, zásuvný modul změny nepřepisuje
- Zákazník je informován zprávou o načtení dat

## Uchovávání NIP

Číslo NIP se ukládá jako metadata objednávky:

- klíč: `_billing_nip`
- viditelný v administraci objednávky
- dostupný v šablonách e-mailů
- exportovatelný v reportech

### Zobrazení NIP v objednávce

NIP se automaticky zobrazuje:

- v podrobnostech objednávky (administrace)
- v e-mailu potvrzení objednávky
- na stránce "Můj účet > Objednávky"

## Programový přístup

### Načtení NIP z objednávky

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
    // Doplňková logika validace
    // např. kontrola na seznamu blokovaných NIP čísel
    $blocked_nips = ['0000000000'];

    if (in_array($nip, $blocked_nips, true)) {
        return false;
    }

    return $is_valid;
}, 10, 2);
```

## Nejčastější problémy

### Ověření GUS vrací chybu

1. Zkontrolujte, zda je API klíč správný a aktivní
2. Ověřte, zda server může navázat HTTPS spojení s api.stat.gov.pl
3. API GUS bývá nedostupné - zásuvný modul obsluhuje timeout a zobrazí odpovídající zprávu
4. Ujistěte se, že je na serveru nainstalováno rozšíření PHP SOAP

### Pole NIP se nezobrazuje

1. Zkontrolujte, zda je modul NIP zapnutý
2. Ověřte nastavení podmíněného zobrazení
3. Vymažte cache (cache zásuvné moduly mohou cachovat formulář pokladny)

### Údaje o firmě se nedoplní automaticky

1. Zkontrolujte konzoli prohlížeče z hlediska chyb AJAX
2. Ověřte, zda je endpoint REST API zásuvného modulu dostupný
3. Ujistěte se, že je NIP správný a firma existuje v databázi GUS

## Související zdroje

- [Nahlásit problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má výhradně informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) dodávaný bez záruky.</div>
