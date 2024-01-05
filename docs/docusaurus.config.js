// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

require('dotenv').config()

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

let googleTagManager

if (process.env.GOOGLE_TAG_MANAGER_ID) {
  googleTagManager = {
    containerId: process.env.GOOGLE_TAG_MANAGER_ID,
  }
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  title: 'Composable UI',
  tagline: 'Open Source React Storefront for Composable Commerce',
  url: 'https://docs.composable.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/composable-com/composable-ui/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },

        googleTagManager,
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: {
          alt: 'Logo',
          src: 'img/logo.svg',
          srcDark: 'img/logo-dark.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'getting_started/intro',
            position: 'left',
            label: 'Getting Started',
          },
          {
            type: 'doc',
            docId: 'essentials/project_structure',
            position: 'left',
            label: 'Essentials',
          },
          {
            type: 'doc',
            docId: 'design/components_and_theme',
            position: 'left',
            label: 'Design + Theme',
          },
          {
            type: 'doc',
            docId: 'integrations/overview',
            position: 'left',
            label: 'Integrations',
          },
          {
            type: 'doc',
            docId: 'build_and_deploy/deploy',
            position: 'left',
            label: 'Build & Deploy',
          },
          {
            type: 'doc',
            docId: 'community/contribution_basics',
            position: 'left',
            label: 'Community',
          },
          {
            href: 'https://github.com/composable-com/composable-ui',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: 'docs/getting_started/intro',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'License',
                to: 'https://github.com/composable-com/composable-ui/blob/main/LICENSE',
              },
              {
                label: 'Security',
                to: 'https://github.com/composable-com/composable-ui/blob/main/SECURITY.md',
              },
            ],
          },
          {
            title: 'Links',
            items: [
              {
                label: 'Composable.com',
                href: 'https://composable.com',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/composable-com/composable-ui',
              },
            ],
          },
        ],
        copyright: `Built with Docusaurus. ©Copyright 2023 Orium. All Rights Reserved.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
}

module.exports = config
