---
title: Automatické žádosti o recenze
description: Modul automatického odesílání e-mailů s žádostí o recenzi po nákupu v Polski for WooCommerce.
---

Modul automaticky odesílá e-mail s žádostí o recenzi zákazníkům po dokončení objednávky. Každý e-mail obsahuje odkazy na recenzování zakoupených produktů.

## Konfigurace

Přejděte do **Polski > Moduly** a zapněte modul **Žádosti o recenze**.

| Nastavení | Popis | Výchozí |
|------------|------|-----------|
| Zpoždění (dny) | Po kolika dnech od dokončení odeslat e-mail | 7 |
| Předmět e-mailu | Titulek zprávy (tokeny: `{first_name}`, `{order_number}`) | Jak hodnotíte svůj nákup? Zanechte recenzi |
| Úvodní text | Uvítací text (token: `{first_name}`) | Dobrý den {first_name}, děkujeme za nedávný nákup... |
| Text tlačítka | CTA u každého produktu | Zanechte recenzi |
| Text odhlášení | Odkaz opt-out v patičce e-mailu | Odhlásit se z žádostí o recenze |

## Jak to funguje

1. Objednávka změní stav na **Dokončeno**
2. Systém naplánuje odeslání e-mailu za X dní (výchozí 7)
3. Cron každý den kontroluje naplánované žádosti
4. E-mail je odeslán se seznamem produktů a tlačítky "Zanechte recenzi"
5. Produkty, které již zákazník recenzoval, jsou vynechány

## Obsah e-mailu

E-mail obsahuje:
- Personalizované přivítání
- Seznam produktů s náhledy obrázků
- CTA tlačítko u každého produktu vedoucí do sekce recenzí
- Odkaz opt-out v patičce

## Opt-out

Zákazník může kliknout na odkaz "Odhlásit se z žádostí o recenze" v e-mailu. Po kliknutí:
- Meta `_polski_review_optout` se nastaví na účtu uživatele
- Žádné budoucí žádosti nebudou odesílány
- Potvrzení ve WooCommerce notices

:::note
Opt-out vyžaduje přihlášení. Hosté (bez účtu) odkaz opt-out nevidí.
:::

## Integrace s Verified Review

Modul žádostí o recenze funguje nezávisle na modulu **Ověřený nákup** (badge). Oba lze zapnout současně:

- **Žádosti o recenze** - odesílá e-maily vybízející k recenzi
- **Ověřený nákup** - přidává badge "Ověřený nákup" k recenzím osob, které produkt koupily

## Předcházení duplicitám

Systém kontroluje, zda zákazník již zanechal recenzi daného produktu. Pokud ano - produkt se v e-mailu neobjeví. Pokud byly všechny produkty již recenzovány - e-mail se neodesílá.
