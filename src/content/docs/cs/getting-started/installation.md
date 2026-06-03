---
title: Instalace pluginu
description: Návod na instalaci pluginu Polski for WooCommerce krok za krokem - z panelu WordPress a ručně ze souboru ZIP. Systémové požadavky a řešení problémů.
---

## Předběžné požadavky

Zkontrolujte, zda váš server splňuje požadavky. Plugin **Polski for WooCommerce** 1.3.2 vyžaduje:

| Komponenta | Minimální verze | Doporučená verze |
|-----------|-----------------|-----------------|
| WordPress | 6.4+ | 6.7+ |
| WooCommerce | 8.0+ | 9.x |
| PHP | 8.1+ | 8.2+ |
| MySQL | 5.7+ | 8.0+ |
| MariaDB | 10.3+ | 10.11+ |

### Kontrola verze PHP

Nevíte, jakou máte verzi PHP? Zkontrolujte ji v panelu WordPress:

1. Přejděte do **Nástroje > Stav webu**
2. Klikněte na záložku **Informace**
3. Rozbalte sekci **Server**
4. Najděte pole **Verze PHP**

Verzi PHP najdete také v panelu hostingu (cPanel, DirectAdmin) v nastavení domény.

### Kontrola verze WooCommerce

1. Přejděte do **Pluginy > Nainstalované pluginy**
2. Najděte na seznamu **WooCommerce**
3. Verze je zobrazena pod názvem pluginu

:::caution[PHP 8.0 a starší]
Plugin nefunguje na PHP 7.x ani PHP 8.0. Pokud váš hosting nemá PHP 8.1+, změňte verzi PHP v panelu hostingu nebo kontaktujte poskytovatele.
:::

---

## Metoda 1: Instalace z panelu WordPress (doporučená)

Toto je nejjednodušší a doporučená metoda instalace.

### Krok 1 - otevřete panel pluginů

Přihlaste se do administračního panelu WordPress a přejděte do **Pluginy > Přidat nový plugin**.

### Krok 2 - vyhledejte plugin

Do pole vyhledávání zadejte:

```
Polski for WooCommerce
```

Plugin by se měl objevit jako první výsledek. Autorem je **wppoland.com**.

### Krok 3 - nainstalujte plugin

Klikněte na tlačítko **Instalovat** u pluginu "Polski for WooCommerce". Počkejte, až WordPress stáhne a rozbalí soubory.

### Krok 4 - aktivujte plugin

Po dokončení instalace se tlačítko změní na **Aktivovat**. Klikněte na něj, abyste plugin aktivovali.

### Krok 5 - přejděte ke konfiguraci

Po aktivaci se objeví oznámení s odkazem na průvodce konfigurací. Klikněte na **Nakonfigurovat plugin** nebo přejděte ručně do **WooCommerce > Polski**.

---

## Metoda 2: Ruční instalace ze souboru ZIP

Tuto metodu použijte, když chcete nainstalovat konkrétní verzi nebo se server nepřipojuje k WordPress.org.

### Krok 1 - stáhněte balíček ZIP

Stáhněte nejnovější verzi pluginu z jednoho z níže uvedených zdrojů:

- **WordPress.org**: [https://wordpress.org/plugins/polski/](https://wordpress.org/plugins/polski/)
- **GitHub Releases**: [https://github.com/wppoland/polski/releases](https://github.com/wppoland/polski/releases)

### Krok 2 - nahrajte soubor ZIP

1. Přejděte do **Pluginy > Přidat nový plugin**
2. Klikněte na tlačítko **Nahrát plugin** v horní části stránky
3. Klikněte na **Vybrat soubor** a vyberte stažený soubor ZIP
4. Klikněte na **Instalovat**

### Krok 3 - aktivujte plugin

Po nahrání a rozbalení souborů klikněte na **Aktivovat plugin**.

---

## Metoda 3: Instalace přes FTP/SFTP

Tuto metodu použijte, když panel WordPress neumožňuje nahrávat soubory (např. kvůli limitu velikosti).

### Krok 1 - rozbalte archiv

Rozbalte stažený soubor ZIP na svém počítači. Získáte složku `polski`.

### Krok 2 - nahrajte na server

Připojte se k serveru přes FTP/SFTP a nahrajte celou složku `polski` do adresáře:

```
/wp-content/plugins/
```

Struktura po nahrání by měla vypadat takto:

```
wp-content/
  plugins/
    polski/
      polski.php
      includes/
      assets/
      ...
```

### Krok 3 - aktivujte v panelu

Přejděte do **Pluginy > Nainstalované pluginy** v panelu WordPress a klikněte na **Aktivovat** u "Polski for WooCommerce".

---

## Instalace přes WP-CLI

Pokud máte přístup k terminálu serveru, můžete plugin nainstalovat jedním příkazem:

```bash
wp plugin install polski --activate
```

Pro aktualizaci pluginu na nejnovější verzi:

```bash
wp plugin update polski
```

Kontrola aktuální verze:

```bash
wp plugin get polski --fields=name,version,status
```

---

## Ověření instalace

Po aktivaci pluginu zkontrolujte, zda vše funguje správně:

1. **Nová položka v menu** - v menu WooCommerce by se měl objevit prvek **Polski**
2. **Dashboard souladu** - přejděte do **WooCommerce > Polski**, abyste viděli hlavní panel
3. **Žádné chyby** - zkontrolujte, zda se na stránce neobjevily zprávy o chybách PHP

### Kontrola pomocí shortcodu

Pro kontrolu, zda je plugin aktivní, vložte na libovolnou stránku shortcode:

```
[polski_version]
```

Shortcode zobrazí verzi pluginu (např. "1.3.2") - to znamená, že instalace funguje.

---

## Řešení problémů

### Plugin se neobjevuje ve vyhledávači

- Zkontrolujte, zda má váš WordPress spojení s repozitářem WordPress.org
- Ujistěte se, že hledáte přesně "Polski for WooCommerce"
- Zkuste ruční instalaci ze souboru ZIP

### Chyba "Plugin vyžaduje novější verzi PHP"

Váš server používá nepodporovanou verzi PHP. Řešení:

1. Přihlaste se do hostingového panelu
2. Najděte nastavení PHP (obvykle v sekci "Domény" nebo "Hosting")
3. Změňte verzi PHP na 8.1 nebo novější
4. Počkejte několik minut na uplatnění změn
5. Zkuste plugin znovu aktivovat

### Chyba "WooCommerce je vyžadováno"

Plugin vyžaduje aktivní WooCommerce ve verzi 8.0 nebo novější:

1. Ujistěte se, že je WooCommerce nainstalováno a aktivní
2. Aktualizujte WooCommerce na nejnovější verzi
3. Znovu aktivujte plugin Polski for WooCommerce

### Bílá obrazovka po aktivaci

Pokud po aktivaci vidíte bílou obrazovku:

1. Zapněte režim ladění WordPress - přidejte do `wp-config.php`:

```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
```

2. Zkontrolujte soubor logů: `wp-content/debug.log`
3. Pokud se problém týká konfliktu s jiným pluginem, deaktivujte ostatní pluginy a aktivujte je po jednom

### Problémy s oprávněními souborů

Pokud ruční instalace nefunguje, zkontrolujte oprávnění:

```bash
# Doporučená oprávnění pro adresáře
chmod 755 wp-content/plugins/polski/

# Doporučená oprávnění pro soubory
chmod 644 wp-content/plugins/polski/*.php
```

---

## Aktualizace pluginu

Plugin se aktualizuje standardním mechanismem WordPress. Když se objeví nová verze:

1. Uvidíte oznámení v **Pluginy > Nainstalované pluginy**
2. Klikněte na **Aktualizovat** nebo použijte hromadnou aktualizaci
3. Po aktualizaci zkontrolujte, zda obchod funguje správně

:::tip[Záloha]
Před aktualizací si udělejte zálohu databáze a souborů. Hosting to často dělá automaticky, ale ruční záloha dává jistotu.
:::

---

## Další kroky

Po instalaci přejděte ke [konfiguraci pluginu](getting-started/configuration/), abyste zapnuli moduly a přizpůsobili nastavení.

Máte problém, který tu není? Nahlaste ho na [GitHub Issues](https://github.com/wppoland/polski/issues) nebo se zeptejte na [GitHub Discussions](https://github.com/wppoland/polski/discussions).

<div class="disclaimer">Tato stránka má výhradně informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) dodávaný bez záruky.</div>
