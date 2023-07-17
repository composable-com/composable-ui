---
sidebar_position: 1
---

# Composable Provider

Next.js uses the [App component](https://nextjs.org/docs/advanced-features/custom-app) to initialize pages. In Composable UI, the `composable-ui/src/pages/_app.tsx` provides the configurations for Next.js to initialize the pages. All settings required for  `_app.tsx` file are configured in the `composable-ui/src/components/composable.tsx` file, which references other configurations for Composable UI components.

`Composable` configures the following for Composable UI:

-  `Chakra UI`
-  Internationalization support with `react-intl`
-  A global React Context managed in `ComposableProvider`
-  React-query development tools to improve developer experience with the `react-query` library

```tsx
import * as React from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ChakraProvider } from '@chakra-ui/react'
import { IntlConfig } from '@composable/types'
import { ComposableProvider } from './composable-provider'
import { IntlProvider } from './intl-provider'
```

The `ComposableProvider` component exposes a global context to grant access to cart, menu, and locale states:

```tsx
interface ComposableContext {
   accountDrawer: UseDisclosureReturn
   cartDrawer: UseDisclosureReturn
   locale: string
   menuDrawer: UseDisclosureReturn
   setLocale: (locale: string) => void
}
```

Components in Composable UI can access the `ComposableContext` by leveraging the `useComposable` hook, for example:

```tsx
const { accountDrawer, menuDrawer, locale, setLocale } = useComposable()
```

## Related Topics

- [Composable UI Design System](design/components_and_theme.md)
- [How to configure `_app.ts` in Next.js](https://nextjs.org/docs/advanced-features/custom-app)
- [Chakra UI `useDisclosure` hook](https://chakra-ui.com/docs/hooks/use-disclosure)
- [`useComposable`](hooks.md#useComposable)
