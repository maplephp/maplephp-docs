---
title: Introduction
sidebar_position: 1
description: What MaplePHP is and what it provides.
---

# MaplePHP

MaplePHP is a high-performance PHP 8.2+ framework built on PSR standards and modern best practices. It provides the core infrastructure needed for real applications — MVC architecture, dependency injection, routing, middleware, caching, logging, error handling, and full support for both web and CLI environments — while keeping every component swappable.

The goal is not to lock you into a fixed ecosystem. Each `maplephp/*` library is independently installable and PSR-compliant. You shape the framework around your own stack and workflow, while still benefiting from updates to the core.

:::warning Beta
This framework is currently in beta. Use `--stability=beta` when installing.
:::

## What MaplePHP provides

| Area | What you get |
|---|---|
| HTTP | PSR-7 request/response, PSR-15 middleware pipeline, FastRoute routing |
| CLI | Command system, interactive prompts, scaffolding via `./maple make` |
| DI | PSR-11 container with reflection-based constructor autowiring |
| Database | Doctrine DBAL query builder, schema migration runner |
| Views | Twig template engine with layout inheritance and caching |
| Caching | PSR-6 and PSR-16 with FileSystem and Memcached handlers |
| Logging | PSR-3 with StreamHandler (rotation), ErrorLogHandler, DBHandler |
| Validation | 50+ validators with fluent chaining |
| Testing | `maplephp/unitary` — 100k+ tests/sec, built-in mocking |

## PSR compliance

MaplePHP is built around PSR standards throughout:

- **PSR-3** — logging
- **PSR-6 / PSR-16** — caching
- **PSR-7** — HTTP messages
- **PSR-11** — dependency injection container
- **PSR-15** — middleware pipeline

Every `maplephp/*` package can be used standalone or replaced with any PSR-compatible alternative.

## Where to start

- **[Installation →](/docs/getting-started/installation)** — install the framework, start the dev server
- **[Project Structure →](/docs/getting-started/project-structure)** — understand the directory layout
- **[Routing →](/docs/core/routing)** — define HTTP and CLI routes
- **[Library Ecosystem →](/docs/ecosystem)** — all available packages
