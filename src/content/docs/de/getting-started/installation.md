---
title: Plugin-Installation
description: Schritt-fuer-Schritt-Anleitung zur Installation des Plugins Polski for WooCommerce - ueber das WordPress-Panel sowie manuell aus der ZIP-Datei. Systemanforderungen und Fehlerbehebung.
---

## Voraussetzungen

Pruefe, ob dein Server die Anforderungen erfuellt. Das Plugin **Polski for WooCommerce** 1.3.2 erfordert:

| Komponente | Mindestversion | Empfohlene Version |
|-----------|-----------------|-----------------|
| WordPress | 6.4+ | 6.7+ |
| WooCommerce | 8.0+ | 9.x |
| PHP | 8.1+ | 8.2+ |
| MySQL | 5.7+ | 8.0+ |
| MariaDB | 10.3+ | 10.11+ |

### Pruefen der PHP-Version

Du weisst nicht, welche PHP-Version du hast? Pruefe es im WordPress-Panel:

1. Gehe zu **Werkzeuge > Website-Zustand**
2. Klicke auf den Reiter **Informationen**
3. Klappe den Bereich **Server** auf
4. Finde das Feld **PHP-Version**

Die PHP-Version findest du auch im Hosting-Panel (cPanel, DirectAdmin) in den Domain-Einstellungen.

### Pruefen der WooCommerce-Version

1. Gehe zu **Plugins > Installierte Plugins**
2. Finde **WooCommerce** in der Liste
3. Die Version wird unter dem Plugin-Namen angezeigt

:::caution[PHP 8.0 und aelter]
Das Plugin funktioniert nicht mit PHP 7.x oder PHP 8.0. Wenn dein Hosting kein PHP 8.1+ hat, aendere die PHP-Version im Hosting-Panel oder kontaktiere den Anbieter.
:::

---

## Methode 1: Installation ueber das WordPress-Panel (empfohlen)

Das ist die einfachste und empfohlene Installationsmethode.

### Schritt 1 - oeffne das Plugin-Panel

Melde dich im WordPress-Administrationsbereich an und gehe zu **Plugins > Neues Plugin hinzufuegen**.

### Schritt 2 - suche das Plugin

Gib im Suchfeld ein:

```
Polski for WooCommerce
```

Das Plugin sollte als erstes Ergebnis erscheinen. Der Autor ist **wppoland.com**.

### Schritt 3 - installiere das Plugin

Klicke beim Plugin "Polski for WooCommerce" auf den Button **Jetzt installieren**. Warte, bis WordPress die Dateien heruntergeladen und entpackt hat.

### Schritt 4 - aktiviere das Plugin

Nach Abschluss der Installation aendert sich der Button zu **Aktivieren**. Klicke darauf, um das Plugin zu aktivieren.

### Schritt 5 - gehe zur Konfiguration

Nach der Aktivierung erscheint ein Hinweis mit einem Link zum Konfigurationsassistenten. Klicke auf **Plugin konfigurieren** oder gehe manuell zu **WooCommerce > Polski**.

---

## Methode 2: Manuelle Installation aus der ZIP-Datei

Nutze diese Methode, wenn du eine bestimmte Version installieren willst oder der Server keine Verbindung zu WordPress.org herstellt.

### Schritt 1 - lade das ZIP-Paket herunter

Lade die neueste Version des Plugins aus einer der folgenden Quellen herunter:

- **WordPress.org**: [https://wordpress.org/plugins/polski/](https://wordpress.org/plugins/polski/)
- **GitHub Releases**: [https://github.com/wppoland/polski/releases](https://github.com/wppoland/polski/releases)

### Schritt 2 - lade die ZIP-Datei hoch

1. Gehe zu **Plugins > Neues Plugin hinzufuegen**
2. Klicke oben auf der Seite auf den Button **Plugin hochladen**
3. Klicke auf **Datei auswaehlen** und waehle die heruntergeladene ZIP-Datei
4. Klicke auf **Jetzt installieren**

### Schritt 3 - aktiviere das Plugin

Nach dem Hochladen und Entpacken der Dateien klicke auf **Plugin aktivieren**.

---

## Methode 3: Installation per FTP/SFTP

Nutze diese Methode, wenn das WordPress-Panel das Hochladen von Dateien nicht erlaubt (z. B. wegen einer Groessenbegrenzung).

### Schritt 1 - entpacke das Archiv

Entpacke die heruntergeladene ZIP-Datei auf deinem Computer. Du erhaeltst einen Ordner `polski`.

### Schritt 2 - lade auf den Server hoch

Verbinde dich per FTP/SFTP mit dem Server und lade den gesamten Ordner `polski` in das Verzeichnis hoch:

```
/wp-content/plugins/
```

Die Struktur nach dem Hochladen sollte so aussehen:

```
wp-content/
  plugins/
    polski/
      polski.php
      includes/
      assets/
      ...
```

### Schritt 3 - aktiviere im Panel

Gehe zu **Plugins > Installierte Plugins** im WordPress-Panel und klicke bei "Polski for WooCommerce" auf **Aktivieren**.

---

## Installation per WP-CLI

Wenn du Zugriff auf das Server-Terminal hast, kannst du das Plugin mit einem einzigen Befehl installieren:

```bash
wp plugin install polski --activate
```

Um das Plugin auf die neueste Version zu aktualisieren:

```bash
wp plugin update polski
```

Pruefen der aktuellen Version:

```bash
wp plugin get polski --fields=name,version,status
```

---

## Ueberpruefung der Installation

Pruefe nach der Aktivierung des Plugins, ob alles korrekt funktioniert:

1. **Neuer Menuepunkt** - im WooCommerce-Menue sollte das Element **Polski** erscheinen
2. **Compliance-Dashboard** - gehe zu **WooCommerce > Polski**, um das Hauptpanel zu sehen
3. **Keine Fehler** - pruefe, ob auf der Seite keine PHP-Fehlermeldungen erscheinen

### Pruefung mit einem Shortcode

Um zu pruefen, ob das Plugin aktiv ist, fuege auf einer beliebigen Seite einen Shortcode ein:

```
[polski_version]
```

Der Shortcode zeigt die Plugin-Version (z. B. "1.3.2") - das bedeutet, dass die Installation funktioniert.

---

## Fehlerbehebung

### Das Plugin erscheint nicht in der Suche

- Pruefe, ob dein WordPress eine Verbindung zum WordPress.org-Repository hat
- Stelle sicher, dass du genau "Polski for WooCommerce" suchst
- Versuche die manuelle Installation aus der ZIP-Datei

### Fehler "Das Plugin erfordert eine neuere PHP-Version"

Dein Server verwendet eine nicht unterstuetzte PHP-Version. Loesung:

1. Melde dich im Hosting-Panel an
2. Finde die PHP-Einstellungen (in der Regel im Bereich "Domains" oder "Hosting")
3. Aendere die PHP-Version auf 8.1 oder neuer
4. Warte einige Minuten, bis die Aenderungen uebernommen werden
5. Versuche, das Plugin erneut zu aktivieren

### Fehler "WooCommerce ist erforderlich"

Das Plugin erfordert ein aktives WooCommerce in Version 8.0 oder neuer:

1. Stelle sicher, dass WooCommerce installiert und aktiv ist
2. Aktualisiere WooCommerce auf die neueste Version
3. Aktiviere das Plugin Polski for WooCommerce erneut

### Weisser Bildschirm nach der Aktivierung

Wenn du nach der Aktivierung einen weissen Bildschirm siehst:

1. Aktiviere den WordPress-Debug-Modus - fuege Folgendes zu `wp-config.php` hinzu:

```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
```

2. Pruefe die Logdatei: `wp-content/debug.log`
3. Wenn das Problem einen Konflikt mit einem anderen Plugin betrifft, deaktiviere die uebrigen Plugins und aktiviere sie einzeln

### Probleme mit Dateiberechtigungen

Wenn die manuelle Installation nicht funktioniert, pruefe die Berechtigungen:

```bash
# Empfohlene Berechtigungen fuer Verzeichnisse
chmod 755 wp-content/plugins/polski/

# Empfohlene Berechtigungen fuer Dateien
chmod 644 wp-content/plugins/polski/*.php
```

---

## Aktualisierung des Plugins

Das Plugin aktualisiert sich ueber den standardmaessigen WordPress-Mechanismus. Wenn eine neue Version erscheint:

1. Du siehst einen Hinweis in **Plugins > Installierte Plugins**
2. Klicke auf **Jetzt aktualisieren** oder nutze die Massenaktualisierung
3. Pruefe nach der Aktualisierung, ob der Shop korrekt funktioniert

:::tip[Backup]
Erstelle vor der Aktualisierung ein Backup der Datenbank und der Dateien. Hosting macht das oft automatisch, aber ein manuelles Backup gibt Sicherheit.
:::

---

## Naechste Schritte

Gehe nach der Installation zur [Plugin-Konfiguration](getting-started/configuration/), um Module zu aktivieren und die Einstellungen anzupassen.

Hast du ein Problem, das hier nicht aufgefuehrt ist? Melde es auf [GitHub Issues](https://github.com/wppoland/polski/issues) oder frage auf [GitHub Discussions](https://github.com/wppoland/polski/discussions).

<div class="disclaimer">Diese Seite dient ausschliesslich Informationszwecken und stellt keine Rechtsberatung dar. Konsultiere vor der Umsetzung einen Anwalt. Polski for WooCommerce ist eine Open-Source-Software (GPLv2), die ohne Gewaehrleistung bereitgestellt wird.</div>
