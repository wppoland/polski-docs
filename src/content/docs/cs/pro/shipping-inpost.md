---
title: Integrace InPost (Paczkomaty)
description: Modul integrace InPost ShipX API v Polski PRO for WooCommerce - Paczkomaty, generovani stitku, mapa vydejnich mist a sledovani zasilek.
---

Modul InPost propojuje WooCommerce s API ShipX. Generujte stitky, umoznete zakaznikum vybrat Paczkomat na mape a sledujte zasilky z administracniho panelu.

:::note[Pozadavky]
Polski PRO vyzaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+. Navic je vyzadovan aktivni API token InPost ShipX (ziskany z manazerskeho panelu InPost).
:::

## Konfigurace

Prejdete do **WooCommerce > Nastaveni > Polski PRO > InPost**.

### Overeni API

| Nastaveni | Popis |
|------------|------|
| API token | Autorizacni token z panelu InPost Manager |
| ID organizace | Identifikator organizace v systemu InPost |
| Rezim sandbox | Pouziva testovaci prostredi ShipX API |

Token se odesila v hlavicce `Authorization: Bearer {token}`. Musi mit opravneni k vytvareni zasilek a stitku.

### Nastaveni prepravni metody

Po nakonfigurovani API vytvorte novou prepravni metodu:

1. Prejdete do **WooCommerce > Nastaveni > Doprava > Prepravni zony**
2. Upravte zonu "Polsko"
3. Kliknete na "Pridat prepravni metodu"
4. Vyberte "InPost Paczkomat" nebo "InPost Kurier"

| Nastaveni metody | Vychozi hodnota | Popis |
|-------------------|------------------|------|
| Nazev metody | "InPost Paczkomat" | Nazev zobrazeny zakaznikovi |
| Naklady | 0 | Naklady na dopravu (0 = zdarma) |
| Doprava zdarma od | "" | Castka objednavky, od ktere je doprava zdarma |
| Vychozi velikost balicku | A | Velikost: `A`, `B`, `C` |
| Pojisteni | Ne | Pridat pojisteni k zasilce |

## Mapa vydejnich mist

### Widget mapy

Po vyberu "InPost Paczkomat" v pokladne se zobrazi interaktivni widget mapy.

Widget nabizi:

- **Mapu** s pinezkami Paczkomatu
- **Vyhledavani podle mesta** - zadejte nazev mesta pro vycentrovani mapy
- **Vyhledavani podle souradnic** - automaticka geolokalizace (se souhlasem uzivatele)
- **Vyhledavani podle PSC** - najdete nejblizsi Paczkomaty
- **Seznam Paczkomatu** - serazeny od nejblizsiho
- **Detaily mista** - adresa, oteviraci doba, dostupne velikosti schranek

### Vyhledavani podle mesta

Widget posila dotaz na endpoint ShipX API:

```
GET /v1/points?type=parcel_locker&city={city}&per_page=25
```

Vysledky se kesuji na 24 hodin v transients WordPress.

### Vyhledavani podle souradnic

Kdyz zakaznik udeli souhlas s geolokalizaci:

```
GET /v1/points?type=parcel_locker&relative_point={lat},{lng}&per_page=10
```

### Filtrovani mist

```php
/**
 * Filtruje seznam vydejnich mist InPost.
 *
 * @param array  $points  Pole vydejnich mist z API
 * @param string $city    Hledane mesto
 * @param array  $coords  Souradnice [lat, lng] nebo prazdne pole
 */
apply_filters('polski_pro/inpost/points', array $points, string $city, array $coords): array;
```

**Priklad - vylouceni docasne nedostupnych mist:**

```php
add_filter('polski_pro/inpost/points', function (array $points, string $city, array $coords): array {
    $excluded_points = ['KRA123', 'WAW456']; // Docasne vypnute
    return array_filter($points, function (array $point) use ($excluded_points): bool {
        return ! in_array($point['name'], $excluded_points, true);
    });
}, 10, 3);
```

## Generovani stitku

### Z panelu objednavky

V panelu **InPost** na strance objednavky:

1. **Generovat stitek** - vytvori zasilku v API ShipX a vygeneruje stitek PDF
2. **Stahnout stitek** - stahne vygenerovany stitek
3. **Tisk stitku** - otevre nahled tisku

### Hromadne generovani

Oznacte vice objednavek v seznamu a vyberte "Generovat stitky InPost". Stitky se generuji na pozadi. Po dokonceni stahnete soubor ZIP.

### Udaje zasilky

Stitek je generovan na zaklade:

| Pole | Zdroj | Popis |
|------|--------|------|
| Odesilatel | Nastaveni obchodu | Adresa a udaje firmy z WooCommerce |
| Prijemce | Udaje objednavky | Jmeno, prijmeni, telefon, e-mail |
| Vydejni misto | Vyber zakaznika | ID Paczkomatu vybraneho v pokladne |
| Velikost balicku | Nastaveni metody | Nebo prepsani v objednavce |
| Castka dobirky | Objednavka COD | Pouze pro objednavky na dobirku |

### Hook generovani stitku

```php
/**
 * Filtruje data zasilky pred odeslanim do API ShipX.
 *
 * @param array     $shipment_data Data zasilky
 * @param \WC_Order $order         Objednavka WooCommerce
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

Po vygenerovani stitku modul kontroluje stav zasilky kazde 2 hodiny (WP-Cron). Stavy se mapuji na stavy WooCommerce:

| Stav InPost | Stav WooCommerce | Popis |
|---------------|-------------------|------|
| `created` | `processing` | Zasilka vytvorena |
| `dispatched_by_sender` | `processing` | Podana odesilatelem |
| `collected_from_sender` | `shipped` | Vyzvednuta od odesilatele |
| `out_for_delivery` | `shipped` | V doruceni |
| `ready_to_pickup` | `shipped` | Pripravena k vyzvednuti v Paczkomatu |
| `delivered` | `completed` | Dorucena / vyzvednuta |

### Oznameni zakaznikovi

Zakaznik dostane e-mail s odkazem na sledovani na strance InPost. Odkaz je pridan do:

- E-mailu "Objednavka se zpracovava"
- Stranky "Muj ucet > Objednavky > Detaily"
- Poznamek objednavky (viditelnych pro zakaznika)

### Hook sledovani

```php
/**
 * Akce volana po aktualizaci stavu zasilky.
 *
 * @param int      $order_id      ID objednavky
 * @param string   $tracking_number Sledovaci cislo
 * @param string   $old_status    Predchozi stav InPost
 * @param string   $new_status    Novy stav InPost
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
            'Vase zasilka %s ceka v Paczkomatu. Kod pro vyzvednuti je v e-mailu.',
            $tracking_number
        ));
    }
}, 10, 4);
```

## Velikosti balicku

| Velikost | Rozmery (cm) | Max hmotnost |
|---------|-------------|----------|
| A | 8 x 38 x 64 | 25 kg |
| B | 19 x 38 x 64 | 25 kg |
| C | 41 x 38 x 64 | 25 kg |

Velikost balicku lze nastavit globalne, per prepravni metoda nebo rucne prepsat v objednavce.

## Reseni problemu

**Mapa Paczkomatu se nenacita**
Zkontrolujte, zda je API token spravny a aktivni. Zkontrolujte konzoli prohlizece, zda neobsahuje chyby CORS nebo JavaScript. Ujistete se, ze je nacten skript `polski-pro-inpost-map.js`.

**Chyba generovani stitku "Unauthorized"**
API token vyprsel nebo nema opravneni k vytvareni zasilek. Vygenerujte novy token v panelu InPost Manager.

**Stav zasilky se neaktualizuje**
Zkontrolujte, zda WP-Cron funguje spravne. Spustte rucne: `wp cron event run polski_pro_inpost_tracking`.

## Dalsi kroky

- Hlaste problemy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Dokumentace API ShipX: [https://docs.inpost24.com/](https://docs.inpost24.com/)

<div class="disclaimer">Tato stranka ma vyhradne informativni charakter a nepredstavuje pravni poradenstvi. Pred nasazenim se poradte s pravnikem. Polski for WooCommerce je open source software (GPLv2) poskytovany bez zaruky.</div>
