---
title: Logging
sidebar_position: 2
description: PSR-3 logging with maplephp/log.
---

# Logging

`maplephp/log` implements PSR-3. Attach one or more handlers to a `Logger` instance.

## Basic usage

```php
use MaplePHP\Core\App;
use MaplePHP\Log\Logger;
use MaplePHP\Log\Handlers\StreamHandler;

$logger = new Logger(
    new StreamHandler(
        file:  App::get()->dir()->logs() . '/app.log',
        size:  5000,   // KB — rotate when the file exceeds this size
        count: 10      // keep at most this many rotated files
    )
);

$logger->info('User registered', ['user_id' => $id]);
$logger->warning('Slow query detected', ['duration_ms' => 1200]);
$logger->error('Payment gateway timeout', ['order_id' => $orderId]);
```

## Log levels

Log levels follow PSR-3: `emergency`, `alert`, `critical`, `error`, `warning`, `notice`, `info`, `debug`.

```php
$logger->emergency('System is down');
$logger->alert('Database unreachable');
$logger->critical('Uncaught exception');
$logger->error('Failed to send email');
$logger->warning('Slow query');
$logger->notice('Config overridden');
$logger->info('User logged in');
$logger->debug('Request payload', ['data' => $payload]);
```

## Handlers

| Handler | Description |
|---|---|
| `StreamHandler` | Writes to a file with optional size-based rotation. `size` is in KB, `count` is the number of rotated files to keep. |
| `ErrorLogHandler` | Delegates to PHP's `error_log()`. |
| `DBHandler` | Writes structured entries to a database table. |

Multiple handlers can be attached to a single `Logger` instance for fan-out logging.
