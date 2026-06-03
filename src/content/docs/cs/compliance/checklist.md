---
title: Kontrolní seznam shody Zásad ochrany osobních údajů a Obchodních podmínek
description: Automatický strukturální audit právních stránek obchodu - kontrola prvků vyžadovaných GDPR čl. 13 a zákonem o poskytování služeb elektronickou cestou.
---

Modul **Kontrolní seznam shody** skenuje dvě klíčové právní stránky obchodu (Zásady ochrany osobních údajů a Obchodní podmínky) a reportuje, zda obsahují prvky vyžadované právem. Jde o strukturální heuristiku, nikoli právní poradenství - ale pomáhá rychle najít chybějící odstavce.

:::caution
Kontrola se opírá o detekci klíčových slov. Výsledek "OK" nezaručuje právní shodu - konzultace s právníkem zůstává nutná.
:::

## Jak to funguje

1. Zásuvný modul čte obsah stránky nastavené jako Zásady ochrany osobních údajů nebo Obchodní podmínky (možnosti `polski_privacy_page_id`, `polski_terms_page_id`).
2. Obsah je normalizován: HTML odstraněno, velikost písmen sjednocena, polská diakritika převedena na ASCII (a/c/e/l/n/o/s/z).
3. Engine projde sadu pravidel (17 pro Zásady, 15 pro Obchodní podmínky) a hledá vzory klíčových slov. Pravidlo projde, pokud se v obsahu najde libovolný ze vzorů.
4. Výsledek je prezentován jako seznam s označením **OK / Missing**, úrovní důležitosti (Required / Recommended / Optional) a nápovědou, co doplnit.

## Konfigurace

Přejděte do **Polski > Kontrolní seznam shody**. Pokud ještě nemáte nastaveny právní stránky, nastavte je nejdříve v **Polski > Právní stránky**.

Modul je ve výchozím stavu zapnutý. Vypnutí: **Polski > Moduly** -> odznačte "Compliance checklist".

## Rozsah kontrol

### Zásady ochrany osobních údajů (GDPR čl. 13) - 17 pravidel

Vyžadováno:
- Identifikace Správce dat
- Kontaktní kanál (e-mail nebo formulář)
- Účely zpracování
- Právní základ (čl. 6 odst. 1 GDPR)
- Doba uchovávání
- Příjemci dat / zpracovatelé
- Práva osoby: přístup, oprava, výmaz, omezení, přenositelnost, námitka
- Právo odvolat souhlas
- Stížnost u předsedy UODO

Doporučeno:
- Automatizované rozhodování / profilování
- Přenos mimo EHP

Volitelné:
- Kontakt na DPO (pokud byl jmenován)

### Cookie banner (active consent) - 10 pravidel

Vyžadováno:
- Přítomnost banneru (cookies / ciasteczka v HTML)
- Tlačítko Akceptuji
- Tlačítko Odmítnout se stejnou viditelností
- Nastavení / preference kategorií
- Odkaz na Zásady ochrany osobních údajů

Doporučeno:
- Pojmenovaná kategorie Analytika
- Pojmenovaná kategorie Marketing / reklama
- Zmínka o možnosti odvolat souhlas

Invertovaná pravidla (přítomnost = FAIL):
- "Kliknutím na libovolný odkaz akceptujete" / "By continuing to use the site you agree" - fráze naznačující **implied consent**, neslučitelný s aktivním souhlasem.
- Detekce auto-promptu push: `Notification.requestPermission`, `PushManager.subscribe`, `ServiceWorker.register` a signatury nejčastěji používaných third-party push SDK. Spuštění těchto bez předchozí interakce uživatele je deceptive pattern (EDPB 03/2022) - prohlížeče a dozorové orgány to považují za porušení.

Skenuje se `home_url('/')`, výsledek se cachuje v transientu na 1 hod. Banner vykreslovaný pouze JavaScriptem nemusí být ve skenu viditelný - tato část je heuristikou, nikoli verdiktem.

### Accessibility (WCAG heuristics) - 9 pravidel

Sken statického HTML domovské stránky z hlediska typických regresí WCAG 2.1 AA:

Vyžadováno:
- `<html lang="...">` přítomné (WCAG 3.1.1)
- Odkaz "přejít na obsah" / skip-link (WCAG 2.4.1)
- Jediný `<h1>` (WCAG 1.3.1, 2.4.6)
- `<meta name="viewport">` (WCAG 1.4.10 Reflow)
- `<main>` nebo `role="main"` (WCAG 1.3.1)
- Obrázky s atributem `alt` (WCAG 1.1.1)

Doporučeno:
- `role="search"` na vyhledávacím formuláři
- Žádný globální `outline:none` (WCAG 2.4.7) - invertované pravidlo
- Žádný `autoplay` se zvukem (WCAG 1.4.2) - invertované pravidlo

Jde o statickou heuristiku. Pro úplný audit použijte axe-core nebo Lighthouse v prohlížeči.

### Obchodní podmínky (Zákon o poskytování služeb + Zákon o právech spotřebitele) - 15 pravidel

Vyžadováno:
- Identifikace Poskytovatele služeb (název, NIP, REGON)
- Adresa + kontaktní e-mail
- Druh a rozsah služeb
- Technické požadavky
- Způsob vytvoření objednávky
- Platební metody
- Způsoby a doby dodání
- Právo na odstoupení od smlouvy (14 dní)
- Formulář pro odstoupení
- Reklamační řízení
- Odkaz na Zásady ochrany osobních údajů / GDPR
- Postup změny Obchodních podmínek
- Rozhodné právo

Doporučeno:
- Platforma ODR (ec.europa.eu)
- Datum nabytí účinnosti

## Výsledek a bodování

Score 0-100%:
- Required: váha 3
- Recommended: váha 2
- Optional: váha 1

Získané body / maximum * 100. Všechna pravidla Required musí být na OK, aby měl obchod solidní výchozí pozici.

Barva bodování:
- zelená >= 90%
- žlutá 70-89%
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

Vrací report jako JSON:

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

Přístup: capability `manage_woocommerce`.

## Pravidla shody

Každé pravidlo má seznam vzorů (Polish + English). Vzory jsou již normalizované (malá písmena, bez diakritiky). Příklady:

- `"administratorem danych osobowych"` - formální zápis
- `"administrator danych"` - zkrácený
- `"data controller"` - anglická verze

Pravidlo projde, pokud se v obsahu vyskytuje **libovolný** vzor. Přidání nového vzoru je úprava `PrivacyPolicyRules::all()` / `RegulaminRules::all()` - PR vítány.

## Omezení

- Heuristika klíčových slov; pravidlo může projít, i když je odstavec lakonický
- Žádná sémantická analýza (např. zda je skutečně popsána doba retence, a ne jen slovo "uchovávání")
- Nekontroluje Zásady cookies, stránky Vrácení/Reklamace (plánovány samostatné moduly)
- Neposuzuje, zda byl jmenován DPO - jen přítomnost zmínky
