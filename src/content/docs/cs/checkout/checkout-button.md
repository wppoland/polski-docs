---
title: Tlacitko objednavky se zavazkem platby
description: Konfigurace tlacitka "Zamawiam z obowiązkiem zapłaty" vyzadovaneho polskym spotrebitelskym pravem ve WooCommerce.
---

Polsky zakon o pravech spotrebitele (cl. 17 odst. 3) vyzaduje, aby tlacitko finalizujici objednavku v internetovem obchode bylo jednoznacne oznaceno slovy "objednavka se zavazkem platby" nebo rovnocennym formulovanim. Plugin Polski for WooCommerce automaticky meni vychozi text tlacitka WooCommerce na text v souladu s polskym pravem.

## Pravni pozadavky

Podle cl. 17 odst. 3 zakona o pravech spotrebitele, ktery implementuje smernici 2011/83/EU:

> "Przedsiębiorca zapewnia, aby konsument w momencie składania zamówienia wyraźnie potwierdził, że wie, iż zamówienie pociąga za sobą obowiązek zapłaty."

Tlacitko musi obsahovat formulaci jednoznacne ukazujici na zavazek platby. Akceptovane varianty:

- "Zamawiam z obowiązkiem zapłaty"
- "Zamawiam i płacę"
- "Kupuję i płacę"

Pouziti textu typu "Slozit objednavku", "Objednat" nebo "Potvrdit" je v rozporu s pravem a muze vest k sankcim.

## Konfigurace

Prejdete do **WooCommerce > Nastaveni > Polski > Pokladna** a nakonfigurujte sekci "Tlacitko objednavky".

### Nastaveni

| Nastaveni | Vychozi hodnota | Popis |
|------------|-----------------|------|
| Text tlacitka | Zamawiam z obowiązkiem zapłaty | Text zobrazovany na tlacitku |
| Prepsat pro vsechny platebni metody | Ano | Zda pouzit text nezavisle na zvolene metode |
| Prepsat texty platebnich bran | Ano | Zda prepsat texty nastavene pluginy platebnich bran |

### Texty dle platebni metody

Nektere platebni brany (napr. PayPal, Przelewy24) nastavuji vlastni texty tlacitek. Plugin umoznuje zvolit, zda:

1. **Prepsat vse** - vzdy zobrazuje nastaveny text (doporuceno)
2. **Zachovat texty bran** - umoznuje branam nastavovat vlastni texty (ujistete se, ze jsou v souladu s pravem)

## Technicka implementace

Plugin upravuje text tlacitka pomoci filtru WooCommerce:

```php
add_filter('woocommerce_order_button_text', function (): string {
    return 'Zamawiam z obowiązkiem zapłaty';
});
```

### Kompatibilita s Block Checkout

Plugin podporuje jak klasicky checkout (shortcode), tak novy Block Checkout (Gutenberg). V pripade Block Checkout se uprava provadi pres:

- filtr `woocommerce_order_button_text` (klasicky)
- endpoint Store API (Block Checkout)

### Kompatibilita s popularnimi pluginy

Plugin je kompatibilni s popularnimi platebnimi branami na polskem trhu:

- Przelewy24
- PayU
- Tpay
- Stripe
- PayPal
- BLIK (pres ruzne brany)

## Prizpusobeni textu

### Zmena textu v nastaveních

Nejjednodussi zpusob - zmente text v **WooCommerce > Nastaveni > Polski > Pokladna**. Pamatujte, ze novy text musi stale obsahovat informaci o zavazku platby.

### Zmena textu programove

```php
add_filter('woocommerce_order_button_text', function (string $text): string {
    return 'Kupuję i płacę';
}, 20);
```

Priorita `20` zajistuje, ze filtr bude proveden po filtru pluginu (priorita `10`).

### Text zavisly na platebni metode

```php
add_filter('woocommerce_order_button_text', function (string $text): string {
    $chosen_payment = WC()->session->get('chosen_payment_method');

    if ($chosen_payment === 'bacs') {
        return 'Zamawiam z obowiązkiem zapłaty przelewem';
    }

    if ($chosen_payment === 'cod') {
        return 'Zamawiam z obowiązkiem zapłaty przy odbiorze';
    }

    return 'Zamawiam z obowiązkiem zapłaty';
}, 20);
```

## Stylovani tlacitka

Tlacitko zachovava vychozi CSS tridy WooCommerce. Muzete prizpusobit jeho vzhled:

```css
#place_order {
    background-color: #2e7d32;
    font-size: 1.1em;
    font-weight: 700;
    padding: 0.8em 2em;
    text-transform: none;
}

#place_order:hover {
    background-color: #1b5e20;
}
```

Pro Block Checkout:

```css
.wc-block-components-checkout-place-order-button {
    background-color: #2e7d32;
    font-weight: 700;
}
```

## Testovani

Po konfiguraci zkontrolujte tlacitko v nasledujicich scenarech:

1. Checkout s ruznymi platebnimi metodami
2. Checkout jako host i prihlaseny uzivatel
3. Checkout se slevovym kuponem (coupon)
4. Checkout s predplatnym (pokud pouzivate WooCommerce Subscriptions)
5. Mobilni checkout - ujistete se, ze text neni oriznuly

## Nejcastejsi problemy

### Text tlacitka se vraci na vychozi "Place order"

Zkontrolujte, zda:

1. Plugin je aktivni a modul pokladny je aktivovan
2. Zadny jiny plugin neprepisuje filtr s vyssi prioritou
3. Motiv nema pevne nakodovany text tlacitka v sablone

### Text je oriznuly na mobilnich zarizenich

Dlouhy text "Zamawiam z obowiązkiem zapłaty" se nemusi vejit na uzke obrazovky. Zvazite:

- pouziti kratsiho variantu: "Kupuję i płacę"
- prizpusobeni CSS: `white-space: normal` na tlacitku

### Block Checkout nemeni text

Ujistete se, ze pouzivate nejnovejsi verzi pluginu. Starsi verze nemusi podporovat Block Checkout. Zkontrolujte take, zda je WooCommerce Blocks aktualizovan.

## Souvisejici zdroje

- [Nahlasit problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
