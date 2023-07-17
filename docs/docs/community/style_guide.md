---
sidebar_position: 2
---
# Style Guide

This style guide outlines the conventions and best practices to follow when contributing code to Composable UI.

## General

- Write code in English only.
- Use two spaces for indentation.
- Use Unix line endings (`\n`) for text files and Windows line endings (`\r\n`) for files that need to be compatible with Windows.
- Use descriptive variable names and avoid abbreviations when possible.
- Avoid commenting out code. Instead, remove it or use version control to keep track of changes.
- Ensure there is no degradation of performance or accessibility by comparing LightHouse v10 score between your branch and the main branch

## TypeScript

- Use pascal case for type names.
- Use camel case for variable and function names.
- Use `interface` for types, unless `type` is required.
- Use `const` for properties that must not be modified.
- Use `unknown` instead of `any` when the type is not known.
- Avoid using type assertions, unless required.

## Next.js

- Use `import` and `export` statements instead of CommonJS-style `require`.
- Use `getStaticProps` and `getServerSideProps` for data fetching instead of making API calls in the client, when possible.
- Use `useRouter` to access router information or navigational needs.
- Use `NextLink` from the Next.js `next/link` module for client-side navigation by passing it using the `as` prop to the ChakraUI `Link`, `Button`, etc component. [More information](https://chakra-ui.com/docs/components/link#usage-with-nextjs)
- Use `next/image` module for optimizing images.

## CSS

- Use the Chakra UI theme to maintain your theme CSS values.
- Group Chakra UI theme tokens into different files based on their type, such as typography, borders, or colors.
- Use Chakra UI theme tokens to apply styles, instead of hardcoding CSS values directly in style props.

## Git

- Use present tense for commit messages.
- Use imperative mood for commit messages.
- Keep each commit small and focused on a single change.
- Use meaningful commit messages that describe the change.
- Make all changes in a branch and submit it as a pull request. You must prefix branches with one of the following:
  - `fix/` for bug fixes
  - `feat/` for features
  - `docs/` for documentation changes
- Rebase your feature branch onto the latest main branch before submitting a pull request.
- Use pull requests for code reviews.

## Resources

- [TypeScript](https://www.typescriptlang.org/docs/)
- [Next.js](https://nextjs.org/docs/pages/building-your-application/routing)
- [Chakra UI](https://chakra-ui.com/)
- [Git](https://git-scm.com/doc)
