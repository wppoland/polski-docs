---
title: Kontrolný zoznam zhody Zásad ochrany osobných údajov a Obchodných podmienok
description: Automatický štruktúrny audit právnych stránok obchodu - kontrola prvkov vyžadovaných GDPR čl. 13 a poľským zákonom o poskytovaní služieb elektronickou cestou.
---

Modul **Kontrolný zoznam zhody** skenuje dve kľúčové právne stránky obchodu (Zásady ochrany osobných údajov a Obchodné podmienky) a hlási, či obsahujú prvky vyžadované právom. Je to štruktúrna heuristika, nie právne poradenstvo - ale pomáha rýchlo lokalizovať chýbajúce odseky.

:::caution
Kontrola je založená na detekcii kľúčových slov. Výsledok "OK" nezaručuje právnu zhodu - konzultácia s právnikom zostáva nevyhnutná.
:::

## Ako to funguje

1. Doplnok číta obsah stránky nastavenej ako Zásady ochrany osobných údajov alebo Obchodné podmienky (možnosti `polski_privacy_page_id`, `polski_terms_page_id`).
2. Obsah je normalizovaný: HTML odstránené, veľkosť písmen zjednotená, poľské diakritické znaky nahradené ASCII (a/c/e/l/n/o/s/z).
3. Engine prechádza sadu pravidiel (17 pre Zásady, 15 pre Obchodné podmienky) a hľadá vzory kľúčových slov. Pravidlo prejde, ak sa v obsahu nájde ktorýkoľvek z vzorov.
4. Výsledok je prezentovaný ako zoznam s označením **OK / Missing**, úrovňou dôležitosti (Required / Recommended / Optional) a nápovedou, čo pridať.

## Konfigurácia

Prejdite do **Polski > Kontrolný zoznam zhody**. Ak ešte nemáte nastavené právne stránky, nastavte ich skôr v **Polski > Právne stránky**.

Modul je predvolene zapnutý. Vypnutie: **Polski > Moduly** -> zrušte označenie "Compliance checklist".

## Rozsah kontrol

### Zásady ochrany osobných údajov (GDPR čl. 13) - 17 pravidiel

Vyžadované:
- Identifikácia Prevádzkovateľa údajov
- Kontaktný kanál (e-mail alebo formulár)
- Účely spracúvania
- Právny základ (čl. 6 ods. 1 GDPR)
- Doba uchovávania
- Príjemcovia údajov / sprostredkovatelia
- Práva osoby: prístup, oprava, výmaz, obmedzenie, prenosnosť, námietka
- Právo odvolať súhlas
- Sťažnosť na dozorný úrad

Odporúčané:
- Automatizované rozhodovanie / profilovanie
- Prenos mimo EHP

Voliteľné:
- Kontakt na zodpovednú osobu (DPO) (ak je ustanovená)

### Cookie banner (active consent) - 10 pravidiel

Vyžadované:
- Prítomnosť banneru (cookies / súbory cookie v HTML)
- Tlačidlo Akceptujem
- Tlačidlo Odmietnuť s rovnocennou viditeľnosťou
- Nastavenia / preferencie kategórií
- Odkaz na Zásady ochrany osobných údajov

Odporúčané:
- Pomenovaná kategória Analytika
- Pomenovaná kategória Marketing / reklama
- Zmienka o možnosti odvolať súhlas

Invertované pravidlá (prítomnosť = FAIL):
- "Kliknutím na ktorýkoľvek odkaz akceptujete" / "By continuing to use the site you agree" - frázy naznačujúce **implied consent**, nezlučiteľné s aktívnym súhlasom.
- Detekcia auto-promptu push: `Notification.requestPermission`, `PushManager.subscribe`, `ServiceWorker.register` a signatúry najčastejšie používaných third-party push SDK. Spustenie týchto bez predchádzajúcej interakcie používateľa je deceptive pattern (EDPB 03/2022) - prehliadače a dozorné orgány to považujú za porušenie.

Skenuje sa `home_url('/')`, výsledok cachovaný v transiente na 1h. Banner renderovaný len cez JS nemusí byť viditeľný v skene - táto časť je heuristika, nie verdikt.

### Accessibility (WCAG heuristics) - 9 pravidiel

Sken statického HTML hlavnej stránky z hľadiska typických regresií WCAG 2.1 AA:

Vyžadované:
- `<html lang="...">` prítomné (WCAG 3.1.1)
- Odkaz "preskočiť na obsah" / skip-link (WCAG 2.4.1)
- Jediný `<h1>` (WCAG 1.3.1, 2.4.6)
- `<meta name="viewport">` (WCAG 1.4.10 Reflow)
- `<main>` alebo `role="main"` (WCAG 1.3.1)
- Obrázky s atribútom `alt` (WCAG 1.1.1)

Odporúčané:
- `role="search"` na vyhľadávacom formulári
- Žiadny globálny `outline:none` (WCAG 2.4.7) - invertované pravidlo
- Žiadny `autoplay` so zvukom (WCAG 1.4.2) - invertované pravidlo

Toto je statická heuristika. Pre úplný audit použite axe-core alebo Lighthouse v prehliadači.

### Obchodné podmienky (Zákon o poskytovaní služieb + Zákon o právach spotrebiteľa) - 15 pravidiel

Vyžadované:
- Identifikácia Poskytovateľa služieb (názov, NIP, REGON)
- Adresa + kontaktný e-mail
- Druh a rozsah služieb
- Technické požiadavky
- Spôsob vytvorenia objednávky
- Platobné metódy
- Spôsoby dodania a časy
- Právo na odstúpenie od zmluvy (14 dní)
- Formulár na odstúpenie
- Reklamačné konanie
- Odkaz na Zásady ochrany osobných údajov / GDPR
- Spôsob zmeny Obchodných podmienok
- Rozhodné právo

Odporúčané:
- Platforma ODR (ec.europa.eu)
- Dátum nadobudnutia účinnosti

## Výsledok a hodnotenie

Skóre 0-100%:
- Required: váha 3
- Recommended: váha 2
- Optional: váha 1

Získané body / maximum * 100. Všetky pravidlá Required musia byť na OK, aby mal obchod solídnu východiskovú pozíciu.

Farba hodnotenia:
- zelená >= 90%
- žltá 70-89%
- červená < 70%

## REST API

```
GET /wp-json/polski/v1/compliance/page/privacy
GET /wp-json/polski/v1/compliance/page/terms
GET /wp-json/polski/v1/compliance/cookie-banner
GET /wp-json/polski/v1/compliance/cookie-banner?url=https://example.com/
GET /wp-json/polski/v1/compliance/accessibility
GET /wp-json/polski/v1/compliance/accessibility?url=https://example.com/
```

Vracia report ako JSON:

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

Prístup: capability `manage_woocommerce`.

## Pravidlá zhody

Každé pravidlo má zoznam vzorov (poľské + anglické). Vzory sú už normalizované (malé písmená, bez diakritiky). Príklady:

- `"administratorem danych osobowych"` - formálny zápis
- `"administrator danych"` - skrátený
- `"data controller"` - anglická verzia

Pravidlo prejde, ak sa v obsahu vyskytuje **ktorýkoľvek** vzor. Pridanie nového vzoru je úprava `PrivacyPolicyRules::all()` / `RegulaminRules::all()` - PR vítaný.

## Obmedzenia

- Heuristika kľúčových slov; pravidlo môže prejsť aj keď je odsek strohý
- Žiadna sémantická analýza (napr. či je skutočne popísaná doba retencie, a nie len slovo "uchovávanie")
- Nekontroluje Zásady cookies, stránky Vrátenie/Reklamácia (plánované samostatné moduly)
- Neposudzuje, či bola ustanovená zodpovedná osoba (DPO) - len prítomnosť zmienky
