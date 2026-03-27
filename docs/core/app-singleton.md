---
title: App Singleton
sidebar_position: 1
description: The MaplePHP App singleton and how to use it for paths and environment access.
---

# App Singleton

After boot, `MaplePHP\Core\App` is available as a singleton. Use it to resolve well-known directory paths and read the current environment.

## Directory paths

```php
use MaplePHP\Core\App;

$app = App::get();

$app->dir()->root();        // /path/to/my-app
$app->dir()->public();      // /path/to/my-app/public
$app->dir()->configs();     // /path/to/my-app/configs
$app->dir()->app();         // /path/to/my-app/app
$app->dir()->logs();        // /path/to/my-app/storage/logs
$app->dir()->cache();       // /path/to/my-app/storage/cache
$app->dir()->migrations();  // /path/to/my-app/database/migrations
```

Use these methods instead of hardcoding paths. They remain correct regardless of where the project is deployed.

## Environment

```php
$app->env();       // 'PROD', 'DEV', 'STAGE', 'TEST', etc.
$app->isProd();    // bool
$app->isDev();     // bool
```

The environment value comes from the `env` key in `configs/configs.php`, which typically reads `APP_ENV` from `.env`.

## Usage in services

`App::get()` is available anywhere after the kernel boots. A common pattern is using it inside service constructors or provider `boot()` methods:

```php
use MaplePHP\Cache\Cache;
use MaplePHP\Cache\Handlers\FileSystemHandler;
use MaplePHP\Core\App;

$cache = new Cache(
    new FileSystemHandler(App::get()->dir()->cache())
);
```
