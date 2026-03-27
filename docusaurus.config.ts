import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'MaplePHP',
  tagline: 'Your code. Your libraries. Your framework.',
  favicon: 'img/favicon.ico',

  url: 'https://maplephp.github.io',
  baseUrl: '/',

  organizationName: 'maplephp',
  projectName: 'maplephp-docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },

    navbar: {
      title: 'MaplePHP',
      logo: {
        alt: 'MaplePHP Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/maplephp',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Introduction', to: '/docs/intro' },
            { label: 'Installation', to: '/docs/getting-started/installation' },
            { label: 'Routing', to: '/docs/core/routing' },
          ],
        },
        {
          title: 'Packages',
          items: [
            { label: 'maplephp/core', href: 'https://github.com/maplephp/core' },
            { label: 'maplephp/http', href: 'https://github.com/maplephp/http' },
            { label: 'maplephp/validate', href: 'https://github.com/maplephp/validate' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'GitHub', href: 'https://github.com/maplephp' },
            { label: 'Unitary Testing', href: 'https://maplephp.github.io/unitary/' },
          ],
        },
      ],
      copyright: `MaplePHP — PHP 8.2+ · PSR-compliant · Beta`,
    },

    prism: {
      theme: prismThemes.oneDark,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ['php', 'bash', 'json'],
    },

    docs: {
      sidebar: {
        hideable: false,
        autoCollapseCategories: false,
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
