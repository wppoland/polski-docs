---
title: AI Bridge
description: Most AI pro Polski for WooCommerce - obchodní a compliance schopnosti (abilities) jen pro čtení přes WordPress Abilities API 6.9 a AI asistované koncepty souhrnů produktů a textů bezpečnosti GPSR přes AI Client 7.0.
---

AI Bridge je volitelný modul, který zpřístupňuje data vašeho obchodu AI asistentům a nástrojům kontrolovaným způsobem. Skládá se ze dvou částí. První je sada schopností (abilities) **jen pro čtení** registrovaných ve **WordPress Abilities API (WP 6.9+)**, díky čemuž paleta příkazů editoru webu, servery MCP a AI asistenti mohou číst stejná fakta, která vidí administrátor. Druhou jsou dvě funkce podporované AI v panelu: souhrn produktu a **koncept** textů bezpečnosti GPSR, využívající **WordPress AI Client (WP 7.0+)** přes poskytovatele nakonfigurovaného ve webu.

Modul nic automaticky nemění. Schopnosti pouze čtou data a AI funkce vytvářejí návrhy k posouzení, nikdy nepřepisují pole vyžadující ruční autorizaci. Plugin nikdy neukládá klíč poskytovatele AI. Je to pomocný nástroj, ne právní poradenství ani záruka shody.

## Zapnutí modulu

Modul je **standardně vypnutý**. Zapněte ho v **WooCommerce > Polski > Moduly** (sekce "AI Bridge", klíč modulu `ai_bridge`). Po zapnutí:

- na WordPress 6.9+ se registrují obchodní schopnosti (když je Abilities API dostupné); na starším WordPress modul funguje bez chyby, jen registraci vynechá,
- AI funkce (souhrn produktu, koncept GPSR) jsou dostupné pouze tehdy, když je ve webu nakonfigurován poskytovatel AI podporující generování textu (přes WP AI Client / konektor, např. Anthropic, Google, OpenAI, Vercel AI Gateway). Bez nakonfigurovaného poskytovatele se tyto funkce jednoduše neaktivují a deterministický kanál AI Feed zůstává nedotčen.

## Obchodní schopnosti (jen pro čtení)

Všechny schopnosti patří do kategorie `polski-commerce`, jsou označeny jako `readonly` a `show_in_rest` a chráněny kontrolou oprávnění WooCommerce `manage_woocommerce`. Každá je napojena na existující službu pluginu, takže neduplikuje logiku. Nic se nemění.

| Schopnost (id)                      | Co vrací                                                                                          | Vstup                |
| ----------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------- |
| `polski/get-omnibus-history`        | Historie cen a nejnižší zaznamenaná cena produktu (jako v prezentaci podle směrnice Omnibus).      | `product_id`         |
| `polski/get-gpsr-data`              | Data bezpečnosti produktu (GPSR): výrobce, dovozce, odpovědná osoba, identifikátor, varování, návody. | `product_id`         |
| `polski/list-products-missing-gpsr` | Publikované produkty, kterým chybí jedno nebo více polí GPSR, k nalezení a doplnění mezer.          | `limit` (1-200), `offset` |
| `polski/get-compliance-status`      | Výsledek heuristických kontrol nakonfigurovaných právních stránek (Obchodní podmínky, Soukromí, Vrácení, Reklamace) s hodnocením. | `page_type` (volitelně) |
| `polski/get-store-health`           | Nejnovější snapshot kondice obchodu (celkový stav a senzory chyb, plateb a prodejů).               | (žádný)              |
| `polski/get-product-facts`          | Strukturovaný seznam faktů o produktu (dvojice štítek/hodnota) zpřístupněný přes AI Feed: SKU, GTIN, cena, kategorie, doba dodání a další. | `product_id`         |

Každé volání prochází přes `permission_callback` kontrolující `manage_woocommerce`. Uživatel bez tohoto oprávnění data neobdrží. Schopnosti jsou dostupné přes REST (`/wp-json/wp-abilities/v1/...`), když je Abilities API aktivní.

## Souhrn produktu (AI)

Faktografický souhrn produktu generovaný na žádost administrátora. Funguje pouze tehdy, když je modul zapnutý a je nakonfigurován poskytovatel AI podporující text. Nic nevzniká při načtení stránky.

| Aspekt              | Chování                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| Zdroj dat           | Název, krátký a dlouhý popis produktu a seznam faktů AI Feed - pouze data, která obchod již publikuje. |
| Model               | Instruován, aby používal výhradně zadaná fakta, nevymýšlel specifikace ani ceny, bez marketingových formulací a bez právních prohlášení. |
| Délka               | Krátké, 1-3 věty; zápis omezen na 600 znaků.                                                     |
| Zápis               | Uloženo v meta produktu (`_polski_ai_summary`) výhradně po výslovném spuštění administrátorem.    |
| Bez poskytovatele   | Funkce je nedostupná; nic se neděje a ostatní cesty fungují beze změny.                          |

## Koncept textů bezpečnosti GPSR (AI)

Pomocník vytvářející **koncept** bezpečnostních varování a návodů k použití produktu jako výchozí bod pro ruční ověření. Je to redakční podpora, ne právní poradenství ani záruka shody.

| Aspekt              | Chování                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| Zdroj dat           | Veřejný popis produktu a již zadaná (člověkem) pole GPSR, aby si koncept neodporoval s existujícími daty. |
| Model               | Instruován, aby používal výhradně zadaná fakta, nevymýšlel rizika ani certifikáty a nenaznačoval právní shodu. |
| Zápis               | Výhradně do samostatného, jednoznačně pojmenovaného meta konceptu (`_polski_ai_gpsr_draft`). **Nikdy** nepřepisuje skutečná pole GPSR. |
| Posouzení           | Administrátor musí koncept přečíst a po ověření ručně přenést obsah do příslušných polí. Každý koncept obsahuje poznámku, že je pouze k posouzení a nepředstavuje záruku shody. |
| Délka               | Každé pole konceptu omezeno na 1500 znaků.                                                       |

## Soukromí a klíče

Plugin **nikdy neukládá klíč poskytovatele AI** a sám neprovádí síťové požadavky na poskytovatele. Přihlašovací údaje a síťové volání patří konektoru AI nakonfigurovanému ve WordPress (model "přines si vlastní klíč"). K modelu se dostávají výhradně data, která obchod tak jako tak již publikuje nebo ukládá.

## Řešení problémů

**Schopnosti se neobjevují** - ujistěte se, že máte WordPress 6.9+ s aktivním Abilities API a že je modul AI Bridge zapnutý. Na starším WordPress se registrace vynechá bez chyby.

**AI funkce jsou zašedlé** - nakonfigurujte poskytovatele AI podporujícího generování textu přes WP AI Client / konektor. Bez poskytovatele zůstávají souhrn a koncept GPSR neaktivní.

**Žádná data ze schopností** - zkontrolujte, zda má aktuální uživatel oprávnění `manage_woocommerce`.

Hlášení problémů: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Tato stránka má pouze informativní charakter a nepředstavuje právní poradenství. Před nasazením se poraďte s právníkem. Polski for WooCommerce je open source software (GPLv2) poskytovaný bez záruky.</div>
