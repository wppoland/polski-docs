---
title: Plugin-Installation
description: Schritt-fuer-Schritt-Anleitung zur Installation des Plugins Polski for WooCommerce - ueber das WordPress-Dashboard und manuell per ZIP-Datei. Systemanforderungen und Fehlerbehebung.
---

## Voraussetzungen

Pruefen Sie vor der Installation, ob Ihr Server die Anforderungen erfuellt. Das Plugin **Polski for WooCommerce** in Version 1.3.2 erfordert:

| Komponente | Mindestversion | Empfohlene Version |
|-----------|-----------------|-----------------|
| WordPress | 6.4+ | 6.7+ |
| WooCommerce | 8.0+ | 9.x |
| PHP | 8.1+ | 8.2+ |
| MySQL | 5.7+ | 8.0+ |
| MariaDB | 10.3+ | 10.11+ |

### PHP-Version pruefen

Wenn Sie nicht wissen, welche PHP-Version Ihr Server hat, pruefen Sie dies im WordPress-Dashboard:

1. Gehen Sie zu **Werkzeuge > Website-Zustand**
2. Klicken Sie auf den Tab **Informationen**
3. Erweitern Sie den Abschnitt **Server**
4. Suchen Sie das Feld **PHP-Version**

Alternativ ist die PHP-Version in vielen Hosting-Panels (cPanel, DirectAdmin) in den Domain-Einstellungen verfuegbar.

### WooCommerce-Version pruefen

1. Gehen Sie zu **Plugins > Installierte Plugins**
2. Suchen Sie **WooCommerce** in der Liste
3. Die Version wird unter dem Plugin-Namen angezeigt

:::caution[PHP 8.0 und aelter]
Das Plugin funktioniert nicht mit PHP 7.x oder PHP 8.0. Wenn Ihr Hosting PHP 8.1+ nicht unterstuetzt, kontaktieren Sie Ihren Hosting-Anbieter bezueglich eines Updates. Die meisten Hoster erlauben das Aendern der PHP-Version im Administrationspanel.
:::

---

## Methode 1: Installation ueber das WordPress-Dashboard (empfohlen)

Dies ist die einfachste und empfohlene Installationsmethode.

### Schritt 1 - Plugin-Panel oeffnen

Melden Sie sich im WordPress-Administrationspanel an und gehen Sie zu **Plugins > Neues Plugin hinzufuegen**.

### Schritt 2 - Plugin suchen

Geben Sie im Suchfeld ein:

```
Polski for WooCommerce
```

Das Plugin sollte als erstes Ergebnis erscheinen. Der Autor ist **wppoland.com**.

### Schritt 3 - Plugin installieren

Klicken Sie auf den Button **Jetzt installieren** beim Plugin "Polski for WooCommerce". Warten Sie, bis WordPress die Dateien heruntergeladen und entpackt hat.

### Schritt 4 - Plugin aktivieren

Nach Abschluss der Installation aendert sich der Button zu **Aktivieren**. Klicken Sie darauf, um das Plugin zu aktivieren.

### Schritt 5 - Zur Konfiguration gehen

Nach der Aktivierung erscheint eine Benachrichtigung mit einem Link zum Konfigurationsassistenten. Klicken Sie auf **Plugin konfigurieren** oder gehen Sie manuell zu **WooCommerce > Polski**.

---

## Methode 2: Manuelle Installation per ZIP-Datei

Verwenden Sie diese Methode, wenn Sie eine bestimmte Plugin-Version installieren moechten oder keinen Zugriff auf das WordPress.org-Repository vom Server aus haben.

### Schritt 1 - ZIP-Paket herunterladen

Laden Sie die neueste Version des Plugins von einer der folgenden Quellen herunter:

- **WordPress.org**: [https://wordpress.org/plugins/polski-for-woocommerce/](https://wordpress.org/plugins/polski-for-woocommerce/)
- **GitHub Releases**: [https://github.com/wppoland/polski/releases](https://github.com/wppoland/polski/releases)

### Schritt 2 - ZIP-Datei hochladen

1. Gehen Sie zu **Plugins > Neues Plugin hinzufuegen**
2. Klicken Sie auf den Button **Plugin hochladen** oben auf der Seite
3. Klicken Sie auf **Datei auswaehlen** und waehlen Sie die heruntergeladene ZIP-Datei
4. Klicken Sie auf **Jetzt installieren**

### Schritt 3 - Plugin aktivieren

Klicken Sie nach dem Hochladen und Entpacken der Dateien auf **Plugin aktivieren**.

---

## Methode 3: Installation ueber FTP/SFTP

Diese Methode ist nuetzlich, wenn das WordPress-Dashboard keine Dateiuploads erlaubt (z.B. wegen Groessenlimits).

### Schritt 1 - Archiv entpacken

Entpacken Sie die heruntergeladene ZIP-Datei auf Ihrem Computer. Sie erhalten den Ordner `polski-for-woocommerce`.

### Schritt 2 - Auf den Server hochladen

Verbinden Sie sich per FTP/SFTP mit dem Server und laden Sie den gesamten Ordner `polski-for-woocommerce` in das Verzeichnis hoch:

```
/wp-content/plugins/
```

Die Struktur nach dem Hochladen sollte so aussehen:

```
wp-content/
  plugins/
    polski-for-woocommerce/
      polski-for-woocommerce.php
      includes/
      assets/
      ...
```

### Schritt 3 - Im Dashboard aktivieren

Gehen Sie zu **Plugins > Installierte Plugins** im WordPress-Dashboard und klicken Sie auf **Aktivieren** bei "Polski for WooCommerce".

---

## Installation ueber WP-CLI

Wenn Sie Terminalzugang zum Server haben, koennen Sie das Plugin mit einem einzigen Befehl installieren:

```bash
wp plugin install polski-for-woocommerce --activate
```

Um das Plugin auf die neueste Version zu aktualisieren:

```bash
wp plugin update polski-for-woocommerce
```

Aktuelle Version pruefen:

```bash
wp plugin get polski-for-woocommerce --fields=name,version,status
```

---

## Installationsverifizierung

Pruefen Sie nach der Aktivierung des Plugins, ob alles korrekt funktioniert:

1. **Neuer Menuepunkt** - im WooCommerce-Menue sollte der Eintrag **Polski** erscheinen
2. **Compliance-Dashboard** - gehen Sie zu **WooCommerce > Polski**, um das Hauptpanel zu sehen
3. **Keine Fehler** - pruefen Sie, ob auf der Seite keine PHP-Fehlermeldungen erscheinen

### Verifizierung per Shortcode

Um schnell zu ueberpruefen, ob das Plugin aktiv ist, koennen Sie den Diagnose-Shortcode auf einer beliebigen Seite verwenden:

```
[polski_version]
```

Der Shortcode zeigt die aktuelle Plugin-Version an (z.B. "1.3.2"), was eine korrekte Installation bestaetigt.

---

## Fehlerbehebung

### Plugin erscheint nicht in der Suche

- Pruefen Sie, ob Ihr WordPress eine Verbindung zum WordPress.org-Repository hat
- Stellen Sie sicher, dass Sie genau nach "Polski for WooCommerce" suchen
- Versuchen Sie die manuelle Installation per ZIP-Datei

### Fehler "Plugin erfordert eine neuere PHP-Version"

Ihr Server verwendet eine nicht unterstuetzte PHP-Version. Loesung:

1. Melden Sie sich im Hosting-Panel an
2. Suchen Sie die PHP-Einstellungen (ueblicherweise im Abschnitt "Domains" oder "Hosting")
3. Aendern Sie die PHP-Version auf 8.1 oder neuer
4. Warten Sie einige Minuten auf die Anwendung der Aenderungen
5. Versuchen Sie erneut, das Plugin zu aktivieren

### Fehler "WooCommerce ist erforderlich"

Das Plugin erfordert ein aktives WooCommerce in Version 8.0 oder neuer:

1. Stellen Sie sicher, dass WooCommerce installiert und aktiv ist
2. Aktualisieren Sie WooCommerce auf die neueste Version
3. Aktivieren Sie das Plugin Polski for WooCommerce erneut

### Weisser Bildschirm nach der Aktivierung

Wenn nach der Aktivierung ein weisser Bildschirm erscheint:

1. Aktivieren Sie den WordPress-Debug-Modus - fuegen Sie zu `wp-config.php` hinzu:

```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
```

2. Pruefen Sie die Logdatei: `wp-content/debug.log`
3. Wenn das Problem ein Konflikt mit einem anderen Plugin ist, deaktivieren Sie die uebrigen Plugins und aktivieren Sie sie einzeln

### Probleme mit Dateiberechtigungen

Wenn die manuelle Installation nicht funktioniert, pruefen Sie die Berechtigungen:

```bash
# Empfohlene Berechtigungen fuer Verzeichnisse
chmod 755 wp-content/plugins/polski-for-woocommerce/

# Empfohlene Berechtigungen fuer Dateien
chmod 644 wp-content/plugins/polski-for-woocommerce/*.php
```

---

## Plugin-Update

Das Plugin aktualisiert sich automatisch ueber den WordPress-Update-Mechanismus. Wenn eine neue Version verfuegbar ist:

1. Sie sehen eine Benachrichtigung unter **Plugins > Installierte Plugins**
2. Klicken Sie auf **Jetzt aktualisieren** oder nutzen Sie die Massenaktualisierung
3. Pruefen Sie nach dem Update, ob der Shop korrekt funktioniert

:::tip[Sicherungskopie]
Erstellen Sie vor jedem Update eine Sicherungskopie der Datenbank und der Dateien. Die meisten Hoster bieten automatische Backups an, aber eine manuelle Kopie gibt Ihnen die Sicherheit, Aenderungen rueckgaengig machen zu koennen.
:::

---

## Naechste Schritte

Gehen Sie nach erfolgreicher Installation zur [Plugin-Konfiguration](/de/getting-started/configuration/), um die benoetigten Module zu aktivieren und die Einstellungen an Ihren Shop anzupassen.

Wenn Sie ein Problem haben, das nicht in dieser Liste steht, melden Sie es auf [GitHub Issues](https://github.com/wppoland/polski/issues) oder fragen Sie die Community auf [GitHub Discussions](https://github.com/wppoland/polski/discussions).

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
