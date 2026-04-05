---
title: Darčekové karty
description: Dokumentácia darčekových kariet Polski PRO for WooCommerce - predaj, generovanie kódov, uplatnenie v košíku, sledovanie zostatku a panel Môj účet.
---

Modul darčekových kariet v Polski PRO for WooCommerce umožňuje predaj darčekových kariet ako produktov WooCommerce. Zákazníci môžu kúpiť kartu, dostať unikátny kód a použiť ho ako formu platby pri ďalších objednávkach.

## Ako to funguje

1. Administrátor vytvorí produkt typu "Darčeková karta"
2. Zákazník kúpi darčekovú kartu v obchode
3. Po uhradení objednávky plugin vygeneruje unikátny kód karty
4. Kód je odoslaný zákazníkovi (alebo obdarovanému) e-mailom
5. Obdarovaný zadá kód v košíku a dostane zľavu rovnajúcu sa hodnote karty
6. Zostatok karty sa zníži o použitú sumu

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski > Moduly PRO > Darčekové karty**.

Modul je riadený voľbou:

```
polski_gift_cards
```

### Všeobecné nastavenia

| Nastavenie | Popis |
|------------|------|
| Zapnúť darčekové karty | Aktivuje modul |
| Dĺžka kódu | Počet znakov kódu (predvolene 16) |
| Formát kódu | Vzor kódu (napr. `XXXX-XXXX-XXXX-XXXX`) |
| Prefix kódu | Voliteľný prefix (napr. `PL-`) |
| Platnosť karty | Počet dní platnosti (0 = bez limitu) |
| Pole kódu v košíku | Pozícia poľa na zadanie kódu |

### Vytvorenie produktu darčekovej karty

1. Prejdite do **Produkty > Pridať nový**
2. Vyberte typ produktu: **Darčeková karta**
3. Nastavte cenu (nominálna hodnota karty)
4. Voliteľne: zapnite "Ľubovoľná suma" - zákazník si sám zadá hodnotu karty
5. Voliteľne: nastavte minimálnu a maximálnu sumu pre ľubovoľnú sumu
6. Publikujte produkt

Pre ľubovoľnú sumu zákazník vidí pole na zadanie hodnoty karty namiesto stanovenej ceny.

## Generovanie kódov

Kódy darčekových kariet sú generované automaticky po uhradení objednávky. Algoritmus:

- alfanumerické znaky (A-Z, 0-9)
- vylúčenie nejednoznačných znakov (0, O, I, L, 1)
- validácia unikátnosti v databáze
- formátovanie so separátormi (napr. `ABCD-EFGH-JKMN-PQRS`)

Každý kód je unikátny v rámci celého obchodu. Plugin overuje unikátnosť pred uložením a v prípade kolízie generuje nový kód.

## Uplatnenie v košíku

### Pole kódu

Na stránke košíka (a voliteľne na stránke checkoutu) sa zobrazuje pole na zadanie kódu darčekovej karty:

```
[Zadajte kód darčekovej karty] [Použiť]
```

Po zadaní platného kódu:

- zobrazí sa zostatok karty
- suma zľavy sa odčíta od celkovej sumy objednávky
- ak je zostatok karty menší ako hodnota objednávky - zvyšok sa platí inými metódami
- ak je zostatok karty väčší - zostávajúca suma zostáva na karte

### Validácia kódu

Plugin validuje kód karty pred použitím:

- kontrola, či kód existuje v databáze
- kontrola, či karta nevypršala
- kontrola, či je zostatok väčší ako nula
- kontrola, či karta nie je zablokovaná

Chybová správa informuje zákazníka o príčine odmietnutia kódu.

### Sledovanie relácie

Použitý kód karty je uchovávaný v relácii WooCommerce zákazníka. To znamená, že:

- kód je zapamätaný aj po obnovení stránky
- kód je odstránený po odoslaní objednávky alebo odhlásení
- zákazník môže použitý kód odstrániť manuálne

## Sledovanie zostatku

Každá darčeková karta má zostatok, ktorý sa znižuje s každým použitím. História transakcií karty obsahuje:

| Pole | Popis |
|------|------|
| Dátum | Dátum transakcie |
| Typ | Dobitie / Použitie / Vrátenie |
| Suma | Suma operácie |
| Objednávka | ID objednávky (pre použitie a vrátenie) |
| Zostatok po operácii | Aktuálny zostatok po transakcii |

### Administračný panel

V paneli **WooCommerce > Darčekové karty** administrátor môže:

- prehliadať zoznam všetkých kariet so zostatkami
- skontrolovať históriu transakcií karty
- dobiť kartu manuálne
- zablokovať kartu
- exportovať zoznam kariet (CSV)

## Panel Môj účet

Modul pridáva endpoint `/polski-gift-cards` do panelu Môj účet zákazníka. Endpoint je dostupný na adrese:

```
/moje-konto/polski-gift-cards/
```

V paneli zákazník vidí:

- zoznam vlastnených darčekových kariet
- aktuálny zostatok každej karty
- históriu použitia
- kód karty (s možnosťou kopírovania)
- dátum platnosti (ak je nastavený)

## Hooky

### `polski_pro/gift_card/validate`

Filtruje výsledok validácie kódu darčekovej karty v košíku.

```php
/**
 * @param bool   $is_valid  Czy kod jest prawidłowy
 * @param string $code      Kod karty podarunkowej
 * @param float  $cart_total Suma koszyka
 */
apply_filters('polski_pro/gift_card/validate', bool $is_valid, string $code, float $cart_total): bool;
```

**Príklad:**

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

Akcia volaná po použití darčekovej karty v košíku.

```php
/**
 * @param string $code    Kod karty
 * @param float  $amount  Kwota do odliczenia
 * @param float  $balance Pozostałe saldo
 */
do_action('polski_pro/gift_card/applied', string $code, float $amount, float $balance);
```

**Príklad:**

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

Akcia volaná po vytvorení objednávky s použitím darčekovej karty.

```php
/**
 * @param int    $order_id ID zamówienia
 * @param string $code     Kod karty
 * @param float  $amount   Kwota odliczona z karty
 */
do_action('polski_pro/gift_card/order_created', int $order_id, string $code, float $amount);
```

**Príklad:**

```php
add_action('polski_pro/gift_card/order_created', function (int $order_id, string $code, float $amount): void {
    $order = wc_get_order($order_id);
    $order->add_order_note(
        sprintf('Użyto kartę podarunkową %s na kwotę %.2f zł', $code, $amount)
    );
}, 10, 3);
```

### `polski_pro/gift_card/calculate_totals`

Filtruje sumu na odpočítanie z darčekovej karty pri prepočítavaní súm košíka.

```php
/**
 * @param float  $discount   Kwota rabatu z karty
 * @param string $code       Kod karty
 * @param float  $cart_total Suma koszyka przed rabatem
 */
apply_filters('polski_pro/gift_card/calculate_totals', float $discount, string $code, float $cart_total): float;
```

## E-mail s kódom

Po uhradení objednávky obsahujúcej darčekovú kartu plugin odošle e-mail s kódom. E-mail obsahuje:

- kód karty (naformátovaný)
- nominálnu hodnotu
- dátum platnosti (ak sa vzťahuje)
- návod na použitie

Šablónu e-mailu je možné prispôsobiť v **WooCommerce > Nastavenia > E-maily > Darčeková karta**.

### E-mail pre obdarovaného

Pri kúpe karty môže zákazník zadať e-mailovú adresu obdarovaného. V takom prípade:

- kód je odoslaný na adresu obdarovaného
- kupujúci dostane potvrdenie o kúpe (bez kódu)
- voliteľne: kupujúci môže pridať správu pre obdarovaného

## Najčastejšie problémy

### Kód nie je akceptovaný v košíku

1. Skontrolujte, či je kód zadaný správne (bez medzier na začiatku/konci)
2. Overte, či karta nevypršala
3. Skontrolujte zostatok karty v administračnom paneli
4. Uistite sa, že karta nie je zablokovaná

### Zákazník nedostal kód e-mailom

1. Skontrolujte, či je objednávka uhradená (stav "Processing" alebo "Completed")
2. Overte konfiguráciu e-mailov WooCommerce
3. Skontrolujte logy e-mailov na chyby odosielania

### Zostatok sa neznižuje po objednávke

1. Skontrolujte, či bola objednávka úspešne odoslaná (nie zrušená)
2. Overte históriu transakcií karty v administračnom paneli
3. Skontrolujte logy na PHP chyby

## Súvisiace zdroje

- [Prehľad PRO](/pro/overview/)
- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
