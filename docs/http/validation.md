---
title: Validation
sidebar_position: 2
description: Validate input with maplephp/validate.
---

# Validation

MaplePHP ships with `maplephp/validate`, which provides two approaches: `Validator` for single-value checks and `ValidationChain` for collecting multiple validation errors (useful for forms).

## Single value — `Validator`

```php
use MaplePHP\Validate\Validator;

// Option 1: Create an instance
$v = new Validator($email);
if (!($v->isEmail() && $v->length(5, 255))) {
    abort(422, 'Invalid email address');
}

// Option 2: Use the static method for cleaner syntax
if (!Validator::value($email)->isEmail(1, 200)) {
    abort(422, 'Invalid email address');
}
```

## Multiple values — `ValidationChain`

`ValidationChain` collects errors across multiple fields and lets you check them all at once:

```php
use MaplePHP\Validate\ValidationChain;

public function store(ResponseInterface $response, ServerRequestInterface $request): ResponseInterface
{
    $body  = $request->getParsedBody();

    $email = new ValidationChain($body['email'] ?? '');
    $email->isEmail()->length(5, 255);

    if ($email->hasError()) {
        abort(422, 'Invalid email address');
    }

    // continue processing ...
    return $response;
}
```

## Available validators

`maplephp/validate` includes 50+ validators covering:

- Email, URL, phone numbers
- Credit card numbers
- Dates and date ranges
- Password strength
- Identity numbers
- String length, numeric ranges
- And more

For a complete list, see the [maplephp/validate](https://github.com/maplephp/validate) repository.

## Aborting on validation failure

The standard pattern is to call `abort()` when validation fails:

```php
if (!Validator::value($id)->isInt()) {
    abort(422, 'ID must be an integer');
}
```

See [Aborting Requests →](/docs/http/aborting-requests) for details on `abort()`.
