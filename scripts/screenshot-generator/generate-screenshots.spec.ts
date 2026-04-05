/**
 * Playwright screenshot generator for Polski for WooCommerce documentation.
 *
 * This script is designed to run inside the polski repository where
 * Playwright and wp-env are already configured.
 *
 * Usage:
 *   Copy this file to tests/E2E/ in the polski repo, then run:
 *   npx playwright test generate-screenshots --project=chromium
 *
 * Prerequisites:
 *   - wp-env running: npm run env:start
 *   - WooCommerce + Polski plugin active
 *   - Sample products created (use wp-env run tests-cli "wp polski smoke-test")
 *
 * @author wppoland.com
 */

import { test, expect } from '@playwright/test';
import path from 'path';

const SCREENSHOTS_DIR = path.resolve(__dirname, '../../docs/wporg-assets');

const VIEWPORT = { width: 1440, height: 900 };
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'password';

async function adminLogin(page) {
    await page.goto('/wp-login.php');
    await page.fill('#user_login', ADMIN_USER);
    await page.fill('#user_pass', ADMIN_PASS);
    await page.click('#wp-submit');
    await page.waitForURL('**/wp-admin/**');
}

test.describe('Documentation screenshots', () => {
    test.beforeEach(async ({ page }) => {
        await page.setViewportSize(VIEWPORT);
    });

    test('modules dashboard', async ({ page }) => {
        await adminLogin(page);
        await page.goto('/wp-admin/admin.php?page=polski');
        await page.waitForSelector('.polski-dashboard');
        await page.screenshot({
            path: path.join(SCREENSHOTS_DIR, 'screenshot-1-modules-dashboard.png'),
            fullPage: true,
        });
    });

    test('GPSR product editor', async ({ page }) => {
        await adminLogin(page);
        // Navigate to first product edit page
        await page.goto('/wp-admin/edit.php?post_type=product');
        const firstProduct = page.locator('.row-actions .edit a').first();
        await firstProduct.click();
        // Scroll to GPSR section
        const gpsrSection = page.locator('#polski-gpsr');
        if (await gpsrSection.count() > 0) {
            await gpsrSection.scrollIntoViewIfNeeded();
        }
        await page.screenshot({
            path: path.join(SCREENSHOTS_DIR, 'screenshot-2-gpsr-product-editor.png'),
            fullPage: true,
        });
    });

    test('checkout checkboxes', async ({ page }) => {
        // Add product to cart first
        await page.goto('/shop/');
        const addToCart = page.locator('.add_to_cart_button').first();
        if (await addToCart.count() > 0) {
            await addToCart.click();
            await page.waitForTimeout(1000);
        }
        await page.goto('/checkout/');
        await page.waitForLoadState('networkidle');
        await page.screenshot({
            path: path.join(SCREENSHOTS_DIR, 'screenshot-3-checkout-checkboxes.png'),
            fullPage: false,
        });
    });

    test('Omnibus lowest price', async ({ page }) => {
        // Find a product on sale
        await page.goto('/shop/');
        const saleProduct = page.locator('.onsale').first().locator('..').locator('a').first();
        if (await saleProduct.count() > 0) {
            await saleProduct.click();
        } else {
            // Fallback: go to first product
            await page.locator('.woocommerce-loop-product__link').first().click();
        }
        await page.waitForLoadState('networkidle');
        await page.screenshot({
            path: path.join(SCREENSHOTS_DIR, 'screenshot-4-omnibus-lowest-price.png'),
            fullPage: false,
        });
    });

    test('withdrawal request - My Account', async ({ page }) => {
        // Login as customer
        await page.goto('/my-account/');
        await page.fill('#username', 'customer@example.com');
        await page.fill('#password', 'password');
        await page.click('.woocommerce-form-login__submit');
        await page.goto('/my-account/orders/');
        await page.waitForLoadState('networkidle');
        await page.screenshot({
            path: path.join(SCREENSHOTS_DIR, 'screenshot-5-withdrawal-request.png'),
            fullPage: false,
        });
    });

    test('DSA report form', async ({ page }) => {
        // Navigate to DSA report page (created by the plugin)
        await page.goto('/zglos-nielegalna-tresc/');
        await page.waitForLoadState('networkidle');
        await page.screenshot({
            path: path.join(SCREENSHOTS_DIR, 'screenshot-6-dsa-report-form.png'),
            fullPage: false,
        });
    });

    test('storefront search and filters', async ({ page }) => {
        await page.goto('/wyszukiwanie-produktow/');
        const searchInput = page.locator('.polski-search-input, input[name="s"]').first();
        if (await searchInput.count() > 0) {
            await searchInput.fill('Alpha');
        }
        await page.waitForLoadState('networkidle');
        await page.screenshot({
            path: path.join(SCREENSHOTS_DIR, 'screenshot-7-storefront-search-filters.png'),
            fullPage: true,
        });
    });

    test('wishlist compare quick view', async ({ page }) => {
        await page.goto('/shop/');
        await page.waitForLoadState('networkidle');
        await page.screenshot({
            path: path.join(SCREENSHOTS_DIR, 'screenshot-8-wishlist-compare-quick-view.png'),
            fullPage: true,
        });
    });

    // Additional screenshots for docs coverage

    test('compliance dashboard', async ({ page }) => {
        await adminLogin(page);
        await page.goto('/wp-admin/admin.php?page=polski&tab=compliance');
        await page.waitForLoadState('networkidle');
        await page.screenshot({
            path: path.join(SCREENSHOTS_DIR, 'screenshot-9-compliance-dashboard.png'),
            fullPage: true,
        });
    });

    test('wizard step 1', async ({ page }) => {
        await adminLogin(page);
        await page.goto('/wp-admin/admin.php?page=polski-wizard');
        await page.waitForLoadState('networkidle');
        await page.screenshot({
            path: path.join(SCREENSHOTS_DIR, 'screenshot-10-wizard.png'),
            fullPage: false,
        });
    });

    test('unit price settings', async ({ page }) => {
        await adminLogin(page);
        await page.goto('/wp-admin/admin.php?page=polski&tab=prices');
        await page.waitForLoadState('networkidle');
        await page.screenshot({
            path: path.join(SCREENSHOTS_DIR, 'screenshot-11-unit-price-settings.png'),
            fullPage: true,
        });
    });

    test('NIP lookup checkout', async ({ page }) => {
        await page.goto('/shop/');
        const addToCart = page.locator('.add_to_cart_button').first();
        if (await addToCart.count() > 0) {
            await addToCart.click();
            await page.waitForTimeout(1000);
        }
        await page.goto('/checkout/');
        // Try to check the company checkbox to show NIP field
        const companyCheckbox = page.locator('#polski-nip-checkbox, [name="polski_is_company"]');
        if (await companyCheckbox.count() > 0) {
            await companyCheckbox.check();
            await page.waitForTimeout(500);
        }
        await page.screenshot({
            path: path.join(SCREENSHOTS_DIR, 'screenshot-12-nip-lookup.png'),
            fullPage: false,
        });
    });

    test('nutrients table on product', async ({ page }) => {
        // Find a food product
        await page.goto('/shop/');
        await page.locator('.woocommerce-loop-product__link').first().click();
        await page.waitForLoadState('networkidle');
        // Look for nutrients tab
        const nutrientsTab = page.locator('.polski-nutrients-tab, [data-tab="nutrients"]');
        if (await nutrientsTab.count() > 0) {
            await nutrientsTab.click();
            await page.waitForTimeout(500);
        }
        await page.screenshot({
            path: path.join(SCREENSHOTS_DIR, 'screenshot-13-nutrients-table.png'),
            fullPage: false,
        });
    });

    test('site audit results', async ({ page }) => {
        await adminLogin(page);
        await page.goto('/wp-admin/admin.php?page=polski&tab=audit');
        await page.waitForLoadState('networkidle');
        await page.screenshot({
            path: path.join(SCREENSHOTS_DIR, 'screenshot-14-site-audit.png'),
            fullPage: true,
        });
    });
});
