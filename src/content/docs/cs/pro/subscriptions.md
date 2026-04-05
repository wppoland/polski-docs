---
title: Predplatne
description: Dokumentace modulu predplatneho Polski PRO for WooCommerce - cyklicke produkty, obnovy, e-mailove pripominky, cron a panel Muj ucet.
---

Modul predplatneho pridava podporu produktu s opakovanou platbou. Zakaznici nakupuji predplatne s automatickou nebo rucni obnovou. Administrator spravuje zivotni cyklus predplatneho ve WooCommerce.

## Jak to funguje

1. Administrator vytvori produkt typu "Predplatne" s cyklem a cenou
2. Zakaznik zakoupi predplatne a zaplati prvni objednavku
3. Plugin vytvori predplatne se statusem "Aktivni"
4. Pred datem obnovy zakaznik obdrzi e-mailovou pripominku
5. V den obnovy plugin vytvori objednavku obnovy
6. Zakaznik zaplati objednavku obnovy (rucni obnova)
7. Cyklus se opakuje do zruseni predplatneho

## Konfigurace

Prejdete do **WooCommerce > Nastaveni > Polski > Moduly PRO > Predplatne**.

Modul je rizen moznosti:

```
polski_subscriptions
```

### Obecna nastaveni

| Nastaveni | Popis |
|-----------|-------|
| Zapnout predplatne | Aktivuje modul |
| Rezim obnovy | Rucni (zakaznik plati objednavku) |
| Dny pripominky | Kolik dnu pred obnovov poslat pripominku (vychozi 3) |
| Obdobi odkladu | Kolik dnu po terminu obnovy predplatne zustava aktivni (vychozi 7) |
| Automaticke pozastaveni | Pozastavit predplatne po uplynutu obdobi odkladu |

### Vytvoreni produktu s predplatnym

1. Prejdete do **Produkty > Pridat novy**
2. Vyberte typ produktu: **Predplatne**
3. Nakonfigurujte cenu a cyklus:

| Pole | Popis |
|------|-------|
| Cena predplatneho | Castka za zuctovaci obdobi |
| Zuctovaci obdobi | Den / Tyden / Mesic / Rok |
| Delka obdobi | Pocet obdobi (napr. 1 mesic, 3 mesice) |
| Pocatecni cena | Volitelne - jina cena za prvni obdobi |
| Aktivacni poplatek | Volitelne - jednorazovy poplatek u prvni objednavky |
| Limit obnov | 0 = bez limitu, nebo pocet obnov |

4. Publikujte produkt

### Pocatecni cena vs cena obnovy

Plugin podporuje scenare, kdy se cena za prvni obdobi lisi od ceny za nasledujici obdobi. Typicka pouziti:

- zkusebni obdobi zdarma nebo za snizenou cenu
- promo cena na start
- aktivacni poplatek + nizsi cyklicka cena

Pocatecni cena se pouziva pouze pro prvni objednavku. Dalsi objednavky obnovy pouzivaji standardni cenu predplatneho.

## Zivotni cyklus predplatneho

```
Pending → Active → On Hold → Active → ...
                  → Expired
                  → Cancelled
```

| Status | Popis |
|--------|-------|
| Pending | Cekajici na zaplaceni prvni objednavky |
| Active | Aktivni - zakaznik ma pristup k produktu |
| On Hold | Pozastaveno - objednavka obnovy ceka na zaplaceni |
| Expired | Vyprelo - pocet obnov dosahl limitu nebo uplylo obdobi odkladu |
| Cancelled | Zruseno zakaznikem nebo administratorem |

## Obnovy

### Rucni obnova

V aktualni verzi plugin podporuje rucni obnovy. To znamena, ze:

1. Plugin vytvori objednavku obnovy se statusem "Ceka na platbu"
2. Zakaznik obdrzi e-mail s odkazem na zaplaceni objednavky
3. Zakaznik zaplati objednavku zvolenym zpusobem platby
4. Po zaplaceni je predplatne obnoveno na dalsi obdobi

### Proces obnovy

Plugin kontroluje predplatna k obnove denne pomoci WP cronu:

```
polski_daily_maintenance
```

Uloha cron se spousti jednou denne a provadi:

- kontrolu predplatnych, jejichz datum obnovy pripada na dnesek nebo drive
- vytvoreni objednavek obnovy pro predplatna vyzadujici obnovu
- pozastaveni predplatnych, ktera prekrocila obdobi odkladu
- ukonceni predplatnych, ktera dosahla limitu obnov

### E-mailove pripominky

Plugin odesila e-mailove pripominky pred datem obnovy:

| E-mail | Kdy | Obsah |
|--------|-----|-------|
| Pripominka obnovy | X dnu pred obnovov | Informace o blizici se obnove, castka, odkaz do panelu |
| Objednavka obnovy | V den obnovy | Objednavka k zaplaceni s odkazem na platbu |
| Predplatne pozastaveno | Po uplynutu terminu platby | Informace o pozastaveni, odkaz na zaplaceni |
| Predplatne vyprselo | Po uplynutu obdobi odkladu | Informace o vyprseni, odkaz na opetovny nakup |

Sablony e-mailu lze prizpusobit v **WooCommerce > Nastaveni > E-maily**.

## Panel Muj ucet

Modul pridava endpoint `/polski-subscriptions` do panelu Muj ucet zakaznika. Endpoint je dostupny na adrese:

```
/moje-konto/polski-subscriptions/
```

### Seznam predplatnych

Zakaznik vidi tabulku s predplatnymi:

| Sloupec | Popis |
|---------|-------|
| Produkt | Nazev produktu s predplatnym |
| Status | Aktualni status predplatneho |
| Cena | Castka za obdobi |
| Dalsi obnova | Datum dalsi obnovy |
| Akce | Zrusit / Zaplatit obnovu |

### Detail predplatneho

Po kliknuti na predplatne zakaznik vidi:

- uplne udaje predplatneho (produkt, cena, cyklus, data)
- historii obnov (seznam souvisejicich objednavek)
- tlacitko zruseni predplatneho
- tlacitko zaplaceni cekajici obnovy (pokud se tyka)

### Zruseni predplatneho

Zakaznik muze zrusit aktivni predplatne z panelu Muj ucet. Zruseni:

- zmeni status predplatneho na "Cancelled"
- predplatne zustava aktivni do konce aktualniho zaplaceneho obdobi
- zakaznik je informovan o datu ukonceni pristupu

## Hooky

### `polski_pro/subscription/status_changed`

Akce volana po zmene statusu predplatneho.

```php
/**
 * @param int    $subscription_id ID subskrypcji
 * @param string $new_status      Nowy status
 * @param string $old_status      Poprzedni status
 */
do_action('polski_pro/subscription/status_changed', int $subscription_id, string $new_status, string $old_status);
```

**Priklad:**

```php
add_action('polski_pro/subscription/status_changed', function (int $subscription_id, string $new_status, string $old_status): void {
    if ($new_status === 'cancelled') {
        $subscription = polski_pro_get_subscription($subscription_id);
        // Odeslání ankety o důvodu zrušení
        wp_mail(
            $subscription->get_customer_email(),
            'Szkoda, że odchodzisz',
            'Powiedz nam, dlaczego anulujesz subskrypcję: https://example.com/ankieta'
        );
    }
}, 10, 3);
```

### `polski_pro/subscription/renewal_created`

Akce volana po vytvoreni objednavky obnovy.

```php
/**
 * @param int $order_id        ID zamówienia odnowienia
 * @param int $subscription_id ID subskrypcji
 */
do_action('polski_pro/subscription/renewal_created', int $order_id, int $subscription_id);
```

**Priklad:**

```php
add_action('polski_pro/subscription/renewal_created', function (int $order_id, int $subscription_id): void {
    $order = wc_get_order($order_id);
    $order->add_order_note(
        sprintf('Zamówienie odnowienia dla subskrypcji #%d', $subscription_id)
    );
}, 10, 2);
```

### `polski_pro/subscription/renewal_paid`

Akce volana po zaplaceni objednavky obnovy.

```php
/**
 * @param int $order_id        ID zamówienia odnowienia
 * @param int $subscription_id ID subskrypcji
 */
do_action('polski_pro/subscription/renewal_paid', int $order_id, int $subscription_id);
```

## Administracni panel

### Seznam predplatnych

Prejdete do **WooCommerce > Predplatne**. Tabulka obsahuje:

- ID predplatneho
- zakaznik (jmeno, prijmeni, e-mail)
- produkt
- status
- cena a cyklus
- datum dalsi obnovy
- datum vytvoreni

Dostupne filtry: status, produkt, datum vytvoreni.

### Uprava predplatneho

Administrator muze:

- zmenit status predplatneho
- zmenit datum dalsi obnovy
- zmenit cenu (ovlivni dalsi obnovy)
- pridat poznamku
- prohlizet historii statusu a souvisejici objednavky

## Nejcastejsi problemy

### Objednavky obnovy se nevytvareji

1. Zkontrolujte, ze WP-Cron funguje spravne (`wp_cron` je volany)
2. Prejdete do **Nastroje > Scheduled Actions** a zkontrolujte, ze uloha `polski_daily_maintenance` je naplanowana
3. Overite, ze predplatne ma status "Active" a spravne datum obnovy

### Zakaznik nedostava pripominky

1. Zkontrolujte konfiguraci e-mailu WooCommerce
2. Overite, ze sablona e-mailu pripominky je zapnuta
3. Zkontrolujte nastaveni "Dny pripominky" - zda je vetsi nez 0

### Predplatne nemeni status po zaplaceni

1. Zkontrolujte, ze objednavka obnovy ma spravne spojeni s predplatnym
2. Overite logy WooCommerce na chyby
3. Zkontrolujte, ze platebni brana spravne meni status objednavky

## Souvisejici zdroje

- [Prehled PRO](/pro/overview/)
- [Nahlasit problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
