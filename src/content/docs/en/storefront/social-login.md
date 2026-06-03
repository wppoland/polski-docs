---
title: Social login
description: Social login module in Polski for WooCommerce - sign in with Google and Facebook OAuth2 on the account page, checkout and WordPress login.
---

Social login lets customers register and sign in using their Google or Facebook account. It removes the need to create and remember a password, which speeds up the buying process and increases the number of registrations.

## Enabling the module

Go to **WooCommerce > Polski > Storefront modules** and enable **Social login**. Then configure the API keys for the selected providers (Google, Facebook, or both).

## Features

- Sign in and registration via Google OAuth2
- Sign in and registration via Facebook OAuth2
- Buttons on the My Account, checkout and WordPress login pages
- Automatic registration with the "Customer" role
- Account linking by email address or provider identifier
- Secure handling of OAuth2 tokens
- No storage of passwords for users who sign in via social login

## Settings

Configuration in **WooCommerce > Polski > Storefront modules > Social login**.

| Setting | Default | Description |
|---|---|---|
| `google_enabled` | `false` | Enable sign in via Google |
| `google_client_id` | - | Client ID from Google Cloud Console |
| `google_client_secret` | - | Client Secret from Google Cloud Console |
| `facebook_enabled` | `false` | Enable sign in via Facebook |
| `facebook_app_id` | - | App ID from Meta for Developers |
| `facebook_app_secret` | - | App Secret from Meta for Developers |
| `auto_register` | `true` | Automatically create an account on first sign in |

Database option: `polski_social_login`.

## Provider configuration

### Google

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Go to **APIs & Services > Credentials**
4. Click **Create Credentials > OAuth 2.0 Client ID**
5. Application type: **Web application**
6. Add an authorized redirect URI: `https://yourstore.com/?polski_social_login=google_callback`
7. Copy the **Client ID** and **Client Secret** into the module settings
8. Make sure the **Google+ API** or **People API** is enabled in the project

### Facebook

1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Create a new **Consumer** type app
3. In the app settings, go to **Facebook Login > Settings**
4. Add a valid OAuth redirect URI: `https://yourstore.com/?polski_social_login=facebook_callback`
5. Copy the **App ID** and **App Secret** into the module settings
6. Set the app to **Live** mode (not sandbox)

## Account linking

The module links user accounts in the following way:

1. **By email address** - if a WordPress account with the same email address already exists, the module links it automatically (the user signs in to the existing account)
2. **By provider identifier** - if the user has signed in with the same provider before, the module recognizes them by the stored identifier

Provider data is stored in `usermeta`:

- `_polski_social_google_id` - Google identifier
- `_polski_social_facebook_id` - Facebook identifier

## Technical details

### OAuth2 flow

1. The customer clicks the "Sign in with Google/Facebook" button
2. Redirect to the provider's authorization page
3. The customer consents to sharing their data
4. The provider redirects back to the store with an authorization code
5. The module exchanges the code for an access token (server side)
6. The module fetches the user profile (name, email, identifier)
7. The user is signed in or registered

### Security

- OAuth2 tokens are exchanged server side (never in the browser)
- The `state` parameter protects against CSRF attacks
- The WordPress nonce is validated when sign in is initiated
- The Client Secret is never exposed in front-end code

### Hooks

```php
// Change the role of a newly registered user
add_filter('polski/social_login/default_role', function (): string {
    return 'subscriber'; // default: 'customer'
});

// Run an action after registration via social login
add_action('polski/social_login/user_registered', function (int $user_id, string $provider): void {
    // Send a welcome email
    wp_mail(
        get_userdata($user_id)->user_email,
        'Welcome to the store!',
        'Your account has been created.'
    );
}, 10, 2);

// Filter the profile data before saving
add_filter('polski/social_login/profile_data', function (array $data, string $provider): array {
    return $data;
}, 10, 2);

// Disable automatic registration for a selected provider
add_filter('polski/social_login/auto_register', function (bool $auto, string $provider): bool {
    if ($provider === 'facebook') {
        return false;
    }
    return $auto;
}, 10, 2);
```

### CSS classes

- `.polski-social-login` - button container
- `.polski-social-login__button` - sign in button
- `.polski-social-login__button--google` - Google button
- `.polski-social-login__button--facebook` - Facebook button
- `.polski-social-login__separator` - "or" separator

### Module ID

`social_login`

## Troubleshooting

**The button redirects to the provider's error page** - check that the redirect URI in the provider console exactly matches the store address (mind `https` vs `http` and the trailing slash).

**The user is not created after signing in** - make sure `auto_register` is enabled. If disabled, sign in works only for existing accounts with a matching email address.

**"invalid_client" error** - check that the Client ID and Client Secret are correct. Make sure there are no extra spaces at the start or end.

**Facebook requires app review** - basic sign in (email, name) does not require a review. If the app is in sandbox mode, only administrators and testers added in the Meta panel can sign in.

Reporting issues: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">This page is for informational purposes only and does not constitute legal advice. Consult a lawyer before implementation. Polski for WooCommerce is open source software (GPLv2) provided without warranty.</div>
