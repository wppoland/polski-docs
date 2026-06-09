---
title: Соціальний вхід (social login)
description: Модуль соціального входу у Polski for WooCommerce - вхід через Google і Facebook OAuth2 на сторінці облікового запису, замовлення та входу WordPress.
---

Соціальний вхід дозволяє клієнтам реєструватися та входити через обліковий запис Google чи Facebook. Усуває потребу створювати та запам'ятовувати пароль, що пришвидшує процес покупки та збільшує кількість реєстрацій.

## Увімкнення модуля

Перейдіть до **WooCommerce > Polski > Модулі магазину** та увімкніть **Соціальний вхід**. Потім налаштуйте ключі API для обраних постачальників (Google, Facebook або обидва).

## Функції

- Вхід і реєстрація через Google OAuth2
- Вхід і реєстрація через Facebook OAuth2
- Кнопки на сторінці "Мій обліковий запис", замовлення та входу WordPress
- Автоматична реєстрація з роллю "Клієнт" (customer)
- Об'єднання облікових записів за адресою електронної пошти або ідентифікатором постачальника
- Безпечна обробка токенів OAuth2
- Відсутність зберігання паролів користувачів, які входять через соцмережі

## Налаштування

Конфігурація в **WooCommerce > Polski > Модулі магазину > Соціальний вхід**.

| Налаштування | За замовчуванням | Опис |
|---|---|---|
| `google_enabled` | `false` | Увімкнути вхід через Google |
| `google_client_id` | - | Client ID з Google Cloud Console |
| `google_client_secret` | - | Client Secret з Google Cloud Console |
| `facebook_enabled` | `false` | Увімкнути вхід через Facebook |
| `facebook_app_id` | - | App ID з Meta for Developers |
| `facebook_app_secret` | - | App Secret з Meta for Developers |
| `auto_register` | `true` | Автоматично створювати обліковий запис при першому вході |

Опція в базі даних: `polski_social_login`.

## Налаштування постачальників

### Google

1. Перейдіть до [Google Cloud Console](https://console.cloud.google.com/)
2. Створіть новий проект або виберіть наявний
3. Перейдіть до **APIs & Services > Credentials**
4. Натисніть **Create Credentials > OAuth 2.0 Client ID**
5. Тип застосунку: **Web application**
6. Додайте авторизований URI переадресації: `https://twojsklep.pl/?polski_social_login=google_callback`
7. Скопіюйте **Client ID** та **Client Secret** до налаштувань модуля
8. Переконайтеся, що **Google+ API** або **People API** увімкнено в проекті

### Facebook

1. Перейдіть до [Meta for Developers](https://developers.facebook.com/)
2. Створіть новий застосунок типу **Consumer**
3. У налаштуваннях застосунку перейдіть до **Facebook Login > Settings**
4. Додайте дійсний URI переадресації OAuth: `https://twojsklep.pl/?polski_social_login=facebook_callback`
5. Скопіюйте **App ID** та **App Secret** до налаштувань модуля
6. Переведіть застосунок у режим **Live** (не sandbox)

## Об'єднання облікових записів

Модуль об'єднує облікові записи користувачів так:

1. **За адресою електронної пошти** - якщо обліковий запис WordPress із такою самою адресою електронної пошти вже існує, модуль об'єднує їх автоматично (користувач входить до наявного облікового запису)
2. **За ідентифікатором постачальника** - якщо користувач входив раніше через того самого постачальника, модуль розпізнає його за збереженим ідентифікатором

Дані постачальника зберігаються в `usermeta`:

- `_polski_social_google_id` - ідентифікатор Google
- `_polski_social_facebook_id` - ідентифікатор Facebook

## Технічні деталі

### Потік OAuth2

1. Клієнт натискає кнопку "Увійти через Google/Facebook"
2. Переадресація на сторінку авторизації постачальника
3. Клієнт надає згоду на надання даних
4. Постачальник переадресовує назад до магазину з кодом авторизації
5. Модуль обмінює код на токен доступу (на боці сервера)
6. Модуль отримує профіль користувача (ім'я, e-mail, ідентифікатор)
7. Користувач входить або реєструється

### Безпека

- Токени OAuth2 обмінюються на боці сервера (ніколи в браузері)
- Параметр `state` захищає від атак CSRF
- Nonce WordPress валідується при ініціації входу
- Client Secret ніколи не експонується у фронтенд-коді

### Хуки

```php
// Змінити роль новозареєстрованого користувача
add_filter('polski/social_login/default_role', function (): string {
    return 'subscriber'; // за замовчуванням: 'customer'
});

// Виконати дію після реєстрації через соціальний вхід
add_action('polski/social_login/user_registered', function (int $user_id, string $provider): void {
    // Надіслати привітальний e-mail
    wp_mail(
        get_userdata($user_id)->user_email,
        'Вітаємо в магазині!',
        'Ваш обліковий запис створено.'
    );
}, 10, 2);

// Фільтрувати дані профілю перед збереженням
add_filter('polski/social_login/profile_data', function (array $data, string $provider): array {
    return $data;
}, 10, 2);

// Вимкнути автоматичну реєстрацію для обраного постачальника
add_filter('polski/social_login/auto_register', function (bool $auto, string $provider): bool {
    if ($provider === 'facebook') {
        return false;
    }
    return $auto;
}, 10, 2);
```

### CSS-класи

- `.polski-social-login` - контейнер кнопок
- `.polski-social-login__button` - кнопка входу
- `.polski-social-login__button--google` - кнопка Google
- `.polski-social-login__button--facebook` - кнопка Facebook
- `.polski-social-login__separator` - роздільник "або"

### ID модуля

`social_login`

## Усунення несправностей

**Кнопка переадресовує на сторінку помилки постачальника** - перевірте, чи URI переадресації в консолі постачальника точно відповідає адресі магазину (зверніть увагу на `https` проти `http` та кінцевий слеш).

**Користувач не створюється після входу** - переконайтеся, що `auto_register` увімкнено. Якщо вимкнено, вхід працює лише для наявних облікових записів із відповідною адресою електронної пошти.

**Помилка "invalid_client"** - перевірте правильність Client ID і Client Secret. Переконайтеся, що немає зайвих пробілів на початку чи в кінці.

**Facebook вимагає перевірки застосунку** - для базового входу (e-mail, ім'я) перевірка не потрібна. Якщо застосунок у режимі sandbox, входити можуть лише адміністратори та тестувальники, додані в панелі Meta.

Повідомлення про проблеми: [github.com/wppoland/polski/issues](https://github.com/wppoland/polski/issues)

<div class="disclaimer">Ця сторінка має виключно інформаційний характер і не є юридичною консультацією. Перед впровадженням проконсультуйтеся з юристом. Polski for WooCommerce є програмним забезпеченням з відкритим кодом (GPLv2), що постачається без гарантій.</div>
