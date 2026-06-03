---
title: Dárkové karty
description: Dokumentace dárkových karet Polski PRO for WooCommerce - prodej, generování kódů, uplatnění v košíku, sledování zůstatku a panel Můj účet.
---

Modul dárkových karet umožňuje prodávat karty jako produkty WooCommerce. Zákazník koupí kartu, obdrží kód a platí jím při dalších objednávkách.

## Jak to funguje

1. Administrátor vytvoří produkt typu "Dárková karta"
2. Zákazník koupí dárkovou kartu v obchodě
3. Po zaplacení objednávky plugin vygeneruje jedinečný kód karty
4. Kód je odeslán zákazníkovi (nebo obdarovanému) e-mailem
5. Obdarovaný zadá kód v košíku a obdrží slevu rovnou hodnotě karty
6. Zůstatek karty se sníží o použitou částku

## Konfigurace

Přejděte do **WooCommerce > Nastavení > Polski > Moduly PRO > Dárkové karty**.

Modul je řízen volbou:

```
polski_gift_cards
```

### Obecná nastavení

| Nastavení | Popis |
|------------|------|
| Zapnout dárkové karty | Aktivuje modul |
| Délka kódu | Počet znaků kódu (výchozí 16) |
| Formát kódu | Vzor kódu (např. `XXXX-XXXX-XXXX-XXXX`) |
| Prefix kódu | Volitelný prefix (např. `PL-`) |
| Platnost karty | Počet dní platnosti (0 = bez limitu) |
| Pole kódu v košíku | Pozice pole pro zadání kódu |

### Vytvoření produktu dárkové karty

1. Přejděte do **Produkty > Přidat nový**
2. Vyberte typ produktu: **Dárková karta**
3. Nastavte cenu (nominální hodnota karty)
4. Volitelně: zapněte "Libovolná částka" - zákazník sám zadá hodnotu karty
5. Volitelně: nastavte minimální a maximální částku pro libovolnou částku
6. Publikujte produkt

U libovolné částky vidí zákazník pole pro zadání hodnoty karty namísto pevné ceny.

## Generování kódů

Kódy se generují automaticky po zaplacení objednávky. Vlastnosti kódů:

- alfanumerické znaky (A-Z, 0-9)
- vyloučení nejednoznačných znaků (0, O, I, L, 1)
- validace jedinečnosti v databázi
- formátování s oddělovači (např. `ABCD-EFGH-JKMN-PQRS`)

Každý kód je jedinečný. Při kolizi plugin vygeneruje nový kód.

## Uplatnění v košíku

### Pole kódu

V košíku (a volitelně na pokladně) vidí zákazník pole pro zadání kódu:

```
[Zadejte kód dárkové karty] [Použít]
```

Po zadání správného kódu:

- zobrazí se zůstatek karty
- částka slevy se odečte od součtu objednávky
- pokud je zůstatek karty nižší než hodnota objednávky - zbytek se zaplatí jinými metodami
- pokud je zůstatek karty vyšší - zbývající částka zůstane na kartě

### Validace kódu

Plugin kontroluje kód před použitím:

- kontrola, zda kód existuje v databázi
- kontrola, zda karta nevypršela
- kontrola, zda je zůstatek větší než nula
- kontrola, zda karta nebyla zablokována

Zákazník vidí zprávu s důvodem odmítnutí kódu.

### Sledování relace

Kód karty je uložen v relaci WooCommerce:

- kód je zapamatován i po obnovení stránky
- kód je odstraněn po odeslání objednávky nebo odhlášení
- zákazník může použitý kód odstranit ručně

## Sledování zůstatku

Zůstatek karty se snižuje s každým použitím. Historie transakcí obsahuje:

| Pole | Popis |
|------|------|
| Datum | Datum transakce |
| Typ | Dobití / Použití / Vrácení |
| Částka | Částka operace |
| Objednávka | ID objednávky (pro použití a vrácení) |
| Zůstatek po operaci | Aktuální zůstatek po transakci |

### Administrátorský panel

V panelu **WooCommerce > Dárkové karty** může administrátor:

- prohlížet seznam všech karet se zůstatky
- zkontrolovat historii transakcí karty
- dobít kartu ručně
- zablokovat kartu
- exportovat seznam karet (CSV)

## Panel Můj účet

Modul přidává sekci v panelu Můj účet na adrese:

```
/moje-konto/polski-gift-cards/
```

V panelu zákazník vidí:

- seznam vlastněných dárkových karet
- aktuální zůstatek každé karty
- historii použití
- kód karty (s možností kopírování)
- datum platnosti (pokud nastaveno)

## Hooky

### `polski_pro/gift_card/validate`

Filtruje výsledek validace kódu dárkové karty v košíku.

```php
/**
 * @param bool   $is_valid  Czy kod jest prawidłowy
 * @param string $code      Kod karty podarunkowej
 * @param float  $cart_total Suma koszyka
 */
apply_filters('polski_pro/gift_card/validate', bool $is_valid, string $code, float $cart_total): bool;
```

**Příklad:**

```php
add_filter('polski_pro/gift_card/validate', function (bool $is_valid, string $code, float $cart_total): bool {
    // Blokowanie kart podarunkowych dla zamówień poniżej 50 zł
    if ($cart_total < 50.00) {
        wc_add_notice('Karty podarunkowe można wykorzystać przy zamówieniach od 50 zł.', 'error');
        return false;
    }
    return $is_valid;
}, 10, 3);
```

### `polski_pro/gift_card/applied`

Akce volaná po uplatnění dárkové karty v košíku.

```php
/**
 * @param string $code    Kod karty
 * @param float  $amount  Kwota do odliczenia
 * @param float  $balance Pozostałe saldo
 */
do_action('polski_pro/gift_card/applied', string $code, float $amount, float $balance);
```

**Příklad:**

```php
add_action('polski_pro/gift_card/applied', function (string $code, float $amount, float $balance): void {
    // Logowanie użycia karty
    wc_get_logger()->info(
        "Karta {$code}: odliczono {$amount} zł, saldo: {$balance} zł",
        ['source' => 'polski-pro-gift-cards']
    );
}, 10, 3);
```

### `polski_pro/gift_card/order_created`

Akce volaná po vytvoření objednávky s použitím dárkové karty.

```php
/**
 * @param int    $order_id ID zamówienia
 * @param string $code     Kod karty
 * @param float  $amount   Kwota odliczona z karty
 */
do_action('polski_pro/gift_card/order_created', int $order_id, string $code, float $amount);
```

**Příklad:**

```php
add_action('polski_pro/gift_card/order_created', function (int $order_id, string $code, float $amount): void {
    $order = wc_get_order($order_id);
    $order->add_order_note(
        sprintf('Użyto kartę podarunkową %s na kwotę %.2f zł', $code, $amount)
    );
}, 10, 3);
```

### `polski_pro/gift_card/calculate_totals`

Filtruje částku k odečtení z dárkové karty při přepočtu součtů košíku.

```php
/**
 * @param float  $discount   Kwota rabatu z karty
 * @param string $code       Kod karty
 * @param float  $cart_total Suma koszyka przed rabatem
 */
apply_filters('polski_pro/gift_card/calculate_totals', float $discount, string $code, float $cart_total): float;
```

## E-mail s kódem

Po zaplacení objednávky plugin odesílá e-mail s kódem karty. E-mail obsahuje:

- kód karty (formátovaný)
- nominální hodnotu
- datum platnosti (pokud se týká)
- návod k použití

Šablonu e-mailu lze přizpůsobit v **WooCommerce > Nastavení > E-maily > Dárková karta**.

### E-mail pro obdarovaného

Zákazník může zadat e-mail obdarovaného. Pak:

- kód je odeslán na adresu obdarovaného
- kupující obdrží potvrzení nákupu (bez kódu)
- volitelně: kupující může přidat zprávu pro obdarovaného

## Nejčastější problémy

### Kód není přijat v košíku

1. Zkontrolujte, zda je kód zadán správně (bez mezer na začátku/konci)
2. Ověřte, zda karta nevypršela
3. Zkontrolujte zůstatek karty v administrátorském panelu
4. Ujistěte se, že karta není zablokována

### Zákazník neobdržel kód e-mailem

1. Zkontrolujte, zda je objednávka zaplacena (stav "Processing" nebo "Completed")
2. Ověřte konfiguraci e-mailů WooCommerce
3. Zkontrolujte logy e-mailů z hlediska chyb odesílání

### Zůstatek se nesnižuje po objednávce

1. Zkontrolujte, zda byla objednávka úspěšně odeslána (nezrušena)
2. Ověřte historii transakcí karty v administrátorském panelu
3. Zkontrolujte logy z hlediska chyb PHP

## Související zdroje

- [Přehled PRO](/pro/overview/)
- [Nahlásit problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má výhradně informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) dodávaný bez záruky.</div>
