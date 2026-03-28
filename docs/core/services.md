---
title: Services
sidebar_position: 4
description: Writing and injecting services in MaplePHP.
---

# Services

Services are plain PHP classes. No base class is required. Type-hint any service in a controller method and the container resolves it automatically via constructor autowiring.

## Basic service

```php
// app/Services/UserService.php
namespace App\Services;

use Psr\Container\ContainerInterface;

class UserService
{
    public function __construct(private readonly ContainerInterface $container) {}

    public function find(int $id): array
    {
        // Retrieve user from database, cache, etc.
        return [];
    }
}
```

## Injecting into a controller

```php
public function show(PathInterface $path, UserService $users): array
{
    $id   = (int) $path->select("id")->last();
    return $users->find($id);
}
```

The container resolves `UserService` and its dependencies automatically. No manual wiring is needed as long as all constructor parameters are type-hinted to resolvable classes.

## Services with non-resolvable dependencies

If a service requires constructor parameters the container cannot resolve automatically (scalars, config values, third-party objects), register it explicitly in a [service provider](/docs/core/service-providers):

```php
// app/Providers/MailServiceProvider.php
public function register(ContainerInterface $container): void
{
    $container->set('mailer', new Mailer(
        host: env('MAIL_HOST'),
        port: (int) env('MAIL_PORT', 587),
    ));
}
```

## Generating scaffolds

```bash
./maple make --type=service --name=User
```

__Or just run `maple make` and and follow the instructions.__

This creates `app/Services/UserService.php` with the correct namespace pre-filled.
