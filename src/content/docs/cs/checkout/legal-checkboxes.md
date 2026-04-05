---
title: Pravni checkboxy
description: Konfigurace, validace a personalizace povinnych pravnich checkboxu na strance pokladny WooCommerce.
---

Pred slozenim objednavky musi zakaznik akceptovat obchodni podminky a zasady ochrany osobnich udaju. Plugin pridava pravni checkboxy s konfiguraci obsahu, validaci a chybovymi zpravami.

## Pravni pozadavky

Podle zakona o pravech spotrebitele a zakona o poskytovani sluzeb elektronickou cestou musi internetovy obchod ziskat od spotrebitele vyrazny souhlas s:

- obchodnimi podminkami (podminky kupni smlouvy)
- zasadami ochrany osobnich udaju (zpracovani osobnich dat)
- pravem na odstoupeni od smlouvy (informace o 14denni lhute)

Souhlasy musi byt vyjadreny aktivne (checkbox nesmi byt ve vychozim stavu zaznaceny) a samostatne pro kazdy ucel.

## Konfigurace

Prejdete do **WooCommerce > Nastaveni > Polski > Pokladna** a nakonfigurujte sekci "Pravni checkboxy".

### Vychozi checkboxy

Plugin pridava nasledujici checkboxy:

| Checkbox | Povinny | Vychozi obsah |
|----------|----------|----------------|
| Obchodni podminky | Ano | Zapoznałem się z [regulaminem] i akceptuję jego postanowienia. |
| Zasady ochrany osobnich udaju | Ano | Zapoznałem się z [polityką prywatności] i wyrażam zgodę na przetwarzanie moich danych osobowych. |
| Pravo na odstoupeni | Ano | Zostałem poinformowany o prawie do odstąpienia od umowy w terminie 14 dni. |
| Marketingovy souhlas | Ne | Wyrażam zgodę na otrzymywanie informacji handlowych drogą elektroniczną. |

### Pridani vlastniho checkboxu

V panelu konfigurace kliknete **Pridat checkbox** a vyplnte formular:

| Pole | Popis |
|------|------|
| Nazev | Interni identifikator (napr. `newsletter_consent`) |
| Stitek | Text zobrazovany u checkboxu |
| Povinny | Zda musi byt checkbox zaznacen pro slozeni objednavky |
| Pozice | Poradi zobrazeni (cislo) |
| Popis | Doplnkovy text pod checkboxem (volitelny) |
| Chybova zprava | Text zobrazovany, kdyz povinny checkbox neni zaznacen |

### Formatovani stitku

V obsahu stitku muzete pouzivat:

- `[regulamin]` - automaticky odkaz na stranku obchodnich podminek
- `[polityka-prywatnosci]` - automaticky odkaz na zasady ochrany osobnich udaju
- `[odstapienie]` - odkaz na stranku o pravu na odstoupeni
- `<a href="URL">text</a>` - vlastni odkaz
- `<strong>text</strong>` - tucne pismo

Stranky obchodnich podminek a zasad ochrany osobnich udaju jsou nacitany z nastaveni WooCommerce (**WooCommerce > Nastaveni > Pokrocile > Konfigurace stranky**).

## Validace

### Validace na strane serveru

Plugin validuje checkboxy na strane serveru pomoci hooku `woocommerce_checkout_process`. Pokud povinny checkbox neni zaznacen, objednavka nebude slozena a zakaznik uvidi chybovou zpravu.

### Validace na strane klienta

Volitelna validace JavaScriptem zobrazuje chybovou zpravu okamzite po kliknuti na tlacitko objednavky, bez znovu nacitani stranky. Aktivujte ji v nastaveních:

**WooCommerce > Nastaveni > Polski > Pokladna > JS validace checkboxu**

### Chybove zpravy

Kazdy checkbox ma konfigurovatelnou chybovou zpravu. Vychozi zpravy:

| Checkbox | Chybova zprava |
|----------|----------------|
| Obchodni podminky | Aby złożyć zamówienie, musisz zaakceptować regulamin sklepu. |
| Zasady ochrany osobnich udaju | Aby złożyć zamówienie, musisz zaakceptować politykę prywatności. |
| Pravo na odstoupeni | Musisz potwierdzić zapoznanie się z informacją o prawie odstąpienia. |

## Uchovavani souhlasu

Plugin uklada informace o udelenych souhlasech:

- jako metadata objednavky (`_polski_consent_*`)
- s datem a casem udeleni souhlasu
- s verzi obchodnich podminek/zasad ochrany osobnich udaju (pokud je aktivovano sledovani verzi)

Tyto informace jsou viditelne v administracnim panelu objednavky a mohou byt exportovany na pozadani (GDPR).

### Nahled souhlasu v objednavce

V zobrazeni objednavky v administracnim panelu, v sekci "Pravni souhlasy", naleznete seznam udelenych souhlasu s daty.

## Programaticka sprava checkboxu

### Pridani checkboxu programove

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

### Odstraneni checkboxu

```php
add_filter('polski/checkout/legal_checkboxes', function (array $checkboxes): array {
    unset($checkboxes['marketing_consent']);

    return $checkboxes;
});
```

### Uprava existujiciho checkboxu

```php
add_filter('polski/checkout/legal_checkboxes', function (array $checkboxes): array {
    if (isset($checkboxes['terms'])) {
        $checkboxes['terms']['label'] = 'Akceptuję <a href="/regulamin">regulamin</a> sklepu.';
    }

    return $checkboxes;
});
```

### Podminene zobrazeni checkboxu

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

## Stylovani CSS

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

Plugin podporuje pravni checkboxy jak v klasickem checkout, tak v Block Checkout. V pripade Block Checkout jsou checkboxy renderovany pomoci bloku `woocommerce/checkout-terms-block`.

## Nejcastejsi problemy

### Checkboxy se nezobrazuji

1. Zkontrolujte, zda je modul aktivovan v nastaveních
2. Ujistete se, ze stranky obchodnich podminek a zasad ochrany osobnich udaju jsou nastaveny ve WooCommerce
3. Overite, zda jiny plugin neodstranuje checkboxy

### Odkaz ve stitku nefunguje

Zkontrolujte, zda cilova stranka je publikovana (ne v konceptu) a zda zkratka (napr. `[regulamin]`) je spravne zapsana.

### Objednavka prochazi pres nezaznaceny checkbox

Zkontrolujte, zda je checkbox oznacen jako "Povinny". Overite konzoli prohlizece na chyby JavaScriptu, ktere mohou blokovat validaci na strane klienta.

## Souvisejici zdroje

- [Nahlasit problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
