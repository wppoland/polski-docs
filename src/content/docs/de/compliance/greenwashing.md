---
title: Schutz vor Greenwashing
description: Anti-Greenwashing-Produktfelder in Polski for WooCommerce - Grundlage der Umwelterklaerung, Zertifikat und Ablaufdatum gemaess Richtlinie 2024/825.
---

Die EU-Richtlinie 2024/825 verbietet unbegruendete Umweltaussagen. Ab dem 27. September 2026 duerfen allgemeine oekologische Behauptungen (z.B. "oeko", "gruen") nicht ohne Begruendung und Zertifikat verwendet werden. Das Plugin fuegt Produktfelder zur Dokumentation von Umweltaussagen hinzu.

## Was ist Greenwashing

Greenwashing ist die Praxis, Verbraucher ueber Umwelteigenschaften eines Produkts oder einer Unternehmenstaetigkeit in die Irre zu fuehren. Beispiele verbotener Praktiken:

- Verwendung allgemeiner Aussagen ("oeko", "bio", "gruen") ohne Zertifizierung
- Behauptungen zur Klimaneutralitaet, die ausschliesslich auf Emissionskompensation basieren
- Suggerierung von Umweltvorteilen ohne wissenschaftliche Belege
- Anzeige inoffizieller Umweltzeichen
- Behauptungen zur Produkthaltbarkeit ohne Begruendung

## Produktfelder

In der WooCommerce-Produktbearbeitung, im Tab **Polski - Umwelt**, stehen drei Felder zur Dokumentation von Umweltaussagen zur Verfuegung.

### Grundlage der Erklaerung

Textfeld fuer die Beschreibung der wissenschaftlichen oder technischen Grundlage der Umweltaussage.

**Was einzutragen ist:**

- Konkreter Umweltaspekt, auf den sich die Erklaerung bezieht (z.B. "Produkt zu 80% aus Recyclingmaterialien hergestellt")
- Methodik der Studie oder Analyse (z.B. "Lebenszyklusanalyse (LCA) gemaess ISO 14040")
- Mess- oder Studienergebnisse (z.B. "CO2-Fussabdruck 2,3 kg CO2e pro Einheit - Bericht der Firma XYZ vom 15.01.2025")
- Vergleich mit Referenzprodukt (bei vergleichenden Aussagen)

**Beispiel eines korrekten Eintrags:**

```
Aussage: "Verpackung zu 100% aus Recyclingmaterialien"
Grundlage: Rohstoff stammt vollstaendig aus Post-Consumer-PET-Recycling.
Rohstofflieferant: RecyPET GmbH, EuCertPlast-Zertifikat Nr. 2025/0123.
Produktionsprozess bestaetigt durch internes Audit vom 01.03.2025.
```

### Zertifikat

Feld fuer Informationen zum offiziellen Zertifikat, das die Umweltaussage bestaetigt.

**Akzeptierte Zertifikate:**

- Zertifikate gemaess Verordnung (EG) Nr. 66/2010 (EU Ecolabel)
- Von der Europaeischen Kommission anerkannte nationale Zertifikate
- Von akkreditierten Zertifizierungsstellen ausgestellte Branchenzertifikate
- FSC-, PEFC-Zertifikate (fuer Holz-/Papierprodukte)
- GOTS-, OEKO-TEX-Zertifikate (fuer Textilien)
- EuCertPlast-, RecyClass-Zertifikate (fuer Kunststoffe)

**Was einzutragen ist:**

- Name des Zertifikats
- Zertifikatsnummer
- Zertifizierungsstelle
- Verifizierungslink (falls verfuegbar)

**Beispiel:**

```
EU Ecolabel - Lizenznummer PL/032/005
Zertifizierungsstelle: PCBC S.A.
Verifizierung: https://environment.ec.europa.eu/ecolabel_en
```

### Ablaufdatum

Datumsfeld, das angibt, bis wann das Zertifikat oder die Umweltaussage gueltig ist.

Nach Ablauf des Datums:

- Die Umweltaussage wird automatisch auf der Produktseite ausgeblendet
- Der Administrator erhaelt eine E-Mail-Benachrichtigung ueber das abgelaufene Zertifikat
- Das Produkt wird in der Produktliste mit einem Warnsymbol gekennzeichnet

Diese Sicherung schuetzt vor der Situation, dass ein abgelaufenes Zertifikat weiterhin den Kunden angezeigt wird.

## Anzeige auf der Produktseite

Wenn die Umweltfelder ausgefuellt sind, zeigt das Plugin einen Abschnitt "Umweltinformation" auf der Produktseite an. Der Abschnitt enthaelt:

- Inhalt der Umweltaussage
- Name und Nummer des Zertifikats
- Ablaufdatum des Zertifikats
- Zertifikatssymbol (wenn erkannt - z.B. EU Ecolabel)

Der Abschnitt wird im Tab "Zusaetzliche Informationen" auf der Produktseite oder als separater Tab angezeigt (konfigurierbar in den Einstellungen).

## Konfiguration

Moduleinstellungen: **WooCommerce > Einstellungen > Polski > Umwelt**.

| Option | Beschreibung | Standardwert |
|-------|------|------------------|
| Modul aktivieren | Aktiviert Umweltfelder | Nein |
| Anzeigeposition | Wo die Information auf der Produktseite anzeigen | Tab "Zusaetzliche Informationen" |
| Ablaufbenachrichtigung | Tage vor Ablauf fuer Benachrichtigung | 30 |
| Automatisches Ausblenden | Aussage nach Zertifikatsablauf ausblenden | Ja |

## Massenverwaltung

### CSV-Export

Umweltdaten sind im WooCommerce-Produktexport enthalten. Zusaetzliche Spalten:

- `env_claim_basis` - Grundlage der Erklaerung
- `env_certificate` - Zertifikat
- `env_expiry_date` - Ablaufdatum (Format YYYY-MM-DD)

### CSV-Import

Bereiten Sie eine CSV-Datei mit den entsprechenden Spaltenkoepfen vor und importieren Sie sie ueber den Standard-WooCommerce-Pfad.

### Produktfilterung

In der Produktliste im Administrationspanel koennen Sie Produkte nach Umwelterklaerungsstatus filtern:

- Alle Produkte mit Erklaerung
- Produkte mit abgelaufenem Zertifikat
- Produkte mit Zertifikat, das innerhalb von 30 Tagen ablaeuft
- Produkte ohne Zertifikat (aber mit Erklaerung)

## Best Practices

1. **Seien Sie konkret** - statt "oeko Verpackung" schreiben Sie "Verpackung zu 100% aus Recycling-Karton, FSC-Zertifikat Nr. XXXX"
2. **Geben Sie Quellen an** - beziehen Sie sich auf konkrete Studien, Berichte, Zertifikate
3. **Daten aktualisieren** - richten Sie Ablaufbenachrichtigungen ein und erneuern Sie Zertifikate rechtzeitig
4. **Verallgemeinerungen vermeiden** - die Richtlinie verbietet Behauptungen, die nicht ueberpreuft werden koennen
5. **Vergleiche muessen fair sein** - vergleichen Sie dieselben Produktkategorien mit derselben Methodik

## Fehlerbehebung

**Umweltfelder werden in der Produktbearbeitung nicht angezeigt**
Aktivieren Sie das Modul unter **WooCommerce > Einstellungen > Polski > Module** und stellen Sie sicher, dass die Option "Modul aktivieren" in den Umwelteinstellungen aktiviert ist.

**Erklaerung ist von der Produktseite verschwunden**
Pruefen Sie das Ablaufdatum des Zertifikats. Wenn das Zertifikat abgelaufen ist, wird die Erklaerung automatisch ausgeblendet. Erneuern Sie das Zertifikat und aktualisieren Sie das Ablaufdatum.

**Ich erhalte keine Benachrichtigungen ueber ablaufende Zertifikate**
Pruefen Sie, ob WP-Cron korrekt funktioniert. Benachrichtigungen werden ueber einen geplanten Cron-Job gesendet. Auf Servern mit deaktiviertem WP-Cron konfigurieren Sie einen System-Cron.

## Weitere Schritte

- Probleme melden: [GitHub Issues](https://github.com/wppoland/polski/issues)
- Diskussionen und Fragen: [GitHub Discussions](https://github.com/wppoland/polski/discussions)

<div class="disclaimer">Diese Seite dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Konsultieren Sie vor der Umsetzung einen Anwalt. Polski for WooCommerce ist Open-Source-Software (GPLv2) ohne Garantie.</div>
