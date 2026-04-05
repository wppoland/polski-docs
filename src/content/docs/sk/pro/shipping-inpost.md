---
title: Integrácia InPost (Packomaty)
description: Modul integrácie InPost ShipX API v Polski PRO for WooCommerce - Packomaty, generovanie štítkov, mapa odberných miest a sledovanie zásielok.
---

Modul InPost integruje WooCommerce s API ShipX InPost, čo umožňuje generovanie prepravných štítkov, výber odberného miesta zákazníkom na mape, vyhľadávanie Packomatov a sledovanie zásielok priamo z administračného panelu.

:::note[Požiadavky]
Polski PRO vyžaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Dodatočne je potrebný aktívny token API InPost ShipX (získaný z panelu managera InPost).
:::

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski PRO > InPost**.

### Autentifikácia API

| Nastavenie | Popis |
|------------|------|
| Token API | Autorizačný token z panelu InPost Manager |
| ID organizácie | Identifikátor organizácie v systéme InPost |
| Sandbox režim | Používa testovacie prostredie ShipX API |

Token API sa odovzdáva v hlavičke `Authorization: Bearer {token}` ku každej požiadavke ShipX API. Token by mal mať oprávnenia na vytváranie zásielok a generovanie štítkov.

### Nastavenia metódy dopravy

Po nakonfigurovaní API vytvorte novú metódu dopravy:

1. Prejdite do **WooCommerce > Nastavenia > Doprava > Zóny dopravy**
2. Upravte zónu "Poľsko"
3. Kliknite "Pridať metódu dopravy"
4. Vyberte "InPost Packomat" alebo "InPost Kuriér"

| Nastavenie metódy | Predvolená hodnota | Popis |
|-------------------|------------------|------|
| Názov metódy | "InPost Paczkomat" | Názov zobrazovaný zákazníkovi |
| Cena | 0 | Cena dopravy (0 = zadarmo) |
| Doprava zadarmo od | "" | Suma objednávky, od ktorej je doprava zadarmo |
| Predvolená veľkosť balíka | A | Veľkosť: `A`, `B`, `C` |
| Poistenie | Nie | Pridať poistenie k zásielke |

## Mapa odberných miest

### Widget mapy

Na stránke checkoutu po výbere metódy dopravy "InPost Packomat" sa zobrazuje interaktívny widget mapy umožňujúci výber Packomatu.

Widget ponúka:

- **Mapu** s pinmi Packomatov
- **Vyhľadávanie podľa mesta** - zadajte názov mesta na vycentrovanie mapy
- **Vyhľadávanie podľa súradníc** - automatická geolokácia (so súhlasom používateľa)
- **Vyhľadávanie podľa PSČ** - nájdite najbližšie Packomaty
- **Zoznam Packomatov** - zoradený od najbližšieho
- **Podrobnosti bodu** - adresa, otváracie hodiny, dostupné veľkosti priehradok

### Vyhľadávanie podľa mesta

Widget odosiela požiadavku na endpoint ShipX API:

```
GET /v1/points?type=parcel_locker&city={city}&per_page=25
```

Výsledky sú kešované 24 hodín v transientoch WordPress, aby sa minimalizoval počet požiadaviek na API.

### Vyhľadávanie podľa súradníc

Keď zákazník vyjadrí súhlas s geolokáciou:

```
GET /v1/points?type=parcel_locker&relative_point={lat},{lng}&per_page=10
```

### Filtrovanie bodov

```php
/**
 * Filtruje listę punktów odbioru InPost.
 *
 * @param array  $points  Tablica punktów odbioru z API
 * @param string $city    Wyszukiwane miasto
 * @param array  $coords  Współrzędne [lat, lng] lub pusta tablica
 */
apply_filters('polski_pro/inpost/points', array $points, string $city, array $coords): array;
```

**Príklad - vylúčenie dočasne nedostupných bodov:**

```php
add_filter('polski_pro/inpost/points', function (array $points, string $city, array $coords): array {
    $excluded_points = ['KRA123', 'WAW456']; // Dočasne vypnuté
    return array_filter($points, function (array $point) use ($excluded_points): bool {
        return ! in_array($point['name'], $excluded_points, true);
    });
}, 10, 3);
```

## Generovanie štítkov

### Z panelu objednávky

Na stránke úpravy objednávky v paneli **InPost** sú dostupné voľby:

1. **Generovať štítok** - vytvorí zásielku v API ShipX a vygeneruje PDF štítok
2. **Stiahnuť štítok** - stiahne vygenerovaný štítok
3. **Vytlačiť štítok** - otvorí náhľad tlače

### Hromadné generovanie

Na zozname objednávok zaškrtnite viacero objednávok a vyberte hromadnú akciu "Generovať štítky InPost". Štítky sa generujú asynchrónne - po dokončení sa zobrazí upozornenie s odkazom na stiahnutie ZIP súboru.

### Dáta zásielky

Štítok sa generuje na základe:

| Pole | Zdroj | Popis |
|------|--------|------|
| Odosielateľ | Nastavenia obchodu | Adresa a údaje firmy z WooCommerce |
| Príjemca | Dáta objednávky | Meno, priezvisko, telefón, e-mail |
| Odberné miesto | Výber zákazníka | ID Packomatu vybraného na checkоute |
| Veľkosť balíka | Nastavenie metódy | Alebo prepísanie v objednávke |
| Suma dobierky | Objednávka COD | Iba pre objednávky na dobierku |

### Hook generovania štítku

```php
/**
 * Filtruje dane przesyłki przed wysłaniem do API ShipX.
 *
 * @param array     $shipment_data Dane przesyłki
 * @param \WC_Order $order         Zamówienie WooCommerce
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

Po vygenerovaní štítku modul automaticky kontroluje stav zásielky každé 2 hodiny (WP-Cron). Stavy sú mapované na stavy objednávok WooCommerce:

| Stav InPost | Stav WooCommerce | Popis |
|---------------|-------------------|------|
| `created` | `processing` | Zásielka vytvorená |
| `dispatched_by_sender` | `processing` | Odoslaná odosielateľom |
| `collected_from_sender` | `shipped` | Prevzatá od odosielateľa |
| `out_for_delivery` | `shipped` | V doručení |
| `ready_to_pickup` | `shipped` | Pripravená na vyzdvihnutie v Packomate |
| `delivered` | `completed` | Doručená / vyzdvihnutá |

### Notifikácie zákazníka

Zákazník dostane e-mail s odkazom na sledovanie zásielky na stránke InPost. Odkaz na sledovanie je pridaný do:

- E-mailu "Objednávka v spracovaní"
- Stránky "Môj účet > Objednávky > Podrobnosti"
- Poznámok objednávky (viditeľných pre zákazníka)

### Hook sledovania

```php
/**
 * Akcja wywoływana po aktualizacji statusu przesyłki.
 *
 * @param int      $order_id      ID zamówienia
 * @param string   $tracking_number Numer śledzenia
 * @param string   $old_status    Poprzedni status InPost
 * @param string   $new_status    Nowy status InPost
 */
do_action('polski_pro/inpost/status_updated', int $order_id, string $tracking_number, string $old_status, string $new_status);
```

**Príklad - SMS notifikácia o pripravenosti na vyzdvihnutie:**

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
            'Twoja paczka %s czeka w Paczkomacie. Kod odbioru w e-mailu.',
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

Veľkosť balíka je možné nastaviť globálne, per metóda dopravy alebo prepísať manuálne v objednávke.

## Riešenie problémov

**Mapa Packomatov sa nenačítava**
Skontrolujte, či je token API správny a aktívny. Skontrolujte konzolu prehliadača na CORS alebo JavaScript chyby. Uistite sa, že skript `polski-pro-inpost-map.js` je načítaný.

**Chyba generovania štítku "Unauthorized"**
Token API vypršal alebo nemá oprávnenia na vytváranie zásielok. Vygenerujte nový token v paneli InPost Manager.

**Stav zásielky sa neaktualizuje**
Skontrolujte, či WP-Cron funguje správne. Spustite manuálne: `wp cron event run polski_pro_inpost_tracking`.

## Ďalšie kroky

- Hlásenie problémov: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Dokumentácia API ShipX: [https://docs.inpost24.com/](https://docs.inpost24.com/)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
