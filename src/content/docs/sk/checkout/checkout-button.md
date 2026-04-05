---
title: Tlačidlo objednávky s povinnosťou platby
description: Konfigurácia tlačidla "Zamawiam z obowiązkiem zapłaty" vyžadovaného poľským spotrebiteľským právom vo WooCommerce.
---

Poľský zákon o právach spotrebiteľa (čl. 17 ods. 3) vyžaduje, aby tlačidlo finalizujúce objednávku v internetovom obchode bolo jednoznačne označené slovami "zamówienie z obowiązkiem zapłaty" alebo rovnoznačnou formuláciou. Plugin Polski for WooCommerce automaticky mení predvolený text tlačidla WooCommerce na text v súlade s poľským právom.

## Právne požiadavky

V súlade s čl. 17 ods. 3 zákona o právach spotrebiteľa, ktorý implementuje smernicu 2011/83/EÚ:

> "Podnikateľ zabezpečí, aby spotrebiteľ v momente zadávania objednávky výslovne potvrdil, že vie, že objednávka je spojená s povinnosťou platby."

Tlačidlo musí obsahovať formuláciu jednoznačne ukazujúcu na povinnosť platby. Akceptované varianty:

- "Zamawiam z obowiązkiem zapłaty"
- "Zamawiam i płacę"
- "Kupuję i płacę"

Použitie textu typu "Odoslať objednávku", "Objednať" alebo "Potvrdiť" nie je v súlade s právom a môže mať za následok sankcie.

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski > Pokladňa** a nakonfigurujte sekciu "Tlačidlo objednávky".

### Nastavenia

| Nastavenie | Predvolená hodnota | Popis |
|------------|-----------------|------|
| Text tlačidla | Zamawiam z obowiązkiem zapłaty | Text zobrazený na tlačidle |
| Prepísať pre všetky platobné metódy | Áno | Či aplikovať text nezávisle od zvolenej metódy |
| Prepísať text platobných brán | Áno | Či prepísať texty nastavené pluginmi platobných brán |

### Texty per platobná metóda

Niektoré platobné brány (napr. PayPal, Przelewy24) nastavujú vlastné texty tlačidiel. Plugin umožňuje vybrať, či:

1. **Prepísať všetky** - vždy zobrazovať nastavený text (odporúčané)
2. **Zachovať texty brán** - umožniť bránam nastaviť vlastné texty (uistite sa, že sú v súlade s právom)

## Technická implementácia

Plugin upravuje text tlačidla pomocou filtra WooCommerce:

```php
add_filter('woocommerce_order_button_text', function (): string {
    return 'Zamawiam z obowiązkiem zapłaty';
});
```

### Kompatibilita s Block Checkout

Plugin podporuje klasický checkout (shortcód) aj nový Block Checkout (Gutenberg). V prípade Block Checkout sa úprava vykonáva cez:

- filter `woocommerce_order_button_text` (klasický)
- endpoint Store API (Block Checkout)

### Kompatibilita s populárnymi pluginmi

Plugin je kompatibilný s populárnymi platobnými bránami na poľskom trhu:

- Przelewy24
- PayU
- Tpay
- Stripe
- PayPal
- BLIK (cez rôzne brány)

## Prispôsobenie textu

### Zmena textu v nastaveniach

Najjednoduchší spôsob - zmeňte text v **WooCommerce > Nastavenia > Polski > Pokladňa**. Pamätajte, že nový text musí stále obsahovať informáciu o povinnosti platby.

### Zmena textu programovo

```php
add_filter('woocommerce_order_button_text', function (string $text): string {
    return 'Kupuję i płacę';
}, 20);
```

Priorita `20` zabezpečuje, že filter sa vykoná po filtri pluginu (priorita `10`).

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

Tlačidlo zachováva predvolené CSS triedy WooCommerce. Môžete prispôsobiť jeho vzhľad:

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

1. Checkout s rôznymi platobnými metódami
2. Checkout ako hosť a prihlásený používateľ
3. Checkout so zľavovým kupónom (coupon)
4. Checkout s predplatným (ak používate WooCommerce Subscriptions)
5. Mobilný checkout - uistite sa, že text nie je orezaný

## Najčastejšie problémy

### Text tlačidla sa vracia na predvolený "Place order"

Skontrolujte, či:

1. Plugin je aktívny a modul pokladne je zapnutý
2. Žiadny iný plugin neprepíše filter s vyššou prioritou
3. Téma nehardkóduje text tlačidla v šablóne

### Text je orezaný na mobilných zariadeniach

Dlhý text "Zamawiam z obowiązkiem zapłaty" sa nemusí vojsť na úzke obrazovky. Zvážte:

- použitie kratšieho variantu: "Kupuję i płacę"
- prispôsobenie CSS: `white-space: normal` na tlačidle

### Block Checkout nemení text

Uistite sa, že používate najnovšiu verziu pluginu. Staršie verzie nemusia podporovať Block Checkout. Skontrolujte tiež, či WooCommerce Blocks je aktualizovaný.

## Súvisiace zdroje

- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
