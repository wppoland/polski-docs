---
title: Export objednavok
description: Modul exportu objednavok v Polski for WooCommerce - export CSV s viac ako 30 konfigurovatelnymi poliami, filtre datumu a statusu.
---

Modul exportu objednavok umoznuje generovat subory CSV s udajmi objednavok WooCommerce. Podporuje viac ako 30 konfigurovatelnych poli, filtre rozsahu datumov a statusov objednavok. Konfiguracia vyberu poli sa uklada do moznosti WordPress.

## Zapnutie modulu

Prejdite do **WooCommerce > Polski > Nastroje** a zapnite **Export objednavok** (ID modulu: `order_export`).

## Panel exportu

Panel exportu je dostupny v **WooCommerce > Polski > Nastroje > Export objednavok** (`admin.php?page=polski-order-export`).

### Filtre

#### Rozsah datumov

Vyberte obdobie, z ktoreho chcete exportovat objednavky:

- **Datum od** - zaciatok rozsahu (pole date picker)
- **Datum do** - koniec rozsahu (pole date picker)
- Preddefinovane rozsahy: **Dnes**, **Poslednych 7 dni**, **Poslednych 30 dni**, **Aktualny mesiac**, **Predchadzajuci mesiac**, **Aktualny rok**

Datumy sa vztahuju na datum vytvorenia objednavky (`date_created`).

#### Status objednavky

Vyberte statusy objednavok na export (viacnasobny vyber):

- Cakajuce na platbu (`pending`)
- Spracuvane (`processing`)
- Pozdrzane (`on-hold`)
- Dokoncene (`completed`)
- Zrusene (`cancelled`)
- Vratene (`refunded`)
- Neuspesne (`failed`)

Predvolene su zaznacene: **Spracuvane** a **Dokoncene**.

### Vyber poli

Zaznacte polia, ktore maju byt v subore CSV. Konfiguracia poli sa uklada do moznosti WordPress a je zapamatana medzi exportmi.

#### Polia objednavky

| Pole                     | Stlpec CSV               | Popis                          |
| ------------------------ | ------------------------ | ------------------------------ |
| ID objednavky            | `order_id`               | Cislo objednavky               |
| Datum objednavky         | `order_date`             | Datum a cas vytvorenia         |
| Status                   | `order_status`           | Status objednavky              |
| Mena                     | `currency`               | Kod meny (napr. PLN)           |
| Sposob platby            | `payment_method`         | Nazov sposobu platby           |
| Nazov sposobu platby     | `payment_method_title`   | Zobrazovany nazov platby       |
| Suma objednavky          | `order_total`            | Celkova suma                   |
| Suma produktov           | `order_subtotal`         | Suma produktov (bez dorucenia) |
| Suma dane                | `order_tax`              | Celkova suma dane              |
| Naklady na dorucenie     | `shipping_total`         | Naklady na dorucenie           |
| Sposob dorucenia         | `shipping_method`        | Nazov sposobu dorucenia        |
| Zlava                    | `discount_total`         | Celkova suma zliav             |
| Kod kuponu               | `coupon_codes`           | Pouzite kody kuponov           |
| Poznamka zakaznika       | `customer_note`          | Poznamky zakaznika k objednavke |
| IP zakaznika             | `customer_ip`            | IP adresa zakaznika            |

#### Adresne polia - fakturacne

| Pole                     | Stlpec CSV               |
| ------------------------ | ------------------------ |
| Meno (fakturacne)        | `billing_first_name`     |
| Priezvisko (fakturacne)  | `billing_last_name`      |
| Firma                    | `billing_company`        |
| NIP                      | `billing_nip`            |
| Adresa riadok 1          | `billing_address_1`      |
| Adresa riadok 2          | `billing_address_2`      |
| Mesto                    | `billing_city`           |
| PSC                      | `billing_postcode`       |
| Kraj/vojvodstvo          | `billing_state`          |
| Stat                     | `billing_country`        |
| Email                    | `billing_email`          |
| Telefon                  | `billing_phone`          |

#### Adresne polia - dodacie

| Pole                     | Stlpec CSV               |
| ------------------------ | ------------------------ |
| Meno (dodacie)           | `shipping_first_name`    |
| Priezvisko (dodacie)     | `shipping_last_name`     |
| Firma (dodacia)          | `shipping_company`       |
| Adresa riadok 1          | `shipping_address_1`     |
| Adresa riadok 2          | `shipping_address_2`     |
| Mesto                    | `shipping_city`          |
| PSC                      | `shipping_postcode`      |
| Kraj/vojvodstvo          | `shipping_state`         |
| Stat                     | `shipping_country`       |

#### Polia produktov

| Pole                     | Stlpec CSV               | Popis                          |
| ------------------------ | ------------------------ | ------------------------------ |
| Nazov produktu           | `product_name`           | Nazov produktu v objednavke    |
| SKU                      | `product_sku`            | Kod SKU produktu               |
| Mnozstvo                 | `product_qty`            | Objednane mnozstvo             |
| Jednotkova cena          | `product_price`          | Cena za kus                    |
| Suma polozky             | `line_total`             | Celkova suma polozky           |

Ked objednavka obsahuje viacero produktov, kazdy produkt sa exportuje ako samostatny riadok s opakovanymi udajmi objednavky.

## Format suboru CSV

- **Kodovanie**: UTF-8 s BOM (pre spravne zobrazovanie polskych znakov v Exceli)
- **Oddelovac**: bodkociarka (`;`) - standard pre polsky Excel
- **Oddelovac textu**: dvojite uvodzovky (`"`)
- **Konce riadkov**: `\r\n` (Windows)

## Export

Po nakonfigurovani filtrov a poli kliknite na **Exportovat do CSV**. Subor sa stiahne cez prehliadac.

Pre velke sady udajov (viac ako 10 000 objednavok) sa export vykonava na pozadi s lavicou priebehu. Po dokonceni je subor dostupny na stiahnutie po dobu 24 hodin.

## WP-CLI

Exportujte objednavky z prikazoveho riadka:

```bash
wp polski export orders --date-from=2025-01-01 --date-to=2025-12-31 --status=completed --output=/tmp/orders.csv
```

Parametre:

- `--date-from` - pociatocny datum (YYYY-MM-DD)
- `--date-to` - koncovy datum (YYYY-MM-DD)
- `--status` - status objednavok (oddelene ciarkou)
- `--fields` - zoznam poli (oddelene ciarkou)
- `--output` - cesta vystupneho suboru

## Hooky

```php
// Pridaj vlastne pole do exportu
add_filter('polski/order_export/fields', function (array $fields): array {
    $fields['custom_field'] = [
        'label'    => 'Vlastne pole',
        'callback' => function (\WC_Order $order): string {
            return $order->get_meta('_custom_field');
        },
    ];
    return $fields;
});

// Uprava dotazu objednavok
add_filter('polski/order_export/query_args', function (array $args): array {
    $args['meta_key']   = '_billing_nip';
    $args['meta_compare'] = 'EXISTS';
    return $args;
});
```

## Riesenie problemov

**Polske znaky sa zobrazuju nespravne v Exceli** - uistite sa, ze moznost BOM je zapnuta (predvolene ano). V starsich verziach Excelu pouzite import udajov s nastavenim kodovania UTF-8.

**Export trva prilis dlho** - pri velmi velkom pocte objednavok pouzite WP-CLI namiesto webove rozhrania. Zvazte zuzenie rozsahu datumov.

**Chyba pole NIP v exporte** - pole `billing_nip` je dostupne iba ked je aktivny modul NIP v pokladni.

Nahlasovanie problemov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stranka ma vylucne informacny charakter a nepredstavuje pravne poradenstvo. Polski for WooCommerce je open source softver (GPLv2) poskytovany bez zaruky.</div>
