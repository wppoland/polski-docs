---
title: Oznámení social proof
description: Modul oznámení social proof v Polski for WooCommerce - vyskakující oznámení o nedávných nákupech budující důvěru zákazníků.
---

Oznámení social proof jsou plovoucí zprávy (toast notifications) informující návštěvníky o nedávných nákupech jiných zákazníků. Mechanismus sociálního důkazu vybízí k nákupu tím, že ukazuje, že další zákazníci v obchodě aktivně nakupují.

## Zapnutí modulu

Přejděte do **WooCommerce > Polski > Moduly obchodu** a zapněte **Social proof**. Oznámení se začnou objevovat automaticky na základě nedávných objednávek WooCommerce.

## Funkce

- Plovoucí oznámení o nedávných nákupech
- Data získávaná ze skutečných objednávek WooCommerce přes AJAX
- Cache transient API (5 minut) pro výkon
- Anonymizace jmen zákazníků (např. "Jan K.")
- Konfigurovatelná frekvence a doba zobrazení
- Výběr pozice na obrazovce (4 rohy)
- Možnost skrytí na mobilních zařízeních
- Náhled produktu v oznámení

## Nastavení

Konfigurace v **WooCommerce > Polski > Moduly obchodu > Social proof**.

| Nastavení | Výchozí | Popis |
|---|---|---|
| `display_interval` | `30` | Odstup mezi oznámeními (sekundy) |
| `display_duration` | `5` | Doba zobrazení jednoho oznámení (sekundy) |
| `position` | `bottom-left` | Pozice na obrazovce: `bottom-left`, `bottom-right`, `top-left`, `top-right` |
| `anonymize_name` | `true` | Anonymizovat jména zákazníků (Jan Novák -> Jan N.) |
| `hide_on_mobile` | `false` | Skrýt oznámení na mobilních zařízeních |

Možnost v databázi: `polski_social_proof`.

## Formát oznámení

Každé oznámení obsahuje:

- Náhled produktu
- Jméno zákazníka (s volitelnou anonymizací)
- Název produktu s odkazem
- Čas nákupu (např. "před 2 hodinami")

Příklad: **Jan N.** koupil **Polo tričko** - před 2 hodinami

## Technické podrobnosti

### Zdroj dat

Oznámení se generují z nedávných objednávek WooCommerce se stavem `completed` nebo `processing`. Modul načítá až 20 posledních objednávek a náhodně je rotuje v oznámeních.

### Cache

Data objednávek jsou cachována v transient API s dobou vypršení 5 minut (`polski_social_proof_data`). Díky tomu oznámení negenerují dotazy do databáze při každém zobrazení.

### Soubory

- JavaScript: `assets/js/social-proof.js`

Skript se načítá podmíněně a získává data přes AJAX endpoint.

### Hooky

```php
// Filtr dat zobrazených v oznámení
add_filter('polski/social_proof/notification_data', function (array $data): array {
    // Skrýt produkty z určité kategorie
    if (has_term('vip', 'product_cat', $data['product_id'])) {
        return [];
    }
    return $data;
});

// Změna počtu objednávek načítaných do rotace
add_filter('polski/social_proof/orders_limit', function (): int {
    return 50;
});

// Změna doby cache
add_filter('polski/social_proof/cache_expiration', function (): int {
    return 10 * MINUTE_IN_SECONDS;
});
```

### CSS třídy

- `.polski-social-proof` - kontejner oznámení
- `.polski-social-proof--visible` - viditelný stav (s animací)
- `.polski-social-proof__image` - náhled produktu
- `.polski-social-proof__content` - obsah oznámení
- `.polski-social-proof__name` - jméno zákazníka
- `.polski-social-proof__product` - název produktu
- `.polski-social-proof__time` - čas nákupu
- `.polski-social-proof__close` - tlačítko zavření

### ID modulu

`social_proof`

## Řešení problémů

**Oznámení se neobjevují** - zkontrolujte, zda má obchod objednávky se stavem `completed` nebo `processing`. Modul vyžaduje alespoň jednu objednávku k zobrazování oznámení.

**Oznámení se zobrazují příliš často/příliš zřídka** - upravte nastavení `display_interval` a `display_duration`.

**Oznámení zakrývají jiné prvky** - změňte pozici v nastavení nebo upravte `z-index` v CSS: `.polski-social-proof { z-index: 9999; }`.

Hlášení problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
