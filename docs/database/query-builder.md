---
title: Query Builder
sidebar_position: 1
description: The MaplePHP DB query builder built on Doctrine DBAL.
---

# Query Builder

The database layer is built on [Doctrine DBAL](https://www.doctrine-project.org/projects/dbal.html) and exposed through a fluent query builder. Enable it by adding `DatabaseProvider` to `configs/services.php`.

## Configuration

Set credentials in `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=my_app
DB_USERNAME=root
DB_PASSWORD=
```

The `configs/database.php` file reads these values:

```php
// configs/database.php
return [
    'default' => env('DB_CONNECTION'),
    'connections' => [
        'mysql' => [
            'driver'   => 'pdo_mysql',
            'host'     => env('DB_HOST', '127.0.0.1'),
            'port'     => env('DB_PORT', 3306),
            'dbname'   => env('DB_DATABASE', ''),
            'user'     => env('DB_USERNAME', ''),
            'password' => env('DB_PASSWORD', ''),
            'charset'  => 'utf8mb4',
        ],
        'sqlite' => [
            'driver' => 'pdo_sqlite',
            'file'   => env('DB_DATABASE', 'database.sqlite'),
        ],
        'test' => [
            'driver' => 'pdo_sqlite',
            'memory' => true,
        ],
    ],
];
```

## Querying

`DB::table()` returns a `QueryBuilder` instance. Chain methods to build and execute queries.

```php
use MaplePHP\Core\Support\Database\DB;

// Fetch all rows
$users = DB::table('users')->where('status', '=', 1)->get();

// Fetch a single row
$user = DB::table('users')->where('id', '=', $id)->first();

// Fetch a single column value from the first row
$email = DB::table('users')->where('id', '=', $id)->value('email');

// Fetch a flat array of one column across all rows
$ids = DB::table('users')->pluck('id');

// Check existence
$exists = DB::table('users')->where('email', '=', $email)->exists();

// Count rows
$total = DB::table('users')->count();
```

## Pagination

```php
$result = DB::table('users')
    ->orderByDesc('created_at')
    ->paginate(page: 1, perPage: 20);

// $result['data']       — rows for this page
// $result['total']      — total row count
// $result['last_page']  — number of pages
```

## Conditional clauses

```php
$users = DB::table('users')
    ->when($search !== null, fn($q) => $q->where('name', 'LIKE', "%{$search}%"))
    ->orderByAsc('name')
    ->get();
```

`when()` is useful for optional filters — it adds the clause only when the condition is true.

## Insert, update, delete

```php
// Insert
DB::insert('users', ['email' => 'user@example.com', 'status' => 1]);

// Update
DB::update('users', ['status' => 0], ['id' => $id]);

// Delete
DB::delete('users', ['id' => $id]);
```

## Transactions

```php
DB::transaction(function ($conn) use ($data) {
    DB::insert('orders', $data['order']);
    DB::insert('order_items', $data['items'][0]);
});
```

## Raw queries

```php
$rows = DB::select('SELECT * FROM users WHERE status = ?', [1]);
```
