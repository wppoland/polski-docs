---
title: Generátor SBOM (Software Bill of Materials)
description: Export dokumentu CycloneDX 1.4 popisujúceho závislosti pluginu - PHP (composer.lock), JS (package-lock.json) a hlavička pluginu. Užitočné pre audity CRA a import do Dependency-Track.
---

Modul **SBOM** generuje dokument **CycloneDX 1.4 JSON** popisujúci závislosti pluginu Polski for WooCommerce (a Polski Pro, ak je nainštalovaný). SBOM je čoraz častejšie vyžadovanou prílohou k bezpečnostným auditom a dokumentačným balíkom CRA a jeho štruktúra CycloneDX je akceptovaná skenermi zraniteľností (Trivy, Dependency-Track, OWASP DT).

:::note
SBOM vygenerovaný z tohto modulu popisuje knižnice závislé **od pluginu**. Pre úplný SBOM celého obchodu by ste navyše potrebovali sken WordPress Core, ostatných pluginov, šablóny a systémových závislostí.
:::

## Čo sa skenuje

| Zdroj               | Rozsah                                                                    |
| ------------------- | ------------------------------------------------------------------------- |
| `composer.lock`     | PHP balíky zo sekcie `packages` (scope `required`) a `packages-dev` (scope `optional`) |
| `package-lock.json` | npm balíky z mapy `packages` (npm v7+); príznak `dev` -> scope `optional`  |
| Hlavička pluginu    | Metadáta komponentu aplikácie: `name`, `version`, `publisher: WPPoland`   |

Pre každý balík sa zostavuje `purl` (Package URL) vo formáte:

- PHP: `pkg:composer/<vendor>/<name>@<version>`
- JS: `pkg:npm/<name>@<version>`

Licencie sa normalizujú do poľa `{license: {id: "<SPDX>"}}`.

## Sťahovanie

Prejdite do **Polski > SBOM** a kliknite na **Download SBOM (JSON)** pri zvolenom cieli (FREE alebo PRO). Súbor:

- Názov: `<slug>-sbom-<version>-<timestamp>.cdx.json`
- Content-Type: `application/vnd.cyclonedx+json; charset=utf-8`
- Content-Disposition: `attachment`

## Ukážkový fragment

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

## Oprávnenia

Prístup na stránku a sťahovanie: `manage_woocommerce`. Funkcia je založená na `admin_post` + nonce `polski_sbom_download`.

## Importy

Vygenerovaný súbor môžete priamo importovať do:

- **Dependency-Track** (File Upload alebo REST `/api/v1/bom`)
- **Trivy** (`trivy sbom <file>.cdx.json`)
- **Grype** (`grype sbom:<file>.cdx.json`)
- **OWASP CycloneDX CLI** (`cyclonedx validate`)

## Obmedzenia

- SBOM popisuje iba jeden adresár pluginu; neagreguje celý WordPress
- Chýba sekcia hashov súborov (`hashes`), bude doplnená v PRO
- Nenormalizované licencie (napr. `MIT OR Apache-2.0`) sa dostávajú ako `id` v nezmenenej forme
- Nezisťuje závislosti stiahnuté mimo `composer.lock` / `package-lock.json`
