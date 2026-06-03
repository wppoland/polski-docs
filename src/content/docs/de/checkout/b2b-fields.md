---
title: B2B-Felder im Checkout
description: 'Optionaler Umschalter "Ich kaufe als Unternehmen" sowie die Felder NIP, REGON und IBAN im WooCommerce-Checkout. NIP-Validierung per Prüfsummenalgorithmus, Speicherung in den von KSeF und dem Rechnungsmodul genutzten Standard-Bestellmetadaten.'
---

Polski 1.13.0 fügt dem WooCommerce-Checkout einen optionalen Satz von B2B-Feldern hinzu: den Umschalter "Ich kaufe als Unternehmen" sowie die Felder NIP, REGON und IBAN. Die Felder erscheinen im klassischen WooCommerce-Checkout (Filter `woocommerce_billing_fields`), werden in den Standard-Bestellmetadaten gespeichert und vom KSeF-Modul sowie der Rechnungsstellung in PRO ohne zusätzliche Konfiguration ausgelesen.

## Umschalter "Ich kaufe als Unternehmen"

Die Checkbox `polski_buying_as_company` am Anfang des Billing-Bereichs. Standardmäßig nicht angehakt - die Felder NIP, REGON und IBAN sind verborgen, bis sie angehakt wird. Der Zustand wird im Bestellmeta `_polski_buying_as_company` gespeichert (`yes` / `no`).

Die Logik zum Ein- und Ausblenden wird per Inline-JavaScript umgesetzt - sie benötigt keinen Build-Prozess und keine zusätzlichen Frontend-Abhängigkeiten. Das Skript verarbeitet auch das jQuery-Ereignis `updated_checkout`, sodass es auch nach dem asynchronen Neuladen eines Checkout-Fragments funktioniert.

## NIP

Das Feld `billing_nip` mit Validierung per Prüfsummenalgorithmus des polnischen NIP (10 Ziffern, Gewichte 6, 5, 7, 2, 3, 4, 5, 6, 7, modulo 11). Zulässige Eingabeformate: `1234567890`, `123-456-78-90`, `123 456 78 90` sowie mit Präfix `PL1234567890` (Präfix wird vor der Validierung entfernt). Der Wert wird in normalisierter Form (10 Ziffern) im Meta `_billing_nip` gespeichert.

Die Validierung in PHP nutzt die neue statische Klasse `Polski\Util\NipValidator`:

```php
use Polski\Util\NipValidator;

NipValidator::isValid('5260250274');           // true
NipValidator::isValid('PL 526-025-02-74');     // true
NipValidator::normalize('PL 526-025-02-74');   // '5260250274'
NipValidator::format('5260250274');            // '526-025-02-74'
```

Wenn das Modul `Polski\Pro\Validation\NipValidator` aus polski-pro aktiv ist, überspringt FREE die eigene Registrierung des NIP-Felds, um das Feld im Checkout nicht zu duplizieren. REGON und IBAN werden immer von FREE hinzugefügt.

## REGON

Optionales Feld `billing_regon` (standardmäßig deaktiviert). Akzeptiert 9 oder 14 Ziffern (kurzer REGON / langer REGON). Regex-Validierung: `/^\d{9}$|^\d{14}$/`. Wird im Bestellmeta `_billing_regon` gespeichert.

## IBAN

Optionales Feld `billing_iban` (standardmäßig deaktiviert). Strukturelle Validierung: 2 Buchstaben Länderpräfix + 2 Prüfziffern + 11-30 alphanumerische Zeichen, Gesamtlänge 15-34. Eine strikte mod-97-Prüfung wird bewusst den Integratoren überlassen (z. B. einem Plugin für das Zahlungsgateway). Wird im Meta `_billing_iban` gespeichert.

## Einstellungen (`polski_b2b`)

| Schlüssel | Standardwert | Beschreibung |
|---|---|---|
| `enabled` | `true` | Hauptschalter des Moduls |
| `show_company_toggle` | `true` | Ob die Checkbox "Ich kaufe als Unternehmen" angezeigt wird |
| `nip` | `true` | Ob das NIP-Feld hinzugefügt wird (übersprungen, wenn polski-pro NipValidator aktiv ist) |
| `regon` | `false` | Ob das REGON-Feld hinzugefügt wird |
| `iban` | `false` | Ob das IBAN-Feld hinzugefügt wird |

Aktivierung von REGON und IBAN per `update_option`:

```php
update_option('polski_b2b', array_merge(
    (array) get_option('polski_b2b', []),
    ['regon' => true, 'iban' => true]
));
```

## Integration mit anderen Modulen

- **KSeF-Modul (FREE)** liest `_billing_nip` aus der Bestellung und erkennt automatisch Bestellungen, die eine elektronische Rechnung benötigen.
- **Rechnungsmodul (PRO)** liest `_billing_nip` als `nipBuyer` bei der Erstellung der Umsatzsteuerrechnung und der Korrekturrechnung.
- **AI-Feed für Rechnungen (PRO)** stellt Rechnungen als Markdown bereit, inklusive der NIP-Felder im Bereich "Parties".

## Anzeige im Admin-Panel

Die Felder NIP / REGON / IBAN werden dem Block "Billing details" in der Bestellansicht im Panel hinzugefügt (`woocommerce_admin_billing_fields`). Du bearbeitest sie an derselben Stelle wie die Rechnungsadresse des Kunden.

## Kompatibilität mit dem Block-Checkout

Seit Polski 1.14.0 werden die Felder NIP / REGON / IBAN über die WooCommerce-API `woocommerce_register_additional_checkout_field` (WC 8.6+) registriert. Eine einzige Registrierung deckt sowohl den **klassischen Checkout** als auch den **Block-Checkout (Cart & Checkout Blocks)** ab. Die Validierung funktioniert auf beiden Seiten.

Die über diese API gespeicherten Werte landen standardmäßig unter den Meta-Schlüsseln `_wc_billing/polski/nip`, `_wc_billing/polski/regon`, `_wc_billing/polski/iban`. Polski kopiert sie automatisch in die **älteren** Schlüssel `_billing_nip`, `_billing_regon`, `_billing_iban` (Aktion `woocommerce_set_additional_field_value`), wodurch die Module KSeF und Rechnungen in PRO die Daten ohne jegliche Änderung auslesen.

Shops mit WooCommerce älter als 8.6 nutzen weiterhin den klassischen Registrierungsweg der Felder (`woocommerce_billing_fields`) mit dem Umschalter "Ich kaufe als Unternehmen" und Inline-JavaScript.
