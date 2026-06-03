---
title: Vícekrokový košík
description: Dokumentace vícekrokového košíku Polski PRO for WooCommerce - rozdělení procesu objednávky na kroky, konfigurace, React Checkout Blocks a klasický fallback.
---

Modul rozděluje pokladnu na čtyři kroky: adresa, doprava, platba a souhrn. Zákazník vidí ukazatel postupu a postupně prochází každým krokem.

## Kroky pokladny

Vícekrokový košík se skládá ze čtyř kroků:

| Krok | Výchozí název | Obsah |
|------|----------------|-----------|
| 1 | Adresa | Formulář fakturačních údajů a dodací adresy |
| 2 | Doprava | Výběr způsobu dopravy a možností zásilky |
| 3 | Platba | Výběr způsobu platby a platební údaje |
| 4 | Souhrn | Přehled objednávky, právní checkboxy, tlačítko "Kupuji a platím" |

Zákazník se může vracet bez ztráty dat. Postup dál vyžaduje správné vyplnění aktuálního formuláře.

## Konfigurace

Přejděte do **WooCommerce > Nastavení > Polski > Moduly PRO > Pokladna**.

### Zapnutí modulu

Vícekrokový košík řídí volba:

```
polski_pro_checkout[multistep_enabled]
```

Hodnota `1` zapíná vícekrokové rozvržení, `0` obnovuje výchozí pokladnu WooCommerce.

### Názvy kroků

Výchozí názvy kroků lze změnit v nastavení:

| Nastavení | Výchozí hodnota |
|------------|-----------------|
| Název kroku 1 | Adresa |
| Název kroku 2 | Doprava |
| Název kroku 3 | Platba |
| Název kroku 4 | Souhrn |

Názvy kroků se zobrazují v ukazateli postupu nad formulářem pokladny.

### Validace mezi kroky

Plugin kontroluje data po každém kroku před postupem dál:

- **Krok 1 (Adresa)** - povinná pole: jméno, příjmení, adresa, město, PSČ, telefon, e-mail
- **Krok 2 (Doprava)** - povinný výběr způsobu dopravy
- **Krok 3 (Platba)** - povinný výběr způsobu platby
- **Krok 4 (Souhrn)** - povinné zaškrtnutí povinných právních checkboxů

Chybové zprávy se objevují pod poli.

## Technická implementace

### WooCommerce Checkout Blocks (React)

Pro obchody s WooCommerce Checkout Blocks modul používá React. Integruje se s WooCommerce Store API a nezasahuje do logiky WooCommerce.

### Klasický fallback (shortcode)

Pro klasickou pokladnu (shortcode `[woocommerce_checkout]`) modul používá JavaScriptový fallback - rozděluje formulář na sekce a přidává navigaci.

Klasický fallback:

- nevyžaduje React
- funguje s existujícími šablonami a úpravami pokladny
- obsluhuje stejné čtyři kroky jako verze Blocks
- využívá jQuery k manipulaci s DOM

### Detekce režimu

Plugin sám detekuje typ pokladny (Blocks nebo shortcode) a načte odpovídající verzi. Není třeba nic nastavovat ručně.

## Stylizace

### CSS třída body

Když je vícekrokový košík aktivní, `<body>` dostane třídu:

```
polski-multistep-checkout
```

Díky tomu CSS cílí pouze na stránky s vícekrokovou pokladnou:

```css
body.polski-multistep-checkout .woocommerce-checkout {
    max-width: 720px;
    margin: 0 auto;
}
```

### Třídy kroků

Každý krok dostane vlastní CSS třídu:

```css
.polski-checkout-step { /* společné styly kroků */ }
.polski-checkout-step--active { /* aktivní krok */ }
.polski-checkout-step--completed { /* dokončený krok */ }
.polski-checkout-step--address { /* krok adresy */ }
.polski-checkout-step--shipping { /* krok dopravy */ }
.polski-checkout-step--payment { /* krok platby */ }
.polski-checkout-step--review { /* krok souhrnu */ }
```

### Ukazatel postupu

Ukazatel postupu je element `<ol>` s třídou `.polski-checkout-progress`:

```css
.polski-checkout-progress { /* kontejner ukazatele */ }
.polski-checkout-progress__step { /* jednotlivý krok v ukazateli */ }
.polski-checkout-progress__step--active { /* aktivní krok v ukazateli */ }
.polski-checkout-progress__step--done { /* dokončený krok v ukazateli */ }
```

## Kompatibilita s ostatními moduly

### Právní checkboxy

Právní checkboxy z bezplatné verze se přesunou do kroku 4 (Souhrn). Zákazník je zaškrtne před odesláním objednávky.

### Pole NIP

Pole NIP se zobrazuje v kroku 1 (Adresa), podle nastavení modulu NIP.

### Vlastní pole

Pole přidaná jinými pluginy (např. hook `woocommerce_checkout_fields`) se přesunou do kroků podle sekce:

- `billing_*` - krok 1
- `shipping_*` - krok 2
- `order_*` - krok 4

## Přístupnost (a11y)

Vícekrokový košík podporuje:

- navigaci klávesnicí (Tab, Enter, Escape)
- ARIA atributy (`aria-current`, `aria-label`, `role="tablist"`)
- oznamování změn kroků čtečkami obrazovky
- viditelný fokus na interaktivních prvcích

## Výkon

Skripty a styly se načítají pouze na stránce pokladny. Na jiných stránkách modul nepřidává žádné zdroje. Skripty mají atribut `defer` a neblokují vykreslování.

## Nejčastější problémy

### Pokladna se nerozděluje na kroky

1. Zkontrolujte, zda je volba `polski_pro_checkout[multistep_enabled]` nastavena na `1`
2. Vymažte cache (cache pluginy, CDN, cache prohlížeče)
3. Zkontrolujte konzoli prohlížeče na chyby JavaScriptu
4. Ověřte, zda není konflikt s jinými pluginy upravujícími pokladnu

### Formulář nepřechází do dalšího kroku

1. Zkontrolujte, zda jsou všechna povinná pole vyplněna
2. Ověřte validační zprávy pod poli
3. Zkontrolujte konzoli prohlížeče - chyby AJAX mohou blokovat validaci

### Styly nefungují správně

1. Zkontrolujte, zda je třída `polski-multistep-checkout` přítomna na elementu `<body>`
2. Ověřte, zda styly pluginu nejsou přepisovány šablonou (použijte inspektor)
3. Přidejte vlastní styly s vyšší specifičností selektorů

## Související zdroje

- [Právní checkboxy](/checkout/legal-checkboxes/)
- [NIP na pokladně](/checkout/nip-lookup/)
- [Nahlásit problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
