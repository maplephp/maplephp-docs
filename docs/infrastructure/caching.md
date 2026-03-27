---
title: Caching
sidebar_position: 1
description: PSR-6 and PSR-16 caching with maplephp/cache.
---

# Caching

`maplephp/cache` implements both PSR-6 (`CacheItemPoolInterface`) and PSR-16 (`CacheInterface`). The `Cache` wrapper provides the PSR-16 API around any PSR-6 handler.

## Basic usage

```php
use MaplePHP\Cache\Cache;
use MaplePHP\Cache\Handlers\FileSystemHandler;
use MaplePHP\Core\App;

$cache = new Cache(new FileSystemHandler(App::get()->dir()->cache()));

// Read (returns $default on miss)
$value = $cache->get('my-key', null);

// Write with TTL in seconds
$cache->set('my-key', $computedResult, 3600);

// Check existence
if ($cache->has('my-key')) { ... }

// Delete
$cache->delete('my-key');

// Clear all
$cache->clear();
```

## Handlers

| Handler | Description |
|---|---|
| `FileSystemHandler` | Writes cache files to a directory. Pass `App::get()->dir()->cache()` as the path. |
| `MemcachedHandler` | Uses a `\Memcached` instance. |

Swap handlers without changing any other code:

```php
use MaplePHP\Cache\Handlers\MemcachedHandler;

$memcached = new \Memcached();
$memcached->addServer('127.0.0.1', 11211);

$cache = new Cache(new MemcachedHandler($memcached));
```

The `Cache` class and all callers remain unchanged. Only the handler construction changes.
