---
sidebar_position: 1
---
# Integrating a Commerce Provider

To integrate with a commerce provider, follow these steps:

1. Create a copy of the provided generic commerce integration located in` packages/commerce-generic`.
1. Connect each endpoint in the commerce-generic integration to your desired commerce API.
1. Modify the `commerce-generic` integration as needed to match the API you're connecting to.

  Refer to your API documentation on handling user authorization and authentication to guide your modifications.
1. Ensure that your integration exposes the appropriate data to the correct users.
  For example, ensure that users can only access data they own, such as their own cart, and not carts belonging to other users.

1. Retrieve your user session through the tRPC context object if you have implemented authentication with NextAuth.

  You may want to configure additional data to the tRPC context to provide further data in each user's session, such as a user's access token that you pass down to the third party API.

## Sample Integrations

Composable UI provides the following commerce and CMS integrations to use with the frontend:

- `packages/commerce-generic`

[tRPC routers](https://trpc.io/docs/server/routers) use this sample package to serve data to the frontend. For configurations to fetch a cart, see the following files:
   - `composable-ui/src/server/api/routers/commerce/procedures/cart/get-cart.ts`
   - `packages/commerce-generic/src/services/cart/get-cart.ts`

For configurations to fetch a page content, see the following files:
   - `composable-ui/src/server/api/routers/cms.ts`
   - `packages/cms-generic/src/services/get-page.ts`
