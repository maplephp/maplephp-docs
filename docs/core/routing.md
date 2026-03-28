---
title: Routing
sidebar_position: 2
description: Define HTTP and CLI routes in MaplePHP.
---

# Routing

## HTTP routes

Define HTTP routes in `routes/web.php`. The `$router` variable is injected automatically.

```php
// routes/web.php
use App\Controllers\UserController;

$router->get("/users", [UserController::class, "index"]);
$router->get("/users/{id:\d+}", [UserController::class, "show"]);
$router->post("/users", [UserController::class, "store"]);
$router->put("/users/{id:\d+}", [UserController::class, "update"]);
$router->delete("/users/{id:\d+}", [UserController::class, "destroy"]);
```

MaplePHP uses [FastRoute](https://github.com/nikic/FastRoute) for URL matching.

## Pattern reference

| Pattern | Example route | Matches |
|---|---|---|
| `/slug` | `/about` | Static segment only |
| `{name}` | `/users/{name}` | Any segment except `/` |
| `{id:\d+}` | `/posts/{id:\d+}` | Digits only |
| `{name:[^/]+}` | `/profile/{name:[^/]+}` | Explicit single segment |
| `{slug:.+}` | `/docs/{slug:.+}` | Everything including `/` |
| `{lang:(en\|sv\|de)}` | `/{lang}/about` | Enumerated values only |
| `{name:your-slug}` | `/your-slug` | Bind a static slug to a named parameter |

## Route groups

Use `$router->group()` to apply a shared middleware stack — and optionally a URL prefix — to a set of routes.

**Group with middleware only** (no prefix):

```php
use MaplePHP\Emitron\Middlewares\GzipMiddleware;

$router->group(function (RouterDispatcher $router) {
    $router->get("/dashboard", [DashboardController::class, "index"]);
    $router->get("/dashboard/stats", [DashboardController::class, "stats"]);
}, [
    GzipMiddleware::class,
]);
```

**Group with a URL prefix and middleware**:

```php
$router->group("/api", function (RouterDispatcher $router) {
    $router->get("/{page:show}", [HelloWorldController::class, "show"]);
}, [
    GzipMiddleware::class,
]);
// Matches: GET /api/show
```

Middleware in a group runs for routes defined inside that group, in addition to global middleware from `configs/http.php`.

## Reading route parameters

Inject `PathInterface` into your controller action to access named route parameters:

```php
use MaplePHP\Http\Interfaces\PathInterface;

public function show(ResponseInterface $response, PathInterface $path): ResponseInterface
{
    // Reads the {id} segment from the matched route
    $id = $path->select("id")->last();

    // Build a URI relative to the current request
    $url = $path->uri()->withPath("/users");

    // ...
}
```

## CLI routes

Define CLI commands in `routes/console.php`:

```php
// routes/console.php
use App\Commands\ImportCommand;

$router->cli("import", [ImportCommand::class, "index"]);
```

Run with:

```bash
./maple import --file=data.csv
```

See [CLI Commands →](/docs/cli/commands) for how to write command classes.
