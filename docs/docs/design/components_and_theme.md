---
sidebar_position: 1
---

# Design System + Theme

Composable UI comes equipped with pre-built components and designs, making it easy to get started with building your composable commerce site.

Additionally, the project includes a [Figma design system](http://figma.composable.com), which provides a comprehensive set of design elements and guidelines, ensuring consistency and ease of use across your site.

These pre-built components and design resources help you to save time and effort in the development process, allowing you to focus on customizing and refining your platform to meet your specific business needs.

## Components and Themes

Composable UI provides React components and layouts that you can use to build your e-commerce solution.

The `@composable/ui` package, which is in the `packages/ui` directory, contains standard re-usable components, such as accordions, alert boxes, carousels, gallery, and product cards. The components in the `composable-ui` directory leverages the components in the `packages/ui` directory to build more complex components, such as the cart page, menu, Product Listing Pages (PLP), and Product Display Pages (PDP).

The `packages/ui` directory is exported as `@composable/ui` and you can import it in the code as required. The `@composable/ui` package contains the UI components and you can share these components between both Next.js Composable UI application and the Storybook application.

Composable UI uses [Chakra UI](https://chakra-ui.com) as the base component library and as the building block for additional components. Using Chakra UI in your commerce solution enables you to take advantage of a React-based system with accessibility features, customizability, and a large community of developers.

## Using a component

1. To use a component, [import the component](../essentials/monorepo.md#composable-packages), reference the component by the name and pass the required parameters as in the following example:

```tsx
import { ImageBanner } from '@composable/ui'
...
<ImageBanner
    image={{
        src: '/img/image1.jpeg',
        alt: 'image1',
    }}
/>
```

## Customizing the logo

1. In the `/composable-ui/src/components/logo.tsx` file, define the `Logo` component as in the following example:

```tsx
export const Logo = (props: HTMLChakraProps<'svg'>) => (
  <chakra.svg
    color="accent"
    height="21"
    width="auto"
    viewBox="0 0 616.56 68.75"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Logo"
    {...props}
  >
```

After you define the logo component, you can use it in your commerce site by importing the component:

```tsx
import { Logo } from 'components/logo'
```

## Customizing the favicon

1. To change the favicon file, in the `/composable-ui/public/img/favicon.ico` directory, replace the image file.
1. Update the favicon reference in the`/composable-ui/src/utils/constants.ts` file with the new image name as in the following example:

```tsx
...
FAVICON: '/img/favicon.ico',
...
```

## Theme Configuration

Composable UI initializes the Chakra UI theme in `packages/ui/src/chakra/theme.ts` and constructs the site theme by bringing together several theme files, such as `colors.ts`, which are located in the `packages/ui/src/chakra/theme/foundations/` directory. The files in directory `packages/ui/src/chakra/theme/foundations/` contain the Composable UI theme settings for colours, font sizes, border styles, and more. You can override the default properties, such as the brand colours, default spacing, and font sizes, as required. For example, the `packages/ui/src/chakra/colorsPalette.json` file contains the primary and secondary colour configuration, which can modified as desired to match your branding.

For more information on customizing themes, see the [Chakra UI Default Theme documentation](https://chakra-ui.com/docs/styled-system/theme).

## Theme Tokens

Composable UI extends the default Chakra UI theme tokens, by adding theme tokens such as `xxs`, `xs`, `Mobile/XS`, and `Desktop/M` for styling your React components. These tokens are defined in the `packages/ui/foundations/` directory. The following code sample shows an example to style a text based on the viewport size, and uses [Chakra textStyles](https://chakra-ui.com/docs/styled-system/text-and-layer-styles) to apply multiple css properties through a single theme token:

```tsx
<Text textStyle={{ base: 'Mobile/XS', md: 'Desktop/M' }}>I will be styled with the 'Mobile/XS' textStyle for viewport sizes below the 'md' breakpoint, otherwise I will be styled with the 'Desktop/M' textStyle</Text>
```

The above `textStyles` are defined in `packages/ui/src/chakra/theme/textStyles.ts`

For more information improving developer experience with Chakra theme tokens, see the [Enabling Theme Typing and Autocomplete](#enabling-theme-typing-and-autocomplete) section.

## Enabling Theme Typing and Autocomplete

We recommend generating Chakra UI Types to enable type checking and auto-complete features. This will improve the developer experience when working with Composable UI [theme tokens](#theme-tokens).

1. To enable theme typing and autocomplete with your theme, run the following command:

  ```shell
  cd packages/ui
  pnpm install
  pnpm theme
  ```

  :::caution
  When you use `@next/font` in Chakra UI theme configuration, to successfully run the `pnpm theme` command, you must ensure that `the@next/font` assets in the `packages/ui/src/chakra/theme/foundations/typography.ts` file is not included during the execution of `pnpm theme`. You can use the comment tag to disable the assets. For instructions, see the `typography.ts` file.
  :::

1. (Optional) To continually auto-regenerate theme typings when a theme file is changed, run the following command:

  ```shell
  pnpm theme:watch
  ```

3. Restart the Typescript Server in Visual Studio Code and do the following:

   1. Press `Command + Shift + P` and view a TS file.
   2. From the drop-down menu, select `Typescript: Restart TS server`.
   
  After performing the above, Visual Studio Code will be type checking with your latest theme token names and values.

## Performance Guidelines

Chakra UI provides an excellent approach to achieving responsive design through [Responsive Styles](https://chakra-ui.com/docs/styled-system/responsive-styles), which removes the need to manually maintain responsive `@media` queries in your css. This approach does not rely on JavaScript to support responsiveness to ensure a high performing application.

We recommend **avoiding** use of Chakra UI's responsive components `Show` and `Hide`, and the hook `useBreakpointValue`, as these impact performance due to the reliance on the execution of JavaScript in the browser to perform responsive UI updates.

- The [Show and Hide](https://chakra-ui.com/docs/components/show-hide) components
- The [useBreakpointValue](https://chakra-ui.com/docs/hooks/use-breakpoint-value)

## Related Resources

- [Composable Packages](../essentials/monorepo.md#composable-packages)
- [Chakra UI documentation](https://chakra-ui.com/getting-started)
- [Responsive Styles](https://chakra-ui.com/docs/styled-system/responsive-styles)
- [Project Repository Structure](essentials/project_structure.md)
- [Mono-repository](essentials/monorepo.md)
- [Application Configuration](essentials/configuration.md)
