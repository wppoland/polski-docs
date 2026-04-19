---
title: CRA incidents (Cyber Resilience Act)
description: Register of actively-exploited vulnerabilities and security incidents. Tracks the 24h / 72h deadlines from Art. 14 of the EU Cyber Resilience Act and produces a JSON export compatible with the draft ENISA SRP schema.
---

The **CRA incidents** module helps you meet the reporting obligation in Art. 14 of the EU Cyber Resilience Act: it registers actively-exploited vulnerabilities and serious security incidents, tracks the 24-hour early-warning deadline and prepares a structured JSON export for submission to the ENISA Single Reporting Platform (SRP).

:::caution
This tool does not submit reports to ENISA directly. It produces a JSON record aligned with the draft SRP schema and optionally dispatches a webhook or email to your DPO or legal team. Final submission remains on your side.
:::

## Reporting windows

CRA Art. 14 defines three reporting thresholds for manufacturers of digital products:

| Threshold        | Deadline | Scope                                             |
| ---------------- | -------- | ------------------------------------------------- |
| Early warning    | 24h      | Detection fact, component, preliminary assessment |
| Incident report  | 72h      | Root cause, scope, applied mitigations            |
| Final report     | 14 days  | Full root cause, remediation, recommendations     |

The module calculates the 24h deadline automatically from `discoveredAt`. The other deadlines (72h, 14 days) must be tracked manually - they are outside the FREE scope.

## Registering an incident

Go to **Polski > CRA incidents > Record incident**. The form:

| Field              | Notes                                                                          |
| ------------------ | ------------------------------------------------------------------------------ |
| Title              | Short title (required)                                                         |
| Affected component | Product or module name (e.g. `polski-free`, `custom-checkout-module`)          |
| Affected versions  | Version range (e.g. `<= 2.0.4`)                                                |
| Reporter           | Person who registered the report                                               |
| External reference | CVE / bug tracker / CVD identifier (optional)                                  |
| Kind               | `actively_exploited_vulnerability`, `security_incident`, `near_miss`           |
| Severity           | `critical`, `high`, `medium`, `low`                                            |
| Summary            | Technical description (required)                                               |

After saving, the incident is in status **Open** and has `deadlineAt = discoveredAt + 24h`.

## Notification dispatcher

For every **Open** incident the list offers a **Dispatch notification** action. It fires in parallel:

- **Webhook** (POST JSON) to the URL from option `polski_cra_incident_webhook`
- **Email** with a human summary to the address from option `polski_cra_incident_email`

Both options are configured under **Polski > Settings > CRA incidents**. After a 2xx response from the webhook or a successful email, the incident transitions to status **Notified** and stores `notifiedAt`.

:::note
The cron `polski_cra_incident_deadline_check` runs hourly and emits the action hook `polski_cra_incident_deadline_approaching` for Open incidents with less than 2h remaining. Hook into it to raise a Slack / PagerDuty alert.
:::

## JSON export (ENISA SRP)

The **Export JSON** action returns `cra-incident-<id>-<timestamp>.json` with `Content-Type: application/json`. The shape follows the draft ENISA Single Reporting Platform schema - fields cover manufacturer identity, component, detection time, severity, incident kind and summary.

Example:

```json
{
  "reference_id": "CVE-2026-1234",
  "kind": "actively_exploited_vulnerability",
  "severity": "high",
  "title": "Stored XSS in checkout notes",
  "affected_component": "polski-free",
  "affected_versions": "<= 2.0.4",
  "discovered_at": "2026-04-19T08:12:00+00:00",
  "deadline_at": "2026-04-20T08:12:00+00:00",
  "summary": "..."
}
```

## Hooks

```php
// After an incident is recorded (before any notification).
add_action('polski_cra_incident_recorded', function (int $id, $incident): void {
    // Your integration: Jira, PagerDuty, Slack
}, 10, 2);

// When less than 2h remain to the 24h deadline.
add_action('polski_cra_incident_deadline_approaching', function ($incident): void {
    // Escalate to DPO
});
```

## Migration 2.1.0

Version 2.1.0 introduces the `{$wpdb->prefix}polski_cra_incidents` table. Migration runs automatically on activation. If it does not, force it manually:

```bash
wp polski migrate --module=cra
```

## Permissions

- UI and actions: `manage_woocommerce`
- Webhook / email: freely configurable (no capability requirement - these are outbound channels)

## Limitations

- The module does not auto-track the 72h / 14-day thresholds (only 24h)
- Incident detection is manual - we do not scan logs
- The webhook has no HMAC signature (planned for PRO)
- The form does not support binary attachments - attach them to the ENISA SRP submission manually
