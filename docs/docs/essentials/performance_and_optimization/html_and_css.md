---
sidebar_position: 4
---

# Optimizing HTML & CSS

Composable UI uses Next.js built-in optimizations to enhance site speed and discoverability.

## Code Splitting
Next.js optimizes HTML and CSS by with built-in [code splitting support](https://nextjs.org/learn/foundations/how-nextjs-works/code-splitting) to ensure the browser loads only the required assets of each page. This method breaks the code into smaller chunks so that the browser fetches only the necessary parts required for a page and improves page loading times.

## HTML Meta Tags
By default, Next.js includes a [`<Head>` component](https://nextjs.org/docs/pages/api-reference/components/head) which you can set HTML meta tags, such as the page title, description, and canonical URL. Meta tags provide information about your website to search engines and social media platforms. This feature simplifies the process of optimizing your ecommerce application and enhances its visibility online.

## Responsive Support
Next.js can be configured to target specific [device screen sizes](https://nextjs.org/docs/pages/api-reference/components/image#devicesizes). This supports [Image optimziation](./images.md) by allowing the browser to download the most optimal image for the device's screen size. 

Composable UI also relies on Chakra UI's [Responsive Styles](https://chakra-ui.com/docs/styled-system/responsive-styles) system to build responsive support across pages and components. This enables your site to dynamically adjust its layout and appearance to different screen sizes and devices.

