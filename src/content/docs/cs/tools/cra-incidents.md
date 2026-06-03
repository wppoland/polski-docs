---
title: Incidenty CRA (Cyber Resilience Act)
description: Registr aktivně zneužívaných zranitelností a bezpečnostních incidentů, lhůty 24h/72h z čl. 14 CRA, export JSON odpovídající návrhu schématu ENISA SRP.
---

Modul **Incidenty CRA** pomáhá splnit ohlašovací povinnost z čl. 14 unijního Cyber Resilience Act: registruje aktivně zneužívané zranitelnosti a závažné incidenty, hlídá 24hodinovou lhůtu včasného varování a připravuje strukturovaný export JSON pro podání na platformě ENISA SRP (Single Reporting Platform).

:::caution
Tento nástroj neodesílá hlášení do ENISA přímo. Generuje záznam JSON odpovídající návrhu schématu SRP a volitelně odešle webhook/e-mail vašemu DPO nebo právnímu oddělení. Konečné podání hlášení zůstává na vaší straně.
:::

## Časové rámce

CRA čl. 14 rozlišuje tři prahy hlášení pro výrobce digitálních produktů:

| Práh              | Lhůta  | Rozsah                                          |
| ----------------- | ------ | ----------------------------------------------- |
| Včasné varování   | 24h    | Fakt zjištění, komponenta, předběžné posouzení  |
| Hlášení incidentu | 72h    | Popis příčiny, rozsah, použitá opatření         |
| Závěrečné hlášení | 14 dní | Úplná příčina, nápravná opatření, doporučení    |

Modul počítá 24h automaticky od `discoveredAt`. Ostatní lhůty (72h, 14 dní) sledujte ručně, jsou mimo rozsah verze FREE.

## Registrace incidentu

Přejděte do **Polski > Incidenty CRA > Record incident**. Formulář:

| Pole                | Poznámky                                                                       |
| ------------------- | ------------------------------------------------------------------------------ |
| Title               | Krátký název (vyžadováno)                                                      |
| Affected component  | Název produktu / modulu (např. `polski-free`, `custom-checkout-module`)        |
| Affected versions   | Rozsah verzí (např. `<= 2.0.4`)                                                |
| Reporter            | Osoba, která hlášení zaregistrovala                                            |
| External reference  | Identifikátor z CVE / bug trackeru / CVD (volitelný)                           |
| Kind                | `actively_exploited_vulnerability`, `security_incident`, `near_miss`           |
| Severity            | `critical`, `high`, `medium`, `low`                                            |
| Summary             | Technický popis (vyžadováno)                                                   |

Po uložení je incident ve stavu **Open** a má vypočtené `deadlineAt = discoveredAt + 24h`.

## Dispatcher oznámení

Pro každý incident **Open** je dostupné tlačítko **Dispatch notification**. Odešle paralelně:

- **Webhook** (POST JSON) na URL z volby `polski_cra_incident_webhook`
- **E-mail** se souhrnem na adresu z volby `polski_cra_incident_email`

Obě volby nakonfigurujete v **Polski > Settings > CRA incidents**. Po obdržení odpovědi 2xx z webhooku nebo úspěšném odeslání e-mailu přechází incident do stavu **Notified** a ukládá `notifiedAt`.

:::note
Cron `polski_cra_incident_deadline_check` běží každou hodinu a emituje action hook `polski_cra_incident_deadline_approaching` pro incidenty `Open`, které mají méně než 2h do lhůty. Připojte se k tomuto hooku pro odeslání alertu Slack / PagerDuty.
:::

## Export JSON (ENISA SRP)

Akce **Export JSON** v seznamu vrací soubor `cra-incident-<id>-<timestamp>.json` s hlavičkou `Content-Type: application/json`. Tvar odpovídá návrhu schématu ENISA Single Reporting Platform, pole pokrývají: identifikaci výrobce, komponenty, času zjištění, posouzení závažnosti, kategorii incidentu a popis.

Příklad:

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

## Hooky

```php
// Po zaregistrování incidentu (před oznámením).
add_action('polski_cra_incident_recorded', function (int $id, $incident): void {
    // vlastní integrace: Jira, PagerDuty, Slack
}, 10, 2);

// Když do lhůty 24h zbývají méně než 2h.
add_action('polski_cra_incident_deadline_approaching', function ($incident): void {
    // eskalace na DPO
});
```

## Migrace 2.1.0

Verze 2.1.0 zavádí tabulku `{$wpdb->prefix}polski_cra_incidents`. Migrace se spustí automaticky při aktivaci, pokud nefunguje, vynuťte ji ručně:

```bash
wp polski migrate --module=cra
```

## Oprávnění

- UI a akce: `manage_woocommerce`
- Webhook/e-mail: libovolně konfigurovatelné (žádný požadavek na oprávnění, jde o výstupní kanály)

## Omezení

- Modul nesleduje automaticky práh 72h / 14 dní (pouze 24h)
- Detekce incidentů je manuální, neskenujeme logy
- Webhook nemá podpis HMAC (plánováno v PRO)
- Formulář nepodporuje binární přílohy, připojte je k hlášení v ENISA SRP ručně
