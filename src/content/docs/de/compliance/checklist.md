---
title: Compliance-Checkliste für Datenschutzerklärung und AGB
description: Automatisches strukturelles Audit der rechtlichen Shop-Seiten - Prüfung der von DSGVO Art. 13 und dem Gesetz über die Erbringung elektronischer Dienstleistungen geforderten Elemente.
---

Das Modul **Compliance-Checkliste** scannt zwei zentrale rechtliche Shop-Seiten (Datenschutzerklärung und AGB) und meldet, ob sie die gesetzlich geforderten Elemente enthalten. Das ist eine strukturelle Heuristik, keine Rechtsberatung - aber sie hilft, fehlende Absätze schnell zu lokalisieren.

:::caution
Die Prüfung basiert auf der Erkennung von Schlüsselwörtern. Ein Ergebnis "OK" garantiert keine rechtliche Konformität - die Konsultation eines Anwalts bleibt notwendig.
:::

## So funktioniert es

1. Das Plugin liest den Inhalt der als Datenschutzerklärung oder AGB festgelegten Seite (Optionen `polski_privacy_page_id`, `polski_terms_page_id`).
2. Der Inhalt wird normalisiert: HTML entfernt, Groß-/Kleinschreibung vereinheitlicht, polnische diakritische Zeichen in ASCII umgewandelt (a/c/e/l/n/o/s/z).
3. Die Engine durchläuft einen Satz von Regeln (17 für die Datenschutzerklärung, 15 für die AGB) und sucht nach Schlüsselwortmustern. Eine Regel gilt als erfüllt, wenn im Inhalt eines der Muster gefunden wird.
4. Das Ergebnis wird als Liste mit der Markierung **OK / Missing**, dem Wichtigkeitsgrad (Required / Recommended / Optional) sowie einem Hinweis, was hinzuzufügen ist, dargestellt.

## Konfiguration

Gehe zu **Polski > Compliance-Checkliste**. Wenn du noch keine rechtlichen Seiten festgelegt hast, lege sie zuvor unter **Polski > Rechtliche Seiten** fest.

Das Modul ist standardmäßig aktiviert. Deaktivierung: **Polski > Module** -> "Compliance checklist" abwählen.

## Umfang der Prüfungen

### Datenschutzerklärung (DSGVO Art. 13) - 17 Regeln

Erforderlich:
- Identifikation des Verantwortlichen für die Datenverarbeitung
- Kontaktkanal (E-Mail oder Formular)
- Verarbeitungszwecke
- Rechtsgrundlage (Art. 6 Abs. 1 DSGVO)
- Speicherdauer
- Empfänger der Daten / Auftragsverarbeiter
- Rechte der Person: Auskunft, Berichtigung, Löschung, Einschränkung, Übertragbarkeit, Widerspruch
- Recht auf Widerruf der Einwilligung
- Beschwerde bei der Aufsichtsbehörde (UODO)

Empfohlen:
- Automatisierte Entscheidungsfindung / Profiling
- Übermittlung außerhalb des EWR

Optional:
- Kontakt zum Datenschutzbeauftragten (falls bestellt)

### Cookie-Banner (active consent) - 10 Regeln

Erforderlich:
- Vorhandensein des Banners (cookies / ciasteczka im HTML)
- Akzeptieren-Button
- Ablehnen-Button mit gleichwertiger Sichtbarkeit
- Einstellungen / Präferenzen der Kategorien
- Link zur Datenschutzerklärung

Empfohlen:
- Benannte Kategorie Analytik
- Benannte Kategorie Marketing / Werbung
- Hinweis auf die Möglichkeit, die Einwilligung zu widerrufen

Invertierte Regeln (Vorhandensein = FAIL):
- "Klikajac dowolny link akceptujesz" / "By continuing to use the site you agree" - Formulierungen, die **implied consent** suggerieren und mit aktiver Einwilligung unvereinbar sind.
- Erkennung von Auto-Push-Prompts: `Notification.requestPermission`, `PushManager.subscribe`, `ServiceWorker.register` sowie Signaturen der am häufigsten genutzten Drittanbieter-Push-SDKs. Das Auslösen dieser Aufrufe ohne vorherige Nutzerinteraktion ist ein Deceptive Pattern (EDPB 03/2022) - Browser und Aufsichtsbehörden behandeln dies als Verstoß.

Gescannt wird `home_url('/')`, das Ergebnis wird 1 h lang im Transient gecacht. Ein Banner, das nur per JS gerendert wird, ist im Scan möglicherweise nicht sichtbar - dieser Bereich ist eine Heuristik, kein Urteil.

### Accessibility (WCAG-Heuristiken) - 9 Regeln

Scan des statischen HTML der Startseite auf typische WCAG-2.1-AA-Regressionen:

Erforderlich:
- `<html lang="...">` vorhanden (WCAG 3.1.1)
- Link "zum Inhalt springen" / Skip-Link (WCAG 2.4.1)
- Einzelnes `<h1>` (WCAG 1.3.1, 2.4.6)
- `<meta name="viewport">` (WCAG 1.4.10 Reflow)
- `<main>` oder `role="main"` (WCAG 1.3.1)
- Bilder mit `alt`-Attribut (WCAG 1.1.1)

Empfohlen:
- `role="search"` auf dem Suchformular
- Kein globales `outline:none` (WCAG 2.4.7) - invertierte Regel
- Kein `autoplay` mit Ton (WCAG 1.4.2) - invertierte Regel

Das ist eine statische Heuristik. Für ein vollständiges Audit nutze axe-core oder Lighthouse im Browser.

### AGB (Gesetz über die Erbringung elektronischer Dienstleistungen + Verbraucherrechtegesetz) - 15 Regeln

Erforderlich:
- Identifikation des Diensteanbieters (Name, NIP, REGON)
- Adresse + Kontakt-E-Mail
- Art und Umfang der Dienstleistungen
- Technische Anforderungen
- Art der Bestellaufgabe
- Zahlungsmethoden
- Liefermethoden und -zeiten
- Widerrufsrecht (14 Tage)
- Widerrufsformular
- Reklamationsverfahren
- Verweis auf die Datenschutzerklärung / DSGVO
- Verfahren zur Änderung der AGB
- Anwendbares Recht

Empfohlen:
- ODR-Plattform (ec.europa.eu)
- Datum des Inkrafttretens

## Ergebnis und Punktzahl

Score 0-100%:
- Required: Gewicht 3
- Recommended: Gewicht 2
- Optional: Gewicht 1

Erreichte Punkte / Maximum * 100. Alle Required-Regeln müssen auf OK sein, damit der Shop eine solide Ausgangsposition hat.

Farbe der Punktzahl:
- grün >= 90%
- gelb 70-89%
- rot < 70%

## REST API

```
GET /wp-json/polski/v1/compliance/page/privacy
GET /wp-json/polski/v1/compliance/page/terms
GET /wp-json/polski/v1/compliance/cookie-banner
GET /wp-json/polski/v1/compliance/cookie-banner?url=https://example.com/
GET /wp-json/polski/v1/compliance/accessibility
GET /wp-json/polski/v1/compliance/accessibility?url=https://example.com/
```

Gibt den Bericht als JSON zurück:

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

Zugriff: Berechtigung `manage_woocommerce`.

## Regeln für den Abgleich

Jede Regel hat eine Liste von Mustern (Polish + English). Die Muster sind bereits normalisiert (Kleinschreibung, ohne Diakritika). Beispiele:

- `"administratorem danych osobowych"` - formale Schreibweise
- `"administrator danych"` - verkürzt
- `"data controller"` - englische Version

Eine Regel gilt als erfüllt, wenn **irgendein** Muster im Inhalt vorkommt. Das Hinzufügen eines neuen Musters ist eine Änderung von `PrivacyPolicyRules::all()` / `RegulaminRules::all()` - ein PR ist willkommen.

## Einschränkungen

- Schlüsselwort-Heuristik; eine Regel kann auch dann erfüllt sein, wenn der Absatz knapp gehalten ist
- Keine semantische Analyse (z. B. ob die Speicherdauer tatsächlich beschrieben wird und nicht nur das Wort "przechowywania" vorkommt)
- Prüft nicht die Cookie-Richtlinie, die Seiten Rückgabe/Reklamation (separate Module geplant)
- Bewertet nicht, ob ein Datenschutzbeauftragter bestellt wurde - nur das Vorhandensein einer Erwähnung
