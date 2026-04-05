---
title: Právo na odstúpenie od zmluvy
description: Obsluha práva na odstúpenie od zmluvy v Polski for WooCommerce - formulár vrátenia, produktové výnimky, automatické e-maily a vývojárske hooky.
---

Smernica EÚ 2023/2673 zavádza nové povinnosti týkajúce sa práva na odstúpenie od zmluvy (od 19. júna 2026). Plugin obsluhuje celý proces - formulár zákazníka, e-mailové potvrdenia, produktové výnimky a hooky pre vývojárov.

## Právne požiadavky

Spotrebiteľ má právo odstúpiť od zmluvy uzavretej na diaľku v lehote 14 dní bez udania dôvodu. Predajca je povinný:

1. Informovať spotrebiteľa o práve na odstúpenie pred uzavretím zmluvy
2. Sprístupniť formulár na odstúpenie
3. Potvrdiť prijatie vyhlásenia o odstúpení
4. Vrátiť platbu v lehote 14 dní od prijatia vyhlásenia

Smernica 2023/2673 rozširuje tieto povinnosti o digitálny proces a automatické potvrdenia.

## Proces zákazníka

### Krok 1 - tlačidlo v Môj účet

Po aktivácii modulu sa na stránke **Môj účet > Objednávky** zobrazuje tlačidlo "Odstúpiť od zmluvy" pri objednávkach kvalifikujúcich sa na vrátenie. Tlačidlo je viditeľné len v lehote na odstúpenie (štandardne 14 dní od doručenia).

### Krok 2 - formulár na odstúpenie

Po kliknutí na tlačidlo zákazník prejde na formulár s poliami:

- Číslo objednávky (vyplnené automaticky)
- Dátum objednávky
- Zoznam produktov z objednávky (s možnosťou výberu, od ktorých odstupuje)
- Dôvod odstúpenia (voliteľný)
- Kontaktné údaje zákazníka
- Číslo bankového účtu na vrátenie

### Krok 3 - e-mailové potvrdenie

Po odoslaní formulára systém automaticky:

1. Zašle zákazníkovi e-mail s potvrdením prijatia vyhlásenia
2. Zašle administrátorovi obchodu oznámenie o novom hlásení
3. Zmení stav hlásenia na "Čakajúce"

Administrátor môže následne spracovať hlásenie v paneli WooCommerce a označiť ho ako ukončené.

## Produktové výnimky

Právo na odstúpenie sa nevzťahuje na niektoré kategórie produktov. Produkt označíte ako vylúčený v záložke **Polski - Odstúpenie** v úprave produktu.

Typické výnimky podľa čl. 38 zákona o právach spotrebiteľa:

- Produkty vyrobené na zákazku alebo personalizované
- Produkty podliehajúce rýchlemu kazeniu
- Zapečatené produkty z hygienických dôvodov (po otvorení)
- Zvukové/vizuálne záznamy v zapečatenom obale (po otvorení)
- Digitálny obsah dodaný online (po začatí poskytovania)
- Tlač (denníky, periodická tlač, časopisy)

Pre vylúčený produkt sa tlačidlo "Odstúpiť od zmluvy" nezobrazuje v paneli zákazníka.

## Shortcód

Použite shortcód `[polski_withdrawal_form]` na zobrazenie formulára na odstúpenie na ľubovoľnom mieste stránky.

### Základné použitie

```
[polski_withdrawal_form]
```

Zobrazí formulár pre prihláseného zákazníka. Zákazník musí vybrať objednávku zo zoznamu.

### S určením objednávky

```
[polski_withdrawal_form order_id="789"]
```

Zobrazí formulár predvyplnený údajmi objednávky s uvedeným ID. Plugin overí, či prihlásený používateľ je vlastníkom tejto objednávky.

### Príklad vloženia na stránku

Vytvorte špeciálnu stránku "Formulár na odstúpenie od zmluvy" a vložte na ňu shortcód:

```
[polski_withdrawal_form]
```

V nastaveniach pluginu (**WooCommerce > Nastavenia > Polski > Odstúpenie**) uveďte túto stránku ako predvolenú stránku formulára.

## Hooky

### polski/withdrawal/requested

Volaný, keď zákazník odošle formulár na odstúpenie.

```php
/**
 * @param int   $withdrawal_id ID zgłoszenia odstąpienia.
 * @param int   $order_id      ID zamówienia WooCommerce.
 * @param array $form_data     Dane z formularza.
 */
add_action('polski/withdrawal/requested', function (int $withdrawal_id, int $order_id, array $form_data): void {
    // Przykład: wyślij powiadomienie do zewnętrznego systemu CRM
    $crm_api = new MyCrmApi();
    $crm_api->notify_withdrawal($order_id, $form_data['reason']);
}, 10, 3);
```

### polski/withdrawal/confirmed

Volaný, keď administrátor potvrdí prijatie hlásenia.

```php
/**
 * @param int $withdrawal_id ID zgłoszenia odstąpienia.
 * @param int $order_id      ID zamówienia WooCommerce.
 */
add_action('polski/withdrawal/confirmed', function (int $withdrawal_id, int $order_id): void {
    // Przykład: zmień status zamówienia
    $order = wc_get_order($order_id);
    if ($order) {
        $order->update_status('withdrawal-confirmed', 'Odstąpienie potwierdzone.');
    }
}, 10, 2);
```

### polski/withdrawal/completed

Volaný, keď je celý proces odstúpenia ukončený (vrátenie spracované).

```php
/**
 * @param int   $withdrawal_id ID zgłoszenia odstąpienia.
 * @param int   $order_id      ID zamówienia WooCommerce.
 * @param float $refund_amount Kwota zwrotu.
 */
add_action('polski/withdrawal/completed', function (int $withdrawal_id, int $order_id, float $refund_amount): void {
    // Przykład: zarejestruj zwrot w systemie księgowym
    do_action('my_accounting/register_refund', $order_id, $refund_amount);
}, 10, 3);
```

### polski/withdrawal/eligible

Filter umožňujúci programovo určiť, či sa objednávka kvalifikuje na odstúpenie.

```php
/**
 * @param bool     $is_eligible Czy zamówienie kwalifikuje się do odstąpienia.
 * @param WC_Order $order       Obiekt zamówienia WooCommerce.
 * @return bool
 */
add_filter('polski/withdrawal/eligible', function (bool $is_eligible, WC_Order $order): bool {
    // Przykład: wyklucz zamówienia z kategorii "usługi"
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

Filter umožňujúci zmeniť lehotu na odstúpenie (štandardne 14 dní).

```php
/**
 * @param int      $days  Liczba dni na odstąpienie.
 * @param WC_Order $order Obiekt zamówienia WooCommerce.
 * @return int
 */
add_filter('polski/withdrawal/period_days', function (int $days, WC_Order $order): int {
    // Przykład: wydłuż okres do 30 dni w okresie świątecznym
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

Filter umožňujúci upravovať polia formulára na odstúpenie.

```php
/**
 * @param array $fields Tablica pól formularza.
 * @return array
 */
add_filter('polski/withdrawal/form_fields', function (array $fields): array {
    // Przykład: dodaj pole na preferowany sposób zwrotu
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

## Administrácia hlásení

Hlásenia o odstúpení nájdete v **WooCommerce > Odstúpenia**. Každé hlásenie obsahuje:

- Číslo objednávky a odkaz na objednávku
- Dátum odoslania formulára
- Stav (čakajúce, potvrdené, ukončené, zamietnuté)
- Údaje zákazníka
- Zoznam produktov zahrnutých v odstúpení
- Dôvod (ak bol uvedený)

Administrátor môže zmeniť stav hlásenia, pridať internú poznámku alebo spracovať vrátenie priamo z panelu.

## Riešenie problémov

**Tlačidlo "Odstúpiť od zmluvy" sa nezobrazuje**
Skontrolujte, či: (1) modul je zapnutý, (2) objednávka je v stave "Zrealizovaná", (3) neuplynula lehota na odstúpenie, (4) žiadny produkt v objednávke nie je vylúčený.

**Zákazník nedostáva potvrdzujúci e-mail**
Skontrolujte konfiguráciu e-mailov WooCommerce v **WooCommerce > Nastavenia > E-maily** a uistite sa, že šablóna "Potvrdenie odstúpenia" je zapnutá.

## Ďalšie kroky

- Nahlasovanie problémov: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskusie a otázky: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
