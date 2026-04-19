---
title: Checkliste - Datenschutzerklaerung und Regulamin
description: Automatischer strukturaler Audit der rechtlichen Seiten des Shops. Prueft Elemente, die gemaess DSGVO Art. 13, dem polnischen Gesetz ueber die Erbringung elektronischer Dienstleistungen (UŚUDE), dem Verbraucherrechtegesetz und den Cookie-Einwilligungsregeln erforderlich sind.
---

Das Modul **Compliance-Checkliste** scannt zwei wichtige rechtliche Seiten des Shops (Datenschutzerklaerung und Regulamin, die polnische Entsprechung der AGB) sowie das Cookie-Banner und meldet, ob die gesetzlich geforderten Elemente vorhanden sind. Es handelt sich um eine strukturale Heuristik, nicht um eine Rechtsberatung. Sie hilft jedoch, fehlende Abschnitte schnell zu lokalisieren.

:::caution
Die Pruefung basiert auf Schluesselwort-Erkennung. Ein Ergebnis "OK" garantiert keine rechtliche Konformitaet. Eine Rechtsberatung bleibt erforderlich.
:::

## Funktionsweise

1. Das Plugin liest den Inhalt der Seite, die als Datenschutzerklaerung oder Regulamin konfiguriert ist (Optionen `polski_privacy_page_id`, `polski_terms_page_id`).
2. Der Inhalt wird normalisiert: HTML entfernt, Gross-/Kleinschreibung vereinheitlicht, polnische diakritische Zeichen in ASCII umgewandelt (a/c/e/l/n/o/s/z).
3. Die Engine durchlaeuft ein Regelwerk (17 Regeln fuer die Datenschutzerklaerung, 15 fuer den Regulamin) und sucht nach Schluesselwortmustern. Eine Regel besteht, wenn mindestens ein Muster im Inhalt vorkommt.
4. Das Ergebnis wird als Liste mit **OK / Missing** Markierungen, Schweregrad (Required / Recommended / Optional) und einem Hinweis praesentiert.

## Konfiguration

Gehen Sie zu **Polski > Compliance-Checkliste**. Wenn Ihre rechtlichen Seiten noch nicht zugewiesen sind, konfigurieren Sie diese zuerst unter **Polski > Rechtliche Seiten**.

Das Modul ist standardmaessig aktiviert. Deaktivierung: **Polski > Module** und Haken bei "Compliance checklist" entfernen.

## Umfang der Pruefungen

### Datenschutzerklaerung (DSGVO Art. 13) - 17 Regeln

Erforderlich:
- Identitaet des Verantwortlichen
- Kontaktkanal (E-Mail oder Formular)
- Zwecke der Verarbeitung
- Rechtsgrundlage (Art. 6 Abs. 1 DSGVO)
- Speicherdauer
- Empfaenger der Daten / Auftragsverarbeiter
- Betroffenenrechte: Auskunft, Berichtigung, Loeschung, Einschraenkung, Uebertragbarkeit, Widerspruch
- Recht auf Widerruf der Einwilligung
- Beschwerde beim Praesidenten der UODO (polnische Datenschutzbehoerde)

Empfohlen:
- Automatisierte Entscheidungsfindung / Profiling
- Uebermittlung ausserhalb des EWR

Optional:
- Kontakt zum Datenschutzbeauftragten (falls bestellt)

### Cookie-Banner (aktive Einwilligung) - 9 Regeln

Erforderlich:
- Vorhandensein des Banners (cookies / ciasteczka im HTML)
- Schaltflaeche "Akzeptieren"
- Schaltflaeche "Ablehnen" mit gleichwertiger Sichtbarkeit
- Kategorie-Einstellungen / Praeferenzen
- Link zur Datenschutzerklaerung

Empfohlen:
- Benannte Kategorie "Analytik"
- Benannte Kategorie "Marketing / Werbung"
- Hinweis auf das Recht zum Widerruf der Einwilligung

Invertierte Regel (Vorkommen = FAIL):
- "Durch Klick auf einen beliebigen Link akzeptieren Sie" / "Durch weitere Nutzung stimmen Sie zu" - Formulierungen, die eine **konkludente Einwilligung** nahelegen und mit der aktiven Einwilligung nach DSGVO und ePrivacy nicht vereinbar sind.

Gescannt wird `home_url('/')`, das Ergebnis wird fuer 1 Stunde in einem Transient zwischengespeichert. Banner, die nur per JavaScript gerendert werden, koennen fuer den Scan unsichtbar sein. Dieser Abschnitt ist eine Heuristik, kein Urteil. Der Scanner markiert zusaetzlich Push-Benachrichtigungs-Prompts, die ohne vorgeschaltetes Einwilligungs-Banner ausgeloest werden.

### Regulamin (Gesetz ueber die Erbringung elektronischer Dienstleistungen + Verbraucherrechtegesetz) - 15 Regeln

Erforderlich:
- Identifikation des Diensteanbieters (Name, NIP / polnische Steuer-ID, REGON / Statistiknummer)
- Adresse + Kontakt-E-Mail
- Art und Umfang der Leistungen
- Technische Anforderungen
- Bestellablauf
- Zahlungsmethoden
- Versandarten und -zeiten
- Widerrufsrecht (14 Tage)
- Widerrufsformular
- Reklamationsverfahren
- Verweis auf die Datenschutzerklaerung / DSGVO
- Verfahren zur Aenderung des Regulamins
- Anwendbares Recht

Empfohlen:
- ODR-Plattform (ec.europa.eu)
- Inkrafttreten

## Ergebnis und Bewertung

Punktzahl 0-100%:
- Required: Gewichtung 3
- Recommended: Gewichtung 2
- Optional: Gewichtung 1

Erreichte Punkte / Maximum * 100. Alle Required-Regeln muessen OK sein, bevor der Shop eine solide Ausgangsposition hat.

Farbe der Punktzahl:
- gruen >= 90%
- gelb 70-89%
- rot < 70%

## REST API

```
GET /wp-json/polski/v1/compliance/page/privacy
GET /wp-json/polski/v1/compliance/page/terms
GET /wp-json/polski/v1/compliance/cookie-banner
GET /wp-json/polski/v1/compliance/cookie-banner?url=https://example.com/
```

Gibt den Report als JSON zurueck:

```json
{
  "page_type": "privacy",
  "page_id": 42,
  "content_length": 8421,
  "score": 94,
  "has_missing_required": false,
  "results": [
    {
      "id": "controller_identity",
      "label": "Controller identity and contact",
      "severity": "required",
      "passed": true,
      "hint": ""
    }
  ]
}
```

Zugriff: `manage_woocommerce` Capability.

## Matching-Regeln

Jede Regel hat eine Liste von Mustern (polnisch + englisch). Muster sind vornormalisiert (Kleinschreibung, keine Diakritika). Beispiele:

- `"administratorem danych osobowych"` - formelle polnische Formulierung
- `"administrator danych"` - Kurzform
- `"data controller"` - englische Variante

Eine Regel besteht, wenn **irgendein** Muster im Inhalt vorkommt. Ein neues Muster hinzuzufuegen ist eine einzeilige Aenderung in `PrivacyPolicyRules::all()` / `RegulaminRules::all()` - Pull Requests willkommen.

## Barrierefreiheit (WCAG-Heuristiken)

Der Cookie-Banner-Scan markiert zusaetzlich haeufige WCAG 2.1 Regressionen:

- Ablehnen-Schaltflaeche ausgeblendet, als reiner Text gestaltet oder ausserhalb des sichtbaren Viewports
- Banner blockiert den Tastatur-Fokus ohne Fluchtweg
- Kontrast unter 4.5:1 bei Akzeptieren-/Ablehnen-Schaltflaechen (Heuristik basierend auf Inline-Styles)

Dies sind Ausgangspunkte fuer einen manuellen WCAG-Audit. Ein vollstaendiger Barrierefreiheits-Audit erfordert Tests mit assistiver Technologie.

## Grenzen

- Schluesselwort-Heuristik - eine Regel kann auch dann bestehen, wenn der Absatz lapidar ist
- Keine semantische Analyse (prueft nicht, ob tatsaechlich eine Speicherfrist beschrieben ist, sondern nur, ob das Wort vorkommt)
- Prueft nicht die Cookie-Richtlinie, Ruecksendungs- oder Gewaehrleistungsseiten (separate Module geplant)
- Bewertet nicht, ob tatsaechlich ein Datenschutzbeauftragter bestellt wurde, sondern nur, ob die Erwaehnung vorhanden ist
