---
title: Controllers
sidebar_position: 3
description: Writing HTTP controllers in MaplePHP.
---

# Controllers

HTTP controllers extend `MaplePHP\Core\Routing\DefaultController`. Action methods declare their dependencies as type-hinted parameters — the framework resolves them automatically from the DI container.

## Basic example

```php
// app/Controllers/UserController.php
namespace App\Controllers;

use App\Services\UserService;
use MaplePHP\Core\Routing\DefaultController;
use MaplePHP\Http\Interfaces\PathInterface;

class UserController extends DefaultController
{
    public function show(PathInterface $path, UserService $users): array
    {
        $id = (int) $path->select("id")->last();
        return $users->find($id);
    }
}
```

## Response types

### String response

Return a `string` to send a plain text response:

```php
public function index(): string
{
    return "Hello World!";
}
```

### JSON response

Return an `array` to send a JSON response — the framework encodes it and sets `Content-Type: application/json` automatically:

```php
public function index(): array
{
    return ["title" => "Hello World!"];
}
```

## Available via `$this`

These properties are available in every controller via inheritance from `DefaultController`:

| Property | Type | Description |
|---|---|---|
| `$this->container` | `ContainerInterface` | The PSR-11 service container |
| `$this->request` | `ServerRequestInterface` | The current PSR-7 request |
| `$this->config` | `array` | Merged configuration from `configs/` |

## Parsing request input

Use the PSR-7 request object to read query parameters and parsed body data:

```php
public function store(ServerRequestInterface $request): array
{
    $body  = $request->getParsedBody();  // POST/PUT form data or JSON body
    $query = $request->getQueryParams(); // GET query string

    // process $body['email'], etc.

    return ["status" => "created"];
}
```

## Generating scaffolds

```bash
./maple make --type=controller --name=User
```
__Or just run `maple make` and follow the instructions.__

This creates `app/Controllers/UserController.php` with the correct namespace and base class already set up.

## Advanced: PSR-7 response stream

For most controllers, returning a `string` or `array` is all you need. However, there are situations where writing directly to the PSR-7 response stream gives you more control:

- **Custom headers** — when you need to set specific response headers (e.g. `Content-Disposition` for file downloads, caching headers, CORS).
- **Status codes** — when you need to return a specific HTTP status code like `201 Created` or `204 No Content`.
- **Streaming or large output** — when writing output in chunks or building the body incrementally.
- **Multiple writes** — when different parts of your logic each contribute to the response body.

### String response with stream

```php
public function index(ResponseInterface $response): ResponseInterface
{
    $response->getBody()->write("Hello World!");
    return $response;
}
```

### JSON response with stream

```php
public function index(ResponseInterface $response): ResponseInterface
{
    $data = ["title" => "Hello World!"];
    $response->getBody()->write(json_encode($data));
    return $response->withHeader('Content-Type', 'application/json');
}
```

### Setting status codes and headers

```php
public function store(
    ResponseInterface      $response,
    ServerRequestInterface $request
): ResponseInterface {
    $body = $request->getParsedBody();

    // process $body['email'], etc.

    return $response->withStatus(201);
}
```

Use `$response->withHeader(...)` to set headers — it is immutable and returns a new instance. Always capture the return value.
