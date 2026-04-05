---
title: Pravo na odstoupeni od smlouvy
description: Obsluha prava na odstoupeni od smlouvy v Polski for WooCommerce - formular vraceni, produktove vylouceni, automaticke e-maily a vyvojarske hooky.
---

Smernice EU 2023/2673 zavadi nove povinnosti tykajici se prava na odstoupeni od smlouvy, ktere se stavaji povinnymi od 19. cervna 2026. Polski for WooCommerce implementuje kompletni proces obsluhy odstoupeni - od formulare zakaznika, pres e-mailova potvrzeni, po produktove vylouceni a hooky pro vyvojare.

## Pravni pozadavky

Spotrebitel ma pravo odstoupit od smlouvy uzavrene na dalku do 14 dnu bez udani duvodu. Prodejce je povinen:

1. Informovat spotrebitele o pravu na odstoupeni pred uzavrenim smlouvy
2. Zpristupnit formular odstoupeni
3. Potvrdit prijeti prohlaseni o odstoupeni
4. Vratit platbu do 14 dnu od prijeti prohlaseni

Smernice 2023/2673 rozsiruje tyto povinnosti o digitalni proces podavani prohlaseni a automaticka potvrzeni.

## Proces zakaznika

### Krok 1 - tlacitko v Muj ucet

Po aktivaci modulu se na strance **Muj ucet > Objednavky** objevi tlacitko "Odstoupit od smlouvy" u objednavek kvalifikujicich se pro vraceni. Tlacitko je viditelne pouze v obdobi pro odstoupeni (vychozi 14 dnu od doruceni).

### Krok 2 - formular odstoupeni

Po kliknuti na tlacitko zakaznik prechazi k formulari, ktery obsahuje:

- Cislo objednavky (vyplneno automaticky)
- Datum objednavky
- Seznam produktu z objednavky (s moznosti vyberu, od kterych odstupuje)
- Duvod odstoupeni (volitelny)
- Kontaktni udaje zakaznika
- Cislo bankovniho uctu pro vraceni

### Krok 3 - e-mailove potvrzeni

Po odeslani formulare system automaticky:

1. Odesle zakaznikovi e-mail s potvrzenim prijeti prohlaseni
2. Odesle administratorovi obchodu oznameni o novem hlaseni
3. Zmeni stav hlaseni na "Cekajici"

Administrator nasledne muze zpracovat hlaseni v panelu WooCommerce a oznacit jej jako ukoncene.

## Produktove vylouceni

Pravo na odstoupeni se nevztahuje na nektere kategorie produktu. Muzete oznacit produkt jako vylouceny v zalozce **Polski - Odstoupeni** v editaci produktu.

Typicke vylouceni podle cl. 38 zakona o pravech spotrebitele:

- Produkty vyrobene na zakazku nebo personalizovane
- Produkty podlehajici rychle zkaze
- Zapecetene produkty z hygienickych duvodu (po otevreni)
- Zvukove/obrazove zaznamy v zapecetenem obalu (po otevreni)
- Digitalni obsah dodany online (po zahajeni poskytovaání)
- Tisk (deniky, periodika, casopisy)

Pro vylouceny produkt se tlacitko "Odstoupit od smlouvy" nezobrazuje v panelu zakaznika.

## Shortcode

Pouzijte shortcode `[polski_withdrawal_form]` pro zobrazeni formulare odstoupeni na libovolnem miste webu.

### Zakladni pouziti

```
[polski_withdrawal_form]
```

Zobrazi formular pro prihlaseneho zakaznika. Zakaznik musi vybrat objednavku ze seznamu.

### S urcenim objednavky

```
[polski_withdrawal_form order_id="789"]
```

Zobrazi formular predvyplneny udaji objednavky se zadanym ID. System overuje, zda prihlaseny uzivatel je vlastnikem dane objednavky.

### Priklad vlozeni na stranku

Vytvorte vyhrazenou stranku "Formular odstoupeni od smlouvy" a umistete na ni shortcode:

```
[polski_withdrawal_form]
```

Nasledne v nastaveni pluginu (**WooCommerce > Nastaveni > Polski > Odstoupeni**) ukazte tuto stranku jako vychozi stranku formulare.

## Hooky

### polski/withdrawal/requested

Vyvolan, kdyz zakaznik odesle formular odstoupeni.

```php
/**
 * @param int   $withdrawal_id ID zgłoszenia odstąpienia.
 * @param int   $order_id      ID zamówienia WooCommerce.
 * @param array $form_data     Dane z formularza.
 */
add_action('polski/withdrawal/requested', function (int $withdrawal_id, int $order_id, array $form_data): void {
    // Priklad: odeslat oznameni do externiho CRM systemu
    $crm_api = new MyCrmApi();
    $crm_api->notify_withdrawal($order_id, $form_data['reason']);
}, 10, 3);
```

### polski/withdrawal/confirmed

Vyvolan, kdyz administrator potvrdí prijeti hlaseni.

```php
/**
 * @param int $withdrawal_id ID zgłoszenia odstąpienia.
 * @param int $order_id      ID zamówienia WooCommerce.
 */
add_action('polski/withdrawal/confirmed', function (int $withdrawal_id, int $order_id): void {
    // Priklad: zmenit stav objednavky
    $order = wc_get_order($order_id);
    if ($order) {
        $order->update_status('withdrawal-confirmed', 'Odstąpienie potwierdzone.');
    }
}, 10, 2);
```

### polski/withdrawal/completed

Vyvolan, kdyz cely proces odstoupeni je dokoncen (vraceni zpracovano).

```php
/**
 * @param int   $withdrawal_id ID zgłoszenia odstąpienia.
 * @param int   $order_id      ID zamówienia WooCommerce.
 * @param float $refund_amount Kwota zwrotu.
 */
add_action('polski/withdrawal/completed', function (int $withdrawal_id, int $order_id, float $refund_amount): void {
    // Priklad: zaregistrovat vraceni v ucetnim systemu
    do_action('my_accounting/register_refund', $order_id, $refund_amount);
}, 10, 3);
```

### polski/withdrawal/eligible

Filtr umoznujici programove urcit, zda se objednavka kvalifikuje pro odstoupeni.

```php
/**
 * @param bool     $is_eligible Czy zamówienie kwalifikuje się do odstąpienia.
 * @param WC_Order $order       Obiekt zamówienia WooCommerce.
 * @return bool
 */
add_filter('polski/withdrawal/eligible', function (bool $is_eligible, WC_Order $order): bool {
    // Priklad: vyloucit objednavky z kategorie "sluzby"
    foreach ($order->get_items() as $item) {
        $product = $item->get_product();
        if ($product && has_term('uslugi', 'product_cat', $product->get_id())) {
            return false;
        }
    }
    return $is_eligible;
}, 10, 2);
```

### polski/withdrawal/period_days

Filtr umoznujici zmenit obdobi pro odstoupeni (vychozi 14 dnu).

```php
/**
 * @param int      $days  Liczba dni na odstąpienie.
 * @param WC_Order $order Obiekt zamówienia WooCommerce.
 * @return int
 */
add_filter('polski/withdrawal/period_days', function (int $days, WC_Order $order): int {
    // Priklad: prodlouzit obdobi na 30 dnu o Vanocich
    $order_date = $order->get_date_created();
    if ($order_date) {
        $month = (int) $order_date->format('m');
        if ($month === 12) {
            return 30;
        }
    }
    return $days;
}, 10, 2);
```

### polski/withdrawal/form_fields

Filtr umoznujici upravit pole formulare odstoupeni.

```php
/**
 * @param array $fields Tablica pól formularza.
 * @return array
 */
add_filter('polski/withdrawal/form_fields', function (array $fields): array {
    // Priklad: pridat pole na preferovany zpusob vraceni
    $fields['refund_method'] = [
        'type'     => 'select',
        'label'    => 'Preferowany sposób zwrotu',
        'required' => true,
        'options'  => [
            'bank_transfer' => 'Przelew bankowy',
            'original'      => 'Tym samym sposobem płatności',
        ],
    ];
    return $fields;
}, 10, 1);
```

## Administrativa hlaseni

Hlaseni o odstoupeni jsou dostupna v panelu WooCommerce v **WooCommerce > Odstoupeni**. Kazde hlaseni obsahuje:

- Cislo objednavky a odkaz na objednavku
- Datum odeslani formulare
- Stav (cekajici, potvrzene, dokoncene, zamitnute)
- Udaje zakaznika
- Seznam produktu zahrnutych v odstoupeni
- Duvod (pokud byl udan)

Administrator muze zmenit stav hlaseni, pridat interni poznamku nebo zpracovat vraceni primo z panelu.

## Reseni problemu

**Tlacitko "Odstoupit od smlouvy" se nezobrazuje**
Zkontrolujte, zda: (1) modul je aktivovan, (2) objednavka je ve stavu "Vyrizena", (3) neuplynulo obdobi pro odstoupeni, (4) zadny produkt v objednavce neni vyloucen.

**Zakaznik nedostava potvrzujici e-mail**
Zkontrolujte konfiguraci e-mailu WooCommerce v **WooCommerce > Nastaveni > E-maily** a ujistete se, ze sablona "Potvrzeni odstoupeni" je aktivovana.

## Dalsi kroky

- Hlaseni problemu: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskuse a otazky: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
