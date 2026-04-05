---
title: WP-CLI commands
description: WP-CLI commands available in Polski for WooCommerce - data migration and configuration correctness test.
---

Polski for WooCommerce provides WP-CLI commands for managing the plugin from the command line. Commands allow automating data migrations and verifying configuration correctness.

## Requirements

- WordPress with active Polski for WooCommerce plugin
- [WP-CLI](https://wp-cli.org/) version 2.5 or newer
- SSH access to the server or a local development environment

## wp polski migrate

Data migration command for plugin updates or store transfers.

### Syntax

```bash
wp polski migrate [<migration>] [--dry-run] [--force] [--batch-size=<number>]
```

### Arguments

| Argument       | Type   | Required | Description                               |
| -------------- | ------ | -------- | ----------------------------------------- |
| `<migration>`  | string | No       | Migration name (omit = all pending)       |

### Options

| Option            | Description                                       |
| ----------------- | ------------------------------------------------- |
| `--dry-run`       | Display migration plan without executing changes  |
| `--force`         | Force re-execution of a migration                 |
| `--batch-size=N`  | Number of records processed per batch (default 100) |

### Available migrations

| Migration name            | Description                                  |
| ------------------------- | -------------------------------------------- |
| `omnibus_price_history`   | Migrate Omnibus price history to new table   |
| `checkboxes_v2`           | Update checkbox structure to v2              |
| `gpsr_meta`               | Migrate GPSR data to new meta format         |
| `wishlist_to_db`          | Move wishlists from usermeta to dedicated table |
| `delivery_time_format`    | Update delivery time format                  |
| `badges_cache_rebuild`    | Rebuild product badge cache                  |
| `search_index`            | Rebuild AJAX search index                    |

### Examples

Display pending migrations:

```bash
wp polski migrate --dry-run
```

Output:

```
Pending migrations:
  1. omnibus_price_history - Price history migration (approx. 5200 records)
  2. checkboxes_v2 - Checkbox update (3 records)
Total: 2 migrations
Dry-run mode - no changes were made.
```

Execute all pending migrations:

```bash
wp polski migrate
```

Output:

```
Executing migration: omnibus_price_history...
  Processing batch 1/52 (100 records)...
  Processing batch 2/52 (100 records)...
  ...
  Migration omnibus_price_history completed. Migrated 5200 records.

Executing migration: checkboxes_v2...
  Migration checkboxes_v2 completed. Migrated 3 records.

All migrations completed successfully.
```

Execute a specific migration with a larger batch:

```bash
wp polski migrate omnibus_price_history --batch-size=500
```

Force re-execution of a migration:

```bash
wp polski migrate search_index --force
```

### Error handling

If a migration fails, the plugin:

1. Displays a detailed error message
2. Rolls back changes from the current batch
3. Saves a log to `wp-content/debug.log` (if `WP_DEBUG_LOG` is enabled)
4. Remembers the breakpoint - the next run continues from the error location

```bash
wp polski migrate omnibus_price_history
```

Output on error:

```
Executing migration: omnibus_price_history...
  Processing batch 23/52 (100 records)...
  ERROR: Cannot save record #2345 - data integrity violation.
  Batch 23 rollback executed.
  Migration interrupted. Run again to continue from batch 23.
```

## wp polski smoke-test

Command testing the store configuration correctness. Checks all plugin modules, legal pages, checkboxes and integrations.

### Syntax

```bash
wp polski smoke-test [--module=<module>] [--format=<format>] [--verbose]
```

### Options

| Option              | Description                               |
| ------------------- | ----------------------------------------- |
| `--module=<module>` | Test only a selected module               |
| `--format=<format>` | Output format: table (default), json, csv |
| `--verbose`         | Detailed information about each test      |

### Tested elements

| Module              | Tests                                              |
| ------------------- | -------------------------------------------------- |
| `compliance`        | Legal pages, checkboxes, GPSR, Omnibus, DSA        |
| `checkout`          | Order button, NIP fields, DOI                      |
| `prices`            | Unit prices, VAT, delivery time                    |
| `food`              | Nutritional values, allergens, Nutri-Score          |
| `storefront`        | Wishlist, compare, search, filters, slider          |
| `integrations`      | REST API, templates, cache, cron                    |

### Examples

Full test:

```bash
wp polski smoke-test
```

Output:

```
Polski for WooCommerce - Smoke Test
====================================

+---------------------+---------------------------+--------+
| Module              | Test                      | Status |
+---------------------+---------------------------+--------+
| compliance          | Store terms               | OK     |
| compliance          | Privacy policy            | OK     |
| compliance          | Checkout checkboxes       | OK     |
| compliance          | GPSR data                 | WARN   |
| compliance          | Omnibus price             | OK     |
| compliance          | DSA form                  | OK     |
| checkout            | Button label              | OK     |
| checkout            | NIP field                 | OK     |
| checkout            | Double opt-in             | OFF    |
| prices              | Unit price                | OK     |
| prices              | VAT information           | OK     |
| prices              | Delivery time             | WARN   |
| storefront          | AJAX search               | OK     |
| storefront          | AJAX filters              | OK     |
| integrations        | REST API                  | OK     |
| integrations        | Theme templates           | OK     |
| integrations        | Transient cache           | OK     |
| integrations        | WP-Cron                   | OK     |
+---------------------+---------------------------+--------+

Result: 15 OK, 2 WARN, 1 OFF
```

Statuses:
- **OK** - test passed successfully
- **WARN** - warning, needs checking
- **FAIL** - critical error
- **OFF** - module disabled

Test a specific module with details:

```bash
wp polski smoke-test --module=compliance --verbose
```

Export to JSON (e.g. for CI/CD):

```bash
wp polski smoke-test --format=json
```

```json
{
  "timestamp": "2025-06-15T12:00:00+02:00",
  "total_tests": 18,
  "passed": 15,
  "warnings": 2,
  "failed": 0,
  "disabled": 1,
  "tests": [
    {
      "module": "compliance",
      "test": "terms_page",
      "status": "ok",
      "message": "Store terms published (ID: 45)"
    }
  ]
}
```

## CI/CD integration

The `smoke-test` command returns the appropriate exit code:

| Code | Description             |
| --- | ----------------------- |
| 0   | All tests OK            |
| 1   | Warnings (WARN)         |
| 2   | Critical errors (FAIL)  |

Example usage in GitHub Actions:

```yaml
- name: Polski smoke test
  run: wp polski smoke-test --format=json > smoke-test-results.json
  continue-on-error: false
```

Example in a bash script:

```bash
#!/bin/bash
wp polski smoke-test --format=json > /tmp/smoke-test.json

EXIT_CODE=$?
if [ $EXIT_CODE -eq 2 ]; then
    echo "Polski tests FAILED - check configuration"
    exit 1
elif [ $EXIT_CODE -eq 1 ]; then
    echo "Polski tests WARN - check warnings"
fi
```

## Multisite

WP-CLI commands support WordPress Multisite installations. Use the `--url` flag to target a specific site:

```bash
wp polski smoke-test --url=store1.yourdomain.com
wp polski migrate --url=store2.yourdomain.com
```

Report issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
