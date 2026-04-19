---
title: Tax Rules
description: Rule engine for automatic assignment of GTU, JPK_V7 codes and tax classes to WooCommerce products in Polski PRO.
---

The Tax Rules module lets you automate assignment of GTU codes, JPK_V7 codes, WooCommerce tax classes, categories/tags and custom meta to products using condition/action rules. It runs on product save, on a scheduled cron and manually (Dry Run + Run Now).

:::note[Requirements]
Polski PRO requires: Polski (free) v1.6.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## How it works

1. Create a rule: name, match mode (all/any), conditions, actions, triggers, priority.
2. The engine evaluates conditions against every product and applies actions when the rule matches.
3. Every rule application is written to the audit log (who/what/when, dry run or live).
4. Triggers:
   - **On product save** - the rule runs after a product is created or updated.
   - **Daily** - the rule runs in the nightly cron against the entire catalog.
   - **Weekly** - runs once per week (WP-Cron).
   - **Monthly** - runs once per 30 days (WP-Cron).
   - **Manual** - the rule runs only when you click Run / Dry Run in the admin.

## Configuration

Open **WooCommerce > Tax Rules** and click **Add rule**.

### Rule fields

| Field | Description |
|-------|-------------|
| Name | Human-readable label (e.g. "Books -> GTU_12"). |
| Group (optional) | Free-form label used for filtering in the list. |
| Enabled | Toggle a rule off without deleting it. |
| Match mode | `all` - every condition must match, `any` - at least one must match. |
| Triggers | When the rule runs (save / daily / weekly / monthly / manual). |
| Priority | Execution order, ascending (default 10). |

### Conditions

Format: `field | operator | value | key` (last field optional).

Fields: `title`, `sku`, `price`, `regular_price`, `stock_quantity`, `stock_status`, `category`, `tag`, `type`, `attribute`, `tax_class`, `meta_field`, `gtu_code`, `jpk_v7_code`, `taxonomy`.

Operators: `equals`, `not_equals`, `contains`, `not_contains`, `starts_with`, `ends_with`, `gt`, `gte`, `lt`, `lte`, `in`, `not_in`, `is_empty`, `is_not_empty`.

The `taxonomy` field accepts any custom taxonomy; put the taxonomy slug in `key` and a comma-separated list of term IDs in `value`:

```
taxonomy | in | 12,34,56 | product_brand
```

Examples:

```
title | contains | book
price | gte | 100
category | in | 42,56,78
meta_field | equals | yes | _polski_tablet
```

### Actions

Format: `action_type | value`.

| Action | Description | Example |
|--------|-------------|---------|
| `set_gtu_code` | Assign a GTU code | `set_gtu_code \| GTU_06` |
| `remove_gtu_code` | Remove the GTU code | `remove_gtu_code \| ` |
| `set_jpk_v7_code` | Assign a JPK_V7 code | `set_jpk_v7_code \| GTU_12` |
| `set_tax_class` | Set a WooCommerce tax class | `set_tax_class \| reduced-rate` |
| `add_category` / `remove_category` | Add or remove a category | `add_category \| 42` |
| `add_tag` / `remove_tag` | Add or remove a tag | `add_tag \| 77` |
| `set_meta_field` | Set a meta field | `set_meta_field \| _polski_custom:flag` |
| `mark_receipt_with_nip` | Flag product as requiring receipt with NIP | `mark_receipt_with_nip \| 1` |

### Dry run and Audit log

Each rule has Dry run (preview without writing) and Run now (apply to the whole catalog) actions. The Audit log tab shows the last 200 applications with timestamp, rule, product, match flag, dry-run flag and applied actions.

## Smart Pickers (editor helper)

At the top of the rule editor the **Insert helper** panel lets you add condition/action lines without looking up IDs by hand:

- **Category** - all `product_cat` terms (Select2). Buttons append `category | in | <ID>` or `add_category | <ID>`.
- **Tag** - same for `product_tag`.
- **Tax class** - list of WooCommerce tax classes. Buttons append `set_tax_class | <slug>` or `tax_class | equals | <slug>`.
- **GTU code** - `GTU_01` - `GTU_13` dropdown. Three buttons: `set_gtu_code`, `set_jpk_v7_code`, or condition `gtu_code | equals | <CODE>`.

The textarea remains the source of truth - pickers only append lines.

## Rule groups

Each rule may carry an optional **group label**. Groups are used only for organizing and filtering rules in the admin; they do not affect execution.

## Search and filters

The rules list supports case-insensitive name search, status filter (enabled/disabled), trigger filter and group filter (visible only when groups exist).

## Import and export rules

The **Import / export** tab lets you:

- **Export** all rules as a portable JSON file (format `polski.tax_rules`, v1) for backup or migration.
- **Import** a previously exported JSON file. Imports always **append** rules (never replace by ID), so you can safely merge rule sets from multiple stores.

## WP-CLI

For large catalogs and automation:

```bash
# List rules
wp polski tax-rules list
wp polski tax-rules list --format=json

# Dry-run rule #3
wp polski tax-rules run 3 --dry-run

# Apply rule #3 with 100-item batches
wp polski tax-rules run 3 --batch-size=100

# Export rules to a file
wp polski tax-rules export --file=/tmp/rules.json

# Import rules from a file
wp polski tax-rules import /tmp/rules.json
```

## Bulk action on the products list

On the standard WooCommerce products list (`wp-admin/edit.php?post_type=product`) the **Bulk actions** dropdown exposes two entries:

- **Apply tax rules** - runs every enabled rule against the selected products.
- **Dry-run tax rules** - reports what would change, without writing.

After execution an admin notice shows the number of products processed, rule matches, and changes applied.

## Integration

Assigned GTU and JPK_V7 codes are stored as product meta and can be consumed by:

- the invoicing module (Faktura VAT PDF + KSeF)
- JPK_VAT export
- accounting integrations (wFirma, Fakturownia, iFirma)

## Limits and performance

- The daily cron processes the catalog in batches of 50 products.
- The audit log is capped at 10,000 rows; older entries are trimmed automatically.
- The engine guards against recursion: a rule will not re-trigger during its own internal product save.

:::caution
Always test a new rule with **Dry run** before running it against the whole catalog. After changing a tax class or JPK code, invoices and exports should be recalculated.
:::
