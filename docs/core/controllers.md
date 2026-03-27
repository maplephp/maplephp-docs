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
use Psr\Http\Message\ResponseInterface;

class UserController extends DefaultController
{
    public function show(
        ResponseInterface $response,
        PathInterface     $path,
        UserService       $users
    ): ResponseInterface {
        $id   = (int) $path->select("id")->last();
        $user = $users->find($id);

        $response->getBody()->write(json_encode($user));
        return $response->withHeader("Content-Type", "application/json");
    }
}
```

## Key rules

- Write output to `$response->getBody()->write(...)` — the body stream is mutable in place.
- Use `$response->withHeader(...)` to set headers — this is immutable and returns a new instance. Always capture the return value.
- The action method must return a `ResponseInterface`.
- Any class registered in the container (or resolvable via autowiring) can be injected as a parameter.

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
public function store(
    ResponseInterface      $response,
    ServerRequestInterface $request
): ResponseInterface {
    $body  = $request->getParsedBody();  // POST/PUT form data or JSON body
    $query = $request->getQueryParams(); // GET query string

    // process $body['email'], etc.

    return $response->withStatus(201);
}
```

## Returning JSON

```php
$data = ['id' => 1, 'name' => 'Alice'];
$response->getBody()->write(json_encode($data));
return $response->withHeader('Content-Type', 'application/json');
```

## Generating scaffolds

```bash
./maple make --type=controller --name=User
```

This creates `app/Controllers/UserController.php` with the correct namespace and base class already set up.
