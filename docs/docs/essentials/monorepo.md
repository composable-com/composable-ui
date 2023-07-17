---
sidebar_position: 2
---
# Mono-repository

The `composable-ui` repository is a mono-repository managed by [pnpm workspaces](https://pnpm.io/workspaces) and [Turborepo](https://turbo.build/repo). With a mono-repository, you can isolate code into manageable packages, and share the code between multiple applications.

## Structure and Configurations

### Composable packages

Code related to specific features of Composable UI is organized into isolated [internal packages ](https://turbo.build/repo/docs/handbook/sharing-code/internal-packages) for easier maintenance, scalability and reusability of code. Packages in the `/packages` directory are used in both the `/composable-ui` and `storybook` applications. For example, React components defined in package `/packages/ui` are used in both the Composable UI Next.js application (`/composable-ui`) and Storybook (`/storybook`).

The `/packages` directory contains the following packages:

| Package | Description |
| - | - |
|`cms-generic`| An example implementation of a Content Management System.|
|`commerce-generic` | An example implementation of an ecommerce engine.|
| `eslint-config-custom`| The `eslint` configurations, including `packages/eslint-config-next` and `eslint-config-prettier`. |
|`stripe` | The Stripe integration package.|
|`tsconfig` | The `tsconfig.json` files used throughout the mono-repository.  |
| `types`| The component types shared by the Next.js `app` and other integration packages.|
| `ui` | The packages for building UI, such asa Chakra configuration files and components. |

You can import the code in a package directory. For example, you can import the code in `packages/ui` as `@composable/ui` and use it in the code directly as in the following code sample:

```tsx
    import { ImageBannerProps } from '@composable/ui'
    export const ImageBanner = (props: ImageBannerProps) => {
    return <div>{props.image?.src}</div>
    }
```

The following table lists the packages exported by the mono-repository:

| Export code | Path |
| - | - |
| `@composable/cms-generic` | `packages/cms-generic` |
| `@composable/commerce-generic`|  `packages/commerce-generic` |
| `@composable/eslint-config-custom` | `packages/eslint-config-custom` |
| `@composable/stripe` | `packages/stripe` |
| `@composable/tsconfig` | `packages/tsconfig` |
| `@composable/types` | `packages/types` |
| `@composable/ui` | `packages/ui` |

 The name of each package is defined in the `package.json` file within each package directory. For example, `packages/ui/package.json` defines that the package is exported as `@composable/ui`.

## Configuration

The root files, `pnpm-workspace.yaml` and `turbo.json` contain the settings required to manage the mono-repository.

## Other Configuration Files

The `composable-ui` repository consists of the following JavaScript tooling and developer experience configuration files:

| File | Description |
| - | - |
| `.eslintrc.js` | The configuration file for ESLint, which analyzes the code and identifies potential errors, style issues, and other issues, based on a set of configurable rules. You can define the rules and configuration options for ESLint in this file. |
| `.prettierignore` |  The configuration file used by Prettier to exclude files or directories from being formatted by the extension. For more information, see the [Ignoring Code](https://prettier.io/docs/en/ignore.html) page. |
| `.prettierrc` | The configuration file used by Prettier to customize the default settings to format the code. For default setting, see the [Basic Configuration](https://prettier.io/docs/en/configuration.html#basic-configuration) section. |
| `turbo.json` | The Configuration file for the mono-repository manager, Turborepo. For more information on the settings, see the [Configuration Options](https://turbo.build/repo/docs/reference/configuration) page.|
| `.vscode/extensions.json` | The configuration file to specify the required Visual Studio Code extensions. For the list of extensions, see the [Recommended Visual Studio Code Extensions](../getting_started/installation.md#recommended-visual-studio-code-extensions) section.|

## Building

When you make changes to any packages, remember to go back to the root directory and re-build using the following command:

```shell
pnpm build
```

## Deployment

For information on deploying the mono-repository, see the Composable UI [Readme](https://github.com/composable-com/composable-ui#readme).

## Related Resources

- [pnpm Workspace](https://pnpm.io/workspaces)
- [Turborepo Configuring workspaces](https://turbo.build/repo/docs/handbook/workspaces)
- [turbo.json Configuration](https://turbo.build/repo/docs/reference/configuration)
