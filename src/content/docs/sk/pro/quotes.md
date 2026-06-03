---
title: Cenové ponuky (RFQ)
description: Modul cenových ponúk Polski PRO for WooCommerce - nahradenie tlačidla košíka formulárom cenovej ponuky, logovanie súhlasov, administračný panel a e-mailové upozornenia.
---

Modul cenových ponúk (RFQ) nahrádza tlačidlo "Pridať do košíka" tlačidlom "Opýtať sa na cenu". Zákazníci podávajú dopyty namiesto priameho nákupu. Užitočné v B2B obchodoch a pri produktoch s individuálnym ocenením.

:::note[Požiadavky]
Polski PRO vyžaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Konfigurácia

Prejdite na **WooCommerce > Nastavenia > Polski PRO > Cenové ponuky** a zapnite modul.

### Základné nastavenia

| Nastavenie | Možnosť v databáze | Predvolená hodnota | Popis |
|------------|---------------|------------------|------|
| Zapnúť modul | `polski_quote` | Nie | Aktivuje funkcionalitu cenových ponúk |
| Text tlačidla | `polski_quote_button_text` | "Opýtať sa na cenu" | Text zobrazený na tlačidle |
| Zobraziť v zoznamoch | `polski_quote_show_on_loops` | Nie | Zobrazuje tlačidlo dopytu na stránkach archívu a kategórií |
| Vyžadovať prihlásenie | `polski_quote_require_login` | Nie | Vyžaduje prihlásenie pred odoslaním dopytu |
| Súhlas so spracovaním | `polski_quote_consent` | Áno | Pridáva checkbox súhlasu GDPR do formulára |

### Polia formulára

Formulár cenovej ponuky štandardne obsahuje:

- **Meno a priezvisko** - povinné
- **E-mailová adresa** - povinné, validácia formátu
- **Telefón** - voliteľné
- **Množstvo** - povinné, číselná validácia
- **Správa** - voliteľné, textarea
- **Súhlas GDPR** - checkbox, povinné ak zapnuté

## Fungovanie na frontende

### Nahradenie tlačidla

Po zapnutí modul nahrádza tlačidlo "Pridať do košíka" tlačidlom dopytu. Týka sa:

- Stránky jednotlivého produktu
- Stránok archívu a kategórií (ak je možnosť `polski_quote_show_on_loops` zapnutá)
- Widgetov a produktových shortcodov

### Shortcode

Tlačidlo dopytu umiestnite na ľubovoľné miesto shortcodom:

```
[polski_quote_button product_id="123" text="Zapytaj o cenę" class="custom-class"]
```

**Parametre:**

| Parameter | Povinný | Popis |
|----------|----------|------|
| `product_id` | Nie | ID produktu (predvolene aktuálny produkt) |
| `text` | Nie | Text tlačidla |
| `class` | Nie | Dodatočné CSS triedy |

### Odoslanie formulára (AJAX)

Formulár sa odosiela cez AJAX, bez znovunačítania stránky. Zákazník vidí potvrdenie s číslom dopytu.

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

Každý dopyt ukladá údaje o udelených súhlasoch:

- Časová pečiatka (timestamp) udelenia súhlasu
- IP adresa zákazníka (hashovaná SHA-256)
- Obsah súhlasu v momente udelenia
- Verzia formulára

Údaje sa ukladajú do tabuľky `{prefix}_polski_quote_consents` a je možné ich exportovať na audit GDPR.

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

Prejdite na **WooCommerce > Cenové ponuky**. Zoznam obsahuje:

- Číslo dopytu
- Údaje zákazníka (meno, e-mail, telefón)
- Produkt a množstvo
- Stav (nové, prebieha, odpovedané, uzavreté)
- Dátum podania

### Stavy dopytov

| Stav | Popis |
|--------|------|
| `new` | Nový dopyt, nespracovaný |
| `in_progress` | Prebieha príprava ponuky |
| `replied` | Ponuka odoslaná zákazníkovi |
| `accepted` | Zákazník akceptoval ponuku |
| `rejected` | Zákazník odmietol ponuku |
| `closed` | Dopyt uzavretý |

### Odpovedanie na dopyt

Administrátor môže:

1. Prezrieť detaily dopytu
2. Pridať internú poznámku
3. Nastaviť cenu ponuky
4. Odoslať e-mailovú odpoveď zákazníkovi
5. Premeniť dopyt na objednávku WooCommerce

## E-mailové upozornenia

E-mailové šablóny modulu:

| E-mail | Príjemca | Spúšťač |
|--------|----------|-----------|
| Nový dopyt cenovej ponuky | Administrátor | Podanie dopytu zákazníkom |
| Potvrdenie dopytu | Zákazník | Podanie dopytu |
| Odpoveď na dopyt | Zákazník | Odoslanie ponuky administrátorom |
| Zmena stavu dopytu | Zákazník | Zmena stavu dopytu |

E-mailové šablóny je možné prepísať v téme v adresári `woocommerce/emails/`:

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

**Príklad - pridanie poľa NIP:**

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
Skontrolujte, či je možnosť `polski_quote` zapnutá. Vyčistite cache cacheujúcich pluginov (WP Super Cache, W3 Total Cache, LiteSpeed Cache).

**Formulár sa neodosiela (chyba AJAX)**
Skontrolujte konzolu prehliadača na chyby JavaScript. Uistite sa, že skript `polski-pro-quote.js` je načítaný. Konflikty s inými pluginmi môžu blokovať AJAX - vypnite ostatné pluginy na identifikáciu konfliktu.

**E-maily sa neodosielajú**
Skontrolujte konfiguráciu e-mailu v **WooCommerce > Nastavenia > E-maily**. Uistite sa, že šablóny Polski PRO sú zapnuté.

## Ďalšie kroky

- Nahlasujte problémy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Integrácia s katalógovým režimom: [Katalógový režim B2B](/pro/catalog-mode)

<div class="disclaimer">Táto stránka má výlučne informačný charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
