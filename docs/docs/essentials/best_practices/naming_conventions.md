---
sidebar_position: 1
---

# Naming Conventions

Composable UI follows a naming convention that makes it easier for  developers to collaborate and work on the same codebase.

## Naming Component Types

- When defining `types` for the React Components in Composable UI, suffix type with `Props`: `[ComponentName]Props`.
- Ensure that you use pascal casing.

For example, for the `ShippingAddressForm` component, the `type` should be named `ShippingAddressFormProps`.

## Naming API Endpoints

When creating new API endpoints, preferably use the `[Verb][Noun]` pattern, making the method names clear, self-explanatory, and easy to understand for developers.

Ensure that you use camel casing. For example, `getProducts`, `getCart`, or `updateCustomer`.

This naming convention assists developers discover the available endpoints of your API.

## References

-  [Nest](https://github.com/nestjs/nest)
-  [TypeScript style guide](https://ts.dev/style/#naming-style)
-  [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html#naming-style)
