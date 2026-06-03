---
title: Incidenty CRA (Cyber Resilience Act)
description: Register aktivne zneuzivanych zranitelnosti a bezpecnostnych incidentov, terminy 24h/72h z cl. 14 CRA, export JSON v sulade s navrhom schemy ENISA SRP.
---

Modul **Incidenty CRA** pomaha splnit oznamovaciu povinnost z cl. 14 unijneho Cyber Resilience Act: registruje aktivne zneuzivane zranitelnosti a zavazne incidenty, strazi 24-hodinovy termin skoreho varovania a pripravuje strukturovany export JSON na podanie v platforme ENISA SRP (Single Reporting Platform).

:::caution
Tento nastroj neposiela nahlasenia do ENISA priamo. Generuje JSON zaznam v sulade s navrhom schemy SRP a volitelne odosiela webhook/email vasmu DPO alebo pravnemu oddeleniu. Konecne podanie nahlasenia ostava na vasej strane.
:::

## Casove ramce

CRA cl. 14 rozlisuje tri prahy reportovania pre vyrobcov digitalnych produktov:

| Prah               | Termin | Rozsah                                          |
| ----------------- | ------ | ----------------------------------------------- |
| Skore varovanie   | 24h    | Fakt zistenia, komponent, predbezne posudenie   |
| Report incidentu  | 72h    | Popis priciny, rozsah, prijate opatrenia        |
| Zaverecny report  | 14 dni | Plna pricina, napravne opatrenia, odporucania   |

Modul pocita 24h automaticky od `discoveredAt`. Ostatne terminy (72h, 14 dni) sledujte rucne, su mimo rozsahu FREE.

## Registracia incidentu

Prejdite do **Polski > Incidenty CRA > Record incident**. Formular:

| Pole                | Poznamky                                                                       |
| ------------------- | ------------------------------------------------------------------------------ |
| Title               | Kratky titul (povinny)                                                         |
| Affected component  | Nazov produktu / modulu (napr. `polski-free`, `custom-checkout-module`)        |
| Affected versions   | Rozsah verzii (napr. `<= 2.0.4`)                                               |
| Reporter            | Osoba, ktora nahlasenie zaregistrovala                                         |
| External reference  | Identifikator z CVE / bug trackera / CVD (volitelny)                           |
| Kind                | `actively_exploited_vulnerability`, `security_incident`, `near_miss`           |
| Severity            | `critical`, `high`, `medium`, `low`                                            |
| Summary             | Technicky popis (povinny)                                                      |

Po ulozeni je incident v statuse **Open** a ma vypocitane `deadlineAt = discoveredAt + 24h`.

## Dispatcher notifikacii

Pre kazdy incident **Open** je dostupne tlacidlo **Dispatch notification**. Posiela paralelne:

- **Webhook** (POST JSON) na URL z moznosti `polski_cra_incident_webhook`
- **Email** so zhrnutim na adresu z moznosti `polski_cra_incident_email`

Obe moznosti nakonfigurujete v **Polski > Settings > CRA incidents**. Po prijati odpovede 2xx z webhooku alebo uspesnom odoslani emailu incident prejde do statusu **Notified** a zapise `notifiedAt`.

:::note
Cron `polski_cra_incident_deadline_check` bezi kazdu hodinu a emituje action hook `polski_cra_incident_deadline_approaching` pre incidenty `Open`, ktore maju menej ako 2h do terminu. Pripojte sa pod tento hook, aby ste poslali alert Slack / PagerDuty.
:::

## Export JSON (ENISA SRP)

Akcia **Export JSON** v zozname vrati subor `cra-incident-<id>-<timestamp>.json` s hlavickou `Content-Type: application/json`. Tvar zodpoveda navrhu schemy ENISA Single Reporting Platform, polia pokryvaju: identifikaciu vyrobcu, komponentu, casu zistenia, posudenie zavaznosti, kategoriu incidentu a popis.

Priklad:

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
// Po zaregistrovani incidentu (pred notifikaciou).
add_action('polski_cra_incident_recorded', function (int $id, $incident): void {
    // vlastna integracia: Jira, PagerDuty, Slack
}, 10, 2);

// Ked do terminu 24h zostali menej ako 2h.
add_action('polski_cra_incident_deadline_approaching', function ($incident): void {
    // eskalacia k DPO
});
```

## Migracia 2.1.0

Verzia 2.1.0 zaklada tabulku `{$wpdb->prefix}polski_cra_incidents`. Migracia sa spusta automaticky pri aktivacii, ak nefunguje, vynutte ju rucne:

```bash
wp polski migrate --module=cra
```

## Opravnenia

- UI a akcie: `manage_woocommerce`
- Webhook/email: lubovolne konfigurovatelne (ziadna poziadavka na opravnenia, su to vystupne kanaly)

## Obmedzenia

- Modul nesleduje automaticky prah 72h / 14 dni (iba 24h)
- Zistovanie incidentov je manualne, neskenujeme logy
- Webhook nema podpis HMAC (planovane v PRO)
- Formular nepodporuje binarne prilohy, pripojte ich k nahlaseniu v ENISA SRP rucne
