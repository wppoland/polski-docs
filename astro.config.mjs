// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://polski.wppoland.com',
	integrations: [
		starlight({
			title: 'Polski for WooCommerce',
			logo: {
				src: './src/assets/icon.png',
				replacesTitle: false,
			},
			favicon: '/favicon.png',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/wppoland/polski' },
			],
			defaultLocale: 'root',
			locales: {
				root: { label: 'Polski', lang: 'pl' },
				en: { label: 'English', lang: 'en' },
				de: { label: 'Deutsch', lang: 'de' },
				cs: { label: 'Čeština', lang: 'cs' },
				sk: { label: 'Slovenčina', lang: 'sk' },
				uk: { label: 'Українська', lang: 'uk' },
			},
			customCss: ['./src/styles/custom.css'],
			editLink: {
				baseUrl: 'https://github.com/wppoland/polski-docs/edit/main/',
			},
			lastUpdated: true,
			sidebar: [
				{
					label: 'Rozpoczęcie pracy',
					translations: {
						en: 'Getting started',
						de: 'Erste Schritte',
						cs: 'Začínáme',
						sk: 'Začíname',
						uk: 'Початок роботи',
					},
					items: [
						{ slug: 'getting-started' },
						{ slug: 'getting-started/installation' },
						{ slug: 'getting-started/configuration' },
						{ slug: 'getting-started/wizard' },
					],
				},
				// ── FREE ────────────────────────────────────────────
				{
					label: 'FREE',
					badge: { text: 'FREE', variant: 'success' },
					collapsed: false,
					items: [
						{
							label: 'Wymogi prawne',
							translations: {
								en: 'Legal requirements',
								de: 'Rechtliche Anforderungen',
								cs: 'Právní požadavky',
								sk: 'Právne požiadavky',
								uk: 'Правові вимоги',
							},
							items: [
								{ slug: 'compliance/gpsr' },
								{ slug: 'compliance/omnibus' },
								{ slug: 'compliance/withdrawal' },
								{ slug: 'compliance/gdpr' },
								{ slug: 'compliance/dsa' },
								{ slug: 'compliance/ksef' },
								{ slug: 'compliance/greenwashing' },
								{ slug: 'compliance/legal-pages' },
							],
						},
						{
							label: 'Ceny i informacje o produkcie',
							translations: {
								en: 'Prices and product info',
								de: 'Preise und Produktinfos',
								cs: 'Ceny a informace o produktu',
								sk: 'Ceny a informácie o produkte',
								uk: 'Ціни та інформація про товар',
							},
							items: [
								{ slug: 'prices/unit-prices' },
								{ slug: 'prices/from-price' },
								{ slug: 'prices/vat-display' },
								{ slug: 'prices/delivery-time' },
								{ slug: 'prices/manufacturer' },
							],
						},
						{
							label: 'Kasa i zamówienia',
							translations: {
								en: 'Checkout',
								de: 'Kasse und Bestellungen',
								cs: 'Pokladna a objednávky',
								sk: 'Pokladňa a objednávky',
								uk: 'Каса та замовлення',
							},
							items: [
								{ slug: 'checkout/checkout-button' },
								{ slug: 'checkout/legal-checkboxes' },
								{ slug: 'checkout/nip-lookup' },
								{ slug: 'checkout/minimum-order' },
								{ slug: 'checkout/double-opt-in' },
							],
						},
						{
							label: 'Produkty spożywcze',
							translations: {
								en: 'Food products',
								de: 'Lebensmittel',
								cs: 'Potravinové produkty',
								sk: 'Potravinové produkty',
								uk: 'Харчові продукти',
							},
							items: [
								{ slug: 'food/food-overview' },
								{ slug: 'food/nutrients' },
								{ slug: 'food/allergens' },
								{ slug: 'food/nutri-score' },
							],
						},
						{
							label: 'Moduły sklepowe',
							translations: {
								en: 'Storefront',
								de: 'Shop-Module',
								cs: 'Moduly obchodu',
								sk: 'Moduly obchodu',
								uk: 'Модулі магазину',
							},
							items: [
								{ slug: 'storefront/wishlist' },
								{ slug: 'storefront/compare' },
								{ slug: 'storefront/quick-view' },
								{ slug: 'storefront/ajax-search' },
								{ slug: 'storefront/ajax-filters' },
								{ slug: 'storefront/product-slider' },
								{ slug: 'storefront/review-requests' },
								{ slug: 'storefront/badges' },
								{ slug: 'storefront/other-modules' },
							],
						},
						{
							label: 'Narzędzia',
							translations: {
								en: 'Tools',
								de: 'Werkzeuge',
								cs: 'Nástroje',
								sk: 'Nástroje',
								uk: 'Інструменти',
							},
							items: [
								{ slug: 'tools/compliance-dashboard' },
								{ slug: 'tools/site-audit' },
								{ slug: 'tools/security-incidents' },
								{ slug: 'tools/verified-reviews' },
							],
						},
						{
							label: 'Dla deweloperów',
							translations: {
								en: 'Developer reference',
								de: 'Entwicklerreferenz',
								cs: 'Pro vývojáře',
								sk: 'Pre vývojárov',
								uk: 'Для розробників',
							},
							items: [
								{ slug: 'developer/rest-api' },
								{ slug: 'developer/hooks' },
								{ slug: 'developer/shortcodes' },
								{ slug: 'developer/templates' },
								{ slug: 'developer/wp-cli' },
								{ slug: 'developer/csv-import' },
								{ slug: 'developer/blocks' },
								{ slug: 'developer/schema-org' },
							],
						},
					],
				},
				// ── PRO ─────────────────────────────────────────────
				{
					label: 'PRO',
					badge: { text: 'PRO', variant: 'caution' },
					collapsed: false,
					items: [
						{ slug: 'pro/overview', badge: { text: 'Start', variant: 'tip' } },
						{
							label: 'Faktury i finanse',
							translations: {
								en: 'Invoices and finance',
								de: 'Rechnungen und Finanzen',
								cs: 'Faktury a finance',
								sk: 'Faktúry a financie',
								uk: 'Рахунки та фінанси',
							},
							items: [
								{ slug: 'pro/invoices' },
								{ slug: 'pro/ksef' },
								{ slug: 'pro/accounting' },
							],
						},
						{
							label: 'Koszyk i zgody',
							translations: {
								en: 'Checkout and consent',
								de: 'Kasse und Einwilligungen',
								cs: 'Pokladna a souhlasy',
								sk: 'Pokladňa a súhlasy',
								uk: 'Каса та згоди',
							},
							items: [
								{ slug: 'pro/multistep-checkout' },
								{ slug: 'pro/consent-management' },
							],
						},
						{
							label: 'Sprzedaż i marketing',
							translations: {
								en: 'Sales and marketing',
								de: 'Verkauf und Marketing',
								cs: 'Prodej a marketing',
								sk: 'Predaj a marketing',
								uk: 'Продажі та маркетинг',
							},
							items: [
								{ slug: 'pro/abandoned-carts' },
								{ slug: 'pro/gift-cards' },
								{ slug: 'pro/subscriptions' },
								{ slug: 'pro/affiliates' },
								{ slug: 'pro/quotes' },
								{ slug: 'pro/preorders' },
								{ slug: 'pro/bundles-addons' },
								{ slug: 'pro/catalog-mode' },
							],
						},
						{
							label: 'Integracje',
							translations: {
								en: 'Integrations',
								de: 'Integrationen',
								cs: 'Integrace',
								sk: 'Integrácie',
								uk: 'Інтеграції',
							},
							items: [
								{ slug: 'pro/delivery-date' },
								{ slug: 'pro/fulfillment' },
								{ slug: 'pro/shipping-inpost' },
								{ slug: 'pro/shipping-dpd' },
								{ slug: 'pro/shipping-dhl' },
							],
						},
						{ slug: 'pro/pro-api', badge: { text: 'API', variant: 'note' } },
					],
				},
			],
		}),
	],
});
