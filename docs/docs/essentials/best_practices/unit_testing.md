---
sidebar_position: 3
---

# Unit Testing

We use [Jest](https://jestjs.io/) along with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) to write unit tests for our components in Composable UI.

## Naming convention
By default, Jest looks for files that match either of the following criteria:

1. Files with the `.test.ts` or `.spec.ts` extension.
1. Files located in the `__tests__` directory anywhere in the project.

In Composable UI, the test file are organized in the `__tests__` directories and these files have the `.test.ts` extension.

## Running Unit Tests
To run your unit tests, run the following command:
```
pnpm test
```
This command runs Jest in [watch mode](https://jestjs.io/docs/cli#--watch).
Jest scans your project for test files and executes the test cases and provides detailed feedback on passed and failed tests. The feedback also includes a [coverage report](https://jestjs.io/docs/configuration/#collectcoverage-boolean).

## Additional Recommendations 
- **Mocking Dependencies**: Use the mocking capabilities provided by Jest to mock external dependencies or modules that are not the focus of your current unit test. This helps isolate the component that you test and ensures reliable and predictable test results.
- **Testing Hooks and Asynchronous Operations**: Use the utilities provided by react-testing-library to test hooks and handle asynchronous operations, such as waitFor and act. You can also use these utilities to test components that involve state management, side effects, or API calls.

For comprehensive unit tests in your Next.js application, follow these best practices to ensure code correctness, maintain a robust codebase, and catch regressions early in the development process.
