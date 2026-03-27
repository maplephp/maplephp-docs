---
title: Middleware
sidebar_position: 1
description: Configure and write PSR-15 middleware in MaplePHP.
---

# Middleware

MaplePHP uses a PSR-15 middleware pipeline powered by `maplephp/emitron`. Middleware is configured in `configs/http.php` and runs for every request unless scoped to a route group.

## Configuration

```php
// configs/http.php
use MaplePHP\Core\Middlewares\HttpStatusError;
use MaplePHP\Emitron\Middlewares\ContentLengthMiddleware;
use MaplePHP\Emitron\Middlewares\GzipMiddleware;

return [
    "middleware" => [
        "global" => [
            HttpStatusError::class,
            ContentLengthMiddleware::class,
            // GzipMiddleware::class,
        ]
    ]
];
```

Middleware runs in the order listed.

## Built-in middleware

| Class | Purpose |
|---|---|
| `HttpStatusError` | Catches HTTP exceptions and renders error responses |
| `ContentLengthMiddleware` | Sets the `Content-Length` header automatically |
| `GzipMiddleware` | Compresses the response body with gzip |
| `HeadRequestMiddleware` | Strips the body from HEAD responses (RFC 7231) |
| `CacheControlMiddleware` | Sets cache control headers |
| `EmitterMiddleware` | Final middleware — sends headers and body to the client |

## Writing custom middleware

```php
// app/Http/Middleware/AuthMiddleware.php
namespace App\Http\Middleware;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

class AuthMiddleware implements MiddlewareInterface
{
    public function process(
        ServerRequestInterface  $request,
        RequestHandlerInterface $handler
    ): ResponseInterface {
        // Inspect the request; return early or continue the pipeline
        return $handler->handle($request);
    }
}
```

Register it in `configs/http.php` alongside the built-in middleware:

```php
return [
    "middleware" => [
        "global" => [
            HttpStatusError::class,
            AuthMiddleware::class,
            ContentLengthMiddleware::class,
        ]
    ]
];
```

## Route-scoped middleware

To apply middleware only to specific routes, use a route group in `routers/web.php`:

```php
use MaplePHP\Emitron\Middlewares\GzipMiddleware;

$router->group("/api", function (RouterDispatcher $router) {
    $router->get("/users", [UserController::class, "index"]);
}, [
    GzipMiddleware::class,
]);
```

Middleware in the group array runs only for routes defined inside that group, in addition to global middleware.
