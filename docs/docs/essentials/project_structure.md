---
sidebar_position: 1
---
# Project Repository Structure

This topic provides details about the directory structure of the `composable-ui` code repository and the different files within the repository. Before you can start developing your commerce integrations or solution, you must get access to the `composable-ui` repository and complete the setup as described in the [README](https://github.com/composable-com/composable-ui#readme) file.

## Project Directories

The Composable UI repository has the following directories:

- `docs`: The Composable UI documentation files in Markdown. The documentation site is built using Docusaurus. You can build a documentation site on your local development machine by running the `yarn install && yarn start` command within the `docs` directory.
- `composable-ui`: Contains the Composable UI Next.js application files, which are deployed after the development.
- `packages`: Consists of the user interface components for different purposes, such as integrations. You can use this directory to manage your custom integrations.
- `scripts`: Consists of the node applications to assist with setting up your third party APIs, such as Algolia.
- `storybook`: Consists of the configurations to deploy and view all your user interface components.

Additionally, the repository consists of other configuration files, such as `turbo.json` and `package.json`, that consists of various configuration settings for development and deployment.

## The Composable UI Next.js application

The Composable UI Next.js application is located in the `composable-ui` directory and consists of the following:

| File/directory name |Description |
| - | - |
|`next.config.js`| Imports configuration object for Composable UI and includes options for configuring various features of Next.js, such as React strict mode, image optimization, internationalization, and experimental features. You can also include other Next.js configurations in this file. For more information, see the [`next.config.js`](https://nextjs.org/docs/api-reference/next.config.js/introduction) documentation. |
|`composable-ui/src/pages` | Contains Next.js page routes and dynamic routes. For more information, see the [Next.js Pages](https://nextjs.org/docs/basic-features/pages) page.|
|`composable-ui/src/pages/api`| Consists of the [Next.js API routes](https://nextjs.org/docs/api-routes/introduction) that are used to integrate to third-party APIs and provide data to the NextJS application.|
| `composable-ui/src/components`| Consists of the React components and the layouts that the application uses.|
| `composable-ui/src/hooks` | Consists of the hooks related to integrations and custom hooks used by Composable UI.|
| `composable-ui/public/img` | Contains publicly accessible assets, such as images. For more information, see the [Next.js Static File Serving](https://nextjs.org/docs/basic-features/static-file-serving) page.|
|`scripts`| Contains additional scripts and utilities related to integrations.|

## Related Resources

- [Next.js Building Your Application](https://nextjs.org/docs/pages/building-your-application/routing)
- [Comopsable UI environment variable configuration](/docs/essentials/configuration)
