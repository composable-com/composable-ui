---
sidebar_position: 2
---

# Content Management Systems

A Content Management System (CMS) streamlines the process of creating, editing, and publishing digital content.

## Composable UI CMS Support

### Sample integration

Composable UI provides the following commerce and CMS integrations to use with the frontend:

- `packages/cms-generic`

[tRPC routers](https://trpc.io/docs/server/routers) use this sample packages to serve data to the frontend.

### Pre-built CMS driven components

Composable UI consists of pre-built components to use with a CMS system. You can access the CMS driven components in the `composable-ui/src/components/cms/` directory.

### Homepage component

The `HomePage` component of Composable UI, `composable-ui/src/components/home-page.tsx` uses the pre-built CMS driven components for the homepage. This component is served to the user when they navigate to the index page of Composable UI, see `composable-ui/src/pages/index.tsx` for where the `HomePage` component is used.

This concept can be expanded on to support different types of content pages, or a generic content page that supports Next.js's dynamic routes feature. You can create a `/pages/[slug].tsx` file for any `slug` to link to page content in your desired CMS.

#### Static HomePage data

The `HomePage` component of Composable UI uses static data to drive the content on the page. The static data is stored in the `packages/cms-generic/src/data/pages.json` file.

This static data is fetched during [Static Site Generation (SSG)](https://nextjs.org/docs/basic-features/data-fetching/get-static-props) and is used to build the home page route of Composable UI. For more details on configuring SSG, see the `composable-ui/src/pages/index.tsx` file.

## How to build a CMS integration

A CMS integration can be built to control as little or as much content as desired. This section will discuss how to control the `Homepage` from a CMS.

To hook up the `HomePage` component to your own CMS, follow the pattern in `composable-ui/src/pages/index.tsx` of calling the function `ssg.cms.getPage.prefetch({ slug: 'home' })`. If you navigate to `composable-ui/src/server/api/routers/cms.ts` you can control the `getPage` function behavior to perform an asynchronous request to your desired CMS.

The following steps apply to the majority of scenarios of setting up a CMS and querying your homepage content:

1. Determine the API keys required to query your CMS.
2. Setup your CMS data models for each content type you wish to manage in your CMS.

  You can use the sample [HomePage static data](#static-homepage-data) as an example. If you follow with this example data, you'll also be able to easily consume Composable UI's [pre-built CMS driven React components](#pre-built-cms-driven-components).

-  Make sure to create a `Page` content model that contains references to each specific content type, such as `BannerFull`, `Grid`, and `TextCard`. This `Page` content model houses the content and is the content record queried to retrieve all the data of a specific page route.

4. Create a new content record of the `BannerFull` and populate the text fields and image URLs.
5. Create a new content record of the `Page` content type.
6. Determine how to query your `Page` record and if needed, add a `slug` text field to the `Page` data model to look up by `slug`.
7. Modify the `getPage` function in `composable-ui/src/server/api/routers/cms.ts` to:

-  Authenticate with your CMS provider using the API keys from step #1 if required.
-  Perform an asynchronous request to the CMS query endpoint and filter with your desired page slug. For example `/your_cms_api/content?slug=homepage`.

8. Modify the `HomePage` component to match the data and content returned from your CMS query.

  This is where CMS data is used to drive React components.
