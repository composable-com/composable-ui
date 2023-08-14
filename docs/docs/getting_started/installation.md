---
sidebar_position: 2
---

# Installation

You can run Composable UI locally or using Docker. The installation instructions are available in the `README` file in the [Composable UI GitHub](https://github.com/composable-com/composable-ui#readme) repository.

## Installing Composable UI

### Pre-Requisites

Ensure that you have installed the following on the local development machine:

-  Node.js v18.14.0 or higher. For checking the current version of Node.js on your machine, run the following command:

   ```shell
   node -v
   ```

   For changing the Node.js version, follow the instructions in the [nvm documentation](https://github.com/nvm-sh/nvm).

-  pnpm v8.0 or higher. For checking the current version of pnpm on your machine, run the following command:

   ```shell
   pnpm --version
   ```

   For installing pnpm, run the following command:

   ```shell
   npm install -g pnpm
   ```

   If you currently have a version prior to 8.0, run the following command:

   ```shell
   npm uninstall pnpm -g
   npm install -g pnpm
   ```

-  A code editor, such as [Visual Studio Code](https://code.visualstudio.com/).

### Installation Steps

1. Clone the [source repository](https://github.com/composable-com/composable-ui) to your local development environment.
2. Follow the instructions in the [README](https://github.com/composable-com/composable-ui#readme) for local setup and configuration.
3. Optionally, follow the instructions in the [README](https://github.com/composable-com/composable-ui#readme) to deploy Composable UI to a hosting provider.

Be sure to read the documentation on Composable UI's [environment variables](/docs/essentials/configuration)

## Recommended Visual Studio Code Extensions

The following Visual Code Extensions are recommended to improve the developer experience:

| Extension Name                         | Extension ID                          | Description                                                                                                                                  |
| -------------------------------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Markdown All in One                    | yzhang.markdown-all-in-one            | Provides markdown shortcuts, including table of contents generator.                                                                          |
| ES7+ React/Redux/React-Native Snippets | dsznajder.es7-react-js-snippets       | Provides a [snippet generator](https://github.com/ults-io/vscode-react-javascript-snippets/blob/HEAD/docs/Snippets.md) for common React code. |
| Prettier - Code formatter              | esbenp.prettier-vscode                | Provides a code formatter.                                                                                                                   |
| Code Spell Checker                     | streetsidesoftware.code-spell-checker | Provides basic spell check.                                                                                                                  |
| Color Highlight                        | naumovs.color-highlight               | Highlights web colours in your code.                                                                                                         |
| Git History                            | donjayamanne.githistory               | Displays git log, file history, compare branches or commits.                                                                                 |
| GraphQL: Language Feature Support      | GraphQL.vscode-graphql                | Improves GraphQL developer experience.                                                                                                       |
| markdownlint                           | DavidAnson.vscode-markdownlint        | Provides Markdown linting and style checking.                                                                                                |
| Jest                                   | Orta.vscode-jest                      | Supports full jest features to make testing more intuitive.                                                                                  |
| Test Adapter Converter                 | ms-vscode.test-adapter-converter      | Converts Test Explorer UI API into native VS Code testing.                                                                                   |
| TODO Highlight                         | wayou.vscode-todo-highlight           | Highlights TODO, FIXME ,and other annotations within your code.                                                                              |

You can automate the installation of these extensions by creating `.vscode/extensions.json` file with the following contents:

```json
{
   "recommendations": [
      "yzhang.markdown-all-in-one",
      "dsznajder.es7-react-js-snippets",
      "esbenp.prettier-vscode",
      "streetsidesoftware.code-spell-checker",
      "naumovs.color-highlight",
      "donjayamanne.githistory",
      "GraphQL.vscode-graphql",
      "DavidAnson.vscode-markdownlint",
      "Orta.vscode-jest",
      "ms-vscode.test-adapter-converter",
      "wayou.vscode-todo-highlight"
   ]
}
```
