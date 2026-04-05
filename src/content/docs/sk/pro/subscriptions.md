---
title: Predplatné
description: Dokumentácia modulu predplatného Polski PRO for WooCommerce - cyklické produkty, obnovenia, e-mailové pripomienky, cron a panel Môj účet.
---

Modul predplatného pridáva produkty s cyklickou platbou. Zákazníci kupujú predplatné s ručným obnovovaním a administrátor ich spravuje vo WooCommerce.

## Ako to funguje

1. Administrátor vytvorí produkt typu "Predplatné" s cyklom a cenou
2. Zákazník kúpi predplatné a uhradí prvú objednávku
3. Plugin vytvorí predplatné so stavom "Aktívne"
4. Pred dátumom obnovenia zákazník dostane e-mailovú pripomienku
5. V deň obnovenia plugin vytvorí objednávku obnovenia
6. Zákazník uhradí objednávku obnovenia (manuálne obnovenie)
7. Cyklus sa opakuje do zrušenia predplatného

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski > Moduly PRO > Predplatné**.

Modul je riadený voľbou:

```
polski_subscriptions
```

### Všeobecné nastavenia

| Nastavenie | Popis |
|------------|------|
| Zapnúť predplatné | Aktivuje modul |
| Režim obnovenia | Manuálne (zákazník uhradí objednávku) |
| Dni pripomienky | Koľko dní pred obnovením odoslať pripomienku (predvolene 3) |
| Obdobie odkladu | Koľko dní po lehote obnovenia predplatné zostáva aktívne (predvolene 7) |
| Automatické pozastavenie | Pozastaviť predplatné po uplynutí obdobia odkladu |

### Vytvorenie produktu predplatného

1. Prejdite do **Produkty > Pridať nový**
2. Vyberte typ produktu: **Predplatné**
3. Nakonfigurujte cenu a cyklus:

| Pole | Popis |
|------|------|
| Cena predplatného | Suma za zúčtovacie obdobie |
| Zúčtovacie obdobie | Deň / Týždeň / Mesiac / Rok |
| Dĺžka obdobia | Počet období (napr. 1 mesiac, 3 mesiace) |
| Počiatočná cena | Voliteľná - iná cena za prvé obdobie |
| Aktivačný poplatok | Voliteľný - jednorazový poplatok pri prvej objednávke |
| Limit obnovení | 0 = bez limitu, alebo počet obnovení |

4. Publikujte produkt

### Počiatočná cena vs cena obnovenia

Plugin podporuje scenáre, v ktorých sa cena za prvé obdobie líši od ceny za ďalšie obdobia. Typické použitie:

- skúšobné obdobie zadarmo alebo za zníženú cenu
- akciová cena na úvod
- aktivačný poplatok + nižšia cyklická cena

Počiatočná cena sa uplatňuje iba na prvú objednávku. Ďalšie objednávky obnovenia používajú štandardnú cenu predplatného.

## Životný cyklus predplatného

```
Pending → Active → On Hold → Active → ...
                  → Expired
                  → Cancelled
```

| Stav | Popis |
|--------|------|
| Pending | Čaká na uhradenie prvej objednávky |
| Active | Aktívne - zákazník má prístup k produktu |
| On Hold | Pozastavené - objednávka obnovenia čaká na uhradenie |
| Expired | Vypršané - počet obnovení dosiahol limit alebo uplynulo obdobie odkladu |
| Cancelled | Zrušené zákazníkom alebo administrátorom |

## Obnovenia

### Manuálne obnovenie

V aktuálnej verzii plugin podporuje manuálne obnovenia. To znamená, že:

1. Plugin vytvorí objednávku obnovenia so stavom "Čaká na platbu"
2. Zákazník dostane e-mail s odkazom na uhradenie objednávky
3. Zákazník uhradí objednávku zvolenou platobnou metódou
4. Po uhradení je predplatné obnovené na ďalšie obdobie

### Proces obnovenia

Plugin kontroluje predplatné na obnovenie denne pomocou WP cronu:

```
polski_daily_maintenance
```

Úloha cron sa spúšťa raz denne a vykonáva:

- kontrolu predplatných, ktorých dátum obnovenia pripadá na dnes alebo skôr
- vytvorenie objednávok obnovenia pre predplatné vyžadujúce obnovenie
- pozastavenie predplatných, ktoré prekročili obdobie odkladu
- expiráciu predplatných, ktoré dosiahli limit obnovení

### E-mailové pripomienky

Plugin odosiela e-mailové pripomienky pred dátumom obnovenia:

| E-mail | Kedy | Obsah |
|--------|-------|-------|
| Pripomienka obnovenia | X dní pred obnovením | Informácia o blížiacom sa obnovení, suma, odkaz na panel |
| Objednávka obnovenia | V deň obnovenia | Objednávka na uhradenie s odkazom na platbu |
| Predplatné pozastavené | Po uplynutí lehoty platby | Informácia o pozastavení, odkaz na uhradenie |
| Predplatné vypršané | Po uplynutí obdobia odkladu | Informácia o vypršaní, odkaz na opätovný nákup |

Šablóny e-mailov je možné prispôsobiť v **WooCommerce > Nastavenia > E-maily**.

## Panel Môj účet

Modul pridáva endpoint `/polski-subscriptions` do panelu Môj účet zákazníka. Endpoint je dostupný na adrese:

```
/moje-konto/polski-subscriptions/
```

### Zoznam predplatných

Zákazník vidí tabuľku s predplatnými:

| Stĺpec | Popis |
|---------|------|
| Produkt | Názov produktu predplatného |
| Stav | Aktuálny stav predplatného |
| Cena | Suma za obdobie |
| Ďalšie obnovenie | Dátum ďalšieho obnovenia |
| Akcie | Zrušiť / Uhradiť obnovenie |

### Podrobnosti predplatného

Po kliknutí na predplatné zákazník vidí:

- úplné údaje predplatného (produkt, cena, cyklus, dátumy)
- históriu obnovení (zoznam prepojených objednávok)
- tlačidlo zrušenia predplatného
- tlačidlo uhradenia čakajúceho obnovenia (ak sa vzťahuje)

### Zrušenie predplatného

Zákazník môže zrušiť aktívne predplatné z panelu Môj účet. Zrušenie:

- zmení stav predplatného na "Cancelled"
- predplatné zostáva aktívne do konca aktuálneho uhradeného obdobia
- zákazník je informovaný o dátume ukončenia prístupu

## Hooky

### `polski_pro/subscription/status_changed`

Akcia volaná po zmene stavu predplatného.

```php
/**
 * @param int    $subscription_id ID subskrypcji
 * @param string $new_status      Nowy status
 * @param string $old_status      Poprzedni status
 */
do_action('polski_pro/subscription/status_changed', int $subscription_id, string $new_status, string $old_status);
```

**Príklad:**

```php
add_action('polski_pro/subscription/status_changed', function (int $subscription_id, string $new_status, string $old_status): void {
    if ($new_status === 'cancelled') {
        $subscription = polski_pro_get_subscription($subscription_id);
        // Wysłanie ankiety o powód rezygnacji
        wp_mail(
            $subscription->get_customer_email(),
            'Szkoda, że odchodzisz',
            'Powiedz nam, dlaczego anulujesz subskrypcję: https://example.com/ankieta'
        );
    }
}, 10, 3);
```

### `polski_pro/subscription/renewal_created`

Akcia volaná po vytvorení objednávky obnovenia.

```php
/**
 * @param int $order_id        ID zamówienia odnowienia
 * @param int $subscription_id ID subskrypcji
 */
do_action('polski_pro/subscription/renewal_created', int $order_id, int $subscription_id);
```

**Príklad:**

```php
add_action('polski_pro/subscription/renewal_created', function (int $order_id, int $subscription_id): void {
    $order = wc_get_order($order_id);
    $order->add_order_note(
        sprintf('Zamówienie odnowienia dla subskrypcji #%d', $subscription_id)
    );
}, 10, 2);
```

### `polski_pro/subscription/renewal_paid`

Akcia volaná po uhradení objednávky obnovenia.

```php
/**
 * @param int $order_id        ID zamówienia odnowienia
 * @param int $subscription_id ID subskrypcji
 */
do_action('polski_pro/subscription/renewal_paid', int $order_id, int $subscription_id);
```

## Administračný panel

### Zoznam predplatných

Prejdite do **WooCommerce > Predplatné**. Tabuľka obsahuje:

- ID predplatného
- zákazník (meno, priezvisko, e-mail)
- produkt
- stav
- cena a cyklus
- dátum ďalšieho obnovenia
- dátum vytvorenia

Dostupné filtre: stav, produkt, dátum vytvorenia.

### Úprava predplatného

Administrátor môže:

- zmeniť stav predplatného
- zmeniť dátum ďalšieho obnovenia
- zmeniť cenu (ovplyvní ďalšie obnovenia)
- pridať poznámku
- prehliadať históriu stavov a prepojené objednávky

## Najčastejšie problémy

### Objednávky obnovenia sa nevytvárajú

1. Skontrolujte, či WP-Cron funguje správne (`wp_cron` je volaný)
2. Prejdite do **Nástroje > Scheduled Actions** a skontrolujte, či je úloha `polski_daily_maintenance` naplánovaná
3. Overte, či má predplatné stav "Active" a správny dátum obnovenia

### Zákazník nedostáva pripomienky

1. Skontrolujte konfiguráciu e-mailov WooCommerce
2. Overte, či je šablóna e-mailu pripomienky zapnutá
3. Skontrolujte nastavenie "Dni pripomienky" - či je väčšie ako 0

### Predplatné nemení stav po uhradení

1. Skontrolujte, či má objednávka obnovenia správne prepojenie s predplatným
2. Overte logy WooCommerce na chyby
3. Skontrolujte, či platobná brána správne mení stav objednávky

## Súvisiace zdroje

- [Prehľad PRO](/pro/overview/)
- [Nahlásiť problém](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
