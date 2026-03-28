---
title: Extending Twig
sidebar_position: 3
description: Adding custom globals, filters, functions, and extensions to Twig in MaplePHP.
---

# Extending Twig

MaplePHP gives you access to the underlying `Twig\Environment` so you can register custom globals, filters, functions, and extensions. For the full Twig extension API, see the [Twig documentation](https://twig.symfony.com/doc/3.x/advanced.html).

## Accessing the environment

From any controller or service that receives the `Twig` helper, call `getEnvironment()`:

```php
use MaplePHP\Core\Support\Twig;

class PageController extends DefaultController
{
    public function show(Twig $twig): void
    {
        $env = $twig->getEnvironment();

        // Register things before rendering
        $env->addGlobal('year', date('Y'));

        $twig->render('views/page.twig', ['title' => 'Page']);
    }
}
```

## Adding globals

Globals are available in every template rendered by that environment instance. The `app` global is registered automatically — you can add more:

```php
$twig->getEnvironment()->addGlobal('app_name', 'My Application');
$twig->getEnvironment()->addGlobal('current_year', date('Y'));
```

```twig
<footer>&copy; {{ current_year }} {{ app_name }}</footer>
```

For globals that should be available on every request, register them in a [service provider](/docs/dependency-injection/service-providers):

```php
namespace App\Providers;

use MaplePHP\Core\Providers\ServiceProvider;
use Psr\Container\ContainerInterface;
use Twig\Environment;

class TwigGlobalsProvider extends ServiceProvider
{
    public function register(ContainerInterface $container): void
    {
        $env = $container->get(Environment::class);
        $env->addGlobal('app_name', 'My Application');
        $env->addGlobal('current_year', date('Y'));
    }
}
```

Register the provider in `configs/services.php` **after** `TwigServiceProvider`:

```php
return [
    "providers" => [
        \MaplePHP\Core\Providers\TwigServiceProvider::class,
        \App\Providers\TwigGlobalsProvider::class,
    ],
];
```

## Adding filters

Filters transform values in templates. Register them with `addFilter()`:

```php
use Twig\TwigFilter;

$env = $twig->getEnvironment();
$env->addFilter(new TwigFilter('price', function (float $amount, string $currency = 'USD'): string {
    return number_format($amount, 2) . ' ' . $currency;
}));
```

```twig
{{ product.price|price }}          {# 29.99 USD #}
{{ product.price|price('EUR') }}   {# 29.99 EUR #}
```

## Adding functions

Functions are called directly in templates. Register them with `addFunction()`:

```php
use Twig\TwigFunction;

$env = $twig->getEnvironment();
$env->addFunction(new TwigFunction('asset', function (string $path): string {
    return '/assets/' . ltrim($path, '/');
}));
```

```twig
<link rel="stylesheet" href="{{ asset('css/app.css') }}">
<script src="{{ asset('js/app.js') }}"></script>
```

## Creating an extension class

When you have several related filters, functions, or globals, bundle them into a Twig extension:

```php
// app/Twig/AppExtension.php
namespace App\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use Twig\TwigFunction;

class AppExtension extends AbstractExtension
{
    public function getFilters(): array
    {
        return [
            new TwigFilter('price', [$this, 'formatPrice']),
            new TwigFilter('truncate', [$this, 'truncate']),
        ];
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('asset', [$this, 'asset']),
        ];
    }

    public function formatPrice(float $amount, string $currency = 'USD'): string
    {
        return number_format($amount, 2) . ' ' . $currency;
    }

    public function truncate(string $text, int $length = 100): string
    {
        if (mb_strlen($text) <= $length) {
            return $text;
        }
        return mb_substr($text, 0, $length) . '...';
    }

    public function asset(string $path): string
    {
        return '/assets/' . ltrim($path, '/');
    }
}
```

Register the extension in a service provider:

```php
$env = $container->get(Environment::class);
$env->addExtension(new \App\Twig\AppExtension());
```

## Debug mode

When `APP_ENV` is set to a development value, `TwigServiceProvider` enables debug mode automatically. This gives you access to the `dump()` function in templates:

```twig
{{ dump(variable) }}
```

In production, debug mode is disabled and template caching is enabled at `storage/cache/twig/`.
