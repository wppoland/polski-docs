---
title: Viackrokový checkout
description: Dokumentácia viackrokového checkoutu Polski PRO for WooCommerce - rozdelenie procesu objednávky na kroky, konfigurácia, React Checkout Blocks a klasický fallback.
---

Modul rozdeľuje pokladňu na štyri kroky: adresa, doručenie, platba a zhrnutie. Zákazník vidí ukazovateľ priebehu a prechádza postupne každým krokom.

## Kroky checkoutu

Viackrokový checkout sa skladá zo štyroch krokov:

| Krok | Predvolený názov | Obsah |
|------|----------------|-----------|
| 1 | Adresa | Formulár fakturačných údajov a dodacej adresy |
| 2 | Doprava | Výber spôsobu dopravy a možností zásielky |
| 3 | Platba | Výber spôsobu platby a platobné údaje |
| 4 | Zhrnutie | Prehľad objednávky, právne checkboxy, tlačidlo "Objednať a zaplatiť" |

Zákazník sa môže vrátiť k predchádzajúcim krokom bez straty zadaných údajov. Prechod na ďalší krok vyžaduje správne vyplnenie aktuálneho formulára.

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski > Moduly PRO > Pokladňa**.

### Zapnutie modulu

Viackrokový checkout je riadený voľbou:

```
polski_pro_checkout[multistep_enabled]
```

Hodnota `1` zapína viackrokový vzhľad, `0` obnoví predvolený checkout WooCommerce.

### Názvy krokov

Predvolené názvy krokov je možné zmeniť v nastaveniach:

| Nastavenie | Predvolená hodnota |
|------------|-----------------|
| Názov kroku 1 | Adresa |
| Názov kroku 2 | Doprava |
| Názov kroku 3 | Platba |
| Názov kroku 4 | Zhrnutie |

Názvy krokov sú zobrazované v ukazovateľi priebehu nad formulárom checkoutu.

### Validácia medzi krokmi

Plugin validuje údaje po každom kroku pred povolením prechodu na ďalší:

- **Krok 1 (Adresa)** - povinné polia: meno, priezvisko, adresa, mesto, PSČ, telefón, e-mail
- **Krok 2 (Doprava)** - povinný výber spôsobu dopravy
- **Krok 3 (Platba)** - povinný výber spôsobu platby
- **Krok 4 (Zhrnutie)** - povinné zaškrtnutie povinných právnych checkboxov

Validačné správy sa zobrazujú inline pod príslušným poľom.

## Technická implementácia

### WooCommerce Checkout Blocks (React)

Pre obchody využívajúce WooCommerce Checkout Blocks (blokový editor) modul používa React na renderovanie krokov. Komponenty sa integrujú s WooCommerce Store API a zachovávajú plnú kompatibilitu s rozšíreniami Checkout Blocks.

Renderovanie prebieha na strane klienta. Plugin sa registruje ako rozšírenie Checkout Blocks a upravuje rozloženie formulára bez zásahu do logiky WooCommerce.

### Klasický fallback (shortcode)

Pre obchody používajúce klasický checkout (shortcode `[woocommerce_checkout]`) modul zabezpečuje JavaScript fallback. Skript rozdelí existujúci formulár na sekcie a pridá navigáciu medzi nimi.

Klasický fallback:

- nevyžaduje React
- funguje s existujúcimi témami a prispôsobeniami checkoutu
- podporuje rovnaké štyri kroky ako verzia Blocks
- využíva jQuery na manipuláciu DOM

### Detekcia režimu

Plugin automaticky zisťuje, či checkout používa Checkout Blocks alebo klasický shortcode, a načíta príslušnú implementáciu. Nevyžaduje manuálnu konfiguráciu režimu.

## Štylizácia

### CSS trieda body

Keď je viackrokový checkout aktívny, k elementu `<body>` sa pridáva trieda:

```
polski-multistep-checkout
```

Umožňuje to cieliť CSS štýly výhradne na stránky s viackrokovým checkoutom:

```css
body.polski-multistep-checkout .woocommerce-checkout {
    max-width: 720px;
    margin: 0 auto;
}
```

### Triedy krokov

Každý krok dostáva vlastnú CSS triedu:

```css
.polski-checkout-step { /* spoločné štýly krokov */ }
.polski-checkout-step--active { /* aktívny krok */ }
.polski-checkout-step--completed { /* dokončený krok */ }
.polski-checkout-step--address { /* adresový krok */ }
.polski-checkout-step--shipping { /* krok dopravy */ }
.polski-checkout-step--payment { /* krok platby */ }
.polski-checkout-step--review { /* krok zhrnutia */ }
```

### Ukazovateľ priebehu

Ukazovateľ priebehu je renderovaný ako element `<ol>` s triedou `.polski-checkout-progress`. Každý prvok zoznamu zodpovedá jednému kroku:

```css
.polski-checkout-progress { /* kontajner ukazovateľa */ }
.polski-checkout-progress__step { /* jednotlivý krok v ukazovateľi */ }
.polski-checkout-progress__step--active { /* aktívny krok v ukazovateľi */ }
.polski-checkout-progress__step--done { /* dokončený krok v ukazovateľi */ }
```

## Kompatibilita s inými modulmi

### Právne checkboxy

Právne checkboxy z bezplatnej verzie Polski for WooCommerce sú automaticky presunuté do kroku 4 (Zhrnutie). Zákazník ich musí zaškrtnúť pred odoslaním objednávky.

### Pole IČ DPH

Pole IČ DPH sa zobrazuje v kroku 1 (Adresa) v súlade s konfiguráciou podmieneného zobrazovania z modulu IČ DPH.

### Vlastné polia

Polia pridané inými pluginmi (napr. cez hook `woocommerce_checkout_fields`) sú automaticky priraďované k príslušnému kroku na základe ich sekcie:

- `billing_*` - krok 1
- `shipping_*` - krok 2
- `order_*` - krok 4

## Prístupnosť (a11y)

Viackrokový checkout podporuje:

- navigáciu klávesnicou (Tab, Enter, Escape)
- atribúty ARIA (`aria-current`, `aria-label`, `role="tablist"`)
- oznamovanie zmien krokov čítačkami obrazovky
- viditeľný fokus na interaktívnych prvkoch

## Výkon

Modul načítava skripty a štýly iba na stránke checkoutu. Na ostatných stránkach obchodu nepridáva žiadne zdroje. Skripty sú načítavané s atribútom `defer`, aby neblokovali renderovanie stránky.

## Najčastejšie problémy

### Checkout sa nerozdeľuje na kroky

1. Skontrolujte, či je voľba `polski_pro_checkout[multistep_enabled]` nastavená na `1`
2. Vymažte cache (pluginy cache, CDN, cache prehliadača)
3. Skontrolujte konzolu prehliadača na JavaScript chyby
4. Overte, či nedochádza ku konfliktu s inými pluginmi modifikujúcimi checkout

### Formulár neprechádza na ďalší krok

1. Skontrolujte, či sú všetky povinné polia vyplnené
2. Overte validačné správy pod poľami
3. Skontrolujte konzolu prehliadača - chyby AJAX môžu blokovať validáciu

### Štýly nefungujú správne

1. Skontrolujte, či je trieda `polski-multistep-checkout` prítomná na elemente `<body>`
2. Overte, či štýly pluginu nie sú prepísané témou (použite inšpektor)
3. Pridajte vlastné štýly s vyššou špecificitou selektorov

## Súvisiace zdroje

- [Právne checkboxy](/checkout/legal-checkboxes/)
- [IČ DPH na checkоute](/checkout/nip-lookup/)
- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
