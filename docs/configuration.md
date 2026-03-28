---
title: Configuration Reference
sidebar_position: 10
description: Environment variables and config file reference for MaplePHP.
---

# Configuration Reference

## Environment variables

| Key | Default | Purpose |
|---|---|---|
| `APP_TITLE` | — | Application name |
| `APP_ENV` | — | Environment name (`local`, `production`, etc.) |
| `DB_CONNECTION` | — | Active connection key (`mysql`, `sqlite`, `test`) |
| `DB_HOST` | `127.0.0.1` | Database host |
| `DB_PORT` | `3306` | Database port |
| `DB_DATABASE` | — | Database name (or SQLite file path) |
| `DB_USERNAME` | — | Database username |
| `DB_PASSWORD` | — | Database password |

## `configs/app.php`

```php
return [
    'app_title' => env('APP_TITLE'),
    'env'       => env('APP_ENV'),
    'timezone'  => 'UTC',
    'locale'    => 'en_US',
];
```

## `configs/http.php`

```php
return [
    "middleware" => [
        "global" => [
            // Add MiddlewareInterface implementations here.
            // Applied to every HTTP request in the order listed.
        ]
    ]
];
```

See [Middleware →](/docs/http/middleware) for built-in and custom middleware options.

## `configs/services.php`

`services.php` configures the full service container. It has two keys: `bindings` and `providers`.

**Bindings** map an interface or abstract class to a concrete implementation. A class string binding is resolved as a singleton. Use a closure to get a fresh instance each time:

```php
return [
    "bindings" => [
        ErrorPageInterface::class => SimpleErrorPage::class,
        // Fresh instance on every resolution:
        // ErrorPageInterface::class => fn() => new SimpleErrorPage(),
    ],
    "providers" => [
        \MaplePHP\Core\Providers\DatabaseProvider::class,
        \App\Providers\MailServiceProvider::class,
    ],
];
```

See [Service Providers →](/docs/core/service-providers) for how to write and register providers.

## `configs/database.php`

```php
return [
    'default' => env('DB_CONNECTION'),
    'connections' => [
        'mysql' => [
            'driver'   => 'pdo_mysql',
            'host'     => env('DB_HOST', '127.0.0.1'),
            'port'     => env('DB_PORT', 3306),
            'dbname'   => env('DB_DATABASE', ''),
            'user'     => env('DB_USERNAME', ''),
            'password' => env('DB_PASSWORD', ''),
            'charset'  => 'utf8mb4',
        ],
        'sqlite' => [
            'driver' => 'pdo_sqlite',
            'file'   => env('DB_DATABASE', 'database.sqlite'),
        ],
        'test' => [
            'driver' => 'pdo_sqlite',
            'memory' => true,
        ],
    ],
];
```

See [Query Builder →](/docs/database/query-builder) for usage.

## App environments

The `App` singleton exposes the current environment:

```php
use MaplePHP\Core\App;

$app = App::get();
$app->env();     // 'PROD', 'DEV', 'STAGE', 'TEST', etc.
$app->isProd();  // bool
$app->isDev();   // bool
```

`TwigServiceProvider` and other built-in providers use these methods to toggle caching and debug behavior automatically.
