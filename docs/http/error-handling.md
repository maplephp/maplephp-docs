---
title: Error Handling
sidebar_position: 4
description: Custom HTTP error pages and the HttpStatusError middleware.
---

# Error Handling

By default, `HttpStatusError` renders a built-in styled page for any `abort()` call or non-2xx response. The page shows the status code, a message, and a "Go home" link.

## Custom error pages

To replace the built-in renderer, implement `MaplePHP\Core\Interfaces\ErrorPageInterface`:

```php
// app/Errors/MyErrorPage.php
namespace App\Errors;

use MaplePHP\Core\Interfaces\ErrorPageInterface;
use MaplePHP\Core\App;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class MyErrorPage implements ErrorPageInterface
{
    public function render(
        ResponseInterface      $response,
        ServerRequestInterface $request,
        array                  $context = []
    ): string {
        $code    = $response->getStatusCode();
        $message = $context['message'] ?? $response->getReasonPhrase();

        ob_start();
        require App::get()->dir()->resources() . '/errors/error.php';
        return ob_get_clean();
    }
}
```

### Available in `render()`

| Variable | Source | Description |
|---|---|---|
| `$response->getStatusCode()` | PSR-7 | HTTP status code (404, 403, 500, …) |
| `$response->getReasonPhrase()` | PSR-7 | Default HTTP reason phrase |
| `$context['message']` | `abort()` arg 2 | Custom message passed to `abort()` |
| `$context[*]` | `abort()` arg 3 | Any props from the third `abort()` argument |
| `$request->getUri()` | PSR-7 | The current request URI |

### Register the renderer

Pass your implementation to `HttpStatusError` in `configs/http.php`:

```php
// configs/http.php
use App\Errors\MyErrorPage;
use MaplePHP\Core\Middlewares\HttpStatusError;
use MaplePHP\Emitron\Middlewares\ContentLengthMiddleware;

return [
    "middleware" => [
        "global" => [
            new HttpStatusError(new MyErrorPage()),
            ContentLengthMiddleware::class,
        ]
    ]
];
```

## Twig error pages

If you use Twig, use `TwigErrorPage` instead. It renders `resources/errors/error.twig` and passes the following template variables:

| Variable | Description |
|---|---|
| `{{ code }}` | HTTP status code (404, 500, …) |
| `{{ message }}` | Reason phrase or custom `abort()` message |
| `{{ uri }}` | The request URI that triggered the error |
| `{{ context }}` | Full context array from `abort()` |

Register it in `configs/http.php`:

```php
use MaplePHP\Core\Middlewares\HttpStatusError;
use MaplePHP\Core\Render\Errors\TwigErrorPage;

return [
    "middleware" => [
        "global" => [
            new HttpStatusError(new TwigErrorPage()),
            ContentLengthMiddleware::class,
        ]
    ]
];
```

`TwigServiceProvider` must be registered in `configs/providers.php` for this to work.

## Vanilla vs Twig

```php
// configs/http.php
return [
    "middleware" => [
        "global" => [
            // HttpStatusError::class,                       // built-in PHP renderer
            // new HttpStatusError(new TwigErrorPage()),     // Twig renderer
            // new HttpStatusError(new MyErrorPage()),       // custom renderer
            ContentLengthMiddleware::class,
        ]
    ]
];
```
