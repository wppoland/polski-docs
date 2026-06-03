---
title: KI-Produktbeschreibungen
description: Dokumentation des Moduls für KI-Produktbeschreibungen in Polski PRO for WooCommerce - Generierung von SEO-Beschreibungen mit einer OpenAI-kompatiblen API, Integration mit Yoast und RankMath.
---

Das Modul für KI-Produktbeschreibungen ermöglicht die automatische Generierung von WooCommerce-Produktbeschreibungen mit einer beliebigen OpenAI-kompatiblen API. Die Beschreibungen sind für SEO optimiert und an den gewählten Kommunikationston angepasst.

:::note[Anforderungen]
Erforderlich ist ein API-Schlüssel für einen OpenAI-kompatiblen Dienst (z. B. OpenAI, Azure OpenAI, lokales LLM mit chat/completions-Endpunkt).
:::

## So funktioniert es

1. Der Administrator öffnet die Bearbeitung eines WooCommerce-Produkts
2. In der Meta-Box "KI-Beschreibungen" wählt er das Generierungsziel und den Ton
3. Das Plugin sendet den Produktkontext an die API
4. Der generierte Text erscheint zur Vorschau in der Meta-Box
5. Der Administrator akzeptiert oder bearbeitet den Text vor dem Speichern

## Konfiguration

Gehen Sie zu **WooCommerce > Einstellungen > Polski PRO > KI-Beschreibungen**.

Die Einstellungen werden in folgender Option gespeichert:

```
polski_pro_ai_descriptions
```

### API-Einstellungen

| Einstellung | Beschreibung | Standard |
|------------|------|-----------|
| API-Schlüssel | Autorisierungsschlüssel für die API | - |
| API-URL | chat/completions-Endpunkt | `https://api.openai.com/v1/chat/completions` |
| Modell | KI-Modell zur Generierung | `gpt-4o-mini` |
| Max tokens | Maximale Länge der Antwort | 1024 |

### Generierungseinstellungen

| Einstellung | Beschreibung | Standard |
|------------|------|-----------|
| Ton | Kommunikationsstil | professional |
| Sprache | Sprache der generierten Beschreibungen | pl |
| SEO-Schlüsselwörter | Schlüsselwörter in der Beschreibung berücksichtigen | Ja |
| Eigener Prompt | Zusätzliche Anweisungen für das KI-Modell | - |

### Verfügbare Töne

| Ton | Beschreibung |
|-----|------|
| `professional` | Formeller, sachlicher Geschäftsstil |
| `casual` | Freundlicher, konversationeller Stil |
| `persuasive` | Überzeugend, verkaufsorientiert |
| `technical` | Detaillierte, technische Beschreibung der Spezifikationen |
| `luxurious` | Exklusiver, aspirativer Premium-Stil |

## Generierungsziele

Die Meta-Box auf der Produktbearbeitungsseite ermöglicht die Auswahl, welcher Text generiert werden soll:

| Ziel | Beschreibung |
|-----|------|
| Vollständige Beschreibung | Hauptproduktbeschreibung (post_content) |
| Kurzbeschreibung | Produktauszug (post_excerpt) |
| SEO-Titel | Meta-Titel für Suchmaschinen |
| SEO-Meta-Beschreibung | Meta description für Suchmaschinen |

SEO-Titel und -Beschreibungen werden automatisch in den Feldern des entsprechenden SEO-Plugins (Yoast SEO oder RankMath) gespeichert.

## Integration mit SEO-Plugins

Das Modul erkennt das installierte SEO-Plugin und speichert die generierten Daten in den entsprechenden Meta-Feldern:

### Yoast SEO

- SEO-Titel wird in `_yoast_wpseo_title` gespeichert
- SEO-Meta-Beschreibung wird in `_yoast_wpseo_metadesc` gespeichert

### RankMath

- SEO-Titel wird in `rank_math_title` gespeichert
- SEO-Meta-Beschreibung wird in `rank_math_description` gespeichert

Ist kein SEO-Plugin aktiv, sind die Optionen zur Generierung von SEO-Titel und Meta-Beschreibung nicht verfügbar.

## Produktkontext

Bei jeder Generierungsanforderung sendet das Plugin folgende Produktdaten an die API:

- **Produktname** - Titel des Produkts
- **SKU** - Katalognummer
- **Preis** - regulärer und Aktionspreis
- **Kategorien** - Liste der Produktkategorien
- **Attribute** - alle Attribute und ihre Werte
- **Vorhandene Beschreibungen** - aktuelle vollständige und Kurzbeschreibung (falls vorhanden)

Diese Daten ermöglichen es dem KI-Modell, eine treffende und kontextuell korrekte Beschreibung zu generieren.

## Massengenerierung

Das Modul unterstützt die Generierung von Beschreibungen für mehrere Produkte gleichzeitig:

1. Gehen Sie zu **Produkte > Alle Produkte**
2. Markieren Sie die Produkte zur Generierung
3. Wählen Sie aus der Liste "Massenaktionen" die Option **KI-Beschreibungen generieren**
4. Wählen Sie Ziel und Ton der Generierung
5. Klicken Sie auf "Anwenden"

Die Massengenerierung erfolgt asynchron über AJAX, jedes Produkt wird einzeln verarbeitet, und ein Fortschrittsbalken zeigt den Status der Operation an. So lässt sich eine Überschreitung des Server-Timeouts bei vielen Produkten vermeiden.

### Limits

- Jede Anforderung ist ein separater API-Aufruf
- Die Rate-Limiting-Grenzen des API-Dienstes sind zu beachten
- Bei vielen Produkten kann die Generierung mehrere Minuten dauern

## Anwendungsbeispiel

### Generierung einer Beschreibung für ein einzelnes Produkt

1. Öffnen Sie die Produktbearbeitung
2. Scrollen Sie zur Meta-Box **KI-Beschreibungen**
3. Wählen Sie das Ziel: "Vollständige Beschreibung"
4. Wählen Sie den Ton: "persuasive"
5. Klicken Sie auf **Generieren**
6. Prüfen Sie den generierten Text
7. Klicken Sie auf **In die Beschreibung einfügen**, um den Text in den Editor zu übertragen

### Konfiguration eines eigenen Endpunkts

Wenn Sie ein lokales LLM-Modell oder einen anderen Anbieter nutzen:

1. Ändern Sie die **API-URL** auf die Adresse Ihres Endpunkts (muss mit dem OpenAI-Format chat/completions kompatibel sein)
2. Stellen Sie das passende **Modell** ein (von Ihrem Endpunkt erkannter Modellname)
3. Geben Sie den **API-Schlüssel** an (falls von Ihrem Endpunkt erforderlich)

## Aktivierung des Moduls

Das Modul wird über einen Schalter in den PRO-Moduleinstellungen gesteuert:

```
WooCommerce > Einstellungen > Polski PRO > Module > KI-Beschreibungen
```

<div class="disclaimer">Diese Seite dient ausschließlich Informationszwecken und stellt keine Rechtsberatung dar. Polski PRO for WooCommerce ist kommerzielle Software, die ohne Gewährleistung bereitgestellt wird.</div>
