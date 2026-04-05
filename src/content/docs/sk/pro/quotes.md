---
title: Cenové dopyty (RFQ)
description: Modul cenových dopytov Polski PRO for WooCommerce - nahradenie tlačidla košíka dopytovým formulárom, logovanie súhlasov, administračný panel a e-mailové notifikácie.
---

Modul cenových dopytov (Request for Quote) nahrádza štandardné tlačidlo "Pridať do košíka" tlačidlom "Opýtať sa na cenu", čo umožňuje zákazníkom odosielať cenové dopyty namiesto priamych nákupov. Je to riešenie obzvlášť užitočné v B2B obchodoch, pri produktoch vyžadujúcich individuálnu cenovú ponuku alebo pri veľkých veľkoobchodných objednávkach.

:::note[Požiadavky]
Polski PRO vyžaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Konfigurácia

Prejdite do **WooCommerce > Nastavenia > Polski PRO > Cenové dopyty** a zapnite modul.

### Základné nastavenia

| Nastavenie | Voľba v databáze | Predvolená hodnota | Popis |
|------------|---------------|------------------|------|
| Zapnúť modul | `polski_quote` | Nie | Aktivuje funkcionalitu cenových dopytov |
| Text tlačidla | `polski_quote_button_text` | "Zapytaj o cenę" | Text zobrazený na tlačidle |
| Zobraziť na zoznamoch | `polski_quote_show_on_loops` | Nie | Zobrazí tlačidlo dopytu na stránkach archívu a kategórie |
| Vyžadovať prihlásenie | `polski_quote_require_login` | Nie | Vyžaduje prihlásenie pred odoslaním dopytu |
| Súhlas so spracovaním | `polski_quote_consent` | Áno | Pridá GDPR checkbox súhlasu k formuláru |

### Polia formulára

Formulár cenového dopytu predvolene obsahuje:

- **Meno a priezvisko** - povinné
- **E-mailová adresa** - povinná, validácia formátu
- **Telefón** - voliteľné
- **Množstvo** - povinné, číselná validácia
- **Správa** - voliteľné, textarea
- **GDPR súhlas** - checkbox, povinný ak zapnutý

## Fungovanie na frontende

### Nahradenie tlačidla

Po zapnutí modulu je tlačidlo "Pridať do košíka" nahradené tlačidlom cenového dopytu. Týka sa to:

- Stránky jednotlivého produktu
- Stránok archívu a kategórií (ak je voľba `polski_quote_show_on_loops` zapnutá)
- Widgetov a shortcódov produktov

### Shortcode

Tlačidlo cenového dopytu je možné umiestniť na ľubovoľné miesto pomocou shortcódu:

```
[polski_quote_button product_id="123" text="Zapytaj o cenę" class="custom-class"]
```

**Parametre:**

| Parameter | Povinný | Popis |
|----------|----------|------|
| `product_id` | Nie | ID produktu (predvolene aktuálny produkt) |
| `text` | Nie | Text tlačidla |
| `class` | Nie | Ďalšie CSS triedy |

### Odosielanie formulára (AJAX)

Formulár sa odosiela asynchrónne (AJAX), bez opätovného načítania stránky. Po odoslaní zákazník vidí potvrdzujúcu správu s číslom dopytu.

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

**Príklad - pridanie vlastného poľa:**

```php
add_filter('polski_pro/quote/before_save', function (array $quote_data, int $product_id, $user): array {
    $quote_data['meta']['company_nip'] = sanitize_text_field($_POST['company_nip'] ?? '');
    return $quote_data;
}, 10, 3);
```

## Logovanie súhlasov

Každý cenový dopyt ukladá informáciu o udelených súhlasoch:

- Časová pečiatka (timestamp) udelenia súhlasu
- IP adresa zákazníka (hashovaná SHA-256)
- Obsah súhlasu v momente udelenia
- Verzia formulára

Tieto údaje sú uložené v tabuľke `{prefix}_polski_quote_consents` a môžu byť exportované na účely GDPR auditu.

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

## Administračný panel

### Zoznam dopytov

Cenové dopyty sú dostupné v menu **WooCommerce > Cenové dopyty**. Zoznam obsahuje:

- Číslo dopytu
- Údaje zákazníka (meno, e-mail, telefón)
- Produkt a množstvo
- Stav (nový, v spracovaní, odpoveď odoslaná, uzavretý)
- Dátum odoslania

### Stavy dopytov

| Stav | Popis |
|--------|------|
| `new` | Nový dopyt, neobslúžený |
| `in_progress` | V procese prípravy ponuky |
| `replied` | Ponuka odoslaná zákazníkovi |
| `accepted` | Zákazník prijal ponuku |
| `rejected` | Zákazník odmietol ponuku |
| `closed` | Dopyt uzavretý |

### Odpoveď na dopyt

Z panelu môže administrátor:

1. Prezrieť podrobnosti dopytu
2. Pridať internú poznámku
3. Nastaviť ponukovú cenu
4. Odoslať odpoveď e-mailom zákazníkovi
5. Premeniť dopyt na objednávku WooCommerce

## E-mailové notifikácie

Modul registruje nasledujúce e-mailové šablóny vo WooCommerce:

| E-mail | Príjemca | Spúšťač |
|--------|----------|-----------|
| Nový cenový dopyt | Administrátor | Odoslanie dopytu zákazníkom |
| Potvrdenie dopytu | Zákazník | Odoslanie dopytu |
| Odpoveď na dopyt | Zákazník | Odoslanie ponuky administrátorom |
| Zmena stavu dopytu | Zákazník | Zmena stavu dopytu |

Šablóny e-mailov je možné prepísať v téme v priečinku `woocommerce/emails/`:

- `polski-pro-quote-new.php`
- `polski-pro-quote-confirmation.php`
- `polski-pro-quote-reply.php`
- `polski-pro-quote-status.php`

## Hooky

### Filter formulára

```php
/**
 * Filtruje pola formularza zapytania ofertowego.
 *
 * @param array $fields Tablica pól formularza
 * @param int   $product_id ID produktu
 */
apply_filters('polski_pro/quote/form_fields', array $fields, int $product_id): array;
```

**Príklad - pridanie poľa IČ DPH:**

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

### Akcia po odoslaní

```php
/**
 * Akcja wywoływana po zapisaniu zapytania ofertowego.
 *
 * @param int   $quote_id   ID zapytania
 * @param array $quote_data Dane zapytania
 */
do_action('polski_pro/quote/submitted', int $quote_id, array $quote_data);
```

**Príklad - odoslanie do CRM:**

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

## Riešenie problémov

**Tlačidlo "Pridať do košíka" sa stále zobrazuje**
Skontrolujte, či je voľba `polski_quote` zapnutá. Vymažte cache kešovacích pluginov (WP Super Cache, W3 Total Cache, LiteSpeed Cache).

**Formulár sa neodosiela (chyba AJAX)**
Skontrolujte konzolu prehliadača na JavaScript chyby. Uistite sa, že skript `polski-pro-quote.js` je načítaný. Konflikty s inými pluginmi môžu blokovať AJAX - vypnite ostatné pluginy na identifikáciu konfliktu.

**E-maily sa neodosielajú**
Skontrolujte konfiguráciu e-mailov v **WooCommerce > Nastavenia > E-maily**. Uistite sa, že šablóny Polski PRO sú zapnuté.

## Ďalšie kroky

- Hlásenie problémov: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Integrácia s katalógovým režimom: [B2B katalógový režim](/pro/catalog-mode)

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
