---
title: Schutz vor Greenwashing
description: Anti-Greenwashing-Produktfelder in Polski for WooCommerce - Grundlage der Umweltaussage, Zertifikat und Gültigkeitsdatum gemäß Richtlinie 2024/825.
---

Die EU-Richtlinie 2024/825 verbietet unbegründete Umweltaussagen. Ab dem 27. September 2026 dürfen Sie keine allgemeinen ökologischen Aussagen (z. B. "öko", "grün") ohne konkrete Begründung und Zertifikat verwenden. Das Plugin fügt Produktfelder zur Dokumentation von Umweltaussagen hinzu.

## Was ist Greenwashing

Greenwashing ist die Irreführung von Kunden über die ökologischen Eigenschaften eines Produkts. Beispiele für verbotene Praktiken:

- Verwendung pauschaler Aussagen ("öko", "bio", "grün") ohne Zertifizierung
- Behauptungen über Klimaneutralität, die ausschließlich auf Emissionskompensation beruhen
- Suggerieren von Umweltvorteilen ohne wissenschaftliche Belege
- Anzeige inoffizieller Umweltzeichen
- Behauptungen über die Haltbarkeit eines Produkts ohne Begründung

## Produktfelder

In der Produktbearbeitung, im Reiter **Polski - Umwelt**, finden Sie drei Felder zur Dokumentation von Umweltaussagen.

### Grundlage der Aussage

Feld für die Beschreibung der wissenschaftlichen oder technischen Grundlage der Umweltaussage.

**Was eintragen:**

- Der konkrete Umweltaspekt, auf den sich die Aussage bezieht (z. B. "Produkt zu 80 % aus recycelten Materialien hergestellt")
- Untersuchungs- oder Analysemethodik (z. B. "Ökobilanz des Produkts (LCA) gemäß ISO 14040")
- Mess- oder Untersuchungsergebnisse (z. B. "CO2-Fußabdruck 2,3 kg CO2e pro Einheit - Bericht der Firma XYZ vom 2025-01-15")
- Vergleich mit einem Referenzprodukt (wenn die Aussage vergleichend ist)

**Beispiel für einen korrekten Eintrag:**

```
Aussage: "Verpackung zu 100 % aus recycelten Materialien"
Grundlage: Der Rohstoff stammt vollständig aus Post-Consumer-PET-Recycling.
Rohstofflieferant: RecyPET Sp. z o.o., Zertifikat EuCertPlast Nr. 2025/0123.
Produktionsprozess durch interne Prüfung vom 2025-03-01 bestätigt.
```

### Zertifikat

Feld für Informationen über das Zertifikat, das die Umweltaussage bestätigt.

**Akzeptierte Zertifikate:**

- Zertifikate gemäß Verordnung (EG) Nr. 66/2010 (EU Ecolabel)
- Nationale Zertifikate, die von der Europäischen Kommission anerkannt sind
- Branchenzertifikate, ausgestellt von akkreditierten Zertifizierungsstellen
- FSC-, PEFC-Zertifikate (für Holz-/Papierprodukte)
- GOTS-, OEKO-TEX-Zertifikate (für Textilien)
- EuCertPlast-, RecyClass-Zertifikate (für Kunststoffe)

**Was eintragen:**

- Name des Zertifikats
- Zertifikatsnummer
- Zertifizierungsstelle
- Link zur Verifizierung (falls verfügbar)

**Beispiel:**

```
EU Ecolabel - Lizenznummer PL/032/005
Zertifizierungsstelle: PCBC S.A.
Verifizierung: https://environment.ec.europa.eu/ecolabel_en
```

### Gültigkeitsdatum

Datum, bis zu dem das Zertifikat oder die Aussage gültig ist.

Nach Ablauf des Gültigkeitsdatums:

- Wird die Umweltaussage automatisch auf der Produktseite ausgeblendet
- Erhält der Administrator eine E-Mail-Benachrichtigung über das abgelaufene Zertifikat
- Wird das Produkt in der Produktliste mit einem Warnsymbol gekennzeichnet

Das schützt vor der Situation, dass ein abgelaufenes Zertifikat weiterhin für Kunden sichtbar ist.

## Anzeige auf der Produktseite

Nach dem Ausfüllen der Felder zeigt das Plugin den Abschnitt "Umweltinformation" auf der Produktseite mit folgenden Daten an:

- Inhalt der Umweltaussage
- Name und Nummer des Zertifikats
- Gültigkeitsdatum des Zertifikats
- Zertifikatssymbol (wenn es erkannt wird, z. B. EU Ecolabel)

Der Abschnitt erscheint im Reiter "Zusätzliche Informationen" oder als separater Reiter (in der Konfiguration einstellbar).

## Konfiguration

Moduleinstellungen: **WooCommerce > Einstellungen > Polski > Umwelt**.

| Option | Beschreibung | Standardwert |
|-------|------|------------------|
| Modul aktivieren | Aktiviert die Umweltfelder | Nein |
| Anzeigeposition | Wo die Information auf der Produktseite angezeigt wird | Reiter "Zusätzliche Informationen" |
| Benachrichtigung über Ablauf | Wie viele Tage vor Ablauf eine Benachrichtigung senden | 30 |
| Automatisches Ausblenden | Aussage nach Ablauf des Zertifikats ausblenden | Ja |

## Massenverwaltung

### CSV-Export

Die Umweltdaten sind im WooCommerce-Produktexport enthalten. Zusätzliche Spalten:

- `env_claim_basis` - Grundlage der Aussage
- `env_certificate` - Zertifikat
- `env_expiry_date` - Gültigkeitsdatum (Format YYYY-MM-DD)

### CSV-Import

Bereiten Sie eine CSV-Datei mit den entsprechenden Kopfzeilen vor und importieren Sie sie über den Standardweg von WooCommerce.

### Produkte filtern

In der Produktliste können Sie nach dem Status der Aussage filtern:

- Alle Produkte mit einer Aussage
- Produkte mit abgelaufenem Zertifikat
- Produkte mit einem innerhalb von 30 Tagen ablaufenden Zertifikat
- Produkte ohne Zertifikat (aber mit Aussage)

## Bewährte Praktiken

1. **Seien Sie konkret** - statt "Öko-Verpackung" schreiben Sie "Verpackung zu 100 % aus recyceltem Karton, FSC-Zertifikat Nr. XXXX"
2. **Geben Sie Quellen an** - verweisen Sie auf konkrete Untersuchungen, Berichte, Zertifikate
3. **Aktualisieren Sie die Daten** - richten Sie Benachrichtigungen über den Ablauf von Zertifikaten ein und erneuern Sie sie rechtzeitig
4. **Vermeiden Sie Pauschalaussagen** - die Richtlinie verbietet Behauptungen, die nicht überprüfbar sind
5. **Vergleiche müssen fair sein** - vergleichen Sie dieselben Produktkategorien und verwenden Sie dieselbe Methodik

## Fehlerbehebung

**Die Umweltfelder werden in der Produktbearbeitung nicht angezeigt**
Aktivieren Sie das Modul unter **WooCommerce > Einstellungen > Polski > Module** und prüfen Sie, ob die Option "Modul aktivieren" in den Umwelteinstellungen markiert ist.

**Die Aussage ist von der Produktseite verschwunden**
Prüfen Sie das Gültigkeitsdatum des Zertifikats. Nach Ablauf wird die Aussage automatisch ausgeblendet. Erneuern Sie das Zertifikat und aktualisieren Sie das Datum.

**Ich erhalte keine Benachrichtigungen über ablaufende Zertifikate**
Prüfen Sie, ob WP-Cron funktioniert. Die Benachrichtigungen werden durch einen Cron-Job versendet. Auf Servern mit deaktiviertem WP-Cron konfigurieren Sie einen System-Cron.

## Nächste Schritte

- Probleme melden: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskussionen und Fragen: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2), die ohne Gewährleistung bereitgestellt wird.</div>
