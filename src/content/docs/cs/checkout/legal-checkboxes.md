---
title: Právní zaškrtávací pole
description: Konfigurace, validace a personalizace povinných právních zaškrtávacích polí na stránce pokladny WooCommerce.
---

Před vytvořením objednávky musí zákazník akceptovat obchodní podmínky a zásady ochrany osobních údajů. Zásuvný modul Polski for WooCommerce přidává právní zaškrtávací pole s konfigurací obsahu, validací a chybovými zprávami.

## Právní požadavky

Obchod musí získat výslovný souhlas zákazníka s:

- obchodními podmínkami obchodu (podmínky kupní smlouvy)
- zásadami ochrany osobních údajů (zpracování osobních údajů)
- právem na odstoupení od smlouvy (informace o 14denní lhůtě)

Každý souhlas vyžaduje samostatné zaškrtávací pole. Zaškrtávací pole nesmí být ve výchozím stavu zaškrtnuté.

![Právní zaškrtávací pole na stránce pokladny WooCommerce](../../../../assets/screenshots/screenshot-3-checkout-checkboxes.png)

## Konfigurace

Přejděte do **WooCommerce > Nastavení > Polski > Pokladna** a nakonfigurujte sekci "Právní zaškrtávací pole".

### Výchozí zaškrtávací pole

Zásuvný modul přidává tato zaškrtávací pole:

| Zaškrtávací pole | Povinné | Výchozí obsah |
|----------|----------|----------------|
| Obchodní podmínky | Ano | Seznámil/a jsem se s [obchodními podmínkami] a akceptuji jejich ustanovení. |
| Zásady ochrany osobních údajů | Ano | Seznámil/a jsem se se [zásadami ochrany osobních údajů] a souhlasím se zpracováním svých osobních údajů. |
| Právo na odstoupení | Ano | Byl/a jsem informován/a o právu na odstoupení od smlouvy ve lhůtě 14 dní. |
| Marketingový souhlas | Ne | Souhlasím s přijímáním obchodních sdělení elektronickou cestou. |

### Přidání vlastního zaškrtávacího pole

V panelu konfigurace klikněte na **Přidat zaškrtávací pole** a vyplňte formulář:

| Pole | Popis |
|------|------|
| Název | Interní identifikátor (např. `newsletter_consent`) |
| Štítek | Text zobrazený vedle zaškrtávacího pole |
| Povinné | Zda musí být zaškrtávací pole zaškrtnuto pro vytvoření objednávky |
| Pozice | Pořadí zobrazení (číslo) |
| Popis | Doplňkový text pod zaškrtávacím polem (volitelné) |
| Chybová zpráva | Text zobrazený, když povinné zaškrtávací pole není zaškrtnuto |

### Formátování štítků

V obsahu štítku můžete používat:

- `[regulamin]` - automatický odkaz na stránku obchodních podmínek
- `[polityka-prywatnosci]` - automatický odkaz na zásady ochrany osobních údajů
- `[odstapienie]` - odkaz na stránku o právu na odstoupení
- `<a href="URL">text</a>` - vlastní odkaz
- `<strong>text</strong>` - tučné písmo

Stránky obchodních podmínek a zásad ochrany osobních údajů se načítají z **WooCommerce > Nastavení > Pokročilé > Konfigurace stránek**.

## Validace

### Validace na straně serveru

Zásuvný modul kontroluje zaškrtávací pole na straně serveru hookem `woocommerce_checkout_process`. Pokud povinné zaškrtávací pole není zaškrtnuto, objednávka neprojde a zákazník uvidí chybu.

### Validace na straně klienta

Volitelná JavaScript validace zobrazí chybu ihned po kliknutí na tlačítko, bez přenačtení stránky. Zapněte ji v:

**WooCommerce > Nastavení > Polski > Pokladna > JS validace zaškrtávacích polí**

### Chybové zprávy

Každé zaškrtávací pole má konfigurovatelnou chybovou zprávu. Výchozí zprávy:

| Zaškrtávací pole | Chybová zpráva |
|----------|----------------|
| Obchodní podmínky | Pro vytvoření objednávky musíte akceptovat obchodní podmínky obchodu. |
| Zásady ochrany osobních údajů | Pro vytvoření objednávky musíte akceptovat zásady ochrany osobních údajů. |
| Právo na odstoupení | Musíte potvrdit seznámení s informací o právu na odstoupení. |

## Uchovávání souhlasů

Zásuvný modul ukládá informace o souhlasech:

- jako metadata objednávky (`_polski_consent_*`)
- s datem a časem udělení souhlasu
- s verzí obchodních podmínek/zásad ochrany osobních údajů (pokud je zapnuto sledování verzí)

Tato data jsou vidět v administraci objednávky. Lze je exportovat pro účely GDPR.

### Náhled souhlasů v objednávce

V zobrazení objednávky v administraci, v sekci "Právní souhlasy", najdete seznam udělených souhlasů s daty.

## Programová správa zaškrtávacích polí

### Přidání zaškrtávacího pole programově

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

### Odebrání zaškrtávacího pole

```php
add_filter('polski/checkout/legal_checkboxes', function (array $checkboxes): array {
    unset($checkboxes['marketing_consent']);

    return $checkboxes;
});
```

### Úprava existujícího zaškrtávacího pole

```php
add_filter('polski/checkout/legal_checkboxes', function (array $checkboxes): array {
    if (isset($checkboxes['terms'])) {
        $checkboxes['terms']['label'] = 'Akceptuję <a href="/regulamin">regulamin</a> sklepu.';
    }

    return $checkboxes;
});
```

### Podmíněné zobrazení zaškrtávacího pole

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

## Stylování CSS

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

Zásuvný modul podporuje zaškrtávací pole v klasické pokladně i Block Checkout. V Block Checkout fungují zaškrtávací pole přes blok `woocommerce/checkout-terms-block`.

## Nejčastější problémy

### Zaškrtávací pole se nezobrazují

1. Zkontrolujte, zda je modul zapnutý v nastavení
2. Ujistěte se, že jsou stránky obchodních podmínek a zásad ochrany osobních údajů nastaveny ve WooCommerce
3. Ověřte, zda jiný zásuvný modul zaškrtávací pole neodstraňuje

### Odkaz ve štítku nefunguje

Zkontrolujte, zda je cílová stránka publikovaná (ne v konceptu) a zda je zkratka (např. `[regulamin]`) zadána správně.

### Objednávka projde i přes nezaškrtnuté pole

Zkontrolujte, zda je zaškrtávací pole označeno jako "Povinné". Ověřte konzoli prohlížeče z hlediska chyb JavaScriptu, které mohou blokovat validaci na straně klienta.

## Související zdroje

- [Nahlásit problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má výhradně informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) dodávaný bez záruky.</div>
