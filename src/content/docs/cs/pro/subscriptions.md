---
title: Predplatne
description: Dokumentace modulu predplatneho Polski PRO for WooCommerce - cyklicke produkty, obnoveni, e-mailove pripominky, cron a panel Muj ucet.
---

Modul predplatneho pridava produkty s cyklickou platbou. Zakaznici nakupuji predplatne s rucnim obnovenim a administrator je spravuje ve WooCommerce.

## Jak to funguje

1. Administrator vytvori produkt typu "Predplatne" s cyklem a cenou
2. Zakaznik koupi predplatne a uhradi prvni objednavku
3. Plugin vytvori predplatne se stavem "Aktivni"
4. Pred datem obnoveni zakaznik obdrzi e-mailovou pripominku
5. V den obnoveni plugin vytvori objednavku obnoveni
6. Zakaznik uhradi objednavku obnoveni (rucni obnoveni)
7. Cyklus se opakuje az do zruseni predplatneho

## Konfigurace

Prejdete do **WooCommerce > Nastaveni > Polski > Moduly PRO > Predplatne**.

Modul je ovladan volbou:

```
polski_subscriptions
```

### Obecna nastaveni

| Nastaveni | Popis |
|------------|------|
| Zapnout predplatne | Aktivuje modul |
| Rezim obnoveni | Rucni (zakaznik hradi objednavku) |
| Prvni pripominka | Kolik dni pred obnovenim odeslat prvni pripominku (vychozi 14) |
| Druha pripominka | Kolik dni pred obnovenim odeslat druhou pripominku (vychozi 7) |
| Ochranna lhuta | Kolik dni po terminu obnoveni zustava predplatne aktivni (vychozi 7) |
| Automaticke pozastaveni | Pozastavit predplatne po uplynuti ochranne lhuty |

### Vytvoreni produktu predplatneho

1. Prejdete do **Produkty > Pridat novy**
2. Vyberte typ produktu: **Predplatne**
3. Nakonfigurujte cenu a cyklus:

| Pole | Popis |
|------|------|
| Cena predplatneho | Castka za zuctovaci obdobi |
| Zuctovaci obdobi | Den / Tyden / Mesic / Rok |
| Delka obdobi | Pocet obdobi (napr. 1 mesic, 3 mesice) |
| Pocatecni cena | Volitelna - jina cena za prvni obdobi |
| Aktivacni poplatek | Volitelny - jednorazovy poplatek pri prvni objednavce |
| Limit obnoveni | 0 = bez limitu, nebo pocet obnoveni |

4. Publikujte produkt

### Pocatecni cena vs cena obnoveni

Cena za prvni obdobi muze byt jina nez za nasledujici. Pouziti:

- zkusebni obdobi zdarma nebo za snizenou cenu
- promo cena na start
- aktivacni poplatek + nizsi cyklicka cena

Pocatecni cena se tyka pouze prvni objednavky. Nasledujici obnoveni maji standardni cenu.

## Zivotni cyklus predplatneho

```
Pending → Active → On Hold → Active → ...
                  → Expired
                  → Cancelled
```

| Stav | Popis |
|--------|------|
| Pending | Cekajici na uhradu prvni objednavky |
| Active | Aktivni - zakaznik ma pristup k produktu |
| On Hold | Pozastavene - objednavka obnoveni ceka na uhradu |
| Expired | Vyprsele - pocet obnoveni dosahl limitu nebo uplynula ochranna lhuta |
| Cancelled | Zruseno zakaznikem nebo administratorem |

## Obnoveni

### Rucni obnoveni

Plugin podporuje rucni obnoveni:

1. Plugin vytvori objednavku obnoveni se stavem "Cekajici na platbu"
2. Zakaznik obdrzi e-mail s odkazem na uhradu objednavky
3. Zakaznik uhradi objednavku zvolenou platebni metodou
4. Po uhrade je predplatne obnoveno na dalsi obdobi

### Proces obnoveni

Plugin kontroluje predplatne k obnoveni denne pres WP-Cron:

```
polski_daily_maintenance
```

Denni cron uloha:

- kontroluje predplatne k obnoveni
- vytvari objednavky obnoveni
- pozastavuje predplatne po ochranne lhute
- ukoncuje predplatne po dosazeni limitu obnoveni

### E-mailove pripominky

Plugin posila dve e-mailove pripominky pred datem obnoveni:

| E-mail | Kdy | Obsah |
|--------|-------|-------|
| Prvni pripominka | 14 dni pred obnovenim (konfigurovatelne) | Informace o blizicim se obnoveni, castka, **odkaz na zruseni jednim kliknutim** |
| Druha pripominka | 7 dni pred obnovenim (konfigurovatelne) | Posledni pripominka, castka, odkaz na zruseni a odkaz na panel |
| Objednavka obnoveni | V den obnoveni | Objednavka k uhrade s odkazem na platbu |
| Predplatne pozastaveno | Po uplynuti terminu platby | Informace o pozastaveni, odkaz na uhradu |
| Predplatne vyprselo | Po uplynuti ochranne lhuty | Informace o vyprseni, odkaz na opakovany nakup |

:::tip[Soulad s pravem EU]
Obe pripominky obsahuji odkaz na zruseni predplatneho jednim kliknutim. To naplnuje evropske pozadavky tykajici se snadnosti odhlaseni z cyklickych sluzeb (mj. UOKiK, Smernice o pravech spotrebitele).
:::

Sablony e-mailu lze prizpusobit v **WooCommerce > Nastaveni > E-maily**.

## Panel Muj ucet

Modul pridava sekci v Muj ucet na adrese:

```
/moje-konto/polski-subscriptions/
```

### Seznam predplatnych

Zakaznik vidi tabulku s predplatnymi:

| Sloupec | Popis |
|---------|------|
| Produkt | Nazev produktu predplatneho |
| Stav | Aktualni stav predplatneho |
| Cena | Castka za obdobi |
| Dalsi obnoveni | Datum nasledujiciho obnoveni |
| Akce | Zrusit / Uhradit obnoveni |

### Detaily predplatneho

Po kliknuti na predplatne zakaznik vidi:

- uplne udaje predplatneho (produkt, cena, cyklus, data)
- historii obnoveni (seznam souvisejicich objednavek)
- tlacitko zruseni predplatneho
- tlacitko uhrady cekajiciho obnoveni (pokud se tyka)

### Zruseni predplatneho

Zakaznik muze zrusit aktivni predplatne v Muj ucet. Zruseni:

- meni stav predplatneho na "Cancelled"
- predplatne zustava aktivni do konce aktualniho uhrazeneho obdobi
- zakaznik je informovan o datu ukonceni pristupu

## Hooky

### `polski_pro/subscription/status_changed`

Akce volana po zmene stavu predplatneho.

```php
/**
 * @param int    $subscription_id ID predplatneho
 * @param string $new_status      Novy stav
 * @param string $old_status      Predchozi stav
 */
do_action('polski_pro/subscription/status_changed', int $subscription_id, string $new_status, string $old_status);
```

**Priklad:**

```php
add_action('polski_pro/subscription/status_changed', function (int $subscription_id, string $new_status, string $old_status): void {
    if ($new_status === 'cancelled') {
        $subscription = polski_pro_get_subscription($subscription_id);
        // Odeslani dotazniku o duvod ukonceni
        wp_mail(
            $subscription->get_customer_email(),
            'Skoda, ze odchazite',
            'Reknete nam, proc rusite predplatne: https://example.com/ankieta'
        );
    }
}, 10, 3);
```

### `polski_pro/subscription/renewal_created`

Akce volana po vytvoreni objednavky obnoveni.

```php
/**
 * @param int $order_id        ID objednavky obnoveni
 * @param int $subscription_id ID predplatneho
 */
do_action('polski_pro/subscription/renewal_created', int $order_id, int $subscription_id);
```

**Priklad:**

```php
add_action('polski_pro/subscription/renewal_created', function (int $order_id, int $subscription_id): void {
    $order = wc_get_order($order_id);
    $order->add_order_note(
        sprintf('Objednavka obnoveni pro predplatne #%d', $subscription_id)
    );
}, 10, 2);
```

### `polski_pro/subscription/renewal_paid`

Akce volana po uhrade objednavky obnoveni.

```php
/**
 * @param int $order_id        ID objednavky obnoveni
 * @param int $subscription_id ID predplatneho
 */
do_action('polski_pro/subscription/renewal_paid', int $order_id, int $subscription_id);
```

### Hooky pripominek o obnoveni (1.8.2+)

Engine pripominek (14 dni + 7 dni pred obnovenim) zpristupnuje filtry a akce pro plnou personalizaci:

```php
// Zmen okna pripominek (ve dnech)
add_filter('polski_subscription_reminder_windows', fn ($w) => ['first' => 21, 'second' => 7, 'last' => 1]);

// Zmen predmet e-mailu
add_filter('polski_subscription_reminder_subject', fn ($subject, $sub, $type) => "[$type] $subject", 10, 3);

// Zmen obsah e-mailu
add_filter('polski_subscription_reminder_body', fn ($body, $sub, $type) => $body . "\n\nDekujeme!", 10, 3);

// Dalsi hlavicky (napr. HTML mode)
add_filter('polski_subscription_reminder_headers', fn () => ['Content-Type: text/html; charset=UTF-8']);

// Preskoc pripominku pro konkretni predplatne
add_filter('polski_subscription_skip_reminder', fn ($skip, $sub) => $sub->productId === 42, 10, 2);

// Sleduj odeslani
add_action('polski_subscription_reminder_sent', fn ($sub, $type, $days) => error_log("Sent $type to $sub->email"), 10, 3);
add_action('polski_subscription_reminder_failed', fn ($sub, $type) => error_log("Failed $type"), 10, 2);
```

### Oznameni o zmene ceny (1.8.3+)

`SubscriptionRepository::updateRecurringAmount()` detekuje zmenu castky a automaticky posila e-mail zakaznikovi s:
- starou a novou castkou,
- datem vstupu zmeny v platnost (nasledujici zuctovaci cyklus),
- odkazem one-click cancel (pozadavky EU consumer protection).

Hooky:

```php
// Sleduj zmenu castky
add_action('polski_subscription_amount_changed', function (int $id, float $previous, float $next) {
    error_log("Subscription $id: $previous -> $next");
}, 10, 3);

// Personalizuj obsah e-mailu
add_filter('polski_subscription_amount_change_body', fn ($body, $sub, $prev, $next) => $body, 10, 4);

// Sleduj vysledek odeslani
add_action('polski_subscription_amount_change_notified', fn ($sub, $prev, $next, $sent) => null, 10, 4);
```

## Administracni panel

### Seznam predplatnych

Prejdete do **WooCommerce > Predplatne**. Tabulka obsahuje:

- ID predplatneho
- zakaznik (jmeno, prijmeni, e-mail)
- produkt
- stav
- cena a cyklus
- datum nasledujiciho obnoveni
- datum vytvoreni

Dostupne filtry: stav, produkt, datum vytvoreni.

### Editace predplatneho

Administrator muze:

- zmenit stav predplatneho
- zmenit datum nasledujiciho obnoveni
- zmenit cenu (ovlivni nasledujici obnoveni)
- pridat poznamku
- prochazet historii stavu a souvisejici objednavky

## Nejcastejsi problemy

### Objednavky obnoveni se nevytvareji

1. Zkontrolujte, zda WP-Cron funguje spravne (`wp_cron` je volan)
2. Prejdete do **Nastroje > Scheduled Actions** a zkontrolujte, zda je uloha `polski_daily_maintenance` naplanovana
3. Overte, zda ma predplatne stav "Active" a spravne datum obnoveni

### Zakaznik nedostava pripominky

1. Zkontrolujte konfiguraci e-mailu WooCommerce
2. Overte, zda je sablona e-mailu pripominky zapnuta
3. Zkontrolujte nastaveni "Dny pripominky" - zda je vetsi nez 0

### Predplatne nemeni stav po uhrade

1. Zkontrolujte, zda ma objednavka obnoveni spravne propojeni s predplatnym
2. Overte logy WooCommerce, zda neobsahuji chyby
3. Zkontrolujte, zda platebni brana spravne meni stav objednavky

## Souvisejici zdroje

- [Prehled PRO](/pro/overview/)
- [Nahlasit problem](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stranka ma vyhradne informativni charakter a nepredstavuje pravni poradenstvi. Pred nasazenim se poradte s pravnikem. Polski for WooCommerce je open source software (GPLv2) poskytovany bez zaruky.</div>
