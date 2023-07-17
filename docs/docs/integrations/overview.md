---
sidebar_position: 1
---

# Overview

Composable UI is pre-integrated with a mocked CMS and commerce data provider, which are built by combining [tRPC](https://trpc.io/) and the [Next.js API Routes feature](https://nextjs.org/docs/api-routes/introduction). For more information about the tRPC library, see the [tRPC + Next.js](https://trpc.io/docs/nextjs/introduction) documentation.

When integrating with headless services, you must select an architectural patterns, such as:

* Direct communication from the browser to the headless services
* Direct communication from the browser to Next.js API Routes, and to headless services
* Direct communication from the browser to custom middleware layer, and to headless services

Depending on the security, performance, flexibility, and the developer experience requirements, you might need several integration patterns for each headless service that you want to integrate with.

You must not expose API keys with heightened permissions to the browser in a direct communication from the browser to the headless service architecture pattern. You must only use the API keys that are intended for public use or authenticated users in such communications. For more information, see the [Security Best-Practices](/docs/essentials/best_practices/security) section.

:::note
The mocked CMS and commerce integrations in Composable UI are only to support the demo of Composable UI and do not communicate with any external APIs. These integration examples are to provide you with the example code to build your own integrations with the headless services of your choice.
:::

## Build Your Own Integrations

You can extend the Composable UI architecture by creating integrations for the API for the required content, commerce requirements, and payment needs. The architecture for building with tRPC and Next.js API routes provide scaling required for the application.

The `composable-ui/src/types` directory consists of a predefined set of data for your application to use. You must change this as required for the the data types in the APIs that you connect to. The `packages/types` provides the basic type options that are used by the Composable UI components and tRPC services.
