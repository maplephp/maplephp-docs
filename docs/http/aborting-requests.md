---
title: Aborting Requests
sidebar_position: 3
description: Stop request processing and return an HTTP error using abort().
---

# Aborting Requests

The global `abort()` function stops a request and returns an HTTP error response. It throws an `HttpException` that the `HttpStatusError` middleware catches and renders as an error page.

## Usage

```php
// Trigger a 404
abort(404);

// With a custom message
abort(404, 'User not found');

// With extra props forwarded to the error page renderer
abort(403, 'Access denied', ['required_role' => 'admin']);
```

`abort()` can be called from anywhere — controllers, services, commands. No `return` is needed; execution stops at the throw.

## After validation

A common pattern is to abort immediately when input validation fails:

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

## Passing props to the error page

The third `$props` argument is forwarded as part of `$context` in `ErrorPageInterface::render()`:

```php
abort(403, 'Access denied', ['redirect' => '/login']);
```

In the error page renderer, `$context['redirect']` will be `'/login'`.

See [Error Handling →](/docs/http/error-handling) for how to implement a custom error page.
