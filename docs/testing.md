---
title: Testing
sidebar_position: 8
description: Writing and running tests with maplephp/unitary.
---

# Testing

MaplePHP includes `maplephp/unitary`, a standalone testing framework built for speed. It runs 100,000+ tests per second with no external dependencies, and includes built-in mocking and assertion support.

For full documentation, see the [Unitary documentation](https://maplephp.github.io/unitary/).

## Writing tests

```php
// tests/UserServiceTest.php
use MaplePHP\Unitary\TestCase;

group("Your grouped test subject", function (TestCase $case) {

    $case->expect(1 + 2)
        ->isEqualTo(3)
        ->validate("Addition must be correct");

});
```

`group()` wraps a set of related assertions. `expect()` takes a value and chains matchers. `validate()` provides the failure message.

## Running tests

```bash
vendor/bin/unitary
```

Unitary auto-discovers test files in the `tests/` directory. No configuration file is needed.

## Composer script

```json
{
    "scripts": {
        "test": "vendor/bin/unitary"
    }
}
```

```bash
composer test
```

## Database testing

Use the in-memory SQLite connection for database tests. In `configs/database.php`:

```php
'test' => [
    'driver' => 'pdo_sqlite',
    'memory' => true,
],
```

Set `DB_CONNECTION=test` in your test environment or configure it directly when bootstrapping tests.
