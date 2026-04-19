---
title: SBOM - Software Bill of Materials
description: Erzeugt ein CycloneDX 1.4 JSON-Dokument, das die PHP- (Composer) und JavaScript- (npm) Abhaengigkeiten des Plugins auflistet. Nuetzlich fuer Sicherheitsaudits, CRA-Konformitaetspakete und Schwachstellenscanner wie Trivy oder Dependency-Track.
---

Das Modul **SBOM** erzeugt ein **CycloneDX 1.4** JSON-Dokument, das das Plugin-Verzeichnis und seine Abhaengigkeiten beschreibt. Dies ist ein strukturelles Artefakt, das von Art. 13 des EU Cyber Resilience Act gefordert und von den meisten SBOM-Consumern (Trivy, Dependency-Track, Grype) akzeptiert wird.

## Warum CycloneDX statt SPDX

Beide Formate sind weit verbreitet. CycloneDX 1.4 JSON wurde gewaehlt, weil die Struktur einfacher ist, direkt von Trivy und Dependency-Track konsumiert wird und Package URLs (`purl`) verwendet, die fuer Composer und npm sofort funktionieren.

## Konfiguration

Gehen Sie zu **Polski > SBOM**. Das Modul ist standardmaessig aktiviert. Deaktivierung: **Polski > Module** und Haken bei "SBOM" entfernen.

## Quellen

Fuer jedes Zielverzeichnis liest der Generator:

| Datei               | Inhalt                                                                    |
| ------------------- | ------------------------------------------------------------------------- |
| `composer.lock`     | PHP-Pakete (Abschnitte `packages` und `packages-dev`)                     |
| `package-lock.json` | JavaScript-Pakete (Map `packages` unter `node_modules/...`)               |
| Plugin-Header       | Name und Version (aus Konstante `VERSION`)                                |

Der Generator laeuft nur auf Abruf. Das JSON wird nicht gecached - die Erzeugung fuer ein FREE-Plugin mit rund 100 Abhaengigkeiten dauert unter 200 ms.

## Ziele

- `polski` - das FREE-Plugin (`WP_PLUGIN_DIR/polski` oder `Polski\PLUGIN_DIR`)
- `polski-pro` - nur sichtbar, wenn PRO installiert ist und die Konstanten `Polski\Pro\PLUGIN_DIR` / `Polski\Pro\VERSION` definiert sind

## Ausgabe

Die Datei wird ausgeliefert mit:

```
Content-Type: application/vnd.cyclonedx+json; charset=utf-8
Content-Disposition: attachment; filename="polski-sbom-<version>-<UTC-Zeitstempel>.cdx.json"
```

Beispiel (gekuerzt):

```json
{
  "bomFormat": "CycloneDX",
  "specVersion": "1.4",
  "serialNumber": "urn:uuid:5a3b....",
  "version": 1,
  "metadata": {
    "timestamp": "2026-04-19T08:30:00+00:00",
    "tools": [{ "vendor": "WPPoland", "name": "Polski SBOM generator", "version": "1.0" }],
    "component": {
      "type": "application",
      "bom-ref": "wppoland/polski",
      "name": "polski",
      "version": "2.1.0",
      "publisher": "WPPoland"
    }
  },
  "components": [
    {
      "type": "library",
      "bom-ref": "composer:woocommerce/woocommerce-blocks",
      "name": "woocommerce/woocommerce-blocks",
      "version": "10.8.4",
      "scope": "required",
      "purl": "pkg:composer/woocommerce/woocommerce-blocks@10.8.4",
      "licenses": [{ "license": { "id": "GPL-3.0-or-later" } }]
    }
  ]
}
```

## Verwendung

### Trivy

```bash
trivy sbom polski-sbom-2.1.0-20260419-083000.cdx.json
```

### Dependency-Track

1. Legen Sie in Dependency-Track ein Projekt an (eines pro Plugin).
2. Laden Sie das JSON ueber die UI oder den Endpunkt `/api/v1/bom` hoch.
3. Binden Sie das Projekt in eine CI-Pipeline ein, damit jedes Release das BOM aktualisiert.

## CRA-Kontext

Art. 13 des Cyber Resilience Act verpflichtet Hersteller, SBOMs fuer ihre Produkte zu pflegen. Das CycloneDX-JSON neben dem getaggten Release abzulegen, ist eine uebliche Methode, die Pflicht zu erfuellen. Der Dateiname enthaelt Version und UTC-Zeitstempel, damit Artefakte ueber Releases hinweg eindeutig bleiben.

## Berechtigungen

- UI und Download: `manage_woocommerce`
- Nonce: `polski_sbom_download` (fuer die POST-Aktion erforderlich)

## Grenzen

- Transitive Abhaengigkeitsbeziehungen (`dependencies` Baum) werden noch nicht ausgegeben (nur flache Liste)
- WordPress selbst ist keine Komponente im BOM (es ist die Laufzeit, keine gebuendelte Abhaengigkeit)
- Version wird nur aus den Plugin-Konstanten ermittelt - nicht aus dem `composer.json` Feld
- Keine HMAC-Signatur am BOM (fuer PRO geplant)
