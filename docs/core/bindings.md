---
title: Bindings
sidebar_position: 6
description: Map interfaces to concrete implementations in the MaplePHP DI container.
---

# Bindings

Bindings connect an interface (or abstract class) to a concrete implementation inside the DI container. When a controller or service type-hints that interface as a dependency, the container automatically resolves it to the bound class.

Bindings are configured in `configs/services.php` under the `bindings` key.

## Basic binding

```php
// configs/services.php
return [
    "bindings" => [
        CacheInterface::class => FileCache::class,
    ],
];
```

When any class requests `CacheInterface` via constructor injection, the container injects `FileCache`.

## Singleton vs fresh instance

A **class string** binding is resolved as a singleton — the container instantiates it once and reuses the same instance for every request:

```php
"bindings" => [
    CacheInterface::class => FileCache::class,
],
```

A **closure** binding creates a fresh instance on every resolution:

```php
"bindings" => [
    CacheInterface::class => fn() => new FileCache(),
],
```

Use a closure when you need a new object each time the interface is resolved, for example in tests or request-scoped contexts.

## Multiple bindings

```php
"bindings" => [
    LoggerInterface::class    => FileLogger::class,
    CacheInterface::class     => fn() => new RedisCache(env('REDIS_HOST')),
    MailerInterface::class    => SmtpMailer::class,
],
```

## ContainerInterface

The container itself is automatically bound to `ContainerInterface` during bootstrap. No explicit binding is needed:

```php
use Psr\Container\ContainerInterface;

class UserService
{
    public function __construct(private readonly ContainerInterface $container) {}
}
```

## Bindings vs service providers

| Use case | Tool |
|---|---|
| Map an interface to a class | `bindings` in `services.php` |
| Register a service that requires runtime config or has scalar constructor args | [Service Provider](/docs/core/service-providers) |
| Bootstrap third-party libraries (database, template engine) | [Service Provider](/docs/core/service-providers) |

Bindings are the right choice when the container can construct the implementation on its own. Use a service provider when construction requires values the container cannot resolve automatically.
