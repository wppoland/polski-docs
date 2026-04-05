---
title: Právne checkboxy
description: Konfigurácia, validácia a personalizácia povinných právnych checkboxov na stránke pokladne WooCommerce.
---

Pred zadaním objednávky musí zákazník akceptovať obchodné podmienky a zásady ochrany osobných údajov. Plugin Polski for WooCommerce pridáva právne checkboxy s konfiguráciou obsahu, validáciou a chybovými hláseniami.

## Právne požiadavky

V súlade so zákonom o právach spotrebiteľa a zákonom o poskytovaní služieb elektronickou cestou musí internetový obchod získať od spotrebiteľa výslovný súhlas na:

- obchodné podmienky (podmienky kúpnej zmluvy)
- zásady ochrany osobných údajov (spracovanie osobných údajov)
- právo na odstúpenie od zmluvy (informácia o 14-dňovej lehote)

Súhlasy musia byť vyjadrené aktívne (checkbox nesmie byť štandardne zaškrtnutý) a osobitne pre každý účel.

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski > Pokladňa** a nakonfigurujte sekciu "Právne checkboxy".

### Predvolené checkboxy

Plugin pridáva nasledujúce checkboxy:

| Checkbox | Povinný | Predvolený obsah |
|----------|----------|----------------|
| Obchodné podmienky | Áno | Oboznámil/a som sa s [obchodnými podmienkami] a akceptujem ich ustanovenia. |
| Zásady ochrany osobných údajov | Áno | Oboznámil/a som sa so [zásadami ochrany osobných údajov] a súhlasím so spracovaním mojich osobných údajov. |
| Právo na odstúpenie | Áno | Bol/a som informovaný/á o práve na odstúpenie od zmluvy v lehote 14 dní. |
| Marketingový súhlas | Nie | Súhlasím s prijímaním obchodných informácií elektronickou cestou. |

### Pridanie vlastného checkboxu

V paneli konfigurácie kliknite na **Pridať checkbox** a vyplňte formulár:

| Pole | Popis |
|------|------|
| Názov | Interný identifikátor (napr. `newsletter_consent`) |
| Štítok | Text zobrazený vedľa checkboxu |
| Povinný | Či checkbox musí byť zaškrtnutý na zadanie objednávky |
| Pozícia | Poradie zobrazovania (číslo) |
| Popis | Ďalší text pod checkboxom (voliteľný) |
| Chybové hlásenie | Text zobrazený, keď povinný checkbox nie je zaškrtnutý |

### Formátovanie štítkov

V obsahu štítku môžete používať:

- `[regulamin]` - automatický odkaz na stránku obchodných podmienok
- `[polityka-prywatnosci]` - automatický odkaz na zásady ochrany osobných údajov
- `[odstapienie]` - odkaz na stránku o práve na odstúpenie
- `<a href="URL">text</a>` - vlastný odkaz
- `<strong>text</strong>` - tučné písmo

Stránky obchodných podmienok a zásad ochrany osobných údajov sú načítavané z nastavení WooCommerce (**WooCommerce > Nastavenia > Rozšírené > Konfigurácia stránky**).

## Validácia

### Validácia na strane servera

Plugin validuje checkboxy na strane servera pomocou hooku `woocommerce_checkout_process`. Ak povinný checkbox nie je zaškrtnutý, objednávka nebude zadaná a zákazník uvidí chybové hlásenie.

### Validácia na strane klienta

Voliteľná JavaScript validácia zobrazuje chybové hlásenie okamžite po kliknutí na tlačidlo objednávky, bez opätovného načítania stránky. Zapnite ju v nastaveniach:

**WooCommerce > Nastavenia > Polski > Pokladňa > JS validácia checkboxov**

### Chybové hlásenia

Každý checkbox má konfigurovateľné chybové hlásenie. Predvolené hlásenia:

| Checkbox | Chybové hlásenie |
|----------|----------------|
| Obchodné podmienky | Na zadanie objednávky musíte akceptovať obchodné podmienky. |
| Zásady ochrany osobných údajov | Na zadanie objednávky musíte akceptovať zásady ochrany osobných údajov. |
| Právo na odstúpenie | Musíte potvrdiť oboznámenie sa s informáciou o práve na odstúpenie. |

## Uchovávanie súhlasov

Plugin ukladá informácie o udelených súhlasoch:

- ako metadáta objednávky (`_polski_consent_*`)
- s dátumom a časom udelenia súhlasu
- s verziou obchodných podmienok/zásad ochrany osobných údajov (ak je zapnuté sledovanie verzií)

Tieto informácie sú viditeľné v administračnom paneli objednávky a môžu byť exportované na požiadanie (GDPR).

### Náhľad súhlasov v objednávke

V zobrazení objednávky v administračnom paneli, v sekcii "Právne súhlasy", nájdete zoznam udelených súhlasov s dátumami.

## Programová správa checkboxov

### Pridanie checkboxu programovo

```php
add_filter('polski/checkout/legal_checkboxes', function (array $checkboxes): array {
    $checkboxes['custom_consent'] = [
        'label'         => 'Wyrażam zgodę na przetwarzanie danych w celu realizacji reklamacji.',
        'required'      => true,
        'position'      => 50,
        'error_message' => 'Musisz wyrazić zgodę na przetwarzanie danych.',
        'description'   => '',
    ];

    return $checkboxes;
});
```

### Odstránenie checkboxu

```php
add_filter('polski/checkout/legal_checkboxes', function (array $checkboxes): array {
    unset($checkboxes['marketing_consent']);

    return $checkboxes;
});
```

### Úprava existujúceho checkboxu

```php
add_filter('polski/checkout/legal_checkboxes', function (array $checkboxes): array {
    if (isset($checkboxes['terms'])) {
        $checkboxes['terms']['label'] = 'Akceptuję <a href="/regulamin">regulamin</a> sklepu.';
    }

    return $checkboxes;
});
```

### Podmienené zobrazovanie checkboxu

```php
add_filter('polski/checkout/legal_checkboxes', function (array $checkboxes): array {
    $cart_total = WC()->cart->get_total('edit');

    if ($cart_total > 500) {
        $checkboxes['high_value_consent'] = [
            'label'         => 'Potwierdzam zamówienie o wartości powyżej 500 zł.',
            'required'      => true,
            'position'      => 60,
            'error_message' => 'Musisz potwierdzić zamówienie o wysokiej wartości.',
        ];
    }

    return $checkboxes;
});
```

## Štýlovanie CSS

```css
.polski-legal-checkboxes {
    margin: 1.5em 0;
    padding: 1em;
    background: #f9f9f9;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
}

.polski-legal-checkbox {
    margin-bottom: 0.8em;
}

.polski-legal-checkbox label {
    font-size: 0.9em;
    line-height: 1.5;
    cursor: pointer;
}

.polski-legal-checkbox__description {
    margin-top: 0.3em;
    font-size: 0.8em;
    color: #666;
}

.polski-legal-checkbox--error label {
    color: #c00;
}
```

## Kompatibilita s Block Checkout

Plugin podporuje právne checkboxy v klasickom checkout aj v Block Checkout. V prípade Block Checkout sa checkboxy renderujú pomocou bloku `woocommerce/checkout-terms-block`.

## Najčastejšie problémy

### Checkboxy sa nezobrazujú

1. Skontrolujte, či modul je zapnutý v nastaveniach
2. Uistite sa, že stránky obchodných podmienok a zásad ochrany osobných údajov sú nastavené vo WooCommerce
3. Overte, či iný plugin neodstraňuje checkboxy

### Odkaz v štítku nefunguje

Skontrolujte, či cieľová stránka je publikovaná (nie v koncepte) a či skratka (napr. `[regulamin]`) je správne vpísaná.

### Objednávka prechádza napriek nezaškrtnutému checkboxu

Skontrolujte, či checkbox je označený ako "Povinný". Overte konzolu prehliadača na chyby JavaScript, ktoré môžu blokovať validáciu na strane klienta.

## Súvisiace zdroje

- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
