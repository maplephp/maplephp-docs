---
title: Library Ecosystem
sidebar_position: 9
description: All maplephp/* packages and what they provide.
---

# Library Ecosystem

Each `maplephp/*` package is a standalone, independently installable Composer library. The framework skeleton wires them together, but any package can be used in a different project without the rest of the framework.

## Package overview

| Package | PSR | Description |
|---|---|---|
| [maplephp/core](https://github.com/maplephp/core) | PSR-11, PSR-15 | HttpKernel, CliKernel, App singleton, router dispatcher, DB query builder, migration runner |
| [maplephp/http](https://github.com/maplephp/http) | PSR-7 | ServerRequest, Response, Stream, Uri, UploadedFile, HTTP client (cURL), safe Input helper |
| [maplephp/container](https://github.com/maplephp/container) | PSR-11 | DI container with reflection-based autowiring and factory support |
| [maplephp/emitron](https://github.com/maplephp/emitron) | PSR-15 | Middleware dispatcher; built-in: OutputBuffer, Gzip, ContentLength, HeadRequest, CacheControl, Emitter |
| [maplephp/dto](https://github.com/maplephp/dto) | — | Safe data traversal, dot-notation access, type coercion, string / number / date / HTML formatting |
| [maplephp/validate](https://github.com/maplephp/validate) | — | 50+ validators: email, phone, URL, credit card, dates, passwords, identity numbers. Fluent chaining. |
| [maplephp/log](https://github.com/maplephp/log) | PSR-3 | Logger with StreamHandler (auto-rotation), ErrorLogHandler, DBHandler |
| [maplephp/cache](https://github.com/maplephp/cache) | PSR-6, PSR-16 | FileSystem and Memcached handlers behind a unified SimpleCache interface |
| [maplephp/blunder](https://github.com/maplephp/blunder) | PSR-7 | Error/exception handling: HTML, JSON, XML, CLI, PlainText, Silent output handlers |
| [maplephp/prompts](https://github.com/maplephp/prompts) | — | Interactive CLI: text, password, toggle, select, list, confirm, progress bar |
| [maplephp/unitary](https://github.com/maplephp/unitary) | — | Testing framework: 100k+ tests/sec, built-in mocking, zero external dependencies |

## PSR compliance summary

| PSR | Implemented by |
|---|---|
| PSR-3 (Logging) | `maplephp/log` |
| PSR-6 (Caching) | `maplephp/cache` |
| PSR-7 (HTTP Messages) | `maplephp/http` |
| PSR-11 (Container) | `maplephp/container` |
| PSR-15 (Middleware) | `maplephp/emitron` |
| PSR-16 (Simple Cache) | `maplephp/cache` |

All PSR implementations are interface-compatible. You can replace any package with an alternative that implements the same PSR interface without modifying application code.
