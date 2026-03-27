---
title: Writing Commands
sidebar_position: 1
description: Create and register CLI commands in MaplePHP.
---

# Writing Commands

CLI commands extend `MaplePHP\Core\Routing\DefaultCommand`. Generate a scaffold with:

```bash
./maple make --type=command --name=Import
```

## Anatomy of a command

```php
// app/Commands/ImportCommand.php
namespace App\Commands;

use MaplePHP\Core\Routing\DefaultCommand;
use MaplePHP\Core\Console\ArgDefinition;

class ImportCommand extends DefaultCommand
{
    public static function name(): string
    {
        return 'import';
    }

    public static function description(): string
    {
        return 'Import records from a CSV file';
    }

    protected function args(): array
    {
        return [
            new ArgDefinition('file',  'Path to the CSV file',       required: true),
            new ArgDefinition('limit', 'Maximum rows to import',     required: false),
        ];
    }

    public function index(): void
    {
        $file  = $this->args['file']  ?? '';
        $limit = $this->args['limit'] ?? null;

        $this->command->message("Importing from: {$file}");

        // ... import logic ...

        $this->command->message("Done.");
    }
}
```

## Register the command

Add the route in `routers/console.php`:

```php
// routers/console.php
$router->cli("import", [App\Commands\ImportCommand::class, "index"]);
```

## Run it

```bash
./maple import --file=data.csv --limit=500
```

## Interactive prompts

For interactive CLI input, use `maplephp/prompts` directly. It provides `text`, `password`, `toggle`, `select`, `list`, `confirm`, and progress bar prompt types.

See the [maplephp/prompts](https://github.com/maplephp/prompts) repository for usage.
