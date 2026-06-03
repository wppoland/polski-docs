---
title: Viackrokový košík
description: Dokumentácia viackrokového košíka Polski PRO for WooCommerce - rozdelenie procesu objednávky na kroky, konfigurácia, React Checkout Blocks a klasický fallback.
---

Modul rozdeľuje pokladňu na štyri kroky: adresa, doprava, platba a súhrn. Zákazník vidí lištu postupu a postupne prechádza každým krokom.

## Kroky pokladne

Viackrokový košík sa skladá zo štyroch krokov:

| Krok | Predvolený názov | Obsah |
|------|----------------|-----------|
| 1 | Adresa | Formulár fakturačných údajov a doručovacej adresy |
| 2 | Doprava | Výber spôsobu doručenia a možností zásielky |
| 3 | Platba | Výber spôsobu platby a platobné údaje |
| 4 | Súhrn | Prehľad objednávky, právne checkboxy, tlačidlo "Kupujem a platím" |

Zákazník sa môže vrátiť späť bez straty údajov. Prechod ďalej vyžaduje správne vyplnenie aktuálneho formulára.

## Konfigurácia

Prejdite na **WooCommerce > Nastavenia > Polski > Moduly PRO > Pokladňa**.

### Zapnutie modulu

Viackrokový košík riadi možnosť:

```
polski_pro_checkout[multistep_enabled]
```

Hodnota `1` zapína viackrokové rozloženie, `0` obnovuje predvolenú pokladňu WooCommerce.

### Názvy krokov

Predvolené názvy krokov je možné zmeniť v nastaveniach:

| Nastavenie | Predvolená hodnota |
|------------|-----------------|
| Názov kroku 1 | Adresa |
| Názov kroku 2 | Doprava |
| Názov kroku 3 | Platba |
| Názov kroku 4 | Súhrn |

Názvy krokov sa zobrazujú v lište postupu nad formulárom pokladne.

### Validácia medzi krokmi

Plugin kontroluje údaje po každom kroku pred prechodom ďalej:

- **Krok 1 (Adresa)** - povinné polia: meno, priezvisko, adresa, mesto, PSČ, telefón, e-mail
- **Krok 2 (Doprava)** - povinný výber spôsobu doručenia
- **Krok 3 (Platba)** - povinný výber spôsobu platby
- **Krok 4 (Súhrn)** - povinné zaškrtnutie povinných právnych checkboxov

Chybové správy sa zobrazujú pod poľami.

## Technická implementácia

### WooCommerce Checkout Blocks (React)

Pre obchody s WooCommerce Checkout Blocks modul používa React. Integruje sa s WooCommerce Store API a nezasahuje do logiky WooCommerce.

### Klasický fallback (shortcode)

Pre klasickú pokladňu (shortcode `[woocommerce_checkout]`) modul používa JavaScript fallback - rozdeľuje formulár na sekcie a pridáva navigáciu.

Klasický fallback:

- nevyžaduje React
- funguje s existujúcimi témami a úpravami pokladne
- obsluhuje rovnaké štyri kroky ako verzia Blocks
- využíva jQuery na manipuláciu s DOM

### Detekcia režimu

Plugin sám zisťuje typ pokladne (Blocks alebo shortcode) a načíta príslušnú verziu. Nie je potrebné nič nastavovať ručne.

## Štýlovanie

### CSS trieda body

Keď je viackrokový košík aktívny, `<body>` dostane triedu:

```
polski-multistep-checkout
```

Vďaka tomu CSS cieli iba na stránky s viackrokovou pokladňou:

```css
body.polski-multistep-checkout .woocommerce-checkout {
    max-width: 720px;
    margin: 0 auto;
}
```

### Triedy krokov

Každý krok dostane vlastnú CSS triedu:

```css
.polski-checkout-step { /* wspólne style kroków */ }
.polski-checkout-step--active { /* aktywny krok */ }
.polski-checkout-step--completed { /* ukończony krok */ }
.polski-checkout-step--address { /* krok adresowy */ }
.polski-checkout-step--shipping { /* krok dostawy */ }
.polski-checkout-step--payment { /* krok płatności */ }
.polski-checkout-step--review { /* krok podsumowania */ }
```

### Lišta postupu

Lišta postupu je element `<ol>` s triedou `.polski-checkout-progress`:

```css
.polski-checkout-progress { /* kontener paska */ }
.polski-checkout-progress__step { /* pojedynczy krok w pasku */ }
.polski-checkout-progress__step--active { /* aktywny krok w pasku */ }
.polski-checkout-progress__step--done { /* ukończony krok w pasku */ }
```

## Kompatibilita s inými modulmi

### Právne checkboxy

Právne checkboxy z bezplatnej verzie sa presunú do kroku 4 (Súhrn). Zákazník ich zaškrtne pred odoslaním objednávky.

### Pole NIP

Pole NIP sa zobrazuje v kroku 1 (Adresa), v súlade s nastaveniami modulu NIP.

### Vlastné polia

Polia pridané inými pluginmi (napr. hook `woocommerce_checkout_fields`) sa presunú do krokov podľa sekcie:

- `billing_*` - krok 1
- `shipping_*` - krok 2
- `order_*` - krok 4

## Prístupnosť (a11y)

Viackrokový košík podporuje:

- navigáciu klávesnicou (Tab, Enter, Escape)
- ARIA atribúty (`aria-current`, `aria-label`, `role="tablist"`)
- ohlasovanie zmien krokov čítačkami obrazovky
- viditeľný fokus na interaktívnych prvkoch

## Výkon

Skripty a štýly sa načítavajú iba na stránke pokladne. Na iných stránkach modul nepridáva zdroje. Skripty majú atribút `defer` a neblokujú vykresľovanie.

## Najčastejšie problémy

### Pokladňa sa nedelí na kroky

1. Skontrolujte, či je možnosť `polski_pro_checkout[multistep_enabled]` nastavená na `1`
2. Vyčistite cache (cache pluginy, CDN, cache prehliadača)
3. Skontrolujte konzolu prehliadača na chyby JavaScript
4. Overte, či nedochádza ku konfliktu s inými pluginmi upravujúcimi pokladňu

### Formulár neprechádza do ďalšieho kroku

1. Skontrolujte, či sú všetky povinné polia vyplnené
2. Overte validačné správy pod poľami
3. Skontrolujte konzolu prehliadača - chyby AJAX môžu blokovať validáciu

### Štýly nefungujú správne

1. Skontrolujte, či je trieda `polski-multistep-checkout` prítomná na elemente `<body>`
2. Overte, či štýly pluginu nie sú prepísané témou (použite inšpektor)
3. Pridajte vlastné štýly s vyššou špecificitou selektorov

## Súvisiace zdroje

- [Právne checkboxy](/checkout/legal-checkboxes/)
- [NIP na pokladni](/checkout/nip-lookup/)
- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informačný charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
