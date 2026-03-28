---
title: Layouts and Partials
sidebar_position: 2
description: Structuring views with layouts, blocks, includes, and the app global in MaplePHP.
---

# Layouts and Partials

This page covers how to organize your Twig templates in MaplePHP using inheritance, includes, and the automatically available `app` global.

For general Twig syntax, see the [Twig documentation](https://twig.symfony.com/).

## The `app` global

MaplePHP automatically registers an `app` variable in every template. This is the `App` singleton instance, giving you access to application-level data:

```twig
<title>{{ app.app_title }}</title>
```

The `app` global is registered by the `Twig` support class when it is constructed, so it is available in all templates without any extra setup.

## Base layout

The convention is to use `resources/index.twig` as the base layout. Define the shared HTML shell and expose blocks that child templates fill:

```twig
{# resources/index.twig #}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}{{ app.app_title }}{% endblock %}</title>
    {% block head %}{% endblock %}
</head>
<body>
    {% block content %}{% endblock %}
</body>
</html>
```

### Common blocks

A typical layout defines at least these blocks:

| Block | Purpose |
|---|---|
| `title` | Page title — child views override to set per-page titles |
| `head` | Extra `<link>`, `<meta>`, or `<script>` tags |
| `content` | Main page body |

You can add more blocks as your layout grows — a `footer` block, a `sidebar` block, etc.

## Extending the layout

Every view template extends the base layout and fills the blocks it needs:

```twig
{# resources/views/about.twig #}
{% extends "index.twig" %}

{% block title %}About — {{ parent() }}{% endblock %}

{% block content %}
    <h1>About</h1>
    <p>Welcome to the about page.</p>
{% endblock %}
```

`parent()` renders the parent block's content, so the title becomes "About — My App" if that is what the base layout's title block contains.

## Including partials

Break repeated markup into partial templates and include them:

```
resources/
├── index.twig
├── partials/
│   ├── nav.twig
│   └── footer.twig
└── views/
    └── home.twig
```

```twig
{# resources/index.twig #}
<body>
    {% include "partials/nav.twig" %}
    {% block content %}{% endblock %}
    {% include "partials/footer.twig" %}
</body>
```

Included templates have access to the same variables as the parent template, including the `app` global.

### Passing variables to partials

Pass specific variables with the `with` keyword, and use `only` to restrict the partial's scope:

```twig
{% include "partials/card.twig" with { title: 'Hello', body: 'Content here' } only %}
```

## Using `embed` for overridable components

`embed` combines `include` and `extends` — it includes a template but lets you override its blocks:

```twig
{# resources/partials/card.twig #}
<div class="card">
    <div class="card-header">{% block header %}Default header{% endblock %}</div>
    <div class="card-body">{% block body %}{% endblock %}</div>
</div>
```

```twig
{# resources/views/home.twig #}
{% extends "index.twig" %}

{% block content %}
    {% embed "partials/card.twig" %}
        {% block header %}Featured{% endblock %}
        {% block body %}<p>Card content goes here.</p>{% endblock %}
    {% endembed %}
{% endblock %}
```

## Using macros for reusable snippets

Macros work like functions inside templates. Define them in a dedicated file:

```twig
{# resources/macros/forms.twig #}
{% macro input(name, value, type, placeholder) %}
    <input type="{{ type|default('text') }}"
           name="{{ name }}"
           value="{{ value|e }}"
           placeholder="{{ placeholder|default('') }}">
{% endmacro %}
```

Import and use them in any template:

```twig
{% import "macros/forms.twig" as forms %}

{{ forms.input('email', '', 'email', 'you@example.com') }}
{{ forms.input('name', '', 'text', 'Your name') }}
```

## Suggested directory structure

As your application grows, a structure like this keeps things manageable:

```
resources/
├── index.twig              # Base layout
├── partials/               # Shared partials (nav, footer, etc.)
│   ├── nav.twig
│   └── footer.twig
├── macros/                 # Reusable macros
│   └── forms.twig
├── views/                  # Page templates
│   ├── home.twig
│   ├── about.twig
│   └── contact.twig
└── errors/                 # Error pages
    └── error.twig
```

All paths passed to `render()` in your controllers are relative to `resources/`.
