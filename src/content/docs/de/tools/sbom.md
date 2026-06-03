---
title: SBOM-Generator (Software Bill of Materials)
description: Export eines CycloneDX-1.4-Dokuments, das die Abhängigkeiten des Plugins beschreibt - PHP (composer.lock), JS (package-lock.json) und Plugin-Header. Nützlich für CRA-Audits und den Import in Dependency-Track.
---

Das Modul **SBOM** erzeugt ein **CycloneDX-1.4-JSON**-Dokument, das die Abhängigkeiten des Plugins Polski for WooCommerce (sowie Polski Pro, falls installiert) beschreibt. Eine SBOM wird immer häufiger als verpflichtende Anlage zu Sicherheitsaudits und CRA-Dokumentationspaketen verlangt, und ihre CycloneDX-Struktur wird von Schwachstellen-Scannern (Trivy, Dependency-Track, OWASP DT) akzeptiert.

:::note
Die mit diesem Modul erzeugte SBOM beschreibt die Bibliotheken, die **vom Plugin** abhängen. Für eine vollständige SBOM des gesamten Shops bräuchtest du zusätzlich einen Scan von WordPress Core, weiteren Plugins, dem Theme und den Systemabhängigkeiten.
:::

## Was gescannt wird

| Quelle              | Umfang                                                                    |
| ------------------- | ------------------------------------------------------------------------- |
| `composer.lock`     | PHP-Pakete aus dem Abschnitt `packages` (Scope `required`) und `packages-dev` (Scope `optional`) |
| `package-lock.json` | npm-Pakete aus der Map `packages` (npm v7+); Flag `dev` -> Scope `optional`  |
| Plugin-Header       | Metadaten der Anwendungskomponente: `name`, `version`, `publisher: WPPoland`   |

Für jedes Paket wird eine `purl` (Package URL) im folgenden Format aufgebaut:

- PHP: `pkg:composer/<vendor>/<name>@<version>`
- JS: `pkg:npm/<name>@<version>`

Lizenzen werden zum Array `{license: {id: "<SPDX>"}}` normalisiert.

## Herunterladen

Gehe zu **Polski > SBOM** und klicke beim gewünschten Ziel (FREE oder PRO) auf **Download SBOM (JSON)**. Datei:

- Name: `<slug>-sbom-<version>-<timestamp>.cdx.json`
- Content-Type: `application/vnd.cyclonedx+json; charset=utf-8`
- Content-Disposition: `attachment`

## Beispielausschnitt

```json
{
  "bomFormat": "CycloneDX",
  "specVersion": "1.4",
  "serialNumber": "urn:uuid:8f3a...",
  "version": 1,
  "metadata": {
    "timestamp": "2026-04-19T09:00:00+00:00",
    "tools": [{"vendor": "WPPoland", "name": "Polski SBOM generator", "version": "1.0"}],
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
      "bom-ref": "composer:symfony/console",
      "name": "symfony/console",
      "version": "6.4.0",
      "scope": "required",
      "purl": "pkg:composer/symfony/console@6.4.0",
      "licenses": [{"license": {"id": "MIT"}}]
    }
  ]
}
```

## Berechtigungen

Zugriff auf die Seite und Download: `manage_woocommerce`. Die Funktion basiert auf `admin_post` + Nonce `polski_sbom_download`.

## Importe

Die erzeugte Datei kannst du direkt importieren in:

- **Dependency-Track** (File Upload oder REST `/api/v1/bom`)
- **Trivy** (`trivy sbom <file>.cdx.json`)
- **Grype** (`grype sbom:<file>.cdx.json`)
- **OWASP CycloneDX CLI** (`cyclonedx validate`)

## Einschränkungen

- Die SBOM beschreibt nur ein Plugin-Verzeichnis; sie aggregiert nicht das gesamte WordPress
- Kein Abschnitt mit Datei-Hashes (`hashes`) - wird in PRO ergänzt
- Nicht normalisierte Lizenzen (z. B. `MIT OR Apache-2.0`) landen unverändert als `id`
- Abhängigkeiten, die außerhalb von `composer.lock` / `package-lock.json` heruntergeladen werden, werden nicht erkannt
