---
title: Tlačítko objednávky s povinností platby
description: Konfigurace tlačítka "Objednávám s povinností platby" vyžadovaného polským spotřebitelským právem ve WooCommerce.
---

Polské právo vyžaduje, aby tlačítko objednávky obsahovalo text "objednávka s povinností platby" nebo podobný. Zásuvný modul Polski for WooCommerce automaticky mění výchozí text tlačítka WooCommerce.

## Právní požadavky

Tlačítko musí jasně poukazovat na povinnost platby. Akceptované varianty:

- "Objednávám s povinností platby"
- "Objednávám a platím"
- "Kupuji a platím"

Texty "Odeslat objednávku", "Objednat" nebo "Potvrdit" nesplňují požadavky a hrozí za ně sankce.

![Stránka pokladny s právními zaškrtávacími poli a tlačítkem objednávky](../../../../assets/screenshots/screenshot-3-checkout-checkboxes.png)

## Konfigurace

Přejděte do **WooCommerce > Nastavení > Polski > Pokladna** a nakonfigurujte sekci "Tlačítko objednávky".

### Nastavení

| Nastavení | Výchozí hodnota | Popis |
|------------|-----------------|------|
| Text tlačítka | Objednávám s povinností platby | Text zobrazený na tlačítku |
| Přepsat pro všechny platební metody | Ano | Zda použít text bez ohledu na zvolenou metodu |
| Přepsat texty platebních bran | Ano | Zda přepisovat texty nastavené zásuvnými moduly platebních bran |

### Texty podle platební metody

Některé platební brány (např. PayPal, Przelewy24) nastavují vlastní texty tlačítek. Zásuvný modul umožňuje zvolit:

1. **Přepsat všechny** - vždy zobrazí nastavený text (doporučeno)
2. **Zachovat texty bran** - umožní branám nastavit vlastní texty (ujistěte se, že jsou v souladu s právem)

## Technická implementace

Zásuvný modul mění text tlačítka filtrem WooCommerce:

```php
add_filter('woocommerce_order_button_text', function (): string {
    return 'Zamawiam z obowiązkiem zapłaty';
});
```

### Kompatibilita s Block Checkout

Zásuvný modul funguje s klasickou pokladnou (shortcode) i Block Checkout (Gutenberg). Block Checkout využívá:

- filtr `woocommerce_order_button_text` (klasický)
- endpoint Store API (Block Checkout)

### Kompatibilita s oblíbenými zásuvnými moduly

Zásuvný modul funguje s oblíbenými platebními branami v Polsku:

- Przelewy24
- PayU
- Tpay
- Stripe
- PayPal
- BLIK (přes různé brány)

## Přizpůsobení textu

### Změna textu v nastavení

Změňte text v **WooCommerce > Nastavení > Polski > Pokladna**. Nový text musí nadále informovat o povinnosti platby.

### Změna textu programově

```php
add_filter('woocommerce_order_button_text', function (string $text): string {
    return 'Kupuję i płacę';
}, 20);
```

Priorita `20` zajišťuje, že se filtr vykoná po filtru zásuvného modulu (priorita `10`).

### Text závislý na platební metodě

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

## Stylování tlačítka

Tlačítko používá výchozí CSS třídy WooCommerce. Přizpůsobte jeho vzhled:

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

## Testování

Po konfiguraci zkontrolujte tlačítko v následujících scénářích:

1. Pokladna s různými platebními metodami
2. Pokladna jako host i přihlášený uživatel
3. Pokladna se slevovým kupónem (coupon)
4. Pokladna s předplatným (pokud používáte WooCommerce Subscriptions)
5. Mobilní pokladna - ujistěte se, že text není oříznutý

## Nejčastější problémy

### Text tlačítka se vrací na výchozí "Place order"

Zkontrolujte, zda:

1. Zásuvný modul je aktivní a modul pokladny je zapnutý
2. Žádný jiný zásuvný modul nepřepisuje filtr s vyšší prioritou
3. Šablona motivu nemá text tlačítka napevno v kódu

### Text je oříznutý na mobilních zařízeních

Text "Objednávám s povinností platby" se nemusí vejít na malé obrazovky. Řešení:

- použití kratší varianty: "Kupuji a platím"
- úprava CSS: `white-space: normal` na tlačítku

### Block Checkout nemění text

Zkontrolujte, zda máte nejnovější verzi zásuvného modulu. Starší verze nemusí Block Checkout podporovat. Aktualizujte také WooCommerce Blocks.

## Související zdroje

- [Nahlásit problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má výhradně informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) dodávaný bez záruky.</div>
