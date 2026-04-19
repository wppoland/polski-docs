---
title: SBOM - Software Bill of Materials
description: Generate a CycloneDX 1.4 JSON document listing the plugin's PHP (Composer) and JavaScript (npm) dependencies. Useful for security audits, CRA compliance packages and vulnerability scanners such as Trivy or Dependency-Track.
---

The **SBOM** module generates a **CycloneDX 1.4** JSON document describing the plugin directory and its dependencies. It is a structural artefact required by Art. 13 of the EU Cyber Resilience Act and accepted by most SBOM consumers (Trivy, Dependency-Track, Grype).

## Why CycloneDX and not SPDX

Both formats are widely accepted. CycloneDX 1.4 JSON was chosen because the shape is simpler, is consumed directly by Trivy and Dependency-Track, and uses Package URLs (`purl`) which ship out-of-the-box for Composer and npm.

## Configuration

Go to **Polski > SBOM**. The module is enabled by default. To disable: **Polski > Modules** > uncheck "SBOM".

## Sources

For each target directory the generator reads:

| File                | Content                                                                  |
| ------------------- | ------------------------------------------------------------------------ |
| `composer.lock`     | PHP packages (sections `packages` and `packages-dev`)                    |
| `package-lock.json` | JavaScript packages (map `packages` under `node_modules/...`)            |
| Plugin header       | Name and version (from `VERSION` constant)                               |

The generator runs on-demand only. The JSON is not cached - generation for a FREE plugin with around 100 dependencies takes under 200 ms.

## Targets

- `polski` - the FREE plugin (`WP_PLUGIN_DIR/polski` or `Polski\PLUGIN_DIR`)
- `polski-pro` - visible only when PRO is installed and `Polski\Pro\PLUGIN_DIR` / `Polski\Pro\VERSION` constants are defined

## Output

The file is served with:

```
Content-Type: application/vnd.cyclonedx+json; charset=utf-8
Content-Disposition: attachment; filename="polski-sbom-<version>-<UTC timestamp>.cdx.json"
```

Example (truncated):

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

## Usage

### Trivy

```bash
trivy sbom polski-sbom-2.1.0-20260419-083000.cdx.json
```

### Dependency-Track

1. Create a project in Dependency-Track (one per plugin).
2. Upload the JSON via the UI or the `/api/v1/bom` endpoint.
3. Connect the project to a CI pipeline so that every release updates the BOM.

## CRA context

Art. 13 of the Cyber Resilience Act requires manufacturers to maintain SBOMs for their products. Storing the CycloneDX JSON next to the tagged release is a common way to meet the obligation. The filename embeds the version and UTC timestamp so artefacts stay unique across releases.

## Permissions

- UI and download: `manage_woocommerce`
- Nonce: `polski_sbom_download` (required for the POST action)

## Limitations

- Transitive dependency relationships (`dependencies` tree) are not emitted yet (flat list only)
- WordPress itself is not a component in the BOM (it is the runtime, not a bundled dependency)
- Version discovered from the plugin constants only - not from the `composer.json` field
- No HMAC signature on the BOM (planned in PRO)
