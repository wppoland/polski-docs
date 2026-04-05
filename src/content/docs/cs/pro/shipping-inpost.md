---
title: Integrace InPost (Paczkomaty)
description: Modul integrace InPost ShipX API v Polski PRO for WooCommerce - Paczkomaty, generovani stitku, mapa odbernich mist a sledovani zasilek.
---

Modul InPost integruje WooCommerce s API ShipX InPost, umoznuje generovani prepravnich stitku, vyber odberniho mista zakaznikem na mape, vyhledavani Paczkomatou a sledovani zasilek primo z administracniho panelu.

:::note[Pozadavky]
Polski PRO vyzaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Navic je vyzadovan aktivni token API InPost ShipX (ziskavany z panelu managera InPost).
:::

## Konfigurace

Prejdete do **WooCommerce > Nastaveni > Polski PRO > InPost**.

### Autentizace API

| Nastaveni | Popis |
|-----------|-------|
| API token | Autorizacni token z panelu InPost Manager |
| ID organizace | Identifikator organizace v systemu InPost |
| Rezim sandbox | Pouziva testovaci prostredi ShipX API |

API token je predavan v hlavicce `Authorization: Bearer {token}` ke kazdemu pozadavku ShipX API. Token by mel mit opravneni pro vytvareni zasilek a generovani stitku.

### Nastaveni metody doruceni

Po konfiguraci API vytvorte novou metodu doruceni:

1. Prejdete do **WooCommerce > Nastaveni > Doruceni > Zony doruceni**
2. Upravte zonu "Polsko"
3. Kliknete "Pridat metodu doruceni"
4. Vyberte "InPost Paczkomat" nebo "InPost Kurier"

| Nastaveni metody | Vychozi hodnota | Popis |
|------------------|-----------------|-------|
| Nazev metody | "InPost Paczkomat" | Nazev zobrazeny zakaznikovi |
| Naklady | 0 | Naklady na doruceni (0 = zdarma) |
| Doruceni zdarma od | "" | Castka objednavky, od ktere je doruceni zdarma |
| Vychozi velikost baliku | A | Velikost: `A`, `B`, `C` |
| Pojisteni | Ne | Pridat pojisteni k zasilce |

## Mapa odbernich mist

### Widget mapy

Na strance pokladny, po vyberu metody doruceni "InPost Paczkomat", se zobrazuje interaktivni widget mapy umoznujici vyber Paczkomatou.

Widget nabizi:

- **Mapu** s pinezkami Paczkomatou
- **Vyhledavani podle mesta** - zadejte nazev mesta pro vycentrovani mapy
- **Vyhledavani podle souradnic** - automaticka geolokalizace (se souhlasem uzivatele)
- **Vyhledavani podle PSC** - najde nejblizsi Paczkomaty
- **Seznam Paczkomatou** - serazeny od nejblizsiho
- **Detail mista** - adresa, oteviraci doba, dostupne velikosti schranek

### Vyhledavani podle mesta

Widget odesila dotaz na endpoint ShipX API:

```
GET /v1/points?type=parcel_locker&city={city}&per_page=25
```

Vysledky jsou cachovany po dobu 24 hodin v transients WordPressu, aby se minimalizoval pocet dotazu na API.

### Vyhledavani podle souradnic

Kdyz zakaznik udeli souhlas s geolokalizaci:

```
GET /v1/points?type=parcel_locker&relative_point={lat},{lng}&per_page=10
```

### Filtrovani mist

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

**Priklad - vylouceni docasne nedostupnych mist:**

```php
add_filter('polski_pro/inpost/points', function (array $points, string $city, array $coords): array {
    $excluded_points = ['KRA123', 'WAW456']; // Dočasně vyřazené
    return array_filter($points, function (array $point) use ($excluded_points): bool {
        return ! in_array($point['name'], $excluded_points, true);
    });
}, 10, 3);
```

## Generovani stitku

### Z panelu objednavky

Na strance upravy objednavky v panelu **InPost** jsou dostupne moznosti:

1. **Vygenerovat stitek** - vytvori zasilku v API ShipX a vygeneruje stitek PDF
2. **Stahnout stitek** - stahne vygenerovany stitek
3. **Tisknout stitek** - otevre nahled tisku

### Hromadne generovani

Na seznamu objednavek zaznacte vice objednavek a vyberte hromadnou akci "Vygenerovat stitky InPost". Stitky jsou generovany asynchronne - po dokonceni se objevi oznameni s odkazem na stazeni souboru ZIP.

### Data zasilky

Stitek je generovan na zaklade:

| Pole | Zdroj | Popis |
|------|-------|-------|
| Odesilatel | Nastaveni obchodu | Adresa a udaje firmy z WooCommerce |
| Prijemce | Data objednavky | Jmeno, prijmeni, telefon, e-mail |
| Odberne misto | Vyber zakaznika | ID Paczkomatou vybraneho na pokladne |
| Velikost baliku | Nastaveni metody | Nebo prepis v objednavce |
| Castka dobirek | Objednavka COD | Pouze pro objednavky na dobirek |

### Hook generovani stitku

```php
/**
 * Filtruje dane przesyłki przed wysłaniem do API ShipX.
 *
 * @param array     $shipment_data Dane przesyłki
 * @param \WC_Order $order         Zamówienie WooCommerce
 */
apply_filters('polski_pro/inpost/shipment_data', array $shipment_data, \WC_Order $order): array;
```

**Priklad - pridani reference objednavky:**

```php
add_filter('polski_pro/inpost/shipment_data', function (array $shipment_data, \WC_Order $order): array {
    $shipment_data['reference'] = sprintf('ORDER-%s', $order->get_order_number());
    return $shipment_data;
}, 10, 2);
```

## Sledovani zasilek

### Automaticke sledovani

Po vygenerovani stitku modul automaticky kontroluje status zasilky kazdych 2 hodiny (WP-Cron). Statusy jsou mapovany na statusy objednavek WooCommerce:

| Status InPost | Status WooCommerce | Popis |
|---------------|-------------------|-------|
| `created` | `processing` | Zasilka vytvorena |
| `dispatched_by_sender` | `processing` | Podana odesilatelem |
| `collected_from_sender` | `shipped` | Vyzvednuta od odesilatele |
| `out_for_delivery` | `shipped` | Na doruceni |
| `ready_to_pickup` | `shipped` | Pripravena k vyzvednuti v Paczkomatou |
| `delivered` | `completed` | Dorucena / vyzvednuta |

### Oznameni zakaznikovi

Zakaznik obdrzi e-mail s odkazem na sledovani zasilky na strance InPost. Odkaz sledovani je pridan do:

- E-mailu "Objednavka v realizaci"
- Stranky "Muj ucet > Objednavky > Detail"
- Poznamek objednavky (viditelnych pro zakaznika)

### Hook sledovani

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

**Priklad - SMS oznameni o pripravenosti k vyzvednuti:**

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

## Velikosti baliku

| Velikost | Rozmery (cm) | Max hmotnost |
|----------|-------------|--------------|
| A | 8 x 38 x 64 | 25 kg |
| B | 19 x 38 x 64 | 25 kg |
| C | 41 x 38 x 64 | 25 kg |

Velikost baliku lze nastavit globalne, na metodu doruceni nebo prepsat rucne v objednavce.

## Reseni problemu

**Mapa Paczkomatou se nenacita**
Zkontrolujte, ze API token je spravny a aktivni. Zkontrolujte konzoli prohlizece na chyby CORS nebo JavaScriptu. Ujistete se, ze skript `polski-pro-inpost-map.js` je nacten.

**Chyba generovani stitku "Unauthorized"**
API token vyprsel nebo nema opravneni pro vytvareni zasilek. Vygenerujte novy token v panelu InPost Manager.

**Status zasilky se neaktualizuje**
Zkontrolujte, ze WP-Cron funguje spravne. Spustte rucne: `wp cron event run polski_pro_inpost_tracking`.

## Dalsi kroky

- Hlaste problemy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Dokumentace API ShipX: [https://docs.inpost24.com/](https://docs.inpost24.com/)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
