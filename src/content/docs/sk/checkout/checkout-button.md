---
title: Tlačidlo objednávky s povinnosťou platby
description: Konfigurácia tlačidla "Objednávam s povinnosťou platby" vyžadovaného poľským spotrebiteľským právom vo WooCommerce.
---

Poľské právo vyžaduje, aby tlačidlo objednávky obsahovalo text "objednávka s povinnosťou platby" alebo podobný. Doplnok Polski for WooCommerce automaticky mení predvolený text tlačidla WooCommerce.

## Právne požiadavky

Tlačidlo musí jasne uvádzať povinnosť platby. Akceptované varianty:

- "Objednávam s povinnosťou platby"
- "Objednávam a platím"
- "Kupujem a platím"

Texty "Vytvoriť objednávku", "Objednať" alebo "Potvrdiť" nespĺňajú požiadavky a hrozia za ne pokuty.

![Stránka pokladne s právnymi zaškrtávacími poľami a tlačidlom objednávky](../../../../assets/screenshots/screenshot-3-checkout-checkboxes.png)

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski > Pokladňa** a nakonfigurujte sekciu "Tlačidlo objednávky".

### Nastavenia

| Nastavenie | Predvolená hodnota | Popis |
|------------|-----------------|------|
| Text tlačidla | Objednávam s povinnosťou platby | Text zobrazený na tlačidle |
| Prepísať pre všetky platobné metódy | Áno | Či používať text bez ohľadu na vybranú metódu |
| Prepísať text platobných brán | Áno | Či prepisovať texty nastavené doplnkami platobných brán |

### Texty podľa platobnej metódy

Niektoré platobné brány (napr. PayPal, Przelewy24) nastavujú vlastné texty tlačidiel. Doplnok umožňuje vybrať:

1. **Prepísať všetky** - vždy zobrazuje nastavený text (odporúčané)
2. **Zachovať texty brán** - umožňuje bránam nastavovať vlastné texty (uistite sa, že sú v súlade s právom)

## Technická implementácia

Doplnok mení text tlačidla filtrom WooCommerce:

```php
add_filter('woocommerce_order_button_text', function (): string {
    return 'Zamawiam z obowiązkiem zapłaty';
});
```

### Kompatibilita s Block Checkout

Doplnok funguje s klasickou pokladňou (shortcode) aj Block Checkout (Gutenberg). Block Checkout využíva:

- filter `woocommerce_order_button_text` (klasický)
- endpoint Store API (Block Checkout)

### Kompatibilita s populárnymi doplnkami

Doplnok funguje s populárnymi platobnými bránami v Poľsku:

- Przelewy24
- PayU
- Tpay
- Stripe
- PayPal
- BLIK (cez rôzne brány)

## Prispôsobenie textu

### Zmena textu v nastaveniach

Zmeňte text v **WooCommerce > Nastavenia > Polski > Pokladňa**. Nový text musí naďalej informovať o povinnosti platby.

### Zmena textu programovo

```php
add_filter('woocommerce_order_button_text', function (string $text): string {
    return 'Kupuję i płacę';
}, 20);
```

Priorita `20` zabezpečuje, že filter sa vykoná po filtri doplnku (priorita `10`).

### Text závislý od platobnej metódy

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

## Štýlovanie tlačidla

Tlačidlo používa predvolené CSS triedy WooCommerce. Prispôsobte jeho vzhľad:

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

Pre Block Checkout:

```css
.wc-block-components-checkout-place-order-button {
    background-color: #2e7d32;
    font-weight: 700;
}
```

## Testovanie

Po konfigurácii skontrolujte tlačidlo v nasledujúcich scenároch:

1. Pokladňa s rôznymi platobnými metódami
2. Pokladňa ako hosť a prihlásený používateľ
3. Pokladňa so zľavovým kupónom (coupon)
4. Pokladňa s predplatným (ak používate WooCommerce Subscriptions)
5. Mobilná pokladňa - uistite sa, že text nie je orezaný

## Najčastejšie problémy

### Text tlačidla sa vracia na predvolený "Place order"

Skontrolujte, či:

1. Doplnok je aktívny a modul pokladne je zapnutý
2. Žiadny iný doplnok neprepisuje filter s vyššou prioritou
3. Téma nemá natvrdo zakódovaný text tlačidla v šablóne

### Text je orezaný na mobilných zariadeniach

Text "Objednávam s povinnosťou platby" sa nemusí zmestiť na malé obrazovky. Riešenia:

- použitie kratšieho variantu: "Kupujem a platím"
- prispôsobenie CSS: `white-space: normal` na tlačidle

### Block Checkout nemení text

Skontrolujte, či máte najnovšiu verziu doplnku. Staršie verzie nemusia podporovať Block Checkout. Aktualizujte aj WooCommerce Blocks.

## Súvisiace zdroje

- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informatívny charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
