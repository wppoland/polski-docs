---
title: Oznámenia social proof
description: Modul oznámení social proof v Polski for WooCommerce - vyskakujúce oznámenia o nedávnych nákupoch budujúce dôveru zákazníkov.
---

Oznámenia social proof sú plávajúce správy (toast notifications) informujúce návštevníkov o nedávnych nákupoch iných zákazníkov. Mechanizmus sociálneho dôkazu nabáda k nákupu tým, že ukazuje, že iní zákazníci v obchode aktívne nakupujú.

## Zapnutie modulu

Prejdite do **WooCommerce > Polski > Moduly obchodu** a zapnite **Social proof**. Oznámenia sa začnú objavovať automaticky na základe nedávnych objednávok WooCommerce.

## Funkcie

- Plávajúce oznámenia o nedávnych nákupoch
- Dáta načítavané zo skutočných objednávok WooCommerce cez AJAX
- Cache transient API (5 minút) pre výkon
- Anonymizácia mien zákazníkov (napr. "Jan K.")
- Konfigurovateľná frekvencia a čas zobrazenia
- Výber pozície na obrazovke (4 rohy)
- Možnosť skrytia na mobilných zariadeniach
- Miniatúra produktu v oznámení

## Nastavenia

Konfigurácia v **WooCommerce > Polski > Moduly obchodu > Social proof**.

| Nastavenie | Predvolene | Popis |
|---|---|---|
| `display_interval` | `30` | Odstup medzi oznámeniami (sekundy) |
| `display_duration` | `5` | Čas zobrazenia jedného oznámenia (sekundy) |
| `position` | `bottom-left` | Pozícia na obrazovke: `bottom-left`, `bottom-right`, `top-left`, `top-right` |
| `anonymize_name` | `true` | Anonymizovať mená zákazníkov (Jan Kowalski -> Jan K.) |
| `hide_on_mobile` | `false` | Skryť oznámenia na mobilných zariadeniach |

Možnosť v databáze: `polski_social_proof`.

## Formát oznámenia

Každé oznámenie obsahuje:

- Miniatúru produktu
- Meno zákazníka (s voliteľnou anonymizáciou)
- Názov produktu s odkazom
- Čas nákupu (napr. "pred 2 hodinami")

Príklad: **Jan K.** kúpil **Polo tričko** - pred 2 hodinami

## Technické detaily

### Zdroj dát

Oznámenia sa generujú z nedávnych objednávok WooCommerce so stavom `completed` alebo `processing`. Modul načíta až 20 posledných objednávok a náhodne ich rotuje v oznámeniach.

### Cache

Dáta objednávok sa cachujú v transient API s časom vypršania 5 minút (`polski_social_proof_data`). Vďaka tomu oznámenia negenerujú dotazy na databázu pri každom zobrazení.

### Súbory

- JavaScript: `assets/js/social-proof.js`

Skript sa načítava podmienečne a načíta dáta cez AJAX endpoint.

### Hooky

```php
// Filtrovať dáta zobrazené v oznámení
add_filter('polski/social_proof/notification_data', function (array $data): array {
    // Skryť produkty z určitej kategórie
    if (has_term('vip', 'product_cat', $data['product_id'])) {
        return [];
    }
    return $data;
});

// Zmeniť počet objednávok načítaných na rotáciu
add_filter('polski/social_proof/orders_limit', function (): int {
    return 50;
});

// Zmeniť čas cache
add_filter('polski/social_proof/cache_expiration', function (): int {
    return 10 * MINUTE_IN_SECONDS;
});
```

### CSS triedy

- `.polski-social-proof` - kontajner oznámenia
- `.polski-social-proof--visible` - viditeľný stav (s animáciou)
- `.polski-social-proof__image` - miniatúra produktu
- `.polski-social-proof__content` - obsah oznámenia
- `.polski-social-proof__name` - meno zákazníka
- `.polski-social-proof__product` - názov produktu
- `.polski-social-proof__time` - čas nákupu
- `.polski-social-proof__close` - tlačidlo zatvorenia

### ID modulu

`social_proof`

## Riešenie problémov

**Oznámenia sa neobjavujú** - skontrolujte, či má obchod objednávky so stavom `completed` alebo `processing`. Modul vyžaduje aspoň jednu objednávku na zobrazovanie oznámení.

**Oznámenia sa zobrazujú príliš často/príliš zriedka** - upravte nastavenia `display_interval` a `display_duration`.

**Oznámenia zakrývajú iné prvky** - zmeňte pozíciu v nastaveniach alebo upravte `z-index` v CSS: `.polski-social-proof { z-index: 9999; }`.

Hlásenie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informatívny charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
