---
title: Migrations
sidebar_position: 2
description: Schema migrations using Doctrine DBAL in MaplePHP.
---

# Migrations

MaplePHP's migration runner uses Doctrine DBAL for schema operations. Migration files live in `database/migrations/` and are named with a timestamp prefix.

## Generating a migration

```bash
./maple make --type=migration --name=CreateUsers
```

This creates a file like `database/migrations/2026-01-01-000000_CreateUsersMigration.php`.

## Writing a migration

```php
// database/migrations/2026-01-01-000000_CreateUsersMigration.php
namespace Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\DBAL\Schema\PrimaryKeyConstraint;
use MaplePHP\Core\Support\Database\Migrations;

class CreateUsersMigration extends Migrations
{
    public function up(Schema $schema): void
    {
        $table = $schema->createTable('users');
        $table->addColumn('id',     'integer', ['autoincrement' => true]);
        $table->addColumn('email',  'string',  ['length' => 255]);
        $table->addColumn('status', 'integer', ['default' => 0]);

        $table->addPrimaryKeyConstraint(
            PrimaryKeyConstraint::editor()
                ->setUnquotedColumnNames('id')
                ->create()
        );

        $table->addIndex(['status']);
    }

    public function down(Schema $schema): void
    {
        $schema->dropTable('users');
    }
}
```

- `up()` defines the forward schema change.
- `down()` defines the rollback.

## Running migrations

```bash
# Run all pending migrations
./maple migrate

# Step one migration up
./maple migrate:up

# Step one migration down
./maple migrate:down

# Roll all down, then back up
./maple migrate:fresh

# Roll all migrations down
./maple migrate:clear

# Run one specific migration by name (always re-runs)
./maple migrate --name=CreateUsers
```

For the full list, see [CLI Command Reference →](/docs/cli/command-reference).
