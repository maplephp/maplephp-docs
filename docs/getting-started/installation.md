---
title: Installation
sidebar_position: 1
description: Install MaplePHP and start the development server.
---

# Installation

## Requirements

- PHP 8.2 or higher
- Composer

## Create a new project

```bash
composer create-project maplephp/maplephp my-app --stability=beta
cd my-app
./maple serve
```

Visit `http://localhost:8000` to see the default welcome page.

### Custom host and port

```bash
./maple serve --host=0.0.0.0 --port=8080
```

## Environment configuration

Edit `.env` and fill in your values:


```env
APP_TITLE=My App
APP_ENV=local
```

For database access, add the database credentials:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=my_app
DB_USERNAME=root
DB_PASSWORD=
```

## Your first route

Add a route in `routes/web.php`:

```php
// routes/web.php
$router->get("/hello/{name}", [App\Controllers\HelloController::class, "greet"]);
```

Create the controller in `app/Controllers/HelloController.php`:

```php
namespace App\Controllers;

use MaplePHP\Core\Routing\DefaultController;
use MaplePHP\Http\Interfaces\PathInterface;

class HelloController extends DefaultController
{
    public function greet(PathInterface $path): string
    {
        $name = $path->select("name")->last();
        return "Hello, {$name}!";
    }
}
```

Visit `http://localhost:8000/hello/World`.

## Next steps

- [Project Structure →](/docs/getting-started/project-structure)
- [Routing →](/docs/core/routing)
- [Controllers →](/docs/core/controllers)
