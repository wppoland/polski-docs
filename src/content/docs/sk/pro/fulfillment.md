---
title: Realizácia objednávok a sledovanie
description: Modul stavov realizácie objednávok v Polski PRO - stavy Zabalené/Odoslané/Doručené, pole čísla sledovania a automatické e-mailové notifikácie.
---

Modul realizácie objednávok rozširuje predvolené stavy WooCommerce o tri ďalšie etapy: **Zabalené**, **Odoslané** a **Doručené**. Každá zmena stavu odošle automatický e-mail zákazníkovi s informáciou o sledovaní.

:::note[Požiadavky]
Polski PRO vyžaduje: Polski (free) v1.3.0+, WordPress 6.4+, WooCommerce 8.0+, PHP 8.1+.
:::

## Nové stavy objednávok

Po zapnutí modulu môžu objednávky prechádzať nasledujúcimi stavmi:

```
Čakajúce > Spracúvané > Zabalené > Odoslané > Doručené > Dokončené
```

| Stav | Farba | Popis |
|--------|-------|------|
| Zabalené (Packed) | Modrá | Objednávka bola zabalená a čaká na vyzdvihnutie kuriérom |
| Odoslané (Shipped) | Žltá | Zásielka odovzdaná kuriérovi, v preprave |
| Doručené (Delivered) | Zelená | Zásielka doručená zákazníkovi |

Stavy sa objavujú v paneli objednávok medzi "Spracúvané" a "Dokončené".

## Konfigurácia

1. Prejdite do **Polski PRO > Moduly**
2. Zapnite modul **Realizácia objednávok**

Modul nevyžaduje dodatočnú konfiguráciu - stavy, pole sledovania a e-maily sú pripravené hneď.

## Pole sledovania zásielky

V editore objednávky, pod dodacou adresou, sa objaví sekcia **Shipment Tracking**:

| Pole | Popis |
|------|------|
| Prepravca | Výber: InPost, DPD, DHL, Poczta Polska, Iný |
| Číslo sledovania | Číslo prepravného listu |
| URL sledovania | Generovaná automaticky na základe prepravcu a čísla |

Po výbere prepravcu a zadaní čísla sledovania sa odkaz na tracking generuje automaticky. Môžete tiež zadať vlastný URL ručne.

### Automatické odkazy na sledovanie

| Prepravca | Formát URL |
|------------|-----------|
| InPost | `inpost.pl/sledzenie-przesylek?number={cislo}` |
| DPD | `tracktrace.dpd.com.pl/findPackage?q={cislo}` |
| DHL | `dhl.com/pl-pl/home/sledzenie-przesylek.html?tracking-id={cislo}` |
| Poczta Polska | `emonitoring.poczta-polska.pl/?numer={cislo}` |

## E-mailové notifikácie

Pri každej zmene stavu systém odošle zákazníkovi e-mail s:

- Číslom objednávky
- Novým stavom
- Názvom prepravcu (ak je nastavený)
- Číslom sledovania (ak je nastavené)
- Odkazom na sledovanie zásielky
- Odkazom na náhľad objednávky v Mojom účte

E-maily sa odosielajú automaticky - nevyžadujú ručnú akciu.

## Hromadné akcie

V zozname objednávok sú dostupné hromadné akcie:

- **Zmeniť stav na Zabalené**
- **Zmeniť stav na Odoslané**
- **Zmeniť stav na Doručené**

Označte viac objednávok a vyberte akciu z rozbaľovacieho menu.

## Kompatibilita

Modul funguje s:

- WooCommerce HPOS (Custom Order Tables)
- WooCommerce klasickými objednávkami (posts)
- Všetkými témami WooCommerce
- Kuriérskymi integráciami Polski PRO (InPost, DPD, DHL)

Stavy sú viditeľné aj v REST API WooCommerce a v reportoch.
