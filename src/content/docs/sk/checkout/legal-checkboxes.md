---
title: Právne zaškrtávacie polia
description: Konfigurácia, validácia a personalizácia povinných právnych zaškrtávacích polí na stránke pokladne WooCommerce.
---

Pred vytvorením objednávky musí zákazník akceptovať obchodné podmienky a zásady ochrany osobných údajov. Doplnok Polski for WooCommerce pridáva právne zaškrtávacie polia s konfiguráciou obsahu, validáciou a chybovými oznamami.

## Právne požiadavky

Obchod musí získať výslovný súhlas zákazníka s:

- obchodnými podmienkami (podmienky kúpnej zmluvy)
- zásadami ochrany osobných údajov (spracúvanie osobných údajov)
- právom na odstúpenie od zmluvy (informácia o 14-dňovej lehote)

Každý súhlas vyžaduje samostatné zaškrtávacie pole. Pole nesmie byť predvolene zaškrtnuté.

![Právne zaškrtávacie polia na stránke pokladne WooCommerce](../../../../assets/screenshots/screenshot-3-checkout-checkboxes.png)

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski > Pokladňa** a nakonfigurujte sekciu "Právne zaškrtávacie polia".

### Predvolené zaškrtávacie polia

Doplnok pridáva tieto zaškrtávacie polia:

| Zaškrtávacie pole | Povinné | Predvolený obsah |
|----------|----------|----------------|
| Obchodné podmienky | Áno | Oboznámil som sa s [obchodnými podmienkami] a akceptujem ich ustanovenia. |
| Zásady ochrany osobných údajov | Áno | Oboznámil som sa so [zásadami ochrany osobných údajov] a súhlasím so spracúvaním mojich osobných údajov. |
| Právo na odstúpenie | Áno | Bol som informovaný o práve na odstúpenie od zmluvy v lehote 14 dní. |
| Marketingový súhlas | Nie | Súhlasím s prijímaním obchodných informácií elektronickou cestou. |

### Pridanie vlastného zaškrtávacieho poľa

V paneli konfigurácie kliknite na **Pridať zaškrtávacie pole** a vyplňte formulár:

| Pole | Popis |
|------|------|
| Názov | Interný identifikátor (napr. `newsletter_consent`) |
| Štítok | Text zobrazený vedľa zaškrtávacieho poľa |
| Povinné | Či musí byť pole zaškrtnuté pre vytvorenie objednávky |
| Pozícia | Poradie zobrazenia (číslo) |
| Popis | Doplnkový text pod zaškrtávacím poľom (voliteľný) |
| Chybový oznam | Text zobrazený, keď povinné pole nie je zaškrtnuté |

### Formátovanie štítkov

V texte štítku môžete používať:

- `[regulamin]` - automatický odkaz na stránku obchodných podmienok
- `[polityka-prywatnosci]` - automatický odkaz na zásady ochrany osobných údajov
- `[odstapienie]` - odkaz na stránku o práve na odstúpenie
- `<a href="URL">text</a>` - vlastný odkaz
- `<strong>text</strong>` - zvýraznenie

Stránky obchodných podmienok a zásad ochrany osobných údajov sa preberajú z **WooCommerce > Nastavenia > Pokročilé > Konfigurácia stránky**.

## Validácia

### Validácia na strane servera

Doplnok kontroluje zaškrtávacie polia na strane servera hookom `woocommerce_checkout_process`. Ak povinné pole nie je zaškrtnuté, objednávka neprejde a zákazník uvidí chybu.

### Validácia na strane klienta

Voliteľná JavaScript validácia zobrazí chybu okamžite po kliknutí na tlačidlo, bez znovunačítania stránky. Zapnite ju v:

**WooCommerce > Nastavenia > Polski > Pokladňa > JS validácia zaškrtávacích polí**

### Chybové oznamy

Každé zaškrtávacie pole má konfigurovateľný chybový oznam. Predvolené oznamy:

| Zaškrtávacie pole | Chybový oznam |
|----------|----------------|
| Obchodné podmienky | Pre vytvorenie objednávky musíte akceptovať obchodné podmienky. |
| Zásady ochrany osobných údajov | Pre vytvorenie objednávky musíte akceptovať zásady ochrany osobných údajov. |
| Právo na odstúpenie | Musíte potvrdiť oboznámenie sa s informáciou o práve na odstúpenie. |

## Uchovávanie súhlasov

Doplnok ukladá informácie o súhlasoch:

- ako metadáta objednávky (`_polski_consent_*`)
- s dátumom a časom udelenia súhlasu
- s verziou obchodných podmienok/zásad ochrany osobných údajov (ak je zapnuté sledovanie verzií)

Tieto údaje vidno v admin paneli objednávky. Možno ich exportovať na účely GDPR.

### Náhľad súhlasov v objednávke

V zobrazení objednávky v administračnom paneli, v sekcii "Právne súhlasy", nájdete zoznam udelených súhlasov s dátumami.

## Programová správa zaškrtávacích polí

### Pridanie zaškrtávacieho poľa programovo

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

### Odstránenie zaškrtávacieho poľa

```php
add_filter('polski/checkout/legal_checkboxes', function (array $checkboxes): array {
    unset($checkboxes['marketing_consent']);

    return $checkboxes;
});
```

### Úprava existujúceho zaškrtávacieho poľa

```php
add_filter('polski/checkout/legal_checkboxes', function (array $checkboxes): array {
    if (isset($checkboxes['terms'])) {
        $checkboxes['terms']['label'] = 'Akceptuję <a href="/regulamin">regulamin</a> sklepu.';
    }

    return $checkboxes;
});
```

### Podmienené zobrazenie zaškrtávacieho poľa

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

Doplnok podporuje zaškrtávacie polia v klasickej pokladni aj Block Checkout. V Block Checkout zaškrtávacie polia fungujú cez blok `woocommerce/checkout-terms-block`.

## Najčastejšie problémy

### Zaškrtávacie polia sa nezobrazujú

1. Skontrolujte, či je modul zapnutý v nastaveniach
2. Uistite sa, že stránky obchodných podmienok a zásad ochrany osobných údajov sú nastavené vo WooCommerce
3. Overte, či iný doplnok neodstraňuje zaškrtávacie polia

### Odkaz v štítku nefunguje

Skontrolujte, či je cieľová stránka publikovaná (nie v koncepte) a či je skratka (napr. `[regulamin]`) správne zadaná.

### Objednávka prejde napriek nezaškrtnutému poľu

Skontrolujte, či je zaškrtávacie pole označené ako "Povinné". Overte konzolu prehliadača kvôli JavaScript chybám, ktoré môžu blokovať validáciu na strane klienta.

## Súvisiace zdroje

- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informatívny charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
