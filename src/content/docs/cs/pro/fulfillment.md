---
title: Vyřízení objednávek a sledování
description: Modul stavů vyřízení objednávek v Polski PRO - stavy Zabaleno/Odesláno/Doručeno, pole sledovacího čísla a automatická e-mailová upozornění.
---

Modul vyřízení objednávek rozšiřuje výchozí stavy WooCommerce o tři dodatečné etapy: **Zabaleno**, **Odesláno** a **Doručeno**. Každá změna stavu odesílá automatický e-mail zákazníkovi s informací o sledování.

:::note[Požadavky]
Polski PRO vyžaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Nové stavy objednávek

Po zapnutí modulu mohou objednávky procházet následujícími stavy:

```
Čekající > Zpracovává se > Zabaleno > Odesláno > Doručeno > Dokončeno
```

| Stav | Barva | Popis |
|--------|-------|------|
| Zabaleno (Packed) | Modrá | Objednávka byla zabalena a čeká na vyzvednutí kurýrem |
| Odesláno (Shipped) | Žlutá | Zásilka předána kurýrovi, v přepravě |
| Doručeno (Delivered) | Zelená | Zásilka doručena zákazníkovi |

Stavy se objevují v panelu objednávek mezi "Zpracovává se" a "Dokončeno".

## Konfigurace

1. Přejděte do **Polski PRO > Moduly**
2. Zapněte modul **Vyřízení objednávek**

Modul nevyžaduje dodatečnou konfiguraci, stavy, pole sledování a e-maily jsou připraveny okamžitě.

## Pole sledování zásilky

V editoru objednávky, pod doručovací adresou, se objeví sekce **Shipment Tracking**:

| Pole | Popis |
|------|------|
| Přepravce | Výběr: InPost, DPD, DHL, Poczta Polska, Jiný |
| Sledovací číslo | Číslo přepravního listu |
| URL sledování | Generována automaticky na základě přepravce a čísla |

Po výběru přepravce a zadání sledovacího čísla je odkaz na tracking generován automaticky. Můžete také zadat vlastní URL ručně.

### Automatické odkazy na sledování

| Přepravce | Formát URL |
|------------|-----------|
| InPost | `inpost.pl/sledzenie-przesylek?number={cislo}` |
| DPD | `tracktrace.dpd.com.pl/findPackage?q={cislo}` |
| DHL | `dhl.com/pl-pl/home/sledzenie-przesylek.html?tracking-id={cislo}` |
| Poczta Polska | `emonitoring.poczta-polska.pl/?numer={cislo}` |

## E-mailová upozornění

Při každé změně stavu systém odesílá zákazníkovi e-mail s:

- Číslem objednávky
- Novým stavem
- Názvem přepravce (pokud nastaven)
- Sledovacím číslem (pokud nastaveno)
- Odkazem na sledování zásilky
- Odkazem na náhled objednávky v Můj účet

E-maily jsou odesílány automaticky, nevyžadují ruční akci.

## Hromadné akce

V seznamu objednávek jsou dostupné hromadné akce:

- **Změnit stav na Zabaleno**
- **Změnit stav na Odesláno**
- **Změnit stav na Doručeno**

Označte více objednávek a vyberte akci z rozbalovacího menu.

## Kompatibilita

Modul funguje s:

- WooCommerce HPOS (Custom Order Tables)
- WooCommerce klasickými objednávkami (posts)
- Všemi motivy WooCommerce
- Kurýrními integracemi Polski PRO (InPost, DPD, DHL)

Stavy jsou viditelné také v REST API WooCommerce a v reportech.
