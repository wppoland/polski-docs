---
title: Export objednávek
description: Modul exportu objednávek v Polski for WooCommerce - export CSV s více než 30 konfigurovatelnými poli, filtry data a stavu.
---

Modul exportu objednávek umožňuje generovat soubory CSV s daty objednávek WooCommerce. Podporuje více než 30 konfigurovatelných polí, filtry rozsahu dat a stavů objednávek. Konfigurace výběru polí se ukládá do voleb WordPress.

## Zapnutí modulu

Přejděte do **WooCommerce > Polski > Nástroje** a zapněte **Export objednávek** (ID modulu: `order_export`).

## Panel exportu

Panel exportu je dostupný v **WooCommerce > Polski > Nástroje > Export objednávek** (`admin.php?page=polski-order-export`).

### Filtry

#### Rozsah dat

Vyberte období, ze kterého chcete exportovat objednávky:

- **Datum od** - začátek rozsahu (pole date picker)
- **Datum do** - konec rozsahu (pole date picker)
- Předdefinované rozsahy: **Dnes**, **Posledních 7 dní**, **Posledních 30 dní**, **Aktuální měsíc**, **Předchozí měsíc**, **Aktuální rok**

Data se vztahují k datu vytvoření objednávky (`date_created`).

#### Stav objednávky

Vyberte stavy objednávek k exportu (vícenásobný výběr):

- Čekající na platbu (`pending`)
- Zpracovávané (`processing`)
- Pozastavené (`on-hold`)
- Dokončené (`completed`)
- Zrušené (`cancelled`)
- Vrácené (`refunded`)
- Neúspěšné (`failed`)

Ve výchozím nastavení jsou zaškrtnuty: **Zpracovávané** a **Dokončené**.

### Výběr polí

Zaškrtněte pole, která mají být v souboru CSV. Konfigurace polí se ukládá do voleb WordPress a je zapamatována mezi exporty.

#### Pole objednávky

| Pole                     | Sloupec CSV              | Popis                          |
| ------------------------ | ------------------------ | ------------------------------ |
| ID objednávky            | `order_id`               | Číslo objednávky               |
| Datum objednávky         | `order_date`             | Datum a čas vytvoření          |
| Stav                     | `order_status`           | Stav objednávky                |
| Měna                     | `currency`               | Kód měny (např. PLN)           |
| Metoda platby            | `payment_method`         | Název metody platby            |
| Název metody platby      | `payment_method_title`   | Zobrazovaný název platby       |
| Celková částka objednávky | `order_total`           | Celková částka                 |
| Mezisoučet produktů      | `order_subtotal`         | Částka produktů (bez dopravy)  |
| Částka daně              | `order_tax`              | Celková částka daně            |
| Náklady na dopravu       | `shipping_total`         | Náklady na dopravu             |
| Metoda dopravy           | `shipping_method`        | Název metody dopravy           |
| Sleva                    | `discount_total`         | Celková částka slev            |
| Kód kupónu               | `coupon_codes`           | Použité kódy kupónů            |
| Poznámka zákazníka       | `customer_note`          | Poznámky zákazníka k objednávce |
| IP zákazníka             | `customer_ip`            | IP adresa zákazníka            |

#### Adresní pole - fakturační

| Pole                     | Sloupec CSV              |
| ------------------------ | ------------------------ |
| Jméno (fakturační)       | `billing_first_name`     |
| Příjmení (fakturační)    | `billing_last_name`      |
| Firma                    | `billing_company`        |
| NIP                      | `billing_nip`            |
| Adresa řádek 1           | `billing_address_1`      |
| Adresa řádek 2           | `billing_address_2`      |
| Město                    | `billing_city`           |
| PSČ                      | `billing_postcode`       |
| Region                   | `billing_state`          |
| Země                     | `billing_country`        |
| E-mail                   | `billing_email`          |
| Telefon                  | `billing_phone`          |

#### Adresní pole - dodací

| Pole                     | Sloupec CSV              |
| ------------------------ | ------------------------ |
| Jméno (dodací)           | `shipping_first_name`    |
| Příjmení (dodací)        | `shipping_last_name`     |
| Firma (dodací)           | `shipping_company`       |
| Adresa řádek 1           | `shipping_address_1`     |
| Adresa řádek 2           | `shipping_address_2`     |
| Město                    | `shipping_city`          |
| PSČ                      | `shipping_postcode`      |
| Region                   | `shipping_state`         |
| Země                     | `shipping_country`       |

#### Pole produktů

| Pole                     | Sloupec CSV              | Popis                          |
| ------------------------ | ------------------------ | ------------------------------ |
| Název produktu           | `product_name`           | Název produktu v objednávce    |
| SKU                      | `product_sku`            | Kód SKU produktu               |
| Množství                 | `product_qty`            | Objednané množství             |
| Jednotková cena          | `product_price`          | Cena za kus                    |
| Součet položky           | `line_total`             | Celková částka položky         |

Pokud objednávka obsahuje více produktů, každý produkt je exportován jako samostatný řádek s opakovanými daty objednávky.

## Formát souboru CSV

- **Kódování**: UTF-8 s BOM (pro správné zobrazení polských znaků v Excelu)
- **Separátor**: středník (`;`) - standard pro polský Excel
- **Separátor textu**: dvojité uvozovky (`"`)
- **Konce řádků**: `\r\n` (Windows)

## Export

Po nakonfigurování filtrů a polí klikněte na **Exportovat do CSV**. Soubor bude stažen prohlížečem.

Pro velké sady dat (více než 10 000 objednávek) je export prováděn na pozadí s ukazatelem postupu. Po dokončení je soubor dostupný ke stažení po dobu 24 hodin.

## WP-CLI

Exportujte objednávky z příkazové řádky:

```bash
wp polski export orders --date-from=2025-01-01 --date-to=2025-12-31 --status=completed --output=/tmp/orders.csv
```

Parametry:

- `--date-from` - počáteční datum (YYYY-MM-DD)
- `--date-to` - koncové datum (YYYY-MM-DD)
- `--status` - stav objednávek (oddělené čárkou)
- `--fields` - seznam polí (oddělené čárkou)
- `--output` - cesta výstupního souboru

## Hooky

```php
// Přidání vlastního pole do exportu
add_filter('polski/order_export/fields', function (array $fields): array {
    $fields['custom_field'] = [
        'label'    => 'Pole niestandardowe',
        'callback' => function (\WC_Order $order): string {
            return $order->get_meta('_custom_field');
        },
    ];
    return $fields;
});

// Modifikace dotazu objednávek
add_filter('polski/order_export/query_args', function (array $args): array {
    $args['meta_key']   = '_billing_nip';
    $args['meta_compare'] = 'EXISTS';
    return $args;
});
```

## Řešení problémů

**Polské znaky se zobrazují nesprávně v Excelu** - ujistěte se, že volba BOM je zapnutá (ve výchozím nastavení ano). Ve starších verzích Excelu použijte import dat s nastavením kódování UTF-8.

**Export trvá příliš dlouho** - při velmi velkém počtu objednávek použijte WP-CLI místo webového rozhraní. Zvažte zúžení rozsahu dat.

**Chybí pole NIP v exportu** - pole `billing_nip` je dostupné pouze tehdy, když je aktivní modul NIP v pokladně.

Hlášení problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má výhradně informativní charakter a nepředstavuje právní poradenství. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
