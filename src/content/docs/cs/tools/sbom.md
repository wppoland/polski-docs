---
title: Generátor SBOM (Software Bill of Materials)
description: Export dokumentu CycloneDX 1.4 popisujícího závislosti pluginu - PHP (composer.lock), JS (package-lock.json) a hlavičku pluginu. Užitečné pro audity CRA a import do Dependency-Track.
---

Modul **SBOM** generuje dokument **CycloneDX 1.4 JSON** popisující závislosti pluginu Polski for WooCommerce (a Polski Pro, pokud je nainstalován). SBOM je stále častěji vyžadovanou přílohou bezpečnostních auditů a dokumentačních balíčků CRA a jeho struktura CycloneDX je akceptována skenery zranitelností (Trivy, Dependency-Track, OWASP DT).

:::note
SBOM vygenerovaný z tohoto modulu popisuje knihovny, na kterých **závisí plugin**. Pro úplný SBOM celého obchodu byste navíc potřebovali sken WordPress Core, ostatních pluginů, šablony a systémových závislostí.
:::

## Co se skenuje

| Zdroj               | Rozsah                                                                    |
| ------------------- | ------------------------------------------------------------------------- |
| `composer.lock`     | PHP balíčky ze sekce `packages` (scope `required`) a `packages-dev` (scope `optional`) |
| `package-lock.json` | npm balíčky z mapy `packages` (npm v7+); příznak `dev` -> scope `optional`  |
| Hlavička pluginu    | Metadata komponenty aplikace: `name`, `version`, `publisher: WPPoland`   |

Pro každý balíček se sestaví `purl` (Package URL) ve formátu:

- PHP: `pkg:composer/<vendor>/<name>@<version>`
- JS: `pkg:npm/<name>@<version>`

Licence se normalizují do pole `{license: {id: "<SPDX>"}}`.

## Stahování

Přejděte na **Polski > SBOM** a klikněte na **Download SBOM (JSON)** u vybraného cíle (FREE nebo PRO). Soubor:

- Název: `<slug>-sbom-<version>-<timestamp>.cdx.json`
- Content-Type: `application/vnd.cyclonedx+json; charset=utf-8`
- Content-Disposition: `attachment`

## Ukázkový fragment

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

## Oprávnění

Přístup ke stránce a stažení: `manage_woocommerce`. Funkce je založena na `admin_post` + nonce `polski_sbom_download`.

## Importy

Vygenerovaný soubor můžete přímo importovat do:

- **Dependency-Track** (File Upload nebo REST `/api/v1/bom`)
- **Trivy** (`trivy sbom <file>.cdx.json`)
- **Grype** (`grype sbom:<file>.cdx.json`)
- **OWASP CycloneDX CLI** (`cyclonedx validate`)

## Omezení

- SBOM popisuje pouze jeden adresář pluginu; neagreguje celý WordPress
- Chybí sekce hashů souborů (`hashes`), bude doplněna v PRO
- Nenormalizované licence (např. `MIT OR Apache-2.0`) se zapisují jako `id` v nezměněné podobě
- Nedetekuje závislosti stažené mimo `composer.lock` / `package-lock.json`
