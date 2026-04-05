---
title: Instalace pluginu
description: Navod na instalaci pluginu Polski for WooCommerce krok za krokem - z panelu WordPress a rucne ze souboru ZIP. Systemove pozadavky a reseni problemu.
---

## Predpoklady

Zkontrolujte, zda vas server splnuje pozadavky. Plugin **Polski for WooCommerce** 1.3.2 vyzaduje:

| Komponenta | Minimalni verze | Doporucena verze |
|-----------|-----------------|-----------------|
| WordPress | 6.4+ | 6.7+ |
| WooCommerce | 8.0+ | 9.x |
| PHP | 8.1+ | 8.2+ |
| MySQL | 5.7+ | 8.0+ |
| MariaDB | 10.3+ | 10.11+ |

### Kontrola verze PHP

Nevite, jakou mate verzi PHP? Zkontrolujte v panelu WordPress:

1. Prejdete do **Nastroje > Zdravi webu**
2. Kliknete na zalozku **Informace**
3. Rozbalte sekci **Server**
4. Najdete pole **Verze PHP**

Verzi PHP najdete take v panelu hostingu (cPanel, DirectAdmin) v nastaveni domeny.

### Kontrola verze WooCommerce

1. Prejdete do **Pluginy > Nainstalovane pluginy**
2. Najdete **WooCommerce** v seznamu
3. Verze je zobrazena pod nazvem pluginu

:::caution[PHP 8.0 a starsi]
Plugin nefunguje na PHP 7.x ani PHP 8.0. Pokud vas hosting nema PHP 8.1+, zmente verzi PHP v panelu hostingu nebo kontaktujte poskytovatele.
:::

---

## Metoda 1: Instalace z panelu WordPress (doporucena)

Nejjednodussi a doporucena metoda instalace.

### Krok 1 - otevrete panel pluginu

Prihlaste se do administracniho panelu WordPress a prejdete do **Pluginy > Pridat novy plugin**.

### Krok 2 - vyhledejte plugin

Do pole vyhledavani zadejte:

```
Polski for WooCommerce
```

Plugin by se mel objevit jako prvni vysledek. Autorem je **wppoland.com**.

### Krok 3 - nainstalujte plugin

Kliknete na tlacitko **Nainstalovat** u pluginu "Polski for WooCommerce". Pockejte, az WordPress stahne a rozpakuje soubory.

### Krok 4 - aktivujte plugin

Po dokonceni instalace se tlacitko zmeni na **Aktivovat**. Kliknutim plugin aktivujete.

### Krok 5 - prejdete ke konfiguraci

Po aktivaci se objevi oznameni s odkazem na pruvodce konfiguraci. Kliknete na **Nakonfigurovat plugin** nebo rucne prejdete do **WooCommerce > Polski**.

---

## Metoda 2: Rucni instalace ze souboru ZIP

Pouzijte tuto metodu, pokud chcete nainstalovat konkretni verzi nebo server se nepripojuje k WordPress.org.

### Krok 1 - stahne balicek ZIP

Stahnete nejnovejsi verzi pluginu z jednoho z nasledujicich zdroju:

- **WordPress.org**: [https://wordpress.org/plugins/polski-for-woocommerce/](https://wordpress.org/plugins/polski-for-woocommerce/)
- **GitHub Releases**: [https://github.com/wppoland/polski/releases](https://github.com/wppoland/polski/releases)

### Krok 2 - nahrajte soubor ZIP

1. Prejdete do **Pluginy > Pridat novy plugin**
2. Kliknete na tlacitko **Nahrat plugin** v horni casti stranky
3. Kliknete **Vybrat soubor** a ukazte na stazeny soubor ZIP
4. Kliknete **Nainstalovat**

### Krok 3 - aktivujte plugin

Po nahrani a rozbaleni souboru kliknete **Aktivovat plugin**.

---

## Metoda 3: Instalace pres FTP/SFTP

Pouzijte tuto metodu, pokud panel WordPress neumoznuje nahravat soubory (napr. kvuli limitu velikosti).

### Krok 1 - rozbalte archiv

Rozbalte stazeny soubor ZIP na svem pocitaci. Ziskate slozku `polski-for-woocommerce`.

### Krok 2 - nahrajte na server

Pripojte se k serveru pres FTP/SFTP a nahrajte celou slozku `polski-for-woocommerce` do adresare:

```
/wp-content/plugins/
```

Struktura po nahrani by mela vypadat takto:

```
wp-content/
  plugins/
    polski-for-woocommerce/
      polski-for-woocommerce.php
      includes/
      assets/
      ...
```

### Krok 3 - aktivujte v panelu

Prejdete do **Pluginy > Nainstalovane pluginy** v panelu WordPress a kliknete **Aktivovat** u "Polski for WooCommerce".

---

## Instalace pres WP-CLI

Pokud mate pristup k terminalu serveru, nainstalujte plugin jednim prikazem:

```bash
wp plugin install polski-for-woocommerce --activate
```

Aktualizace pluginu na nejnovejsi verzi:

```bash
wp plugin update polski-for-woocommerce
```

Kontrola aktualni verze:

```bash
wp plugin get polski-for-woocommerce --fields=name,version,status
```

---

## Overeni instalace

Po aktivaci pluginu zkontrolujte, zda vse funguje spravne:

1. **Nova polozka v menu** - v menu WooCommerce by se mel objevit element **Polski**
2. **Dashboard souladu** - prejdete do **WooCommerce > Polski** pro zobrazeni hlavniho panelu
3. **Zadne chyby** - zkontrolujte, zda se na strance neobjevily chybove zpravy PHP

### Kontrola pomoci shortcode

Pro overeni, ze je plugin aktivni, vlozte shortcode na libovolnou stranku:

```
[polski_version]
```

Shortcode zobrazi verzi pluginu (napr. "1.3.2") - to znamena, ze instalace funguje.

---

## Reseni problemu

### Plugin se nezobrazuje ve vyhledavani

- Zkontrolujte, zda ma vas WordPress pripojeni k repozitari WordPress.org
- Ujistete se, ze hledate presne "Polski for WooCommerce"
- Zkuste rucni instalaci ze souboru ZIP

### Chyba "Plugin vyzaduje novejsi verzi PHP"

Vas server pouziva nepodporovanou verzi PHP. Reseni:

1. Prihlaste se do hostingoveho panelu
2. Najdete nastaveni PHP (obvykle v sekci "Domeny" nebo "Hosting")
3. Zmente verzi PHP na 8.1 nebo novejsi
4. Pockejte nekolik minut na uplatneni zmen
5. Zkuste znovu aktivovat plugin

### Chyba "WooCommerce je vyzadovan"

Plugin vyzaduje aktivni WooCommerce ve verzi 8.0 nebo novejsi:

1. Ujistete se, ze je WooCommerce nainstalovan a aktivni
2. Aktualizujte WooCommerce na nejnovejsi verzi
3. Znovu aktivujte plugin Polski for WooCommerce

### Bila obrazovka po aktivaci

Pokud po aktivaci vidite bilou obrazovku:

1. Zapnete rezim ladeni WordPress - pridejte do `wp-config.php`:

```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
```

2. Zkontrolujte soubor logu: `wp-content/debug.log`
3. Pokud se problem tyka konfliktu s jinym pluginem, deaktivujte ostatni pluginy a aktivujte je jednotlive

### Problemy s opravnenimi souboru

Pokud rucni instalace nefunguje, zkontrolujte opravneni:

```bash
# Doporucena opravneni pro adresare
chmod 755 wp-content/plugins/polski-for-woocommerce/

# Doporucena opravneni pro soubory
chmod 644 wp-content/plugins/polski-for-woocommerce/*.php
```

---

## Aktualizace pluginu

Plugin se aktualizuje standardnim mechanismem WordPress. Kdyz se objevi nova verze:

1. Uvidite oznameni v **Pluginy > Nainstalovane pluginy**
2. Kliknete **Aktualizovat** nebo pouzijte hromadnou aktualizaci
3. Po aktualizaci zkontrolujte, zda obchod funguje spravne

:::tip[Zaloha]
Pred aktualizaci zalohe databazi a soubory. Hosting casto zalohuje automaticky, ale rucni zaloha dava jistotu.
:::

---

## Dalsi kroky

Po instalaci prejdete ke [konfiguraci pluginu](/cs/getting-started/configuration/) pro aktivaci modulu a prizpusobeni nastaveni.

Mate problem, ktery zde neni? Nahlaste jej na [GitHub Issues](https://github.com/wppoland/polski/issues) nebo se zeptejte na [GitHub Discussions](https://github.com/wppoland/polski/discussions).

<div class="disclaimer">Tato stránka slouží pouze k informačním účelům a nepředstavuje právní poradenství. Před implementací se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
