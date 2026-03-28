---
title: Command Reference
sidebar_position: 2
description: All built-in maple CLI commands.
---

# CLI Command Reference

All commands are invoked via the `./maple` entry point in the project root.

## Development server

| Command | Description |
|---|---|
| `./maple serve` | Start the development server on `localhost:8000` |
| `./maple serve --host=0.0.0.0 --port=8080` | Custom host and port |

## Code generation

| Command | Description |
|---|---|
| `./maple make --type=controller --name=User` | Generate a controller class |
| `./maple make --type=service --name=User` | Generate a service class |
| `./maple make --type=migration --name=CreateUsers` | Generate a migration class |
| `./maple make --type=command --name=Import` | Generate a CLI command class |

__Or just run `maple make` and and follow the instructions.__

Generated files are placed in the expected directory with the correct namespace pre-filled.

## Migrations

| Command | Description |
|---|---|
| `./maple migrate` | Run all pending migrations |
| `./maple migrate:up` | Step one migration up |
| `./maple migrate:down` | Step one migration down |
| `./maple migrate:fresh` | Roll all migrations down then back up |
| `./maple migrate:clear` | Roll all migrations down |
| `./maple migrate --name=CreateUsers` | Run one specific migration by name (always re-runs) |

## Custom commands

Custom commands are defined in `app/Commands/` and registered in `routes/console.php`. See [Writing Commands →](/docs/cli/commands).
