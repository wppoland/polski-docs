---
title: Generator SBOM (Software Bill of Materials)
description: Eksport dokumentu CycloneDX 1.4 opisujacego zaleznosci wtyczki - PHP (composer.lock), JS (package-lock.json) i naglowek wtyczki. Przydatne do audytow CRA i importu do Dependency-Track.
---

Modul **SBOM** generuje dokument **CycloneDX 1.4 JSON** opisujacy zaleznosci wtyczki Polski for WooCommerce (oraz Polski Pro, jesli zainstalowane). SBOM jest coraz czesciej wymaganym zalacznikiem do audytow bezpieczenstwa i pakietow dokumentacyjnych CRA, a jego struktura CycloneDX jest akceptowana przez skanery podatnosci (Trivy, Dependency-Track, OWASP DT).

:::note
SBOM wygenerowany z tego modulu opisuje biblioteki zalezne **od wtyczki**. Dla pelnego SBOM calego sklepu potrzebowalbys dodatkowo skanu WordPress Core, innych wtyczek, motywu i zaleznosci systemowych.
:::

## Co jest skanowane

| Zrodlo              | Zakres                                                                    |
| ------------------- | ------------------------------------------------------------------------- |
| `composer.lock`     | Pakiety PHP z sekcji `packages` (scope `required`) i `packages-dev` (scope `optional`) |
| `package-lock.json` | Pakiety npm z mapy `packages` (npm v7+); flaga `dev` -> scope `optional`  |
| Naglowek wtyczki    | Metadane komponentu aplikacji: `name`, `version`, `publisher: WPPoland`   |

Dla kazdego pakietu budowany jest `purl` (Package URL) w formacie:

- PHP: `pkg:composer/<vendor>/<name>@<version>`
- JS: `pkg:npm/<name>@<version>`

Licencje sa normalizowane do tablicy `{license: {id: "<SPDX>"}}`.

## Pobieranie

Przejdz do **Polski > SBOM** i kliknij **Download SBOM (JSON)** przy wybranym targecie (FREE lub PRO). Plik:

- Nazwa: `<slug>-sbom-<version>-<timestamp>.cdx.json`
- Content-Type: `application/vnd.cyclonedx+json; charset=utf-8`
- Content-Disposition: `attachment`

## Przykladowy fragment

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

## Uprawnienia

Dostep do strony i pobranie: `manage_woocommerce`. Dzialanie oparte o `admin_post` + nonce `polski_sbom_download`.

## Importy

Wygenerowany plik mozesz bezposrednio zaimportowac do:

- **Dependency-Track** (File Upload lub REST `/api/v1/bom`)
- **Trivy** (`trivy sbom <file>.cdx.json`)
- **Grype** (`grype sbom:<file>.cdx.json`)
- **OWASP CycloneDX CLI** (`cyclonedx validate`)

## Ograniczenia

- SBOM opisuje tylko jeden katalog wtyczki; nie agreguje calego WordPressa
- Brak rozdzialu hashy plikow (`hashes`) — dodawany bedzie w PRO
- Licencje nienormalizowane (np. `MIT OR Apache-2.0`) trafiaja jako `id` w niezmienionej formie
- Nie wykrywa zaleznosci pobranych poza `composer.lock` / `package-lock.json`
