---
title: Darkove karty
description: Dokumentace darkovych karet Polski PRO for WooCommerce - prodej, generovani kodu, uplatneni v kosiku, sledovani zustatku a panel Muj ucet.
---

Modul darkovych karet v Polski PRO for WooCommerce umoznuje prodej darkovych karet jako produktu WooCommerce. Zakaznici mohou zakoupit kartu, obdrzet jedinecny kod a vyuzit ho jako formu platby u dalsich objednavek.

## Jak to funguje

1. Administrator vytvori produkt typu "Darkova karta"
2. Zakaznik zakoupi darkovou kartu v obchode
3. Po zaplaceni objednavky plugin vygeneruje jedinecny kod karty
4. Kod je zaslan zakaznikovi (nebo obdarovanemu) e-mailem
5. Obdarovany zada kod v kosiku a obdrzi slevu ve vysi hodnoty karty
6. Zustatek karty se snizi o vyuzitou castku

## Konfigurace

Prejdete do **WooCommerce > Nastaveni > Polski > Moduly PRO > Darkove karty**.

Modul je rizen moznosti:

```
polski_gift_cards
```

### Obecna nastaveni

| Nastaveni | Popis |
|-----------|-------|
| Zapnout darkove karty | Aktivuje modul |
| Delka kodu | Pocet znaku kodu (vychozi 16) |
| Format kodu | Vzor kodu (napr. `XXXX-XXXX-XXXX-XXXX`) |
| Prefix kodu | Volitelny prefix (napr. `PL-`) |
| Platnost karty | Pocet dnu platnosti (0 = bez limitu) |
| Pole kodu v kosiku | Pozice pole pro zadani kodu |

### Vytvoreni produktu darkove karty

1. Prejdete do **Produkty > Pridat novy**
2. Vyberte typ produktu: **Darkova karta**
3. Nastavte cenu (nominalni hodnota karty)
4. Volitelne: zapnete "Libovolna castka" - zakaznik sam zada hodnotu karty
5. Volitelne: nastavte minimalni a maximalni castku pro libovolnou castku
6. Publikujte produkt

Pro libovolnou castku zakaznik vidi pole pro zadani hodnoty karty namisto fixni ceny.

## Generovani kodu

Kody darkovych karet jsou generovany automaticky po zaplaceni objednavky. Algoritmus:

- alfanumericke znaky (A-Z, 0-9)
- vylouceni nejednoznacnych znaku (0, O, I, L, 1)
- validace jedinecnosti v databazi
- formatovani s oddelovaci (napr. `ABCD-EFGH-JKMN-PQRS`)

Kazdy kod je jedinecny v ramci celeho obchodu. Plugin overuje jedinecnost pred ulozenim a v pripade kolize generuje novy kod.

## Uplatneni v kosiku

### Pole kodu

Na strance kosiku (a volitelne na strance pokladny) se zobrazuje pole pro zadani kodu darkove karty:

```
[Zadejte kod darkove karty] [Pouzit]
```

Po zadani platneho kodu:

- zustatek karty je zobrazen
- castka slevy je odectena od celkove castky objednavky
- pokud je zustatek karty mensi nez hodnota objednavky - zbytek se plati jinymi zpusoby
- pokud je zustatek karty vetsi - zbyvajici castka zustane na karte

### Validace kodu

Plugin validuje kod karty pred pouzitim:

- kontrola, zda kod existuje v databazi
- kontrola, zda karta nevyprsela
- kontrola, zda je zustatek vetsi nez nula
- kontrola, zda karta nebyla zablokovana

Chybova zprava informuje zakaznika o duvodu odmitnuti kodu.

### Sledovani relace

Pouzity kod karty je uchovan v relaci WooCommerce zakaznika. To znamena, ze:

- kod je zapamatovan i po obnoveni stranky
- kod je odstranen po odeslani objednavky nebo odhlaseni
- zakaznik muze pouzity kod rucne odstranit

## Sledovani zustatku

Kazda darkova karta ma zustatek, ktery se snizuje s kazdym pouzitim. Historie transakci karty obsahuje:

| Pole | Popis |
|------|-------|
| Datum | Datum transakce |
| Typ | Dobiti / Pouziti / Vraceni |
| Castka | Castka operace |
| Objednavka | ID objednavky (pro pouziti a vraceni) |
| Zustatek po operaci | Aktualni zustatek po transakci |

### Administracni panel

V panelu **WooCommerce > Darkove karty** administrator muze:

- prohlizet seznam vsech karet se zustatky
- zkontrolovat historii transakci karty
- rucne dobit kartu
- zablokovat kartu
- exportovat seznam karet (CSV)

## Panel Muj ucet

Modul pridava endpoint `/polski-gift-cards` do panelu Muj ucet zakaznika. Endpoint je dostupny na adrese:

```
/moje-konto/polski-gift-cards/
```

V panelu zakaznik vidi:

- seznam vlastnenych darkovych karet
- aktualni zustatek kazde karty
- historii pouziti
- kod karty (s moznosti kopirovani)
- datum platnosti (pokud je nastaveno)

## Hooky

### `polski_pro/gift_card/validate`

Filtruje vysledek validace kodu darkove karty v kosiku.

```php
/**
 * @param bool   $is_valid  Czy kod jest prawidłowy
 * @param string $code      Kod karty podarunkowej
 * @param float  $cart_total Suma koszyka
 */
apply_filters('polski_pro/gift_card/validate', bool $is_valid, string $code, float $cart_total): bool;
```

**Priklad:**

```php
add_filter('polski_pro/gift_card/validate', function (bool $is_valid, string $code, float $cart_total): bool {
    // Blokování dárkových karet pro objednávky pod 50 Kč
    if ($cart_total < 50.00) {
        wc_add_notice('Karty podarunkowe można wykorzystać przy zamówieniach od 50 zł.', 'error');
        return false;
    }
    return $is_valid;
}, 10, 3);
```

### `polski_pro/gift_card/applied`

Akce volana po pouziti darkove karty v kosiku.

```php
/**
 * @param string $code    Kod karty
 * @param float  $amount  Kwota do odliczenia
 * @param float  $balance Pozostałe saldo
 */
do_action('polski_pro/gift_card/applied', string $code, float $amount, float $balance);
```

**Priklad:**

```php
add_action('polski_pro/gift_card/applied', function (string $code, float $amount, float $balance): void {
    // Logování použití karty
    wc_get_logger()->info(
        "Karta {$code}: odliczono {$amount} zł, saldo: {$balance} zł",
        ['source' => 'polski-pro-gift-cards']
    );
}, 10, 3);
```

### `polski_pro/gift_card/order_created`

Akce volana po vytvoreni objednavky s pouzitim darkove karty.

```php
/**
 * @param int    $order_id ID zamówienia
 * @param string $code     Kod karty
 * @param float  $amount   Kwota odliczona z karty
 */
do_action('polski_pro/gift_card/order_created', int $order_id, string $code, float $amount);
```

**Priklad:**

```php
add_action('polski_pro/gift_card/order_created', function (int $order_id, string $code, float $amount): void {
    $order = wc_get_order($order_id);
    $order->add_order_note(
        sprintf('Użyto kartę podarunkową %s na kwotę %.2f zł', $code, $amount)
    );
}, 10, 3);
```

### `polski_pro/gift_card/calculate_totals`

Filtruje castku k odecteni z darkove karty pri prepocitavani souctu kosiku.

```php
/**
 * @param float  $discount   Kwota rabatu z karty
 * @param string $code       Kod karty
 * @param float  $cart_total Suma koszyka przed rabatem
 */
apply_filters('polski_pro/gift_card/calculate_totals', float $discount, string $code, float $cart_total): float;
```

## E-mail s kodem

Po zaplaceni objednavky obsahujici darkovou kartu plugin odesle e-mail s kodem. E-mail obsahuje:

- kod karty (formatovany)
- nominalni hodnotu
- datum platnosti (pokud se tyka)
- navod k pouziti

Sablonu e-mailu lze prizpusobit v **WooCommerce > Nastaveni > E-maily > Darkova karta**.

### E-mail pro obdarovaneho

Pri nakupu karty zakaznik muze zadat e-mailovou adresu obdarovaneho. V takovem pripade:

- kod je zaslan na adresu obdarovaneho
- kupujici obdrzi potvrzeni nakupu (bez kodu)
- volitelne: kupujici muze pridat zpravu pro obdarovaneho

## Nejcastejsi problemy

### Kod neni akceptovan v kosiku

1. Zkontrolujte, ze kod je zadan spravne (bez mezer na zacatku/konci)
2. Overite, ze karta nevyprsela
3. Zkontrolujte zustatek karty v administracnim panelu
4. Ujistete se, ze karta neni zablokovana

### Zakaznik neobdrzel kod e-mailem

1. Zkontrolujte, ze objednavka je zaplacena (status "Processing" nebo "Completed")
2. Overite konfiguraci e-mailu WooCommerce
3. Zkontrolujte logy e-mailu na chyby odesilani

### Zustatek se nesnizuje po objednavce

1. Zkontrolujte, ze objednavka byla uspesne vytvorena (ne zrusena)
2. Overite historii transakci karty v administracnim panelu
3. Zkontrolujte logy na chyby PHP

## Souvisejici zdroje

- [Prehled PRO](/pro/overview/)
- [Nahlasit problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
