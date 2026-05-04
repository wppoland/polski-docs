---
title: B2B-Checkout-Felder
description: Optionaler "Kauf als Unternehmen"-Schalter sowie NIP-, REGON- und IBAN-Felder im WooCommerce-Checkout. Polnische NIP-Pruefsummenvalidierung, gespeichert in Standard-Bestell-Meta, die von KSeF und dem Rechnungsmodul gelesen werden.
---

Polski 1.13.0 ergaenzt den WooCommerce-Checkout um einen optionalen Satz B2B-Felder: einen "Kauf als Unternehmen"-Schalter sowie Felder fuer NIP, REGON und IBAN. Die Felder erscheinen im klassischen WooCommerce-Checkout (Filter `woocommerce_billing_fields`), werden in Standard-Bestell-Metadaten gespeichert und ohne weitere Konfiguration vom KSeF-Modul und vom Pro-Rechnungsmodul gelesen.

## Schalter "Kauf als Unternehmen"

Checkbox `polski_buying_as_company` am Anfang des Billing-Abschnitts. Standardmaessig nicht ausgewaehlt - die Zeilen fuer NIP, REGON und IBAN sind ausgeblendet, bis der Kunde aktiviert. Der Zustand wird in der Bestell-Meta `_polski_buying_as_company` (`yes` / `no`) gespeichert.

Die Anzeige-Logik ist als Inline-JavaScript implementiert - keine Build-Pipeline noetig. Das Skript hoert auch auf das jQuery-Event `updated_checkout`, damit es nach asynchronen Fragment-Aktualisierungen des Checkout-Blocks weiterhin funktioniert.

## NIP

Feld `billing_nip` mit Validierung gegen den polnischen NIP-Pruefsummenalgorithmus (10 Ziffern, Gewichte 6, 5, 7, 2, 3, 4, 5, 6, 7, Modulo 11). Akzeptierte Eingabeformate: `1234567890`, `123-456-78-90`, `123 456 78 90` und `PL1234567890` (Praefix wird vor der Validierung entfernt). Der Wert wird in normalisierter Form (10 Ziffern) unter der Bestell-Meta `_billing_nip` gespeichert.

Die Validierung in PHP nutzt die neue statische Utility-Klasse `Polski\Util\NipValidator`:

```php
use Polski\Util\NipValidator;

NipValidator::isValid('5260250274');           // true
NipValidator::isValid('PL 526-025-02-74');     // true
NipValidator::normalize('PL 526-025-02-74');   // '5260250274'
NipValidator::format('5260250274');            // '526-025-02-74'
```

Wenn `Polski\Pro\Validation\NipValidator` aus polski-pro aktiv ist, ueberspringt FREE die eigene NIP-Registrierung, um doppelte billing_nip-Felder zu vermeiden. REGON und IBAN werden immer von FREE hinzugefuegt.

## REGON

Optionales Feld `billing_regon` (standardmaessig deaktiviert). Akzeptiert 9 oder 14 Ziffern (kurzer / langer REGON). Regex-Pruefung: `/^\d{9}$|^\d{14}$/`. Gespeichert in `_billing_regon`.

## IBAN

Optionales Feld `billing_iban` (standardmaessig deaktiviert). Strukturelle Pruefung: 2-stelliger Laenderpraefix + 2 Pruefziffern + 11-30 alphanumerische Zeichen, Gesamtlaenge 15-34. Strikte Mod-97-Verifikation ist absichtlich Integratoren ueberlassen (z.B. einem Zahlungs-Gateway-Plugin). Gespeichert in `_billing_iban`.

## Einstellungen (`polski_b2b`)

| Schluessel | Standard | Beschreibung |
|---|---|---|
| `enabled` | `true` | Hauptschalter fuer das Modul |
| `show_company_toggle` | `true` | Ob die Checkbox "Kauf als Unternehmen" angezeigt wird |
| `nip` | `true` | Ob das NIP-Feld registriert wird (uebersprungen, wenn polski-pro NipValidator aktiv) |
| `regon` | `false` | Ob das REGON-Feld registriert wird |
| `iban` | `false` | Ob das IBAN-Feld registriert wird |

REGON und IBAN per `update_option` aktivieren:

```php
update_option('polski_b2b', array_merge(
    (array) get_option('polski_b2b', []),
    ['regon' => true, 'iban' => true]
));
```

## Integration mit anderen Modulen

- **KSeF-Modul (FREE)** liest `_billing_nip` aus der Bestellung und erkennt automatisch Bestellungen, die eine E-Rechnung erfordern.
- **Rechnungsmodul (PRO)** liest `_billing_nip` als `nipBuyer` beim Erstellen von Faktura VAT und Korrekturrechnungen.
- **AI Feed fuer Rechnungen (PRO)** liefert Rechnungen als Markdown inklusive NIP-Felder im Block "Parties".

## Anzeige im Admin

NIP, REGON und IBAN werden dem "Billing details"-Block in der Bestelluebersicht hinzugefuegt (`woocommerce_admin_billing_fields`). Sie werden an derselben Stelle bearbeitet wie die Rechnungsadresse des Kunden.

## Kompatibilitaet mit Block-Checkout

In dieser Iteration funktionieren die Felder nur im **klassischen WooCommerce-Checkout**. Block-Checkout-Unterstuetzung (Cart & Checkout Blocks) ist fuer ein Folge-Release geplant - die Felder werden ueber die Store API auf die gleiche Weise registriert wie die bestehenden Legal Checkboxes (`Polski\Block\StoreApi\CheckoutValidation`).
