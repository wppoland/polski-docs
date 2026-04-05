---
title: Inštalácia pluginu
description: Návod na inštaláciu pluginu Polski for WooCommerce krok za krokom - z panelu WordPress a ručne zo súboru ZIP. Systémové požiadavky a riešenie problémov.
---

## Predpoklady

Skontrolujte, či váš server spĺňa požiadavky. Plugin **Polski for WooCommerce** 1.3.2 vyžaduje:

| Komponent | Minimálna verzia | Odporúčaná verzia |
|-----------|-----------------|-----------------|
| WordPress | 6.4+ | 6.7+ |
| WooCommerce | 8.0+ | 9.x |
| PHP | 8.1+ | 8.2+ |
| MySQL | 5.7+ | 8.0+ |
| MariaDB | 10.3+ | 10.11+ |

### Kontrola verzie PHP

Neviete, akú máte verziu PHP? Skontrolujte v paneli WordPress:

1. Prejdite do **Nástroje > Zdravie stránky**
2. Kliknite na záložku **Informácie**
3. Rozbaľte sekciu **Server**
4. Nájdite pole **Verzia PHP**

Verziu PHP nájdete aj v paneli hostingu (cPanel, DirectAdmin) v nastaveniach domény.

### Kontrola verzie WooCommerce

1. Prejdite do **Pluginy > Nainštalované pluginy**
2. Nájdite **WooCommerce** v zozname
3. Verzia je zobrazená pod názvom pluginu

:::caution[PHP 8.0 a staršie]
Plugin nefunguje na PHP 7.x ani PHP 8.0. Ak váš hosting nemá PHP 8.1+, zmeňte verziu PHP v paneli hostingu alebo kontaktujte poskytovateľa.
:::

---

## Metóda 1: Inštalácia z panelu WordPress (odporúčaná)

Najjednoduchšia a odporúčaná metóda inštalácie.

### Krok 1 - otvorte panel pluginov

Prihláste sa do administračného panelu WordPress a prejdite do **Pluginy > Pridať nový plugin**.

### Krok 2 - vyhľadajte plugin

Do vyhľadávacieho poľa zadajte:

```
Polski for WooCommerce
```

Plugin by sa mal zobraziť ako prvý výsledok. Autorom je **wppoland.com**.

### Krok 3 - nainštalujte plugin

Kliknite na tlačidlo **Inštalovať teraz** pri plugine "Polski for WooCommerce". Počkajte, kým WordPress stiahne a rozbalí súbory.

### Krok 4 - aktivujte plugin

Po dokončení inštalácie sa tlačidlo zmení na **Aktivovať**. Kliknutím ho aktivujete.

### Krok 5 - prejdite na konfiguráciu

Po aktivácii sa zobrazí oznámenie s odkazom na sprievodcu konfiguráciou. Kliknite na **Nakonfigurovať plugin** alebo ručne prejdite do **WooCommerce > Polski**.

---

## Metóda 2: Ručná inštalácia zo súboru ZIP

Použite túto metódu, keď chcete nainštalovať konkrétnu verziu alebo server sa nepripája k WordPress.org.

### Krok 1 - stiahnite balík ZIP

Stiahnite najnovšiu verziu pluginu z jedného z nasledujúcich zdrojov:

- **WordPress.org**: [https://wordpress.org/plugins/polski-for-woocommerce/](https://wordpress.org/plugins/polski-for-woocommerce/)
- **GitHub Releases**: [https://github.com/wppoland/polski/releases](https://github.com/wppoland/polski/releases)

### Krok 2 - nahrajte súbor ZIP

1. Prejdite do **Pluginy > Pridať nový plugin**
2. Kliknite na tlačidlo **Nahrať plugin** v hornej časti stránky
3. Kliknite na **Vybrať súbor** a vyberte stiahnutý súbor ZIP
4. Kliknite na **Inštalovať teraz**

### Krok 3 - aktivujte plugin

Po nahraní a rozbalení súborov kliknite na **Aktivovať plugin**.

---

## Metóda 3: Inštalácia cez FTP/SFTP

Použite túto metódu, keď panel WordPress neumožňuje nahrávanie súborov (napr. kvôli limitu veľkosti).

### Krok 1 - rozbaľte archív

Rozbaľte stiahnutý súbor ZIP na vašom počítači. Získate priečinok `polski-for-woocommerce`.

### Krok 2 - nahrajte na server

Pripojte sa k serveru cez FTP/SFTP a nahrajte celý priečinok `polski-for-woocommerce` do adresára:

```
/wp-content/plugins/
```

Štruktúra po nahraní by mala vyzerať takto:

```
wp-content/
  plugins/
    polski-for-woocommerce/
      polski-for-woocommerce.php
      includes/
      assets/
      ...
```

### Krok 3 - aktivujte v paneli

Prejdite do **Pluginy > Nainštalované pluginy** v paneli WordPress a kliknite na **Aktivovať** pri "Polski for WooCommerce".

---

## Inštalácia cez WP-CLI

Ak máte prístup k terminálu servera, môžete nainštalovať plugin jedným príkazom:

```bash
wp plugin install polski-for-woocommerce --activate
```

Na aktualizáciu pluginu na najnovšiu verziu:

```bash
wp plugin update polski-for-woocommerce
```

Kontrola aktuálnej verzie:

```bash
wp plugin get polski-for-woocommerce --fields=name,version,status
```

---

## Overenie inštalácie

Po aktivácii pluginu skontrolujte, či všetko funguje správne:

1. **Nová položka v menu** - v menu WooCommerce by sa mala zobraziť položka **Polski**
2. **Dashboard súladu** - prejdite do **WooCommerce > Polski** a pozrite si hlavný panel
3. **Žiadne chyby** - skontrolujte, či sa na stránke nezobrazili chybové hlásenia PHP

### Kontrola pomocou shortcódu

Na overenie, že plugin je aktívny, vložte shortcód na ľubovoľnej stránke:

```
[polski_version]
```

Shortcód zobrazí verziu pluginu (napr. "1.3.2") - to znamená, že inštalácia funguje.

---

## Riešenie problémov

### Plugin sa nezobrazuje vo vyhľadávaní

- Skontrolujte, či váš WordPress má pripojenie k repozitáru WordPress.org
- Uistite sa, že hľadáte presne "Polski for WooCommerce"
- Skúste ručnú inštaláciu zo súboru ZIP

### Chyba "Plugin vyžaduje novšiu verziu PHP"

Váš server používa nepodporovanú verziu PHP. Riešenie:

1. Prihláste sa do hostingového panelu
2. Nájdite nastavenia PHP (zvyčajne v sekcii "Domény" alebo "Hosting")
3. Zmeňte verziu PHP na 8.1 alebo novšiu
4. Počkajte niekoľko minút na aplikovanie zmien
5. Skúste znova aktivovať plugin

### Chyba "WooCommerce je vyžadovaný"

Plugin vyžaduje aktívny WooCommerce vo verzii 8.0 alebo novšej:

1. Uistite sa, že WooCommerce je nainštalovaný a aktívny
2. Aktualizujte WooCommerce na najnovšiu verziu
3. Znova aktivujte plugin Polski for WooCommerce

### Biela obrazovka po aktivácii

Ak po aktivácii vidíte bielu obrazovku:

1. Zapnite režim ladenia WordPress - pridajte do `wp-config.php`:

```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
```

2. Skontrolujte súbor logov: `wp-content/debug.log`
3. Ak problém súvisí s konfliktom s iným pluginom, deaktivujte ostatné pluginy a aktivujte ich postupne

### Problémy s oprávneniami súborov

Ak ručná inštalácia nefunguje, skontrolujte oprávnenia:

```bash
# Odporúčané oprávnenia pre adresáre
chmod 755 wp-content/plugins/polski-for-woocommerce/

# Odporúčané oprávnenia pre súbory
chmod 644 wp-content/plugins/polski-for-woocommerce/*.php
```

---

## Aktualizácia pluginu

Plugin sa aktualizuje cez štandardný mechanizmus WordPress. Keď sa objaví nová verzia:

1. Uvidíte oznámenie v **Pluginy > Nainštalované pluginy**
2. Kliknite na **Aktualizovať teraz** alebo použite hromadnú aktualizáciu
3. Po aktualizácii skontrolujte, či obchod funguje správne

:::tip[Záloha]
Pred aktualizáciou zálohujte databázu a súbory. Hosting to často robí automaticky, ale ručná záloha dáva istotu.
:::

---

## Ďalšie kroky

Po inštalácii prejdite na [konfiguráciu pluginu](/sk/getting-started/configuration/), aby ste zapli moduly a nastavili plugin.

Máte problém, ktorý tu nie je? Nahláste ho na [GitHub Issues](https://github.com/wppoland/polski/issues) alebo sa opýtajte na [GitHub Discussions](https://github.com/wppoland/polski/discussions).

<div class="disclaimer">Táto stránka slúži len na informačné účely a nepredstavuje právne poradenstvo. Pred implementáciou sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
