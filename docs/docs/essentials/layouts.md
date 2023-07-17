---
sidebar_position: 5
---
# Layouts

In React and Next.js, a layout refers to a reusable structure or template that is used to define the common look and feel of multiple pages or components in an application. A layout usually contains a header, footer, and other shared UI elements that are used across multiple pages. By creating a layout, developers can easily maintain a consistent design across their application. Changing a layout reflects the changes in all the pages that use that layout.

## Page Layouts in Composable UI

The layouts in Composable UI are  defined in the `composable-ui/src/components/layout/layout.tsx` file. The layouts are imported in the `_app.tsx` file to use across the application:

```tsx
import { Layout } from 'components/layout/layout'
```

The default layout leverages the `next-seo` package and provides Search Engine optimization (SEO), the header, a placeholder for the page content, and a footer. However, for the checkout page, an alternate layout is conditionally used in `layout.tsx`:

```tsx
if (isCheckout) {
  return (
    <Box minHeight="100vh" bg={'shading.100'}>
      {children}
    </Box>
  )
```

## Custom Layouts

You can customize the layout for specific pages by editing `composable-ui/src/components/layout/layout.tsx` with the required changes, or read the Next.js documentation for [custom per page layouts using `Page.getLayout`](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#layout-pattern).

Additionally, Next.js provides components that allow you to define data in the [`<head>`](https://nextjs.org/docs/pages/api-reference/components/head) section of your web pages for SEO and metadata purposes.

## Related Resources

- [Next.js - Metadata Files API Reference](https://nextjs.org/docs/app/api-reference/file-conventions/metadata)
