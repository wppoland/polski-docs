---
title: Automatické žiadosti o recenzie
description: Modul automatického zasielania e-mailov so žiadosťou o recenzie po nákupe v Polski for WooCommerce.
---

Modul automaticky posiela e-mail so žiadosťou o recenzie zákazníkom po vybavení objednávky. Každý e-mail obsahuje odkazy na recenziu zakúpených produktov.

## Konfigurácia

Prejdite do **Polski > Moduly** a zapnite modul **Žiadosti o recenzie**.

| Nastavenie | Popis | Predvolene |
|------------|------|-----------|
| Oneskorenie (dni) | Po koľkých dňoch od vybavenia poslať e-mail | 7 |
| Predmet e-mailu | Titulok správy (tokeny: `{first_name}`, `{order_number}`) | Ako hodnotíte svoj nákup? Zanechajte recenziu |
| Úvodný text | Privítací text (token: `{first_name}`) | Ahoj {first_name}, ďakujeme za nedávny nákup... |
| Text tlačidla | CTA pri každom produkte | Zanechať recenziu |
| Text odhlásenia | Odhlasovací odkaz (opt-out) na konci e-mailu | Odhlásiť sa zo žiadostí o recenzie |

## Ako to funguje

1. Objednávka zmení stav na **Dokončené**
2. Systém naplánuje odoslanie e-mailu o X dní (predvolene 7)
3. Cron denne kontroluje naplánované žiadosti
4. E-mail sa odošle so zoznamom produktov a tlačidlami "Zanechať recenziu"
5. Produkty, ktoré zákazník už recenzoval, sa preskakujú

## Obsah e-mailu

E-mail obsahuje:
- Personalizované privítanie
- Zoznam produktov s miniatúrami obrázkov
- CTA tlačidlo pre každý produkt vedúce do sekcie recenzií
- Odhlasovací odkaz (opt-out) na konci

## Odhlásenie (opt-out)

Zákazník môže kliknúť na odkaz "Odhlásiť sa zo žiadostí o recenzie" v e-maile. Po kliknutí:
- Meta `_polski_review_optout` sa nastaví na účte používateľa
- Žiadne budúce žiadosti sa nebudú posielať
- Potvrdenie v notifikáciách WooCommerce

:::note
Odhlásenie vyžaduje prihlásenie. Hostia (bez účtu) odhlasovací odkaz nevidia.
:::

## Integrácia s Verified Review

Modul žiadostí o recenzie funguje nezávisle od modulu **Overený nákup** (badge). Oba možno zapnúť súčasne:

- **Žiadosti o recenzie** - posiela e-maily nabádajúce k recenzii
- **Overený nákup** - pridáva odznak "Overený nákup" k recenziám osôb, ktoré produkt kúpili

## Predchádzanie duplicitám

Systém kontroluje, či zákazník už zanechal recenziu daného produktu. Ak áno - produkt sa v e-maile neobjaví. Ak boli všetky produkty už recenzované - e-mail sa neodošle.
