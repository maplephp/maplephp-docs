---
title: Service Providers
sidebar_position: 5
description: Register and boot services using service providers in MaplePHP.
---

# Service Providers

Service providers are the primary extension point for wiring third-party libraries and custom services into the container. They follow a two-phase boot: first all `register()` calls run, then all `boot()` calls run. This guarantees that every service is registered before any service tries to use another.

## Creating a provider

```php
// app/Providers/MailServiceProvider.php
namespace App\Providers;

use App\Services\Mailer;
use MaplePHP\Core\Support\ServiceProvider;
use Psr\Container\ContainerInterface;

class MailServiceProvider extends ServiceProvider
{
    public function register(ContainerInterface $container): void
    {
        $container->set('mailer', new Mailer(
            host: env('MAIL_HOST'),
            port: (int) env('MAIL_PORT', 587),
        ));
    }

    public function boot(): void
    {
        // Runs after all providers have registered.
        // Safe to resolve other services here.
    }
}
```

## Registering a provider

Add the fully-qualified class name to `configs/providers.php`:

```php
// configs/providers.php
return [
    \MaplePHP\Core\Providers\DatabaseProvider::class,
    \App\Providers\MailServiceProvider::class,
];
```

Providers are registered in order, then booted in order.

## Built-in providers

| Provider | What it registers |
|---|---|
| `MaplePHP\Core\Providers\DatabaseProvider` | Doctrine DBAL connection, `DB` singleton, `QueryBuilder` |
| `MaplePHP\Core\Providers\TwigServiceProvider` | `Twig\Environment` with auto-caching based on environment |

`DatabaseProvider` must be present for `DB::table()` to work. Remove it if you are not using the database layer.

`TwigServiceProvider` must be present to use the `Twig` helper in controllers. See [Twig Templates →](/docs/views/twig-templates).

## Two-phase boot

The two-phase design prevents ordering issues when one service depends on another:

1. **register()** — bind services into the container. No other service should be resolved here.
2. **boot()** — all services are now registered. Safe to resolve and configure them.

This means you can define providers in any order in `configs/providers.php` without worrying about dependencies between them.
