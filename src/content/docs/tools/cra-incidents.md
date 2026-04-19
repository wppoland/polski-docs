---
title: Incydenty CRA (Cyber Resilience Act)
description: Rejestr aktywnie wykorzystywanych podatnosci i incydentow bezpieczenstwa, terminy 24h/72h z Art. 14 CRA, eksport JSON zgodny z projektem schematu ENISA SRP.
---

Modul **Incydenty CRA** pomaga spelnic obowiazek zglaszania z Art. 14 unijnego Cyber Resilience Act: rejestruje aktywnie wykorzystywane podatnosci i powazne incydenty, pilnuje 24-godzinnego terminu wczesnego ostrzezenia i przygotowuje strukturalny eksport JSON do zlozenia w platformie ENISA SRP (Single Reporting Platform).

:::caution
To narzedzie nie wysyla zgloszen do ENISA bezposrednio. Generuje rekord JSON zgodny z projektem schematu SRP oraz opcjonalnie dispatchuje webhook/email do Twojego DPO lub dzialu prawnego. Ostateczne zlozenie zgloszenia pozostaje po Twojej stronie.
:::

## Ramy czasowe

CRA Art. 14 wyroznia trzy progi raportowania dla producentow produktow cyfrowych:

| Prog              | Termin | Zakres                                          |
| ----------------- | ------ | ----------------------------------------------- |
| Wczesne ostrzezenie | 24h    | Fakt wykrycia, komponent, wstepna ocena         |
| Raport incydentu    | 72h    | Opis przyczyny, zakres, zastosowane srodki      |
| Raport koncowy      | 14 dni | Pelna przyczyna, srodki zaradcze, rekomendacje  |

Modul liczy 24h automatycznie od `discoveredAt`. Pozostale terminy (72h, 14 dni) sledz recznie — sa one poza zakresem FREE.

## Rejestracja incydentu

Przejdz do **Polski > Incydenty CRA > Record incident**. Formularz:

| Pole                | Uwagi                                                                          |
| ------------------- | ------------------------------------------------------------------------------ |
| Title               | Krotki tytul (wymagany)                                                        |
| Affected component  | Nazwa produktu / modulu (np. `polski-free`, `custom-checkout-module`)          |
| Affected versions   | Zakres wersji (np. `<= 2.0.4`)                                                 |
| Reporter            | Osoba, ktora zgloszenie zarejestrowala                                         |
| External reference  | Identyfikator z CVE / bug trackera / CVD (opcjonalny)                          |
| Kind                | `actively_exploited_vulnerability`, `security_incident`, `near_miss`           |
| Severity            | `critical`, `high`, `medium`, `low`                                            |
| Summary             | Opis techniczny (wymagany)                                                     |

Po zapisaniu incydent jest w statusie **Open** i ma obliczone `deadlineAt = discoveredAt + 24h`.

## Dispatcher powiadomien

Dla kazdego incydentu **Open** dostepny jest przycisk **Dispatch notification**. Wysyla on rownolegle:

- **Webhook** (POST JSON) na URL z opcji `polski_cra_incident_webhook`
- **Email** z podsumowaniem na adres z opcji `polski_cra_incident_email`

Obie opcje konfigurujesz w **Polski > Settings > CRA incidents**. Po otrzymaniu odpowiedzi 2xx z webhooka lub pomyslnym wyslaniu emaila incydent przechodzi w status **Notified** i zapisuje `notifiedAt`.

:::note
Cron `polski_cra_incident_deadline_check` dziala co godzine i emituje action hook `polski_cra_incident_deadline_approaching` dla incydentow `Open` majacych mniej niz 2h do terminu. Podlacz sie pod ten hook aby wyslac alert Slack / PagerDuty.
:::

## Eksport JSON (ENISA SRP)

Akcja **Export JSON** w liscie zwraca plik `cra-incident-<id>-<timestamp>.json` z naglowkiem `Content-Type: application/json`. Ksztalt odpowiada projektowi schematu ENISA Single Reporting Platform — pola pokrywaja: identyfikacje producenta, komponentu, czasu wykrycia, ocene wagi, kategorie incydentu oraz opis.

Przyklad:

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

## Hooki

```php
// Po zarejestrowaniu incydentu (przed powiadomieniem).
add_action('polski_cra_incident_recorded', function (int $id, $incident): void {
    // wlasna integracja: Jira, PagerDuty, Slack
}, 10, 2);

// Gdy do terminu 24h zostaly mniej niz 2h.
add_action('polski_cra_incident_deadline_approaching', function ($incident): void {
    // eskalacja do DPO
});
```

## Migracja 2.1.0

Wersja 2.1.0 zaklada tabele `{$wpdb->prefix}polski_cra_incidents`. Migracja uruchamia sie automatycznie przy aktywacji — jesli nie dziala, wymus recznie:

```bash
wp polski migrate --module=cra
```

## Uprawnienia

- UI i akcje: `manage_woocommerce`
- Webhook/email: dowolnie konfigurowalne (brak wymogu uprawnien — to kanaly wyjsciowe)

## Ograniczenia

- Modul nie sledzi automatycznie progu 72h / 14 dni (tylko 24h)
- Wykrywanie incydentow jest manualne — nie skanujemy logow
- Webhook nie posiada podpisu HMAC (planowane w PRO)
- Formularz nie wspiera zalacznikow binarnych — dolacz je do zgloszenia w ENISA SRP recznie
