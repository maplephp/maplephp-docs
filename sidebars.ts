import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/installation',
        'getting-started/project-structure',
      ],
    },
    {
      type: 'category',
      label: 'Core',
      collapsed: false,
      items: [
        'core/app-singleton',
        'core/routing',
        'core/controllers',
        'core/services',
        'core/service-providers',
        'core/bindings',
      ],
    },
    {
      type: 'category',
      label: 'HTTP Layer',
      collapsed: false,
      items: [
        'http/middleware',
        'http/validation',
        'http/aborting-requests',
        'http/error-handling',
      ],
    },
    {
      type: 'category',
      label: 'Views',
      collapsed: false,
      items: [
        'views/twig-templates',
        'views/layouts-and-partials',
        'views/extending-twig',
      ],
    },
    {
      type: 'category',
      label: 'Database',
      collapsed: false,
      items: [
        'database/query-builder',
        'database/migrations',
      ],
    },
    {
      type: 'category',
      label: 'Infrastructure',
      collapsed: false,
      items: [
        'infrastructure/caching',
        'infrastructure/logging',
      ],
    },
    {
      type: 'category',
      label: 'CLI',
      collapsed: false,
      items: [
        'cli/commands',
        'cli/command-reference',
      ],
    },
    {
      type: 'doc',
      id: 'testing',
      label: 'Testing',
    },
    {
      type: 'doc',
      id: 'ecosystem',
      label: 'Library Ecosystem',
    },
    {
      type: 'doc',
      id: 'configuration',
      label: 'Configuration Reference',
    },
  ],
};

export default sidebars;
