---
title: BDO-Nummer
description: Zeigen Sie Ihre BDO-Registrierungsnummer (Baza Danych o Odpadach) in Polski für WooCommerce mit dem Shortcode [polski_bdo] oder dem Block an.
---

BDO (Baza Danych o Odpadach) ist das polnische Abfallregister. Unternehmen, die Produkte oder Verpackungen auf den polnischen Markt bringen, sind häufig im BDO registriert und geben ihre BDO-Registrierungsnummer auf der Website an, zum Beispiel im Footer, sowie auf Dokumenten.

Polski für WooCommerce bietet einen einfachen Platz, um Ihre BDO-Nummer zu speichern, sowie einen Shortcode und einen Block zur Anzeige. Es wird ausschließlich die von Ihnen angegebene Nummer angezeigt. Das Modul reicht keine BDO-Meldungen ein und entscheidet nicht, ob Ihr Unternehmen registrierungspflichtig ist, das klären Sie mit Ihrer Buchhaltung.

## Modul aktivieren

1. Öffnen Sie **Polski → Module** und suchen Sie unter Recht und Compliance den Eintrag **BDO-Nummer**.
2. Aktivieren Sie das Modul.
3. Geben Sie Ihre **BDO-Nummer** in den Moduleinstellungen ein und speichern Sie.

## Nummer anzeigen

Verwenden Sie entweder:

- den Shortcode `[polski_bdo]`,
- den Block **BDO-Nummer** (suchen Sie im Block-Inserter nach "BDO").

Beide geben Ihre BDO-Nummer mit der Beschriftung "BDO:" aus.

### Shortcode-Attribute

| Attribut | Standard | Beschreibung |
|---|---|---|
| `show_label` | `1` | Auf `0` setzen, um die Beschriftung "BDO:" auszublenden und nur die Nummer anzuzeigen. |
| `label` | leer | Überschreibt den Beschriftungstext. |

Beispiele:

```text
[polski_bdo]
[polski_bdo show_label="0"]
[polski_bdo label="BDO-Nr."]
```

## Im Footer zusammen mit den Firmendaten anzeigen

Wenn Sie das Modul **Unternehmensidentifikation** verwenden, können Sie die BDO-Nummer neben Firmenname, Adresse und NIP anzeigen. Fügen Sie dem Shortcode `show_bdo="1"` hinzu:

```text
[polski_business_info show_bdo="1"]
```

## Hinweise

- Die BDO-Nummer wird einmal gespeichert und überall dort wiederverwendet, wo sie angezeigt wird.
- Ist das Feld leer, geben Shortcode und Block nichts aus.
