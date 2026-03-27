---
title: Twig Templates
sidebar_position: 1
description: Using Twig for templating in MaplePHP.
---

# Twig Templates

MaplePHP ships with built-in Twig support via `TwigServiceProvider` and the `MaplePHP\Core\Support\Twig` helper.

## Setup

Add `TwigServiceProvider` to `configs/providers.php`:

```php
// configs/providers.php
return [
    \MaplePHP\Core\Providers\DatabaseProvider::class,
    \MaplePHP\Core\Providers\TwigServiceProvider::class,
];
```

The provider registers a `Twig\Environment` in the container. It uses `resources/` as the template root, enables file caching in production, and enables debug mode in development automatically.

## Template structure

```
resources/
├── index.twig          # Base layout — extend this in every view
├── views/              # View templates
│   └── hello.twig
└── errors/             # Error page templates
    └── error.twig
```

## Rendering in a controller

Inject `MaplePHP\Core\Support\Twig` as a parameter — the framework resolves it automatically:

```php
// app/Controllers/HelloController.php
namespace App\Controllers;

use MaplePHP\Core\Routing\DefaultController;
use MaplePHP\Core\Support\Twig;
use MaplePHP\Http\Interfaces\PathInterface;

class HelloController extends DefaultController
{
    public function show(Twig $twig, PathInterface $path): void
    {
        $twig->render('views/hello.twig', [
            'title' => 'Hello',
            'name'  => $path->select("name")->last() ?: 'World',
        ]);
    }
}
```

`render()` writes the rendered HTML to the response body. The path is relative to `resources/`.

## Layout and inheritance

`resources/index.twig` is the base layout. Define shared HTML structure there and expose named blocks:

```twig
{# resources/index.twig #}
<!doctype html>
<html>
<head>
    <title>{% block title %}My App{% endblock %}</title>
</head>
<body>
    {% block content %}{% endblock %}
</body>
</html>
```

A child view extends it and fills the blocks:

```twig
{# resources/views/hello.twig #}
{% extends "index.twig" %}

{% block title %}{{ title }}{% endblock %}

{% block content %}
    <h1>Hello, {{ name }}!</h1>
{% endblock %}
```

## Twig environment access

To add globals, extensions, or filters, access the underlying environment via `$twig->getEnvironment()`:

```php
$twig->getEnvironment()->addGlobal('app_name', 'My App');
```

## Twig error pages

`TwigErrorPage` renders `resources/errors/error.twig`. Available template variables:

| Variable | Description |
|---|---|
| `{{ code }}` | HTTP status code (404, 500, …) |
| `{{ message }}` | Reason phrase or custom `abort()` message |
| `{{ uri }}` | The request URI that triggered the error |
| `{{ context }}` | Full context array from `abort()` |

See [Error Handling →](/docs/http/error-handling) for how to register `TwigErrorPage` as the error renderer.
