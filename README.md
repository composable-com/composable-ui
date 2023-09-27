
![Composable UI Logo](./docs/static/img/logo-dark.svg#gh-dark-mode-only)
![Composable UI Logo](./docs/static/img/logo.svg#gh-light-mode-only)

**Composable UI provides the foundation for building blazing-fast modern composable commerce sites. It is built with best-in-class technologies including React, Next.js, Typescript, Chakra UI, React Query, and tRPC.**

Composable UI can be integrated with any headless commerce, CMS, and other [MACH](https://machalliance.org/mach-technology) services of your choice, and comes pre-integrated with Algolia for product filtering, Stripe for payments, and mocked commerce and CMS services.

Composable UI offers the following:

- Composable UI app built with React & Next.js
- Figma Design Kit & Ready-to-Use Components Library
- Documentation
<!-- - Storybook -->

Composable UI is, and always will be, open source and freely available under the MIT license.

Start building your dream commerce site today with Composable UI!

---

## Table of Contents <!-- omit in toc -->

- [Resources](#resources)
- [Deployment / Installation](#deployment--installation)
  - [Option 1: Run in Localhost](#option-1-run-in-localhost)
  - [Option 2: 1-Click Deployments](#option-2-1-click-deployments)
  - [Option 3: Run in Docker](#option-3-run-in-docker)
- [Configuring Algolia and Stripe](#configuring-algolia-and-stripe)
  - [Algolia Setup](#algolia-setup)
  - [Stripe Setup](#stripe-setup)
- [Documentation Installation](#documentation-installation)
  - [Documentation Deployment](#documentation-deployment)
- [What's inside?](#whats-inside)
- [Next Steps](#next-steps)
- [How to Contribute](#how-to-contribute)

---

## Resources

📦 Installation: *See sections below for 1-click Deploy, Docker & Localhost*

🖥 Storefront: <https://storefront.composable.com>

📘 Documentation: <https://docs.composable.com>

<!--
📖 Storybook: https://storybook.composable.com
-->
🔆 Figma: <http://figma.composable.com>

ℹ️ Learn More: <https://www.composable.com>

---

## Deployment / Installation

There are multiple methods of running and deploying Composable UI.

Be sure to read the documentation on Composable UI's [environment variables](https://docs.composable.com/docs/essentials/configuration). When deploying to a cloud provider like Vercel or Netlify you must set the `NEXTAUTH_SECRET` environment variable. For more information on Composable UI environment variables, see the [Application Configuration](../essentials/configuration.md) section. See these links on how to set environment variables for [Netlify](https://docs.netlify.com/environment-variables/overview/) and [Vercel](https://vercel.com/docs/concepts/projects/environment-variables).

<!-- no toc -->
  - [Option 1: Run in Localhost](#option-1-run-in-localhost)
  - [Option 2: 1-Click Deployment ](#option-2-1-click-deployments)
  - [Option 3: Run in Docker](#option-3-run-in-docker)

You can host Composable UI on any service that supports Next.js.

After installing Composable UI, we recommend also taking a few moments to configure Algolia and Stripe to take full advantage of Composable UI's base features.

###  Option 1: Run in Localhost

To run locally, ensure that you have installed:

- Node.js v16.18.0 or higher
- pnpm v8.0 or higher

For more information about the installation, see the [Installation page](https://docs.composable.com/docs/getting_started/installation) section.

Perform the following operations in your terminal:

```sh
git clone https://github.com/composable-com/composable-ui
cd composable-ui
pnpm i
pnpm dev
```

You should now have the Composable UI application running locally. Go to your web browser and navigate to <http://localhost:3000>

### Option 2: 1-Click Deployments

Refer to the [1-Click deployment documentation](https://docs.composable.com/docs/build_and_deploy/deploy#deploy-composable-ui) to quickly and easily deploy Composable UI to a frontend cloud provider.


### Option 3: Run in Docker

You can also run the Composable UI app easily using Docker and not worry about local dependencies. If you don't already have Docker installed, first [install Docker](https://docs.docker.com/get-docker/) before proceeding below.

Clone, build and run the Docker image:

```sh
git clone https://github.com/composable-com/composable-ui
cd composable-ui
docker-compose up --build
```

You should now have the Composable UI application running through Docker. Go to your web browser and navigate to <http://localhost:3000>

---

## Configuring Algolia and Stripe

In order to take full advantage of Composable UI, you must configure Algolia and Stripe. If you do not, the Product Listing Page (PLP) and Checkout pages will not function correctly.

### Algolia Setup

You can use Algolia's free tier to get started.

[Follow the instructions](https://docs.composable.com/docs/integrations/search/algolia) in the documentation to configure Algolia.

### Stripe Setup

You can create a free Stripe account to get started.

[Follow the instructions](https://docs.composable.com/docs/integrations/payments/stripe) in the documentation to configure Stripe.

<!--
## Storybook Installation

Storybook is provided with a set of pre-built components to jumpstart your composable commerce project.

You can view the Storybook by running the following in terminal:

```sh
cd composable-ui/storybook
pnpm build
pnpm storybook
```

You should now have the Storybook application running locally. Go to your web browser and navigate to <http://localhost:6006>
-->

---

## Documentation Installation

Composable UI comes with documentation powered by Docusaurus. We encourage contributing documentation alongside code.

You can run Docusaurus by executing the following in the terminal:

```sh
cd docs
yarn install
yarn start
```

You should now have the Docusaurus application running locally. Go to your web browser and navigate to <http://localhost:3001>

Alternatively, you can view the latest documentation directly at <https://docs.composable.com>

### Documentation Deployment

Refer to [Deploy Composable UI Docs](https://docs.composable.com/docs/build_and_deploy/deploy#deploy-composable-ui-docs) to deploy to a cloud provider.

---

## What's inside?

This workspace uses [pnpm](https://pnpm.io/) as a package manager. It includes the following packages/apps:

- `composable-ui`: a [Next.js](https://nextjs.org) application
- `packages/cms-generic`: an example implementation of a CMS engine
- `packages/commerce-generic`: an example implementation of an ecommerce engine
- `packages/eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `packages/stripe`: stripe utilities and implementation
- `packages/tsconfig`: `tsconfig.json` used throughout the monorepo
- `packages/types`: types shared between the Next.js `app` and integration packages
- `packages/ui`: a react component library
- `scripts`: Utilities to automate common tasks
<!--
- `storybook`: [Storybook.js](https://storybook.js.org) application
-->

---

## Next Steps

To start with building your next composable commerce site using Composable UI, refer to the official [Composable UI Documentation](https://docs.composable.com)!

## How to Contribute

We always seek contributors to help us fix bugs, build new features, or help us improve the project documentation. Check out our [Contributing Guide](/CONTRIBUTING.md) if interested.
