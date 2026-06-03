---
title: Cenové poptávky (RFQ)
description: Modul cenových poptávek Polski PRO for WooCommerce - záměna tlačítka košíku za poptávkový formulář, logování souhlasů, administrační panel a e-mailová oznámení.
---

Modul cenových poptávek (RFQ) zaměňuje tlačítko "Přidat do košíku" za "Zeptat se na cenu". Zákazníci podávají poptávky místo přímého nákupu. Hodí se v B2B obchodech a u produktů s individuálním oceněním.

:::note[Požadavky]
Polski PRO vyžaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+
:::

## Konfigurace

Přejděte do **WooCommerce > Nastavení > Polski PRO > Cenové poptávky** a zapněte modul.

### Základní nastavení

| Nastavení | Volba v databázi | Výchozí hodnota | Popis |
|------------|---------------|------------------|------|
| Zapnout modul | `polski_quote` | Ne | Aktivuje funkcionalitu cenových poptávek |
| Text tlačítka | `polski_quote_button_text` | "Zeptat se na cenu" | Text zobrazený na tlačítku |
| Zobrazit na výpisech | `polski_quote_show_on_loops` | Ne | Zobrazuje tlačítko poptávky na stránkách archivu a kategorií |
| Vyžadovat přihlášení | `polski_quote_require_login` | Ne | Vyžaduje přihlášení před odesláním poptávky |
| Souhlas se zpracováním | `polski_quote_consent` | Ano | Přidává GDPR checkbox souhlasu do formuláře |

### Pole formuláře

Poptávkový formulář ve výchozím stavu obsahuje:

- **Jméno a příjmení** - povinné
- **E-mailová adresa** - povinné, validace formátu
- **Telefon** - volitelné
- **Množství** - povinné, číselná validace
- **Zpráva** - volitelné, textarea
- **GDPR souhlas** - checkbox, povinný pokud zapnuto

## Chování na frontendu

### Záměna tlačítka

Po zapnutí modul zaměňuje tlačítko "Přidat do košíku" za tlačítko poptávky. Týká se:

- Stránky jednotlivého produktu
- Stránek archivu a kategorií (pokud je volba `polski_quote_show_on_loops` zapnuta)
- Produktových widgetů a shortcodů

### Shortcode

Tlačítko poptávky umístíte kamkoli shortcodem:

```
[polski_quote_button product_id="123" text="Zeptat se na cenu" class="custom-class"]
```

**Parametry:**

| Parametr | Povinný | Popis |
|----------|----------|------|
| `product_id` | Ne | ID produktu (výchozí aktuální produkt) |
| `text` | Ne | Text tlačítka |
| `class` | Ne | Doplňkové CSS třídy |

### Odeslání formuláře (AJAX)

Formulář se odesílá přes AJAX, bez přenačtení stránky. Zákazník vidí potvrzení s číslem poptávky.

```php
/**
 * Filtruje data cenové poptávky před uložením.
 *
 * @param array    $quote_data Data poptávky
 * @param int      $product_id ID produktu
 * @param \WP_User $user       Objekt přihlášeného uživatele nebo prázdný
 */
apply_filters('polski_pro/quote/before_save', array $quote_data, int $product_id, $user): array;
```

**Příklad - přidání vlastního pole:**

```php
add_filter('polski_pro/quote/before_save', function (array $quote_data, int $product_id, $user): array {
    $quote_data['meta']['company_nip'] = sanitize_text_field($_POST['company_nip'] ?? '');
    return $quote_data;
}, 10, 3);
```

## Logování souhlasů

Každá poptávka ukládá údaje o udělených souhlasech:

- Časová značka (timestamp) udělení souhlasu
- IP adresa zákazníka (hashovaná SHA-256)
- Obsah souhlasu v okamžiku udělení
- Verze formuláře

Data se ukládají do tabulky `{prefix}_polski_quote_consents` a lze je exportovat pro audit GDPR.

```php
/**
 * Akce volaná po uložení souhlasu.
 *
 * @param int    $quote_id   ID cenové poptávky
 * @param array  $consent    Data souhlasu
 * @param string $ip_hash    Zahashovaná IP adresa
 */
do_action('polski_pro/quote/consent_logged', int $quote_id, array $consent, string $ip_hash);
```

## Administrační panel

### Seznam poptávek

Přejděte do **WooCommerce > Cenové poptávky**. Seznam obsahuje:

- Číslo poptávky
- Údaje zákazníka (jméno, e-mail, telefon)
- Produkt a množství
- Stav (nová, probíhá, odpovězeno, uzavřeno)
- Datum podání

### Stavy poptávek

| Stav | Popis |
|--------|------|
| `new` | Nová poptávka, nezpracovaná |
| `in_progress` | Probíhá příprava nabídky |
| `replied` | Nabídka odeslána zákazníkovi |
| `accepted` | Zákazník přijal nabídku |
| `rejected` | Zákazník odmítl nabídku |
| `closed` | Poptávka uzavřena |

### Odpovídání na poptávku

Administrátor může:

1. Prohlédnout detaily poptávky
2. Přidat interní poznámku
3. Nastavit cenu nabídky
4. Odeslat e-mailovou odpověď zákazníkovi
5. Převést poptávku na objednávku WooCommerce

## E-mailová oznámení

E-mailové šablony modulu:

| E-mail | Příjemce | Spouštěč |
|--------|----------|-----------|
| Nová cenová poptávka | Administrátor | Podání poptávky zákazníkem |
| Potvrzení poptávky | Zákazník | Podání poptávky |
| Odpověď na poptávku | Zákazník | Odeslání nabídky administrátorem |
| Změna stavu poptávky | Zákazník | Změna stavu poptávky |

E-mailové šablony lze přepsat v šabloně v adresáři `woocommerce/emails/`:

- `polski-pro-quote-new.php`
- `polski-pro-quote-confirmation.php`
- `polski-pro-quote-reply.php`
- `polski-pro-quote-status.php`

## Hooky

### Filtr formuláře

```php
/**
 * Filtruje pole formuláře cenové poptávky.
 *
 * @param array $fields Pole formuláře
 * @param int   $product_id ID produktu
 */
apply_filters('polski_pro/quote/form_fields', array $fields, int $product_id): array;
```

**Příklad - přidání pole NIP:**

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

### Akce po odeslání

```php
/**
 * Akce volaná po uložení cenové poptávky.
 *
 * @param int   $quote_id   ID poptávky
 * @param array $quote_data Data poptávky
 */
do_action('polski_pro/quote/submitted', int $quote_id, array $quote_data);
```

**Příklad - odeslání do CRM:**

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

## Řešení problémů

**Tlačítko "Přidat do košíku" se stále zobrazuje**
Zkontrolujte, zda je volba `polski_quote` zapnuta. Vymažte cache cachujících pluginů (WP Super Cache, W3 Total Cache, LiteSpeed Cache).

**Formulář se neodesílá (chyba AJAX)**
Zkontrolujte konzoli prohlížeče na chyby JavaScriptu. Ujistěte se, že je skript `polski-pro-quote.js` načten. Konflikty s jinými pluginy mohou blokovat AJAX - vypněte ostatní pluginy, abyste identifikovali konflikt.

**E-maily se neodesílají**
Zkontrolujte konfiguraci e-mailu v **WooCommerce > Nastavení > E-maily**. Ujistěte se, že jsou šablony Polski PRO zapnuté.

## Další kroky

- Hlaste problémy: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Integrace s katalogovým režimem: [Katalogový režim B2B](/pro/catalog-mode)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
