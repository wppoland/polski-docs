---
title: Poptavky (RFQ)
description: Modul poptavek Polski PRO for WooCommerce - zamena tlacitka kosiku za poptavkovy formular, logovani souhlasu, administracni panel a e-mailova oznameni.
---

Modul poptavek (RFQ) meni tlacitko "Pridat do kosiku" na "Zeptejte se na cenu". Zakaznici posilaji poptavky misto primych nakupu. Uzitecne v B2B obchodech a u produktu s individualni cenou.

:::note[Pozadavky]
Polski PRO vyzaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Konfigurace

Prejdete do **WooCommerce > Nastaveni > Polski PRO > Poptavky** a zapnete modul.

### Zakladni nastaveni

| Nastaveni | Moznost v databazi | Vychozi hodnota | Popis |
|-----------|-------------------|-----------------|-------|
| Zapnout modul | `polski_quote` | Ne | Aktivuje funkcionalitu poptavek |
| Text tlacitka | `polski_quote_button_text` | "Zapytaj o cenę" | Text zobrazeny na tlacitku |
| Zobrazit na seznamech | `polski_quote_show_on_loops` | Ne | Zobrazuje tlacitko poptavky na strankach archivu a kategorii |
| Vyzadovat prihlaseni | `polski_quote_require_login` | Ne | Vyzaduje prihlaseni pred odeslanim poptavky |
| Souhlas se zpracovanim | `polski_quote_consent` | Ano | Pridava checkbox souhlasu GDPR do formulare |

### Pole formulare

Formular poptavky obsahuje ve vychozim stavu:

- **Jmeno a prijmeni** - povinne
- **E-mailova adresa** - povinne, validace formatu
- **Telefon** - volitelne
- **Mnozstvi** - povinne, numericka validace
- **Zprava** - volitelne, textarea
- **Souhlas GDPR** - checkbox, povinne pokud zapnuto

## Fungovani na frontendu

### Zamena tlacitka

Po zapnuti modulu je tlacitko "Pridat do kosiku" nahrazeno tlacitkem poptavky. Tyka se to:

- Stranky jednotliveho produktu
- Stranek archivu a kategorii (pokud je moznost `polski_quote_show_on_loops` zapnuta)
- Widgetu a shortcodu produktu

### Shortcode

Tlacitko poptavky lze umistit kamkoli pomoci shortcode:

```
[polski_quote_button product_id="123" text="Zapytaj o cenę" class="custom-class"]
```

**Parametry:**

| Parametr | Povinny | Popis |
|----------|---------|-------|
| `product_id` | Ne | ID produktu (vychozi aktualni produkt) |
| `text` | Ne | Text tlacitka |
| `class` | Ne | Doplnkove CSS tridy |

### Odeslani formulare (AJAX)

Formular je odeslany asynchronne (AJAX), bez obnoveni stranky. Po odeslani zakaznik vidi potvrzujici zpravu s cislem poptavky.

```php
/**
 * Filtruje dane zapytania ofertowego przed zapisem.
 *
 * @param array    $quote_data Dane zapytania
 * @param int      $product_id ID produktu
 * @param \WP_User $user       Obiekt zalogowanego użytkownika lub pusty
 */
apply_filters('polski_pro/quote/before_save', array $quote_data, int $product_id, $user): array;
```

**Priklad - pridani vlastniho pole:**

```php
add_filter('polski_pro/quote/before_save', function (array $quote_data, int $product_id, $user): array {
    $quote_data['meta']['company_nip'] = sanitize_text_field($_POST['company_nip'] ?? '');
    return $quote_data;
}, 10, 3);
```

## Logovani souhlasu

Kazda poptavka uklada informaci o udelenych souhlasech:

- Casove razitko (timestamp) udeleni souhlasu
- IP adresa zakaznika (hashovana SHA-256)
- Obsah souhlasu v okamziku udeleni
- Verze formulare

Data jsou uchovavana v tabulce `{prefix}_polski_quote_consents` a mohou byt exportovana pro ucely auditu GDPR.

```php
/**
 * Akcja wywoływana po zapisaniu zgody.
 *
 * @param int    $quote_id   ID zapytania ofertowego
 * @param array  $consent    Dane zgody
 * @param string $ip_hash    Zahashowany adres IP
 */
do_action('polski_pro/quote/consent_logged', int $quote_id, array $consent, string $ip_hash);
```

## Administracni panel

### Seznam poptavek

Poptavky jsou dostupne v menu **WooCommerce > Poptavky**. Seznam obsahuje:

- Cislo poptavky
- Udaje zakaznika (jmeno, e-mail, telefon)
- Produkt a mnozstvi
- Status (nova, v prubehu, odpovedeno, uzavrena)
- Datum podani

### Statusy poptavek

| Status | Popis |
|--------|-------|
| `new` | Nova poptavka, nezpracovana |
| `in_progress` | Probiha priprava nabidky |
| `replied` | Nabidka odeslana zakaznikovi |
| `accepted` | Zakaznik prijal nabidku |
| `rejected` | Zakaznik odmitl nabidku |
| `closed` | Poptavka uzavrena |

### Odpovidani na poptavku

Z panelu administrator muze:

1. Projit detaily poptavky
2. Pridat interni poznamku
3. Nastavit nabidkovou cenu
4. Odeslat e-mailovou odpoved zakaznikovi
5. Prevest poptavku na objednavku WooCommerce

## E-mailova oznameni

Modul registruje nasledujici e-mailove sablony v WooCommerce:

| E-mail | Prijemce | Spoustec |
|--------|----------|----------|
| Nova poptavka | Administrator | Podani poptavky zakaznikem |
| Potvrzeni poptavky | Zakaznik | Podani poptavky |
| Odpoved na poptavku | Zakaznik | Odeslani nabidky administratorem |
| Zmena statusu poptavky | Zakaznik | Zmena statusu poptavky |

E-mailove sablony lze prepsat v motivu v adresari `woocommerce/emails/`:

- `polski-pro-quote-new.php`
- `polski-pro-quote-confirmation.php`
- `polski-pro-quote-reply.php`
- `polski-pro-quote-status.php`

## Hooky

### Filtr formulare

```php
/**
 * Filtruje pola formularza zapytania ofertowego.
 *
 * @param array $fields Tablica pól formularza
 * @param int   $product_id ID produktu
 */
apply_filters('polski_pro/quote/form_fields', array $fields, int $product_id): array;
```

**Priklad - pridani pole DIC:**

```php
add_filter('polski_pro/quote/form_fields', function (array $fields, int $product_id): array {
    $fields['company_nip'] = [
        'type'     => 'text',
        'label'    => 'NIP firmy',
        'required' => false,
        'priority' => 35,
    ];
    return $fields;
}, 10, 2);
```

### Akce po odeslani

```php
/**
 * Akcja wywoływana po zapisaniu zapytania ofertowego.
 *
 * @param int   $quote_id   ID zapytania
 * @param array $quote_data Dane zapytania
 */
do_action('polski_pro/quote/submitted', int $quote_id, array $quote_data);
```

**Priklad - odeslani do CRM:**

```php
add_action('polski_pro/quote/submitted', function (int $quote_id, array $quote_data): void {
    $crm_api = new MyCrmApi();
    $crm_api->create_lead([
        'name'    => $quote_data['name'],
        'email'   => $quote_data['email'],
        'product' => $quote_data['product_name'],
        'qty'     => $quote_data['quantity'],
    ]);
}, 10, 2);
```

## Reseni problemu

**Tlacitko "Pridat do kosiku" se stale zobrazuje**
Zkontrolujte, ze moznost `polski_quote` je zapnuta. Vycistete cache cachovacich pluginu (WP Super Cache, W3 Total Cache, LiteSpeed Cache).

**Formular se neodesila (chyba AJAX)**
Zkontrolujte konzoli prohlizece na chyby JavaScriptu. Ujistete se, ze skript `polski-pro-quote.js` je nacten. Konflikty s jinymi pluginy mohou blokovat AJAX - vypnete ostatni pluginy pro identifikaci konfliktu.

**E-maily se neodesilaji**
Zkontrolujte konfiguraci e-mailu v **WooCommerce > Nastaveni > E-maily**. Ujistete se, ze sablony Polski PRO jsou zapnute.

## Dalsi kroky

- Hlaste problemy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Integrace s katalogovym rezimem: [Katalogovy rezim B2B](/pro/catalog-mode)

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
