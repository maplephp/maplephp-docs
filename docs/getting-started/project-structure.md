---
title: Project Structure
sidebar_position: 2
description: Directory layout of a MaplePHP project.
---

# Project Structure

```
my-app/
├── app/
│   ├── Controllers/     # HTTP controllers — extend DefaultController
│   ├── Services/        # Business logic — plain classes, autowired by DI
│   ├── Commands/        # CLI commands — extend DefaultCommand
│   └── Providers/       # Custom service providers — extend ServiceProvider
├── configs/
│   ├── configs.php      # App settings: title, environment, timezone, locale
│   ├── database.php     # Database connections (MySQL, SQLite, in-memory test)
│   ├── http.php         # Middleware pipeline configuration
│   └── providers.php    # Service providers to register and boot
├── database/
│   └── migrations/      # Schema migration classes (timestamped filenames)
├── public/
│   └── index.php        # Web entry point — boots HttpKernel
├── routers/
│   ├── web.php          # HTTP routes (FastRoute-based)
│   └── console.php      # CLI command routes
├── storage/             # Cache files, logs, and temp data (must be writable)
├── tests/               # Test files — run with vendor/bin/unitary
└── maple                # CLI entry point — boots CliKernel
```

## Directory reference

### `app/`

Application code. MaplePHP doesn't enforce a namespace convention beyond the scaffolded structure, but `App\` is the default.

| Directory | Purpose |
|---|---|
| `app/Controllers/` | HTTP request handlers. Extend `DefaultController`. |
| `app/Services/` | Business logic classes. No base class required — autowired by the DI container. |
| `app/Commands/` | CLI command handlers. Extend `DefaultCommand`. |
| `app/Providers/` | Service providers for registering services into the container. |

### `configs/`

All PHP config files return arrays. The framework merges them and makes the result available as `$this->config` inside controllers.

| File | Purpose |
|---|---|
| `configs.php` | App name, environment, timezone, locale |
| `database.php` | Database connection definitions |
| `http.php` | Global middleware pipeline |
| `providers.php` | List of service provider class names to register |

### `routers/`

| File | Purpose |
|---|---|
| `web.php` | HTTP route definitions. The `$router` variable is injected automatically. |
| `console.php` | CLI command route definitions. |

### `public/`

The web root. Only `public/` should be exposed by the web server. `index.php` boots the `HttpKernel` and handles the incoming request.

### `storage/`

Runtime data. Must be writable by the web server.

- `storage/cache/` — cache files (used by `FileSystemHandler`)
- `storage/logs/` — log files (used by `StreamHandler`)

### `database/migrations/`

Migration classes are timestamped: `2026-01-01-000000_CreateUsersMigration.php`. Generate scaffolds with `./maple make --type=migration --name=Name`.

### `maple`

The CLI entry point. Boots `CliKernel` and dispatches commands defined in `routers/console.php`.

## Generated scaffolds

Use `./maple make` to generate class stubs:

```bash
./maple make --type=controller --name=User
./maple make --type=service --name=User
./maple make --type=migration --name=CreateUsers
./maple make --type=command --name=Import
```

Files are placed in the expected directories with correct namespaces pre-filled.
