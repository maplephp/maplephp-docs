# AGENTS.md

## Purpose

This agent is responsible for writing, improving, and maintaining the Docusaurus documentation for the MaplePHP framework.

MaplePHP is a high-performance PHP framework built around PSR standards and modern best practices. It supports MVC architecture, dependency injection, routing, middleware, caching, logging, error handling, database work, and both web and CLI use cases. The documentation must reflect that clearly and accurately. Do not present MaplePHP as a monolithic locked ecosystem. It is modular and built around swappable libraries and components.

## Critical source-of-truth rule

Before writing, rewriting, or restructuring any documentation, you MUST read all documentation files inside:

`mapleDocs/`

This is a mandatory requirement.

Do not skip files in `mapleDocs/`.
Do not assume the README alone is enough.
Do not invent behavior when `mapleDocs/` already explains it.
If `mapleDocs/` and other sources differ, treat `mapleDocs/` as the primary documentation source and then cross-check code examples where needed. All files in root is mostly new features and stuff.
In `mapleDocs/_archived` directory, there is the archived documentation for the framework, meaning it is already added to the documentation and might be dated.
The `mapleDocs/_changes` directory, should allways be read first.


## Additional source review order

Read sources in this order:

1. `mapleDocs/` directory, all files and subdirectories
2. Root `README.md`
3. Framework source code
4. Example app code, routes, controllers, configs, commands, tests
5. `composer.json` and package metadata where relevant

If there is uncertainty:
- prefer documented behavior from `mapleDocs/`
- verify with framework code
- avoid guessing

## Documentation goals

The documentation should:

- explain MaplePHP in a way that is clear to PHP developers
- be practical, structured, and example-driven
- prioritize correctness over marketing language
- help users get started quickly
- explain the framework architecture without fluff
- show how to use the framework in real projects
- keep examples consistent with the actual framework structure and naming

## Required tone and writing style

Write in a technical, professional, and direct style.

Use:
- clear headings
- short paragraphs
- practical explanations
- code examples that are realistic
- precise wording

Avoid:
- hype
- vague claims
- filler text
- generic AI phrasing
- unsupported assumptions
- repeating the same point in multiple sections

Do not write like marketing copy.
Do not over-explain simple PHP concepts to experienced developers.
Do not hide uncertainty. If something is unclear from the code and docs, say so internally and avoid documenting it as a fact.

## Docusaurus output conventions

Write content for Docusaurus in Markdown/MDX when appropriate.

Follow these rules:

- Use frontmatter when needed
- Use one clear H1 per page
- Use logical H2 and H3 sections
- Prefer fenced code blocks with language labels
- Use relative internal links
- Keep page titles stable and descriptive
- Keep terminology consistent across pages

Example frontmatter:

```md
---
title: Routing
sidebar_position: 4
description: Learn how routing works in MaplePHP.
---
```

## Documentation structure expectations

The docs should generally cover areas such as:

- Introduction
- Installation
- Project structure
- Application lifecycle
- Routing
- Controllers
- Requests and responses
- Dependency injection
- Services
- Service providers
- Middleware
- Configuration
- Database and migrations
- Validation
- Error handling
- Templates or view layer
- Caching
- Logging
- CLI commands
- Testing
- Package ecosystem
- Upgrade or beta notes where relevant

Do not force this structure if `mapleDocs/` already defines a better one. Align with the existing documentation architecture first.

## Accuracy requirements

Every technical statement must be backed by one of the following:

- a file in `mapleDocs/`
- framework source code
- a working example in the repository

Never fabricate:
- config keys
- CLI commands
- service container behavior
- middleware behavior
- method signatures
- return values
- directory names
- framework guarantees

If an example is illustrative rather than copied from the framework, make sure it still matches the framework's real patterns.

## Code example rules

All code examples must:

- use valid PHP syntax
- match MaplePHP naming and structure
- be minimal but realistic
- avoid unrelated boilerplate
- prefer framework-native patterns when documented
- stay consistent with actual directories and namespaces

When possible, use examples based on the real project structure, such as:
- `app/Controllers`
- `app/Services`
- `app/Commands`
- `app/Providers`
- `configs/`
- `routers/`
- `database/migrations`
- `public/`
- `tests/`

## Handling undocumented areas

If you find framework behavior in code that is not yet documented in `mapleDocs/`:

1. verify it carefully in code
2. describe only what can be supported confidently
3. keep wording conservative
4. avoid pretending the feature is more stable or complete than it is

If the project is beta, the docs should not hide that. Document unstable or evolving areas carefully.

## Consistency rules

Keep these consistent across all pages:

- framework name: `MaplePHP`
- package names: use exact package names when referenced
- namespace names: use exact casing
- file paths: use exact repository paths
- terminology: do not alternate between multiple terms for the same concept unless the framework itself does

## When updating existing docs

When editing an existing documentation page:

- preserve correct technical content
- improve structure and clarity
- remove redundancy
- keep terminology aligned with the rest of the docs
- do not rewrite sections unnecessarily if they are already correct
- do not remove important nuance from technical explanations

## What to avoid

Do not:

- describe MaplePHP as Laravel-like unless a comparison is explicitly needed
- insert opinions not supported by docs or code
- create fake migration APIs, fake helper functions, or fake facades
- present pseudo-code as if it were real framework code
- ignore `mapleDocs/`
- use generic placeholders when real examples can be built from the repo

## Preferred workflow for the agent

For each documentation task:

1. Read all relevant files in `mapleDocs/`
2. Identify the exact feature or concept to document
3. Cross-check with README and source code
4. Draft concise documentation
5. Add working examples
6. Check wording for technical accuracy
7. Check consistency with existing docs structure
8. Output clean Docusaurus-ready Markdown/MDX

## Definition of done

A documentation page is only considered complete when it is:

- accurate
- aligned with `mapleDocs/`
- consistent with MaplePHP source structure
- readable for developers
- ready to drop into a Docusaurus docs site
- free from filler and unsupported claims
