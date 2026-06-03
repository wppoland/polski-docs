---
title: AI Bridge
description: Most AI pre Polski for WooCommerce - len na čítanie obchodné a zhodové zdolnosti (abilities) cez WordPress Abilities API 6.9 a AI-asistované návrhy súhrnov produktov a bezpečnostných textov GPSR cez AI Client 7.0.
---

AI Bridge je voliteľný modul, ktorý sprístupňuje dáta vášho obchodu AI asistentom a nástrojom kontrolovaným spôsobom. Skladá sa z dvoch častí. Prvou je sada zdolností (abilities) **len na čítanie** zaregistrovaných vo **WordPress Abilities API (WP 6.9+)**, vďaka čomu paleta príkazov editora stránky, MCP servery a AI asistenti môžu čítať tie isté fakty, ktoré vidí administrátor. Druhou sú dve funkcie podporované AI v paneli: súhrn produktu a **návrh** bezpečnostných textov GPSR, ktoré využívajú **WordPress AI Client (WP 7.0+)** cez poskytovateľa nakonfigurovaného v stránke.

Modul nič nemení automaticky. Zdolnosti výlučne čítajú dáta a funkcie AI tvoria návrhy na posúdenie, nikdy neprepisujú polia vyžadujúce ručnú autorizáciu. Plugin nikdy neukladá kľúč poskytovateľa AI. Je to pomocný nástroj, nie právne poradenstvo ani záruka zhody.

## Zapnutie modulu

Modul je **predvolene vypnutý**. Zapnite ho v **WooCommerce > Polski > Moduly** (sekcia "AI Bridge", kľúč modulu `ai_bridge`). Po zapnutí:

- na WordPress 6.9+ sa registrujú obchodné zdolnosti (keď je Abilities API dostupné); na staršom WordPress modul funguje bez chyby, jednoducho preskočí registráciu,
- funkcie AI (súhrn produktu, návrh GPSR) sa stanú dostupnými len vtedy, keď je v stránke nakonfigurovaný poskytovateľ AI podporujúci generovanie textu (cez WP AI Client / konektor, napr. Anthropic, Google, OpenAI, Vercel AI Gateway). Bez nakonfigurovaného poskytovateľa sa tieto funkcie jednoducho neaktivujú a deterministický kanál AI Feed zostáva nedotknutý.

## Obchodné zdolnosti (len na čítanie)

Všetky zdolnosti patria do kategórie `polski-commerce`, sú označené ako `readonly` a `show_in_rest` a chránené kontrolou oprávnenia WooCommerce `manage_woocommerce`. Každá je napojená na existujúcu službu pluginu, takže neduplikuje logiku. Nič sa nemení.

| Zdolnosť (id)                       | Čo vracia                                                                                          | Vstup                |
| ----------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------- |
| `polski/get-omnibus-history`        | História cien a najnižšia zaznamenaná cena produktu (ako v prezentácii podľa smernice Omnibus).    | `product_id`         |
| `polski/get-gpsr-data`              | Bezpečnostné dáta produktu (GPSR): výrobca, dovozca, zodpovedná osoba, identifikátor, upozornenia, pokyny. | `product_id`         |
| `polski/list-products-missing-gpsr` | Zverejnené produkty, ktorým chýba jedno alebo viac polí GPSR, na nájdenie a doplnenie medzier.      | `limit` (1-200), `offset` |
| `polski/get-compliance-status`      | Výsledok heuristických kontrol nakonfigurovaných právnych stránok (Obchodné podmienky, Súkromie, Vrátenia, Reklamácie) s hodnotením. | `page_type` (voliteľné) |
| `polski/get-store-health`           | Najnovší snapshot kondície obchodu (celkový stav a senzory chýb, platieb a predaja).               | (žiadny)             |
| `polski/get-product-facts`          | Štruktúrovaný zoznam faktov o produkte (páry štítok/hodnota) sprístupnený cez AI Feed: SKU, GTIN, cena, kategórie, čas doručenia a ďalšie. | `product_id`         |

Každé volanie prechádza cez `permission_callback` overujúci `manage_woocommerce`. Používateľ bez tohto oprávnenia nedostane dáta. Zdolnosti sú dostupné cez REST (`/wp-json/wp-abilities/v1/...`), keď je Abilities API aktívne.

## Súhrn produktu (AI)

Faktografický súhrn produktu generovaný na žiadosť administrátora. Funguje len keď je modul zapnutý a je nakonfigurovaný poskytovateľ AI podporujúci text. Nič nevzniká pri načítaní stránky.

| Aspekt              | Správanie                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| Zdroj dát           | Názov, krátky a dlhý opis produktu a zoznam faktov AI Feed - len dáta, ktoré obchod už zverejňuje. |
| Model               | Inštruovaný, aby používal výlučne zadané fakty, nevymýšľal špecifikácie ani ceny, bez marketingových formulácií a bez právnych deklarácií. |
| Dĺžka               | Krátke, 1-3 vety; zápis obmedzený na 600 znakov.                                                |
| Zápis               | Uložené v meta produktu (`_polski_ai_summary`) výlučne po výslovnom spustení administrátorom.    |
| Bez poskytovateľa   | Funkcia je nedostupná; nič sa nedeje a ostatné cesty fungujú bez zmeny.                          |

## Návrh bezpečnostných textov GPSR (AI)

Pomocník vytvárajúci **návrh** bezpečnostných upozornení a pokynov na používanie produktu ako východiskový bod pre ručné overenie. Je to redakčná podpora, nie právne poradenstvo ani záruka zhody.

| Aspekt              | Správanie                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| Zdroj dát           | Verejný opis produktu a už zadané (človekom) polia GPSR, aby návrh neprotirečil existujúcim dátam. |
| Model               | Inštruovaný, aby používal výlučne zadané fakty, nevymýšľal riziká ani certifikáty a nenavrhoval právnu zhodu. |
| Zápis               | Výlučne do samostatného, jednoznačne pomenovaného meta návrhu (`_polski_ai_gpsr_draft`). **Nikdy** neprepisuje skutočné polia GPSR. |
| Posúdenie           | Administrátor musí návrh prečítať a ručne preniesť obsah do správnych polí po overení. Každý návrh obsahuje poznámku, že je len na posúdenie a nepredstavuje záruku zhody. |
| Dĺžka               | Každé pole návrhu obmedzené na 1500 znakov.                                                      |

## Súkromie a kľúče

Plugin **nikdy neukladá kľúč poskytovateľa AI** a sám nevykonáva sieťové požiadavky na poskytovateľa. Poverenia a sieťové volanie patria konektoru AI nakonfigurovanému vo WordPress (model "prines si vlastný kľúč"). Do modelu putujú výlučne dáta, ktoré obchod aj tak už zverejňuje alebo ukladá.

## Riešenie problémov

**Zdolnosti sa neobjavujú** - uistite sa, že máte WordPress 6.9+ s aktívnym Abilities API a že modul AI Bridge je zapnutý. Na staršom WordPress sa registrácia preskakuje bez chyby.

**Funkcie AI sú sivé** - nakonfigurujte poskytovateľa AI podporujúceho generovanie textu cez WP AI Client / konektor. Bez poskytovateľa zostávajú súhrn a návrh GPSR neaktívne.

**Žiadne dáta zo zdolností** - skontrolujte, či má aktuálny používateľ oprávnenie `manage_woocommerce`.

Hlásenie problémov: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Táto stránka má výlučne informatívny charakter a nepredstavuje právne poradenstvo. Pred nasadením sa poraďte s právnikom. Polski for WooCommerce je open source softvér (GPLv2) poskytovaný bez záruky.</div>
