---
title: Plugin installation
description: Step-by-step installation guide for the Polski for WooCommerce plugin - from the WordPress dashboard and manually from a ZIP file. System requirements and troubleshooting.
---

## Prerequisites

Check that your server meets the requirements. **Polski for WooCommerce** 1.3.2 requires:

| Component | Minimum version | Recommended version |
|-----------|-----------------|---------------------|
| WordPress | 6.4+ | 6.7+ |
| WooCommerce | 8.0+ | 9.x |
| PHP | 8.1+ | 8.2+ |
| MySQL | 5.7+ | 8.0+ |
| MariaDB | 10.3+ | 10.11+ |

### Checking PHP version

Not sure which PHP version you have? Check in the WordPress dashboard:

1. Go to **Tools > Site Health**
2. Click the **Info** tab
3. Expand the **Server** section
4. Find the **PHP version** field

You can also find the PHP version in your hosting panel (cPanel, DirectAdmin) under domain settings.

### Checking WooCommerce version

1. Go to **Plugins > Installed Plugins**
2. Find **WooCommerce** in the list
3. The version is displayed below the plugin name

:::caution[PHP 8.0 and older]
The plugin does not work on PHP 7.x or PHP 8.0. If your hosting does not have PHP 8.1+, change the PHP version in the hosting panel or contact your provider.
:::

---

## Method 1: Installation from the WordPress dashboard (recommended)

This is the simplest and recommended installation method.

### Step 1 - open the plugins panel

Log in to the WordPress admin panel and go to **Plugins > Add New Plugin**.

### Step 2 - search for the plugin

In the search field, type:

```
Polski for WooCommerce
```

The plugin should appear as the first result. The author is **wppoland.com**.

### Step 3 - install the plugin

Click the **Install Now** button next to the "Polski for WooCommerce" plugin. Wait for WordPress to download and unpack the files.

### Step 4 - activate the plugin

After installation completes, the button will change to **Activate**. Click it to activate the plugin.

### Step 5 - proceed to configuration

After activation, a notification will appear with a link to the configuration wizard. Click **Configure plugin** or manually navigate to **WooCommerce > Polski**.

---

## Method 2: Manual installation from a ZIP file

Use this method when you want to install a specific version or the server cannot connect to WordPress.org.

### Step 1 - download the ZIP package

Download the latest version of the plugin from one of the following sources:

- **WordPress.org**: [https://wordpress.org/plugins/polski-for-woocommerce/](https://wordpress.org/plugins/polski-for-woocommerce/)
- **GitHub Releases**: [https://github.com/wppoland/polski/releases](https://github.com/wppoland/polski/releases)

### Step 2 - upload the ZIP file

1. Go to **Plugins > Add New Plugin**
2. Click the **Upload Plugin** button at the top of the page
3. Click **Choose File** and select the downloaded ZIP file
4. Click **Install Now**

### Step 3 - activate the plugin

After uploading and unpacking the files, click **Activate Plugin**.

---

## Method 3: Installation via FTP/SFTP

Use this method when the WordPress panel does not allow file uploads (e.g. due to size limits).

### Step 1 - extract the archive

Extract the downloaded ZIP file on your computer. You will get a folder called `polski-for-woocommerce`.

### Step 2 - upload to the server

Connect to the server via FTP/SFTP and upload the entire `polski-for-woocommerce` folder to the directory:

```
/wp-content/plugins/
```

The structure after upload should look like this:

```
wp-content/
  plugins/
    polski-for-woocommerce/
      polski-for-woocommerce.php
      includes/
      assets/
      ...
```

### Step 3 - activate in the dashboard

Go to **Plugins > Installed Plugins** in the WordPress dashboard and click **Activate** next to "Polski for WooCommerce".

---

## Installation via WP-CLI

If you have terminal access to the server, you can install the plugin with a single command:

```bash
wp plugin install polski-for-woocommerce --activate
```

To update the plugin to the latest version:

```bash
wp plugin update polski-for-woocommerce
```

Check the current version:

```bash
wp plugin get polski-for-woocommerce --fields=name,version,status
```

---

## Verifying installation

After activating the plugin, check that everything works correctly:

1. **New menu item** - a **Polski** item should appear in the WooCommerce menu
2. **Compliance dashboard** - go to **WooCommerce > Polski** to see the main dashboard
3. **No errors** - check that no PHP error messages appeared on the page

### Verification using a shortcode

To verify that the plugin is active, insert this shortcode on any page:

```
[polski_version]
```

The shortcode displays the plugin version (e.g. "1.3.2") - this means the installation works.

---

## Troubleshooting

### The plugin does not appear in the search

- Check that your WordPress has a connection to the WordPress.org repository
- Make sure you are searching for exactly "Polski for WooCommerce"
- Try manual installation from a ZIP file

### Error "Plugin requires a newer PHP version"

Your server is using an unsupported PHP version. Solution:

1. Log in to your hosting panel
2. Find PHP settings (usually in the "Domains" or "Hosting" section)
3. Change the PHP version to 8.1 or newer
4. Wait a few minutes for the changes to take effect
5. Try activating the plugin again

### Error "WooCommerce is required"

The plugin requires active WooCommerce version 8.0 or newer:

1. Make sure WooCommerce is installed and active
2. Update WooCommerce to the latest version
3. Reactivate the Polski for WooCommerce plugin

### White screen after activation

If you see a white screen after activation:

1. Enable WordPress debug mode - add to `wp-config.php`:

```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
```

2. Check the log file: `wp-content/debug.log`
3. If the problem is a conflict with another plugin, deactivate other plugins and activate them one by one

### File permission issues

If manual installation does not work, check permissions:

```bash
# Recommended permissions for directories
chmod 755 wp-content/plugins/polski-for-woocommerce/

# Recommended permissions for files
chmod 644 wp-content/plugins/polski-for-woocommerce/*.php
```

---

## Updating the plugin

The plugin updates through the standard WordPress mechanism. When a new version is available:

1. You will see a notification in **Plugins > Installed Plugins**
2. Click **Update Now** or use bulk update
3. After updating, check that the store works correctly

:::tip[Backup]
Before updating, create a backup of your database and files. Hosting often does this automatically, but a manual backup gives you certainty.
:::

---

## Next steps

After installation, proceed to [plugin configuration](/en/getting-started/configuration/) to enable modules and adjust settings.

Have a problem not listed here? Report it on [GitHub Issues](https://github.com/wppoland/polski/issues) or ask on [GitHub Discussions](https://github.com/wppoland/polski/discussions).

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
