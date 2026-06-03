---
title: Integrácia InPost (Paczkomaty)
description: Modul integrácie InPost ShipX API v Polski PRO for WooCommerce - Paczkomaty, generovanie štítkov, mapa odberných miest a sledovanie zásielok.
---

Modul InPost integruje WooCommerce s API ShipX. Generujte štítky, umožnite zákazníkom vybrať Paczkomat na mape a sledujte zásielky z admin panela.

:::note[Požiadavky]
Polski PRO vyžaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Navyše je potrebný aktívny API token InPost ShipX (získaný z panela manažéra InPost).
:::

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski PRO > InPost**.

### Overenie API

| Nastavenie | Popis |
|------------|------|
| API token | Autorizačný token z panela InPost Manager |
| ID organizácie | Identifikátor organizácie v systéme InPost |
| Režim sandbox | Používa testovacie prostredie ShipX API |

Token sa odosiela v hlavičke `Authorization: Bearer {token}`. Musí mať oprávnenia na vytváranie zásielok a štítkov.

### Nastavenia metódy dopravy

Po nakonfigurovaní API vytvorte novú metódu dopravy:

1. Prejdite do **WooCommerce > Nastavenia > Doprava > Zóny dopravy**
2. Upravte zónu "Poľsko"
3. Kliknite na "Pridať metódu dopravy"
4. Vyberte "InPost Paczkomat" alebo "InPost Kuriér"

| Nastavenie metódy | Predvolená hodnota | Popis |
|-------------------|------------------|------|
| Názov metódy | "InPost Paczkomat" | Názov zobrazený zákazníkovi |
| Cena | 0 | Cena dopravy (0 = zadarmo) |
| Doprava zadarmo od | "" | Suma objednávky, od ktorej je doprava zadarmo |
| Predvolená veľkosť balíka | A | Veľkosť: `A`, `B`, `C` |
| Poistenie | Nie | Pridaj poistenie k zásielke |

## Mapa odberných miest

### Widget mapy

Po výbere "InPost Paczkomat" v pokladni sa zobrazí interaktívny widget mapy.

Widget ponúka:

- **Mapu** so značkami Paczkomatov
- **Vyhľadávanie podľa mesta** - zadajte názov mesta na vycentrovanie mapy
- **Vyhľadávanie podľa súradníc** - automatická geolokalizácia (so súhlasom používateľa)
- **Vyhľadávanie podľa PSČ** - nájdite najbližšie Paczkomaty
- **Zoznam Paczkomatov** - zoradený od najbližšieho
- **Detaily miesta** - adresa, otváracie hodiny, dostupné veľkosti schránok

### Vyhľadávanie podľa mesta

Widget odosiela požiadavku na endpoint ShipX API:

```
GET /v1/points?type=parcel_locker&city={city}&per_page=25
```

Výsledky sa cachujú na 24 hodín v transients WordPressu.

### Vyhľadávanie podľa súradníc

Keď zákazník udelí súhlas s geolokalizáciou:

```
GET /v1/points?type=parcel_locker&relative_point={lat},{lng}&per_page=10
```

### Filtrovanie miest

```php
/**
 * Filtruje zoznam odberných miest InPost.
 *
 * @param array  $points  Pole odberných miest z API
 * @param string $city    Hľadané mesto
 * @param array  $coords  Súradnice [lat, lng] alebo prázdne pole
 */
apply_filters('polski_pro/inpost/points', array $points, string $city, array $coords): array;
```

**Príklad - vylúčenie dočasne nedostupných miest:**

```php
add_filter('polski_pro/inpost/points', function (array $points, string $city, array $coords): array {
    $excluded_points = ['KRA123', 'WAW456']; // Dočasne vypnuté
    return array_filter($points, function (array $point) use ($excluded_points): bool {
        return ! in_array($point['name'], $excluded_points, true);
    });
}, 10, 3);
```

## Generovanie štítkov

### Z panela objednávky

V paneli **InPost** na stránke objednávky:

1. **Generovať štítok** - vytvorí zásielku v API ShipX a vygeneruje štítok PDF
2. **Stiahnuť štítok** - stiahne vygenerovaný štítok
3. **Tlačiť štítok** - otvorí náhľad tlače

### Hromadné generovanie

Označte viacero objednávok v zozname a vyberte "Generovať štítky InPost". Štítky sa generujú na pozadí. Po dokončení stiahnite súbor ZIP.

### Údaje zásielky

Štítok sa generuje na základe:

| Pole | Zdroj | Popis |
|------|--------|------|
| Odosielateľ | Nastavenia obchodu | Adresa a firemné údaje z WooCommerce |
| Príjemca | Údaje objednávky | Meno, priezvisko, telefón, e-mail |
| Odberné miesto | Výber zákazníka | ID Paczkomatu vybraného v pokladni |
| Veľkosť balíka | Nastavenie metódy | Alebo prepísanie v objednávke |
| Suma dobierky | Objednávka COD | Iba pre objednávky na dobierku |

### Hook generovania štítku

```php
/**
 * Filtruje údaje zásielky pred odoslaním do API ShipX.
 *
 * @param array     $shipment_data Údaje zásielky
 * @param \WC_Order $order         Objednávka WooCommerce
 */
apply_filters('polski_pro/inpost/shipment_data', array $shipment_data, \WC_Order $order): array;
```

**Príklad - pridanie referencie objednávky:**

```php
add_filter('polski_pro/inpost/shipment_data', function (array $shipment_data, \WC_Order $order): array {
    $shipment_data['reference'] = sprintf('ORDER-%s', $order->get_order_number());
    return $shipment_data;
}, 10, 2);
```

## Sledovanie zásielok

### Automatické sledovanie

Po vygenerovaní štítku modul kontroluje stav zásielky každé 2 hodiny (WP-Cron). Stavy sa mapujú na stavy WooCommerce:

| Stav InPost | Stav WooCommerce | Popis |
|---------------|-------------------|------|
| `created` | `processing` | Zásielka vytvorená |
| `dispatched_by_sender` | `processing` | Podaná odosielateľom |
| `collected_from_sender` | `shipped` | Prevzatá od odosielateľa |
| `out_for_delivery` | `shipped` | Doručuje sa |
| `ready_to_pickup` | `shipped` | Pripravená na odber v Paczkomate |
| `delivered` | `completed` | Doručená / prevzatá |

### Notifikácie zákazníka

Zákazník dostane e-mail s odkazom na sledovanie na stránke InPost. Odkaz sa pridáva do:

- E-mailu "Objednávka sa spracúva"
- Stránky "Môj účet > Objednávky > Detaily"
- Poznámok objednávky (viditeľných pre zákazníka)

### Hook sledovania

```php
/**
 * Akcia vyvolaná po aktualizácii stavu zásielky.
 *
 * @param int      $order_id      ID objednávky
 * @param string   $tracking_number Číslo sledovania
 * @param string   $old_status    Predchádzajúci stav InPost
 * @param string   $new_status    Nový stav InPost
 */
do_action('polski_pro/inpost/status_updated', int $order_id, string $tracking_number, string $old_status, string $new_status);
```

**Príklad - SMS notifikácia o pripravenosti na odber:**

```php
add_action('polski_pro/inpost/status_updated', function (
    int $order_id,
    string $tracking_number,
    string $old_status,
    string $new_status
): void {
    if ($new_status === 'ready_to_pickup') {
        $order = wc_get_order($order_id);
        $phone = $order->get_billing_phone();
        send_sms($phone, sprintf(
            'Tvoj balík %s čaká v Paczkomate. Kód na odber je v e-maile.',
            $tracking_number
        ));
    }
}, 10, 4);
```

## Veľkosti balíkov

| Veľkosť | Rozmery (cm) | Max hmotnosť |
|---------|-------------|----------|
| A | 8 x 38 x 64 | 25 kg |
| B | 19 x 38 x 64 | 25 kg |
| C | 41 x 38 x 64 | 25 kg |

Veľkosť balíka je možné nastaviť globálne, na metódu dopravy alebo ručne prepísať v objednávke.

## Riešenie problémov

**Mapa Paczkomatov sa nenačíta**
Skontrolujte, či je API token správny a aktívny. Skontrolujte konzolu prehliadača na chyby CORS alebo JavaScript. Uistite sa, že skript `polski-pro-inpost-map.js` je načítaný.

**Chyba generovania štítku "Unauthorized"**
API token vypršal alebo nemá oprávnenia na vytváranie zásielok. Vygenerujte nový token v paneli InPost Manager.

**Stav zásielky sa neaktualizuje**
Skontrolujte, či WP-Cron funguje správne. Spustite ručne: `wp cron event run polski_pro_inpost_tracking`.

## Ďalšie kroky

- Nahlasujte problémy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Dokumentácia API ShipX: [https://docs.inpost24.com/](https://docs.inpost24.com/)

<div class="disclaimer">Táto stránka má výlučne informačný charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
